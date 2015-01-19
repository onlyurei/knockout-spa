define(['Dom', 'jQuery', 'Sugar',
        'ApiExample'/* TODO add API packages */], function (Dom) {

    var prefix = '/api';

    var Api = {
        call: function (apiPackage, apiMethod, urlParams, data, error, busy, synchronous) {
            var api = Api.list[apiPackage][apiMethod];

            if (api.https && !Dom.ensureHttps()) {
                return;
            }

            var url = prefix + (('/' + apiPackage) + (api.url || '')).assign(urlParams);
            var type = (api.type || 'GET').toUpperCase();

            var ajaxOptions = {
                url: url,
                type: type
            };

            if ((type != 'GET') && data) {
                ajaxOptions.data = JSON.stringify(data);
                ajaxOptions.contentType = 'application/json';
            }


            function onError(data) {
                error(data.responseText || data.statusText);
            }

            function onSuccess() {
                error('');
            }

            function onComplete() {
                busy(false);
            }

            if (synchronous) {
                ajaxOptions.async = false;

                if (error) {
                    ajaxOptions.error = onError;
                    ajaxOptions.success = onSuccess;
                }

                if (busy) {
                    busy(true);
                    ajaxOptions.complete = onComplete;
                }

                return $.ajax(ajaxOptions).responseText;

            } else {
                var ajax = $.ajax(ajaxOptions);

                if (error) {
                    ajax.error(onError);
                    ajax.done(onSuccess);
                }

                if (busy) {
                    busy(true);
                    ajax.always(onComplete);
                }

                return ajax;

            }
        },
        list: {}
    };

    var args = Array.prototype.slice.call(arguments, 0);
    args.each(function (arg) {
        if (Object.isObject(arg) && arg._name) {
            Api.list[arg._name] = Object.merge({
                create: {
                    type: 'POST'
                },
                destroy: {
                    url: '/{id}',
                    type: 'DELETE'
                },
                detail: {
                    url: '/{id}'
                },
                find: {
                    url: '{params}'
                },
                findOne: {
                    url: '/{id}'
                },
                list: {},
                update: {
                    url: '/{id}',
                    type: 'PUT'
                }
            }, arg);
        }
    });

    return Api;

});
