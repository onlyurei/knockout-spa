define(['locale/strings'], function (Strings) {

  return {
    controllers: {
      '/:code': function (code) {
        this.statusCode = code;
      }
    },
    title: function () {
      return Strings('error.' + this.statusCode);
    },
    statusCode: ''
  };

});
