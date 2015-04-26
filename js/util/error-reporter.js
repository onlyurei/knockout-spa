define(['GA', 'jQuery', 'Sugar'], function (GA) {

    var apiUrl = '';
    var additionalInfo = {};

    function makeErrorJson(message, file, line, column, error) {
        return JSON.stringify(Object.findAll(Object.merge({
            message: message || '',
            file: file || '',
            line: line || '',
            column: column || '',
            stack: ((typeof error == 'object') && (error !== null) && error.stack) ? ('' + error.stack) : '',
            href: document.location.href,
            referrer: document.referrer,
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            language: navigator.language,
            timestamp: Date.create().format(Date.ISO8601_DATETIME)
        }, additionalInfo), function (key, value) {
            return !!value;
        }), null, 4);
    }

    window.onerror = function (message, file, line, column, error) {
        if (apiUrl.compact()) {
            try {
                var errorJson = makeErrorJson(message, file, line, column, error);

                $.post(apiUrl, errorJson);

                GA.trackEvent({
                    category: 'error',
                    action: 'javascript',
                    label: errorJson
                });
            } catch (e) {
                if (window.console) {
                    window.console.error(e.message);
                }
            }
        }
    };

    return {
        init: function (_apiUrl) {
            apiUrl = _apiUrl;
        },
        addInfo: function (_additionalInfo) {
            additionalInfo = Object.merge(additionalInfo, _additionalInfo);
        }
    };

});
