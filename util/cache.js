/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2016 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['jsface', 'util/storage', 'sugar'], function (Class, Storage) {

  var Cache = Class({
    constructor: function (size, storageKey, permanentStorage) {
      this.size = size;
      this.storageKey = storageKey;
      this.permanentStorage = permanentStorage;

      var cache = {};
      if (storageKey) {
        cache = Storage.get(storageKey, permanentStorage);
        if (!Object.isObject(cache)) {
          cache = {};
        }
      }
      this.cache = cache;

      return this;
    },
    get: function (key) {
      return this.cache[key];
    },
    set: function (key, value) {
      if (Object.size(this.cache) >= this.size) {
        delete this.cache[Object.keys(this.cache)[0]];
      }
      this.cache[key] = value;
      if (this.storageKey) {
        Storage.set(this.storageKey, this.cache, this.permanentStorage);
      }
      return this;
    }
  });

  return Cache;

});
