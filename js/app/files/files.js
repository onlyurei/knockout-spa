define(['app/shared/api/api', 'ko', 'sugar'], function (Api, ko) {

  var Files = {
    init: function () {
      Api.call('file', 'list').done(function (files) {
        var unwantedFilesRegex = /^\.|\/\.|(build\/|(node_modules\/))/i;
        Files.files(files.map(function (file) { return file.remove(/^\.\//) }).remove(function (file) {
          return unwantedFilesRegex.test(file);
        }));
      });
      //Api call with full params example:
      //         apiPackage, apiMethod, urlParams,     data,           error,        loading,          synchronousOrSocket
      //Api.call('file',     'example', { id: '123' }, { data: data }, errorHandler, loadingIndicator, true).then(function (data) {
      //  return data;
      //}).done(function (data) { console.log(data); });
    },
    controllers: {
      '/': function () {
        Files.url('/' + Object.fromQueryString(window.location.search).url);
        window.scrollTo(0, 0);
      }
    },
    files: ko.observableArray([]),
    url: ko.observable('')
  };

  return Files;

});
