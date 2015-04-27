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
define(['Class', 'Knockout', 'Sugar'], function (Class, ko) {

    var FormInput = Class({
        constructor: function (name, value, required, validations, submitOnChange, initFromQueryString) {
            this.name = name;
            this.value = ko.isObservable(value) ? value : ko.observable(Object.isFunction(value) ? value() : ((value !== undefined) ? value : ''));
            if (initFromQueryString) {
                this.fromQueryString();
            }
            this.required = required;

            this.filled = ko.computed(function () {
                return !!('' + this.value()).compact();
            }.bind(this));

            this.validations = validations;

            (function () {
                if (submitOnChange) {
                    this.valueChangeSubscription = this.value.subscribe(function () {
                        if (this.form && this.form.submit) {
                            this.form.submit();
                        }
                    }.bind(this));
                }
            }.bind(this)).delay(500);

            if (Object.isArray(validations)) {
                validations.each(function (validation) {
                    validation.error = ko.observable(false);
                });
                this.valid = ko.computed(function () {
                    return !('' + this.value()).compact() || validations.all(function (validation) {
                            if (Object.isRegExp(validation.rule)) {
                                if (validation.rule.test(this.value())) {
                                    validation.error(false);
                                    return true;
                                } else {
                                    validation.error(true);
                                    return false;
                                }
                            } else if (Object.isFunction(validation.rule)) {
                                if (validation.rule(this.value())) {
                                    validation.error(false);
                                    return true;
                                } else {
                                    validation.error(true);
                                    return false;
                                }
                            } else {
                                return false;
                            }
                        }.bind(this));
                }.bind(this));
            } else {
                this.valid = ko.observable(true);
            }

            this.error = ko.computed(function () {
                return !this.valid() ? (validations.find(function (validation) { return validation.error(); }).message) : '';
            }.bind(this));

            this.form = null;

            return this;
        },
        serialize: function (toHash) {
            var sanitizedValue = Object.isString(this.value()) ? this.value().unescapeHTML().removeTags() : this.value();
            if (toHash) {
                var hash = {};
                hash[this.name] = sanitizedValue;
                return hash;
            }
            return this.name + '=' + sanitizedValue;
        },
        deserialize: function (json) {
            if (json.hasOwnProperty(this.name)) {
                if (typeof json[this.name] == 'string') {
                    json[this.name] = json[this.name].replace(/\+/g, ' ');
                }
                this.value(json[this.name]);
            }
        },
        fromQueryString: function (queryString) {
            var queries = Object.fromQueryString(queryString || location.search);
            if (queries.hasOwnProperty(this.name)) {
                this.value(queries[this.name].replace(/\+/g, ' '));
            }
        }
    });

    return FormInput;

});
