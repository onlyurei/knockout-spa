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
define(['RootBindings', 'PageDisposer', 'Knockout', 'Sugar'], function (RootBindings, PageDisposer, ko) {

    var initialRun = true;

    var Page = {
        init: function (name, data, controller) {
            Page.loading(false);

            name = name.toLowerCase();

            if ((Page.page().name == name) && (Page.page().data == data)) { // if the requested page is the same page, immediately call controller without going further
                if (controller) {
                    controller(data);
                }

                document.title = Page.title();

                if (Page.initExtra) {
                    Page.initExtra(name, data, controller);
                }

                return data;
            }

            var autoDispose = Page.page().data.dispose(Page); // if the requested page is not the same page, dispose current page first before swap to the new page
            if (autoDispose !== false) {
                // auto-dispose page's exposed observables and primitive properties to initial values. if not desired, return false in dispose function to suppress
                // auto-disposal for all public properties of the page, or make the particular properties private
                PageDisposer.dispose(Page.page().data);
            }

            PageDisposer.init(data); //store initial observable and primitive properties values of the page
            var initialized = data.init(Page); // init view model and call controller (optional) before template is swapped-in
            if (initialized === false) {
                return false; // stop initialization if page's init function return false (access control, etc.)
            }
            if (controller) {
                controller(data);
            }

            Page.bodyClass([name.dasherize(), ('ontouchstart' in document.documentElement) ? 'touch' : 'no-touch'].join(' '));
            Page.page({
                name: name,
                data: data
            }); // to test if template finished rendering, use afterRender binding in the template binding

            document.title = Page.title();

            if (Page.initExtra) {
                Page.initExtra(name, data, controller); // useful for common init tasks for all pages such as anaylitics page view tracking, can be set in RootBindings
            }

            if (initialRun) {
                ko.applyBindings(Page, document.getElementsByTagName('html')[0]); // apply binding at root node to be able to bind to anywhere
                initialRun = false;
            }

            return data;
        },
        page: ko.observable({
            name: '', // name of the page - auto-set by the framework, no need to worry
            data: {
                init: function () {}, // preparation before the page's template is rendered, such as checking access control, init/instantiate modules used by the page, etc.
                dispose: function () {} // properly dispose the page to prevent memory leaks and UI leftovers (important for SPA since page doesn't refresh between page views) - remove DOM element event listeners, dispose knockout manual subscriptions, etc.
            }
        }),
        bodyClass: ko.observable(''),
        loading: ko.observable(false),
        title: function () {
            return Page.page().name.titleize(); // override in RootBindings as needed
        }
    };

    Object.merge(Page, RootBindings); // additional root bindings as needed by the app

    return Page;

});
