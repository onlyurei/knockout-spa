define(['jquery', 'sugar'], function () {

  var isIE = null;
  var isIE9AndBelow = null;

  function getOriginFromLocation(location) {
    return location.protocol + '//' + location.hostname + (location.port ? (':' + location.port) : '');
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
    handleSwipe: function (element, callback) {
      if (Dom.isTouchDevice) {
        var swipeDirection,
          distance,
          distanceX,
          distanceY,
          startX,
          startY,
          distanceThreshold = 101, //required min distance traveled to be considered swipe
          restraint = 100, // maximum distance allowed at the same time in perpendicular direction
          allowedTime = 500, // maximum time allowed to travel that distance
          elapsedTime,
          startTime,
          handleSwipe = callback || function () {};

        element.addEventListener('touchstart', function (event) {
          var touchObject = event.changedTouches[0];
          swipeDirection = 'none';
          distance = 0;
          startX = touchObject.pageX;
          startY = touchObject.pageY;
          startTime = new Date().getTime(); // record time when finger first makes contact with surface
          event.preventDefault();

        }, false);

        element.addEventListener('touchmove', function (event) {
          event.preventDefault(); // prevent scrolling when inside DIV
        }, false);

        element.addEventListener('touchend', function (event) {
          var touchObject = event.changedTouches[0];
          distanceX = touchObject.pageX - startX; // get horizontal distance traveled by finger while in contact with
                                                  // surface
          distanceY = touchObject.pageY - startY; // get vertical distance traveled by finger while in contact with
                                                  // surface
          elapsedTime = new Date().getTime() - startTime; // get time elapsed
          if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distanceX) >= distanceThreshold && Math.abs(distanceY) <= restraint) { // 2nd condition for horizontal swipe met
              swipeDirection = (distanceX < 0) ? 'left' : 'right'; // if distance traveled is negative, it indicates
                                                                   // left swipe
            }
            else if (Math.abs(distanceY) >= distanceThreshold && Math.abs(distanceX) <= restraint) { // 2nd condition for vertical swipe met
              swipeDirection = (distanceY < 0) ? 'up' : 'down'; // if distance traveled is negative, it indicates up
                                                                // swipe
            }
          }
          handleSwipe(swipeDirection);
          event.preventDefault();
        }, false);
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
