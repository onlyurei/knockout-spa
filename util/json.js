define(function () {

  function flatten(object) {
    var result = {};

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++) {
          recurse(cur[i], prop + '[' + i + ']');
        }
        if (l === 0) {
          result[prop] = [];
        }
      } else {
        var isEmpty = true;
        for (var p in cur) {
          if (cur.hasOwnProperty(p)) {
            isEmpty = false;
            recurse(cur[p], prop ? (prop + '.' + p) : p);
          }
        }
        if (isEmpty && prop) {
          result[prop] = {};
        }
      }
    }

    recurse(object, '');
    return result;
  }

  function unflatten(object) {
    'use strict';
    if (Object(object) !== object || Array.isArray(object)) {
      return object;
    }
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder = {};
    for (var i in object) {
      if (object.hasOwnProperty(i)) {
        var cur = resultholder,
          prop = '',
          m;
        while (!!(m = regex.exec(i))) {
          cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
          prop = m[2] || m[1];
        }
        cur[prop] = object[i];
      }
    }
    return resultholder[''] || resultholder;
  }

  function traverse(object, cb) {
    for (var i in object) {
      if (object.hasOwnProperty(i)) {
        cb.apply(this, [i, object[i], object]);
        if (object[i] !== null && typeof(object[i]) == "object") {
          traverse(object[i], cb);
        }
      }
    }
  }

  return {
    flatten: flatten,
    unflatten: unflatten,
    traverse: traverse
  };

});
