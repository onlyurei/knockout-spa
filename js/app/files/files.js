define(['app/shared/api/api', 'ko', 'sugar'], function (Api, ko) {

  var Files = {
    init: function () {
      Api.call('file', 'list').done(function (files) {
        var allowedFilesRegex = /^\.\/((css)|(font)|(img)|(js)|(template))\//i;
        Files.files(files.remove(function (file) {
          var parts = file.split('/');
          if (parts[parts.length - 1].startsWith('.')) return true;
          if (parts.length === 2) return false;
          return !allowedFilesRegex.test(file);
        }).map(function (file) { return file.remove(/^\.\//) }));
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
