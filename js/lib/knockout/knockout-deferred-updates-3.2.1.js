/**
 * @license Deferred Updates plugin for Knockout http://knockoutjs.com/
 * (c) Michael Best, Steven Sanderson
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 * Version 3.2.1
 */

(function(factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        // [1] CommonJS/Node.js
        module.exports = factory(require('knockout'));
    } else if (typeof define === 'function' && define.amd) {
        // [2] AMD anonymous module
        define(['Knockout.Raw'], factory);
    } else {
        // [3] No module loader (plain <script> tag) - ko is directly in global namespace
        factory(ko);
    }
}
(function(ko) {

var g = typeof global === "object" && global ? global : window;
var undefined;

if (!ko) {
    throw Error('Deferred Updates requires Knockout');
}
if (ko.version >= '3.3.0') {
    throw Error('This version of Deferred Updates supports Knockout version 3.2 and lower.');
}

/*
 * Task manager for deferred tasks
 */
ko.tasks = (function() {
    // Use setImmediate functions if available; otherwise use setTimeout
    var setImmediate, clearImmediate;
    if (g.setImmediate) {
        setImmediate = 'setImmediate';
        clearImmediate = 'clearImmediate';
    } else {
        setImmediate = 'setTimeout';
        clearImmediate = 'clearTimeout';
    }

    var evaluatorHandler, taskQueueHead = {}, taskQueueEnd = taskQueueHead, contextStack = [], processingItem, contextStart = taskQueueHead;

    // Begin a new task context. Any tasks that are scheduled during this context will be processed when the context ends
    function startTaskContext() {
        // Save the previous context start in the stack
        contextStack.push(contextStart);
        // Set the new context start to the current task length: any newly scheduled tasks are part of the current context
        contextStart = taskQueueEnd;
    }

    // End the current task context and process any scheduled tasks
    function endTaskContext() {
        try {
            // Process any tasks that were scheduled within this context
            if (contextStart._next)
                processTasks(contextStart);
        } finally {
            // Move back into the previous context
            contextStart = contextStack.pop() || taskQueueHead;
        }
    }

    function processTasks(start) {
        var countProcessed = 0, countMarks = 0;

        // Add a mark to the end of the queue; each one marks the end of a logical group of tasks
        // and the number of these groups is limited to prevent unchecked recursion.
        taskQueueEnd = taskQueueEnd._next = { _mark: true };

        try {
            for (var item = start; item = item._next; ) {
                processingItem = item;
                if (item._mark) {
                    // When we encounter a mark, increment the mark counter and append a new mark to the queue
                    if (item._next) {
                        if (++countMarks >= 5000)
                            throw Error("'Too much recursion' after processing " + countProcessed + " tasks.");
                        taskQueueEnd = taskQueueEnd._next = { _mark: true };
                    }
                } else if (!item._done) {
                    item._done = true;
                    item._func.apply(item.object, item.args || []);
                    ++countProcessed;
                }
            }
        } finally {
            if (start !== taskQueueHead) {
                // Remove the items we've just processed
                start._next = null;
                taskQueueEnd = start;
            } else {
                // Clear the queue, stack and handler
                contextStack = [];
                taskQueueHead._next = null;
                contextStart = taskQueueEnd = taskQueueHead;

                if (evaluatorHandler)
                    g[clearImmediate](evaluatorHandler);
                evaluatorHandler = undefined;
            }
            processingItem = undefined;
        }
        return countProcessed;
    }

    function processAllTasks() {
        // Don't process all tasks if already processing tasks
        if (!processingItem) {
            return processTasks(taskQueueHead);
        }
    }

    function clearDuplicate(evaluator) {
        for (var link = processingItem || contextStart, item; item = link._next; link = item)
            if (item._func === evaluator && !item._done) {
                // remove the item from the queue
                link._next = item._next;
                if (!link._next)
                    taskQueueEnd = link;
                return true;
            }
        return false;
    }

    var tasks = {
        processImmediate: function(evaluator, object, args) {
            startTaskContext();
            try {
                return evaluator.apply(object, args || []);
            } finally {
                endTaskContext();
            }
        },

        processDelayed: function(evaluator, distinct, options) {
            if (arguments.length == 2 && typeof distinct == 'object' ) {
                options = distinct;
                distinct = options.distinct;
            }
            var foundDup = (distinct || distinct === undefined) && clearDuplicate(evaluator);

            var item = options || {};
            item._func = evaluator;

            taskQueueEnd._next = item;
            taskQueueEnd = item;

            if (!contextStack.length && !evaluatorHandler) {
                evaluatorHandler = g[setImmediate](processAllTasks);
            }
            return !foundDup;
        },

        makeProcessedCallback: function(evaluator) {
            return function() {
                return tasks.processImmediate(evaluator, this, arguments);
            }
        }
    };

    ko.processDeferredBindingUpdatesForNode =       // deprecated (included for compatibility)
    ko.processAllDeferredBindingUpdates = function() {
        for (var item = taskQueueHead; item = item._next; ) {
            if (item.node && !item._done) {
                item._done = true;
                item._func.call();
            }
        }
    };

    ko.processAllDeferredUpdates = processAllTasks;

    ko.evaluateAsynchronously = function(evaluator, timeout) {
        return setTimeout(tasks.makeProcessedCallback(evaluator), timeout);
    };

    return tasks;
})();

/*
 * Add ko.utils.objectForEach and ko.utils.objectMap if not present
 */
var ko_utils = ko.utils;
var ko_utils_objectForEach = ko_utils.objectForEach || function(obj, action) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            action(prop, obj[prop]);
        }
    }
};

var ko_utils_objectMap = ko_utils.objectMap || function(source, mapping) {
    if (!source)
        return source;
    var target = {};
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            target[prop] = mapping(source[prop], prop, source);
        }
    }
    return target;
};

var ko_utils_arrayForEach = ko_utils.arrayForEach;

var setPrototypeOfOrExtend =
    ({ __proto__: [] } instanceof Array) ?
        function setPrototypeOf(obj, proto) {
            obj.__proto__ = proto;
            return obj;
        } :
        ko_utils.extend;

// Helper functions for sniffing the minified Knockout code
function findNameMethodSignatureContaining(obj, match) {
    for (var a in obj)
        if (obj.hasOwnProperty(a) && obj[a] && obj[a].toString().indexOf(match) >= 0)
            return a;
}
function findPropertyName(obj, equals) {
    for (var a in obj)
        if (obj.hasOwnProperty(a) && obj[a] === equals)
            return a;
}
function findPropertyNames(obj, equals) {
    var names = [];
    for (var a in obj)
        if (obj.hasOwnProperty(a) && obj[a] === equals)
            names.push(a);
    return names;
}
function findSubObjectWithProperty(obj, prop) {
    for (var a in obj)
        if (obj.hasOwnProperty(a) && obj[a] && obj[a][prop])
            return obj[a];
}


/*
 * Sniff out the names and objects of Knockout internals
 */

// Find ko.dependencyDetection and its methods
var depDet = findSubObjectWithProperty(ko, 'end'),
    depDetIgnoreName = findNameMethodSignatureContaining(depDet, '.apply(') || 'ignore',
    depDetBeginName = findNameMethodSignatureContaining(depDet, '.push'),
    depDetRegisterName = findNameMethodSignatureContaining(depDet, 'Only subscribable'),
    isInitialName = depDet.isInitial ? findPropertyName(depDet, depDet.isInitial) : 'isInitial';

// Find hidden properties and methods of ko.computed and its returned values
// Also find the minified name of ko.computed (so Knockout will also use the new version)
var oldComputed = ko.computed,
    computedNames = findPropertyNames(ko, oldComputed),
    koProtoName = findPropertyName(oldComputed.fn, oldComputed),
    computedProto = ko.computed(function() {}),
    peekName = findPropertyName(computedProto, computedProto.peek) || 'peek',
    isActiveName = findPropertyName(computedProto, computedProto.isActive) || 'isActive',
    getDependenciesCountName = findPropertyName(computedProto, computedProto.getDependenciesCount),
    hasWriteFunctionName = findPropertyName(computedProto, false),
    disposeName = findPropertyName(computedProto, computedProto.dispose),
    disposeWhenNodeIsRemovedName = 'disposeWhenNodeIsRemoved',
    disposeWhenName = 'disposeWhen';

// Find hidden names for disposeWhenNodeIsRemoved and disposeWhen by examining the function source
if (hasWriteFunctionName != 'hasWriteFunction') {
    var oldComputedStr = oldComputed.toString(), match1, match2;
    if (match1 = oldComputedStr.match(/.\.disposeWhenNodeIsRemoved\s*\|\|\s*.\.([^|\s,]+)/))
        disposeWhenNodeIsRemovedName = match1[1];
    if (match2 = oldComputedStr.match(/.\.disposeWhen\s*\|\|\s*.\.([^|\s,]+)/))
        disposeWhenName = match2[1];
}

// Find ko.utils.domNodeIsAttachedToDocument
var nodeInDocName = findNameMethodSignatureContaining(ko_utils, 'documentElement)') || findNameMethodSignatureContaining(ko_utils, 'ocument)');

// Find the name of the ko.subscribable.fn.subscribe function
var subFnObj = ko.subscribable.fn,
    subFnName = findNameMethodSignatureContaining(subFnObj, '.bind('),
    subLimitName = findNameMethodSignatureContaining(subFnObj, 'notifySubscribers');

// Find the name of ko.subscription.dispose
var subscription = new ko.subscribable().subscribe(),
    subscriptionProto = subscription.constructor.prototype,
    subDisposeName = findPropertyName(subscriptionProto, subscription.dispose);
subscription.dispose();
subscription = null;

var rateLimitedBeforeChangeName, rateLimitedChangeName;
if (subLimitName && ko.extenders.rateLimit) {
    var rateLimitedSubscribable = new ko.subscribable().extend({rateLimit:1});
    rateLimitedChangeName = findNameMethodSignatureContaining(rateLimitedSubscribable, '=!0') || '_rateLimitedChange';
    rateLimitedBeforeChangeName = findNameMethodSignatureContaining(rateLimitedSubscribable, '||(') || '_rateLimitedBeforeChange';
    rateLimitedSubscribable = null;
}

var beforeSubscriptionAddName, afterSubscriptionRemoveName;
if (ko.pureComputed) {
    var pComp = ko.pureComputed(function() {});
    beforeSubscriptionAddName = findNameMethodSignatureContaining(pComp, '!1,') || 'beforeSubscriptionAdd';
    afterSubscriptionRemoveName = findNameMethodSignatureContaining(pComp, '()||') || 'afterSubscriptionRemove';
    pComp = null;
}

/*
 * Update dependencyDetection to use an id for each observable
 */
var outerFrames = [],
    currentFrame,
    lastId = 0;
function getId() {
    // The main concern for this method of generating a unique id is that you could eventually
    // overflow the number storage size. In JavaScript, the largest exact integral value
    // is 2^53 or 9,007,199,254,740,992; which seems plenty for any normal application.
    // See http://blog.vjeux.com/2010/javascript/javascript-max_int-number-limits.html
    return ++lastId;
}
depDet[depDetBeginName] = function (options) {
    outerFrames.push(currentFrame);
    currentFrame = options;
};
depDet.end = function () {
    currentFrame = outerFrames.pop();
};
depDet[depDetRegisterName] = function (subscribable) {
    if (currentFrame) {
        if (!ko.isSubscribable(subscribable))
            throw new Error("Only subscribable things can act as dependencies");
        currentFrame.callback(subscribable, subscribable._id || (subscribable._id = getId()));
    }
};
ko.ignoreDependencies = depDet[depDetIgnoreName] = function(callback, callbackTarget, callbackArgs) {
    try {
        depDet[depDetBeginName]();
        return callback.apply(callbackTarget, callbackArgs || []);
    } finally {
        depDet.end();
    }
};
depDet[getDependenciesCountName] = depDet.getDependenciesCount = function () {
    if (currentFrame)
        return currentFrame.computed.getDependenciesCount();
};
depDet[isInitialName] = depDet.isInitial = function() {
    if (currentFrame)
        return currentFrame.isInitial;
};

/*
 * Replace ko.subscribable.fn.subscribe with one where change events are deferred
 */
var oldSubscribe = subFnObj[subFnName];    // Save old subscribe function
subFnObj[subFnName] = subFnObj.subscribe = function (callback, callbackTarget, event, deferUpdates, computed) {
    event = event || 'change';
    var newCallback;
    if (!computed) {
        var boundCallback = callbackTarget ? callback.bind(callbackTarget) : callback;
        if (event != 'change') {
            newCallback = boundCallback;
        } else {
            newCallback = function(valueToNotify) {
                if ((newComputed.deferUpdates && subscription.deferUpdates !== false) || subscription.deferUpdates)
                    ko.tasks.processDelayed(boundCallback, {args: [valueToNotify]});
                else
                    boundCallback(valueToNotify);
            };
        }
    } else {
        newCallback = callback;
        if (event == 'change') {
            this.dependents = this.dependents || [];
            this.dependents.push(computed);
        }
    }
    var subscription = oldSubscribe.call(this, newCallback, null, event);
    subscription.target = this;
    subscription.event = event;
    subscription.dependent = computed;
    subscription.deferUpdates = deferUpdates;
    return subscription;
}
/*
 * Replace ko.subscribable.fn.notifySubscribers with one where dirty and change notifications are deferred
 */
var oldnotifySubscribers = subFnObj.notifySubscribers, notifyQueue;
subFnObj.notifySubscribers = function (valueToNotify, event) {
    if (event === 'change' || event === 'dirty' || event === undefined) {
        if (!notifyQueue) {
            try {
                notifyQueue = [];
                oldnotifySubscribers.call(this, valueToNotify, event);
                if (notifyQueue.length) {
                    for (var i = 0, notifyArgs; notifyArgs = notifyQueue[i]; i++) {
                        Function.prototype.call.apply(oldnotifySubscribers, notifyArgs);
                    }
                }
            } finally {
                notifyQueue = null;
            }
        } else {
            notifyQueue.push([this, valueToNotify, event]);
        }
    } else {
        oldnotifySubscribers.call(this, valueToNotify, event);
    }
};
// Provide a method to return a list of dependents (computed observables that depend on the subscribable)
subFnObj.getDependents = function() {
    return this.dependents ? [].concat(this.dependents) : [];
}
// Update dispose function to clean up pointers to dependents
var oldSubDispose = subscriptionProto[subDisposeName];
subscriptionProto[subDisposeName] = subscriptionProto.dispose = function() {
    oldSubDispose.call(this);
    if (this.dependent && this.event == 'change')
        ko_utils.arrayRemoveItem(this.target.dependents, this.dependent);
}

// Helper function for subscribing to two events for computed observables.
// This returns a single "subscription" object to simplify the computed code.
function subscribeToComputed(target, dirtyCallback, changeCallback, subscriber) {
    var dirtySub = target.subscribe(dirtyCallback, null, 'dirty', false, subscriber),
        changeSub = target.subscribe(changeCallback, null, 'change', false, subscriber);
    return {
        dispose: function() {
            dirtySub.dispose();
            changeSub.dispose();
        },
        target: target
    };
}

/*
 * New ko.computed with support for deferred updates (and other fixes)
 */
var newComputed = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget, options) {
    var _latestValue,
        _previousValue,
        _possiblyNeedsEvaluation = false,
        _needsEvaluation = true,
        _dontEvaluate = false,
        _suppressDisposalUntilDisposeWhenReturnsFalse = false,
        _isDisposed = false,
        readFunction = evaluatorFunctionOrOptions,
        pure = false,
        isSleeping = false;

    if (readFunction && typeof readFunction == 'object') {
        // Single-parameter syntax - everything is on this 'options' param
        options = readFunction;
        readFunction = options.read;
    } else {
        // Multi-parameter syntax - construct the options according to the params passed
        options = options || {};
        if (!readFunction)
            readFunction = options.read;
    }
    if (typeof readFunction != 'function')
        throw Error('Pass a function that returns the value of the ko.computed');

    function addSubscriptionToDependency(subscribable, id) {
        if (!_subscriptionsToDependencies[id]) {
            var subscription;
            if (subscribable[koProtoName] === newComputed) {
                 subscription = subscribeToComputed(subscribable, martAsDirty, markAsChanged, dependentObservable);
            } else {
                subscription = subscribable.subscribe(markAsChanged, null, 'change', false, dependentObservable);
            }
            _subscriptionsToDependencies[id] = subscription;
            _dependenciesCount++;
        }
    }

    function disposeAllSubscriptionsToDependencies() {
        ko_utils_objectForEach(_subscriptionsToDependencies, function (id, subscription) {
            subscription.dispose();
        });
        _subscriptionsToDependencies = {};
    }

    function disposeComputed() {
        disposeAllSubscriptionsToDependencies();
        _dependenciesCount = 0;
        _isDisposed = true;
        ko_utils_arrayForEach(othersToDispose, function (subscription) {
            subscription.dispose();
        });
        othersToDispose = [];
        _possiblyNeedsEvaluation = _needsEvaluation = false;
    }

    function evaluatePossiblyAsync(value, event) {
        var isDirtyEvent = (event == 'dirty');
        var shouldNotify = isDirtyEvent && !_possiblyNeedsEvaluation && !_needsEvaluation;
        if (isDirtyEvent)
            _possiblyNeedsEvaluation = true;
        else
            _needsEvaluation = true;
        var throttleEvaluationTimeout = dependentObservable.throttleEvaluation;
        if (throttleEvaluationTimeout && throttleEvaluationTimeout >= 0) {
            clearTimeout(evaluationTimeoutInstance);
            evaluationTimeoutInstance = ko.evaluateAsynchronously(function() {evaluateImmediate()}, throttleEvaluationTimeout);
        } else if (dependentObservable._evalRateLimited) {
            dependentObservable._evalRateLimited();
        } else if ((newComputed.deferUpdates && dependentObservable.deferUpdates !== false) || dependentObservable.deferUpdates) {
            shouldNotify = ko.tasks.processDelayed(evaluateImmediate, {node: disposeWhenNodeIsRemoved});
        } else if (_needsEvaluation) {
            evaluateImmediate();
            shouldNotify = false;
        }

        if (shouldNotify && dependentObservable.notifySubscribers) {     // notifySubscribers won't exist on first evaluation (but there won't be any subscribers anyway)
            dependentObservable.notifySubscribers(_latestValue, 'dirty');
            if (!_possiblyNeedsEvaluation && throttleEvaluationTimeout)  // The notification might have triggered an evaluation
                clearTimeout(evaluationTimeoutInstance);
        }
    }

    function markAsChanged(value) {
        if (!_possiblyNeedsEvaluation && !_needsEvaluation) {
            evaluatePossiblyAsync(value, 'change');
        } else {
            _needsEvaluation = true;
        }
    }

    function martAsDirty(value) {
        evaluatePossiblyAsync(value, 'dirty');
    }

    function getDependencies() {
        var result = [];
        ko_utils_objectForEach(_subscriptionsToDependencies, function(id, item) {
            result.push(item.target);
        });
        return result;
    }

    function isDisposed() {
        if (_isDisposed) {
            return true;
        }

        if (disposeWhen && disposeWhen()) {
            // See comment below about _suppressDisposalUntilDisposeWhenReturnsFalse
            if (!_suppressDisposalUntilDisposeWhenReturnsFalse) {
                dispose();
                _needsEvaluation = false;
                return true;
            }
        } else {
            // It just did return false, so we can stop suppressing now
            _suppressDisposalUntilDisposeWhenReturnsFalse = false;
        }
    }

    function evaluateImmediate(suppressChangeNotification) {
        if (_dontEvaluate) {
            return;
        }

        if (!_needsEvaluation && !suppressChangeNotification) {
            _possiblyNeedsEvaluation = _needsEvaluation;
            if (!dependentObservable.equalityComparer || !dependentObservable.equalityComparer(_latestValue, _previousValue)) {
                _previousValue = _latestValue;
                dependentObservable.notifySubscribers(_latestValue);
            }
            return;
        }

        // Do not evaluate (and possibly capture new dependencies) if disposed
        if (isDisposed()) {
            return;
        }

        _dontEvaluate = true;

        // When sleeping, recalculate the value and return.
        if (isSleeping) {
            try {
                var dependencyTracking = {};
                depDet[depDetBeginName]({
                    callback: function (subscribable, id) {
                        if (!dependencyTracking[id]) {
                            dependencyTracking[id] = 1;
                            ++_dependenciesCount;
                        }
                    },
                    computed: dependentObservable,
                    isInitial: undefined
                });
                _dependenciesCount = 0;
                dependentObservable._latestValue = _latestValue = readFunction.call(evaluatorFunctionTarget);
            } finally {
                depDet.end();
                _dontEvaluate = false;
            }
        } else {
            try {
                // Initially, we assume that none of the subscriptions are still being used (i.e., all are candidates for disposal).
                // Then, during evaluation, we cross off any that are in fact still being used.
                var disposalCandidates = _subscriptionsToDependencies,
                    disposalCount = _dependenciesCount,
                    isInitial = pure ? undefined : !_dependenciesCount;   // If we're evaluating when there are no previous dependencies, it must be the first time

                depDet[depDetBeginName]({
                    callback: function(subscribable, id) {
                        if (!_isDisposed) {
                            if (disposalCount && disposalCandidates[id]) {
                                // Don't want to dispose this subscription, as it's still being used
                                _subscriptionsToDependencies[id] = disposalCandidates[id];
                                ++_dependenciesCount;
                                delete disposalCandidates[id];
                                --disposalCount;
                            } else {
                                // Brand new subscription - add it
                                addSubscriptionToDependency(subscribable, id);
                            }
                        }
                    },
                    computed: dependentObservable,
                    isInitial: isInitial
                });

                _subscriptionsToDependencies = {};
                _dependenciesCount = 0;

                try {
                    var newValue = evaluatorFunctionTarget ? readFunction.call(evaluatorFunctionTarget) : readFunction();

                } finally {
                    depDet.end();

                    // For each subscription no longer being used, remove it from the active subscriptions list and dispose it
                    if (disposalCount) {
                        ko_utils_objectForEach(disposalCandidates, function(id, toDispose) {
                            toDispose.dispose();
                        });
                    }

                    // For compatibility with Knockout 2.3.0, mark computed as evaluated even if the evaluator threw an exception
                    _possiblyNeedsEvaluation = _needsEvaluation = false;
                }

                if (!dependentObservable.equalityComparer || !dependentObservable.equalityComparer(_latestValue, newValue)) {
                    dependentObservable.notifySubscribers(_latestValue, 'beforeChange');

                    _latestValue = newValue;
                    dependentObservable._latestValue = _latestValue;

                    if (!suppressChangeNotification) {
                        _previousValue = _latestValue;
                        dependentObservable.notifySubscribers(_latestValue);
                    }
                }
                if (isInitial) {
                    _previousValue = _latestValue;
                }
            } finally {
                _dontEvaluate = false;
            }
        }

        if (!_dependenciesCount)
            dispose();
    }

    function evaluateInitial() {
        _dontEvaluate = true;
        try {
            depDet[depDetBeginName]({
                callback: addSubscriptionToDependency,
                computed: dependentObservable,
                isInitial: true
            });
            dependentObservable._latestValue = _latestValue = _previousValue = readFunction.call(evaluatorFunctionTarget);
        } finally {
            depDet.end();
            _needsEvaluation = _dontEvaluate = false;
        }

        if (!_dependenciesCount)
            dispose();
    }

    function dependentObservable() {
        if (arguments.length > 0) {
            if (typeof writeFunction === 'function') {
                // Writing a value
                // Turn off deferred updates for this observable during the write so that the 'write' is registered
                // immediately (assuming that the read function accesses any observables that are written to).
                var saveDeferValue = dependentObservable.deferUpdates;
                dependentObservable.deferUpdates = false;
                try {
                    writeFunction.apply(evaluatorFunctionTarget, arguments);
                } finally {
                    dependentObservable.deferUpdates = saveDeferValue;
                }
            } else {
                throw Error('Cannot write a value to a ko.computed unless you specify a "write" option. If you wish to read the current value, don\'t pass any parameters.');
            }
            return this; // Permits chained assignments
        } else {
            // Reading the value
            depDet[depDetRegisterName](dependentObservable);
            if (_needsEvaluation || _possiblyNeedsEvaluation)
                evaluateImmediate(true /* suppressChangeNotification */);
            return _latestValue;
        }
    }

    function peek() {
        // Peek won't re-evaluate, except to get the initial value when "deferEvaluation" is set, or while the computed is sleeping.
        // Those are the only times that both of these conditions will be satisfied.
        if ((_needsEvaluation || _possiblyNeedsEvaluation) && !_dependenciesCount)
            evaluateImmediate(true /* suppressChangeNotification */);
        return _latestValue;
    }

    function isActive() {
        return _needsEvaluation || _possiblyNeedsEvaluation || _dependenciesCount > 0;
    }

    var activeWhenComputed;
    function activeWhen(obsToWatch) {
        if (!activeWhenComputed) {
            activeWhenComputed = ko.computed(function() {
                _dontEvaluate = !obsToWatch();
                if (!_dontEvaluate && _needsEvaluation) {
                    evaluatePossiblyAsync(undefined, 'change');
                }
            });
            activeWhenComputed.deferUpdates = false;
            othersToDispose.push(activeWhenComputed);
        }
    }

    // By here, "options" is always non-null
    var writeFunction = options.write,
        disposeWhenNodeIsRemoved = options[disposeWhenNodeIsRemovedName] || options.disposeWhenNodeIsRemoved || null,
        disposeWhenOption = options[disposeWhenName] || options.disposeWhen,
        disposeWhen = disposeWhenOption,
        dispose = disposeComputed,
        _subscriptionsToDependencies = {},
        _dependenciesCount = 0,
        othersToDispose = [],
        evaluationTimeoutInstance = null;

    if (!evaluatorFunctionTarget)
        evaluatorFunctionTarget = options.owner;

    // Set properties of returned function
    ko.subscribable.call(dependentObservable);
    setPrototypeOfOrExtend(dependentObservable, newComputed.fn);

    dependentObservable[peekName] = dependentObservable.peek = peek;
    dependentObservable[getDependenciesCountName] = dependentObservable.getDependenciesCount = function () { return _dependenciesCount; };
    dependentObservable[hasWriteFunctionName] = dependentObservable.hasWriteFunction = typeof writeFunction === 'function';
    dependentObservable[disposeName] = dependentObservable.dispose = function () { dispose(); };
    dependentObservable[isActiveName] = dependentObservable.isActive = isActive;
    dependentObservable.activeWhen = activeWhen;
    dependentObservable.getDependencies = getDependencies;

    if (subLimitName) {
        // Replace the limit function with one that delays evaluation as well.
        var originalLimit = dependentObservable[subLimitName];
        dependentObservable[subLimitName] = function(limitFunction) {
            originalLimit.call(dependentObservable, limitFunction);
            dependentObservable._evalRateLimited = function() {
                _possiblyNeedsEvaluation = _needsEvaluation = false;    // Mark as clean (so beforeChange subscribers won't evaluate computed)
                dependentObservable[rateLimitedBeforeChangeName](_latestValue);

                _needsEvaluation = true;    // Mark as dirty

                // Pass the observable to the rate-limit code, which will access it when
                // it's time to do the notification.
                dependentObservable[rateLimitedChangeName](dependentObservable);
            }
        };
    }

    if (beforeSubscriptionAddName) {
        if (options.pure) {
            pure = true;
            isSleeping = true;     // Starts off sleeping; will awake on the first subscription
            dependentObservable[beforeSubscriptionAddName] = function () {
                // If asleep, wake up the computed and evaluate to register any dependencies.
                if (isSleeping) {
                    isSleeping = false;
                    evaluateImmediate(true /* suppressChangeNotification */);
                    _previousValue = _latestValue;
                }
            }
            dependentObservable[afterSubscriptionRemoveName] = function () {
                if (!dependentObservable.getSubscriptionsCount()) {
                    disposeAllSubscriptionsToDependencies();
                    isSleeping = _needsEvaluation = true;
                    _previousValue = undefined;
                }
            }
        } else if (options.deferEvaluation) {
            // This will force a computed with deferEvaluation to evaluate when the first subscriptions is registered.
            dependentObservable[beforeSubscriptionAddName] = function () {
                peek();
                delete dependentObservable[beforeSubscriptionAddName];
            }
        }
    }

    // Add a "disposeWhen" callback that, on each evaluation, disposes if the node was removed without using ko.removeNode.
    if (disposeWhenNodeIsRemoved) {
        // Since this computed is associated with a DOM node, and we don't want to dispose the computed
        // until the DOM node is *removed* from the document (as opposed to never having been in the document),
        // we'll prevent disposal until "disposeWhen" first returns false.
        _suppressDisposalUntilDisposeWhenReturnsFalse = true;

        // Only watch for the node's disposal if the value really is a node. It might not be,
        // e.g., { disposeWhenNodeIsRemoved: true } can be used to opt into the "only dispose
        // after first false result" behaviour even if there's no specific node to watch. This
        // technique is intended for KO's internal use only and shouldn't be documented or used
        // by application code, as it's likely to change in a future version of KO.
        if (disposeWhenNodeIsRemoved.nodeType) {
            disposeWhen = function () {
                return !ko_utils[nodeInDocName](disposeWhenNodeIsRemoved) || (disposeWhenOption && disposeWhenOption());
            };
        }
    }

    // Evaluate, unless sleeping or deferEvaluation is true
    if (!isDisposed() && !isSleeping && !options.deferEvaluation)
        evaluateInitial();

    // Attach a DOM node disposal callback so that the computed will be proactively disposed as soon as the node is
    // removed using ko.removeNode. But skip if isActive is false (there will never be any dependencies to dispose).
    if (disposeWhenNodeIsRemoved && isActive() && disposeWhenNodeIsRemoved.nodeType) {
        dispose = function() {
            ko_utils.domNodeDisposal.removeDisposeCallback(disposeWhenNodeIsRemoved, dispose);
            disposeComputed();
        };
        ko_utils.domNodeDisposal.addDisposeCallback(disposeWhenNodeIsRemoved, dispose);
    }

    return dependentObservable;
};

// Set ko.computed properties
newComputed[koProtoName] = oldComputed[koProtoName];
newComputed.fn = oldComputed.fn;
newComputed.fn[koProtoName] = newComputed;
newComputed.deferUpdates = true;

// Make all pointers to ko.computed point to the new one
ko_utils_arrayForEach(computedNames, function(name) {
    ko[name] = newComputed;
});

// Clear objects references we don't need anymore
oldComputed = computedProto = null;

/*
 * New throttle extender
 */
ko.extenders.throttle = function(target, timeout) {
    // Throttling means two things:

    if (ko.isWriteableObservable(target)) {
        // (1) For writable targets (observables, or writable dependent observables), we throttle *writes*
        //     so the target cannot change value synchronously or faster than a certain rate
        var writeTimeoutInstance = null;
        return ko.computed({
            read: target,
            write: function(value) {
                clearTimeout(writeTimeoutInstance);
                writeTimeoutInstance = ko.evaluateAsynchronously(function() {
                    target(value);
                }, timeout);
            }
        });
    } else {
        // (2) For dependent observables, we throttle *evaluations* so that, no matter how fast its dependencies
        //     notify updates, the target doesn't re-evaluate (and hence doesn't notify) faster than a certain rate
        target.throttleEvaluation = timeout;
        return target;
    }
};

/*
 * Add deferred extender
 */
ko.extenders.deferred = function(target, value) {
    target.deferUpdates = value;
};

return ko;

}));
