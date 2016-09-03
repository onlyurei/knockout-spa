({
  appDir: '.',
  baseUrl: '.',
  dir: './build',
  skipDirOptimize: false, //TODO: change to false if you have a pretty comprehensive build modules defined in this file, and want to speed up the build - only files recuirsively referenced in build modules will be optimized
  generateSourceMaps: false, //TODO: change to true if you need source maps generated for easier debugging in production
  mainConfigFile: 'common.js',
  optimize: 'uglify2',
  optimizeCss: 'standard',
  pragmasOnSave: {
    excludeRequireCss: false //TODO: if dynamic CSS loading in production will not happen (e.g. load from a CDN), change this to true
  },
  modules: [
    {
      name: 'common',
      include: [
        'app/shared/root-bindings',
        'framework/router',
        'framework/page',
        'text',
        'css',
        'jsface'
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
      name: 'app/files/dependencies/dependencies',
      exclude: ['common']
    },
    {
      name: 'app/home/home',
      exclude: ['common']
    },
    {
      name: 'app/resources/resources',
      exclude: ['common']
    },
    {
      name: 'component/file-display/file-display',
      exclude: ['common']
    },
    {
      name: 'component/page-source-display/page-source-display',
      exclude: ['common']
    }
    /* TODO: add other page modules and component modules */
  ],
  paths: {
    materialize: 'empty:'
    /* TODO: add any modules you don't want r.js to optimize here with path set to 'empty:',
             mainly for third party modules that would fail r.js optimization */
  }
})
