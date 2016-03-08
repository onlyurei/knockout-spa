({
  appDir: '.',
  baseUrl: 'js',
  dir: './build',
  skipDirOptimize: false,
  mainConfigFile: 'js/common.js',
  optimize: 'uglify2',
  optimizeCss: 'none',
  pragmasOnSave: {
    excludeRequireCss: false //TODO: if dynamic CSS loading in production will not happen (e.g. load from a CDN), change this to true
  },
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
      name: 'app/files/files',
      exclude: ['common']
    },
    {
      name: 'app/home/home',
      exclude: ['common']
    },
    {
      name: 'app/path/sub-path/sub-path',
      exclude: ['common']
    }
    /* TODO: add other page modules */
  ]
})
