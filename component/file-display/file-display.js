define([
  'jsface', 'ko', 'text!./file-display.html', 'css!./file-display.css', 'jquery', 'sugar'
], function (Class, ko, template) {

  var FileDisplay = Class({
    constructor: function (params) {
      this.content = ko.observable('');
      this.getContent(params.url());
      params.url.subscribe(this.getContent.bind(this));
      this.affix = ko.computed(function () { return params.url().from(params.url().lastIndexOf('.')).remove('.') });
    },
    getContent: function (url) {
      require(['text!' + url], this.content);
    }
  });

  return {
    viewModel: FileDisplay,
    template: template
  };

});
