/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2016 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['util/json', 'util/storage', 'jsface', 'ko', 'sugar'], function (Json, Storage, Class, ko) {

  var PersistedObservable = Class({
    constructor: function (storageKey, defaults, persist) {
      var data = Object.merge(Object.isObject(defaults) ? defaults : {}, (storageKey && Storage.get(storageKey)) || {}, true);
      Object.merge(this, data, true);
      ko.observe(this);

      if (storageKey) {
        Json.traverse(this, function (key, value, object) {
          var _key = '_' + key;
          if (ko.isObservable(object[_key])) {
            var subscription = object[_key].subscribe(persist || function () { //CAUTION: beware of memory leak, be sure to call dispose() when disposing
                Storage.set(storageKey, this.serialize && this.serialize() || this);
              }.bind(this));
            Object.defineProperty(object, _key + '_subscription', {
              value: subscription,
              enumerable: false
            })
          }
        }.bind(this));
      }

      return this;
    },
    dispose: function () {
      Json.traverse(this, function (key, value, object) {
        var _key = '_' + key + '_subscription';
        object[_key] && object[_key].dispose && object[_key].dispose();
      }.bind(this));
    }
  });

  return PersistedObservable;

});
