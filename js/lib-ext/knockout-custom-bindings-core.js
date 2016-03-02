define(['knockout', 'jquery', 'sugar'], function (ko) {

  ko.bindingHandlers.string = {
    init: function (element, valueAccessor, allBindingsAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
      require(['locale/strings'], function (Strings) {
        var _html = Strings(value, allBindings.tokens);
        var filters = allBindings.filters || null;
        if (filters) {
          filters.split(',').each(function (filter) {
            filter = filter.trim();
            if (filter && Object.isFunction(_html[filter])) {
              _html = _html[filter]();
            }
          });
        }
        if (allBindings.truncate) {
          var charLimit = allBindings.truncate.charLimit;
          var from = allBindings.truncate.from || 'right';
          var ellipsis = allBindings.truncate.ellipsis || '...';
          var onWord = allBindings.truncate.onWord || false;
          if (onWord) {
            _html = _html.truncateOnWord(charLimit, from, ellipsis);
          } else {
            _html = _html.truncate(charLimit, from, ellipsis);

          }
        }
        $(element).html(_html);
      });
    }
  };
  ko.bindingHandlers.string.update = ko.bindingHandlers.string.init;

  /* TODO: add other ko custom bindings */

  return ko;

});
