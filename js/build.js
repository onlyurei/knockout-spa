/*
   run this command in project root folder for production build:
   r.js -o js/build.js
   serve the assets from /build folder in production
*/
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
                'app/shared/api/api',
                'framework/router',
                'framework/page'
                /* TODO: add other common modules */
            ]
        },
        {
            name: 'app/error/error',
            exclude: ['common']
        },
        {
            name: 'app/home/home',
            exclude: ['common']
        },
        {
            name: 'app/path/sub-path',
            exclude: ['common']
        }
        /* TODO: add other page modules */
    ]
})
