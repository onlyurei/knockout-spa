({
    appDir: '../',
    baseUrl: 'js',
    dir: '../build',
    mainConfigFile: 'common.js',
    optimize: 'uglify2',
    optimizeCss: 'standard',
    modules: [
        {
            name: 'common',
            include: [
                'Api',
                'AppRouter',
                'Page'
                /* TODO add other common modules */
            ]
        },
        {
            name: 'Error404',
            exclude: ['common']
        },
        {
            name: 'Home',
            exclude: ['common']
        },
        {
            name: 'PathSubPath',
            exclude: ['common']
        }
        /* TODO add other page modules */
    ]
})
