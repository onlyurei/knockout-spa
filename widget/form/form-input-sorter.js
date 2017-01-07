/*! knockout-spa (https://github.com/onlyurei/knockout-spa) * Copyright 2015-2017 Cheng Fan * MIT Licensed (https://raw.githubusercontent.com/onlyurei/knockout-spa/master/LICENSE) */
define(['widget/form/form-input', 'jsface', 'sugar'], function (FormInput, Class) {

  var FormInputSorter = Class(FormInput, {
    constructor: function (orderByKey, orderDirKey, options, initFromQueryString) {
      FormInputSorter.$super.call(this, 'sorter', '', false, null, true, initFromQueryString);

      this.orderByKey = orderByKey;
      this.orderDirKey = orderDirKey;
      this.options = options.map(function (option) {
        if (option.isDefault) {
          this.value(option);
        }
        return Object.isArray(option.dir) ? option.dir.map(function (dir) {
          return {
            key: option.key,
            dir: dir
          };
        }) : option;
      }.bind(this)).flatten();

      return this;
    },
    serialize: function (toHash) {
      var value = this.value();

      if ((value === undefined) || (value === null) || ((typeof value == 'string') && (value.compact() === '')) || value.isDefault) {
        if (toHash) {
          return {};
        }
        return '';
      }

      if (toHash) {
        var hash = {};
        hash[this.orderByKey] = value.key;
        hash[this.orderDirKey] = value.dir;
        return hash;
      }
      return value.isDefault ? '' : (this.orderByKey + '=' + value.key + '&' + this.orderDirKey + '=' + value.dir);
    },
    deserialize: function (json) {
      var _option = this.options.find(function (option) {
        return (json[this.orderByKey] == option.key) && (json[this.orderDirKey] == option.dir);
      }.bind(this));
      if (_option) {
        this.value(_option);
      }
    },
    fromQueryString: function (queryString) {
      var queries = Object.fromQueryString(queryString || location.search);
      var _option = this.options.find(function (option) {
        return (queries[this.orderByKey] == option.key) && (queries[this.orderDirKey] == option.dir);
      }.bind(this));
      if (_option) {
        this.value(_option);
      }
    }
  });

  return FormInputSorter;

});
