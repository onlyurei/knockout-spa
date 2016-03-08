define([
  'jsface', 'ko', 'text!../../template/component/file.html', 'css!../../css/component/file.css', 'jquery', 'sugar'
], function (Class, ko, template) {

  var File = Class({
    constructor: function (params) {
      this.content = ko.observable('');
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
