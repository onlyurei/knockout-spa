/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */
define([], function () {

    var stringRegEx = /(.*?)(?:--|$|\/)/i;
    var invalidStringRegExTest = /[^a-z0-9_\-\s\.]/i;
    var invalidStringRegExReplace = /[^a-z0-9_\-\s\.]/gi;

    function normalize(urlString) {
        if (typeof urlString === 'string') {
            urlString = compact(urlString);
            if (invalidStringRegExTest.test(urlString)) {
                urlString = urlString.replace(invalidStringRegExReplace, '');
            }
        }
        return urlString || '';
    }

    function fromUrl(urlString) {
        return urlString.replace(/\-/gi, ' ');
    }

    function toUrl(urlString) {
        return normalize(urlString).replace(/\s/gi, '-') || '-';
    }

    function compact(input) {
        return input.trim().replace(/([\r\n\s　])+/g, function (match, whitespace) {
            return whitespace === '　' ? whitespace : ' ';
        });
    }

    return {
        regEx: stringRegEx,
        normalize: normalize,
        fromUrl: fromUrl,
        toUrl: toUrl
    };

});
