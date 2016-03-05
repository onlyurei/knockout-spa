({
  appDir: '.',
  baseUrl: 'js',
  dir: './build',
  skipDirOptimize: true,
  mainConfigFile: 'js/common.js',
  optimize: 'uglify2',
  optimizeCss: 'none',
  pragmasOnSave: {
    excludeRequireCss: true //TODO: if dynamic CSS loading will happen, change this to false
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
