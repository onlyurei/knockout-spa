/**
 * @license Copyright (c) 2015-2016 Cheng Fan
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
define(['framework/page', 'app/shared/routes', 'director', 'jquery', 'sugar'], function (
  Page, Routes, Router) {

  function initPage(pageModulePath, controller) {
    require([pageModulePath], function (page) {
      var pathParts = pageModulePath.split('/');
      var pageName = pathParts.slice(1, pathParts.length - 1).join('-');
      Page.init(pageName, page, controller, pageModulePath);
    });
  }

  var routes = {};
  Object.each(Routes, function (key, value) {
    var values = value.split(' ');
    var pageModulePath = values[0];
    var controllerName = values[1];
    routes[key] = function () {
      Page.loading(true);
      var args = Array.prototype.slice.call(arguments, 0);
      var controller = controllerName ? function (page) {
        page.controllers[controllerName].apply(null, args);
      } : null;
      initPage(pageModulePath, controller);
    };
  });

  var router = new Router(routes).configure({
    strict: false,
    html5history: true, //TODO change to false to use hash if it's not practical to use HTML5 history api (e.g. no catch-all route on the server side, need to support IE 9 and below, etc.)
    convert_hash_in_init: false,
    notfound: function () {
      routes['/error/:code'](404);
    }
  });

  var urlNotAtRoot = window.location.pathname && (window.location.pathname != '/');

  if (!router.historySupport && urlNotAtRoot) {
    window.location.href = '/#' + (window.location.pathname.startsWith('/') ? '' : '/') + window.location.pathname;
    return;
  }

  if (urlNotAtRoot) {
    router.init();
  } else {
    router.init('/');
  }

  $('body').on('click', 'a[href]', function (event) {
    var href = $(this).attr('href').compact();
    if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') &&
        ($(this).attr('target') != '_blank') && !$(this).data('go') && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      Page.loading(true);
      router.setRoute(href);
    }
  });

  return router;

});
