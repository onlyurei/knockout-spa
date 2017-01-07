/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2017 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['util/google-analytics', 'jquery', 'sugar'], function (GA) {

  var apiUrl = '';
  var additionalInfo = {};

  function makeErrorJson(message, file, line, column, error) {
    return JSON.stringify(Object.findAll(Object.merge({
      message: message || '',
      file: file || '',
      line: line || '',
      column: column || '',
      stack: ((typeof error == 'object') && (error !== null) && error.stack) ? ('' + error.stack) : '',
      href: document.location.href,
      referrer: document.referrer,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timestamp: Date.create().format(Date.ISO8601_DATETIME)
    }, additionalInfo), function (key, value) {
      return !!value;
    }), null, 4);
  }

  window.onerror = function (message, file, line, column, error) {
    try {
      var errorJson = makeErrorJson(message, file, line, column, error);

      GA.trackEvent({
        category: 'error',
        action: 'javascript',
        label: errorJson
      });

      if (apiUrl.compact()) {
        $.post(apiUrl, errorJson);
      }
    } catch (e) {
      if (window.console) {
        window.console.error(e.message);
      }
    }
  };

  return {
    init: function (_apiUrl) {
      apiUrl = _apiUrl;
    },
    addInfo: function (_additionalInfo) {
      additionalInfo = Object.merge(additionalInfo, _additionalInfo);
    }
  };

});
