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
                'AppRouter',
                'Page'
            ]
        },
        {
            name: 'PageName',
            exclude: ['common']
        }
    ]
})
