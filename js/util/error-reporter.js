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
define(['util/google-analytics', 'jquery', 'lib/sugar'], function (GA) {

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
