define(['i18n!nls/strings', 'lib/sugar'], function (strings) {

    var string = function (key, tokens) {
        if (!key || !strings) {
            return '';
        }
        var node = strings[key] || '';
        return tokens ? (Object.isArray(tokens) ? String.prototype.assign.apply(node, tokens) : node.assign(tokens)) : node;
    };

    return string;

});
