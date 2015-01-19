define(['RootBindings', 'Knockout', 'Sugar'], function (RootBindings, ko) {

    var initialRun = true;

    var Page = {
        init: function (name, data, callback) {
            name = name.toLowerCase();
            if ((Page.page().name == name) && (Page.page().data == data)) { // if the requested page is the same page, immediately callback
                if (callback) {
                    callback(data);
                }
                return data;
            }
            Page.page().data.dispose(Page); // if the requested page is not the same page, dispose current page first before swap to the new page
            var initialized = data.init(Page); // init view model before template is swapped-in
            Page.bodyClass([name.dasherize(), ('ontouchstart' in document.documentElement) ? 'touch' : 'no-touch'].join(' '));
            Page.page({
                name: name,
                data: data
            }); // to test if template finished rendering, use afterRender binding
            if (initialRun) {
                ko.applyBindings(Page);
                initialRun = false;
            }
            if (callback && (initialized !== false)) {
                callback(data);
            }
            return data;
        },
        page: ko.observable({
            name: '',
            data: {
                init: function () {},
                dispose: function () {}
            }
        }),
        bodyClass: ko.observable('')
    };

    Object.merge(Page, RootBindings); // additional root bindings as needed by the app

    return Page;

});
