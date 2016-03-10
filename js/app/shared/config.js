define(['util/storage', /*'director', */'app/shared/api/api', 'ko', 'sugar'], function (
  Storage, /*Router, */Api, ko) {

  var Config = ko.observable({});

  Config.refresh = function () {
    var config = JSON.parse(Api.call('config', 'get', null, null, null, null, true/* IMPORTANT: use synchronous AJAX as the config is required to boot UI */));
    var _config = Config();
    Config(config);
    if (!Object.equal(_config, {}) && !Object.equal(_config, config)) {
      Storage.set(Config.storageKeys.configChanged, Math.random());
    }
  };

  Config.refresh();

  /* TODO: because the user may have multiple tabs open in the same browser, modify the following to handle app global state changes
           to make sure all tabs are in sync (e.g. logout). Using the localStorage on change event to notify app instances  across tabs */
  /*Storage.addEventListener(function (event) {
    if (event.key == Config.storageKeys.configChanged) {
      if (window.location.pathname.toLowerCase().startsWith('/logout')) {
        window.location = '/';
      } else {
        window.location.reload();
      }
    }
  });

  Config.redirectIfNotLoggedIn = function () {
    if (!Config().isLoggedIn) {
      Router().setRoute('/login?url=' + (window.location.pathname + window.location.search).escapeURL(true));
      return true;
    }
    return false;
  };*/

  Config.storageKeys = {
    configChanged: 'configChanged',
    redirectUrl: 'redirectUrl'
  };

  return Config;

});
