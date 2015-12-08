define(['Strings', 'knockout'], function (Strings, ko) {

    var Error = {
        init: function (code) {
            Error.statusCode(code);
        },
        dispose: function () {},
        controllers: {
            '/:code': function (code) {
                Error.statusCode(code);
            }
        },
        title: function () {
            return Strings('error.' + Error.statusCode());
        },
        statusCode: ko.observable('')
    };

    return Error;

});
