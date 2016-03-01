/**
 * @license Copyright (c) 2015 Cheng Fan
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
