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
