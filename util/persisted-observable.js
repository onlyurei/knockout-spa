/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2016 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['util/storage', 'ko'], function (Storage, ko) {

  function unwrapInitialValueFallback(initialValueFallback) {
    if (ko.isObservable(initialValueFallback) || (typeof initialValueFallback == 'function')) {
      return initialValueFallback();
    }
    return initialValueFallback;
  }

  return function (storageKey, initialValueFallback, permanent) {
    var value = Storage.get(storageKey, permanent);
    var observable = ko.observable((value || (typeof value == 'boolean')) ? value : unwrapInitialValueFallback(initialValueFallback));
    return ko.computed({
      read: function () {
        return observable();
      },
      write: function (value) {
        observable(value);
        Storage.set(storageKey, value, permanent);
      }
    });
  };

});
