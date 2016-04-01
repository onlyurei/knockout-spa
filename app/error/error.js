define(['locale/strings', 'ko'], function (Strings, ko) {

  var Page = {
    init: function (code) {
      Page.statusCode(code);
    },
    dispose: function () {},
    controllers: {
      '/:code': function (code) {
        Page.statusCode(code);
      }
    },
    title: function () {
      return Strings('error.' + Page.statusCode());
    },
    statusCode: ko.observable('')
  };

  return Page;

});
