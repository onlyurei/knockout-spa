define(['css!../../../../css/app/path/sub-path/sub-path.css'/* TODO: add dependencies of this page */], function () {

  var PathSubPath = {
    /* TODO: preparation before the page's template is rendered, e.g. class instantiation, access control
     e.g.: redirect to login page if not logged in, etc. (optional) */
    init: function () {},
    /* TODO: properly dispose this page to prevent memory leaks and UI leftovers (optional)
     e.g.: release event listeners, dispose knockout manual subscriptions, etc.
     NOTE: all primitives and ko observables defined on the page module object will have their values reset to initial
     states when leaving the page, unless false is returned in dispose function */
    dispose: function () {},
    // TODO: do things after the page's template has finished rendering (e.g. DOM manipulations) (optional)
    afterRender: function () {
      console.log('path/sub-path template finished rendering.')
    },
    //TODO: controllers to handle url params/query strings (optional)
    controllers: {
      '/:token1': function (token1) {
        console.log(token1);
      },
      '/:token1/:token2': function (token1, token2) {
        console.log(token1, token2);
      }
    }
  };

  /*
   If you don't need any JS logic at all (e.g. simple static text page), just return an empty object {} as the page module.
   If you want to separate the page's data from the behavior handlers (init, afterRender, dispose, controllers),
   feel free to make the data separate module(s) and merge them into the page module as needed.
   */

  return PathSubPath;

});
