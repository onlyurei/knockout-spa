define(['Class', 'Storage', 'Sugar'], function (Class, Storage) {

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
