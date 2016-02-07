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
define(['util/json', 'lib/jsface', 'knockout', 'lib/sugar'], function (Json, Class, ko) {

    var Form = Class({
        constructor: function (inputs, submit, initFromQueryString) {
            this.inputs = {};
            if (Object.isObject(inputs)) {
                this.inputs = inputs;
            } else if (Object.isArray(inputs)) {
                inputs.each(function (input) {
                    this.inputs[input.name] = input;
                }.bind(this));
            }

            Object.values(this.inputs).each(function (input) {
                input.form = this;
            }.bind(this));

            if (initFromQueryString) {
                this.fromQueryString();
            }

            this.filled = ko.computed(function () {
                return Object.values(this.inputs).all(function (input) {
                    return !input.required || (input.filled === undefined) || (input.filled === null) || (ko.isObservable(input.filled) && input.filled());
                });
            }.bind(this));

            this.valid = ko.computed(function () {
                return Object.values(this.inputs).all(function (input) {
                    return (input.valid === undefined) || (input.valid === null) || (ko.isObservable(input.valid) && input.valid());
                });
            }.bind(this));

            this.ok = ko.computed(function () {
                return this.filled() && this.valid();
            }.bind(this));

            this.submit = function () {
                if (this.ok()) {
                    submit();
                }
            }.bind(this);

            return this;
        },
        serialize: function (toHash) {
            var queries = {};
            if (toHash) {
                Object.values(this.inputs).each(function (input) {
                    Object.merge(queries, input.serialize(true));
                });
            } else {
                var queryString = Object.values(this.inputs).map(function (input) {
                    return input.serialize();
                }).exclude(function (query) { return !query.compact(); }).join('&');
                queries = Object.fromQueryString(queryString);
            }
            Object.each(queries, function (key, value) {
                if ((value === undefined) || (value === null) || ((typeof value == 'string') && (value.compact() === ''))) {
                    delete queries[key];
                }
            });
            return toHash ? Json.unflatten(queries) : Object.toQueryString(queries);
        },
        deserialize: function (json) {
            Object.each(this.inputs, function (name, input) {
                input.deserialize(json);
            });
            return this.inputs;
        },
        fromQueryString: function (queryString) {
            Object.each(this.inputs, function (name, input) {
                input.fromQueryString(queryString);
            });
            return this.inputs;
        },
        addInput: function (input) {
            if (!this.inputs.hasOwnProperty(input.name)) {
                input.form = this;
                this.inputs[input.name] = input;
                return true;
            }
            return false;
        },
        clear: function () {
            Object.each(this.inputs, function (name, input) {
                input.value('');
            });
        }
    });

    return Form;

});
