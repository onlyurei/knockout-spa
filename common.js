require.config({
  paths: {
    //lib
    'cytoscape': 'node_modules/cytoscape/dist/cytoscape',
    'director': 'node_modules/director/build/director',
    'highlightjs': '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min',
    'highlightjs-css': '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min',
    'jquery': 'node_modules/jquery/dist/jquery',
    'jsface': 'node_modules/jsface/dist/jsface',
    'knockout': 'node_modules/knockout/build/output/knockout-latest',
    'knockout-amd-helpers': 'node_modules/knockout-amd-helpers/build/knockout-amd-helpers',
    'marked': 'node_modules/marked/lib/marked',
    'materialize': 'node_modules/materialize-css/dist/js/materialize',
    'i18n': 'lib/require-i18n',
    'text': 'node_modules/requirejs-text/text',
    'sugar': 'node_modules/sugar/release/sugar-full.development',

    //lib-ext
    'ko': 'lib-ext/knockout-extended'
  },
  packages: [
    {
      name: 'css',
      location: 'node_modules/require-css',
      main: 'css.js'
    }
  ],
  shim: {
    'director': {
      exports: 'Router'
    },
    'jsface': {
      exports: 'Class'
    }
  }
});
