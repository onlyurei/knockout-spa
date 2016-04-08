define([
  'jsface', 'ko', 'text!./file-display.html', 'css!./file-display.css', 'jquery', 'sugar'
], function (Class, ko, template) {

  var ViewModel = Class({
    constructor: function (params) {
      this.content = '';
      if (ko.isObservable(params.url)) {
        params.url.subscribe(this.getContent.bind(this));
      }
      ko.observe(this);
      var computed = {
        affix: function () {
          var url = ko.utils.unwrapObservable(params.url);
          return url.from(url.lastIndexOf('.')).remove('.')
        }
      };
      Object.each(computed, function (key, value) {
        ko.defineComputedProperty(this, key, value);
      }.bind(this));
      this.getContent(ko.utils.unwrapObservable(params.url));
    },
    getContent: function (url) {
      require(['text!' + url], this._content);
    }
  });

  return {
    viewModel: ViewModel,
    template: template
  };

});
