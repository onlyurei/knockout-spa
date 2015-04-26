require(['common'], function () {

    require(['Config', 'ErrorReporter', 'GA', 'Sugar'], function (Config, ErrorReporter, GA) {
        require.config({
            config: {
                i18n: {
                    locale: Config().locale.toLowerCase() /* TODO: change to your app's way of getting the locale */
                }
            }
        });

        GA.init(Config().credentials.google.analytics/* TODO: change to your app's way of getting the GA account */, [['require', 'linkid', 'linkid.js']], true);
        ErrorReporter.init('/api/log/log'); /* TODO: change to your app's frontend error logger API url */

        try {
            Date.setLocale(Config().locale); /* TODO: change to your app's way of getting the locale */
        } catch (e) {
            window.console && window.console.error(e.message);
        }
    });

    /* TODO: do other bootstrapping needed for your app */

    require(['AppRouter']);

});
