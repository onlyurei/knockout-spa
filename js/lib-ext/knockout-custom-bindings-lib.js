define(['knockout', 'jquery'], function (ko) {

  ko.bindingHandlers.showdown = {
    init: function (element, valueAccessor, allBindingsAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
      require(['showdown'], function (showdown) { //load lib on-demand to improve performance
        var converter = new showdown.Converter(allBindings.showdownOptions); //use <bindingName>Options as the options object for various third-party lib bindings
        $(element).html(converter.makeHtml(value));
      });
    }
  };
  ko.bindingHandlers.showdown.update = ko.bindingHandlers.showdown.init;

  ko.bindingHandlers.highlight = {
    init: function (element, valueAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor());
      if (value) {
        require([
          '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min.js',
          'css!//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min.css'
        ], function (highlight) { //load lib on-demand to improve performance
          $(element).find('code').each(function (i, block) {
            highlight.highlightBlock(block);
          });
        });
      }
    }
  };
  ko.bindingHandlers.highlight.update = ko.bindingHandlers.highlight.init;

  /* TODO: add other third-party lib ko custom bindings
   * Tip: when to use a ko custom binding, and when to use a ko component?
   *
   * - If the actions are mostly DOM manipulations without the need of a formal data model, such as integrating with
   * jQuery plugins, then it's more convenient, more modular, and lighter-weight to use ko custom bindings. Avoid writing
   * nasty jQuery selectors at any cost - make it a ko custom binding instead, and use the exposed element to replace the
   * selectors.
   * http://knockoutjs.com/documentation/custom-bindings.html
   *
   * - If you are doing more than exposing the element to a DOM manipulation library, consider to use a full fledged ko
   * component instead.
   * http://knockoutjs.com/documentation/component-overview.html
   *
   * You can also use the combination of component and custom binding when appropriate.
   * It's always about writing modular code and separating concerns.
   * See the Files page provided in the boilerplate for reference.
   *
   * */

  return ko;

});
