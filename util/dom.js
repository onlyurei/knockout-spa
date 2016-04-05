define(['jquery', 'sugar'], function () {

  var isIE = null;
  var isIE9AndBelow = null;

  function getOriginFromLocation(location) {
    //IE Fix
    var port = location.port;
    if (((location.protocol == 'http:') && (port == '80')) || ((location.protocol == 'https:') && (port == '443'))) {
      port = '';
    }
    return (location.protocol ? (location.protocol + '//') : '') + (location.hostname || '') + (port ? (':' + port) : '');
  }

  if (!window.location.origin) {
    window.location.origin = getOriginFromLocation(window.location);
  }

  var Dom = {
    getOriginFromLocation: getOriginFromLocation,
    clickLink: function (url, delay) {
      (function () {
        var a = document.createElement('a');
        a.href = url;
        document.body.appendChild(a);
        a.click();
      }).delay((delay > 0) ? delay : 0);
    },
    fakeHttps: true, /* TODO: remove */
    ensureHttps: function () {
      if (Dom.fakeHttps) {
        return true;
      }
      if (window.location.protocol != 'https:') {
        window.location.href = 'https:' + window.location.href.remove(window.location.protocol);
        return false;
      }
      return true;
    },
    selectAllText: function (element) {
      var range;
      if (document.body.createTextRange) { // ms
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
      } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
    isTouchDevice: 'ontouchstart' in document.documentElement,
    isIE: function () {
      if (isIE === null) {
        isIE = navigator.userAgent.indexOf('MSIE') > -1;
      }
      return isIE;
    },
    isIE9AndBelow: function () {
      if (isIE9AndBelow === null) {
        isIE9AndBelow = document.all && !window.atob;
      }
      return isIE9AndBelow;
    }
  };

  return Dom;

});
