define(['RootBindings', 'PageDisposer', 'Knockout', 'Sugar'], function (RootBindings, PageDisposer, ko) {

    var initialRun = true;

    var Page = {
        init: function (name, data, controller) {
            Page.loading(false);

            name = name.toLowerCase();

            if ((Page.page().name == name) && (Page.page().data == data)) { // if the requested page is the same page, immediately call controller without going further
                if (controller) {
                    controller(data);
                }

                document.title = Page.title();

                if (Page.initExtra) {
                    Page.initExtra(name, data, controller);
                }

                return data;
            }

            var autoDispose = Page.page().data.dispose(Page); // if the requested page is not the same page, dispose current page first before swap to the new page
            if (autoDispose !== false) { // auto-dispose observables and simple values to initial values, return false to suppress
                PageDisposer.dispose(Page.page().data);
            }

            PageDisposer.init(data); //store initial observable and simple properties values of the page
            var initialized = data.init(Page); // init view model and call controller (optional) before template is swapped-in
            if (initialized === false) {
                return false; // stop initialization if page's init function return false (access control, etc.)
            }
            if (controller) {
                controller(data);
            }

            Page.bodyClass([name.dasherize(), ('ontouchstart' in document.documentElement) ? 'touch' : 'no-touch'].join(' '));
            Page.page({
                name: name,
                data: data
            }); // to test if template finished rendering, use afterRender binding

            document.title = Page.title();

            if (Page.initExtra) {
                Page.initExtra(name, data, controller);
            }

            if (initialRun) {
                ko.applyBindings(Page, document.getElementsByTagName('html')[0]); // apply binding at root node to be able to bind to anywhere
                initialRun = false;
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
        bodyClass: ko.observable(''),
        loading: ko.observable(false),
        title: function () {
            return Page.page().name.titleize(); // override in RootBindings as needed
        }
    };

    Object.merge(Page, RootBindings); // additional root bindings as needed by the app

    return Page;

});
