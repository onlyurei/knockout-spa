define(['css!../../../css/app/home/home.css'/* TODO: add dependencies of this page */], function () {

  var Home = {
    /* TODO: preparation before the page's template is rendered, e.g. class instantiation, access control
     e.g.: redirect to login page if not logged in, etc. (optional)
     init: function () {},

     // TODO: do things after the page's template has finished rendering (e.g. DOM manipulations) (optional)
     afterRender: function () {},

     /!* TODO: properly dispose this page to prevent memory leaks and UI leftovers (optional)
     e.g.: release event listeners, dispose knockout manual subscriptions, etc.
     NOTE: all primitives and ko observables defined on the page module object will have their values reset to initial
     states when leaving the page, unless false is returned in dispose function *!/
     dispose: function () {},

     // TODO: controllers to handle url params/query strings (optional)
     controllers: {}
     */
  };

  /*
   If you don't need any JS logic at all (e.g. simple static text page), just return an empty object {} as the page module.
   If you want to separate the page's data from the behavior handlers (init, afterRender, dispose, controllers),
   feel free to make the data separate module(s) and merge them into the page module as needed.
   */

  return Home;

});
