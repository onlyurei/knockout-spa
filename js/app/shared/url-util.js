define(['lib/sugar'], function () {

    var stringRegEx = /(.*?)(?:--|$|\/)/i;
    var invalidStringRegExTest = /[^a-z0-9_\-\s\.]/i;
    var invalidStringRegExReplace = /[^a-z0-9_\-\s\.]/gi;
    var hexStringRegEx = /^\-[0-9A-Fa-f]+$/;

    function stringToHex(string) {
        var hexString = '';
        string = string.encodeBase64();
        for (var i = 0; i < string.length; i++) {
            hexString += string.charCodeAt(i).toString(16);
        }
        return hexString;
    }

    function hexToString(hexString) {
        var string = '';
        if (hexString.length % 2) {
            hexString = '0' + hexString;
        }
        for (var i = 0; i < hexString.length; i += 2) {
            string += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
        }
        return string.decodeBase64();
    }

    function normalize(urlString, escapeToHex) {
        urlString = urlString.compact();
        if (invalidStringRegExTest.test(urlString)) {
            urlString = (escapeToHex === true) ? ('-' + stringToHex(urlString)) : urlString.replace(invalidStringRegExReplace, '');
        }
        return urlString;
    }

    function fromUrl(urlString) {
        if (hexStringRegEx.test(urlString)) {
            urlString = hexToString(urlString.from(1));
        }
        return urlString.replace(/\-/gi, ' ');
    }

    function toUrl(urlString, escapeToHex) {
        return normalize(urlString, escapeToHex).replace(/\s/gi, '-') || '-';
    }

    return {
        regEx: stringRegEx,
        normalize: normalize,
        fromUrl: fromUrl,
        toUrl: toUrl
    };

});
