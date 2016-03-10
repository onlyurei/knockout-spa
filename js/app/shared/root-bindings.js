define([
  'util/dom', 'util/google-analytics', 'jquery',
  'css!../../../node_modules/materialize-css/dist/css/materialize.css',
  'css!../../../css/app/shared/shared.css'
  /* TODO: add other common dependencies and root bindings most pages need (this module is implicitly required by all pages).
     E.g.: swap Materialize UI to other CSS framework such as Bootstrap, Foundation, etc.
     Access root bindings in various templates using $root.<propertyNameOnRootObject>) */
], function (Dom, GA) {

  var RootBindings = {
    dom: Dom,
    initExtra: function () {
      GA.trackPageView();
      /* TODO: modify to cater your app's needs (called on every page after the page's init handler) */
    }
  };

  return RootBindings;

});
