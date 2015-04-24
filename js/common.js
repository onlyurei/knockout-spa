require.config({
    paths: {
        /* TODO: register all AMD modules by providing CamelCase aliases, exceptions are RequireJS plugins, whose names are fixed */
        /* follow files dictionary order */

        //app/error
        'Error': 'app/error/error',

        //app/home
        'Home': 'app/home/home',

        //app/path/sub-path
        'PathSubPath': 'app/path/sub-path/sub-path',

        //app/shared
        'RootBindings': 'app/shared/root-bindings',
        'Routes': 'app/shared/routes',
        'UrlUtil': 'app/shared/url-util',

        //app/shared/api
        'Api': 'app/shared/api/api',
        'ApiExample': 'app/shared/api/api-example',

        //framework
        'Page': 'framework/page',
        'PageDisposer': 'framework/page-disposer',
        'AppRouter': 'framework/router',

        //i18n
        'Strings': 'i18n/strings',
        'Resources': 'i18n/resources',

        //lib
        'Router': 'lib/director',
        'jQuery': 'lib/jquery',
        'Class': 'lib/jsface',
        'Knockout.Raw': 'lib/knockout',
        'Knockout.AMDHelpers': 'lib/knockout-amd-helpers',
        'i18n': 'lib/require-i18n',
        'text': 'lib/require-text',
        'Sugar': 'lib/sugar',

        //lib-ext
        'Knockout.CustomBindings': 'lib-ext/knockout-custom-bindings',
        'Knockout.CustomBindings.Core': 'lib-ext/knockout-custom-bindings-core',
        'Knockout': 'lib-ext/knockout-extended',

        //util
        'Cache': 'util/cache',
        'Dom': 'util/dom',
        'Geolocation': 'util/geolocation',
        'Json': 'util/json',
        'KeyboardEventHandler': 'util/keyboard-event-handler',
        'PersistedObservable': 'util/persisted-observable',
        'Storage': 'util/storage',

        //widget/form
        'Form': 'widget/form/form',
        'FormInput': 'widget/form/form-input',
        'FormInputLocation': 'widget/form/form-input-location',
        'FormInputSorter': 'widget/form/form-input-sorter'
    },
    shim: {
        /* TODO: provide all needed shims for non-AMD modules */
        'Class': {
            exports: 'Class'
        },
        'Router': {
            exports: 'Router'
        }
    }
});
