/** @license The MIT License (MIT) Copyright (c) 2015-2016 Cheng Fan (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
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
