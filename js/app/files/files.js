define(['app/shared/api/api', 'ko', 'sugar', 'css!../../../css/app/files/files.css'], function (Api, ko) {

  var Files = {
    init: function () {
      Api.call('file', 'list', null, null, Files.error, Files.loading).done(Files.files);
      //Api call with full params example:
      //         apiPackage, apiMethod, urlParams,     data,           error,        loading,          synchronousOrSocket
      //Api.call('file',     'example', { id: '123' }, { data: data }, errorHandler, loadingIndicator, true).then(function (data) {
      //  return data;
      //}).done(function (data) { console.log(data); });
    },
    controllers: {
      '/': function () {
        Files.file('/' + Object.fromQueryString(window.location.search).file);
        window.scrollTo(0, 0);
      }
    },
    files: ko.observableArray([]),
    file: ko.observable(''),
    loading: ko.observable(false),
    error: ko.observable('')
  };

  return Files;

});
