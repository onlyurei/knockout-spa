define(function () {
    var serialize = function (value) {
        try {
            return JSON.stringify(value);
        } catch (e) {
            if (window.console) {
                window.console.error(e.message);
            }
        }
    }, deserialize = function (value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            if (window.console) {
                window.console.error(e.message);
            }
        }
    }, /**
     * Returns true if local storage is supported. Wrapped in try..catch to prevent
     * uncaught exception when cookies are disabled in older versions of Firefox.
     */
    isLocalStorageAvailable = (function () {
        try {
            return !!localStorage.getItem;
        } catch (e) {
            return false;
        }
    })(), /**
     * Returns true if session storage is supported. Wrapped in try..catch to prevent
     * uncaught exception when cookies are disabled in older versions of Firefox.
     */
    isSessionStorageAvailable = (function () {
        try {
            return !!sessionStorage.getItem;
        } catch (e) {
            return false;
        }
    })();
    return {
        sessionStorageAvailable: isSessionStorageAvailable,
        localStorageAvailable: isLocalStorageAvailable,
        /**
         * Get a key/value pair from storage
         * @param {String} key Name of the item to be retrieved
         * @param {Boolean=true} permanent If true, uses local storage instead of session storage (optional)
         */
        get: function (key, permanent) {
            if (window.JSON) {
                try {
                    var _permanent = (permanent || typeof permanent == 'boolean') ? permanent : true;
                    if (_permanent && isLocalStorageAvailable) {
                        return deserialize(localStorage.getItem(key));
                    } else if (isSessionStorageAvailable) {
                        return deserialize(sessionStorage.getItem(key));
                    }
                } catch (e) {
                    if (window.console) {
                        window.console.error(e.message);
                    }
                    return null;
                }
            } else {
                return null;
            }
        },
        /**
         * Set a key/value pair to storage
         * @param {String} key Name of the item to be set
         * @param {Object} value JSON object representing the data to be stored
         * @param {Boolean=true} permanent If true, uses local storage instead of session storage (optional)
         */
        set: function (key, value, permanent) {
            if (window.JSON) {
                try {
                    var _permanent = (permanent || typeof permanent == 'boolean') ? permanent : true;
                    if (_permanent && isLocalStorageAvailable) {
                        localStorage.setItem(key, serialize(value));
                    } else if (isSessionStorageAvailable) {
                        sessionStorage.setItem(key, serialize(value));
                    }
                } catch (e) {
                    if (window.console) {
                        window.console.error(e.message);
                    }
                }
            }
        },
        /**
         * Removes an item from storage
         * @param {String} key Name of the item to be removed
         * @param {Boolean=true} permanent If true, uses local storage instead of session storage (optional)
         */
        remove: function (key, permanent) {
            var _permanent = (permanent || typeof permanent == 'boolean') ? permanent : true;
            try {
                if (_permanent && isLocalStorageAvailable) {
                    localStorage.removeItem(key);
                } else if (isSessionStorageAvailable) {
                    sessionStorage.removeItem(key);
                }
            } catch (e) {
                if (window.console) {
                    window.console.error(e.message);
                }
            }
        },
        /**
         * Clears items from storage
         * @param {Boolean=true} permanent If true, uses local storage instead of session storage (optional)
         */
        clear: function (permanent) {
            var _permanent = (permanent || typeof permanent == 'boolean') ? permanent : true;
            try {
                if (_permanent && isLocalStorageAvailable) {
                    localStorage.clear();
                } else if (isSessionStorageAvailable) {
                    sessionStorage.clear();
                }
            } catch (e) {
                if (window.console) {
                    window.console.error(e.message);
                }
            }
        },
        /**
         * Add event listener for localStorage change
         * @param {Function} handler handler to be called with the param event, which contains 4 interesting properties: { key, oldValue, newValue, url, source }
         */
        addEventListener: function (handler) {
            if (window.addEventListener) {
                window.addEventListener('storage', handler, false);
            } else {
                window.attachEvent('onstorage', handler);
            }
        }
    };
});
