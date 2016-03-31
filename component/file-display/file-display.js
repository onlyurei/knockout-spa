define([
  'jsface', 'ko', 'text!./file-display.html', 'css!./file-display.css', 'jquery', 'sugar'
], function (Class, ko, template) {

  var ViewModel = Class({
    constructor: function (params) {
      this.content = ko.observable('');
      this.getContent(ko.utils.unwrapObservable(params.url));
      if (ko.isObservable(params.url)) {
        params.url.subscribe(this.getContent.bind(this));
      }
      this.affix = ko.computed(function () {
        var url = ko.utils.unwrapObservable(params.url);
        return url.from(url.lastIndexOf('.')).remove('.')
      });
    },
    getContent: function (url) {
      require(['text!' + url], this.content);
    }
  });

  return {
    viewModel: ViewModel,
    template: template
  };

});
