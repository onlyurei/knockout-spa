define({
    flatten: function (data) {
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

        recurse(data, '');
        return result;
    },
    unflatten: function (data) {
        'use strict';
        if (Object(data) !== data || Array.isArray(data)) {
            return data;
        }
        var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
            resultholder = {};
        for (var p in data) {
            if (data.hasOwnProperty(p)) {
                var cur = resultholder,
                    prop = '',
                    m;
                while (!!(m = regex.exec(p))) {
                    cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
                    prop = m[2] || m[1];
                }
                cur[prop] = data[p];
            }
        }
        return resultholder[''] || resultholder;
    }
});
