define(['Storage', 'Knockout.Raw'], function (Storage, ko) {

    return function (storageKey, initialValueFallback, permanent) {
        var value = Storage.get(storageKey, permanent);
        var observable = ko.observable((value || (typeof value == 'boolean')) ? value : initialValueFallback);
        return ko.computed({
            read: function () {
                return observable();
            },
            write: function (value) {
                observable(value);
                Storage.set(storageKey, value, permanent);
            }
        });
    };

});
