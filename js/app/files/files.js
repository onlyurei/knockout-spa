define(['app/shared/api/api', 'ko', 'sugar'], function (Api, ko) {

  var Files = {
    init: function () {
      Api.call('file', 'list').done(function (files) {
        var unwantedFilesRegex = /^\.|\/\.|(^build\/|(^node_modules\/))/i;
        Files.files(files.map(function (file) { return file.remove(/^\.\//) }).remove(function (file) {
          return unwantedFilesRegex.test(file);
        }));
      });
    },
    controllers: {
      '/': function () {
        Files.url('/' + Object.fromQueryString(window.location.search).url);
      }
    },
    files: ko.observableArray([]),
    url: ko.observable('')
  };

  return Files;

});
