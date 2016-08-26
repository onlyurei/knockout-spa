define(['css!./home.css'/* TODO: add dependencies of this page */], function () {

  var Home = {
    /* TODO: preparation before the page's template is rendered, e.g. class instantiation, access control (return false in function),
     redirect to login page if not logged in, etc. (optional)
     root binging object is passed as the function param.
     try uncommenting the following line to see the effect of returning false.
     init: function (root) { console.log(root); return false; },

     // TODO: do things after the page's template has finished rendering (e.g. DOM manipulations)
     may need setTimeout(1) to yield wait for UI to be ready sometimes (optional)
     afterRender: function () {},

     /!* TODO: properly dispose this page to prevent memory leaks and UI leftovers (optional)
     e.g.: release event listeners, dispose knockout manual subscriptions, etc.
     NOTE: all primitives and ko observables defined on the page module object will have their values reset to initial
     values when leaving the page, unless false is returned in dispose function (try returning true/false to see the effect) *!/
     root binging object is passed as the function param.
     dispose: function (root) {},

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
