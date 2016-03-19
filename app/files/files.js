define(['app/shared/api/api', 'ko', 'sugar', 'css!./files.css'], function (Api, ko) {

  var Files = {
    init: function () {
      !Files.files().length && Api.call('file', 'list', null, null, Files.error, Files.loading).done(Files.files);
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
        Files.file(query || 'index.html');
        window.scrollTo(0, 0);
      }
    },
    files: ko.observableArray([]),
    file: ko.observable(''),
    loading: ko.observable(false),
    error: ko.observable('')
  };

  Files.prev = ko.computed(function () {
    var index = Files.files().indexOf(Files.file());
    return (index > 0) ? Files.files()[index - 1] : null;
  });

  Files.next = ko.computed(function () {
    var index = Files.files().indexOf(Files.file());
    return (index < (Files.files().length - 1)) ? Files.files()[index + 1] : null;
  });

  return Files;

});
