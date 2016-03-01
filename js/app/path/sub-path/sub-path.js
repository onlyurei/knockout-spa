define([/* TODO: add dependencies of this page */], function () {

  var PathSubPath = {
    init: function () {
      /* TODO: preparation before the page's template is rendered */
    },
    dispose: function () {
      /* TODO: properly dispose this page to prevent memory leaks and UI leftovers
       (data that will no longer be used, event listeners, knockout manual subscriptions, etc.) */
    },
    controllers: {
      '/:token1': function (token1) {
        //TODO: use token1
      },
      '/:token1:/:token2': function (token1, token2) {
        //TODO: use token1 and/or token2
      }
    }
  };

  return PathSubPath;

});
