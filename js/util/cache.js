/**
 * @license Copyright (c) 2015-2016 Cheng Fan
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
