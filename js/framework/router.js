define(['Page', 'Routes', 'Router', 'jQuery', 'Sugar'], function (Page, Routes, Router) {

    function initPage(pageName, callback) {
        var lowerCasePageName = pageName.toLowerCase();
        require([lowerCasePageName.camelize()], function (page) {
            Page.init(lowerCasePageName, page, callback);
        });
    }

    var routes = {};
    Object.each(Routes, function (key, value) {
        var values = value.split(' ');
        var pageName = values[0];
        var controller = values[1];
        routes[key] = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            var callback = controller ? function (page) {
                page.controllers[controller].apply(null, args);
            } : null;
            //controller is always called before page template is rendered (when the page is swapped to), rest assured :)
            initPage(pageName, callback);
        };
    });

    var router = new Router(routes).configure({
        strict: false,
        html5history: true,
        convert_hash_in_init: false,
        notfound: function () {
            routes['/error/404']();
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
            var hash = null;
            if (href.has('#')) {
                hash = href.from(href.indexOf('#'));
                href = href.remove(hash);
            }
            router.setRoute(href);
            if (hash && router.historySupport) {
                (function () {
                    window.location.hash = hash.remove('#');
                }).delay(100);
            }
        }
    });

    return router;

});
