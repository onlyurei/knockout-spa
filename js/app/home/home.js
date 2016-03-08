define(['ko', 'css!../../../css/app/home/home.css'/* TODO: add dependencies of this page */], function (ko) {

  var Home = {
    /* TODO: preparation before the page's template is rendered (optional) */
    init: function () {
      require(['text!/README.md'], Home.readme);
    },
    /*
     // TODO: do things after the page's template has finished rendering (e.g. DOM manipulations) (optional)
     afterRender: function () {
     }
     /!* TODO: properly dispose this page to prevent memory leaks and UI leftovers (optional)
     (data that will no longer be used, event listeners, knockout manual subscriptions, etc.) *!/
     dispose: function () {
     },
     // TODO: controllers to handle url params/query strings (optional)
     controllers: {}
     */
    readme: ko.observable('')
  };

  /*
  If you don't need any JS logic at all (e.g. simple static text page), just return an empty object {} as the page module.
  If you want to separate the page's data from the behavior handlers (init, afterRender, dispose, controllers),
  feel free to make the data separate module(s) and merge them into the page module as needed.
  */

  return Home;

});
