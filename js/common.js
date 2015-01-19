require.config({
    waitSeconds: 60,
    paths: {
        /* TODO register all AMD modules by providing CamelCase aliases, exceptions are RequireJS plugins, whose names are fixed */
        /* follow files dictionary order */

        //app/error
        'Error404': 'app/error/404/404',

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
        'AppRouter': 'framework/router',

        //i18n
        'Strings': 'i18n/strings',
        'Resources': 'i18n/resources',

        //lib
        'Router': 'lib/director-1.2.6',
        'Sugar': 'lib/sugar-1.4.1',

        //lib/jquery
        'jQuery': 'lib/jquery/jquery-2.1.1',

        //lib/knockout
        'Knockout.Raw': 'lib/knockout/knockout-3.2.0',
        'Knockout.AMDHelpers': 'lib/knockout/knockout-amd-helpers-0.7.3',
        'Knockout.DeferredUpdates': 'lib/knockout/knockout-deferred-updates-3.2.1',

        //lib/require
        'i18n': 'lib/require/require-i18n-2.0.4',
        'text': 'lib/require/require-text-2.0.13',

        //lib-ext/knockout
        'Knockout.CustomBindings': 'lib-ext/knockout/knockout-custom-bindings',
        'Knockout.CustomBindings.Core': 'lib-ext/knockout/knockout-custom-bindings-core',
        'Knockout': 'lib-ext/knockout/knockout-extended',

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
        /* TODO provide all needed shims for non-AMD modules */
        'Router': {
            exports: 'Router'
        }
    }
});
