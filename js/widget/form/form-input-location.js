/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2016 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['util/cache', 'widget/form/form-input', 'jsface', 'ko', 'jquery', 'sugar'], function (
  Cache, FormInput, Class, ko) {

  var FormInputLocation = Class(FormInput, {
    $statics: {
      ADDRESS_CACHE: new Cache(2000, 'addressResolutionCache')
    },
    constructor: function (
      name, value, required, validations, useCurrentPosition, submitOnChange, initFromQueryString, autocomplete) {
      FormInputLocation.$super.call(this, name, value, required, validations, submitOnChange, initFromQueryString);

      this.currentPosition = ko.observable(null);
      this.gettingCurrentPosition = ko.observable(false);
      this.getCurrentPositionFailed = ko.observable(false);

      var _useCurrentPosition = useCurrentPosition || ko.observable(false);
      this.useCurrentPosition = ko.computed({
        read: function () {
          return _useCurrentPosition();
        },
        write: function (newValue) {
          _useCurrentPosition(newValue);
          if (newValue) {
            this.getCurrentPosition(function () {
              if (submitOnChange && this.form) {
                this.form.submit();
              }
            }.bind(this));
          } else {
            this.gettingCurrentPosition(false);
            this.getCurrentPositionFailed(false);
            this.currentPosition(null);
          }
        }.bind(this)
      });

      if (submitOnChange) {
        this.valueChangeSubscription.dispose();
      }

      if (autocomplete) {
        this.autocompleteUrl = autocomplete;
        this.autocomplete = {
          source: function (req, res) {
            var term = req.term;
            var cachedValue = FormInputLocation.ADDRESS_CACHE.get(term);
            if (cachedValue) {
              res(cachedValue);
            } else {
              $.getJSON(this.autocompleteUrl, req)
                .done(function (addresses) {
                  if (addresses.length) {
                    FormInputLocation.ADDRESS_CACHE.set(term, addresses);
                  }
                  res(addresses);
                })
                .fail(function () {
                  res([]);
                });
            }
          }.bind(this),
          select: function (event, ui) {
            this.value(ui.item.label.compact());
          }.bind(this),
          minLength: 3
        };
      }

      if (!this.geolocationAvailable) {
        this.useCurrentPosition(false);
      }

      if (_useCurrentPosition()) {
        this.getCurrentPosition();
      }

      this.filled = ko.computed(function () {
        return !!(this.useCurrentPosition() ? this.currentPosition() : ('' + this.value()).compact());
      }.bind(this));

      return this;
    },
    geolocationAvailable: 'geolocation' in navigator,
    getCurrentPosition: function (successCallback, errCallback) {
      if (this.geolocationAvailable) {
        this.gettingCurrentPosition(true);
        this.currentPosition(null);
        navigator.geolocation.getCurrentPosition(
          function (position) {
            this.gettingCurrentPosition(false);
            this.getCurrentPositionFailed(false);
            this.currentPosition(position);
            if (successCallback) {
              successCallback(position);
            }
          }.bind(this),
          function (err) {
            this.gettingCurrentPosition(false);
            this.getCurrentPositionFailed(err);
            this.currentPosition(null);
            if (errCallback) {
              errCallback(err);
            }
          }.bind(this),
          {
            enableHighAccuracy: true
          }
        );
      }
      return navigator.geolocation;
    },
    serialize: function (toHash) {
      if (this.useCurrentPosition() && this.currentPosition()) {
        var long = this.currentPosition().coords.longitude;
        var lat = this.currentPosition().coords.latitude;
        if (toHash) {
          return {
            long: long,
            lat: lat
          };
        }
        return ('long=' + long + '&lat=' + lat);
      }
      return FormInputLocation.$superp.serialize.call(this, toHash);
    }
  });

  return FormInputLocation;

});
