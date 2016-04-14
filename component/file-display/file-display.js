define([
  'jsface', 'ko', 'text!./file-display.html', 'css!./file-display.css', 'jquery', 'sugar'
], function (Class, ko, template) {

  var ViewModel = Class({
    $static: {
      INLINE_TAGS: {
        img: { attr: 'src', affixes: ['gif', 'jpg', 'jpeg', 'png', 'tif', 'tiff'] }
      }
    },
    constructor: function (params) {
      this.content = '';
      if (ko.isObservable(params.url)) {
        params.url.subscribe(this.getContent.bind(this));
      }
      this.inlineTag = '';
      ko.observe(this);
      var url = ko.utils.unwrapObservable(params.url);
      var computed = {
        affix: function () {
          return url.from(url.lastIndexOf('.')).remove('.')
        }
      };
      Object.each(computed, function (key, value) {
        ko.defineComputedProperty(this, key, value);
      }.bind(this));
      this.getContent(url);
    },
    getContent: function (url) {
      var parts = url.toLowerCase().split('.');
      this.inlineTag = Object.find(ViewModel.INLINE_TAGS, function (key, value) {
        return value.affixes.indexOf(parts[parts.length - 1]) >= 0;
      });
      if (this.inlineTag) {
        this.content = '<{inlineTag} {attr}="{url}"></{inlineTag}>'.assign(
          {
            inlineTag: this.inlineTag,
            attr: ViewModel.INLINE_TAGS[this.inlineTag].attr,
            url: url
          }
        );
      } else {
        require(['text!' + url], this._content);
      }
    }
  });

  return {
    viewModel: ViewModel,
    template: template
  };

});
