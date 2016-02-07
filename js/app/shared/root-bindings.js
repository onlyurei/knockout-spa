define([
    'app/shared/url-util', 'util/dom', 'locale/strings', 'util/storage', 'jquery'
    /* TODO: add other root bindings the app needs */
], function (
    UrlUtil, Dom, Strings, Storage) {

    var redirectUrlKey = 'redirectUrl';

    var redirectUrl = Storage.get(redirectUrlKey, false);
    if (redirectUrl) {
        Storage.remove(redirectUrlKey, false);
        window.location = redirectUrl;
    }

    var RootBindings = {
        dom: Dom,
        strings: Strings,
        urlUtil: UrlUtil,
        setRedirectUrl: function (url) {
            Storage.set(redirectUrlKey, url || (window.location.pathname + window.location.search), false);
        }
    };

    return RootBindings;

});
