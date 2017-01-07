/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2017 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['sugar'], function () {

  var forbiddenTagNames = ['input', 'textarea'];
  var keyCodes = {
    enter: 13,
    esc: 27,
    left: 37,
    right: 39,
    s: 83
  };

  return function (event, keyName, callback) {
    if (event.keyCode == keyCodes[keyName]) {
      if (forbiddenTagNames.none(event.target.tagName.toLowerCase())) {
        callback();
      }
    }
  };

});
