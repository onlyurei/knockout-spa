require.config({
  paths: {
    //lib
    'director': '../node_modules/director/build/director',
    'jquery': '../node_modules/jquery/dist/jquery',
    'jsface': '../node_modules/jsface/dist/jsface',
    'knockout': '../node_modules/knockout/build/output/knockout-latest',
    'knockout-amd-helpers': '../node_modules/knockout-amd-helpers/build/knockout-amd-helpers',
    'i18n': 'lib/require-i18n',
    'text': '../node_modules/requirejs-text/text',
    'sugar': '../node_modules/sugar/release/sugar-full.development',

    //lib-ext
    'ko': 'lib-ext/knockout-extended'
  },
  packages: [
    {
      name: 'css',
      location: '../node_modules/require-css',
      main: 'css.js'
    }
  ],
  shim: {
    'director': {
      exports: 'Router'
    }
  }
});
