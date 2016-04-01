define(['app/shared/api/api', 'ko', 'sugar', 'css!./files.css'], function (Api, ko) {

  var Page = {
    init: function () {
      !Page.files().length && Api.call('file', 'list', null, null, Page.error, Page.loading).done(Page.files);
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
        Page.file(query || 'index.html');
        window.scrollTo(0, 0);
      }
    },
    files: ko.observableArray([]),
    file: ko.observable(''),
    loading: ko.observable(false),
    error: ko.observable('')
  };

  Page.prev = ko.computed(function () {
    var index = Page.files().indexOf(Page.file());
    return (index > 0) ? Page.files()[index - 1] : null;
  });

  Page.next = ko.computed(function () {
    var index = Page.files().indexOf(Page.file());
    return (index < (Page.files().length - 1)) ? Page.files()[index + 1] : null;
  });

  return Page;

});
