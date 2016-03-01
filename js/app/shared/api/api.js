define([
  'util/dom', 'jquery', 'sugar',
  'app/shared/api/api-example'
  /* TODO: add all API packages here */
], function (Dom) {

  var prefix = '/api';

  var Api = {
    call: function (apiPackage, apiMethod, urlParams, data, error, loading, synchronousOrSocket) {
      var api = Api.list[apiPackage][apiMethod];

      if (!api) {
        return $.Deferred().reject('Api not found.');
      }

      if ((Api.list[apiPackage].https || api.https) && !Dom.ensureHttps()) {
        return $.Deferred().reject('Must call this api over HTTPS.');
      }

      var url = prefix + (('/' + apiPackage) + (api.url || '')).assign(urlParams);
      var type = (api.type || 'get');

      function onError(data) {
        error(data.responseText || data.statusText);
      }

      function onSuccess() {
        error('');
      }

      function onComplete() {
        loading(false);
      }

      if (loading) {
        loading(true);
      }

      if (Object.isObject(synchronousOrSocket)) {

        var deferred = $.Deferred();

        require(['io'], function (io) {

          if (synchronousOrSocket.subscription) {
            io.socket.on(synchronousOrSocket.subscription.event, synchronousOrSocket.subscription.callback); // CAUTION: don't subscribe more than once
          }

          io.socket[type.toLowerCase()](url, data, function (resData, jwres) {

            if (loading) {
              loading(false);
            }

            var _error = (resData && resData.error) || (jwres && (jwres.error || (jwres.statusCode && !String(jwres.statusCode).startsWith('2') && jwres.statusCode)));
            if (_error) {
              if (error) {
                error(_error);
              }
              deferred.reject(_error, jwres);
            } else {
              if (error) {
                error('');
              }
              deferred.resolve(resData, jwres);
            }

          });

        });

        return deferred;

      } else {

        var ajaxOptions = {
          url: url,
          type: type.toUpperCase()
        };

        if ((type != 'GET') && data) {
          ajaxOptions.data = JSON.stringify(data);
          ajaxOptions.contentType = 'application/json';
        }

        if (synchronousOrSocket) {

          ajaxOptions.async = false;

          if (error) {
            ajaxOptions.error = onError;
            ajaxOptions.success = onSuccess;
          }

          if (loading) {
            ajaxOptions.complete = onComplete;
          }

          return $.ajax(ajaxOptions).responseText;

        } else {

          var ajax = $.ajax(ajaxOptions);

          if (error) {
            ajax.fail(onError);
            ajax.done(onSuccess);
          }

          if (loading) {
            ajax.always(onComplete);
          }

          return ajax;

        }
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
        },
        populate: {
          url: '/{id}/{field}'
        }
      }, arg);
    }
  });

  return Api;

});
