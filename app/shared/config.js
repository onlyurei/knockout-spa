define(['util/storage', 'app/shared/api/api', 'ko', 'sugar'], function (
  Storage, Api, ko) {

  var Config = ko.observable({});

  Config.storageKeys = {
    configChanged: 'configChanged',
    locale: 'locale'
  };

  Config.locales = ['en', 'zh-CN'];

  Config.refresh = function () {
    var config = Object.merge({
      locale: Storage.get(Config.storageKeys.locale) || Config.locales[0]
    }, JSON.parse(Api.call('config', 'get', null, null, null, null, true)));
    /* IMPORTANT: use synchronous AJAX as the config is required to boot UI */
    var _config = Config();
    Config(config);
    if (!Object.equal(_config, {}) && !Object.equal(_config, config)) {
      Storage.set(Config.storageKeys.configChanged, Math.random());
      window.location.reload();
    }
  };

  Config.refresh();

  Config.setLocale = function (locale) {
    if (Config.locales.indexOf(locale) > -1) {
      Storage.set(Config.storageKeys.locale, locale);
      Config.refresh();
    } else {
      throw new Error('Unsupported locale:', locale);
    }
  };

  /* TODO: because the user may have multiple tabs open in the same browser, modify the following to handle app global state changes
   to make sure all tabs are in sync (e.g. logout). Using the localStorage on change event to notify app instances across tabs */

  Storage.addEventListener(function (event) {
    if (event.key == Config.storageKeys.configChanged) {
      window.location.reload();
    }
  });

  return Config;

});
