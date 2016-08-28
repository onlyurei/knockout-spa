/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2016 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['jsface', 'ko', 'sugar'], function (Class, ko) {

  var FormInput = Class({
    constructor: function (name, value, required, validations, submitOnChange, initFromQueryString) {
      this.name = name;
      this.value = ko.isObservable(value) ? value : ko.observable(Object.isFunction(value) ? value() : ((value !== undefined) ? value : ''));
      if (initFromQueryString) {
        this.fromQueryString();
      }
      this.required = required;

      this.filled = ko.computed(function () {
        if (this.value() === null) {
          return false;
        }
        return !!('' + this.value()).compact();
      }.bind(this));

      this.validations = validations;

      (function () {
        if (submitOnChange) {
          this.valueChangeSubscription = this.value.subscribe(function () {
            if (this.form && this.form.submit) {
              this.form.submit();
            }
          }.bind(this));
        }
      }.bind(this)).delay(500);

      if (Object.isArray(validations)) {
        validations.each(function (validation) {
          validation.error = ko.observable(false);
        });
        this.valid = ko.computed(function () {
          return !('' + this.value()).compact() || validations.all(function (validation) {
              if (Object.isRegExp(validation.rule)) {
                if (validation.rule.test(this.value())) {
                  validation.error(false);
                  return true;
                } else {
                  validation.error(true);
                  return false;
                }
              } else if (Object.isFunction(validation.rule)) {
                if (validation.rule(this.value())) {
                  validation.error(false);
                  return true;
                } else {
                  validation.error(true);
                  return false;
                }
              } else {
                return false;
              }
            }.bind(this));
        }.bind(this));
      } else {
        this.valid = ko.observable(true);
      }

      this.error = ko.computed(function () {
        return !this.valid() ? (validations.find(function (validation) { return validation.error(); }).message) : '';
      }.bind(this));

      this.form = null;

      return this;
    },
    serialize: function (toHash) {
      var sanitizedValue = Object.isString(this.value()) ? this.value().unescapeHTML().removeTags() : this.value();
      if (toHash) {
        var hash = {};
        hash[this.name] = sanitizedValue;
        return hash;
      }
      return this.name + '=' + sanitizedValue;
    },
    deserialize: function (json) {
      if (json.hasOwnProperty(this.name)) {
        if (typeof json[this.name] == 'string') {
          json[this.name] = json[this.name].replace(/\+/g, ' ');
        }
        this.value(json[this.name]);
      }
    },
    fromQueryString: function (queryString) {
      var queries = Object.fromQueryString(queryString || location.search);
      if (queries.hasOwnProperty(this.name)) {
        this.value(queries[this.name].replace(/\+/g, ' '));
      }
    }
  });

  return FormInput;

});
