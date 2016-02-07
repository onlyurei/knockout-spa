require.config({
    paths: {
        //lib
        'i18n': 'lib/require-i18n',
        'text': 'lib/require-text',

        //lib-ext
        'jquery': 'lib/jquery',
        'knockout': 'lib-ext/knockout-extended'
        /* TODO: register AMD modules only as needed (e.g. shorthand for extended lib),
           or as required by third-party libs (e.g. lib expects dependencies to be called certain fixed module names) */
    },
    shim: {
        'lib/director': {
            exports: 'Router'
        }
    }
});
