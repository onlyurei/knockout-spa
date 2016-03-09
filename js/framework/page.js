/** @license The MIT License (MIT) Copyright (c) 2015-2016 Cheng Fan (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['app/shared/root-bindings', 'framework/page-disposer', 'ko', 'sugar'], function (
  RootBindings, PageDisposer, ko) {

  var initialRun = true;

  var Page = {
    init: function (name, data, controller, path) {
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

      var autoDispose = (Page.page().data.dispose && Page.page().data.dispose(Page)) || true; // if the requested page is not the same page, dispose current page first before swap to the new page
      if (autoDispose !== false) {
        // auto-dispose page's exposed observables and primitive properties to initial values. if not desired, return
        // false in dispose function to suppress auto-disposal for all public properties of the page, or make the
        // particular properties private
        PageDisposer.dispose(Page.page().data);
      }

      PageDisposer.init(data); //store initial observable and primitive properties values of the page
      var initialized = (data.init && data.init(Page)) || true; // init view model and call controller (optional) before template is swapped-in
      if (initialized === false) {
        return false; // stop initialization if page's init function return false (access control, etc.)
      }
      if (controller) {
        controller(data);
      }

      Page.pageClass([name, ('ontouchstart' in document.documentElement) ? 'touch' : 'no-touch'].join(' '));
      Page.page({
        name: name,
        data: data,
        path: path
      }); // to test if template finished rendering, use afterRender binding in the template binding

      document.title = Page.title();

      if (Page.initExtra) {
        Page.initExtra(name, data, controller); // useful for common init tasks for all pages such as anaylitics page view tracking, can be set in RootBindings
      }

      if (initialRun) {
        ko.applyBindings(Page, document.getElementsByTagName('html')[0]); // apply binding at root node to be able to bind to anywhere
        initialRun = false;
      }

      return data;
    },
    page: ko.observable({
      name: '', // name of the page - auto-set by the framework, no need to worry
      data: {
        init: function () {}, // preparation before the page's template is rendered, such as checking access control, init/instantiate modules used by the page, etc.
        dispose: function () {} // properly dispose the page to prevent memory leaks and UI leftovers (important for SPA since page doesn't refresh between page views) - remove DOM element event listeners, dispose knockout manual subscriptions, etc.
      }
    }),
    pageClass: ko.observable(''),
    loading: ko.observable(false),
    title: function () {
      return Page.page().name.titleize(); // override in RootBindings as needed
    }
  };

  Object.merge(Page, RootBindings); // additional root bindings as needed by the app

  return Page;

});
