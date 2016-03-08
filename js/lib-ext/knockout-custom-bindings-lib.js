define(['knockout', 'jquery'], function (ko) {

  ko.bindingHandlers.showdown = {
    init: function (element, valueAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor());
      require(['showdown'], function (showdown) { //load lib on-demand to improve performance
        var converter = new showdown.Converter();
        $(element).html(converter.makeHtml(value));
      });
    }
  };
  ko.bindingHandlers.showdown.update = ko.bindingHandlers.showdown.init;

  /* TODO: add other third-party lib ko custom bindings */

  return ko;

});
