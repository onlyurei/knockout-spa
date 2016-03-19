require(['common'], function () {

  require(['app/shared/config', 'util/error-reporter', 'util/google-analytics', 'sugar'], function (
    Config, ErrorReporter, GA) {

    ErrorReporter.init(''); // TODO: change to your app's frontend error logger API url

    Config.refresh().done(function (config) {
      var locale = config.locale;
      if (locale) {
        require.config({
          config: {
            i18n: {
              locale: locale
            }
          }
        });

        try {
          Date.setLocale(locale);
        } catch (e) {
          window.console.error(e.message);
        }
      }

      GA.init(
        config.credentials.google.analytics/* TODO: change to your app's way of getting the GA account */,
        [
          ['require', 'linkid', 'linkid.js']
        ], /* TODO: change the required GA plugins per your app's needs, one plugin per sub-array.
         e.g.: here we are requiring the enhanced link attributes plugin 'linkid' */
        true // TODO: change to false if you don't want all click events on all pages to be auto-tracked by GA
      );

      /* TODO: do other bootstrapping needed for your app */

      require(['framework/router']);

    });

  });

});
