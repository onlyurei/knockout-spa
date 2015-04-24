define(['Knockout', 'Sugar'], function (ko) {

    var initialValues = {};
    
    var PageDisposer = {
        init: function (page) {
            initialValues = {};
            Object.each(page, function (key, value) {
                if (ko.isObservable(value) && !ko.isComputed(value)) {
                    initialValues[key] = value();
                } else if ((value === null) || (value === undefined) || Object.isString(value) || Object.isNumber(value)) {
                    initialValues[key] = value;
                }
            });
        },
        dispose: function (page) {
            Object.each(initialValues, function (key, value) {
                if (page.hasOwnProperty(key)) {
                    if (Object.isFunction(page[key])) {
                        page[key](value);
                    } else {
                        page[key] = value;
                    }
                }
            });
            initialValues = {};
        }
    };

    return PageDisposer;

});
