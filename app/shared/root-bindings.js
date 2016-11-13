define([
  'app/shared/config', 'locale/resources', 'locale/strings', 'util/google-analytics', 'jquery', 'sugar', 'materialize',
  'css!node_modules/materialize-css/dist/css/materialize.css', 'css!./shared.css'
  /* TODO: add other common dependencies and root bindings most pages need (this module is implicitly required by all pages).
   E.g.: swap Materialize UI to other CSS framework such as Bootstrap, Foundation, etc.
   Access root bindings in various templates using $root.<propertyNameOnRootObject>), e.g. $root.strings */
], function (Config, Resources, Strings, GA) {

  // This object will be merged into the object exposed from /framework/page.js and override it
  return {
    config: Config,
    resources: Resources,
    strings: Strings,
    initExtra: function (pageName, pageData, pagePath, pageController) { // useful for common init tasks for all pages
      GA.trackPageView();
      /* TODO: modify to cater your app's needs (called on every page after the page's init handler) */
    },
    afterRenderExtra: function (pageName, pageData, pagePath) { // useful for common afterRender tasks for all pages
    },
    disposeExtra: function (pageName, pageData, pagePath) { // useful for common dispose tasks for all pages
    },
    title: function () {
      var title = this.page.data.title;
      return title ? (Object.isFunction(title) ? title.call(this.page.data) : title) : this.page.name.titleize();
    }
  };

});
