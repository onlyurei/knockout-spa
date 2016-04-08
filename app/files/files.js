define(['app/shared/api/api', 'ko', 'sugar', 'css!./files.css'], function (Api, ko) {

  var Page = ko.observe({
    init: function () {
      !this.files.length && Api.call('file', 'list', null, null, this._error, this._loading).done(this._files);
      //Api call with full params example:
      //         apiPackage, apiMethod, urlParams,     data,           error,        loading,          synchronousOrSocket
      //Api.call('file',     'example', { id: '123' }, { data: data }, errorHandler, loadingIndicator, true).then(function (data) {
      //  return data;
      //}).done(function (data) { console.log(data); });
    },
    dispose: function () {
      return false; // return false to prevent public primitive/observable params to be reset when leaving the page
    },
    controllers: {
      '/': function () {
        var query = Object.fromQueryString(window.location.search).file;
        this.file = query || 'index.html';
        window.scrollTo(0, 0);
      }
    },
    files: [],
    file: '',
    loading: false,
    error: ''
  });

  var computed = {
    prev: function () {
      var index = this.files.indexOf(this.file);
      return (index > 0) ? this.files[index - 1] : null;
    },
    next: function () {
      var index = this.files.indexOf(this.file);
      return (index < (this.files.length - 1)) ? this.files[index + 1] : null;
    }
  };

  Object.each(computed, function (key, value) {
    ko.defineComputedProperty(Page, key, value);
  });

  return Page;

});
