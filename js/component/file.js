define([
  '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min.js', 'jsface', 'ko',
  'text!../../template/component/file.html',
  'css!//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/default.min.css', 'css!../../css/component/file.css',
  'jquery', 'sugar'
], function (highlight, Class, ko, template) {

  var File = Class({
    constructor: function (params) {
      this.content = ko.observable('');
      this.id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      this.getContent(params.url());
      params.url.subscribe(this.getContent.bind(this));
      this.affix = ko.computed(function () { return params.url().from(params.url().lastIndexOf('.')).remove('.') });
    },
    getContent: function (url) {
      require(['text!' + url], function (file) {
        this.content(file);
        $('file pre#{id} code'.assign({ id: this.id })).each(function (i, block) {
          highlight.highlightBlock(block);
        });
      }.bind(this));
    }
  });

  return {
    viewModel: File,
    template: template
  };

});
