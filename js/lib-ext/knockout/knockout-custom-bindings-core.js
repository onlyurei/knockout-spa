define(['Knockout.Raw', 'jQuery', 'Sugar'], function (ko) {

    ko.bindingHandlers.string = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
            require(['Strings'], function (Strings) {
                var _html = Strings(value, allBindings.tokens);
                var filters = allBindings.filters || null;
                if (filters) {
                    filters.split(',').each(function (filter) {
                        filter = filter.trim();
                        if (filter && Object.isFunction(_html[filter])) {
                            _html = _html[filter]();
                        }
                    });
                }
                if (allBindings.truncate) {
                    var charLimit = allBindings.truncate.charLimit;
                    var from = allBindings.truncate.from || 'right';
                    var ellipsis = allBindings.truncate.ellipsis || '...';
                    var onWord = allBindings.truncate.onWord || false;
                    if (onWord) {
                        _html = _html.truncateOnWord(charLimit, from, ellipsis);
                    } else {
                        _html = _html.truncate(charLimit, from, ellipsis);

                    }
                }
                $(element).html(_html);
            });
        }
    };
    ko.bindingHandlers.string.update = ko.bindingHandlers.string.init;

    ko.bindingHandlers.element = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
            allBindings.elementCallback(element, value);
        }
    };
    ko.bindingHandlers.element.update = ko.bindingHandlers.element.init;

    var scrollToElement, scrollToTimestamp, scrollToThrottle = 150;
    ko.bindingHandlers.scrollTo = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
            if (value && (((element == scrollToElement) && ((Date.now() - scrollToTimestamp) > scrollToThrottle)) || (element != scrollToElement))) {
                (function () {
                    var scrollToOptions = allBindings.scrollToOptions || {};
                    var container = scrollToOptions.container || 'html, body';
                    $(container).animate({
                        scrollTop: $(element).offset().top + (scrollToOptions.offset || 0)
                    }, scrollToOptions.duration || 100);
                    scrollToElement = element;
                    scrollToTimestamp = Date.now();
                }).delay(100);
            }
        }
    };
    ko.bindingHandlers.scrollTo.update = ko.bindingHandlers.scrollTo.init;

    ko.bindingHandlers.quantity = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
            require(['Quantities'], function (Quantities) {
                var quantity = Quantities(value + allBindings.quantityUnit);
                if (allBindings.quantityTo) {
                    quantity = quantity.to(allBindings.quantityTo);
                }
                $(element).text(quantity.toPrec(allBindings.quantityPrecision || 0.1).toString());
            });
        }
    };
    ko.bindingHandlers.quantity.update = ko.bindingHandlers.quantity.init;

    return ko;

});
