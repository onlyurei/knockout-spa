require.config({
    waitSeconds: 60,
    paths: {
        //framework
        'Page': 'framework/page',
        'AppRouter': 'framework/router',

        //lib
        'Router': 'lib/path-to-router',
        'jQuery': 'lib/path-to-jquery',
        'Knockout': 'lib/path-to-knockout',
        'Sugar': 'lib/path-to-sugar'
    },
    shim: {}
});
