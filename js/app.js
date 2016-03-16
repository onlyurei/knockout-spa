require(['common'], function () {

  require(['app/shared/config', 'util/error-reporter', 'util/google-analytics', 'sugar'], function (
    Config, ErrorReporter, GA) {

    GA.init(
      Config().credentials.google.analytics/* TODO: change to your app's way of getting the GA account */,
      [['require', 'linkid', 'linkid.js']], /* TODO: change the required GA plugins per your app's needs, one plugin per sub-array. e.g.: here we are requiring the enhanced link attributes plugin 'linkid' */
      true /* TODO: change to false if you don't want all clicks to be tracked */
    );
    ErrorReporter.init('');
    /* TODO: change to your app's frontend error logger API url */

    try {
      Date.setLocale(Config().locale);
      /* TODO: change to your app's way of getting the locale */
    } catch (e) {
      window.console && window.console.error(e.message);
    }
  });

  /* TODO: do other bootstrapping needed for your app */

  require(['framework/router']);

});
