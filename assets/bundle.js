(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('preact'), require('redux')) :
	typeof define === 'function' && define.amd ? define(['preact', 'redux'], factory) :
	(global.preactRedux = factory(global.preact,global.Redux));
}(this, (function (preact,redux) {

var Children = {
	only: function only(children) {
		return children && children[0] || null;
	}
};

function proptype() {}
proptype.isRequired = proptype;

var PropTypes = {
	element: proptype,
	func: proptype,
	shape: function shape() {
		return proptype;
	},
	instanceOf: function instanceOf() {
		return proptype;
	}
};

var subscriptionShape = PropTypes.shape({
  trySubscribe: PropTypes.func.isRequired,
  tryUnsubscribe: PropTypes.func.isRequired,
  notifyNestedSubs: PropTypes.func.isRequired,
  isSubscribed: PropTypes.func.isRequired
});

var storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  warning('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      classCallCheck(this, Provider);

      var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return Children.only(this.props.children);
    };

    return Provider;
  }(preact.Component);

  {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = storeShape.isRequired, _Provider$childContex[subscriptionKey] = subscriptionShape, _Provider$childContex);

  return Provider;
}

var Provider = createProvider();

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var defineProperty$1 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

var hoistNonReactStatics = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty$1(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};

var invariant = function () {};

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get$$1() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();

var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = storeShape, _contextTypes[subscriptionKey] = subscriptionShape, _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = subscriptionShape, _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    invariant(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      inherits(Connect, _Component);

      function Connect(props, context) {
        classCallCheck(this, Connect);

        var _this = possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        invariant(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        invariant(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return preact.h(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(preact.Component);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;


    {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return hoistNonReactStatics(Connect, WrappedComponent);
  };
}

var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var _Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
    if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      verifyPlainObject(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && (typeof mapDispatchToProps === 'undefined' ? 'undefined' : _typeof(mapDispatchToProps)) === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return redux.bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}

var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}

var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      warning('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? shallowEqual : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? shallowEqual : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? shallowEqual : _ref2$areMergedPropsE,
        extraOptions = objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

var connect = createConnect();

var index = { Provider: Provider, connect: connect, connectAdvanced: connectAdvanced };

return index;

})));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"preact":2,"redux":9}],2:[function(require,module,exports){
!function() {
    'use strict';
    function VNode() {}
    function h(nodeName, attributes) {
        var lastSimple, child, simple, i, children = EMPTY_CHILDREN;
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && null != attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) && void 0 !== child.pop) for (i = child.length; i--; ) stack.push(child[i]); else {
            if ('boolean' == typeof child) child = null;
            if (simple = 'function' != typeof nodeName) if (null == child) child = ''; else if ('number' == typeof child) child = String(child); else if ('string' != typeof child) simple = !1;
            if (simple && lastSimple) children[children.length - 1] += child; else if (children === EMPTY_CHILDREN) children = [ child ]; else children.push(child);
            lastSimple = simple;
        }
        var p = new VNode();
        p.nodeName = nodeName;
        p.children = children;
        p.attributes = null == attributes ? void 0 : attributes;
        p.key = null == attributes ? void 0 : attributes.key;
        if (void 0 !== options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        for (var i in props) obj[i] = props[i];
        return obj;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function enqueueRender(component) {
        if (!component.__d && (component.__d = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p.__d) renderComponent(p);
    }
    function isSameNodeType(node, vnode, hydrating) {
        if ('string' == typeof vnode || 'number' == typeof vnode) return void 0 !== node.splitText;
        if ('string' == typeof vnode.nodeName) return !node._componentConstructor && isNamedNode(node, vnode.nodeName); else return hydrating || node._componentConstructor === vnode.nodeName;
    }
    function isNamedNode(node, nodeName) {
        return node.__n === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
    }
    function getNodeProps(vnode) {
        var props = extend({}, vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (void 0 !== defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function createNode(nodeName, isSvg) {
        var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
        node.__n = nodeName;
        return node;
    }
    function removeNode(node) {
        var parentNode = node.parentNode;
        if (parentNode) parentNode.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('key' === name) ; else if ('ref' === name) {
            if (old) old(null);
            if (value) value(node);
        } else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || 'string' == typeof value || 'string' == typeof old) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if ('string' != typeof old) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !1 === IS_NON_DIMENSIONAL.test(i) ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var useCapture = name !== (name = name.replace(/Capture$/, ''));
            name = name.toLowerCase().substring(2);
            if (value) {
                if (!old) node.addEventListener(name, eventProxy, useCapture);
            } else node.removeEventListener(name, eventProxy, useCapture);
            (node.__l || (node.__l = {}))[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || !1 === value) node.removeAttribute(name);
        } else {
            var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));
            if (null == value || !1 === value) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); else node.removeAttribute(name); else if ('function' != typeof value) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this.__l[e.type](options.event && options.event(e) || e);
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = null != parent && void 0 !== parent.ownerSVGElement;
            hydrating = null != dom && !('__preactattr_' in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll, componentRoot);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll, componentRoot) {
        var out = dom, prevSvgMode = isSvgMode;
        if (null == vnode || 'boolean' == typeof vnode) vnode = '';
        if ('string' == typeof vnode || 'number' == typeof vnode) {
            if (dom && void 0 !== dom.splitText && dom.parentNode && (!dom._component || componentRoot)) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                out = document.createTextNode(vnode);
                if (dom) {
                    if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                    recollectNodeTree(dom, !0);
                }
            }
            out.__preactattr_ = !0;
            return out;
        }
        var vnodeName = vnode.nodeName;
        if ('function' == typeof vnodeName) return buildComponentFromVNode(dom, vnode, context, mountAll);
        isSvgMode = 'svg' === vnodeName ? !0 : 'foreignObject' === vnodeName ? !1 : isSvgMode;
        vnodeName = String(vnodeName);
        if (!dom || !isNamedNode(dom, vnodeName)) {
            out = createNode(vnodeName, isSvgMode);
            if (dom) {
                while (dom.firstChild) out.appendChild(dom.firstChild);
                if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
                recollectNodeTree(dom, !0);
            }
        }
        var fc = out.firstChild, props = out.__preactattr_, vchildren = vnode.children;
        if (null == props) {
            props = out.__preactattr_ = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && null != fc && void 0 !== fc.splitText && null == fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || null != fc) innerDiffNode(out, vchildren, context, mountAll, hydrating || null != props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
        var j, c, f, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren ? vchildren.length : 0;
        if (0 !== len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child.__preactattr_, key = vlen && props ? _child._component ? _child._component.__k : props.key : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (props || (void 0 !== _child.splitText ? isHydrating ? _child.nodeValue.trim() : !0 : isHydrating)) children[childrenLen++] = _child;
        }
        if (0 !== vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && void 0 !== keyed[key]) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) if (void 0 !== children[j] && isSameNodeType(c = children[j], vchild, isHydrating)) {
                child = c;
                children[j] = void 0;
                if (j === childrenLen - 1) childrenLen--;
                if (j === min) min++;
                break;
            }
            child = idiff(child, vchild, context, mountAll);
            f = originalChildren[i];
            if (child && child !== dom && child !== f) if (null == f) dom.appendChild(child); else if (child === f.nextSibling) removeNode(f); else dom.insertBefore(child, f);
        }
        if (keyedLen) for (var i in keyed) if (void 0 !== keyed[i]) recollectNodeTree(keyed[i], !1);
        while (min <= childrenLen) if (void 0 !== (child = children[childrenLen--])) recollectNodeTree(child, !1);
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component); else {
            if (null != node.__preactattr_ && node.__preactattr_.ref) node.__preactattr_.ref(null);
            if (!1 === unmountOnly || null == node.__preactattr_) removeNode(node);
            removeChildren(node);
        }
    }
    function removeChildren(node) {
        node = node.lastChild;
        while (node) {
            var next = node.previousSibling;
            recollectNodeTree(node, !0);
            node = next;
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if ((!attrs || null == attrs[name]) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name;
        (components[name] || (components[name] = [])).push(component);
    }
    function createComponent(Ctor, props, context) {
        var inst, list = components[Ctor.name];
        if (Ctor.prototype && Ctor.prototype.render) {
            inst = new Ctor(props, context);
            Component.call(inst, props, context);
        } else {
            inst = new Component(props, context);
            inst.constructor = Ctor;
            inst.render = doRender;
        }
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.__b = list[i].__b;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function doRender(props, state, context) {
        return this.constructor(props, context);
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component.__x) {
            component.__x = !0;
            if (component.__r = props.ref) delete props.ref;
            if (component.__k = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.__c) component.__c = component.context;
                component.context = context;
            }
            if (!component.__p) component.__p = component.props;
            component.props = props;
            component.__x = !1;
            if (0 !== opts) if (1 === opts || !1 !== options.syncComponentUpdates || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__r) component.__r(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component.__x) {
            var rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.__p || props, previousState = component.__s || state, previousContext = component.__c || context, isUpdate = component.base, nextBase = component.__b, initialBase = isUpdate || nextBase, initialChildComponent = component._component, skip = !1;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && !1 === component.shouldComponentUpdate(props, state, context)) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.__p = component.__s = component.__c = component.__b = null;
            component.__d = !1;
            if (!skip) {
                rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(extend({}, context), component.getChildContext());
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if ('function' == typeof childComponent) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__k) setComponentProps(inst, childProps, 1, context, !1); else {
                        toUnmount = inst;
                        component._component = inst = createComponent(childComponent, childProps, context);
                        inst.__b = inst.__b || nextBase;
                        inst.__u = component;
                        setComponentProps(inst, childProps, 0, context, !1);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase, !1);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t.__u) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            if (null != component.__h) while (component.__h.length) component.__h.pop().call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, originalComponent = c, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c.__u)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.__b) {
                c.__b = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom, !1);
            }
        }
        return dom;
    }
    function unmountComponent(component) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component.__x = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner); else if (base) {
            if (base.__preactattr_ && base.__preactattr_.ref) base.__preactattr_.ref(null);
            component.__b = base;
            removeNode(base);
            collectComponent(component);
            removeChildren(base);
        }
        if (component.__r) component.__r(null);
    }
    function Component(props, context) {
        this.__d = !0;
        this.context = context;
        this.props = props;
        this.state = this.state || {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent, !1);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var defer = 'function' == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
    var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
    var items = [];
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        setState: function(state, callback) {
            var s = this.state;
            if (!this.__s) this.__s = extend({}, s);
            extend(s, 'function' == typeof state ? state(s, this.props) : state);
            if (callback) (this.__h = this.__h || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function(callback) {
            if (callback) (this.__h = this.__h || []).push(callback);
            renderComponent(this, 2);
        },
        render: function() {}
    });
    var preact = {
        h: h,
        createElement: h,
        cloneElement: cloneElement,
        Component: Component,
        render: render,
        rerender: rerender,
        options: options
    };
    if ('undefined' != typeof module) module.exports = preact; else self.preact = preact;
}();

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
	var _class, _temp2;

	var Component = _ref.Component,
	    createElement = _ref.createElement;
	return _temp2 = _class = function (_Component) {
		_inherits(ReactHint, _Component);

		function ReactHint() {
			var _temp, _this, _ret;

			_classCallCheck(this, ReactHint);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { target: null }, _this._containerStyle = { position: 'relative' }, _this.toggleEvents = function (_ref2, flag) {
				var events = _ref2.events,
				    _ref2$events = _ref2.events,
				    click = _ref2$events.click,
				    focus = _ref2$events.focus,
				    hover = _ref2$events.hover;

				var action = flag ? 'addEventListener' : 'removeEventListener';
				var hasEvents = events === true;(click || hasEvents) && document[action]('click', _this.toggleHint);(focus || hasEvents) && document[action]('focusin', _this.toggleHint);(hover || hasEvents) && document[action]('mouseover', _this.toggleHint);(click || hover || hasEvents) && document[action]('touchend', _this.toggleHint);
			}, _this.toggleHint = function () {
				var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
				    _ref3$target = _ref3.target,
				    target = _ref3$target === undefined ? null : _ref3$target;

				clearTimeout(_this._timeout);
				_this._timeout = setTimeout(function () {
					return _this.setState(function () {
						return {
							target: _this.getHint(target)
						};
					});
				}, _this.props.delay);
			}, _this.getHint = function (el) {
				var _this$props = _this.props,
				    attribute = _this$props.attribute,
				    persist = _this$props.persist;
				var target = _this.state.target;


				while (el) {
					if (el === document) break;
					if (persist && el === _this._hint) return target;
					if (el.hasAttribute(attribute)) return el;
					el = el.parentNode;
				}return null;
			}, _this.shallowEqual = function (a, b) {
				var keys = Object.keys(a);
				return keys.length === Object.keys(b).length && keys.reduce(function (result, key) {
					return result && (typeof a[key] === 'function' && typeof b[key] === 'function' || a[key] === b[key]);
				}, true);
			}, _this.getHintData = function (_ref4, _ref5) {
				var target = _ref4.target;
				var attribute = _ref5.attribute,
				    autoPosition = _ref5.autoPosition,
				    position = _ref5.position;

				var content = target.getAttribute(attribute) || '';
				var at = target.getAttribute(attribute + '-at') || position;

				var _this$_container$getB = _this._container.getBoundingClientRect(),
				    containerTop = _this$_container$getB.top,
				    containerLeft = _this$_container$getB.left;

				var _this$_hint$getBoundi = _this._hint.getBoundingClientRect(),
				    hintWidth = _this$_hint$getBoundi.width,
				    hintHeight = _this$_hint$getBoundi.height;

				var _target$getBoundingCl = target.getBoundingClientRect(),
				    targetTop = _target$getBoundingCl.top,
				    targetLeft = _target$getBoundingCl.left,
				    targetWidth = _target$getBoundingCl.width,
				    targetHeight = _target$getBoundingCl.height;

				if (autoPosition) {
					var isHoriz = ['left', 'right'].includes(at);

					var _document$documentEle = document.documentElement,
					    clientHeight = _document$documentEle.clientHeight,
					    clientWidth = _document$documentEle.clientWidth;


					var directions = {
						left: (isHoriz ? targetLeft - hintWidth : targetLeft + (targetWidth - hintWidth >> 1)) > 0,
						right: (isHoriz ? targetLeft + targetWidth + hintWidth : targetLeft + (targetWidth + hintWidth >> 1)) < clientWidth,
						bottom: (isHoriz ? targetTop + (targetHeight + hintHeight >> 1) : targetTop + targetHeight + hintHeight) < clientHeight,
						top: (isHoriz ? targetTop - (hintHeight >> 1) : targetTop - hintHeight) > 0
					};

					switch (at) {
						case 'left':
							if (!directions.left) at = 'right';
							if (!directions.top) at = 'bottom';
							if (!directions.bottom) at = 'top';
							break;

						case 'right':
							if (!directions.right) at = 'left';
							if (!directions.top) at = 'bottom';
							if (!directions.bottom) at = 'top';
							break;

						case 'bottom':
							if (!directions.bottom) at = 'top';
							if (!directions.left) at = 'right';
							if (!directions.right) at = 'left';
							break;

						case 'top':
						default:
							if (!directions.top) at = 'bottom';
							if (!directions.left) at = 'right';
							if (!directions.right) at = 'left';
							break;
					}
				}

				var top = void 0,
				    left = void 0;
				switch (at) {
					case 'left':
						top = targetHeight - hintHeight >> 1;
						left = -hintWidth;
						break;

					case 'right':
						top = targetHeight - hintHeight >> 1;
						left = targetWidth;
						break;

					case 'bottom':
						top = targetHeight;
						left = targetWidth - hintWidth >> 1;
						break;

					case 'top':
					default:
						top = -hintHeight;
						left = targetWidth - hintWidth >> 1;
				}

				return {
					content: content, at: at,
					top: top + targetTop - containerTop | 0,
					left: left + targetLeft - containerLeft | 0
				};
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		ReactHint.prototype.componentDidMount = function componentDidMount() {
			this.toggleEvents(this.props, true);
		};

		ReactHint.prototype.componentWillUnmount = function componentWillUnmount() {
			this.toggleEvents(this.props, false);
			clearTimeout(this._timeout);
		};

		ReactHint.prototype.shouldComponentUpdate = function shouldComponentUpdate(props, state) {
			return !this.shallowEqual(state, this.state) || !this.shallowEqual(props, this.props);
		};

		ReactHint.prototype.componentDidUpdate = function componentDidUpdate() {
			if (this.state.target) this.setState(this.getHintData);
		};

		ReactHint.prototype.render = function render() {
			var _this2 = this;

			var _props = this.props,
			    className = _props.className,
			    onRenderContent = _props.onRenderContent;
			var _state = this.state,
			    target = _state.target,
			    content = _state.content,
			    at = _state.at,
			    top = _state.top,
			    left = _state.left;


			return createElement(
				'div',
				{ ref: function ref(_ref7) {
						return _this2._container = _ref7;
					},
					style: this._containerStyle },
				target && createElement(
					'div',
					{ className: className + ' ' + className + '--' + at,
						ref: function ref(_ref6) {
							return _this2._hint = _ref6;
						},
						style: { top: top, left: left } },
					onRenderContent ? onRenderContent(target, content) : createElement(
						'div',
						{ className: className + '__content' },
						content
					)
				)
			);
		};

		return ReactHint;
	}(Component), _class.defaultProps = {
		attribute: 'data-rh',
		autoPosition: false,
		className: 'react-hint',
		delay: 0,
		events: false,
		onRenderContent: null,
		persist: false,
		position: 'top'
	}, _temp2;
};

module.exports = exports['default'];
},{}],5:[function(require,module,exports){
(function (global){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.reduxLogger=e.reduxLogger||{})}(this,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function r(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function n(e,t,r){n.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function o(e,t){o.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function f(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function u(e){var t="undefined"==typeof e?"undefined":N(e);return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function l(e,t,r,c,s,d,p){s=s||[],p=p||[];var g=s.slice(0);if("undefined"!=typeof d){if(c){if("function"==typeof c&&c(g,d))return;if("object"===("undefined"==typeof c?"undefined":N(c))){if(c.prefilter&&c.prefilter(g,d))return;if(c.normalize){var h=c.normalize(g,d,e,t);h&&(e=h[0],t=h[1])}}}g.push(d)}"regexp"===u(e)&&"regexp"===u(t)&&(e=e.toString(),t=t.toString());var y="undefined"==typeof e?"undefined":N(e),v="undefined"==typeof t?"undefined":N(t),b="undefined"!==y||p&&p[p.length-1].lhs&&p[p.length-1].lhs.hasOwnProperty(d),m="undefined"!==v||p&&p[p.length-1].rhs&&p[p.length-1].rhs.hasOwnProperty(d);if(!b&&m)r(new o(g,t));else if(!m&&b)r(new i(g,e));else if(u(e)!==u(t))r(new n(g,e,t));else if("date"===u(e)&&e-t!==0)r(new n(g,e,t));else if("object"===y&&null!==e&&null!==t)if(p.filter(function(t){return t.lhs===e}).length)e!==t&&r(new n(g,e,t));else{if(p.push({lhs:e,rhs:t}),Array.isArray(e)){var w;e.length;for(w=0;w<e.length;w++)w>=t.length?r(new a(g,w,new i(void 0,e[w]))):l(e[w],t[w],r,c,g,w,p);for(;w<t.length;)r(new a(g,w,new o(void 0,t[w++])))}else{var x=Object.keys(e),S=Object.keys(t);x.forEach(function(n,o){var i=S.indexOf(n);i>=0?(l(e[n],t[n],r,c,g,n,p),S=f(S,i)):l(e[n],void 0,r,c,g,n,p)}),S.forEach(function(e){l(void 0,t[e],r,c,g,e,p)})}p.length=p.length-1}else e!==t&&("number"===y&&isNaN(e)&&isNaN(t)||r(new n(g,e,t)))}function c(e,t,r,n){return n=n||[],l(e,t,function(e){e&&n.push(e)},r),n.length?n:void 0}function s(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":s(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":s(e[t],r.index,r.item);break;case"D":e=f(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function d(e,t,r){if(e&&t&&r&&r.kind){for(var n=e,o=-1,i=r.path?r.path.length-1:0;++o<i;)"undefined"==typeof n[r.path[o]]&&(n[r.path[o]]="number"==typeof r.path[o]?[]:{}),n=n[r.path[o]];switch(r.kind){case"A":s(r.path?n[r.path[o]]:n,r.index,r.item);break;case"D":delete n[r.path[o]];break;case"E":case"N":n[r.path[o]]=r.rhs}}}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":o[r.path[n]]=r.lhs;break;case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e[t]=r.lhs;break;case"E":e[t]=r.lhs;break;case"N":e=f(e,t)}return e}function g(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)"undefined"==typeof i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":p(i[r.path[n]],r.index,r.item);break;case"D":i[r.path[n]]=r.lhs;break;case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}}function h(e,t,r){if(e&&t){var n=function(n){r&&!r(e,t,n)||d(e,t,n)};l(e,t,n)}}function y(e){return"color: "+F[e].color+"; font-weight: bold"}function v(e){var t=e.kind,r=e.path,n=e.lhs,o=e.rhs,i=e.index,a=e.item;switch(t){case"E":return[r.join("."),n,"→",o];case"N":return[r.join("."),o];case"D":return[r.join(".")];case"A":return[r.join(".")+"["+i+"]",a];default:return[]}}function b(e,t,r,n){var o=c(e,t);try{n?r.groupCollapsed("diff"):r.group("diff")}catch(e){r.log("diff")}o?o.forEach(function(e){var t=e.kind,n=v(e);r.log.apply(r,["%c "+F[t].text,y(t)].concat(P(n)))}):r.log("—— no diff ——");try{r.groupEnd()}catch(e){r.log("—— diff end —— ")}}function m(e,t,r,n){switch("undefined"==typeof e?"undefined":N(e)){case"object":return"function"==typeof e[n]?e[n].apply(e,P(r)):e[n];case"function":return e(t);default:return e}}function w(e){var t=e.timestamp,r=e.duration;return function(e,n,o){var i=["action"];return i.push("%c"+String(e.type)),t&&i.push("%c@ "+n),r&&i.push("%c(in "+o.toFixed(2)+" ms)"),i.join(" ")}}function x(e,t){var r=t.logger,n=t.actionTransformer,o=t.titleFormatter,i=void 0===o?w(t):o,a=t.collapsed,f=t.colors,u=t.level,l=t.diff,c="undefined"==typeof t.titleFormatter;e.forEach(function(o,s){var d=o.started,p=o.startedTime,g=o.action,h=o.prevState,y=o.error,v=o.took,w=o.nextState,x=e[s+1];x&&(w=x.prevState,v=x.started-d);var S=n(g),k="function"==typeof a?a(function(){return w},g,o):a,j=D(p),E=f.title?"color: "+f.title(S)+";":"",A=["color: gray; font-weight: lighter;"];A.push(E),t.timestamp&&A.push("color: gray; font-weight: lighter;"),t.duration&&A.push("color: gray; font-weight: lighter;");var O=i(S,j,v);try{k?f.title&&c?r.groupCollapsed.apply(r,["%c "+O].concat(A)):r.groupCollapsed(O):f.title&&c?r.group.apply(r,["%c "+O].concat(A)):r.group(O)}catch(e){r.log(O)}var N=m(u,S,[h],"prevState"),P=m(u,S,[S],"action"),C=m(u,S,[y,h],"error"),F=m(u,S,[w],"nextState");if(N)if(f.prevState){var L="color: "+f.prevState(h)+"; font-weight: bold";r[N]("%c prev state",L,h)}else r[N]("prev state",h);if(P)if(f.action){var T="color: "+f.action(S)+"; font-weight: bold";r[P]("%c action    ",T,S)}else r[P]("action    ",S);if(y&&C)if(f.error){var M="color: "+f.error(y,h)+"; font-weight: bold;";r[C]("%c error     ",M,y)}else r[C]("error     ",y);if(F)if(f.nextState){var _="color: "+f.nextState(w)+"; font-weight: bold";r[F]("%c next state",_,w)}else r[F]("next state",w);l&&b(h,w,r,k);try{r.groupEnd()}catch(e){r.log("—— log end ——")}})}function S(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.assign({},L,e),r=t.logger,n=t.stateTransformer,o=t.errorTransformer,i=t.predicate,a=t.logErrors,f=t.diffPredicate;if("undefined"==typeof r)return function(){return function(e){return function(t){return e(t)}}};if(e.getState&&e.dispatch)return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"),function(){return function(e){return function(t){return e(t)}}};var u=[];return function(e){var r=e.getState;return function(e){return function(l){if("function"==typeof i&&!i(r,l))return e(l);var c={};u.push(c),c.started=O.now(),c.startedTime=new Date,c.prevState=n(r()),c.action=l;var s=void 0;if(a)try{s=e(l)}catch(e){c.error=o(e)}else s=e(l);c.took=O.now()-c.started,c.nextState=n(r());var d=t.diff&&"function"==typeof f?f(r,l):t.diff;if(x(u,Object.assign({},t,{diff:d})),u.length=0,c.error)throw c.error;return s}}}}var k,j,E=function(e,t){return new Array(t+1).join(e)},A=function(e,t){return E("0",t-e.toString().length)+e},D=function(e){return A(e.getHours(),2)+":"+A(e.getMinutes(),2)+":"+A(e.getSeconds(),2)+"."+A(e.getMilliseconds(),3)},O="undefined"!=typeof performance&&null!==performance&&"function"==typeof performance.now?performance:Date,N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P=function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)},C=[];k="object"===("undefined"==typeof global?"undefined":N(global))&&global?global:"undefined"!=typeof window?window:{},j=k.DeepDiff,j&&C.push(function(){"undefined"!=typeof j&&k.DeepDiff===c&&(k.DeepDiff=j,j=void 0)}),t(n,r),t(o,r),t(i,r),t(a,r),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:l,enumerable:!0},applyDiff:{value:h,enumerable:!0},applyChange:{value:d,enumerable:!0},revertChange:{value:g,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof j},enumerable:!0},noConflict:{value:function(){return C&&(C.forEach(function(e){e()}),C=null),c},enumerable:!0}});var F={E:{color:"#2196F3",text:"CHANGED:"},N:{color:"#4CAF50",text:"ADDED:"},D:{color:"#F44336",text:"DELETED:"},A:{color:"#2196F3",text:"ARRAY:"}},L={level:"log",logger:console,logErrors:!0,collapsed:void 0,predicate:void 0,duration:!1,timestamp:!0,stateTransformer:function(e){return e},actionTransformer:function(e){return e},errorTransformer:function(e){return e},colors:{title:function(){return"inherit"},prevState:function(){return"#9E9E9E"},action:function(){return"#03A9F4"},nextState:function(){return"#4CAF50"},error:function(){return"#F20404"}},diff:!1,diffPredicate:void 0,transformer:void 0},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.dispatch,r=e.getState;return"function"==typeof t||"function"==typeof r?S()({dispatch:t,getState:r}):void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n")};e.defaults=L,e.createLogger=S,e.logger=T,e.default=T,Object.defineProperty(e,"__esModule",{value:!0})});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REJECTED = exports.FULFILLED = exports.PENDING = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = promiseMiddleware;

var _isPromise = require('./isPromise.js');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Note to contributors: Please also remember to check and make sure
 * that `index.d.ts` is also up to date with the implementation when
 * you add new features or modify existing ones.
 */

// The default async action types
var PENDING = exports.PENDING = 'PENDING';
var FULFILLED = exports.FULFILLED = 'FULFILLED';
var REJECTED = exports.REJECTED = 'REJECTED';
var defaultTypes = [PENDING, FULFILLED, REJECTED];

/**
 * Function: promiseMiddleware
 * Description: The main promiseMiddleware accepts a configuration
 * object and returns the middleware.
 */
function promiseMiddleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var PROMISE_TYPE_SUFFIXES = config.promiseTypeSuffixes || defaultTypes;
  var PROMISE_TYPE_DELIMITER = config.promiseTypeDelimiter || '_';

  return function (ref) {
    var dispatch = ref.dispatch;


    return function (next) {
      return function (action) {

        /**
         * Instantiate variables to hold:
         * (1) the promise
         * (2) the data for optimistic updates
         */
        var promise = void 0;
        var data = void 0;

        /**
         * There are multiple ways to dispatch a promise. The first step is to
         * determine if the promise is defined:
         * (a) explicitly (action.payload.promise is the promise)
         * (b) implicitly (action.payload is the promise)
         * (c) as an async function (returns a promise when called)
         *
         * If the promise is not defined in one of these three ways, we don't do
         * anything and move on to the next middleware in the middleware chain.
         */

        // Step 1a: Is there a payload?
        if (action.payload) {
          var PAYLOAD = action.payload;

          // Step 1.1: Is the promise implicitly defined?
          if ((0, _isPromise2.default)(PAYLOAD)) {
            promise = PAYLOAD;
          }

          // Step 1.2: Is the promise explicitly defined?
          else if ((0, _isPromise2.default)(PAYLOAD.promise)) {
              promise = PAYLOAD.promise;
              data = PAYLOAD.data;
            }

            // Step 1.3: Is the promise returned by an async function?
            else if (typeof PAYLOAD === 'function' || typeof PAYLOAD.promise === 'function') {
                promise = PAYLOAD.promise ? PAYLOAD.promise() : PAYLOAD();
                data = PAYLOAD.promise ? PAYLOAD.data : undefined;

                // Step 1.3.1: Is the return of action.payload a promise?
                if (!(0, _isPromise2.default)(promise)) {

                  // If not, move on to the next middleware.
                  return next(_extends({}, action, {
                    payload: promise
                  }));
                }
              }

              // Step 1.4: If there's no promise, move on to the next middleware.
              else {
                  return next(action);
                }

          // Step 1b: If there's no payload, move on to the next middleware.
        } else {
          return next(action);
        }

        /**
         * Instantiate and define constants for:
         * (1) the action type
         * (2) the action meta
         */
        var TYPE = action.type;
        var META = action.meta;

        /**
         * Instantiate and define constants for the action type suffixes.
         * These are appended to the end of the action type.
         */

        var _PROMISE_TYPE_SUFFIXE = _slicedToArray(PROMISE_TYPE_SUFFIXES, 3),
            _PENDING = _PROMISE_TYPE_SUFFIXE[0],
            _FULFILLED = _PROMISE_TYPE_SUFFIXE[1],
            _REJECTED = _PROMISE_TYPE_SUFFIXE[2];

        /**
         * Function: getAction
         * Description: This function constructs and returns a rejected
         * or fulfilled action object. The action object is based off the Flux
         * Standard Action (FSA).
         *
         * Given an original action with the type FOO:
         *
         * The rejected object model will be:
         * {
         *   error: true,
         *   type: 'FOO_REJECTED',
         *   payload: ...,
         *   meta: ... (optional)
         * }
         *
         * The fulfilled object model will be:
         * {
         *   type: 'FOO_FULFILLED',
         *   payload: ...,
         *   meta: ... (optional)
         * }
         */


        var getAction = function getAction(newPayload, isRejected) {
          return _extends({
            // Concatentate the type string property.
            type: [TYPE, isRejected ? _REJECTED : _FULFILLED].join(PROMISE_TYPE_DELIMITER)

          }, newPayload === null || typeof newPayload === 'undefined' ? {} : {
            payload: newPayload
          }, META !== undefined ? { meta: META } : {}, isRejected ? {
            error: true
          } : {});
        };

        /**
         * Function: handleReject
         * Calls: getAction to construct the rejected action
         * Description: This function dispatches the rejected action and returns
         * the original Error object. Please note the developer is responsible
         * for constructing and throwing an Error object. The middleware does not
         * construct any Errors.
         */
        var handleReject = function handleReject(reason) {
          var rejectedAction = getAction(reason, true);
          dispatch(rejectedAction);

          throw reason;
        };

        /**
         * Function: handleFulfill
         * Calls: getAction to construct the fullfilled action
         * Description: This function dispatches the fulfilled action and
         * returns the success object. The success object should
         * contain the value and the dispatched action.
         */
        var handleFulfill = function handleFulfill() {
          var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

          var resolvedAction = getAction(value, false);
          dispatch(resolvedAction);

          return { value: value, action: resolvedAction };
        };

        /**
         * First, dispatch the pending action:
         * This object describes the pending state of a promise and will include
         * any data (for optimistic updates) and/or meta from the original action.
         */
        next(_extends({
          // Concatentate the type string.
          type: [TYPE, _PENDING].join(PROMISE_TYPE_DELIMITER)

        }, data !== undefined ? { payload: data } : {}, META !== undefined ? { meta: META } : {}));

        /**
         * Second, dispatch a rejected or fulfilled action and move on to the
         * next middleware.
         */
        return promise.then(handleFulfill, handleReject);
      };
    };
  };
}
},{"./isPromise.js":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isPromise;
function isPromise(value) {
  if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    return value && typeof value.then === 'function';
  }

  return false;
}
},{}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;
},{}],9:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var $$observable = _interopDefault(require('symbol-observable'));

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),
  REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) return false;

  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.REPLACE });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && 'action "' + String(actionType) + '"' || 'an action';

  return 'Given ' + actionDescription + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var store = createStore.apply(undefined, args);
      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(undefined, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning("You are currently using minified code outside of NODE_ENV === 'production'. " + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = createStore;
exports.combineReducers = combineReducers;
exports.bindActionCreators = bindActionCreators;
exports.applyMiddleware = applyMiddleware;
exports.compose = compose;
exports.__DO_NOT_USE__ActionTypes = ActionTypes;

}).call(this,require('_process'))

},{"_process":3,"symbol-observable":10}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill.js');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ponyfill.js":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _Matches = require('./PreactClasses/Matches');

var _Matches2 = _interopRequireDefault(_Matches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeagueMatchesApp = function () {
	function LeagueMatchesApp(element) {
		_classCallCheck(this, LeagueMatchesApp);

		this.element = element;
		this.bindEvents();
	}

	_createClass(LeagueMatchesApp, [{
		key: 'bindEvents',
		value: function bindEvents() {
			(0, _preact.render)((0, _preact.h)(_Matches2.default, null), this.element);
		}
	}]);

	return LeagueMatchesApp;
}();

exports.default = LeagueMatchesApp;

},{"./PreactClasses/Matches":34,"preact":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _MainLeagueApp = require('./PreactClasses/MainLeagueApp');

var _MainLeagueApp2 = _interopRequireDefault(_MainLeagueApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeagueReactApp = function () {
	function LeagueReactApp(element) {
		_classCallCheck(this, LeagueReactApp);

		this.element = element;
		this.bindEvents();
	}

	_createClass(LeagueReactApp, [{
		key: 'bindEvents',
		value: function bindEvents() {
			console.log('rendering');
			(0, _preact.render)((0, _preact.h)(_MainLeagueApp2.default, null), this.element);
		}
	}]);

	return LeagueReactApp;
}();

exports.default = LeagueReactApp;

},{"./PreactClasses/MainLeagueApp":25,"preact":2}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _index = require('./MatchUp/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./Champs/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppMain = function (_Component) {
	_inherits(AppMain, _Component);

	function AppMain() {
		_classCallCheck(this, AppMain);

		return _possibleConstructorReturn(this, (AppMain.__proto__ || Object.getPrototypeOf(AppMain)).apply(this, arguments));
	}

	_createClass(AppMain, [{
		key: 'getSpecificApp',
		value: function getSpecificApp() {
			switch (this.props.appType) {
				case 'matchUp':
					return (0, _preact.h)(_index2.default, { store: this.props.store });

				case 'champs':
					return (0, _preact.h)(_index4.default, null);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return this.getSpecificApp();
		}
	}]);

	return AppMain;
}(_preact.Component);

exports.default = AppMain;

},{"./Champs/index.js":21,"./MatchUp/index.js":32,"preact":2}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Patches = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        minPlayed: store.stats.minPlayed
    };
}), _dec(_class = function (_Component) {
    _inherits(Patches, _Component);

    function Patches(props) {
        _classCallCheck(this, Patches);

        return _possibleConstructorReturn(this, (Patches.__proto__ || Object.getPrototypeOf(Patches)).call(this, props));
    }

    _createClass(Patches, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.props.dispatch({
                type: 'SET_MINPLAYED',
                minPlayed: e.target.value
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                (0, _preact.h)('input', { value: this.props.minPlayed, onChange: this.handleChange.bind(this), type: 'text', placeholder: 'Min Games Played' })
            );
        }
    }]);

    return Patches;
}(_preact.Component)) || _class);
exports.default = Patches;

},{"preact":2,"preact-redux":1}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Patches = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activePatches: store.stats.activePatches
    };
}), _dec(_class = function (_Component) {
    _inherits(Patches, _Component);

    function Patches(props) {
        _classCallCheck(this, Patches);

        var _this = _possibleConstructorReturn(this, (Patches.__proto__ || Object.getPrototypeOf(Patches)).call(this, props));

        _this.setDefaultPatches();
        return _this;
    }

    _createClass(Patches, [{
        key: 'setDefaultPatches',
        value: function setDefaultPatches() {
            this.props.dispatch({
                type: 'SET_ALL_PATCHES',
                patches: this.props.patches
            });
        }
    }, {
        key: 'isPatchActive',
        value: function isPatchActive(patch) {
            if (this.props.activePatches && this.props.activePatches.includes(patch)) {
                return 'checked';
            }
            return '';
        }
    }, {
        key: 'togglePatch',
        value: function togglePatch(patch) {
            var activePatches = Object.assign([], this.props.activePatches);
            if (this.props.activePatches.includes(patch)) {
                activePatches = activePatches.filter(function (activePatch) {
                    return activePatch !== patch;
                });
            } else {
                activePatches.push(patch);
            }
            this.props.dispatch({
                type: 'SET_ALL_PATCHES',
                patches: activePatches
            });
        }
    }, {
        key: 'renderPatches',
        value: function renderPatches() {
            var _this2 = this;

            var patches = [];
            Array.from(this.props.patches, function (patch) {
                patches.push((0, _preact.h)(
                    'div',
                    { className: 'topnav__input-holder' },
                    (0, _preact.h)('input', { onChange: function onChange() {
                            _this2.togglePatch(patch);
                        }, checked: _this2.isPatchActive(patch), id: 'patch-' + patch, type: 'checkbox' }),
                    (0, _preact.h)(
                        'label',
                        { 'for': 'patch-' + patch },
                        patch
                    )
                ));
            });
            return patches;
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderPatches()
            );
        }
    }]);

    return Patches;
}(_preact.Component)) || _class);
exports.default = Patches;

},{"preact":2,"preact-redux":1}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Regions = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activeRegions: store.stats.activeRegions
    };
}), _dec(_class = function (_Component) {
    _inherits(Regions, _Component);

    function Regions(props) {
        _classCallCheck(this, Regions);

        var _this = _possibleConstructorReturn(this, (Regions.__proto__ || Object.getPrototypeOf(Regions)).call(this, props));

        _this.setDefaultRegions();
        return _this;
    }

    _createClass(Regions, [{
        key: 'setDefaultRegions',
        value: function setDefaultRegions() {
            this.props.dispatch({
                type: 'SET_ALL_REGIONS',
                regions: this.props.regions
            });
        }
    }, {
        key: 'isRegionActive',
        value: function isRegionActive(region) {
            if (this.props.activeRegions && this.props.activeRegions.includes(region)) {
                return 'checked';
            }
            return '';
        }
    }, {
        key: 'toggleRegion',
        value: function toggleRegion(region) {
            var activeRegions = Object.assign([], this.props.activeRegions);
            if (this.props.activeRegions.includes(region)) {
                activeRegions = activeRegions.filter(function (activeRegion) {
                    return activeRegion !== region;
                });
            } else {
                activeRegions.push(region);
            }
            this.props.dispatch({
                type: 'SET_ALL_REGIONS',
                regions: activeRegions
            });
        }
    }, {
        key: 'renderRegions',
        value: function renderRegions() {
            var _this2 = this;

            var regions = [];
            Array.from(this.props.regions, function (region) {
                regions.push((0, _preact.h)(
                    'div',
                    { className: 'topnav__input-holder' },
                    (0, _preact.h)('input', { onChange: function onChange() {
                            _this2.toggleRegion(region);
                        }, checked: _this2.isRegionActive(region), id: 'region-' + region, type: 'checkbox' }),
                    (0, _preact.h)(
                        'label',
                        { 'for': 'region-' + region },
                        region
                    )
                ));
            });
            return regions;
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderRegions()
            );
        }
    }]);

    return Regions;
}(_preact.Component)) || _class);
exports.default = Regions;

},{"preact":2,"preact-redux":1}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _Stats = require('./methods/Stats');

var _Stats2 = _interopRequireDefault(_Stats);

var _ChampFuncs = require('./methods/ChampFuncs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatsBlock = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        stats: store.stats.stats,
        activeRegions: store.stats.activeRegions,
        activePatches: store.stats.activePatches,
        activeVariables: store.stats.activeVariables,
        minPlayed: store.stats.minPlayed
    };
}), _dec(_class = function (_Component) {
    _inherits(StatsBlock, _Component);

    function StatsBlock(props) {
        _classCallCheck(this, StatsBlock);

        var _this = _possibleConstructorReturn(this, (StatsBlock.__proto__ || Object.getPrototypeOf(StatsBlock)).call(this, props));

        _this.setState({
            activeRegions: _this.props.activeRegions,
            activePatches: _this.props.activePatches
        });
        _this.statsClass = new _Stats2.default(_this.props.stats);
        _this.calculateStats();
        return _this;
    }

    _createClass(StatsBlock, [{
        key: 'calculateStats',
        value: function calculateStats() {
            this.statsClass.setStates(this.state.activeRegions, this.state.activePatches);
            this.statsClass.calculate();
        }
    }, {
        key: 'getPercentage',
        value: function getPercentage(a, b) {
            var percentage = a / b * 100;
            return Math.floor(percentage) + '%';
        }
    }, {
        key: 'setActiveColumn',
        value: function setActiveColumn(variable) {
            this.statsClass.setOrder(variable);
            this.updateChampQuery();
        }
    }, {
        key: 'checkFirstChamps',
        value: function checkFirstChamps() {
            console.log(this.state.champs);
            if (!this.state.champs && this.statsClass) {
                this.updateChampQuery();
            }
        }
    }, {
        key: 'updateChampQuery',
        value: function updateChampQuery() {
            this.setState({
                champs: this.statsClass.getChamps()
            });
        }
    }, {
        key: 'isColumnActive',
        value: function isColumnActive(variable) {
            if (this.statsClass && variable.statName === this.statsClass.getOrderVariable()) {
                return true;
            }
            return false;
        }
    }, {
        key: 'renderChampColumns',
        value: function renderChampColumns() {
            var _this2 = this;

            var columns = [];
            Array.from(this.props.activeVariables, function (variable) {
                columns.push((0, _preact.h)(
                    'th',
                    { className: _this2.isColumnActive(variable) ? 'is-active' : '', onClick: function onClick() {
                            return _this2.setActiveColumn(variable);
                        } },
                    variable.friendlyName
                ));
            });
            return columns;
        }
    }, {
        key: 'renderChampCells',
        value: function renderChampCells(champ) {
            var _this3 = this;

            console.log('render new');
            var cells = [];

            Array.from(this.props.activeVariables, function (variable) {
                var cell = '';
                if (variable.type === 'percent') {
                    cell = (0, _preact.h)(
                        'td',
                        null,
                        _this3.getPercentage(champ[variable.statName], champ.played)
                    );
                }
                if (variable.type === 'value') {
                    cell = (0, _preact.h)(
                        'td',
                        null,
                        champ[variable.statName]
                    );
                }
                cells.push(cell);
            });
            return cells;
        }
    }, {
        key: 'renderfirstChamps',
        value: function renderfirstChamps() {
            var _this4 = this;

            this.checkFirstChamps();
            if (this.state.champs) {
                var firstArray = [];
                Array.from(this.state.champs, function (champ) {
                    if (_this4.props.minPlayed && _this4.props.minPlayed > champ.played) return;
                    firstArray.push((0, _preact.h)(
                        'tr',
                        null,
                        (0, _preact.h)(
                            'td',
                            null,
                            (0, _ChampFuncs.idToChamp)(champ.id)
                        ),
                        _this4.renderChampCells(champ)
                    ));
                });
                return firstArray;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var champColumn = { type: 'alphabetically', defaultOrder: 'asc', statName: 'alphabetically' };
            return (0, _preact.h)(
                'div',
                { className: 'table__holder' },
                (0, _preact.h)(
                    'table',
                    { className: 'table' },
                    (0, _preact.h)(
                        'tbody',
                        null,
                        (0, _preact.h)(
                            'tr',
                            null,
                            (0, _preact.h)(
                                'th',
                                { className: this.isColumnActive(champColumn) ? 'is-active' : '', onClick: function onClick() {
                                        return _this5.setActiveColumn(champColumn);
                                    } },
                                'Champ'
                            ),
                            this.renderChampColumns()
                        ),
                        this.renderfirstChamps()
                    )
                )
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var changed = false;
            if (this.state.activePatches !== newProps.activePatches) {
                this.setState({
                    activePatches: newProps.activePatches
                });
                changed = true;
            }

            if (this.state.activeRegions !== newProps.activeRegions) {
                this.setState({
                    activeRegions: newProps.activeRegions
                });
                changed = true;
            }
            if (changed) {
                this.calculateStats();
                this.updateChampQuery();
            }
        }
    }]);

    return StatsBlock;
}(_preact.Component)) || _class);
exports.default = StatsBlock;

},{"./methods/ChampFuncs":22,"./methods/Stats":24,"preact":2,"preact-redux":1}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _Filters = require('./methods/Filters');

var _Filters2 = _interopRequireDefault(_Filters);

var _Patches = require('./Patches');

var _Patches2 = _interopRequireDefault(_Patches);

var _Regions = require('./Regions');

var _Regions2 = _interopRequireDefault(_Regions);

var _Variables = require('./Variables');

var _Variables2 = _interopRequireDefault(_Variables);

var _MinPlayed = require('./MinPlayed');

var _MinPlayed2 = _interopRequireDefault(_MinPlayed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopNav = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        stats: store.stats.stats,
        loading: store.stats.loading
    };
}), _dec(_class = function (_Component) {
    _inherits(TopNav, _Component);

    function TopNav(props) {
        _classCallCheck(this, TopNav);

        var _this = _possibleConstructorReturn(this, (TopNav.__proto__ || Object.getPrototypeOf(TopNav)).call(this, props));

        _this.filters = new _Filters2.default(_this.props.stats);

        _this.regions = _this.filters.getRegions();
        _this.patches = _this.filters.getPatches();
        _this.variables = _this.filters.getVariables();
        return _this;
    }

    _createClass(TopNav, [{
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                { className: 'topnav__holder' },
                (0, _preact.h)(
                    'div',
                    { className: 'topnav' },
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Patches'
                        ),
                        (0, _preact.h)(_Patches2.default, { patches: this.patches })
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Regions'
                        ),
                        (0, _preact.h)(_Regions2.default, { regions: this.regions })
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Variables'
                        ),
                        (0, _preact.h)(_Variables2.default, { variables: this.variables })
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'topnav__dropdown' },
                        (0, _preact.h)(
                            'div',
                            { className: 'topnav__title' },
                            'Min Played'
                        ),
                        (0, _preact.h)(_MinPlayed2.default, null)
                    )
                )
            );
        }
    }]);

    return TopNav;
}(_preact.Component)) || _class);
exports.default = TopNav;

},{"./MinPlayed":15,"./Patches":16,"./Regions":17,"./Variables":20,"./methods/Filters":23,"preact":2,"preact-redux":1}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variables = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activeVariables: store.stats.activeVariables
    };
}), _dec(_class = function (_Component) {
    _inherits(Variables, _Component);

    function Variables(props) {
        _classCallCheck(this, Variables);

        var _this = _possibleConstructorReturn(this, (Variables.__proto__ || Object.getPrototypeOf(Variables)).call(this, props));

        _this.setDefaultVariables();
        return _this;
    }

    _createClass(Variables, [{
        key: 'setDefaultVariables',
        value: function setDefaultVariables() {
            this.props.dispatch({
                type: 'SET_ALL_VARIABLES',
                variables: this.props.variables
            });
        }
    }, {
        key: 'isVariableActive',
        value: function isVariableActive(variable) {
            if (this.props.activeVariables && this.props.activeVariables.includes(variable)) {
                return 'checked';
            }
            return '';
        }
    }, {
        key: 'toggleVariable',
        value: function toggleVariable(variable) {
            var activeVariables = Object.assign([], this.props.activeVariables);
            if (this.props.activeVariables.includes(variable)) {
                activeVariables = activeVariables.filter(function (activeVariable) {
                    return activeVariable !== variable;
                });
            } else {
                activeVariables.push(variable);
            }
            this.props.dispatch({
                type: 'SET_ALL_VARIABLES',
                variables: activeVariables
            });
        }
    }, {
        key: 'renderVariables',
        value: function renderVariables() {
            var _this2 = this;

            var variables = [];
            Array.from(this.props.variables, function (variable) {
                variables.push((0, _preact.h)(
                    'div',
                    { className: 'topnav__input-holder' },
                    (0, _preact.h)('input', { onChange: function onChange() {
                            _this2.toggleVariable(variable);
                        }, checked: _this2.isVariableActive(variable), id: 'variable-' + variable.friendlyName, type: 'checkbox' }),
                    (0, _preact.h)(
                        'label',
                        { 'for': 'variable-' + variable.friendlyName },
                        variable.friendlyName
                    )
                ));
            });
            return variables;
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderVariables()
            );
        }
    }]);

    return Variables;
}(_preact.Component)) || _class);
exports.default = Variables;

},{"preact":2,"preact-redux":1}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _StatsBlock = require('./StatsBlock');

var _StatsBlock2 = _interopRequireDefault(_StatsBlock);

var _TopNav = require('./TopNav');

var _TopNav2 = _interopRequireDefault(_TopNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Champs = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		stats: store.stats.stats,
		loading: store.stats.loading
	};
}), _dec(_class = function (_Component) {
	_inherits(Champs, _Component);

	function Champs(props) {
		_classCallCheck(this, Champs);

		var _this = _possibleConstructorReturn(this, (Champs.__proto__ || Object.getPrototypeOf(Champs)).call(this, props));

		_this.regions = ['NALCS', 'EULCS', 'CBLOL', 'LCK', 'LMS', 'TCL', 'OPL'];
		if (!_this.props.stats) {
			_this.fetchStats();
		}
		return _this;
	}

	_createClass(Champs, [{
		key: 'fetchStats',
		value: function fetchStats() {
			var _this2 = this;

			Array.from(this.regions, function (region) {
				_this2.props.dispatch({
					type: 'FETCH_STATS',
					payload: fetch('/api/' + region + '/full.json').then(function (response) {
						return response.json();
					}),
					meta: region
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.props.loading || !this.props.stats) {
				return (0, _preact.h)(
					'div',
					null,
					'loading'
				);
			} else {
				return (0, _preact.h)(
					'div',
					null,
					(0, _preact.h)(_TopNav2.default, null),
					(0, _preact.h)(_StatsBlock2.default, null)
				);
			}
		}
	}]);

	return Champs;
}(_preact.Component)) || _class);
exports.default = Champs;

},{"./StatsBlock":18,"./TopNav":19,"preact":2,"preact-redux":1}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.idToChamp = idToChamp;
function idToChamp(id) {
    var champdict = { '145': 'KaiSa', '555': 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac' };
    return champdict[id];
}

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filters = function () {
    function Filters(stats) {
        _classCallCheck(this, Filters);

        this.stats = stats;
        this.regions = Object.keys(stats);
    }

    _createClass(Filters, [{
        key: 'getRegions',
        value: function getRegions() {
            return this.regions;
        }
    }, {
        key: 'getVariables',
        value: function getVariables() {
            return [{ statName: 'fbTeam', friendlyName: 'First Blood Team', type: 'percent', defaultOrder: 'desc' }, { statName: 'fbKiller', friendlyName: 'First Blood Killer', type: 'percent', defaultOrder: 'desc' }, { statName: 'fbAssist', friendlyName: 'First Blood Assist', type: 'percent', defaultOrder: 'desc' }, { statName: 'firstDeath', friendlyName: 'First Death', type: 'percent', defaultOrder: 'desc' }, { statName: 'ftTeam', friendlyName: 'First Tower Team', type: 'percent', defaultOrder: 'desc' }, { statName: 'ftKiller', friendlyName: 'First Tower Killer', type: 'percent', defaultOrder: 'desc' }, { statName: 'fdTeam', friendlyName: 'First Dragon Team', type: 'percent', defaultOrder: 'desc' }, { statName: 'played', friendlyName: 'Games Played', type: 'value', defaultOrder: 'desc' }, { statName: 'win', friendlyName: 'Win', type: 'percent', defaultOrder: 'desc' }];
        }
    }, {
        key: 'getPatches',
        value: function getPatches() {
            var _this = this;

            if (this.patches) {
                return this.patches;
            }
            this.patches = [];
            Array.from(this.regions, function (region) {
                var regionMatches = _this.stats[region];
                Array.from(regionMatches, function (match) {
                    if (!_this.patches.includes(match.patch)) {
                        _this.patches.push(match.patch);
                    }
                });
            });

            return this.patches;
        }
    }]);

    return Filters;
}();

exports.default = Filters;

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ChampFuncs = require('./ChampFuncs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stats = function () {
    function Stats(stats) {
        _classCallCheck(this, Stats);

        this.stats = stats;
        this.orderBy = 'alphabetically';
        this.orderByVariable = 'alphabetically';
        this.orderDirection = 'asc';
    }

    _createClass(Stats, [{
        key: 'setStates',
        value: function setStates(regions, patches) {
            this.regions = regions;
            this.patches = patches;
        }
    }, {
        key: 'setOrder',
        value: function setOrder(variable) {
            this.orderDirectio;
            if (this.orderBy === variable.type && this.orderByVariable === variable.statName) {
                this.orderDirection = this.orderDirection === 'desc' ? 'asc' : 'desc';
            } else {
                this.orderBy = variable.type;
                this.orderByVariable = variable.statName;
                this.orderDirection = variable.defaultOrder;
            }
            this.orderChamps();
        }
    }, {
        key: 'getOrderVariable',
        value: function getOrderVariable() {
            return this.orderByVariable;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.calculateChamps();
        }
    }, {
        key: 'calculateChamps',
        value: function calculateChamps() {
            var _this = this;

            this.firstChampsObject = {};
            Array.from(this.regions, function (region) {
                var regionMatches = _this.stats[region];
                Array.from(regionMatches, function (match) {
                    if (_this.patches.includes(match.patch)) {
                        _this.addStats(match);
                    }
                });
            });
            this.orderChamps();
        }
    }, {
        key: 'getPercentage',
        value: function getPercentage(a, b) {
            var percentage = a / b * 100;
            return Math.floor(percentage) + '%';
        }
    }, {
        key: 'orderChamps',
        value: function orderChamps() {
            this.fbArray = [];
            for (var champId in this.firstChampsObject) {
                var champ = this.firstChampsObject[champId];
                champ['id'] = champId;
                this.fbArray.push(champ);
            }
            this.fbArray.sort(this.sortFunction.bind(this));
        }
    }, {
        key: 'sortFunction',
        value: function sortFunction(a, b) {
            var valA = '';
            var valB = '';

            if (this.orderBy === 'percent') {
                valA = a[this.orderByVariable] / a.played;
                valB = b[this.orderByVariable] / b.played;
            } else if (this.orderBy === 'alphabetically') {
                valA = (0, _ChampFuncs.idToChamp)(a.id);
                valB = (0, _ChampFuncs.idToChamp)(b.id);
            } else if (this.orderBy === 'value') {
                valA = a[this.orderByVariable];
                valB = b[this.orderByVariable];
            }

            if (valA < valB) {
                return this.orderDirection === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return this.orderDirection === 'asc' ? 1 : -1;
            }
            return 0;
        }
    }, {
        key: 'addStats',
        value: function addStats(match) {
            for (var playerIndex = 0; playerIndex < 10; playerIndex++) {
                var player = match['players'][playerIndex];
                var champId = player.champId;
                if (this.firstChampsObject[champId] === undefined) {
                    this.firstChampsObject[champId] = this.getDefaultStat();
                }
                this.firstChampsObject[champId]['played']++;
                if (this.playedGotVariable(match.firstBlood, playerIndex)) {
                    this.firstChampsObject[champId]['fbTeam']++;
                }
                if (player.firstBloodKill) {
                    this.firstChampsObject[champId]['fbKiller']++;
                }
                if (player.firstBloodAssist) {
                    this.firstChampsObject[champId]['fbAssist']++;
                }
                if (player.firstDeath) {
                    this.firstChampsObject[champId]['firstDeath']++;
                }
                if (this.playedGotVariable(match.firstTower, playerIndex)) {
                    this.firstChampsObject[champId]['ftTeam']++;
                }
                if (player.firstTowerKill || player.firstTowerAssist) {
                    this.firstChampsObject[champId]['ftKiller']++;
                }
                if (this.playedGotVariable(match.firstDragon, playerIndex)) {
                    this.firstChampsObject[champId]['fdTeam']++;
                }
                if (this.playedGotVariable(match.win, playerIndex)) {
                    this.firstChampsObject[champId]['win']++;
                }
            }
        }
    }, {
        key: 'playedGotVariable',
        value: function playedGotVariable(firstTeam, playerIndex) {
            return firstTeam === 0 && playerIndex < 5 || firstTeam === 1 && playerIndex > 4;
        }
    }, {
        key: 'getDefaultStat',
        value: function getDefaultStat() {
            return {
                played: 0,
                fbTeam: 0,
                ftTeam: 0,
                fdTeam: 0,
                fbKiller: 0,
                fbAssist: 0,
                firstDeath: 0,
                ftKiller: 0,
                win: 0
            };
        }
    }, {
        key: 'getChamps',
        value: function getChamps() {
            return this.fbArray;
        }
    }]);

    return Stats;
}();

exports.default = Stats;

},{"./ChampFuncs":22}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _redux = require('redux');

var _preactRedux = require('preact-redux');

var _store = require('./reducers/store');

var _store2 = _interopRequireDefault(_store);

var _AppMain = require('./AppMain');

var _AppMain2 = _interopRequireDefault(_AppMain);

var _NavBar = require('./NavBar');

var _NavBar2 = _interopRequireDefault(_NavBar);

var _index = require('./Matches/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//https://wireframe.cc/xKOvCE
var MainLeagueApp = function (_Component) {
	_inherits(MainLeagueApp, _Component);

	function MainLeagueApp() {
		_classCallCheck(this, MainLeagueApp);

		var _this = _possibleConstructorReturn(this, (MainLeagueApp.__proto__ || Object.getPrototypeOf(MainLeagueApp)).call(this));

		_this.store = _store2.default;

		_this.state = {
			appType: 'matchUp'
		};
		return _this;
	}

	_createClass(MainLeagueApp, [{
		key: 'updateAppType',
		value: function updateAppType(type) {
			this.setState({ appType: type });
		}
	}, {
		key: 'render',
		value: function render(props, state) {
			return (0, _preact.h)(
				_preactRedux.Provider,
				{ store: this.store },
				(0, _preact.h)(
					'div',
					null,
					(0, _preact.h)(
						'header',
						null,
						(0, _preact.h)(
							'nav',
							{ 'class': 'nav' },
							(0, _preact.h)(
								'div',
								{ 'class': 'nav__logo' },
								(0, _preact.h)(
									'a',
									{ href: 'https://github.com/davidweatherall', target: '_blank' },
									'David Weatherall'
								)
							),
							(0, _preact.h)(
								'div',
								{ 'class': 'nav__links  js-nav-links' },
								(0, _preact.h)(_NavBar2.default, { updateAppType: this.updateAppType.bind(this), appType: this.state.appType })
							)
						)
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'page' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches' },
							(0, _preact.h)(_index2.default, null)
						),
						(0, _preact.h)(
							'main',
							{ 'class': 'main' },
							(0, _preact.h)(_AppMain2.default, { appType: this.state.appType })
						)
					)
				)
			);
		}
	}]);

	return MainLeagueApp;
}(_preact.Component);

exports.default = MainLeagueApp;

},{"./AppMain":14,"./Matches/index.js":34,"./NavBar":35,"./reducers/store":41,"preact":2,"preact-redux":1,"redux":9}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _Players = require('./Players');

var _Players2 = _interopRequireDefault(_Players);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchCard = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionData: store.regions.regionData,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(MatchCard, _Component);

	function MatchCard() {
		_classCallCheck(this, MatchCard);

		var _this = _possibleConstructorReturn(this, (MatchCard.__proto__ || Object.getPrototypeOf(MatchCard)).call(this));

		_this.teamColours = ['blue', 'red'];
		return _this;
	}

	_createClass(MatchCard, [{
		key: 'getIndex',
		value: function getIndex() {
			var getEnemy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			if (this.props.team) {
				this.index = 0;
				this.enemyIndex = 1;
				if (this.props.game.teamNames[1] == this.props.team) {
					this.index = 1;
					this.enemyIndex = 0;
				}
			} else {
				this.index = false;
			}

			if (getEnemy) {
				return this.enemyIndex;
			}

			return this.index;
		}
	}, {
		key: 'getTime',
		value: function getTime(unix) {
			var date = new Date(unix);
			return date.toLocaleString([], { day: 'numeric', month: 'long', year: 'numeric' });
		}
	}, {
		key: 'togglePlayers',
		value: function togglePlayers() {
			this.setState({ showPlayers: !this.state.showPlayers });
		}
	}, {
		key: 'getBackground',
		value: function getBackground() {
			if (this.props.team) {
				return 'bg-color--' + this.teamColours[this.getIndex()];
			}
			return 'bg-color--default';
		}
	}, {
		key: 'getBorder',
		value: function getBorder() {
			if (this.getIndex() !== false) {
				if (this.props.game.win == this.getIndex()) {
					return 'bdr-color--green';
				} else {
					return 'bdr-color--red';
				}
			} else {
				return 'bdr-color--greyer';
			}
		}
	}, {
		key: 'renderAchievements',
		value: function renderAchievements(teamNum) {
			var myTeam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var isMyTeam = false;
			if (myTeam) {
				if (this.props.game.teamNames[teamNum] == myTeam) {
					isMyTeam = true;
				}
			}
			var checks = {
				'firstBaron': 'First Baron',
				'firstBlood': 'First Blood',
				'firstDragon': 'First Dragon',
				'firstInhibitor': 'First Inhibitor',
				'firstTower': 'First Tower'
			};
			var achievements = [];
			for (var check in checks) {
				if (this.props.game[check] == teamNum) {
					var classes = '';
					if (myTeam) {
						if (isMyTeam) {
							classes = 't-colour--green';
						} else {
							classes = 't-colour--red';
						}
					} else {
						classes = 't-colour--' + this.teamColours[teamNum];
					}
					achievements.push((0, _preact.h)(
						'div',
						{ className: classes },
						checks[check]
					));
				}
			};

			return achievements;
		}
	}, {
		key: 'renderMatchup',
		value: function renderMatchup() {
			var team1 = this.props.game.teamNames[0];
			var team2 = this.props.game.teamNames[1];

			if (this.props.team) {
				if (this.props.game.teamNames[0] != this.props.team) {
					team2 = this.props.game.teamNames[0];
					team1 = this.props.game.teamNames[1];
				}
			}

			return (0, _preact.h)(
				'div',
				{ className: 'matches__column  flex  flex-justify--between' },
				(0, _preact.h)('img', { className: 'card__logo', src: '/assets/img/teams/' + team1 + '.png' }),
				(0, _preact.h)(
					'span',
					{ className: 'card__vs' },
					'vs'
				),
				(0, _preact.h)('img', { className: 'card__logo', src: '/assets/img/teams/' + team2 + '.png' })
			);
		}
	}, {
		key: 'renderShowMore',
		value: function renderShowMore() {
			return (0, _preact.h)(
				'div',
				{ className: 'card__showmore', onClick: this.togglePlayers.bind(this) },
				'Show More'
			);
		}
	}, {
		key: 'renderPlayers',
		value: function renderPlayers() {
			if (this.state.showPlayers) {
				return (0, _preact.h)(_Players2.default, { game: this.props.game, index: this.getIndex(), activeRegion: this.props.activeRegion });
			}
			return '';
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps() {
			this.setState({ showPlayers: false });
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				{ className: 'card  ' + this.getBackground() + '  ' + this.getBorder(), 'data-count': this.props.count },
				(0, _preact.h)(
					'div',
					{ className: 'card__date' },
					this.getTime(this.props.game.time)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__columns  flex-align--center' },
					(0, _preact.h)(
						'div',
						{ className: 'matches__column  t-size--small' },
						this.renderAchievements(this.getIndex(), this.props.team)
					),
					this.renderMatchup(),
					(0, _preact.h)(
						'div',
						{ className: 'matches__column  t-align--right  t-size--small' },
						this.renderAchievements(this.getIndex(true), this.props.team)
					)
				),
				this.renderPlayers(),
				this.renderShowMore()
			);
		}
	}]);

	return MatchCard;
}(_preact.Component)) || _class);
exports.default = MatchCard;

},{"./Players":28,"preact":2,"preact-redux":1}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _MatchCard = require('./MatchCard');

var _MatchCard2 = _interopRequireDefault(_MatchCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchElements = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionData: store.regions.regionData,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(MatchElements, _Component);

	function MatchElements() {
		_classCallCheck(this, MatchElements);

		return _possibleConstructorReturn(this, (MatchElements.__proto__ || Object.getPrototypeOf(MatchElements)).apply(this, arguments));
	}

	_createClass(MatchElements, [{
		key: 'renderCards',
		value: function renderCards(team) {
			var _this2 = this;

			var team2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var cards = [];

			if (team2) {
				Array.from(this.props.games, function (game) {
					if (game.teamNames.includes(team) && game.teamNames.includes(team2)) {
						cards.push((0, _preact.h)(_MatchCard2.default, { game: game, team: false, store: _this2.props.store }));
					}
				});
			} else {
				Array.from(this.props.games, function (game) {
					if (game.teamNames.includes(team)) {
						cards.push((0, _preact.h)(_MatchCard2.default, { game: game, team: team, store: _this2.props.store }));
					}
				});
			}
			return cards;
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				{ className: 'matches__columns' },
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						this.props.team1,
						'\'s Recent Matches'
					),
					this.renderCards(this.props.team1)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'Head to Head'
					),
					this.renderCards(this.props.team1, this.props.team2)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						this.props.team2,
						'\'s Recent Matches'
					),
					this.renderCards(this.props.team2)
				)
			);
		}
	}]);

	return MatchElements;
}(_preact.Component)) || _class);
exports.default = MatchElements;

},{"./MatchCard":26,"preact":2,"preact-redux":1}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _reactHint = require('react-hint');

var _reactHint2 = _interopRequireDefault(_reactHint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactHint = (0, _reactHint2.default)({ createElement: _preact.h, Component: _preact.Component });

var Players = function (_Component) {
	_inherits(Players, _Component);

	function Players() {
		_classCallCheck(this, Players);

		var _this = _possibleConstructorReturn(this, (Players.__proto__ || Object.getPrototypeOf(Players)).call(this));

		_this.setState({ playerData: false });
		return _this;
	}

	_createClass(Players, [{
		key: 'removeTeam',
		value: function removeTeam(playerName) {
			Array.from(this.props.game.teamNames, function (teamName) {
				playerName = playerName.replace(teamName, '');
			});
			return playerName;
		}
	}, {
		key: 'getChamp',
		value: function getChamp(champId) {
			var champIds = { '145': 'Kaisa', '555': 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac' };
			return champIds[champId];
		}
	}, {
		key: 'getPlayerData',
		value: function getPlayerData() {
			var _this2 = this;

			fetch('/api/' + this.props.activeRegion + '/games/' + this.props.game.gameId + '/players.json').then(function (response) {
				return response.json();
			}).then(function (data) {
				_this2.setState({ playerData: data });
			});
		}
	}, {
		key: 'getFB',
		value: function getFB(playerData) {
			var firstBlood = '';
			if (playerData.firstBloodKill) {
				firstBlood = (0, _preact.h)('img', { 'data-rh': 'First Kill', src: '/assets/svg/sword.svg' });
			} else if (playerData.firstBloodAssist) {
				firstBlood = (0, _preact.h)('img', { 'data-rh': 'First Kill Assist', src: '/assets/svg/help.svg' });
			} else if (playerData.firstDeath) {
				firstBlood = (0, _preact.h)('img', { 'data-rh': 'First Death', src: '/assets/svg/skull.svg' });
			}
			return firstBlood;
		}
	}, {
		key: 'renderPlayer',
		value: function renderPlayer(playerData) {
			var _this3 = this;

			var playerName = playerData.name;
			playerName = this.removeTeam(playerName);
			var firstBlood = this.getFB(playerData);
			var KDA = playerData.kills + '/' + playerData.deaths + '/' + playerData.kills;
			var champNane = this.getChamp(playerData.champId);
			var champImage = 'http://ddragon.leagueoflegends.com/cdn/8.14.1/img/champion/' + champNane + '.png';
			return (0, _preact.h)(
				'tr',
				{ 'class': 'card__player' },
				(0, _preact.h)(
					'td',
					null,
					playerName
				),
				(0, _preact.h)(
					'td',
					{ 'class': 'card__champ' },
					(0, _preact.h)('img', { src: champImage })
				),
				(0, _preact.h)(
					'td',
					null,
					KDA
				),
				(0, _preact.h)(
					'td',
					{ 'class': 'card__svg' },
					(0, _preact.h)(ReactHint, { autoPosition: true, events: true, delay: 100 }),
					(0, _preact.h)(ReactHint, { persist: true,
						attribute: 'data-custom',
						className: 'custom-hint',
						events: { hover: true },
						ref: function ref(_ref) {
							return _this3.instance = _ref;
						} }),
					firstBlood
				)
			);
		}
	}, {
		key: 'renderPlayers',
		value: function renderPlayers() {
			if (this.state.playerData) {
				var team1Players = [];
				var team2Players = [];
				var playerCount = 0;
				while (playerCount < 5) {
					var playerData = this.state.playerData[playerCount];
					team1Players.push(this.renderPlayer(playerData));
					playerCount++;
				}
				while (playerCount < 10) {
					var _playerData = this.state.playerData[playerCount];
					team2Players.push(this.renderPlayer(_playerData));
					playerCount++;
				}
				return (0, _preact.h)(
					'div',
					{ 'class': 'card__players' },
					(0, _preact.h)(
						'table',
						{ 'class': 'card__team' },
						this.props.index == 0 ? team1Players : team2Players
					),
					(0, _preact.h)(
						'table',
						{ 'class': 'card__team' },
						this.props.index == 0 ? team2Players : team1Players
					)
				);
			} else {
				return 'getting players...';
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				{ 'class': 'matches__players' },
				this.renderPlayers()
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getPlayerData();
		}
	}]);

	return Players;
}(_preact.Component);

exports.default = Players;

},{"preact":2,"react-hint":4}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Credit: https://codepen.io/smlsvnssn/pen/FolaA

var StatCircle = function (_Component) {
	_inherits(StatCircle, _Component);

	function StatCircle(props) {
		_classCallCheck(this, StatCircle);

		var _this = _possibleConstructorReturn(this, (StatCircle.__proto__ || Object.getPrototypeOf(StatCircle)).call(this, props));

		_this.setState({
			circleText: _this.props.fbText
		});
		return _this;
	}

	_createClass(StatCircle, [{
		key: 'createSvgArc',
		value: function createSvgArc(startPerc, extraPerc) {

			if (!Number.isInteger(startPerc)) {
				startPerc = 0;
			}
			if (!Number.isInteger(extraPerc)) {
				extraPerc = 0;
			}

			var x = 0;
			var y = 0;
			var r = 300;

			var startAngle = startPerc / 100 * Math.PI;

			var endAngle = (extraPerc + startPerc) / 100 * Math.PI;

			if (startAngle > endAngle) {
				var s = startAngle;
				startAngle = endAngle;
				endAngle = s;
			}
			if (endAngle - startAngle > Math.PI * 2) {
				endAngle = Math.PI * 1.99999;
			}

			var largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;
			console.log('nums: ');
			console.log(startPerc);
			console.log(extraPerc);
			console.log(endAngle);
			console.log(startAngle);
			return ["M", x, y, "L", x + Math.cos(startAngle) * r, y - Math.sin(startAngle) * r, "A", r, r, 0, largeArc, 0, x + Math.cos(endAngle) * r, y - Math.sin(endAngle) * r, "L", x, y].join(" ");
		}
	}, {
		key: 'updateCircle',
		value: function updateCircle(perc) {
			var text = perc.toString() + '%';
			this.setState({
				circleText: text
			});
		}
	}, {
		key: 'resetCircle',
		value: function resetCircle() {
			this.setState({
				circleText: this.props.fbText
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return (0, _preact.h)(
				'div',
				{ className: 'circle' },
				(0, _preact.h)(
					'svg',
					{ id: 'theMap', width: '100%', viewBox: '0 0 600 600', preserveAspectRatio: 'xMidYMid meet' },
					(0, _preact.h)('circle', { cx: '300', cy: '300', r: '300', fill: 'rgba(255, 255, 255, 0)' }),
					(0, _preact.h)(
						'g',
						{ id: 'arcs', transform: ' translate(300 300) rotate(-90) scale(1 -1)' },
						(0, _preact.h)('path', { onMouseEnter: function onMouseEnter() {
								_this2.updateCircle(_this2.props.red);
							}, onMouseLeave: this.resetCircle.bind(this), d: this.createSvgArc(0, this.props.red), fill: '#ff0000', opacity: '0.5' }),
						(0, _preact.h)('path', { onMouseEnter: function onMouseEnter() {
								_this2.updateCircle(_this2.props.blue);
							}, onMouseLeave: this.resetCircle.bind(this), d: this.createSvgArc(this.props.red, this.props.blue), fill: '#0023ff', opacity: '0.5' })
					),
					(0, _preact.h)('circle', { cx: '300', cy: '300', r: '100', fill: '#fff' }),
					(0, _preact.h)(
						'text',
						{ x: '50%', y: '50%', 'text-anchor': 'middle', stroke: '#000', 'stroke-width': '2px', dy: '.3em', style: 'font-size: 55px;' },
						this.state.circleText
					)
				)
			);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(newProps) {
			if (newProps.fbText !== this.props.fbText) {
				this.setState({
					circleText: newProps.fbText
				});
			}
		}
	}]);

	return StatCircle;
}(_preact.Component);

exports.default = StatCircle;

},{"preact":2}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StatsClass = function () {
	function StatsClass(stats) {
		_classCallCheck(this, StatsClass);

		this.stats = stats;
	}

	_createClass(StatsClass, [{
		key: "FB",
		value: function FB(team) {
			var fb = Math.round(100 * (this.stats[team].firstBloods / this.stats[team].matchesPlayed));
			return fb;
		}
	}, {
		key: "blueFB",
		value: function blueFB(team) {
			var fb = Math.round(100 * (this.stats[team].blueFirstBloods / this.stats[team].blueMatchesPlayed));
			return fb;
		}
	}, {
		key: "redFB",
		value: function redFB(team) {
			var fb = Math.round(100 * (this.stats[team].redFirstBloods / this.stats[team].redMatchesPlayed));
			return fb;
		}
	}, {
		key: "Tower",
		value: function Tower(team) {
			var Tower = Math.round(100 * (this.stats[team].firstTowers / this.stats[team].matchesPlayed));
			return Tower;
		}
	}, {
		key: "blueTower",
		value: function blueTower(team) {
			var Tower = Math.round(100 * (this.stats[team].blueFirstTowers / this.stats[team].blueMatchesPlayed));
			return Tower;
		}
	}, {
		key: "redTower",
		value: function redTower(team) {
			var Tower = Math.round(100 * (this.stats[team].redFirstTowers / this.stats[team].redMatchesPlayed));
			return Tower;
		}
	}, {
		key: "Dragon",
		value: function Dragon(team) {
			var Dragon = Math.round(100 * (this.stats[team].firstDragons / this.stats[team].matchesPlayed));
			return Dragon;
		}
	}, {
		key: "blueDragon",
		value: function blueDragon(team) {
			var Dragon = Math.round(100 * (this.stats[team].blueFirstDragons / this.stats[team].blueMatchesPlayed));
			return Dragon;
		}
	}, {
		key: "redDragon",
		value: function redDragon(team) {
			var Dragon = Math.round(100 * (this.stats[team].redFirstDragons / this.stats[team].redMatchesPlayed));
			return Dragon;
		}
	}]);

	return StatsClass;
}();

exports.default = StatsClass;

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _StatsClass = require('./StatsClass');

var _StatsClass2 = _interopRequireDefault(_StatsClass);

var _StatCircle = require('./StatCircle');

var _StatCircle2 = _interopRequireDefault(_StatCircle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamStats = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionStats: store.regions.regionStats,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(TeamStats, _Component);

	function TeamStats(props) {
		_classCallCheck(this, TeamStats);

		var _this = _possibleConstructorReturn(this, (TeamStats.__proto__ || Object.getPrototypeOf(TeamStats)).call(this, props));

		_this.stats = new _StatsClass2.default(_this.props.regionStats);
		return _this;
	}

	_createClass(TeamStats, [{
		key: 'getPlayerFBStats',
		value: function getPlayerFBStats(teamName) {
			var team = this.props.regionStats[teamName];
			var players = [];
			for (var player in team.playersMatchesPlayed) {
				var matchesPlayed = team.playersMatchesPlayed[player];
				var firstBlood = 100 * ((team.firstBloodPlayers[player] + team.firstBloodAssistPlayers[player]) / matchesPlayed);
				var firstBloodString = parseInt(firstBlood);

				var firstDeath = 100 * (team.firstDeathPlayers[player] / matchesPlayed);
				var firstDeathString = parseInt(firstDeath);

				players.push((0, _preact.h)(
					'tr',
					null,
					(0, _preact.h)(
						'td',
						null,
						player.replace(teamName, '')
					),
					(0, _preact.h)(
						'td',
						null,
						firstBloodString
					),
					(0, _preact.h)(
						'td',
						null,
						firstDeathString
					),
					(0, _preact.h)(
						'td',
						null,
						matchesPlayed
					)
				));
			}

			return (0, _preact.h)(
				'table',
				{ 'class': 'matches__table' },
				(0, _preact.h)(
					'tr',
					null,
					(0, _preact.h)('th', null),
					(0, _preact.h)(
						'th',
						null,
						'FB%'
					),
					(0, _preact.h)(
						'th',
						null,
						'FD%'
					),
					(0, _preact.h)(
						'th',
						null,
						'SS'
					)
				),
				players
			);
		}
	}, {
		key: 'getDragonStats',
		value: function getDragonStats() {
			var team1Stats = this.props.regionStats[this.props.team1];
			var team2Stats = this.props.regionStats[this.props.team2];

			return '';
		}
	}, {
		key: 'getPositionTowerStats',
		value: function getPositionTowerStats(teamName) {
			var team = this.props.regionStats[teamName];
			var positions = [];

			positions = this.getPositionTowerStat(positions, team, 'firstTowerPosition', 'firstEnemyTowerPosition', 'matchesPlayed', '');
			positions = this.getPositionTowerStat(positions, team, 'firstBlueTowerPosition', 'firstBlueEnemyTowerPosition', 'blueMatchesPlayed', 'colour__blue');
			positions = this.getPositionTowerStat(positions, team, 'firstRedTowerPosition', 'firstRedEnemyTowerPosition', 'redMatchesPlayed', 'colour__red');

			return (0, _preact.h)(
				'table',
				{ 'class': 'matches__table' },
				(0, _preact.h)(
					'tr',
					null,
					(0, _preact.h)('th', null),
					(0, _preact.h)(
						'th',
						null,
						'GET%'
					),
					(0, _preact.h)(
						'th',
						null,
						'LOSE%'
					)
				),
				positions
			);
		}
	}, {
		key: 'getPositionTowerStat',
		value: function getPositionTowerStat(positions, team, var1, var2, var3, classStyle) {
			for (var position in team.firstTowerPosition) {

				var matchesPlayed = team[var3];

				var firstTowerPercentage = parseInt(team[var1][position] / matchesPlayed * 100);
				var firstEnemyTowerPercentage = parseInt(team[var2][position] / matchesPlayed * 100);

				positions.push((0, _preact.h)(
					'tr',
					{ className: classStyle },
					(0, _preact.h)(
						'td',
						null,
						position.replace('_LANE', '')
					),
					(0, _preact.h)(
						'td',
						null,
						firstTowerPercentage + '%'
					),
					(0, _preact.h)(
						'td',
						null,
						firstEnemyTowerPercentage + '%'
					)
				));
			}

			return positions;
		}
	}, {
		key: 'renderCircleStats',
		value: function renderCircleStats() {
			if (!this.props.team1 || !this.props.team2) {
				return '';
			}
			return (0, _preact.h)(
				'div',
				{ className: 'matches__columns' },
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'First Blood:'
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team1
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueFB(this.props.team1),
								red: this.stats.redFB(this.props.team1),
								fbText: this.stats.FB(this.props.team1) + '%'
							})
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team2
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueFB(this.props.team2),
								red: this.stats.redFB(this.props.team2),
								fbText: this.stats.FB(this.props.team2) + '%'
							})
						)
					)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'First Dragon:'
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team1
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueDragon(this.props.team1),
								red: this.stats.redDragon(this.props.team1),
								fbText: this.stats.Dragon(this.props.team1) + '%'
							})
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team2
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueDragon(this.props.team2),
								red: this.stats.redDragon(this.props.team2),
								fbText: this.stats.Dragon(this.props.team2) + '%'
							})
						)
					)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'h2',
						null,
						'First Tower:'
					),
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team1
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueTower(this.props.team1),
								red: this.stats.redTower(this.props.team1),
								fbText: this.stats.Tower(this.props.team1) + '%'
							})
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  no-break' },
							(0, _preact.h)(
								'h3',
								null,
								this.props.team2
							),
							(0, _preact.h)(_StatCircle2.default, {
								blue: this.stats.blueTower(this.props.team2),
								red: this.stats.redTower(this.props.team2),
								fbText: this.stats.Tower(this.props.team2) + '%'
							})
						)
					)
				)
			);
		}
	}, {
		key: 'renderPlayerStats',
		value: function renderPlayerStats() {
			if (!this.props.team1 || !this.props.team2) {
				return '';
			}
			return (0, _preact.h)(
				'div',
				{ className: 'matches__columns' },
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half  bdr-right' },
							this.getPlayerFBStats(this.props.team1)
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half' },
							this.getPlayerFBStats(this.props.team2)
						)
					)
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					this.getDragonStats()
				),
				(0, _preact.h)(
					'div',
					{ className: 'matches__column' },
					(0, _preact.h)(
						'div',
						{ 'class': 'matches__columns' },
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half bdr-right' },
							this.getPositionTowerStats(this.props.team1)
						),
						(0, _preact.h)(
							'div',
							{ 'class': 'matches__column  matches__column--half' },
							this.getPositionTowerStats(this.props.team2)
						)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				null,
				(0, _preact.h)(
					'div',
					null,
					this.renderCircleStats()
				),
				(0, _preact.h)(
					'div',
					null,
					this.renderPlayerStats()
				)
			);
		}
	}]);

	return TeamStats;
}(_preact.Component)) || _class);
exports.default = TeamStats;

},{"./StatCircle":29,"./StatsClass":30,"preact":2,"preact-redux":1}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _MatchElements = require('./MatchElements');

var _MatchElements2 = _interopRequireDefault(_MatchElements);

var _TeamStats = require('./TeamStats');

var _TeamStats2 = _interopRequireDefault(_TeamStats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchUp = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeRegion: store.config.activeRegion,
		regionData: store.regions.regionData,
		team1: store.config.team1,
		team2: store.config.team2
	};
}), _dec(_class = function (_Component) {
	_inherits(MatchUp, _Component);

	function MatchUp() {
		_classCallCheck(this, MatchUp);

		return _possibleConstructorReturn(this, (MatchUp.__proto__ || Object.getPrototypeOf(MatchUp)).apply(this, arguments));
	}

	_createClass(MatchUp, [{
		key: 'updateRegion',
		value: function updateRegion(e) {
			this.props.dispatch({
				type: 'UPDATE_REGION',
				payload: fetch('/api/' + e.target.value + '/light.json').then(function (response) {
					return response.json();
				})
			});

			this.props.dispatch({
				type: 'UPDATE_REGION_STATS',
				payload: fetch('/api/' + e.target.value + '/stats.json').then(function (response) {
					return response.json();
				})
			});

			this.props.dispatch({
				type: 'UPDATE_REGION_TEXT',
				text: e.target.value
			});
		}
	}, {
		key: 'updateTeam1',
		value: function updateTeam1(e) {
			this.props.dispatch({
				type: 'UPDATE_TEAM1',
				text: e.target.value
			});
		}
	}, {
		key: 'updateTeam2',
		value: function updateTeam2(e) {
			this.props.dispatch({
				type: 'UPDATE_TEAM2',
				text: e.target.value
			});
		}
	}, {
		key: 'getTeams',
		value: function getTeams() {
			if (this.props.regionData) {
				var teams = [];
				var options = [];
				Array.from(this.props.regionData, function (game) {
					var team1 = game['teamNames'][0];
					var team2 = game['teamNames'][1];

					if (!teams.includes(team1)) {
						teams.push(team1);
					}
					if (!teams.includes(team2)) {
						teams.push(team2);
					}
				});

				teams.sort();

				Array.from(teams, function (team) {
					options.push((0, _preact.h)(
						'option',
						{ value: team },
						team
					));
				});

				return options;
			}

			return false;
		}
	}, {
		key: 'renderRegions',
		value: function renderRegions() {
			var _this2 = this;

			return (0, _preact.h)(
				'div',
				null,
				(0, _preact.h)(
					'select',
					{ onChange: function onChange(e) {
							return _this2.updateRegion(e);
						}, value: this.props.activeRegion },
					(0, _preact.h)(
						'option',
						{ disabled: true, selected: true, value: '' },
						'Select Region'
					),
					(0, _preact.h)(
						'option',
						{ value: 'LCK' },
						'LCK'
					),
					(0, _preact.h)(
						'option',
						{ value: 'CBLOL' },
						'CBLOL'
					),
					(0, _preact.h)(
						'option',
						{ value: 'EULCS' },
						'EULCS'
					),
					(0, _preact.h)(
						'option',
						{ value: 'NALCS' },
						'NALCS'
					),
					(0, _preact.h)(
						'option',
						{ value: 'TCL' },
						'TCL'
					),
					(0, _preact.h)(
						'option',
						{ value: 'LMS' },
						'LMS'
					),
					(0, _preact.h)(
						'option',
						{ value: 'OPL' },
						'OPL'
					)
				)
			);
		}
	}, {
		key: 'renderTeams',
		value: function renderTeams() {
			var _this3 = this;

			var teams = this.getTeams();
			if (teams) {
				return (0, _preact.h)(
					'div',
					null,
					(0, _preact.h)(
						'select',
						{
							onChange: function onChange(e) {
								return _this3.updateTeam1(e);
							},
							value: this.props.team1 ? this.props.team1 : 'select' },
						(0, _preact.h)(
							'option',
							{ selected: true, disabled: true, value: 'select' },
							'Select Team'
						),
						teams
					),
					(0, _preact.h)(
						'select',
						{
							onChange: function onChange(e) {
								return _this3.updateTeam2(e);
							},
							value: this.props.team2 ? this.props.team2 : 'select' },
						(0, _preact.h)(
							'option',
							{ selected: true, disabled: true, value: 'select' },
							'Select Team'
						),
						teams
					)
				);
			} else {
				return (0, _preact.h)(
					'div',
					null,
					(0, _preact.h)('select', { disabled: true }),
					(0, _preact.h)('select', { disabled: true })
				);
			}
		}
	}, {
		key: 'renderMatchup',
		value: function renderMatchup() {
			if (this.props.team1 && this.props.team2) {
				return (0, _preact.h)(_MatchElements2.default, { team1: this.props.team1, team2: this.props.team2, games: this.props.regionData, store: this.props.store });
			}
		}
	}, {
		key: 'renderStats',
		value: function renderStats() {
			if (this.props.team1 && this.props.team2) {
				return (0, _preact.h)(_TeamStats2.default, { team1: this.props.team1, team2: this.props.team2, store: this.props.store });
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				null,
				(0, _preact.h)(
					'div',
					{ 'class': 'matches__selects' },
					(0, _preact.h)(
						'div',
						null,
						this.renderRegions()
					),
					(0, _preact.h)(
						'div',
						null,
						this.renderTeams()
					)
				),
				(0, _preact.h)(
					'div',
					null,
					this.renderStats()
				),
				(0, _preact.h)(
					'div',
					null,
					this.renderMatchup()
				)
			);
		}
	}]);

	return MatchUp;
}(_preact.Component)) || _class);
exports.default = MatchUp;

},{"./MatchElements":27,"./TeamStats":31,"preact":2,"preact-redux":1}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MatchElement = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        team1: store.config.team1,
        team2: store.config.team2
    };
}), _dec(_class = function (_Component) {
    _inherits(MatchElement, _Component);

    function MatchElement(props) {
        _classCallCheck(this, MatchElement);

        return _possibleConstructorReturn(this, (MatchElement.__proto__ || Object.getPrototypeOf(MatchElement)).call(this, props));
    }

    _createClass(MatchElement, [{
        key: 'handleCardClick',
        value: function handleCardClick() {
            this.props.dispatch({
                type: 'UPDATE_TEAMS',
                team1: this.props.match.team1acro,
                team2: this.props.match.team2acro,
                region: this.props.match.region
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                { className: 'match-card', onClick: this.handleCardClick.bind(this) },
                (0, _preact.h)(
                    'div',
                    { className: 'match-card__league' },
                    this.props.match.region
                ),
                (0, _preact.h)(
                    'div',
                    { className: 'match-card__teams' },
                    (0, _preact.h)(
                        'p',
                        null,
                        this.props.match.team1acro
                    ),
                    (0, _preact.h)(
                        'p',
                        null,
                        'vs'
                    ),
                    (0, _preact.h)(
                        'p',
                        null,
                        this.props.match.team2acro
                    )
                ),
                (0, _preact.h)(
                    'div',
                    { className: 'match-card__time' },
                    this.props.time
                )
            );
        }
    }]);

    return MatchElement;
}(_preact.Component)) || _class);
exports.default = MatchElement;

},{"preact":2,"preact-redux":1}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _MatchElement = require('./MatchElement');

var _MatchElement2 = _interopRequireDefault(_MatchElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Matches = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        loading: store.matches.loading,
        matches: store.matches.matches
    };
}), _dec(_class = function (_Component) {
    _inherits(Matches, _Component);

    function Matches(props) {
        _classCallCheck(this, Matches);

        // set initial time:
        var _this = _possibleConstructorReturn(this, (Matches.__proto__ || Object.getPrototypeOf(Matches)).call(this, props));

        _this.state = {
            time: new Date().getTime() / 1000
        };
        _this.fetchMatches();
        return _this;
    }

    _createClass(Matches, [{
        key: 'fetchMatches',
        value: function fetchMatches() {
            this.props.dispatch({
                type: 'GET_MATCHES',
                payload: fetch('/api/schedule.json').then(function (response) {
                    return response.json();
                })
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // update time every second
            this.timer = setInterval(function () {
                _this2.setState({
                    time: new Date().getTime() / 1000
                });
            }, 1000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // stop when not renderable
            clearInterval(this.timer);
        }
    }, {
        key: 'getTimeDifference',
        value: function getTimeDifference(time1, time2) {
            if (time1 > time2) {
                var difference = time1 - time2;
                var days = Math.floor(difference / (3600 * 24));
                var formattedDays = ("0" + days).slice(-2);
                difference -= days * 3600 * 24;
                var hrs = Math.floor(difference / 3600);
                var formattedHrs = ("0" + hrs).slice(-2);
                difference -= hrs * 3600;
                var mnts = Math.floor(difference / 60);
                var formattedMnts = ("0" + mnts).slice(-2);
                difference -= mnts * 60;
                var seconds = Math.floor(difference);
                var formattedSeconds = ("0" + seconds).slice(-2);
                return formattedDays + ':' + formattedHrs + ':' + formattedMnts + ':' + formattedSeconds;
            } else {
                return '00:00:00:00';
            }
        }
    }, {
        key: 'getNextMatches',
        value: function getNextMatches() {
            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            if (this.props.loading) {
                return 'Loading';
            }
            if (this.props.matches) {
                var matchElements = [];
                for (var index = 0; index < count; index++) {
                    if (this.props.matches.length > index) {
                        matchElements.push((0, _preact.h)(_MatchElement2.default, { store: this.props.store, match: this.props.matches[index], time: this.getTimeDifference(this.props.matches[index].datetime, this.state.time) }));
                    }
                }
                return matchElements;
            }
            return '';
        }
    }, {
        key: 'render',
        value: function render(props, state) {
            return (0, _preact.h)(
                'span',
                null,
                this.getNextMatches(10)
            );
        }
    }]);

    return Matches;
}(_preact.Component)) || _class);
exports.default = Matches;

},{"./MatchElement":33,"preact":2,"preact-redux":1}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavBar = function (_Component) {
	_inherits(NavBar, _Component);

	function NavBar() {
		_classCallCheck(this, NavBar);

		return _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).apply(this, arguments));
	}

	_createClass(NavBar, [{
		key: 'getLinks',
		value: function getLinks() {
			var _this2 = this;

			var options = {
				matchUp: 'Match Up',
				champs: 'Champs'
			};
			var links = [];

			var _loop = function _loop(option) {
				links.push((0, _preact.h)(
					'li',
					{ onClick: function onClick() {
							return _this2.props.updateAppType(option);
						} },
					options[option]
				));
			};

			for (var option in options) {
				_loop(option);
			}
			return links;
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'ul',
				null,
				this.getLinks()
			);
		}
	}]);

	return NavBar;
}(_preact.Component);

exports.default = NavBar;

},{"preact":2}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = config;
function config() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'UPDATE_REGION_TEXT':
			return _extends({}, state, {
				activeRegion: action.text,
				team1: false,
				team2: false
			});
		case 'UPDATE_TEAM1':
			return _extends({}, state, {
				team1: action.text
			});
		case 'UPDATE_TEAM2':
			return _extends({}, state, {
				team2: action.text
			});

		case 'UPDATE_TEAMS':
			return _extends({}, state, {
				team1: action.team1,
				team2: action.team2,
				activeRegion: action.region
			});

		default:
			return state;
	}
}

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _regions = require('./regions');

var _regions2 = _interopRequireDefault(_regions);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _stats = require('./stats');

var _stats2 = _interopRequireDefault(_stats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	regions: _regions2.default,
	config: _config2.default,
	matches: _matches2.default,
	stats: _stats2.default
});

},{"./config":36,"./matches":38,"./regions":39,"./stats":40,"redux":9}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = matches;
function matches() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case 'GET_MATCHES_PENDING':
            return _extends({}, state, {
                loading: true
            });
        case 'GET_MATCHES_FULFILLED':
            return _extends({}, state, {
                loading: false,
                matches: action.payload
            });

        default:
            return state;
    }
}

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = regions;
function regions() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'UPDATE_REGION_PENDING':
			return _extends({}, state, {
				regionLoading: true
			});
		case 'UPDATE_REGION_FULFILLED':
			return _extends({}, state, {
				regionData: action.payload,
				regionLoading: false
			});
		case 'UPDATE_REGION_STATS_PENDING':
			return _extends({}, state, {
				statsLoading: true
			});
		case 'UPDATE_REGION_STATS_FULFILLED':
			return _extends({}, state, {
				regionStats: action.payload,
				statsLoading: false
			});

		default:
			return state;
	}
}

},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = stats;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function stats() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { loading: 0 };
	var action = arguments[1];

	switch (action.type) {
		case 'FETCH_STATS_PENDING':
			return _extends({}, state, {
				loading: state.loading + 1
			});
		case 'FETCH_STATS_FULFILLED':
			return _extends({}, state, {
				loading: state.loading - 1,
				stats: _extends({}, state.stats, _defineProperty({}, action.meta, action.payload))
			});

		case 'SET_ALL_PATCHES':
			return _extends({}, state, {
				activePatches: action.patches
			});

		case 'SET_ALL_REGIONS':
			return _extends({}, state, {
				activeRegions: action.regions
			});

		case 'SET_ALL_VARIABLES':
			return _extends({}, state, {
				activeVariables: action.variables
			});

		case 'SET_MINPLAYED':
			return _extends({}, state, {
				minPlayed: action.minPlayed
			});

		default:
			return state;
	}
}

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require("redux-logger");

var _reduxPromiseMiddleware = require("redux-promise-middleware");

var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), (0, _reduxLogger.createLogger)());

exports.default = (0, _redux.createStore)(_index2.default, middleware);

},{"./index":37,"redux":9,"redux-logger":5,"redux-promise-middleware":6,"redux-thunk":8}],42:[function(require,module,exports){
'use strict';

var _LeagueReactApp = require('./classes/LeagueReactApp');

var _LeagueReactApp2 = _interopRequireDefault(_LeagueReactApp);

var _LeagueMatchesApp = require('./classes/LeagueMatchesApp');

var _LeagueMatchesApp2 = _interopRequireDefault(_LeagueMatchesApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var leagueApp = document.querySelector('.js-league-app');
if (leagueApp) {
	new _LeagueReactApp2.default(leagueApp);
}

var leagueMatches = document.querySelector('.js-league-matches');
if (leagueMatches) {
	new _LeagueMatchesApp2.default(leagueMatches);
}

},{"./classes/LeagueMatchesApp":12,"./classes/LeagueReactApp":13}]},{},[42])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0LXJlZHV4L2Rpc3QvcHJlYWN0LXJlZHV4LmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtaGludC9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2Rpc3QvcmVkdXgtbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXByb21pc2UtbWlkZGxld2FyZS9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXByb21pc2UtbWlkZGxld2FyZS9kaXN0L2lzUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL3JlZHV4LmpzIiwibm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJzcmMvanMvY2xhc3Nlcy9MZWFndWVNYXRjaGVzQXBwLmpzIiwic3JjL2pzL2NsYXNzZXMvTGVhZ3VlUmVhY3RBcHAuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0FwcE1haW4uanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9NaW5QbGF5ZWQuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9QYXRjaGVzLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9DaGFtcHMvUmVnaW9ucy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL1N0YXRzQmxvY2suanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9Ub3BOYXYuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9WYXJpYWJsZXMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9pbmRleC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvQ2hhbXBGdW5jcy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvRmlsdGVycy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvU3RhdHMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01haW5MZWFndWVBcHAuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvTWF0Y2hDYXJkLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL01hdGNoRWxlbWVudHMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvUGxheWVycy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTWF0Y2hVcC9TdGF0Q2lyY2xlLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL1N0YXRzQ2xhc3MuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvVGVhbVN0YXRzLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaGVzL01hdGNoRWxlbWVudC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTWF0Y2hlcy9pbmRleC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTmF2QmFyLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9jb25maWcuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL3JlZHVjZXJzL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9tYXRjaGVzLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9yZWdpb25zLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9zdGF0cy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvcmVkdWNlcnMvc3RvcmUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdk9BO0FBQ0E7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LHFCQUFMO0FBQ0MsdUJBQ0ksS0FESjtBQUVDLGFBQVMsTUFBTSxPQUFOLEdBQWdCO0FBRjFCO0FBSUQsT0FBSyx1QkFBTDtBQUNDLHVCQUNJLEtBREo7QUFFQyxhQUFTLE1BQU0sT0FBTixHQUFnQixDQUYxQjtBQUdDLHdCQUNJLE1BQU0sS0FEVixzQkFFRSxPQUFPLElBRlQsRUFFaUIsT0FBTyxPQUZ4QjtBQUhEOztBQVNELE9BQUssaUJBQUw7QUFDQyx1QkFDSSxLQURKO0FBRUMsbUJBQWUsT0FBTztBQUZ2Qjs7QUFLRCxPQUFLLGlCQUFMO0FBQ0MsdUJBQ0ksS0FESjtBQUVDLG1CQUFlLE9BQU87QUFGdkI7O0FBS0QsT0FBSyxtQkFBTDtBQUNDLHVCQUNJLEtBREo7QUFFQyxxQkFBaUIsT0FBTztBQUZ6Qjs7QUFLRCxPQUFLLGVBQUw7QUFDQyx1QkFDSSxLQURKO0FBRUMsZUFBVyxPQUFPO0FBRm5COztBQUtEO0FBQ0MsVUFBTyxLQUFQO0FBekNGO0FBMkNBOzs7Ozs7Ozs7QUM1Q0Q7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLGFBQWEsNEJBQWdCLHVDQUFoQixFQUEwQyxnQ0FBMUMsQ0FBbkI7O2tCQUVlLHdCQUFZLGVBQVosRUFBcUIsVUFBckIsQzs7Ozs7QUNSZjs7OztBQUNBOzs7Ozs7QUFJQSxJQUFNLFlBQVksU0FBUyxhQUFULENBQXVCLGdCQUF2QixDQUFsQjtBQUNBLElBQUcsU0FBSCxFQUFjO0FBQ2IsS0FBSSx3QkFBSixDQUFtQixTQUFuQjtBQUNBOztBQUVELElBQU0sZ0JBQWdCLFNBQVMsYUFBVCxDQUF1QixvQkFBdkIsQ0FBdEI7QUFDQSxJQUFHLGFBQUgsRUFBa0I7QUFDakIsS0FBSSwwQkFBSixDQUFxQixhQUFyQjtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoJ3ByZWFjdCcpLCByZXF1aXJlKCdyZWR1eCcpKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ3ByZWFjdCcsICdyZWR1eCddLCBmYWN0b3J5KSA6XG5cdChnbG9iYWwucHJlYWN0UmVkdXggPSBmYWN0b3J5KGdsb2JhbC5wcmVhY3QsZ2xvYmFsLlJlZHV4KSk7XG59KHRoaXMsIChmdW5jdGlvbiAocHJlYWN0LHJlZHV4KSB7XG5cbnZhciBDaGlsZHJlbiA9IHtcblx0b25seTogZnVuY3Rpb24gb25seShjaGlsZHJlbikge1xuXHRcdHJldHVybiBjaGlsZHJlbiAmJiBjaGlsZHJlblswXSB8fCBudWxsO1xuXHR9XG59O1xuXG5mdW5jdGlvbiBwcm9wdHlwZSgpIHt9XG5wcm9wdHlwZS5pc1JlcXVpcmVkID0gcHJvcHR5cGU7XG5cbnZhciBQcm9wVHlwZXMgPSB7XG5cdGVsZW1lbnQ6IHByb3B0eXBlLFxuXHRmdW5jOiBwcm9wdHlwZSxcblx0c2hhcGU6IGZ1bmN0aW9uIHNoYXBlKCkge1xuXHRcdHJldHVybiBwcm9wdHlwZTtcblx0fSxcblx0aW5zdGFuY2VPZjogZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcblx0XHRyZXR1cm4gcHJvcHR5cGU7XG5cdH1cbn07XG5cbnZhciBzdWJzY3JpcHRpb25TaGFwZSA9IFByb3BUeXBlcy5zaGFwZSh7XG4gIHRyeVN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdHJ5VW5zdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG5vdGlmeU5lc3RlZFN1YnM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGlzU3Vic2NyaWJlZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cbnZhciBzdG9yZVNoYXBlID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgc3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZ2V0U3RhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn0pO1xuXG4vKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tZW1wdHkgKi9cbiAgfSBjYXRjaCAoZSkge31cbiAgLyogZXNsaW50LWVuYWJsZSBuby1lbXB0eSAqL1xufVxuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xufTtcblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG5cblxuXG5cblxuXG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxudmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG5cblxuXG5cblxuXG5cbnZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbnZhciBkaWRXYXJuQWJvdXRSZWNlaXZpbmdTdG9yZSA9IGZhbHNlO1xuZnVuY3Rpb24gd2FybkFib3V0UmVjZWl2aW5nU3RvcmUoKSB7XG4gIGlmIChkaWRXYXJuQWJvdXRSZWNlaXZpbmdTdG9yZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBkaWRXYXJuQWJvdXRSZWNlaXZpbmdTdG9yZSA9IHRydWU7XG5cbiAgd2FybmluZygnPFByb3ZpZGVyPiBkb2VzIG5vdCBzdXBwb3J0IGNoYW5naW5nIGBzdG9yZWAgb24gdGhlIGZseS4gJyArICdJdCBpcyBtb3N0IGxpa2VseSB0aGF0IHlvdSBzZWUgdGhpcyBlcnJvciBiZWNhdXNlIHlvdSB1cGRhdGVkIHRvICcgKyAnUmVkdXggMi54IGFuZCBSZWFjdCBSZWR1eCAyLnggd2hpY2ggbm8gbG9uZ2VyIGhvdCByZWxvYWQgcmVkdWNlcnMgJyArICdhdXRvbWF0aWNhbGx5LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3QtcmVkdXgvcmVsZWFzZXMvJyArICd0YWcvdjIuMC4wIGZvciB0aGUgbWlncmF0aW9uIGluc3RydWN0aW9ucy4nKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvdmlkZXIoKSB7XG4gIHZhciBfUHJvdmlkZXIkY2hpbGRDb250ZXg7XG5cbiAgdmFyIHN0b3JlS2V5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAnc3RvcmUnO1xuICB2YXIgc3ViS2V5ID0gYXJndW1lbnRzWzFdO1xuXG4gIHZhciBzdWJzY3JpcHRpb25LZXkgPSBzdWJLZXkgfHwgc3RvcmVLZXkgKyAnU3Vic2NyaXB0aW9uJztcblxuICB2YXIgUHJvdmlkZXIgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgIGluaGVyaXRzKFByb3ZpZGVyLCBfQ29tcG9uZW50KTtcblxuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICB2YXIgX3JlZjtcblxuICAgICAgcmV0dXJuIF9yZWYgPSB7fSwgX3JlZltzdG9yZUtleV0gPSB0aGlzW3N0b3JlS2V5XSwgX3JlZltzdWJzY3JpcHRpb25LZXldID0gbnVsbCwgX3JlZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUHJvdmlkZXIocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFByb3ZpZGVyKTtcblxuICAgICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgX3RoaXNbc3RvcmVLZXldID0gcHJvcHMuc3RvcmU7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgUHJvdmlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBDaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gUHJvdmlkZXI7XG4gIH0ocHJlYWN0LkNvbXBvbmVudCk7XG5cbiAge1xuICAgIFByb3ZpZGVyLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgICAgaWYgKHRoaXNbc3RvcmVLZXldICE9PSBuZXh0UHJvcHMuc3RvcmUpIHtcbiAgICAgICAgd2FybkFib3V0UmVjZWl2aW5nU3RvcmUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgUHJvdmlkZXIuY2hpbGRDb250ZXh0VHlwZXMgPSAoX1Byb3ZpZGVyJGNoaWxkQ29udGV4ID0ge30sIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdG9yZUtleV0gPSBzdG9yZVNoYXBlLmlzUmVxdWlyZWQsIF9Qcm92aWRlciRjaGlsZENvbnRleFtzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9Qcm92aWRlciRjaGlsZENvbnRleCk7XG5cbiAgcmV0dXJuIFByb3ZpZGVyO1xufVxuXG52YXIgUHJvdmlkZXIgPSBjcmVhdGVQcm92aWRlcigpO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1LCBZYWhvbyEgSW5jLlxuICogQ29weXJpZ2h0cyBsaWNlbnNlZCB1bmRlciB0aGUgTmV3IEJTRCBMaWNlbnNlLiBTZWUgdGhlIGFjY29tcGFueWluZyBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zLlxuICovXG52YXIgUkVBQ1RfU1RBVElDUyA9IHtcbiAgICBjaGlsZENvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBjb250ZXh0VHlwZXM6IHRydWUsXG4gICAgZGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIGRpc3BsYXlOYW1lOiB0cnVlLFxuICAgIGdldERlZmF1bHRQcm9wczogdHJ1ZSxcbiAgICBtaXhpbnM6IHRydWUsXG4gICAgcHJvcFR5cGVzOiB0cnVlLFxuICAgIHR5cGU6IHRydWVcbn07XG5cbnZhciBLTk9XTl9TVEFUSUNTID0ge1xuICAgIG5hbWU6IHRydWUsXG4gICAgbGVuZ3RoOiB0cnVlLFxuICAgIHByb3RvdHlwZTogdHJ1ZSxcbiAgICBjYWxsZXI6IHRydWUsXG4gICAgY2FsbGVlOiB0cnVlLFxuICAgIGFyZ3VtZW50czogdHJ1ZSxcbiAgICBhcml0eTogdHJ1ZVxufTtcblxudmFyIGRlZmluZVByb3BlcnR5JDEgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBnZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZiAmJiBnZXRQcm90b3R5cGVPZihPYmplY3QpO1xuXG52YXIgaG9pc3ROb25SZWFjdFN0YXRpY3MgPSBmdW5jdGlvbiBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIHNvdXJjZUNvbXBvbmVudCwgYmxhY2tsaXN0KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2VDb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIGRvbid0IGhvaXN0IG92ZXIgc3RyaW5nIChodG1sKSBjb21wb25lbnRzXG5cbiAgICAgICAgaWYgKG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgICAgICAgdmFyIGluaGVyaXRlZENvbXBvbmVudCA9IGdldFByb3RvdHlwZU9mKHNvdXJjZUNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoaW5oZXJpdGVkQ29tcG9uZW50ICYmIGluaGVyaXRlZENvbXBvbmVudCAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICAgICAgaG9pc3ROb25SZWFjdFN0YXRpY3ModGFyZ2V0Q29tcG9uZW50LCBpbmhlcml0ZWRDb21wb25lbnQsIGJsYWNrbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXMoc291cmNlQ29tcG9uZW50KTtcblxuICAgICAgICBpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZUNvbXBvbmVudCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGlmICghUkVBQ1RfU1RBVElDU1trZXldICYmICFLTk9XTl9TVEFUSUNTW2tleV0gJiYgKCFibGFja2xpc3QgfHwgIWJsYWNrbGlzdFtrZXldKSkge1xuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZUNvbXBvbmVudCwga2V5KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBdm9pZCBmYWlsdXJlcyBmcm9tIHJlYWQtb25seSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgIGRlZmluZVByb3BlcnR5JDEodGFyZ2V0Q29tcG9uZW50LCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0Q29tcG9uZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG59O1xuXG52YXIgaW52YXJpYW50ID0gZnVuY3Rpb24gKCkge307XG5cbi8vIGVuY2Fwc3VsYXRlcyB0aGUgc3Vic2NyaXB0aW9uIGxvZ2ljIGZvciBjb25uZWN0aW5nIGEgY29tcG9uZW50IHRvIHRoZSByZWR1eCBzdG9yZSwgYXNcbi8vIHdlbGwgYXMgbmVzdGluZyBzdWJzY3JpcHRpb25zIG9mIGRlc2NlbmRhbnQgY29tcG9uZW50cywgc28gdGhhdCB3ZSBjYW4gZW5zdXJlIHRoZVxuLy8gYW5jZXN0b3IgY29tcG9uZW50cyByZS1yZW5kZXIgYmVmb3JlIGRlc2NlbmRhbnRzXG5cbnZhciBDTEVBUkVEID0gbnVsbDtcbnZhciBudWxsTGlzdGVuZXJzID0ge1xuICBub3RpZnk6IGZ1bmN0aW9uIG5vdGlmeSgpIHt9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVMaXN0ZW5lckNvbGxlY3Rpb24oKSB7XG4gIC8vIHRoZSBjdXJyZW50L25leHQgcGF0dGVybiBpcyBjb3BpZWQgZnJvbSByZWR1eCdzIGNyZWF0ZVN0b3JlIGNvZGUuXG4gIC8vIFRPRE86IHJlZmFjdG9yK2V4cG9zZSB0aGF0IGNvZGUgdG8gYmUgcmV1c2FibGUgaGVyZT9cbiAgdmFyIGN1cnJlbnQgPSBbXTtcbiAgdmFyIG5leHQgPSBbXTtcblxuICByZXR1cm4ge1xuICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIG5leHQgPSBDTEVBUkVEO1xuICAgICAgY3VycmVudCA9IENMRUFSRUQ7XG4gICAgfSxcbiAgICBub3RpZnk6IGZ1bmN0aW9uIG5vdGlmeSgpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50ID0gbmV4dDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxpc3RlbmVyc1tpXSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9LFxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSBuZXh0ID0gY3VycmVudC5zbGljZSgpO1xuICAgICAgbmV4dC5wdXNoKGxpc3RlbmVyKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICBpZiAoIWlzU3Vic2NyaWJlZCB8fCBjdXJyZW50ID09PSBDTEVBUkVEKSByZXR1cm47XG4gICAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChuZXh0ID09PSBjdXJyZW50KSBuZXh0ID0gY3VycmVudC5zbGljZSgpO1xuICAgICAgICBuZXh0LnNwbGljZShuZXh0LmluZGV4T2YobGlzdGVuZXIpLCAxKTtcbiAgICAgIH07XG4gICAgfVxuICB9O1xufVxuXG52YXIgU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdWJzY3JpcHRpb24oc3RvcmUsIHBhcmVudFN1Yiwgb25TdGF0ZUNoYW5nZSkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIFN1YnNjcmlwdGlvbik7XG5cbiAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgdGhpcy5wYXJlbnRTdWIgPSBwYXJlbnRTdWI7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gb25TdGF0ZUNoYW5nZTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gIH1cblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmFkZE5lc3RlZFN1YiA9IGZ1bmN0aW9uIGFkZE5lc3RlZFN1YihsaXN0ZW5lcikge1xuICAgIHRoaXMudHJ5U3Vic2NyaWJlKCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5ub3RpZnlOZXN0ZWRTdWJzID0gZnVuY3Rpb24gbm90aWZ5TmVzdGVkU3VicygpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5ub3RpZnkoKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLmlzU3Vic2NyaWJlZCA9IGZ1bmN0aW9uIGlzU3Vic2NyaWJlZCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLnVuc3Vic2NyaWJlKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnRyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVN1YnNjcmliZSgpIHtcbiAgICBpZiAoIXRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSB0aGlzLnBhcmVudFN1YiA/IHRoaXMucGFyZW50U3ViLmFkZE5lc3RlZFN1Yih0aGlzLm9uU3RhdGVDaGFuZ2UpIDogdGhpcy5zdG9yZS5zdWJzY3JpYmUodGhpcy5vblN0YXRlQ2hhbmdlKTtcblxuICAgICAgdGhpcy5saXN0ZW5lcnMgPSBjcmVhdGVMaXN0ZW5lckNvbGxlY3Rpb24oKTtcbiAgICB9XG4gIH07XG5cbiAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS50cnlVbnN1YnNjcmliZSA9IGZ1bmN0aW9uIHRyeVVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlKSB7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcbiAgICAgIHRoaXMubGlzdGVuZXJzLmNsZWFyKCk7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IG51bGxMaXN0ZW5lcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBTdWJzY3JpcHRpb247XG59KCk7XG5cbnZhciBob3RSZWxvYWRpbmdWZXJzaW9uID0gMDtcbnZhciBkdW1teVN0YXRlID0ge307XG5mdW5jdGlvbiBub29wKCkge31cbmZ1bmN0aW9uIG1ha2VTZWxlY3RvclN0YXRlZnVsKHNvdXJjZVNlbGVjdG9yLCBzdG9yZSkge1xuICAvLyB3cmFwIHRoZSBzZWxlY3RvciBpbiBhbiBvYmplY3QgdGhhdCB0cmFja3MgaXRzIHJlc3VsdHMgYmV0d2VlbiBydW5zLlxuICB2YXIgc2VsZWN0b3IgPSB7XG4gICAgcnVuOiBmdW5jdGlvbiBydW5Db21wb25lbnRTZWxlY3Rvcihwcm9wcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIG5leHRQcm9wcyA9IHNvdXJjZVNlbGVjdG9yKHN0b3JlLmdldFN0YXRlKCksIHByb3BzKTtcbiAgICAgICAgaWYgKG5leHRQcm9wcyAhPT0gc2VsZWN0b3IucHJvcHMgfHwgc2VsZWN0b3IuZXJyb3IpIHtcbiAgICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgIHNlbGVjdG9yLnByb3BzID0gbmV4dFByb3BzO1xuICAgICAgICAgIHNlbGVjdG9yLmVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgc2VsZWN0b3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHNlbGVjdG9yO1xufVxuXG5mdW5jdGlvbiBjb25uZWN0QWR2YW5jZWQoXG4vKlxuICBzZWxlY3RvckZhY3RvcnkgaXMgYSBmdW5jIHRoYXQgaXMgcmVzcG9uc2libGUgZm9yIHJldHVybmluZyB0aGUgc2VsZWN0b3IgZnVuY3Rpb24gdXNlZCB0b1xuICBjb21wdXRlIG5ldyBwcm9wcyBmcm9tIHN0YXRlLCBwcm9wcywgYW5kIGRpc3BhdGNoLiBGb3IgZXhhbXBsZTpcbiAgICAgZXhwb3J0IGRlZmF1bHQgY29ubmVjdEFkdmFuY2VkKChkaXNwYXRjaCwgb3B0aW9ucykgPT4gKHN0YXRlLCBwcm9wcykgPT4gKHtcbiAgICAgIHRoaW5nOiBzdGF0ZS50aGluZ3NbcHJvcHMudGhpbmdJZF0sXG4gICAgICBzYXZlVGhpbmc6IGZpZWxkcyA9PiBkaXNwYXRjaChhY3Rpb25DcmVhdG9ycy5zYXZlVGhpbmcocHJvcHMudGhpbmdJZCwgZmllbGRzKSksXG4gICAgfSkpKFlvdXJDb21wb25lbnQpXG4gICBBY2Nlc3MgdG8gZGlzcGF0Y2ggaXMgcHJvdmlkZWQgdG8gdGhlIGZhY3Rvcnkgc28gc2VsZWN0b3JGYWN0b3JpZXMgY2FuIGJpbmQgYWN0aW9uQ3JlYXRvcnNcbiAgb3V0c2lkZSBvZiB0aGVpciBzZWxlY3RvciBhcyBhbiBvcHRpbWl6YXRpb24uIE9wdGlvbnMgcGFzc2VkIHRvIGNvbm5lY3RBZHZhbmNlZCBhcmUgcGFzc2VkIHRvXG4gIHRoZSBzZWxlY3RvckZhY3RvcnksIGFsb25nIHdpdGggZGlzcGxheU5hbWUgYW5kIFdyYXBwZWRDb21wb25lbnQsIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gICBOb3RlIHRoYXQgc2VsZWN0b3JGYWN0b3J5IGlzIHJlc3BvbnNpYmxlIGZvciBhbGwgY2FjaGluZy9tZW1vaXphdGlvbiBvZiBpbmJvdW5kIGFuZCBvdXRib3VuZFxuICBwcm9wcy4gRG8gbm90IHVzZSBjb25uZWN0QWR2YW5jZWQgZGlyZWN0bHkgd2l0aG91dCBtZW1vaXppbmcgcmVzdWx0cyBiZXR3ZWVuIGNhbGxzIHRvIHlvdXJcbiAgc2VsZWN0b3IsIG90aGVyd2lzZSB0aGUgQ29ubmVjdCBjb21wb25lbnQgd2lsbCByZS1yZW5kZXIgb24gZXZlcnkgc3RhdGUgb3IgcHJvcHMgY2hhbmdlLlxuKi9cbnNlbGVjdG9yRmFjdG9yeSkge1xuICB2YXIgX2NvbnRleHRUeXBlcywgX2NoaWxkQ29udGV4dFR5cGVzO1xuXG4gIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICB2YXIgX3JlZiRnZXREaXNwbGF5TmFtZSA9IF9yZWYuZ2V0RGlzcGxheU5hbWUsXG4gICAgICBnZXREaXNwbGF5TmFtZSA9IF9yZWYkZ2V0RGlzcGxheU5hbWUgPT09IHVuZGVmaW5lZCA/IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuICdDb25uZWN0QWR2YW5jZWQoJyArIG5hbWUgKyAnKSc7XG4gIH0gOiBfcmVmJGdldERpc3BsYXlOYW1lLFxuICAgICAgX3JlZiRtZXRob2ROYW1lID0gX3JlZi5tZXRob2ROYW1lLFxuICAgICAgbWV0aG9kTmFtZSA9IF9yZWYkbWV0aG9kTmFtZSA9PT0gdW5kZWZpbmVkID8gJ2Nvbm5lY3RBZHZhbmNlZCcgOiBfcmVmJG1ldGhvZE5hbWUsXG4gICAgICBfcmVmJHJlbmRlckNvdW50UHJvcCA9IF9yZWYucmVuZGVyQ291bnRQcm9wLFxuICAgICAgcmVuZGVyQ291bnRQcm9wID0gX3JlZiRyZW5kZXJDb3VudFByb3AgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IF9yZWYkcmVuZGVyQ291bnRQcm9wLFxuICAgICAgX3JlZiRzaG91bGRIYW5kbGVTdGF0ID0gX3JlZi5zaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMgPSBfcmVmJHNob3VsZEhhbmRsZVN0YXQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJHNob3VsZEhhbmRsZVN0YXQsXG4gICAgICBfcmVmJHN0b3JlS2V5ID0gX3JlZi5zdG9yZUtleSxcbiAgICAgIHN0b3JlS2V5ID0gX3JlZiRzdG9yZUtleSA9PT0gdW5kZWZpbmVkID8gJ3N0b3JlJyA6IF9yZWYkc3RvcmVLZXksXG4gICAgICBfcmVmJHdpdGhSZWYgPSBfcmVmLndpdGhSZWYsXG4gICAgICB3aXRoUmVmID0gX3JlZiR3aXRoUmVmID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkd2l0aFJlZixcbiAgICAgIGNvbm5lY3RPcHRpb25zID0gb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydnZXREaXNwbGF5TmFtZScsICdtZXRob2ROYW1lJywgJ3JlbmRlckNvdW50UHJvcCcsICdzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMnLCAnc3RvcmVLZXknLCAnd2l0aFJlZiddKTtcblxuICB2YXIgc3Vic2NyaXB0aW9uS2V5ID0gc3RvcmVLZXkgKyAnU3Vic2NyaXB0aW9uJztcbiAgdmFyIHZlcnNpb24gPSBob3RSZWxvYWRpbmdWZXJzaW9uKys7XG5cbiAgdmFyIGNvbnRleHRUeXBlcyA9IChfY29udGV4dFR5cGVzID0ge30sIF9jb250ZXh0VHlwZXNbc3RvcmVLZXldID0gc3RvcmVTaGFwZSwgX2NvbnRleHRUeXBlc1tzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9jb250ZXh0VHlwZXMpO1xuICB2YXIgY2hpbGRDb250ZXh0VHlwZXMgPSAoX2NoaWxkQ29udGV4dFR5cGVzID0ge30sIF9jaGlsZENvbnRleHRUeXBlc1tzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uU2hhcGUsIF9jaGlsZENvbnRleHRUeXBlcyk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBXaXRoQ29ubmVjdChXcmFwcGVkQ29tcG9uZW50KSB7XG4gICAgaW52YXJpYW50KHR5cGVvZiBXcmFwcGVkQ29tcG9uZW50ID09ICdmdW5jdGlvbicsICdZb3UgbXVzdCBwYXNzIGEgY29tcG9uZW50IHRvIHRoZSBmdW5jdGlvbiByZXR1cm5lZCBieSAnICsgKCdjb25uZWN0LiBJbnN0ZWFkIHJlY2VpdmVkICcgKyBKU09OLnN0cmluZ2lmeShXcmFwcGVkQ29tcG9uZW50KSkpO1xuXG4gICAgdmFyIHdyYXBwZWRDb21wb25lbnROYW1lID0gV3JhcHBlZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBXcmFwcGVkQ29tcG9uZW50Lm5hbWUgfHwgJ0NvbXBvbmVudCc7XG5cbiAgICB2YXIgZGlzcGxheU5hbWUgPSBnZXREaXNwbGF5TmFtZSh3cmFwcGVkQ29tcG9uZW50TmFtZSk7XG5cbiAgICB2YXIgc2VsZWN0b3JGYWN0b3J5T3B0aW9ucyA9IF9leHRlbmRzKHt9LCBjb25uZWN0T3B0aW9ucywge1xuICAgICAgZ2V0RGlzcGxheU5hbWU6IGdldERpc3BsYXlOYW1lLFxuICAgICAgbWV0aG9kTmFtZTogbWV0aG9kTmFtZSxcbiAgICAgIHJlbmRlckNvdW50UHJvcDogcmVuZGVyQ291bnRQcm9wLFxuICAgICAgc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzOiBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMsXG4gICAgICBzdG9yZUtleTogc3RvcmVLZXksXG4gICAgICB3aXRoUmVmOiB3aXRoUmVmLFxuICAgICAgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lLFxuICAgICAgd3JhcHBlZENvbXBvbmVudE5hbWU6IHdyYXBwZWRDb21wb25lbnROYW1lLFxuICAgICAgV3JhcHBlZENvbXBvbmVudDogV3JhcHBlZENvbXBvbmVudFxuICAgIH0pO1xuXG4gICAgdmFyIENvbm5lY3QgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICAgICAgaW5oZXJpdHMoQ29ubmVjdCwgX0NvbXBvbmVudCk7XG5cbiAgICAgIGZ1bmN0aW9uIENvbm5lY3QocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29ubmVjdCk7XG5cbiAgICAgICAgdmFyIF90aGlzID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwodGhpcywgcHJvcHMsIGNvbnRleHQpKTtcblxuICAgICAgICBfdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgX3RoaXMucmVuZGVyQ291bnQgPSAwO1xuICAgICAgICBfdGhpcy5zdG9yZSA9IHByb3BzW3N0b3JlS2V5XSB8fCBjb250ZXh0W3N0b3JlS2V5XTtcbiAgICAgICAgX3RoaXMucHJvcHNNb2RlID0gQm9vbGVhbihwcm9wc1tzdG9yZUtleV0pO1xuICAgICAgICBfdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2UgPSBfdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2UuYmluZChfdGhpcyk7XG5cbiAgICAgICAgaW52YXJpYW50KF90aGlzLnN0b3JlLCAnQ291bGQgbm90IGZpbmQgXCInICsgc3RvcmVLZXkgKyAnXCIgaW4gZWl0aGVyIHRoZSBjb250ZXh0IG9yIHByb3BzIG9mICcgKyAoJ1wiJyArIGRpc3BsYXlOYW1lICsgJ1wiLiBFaXRoZXIgd3JhcCB0aGUgcm9vdCBjb21wb25lbnQgaW4gYSA8UHJvdmlkZXI+LCAnKSArICgnb3IgZXhwbGljaXRseSBwYXNzIFwiJyArIHN0b3JlS2V5ICsgJ1wiIGFzIGEgcHJvcCB0byBcIicgKyBkaXNwbGF5TmFtZSArICdcIi4nKSk7XG5cbiAgICAgICAgX3RoaXMuaW5pdFNlbGVjdG9yKCk7XG4gICAgICAgIF90aGlzLmluaXRTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgfVxuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5nZXRDaGlsZENvbnRleHQgPSBmdW5jdGlvbiBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgICAgIHZhciBfcmVmMjtcblxuICAgICAgICAvLyBJZiB0aGlzIGNvbXBvbmVudCByZWNlaXZlZCBzdG9yZSBmcm9tIHByb3BzLCBpdHMgc3Vic2NyaXB0aW9uIHNob3VsZCBiZSB0cmFuc3BhcmVudFxuICAgICAgICAvLyB0byBhbnkgZGVzY2VuZGFudHMgcmVjZWl2aW5nIHN0b3JlK3N1YnNjcmlwdGlvbiBmcm9tIGNvbnRleHQ7IGl0IHBhc3NlcyBhbG9uZ1xuICAgICAgICAvLyBzdWJzY3JpcHRpb24gcGFzc2VkIHRvIGl0LiBPdGhlcndpc2UsIGl0IHNoYWRvd3MgdGhlIHBhcmVudCBzdWJzY3JpcHRpb24sIHdoaWNoIGFsbG93c1xuICAgICAgICAvLyBDb25uZWN0IHRvIGNvbnRyb2wgb3JkZXJpbmcgb2Ygbm90aWZpY2F0aW9ucyB0byBmbG93IHRvcC1kb3duLlxuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gdGhpcy5wcm9wc01vZGUgPyBudWxsIDogdGhpcy5zdWJzY3JpcHRpb247XG4gICAgICAgIHJldHVybiBfcmVmMiA9IHt9LCBfcmVmMltzdWJzY3JpcHRpb25LZXldID0gc3Vic2NyaXB0aW9uIHx8IHRoaXMuY29udGV4dFtzdWJzY3JpcHRpb25LZXldLCBfcmVmMjtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudERpZE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICghc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzKSByZXR1cm47XG5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGZpcmVzIGR1cmluZyBzZXJ2ZXIgc2lkZSByZW5kZXJpbmcsIGJ1dCBjb21wb25lbnREaWRNb3VudCBhbmRcbiAgICAgICAgLy8gY29tcG9uZW50V2lsbFVubW91bnQgZG8gbm90LiBCZWNhdXNlIG9mIHRoaXMsIHRyeVN1YnNjcmliZSBoYXBwZW5zIGR1cmluZyAuLi5kaWRNb3VudC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB1bnN1YnNjcmlwdGlvbiB3b3VsZCBuZXZlciB0YWtlIHBsYWNlIGR1cmluZyBTU1IsIGNhdXNpbmcgYSBtZW1vcnkgbGVhay5cbiAgICAgICAgLy8gVG8gaGFuZGxlIHRoZSBjYXNlIHdoZXJlIGEgY2hpbGQgY29tcG9uZW50IG1heSBoYXZlIHRyaWdnZXJlZCBhIHN0YXRlIGNoYW5nZSBieVxuICAgICAgICAvLyBkaXNwYXRjaGluZyBhbiBhY3Rpb24gaW4gaXRzIGNvbXBvbmVudFdpbGxNb3VudCwgd2UgaGF2ZSB0byByZS1ydW4gdGhlIHNlbGVjdCBhbmQgbWF5YmVcbiAgICAgICAgLy8gcmUtcmVuZGVyLlxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi50cnlTdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSkgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IucnVuKG5leHRQcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikgdGhpcy5zdWJzY3JpcHRpb24udHJ5VW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMgPSBub29wO1xuICAgICAgICB0aGlzLnN0b3JlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4gPSBub29wO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuZ2V0V3JhcHBlZEluc3RhbmNlID0gZnVuY3Rpb24gZ2V0V3JhcHBlZEluc3RhbmNlKCkge1xuICAgICAgICBpbnZhcmlhbnQod2l0aFJlZiwgJ1RvIGFjY2VzcyB0aGUgd3JhcHBlZCBpbnN0YW5jZSwgeW91IG5lZWQgdG8gc3BlY2lmeSAnICsgKCd7IHdpdGhSZWY6IHRydWUgfSBpbiB0aGUgb3B0aW9ucyBhcmd1bWVudCBvZiB0aGUgJyArIG1ldGhvZE5hbWUgKyAnKCkgY2FsbC4nKSk7XG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnNldFdyYXBwZWRJbnN0YW5jZSA9IGZ1bmN0aW9uIHNldFdyYXBwZWRJbnN0YW5jZShyZWYpIHtcbiAgICAgICAgdGhpcy53cmFwcGVkSW5zdGFuY2UgPSByZWY7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5pbml0U2VsZWN0b3IgPSBmdW5jdGlvbiBpbml0U2VsZWN0b3IoKSB7XG4gICAgICAgIHZhciBzb3VyY2VTZWxlY3RvciA9IHNlbGVjdG9yRmFjdG9yeSh0aGlzLnN0b3JlLmRpc3BhdGNoLCBzZWxlY3RvckZhY3RvcnlPcHRpb25zKTtcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IG1ha2VTZWxlY3RvclN0YXRlZnVsKHNvdXJjZVNlbGVjdG9yLCB0aGlzLnN0b3JlKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5pbml0U3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gaW5pdFN1YnNjcmlwdGlvbigpIHtcbiAgICAgICAgaWYgKCFzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHJldHVybjtcblxuICAgICAgICAvLyBwYXJlbnRTdWIncyBzb3VyY2Ugc2hvdWxkIG1hdGNoIHdoZXJlIHN0b3JlIGNhbWUgZnJvbTogcHJvcHMgdnMuIGNvbnRleHQuIEEgY29tcG9uZW50XG4gICAgICAgIC8vIGNvbm5lY3RlZCB0byB0aGUgc3RvcmUgdmlhIHByb3BzIHNob3VsZG4ndCB1c2Ugc3Vic2NyaXB0aW9uIGZyb20gY29udGV4dCwgb3IgdmljZSB2ZXJzYS5cbiAgICAgICAgdmFyIHBhcmVudFN1YiA9ICh0aGlzLnByb3BzTW9kZSA/IHRoaXMucHJvcHMgOiB0aGlzLmNvbnRleHQpW3N1YnNjcmlwdGlvbktleV07XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0aGlzLnN0b3JlLCBwYXJlbnRTdWIsIHRoaXMub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBgbm90aWZ5TmVzdGVkU3Vic2AgaXMgZHVwbGljYXRlZCB0byBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgdGhlIGNvbXBvbmVudCBpcyAgdW5tb3VudGVkIGluXG4gICAgICAgIC8vIHRoZSBtaWRkbGUgb2YgdGhlIG5vdGlmaWNhdGlvbiBsb29wLCB3aGVyZSBgdGhpcy5zdWJzY3JpcHRpb25gIHdpbGwgdGhlbiBiZSBudWxsLiBBblxuICAgICAgICAvLyBleHRyYSBudWxsIGNoZWNrIGV2ZXJ5IGNoYW5nZSBjYW4gYmUgYXZvaWRlZCBieSBjb3B5aW5nIHRoZSBtZXRob2Qgb250byBgdGhpc2AgYW5kIHRoZW5cbiAgICAgICAgLy8gcmVwbGFjaW5nIGl0IHdpdGggYSBuby1vcCBvbiB1bm1vdW50LiBUaGlzIGNhbiBwcm9iYWJseSBiZSBhdm9pZGVkIGlmIFN1YnNjcmlwdGlvbidzXG4gICAgICAgIC8vIGxpc3RlbmVycyBsb2dpYyBpcyBjaGFuZ2VkIHRvIG5vdCBjYWxsIGxpc3RlbmVycyB0aGF0IGhhdmUgYmVlbiB1bnN1YnNjcmliZWQgaW4gdGhlXG4gICAgICAgIC8vIG1pZGRsZSBvZiB0aGUgbm90aWZpY2F0aW9uIGxvb3AuXG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicyA9IHRoaXMuc3Vic2NyaXB0aW9uLm5vdGlmeU5lc3RlZFN1YnMuYmluZCh0aGlzLnN1YnNjcmlwdGlvbik7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5vblN0YXRlQ2hhbmdlID0gZnVuY3Rpb24gb25TdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4odGhpcy5wcm9wcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSkge1xuICAgICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlID0gdGhpcy5ub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGU7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZShkdW1teVN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUubm90aWZ5TmVzdGVkU3Vic09uQ29tcG9uZW50RGlkVXBkYXRlID0gZnVuY3Rpb24gbm90aWZ5TmVzdGVkU3Vic09uQ29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICAvLyBgY29tcG9uZW50RGlkVXBkYXRlYCBpcyBjb25kaXRpb25hbGx5IGltcGxlbWVudGVkIHdoZW4gYG9uU3RhdGVDaGFuZ2VgIGRldGVybWluZXMgaXRcbiAgICAgICAgLy8gbmVlZHMgdG8gbm90aWZ5IG5lc3RlZCBzdWJzLiBPbmNlIGNhbGxlZCwgaXQgdW5pbXBsZW1lbnRzIGl0c2VsZiB1bnRpbCBmdXJ0aGVyIHN0YXRlXG4gICAgICAgIC8vIGNoYW5nZXMgb2NjdXIuIERvaW5nIGl0IHRoaXMgd2F5IHZzIGhhdmluZyBhIHBlcm1hbmVudCBgY29tcG9uZW50RGlkVXBkYXRlYCB0aGF0IGRvZXNcbiAgICAgICAgLy8gYSBib29sZWFuIGNoZWNrIGV2ZXJ5IHRpbWUgYXZvaWRzIGFuIGV4dHJhIG1ldGhvZCBjYWxsIG1vc3Qgb2YgdGhlIHRpbWUsIHJlc3VsdGluZ1xuICAgICAgICAvLyBpbiBzb21lIHBlcmYgYm9vc3QuXG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlkVXBkYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm5vdGlmeU5lc3RlZFN1YnMoKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmlzU3Vic2NyaWJlZCA9IGZ1bmN0aW9uIGlzU3Vic2NyaWJlZCgpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odGhpcy5zdWJzY3JpcHRpb24pICYmIHRoaXMuc3Vic2NyaXB0aW9uLmlzU3Vic2NyaWJlZCgpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuYWRkRXh0cmFQcm9wcyA9IGZ1bmN0aW9uIGFkZEV4dHJhUHJvcHMocHJvcHMpIHtcbiAgICAgICAgaWYgKCF3aXRoUmVmICYmICFyZW5kZXJDb3VudFByb3AgJiYgISh0aGlzLnByb3BzTW9kZSAmJiB0aGlzLnN1YnNjcmlwdGlvbikpIHJldHVybiBwcm9wcztcbiAgICAgICAgLy8gbWFrZSBhIHNoYWxsb3cgY29weSBzbyB0aGF0IGZpZWxkcyBhZGRlZCBkb24ndCBsZWFrIHRvIHRoZSBvcmlnaW5hbCBzZWxlY3Rvci5cbiAgICAgICAgLy8gdGhpcyBpcyBlc3BlY2lhbGx5IGltcG9ydGFudCBmb3IgJ3JlZicgc2luY2UgdGhhdCdzIGEgcmVmZXJlbmNlIGJhY2sgdG8gdGhlIGNvbXBvbmVudFxuICAgICAgICAvLyBpbnN0YW5jZS4gYSBzaW5nbGV0b24gbWVtb2l6ZWQgc2VsZWN0b3Igd291bGQgdGhlbiBiZSBob2xkaW5nIGEgcmVmZXJlbmNlIHRvIHRoZVxuICAgICAgICAvLyBpbnN0YW5jZSwgcHJldmVudGluZyB0aGUgaW5zdGFuY2UgZnJvbSBiZWluZyBnYXJiYWdlIGNvbGxlY3RlZCwgYW5kIHRoYXQgd291bGQgYmUgYmFkXG4gICAgICAgIHZhciB3aXRoRXh0cmFzID0gX2V4dGVuZHMoe30sIHByb3BzKTtcbiAgICAgICAgaWYgKHdpdGhSZWYpIHdpdGhFeHRyYXMucmVmID0gdGhpcy5zZXRXcmFwcGVkSW5zdGFuY2U7XG4gICAgICAgIGlmIChyZW5kZXJDb3VudFByb3ApIHdpdGhFeHRyYXNbcmVuZGVyQ291bnRQcm9wXSA9IHRoaXMucmVuZGVyQ291bnQrKztcbiAgICAgICAgaWYgKHRoaXMucHJvcHNNb2RlICYmIHRoaXMuc3Vic2NyaXB0aW9uKSB3aXRoRXh0cmFzW3N1YnNjcmlwdGlvbktleV0gPSB0aGlzLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgcmV0dXJuIHdpdGhFeHRyYXM7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3I7XG4gICAgICAgIHNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvci5lcnJvcikge1xuICAgICAgICAgIHRocm93IHNlbGVjdG9yLmVycm9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwcmVhY3QuaChXcmFwcGVkQ29tcG9uZW50LCB0aGlzLmFkZEV4dHJhUHJvcHMoc2VsZWN0b3IucHJvcHMpKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbm5lY3Q7XG4gICAgfShwcmVhY3QuQ29tcG9uZW50KTtcblxuICAgIENvbm5lY3QuV3JhcHBlZENvbXBvbmVudCA9IFdyYXBwZWRDb21wb25lbnQ7XG4gICAgQ29ubmVjdC5kaXNwbGF5TmFtZSA9IGRpc3BsYXlOYW1lO1xuICAgIENvbm5lY3QuY2hpbGRDb250ZXh0VHlwZXMgPSBjaGlsZENvbnRleHRUeXBlcztcbiAgICBDb25uZWN0LmNvbnRleHRUeXBlcyA9IGNvbnRleHRUeXBlcztcblxuXG4gICAge1xuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIC8vIFdlIGFyZSBob3QgcmVsb2FkaW5nIVxuICAgICAgICBpZiAodGhpcy52ZXJzaW9uICE9PSB2ZXJzaW9uKSB7XG4gICAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICB0aGlzLmluaXRTZWxlY3RvcigpO1xuXG4gICAgICAgICAgLy8gSWYgYW55IGNvbm5lY3RlZCBkZXNjZW5kYW50cyBkb24ndCBob3QgcmVsb2FkIChhbmQgcmVzdWJzY3JpYmUgaW4gdGhlIHByb2Nlc3MpLCB0aGVpclxuICAgICAgICAgIC8vIGxpc3RlbmVycyB3aWxsIGJlIGxvc3Qgd2hlbiB3ZSB1bnN1YnNjcmliZS4gVW5mb3J0dW5hdGVseSwgYnkgY29weWluZyBvdmVyIGFsbFxuICAgICAgICAgIC8vIGxpc3RlbmVycywgdGhpcyBkb2VzIG1lYW4gdGhhdCB0aGUgb2xkIHZlcnNpb25zIG9mIGNvbm5lY3RlZCBkZXNjZW5kYW50cyB3aWxsIHN0aWxsIGJlXG4gICAgICAgICAgLy8gbm90aWZpZWQgb2Ygc3RhdGUgY2hhbmdlczsgaG93ZXZlciwgdGhlaXIgb25TdGF0ZUNoYW5nZSBmdW5jdGlvbiBpcyBhIG5vLW9wIHNvIHRoaXNcbiAgICAgICAgICAvLyBpc24ndCBhIGh1Z2UgZGVhbC5cbiAgICAgICAgICB2YXIgb2xkTGlzdGVuZXJzID0gW107XG5cbiAgICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIG9sZExpc3RlbmVycyA9IHRoaXMuc3Vic2NyaXB0aW9uLmxpc3RlbmVycy5nZXQoKTtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaW5pdFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgIGlmIChzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVN1YnNjcmliZSgpO1xuICAgICAgICAgICAgb2xkTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpczIuc3Vic2NyaXB0aW9uLmxpc3RlbmVycy5zdWJzY3JpYmUobGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBob2lzdE5vblJlYWN0U3RhdGljcyhDb25uZWN0LCBXcmFwcGVkQ29tcG9uZW50KTtcbiAgfTtcbn1cblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgaWYgKHggPT09IHkpIHtcbiAgICByZXR1cm4geCAhPT0gMCB8fCB5ICE9PSAwIHx8IDEgLyB4ID09PSAxIC8geTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkgcmV0dXJuIHRydWU7XG5cbiAgaWYgKCh0eXBlb2Ygb2JqQSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JqQSkpICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8ICh0eXBlb2Ygb2JqQiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JqQikpICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093bi5jYWxsKG9iakIsIGtleXNBW2ldKSB8fCAhaXMob2JqQVtrZXlzQVtpXV0sIG9iakJba2V5c0FbaV1dKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSAodHlwZW9mIGdsb2JhbCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoZ2xvYmFsKSkgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHNlbGYpKSA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8kMSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5JDEgPSBvYmplY3RQcm90byQxLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90byQxLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyQxID0gX1N5bWJvbCA/IF9TeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5JDEuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWckMSksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZyQxXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnJDFdID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnJDFdID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWckMV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byQyID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nJDEgPSBvYmplY3RQcm90byQyLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nJDEuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nO1xudmFyIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IF9TeW1ib2wgPyBfU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgICB9XG4gICAgcmV0dXJuIHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIE9iamVjdCh2YWx1ZSkgPyBnZXRSYXdUYWcodmFsdWUpIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT0gJ29iamVjdCc7XG59XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHZlcmlmeVBsYWluT2JqZWN0KHZhbHVlLCBkaXNwbGF5TmFtZSwgbWV0aG9kTmFtZSkge1xuICBpZiAoIWlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgd2FybmluZyhtZXRob2ROYW1lICsgJygpIGluICcgKyBkaXNwbGF5TmFtZSArICcgbXVzdCByZXR1cm4gYSBwbGFpbiBvYmplY3QuIEluc3RlYWQgcmVjZWl2ZWQgJyArIHZhbHVlICsgJy4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGdldENvbnN0YW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0Q29uc3RhbnRTZWxlY3RvcihkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHZhciBjb25zdGFudCA9IGdldENvbnN0YW50KGRpc3BhdGNoLCBvcHRpb25zKTtcblxuICAgIGZ1bmN0aW9uIGNvbnN0YW50U2VsZWN0b3IoKSB7XG4gICAgICByZXR1cm4gY29uc3RhbnQ7XG4gICAgfVxuICAgIGNvbnN0YW50U2VsZWN0b3IuZGVwZW5kc09uT3duUHJvcHMgPSBmYWxzZTtcbiAgICByZXR1cm4gY29uc3RhbnRTZWxlY3RvcjtcbiAgfTtcbn1cblxuLy8gZGVwZW5kc09uT3duUHJvcHMgaXMgdXNlZCBieSBjcmVhdGVNYXBUb1Byb3BzUHJveHkgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gcGFzcyBwcm9wcyBhcyBhcmdzXG4vLyB0byB0aGUgbWFwVG9Qcm9wcyBmdW5jdGlvbiBiZWluZyB3cmFwcGVkLiBJdCBpcyBhbHNvIHVzZWQgYnkgbWFrZVB1cmVQcm9wc1NlbGVjdG9yIHRvIGRldGVybWluZVxuLy8gd2hldGhlciBtYXBUb1Byb3BzIG5lZWRzIHRvIGJlIGludm9rZWQgd2hlbiBwcm9wcyBoYXZlIGNoYW5nZWQuXG4vLyBcbi8vIEEgbGVuZ3RoIG9mIG9uZSBzaWduYWxzIHRoYXQgbWFwVG9Qcm9wcyBkb2VzIG5vdCBkZXBlbmQgb24gcHJvcHMgZnJvbSB0aGUgcGFyZW50IGNvbXBvbmVudC5cbi8vIEEgbGVuZ3RoIG9mIHplcm8gaXMgYXNzdW1lZCB0byBtZWFuIG1hcFRvUHJvcHMgaXMgZ2V0dGluZyBhcmdzIHZpYSBhcmd1bWVudHMgb3IgLi4uYXJncyBhbmRcbi8vIHRoZXJlZm9yZSBub3QgcmVwb3J0aW5nIGl0cyBsZW5ndGggYWNjdXJhdGVseS4uXG5mdW5jdGlvbiBnZXREZXBlbmRzT25Pd25Qcm9wcyhtYXBUb1Byb3BzKSB7XG4gIHJldHVybiBtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzICE9PSBudWxsICYmIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IHVuZGVmaW5lZCA/IEJvb2xlYW4obWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgOiBtYXBUb1Byb3BzLmxlbmd0aCAhPT0gMTtcbn1cblxuLy8gVXNlZCBieSB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbiBhbmQgd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24sXG4vLyB0aGlzIGZ1bmN0aW9uIHdyYXBzIG1hcFRvUHJvcHMgaW4gYSBwcm94eSBmdW5jdGlvbiB3aGljaCBkb2VzIHNldmVyYWwgdGhpbmdzOlxuLy8gXG4vLyAgKiBEZXRlY3RzIHdoZXRoZXIgdGhlIG1hcFRvUHJvcHMgZnVuY3Rpb24gYmVpbmcgY2FsbGVkIGRlcGVuZHMgb24gcHJvcHMsIHdoaWNoXG4vLyAgICBpcyB1c2VkIGJ5IHNlbGVjdG9yRmFjdG9yeSB0byBkZWNpZGUgaWYgaXQgc2hvdWxkIHJlaW52b2tlIG9uIHByb3BzIGNoYW5nZXMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIGhhbmRsZXMgbWFwVG9Qcm9wcyBpZiByZXR1cm5zIGFub3RoZXIgZnVuY3Rpb24sIGFuZCB0cmVhdHMgdGhhdFxuLy8gICAgbmV3IGZ1bmN0aW9uIGFzIHRoZSB0cnVlIG1hcFRvUHJvcHMgZm9yIHN1YnNlcXVlbnQgY2FsbHMuXG4vLyAgICBcbi8vICAqIE9uIGZpcnN0IGNhbGwsIHZlcmlmaWVzIHRoZSBmaXJzdCByZXN1bHQgaXMgYSBwbGFpbiBvYmplY3QsIGluIG9yZGVyIHRvIHdhcm5cbi8vICAgIHRoZSBkZXZlbG9wZXIgdGhhdCB0aGVpciBtYXBUb1Byb3BzIGZ1bmN0aW9uIGlzIG5vdCByZXR1cm5pbmcgYSB2YWxpZCByZXN1bHQuXG4vLyAgICBcbmZ1bmN0aW9uIHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBUb1Byb3BzLCBtZXRob2ROYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbml0UHJveHlTZWxlY3RvcihkaXNwYXRjaCwgX3JlZikge1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IF9yZWYuZGlzcGxheU5hbWU7XG5cbiAgICB2YXIgcHJveHkgPSBmdW5jdGlvbiBtYXBUb1Byb3BzUHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcykge1xuICAgICAgcmV0dXJuIHByb3h5LmRlcGVuZHNPbk93blByb3BzID8gcHJveHkubWFwVG9Qcm9wcyhzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSA6IHByb3h5Lm1hcFRvUHJvcHMoc3RhdGVPckRpc3BhdGNoKTtcbiAgICB9O1xuXG4gICAgLy8gYWxsb3cgZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeSB0byBnZXQgb3duUHJvcHNcbiAgICBwcm94eS5kZXBlbmRzT25Pd25Qcm9wcyA9IHRydWU7XG5cbiAgICBwcm94eS5tYXBUb1Byb3BzID0gZnVuY3Rpb24gZGV0ZWN0RmFjdG9yeUFuZFZlcmlmeShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSB7XG4gICAgICBwcm94eS5tYXBUb1Byb3BzID0gbWFwVG9Qcm9wcztcbiAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMobWFwVG9Qcm9wcyk7XG4gICAgICB2YXIgcHJvcHMgPSBwcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcm94eS5tYXBUb1Byb3BzID0gcHJvcHM7XG4gICAgICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gZ2V0RGVwZW5kc09uT3duUHJvcHMocHJvcHMpO1xuICAgICAgICBwcm9wcyA9IHByb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgICAgfVxuXG4gICAgICB2ZXJpZnlQbGFpbk9iamVjdChwcm9wcywgZGlzcGxheU5hbWUsIG1ldGhvZE5hbWUpO1xuXG4gICAgICByZXR1cm4gcHJvcHM7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm94eTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24obWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiB0eXBlb2YgbWFwRGlzcGF0Y2hUb1Byb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1hcFRvUHJvcHNGdW5jKG1hcERpc3BhdGNoVG9Qcm9wcywgJ21hcERpc3BhdGNoVG9Qcm9wcycpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nKG1hcERpc3BhdGNoVG9Qcm9wcykge1xuICByZXR1cm4gIW1hcERpc3BhdGNoVG9Qcm9wcyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIHsgZGlzcGF0Y2g6IGRpc3BhdGNoIH07XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3QobWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiBtYXBEaXNwYXRjaFRvUHJvcHMgJiYgKHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG1hcERpc3BhdGNoVG9Qcm9wcykpID09PSAnb2JqZWN0JyA/IHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZnVuY3Rpb24gKGRpc3BhdGNoKSB7XG4gICAgcmV0dXJuIHJlZHV4LmJpbmRBY3Rpb25DcmVhdG9ycyhtYXBEaXNwYXRjaFRvUHJvcHMsIGRpc3BhdGNoKTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbnZhciBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzID0gW3doZW5NYXBEaXNwYXRjaFRvUHJvcHNJc0Z1bmN0aW9uLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNNaXNzaW5nLCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNPYmplY3RdO1xuXG5mdW5jdGlvbiB3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbihtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBTdGF0ZVRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwU3RhdGVUb1Byb3BzLCAnbWFwU3RhdGVUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc01pc3NpbmcobWFwU3RhdGVUb1Byb3BzKSB7XG4gIHJldHVybiAhbWFwU3RhdGVUb1Byb3BzID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxudmFyIGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgPSBbd2hlbk1hcFN0YXRlVG9Qcm9wc0lzRnVuY3Rpb24sIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc01pc3NpbmddO1xuXG5mdW5jdGlvbiBkZWZhdWx0TWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIG93blByb3BzLCBzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzKTtcbn1cblxuZnVuY3Rpb24gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRNZXJnZVByb3BzUHJveHkoZGlzcGF0Y2gsIF9yZWYpIHtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSBfcmVmLmRpc3BsYXlOYW1lLFxuICAgICAgICBwdXJlID0gX3JlZi5wdXJlLFxuICAgICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsID0gX3JlZi5hcmVNZXJnZWRQcm9wc0VxdWFsO1xuXG4gICAgdmFyIGhhc1J1bk9uY2UgPSBmYWxzZTtcbiAgICB2YXIgbWVyZ2VkUHJvcHMgPSB2b2lkIDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VQcm9wc1Byb3h5KHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gICAgICB2YXIgbmV4dE1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG5cbiAgICAgIGlmIChoYXNSdW5PbmNlKSB7XG4gICAgICAgIGlmICghcHVyZSB8fCAhYXJlTWVyZ2VkUHJvcHNFcXVhbChuZXh0TWVyZ2VkUHJvcHMsIG1lcmdlZFByb3BzKSkgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYXNSdW5PbmNlID0gdHJ1ZTtcbiAgICAgICAgbWVyZ2VkUHJvcHMgPSBuZXh0TWVyZ2VkUHJvcHM7XG5cbiAgICAgICAgdmVyaWZ5UGxhaW5PYmplY3QobWVyZ2VkUHJvcHMsIGRpc3BsYXlOYW1lLCAnbWVyZ2VQcm9wcycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gICAgfTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gd2hlbk1lcmdlUHJvcHNJc0Z1bmN0aW9uKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtZXJnZVByb3BzID09PSAnZnVuY3Rpb24nID8gd3JhcE1lcmdlUHJvcHNGdW5jKG1lcmdlUHJvcHMpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzT21pdHRlZChtZXJnZVByb3BzKSB7XG4gIHJldHVybiAhbWVyZ2VQcm9wcyA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1lcmdlUHJvcHM7XG4gIH0gOiB1bmRlZmluZWQ7XG59XG5cbnZhciBkZWZhdWx0TWVyZ2VQcm9wc0ZhY3RvcmllcyA9IFt3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24sIHdoZW5NZXJnZVByb3BzSXNPbWl0dGVkXTtcblxuZnVuY3Rpb24gdmVyaWZ5KHNlbGVjdG9yLCBtZXRob2ROYW1lLCBkaXNwbGF5TmFtZSkge1xuICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHZhbHVlIGZvciAnICsgbWV0aG9kTmFtZSArICcgaW4gJyArIGRpc3BsYXlOYW1lICsgJy4nKTtcbiAgfSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnbWFwU3RhdGVUb1Byb3BzJyB8fCBtZXRob2ROYW1lID09PSAnbWFwRGlzcGF0Y2hUb1Byb3BzJykge1xuICAgIGlmICghc2VsZWN0b3IuaGFzT3duUHJvcGVydHkoJ2RlcGVuZHNPbk93blByb3BzJykpIHtcbiAgICAgIHdhcm5pbmcoJ1RoZSBzZWxlY3RvciBmb3IgJyArIG1ldGhvZE5hbWUgKyAnIG9mICcgKyBkaXNwbGF5TmFtZSArICcgZGlkIG5vdCBzcGVjaWZ5IGEgdmFsdWUgZm9yIGRlcGVuZHNPbk93blByb3BzLicpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZlcmlmeShtYXBTdGF0ZVRvUHJvcHMsICdtYXBTdGF0ZVRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtYXBEaXNwYXRjaFRvUHJvcHMsICdtYXBEaXNwYXRjaFRvUHJvcHMnLCBkaXNwbGF5TmFtZSk7XG4gIHZlcmlmeShtZXJnZVByb3BzLCAnbWVyZ2VQcm9wcycsIGRpc3BsYXlOYW1lKTtcbn1cblxuZnVuY3Rpb24gaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGltcHVyZUZpbmFsUHJvcHNTZWxlY3RvcihzdGF0ZSwgb3duUHJvcHMpIHtcbiAgICByZXR1cm4gbWVyZ2VQcm9wcyhtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKSwgbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyksIG93blByb3BzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BhdGNoLCBfcmVmKSB7XG4gIHZhciBhcmVTdGF0ZXNFcXVhbCA9IF9yZWYuYXJlU3RhdGVzRXF1YWwsXG4gICAgICBhcmVPd25Qcm9wc0VxdWFsID0gX3JlZi5hcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsID0gX3JlZi5hcmVTdGF0ZVByb3BzRXF1YWw7XG5cbiAgdmFyIGhhc1J1bkF0TGVhc3RPbmNlID0gZmFsc2U7XG4gIHZhciBzdGF0ZSA9IHZvaWQgMDtcbiAgdmFyIG93blByb3BzID0gdm9pZCAwO1xuICB2YXIgc3RhdGVQcm9wcyA9IHZvaWQgMDtcbiAgdmFyIGRpc3BhdGNoUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBtZXJnZWRQcm9wcyA9IHZvaWQgMDtcblxuICBmdW5jdGlvbiBoYW5kbGVGaXJzdENhbGwoZmlyc3RTdGF0ZSwgZmlyc3RPd25Qcm9wcykge1xuICAgIHN0YXRlID0gZmlyc3RTdGF0ZTtcbiAgICBvd25Qcm9wcyA9IGZpcnN0T3duUHJvcHM7XG4gICAgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuICAgIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIGhhc1J1bkF0TGVhc3RPbmNlID0gdHJ1ZTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdQcm9wc0FuZE5ld1N0YXRlKCkge1xuICAgIHN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcblxuICAgIGlmIChtYXBEaXNwYXRjaFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMpIGRpc3BhdGNoUHJvcHMgPSBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKTtcblxuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTmV3UHJvcHMoKSB7XG4gICAgaWYgKG1hcFN0YXRlVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuXG4gICAgaWYgKG1hcERpc3BhdGNoVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdTdGF0ZSgpIHtcbiAgICB2YXIgbmV4dFN0YXRlUHJvcHMgPSBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIG93blByb3BzKTtcbiAgICB2YXIgc3RhdGVQcm9wc0NoYW5nZWQgPSAhYXJlU3RhdGVQcm9wc0VxdWFsKG5leHRTdGF0ZVByb3BzLCBzdGF0ZVByb3BzKTtcbiAgICBzdGF0ZVByb3BzID0gbmV4dFN0YXRlUHJvcHM7XG5cbiAgICBpZiAoc3RhdGVQcm9wc0NoYW5nZWQpIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG5cbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVTdWJzZXF1ZW50Q2FsbHMobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIHtcbiAgICB2YXIgcHJvcHNDaGFuZ2VkID0gIWFyZU93blByb3BzRXF1YWwobmV4dE93blByb3BzLCBvd25Qcm9wcyk7XG4gICAgdmFyIHN0YXRlQ2hhbmdlZCA9ICFhcmVTdGF0ZXNFcXVhbChuZXh0U3RhdGUsIHN0YXRlKTtcbiAgICBzdGF0ZSA9IG5leHRTdGF0ZTtcbiAgICBvd25Qcm9wcyA9IG5leHRPd25Qcm9wcztcblxuICAgIGlmIChwcm9wc0NoYW5nZWQgJiYgc3RhdGVDaGFuZ2VkKSByZXR1cm4gaGFuZGxlTmV3UHJvcHNBbmROZXdTdGF0ZSgpO1xuICAgIGlmIChwcm9wc0NoYW5nZWQpIHJldHVybiBoYW5kbGVOZXdQcm9wcygpO1xuICAgIGlmIChzdGF0ZUNoYW5nZWQpIHJldHVybiBoYW5kbGVOZXdTdGF0ZSgpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBwdXJlRmluYWxQcm9wc1NlbGVjdG9yKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSB7XG4gICAgcmV0dXJuIGhhc1J1bkF0TGVhc3RPbmNlID8gaGFuZGxlU3Vic2VxdWVudENhbGxzKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSA6IGhhbmRsZUZpcnN0Q2FsbChuZXh0U3RhdGUsIG5leHRPd25Qcm9wcyk7XG4gIH07XG59XG5cbi8vIFRPRE86IEFkZCBtb3JlIGNvbW1lbnRzXG5cbi8vIElmIHB1cmUgaXMgdHJ1ZSwgdGhlIHNlbGVjdG9yIHJldHVybmVkIGJ5IHNlbGVjdG9yRmFjdG9yeSB3aWxsIG1lbW9pemUgaXRzIHJlc3VsdHMsXG4vLyBhbGxvd2luZyBjb25uZWN0QWR2YW5jZWQncyBzaG91bGRDb21wb25lbnRVcGRhdGUgdG8gcmV0dXJuIGZhbHNlIGlmIGZpbmFsXG4vLyBwcm9wcyBoYXZlIG5vdCBjaGFuZ2VkLiBJZiBmYWxzZSwgdGhlIHNlbGVjdG9yIHdpbGwgYWx3YXlzIHJldHVybiBhIG5ld1xuLy8gb2JqZWN0IGFuZCBzaG91bGRDb21wb25lbnRVcGRhdGUgd2lsbCBhbHdheXMgcmV0dXJuIHRydWUuXG5cbmZ1bmN0aW9uIGZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkoZGlzcGF0Y2gsIF9yZWYyKSB7XG4gIHZhciBpbml0TWFwU3RhdGVUb1Byb3BzID0gX3JlZjIuaW5pdE1hcFN0YXRlVG9Qcm9wcyxcbiAgICAgIGluaXRNYXBEaXNwYXRjaFRvUHJvcHMgPSBfcmVmMi5pbml0TWFwRGlzcGF0Y2hUb1Byb3BzLFxuICAgICAgaW5pdE1lcmdlUHJvcHMgPSBfcmVmMi5pbml0TWVyZ2VQcm9wcyxcbiAgICAgIG9wdGlvbnMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydpbml0TWFwU3RhdGVUb1Byb3BzJywgJ2luaXRNYXBEaXNwYXRjaFRvUHJvcHMnLCAnaW5pdE1lcmdlUHJvcHMnXSk7XG5cbiAgdmFyIG1hcFN0YXRlVG9Qcm9wcyA9IGluaXRNYXBTdGF0ZVRvUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuICB2YXIgbWFwRGlzcGF0Y2hUb1Byb3BzID0gaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtZXJnZVByb3BzID0gaW5pdE1lcmdlUHJvcHMoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuXG4gIHtcbiAgICB2ZXJpZnlTdWJzZWxlY3RvcnMobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIG9wdGlvbnMuZGlzcGxheU5hbWUpO1xuICB9XG5cbiAgdmFyIHNlbGVjdG9yRmFjdG9yeSA9IG9wdGlvbnMucHVyZSA/IHB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5IDogaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gc2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCwgb3B0aW9ucyk7XG59XG5cbi8qXG4gIGNvbm5lY3QgaXMgYSBmYWNhZGUgb3ZlciBjb25uZWN0QWR2YW5jZWQuIEl0IHR1cm5zIGl0cyBhcmdzIGludG8gYSBjb21wYXRpYmxlXG4gIHNlbGVjdG9yRmFjdG9yeSwgd2hpY2ggaGFzIHRoZSBzaWduYXR1cmU6XG5cbiAgICAoZGlzcGF0Y2gsIG9wdGlvbnMpID0+IChuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykgPT4gbmV4dEZpbmFsUHJvcHNcbiAgXG4gIGNvbm5lY3QgcGFzc2VzIGl0cyBhcmdzIHRvIGNvbm5lY3RBZHZhbmNlZCBhcyBvcHRpb25zLCB3aGljaCB3aWxsIGluIHR1cm4gcGFzcyB0aGVtIHRvXG4gIHNlbGVjdG9yRmFjdG9yeSBlYWNoIHRpbWUgYSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSBpcyBpbnN0YW50aWF0ZWQgb3IgaG90IHJlbG9hZGVkLlxuXG4gIHNlbGVjdG9yRmFjdG9yeSByZXR1cm5zIGEgZmluYWwgcHJvcHMgc2VsZWN0b3IgZnJvbSBpdHMgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCBtZXJnZVByb3BzLFxuICBtZXJnZVByb3BzRmFjdG9yaWVzLCBhbmQgcHVyZSBhcmdzLlxuXG4gIFRoZSByZXN1bHRpbmcgZmluYWwgcHJvcHMgc2VsZWN0b3IgaXMgY2FsbGVkIGJ5IHRoZSBDb25uZWN0IGNvbXBvbmVudCBpbnN0YW5jZSB3aGVuZXZlclxuICBpdCByZWNlaXZlcyBuZXcgcHJvcHMgb3Igc3RvcmUgc3RhdGUuXG4gKi9cblxuZnVuY3Rpb24gbWF0Y2goYXJnLCBmYWN0b3JpZXMsIG5hbWUpIHtcbiAgZm9yICh2YXIgaSA9IGZhY3Rvcmllcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIHZhciByZXN1bHQgPSBmYWN0b3JpZXNbaV0oYXJnKTtcbiAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXNwYXRjaCwgb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBvZiB0eXBlICcgKyAodHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYXJnKSkgKyAnIGZvciAnICsgbmFtZSArICcgYXJndW1lbnQgd2hlbiBjb25uZWN0aW5nIGNvbXBvbmVudCAnICsgb3B0aW9ucy53cmFwcGVkQ29tcG9uZW50TmFtZSArICcuJyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0cmljdEVxdWFsKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5cbi8vIGNyZWF0ZUNvbm5lY3Qgd2l0aCBkZWZhdWx0IGFyZ3MgYnVpbGRzIHRoZSAnb2ZmaWNpYWwnIGNvbm5lY3QgYmVoYXZpb3IuIENhbGxpbmcgaXQgd2l0aFxuLy8gZGlmZmVyZW50IG9wdGlvbnMgb3BlbnMgdXAgc29tZSB0ZXN0aW5nIGFuZCBleHRlbnNpYmlsaXR5IHNjZW5hcmlvc1xuZnVuY3Rpb24gY3JlYXRlQ29ubmVjdCgpIHtcbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9LFxuICAgICAgX3JlZiRjb25uZWN0SE9DID0gX3JlZi5jb25uZWN0SE9DLFxuICAgICAgY29ubmVjdEhPQyA9IF9yZWYkY29ubmVjdEhPQyA9PT0gdW5kZWZpbmVkID8gY29ubmVjdEFkdmFuY2VkIDogX3JlZiRjb25uZWN0SE9DLFxuICAgICAgX3JlZiRtYXBTdGF0ZVRvUHJvcHNGID0gX3JlZi5tYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsXG4gICAgICBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YsXG4gICAgICBfcmVmJG1hcERpc3BhdGNoVG9Qcm8gPSBfcmVmLm1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwRGlzcGF0Y2hUb1BybyxcbiAgICAgIF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9IF9yZWYubWVyZ2VQcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1lcmdlUHJvcHNGYWN0b3JpZXMgPSBfcmVmJG1lcmdlUHJvcHNGYWN0b3IgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRNZXJnZVByb3BzRmFjdG9yaWVzIDogX3JlZiRtZXJnZVByb3BzRmFjdG9yLFxuICAgICAgX3JlZiRzZWxlY3RvckZhY3RvcnkgPSBfcmVmLnNlbGVjdG9yRmFjdG9yeSxcbiAgICAgIHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYkc2VsZWN0b3JGYWN0b3J5ID09PSB1bmRlZmluZWQgPyBmaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5IDogX3JlZiRzZWxlY3RvckZhY3Rvcnk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMpIHtcbiAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHt9O1xuXG4gICAgdmFyIF9yZWYyJHB1cmUgPSBfcmVmMi5wdXJlLFxuICAgICAgICBwdXJlID0gX3JlZjIkcHVyZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJHB1cmUsXG4gICAgICAgIF9yZWYyJGFyZVN0YXRlc0VxdWFsID0gX3JlZjIuYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIGFyZVN0YXRlc0VxdWFsID0gX3JlZjIkYXJlU3RhdGVzRXF1YWwgPT09IHVuZGVmaW5lZCA/IHN0cmljdEVxdWFsIDogX3JlZjIkYXJlU3RhdGVzRXF1YWwsXG4gICAgICAgIF9yZWYyJGFyZU93blByb3BzRXF1YSA9IF9yZWYyLmFyZU93blByb3BzRXF1YWwsXG4gICAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmMiRhcmVPd25Qcm9wc0VxdWEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZU93blByb3BzRXF1YSxcbiAgICAgICAgX3JlZjIkYXJlU3RhdGVQcm9wc0VxID0gX3JlZjIuYXJlU3RhdGVQcm9wc0VxdWFsLFxuICAgICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmMiRhcmVTdGF0ZVByb3BzRXEgPT09IHVuZGVmaW5lZCA/IHNoYWxsb3dFcXVhbCA6IF9yZWYyJGFyZVN0YXRlUHJvcHNFcSxcbiAgICAgICAgX3JlZjIkYXJlTWVyZ2VkUHJvcHNFID0gX3JlZjIuYXJlTWVyZ2VkUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbCA9IF9yZWYyJGFyZU1lcmdlZFByb3BzRSA9PT0gdW5kZWZpbmVkID8gc2hhbGxvd0VxdWFsIDogX3JlZjIkYXJlTWVyZ2VkUHJvcHNFLFxuICAgICAgICBleHRyYU9wdGlvbnMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmMiwgWydwdXJlJywgJ2FyZVN0YXRlc0VxdWFsJywgJ2FyZU93blByb3BzRXF1YWwnLCAnYXJlU3RhdGVQcm9wc0VxdWFsJywgJ2FyZU1lcmdlZFByb3BzRXF1YWwnXSk7XG5cbiAgICB2YXIgaW5pdE1hcFN0YXRlVG9Qcm9wcyA9IG1hdGNoKG1hcFN0YXRlVG9Qcm9wcywgbWFwU3RhdGVUb1Byb3BzRmFjdG9yaWVzLCAnbWFwU3RhdGVUb1Byb3BzJyk7XG4gICAgdmFyIGluaXRNYXBEaXNwYXRjaFRvUHJvcHMgPSBtYXRjaChtYXBEaXNwYXRjaFRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wc0ZhY3RvcmllcywgJ21hcERpc3BhdGNoVG9Qcm9wcycpO1xuICAgIHZhciBpbml0TWVyZ2VQcm9wcyA9IG1hdGNoKG1lcmdlUHJvcHMsIG1lcmdlUHJvcHNGYWN0b3JpZXMsICdtZXJnZVByb3BzJyk7XG5cbiAgICByZXR1cm4gY29ubmVjdEhPQyhzZWxlY3RvckZhY3RvcnksIF9leHRlbmRzKHtcbiAgICAgIC8vIHVzZWQgaW4gZXJyb3IgbWVzc2FnZXNcbiAgICAgIG1ldGhvZE5hbWU6ICdjb25uZWN0JyxcblxuICAgICAgLy8gdXNlZCB0byBjb21wdXRlIENvbm5lY3QncyBkaXNwbGF5TmFtZSBmcm9tIHRoZSB3cmFwcGVkIGNvbXBvbmVudCdzIGRpc3BsYXlOYW1lLlxuICAgICAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICdDb25uZWN0KCcgKyBuYW1lICsgJyknO1xuICAgICAgfSxcblxuICAgICAgLy8gaWYgbWFwU3RhdGVUb1Byb3BzIGlzIGZhbHN5LCB0aGUgQ29ubmVjdCBjb21wb25lbnQgZG9lc24ndCBzdWJzY3JpYmUgdG8gc3RvcmUgc3RhdGUgY2hhbmdlc1xuICAgICAgc2hvdWxkSGFuZGxlU3RhdGVDaGFuZ2VzOiBCb29sZWFuKG1hcFN0YXRlVG9Qcm9wcyksXG5cbiAgICAgIC8vIHBhc3NlZCB0aHJvdWdoIHRvIHNlbGVjdG9yRmFjdG9yeVxuICAgICAgaW5pdE1hcFN0YXRlVG9Qcm9wczogaW5pdE1hcFN0YXRlVG9Qcm9wcyxcbiAgICAgIGluaXRNYXBEaXNwYXRjaFRvUHJvcHM6IGluaXRNYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICBpbml0TWVyZ2VQcm9wczogaW5pdE1lcmdlUHJvcHMsXG4gICAgICBwdXJlOiBwdXJlLFxuICAgICAgYXJlU3RhdGVzRXF1YWw6IGFyZVN0YXRlc0VxdWFsLFxuICAgICAgYXJlT3duUHJvcHNFcXVhbDogYXJlT3duUHJvcHNFcXVhbCxcbiAgICAgIGFyZVN0YXRlUHJvcHNFcXVhbDogYXJlU3RhdGVQcm9wc0VxdWFsLFxuICAgICAgYXJlTWVyZ2VkUHJvcHNFcXVhbDogYXJlTWVyZ2VkUHJvcHNFcXVhbFxuXG4gICAgfSwgZXh0cmFPcHRpb25zKSk7XG4gIH07XG59XG5cbnZhciBjb25uZWN0ID0gY3JlYXRlQ29ubmVjdCgpO1xuXG52YXIgaW5kZXggPSB7IFByb3ZpZGVyOiBQcm92aWRlciwgY29ubmVjdDogY29ubmVjdCwgY29ubmVjdEFkdmFuY2VkOiBjb25uZWN0QWR2YW5jZWQgfTtcblxucmV0dXJuIGluZGV4O1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlYWN0LXJlZHV4LmpzLm1hcFxuIiwiIWZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBmdW5jdGlvbiBWTm9kZSgpIHt9XG4gICAgZnVuY3Rpb24gaChub2RlTmFtZSwgYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgbGFzdFNpbXBsZSwgY2hpbGQsIHNpbXBsZSwgaSwgY2hpbGRyZW4gPSBFTVBUWV9DSElMRFJFTjtcbiAgICAgICAgZm9yIChpID0gYXJndW1lbnRzLmxlbmd0aDsgaS0tID4gMjsgKSBzdGFjay5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzICYmIG51bGwgIT0gYXR0cmlidXRlcy5jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKCFzdGFjay5sZW5ndGgpIHN0YWNrLnB1c2goYXR0cmlidXRlcy5jaGlsZHJlbik7XG4gICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlcy5jaGlsZHJlbjtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSBpZiAoKGNoaWxkID0gc3RhY2sucG9wKCkpICYmIHZvaWQgMCAhPT0gY2hpbGQucG9wKSBmb3IgKGkgPSBjaGlsZC5sZW5ndGg7IGktLTsgKSBzdGFjay5wdXNoKGNoaWxkW2ldKTsgZWxzZSB7XG4gICAgICAgICAgICBpZiAoJ2Jvb2xlYW4nID09IHR5cGVvZiBjaGlsZCkgY2hpbGQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKHNpbXBsZSA9ICdmdW5jdGlvbicgIT0gdHlwZW9mIG5vZGVOYW1lKSBpZiAobnVsbCA9PSBjaGlsZCkgY2hpbGQgPSAnJzsgZWxzZSBpZiAoJ251bWJlcicgPT0gdHlwZW9mIGNoaWxkKSBjaGlsZCA9IFN0cmluZyhjaGlsZCk7IGVsc2UgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiBjaGlsZCkgc2ltcGxlID0gITE7XG4gICAgICAgICAgICBpZiAoc2ltcGxlICYmIGxhc3RTaW1wbGUpIGNoaWxkcmVuW2NoaWxkcmVuLmxlbmd0aCAtIDFdICs9IGNoaWxkOyBlbHNlIGlmIChjaGlsZHJlbiA9PT0gRU1QVFlfQ0hJTERSRU4pIGNoaWxkcmVuID0gWyBjaGlsZCBdOyBlbHNlIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgbGFzdFNpbXBsZSA9IHNpbXBsZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcCA9IG5ldyBWTm9kZSgpO1xuICAgICAgICBwLm5vZGVOYW1lID0gbm9kZU5hbWU7XG4gICAgICAgIHAuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICAgICAgcC5hdHRyaWJ1dGVzID0gbnVsbCA9PSBhdHRyaWJ1dGVzID8gdm9pZCAwIDogYXR0cmlidXRlcztcbiAgICAgICAgcC5rZXkgPSBudWxsID09IGF0dHJpYnV0ZXMgPyB2b2lkIDAgOiBhdHRyaWJ1dGVzLmtleTtcbiAgICAgICAgaWYgKHZvaWQgMCAhPT0gb3B0aW9ucy52bm9kZSkgb3B0aW9ucy52bm9kZShwKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4dGVuZChvYmosIHByb3BzKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIG9ialtpXSA9IHByb3BzW2ldO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbG9uZUVsZW1lbnQodm5vZGUsIHByb3BzKSB7XG4gICAgICAgIHJldHVybiBoKHZub2RlLm5vZGVOYW1lLCBleHRlbmQoZXh0ZW5kKHt9LCB2bm9kZS5hdHRyaWJ1dGVzKSwgcHJvcHMpLCBhcmd1bWVudHMubGVuZ3RoID4gMiA/IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IHZub2RlLmNoaWxkcmVuKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW5xdWV1ZVJlbmRlcihjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnQuX19kICYmIChjb21wb25lbnQuX19kID0gITApICYmIDEgPT0gaXRlbXMucHVzaChjb21wb25lbnQpKSAob3B0aW9ucy5kZWJvdW5jZVJlbmRlcmluZyB8fCBkZWZlcikocmVyZW5kZXIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXJlbmRlcigpIHtcbiAgICAgICAgdmFyIHAsIGxpc3QgPSBpdGVtcztcbiAgICAgICAgaXRlbXMgPSBbXTtcbiAgICAgICAgd2hpbGUgKHAgPSBsaXN0LnBvcCgpKSBpZiAocC5fX2QpIHJlbmRlckNvbXBvbmVudChwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNTYW1lTm9kZVR5cGUobm9kZSwgdm5vZGUsIGh5ZHJhdGluZykge1xuICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZub2RlIHx8ICdudW1iZXInID09IHR5cGVvZiB2bm9kZSkgcmV0dXJuIHZvaWQgMCAhPT0gbm9kZS5zcGxpdFRleHQ7XG4gICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2Ygdm5vZGUubm9kZU5hbWUpIHJldHVybiAhbm9kZS5fY29tcG9uZW50Q29uc3RydWN0b3IgJiYgaXNOYW1lZE5vZGUobm9kZSwgdm5vZGUubm9kZU5hbWUpOyBlbHNlIHJldHVybiBoeWRyYXRpbmcgfHwgbm9kZS5fY29tcG9uZW50Q29uc3RydWN0b3IgPT09IHZub2RlLm5vZGVOYW1lO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc05hbWVkTm9kZShub2RlLCBub2RlTmFtZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5fX24gPT09IG5vZGVOYW1lIHx8IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0Tm9kZVByb3BzKHZub2RlKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGV4dGVuZCh7fSwgdm5vZGUuYXR0cmlidXRlcyk7XG4gICAgICAgIHByb3BzLmNoaWxkcmVuID0gdm5vZGUuY2hpbGRyZW47XG4gICAgICAgIHZhciBkZWZhdWx0UHJvcHMgPSB2bm9kZS5ub2RlTmFtZS5kZWZhdWx0UHJvcHM7XG4gICAgICAgIGlmICh2b2lkIDAgIT09IGRlZmF1bHRQcm9wcykgZm9yICh2YXIgaSBpbiBkZWZhdWx0UHJvcHMpIGlmICh2b2lkIDAgPT09IHByb3BzW2ldKSBwcm9wc1tpXSA9IGRlZmF1bHRQcm9wc1tpXTtcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVOb2RlKG5vZGVOYW1lLCBpc1N2Zykge1xuICAgICAgICB2YXIgbm9kZSA9IGlzU3ZnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5vZGVOYW1lKSA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgICAgICBub2RlLl9fbiA9IG5vZGVOYW1lO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlKSB7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50Tm9kZSkgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0QWNjZXNzb3Iobm9kZSwgbmFtZSwgb2xkLCB2YWx1ZSwgaXNTdmcpIHtcbiAgICAgICAgaWYgKCdjbGFzc05hbWUnID09PSBuYW1lKSBuYW1lID0gJ2NsYXNzJztcbiAgICAgICAgaWYgKCdrZXknID09PSBuYW1lKSA7IGVsc2UgaWYgKCdyZWYnID09PSBuYW1lKSB7XG4gICAgICAgICAgICBpZiAob2xkKSBvbGQobnVsbCk7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHZhbHVlKG5vZGUpO1xuICAgICAgICB9IGVsc2UgaWYgKCdjbGFzcycgPT09IG5hbWUgJiYgIWlzU3ZnKSBub2RlLmNsYXNzTmFtZSA9IHZhbHVlIHx8ICcnOyBlbHNlIGlmICgnc3R5bGUnID09PSBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8ICdzdHJpbmcnID09IHR5cGVvZiB2YWx1ZSB8fCAnc3RyaW5nJyA9PSB0eXBlb2Ygb2xkKSBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZSB8fCAnJztcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIG9sZCkgZm9yICh2YXIgaSBpbiBvbGQpIGlmICghKGkgaW4gdmFsdWUpKSBub2RlLnN0eWxlW2ldID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkgbm9kZS5zdHlsZVtpXSA9ICdudW1iZXInID09IHR5cGVvZiB2YWx1ZVtpXSAmJiAhMSA9PT0gSVNfTk9OX0RJTUVOU0lPTkFMLnRlc3QoaSkgPyB2YWx1ZVtpXSArICdweCcgOiB2YWx1ZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnID09PSBuYW1lKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIG5vZGUuaW5uZXJIVE1MID0gdmFsdWUuX19odG1sIHx8ICcnO1xuICAgICAgICB9IGVsc2UgaWYgKCdvJyA9PSBuYW1lWzBdICYmICduJyA9PSBuYW1lWzFdKSB7XG4gICAgICAgICAgICB2YXIgdXNlQ2FwdHVyZSA9IG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9DYXB0dXJlJC8sICcnKSk7XG4gICAgICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpLnN1YnN0cmluZygyKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghb2xkKSBub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnRQcm94eSwgdXNlQ2FwdHVyZSk7XG4gICAgICAgICAgICB9IGVsc2Ugbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50UHJveHksIHVzZUNhcHR1cmUpO1xuICAgICAgICAgICAgKG5vZGUuX19sIHx8IChub2RlLl9fbCA9IHt9KSlbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICgnbGlzdCcgIT09IG5hbWUgJiYgJ3R5cGUnICE9PSBuYW1lICYmICFpc1N2ZyAmJiBuYW1lIGluIG5vZGUpIHtcbiAgICAgICAgICAgIHNldFByb3BlcnR5KG5vZGUsIG5hbWUsIG51bGwgPT0gdmFsdWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChudWxsID09IHZhbHVlIHx8ICExID09PSB2YWx1ZSkgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbnMgPSBpc1N2ZyAmJiBuYW1lICE9PSAobmFtZSA9IG5hbWUucmVwbGFjZSgvXnhsaW5rOj8vLCAnJykpO1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gdmFsdWUgfHwgITEgPT09IHZhbHVlKSBpZiAobnMpIG5vZGUucmVtb3ZlQXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBuYW1lLnRvTG93ZXJDYXNlKCkpOyBlbHNlIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpOyBlbHNlIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiB2YWx1ZSkgaWYgKG5zKSBub2RlLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgbmFtZS50b0xvd2VyQ2FzZSgpLCB2YWx1ZSk7IGVsc2Ugbm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFByb3BlcnR5KG5vZGUsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBub2RlW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV2ZW50UHJveHkoZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2xbZS50eXBlXShvcHRpb25zLmV2ZW50ICYmIG9wdGlvbnMuZXZlbnQoZSkgfHwgZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZsdXNoTW91bnRzKCkge1xuICAgICAgICB2YXIgYztcbiAgICAgICAgd2hpbGUgKGMgPSBtb3VudHMucG9wKCkpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmFmdGVyTW91bnQpIG9wdGlvbnMuYWZ0ZXJNb3VudChjKTtcbiAgICAgICAgICAgIGlmIChjLmNvbXBvbmVudERpZE1vdW50KSBjLmNvbXBvbmVudERpZE1vdW50KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgcGFyZW50LCBjb21wb25lbnRSb290KSB7XG4gICAgICAgIGlmICghZGlmZkxldmVsKyspIHtcbiAgICAgICAgICAgIGlzU3ZnTW9kZSA9IG51bGwgIT0gcGFyZW50ICYmIHZvaWQgMCAhPT0gcGFyZW50Lm93bmVyU1ZHRWxlbWVudDtcbiAgICAgICAgICAgIGh5ZHJhdGluZyA9IG51bGwgIT0gZG9tICYmICEoJ19fcHJlYWN0YXR0cl8nIGluIGRvbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldCA9IGlkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsLCBjb21wb25lbnRSb290KTtcbiAgICAgICAgaWYgKHBhcmVudCAmJiByZXQucGFyZW50Tm9kZSAhPT0gcGFyZW50KSBwYXJlbnQuYXBwZW5kQ2hpbGQocmV0KTtcbiAgICAgICAgaWYgKCEtLWRpZmZMZXZlbCkge1xuICAgICAgICAgICAgaHlkcmF0aW5nID0gITE7XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudFJvb3QpIGZsdXNoTW91bnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gaWRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIGNvbXBvbmVudFJvb3QpIHtcbiAgICAgICAgdmFyIG91dCA9IGRvbSwgcHJldlN2Z01vZGUgPSBpc1N2Z01vZGU7XG4gICAgICAgIGlmIChudWxsID09IHZub2RlIHx8ICdib29sZWFuJyA9PSB0eXBlb2Ygdm5vZGUpIHZub2RlID0gJyc7XG4gICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2Ygdm5vZGUgfHwgJ251bWJlcicgPT0gdHlwZW9mIHZub2RlKSB7XG4gICAgICAgICAgICBpZiAoZG9tICYmIHZvaWQgMCAhPT0gZG9tLnNwbGl0VGV4dCAmJiBkb20ucGFyZW50Tm9kZSAmJiAoIWRvbS5fY29tcG9uZW50IHx8IGNvbXBvbmVudFJvb3QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbS5ub2RlVmFsdWUgIT0gdm5vZGUpIGRvbS5ub2RlVmFsdWUgPSB2bm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3V0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodm5vZGUpO1xuICAgICAgICAgICAgICAgIGlmIChkb20pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbS5wYXJlbnROb2RlKSBkb20ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob3V0LCBkb20pO1xuICAgICAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShkb20sICEwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXQuX19wcmVhY3RhdHRyXyA9ICEwO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdm5vZGVOYW1lID0gdm5vZGUubm9kZU5hbWU7XG4gICAgICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB2bm9kZU5hbWUpIHJldHVybiBidWlsZENvbXBvbmVudEZyb21WTm9kZShkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCk7XG4gICAgICAgIGlzU3ZnTW9kZSA9ICdzdmcnID09PSB2bm9kZU5hbWUgPyAhMCA6ICdmb3JlaWduT2JqZWN0JyA9PT0gdm5vZGVOYW1lID8gITEgOiBpc1N2Z01vZGU7XG4gICAgICAgIHZub2RlTmFtZSA9IFN0cmluZyh2bm9kZU5hbWUpO1xuICAgICAgICBpZiAoIWRvbSB8fCAhaXNOYW1lZE5vZGUoZG9tLCB2bm9kZU5hbWUpKSB7XG4gICAgICAgICAgICBvdXQgPSBjcmVhdGVOb2RlKHZub2RlTmFtZSwgaXNTdmdNb2RlKTtcbiAgICAgICAgICAgIGlmIChkb20pIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZG9tLmZpcnN0Q2hpbGQpIG91dC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbS5wYXJlbnROb2RlKSBkb20ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob3V0LCBkb20pO1xuICAgICAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKGRvbSwgITApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmYyA9IG91dC5maXJzdENoaWxkLCBwcm9wcyA9IG91dC5fX3ByZWFjdGF0dHJfLCB2Y2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKG51bGwgPT0gcHJvcHMpIHtcbiAgICAgICAgICAgIHByb3BzID0gb3V0Ll9fcHJlYWN0YXR0cl8gPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGEgPSBvdXQuYXR0cmlidXRlcywgaSA9IGEubGVuZ3RoOyBpLS07ICkgcHJvcHNbYVtpXS5uYW1lXSA9IGFbaV0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoeWRyYXRpbmcgJiYgdmNoaWxkcmVuICYmIDEgPT09IHZjaGlsZHJlbi5sZW5ndGggJiYgJ3N0cmluZycgPT0gdHlwZW9mIHZjaGlsZHJlblswXSAmJiBudWxsICE9IGZjICYmIHZvaWQgMCAhPT0gZmMuc3BsaXRUZXh0ICYmIG51bGwgPT0gZmMubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgIGlmIChmYy5ub2RlVmFsdWUgIT0gdmNoaWxkcmVuWzBdKSBmYy5ub2RlVmFsdWUgPSB2Y2hpbGRyZW5bMF07XG4gICAgICAgIH0gZWxzZSBpZiAodmNoaWxkcmVuICYmIHZjaGlsZHJlbi5sZW5ndGggfHwgbnVsbCAhPSBmYykgaW5uZXJEaWZmTm9kZShvdXQsIHZjaGlsZHJlbiwgY29udGV4dCwgbW91bnRBbGwsIGh5ZHJhdGluZyB8fCBudWxsICE9IHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKTtcbiAgICAgICAgZGlmZkF0dHJpYnV0ZXMob3V0LCB2bm9kZS5hdHRyaWJ1dGVzLCBwcm9wcyk7XG4gICAgICAgIGlzU3ZnTW9kZSA9IHByZXZTdmdNb2RlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbm5lckRpZmZOb2RlKGRvbSwgdmNoaWxkcmVuLCBjb250ZXh0LCBtb3VudEFsbCwgaXNIeWRyYXRpbmcpIHtcbiAgICAgICAgdmFyIGosIGMsIGYsIHZjaGlsZCwgY2hpbGQsIG9yaWdpbmFsQ2hpbGRyZW4gPSBkb20uY2hpbGROb2RlcywgY2hpbGRyZW4gPSBbXSwga2V5ZWQgPSB7fSwga2V5ZWRMZW4gPSAwLCBtaW4gPSAwLCBsZW4gPSBvcmlnaW5hbENoaWxkcmVuLmxlbmd0aCwgY2hpbGRyZW5MZW4gPSAwLCB2bGVuID0gdmNoaWxkcmVuID8gdmNoaWxkcmVuLmxlbmd0aCA6IDA7XG4gICAgICAgIGlmICgwICE9PSBsZW4pIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBfY2hpbGQgPSBvcmlnaW5hbENoaWxkcmVuW2ldLCBwcm9wcyA9IF9jaGlsZC5fX3ByZWFjdGF0dHJfLCBrZXkgPSB2bGVuICYmIHByb3BzID8gX2NoaWxkLl9jb21wb25lbnQgPyBfY2hpbGQuX2NvbXBvbmVudC5fX2sgOiBwcm9wcy5rZXkgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG51bGwgIT0ga2V5KSB7XG4gICAgICAgICAgICAgICAga2V5ZWRMZW4rKztcbiAgICAgICAgICAgICAgICBrZXllZFtrZXldID0gX2NoaWxkO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wcyB8fCAodm9pZCAwICE9PSBfY2hpbGQuc3BsaXRUZXh0ID8gaXNIeWRyYXRpbmcgPyBfY2hpbGQubm9kZVZhbHVlLnRyaW0oKSA6ICEwIDogaXNIeWRyYXRpbmcpKSBjaGlsZHJlbltjaGlsZHJlbkxlbisrXSA9IF9jaGlsZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoMCAhPT0gdmxlbikgZm9yICh2YXIgaSA9IDA7IGkgPCB2bGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZjaGlsZCA9IHZjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGNoaWxkID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBrZXkgPSB2Y2hpbGQua2V5O1xuICAgICAgICAgICAgaWYgKG51bGwgIT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleWVkTGVuICYmIHZvaWQgMCAhPT0ga2V5ZWRba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IGtleWVkW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGtleWVkW2tleV0gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgICAgIGtleWVkTGVuLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICghY2hpbGQgJiYgbWluIDwgY2hpbGRyZW5MZW4pIGZvciAoaiA9IG1pbjsgaiA8IGNoaWxkcmVuTGVuOyBqKyspIGlmICh2b2lkIDAgIT09IGNoaWxkcmVuW2pdICYmIGlzU2FtZU5vZGVUeXBlKGMgPSBjaGlsZHJlbltqXSwgdmNoaWxkLCBpc0h5ZHJhdGluZykpIHtcbiAgICAgICAgICAgICAgICBjaGlsZCA9IGM7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5bal0gPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKGogPT09IGNoaWxkcmVuTGVuIC0gMSkgY2hpbGRyZW5MZW4tLTtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PT0gbWluKSBtaW4rKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkID0gaWRpZmYoY2hpbGQsIHZjaGlsZCwgY29udGV4dCwgbW91bnRBbGwpO1xuICAgICAgICAgICAgZiA9IG9yaWdpbmFsQ2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoY2hpbGQgJiYgY2hpbGQgIT09IGRvbSAmJiBjaGlsZCAhPT0gZikgaWYgKG51bGwgPT0gZikgZG9tLmFwcGVuZENoaWxkKGNoaWxkKTsgZWxzZSBpZiAoY2hpbGQgPT09IGYubmV4dFNpYmxpbmcpIHJlbW92ZU5vZGUoZik7IGVsc2UgZG9tLmluc2VydEJlZm9yZShjaGlsZCwgZik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleWVkTGVuKSBmb3IgKHZhciBpIGluIGtleWVkKSBpZiAodm9pZCAwICE9PSBrZXllZFtpXSkgcmVjb2xsZWN0Tm9kZVRyZWUoa2V5ZWRbaV0sICExKTtcbiAgICAgICAgd2hpbGUgKG1pbiA8PSBjaGlsZHJlbkxlbikgaWYgKHZvaWQgMCAhPT0gKGNoaWxkID0gY2hpbGRyZW5bY2hpbGRyZW5MZW4tLV0pKSByZWNvbGxlY3ROb2RlVHJlZShjaGlsZCwgITEpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWNvbGxlY3ROb2RlVHJlZShub2RlLCB1bm1vdW50T25seSkge1xuICAgICAgICB2YXIgY29tcG9uZW50ID0gbm9kZS5fY29tcG9uZW50O1xuICAgICAgICBpZiAoY29tcG9uZW50KSB1bm1vdW50Q29tcG9uZW50KGNvbXBvbmVudCk7IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG51bGwgIT0gbm9kZS5fX3ByZWFjdGF0dHJfICYmIG5vZGUuX19wcmVhY3RhdHRyXy5yZWYpIG5vZGUuX19wcmVhY3RhdHRyXy5yZWYobnVsbCk7XG4gICAgICAgICAgICBpZiAoITEgPT09IHVubW91bnRPbmx5IHx8IG51bGwgPT0gbm9kZS5fX3ByZWFjdGF0dHJfKSByZW1vdmVOb2RlKG5vZGUpO1xuICAgICAgICAgICAgcmVtb3ZlQ2hpbGRyZW4obm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4obm9kZSkge1xuICAgICAgICBub2RlID0gbm9kZS5sYXN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICAgICAgcmVjb2xsZWN0Tm9kZVRyZWUobm9kZSwgITApO1xuICAgICAgICAgICAgbm9kZSA9IG5leHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlmZkF0dHJpYnV0ZXMoZG9tLCBhdHRycywgb2xkKSB7XG4gICAgICAgIHZhciBuYW1lO1xuICAgICAgICBmb3IgKG5hbWUgaW4gb2xkKSBpZiAoKCFhdHRycyB8fCBudWxsID09IGF0dHJzW25hbWVdKSAmJiBudWxsICE9IG9sZFtuYW1lXSkgc2V0QWNjZXNzb3IoZG9tLCBuYW1lLCBvbGRbbmFtZV0sIG9sZFtuYW1lXSA9IHZvaWQgMCwgaXNTdmdNb2RlKTtcbiAgICAgICAgZm9yIChuYW1lIGluIGF0dHJzKSBpZiAoISgnY2hpbGRyZW4nID09PSBuYW1lIHx8ICdpbm5lckhUTUwnID09PSBuYW1lIHx8IG5hbWUgaW4gb2xkICYmIGF0dHJzW25hbWVdID09PSAoJ3ZhbHVlJyA9PT0gbmFtZSB8fCAnY2hlY2tlZCcgPT09IG5hbWUgPyBkb21bbmFtZV0gOiBvbGRbbmFtZV0pKSkgc2V0QWNjZXNzb3IoZG9tLCBuYW1lLCBvbGRbbmFtZV0sIG9sZFtuYW1lXSA9IGF0dHJzW25hbWVdLCBpc1N2Z01vZGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb2xsZWN0Q29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICB2YXIgbmFtZSA9IGNvbXBvbmVudC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAoY29tcG9uZW50c1tuYW1lXSB8fCAoY29tcG9uZW50c1tuYW1lXSA9IFtdKSkucHVzaChjb21wb25lbnQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDb21wb25lbnQoQ3RvciwgcHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIGluc3QsIGxpc3QgPSBjb21wb25lbnRzW0N0b3IubmFtZV07XG4gICAgICAgIGlmIChDdG9yLnByb3RvdHlwZSAmJiBDdG9yLnByb3RvdHlwZS5yZW5kZXIpIHtcbiAgICAgICAgICAgIGluc3QgPSBuZXcgQ3Rvcihwcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICBDb21wb25lbnQuY2FsbChpbnN0LCBwcm9wcywgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnN0ID0gbmV3IENvbXBvbmVudChwcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICBpbnN0LmNvbnN0cnVjdG9yID0gQ3RvcjtcbiAgICAgICAgICAgIGluc3QucmVuZGVyID0gZG9SZW5kZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3QpIGZvciAodmFyIGkgPSBsaXN0Lmxlbmd0aDsgaS0tOyApIGlmIChsaXN0W2ldLmNvbnN0cnVjdG9yID09PSBDdG9yKSB7XG4gICAgICAgICAgICBpbnN0Ll9fYiA9IGxpc3RbaV0uX19iO1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5zdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZG9SZW5kZXIocHJvcHMsIHN0YXRlLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0Q29tcG9uZW50UHJvcHMoY29tcG9uZW50LCBwcm9wcywgb3B0cywgY29udGV4dCwgbW91bnRBbGwpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnQuX194KSB7XG4gICAgICAgICAgICBjb21wb25lbnQuX194ID0gITA7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50Ll9fciA9IHByb3BzLnJlZikgZGVsZXRlIHByb3BzLnJlZjtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuX19rID0gcHJvcHMua2V5KSBkZWxldGUgcHJvcHMua2V5O1xuICAgICAgICAgICAgaWYgKCFjb21wb25lbnQuYmFzZSB8fCBtb3VudEFsbCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KSBjb21wb25lbnQuY29tcG9uZW50V2lsbE1vdW50KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKSBjb21wb25lbnQuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBjb21wb25lbnQuY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGlmICghY29tcG9uZW50Ll9fYykgY29tcG9uZW50Ll9fYyA9IGNvbXBvbmVudC5jb250ZXh0O1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY29tcG9uZW50Ll9fcCkgY29tcG9uZW50Ll9fcCA9IGNvbXBvbmVudC5wcm9wcztcbiAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcyA9IHByb3BzO1xuICAgICAgICAgICAgY29tcG9uZW50Ll9feCA9ICExO1xuICAgICAgICAgICAgaWYgKDAgIT09IG9wdHMpIGlmICgxID09PSBvcHRzIHx8ICExICE9PSBvcHRpb25zLnN5bmNDb21wb25lbnRVcGRhdGVzIHx8ICFjb21wb25lbnQuYmFzZSkgcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudCwgMSwgbW91bnRBbGwpOyBlbHNlIGVucXVldWVSZW5kZXIoY29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuX19yKSBjb21wb25lbnQuX19yKGNvbXBvbmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyQ29tcG9uZW50KGNvbXBvbmVudCwgb3B0cywgbW91bnRBbGwsIGlzQ2hpbGQpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnQuX194KSB7XG4gICAgICAgICAgICB2YXIgcmVuZGVyZWQsIGluc3QsIGNiYXNlLCBwcm9wcyA9IGNvbXBvbmVudC5wcm9wcywgc3RhdGUgPSBjb21wb25lbnQuc3RhdGUsIGNvbnRleHQgPSBjb21wb25lbnQuY29udGV4dCwgcHJldmlvdXNQcm9wcyA9IGNvbXBvbmVudC5fX3AgfHwgcHJvcHMsIHByZXZpb3VzU3RhdGUgPSBjb21wb25lbnQuX19zIHx8IHN0YXRlLCBwcmV2aW91c0NvbnRleHQgPSBjb21wb25lbnQuX19jIHx8IGNvbnRleHQsIGlzVXBkYXRlID0gY29tcG9uZW50LmJhc2UsIG5leHRCYXNlID0gY29tcG9uZW50Ll9fYiwgaW5pdGlhbEJhc2UgPSBpc1VwZGF0ZSB8fCBuZXh0QmFzZSwgaW5pdGlhbENoaWxkQ29tcG9uZW50ID0gY29tcG9uZW50Ll9jb21wb25lbnQsIHNraXAgPSAhMTtcbiAgICAgICAgICAgIGlmIChpc1VwZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5wcm9wcyA9IHByZXZpb3VzUHJvcHM7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnN0YXRlID0gcHJldmlvdXNTdGF0ZTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY29udGV4dCA9IHByZXZpb3VzQ29udGV4dDtcbiAgICAgICAgICAgICAgICBpZiAoMiAhPT0gb3B0cyAmJiBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlICYmICExID09PSBjb21wb25lbnQuc2hvdWxkQ29tcG9uZW50VXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCkpIHNraXAgPSAhMDsgZWxzZSBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxVcGRhdGUpIGNvbXBvbmVudC5jb21wb25lbnRXaWxsVXBkYXRlKHByb3BzLCBzdGF0ZSwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnByb3BzID0gcHJvcHM7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50Ll9fcCA9IGNvbXBvbmVudC5fX3MgPSBjb21wb25lbnQuX19jID0gY29tcG9uZW50Ll9fYiA9IG51bGw7XG4gICAgICAgICAgICBjb21wb25lbnQuX19kID0gITE7XG4gICAgICAgICAgICBpZiAoIXNraXApIHtcbiAgICAgICAgICAgICAgICByZW5kZXJlZCA9IGNvbXBvbmVudC5yZW5kZXIocHJvcHMsIHN0YXRlLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmdldENoaWxkQ29udGV4dCkgY29udGV4dCA9IGV4dGVuZChleHRlbmQoe30sIGNvbnRleHQpLCBjb21wb25lbnQuZ2V0Q2hpbGRDb250ZXh0KCkpO1xuICAgICAgICAgICAgICAgIHZhciB0b1VubW91bnQsIGJhc2UsIGNoaWxkQ29tcG9uZW50ID0gcmVuZGVyZWQgJiYgcmVuZGVyZWQubm9kZU5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGNoaWxkQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZFByb3BzID0gZ2V0Tm9kZVByb3BzKHJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgaW5zdCA9IGluaXRpYWxDaGlsZENvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3QgJiYgaW5zdC5jb25zdHJ1Y3RvciA9PT0gY2hpbGRDb21wb25lbnQgJiYgY2hpbGRQcm9wcy5rZXkgPT0gaW5zdC5fX2spIHNldENvbXBvbmVudFByb3BzKGluc3QsIGNoaWxkUHJvcHMsIDEsIGNvbnRleHQsICExKTsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b1VubW91bnQgPSBpbnN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50Ll9jb21wb25lbnQgPSBpbnN0ID0gY3JlYXRlQ29tcG9uZW50KGNoaWxkQ29tcG9uZW50LCBjaGlsZFByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3QuX19iID0gaW5zdC5fX2IgfHwgbmV4dEJhc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0Ll9fdSA9IGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbXBvbmVudFByb3BzKGluc3QsIGNoaWxkUHJvcHMsIDAsIGNvbnRleHQsICExKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckNvbXBvbmVudChpbnN0LCAxLCBtb3VudEFsbCwgITApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJhc2UgPSBpbnN0LmJhc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2Jhc2UgPSBpbml0aWFsQmFzZTtcbiAgICAgICAgICAgICAgICAgICAgdG9Vbm1vdW50ID0gaW5pdGlhbENoaWxkQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9Vbm1vdW50KSBjYmFzZSA9IGNvbXBvbmVudC5fY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWxCYXNlIHx8IDEgPT09IG9wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYmFzZSkgY2Jhc2UuX2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlID0gZGlmZihjYmFzZSwgcmVuZGVyZWQsIGNvbnRleHQsIG1vdW50QWxsIHx8ICFpc1VwZGF0ZSwgaW5pdGlhbEJhc2UgJiYgaW5pdGlhbEJhc2UucGFyZW50Tm9kZSwgITApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbml0aWFsQmFzZSAmJiBiYXNlICE9PSBpbml0aWFsQmFzZSAmJiBpbnN0ICE9PSBpbml0aWFsQ2hpbGRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhc2VQYXJlbnQgPSBpbml0aWFsQmFzZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZVBhcmVudCAmJiBiYXNlICE9PSBiYXNlUGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlUGFyZW50LnJlcGxhY2VDaGlsZChiYXNlLCBpbml0aWFsQmFzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRvVW5tb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxCYXNlLl9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKGluaXRpYWxCYXNlLCAhMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRvVW5tb3VudCkgdW5tb3VudENvbXBvbmVudCh0b1VubW91bnQpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5iYXNlID0gYmFzZTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZSAmJiAhaXNDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50UmVmID0gY29tcG9uZW50LCB0ID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAodCA9IHQuX191KSAoY29tcG9uZW50UmVmID0gdCkuYmFzZSA9IGJhc2U7XG4gICAgICAgICAgICAgICAgICAgIGJhc2UuX2NvbXBvbmVudCA9IGNvbXBvbmVudFJlZjtcbiAgICAgICAgICAgICAgICAgICAgYmFzZS5fY29tcG9uZW50Q29uc3RydWN0b3IgPSBjb21wb25lbnRSZWYuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc1VwZGF0ZSB8fCBtb3VudEFsbCkgbW91bnRzLnVuc2hpZnQoY29tcG9uZW50KTsgZWxzZSBpZiAoIXNraXApIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudERpZFVwZGF0ZSkgY29tcG9uZW50LmNvbXBvbmVudERpZFVwZGF0ZShwcmV2aW91c1Byb3BzLCBwcmV2aW91c1N0YXRlLCBwcmV2aW91c0NvbnRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFmdGVyVXBkYXRlKSBvcHRpb25zLmFmdGVyVXBkYXRlKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBjb21wb25lbnQuX19oKSB3aGlsZSAoY29tcG9uZW50Ll9faC5sZW5ndGgpIGNvbXBvbmVudC5fX2gucG9wKCkuY2FsbChjb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKCFkaWZmTGV2ZWwgJiYgIWlzQ2hpbGQpIGZsdXNoTW91bnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gYnVpbGRDb21wb25lbnRGcm9tVk5vZGUoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwpIHtcbiAgICAgICAgdmFyIGMgPSBkb20gJiYgZG9tLl9jb21wb25lbnQsIG9yaWdpbmFsQ29tcG9uZW50ID0gYywgb2xkRG9tID0gZG9tLCBpc0RpcmVjdE93bmVyID0gYyAmJiBkb20uX2NvbXBvbmVudENvbnN0cnVjdG9yID09PSB2bm9kZS5ub2RlTmFtZSwgaXNPd25lciA9IGlzRGlyZWN0T3duZXIsIHByb3BzID0gZ2V0Tm9kZVByb3BzKHZub2RlKTtcbiAgICAgICAgd2hpbGUgKGMgJiYgIWlzT3duZXIgJiYgKGMgPSBjLl9fdSkpIGlzT3duZXIgPSBjLmNvbnN0cnVjdG9yID09PSB2bm9kZS5ub2RlTmFtZTtcbiAgICAgICAgaWYgKGMgJiYgaXNPd25lciAmJiAoIW1vdW50QWxsIHx8IGMuX2NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHNldENvbXBvbmVudFByb3BzKGMsIHByb3BzLCAzLCBjb250ZXh0LCBtb3VudEFsbCk7XG4gICAgICAgICAgICBkb20gPSBjLmJhc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luYWxDb21wb25lbnQgJiYgIWlzRGlyZWN0T3duZXIpIHtcbiAgICAgICAgICAgICAgICB1bm1vdW50Q29tcG9uZW50KG9yaWdpbmFsQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICBkb20gPSBvbGREb20gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYyA9IGNyZWF0ZUNvbXBvbmVudCh2bm9kZS5ub2RlTmFtZSwgcHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKGRvbSAmJiAhYy5fX2IpIHtcbiAgICAgICAgICAgICAgICBjLl9fYiA9IGRvbTtcbiAgICAgICAgICAgICAgICBvbGREb20gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0Q29tcG9uZW50UHJvcHMoYywgcHJvcHMsIDEsIGNvbnRleHQsIG1vdW50QWxsKTtcbiAgICAgICAgICAgIGRvbSA9IGMuYmFzZTtcbiAgICAgICAgICAgIGlmIChvbGREb20gJiYgZG9tICE9PSBvbGREb20pIHtcbiAgICAgICAgICAgICAgICBvbGREb20uX2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmVjb2xsZWN0Tm9kZVRyZWUob2xkRG9tLCAhMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdW5tb3VudENvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYmVmb3JlVW5tb3VudCkgb3B0aW9ucy5iZWZvcmVVbm1vdW50KGNvbXBvbmVudCk7XG4gICAgICAgIHZhciBiYXNlID0gY29tcG9uZW50LmJhc2U7XG4gICAgICAgIGNvbXBvbmVudC5fX3ggPSAhMDtcbiAgICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsVW5tb3VudCkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG4gICAgICAgIGNvbXBvbmVudC5iYXNlID0gbnVsbDtcbiAgICAgICAgdmFyIGlubmVyID0gY29tcG9uZW50Ll9jb21wb25lbnQ7XG4gICAgICAgIGlmIChpbm5lcikgdW5tb3VudENvbXBvbmVudChpbm5lcik7IGVsc2UgaWYgKGJhc2UpIHtcbiAgICAgICAgICAgIGlmIChiYXNlLl9fcHJlYWN0YXR0cl8gJiYgYmFzZS5fX3ByZWFjdGF0dHJfLnJlZikgYmFzZS5fX3ByZWFjdGF0dHJfLnJlZihudWxsKTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5fX2IgPSBiYXNlO1xuICAgICAgICAgICAgcmVtb3ZlTm9kZShiYXNlKTtcbiAgICAgICAgICAgIGNvbGxlY3RDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJlbW92ZUNoaWxkcmVuKGJhc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnQuX19yKSBjb21wb25lbnQuX19yKG51bGwpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fX2QgPSAhMDtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZSB8fCB7fTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyKHZub2RlLCBwYXJlbnQsIG1lcmdlKSB7XG4gICAgICAgIHJldHVybiBkaWZmKG1lcmdlLCB2bm9kZSwge30sICExLCBwYXJlbnQsICExKTtcbiAgICB9XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICB2YXIgc3RhY2sgPSBbXTtcbiAgICB2YXIgRU1QVFlfQ0hJTERSRU4gPSBbXTtcbiAgICB2YXIgZGVmZXIgPSAnZnVuY3Rpb24nID09IHR5cGVvZiBQcm9taXNlID8gUHJvbWlzZS5yZXNvbHZlKCkudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKSA6IHNldFRpbWVvdXQ7XG4gICAgdmFyIElTX05PTl9ESU1FTlNJT05BTCA9IC9hY2l0fGV4KD86c3xnfG58cHwkKXxycGh8b3dzfG1uY3xudHd8aW5lW2NoXXx6b298Xm9yZC9pO1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHZhciBtb3VudHMgPSBbXTtcbiAgICB2YXIgZGlmZkxldmVsID0gMDtcbiAgICB2YXIgaXNTdmdNb2RlID0gITE7XG4gICAgdmFyIGh5ZHJhdGluZyA9ICExO1xuICAgIHZhciBjb21wb25lbnRzID0ge307XG4gICAgZXh0ZW5kKENvbXBvbmVudC5wcm90b3R5cGUsIHtcbiAgICAgICAgc2V0U3RhdGU6IGZ1bmN0aW9uKHN0YXRlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHMgPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9fcykgdGhpcy5fX3MgPSBleHRlbmQoe30sIHMpO1xuICAgICAgICAgICAgZXh0ZW5kKHMsICdmdW5jdGlvbicgPT0gdHlwZW9mIHN0YXRlID8gc3RhdGUocywgdGhpcy5wcm9wcykgOiBzdGF0ZSk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spICh0aGlzLl9faCA9IHRoaXMuX19oIHx8IFtdKS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIGVucXVldWVSZW5kZXIodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZvcmNlVXBkYXRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSAodGhpcy5fX2ggPSB0aGlzLl9faCB8fCBbXSkucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZW5kZXJDb21wb25lbnQodGhpcywgMik7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7fVxuICAgIH0pO1xuICAgIHZhciBwcmVhY3QgPSB7XG4gICAgICAgIGg6IGgsXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGgsXG4gICAgICAgIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICAgICAgICBDb21wb25lbnQ6IENvbXBvbmVudCxcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHJlcmVuZGVyOiByZXJlbmRlcixcbiAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgIH07XG4gICAgaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiBtb2R1bGUpIG1vZHVsZS5leHBvcnRzID0gcHJlYWN0OyBlbHNlIHNlbGYucHJlYWN0ID0gcHJlYWN0O1xufSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJlYWN0LmpzLm1hcCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKF9yZWYpIHtcblx0dmFyIF9jbGFzcywgX3RlbXAyO1xuXG5cdHZhciBDb21wb25lbnQgPSBfcmVmLkNvbXBvbmVudCxcblx0ICAgIGNyZWF0ZUVsZW1lbnQgPSBfcmVmLmNyZWF0ZUVsZW1lbnQ7XG5cdHJldHVybiBfdGVtcDIgPSBfY2xhc3MgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuXHRcdF9pbmhlcml0cyhSZWFjdEhpbnQsIF9Db21wb25lbnQpO1xuXG5cdFx0ZnVuY3Rpb24gUmVhY3RIaW50KCkge1xuXHRcdFx0dmFyIF90ZW1wLCBfdGhpcywgX3JldDtcblxuXHRcdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlYWN0SGludCk7XG5cblx0XHRcdGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG5cdFx0XHRcdGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBfcmV0ID0gKF90ZW1wID0gKF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX0NvbXBvbmVudC5jYWxsLmFwcGx5KF9Db21wb25lbnQsIFt0aGlzXS5jb25jYXQoYXJncykpKSwgX3RoaXMpLCBfdGhpcy5zdGF0ZSA9IHsgdGFyZ2V0OiBudWxsIH0sIF90aGlzLl9jb250YWluZXJTdHlsZSA9IHsgcG9zaXRpb246ICdyZWxhdGl2ZScgfSwgX3RoaXMudG9nZ2xlRXZlbnRzID0gZnVuY3Rpb24gKF9yZWYyLCBmbGFnKSB7XG5cdFx0XHRcdHZhciBldmVudHMgPSBfcmVmMi5ldmVudHMsXG5cdFx0XHRcdCAgICBfcmVmMiRldmVudHMgPSBfcmVmMi5ldmVudHMsXG5cdFx0XHRcdCAgICBjbGljayA9IF9yZWYyJGV2ZW50cy5jbGljayxcblx0XHRcdFx0ICAgIGZvY3VzID0gX3JlZjIkZXZlbnRzLmZvY3VzLFxuXHRcdFx0XHQgICAgaG92ZXIgPSBfcmVmMiRldmVudHMuaG92ZXI7XG5cblx0XHRcdFx0dmFyIGFjdGlvbiA9IGZsYWcgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cdFx0XHRcdHZhciBoYXNFdmVudHMgPSBldmVudHMgPT09IHRydWU7KGNsaWNrIHx8IGhhc0V2ZW50cykgJiYgZG9jdW1lbnRbYWN0aW9uXSgnY2xpY2snLCBfdGhpcy50b2dnbGVIaW50KTsoZm9jdXMgfHwgaGFzRXZlbnRzKSAmJiBkb2N1bWVudFthY3Rpb25dKCdmb2N1c2luJywgX3RoaXMudG9nZ2xlSGludCk7KGhvdmVyIHx8IGhhc0V2ZW50cykgJiYgZG9jdW1lbnRbYWN0aW9uXSgnbW91c2VvdmVyJywgX3RoaXMudG9nZ2xlSGludCk7KGNsaWNrIHx8IGhvdmVyIHx8IGhhc0V2ZW50cykgJiYgZG9jdW1lbnRbYWN0aW9uXSgndG91Y2hlbmQnLCBfdGhpcy50b2dnbGVIaW50KTtcblx0XHRcdH0sIF90aGlzLnRvZ2dsZUhpbnQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBfcmVmMyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG5cdFx0XHRcdCAgICBfcmVmMyR0YXJnZXQgPSBfcmVmMy50YXJnZXQsXG5cdFx0XHRcdCAgICB0YXJnZXQgPSBfcmVmMyR0YXJnZXQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBfcmVmMyR0YXJnZXQ7XG5cblx0XHRcdFx0Y2xlYXJUaW1lb3V0KF90aGlzLl90aW1lb3V0KTtcblx0XHRcdFx0X3RoaXMuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuc2V0U3RhdGUoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0dGFyZ2V0OiBfdGhpcy5nZXRIaW50KHRhcmdldClcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0sIF90aGlzLnByb3BzLmRlbGF5KTtcblx0XHRcdH0sIF90aGlzLmdldEhpbnQgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdFx0dmFyIF90aGlzJHByb3BzID0gX3RoaXMucHJvcHMsXG5cdFx0XHRcdCAgICBhdHRyaWJ1dGUgPSBfdGhpcyRwcm9wcy5hdHRyaWJ1dGUsXG5cdFx0XHRcdCAgICBwZXJzaXN0ID0gX3RoaXMkcHJvcHMucGVyc2lzdDtcblx0XHRcdFx0dmFyIHRhcmdldCA9IF90aGlzLnN0YXRlLnRhcmdldDtcblxuXG5cdFx0XHRcdHdoaWxlIChlbCkge1xuXHRcdFx0XHRcdGlmIChlbCA9PT0gZG9jdW1lbnQpIGJyZWFrO1xuXHRcdFx0XHRcdGlmIChwZXJzaXN0ICYmIGVsID09PSBfdGhpcy5faGludCkgcmV0dXJuIHRhcmdldDtcblx0XHRcdFx0XHRpZiAoZWwuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpIHJldHVybiBlbDtcblx0XHRcdFx0XHRlbCA9IGVsLnBhcmVudE5vZGU7XG5cdFx0XHRcdH1yZXR1cm4gbnVsbDtcblx0XHRcdH0sIF90aGlzLnNoYWxsb3dFcXVhbCA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRcdHZhciBrZXlzID0gT2JqZWN0LmtleXMoYSk7XG5cdFx0XHRcdHJldHVybiBrZXlzLmxlbmd0aCA9PT0gT2JqZWN0LmtleXMoYikubGVuZ3RoICYmIGtleXMucmVkdWNlKGZ1bmN0aW9uIChyZXN1bHQsIGtleSkge1xuXHRcdFx0XHRcdHJldHVybiByZXN1bHQgJiYgKHR5cGVvZiBhW2tleV0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGJba2V5XSA9PT0gJ2Z1bmN0aW9uJyB8fCBhW2tleV0gPT09IGJba2V5XSk7XG5cdFx0XHRcdH0sIHRydWUpO1xuXHRcdFx0fSwgX3RoaXMuZ2V0SGludERhdGEgPSBmdW5jdGlvbiAoX3JlZjQsIF9yZWY1KSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBfcmVmNC50YXJnZXQ7XG5cdFx0XHRcdHZhciBhdHRyaWJ1dGUgPSBfcmVmNS5hdHRyaWJ1dGUsXG5cdFx0XHRcdCAgICBhdXRvUG9zaXRpb24gPSBfcmVmNS5hdXRvUG9zaXRpb24sXG5cdFx0XHRcdCAgICBwb3NpdGlvbiA9IF9yZWY1LnBvc2l0aW9uO1xuXG5cdFx0XHRcdHZhciBjb250ZW50ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpIHx8ICcnO1xuXHRcdFx0XHR2YXIgYXQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSArICctYXQnKSB8fCBwb3NpdGlvbjtcblxuXHRcdFx0XHR2YXIgX3RoaXMkX2NvbnRhaW5lciRnZXRCID0gX3RoaXMuX2NvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdFx0ICAgIGNvbnRhaW5lclRvcCA9IF90aGlzJF9jb250YWluZXIkZ2V0Qi50b3AsXG5cdFx0XHRcdCAgICBjb250YWluZXJMZWZ0ID0gX3RoaXMkX2NvbnRhaW5lciRnZXRCLmxlZnQ7XG5cblx0XHRcdFx0dmFyIF90aGlzJF9oaW50JGdldEJvdW5kaSA9IF90aGlzLl9oaW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0XHQgICAgaGludFdpZHRoID0gX3RoaXMkX2hpbnQkZ2V0Qm91bmRpLndpZHRoLFxuXHRcdFx0XHQgICAgaGludEhlaWdodCA9IF90aGlzJF9oaW50JGdldEJvdW5kaS5oZWlnaHQ7XG5cblx0XHRcdFx0dmFyIF90YXJnZXQkZ2V0Qm91bmRpbmdDbCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcblx0XHRcdFx0ICAgIHRhcmdldFRvcCA9IF90YXJnZXQkZ2V0Qm91bmRpbmdDbC50b3AsXG5cdFx0XHRcdCAgICB0YXJnZXRMZWZ0ID0gX3RhcmdldCRnZXRCb3VuZGluZ0NsLmxlZnQsXG5cdFx0XHRcdCAgICB0YXJnZXRXaWR0aCA9IF90YXJnZXQkZ2V0Qm91bmRpbmdDbC53aWR0aCxcblx0XHRcdFx0ICAgIHRhcmdldEhlaWdodCA9IF90YXJnZXQkZ2V0Qm91bmRpbmdDbC5oZWlnaHQ7XG5cblx0XHRcdFx0aWYgKGF1dG9Qb3NpdGlvbikge1xuXHRcdFx0XHRcdHZhciBpc0hvcml6ID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5jbHVkZXMoYXQpO1xuXG5cdFx0XHRcdFx0dmFyIF9kb2N1bWVudCRkb2N1bWVudEVsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcblx0XHRcdFx0XHQgICAgY2xpZW50SGVpZ2h0ID0gX2RvY3VtZW50JGRvY3VtZW50RWxlLmNsaWVudEhlaWdodCxcblx0XHRcdFx0XHQgICAgY2xpZW50V2lkdGggPSBfZG9jdW1lbnQkZG9jdW1lbnRFbGUuY2xpZW50V2lkdGg7XG5cblxuXHRcdFx0XHRcdHZhciBkaXJlY3Rpb25zID0ge1xuXHRcdFx0XHRcdFx0bGVmdDogKGlzSG9yaXogPyB0YXJnZXRMZWZ0IC0gaGludFdpZHRoIDogdGFyZ2V0TGVmdCArICh0YXJnZXRXaWR0aCAtIGhpbnRXaWR0aCA+PiAxKSkgPiAwLFxuXHRcdFx0XHRcdFx0cmlnaHQ6IChpc0hvcml6ID8gdGFyZ2V0TGVmdCArIHRhcmdldFdpZHRoICsgaGludFdpZHRoIDogdGFyZ2V0TGVmdCArICh0YXJnZXRXaWR0aCArIGhpbnRXaWR0aCA+PiAxKSkgPCBjbGllbnRXaWR0aCxcblx0XHRcdFx0XHRcdGJvdHRvbTogKGlzSG9yaXogPyB0YXJnZXRUb3AgKyAodGFyZ2V0SGVpZ2h0ICsgaGludEhlaWdodCA+PiAxKSA6IHRhcmdldFRvcCArIHRhcmdldEhlaWdodCArIGhpbnRIZWlnaHQpIDwgY2xpZW50SGVpZ2h0LFxuXHRcdFx0XHRcdFx0dG9wOiAoaXNIb3JpeiA/IHRhcmdldFRvcCAtIChoaW50SGVpZ2h0ID4+IDEpIDogdGFyZ2V0VG9wIC0gaGludEhlaWdodCkgPiAwXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHN3aXRjaCAoYXQpIHtcblx0XHRcdFx0XHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMubGVmdCkgYXQgPSAncmlnaHQnO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMudG9wKSBhdCA9ICdib3R0b20nO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMuYm90dG9tKSBhdCA9ICd0b3AnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMucmlnaHQpIGF0ID0gJ2xlZnQnO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMudG9wKSBhdCA9ICdib3R0b20nO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMuYm90dG9tKSBhdCA9ICd0b3AnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLmJvdHRvbSkgYXQgPSAndG9wJztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLmxlZnQpIGF0ID0gJ3JpZ2h0Jztcblx0XHRcdFx0XHRcdFx0aWYgKCFkaXJlY3Rpb25zLnJpZ2h0KSBhdCA9ICdsZWZ0Jztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMudG9wKSBhdCA9ICdib3R0b20nO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMubGVmdCkgYXQgPSAncmlnaHQnO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMucmlnaHQpIGF0ID0gJ2xlZnQnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgdG9wID0gdm9pZCAwLFxuXHRcdFx0XHQgICAgbGVmdCA9IHZvaWQgMDtcblx0XHRcdFx0c3dpdGNoIChhdCkge1xuXHRcdFx0XHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0XHRcdFx0dG9wID0gdGFyZ2V0SGVpZ2h0IC0gaGludEhlaWdodCA+PiAxO1xuXHRcdFx0XHRcdFx0bGVmdCA9IC1oaW50V2lkdGg7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ3JpZ2h0Jzpcblx0XHRcdFx0XHRcdHRvcCA9IHRhcmdldEhlaWdodCAtIGhpbnRIZWlnaHQgPj4gMTtcblx0XHRcdFx0XHRcdGxlZnQgPSB0YXJnZXRXaWR0aDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAnYm90dG9tJzpcblx0XHRcdFx0XHRcdHRvcCA9IHRhcmdldEhlaWdodDtcblx0XHRcdFx0XHRcdGxlZnQgPSB0YXJnZXRXaWR0aCAtIGhpbnRXaWR0aCA+PiAxO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICd0b3AnOlxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR0b3AgPSAtaGludEhlaWdodDtcblx0XHRcdFx0XHRcdGxlZnQgPSB0YXJnZXRXaWR0aCAtIGhpbnRXaWR0aCA+PiAxO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50LCBhdDogYXQsXG5cdFx0XHRcdFx0dG9wOiB0b3AgKyB0YXJnZXRUb3AgLSBjb250YWluZXJUb3AgfCAwLFxuXHRcdFx0XHRcdGxlZnQ6IGxlZnQgKyB0YXJnZXRMZWZ0IC0gY29udGFpbmVyTGVmdCB8IDBcblx0XHRcdFx0fTtcblx0XHRcdH0sIF90ZW1wKSwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oX3RoaXMsIF9yZXQpO1xuXHRcdH1cblxuXHRcdFJlYWN0SGludC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRcdHRoaXMudG9nZ2xlRXZlbnRzKHRoaXMucHJvcHMsIHRydWUpO1xuXHRcdH07XG5cblx0XHRSZWFjdEhpbnQucHJvdG90eXBlLmNvbXBvbmVudFdpbGxVbm1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG5cdFx0XHR0aGlzLnRvZ2dsZUV2ZW50cyh0aGlzLnByb3BzLCBmYWxzZSk7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dCk7XG5cdFx0fTtcblxuXHRcdFJlYWN0SGludC5wcm90b3R5cGUuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKHByb3BzLCBzdGF0ZSkge1xuXHRcdFx0cmV0dXJuICF0aGlzLnNoYWxsb3dFcXVhbChzdGF0ZSwgdGhpcy5zdGF0ZSkgfHwgIXRoaXMuc2hhbGxvd0VxdWFsKHByb3BzLCB0aGlzLnByb3BzKTtcblx0XHR9O1xuXG5cdFx0UmVhY3RIaW50LnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG5cdFx0XHRpZiAodGhpcy5zdGF0ZS50YXJnZXQpIHRoaXMuc2V0U3RhdGUodGhpcy5nZXRIaW50RGF0YSk7XG5cdFx0fTtcblxuXHRcdFJlYWN0SGludC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdHZhciBfcHJvcHMgPSB0aGlzLnByb3BzLFxuXHRcdFx0ICAgIGNsYXNzTmFtZSA9IF9wcm9wcy5jbGFzc05hbWUsXG5cdFx0XHQgICAgb25SZW5kZXJDb250ZW50ID0gX3Byb3BzLm9uUmVuZGVyQ29udGVudDtcblx0XHRcdHZhciBfc3RhdGUgPSB0aGlzLnN0YXRlLFxuXHRcdFx0ICAgIHRhcmdldCA9IF9zdGF0ZS50YXJnZXQsXG5cdFx0XHQgICAgY29udGVudCA9IF9zdGF0ZS5jb250ZW50LFxuXHRcdFx0ICAgIGF0ID0gX3N0YXRlLmF0LFxuXHRcdFx0ICAgIHRvcCA9IF9zdGF0ZS50b3AsXG5cdFx0XHQgICAgbGVmdCA9IF9zdGF0ZS5sZWZ0O1xuXG5cblx0XHRcdHJldHVybiBjcmVhdGVFbGVtZW50KFxuXHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0eyByZWY6IGZ1bmN0aW9uIHJlZihfcmVmNykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMi5fY29udGFpbmVyID0gX3JlZjc7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzdHlsZTogdGhpcy5fY29udGFpbmVyU3R5bGUgfSxcblx0XHRcdFx0dGFyZ2V0ICYmIGNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0eyBjbGFzc05hbWU6IGNsYXNzTmFtZSArICcgJyArIGNsYXNzTmFtZSArICctLScgKyBhdCxcblx0XHRcdFx0XHRcdHJlZjogZnVuY3Rpb24gcmVmKF9yZWY2KSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBfdGhpczIuX2hpbnQgPSBfcmVmNjtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdHlsZTogeyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9IH0sXG5cdFx0XHRcdFx0b25SZW5kZXJDb250ZW50ID8gb25SZW5kZXJDb250ZW50KHRhcmdldCwgY29udGVudCkgOiBjcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lICsgJ19fY29udGVudCcgfSxcblx0XHRcdFx0XHRcdGNvbnRlbnRcblx0XHRcdFx0XHQpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fTtcblxuXHRcdHJldHVybiBSZWFjdEhpbnQ7XG5cdH0oQ29tcG9uZW50KSwgX2NsYXNzLmRlZmF1bHRQcm9wcyA9IHtcblx0XHRhdHRyaWJ1dGU6ICdkYXRhLXJoJyxcblx0XHRhdXRvUG9zaXRpb246IGZhbHNlLFxuXHRcdGNsYXNzTmFtZTogJ3JlYWN0LWhpbnQnLFxuXHRcdGRlbGF5OiAwLFxuXHRcdGV2ZW50czogZmFsc2UsXG5cdFx0b25SZW5kZXJDb250ZW50OiBudWxsLFxuXHRcdHBlcnNpc3Q6IGZhbHNlLFxuXHRcdHBvc2l0aW9uOiAndG9wJ1xuXHR9LCBfdGVtcDI7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT90KGV4cG9ydHMpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW1wiZXhwb3J0c1wiXSx0KTp0KGUucmVkdXhMb2dnZXI9ZS5yZWR1eExvZ2dlcnx8e30pfSh0aGlzLGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQoZSx0KXtlLnN1cGVyXz10LGUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodC5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTplLGVudW1lcmFibGU6ITEsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pfWZ1bmN0aW9uIHIoZSx0KXtPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImtpbmRcIix7dmFsdWU6ZSxlbnVtZXJhYmxlOiEwfSksdCYmdC5sZW5ndGgmJk9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicGF0aFwiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBuKGUsdCxyKXtuLnN1cGVyXy5jYWxsKHRoaXMsXCJFXCIsZSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJsaHNcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJyaHNcIix7dmFsdWU6cixlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gbyhlLHQpe28uc3VwZXJfLmNhbGwodGhpcyxcIk5cIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJoc1wiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBpKGUsdCl7aS5zdXBlcl8uY2FsbCh0aGlzLFwiRFwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwibGhzXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGEoZSx0LHIpe2Euc3VwZXJfLmNhbGwodGhpcyxcIkFcIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImluZGV4XCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiaXRlbVwiLHt2YWx1ZTpyLGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBmKGUsdCxyKXt2YXIgbj1lLnNsaWNlKChyfHx0KSsxfHxlLmxlbmd0aCk7cmV0dXJuIGUubGVuZ3RoPXQ8MD9lLmxlbmd0aCt0OnQsZS5wdXNoLmFwcGx5KGUsbiksZX1mdW5jdGlvbiB1KGUpe3ZhciB0PVwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6TihlKTtyZXR1cm5cIm9iamVjdFwiIT09dD90OmU9PT1NYXRoP1wibWF0aFwiOm51bGw9PT1lP1wibnVsbFwiOkFycmF5LmlzQXJyYXkoZSk/XCJhcnJheVwiOlwiW29iamVjdCBEYXRlXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpP1wiZGF0ZVwiOlwiZnVuY3Rpb25cIj09dHlwZW9mIGUudG9TdHJpbmcmJi9eXFwvLipcXC8vLnRlc3QoZS50b1N0cmluZygpKT9cInJlZ2V4cFwiOlwib2JqZWN0XCJ9ZnVuY3Rpb24gbChlLHQscixjLHMsZCxwKXtzPXN8fFtdLHA9cHx8W107dmFyIGc9cy5zbGljZSgwKTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZCl7aWYoYyl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYyYmYyhnLGQpKXJldHVybjtpZihcIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBjP1widW5kZWZpbmVkXCI6TihjKSkpe2lmKGMucHJlZmlsdGVyJiZjLnByZWZpbHRlcihnLGQpKXJldHVybjtpZihjLm5vcm1hbGl6ZSl7dmFyIGg9Yy5ub3JtYWxpemUoZyxkLGUsdCk7aCYmKGU9aFswXSx0PWhbMV0pfX19Zy5wdXNoKGQpfVwicmVnZXhwXCI9PT11KGUpJiZcInJlZ2V4cFwiPT09dSh0KSYmKGU9ZS50b1N0cmluZygpLHQ9dC50b1N0cmluZygpKTt2YXIgeT1cInVuZGVmaW5lZFwiPT10eXBlb2YgZT9cInVuZGVmaW5lZFwiOk4oZSksdj1cInVuZGVmaW5lZFwiPT10eXBlb2YgdD9cInVuZGVmaW5lZFwiOk4odCksYj1cInVuZGVmaW5lZFwiIT09eXx8cCYmcFtwLmxlbmd0aC0xXS5saHMmJnBbcC5sZW5ndGgtMV0ubGhzLmhhc093blByb3BlcnR5KGQpLG09XCJ1bmRlZmluZWRcIiE9PXZ8fHAmJnBbcC5sZW5ndGgtMV0ucmhzJiZwW3AubGVuZ3RoLTFdLnJocy5oYXNPd25Qcm9wZXJ0eShkKTtpZighYiYmbSlyKG5ldyBvKGcsdCkpO2Vsc2UgaWYoIW0mJmIpcihuZXcgaShnLGUpKTtlbHNlIGlmKHUoZSkhPT11KHQpKXIobmV3IG4oZyxlLHQpKTtlbHNlIGlmKFwiZGF0ZVwiPT09dShlKSYmZS10IT09MClyKG5ldyBuKGcsZSx0KSk7ZWxzZSBpZihcIm9iamVjdFwiPT09eSYmbnVsbCE9PWUmJm51bGwhPT10KWlmKHAuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiB0Lmxocz09PWV9KS5sZW5ndGgpZSE9PXQmJnIobmV3IG4oZyxlLHQpKTtlbHNle2lmKHAucHVzaCh7bGhzOmUscmhzOnR9KSxBcnJheS5pc0FycmF5KGUpKXt2YXIgdztlLmxlbmd0aDtmb3Iodz0wO3c8ZS5sZW5ndGg7dysrKXc+PXQubGVuZ3RoP3IobmV3IGEoZyx3LG5ldyBpKHZvaWQgMCxlW3ddKSkpOmwoZVt3XSx0W3ddLHIsYyxnLHcscCk7Zm9yKDt3PHQubGVuZ3RoOylyKG5ldyBhKGcsdyxuZXcgbyh2b2lkIDAsdFt3KytdKSkpfWVsc2V7dmFyIHg9T2JqZWN0LmtleXMoZSksUz1PYmplY3Qua2V5cyh0KTt4LmZvckVhY2goZnVuY3Rpb24obixvKXt2YXIgaT1TLmluZGV4T2Yobik7aT49MD8obChlW25dLHRbbl0scixjLGcsbixwKSxTPWYoUyxpKSk6bChlW25dLHZvaWQgMCxyLGMsZyxuLHApfSksUy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2wodm9pZCAwLHRbZV0scixjLGcsZSxwKX0pfXAubGVuZ3RoPXAubGVuZ3RoLTF9ZWxzZSBlIT09dCYmKFwibnVtYmVyXCI9PT15JiZpc05hTihlKSYmaXNOYU4odCl8fHIobmV3IG4oZyxlLHQpKSl9ZnVuY3Rpb24gYyhlLHQscixuKXtyZXR1cm4gbj1ufHxbXSxsKGUsdCxmdW5jdGlvbihlKXtlJiZuLnB1c2goZSl9LHIpLG4ubGVuZ3RoP246dm9pZCAwfWZ1bmN0aW9uIHMoZSx0LHIpe2lmKHIucGF0aCYmci5wYXRoLmxlbmd0aCl7dmFyIG4sbz1lW3RdLGk9ci5wYXRoLmxlbmd0aC0xO2ZvcihuPTA7bjxpO24rKylvPW9bci5wYXRoW25dXTtzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cyhvW3IucGF0aFtuXV0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjpkZWxldGUgb1tyLnBhdGhbbl1dO2JyZWFrO2Nhc2VcIkVcIjpjYXNlXCJOXCI6b1tyLnBhdGhbbl1dPXIucmhzfX1lbHNlIHN3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpzKGVbdF0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjplPWYoZSx0KTticmVhaztjYXNlXCJFXCI6Y2FzZVwiTlwiOmVbdF09ci5yaHN9cmV0dXJuIGV9ZnVuY3Rpb24gZChlLHQscil7aWYoZSYmdCYmciYmci5raW5kKXtmb3IodmFyIG49ZSxvPS0xLGk9ci5wYXRoP3IucGF0aC5sZW5ndGgtMTowOysrbzxpOylcInVuZGVmaW5lZFwiPT10eXBlb2YgbltyLnBhdGhbb11dJiYobltyLnBhdGhbb11dPVwibnVtYmVyXCI9PXR5cGVvZiByLnBhdGhbb10/W106e30pLG49bltyLnBhdGhbb11dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpzKHIucGF0aD9uW3IucGF0aFtvXV06bixyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmRlbGV0ZSBuW3IucGF0aFtvXV07YnJlYWs7Y2FzZVwiRVwiOmNhc2VcIk5cIjpuW3IucGF0aFtvXV09ci5yaHN9fX1mdW5jdGlvbiBwKGUsdCxyKXtpZihyLnBhdGgmJnIucGF0aC5sZW5ndGgpe3ZhciBuLG89ZVt0XSxpPXIucGF0aC5sZW5ndGgtMTtmb3Iobj0wO248aTtuKyspbz1vW3IucGF0aFtuXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnAob1tyLnBhdGhbbl1dLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6b1tyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIkVcIjpvW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiTlwiOmRlbGV0ZSBvW3IucGF0aFtuXV19fWVsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnAoZVt0XSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmVbdF09ci5saHM7YnJlYWs7Y2FzZVwiRVwiOmVbdF09ci5saHM7YnJlYWs7Y2FzZVwiTlwiOmU9ZihlLHQpfXJldHVybiBlfWZ1bmN0aW9uIGcoZSx0LHIpe2lmKGUmJnQmJnImJnIua2luZCl7dmFyIG4sbyxpPWU7Zm9yKG89ci5wYXRoLmxlbmd0aC0xLG49MDtuPG87bisrKVwidW5kZWZpbmVkXCI9PXR5cGVvZiBpW3IucGF0aFtuXV0mJihpW3IucGF0aFtuXV09e30pLGk9aVtyLnBhdGhbbl1dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpwKGlbci5wYXRoW25dXSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmlbci5wYXRoW25dXT1yLmxoczticmVhaztjYXNlXCJFXCI6aVtyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIk5cIjpkZWxldGUgaVtyLnBhdGhbbl1dfX19ZnVuY3Rpb24gaChlLHQscil7aWYoZSYmdCl7dmFyIG49ZnVuY3Rpb24obil7ciYmIXIoZSx0LG4pfHxkKGUsdCxuKX07bChlLHQsbil9fWZ1bmN0aW9uIHkoZSl7cmV0dXJuXCJjb2xvcjogXCIrRltlXS5jb2xvcitcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIn1mdW5jdGlvbiB2KGUpe3ZhciB0PWUua2luZCxyPWUucGF0aCxuPWUubGhzLG89ZS5yaHMsaT1lLmluZGV4LGE9ZS5pdGVtO3N3aXRjaCh0KXtjYXNlXCJFXCI6cmV0dXJuW3Iuam9pbihcIi5cIiksbixcIuKGklwiLG9dO2Nhc2VcIk5cIjpyZXR1cm5bci5qb2luKFwiLlwiKSxvXTtjYXNlXCJEXCI6cmV0dXJuW3Iuam9pbihcIi5cIildO2Nhc2VcIkFcIjpyZXR1cm5bci5qb2luKFwiLlwiKStcIltcIitpK1wiXVwiLGFdO2RlZmF1bHQ6cmV0dXJuW119fWZ1bmN0aW9uIGIoZSx0LHIsbil7dmFyIG89YyhlLHQpO3RyeXtuP3IuZ3JvdXBDb2xsYXBzZWQoXCJkaWZmXCIpOnIuZ3JvdXAoXCJkaWZmXCIpfWNhdGNoKGUpe3IubG9nKFwiZGlmZlwiKX1vP28uZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1lLmtpbmQsbj12KGUpO3IubG9nLmFwcGx5KHIsW1wiJWMgXCIrRlt0XS50ZXh0LHkodCldLmNvbmNhdChQKG4pKSl9KTpyLmxvZyhcIuKAlOKAlCBubyBkaWZmIOKAlOKAlFwiKTt0cnl7ci5ncm91cEVuZCgpfWNhdGNoKGUpe3IubG9nKFwi4oCU4oCUIGRpZmYgZW5kIOKAlOKAlCBcIil9fWZ1bmN0aW9uIG0oZSx0LHIsbil7c3dpdGNoKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6TihlKSl7Y2FzZVwib2JqZWN0XCI6cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZVtuXT9lW25dLmFwcGx5KGUsUChyKSk6ZVtuXTtjYXNlXCJmdW5jdGlvblwiOnJldHVybiBlKHQpO2RlZmF1bHQ6cmV0dXJuIGV9fWZ1bmN0aW9uIHcoZSl7dmFyIHQ9ZS50aW1lc3RhbXAscj1lLmR1cmF0aW9uO3JldHVybiBmdW5jdGlvbihlLG4sbyl7dmFyIGk9W1wiYWN0aW9uXCJdO3JldHVybiBpLnB1c2goXCIlY1wiK1N0cmluZyhlLnR5cGUpKSx0JiZpLnB1c2goXCIlY0AgXCIrbiksciYmaS5wdXNoKFwiJWMoaW4gXCIrby50b0ZpeGVkKDIpK1wiIG1zKVwiKSxpLmpvaW4oXCIgXCIpfX1mdW5jdGlvbiB4KGUsdCl7dmFyIHI9dC5sb2dnZXIsbj10LmFjdGlvblRyYW5zZm9ybWVyLG89dC50aXRsZUZvcm1hdHRlcixpPXZvaWQgMD09PW8/dyh0KTpvLGE9dC5jb2xsYXBzZWQsZj10LmNvbG9ycyx1PXQubGV2ZWwsbD10LmRpZmYsYz1cInVuZGVmaW5lZFwiPT10eXBlb2YgdC50aXRsZUZvcm1hdHRlcjtlLmZvckVhY2goZnVuY3Rpb24obyxzKXt2YXIgZD1vLnN0YXJ0ZWQscD1vLnN0YXJ0ZWRUaW1lLGc9by5hY3Rpb24saD1vLnByZXZTdGF0ZSx5PW8uZXJyb3Isdj1vLnRvb2ssdz1vLm5leHRTdGF0ZSx4PWVbcysxXTt4JiYodz14LnByZXZTdGF0ZSx2PXguc3RhcnRlZC1kKTt2YXIgUz1uKGcpLGs9XCJmdW5jdGlvblwiPT10eXBlb2YgYT9hKGZ1bmN0aW9uKCl7cmV0dXJuIHd9LGcsbyk6YSxqPUQocCksRT1mLnRpdGxlP1wiY29sb3I6IFwiK2YudGl0bGUoUykrXCI7XCI6XCJcIixBPVtcImNvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjtcIl07QS5wdXNoKEUpLHQudGltZXN0YW1wJiZBLnB1c2goXCJjb2xvcjogZ3JheTsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XCIpLHQuZHVyYXRpb24mJkEucHVzaChcImNvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjtcIik7dmFyIE89aShTLGosdik7dHJ5e2s/Zi50aXRsZSYmYz9yLmdyb3VwQ29sbGFwc2VkLmFwcGx5KHIsW1wiJWMgXCIrT10uY29uY2F0KEEpKTpyLmdyb3VwQ29sbGFwc2VkKE8pOmYudGl0bGUmJmM/ci5ncm91cC5hcHBseShyLFtcIiVjIFwiK09dLmNvbmNhdChBKSk6ci5ncm91cChPKX1jYXRjaChlKXtyLmxvZyhPKX12YXIgTj1tKHUsUyxbaF0sXCJwcmV2U3RhdGVcIiksUD1tKHUsUyxbU10sXCJhY3Rpb25cIiksQz1tKHUsUyxbeSxoXSxcImVycm9yXCIpLEY9bSh1LFMsW3ddLFwibmV4dFN0YXRlXCIpO2lmKE4paWYoZi5wcmV2U3RhdGUpe3ZhciBMPVwiY29sb3I6IFwiK2YucHJldlN0YXRlKGgpK1wiOyBmb250LXdlaWdodDogYm9sZFwiO3JbTl0oXCIlYyBwcmV2IHN0YXRlXCIsTCxoKX1lbHNlIHJbTl0oXCJwcmV2IHN0YXRlXCIsaCk7aWYoUClpZihmLmFjdGlvbil7dmFyIFQ9XCJjb2xvcjogXCIrZi5hY3Rpb24oUykrXCI7IGZvbnQtd2VpZ2h0OiBib2xkXCI7cltQXShcIiVjIGFjdGlvbiAgICBcIixULFMpfWVsc2UgcltQXShcImFjdGlvbiAgICBcIixTKTtpZih5JiZDKWlmKGYuZXJyb3Ipe3ZhciBNPVwiY29sb3I6IFwiK2YuZXJyb3IoeSxoKStcIjsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI7cltDXShcIiVjIGVycm9yICAgICBcIixNLHkpfWVsc2UgcltDXShcImVycm9yICAgICBcIix5KTtpZihGKWlmKGYubmV4dFN0YXRlKXt2YXIgXz1cImNvbG9yOiBcIitmLm5leHRTdGF0ZSh3KStcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIjtyW0ZdKFwiJWMgbmV4dCBzdGF0ZVwiLF8sdyl9ZWxzZSByW0ZdKFwibmV4dCBzdGF0ZVwiLHcpO2wmJmIoaCx3LHIsayk7dHJ5e3IuZ3JvdXBFbmQoKX1jYXRjaChlKXtyLmxvZyhcIuKAlOKAlCBsb2cgZW5kIOKAlOKAlFwiKX19KX1mdW5jdGlvbiBTKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LHQ9T2JqZWN0LmFzc2lnbih7fSxMLGUpLHI9dC5sb2dnZXIsbj10LnN0YXRlVHJhbnNmb3JtZXIsbz10LmVycm9yVHJhbnNmb3JtZXIsaT10LnByZWRpY2F0ZSxhPXQubG9nRXJyb3JzLGY9dC5kaWZmUHJlZGljYXRlO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiByKXJldHVybiBmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9fX07aWYoZS5nZXRTdGF0ZSYmZS5kaXNwYXRjaClyZXR1cm4gY29uc29sZS5lcnJvcihcIltyZWR1eC1sb2dnZXJdIHJlZHV4LWxvZ2dlciBub3QgaW5zdGFsbGVkLiBNYWtlIHN1cmUgdG8gcGFzcyBsb2dnZXIgaW5zdGFuY2UgYXMgbWlkZGxld2FyZTpcXG4vLyBMb2dnZXIgd2l0aCBkZWZhdWx0IG9wdGlvbnNcXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXFxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcXG4gIHJlZHVjZXIsXFxuICBhcHBseU1pZGRsZXdhcmUobG9nZ2VyKVxcbilcXG4vLyBPciB5b3UgY2FuIGNyZWF0ZSB5b3VyIG93biBsb2dnZXIgd2l0aCBjdXN0b20gb3B0aW9ucyBodHRwOi8vYml0Lmx5L3JlZHV4LWxvZ2dlci1vcHRpb25zXFxuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInXFxuY29uc3QgbG9nZ2VyID0gY3JlYXRlTG9nZ2VyKHtcXG4gIC8vIC4uLm9wdGlvbnNcXG59KTtcXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxcbiAgcmVkdWNlcixcXG4gIGFwcGx5TWlkZGxld2FyZShsb2dnZXIpXFxuKVxcblwiKSxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24odCl7cmV0dXJuIGUodCl9fX07dmFyIHU9W107cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciByPWUuZ2V0U3RhdGU7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihsKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBpJiYhaShyLGwpKXJldHVybiBlKGwpO3ZhciBjPXt9O3UucHVzaChjKSxjLnN0YXJ0ZWQ9Ty5ub3coKSxjLnN0YXJ0ZWRUaW1lPW5ldyBEYXRlLGMucHJldlN0YXRlPW4ocigpKSxjLmFjdGlvbj1sO3ZhciBzPXZvaWQgMDtpZihhKXRyeXtzPWUobCl9Y2F0Y2goZSl7Yy5lcnJvcj1vKGUpfWVsc2Ugcz1lKGwpO2MudG9vaz1PLm5vdygpLWMuc3RhcnRlZCxjLm5leHRTdGF0ZT1uKHIoKSk7dmFyIGQ9dC5kaWZmJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBmP2YocixsKTp0LmRpZmY7aWYoeCh1LE9iamVjdC5hc3NpZ24oe30sdCx7ZGlmZjpkfSkpLHUubGVuZ3RoPTAsYy5lcnJvcil0aHJvdyBjLmVycm9yO3JldHVybiBzfX19fXZhciBrLGosRT1mdW5jdGlvbihlLHQpe3JldHVybiBuZXcgQXJyYXkodCsxKS5qb2luKGUpfSxBPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIEUoXCIwXCIsdC1lLnRvU3RyaW5nKCkubGVuZ3RoKStlfSxEPWZ1bmN0aW9uKGUpe3JldHVybiBBKGUuZ2V0SG91cnMoKSwyKStcIjpcIitBKGUuZ2V0TWludXRlcygpLDIpK1wiOlwiK0EoZS5nZXRTZWNvbmRzKCksMikrXCIuXCIrQShlLmdldE1pbGxpc2Vjb25kcygpLDMpfSxPPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBwZXJmb3JtYW5jZSYmbnVsbCE9PXBlcmZvcm1hbmNlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBwZXJmb3JtYW5jZS5ub3c/cGVyZm9ybWFuY2U6RGF0ZSxOPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbihlKXtyZXR1cm4gdHlwZW9mIGV9OmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJmUuY29uc3RydWN0b3I9PT1TeW1ib2wmJmUhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIGV9LFA9ZnVuY3Rpb24oZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAscj1BcnJheShlLmxlbmd0aCk7dDxlLmxlbmd0aDt0Kyspclt0XT1lW3RdO3JldHVybiByfXJldHVybiBBcnJheS5mcm9tKGUpfSxDPVtdO2s9XCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2YgZ2xvYmFsP1widW5kZWZpbmVkXCI6TihnbG9iYWwpKSYmZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSxqPWsuRGVlcERpZmYsaiYmQy5wdXNoKGZ1bmN0aW9uKCl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGomJmsuRGVlcERpZmY9PT1jJiYoay5EZWVwRGlmZj1qLGo9dm9pZCAwKX0pLHQobixyKSx0KG8sciksdChpLHIpLHQoYSxyKSxPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjLHtkaWZmOnt2YWx1ZTpjLGVudW1lcmFibGU6ITB9LG9ic2VydmFibGVEaWZmOnt2YWx1ZTpsLGVudW1lcmFibGU6ITB9LGFwcGx5RGlmZjp7dmFsdWU6aCxlbnVtZXJhYmxlOiEwfSxhcHBseUNoYW5nZTp7dmFsdWU6ZCxlbnVtZXJhYmxlOiEwfSxyZXZlcnRDaGFuZ2U6e3ZhbHVlOmcsZW51bWVyYWJsZTohMH0saXNDb25mbGljdDp7dmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2Ygan0sZW51bWVyYWJsZTohMH0sbm9Db25mbGljdDp7dmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gQyYmKEMuZm9yRWFjaChmdW5jdGlvbihlKXtlKCl9KSxDPW51bGwpLGN9LGVudW1lcmFibGU6ITB9fSk7dmFyIEY9e0U6e2NvbG9yOlwiIzIxOTZGM1wiLHRleHQ6XCJDSEFOR0VEOlwifSxOOntjb2xvcjpcIiM0Q0FGNTBcIix0ZXh0OlwiQURERUQ6XCJ9LEQ6e2NvbG9yOlwiI0Y0NDMzNlwiLHRleHQ6XCJERUxFVEVEOlwifSxBOntjb2xvcjpcIiMyMTk2RjNcIix0ZXh0OlwiQVJSQVk6XCJ9fSxMPXtsZXZlbDpcImxvZ1wiLGxvZ2dlcjpjb25zb2xlLGxvZ0Vycm9yczohMCxjb2xsYXBzZWQ6dm9pZCAwLHByZWRpY2F0ZTp2b2lkIDAsZHVyYXRpb246ITEsdGltZXN0YW1wOiEwLHN0YXRlVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGFjdGlvblRyYW5zZm9ybWVyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxlcnJvclRyYW5zZm9ybWVyOmZ1bmN0aW9uKGUpe3JldHVybiBlfSxjb2xvcnM6e3RpdGxlOmZ1bmN0aW9uKCl7cmV0dXJuXCJpbmhlcml0XCJ9LHByZXZTdGF0ZTpmdW5jdGlvbigpe3JldHVyblwiIzlFOUU5RVwifSxhY3Rpb246ZnVuY3Rpb24oKXtyZXR1cm5cIiMwM0E5RjRcIn0sbmV4dFN0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuXCIjNENBRjUwXCJ9LGVycm9yOmZ1bmN0aW9uKCl7cmV0dXJuXCIjRjIwNDA0XCJ9fSxkaWZmOiExLGRpZmZQcmVkaWNhdGU6dm9pZCAwLHRyYW5zZm9ybWVyOnZvaWQgMH0sVD1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSx0PWUuZGlzcGF0Y2gscj1lLmdldFN0YXRlO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHR8fFwiZnVuY3Rpb25cIj09dHlwZW9mIHI/UygpKHtkaXNwYXRjaDp0LGdldFN0YXRlOnJ9KTp2b2lkIGNvbnNvbGUuZXJyb3IoXCJcXG5bcmVkdXgtbG9nZ2VyIHYzXSBCUkVBS0lORyBDSEFOR0VcXG5bcmVkdXgtbG9nZ2VyIHYzXSBTaW5jZSAzLjAuMCByZWR1eC1sb2dnZXIgZXhwb3J0cyBieSBkZWZhdWx0IGxvZ2dlciB3aXRoIGRlZmF1bHQgc2V0dGluZ3MuXFxuW3JlZHV4LWxvZ2dlciB2M10gQ2hhbmdlXFxuW3JlZHV4LWxvZ2dlciB2M10gaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tICdyZWR1eC1sb2dnZXInXFxuW3JlZHV4LWxvZ2dlciB2M10gdG9cXG5bcmVkdXgtbG9nZ2VyIHYzXSBpbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXFxuXCIpfTtlLmRlZmF1bHRzPUwsZS5jcmVhdGVMb2dnZXI9UyxlLmxvZ2dlcj1ULGUuZGVmYXVsdD1ULE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pfSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlJFSkVDVEVEID0gZXhwb3J0cy5GVUxGSUxMRUQgPSBleHBvcnRzLlBFTkRJTkcgPSB1bmRlZmluZWQ7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcHJvbWlzZU1pZGRsZXdhcmU7XG5cbnZhciBfaXNQcm9taXNlID0gcmVxdWlyZSgnLi9pc1Byb21pc2UuanMnKTtcblxudmFyIF9pc1Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQcm9taXNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBOb3RlIHRvIGNvbnRyaWJ1dG9yczogUGxlYXNlIGFsc28gcmVtZW1iZXIgdG8gY2hlY2sgYW5kIG1ha2Ugc3VyZVxuICogdGhhdCBgaW5kZXguZC50c2AgaXMgYWxzbyB1cCB0byBkYXRlIHdpdGggdGhlIGltcGxlbWVudGF0aW9uIHdoZW5cbiAqIHlvdSBhZGQgbmV3IGZlYXR1cmVzIG9yIG1vZGlmeSBleGlzdGluZyBvbmVzLlxuICovXG5cbi8vIFRoZSBkZWZhdWx0IGFzeW5jIGFjdGlvbiB0eXBlc1xudmFyIFBFTkRJTkcgPSBleHBvcnRzLlBFTkRJTkcgPSAnUEVORElORyc7XG52YXIgRlVMRklMTEVEID0gZXhwb3J0cy5GVUxGSUxMRUQgPSAnRlVMRklMTEVEJztcbnZhciBSRUpFQ1RFRCA9IGV4cG9ydHMuUkVKRUNURUQgPSAnUkVKRUNURUQnO1xudmFyIGRlZmF1bHRUeXBlcyA9IFtQRU5ESU5HLCBGVUxGSUxMRUQsIFJFSkVDVEVEXTtcblxuLyoqXG4gKiBGdW5jdGlvbjogcHJvbWlzZU1pZGRsZXdhcmVcbiAqIERlc2NyaXB0aW9uOiBUaGUgbWFpbiBwcm9taXNlTWlkZGxld2FyZSBhY2NlcHRzIGEgY29uZmlndXJhdGlvblxuICogb2JqZWN0IGFuZCByZXR1cm5zIHRoZSBtaWRkbGV3YXJlLlxuICovXG5mdW5jdGlvbiBwcm9taXNlTWlkZGxld2FyZSgpIHtcbiAgdmFyIGNvbmZpZyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgdmFyIFBST01JU0VfVFlQRV9TVUZGSVhFUyA9IGNvbmZpZy5wcm9taXNlVHlwZVN1ZmZpeGVzIHx8IGRlZmF1bHRUeXBlcztcbiAgdmFyIFBST01JU0VfVFlQRV9ERUxJTUlURVIgPSBjb25maWcucHJvbWlzZVR5cGVEZWxpbWl0ZXIgfHwgJ18nO1xuXG4gIHJldHVybiBmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGRpc3BhdGNoID0gcmVmLmRpc3BhdGNoO1xuXG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc3RhbnRpYXRlIHZhcmlhYmxlcyB0byBob2xkOlxuICAgICAgICAgKiAoMSkgdGhlIHByb21pc2VcbiAgICAgICAgICogKDIpIHRoZSBkYXRhIGZvciBvcHRpbWlzdGljIHVwZGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHZhciBwcm9taXNlID0gdm9pZCAwO1xuICAgICAgICB2YXIgZGF0YSA9IHZvaWQgMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlcmUgYXJlIG11bHRpcGxlIHdheXMgdG8gZGlzcGF0Y2ggYSBwcm9taXNlLiBUaGUgZmlyc3Qgc3RlcCBpcyB0b1xuICAgICAgICAgKiBkZXRlcm1pbmUgaWYgdGhlIHByb21pc2UgaXMgZGVmaW5lZDpcbiAgICAgICAgICogKGEpIGV4cGxpY2l0bHkgKGFjdGlvbi5wYXlsb2FkLnByb21pc2UgaXMgdGhlIHByb21pc2UpXG4gICAgICAgICAqIChiKSBpbXBsaWNpdGx5IChhY3Rpb24ucGF5bG9hZCBpcyB0aGUgcHJvbWlzZSlcbiAgICAgICAgICogKGMpIGFzIGFuIGFzeW5jIGZ1bmN0aW9uIChyZXR1cm5zIGEgcHJvbWlzZSB3aGVuIGNhbGxlZClcbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlIHByb21pc2UgaXMgbm90IGRlZmluZWQgaW4gb25lIG9mIHRoZXNlIHRocmVlIHdheXMsIHdlIGRvbid0IGRvXG4gICAgICAgICAqIGFueXRoaW5nIGFuZCBtb3ZlIG9uIHRvIHRoZSBuZXh0IG1pZGRsZXdhcmUgaW4gdGhlIG1pZGRsZXdhcmUgY2hhaW4uXG4gICAgICAgICAqL1xuXG4gICAgICAgIC8vIFN0ZXAgMWE6IElzIHRoZXJlIGEgcGF5bG9hZD9cbiAgICAgICAgaWYgKGFjdGlvbi5wYXlsb2FkKSB7XG4gICAgICAgICAgdmFyIFBBWUxPQUQgPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgICAgICAgIC8vIFN0ZXAgMS4xOiBJcyB0aGUgcHJvbWlzZSBpbXBsaWNpdGx5IGRlZmluZWQ/XG4gICAgICAgICAgaWYgKCgwLCBfaXNQcm9taXNlMi5kZWZhdWx0KShQQVlMT0FEKSkge1xuICAgICAgICAgICAgcHJvbWlzZSA9IFBBWUxPQUQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU3RlcCAxLjI6IElzIHRoZSBwcm9taXNlIGV4cGxpY2l0bHkgZGVmaW5lZD9cbiAgICAgICAgICBlbHNlIGlmICgoMCwgX2lzUHJvbWlzZTIuZGVmYXVsdCkoUEFZTE9BRC5wcm9taXNlKSkge1xuICAgICAgICAgICAgICBwcm9taXNlID0gUEFZTE9BRC5wcm9taXNlO1xuICAgICAgICAgICAgICBkYXRhID0gUEFZTE9BRC5kYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTdGVwIDEuMzogSXMgdGhlIHByb21pc2UgcmV0dXJuZWQgYnkgYW4gYXN5bmMgZnVuY3Rpb24/XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgUEFZTE9BRCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgUEFZTE9BRC5wcm9taXNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IFBBWUxPQUQucHJvbWlzZSA/IFBBWUxPQUQucHJvbWlzZSgpIDogUEFZTE9BRCgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBQQVlMT0FELnByb21pc2UgPyBQQVlMT0FELmRhdGEgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBTdGVwIDEuMy4xOiBJcyB0aGUgcmV0dXJuIG9mIGFjdGlvbi5wYXlsb2FkIGEgcHJvbWlzZT9cbiAgICAgICAgICAgICAgICBpZiAoISgwLCBfaXNQcm9taXNlMi5kZWZhdWx0KShwcm9taXNlKSkge1xuXG4gICAgICAgICAgICAgICAgICAvLyBJZiBub3QsIG1vdmUgb24gdG8gdGhlIG5leHQgbWlkZGxld2FyZS5cbiAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KF9leHRlbmRzKHt9LCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZDogcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFN0ZXAgMS40OiBJZiB0aGVyZSdzIG5vIHByb21pc2UsIG1vdmUgb24gdG8gdGhlIG5leHQgbWlkZGxld2FyZS5cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFN0ZXAgMWI6IElmIHRoZXJlJ3Mgbm8gcGF5bG9hZCwgbW92ZSBvbiB0byB0aGUgbmV4dCBtaWRkbGV3YXJlLlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5zdGFudGlhdGUgYW5kIGRlZmluZSBjb25zdGFudHMgZm9yOlxuICAgICAgICAgKiAoMSkgdGhlIGFjdGlvbiB0eXBlXG4gICAgICAgICAqICgyKSB0aGUgYWN0aW9uIG1ldGFcbiAgICAgICAgICovXG4gICAgICAgIHZhciBUWVBFID0gYWN0aW9uLnR5cGU7XG4gICAgICAgIHZhciBNRVRBID0gYWN0aW9uLm1ldGE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc3RhbnRpYXRlIGFuZCBkZWZpbmUgY29uc3RhbnRzIGZvciB0aGUgYWN0aW9uIHR5cGUgc3VmZml4ZXMuXG4gICAgICAgICAqIFRoZXNlIGFyZSBhcHBlbmRlZCB0byB0aGUgZW5kIG9mIHRoZSBhY3Rpb24gdHlwZS5cbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIF9QUk9NSVNFX1RZUEVfU1VGRklYRSA9IF9zbGljZWRUb0FycmF5KFBST01JU0VfVFlQRV9TVUZGSVhFUywgMyksXG4gICAgICAgICAgICBfUEVORElORyA9IF9QUk9NSVNFX1RZUEVfU1VGRklYRVswXSxcbiAgICAgICAgICAgIF9GVUxGSUxMRUQgPSBfUFJPTUlTRV9UWVBFX1NVRkZJWEVbMV0sXG4gICAgICAgICAgICBfUkVKRUNURUQgPSBfUFJPTUlTRV9UWVBFX1NVRkZJWEVbMl07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZ1bmN0aW9uOiBnZXRBY3Rpb25cbiAgICAgICAgICogRGVzY3JpcHRpb246IFRoaXMgZnVuY3Rpb24gY29uc3RydWN0cyBhbmQgcmV0dXJucyBhIHJlamVjdGVkXG4gICAgICAgICAqIG9yIGZ1bGZpbGxlZCBhY3Rpb24gb2JqZWN0LiBUaGUgYWN0aW9uIG9iamVjdCBpcyBiYXNlZCBvZmYgdGhlIEZsdXhcbiAgICAgICAgICogU3RhbmRhcmQgQWN0aW9uIChGU0EpLlxuICAgICAgICAgKlxuICAgICAgICAgKiBHaXZlbiBhbiBvcmlnaW5hbCBhY3Rpb24gd2l0aCB0aGUgdHlwZSBGT086XG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSByZWplY3RlZCBvYmplY3QgbW9kZWwgd2lsbCBiZTpcbiAgICAgICAgICoge1xuICAgICAgICAgKiAgIGVycm9yOiB0cnVlLFxuICAgICAgICAgKiAgIHR5cGU6ICdGT09fUkVKRUNURUQnLFxuICAgICAgICAgKiAgIHBheWxvYWQ6IC4uLixcbiAgICAgICAgICogICBtZXRhOiAuLi4gKG9wdGlvbmFsKVxuICAgICAgICAgKiB9XG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBmdWxmaWxsZWQgb2JqZWN0IG1vZGVsIHdpbGwgYmU6XG4gICAgICAgICAqIHtcbiAgICAgICAgICogICB0eXBlOiAnRk9PX0ZVTEZJTExFRCcsXG4gICAgICAgICAqICAgcGF5bG9hZDogLi4uLFxuICAgICAgICAgKiAgIG1ldGE6IC4uLiAob3B0aW9uYWwpXG4gICAgICAgICAqIH1cbiAgICAgICAgICovXG5cblxuICAgICAgICB2YXIgZ2V0QWN0aW9uID0gZnVuY3Rpb24gZ2V0QWN0aW9uKG5ld1BheWxvYWQsIGlzUmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAgICAgICAgLy8gQ29uY2F0ZW50YXRlIHRoZSB0eXBlIHN0cmluZyBwcm9wZXJ0eS5cbiAgICAgICAgICAgIHR5cGU6IFtUWVBFLCBpc1JlamVjdGVkID8gX1JFSkVDVEVEIDogX0ZVTEZJTExFRF0uam9pbihQUk9NSVNFX1RZUEVfREVMSU1JVEVSKVxuXG4gICAgICAgICAgfSwgbmV3UGF5bG9hZCA9PT0gbnVsbCB8fCB0eXBlb2YgbmV3UGF5bG9hZCA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IHtcbiAgICAgICAgICAgIHBheWxvYWQ6IG5ld1BheWxvYWRcbiAgICAgICAgICB9LCBNRVRBICE9PSB1bmRlZmluZWQgPyB7IG1ldGE6IE1FVEEgfSA6IHt9LCBpc1JlamVjdGVkID8ge1xuICAgICAgICAgICAgZXJyb3I6IHRydWVcbiAgICAgICAgICB9IDoge30pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbjogaGFuZGxlUmVqZWN0XG4gICAgICAgICAqIENhbGxzOiBnZXRBY3Rpb24gdG8gY29uc3RydWN0IHRoZSByZWplY3RlZCBhY3Rpb25cbiAgICAgICAgICogRGVzY3JpcHRpb246IFRoaXMgZnVuY3Rpb24gZGlzcGF0Y2hlcyB0aGUgcmVqZWN0ZWQgYWN0aW9uIGFuZCByZXR1cm5zXG4gICAgICAgICAqIHRoZSBvcmlnaW5hbCBFcnJvciBvYmplY3QuIFBsZWFzZSBub3RlIHRoZSBkZXZlbG9wZXIgaXMgcmVzcG9uc2libGVcbiAgICAgICAgICogZm9yIGNvbnN0cnVjdGluZyBhbmQgdGhyb3dpbmcgYW4gRXJyb3Igb2JqZWN0LiBUaGUgbWlkZGxld2FyZSBkb2VzIG5vdFxuICAgICAgICAgKiBjb25zdHJ1Y3QgYW55IEVycm9ycy5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBoYW5kbGVSZWplY3QgPSBmdW5jdGlvbiBoYW5kbGVSZWplY3QocmVhc29uKSB7XG4gICAgICAgICAgdmFyIHJlamVjdGVkQWN0aW9uID0gZ2V0QWN0aW9uKHJlYXNvbiwgdHJ1ZSk7XG4gICAgICAgICAgZGlzcGF0Y2gocmVqZWN0ZWRBY3Rpb24pO1xuXG4gICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGdW5jdGlvbjogaGFuZGxlRnVsZmlsbFxuICAgICAgICAgKiBDYWxsczogZ2V0QWN0aW9uIHRvIGNvbnN0cnVjdCB0aGUgZnVsbGZpbGxlZCBhY3Rpb25cbiAgICAgICAgICogRGVzY3JpcHRpb246IFRoaXMgZnVuY3Rpb24gZGlzcGF0Y2hlcyB0aGUgZnVsZmlsbGVkIGFjdGlvbiBhbmRcbiAgICAgICAgICogcmV0dXJucyB0aGUgc3VjY2VzcyBvYmplY3QuIFRoZSBzdWNjZXNzIG9iamVjdCBzaG91bGRcbiAgICAgICAgICogY29udGFpbiB0aGUgdmFsdWUgYW5kIHRoZSBkaXNwYXRjaGVkIGFjdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBoYW5kbGVGdWxmaWxsID0gZnVuY3Rpb24gaGFuZGxlRnVsZmlsbCgpIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IG51bGw7XG5cbiAgICAgICAgICB2YXIgcmVzb2x2ZWRBY3Rpb24gPSBnZXRBY3Rpb24odmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICBkaXNwYXRjaChyZXNvbHZlZEFjdGlvbik7XG5cbiAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGFjdGlvbjogcmVzb2x2ZWRBY3Rpb24gfTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmlyc3QsIGRpc3BhdGNoIHRoZSBwZW5kaW5nIGFjdGlvbjpcbiAgICAgICAgICogVGhpcyBvYmplY3QgZGVzY3JpYmVzIHRoZSBwZW5kaW5nIHN0YXRlIG9mIGEgcHJvbWlzZSBhbmQgd2lsbCBpbmNsdWRlXG4gICAgICAgICAqIGFueSBkYXRhIChmb3Igb3B0aW1pc3RpYyB1cGRhdGVzKSBhbmQvb3IgbWV0YSBmcm9tIHRoZSBvcmlnaW5hbCBhY3Rpb24uXG4gICAgICAgICAqL1xuICAgICAgICBuZXh0KF9leHRlbmRzKHtcbiAgICAgICAgICAvLyBDb25jYXRlbnRhdGUgdGhlIHR5cGUgc3RyaW5nLlxuICAgICAgICAgIHR5cGU6IFtUWVBFLCBfUEVORElOR10uam9pbihQUk9NSVNFX1RZUEVfREVMSU1JVEVSKVxuXG4gICAgICAgIH0sIGRhdGEgIT09IHVuZGVmaW5lZCA/IHsgcGF5bG9hZDogZGF0YSB9IDoge30sIE1FVEEgIT09IHVuZGVmaW5lZCA/IHsgbWV0YTogTUVUQSB9IDoge30pKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2Vjb25kLCBkaXNwYXRjaCBhIHJlamVjdGVkIG9yIGZ1bGZpbGxlZCBhY3Rpb24gYW5kIG1vdmUgb24gdG8gdGhlXG4gICAgICAgICAqIG5leHQgbWlkZGxld2FyZS5cbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oaGFuZGxlRnVsZmlsbCwgaGFuZGxlUmVqZWN0KTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gaXNQcm9taXNlO1xuZnVuY3Rpb24gaXNQcm9taXNlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSkpID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBjcmVhdGVUaHVua01pZGRsZXdhcmUoZXh0cmFBcmd1bWVudCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSBfcmVmLmRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBhY3Rpb24oZGlzcGF0Y2gsIGdldFN0YXRlLCBleHRyYUFyZ3VtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbnZhciB0aHVuayA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZSgpO1xudGh1bmsud2l0aEV4dHJhQXJndW1lbnQgPSBjcmVhdGVUaHVua01pZGRsZXdhcmU7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHRodW5rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciAkJG9ic2VydmFibGUgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgnc3ltYm9sLW9ic2VydmFibGUnKSk7XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG52YXIgQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyksXG4gIFJFUExBQ0U6ICdAQHJlZHV4L1JFUExBQ0UnICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJylcbn07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2FueX0gb2JqIFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBhcmd1bWVudCBhcHBlYXJzIHRvIGJlIGEgcGxhaW4gb2JqZWN0LlxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICBpZiAoKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9iaikpICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgcHJvdG8gPSBvYmo7XG4gIHdoaWxlIChPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pICE9PSBudWxsKSB7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICpcbiAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAqXG4gKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZW5oYW5jZXJdIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gKlxuICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IGNhbGwgc3RvcmUuZ2V0U3RhdGUoKSB3aGlsZSB0aGUgcmVkdWNlciBpcyBleGVjdXRpbmcuICcgKyAnVGhlIHJlZHVjZXIgaGFzIGFscmVhZHkgcmVjZWl2ZWQgdGhlIHN0YXRlIGFzIGFuIGFyZ3VtZW50LiAnICsgJ1Bhc3MgaXQgZG93biBmcm9tIHRoZSB0b3AgcmVkdWNlciBpbnN0ZWFkIG9mIHJlYWRpbmcgaXQgZnJvbSB0aGUgc3RvcmUuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2hhbmdlIGxpc3RlbmVyLiBJdCB3aWxsIGJlIGNhbGxlZCBhbnkgdGltZSBhbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZCxcbiAgICogYW5kIHNvbWUgcGFydCBvZiB0aGUgc3RhdGUgdHJlZSBtYXkgcG90ZW50aWFsbHkgaGF2ZSBjaGFuZ2VkLiBZb3UgbWF5IHRoZW5cbiAgICogY2FsbCBgZ2V0U3RhdGUoKWAgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGluc2lkZSB0aGUgY2FsbGJhY2suXG4gICAqXG4gICAqIFlvdSBtYXkgY2FsbCBgZGlzcGF0Y2goKWAgZnJvbSBhIGNoYW5nZSBsaXN0ZW5lciwgd2l0aCB0aGUgZm9sbG93aW5nXG4gICAqIGNhdmVhdHM6XG4gICAqXG4gICAqIDEuIFRoZSBzdWJzY3JpcHRpb25zIGFyZSBzbmFwc2hvdHRlZCBqdXN0IGJlZm9yZSBldmVyeSBgZGlzcGF0Y2goKWAgY2FsbC5cbiAgICogSWYgeW91IHN1YnNjcmliZSBvciB1bnN1YnNjcmliZSB3aGlsZSB0aGUgbGlzdGVuZXJzIGFyZSBiZWluZyBpbnZva2VkLCB0aGlzXG4gICAqIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdCBvbiB0aGUgYGRpc3BhdGNoKClgIHRoYXQgaXMgY3VycmVudGx5IGluIHByb2dyZXNzLlxuICAgKiBIb3dldmVyLCB0aGUgbmV4dCBgZGlzcGF0Y2goKWAgY2FsbCwgd2hldGhlciBuZXN0ZWQgb3Igbm90LCB3aWxsIHVzZSBhIG1vcmVcbiAgICogcmVjZW50IHNuYXBzaG90IG9mIHRoZSBzdWJzY3JpcHRpb24gbGlzdC5cbiAgICpcbiAgICogMi4gVGhlIGxpc3RlbmVyIHNob3VsZCBub3QgZXhwZWN0IHRvIHNlZSBhbGwgc3RhdGUgY2hhbmdlcywgYXMgdGhlIHN0YXRlXG4gICAqIG1pZ2h0IGhhdmUgYmVlbiB1cGRhdGVkIG11bHRpcGxlIHRpbWVzIGR1cmluZyBhIG5lc3RlZCBgZGlzcGF0Y2goKWAgYmVmb3JlXG4gICAqIHRoZSBsaXN0ZW5lciBpcyBjYWxsZWQuIEl0IGlzLCBob3dldmVyLCBndWFyYW50ZWVkIHRoYXQgYWxsIHN1YnNjcmliZXJzXG4gICAqIHJlZ2lzdGVyZWQgYmVmb3JlIHRoZSBgZGlzcGF0Y2goKWAgc3RhcnRlZCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSBsYXRlc3RcbiAgICogc3RhdGUgYnkgdGhlIHRpbWUgaXQgZXhpdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIEEgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCBvbiBldmVyeSBkaXNwYXRjaC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGlzIGNoYW5nZSBsaXN0ZW5lci5cbiAgICovXG4gIGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgY2FsbCBzdG9yZS5zdWJzY3JpYmUoKSB3aGlsZSB0aGUgcmVkdWNlciBpcyBleGVjdXRpbmcuICcgKyAnSWYgeW91IHdvdWxkIGxpa2UgdG8gYmUgbm90aWZpZWQgYWZ0ZXIgdGhlIHN0b3JlIGhhcyBiZWVuIHVwZGF0ZWQsIHN1YnNjcmliZSBmcm9tIGEgJyArICdjb21wb25lbnQgYW5kIGludm9rZSBzdG9yZS5nZXRTdGF0ZSgpIGluIHRoZSBjYWxsYmFjayB0byBhY2Nlc3MgdGhlIGxhdGVzdCBzdGF0ZS4gJyArICdTZWUgaHR0cHM6Ly9yZWR1eC5qcy5vcmcvYXBpLXJlZmVyZW5jZS9zdG9yZSNzdWJzY3JpYmUobGlzdGVuZXIpIGZvciBtb3JlIGRldGFpbHMuJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCB1bnN1YnNjcmliZSBmcm9tIGEgc3RvcmUgbGlzdGVuZXIgd2hpbGUgdGhlIHJlZHVjZXIgaXMgZXhlY3V0aW5nLiAnICsgJ1NlZSBodHRwczovL3JlZHV4LmpzLm9yZy9hcGktcmVmZXJlbmNlL3N0b3JlI3N1YnNjcmliZShsaXN0ZW5lcikgZm9yIG1vcmUgZGV0YWlscy4nKTtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICBsaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgdGhlIHJlZHVjZXIgY3VycmVudGx5IHVzZWQgYnkgdGhlIHN0b3JlIHRvIGNhbGN1bGF0ZSB0aGUgc3RhdGUuXG4gICAqXG4gICAqIFlvdSBtaWdodCBuZWVkIHRoaXMgaWYgeW91ciBhcHAgaW1wbGVtZW50cyBjb2RlIHNwbGl0dGluZyBhbmQgeW91IHdhbnQgdG9cbiAgICogbG9hZCBzb21lIG9mIHRoZSByZWR1Y2VycyBkeW5hbWljYWxseS4gWW91IG1pZ2h0IGFsc28gbmVlZCB0aGlzIGlmIHlvdVxuICAgKiBpbXBsZW1lbnQgYSBob3QgcmVsb2FkaW5nIG1lY2hhbmlzbSBmb3IgUmVkdXguXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5leHRSZWR1Y2VyIFRoZSByZWR1Y2VyIGZvciB0aGUgc3RvcmUgdG8gdXNlIGluc3RlYWQuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVwbGFjZVJlZHVjZXIobmV4dFJlZHVjZXIpIHtcbiAgICBpZiAodHlwZW9mIG5leHRSZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBuZXh0UmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGN1cnJlbnRSZWR1Y2VyID0gbmV4dFJlZHVjZXI7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5SRVBMQUNFIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEludGVyb3BlcmFiaWxpdHkgcG9pbnQgZm9yIG9ic2VydmFibGUvcmVhY3RpdmUgbGlicmFyaWVzLlxuICAgKiBAcmV0dXJucyB7b2JzZXJ2YWJsZX0gQSBtaW5pbWFsIG9ic2VydmFibGUgb2Ygc3RhdGUgY2hhbmdlcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24sIHNlZSB0aGUgb2JzZXJ2YWJsZSBwcm9wb3NhbDpcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JzZXJ2YWJsZVxuICAgKi9cbiAgZnVuY3Rpb24gb2JzZXJ2YWJsZSgpIHtcbiAgICB2YXIgX3JlZjtcblxuICAgIHZhciBvdXRlclN1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICByZXR1cm4gX3JlZiA9IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIG1pbmltYWwgb2JzZXJ2YWJsZSBzdWJzY3JpcHRpb24gbWV0aG9kLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ic2VydmVyIEFueSBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCBhcyBhbiBvYnNlcnZlci5cbiAgICAgICAqIFRoZSBvYnNlcnZlciBvYmplY3Qgc2hvdWxkIGhhdmUgYSBgbmV4dGAgbWV0aG9kLlxuICAgICAgICogQHJldHVybnMge3N1YnNjcmlwdGlvbn0gQW4gb2JqZWN0IHdpdGggYW4gYHVuc3Vic2NyaWJlYCBtZXRob2QgdGhhdCBjYW5cbiAgICAgICAqIGJlIHVzZWQgdG8gdW5zdWJzY3JpYmUgdGhlIG9ic2VydmFibGUgZnJvbSB0aGUgc3RvcmUsIGFuZCBwcmV2ZW50IGZ1cnRoZXJcbiAgICAgICAqIGVtaXNzaW9uIG9mIHZhbHVlcyBmcm9tIHRoZSBvYnNlcnZhYmxlLlxuICAgICAgICovXG4gICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYnNlcnZlciA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JzZXJ2ZXIpKSAhPT0gJ29iamVjdCcgfHwgb2JzZXJ2ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGdldFN0YXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVTdGF0ZSgpO1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUgfTtcbiAgICAgIH1cbiAgICB9LCBfcmVmWyQkb2JzZXJ2YWJsZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9XG5cbiAgLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG4gIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbJCRvYnNlcnZhYmxlXSA9IG9ic2VydmFibGUsIF9yZWYyO1xufVxuXG4vKipcbiAqIFByaW50cyBhIHdhcm5pbmcgaW4gdGhlIGNvbnNvbGUgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCBpZiB5b3UgZW5hYmxlXG4gICAgLy8gXCJicmVhayBvbiBhbGwgZXhjZXB0aW9uc1wiIGluIHlvdXIgY29uc29sZSxcbiAgICAvLyBpdCB3b3VsZCBwYXVzZSB0aGUgZXhlY3V0aW9uIGF0IHRoaXMgbGluZS5cbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcbn1cblxuZnVuY3Rpb24gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG4gIHZhciBhY3Rpb25EZXNjcmlwdGlvbiA9IGFjdGlvblR5cGUgJiYgJ2FjdGlvbiBcIicgKyBTdHJpbmcoYWN0aW9uVHlwZSkgKyAnXCInIHx8ICdhbiBhY3Rpb24nO1xuXG4gIHJldHVybiAnR2l2ZW4gJyArIGFjdGlvbkRlc2NyaXB0aW9uICsgJywgcmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkLiAnICsgJ1RvIGlnbm9yZSBhbiBhY3Rpb24sIHlvdSBtdXN0IGV4cGxpY2l0bHkgcmV0dXJuIHRoZSBwcmV2aW91cyBzdGF0ZS4gJyArICdJZiB5b3Ugd2FudCB0aGlzIHJlZHVjZXIgdG8gaG9sZCBubyB2YWx1ZSwgeW91IGNhbiByZXR1cm4gbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nO1xufVxuXG5mdW5jdGlvbiBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKGlucHV0U3RhdGUsIHJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSkge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBhcmd1bWVudE5hbWUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGUgPT09IEFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoIWlzUGxhaW5PYmplY3QoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gQWN0aW9uVHlwZXMuUkVQTEFDRSkgcmV0dXJuO1xuXG4gIGlmICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuICdVbmV4cGVjdGVkICcgKyAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMSA/ICdrZXlzJyA6ICdrZXknKSArICcgJyArICgnXCInICsgdW5leHBlY3RlZEtleXMuam9pbignXCIsIFwiJykgKyAnXCIgZm91bmQgaW4gJyArIGFyZ3VtZW50TmFtZSArICcuICcpICsgJ0V4cGVjdGVkIHRvIGZpbmQgb25lIG9mIHRoZSBrbm93biByZWR1Y2VyIGtleXMgaW5zdGVhZDogJyArICgnXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCIuIFVuZXhwZWN0ZWQga2V5cyB3aWxsIGJlIGlnbm9yZWQuJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0UmVkdWNlclNoYXBlKHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gJyArICdJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgJyArICdleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5ICcgKyAnbm90IGJlIHVuZGVmaW5lZC4gSWYgeW91IGRvblxcJ3Qgd2FudCB0byBzZXQgYSB2YWx1ZSBmb3IgdGhpcyByZWR1Y2VyLCAnICsgJ3lvdSBjYW4gdXNlIG51bGwgaW5zdGVhZCBvZiB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIEFjdGlvblR5cGVzLklOSVQgKyAnIG9yIG90aGVyIGFjdGlvbnMgaW4gXCJyZWR1eC8qXCIgJykgKyAnbmFtZXNwYWNlLiBUaGV5IGFyZSBjb25zaWRlcmVkIHByaXZhdGUuIEluc3RlYWQsIHlvdSBtdXN0IHJldHVybiB0aGUgJyArICdjdXJyZW50IHN0YXRlIGZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB1bmxlc3MgaXQgaXMgdW5kZWZpbmVkLCAnICsgJ2luIHdoaWNoIGNhc2UgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLCByZWdhcmRsZXNzIG9mIHRoZSAnICsgJ2FjdGlvbiB0eXBlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGJlIHVuZGVmaW5lZCwgYnV0IGNhbiBiZSBudWxsLicpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgZGlmZmVyZW50IHJlZHVjZXIgZnVuY3Rpb25zLCBpbnRvIGEgc2luZ2xlXG4gKiByZWR1Y2VyIGZ1bmN0aW9uLiBJdCB3aWxsIGNhbGwgZXZlcnkgY2hpbGQgcmVkdWNlciwgYW5kIGdhdGhlciB0aGVpciByZXN1bHRzXG4gKiBpbnRvIGEgc2luZ2xlIHN0YXRlIG9iamVjdCwgd2hvc2Uga2V5cyBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIG9mIHRoZSBwYXNzZWRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWR1Y2VycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGNvcnJlc3BvbmQgdG8gZGlmZmVyZW50XG4gKiByZWR1Y2VyIGZ1bmN0aW9ucyB0aGF0IG5lZWQgdG8gYmUgY29tYmluZWQgaW50byBvbmUuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluXG4gKiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhcyByZWR1Y2Vyc2Agc3ludGF4LiBUaGUgcmVkdWNlcnMgbWF5IG5ldmVyIHJldHVyblxuICogdW5kZWZpbmVkIGZvciBhbnkgYWN0aW9uLiBJbnN0ZWFkLCB0aGV5IHNob3VsZCByZXR1cm4gdGhlaXIgaW5pdGlhbCBzdGF0ZVxuICogaWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGVtIHdhcyB1bmRlZmluZWQsIGFuZCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgYW55XG4gKiB1bnJlY29nbml6ZWQgYWN0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSByZWR1Y2VyIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBldmVyeSByZWR1Y2VyIGluc2lkZSB0aGVcbiAqIHBhc3NlZCBvYmplY3QsIGFuZCBidWlsZHMgYSBzdGF0ZSBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZS5cbiAqL1xuZnVuY3Rpb24gY29tYmluZVJlZHVjZXJzKHJlZHVjZXJzKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGZpbmFsUmVkdWNlcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWR1Y2VyS2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSByZWR1Y2VyS2V5c1tpXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdhcm5pbmcoJ05vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZpbmFsUmVkdWNlcnNba2V5XSA9IHJlZHVjZXJzW2tleV07XG4gICAgfVxuICB9XG4gIHZhciBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgdmFyIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHZvaWQgMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB1bmV4cGVjdGVkS2V5Q2FjaGUgPSB7fTtcbiAgfVxuXG4gIHZhciBzaGFwZUFzc2VydGlvbkVycm9yID0gdm9pZCAwO1xuICB0cnkge1xuICAgIGFzc2VydFJlZHVjZXJTaGFwZShmaW5hbFJlZHVjZXJzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSBlO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNvbWJpbmF0aW9uKCkge1xuICAgIHZhciBzdGF0ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmIChzaGFwZUFzc2VydGlvbkVycm9yKSB7XG4gICAgICB0aHJvdyBzaGFwZUFzc2VydGlvbkVycm9yO1xuICAgIH1cblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgd2FybmluZyh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2tleSA9IGZpbmFsUmVkdWNlcktleXNbX2ldO1xuICAgICAgdmFyIHJlZHVjZXIgPSBmaW5hbFJlZHVjZXJzW19rZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtfa2V5XTtcbiAgICAgIHZhciBuZXh0U3RhdGVGb3JLZXkgPSByZWR1Y2VyKHByZXZpb3VzU3RhdGVGb3JLZXksIGFjdGlvbik7XG4gICAgICBpZiAodHlwZW9mIG5leHRTdGF0ZUZvcktleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKF9rZXksIGFjdGlvbik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgbmV4dFN0YXRlW19rZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufVxuXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkaXNwYXRjaChhY3Rpb25DcmVhdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCkge1xuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG4gIH1cblxuICBpZiAoKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYWN0aW9uQ3JlYXRvcnMpKSAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhY3Rpb25DcmVhdG9ycykpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59XG5cbi8qKlxuICogQ29tcG9zZXMgc2luZ2xlLWFyZ3VtZW50IGZ1bmN0aW9ucyBmcm9tIHJpZ2h0IHRvIGxlZnQuIFRoZSByaWdodG1vc3RcbiAqIGZ1bmN0aW9uIGNhbiB0YWtlIG11bHRpcGxlIGFyZ3VtZW50cyBhcyBpdCBwcm92aWRlcyB0aGUgc2lnbmF0dXJlIGZvclxuICogdGhlIHJlc3VsdGluZyBjb21wb3NpdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3MgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIG9idGFpbmVkIGJ5IGNvbXBvc2luZyB0aGUgYXJndW1lbnQgZnVuY3Rpb25zXG4gKiBmcm9tIHJpZ2h0IHRvIGxlZnQuIEZvciBleGFtcGxlLCBjb21wb3NlKGYsIGcsIGgpIGlzIGlkZW50aWNhbCB0byBkb2luZ1xuICogKC4uLmFyZ3MpID0+IGYoZyhoKC4uLmFyZ3MpKSkuXG4gKi9cblxuZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGZ1bmNzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgZnVuY3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgIHJldHVybiBhcmc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZnVuY3NbMF07XG4gIH1cblxuICByZXR1cm4gZnVuY3MucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhKGIuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RvcmUgZW5oYW5jZXIgdGhhdCBhcHBsaWVzIG1pZGRsZXdhcmUgdG8gdGhlIGRpc3BhdGNoIG1ldGhvZFxuICogb2YgdGhlIFJlZHV4IHN0b3JlLiBUaGlzIGlzIGhhbmR5IGZvciBhIHZhcmlldHkgb2YgdGFza3MsIHN1Y2ggYXMgZXhwcmVzc2luZ1xuICogYXN5bmNocm9ub3VzIGFjdGlvbnMgaW4gYSBjb25jaXNlIG1hbm5lciwgb3IgbG9nZ2luZyBldmVyeSBhY3Rpb24gcGF5bG9hZC5cbiAqXG4gKiBTZWUgYHJlZHV4LXRodW5rYCBwYWNrYWdlIGFzIGFuIGV4YW1wbGUgb2YgdGhlIFJlZHV4IG1pZGRsZXdhcmUuXG4gKlxuICogQmVjYXVzZSBtaWRkbGV3YXJlIGlzIHBvdGVudGlhbGx5IGFzeW5jaHJvbm91cywgdGhpcyBzaG91bGQgYmUgdGhlIGZpcnN0XG4gKiBzdG9yZSBlbmhhbmNlciBpbiB0aGUgY29tcG9zaXRpb24gY2hhaW4uXG4gKlxuICogTm90ZSB0aGF0IGVhY2ggbWlkZGxld2FyZSB3aWxsIGJlIGdpdmVuIHRoZSBgZGlzcGF0Y2hgIGFuZCBgZ2V0U3RhdGVgIGZ1bmN0aW9uc1xuICogYXMgbmFtZWQgYXJndW1lbnRzLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IG1pZGRsZXdhcmVzIFRoZSBtaWRkbGV3YXJlIGNoYWluIHRvIGJlIGFwcGxpZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RvcmUgZW5oYW5jZXIgYXBwbHlpbmcgdGhlIG1pZGRsZXdhcmUuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZSgpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1pZGRsZXdhcmVzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgbWlkZGxld2FyZXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGNyZWF0ZVN0b3JlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaXNwYXRjaGluZyB3aGlsZSBjb25zdHJ1Y3RpbmcgeW91ciBtaWRkbGV3YXJlIGlzIG5vdCBhbGxvd2VkLiAnICsgJ090aGVyIG1pZGRsZXdhcmUgd291bGQgbm90IGJlIGFwcGxpZWQgdG8gdGhpcyBkaXNwYXRjaC4nKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHZhciBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gY29tcG9zZS5hcHBseSh1bmRlZmluZWQsIGNoYWluKShzdG9yZS5kaXNwYXRjaCk7XG5cbiAgICAgIHJldHVybiBfZXh0ZW5kcyh7fSwgc3RvcmUsIHtcbiAgICAgICAgZGlzcGF0Y2g6IF9kaXNwYXRjaFxuICAgICAgfSk7XG4gICAgfTtcbiAgfTtcbn1cblxuLypcbiAqIFRoaXMgaXMgYSBkdW1teSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgZnVuY3Rpb24gbmFtZSBoYXMgYmVlbiBhbHRlcmVkIGJ5IG1pbmlmaWNhdGlvbi5cbiAqIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiAqL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgd2FybmluZyhcIllvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLiBcIiArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnRzLmNyZWF0ZVN0b3JlID0gY3JlYXRlU3RvcmU7XG5leHBvcnRzLmNvbWJpbmVSZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2VycztcbmV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gYmluZEFjdGlvbkNyZWF0b3JzO1xuZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmU7XG5leHBvcnRzLmNvbXBvc2UgPSBjb21wb3NlO1xuZXhwb3J0cy5fX0RPX05PVF9VU0VfX0FjdGlvblR5cGVzID0gQWN0aW9uVHlwZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcG9ueWZpbGwgPSByZXF1aXJlKCcuL3BvbnlmaWxsLmpzJyk7XG5cbnZhciBfcG9ueWZpbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9ueWZpbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciByb290OyAvKiBnbG9iYWwgd2luZG93ICovXG5cblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gKDAsIF9wb255ZmlsbDJbJ2RlZmF1bHQnXSkocm9vdCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSByZXN1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsO1xuZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIF9TeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIF9TeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoX1N5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdF9TeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgTWF0Y2hlcyBmcm9tICcuL1ByZWFjdENsYXNzZXMvTWF0Y2hlcyc7XG5cbmNsYXNzIExlYWd1ZU1hdGNoZXNBcHAge1xuXHRjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHR0aGlzLmJpbmRFdmVudHMoKTtcblx0fVxuXG5cdGJpbmRFdmVudHMoKSB7XG5cdFx0cmVuZGVyKDxNYXRjaGVzIC8+LCB0aGlzLmVsZW1lbnQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExlYWd1ZU1hdGNoZXNBcHA7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IE1haW5MZWFndWVBcHAgZnJvbSAnLi9QcmVhY3RDbGFzc2VzL01haW5MZWFndWVBcHAnO1xuXG5jbGFzcyBMZWFndWVSZWFjdEFwcCB7XG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuYmluZEV2ZW50cygpO1xuXHR9XG5cblx0YmluZEV2ZW50cygpIHtcblx0XHRjb25zb2xlLmxvZygncmVuZGVyaW5nJyk7XG5cdFx0cmVuZGVyKDxNYWluTGVhZ3VlQXBwIC8+LCB0aGlzLmVsZW1lbnQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExlYWd1ZVJlYWN0QXBwOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBNYXRjaFVwIGZyb20gJy4vTWF0Y2hVcC9pbmRleC5qcyc7XG5pbXBvcnQgQ2hhbXBzIGZyb20gJy4vQ2hhbXBzL2luZGV4LmpzJztcblxuY2xhc3MgQXBwTWFpbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Z2V0U3BlY2lmaWNBcHAoKSB7XG5cdFx0c3dpdGNoKHRoaXMucHJvcHMuYXBwVHlwZSkge1xuXHRcdFx0Y2FzZSAnbWF0Y2hVcCc6XG5cdFx0XHRcdHJldHVybiA8TWF0Y2hVcCBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPjtcblxuXHRcdFx0Y2FzZSAnY2hhbXBzJzpcblx0XHRcdFx0cmV0dXJuIDxDaGFtcHMgLz47XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFNwZWNpZmljQXBwKCk7XG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBcHBNYWluOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBtaW5QbGF5ZWQ6IHN0b3JlLnN0YXRzLm1pblBsYXllZFxuICAgIH1cbn0pXG5jbGFzcyBQYXRjaGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2hhbmdlKGUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX01JTlBMQVlFRCcsXG4gICAgICAgICAgICBtaW5QbGF5ZWQ6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICB9KVxuICAgIH1cbiAgICBcblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5wcm9wcy5taW5QbGF5ZWR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiTWluIEdhbWVzIFBsYXllZFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXRjaGVzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVQYXRjaGVzOiBzdG9yZS5zdGF0cy5hY3RpdmVQYXRjaGVzXG4gICAgfVxufSlcbmNsYXNzIFBhdGNoZXMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnNldERlZmF1bHRQYXRjaGVzKCk7XG5cdH1cblxuICAgIHNldERlZmF1bHRQYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdTRVRfQUxMX1BBVENIRVMnLFxuICAgICAgICAgICAgcGF0Y2hlczogdGhpcy5wcm9wcy5wYXRjaGVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzUGF0Y2hBY3RpdmUocGF0Y2gpIHtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5hY3RpdmVQYXRjaGVzICYmIHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlcy5pbmNsdWRlcyhwYXRjaCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hlY2tlZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHRvZ2dsZVBhdGNoKHBhdGNoKSB7XG4gICAgICAgIGxldCBhY3RpdmVQYXRjaGVzID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5wcm9wcy5hY3RpdmVQYXRjaGVzKTtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5hY3RpdmVQYXRjaGVzLmluY2x1ZGVzKHBhdGNoKSkge1xuICAgICAgICAgICAgYWN0aXZlUGF0Y2hlcyA9IGFjdGl2ZVBhdGNoZXMuZmlsdGVyKGFjdGl2ZVBhdGNoID0+IGFjdGl2ZVBhdGNoICE9PSBwYXRjaClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZVBhdGNoZXMucHVzaChwYXRjaCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9QQVRDSEVTJyxcbiAgICAgICAgICAgIHBhdGNoZXM6IGFjdGl2ZVBhdGNoZXNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXJQYXRjaGVzKCkge1xuICAgICAgICBsZXQgcGF0Y2hlcyA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKHRoaXMucHJvcHMucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcGF0Y2hlcy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X19pbnB1dC1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG9uQ2hhbmdlPXsoKSA9PiB7IHRoaXMudG9nZ2xlUGF0Y2gocGF0Y2gpfX0gY2hlY2tlZD17dGhpcy5pc1BhdGNoQWN0aXZlKHBhdGNoKX0gaWQ9e2BwYXRjaC0ke3BhdGNofWB9IHR5cGU9XCJjaGVja2JveFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9e2BwYXRjaC0ke3BhdGNofWB9PntwYXRjaH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBhdGNoZXM7XG4gICAgfVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJQYXRjaGVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQYXRjaGVzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb25zOiBzdG9yZS5zdGF0cy5hY3RpdmVSZWdpb25zXG4gICAgfVxufSlcbmNsYXNzIFJlZ2lvbnMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnNldERlZmF1bHRSZWdpb25zKCk7XG5cdH1cblxuICAgIHNldERlZmF1bHRSZWdpb25zKCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdTRVRfQUxMX1JFR0lPTlMnLFxuICAgICAgICAgICAgcmVnaW9uczogdGhpcy5wcm9wcy5yZWdpb25zXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaXNSZWdpb25BY3RpdmUocmVnaW9uKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlUmVnaW9ucyAmJiB0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMuaW5jbHVkZXMocmVnaW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuICdjaGVja2VkJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdG9nZ2xlUmVnaW9uKHJlZ2lvbikge1xuICAgICAgICBsZXQgYWN0aXZlUmVnaW9ucyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMucHJvcHMuYWN0aXZlUmVnaW9ucyk7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlUmVnaW9ucy5pbmNsdWRlcyhyZWdpb24pKSB7XG4gICAgICAgICAgICBhY3RpdmVSZWdpb25zID0gYWN0aXZlUmVnaW9ucy5maWx0ZXIoYWN0aXZlUmVnaW9uID0+IGFjdGl2ZVJlZ2lvbiAhPT0gcmVnaW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlUmVnaW9ucy5wdXNoKHJlZ2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9SRUdJT05TJyxcbiAgICAgICAgICAgIHJlZ2lvbnM6IGFjdGl2ZVJlZ2lvbnNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZW5kZXJSZWdpb25zKCkge1xuICAgICAgICBsZXQgcmVnaW9ucyA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKHRoaXMucHJvcHMucmVnaW9ucywgcmVnaW9uID0+IHtcbiAgICAgICAgICAgIHJlZ2lvbnMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9faW5wdXQtaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNoYW5nZT17KCkgPT4geyB0aGlzLnRvZ2dsZVJlZ2lvbihyZWdpb24pfX0gY2hlY2tlZD17dGhpcy5pc1JlZ2lvbkFjdGl2ZShyZWdpb24pfSBpZD17YHJlZ2lvbi0ke3JlZ2lvbn1gfSB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPXtgcmVnaW9uLSR7cmVnaW9ufWB9PntyZWdpb259PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZWdpb25zO1xuICAgIH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUmVnaW9ucygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUmVnaW9uczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IFN0YXRzIGZyb20gJy4vbWV0aG9kcy9TdGF0cyc7XG5pbXBvcnQgeyBpZFRvQ2hhbXAgfSBmcm9tICcuL21ldGhvZHMvQ2hhbXBGdW5jcyc7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXRzOiBzdG9yZS5zdGF0cy5zdGF0cyxcbiAgICAgICAgYWN0aXZlUmVnaW9uczogc3RvcmUuc3RhdHMuYWN0aXZlUmVnaW9ucyxcbiAgICAgICAgYWN0aXZlUGF0Y2hlczogc3RvcmUuc3RhdHMuYWN0aXZlUGF0Y2hlcyxcbiAgICAgICAgYWN0aXZlVmFyaWFibGVzOiBzdG9yZS5zdGF0cy5hY3RpdmVWYXJpYWJsZXMsXG4gICAgICAgIG1pblBsYXllZDogc3RvcmUuc3RhdHMubWluUGxheWVkXG4gICAgfVxufSlcbmNsYXNzIFN0YXRzQmxvY2sgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGFjdGl2ZVJlZ2lvbnM6IHRoaXMucHJvcHMuYWN0aXZlUmVnaW9ucyxcbiAgICAgICAgICAgIGFjdGl2ZVBhdGNoZXM6IHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlc1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGF0c0NsYXNzID0gbmV3IFN0YXRzKHRoaXMucHJvcHMuc3RhdHMpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVN0YXRzKCk7XG5cdH1cblxuICAgIGNhbGN1bGF0ZVN0YXRzKCkge1xuICAgICAgICB0aGlzLnN0YXRzQ2xhc3Muc2V0U3RhdGVzKHRoaXMuc3RhdGUuYWN0aXZlUmVnaW9ucywgdGhpcy5zdGF0ZS5hY3RpdmVQYXRjaGVzKTtcbiAgICAgICAgdGhpcy5zdGF0c0NsYXNzLmNhbGN1bGF0ZSgpO1xuICAgIH1cblxuICAgIGdldFBlcmNlbnRhZ2UoYSwgYikge1xuICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gKGEgLyBiKSAqIDEwMDtcbiAgICAgICAgcmV0dXJuIGAke01hdGguZmxvb3IocGVyY2VudGFnZSl9JWA7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlQ29sdW1uKHZhcmlhYmxlKSB7XG4gICAgICAgIHRoaXMuc3RhdHNDbGFzcy5zZXRPcmRlcih2YXJpYWJsZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2hhbXBRdWVyeSgpO1xuICAgIH1cblxuICAgIGNoZWNrRmlyc3RDaGFtcHMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuY2hhbXBzKTtcbiAgICAgICAgaWYoIXRoaXMuc3RhdGUuY2hhbXBzICYmIHRoaXMuc3RhdHNDbGFzcykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFtcFF1ZXJ5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDaGFtcFF1ZXJ5KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNoYW1wczogdGhpcy5zdGF0c0NsYXNzLmdldENoYW1wcygpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzQ29sdW1uQWN0aXZlKHZhcmlhYmxlKSB7XG4gICAgICAgIGlmKHRoaXMuc3RhdHNDbGFzcyAmJiB2YXJpYWJsZS5zdGF0TmFtZSA9PT0gdGhpcy5zdGF0c0NsYXNzLmdldE9yZGVyVmFyaWFibGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlckNoYW1wQ29sdW1ucygpIHtcbiAgICAgICAgbGV0IGNvbHVtbnMgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3BzLmFjdGl2ZVZhcmlhYmxlcywgdmFyaWFibGUgPT4ge1xuICAgICAgICAgICAgY29sdW1ucy5wdXNoKDx0aCBjbGFzc05hbWU9e3RoaXMuaXNDb2x1bW5BY3RpdmUodmFyaWFibGUpID8gJ2lzLWFjdGl2ZScgOiAnJ30gb25DbGljaz17KCkgPT4gdGhpcy5zZXRBY3RpdmVDb2x1bW4odmFyaWFibGUpfT57dmFyaWFibGUuZnJpZW5kbHlOYW1lfTwvdGg+KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29sdW1ucztcbiAgICB9XG5cbiAgICByZW5kZXJDaGFtcENlbGxzKGNoYW1wKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXIgbmV3Jyk7XG4gICAgICAgIGxldCBjZWxscyA9IFtdO1xuXG4gICAgICAgIEFycmF5LmZyb20odGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMsIHZhcmlhYmxlID0+IHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gJyc7XG4gICAgICAgICAgICBpZih2YXJpYWJsZS50eXBlID09PSAncGVyY2VudCcpIHtcbiAgICAgICAgICAgICAgICBjZWxsID0gPHRkPnt0aGlzLmdldFBlcmNlbnRhZ2UoY2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdLCBjaGFtcC5wbGF5ZWQpfTwvdGQ+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2YXJpYWJsZS50eXBlID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgY2VsbCA9IDx0ZD57Y2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdfTwvdGQ+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWxscy5wdXNoKGNlbGwpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgfVxuXG4gICAgcmVuZGVyZmlyc3RDaGFtcHMoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tGaXJzdENoYW1wcygpO1xuICAgICAgICBpZih0aGlzLnN0YXRlLmNoYW1wcykge1xuICAgICAgICAgICAgbGV0IGZpcnN0QXJyYXkgPSBbXTtcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5zdGF0ZS5jaGFtcHMsIGNoYW1wID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnByb3BzLm1pblBsYXllZCAmJiB0aGlzLnByb3BzLm1pblBsYXllZCA+IGNoYW1wLnBsYXllZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGZpcnN0QXJyYXkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpZFRvQ2hhbXAoY2hhbXAuaWQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGFtcENlbGxzKGNoYW1wKX1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0QXJyYXk7XG4gICAgICAgIH1cbiAgICB9XG5cblx0cmVuZGVyKCkge1xuICAgICAgICBjb25zdCBjaGFtcENvbHVtbiA9IHt0eXBlIDogJ2FscGhhYmV0aWNhbGx5JywgZGVmYXVsdE9yZGVyIDogJ2FzYycsIHN0YXROYW1lIDogJ2FscGhhYmV0aWNhbGx5J31cblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZV9faG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPXt0aGlzLmlzQ29sdW1uQWN0aXZlKGNoYW1wQ29sdW1uKSA/ICdpcy1hY3RpdmUnIDogJyd9IG9uQ2xpY2s9eygpID0+IHRoaXMuc2V0QWN0aXZlQ29sdW1uKGNoYW1wQ29sdW1uKX0+Q2hhbXA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoYW1wQ29sdW1ucygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlcmZpcnN0Q2hhbXBzKCl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBpZih0aGlzLnN0YXRlLmFjdGl2ZVBhdGNoZXMgIT09IG5ld1Byb3BzLmFjdGl2ZVBhdGNoZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGFjdGl2ZVBhdGNoZXM6IG5ld1Byb3BzLmFjdGl2ZVBhdGNoZXNcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuc3RhdGUuYWN0aXZlUmVnaW9ucyAhPT0gbmV3UHJvcHMuYWN0aXZlUmVnaW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYWN0aXZlUmVnaW9uczogbmV3UHJvcHMuYWN0aXZlUmVnaW9uc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlU3RhdHMoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhbXBRdWVyeSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzQmxvY2s7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBGaWx0ZXJzIGZyb20gJy4vbWV0aG9kcy9GaWx0ZXJzJztcblxuaW1wb3J0IFBhdGNoZXMgZnJvbSAnLi9QYXRjaGVzJztcbmltcG9ydCBSZWdpb25zIGZyb20gJy4vUmVnaW9ucyc7XG5pbXBvcnQgVmFyaWFibGVzIGZyb20gJy4vVmFyaWFibGVzJztcbmltcG9ydCBNaW5QbGF5ZWQgZnJvbSAnLi9NaW5QbGF5ZWQnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0czogc3RvcmUuc3RhdHMuc3RhdHMsXG4gICAgICAgIGxvYWRpbmc6IHN0b3JlLnN0YXRzLmxvYWRpbmcsXG4gICAgfVxufSlcbmNsYXNzIFRvcE5hdiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJzID0gbmV3IEZpbHRlcnModGhpcy5wcm9wcy5zdGF0cyk7XG5cbiAgICAgICAgdGhpcy5yZWdpb25zID0gdGhpcy5maWx0ZXJzLmdldFJlZ2lvbnMoKTtcbiAgICAgICAgdGhpcy5wYXRjaGVzID0gdGhpcy5maWx0ZXJzLmdldFBhdGNoZXMoKTtcbiAgICAgICAgdGhpcy52YXJpYWJsZXMgPSB0aGlzLmZpbHRlcnMuZ2V0VmFyaWFibGVzKCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X19ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X190aXRsZVwiPlBhdGNoZXM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQYXRjaGVzIHBhdGNoZXM9e3RoaXMucGF0Y2hlc30vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX2Ryb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fdGl0bGVcIj5SZWdpb25zPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UmVnaW9ucyByZWdpb25zPXt0aGlzLnJlZ2lvbnN9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X19kcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX3RpdGxlXCI+VmFyaWFibGVzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VmFyaWFibGVzIHZhcmlhYmxlcz17dGhpcy52YXJpYWJsZXN9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X19kcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX3RpdGxlXCI+TWluIFBsYXllZDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1pblBsYXllZCAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBUb3BOYXY7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFjdGl2ZVZhcmlhYmxlczogc3RvcmUuc3RhdHMuYWN0aXZlVmFyaWFibGVzXG4gICAgfVxufSlcbmNsYXNzIFZhcmlhYmxlcyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdFZhcmlhYmxlcygpO1xuXHR9XG5cbiAgICBzZXREZWZhdWx0VmFyaWFibGVzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdTRVRfQUxMX1ZBUklBQkxFUycsXG4gICAgICAgICAgICB2YXJpYWJsZXM6IHRoaXMucHJvcHMudmFyaWFibGVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzVmFyaWFibGVBY3RpdmUodmFyaWFibGUpIHtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMgJiYgdGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMuaW5jbHVkZXModmFyaWFibGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrZWQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB0b2dnbGVWYXJpYWJsZSh2YXJpYWJsZSkge1xuICAgICAgICBsZXQgYWN0aXZlVmFyaWFibGVzID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMpO1xuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZVZhcmlhYmxlcy5pbmNsdWRlcyh2YXJpYWJsZSkpIHtcbiAgICAgICAgICAgIGFjdGl2ZVZhcmlhYmxlcyA9IGFjdGl2ZVZhcmlhYmxlcy5maWx0ZXIoYWN0aXZlVmFyaWFibGUgPT4gYWN0aXZlVmFyaWFibGUgIT09IHZhcmlhYmxlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlVmFyaWFibGVzLnB1c2godmFyaWFibGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9BTExfVkFSSUFCTEVTJyxcbiAgICAgICAgICAgIHZhcmlhYmxlczogYWN0aXZlVmFyaWFibGVzXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyVmFyaWFibGVzKCkge1xuICAgICAgICBsZXQgdmFyaWFibGVzID0gW107XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5wcm9wcy52YXJpYWJsZXMsIHZhcmlhYmxlID0+IHtcbiAgICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X19pbnB1dC1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG9uQ2hhbmdlPXsoKSA9PiB7IHRoaXMudG9nZ2xlVmFyaWFibGUodmFyaWFibGUpfX0gY2hlY2tlZD17dGhpcy5pc1ZhcmlhYmxlQWN0aXZlKHZhcmlhYmxlKX0gaWQ9e2B2YXJpYWJsZS0ke3ZhcmlhYmxlLmZyaWVuZGx5TmFtZX1gfSB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPXtgdmFyaWFibGUtJHt2YXJpYWJsZS5mcmllbmRseU5hbWV9YH0+e3ZhcmlhYmxlLmZyaWVuZGx5TmFtZX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZhcmlhYmxlcztcbiAgICB9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZhcmlhYmxlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVmFyaWFibGVzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgU3RhdHNCbG9jayBmcm9tICcuL1N0YXRzQmxvY2snO1xuaW1wb3J0IFRvcE5hdiBmcm9tICcuL1RvcE5hdic7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXRzOiBzdG9yZS5zdGF0cy5zdGF0cyxcbiAgICAgICAgbG9hZGluZzogc3RvcmUuc3RhdHMubG9hZGluZyxcbiAgICB9XG59KVxuY2xhc3MgQ2hhbXBzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0XHR0aGlzLnJlZ2lvbnMgPSBbJ05BTENTJywgJ0VVTENTJywgJ0NCTE9MJywgJ0xDSycsICdMTVMnLCAnVENMJywgJ09QTCddXG5cdFx0aWYoIXRoaXMucHJvcHMuc3RhdHMpIHtcblx0XHRcdHRoaXMuZmV0Y2hTdGF0cygpO1xuXHRcdH1cblx0fVxuXG5cdGZldGNoU3RhdHMoKSB7XG5cdFx0QXJyYXkuZnJvbSh0aGlzLnJlZ2lvbnMsIHJlZ2lvbiA9PiB7XG5cdFx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHtcblx0XHRcdFx0dHlwZTogJ0ZFVENIX1NUQVRTJyxcblx0XHRcdFx0cGF5bG9hZDogZmV0Y2goYC9hcGkvJHtyZWdpb259L2Z1bGwuanNvbmApLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKSxcblx0XHRcdFx0bWV0YTogcmVnaW9uXG5cdFx0XHR9KTtcblx0XHR9KVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdGlmKHRoaXMucHJvcHMubG9hZGluZyB8fCAhdGhpcy5wcm9wcy5zdGF0cykge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5sb2FkaW5nPC9kaXY+XG5cdFx0XHQpXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PFRvcE5hdiAvPlxuXHRcdFx0XHRcdDxTdGF0c0Jsb2NrIC8+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENoYW1wczsiLCJleHBvcnQgZnVuY3Rpb24gaWRUb0NoYW1wKGlkKSB7XG4gICAgY29uc3QgY2hhbXBkaWN0ID0geycxNDUnIDogJ0thaVNhJywgJzU1NScgOiAnUHlrZScsICc3Nyc6ICdVZHlyJywgJzQyNyc6ICdJdmVybicsICc4NSc6ICdLZW5uZW4nLCAnMTgnOiAnVHJpc3RhbmEnLCAnNzgnOiAnUG9wcHknLCAnOSc6ICdGaWRkbGVzdGlja3MnLCAnMjY3JzogJ05hbWknLCAnMTUnOiAnU2l2aXInLCAnMTknOiAnV2Fyd2ljaycsICc1NCc6ICdNYWxwaGl0ZScsICcxNjQnOiAnQ2FtaWxsZScsICcxNCc6ICdTaW9uJywgJzYnOiAnVXJnb3QnLCAnNjEnOiAnT3JpYW5uYScsICc0NSc6ICdWZWlnYXInLCAnNDQnOiAnVGFyaWMnLCAnNjAnOiAnRWxpc2UnLCAnMjAnOiAnTnVudScsICcxMDYnOiAnVm9saWJlYXInLCAnMTEwJzogJ1ZhcnVzJywgJzYyJzogJ01vbmtleUtpbmcnLCAnMTYxJzogJ1ZlbGtveicsICc0MjknOiAnS2FsaXN0YScsICcyNyc6ICdTaW5nZWQnLCAnNDk4JzogJ1hheWFoJywgJzgzJzogJ1lvcmljaycsICc1Myc6ICdCbGl0emNyYW5rJywgJzEzMyc6ICdRdWlubicsICcyNDUnOiAnRWtrbycsICc3NCc6ICdIZWltZXJkaW5nZXInLCAnNTcnOiAnTWFva2FpJywgJzI1JzogJ01vcmdhbmEnLCAnMTYzJzogJ1RhbGl5YWgnLCAnNjMnOiAnQnJhbmQnLCAnMTA3JzogJ1JlbmdhcicsICcxMCc6ICdLYXlsZScsICc0MSc6ICdHYW5ncGxhbmsnLCAnMjAzJzogJ0tpbmRyZWQnLCAnMjIzJzogJ1RhaG1LZW5jaCcsICcxMjcnOiAnTGlzc2FuZHJhJywgJzEzJzogJ1J5emUnLCAnMTA1JzogJ0ZpenonLCAnMTcnOiAnVGVlbW8nLCAnMTE3JzogJ0x1bHUnLCAnMjU0JzogJ1ZpJywgJzM0JzogJ0FuaXZpYScsICcxMDInOiAnU2h5dmFuYScsICc3JzogJ0xlYmxhbmMnLCAnOTInOiAnUml2ZW4nLCAnMzEnOiAnQ2hvZ2F0aCcsICc0Myc6ICdLYXJtYScsICcyMjInOiAnSmlueCcsICcyMzYnOiAnTHVjaWFuJywgJzM5JzogJ0lyZWxpYScsICcxNDEnOiAnS2F5bicsICc4Nic6ICdHYXJlbicsICcyNic6ICdaaWxlYW4nLCAnOTknOiAnTHV4JywgJzQnOiAnVHdpc3RlZEZhdGUnLCAnNTgnOiAnUmVuZWt0b24nLCAnNjgnOiAnUnVtYmxlJywgJzEzNCc6ICdTeW5kcmEnLCAnNTEnOiAnQ2FpdGx5bicsICcyOSc6ICdUd2l0Y2gnLCAnNDIxJzogJ1Jla1NhaScsICc0OTcnOiAnUmFrYW4nLCAnMjQwJzogJ0tsZWQnLCAnMjY2JzogJ0FhdHJveCcsICcxMTEnOiAnTmF1dGlsdXMnLCAnMzYnOiAnRHJNdW5kbycsICczMic6ICdBbXVtdScsICcxMTMnOiAnU2VqdWFuaScsICcxMjEnOiAnS2hheml4JywgJzUwJzogJ1N3YWluJywgJzcyJzogJ1NrYXJuZXInLCAnMTI2JzogJ0pheWNlJywgJzEyMCc6ICdIZWNhcmltJywgJzEwNCc6ICdHcmF2ZXMnLCAnNDgnOiAnVHJ1bmRsZScsICcxNDMnOiAnWnlyYScsICczMyc6ICdSYW1tdXMnLCAnMjY4JzogJ0F6aXInLCAnMjAxJzogJ0JyYXVtJywgJzIzJzogJ1RyeW5kYW1lcmUnLCAnNjknOiAnQ2Fzc2lvcGVpYScsICcxMTInOiAnVmlrdG9yJywgJzM4JzogJ0thc3NhZGluJywgJzg5JzogJ0xlb25hJywgJzI0JzogJ0pheCcsICc1MTYnOiAnT3JubicsICcxMzEnOiAnRGlhbmEnLCAnNDMyJzogJ0JhcmQnLCAnNzYnOiAnTmlkYWxlZScsICc0Mic6ICdDb3JraScsICc5MCc6ICdNYWx6YWhhcicsICcxNDInOiAnWm9lJywgJzEnOiAnQW5uaWUnLCAnMTE5JzogJ0RyYXZlbicsICc2NCc6ICdMZWVTaW4nLCAnOCc6ICdWbGFkaW1pcicsICczNyc6ICdTb25hJywgJzExNCc6ICdGaW9yYScsICc0MCc6ICdKYW5uYScsICc1OSc6ICdKYXJ2YW5JVicsICc0MjAnOiAnSWxsYW9pJywgJzUnOiAnWGluWmhhbycsICczNSc6ICdTaGFjbycsICcxMDMnOiAnQWhyaScsICc2Nyc6ICdWYXluZScsICc4NCc6ICdBa2FsaScsICcyMDInOiAnSmhpbicsICcxNTAnOiAnR25hcicsICc5MSc6ICdUYWxvbicsICc1NSc6ICdLYXRhcmluYScsICczMCc6ICdLYXJ0aHVzJywgJzIzOCc6ICdaZWQnLCAnMic6ICdPbGFmJywgJzI4JzogJ0V2ZWx5bm4nLCAnOTgnOiAnU2hlbicsICcxNic6ICdTb3Jha2EnLCAnNTYnOiAnTm9jdHVybmUnLCAnMTEnOiAnTWFzdGVyWWknLCAnMTIyJzogJ0Rhcml1cycsICcxNTcnOiAnWWFzdW8nLCAnOTYnOiAnS29nTWF3JywgJzEyJzogJ0FsaXN0YXInLCAnNDEyJzogJ1RocmVzaCcsICc4Mic6ICdNb3JkZWthaXNlcicsICcxMTUnOiAnWmlnZ3MnLCAnODEnOiAnRXpyZWFsJywgJzEwMSc6ICdYZXJhdGgnLCAnNzknOiAnR3JhZ2FzJywgJzc1JzogJ05hc3VzJywgJzIxJzogJ01pc3NGb3J0dW5lJywgJzEzNic6ICdBdXJlbGlvblNvbCcsICcyMic6ICdBc2hlJywgJzgwJzogJ1BhbnRoZW9uJywgJzMnOiAnR2FsaW8nLCAnMTU0JzogJ1phYyd9XG5cdHJldHVybiBjaGFtcGRpY3RbaWRdO1xufSIsImNsYXNzIEZpbHRlcnMge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRzKSB7XG4gICAgICAgIHRoaXMuc3RhdHMgPSBzdGF0cztcbiAgICAgICAgdGhpcy5yZWdpb25zID0gT2JqZWN0LmtleXMoc3RhdHMpO1xuICAgIH1cblxuICAgIGdldFJlZ2lvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lvbnM7XG4gICAgfVxuXG4gICAgZ2V0VmFyaWFibGVzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAge3N0YXROYW1lOiAnZmJUZWFtJywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgQmxvb2QgVGVhbScsIHR5cGU6ICdwZXJjZW50JywgZGVmYXVsdE9yZGVyIDogJ2Rlc2MnfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2ZiS2lsbGVyJywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgQmxvb2QgS2lsbGVyJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYyd9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZmJBc3Npc3QnLCBmcmllbmRseU5hbWU6ICdGaXJzdCBCbG9vZCBBc3Npc3QnLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ30sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICdmaXJzdERlYXRoJywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgRGVhdGgnLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ30sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICdmdFRlYW0nLCBmcmllbmRseU5hbWU6ICdGaXJzdCBUb3dlciBUZWFtJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYyd9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZnRLaWxsZXInLCBmcmllbmRseU5hbWU6ICdGaXJzdCBUb3dlciBLaWxsZXInLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ30sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICdmZFRlYW0nLCBmcmllbmRseU5hbWU6ICdGaXJzdCBEcmFnb24gVGVhbScsIHR5cGU6ICdwZXJjZW50JywgZGVmYXVsdE9yZGVyIDogJ2Rlc2MnfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ3BsYXllZCcsIGZyaWVuZGx5TmFtZTogJ0dhbWVzIFBsYXllZCcsIHR5cGU6ICd2YWx1ZScsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ30sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICd3aW4nLCBmcmllbmRseU5hbWU6ICdXaW4nLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ31cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRQYXRjaGVzKCkge1xuICAgICAgICBpZih0aGlzLnBhdGNoZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhdGNoZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRjaGVzID0gW107XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5yZWdpb25zLCByZWdpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVnaW9uTWF0Y2hlcyA9IHRoaXMuc3RhdHNbcmVnaW9uXTtcbiAgICAgICAgICAgIEFycmF5LmZyb20ocmVnaW9uTWF0Y2hlcywgbWF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnBhdGNoZXMuaW5jbHVkZXMobWF0Y2gucGF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF0Y2hlcy5wdXNoKG1hdGNoLnBhdGNoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB0aGlzLnBhdGNoZXM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJzOyIsImltcG9ydCB7IGlkVG9DaGFtcCB9IGZyb20gJy4vQ2hhbXBGdW5jcyc7XG5cbmNsYXNzIFN0YXRzIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0cykge1xuICAgICAgICB0aGlzLnN0YXRzID0gc3RhdHM7XG4gICAgICAgIHRoaXMub3JkZXJCeSA9ICdhbHBoYWJldGljYWxseSc7XG4gICAgICAgIHRoaXMub3JkZXJCeVZhcmlhYmxlID0gJ2FscGhhYmV0aWNhbGx5JztcbiAgICAgICAgdGhpcy5vcmRlckRpcmVjdGlvbiA9ICdhc2MnO1xuICAgIH1cblxuICAgIHNldFN0YXRlcyhyZWdpb25zLCBwYXRjaGVzKSB7XG4gICAgICAgIHRoaXMucmVnaW9ucyA9IHJlZ2lvbnM7XG4gICAgICAgIHRoaXMucGF0Y2hlcyA9IHBhdGNoZXM7XG4gICAgfVxuXG4gICAgc2V0T3JkZXIodmFyaWFibGUpIHtcbiAgICAgICAgdGhpcy5vcmRlckRpcmVjdGlvXG4gICAgICAgIGlmKHRoaXMub3JkZXJCeSA9PT0gdmFyaWFibGUudHlwZSAmJiB0aGlzLm9yZGVyQnlWYXJpYWJsZSA9PT0gdmFyaWFibGUuc3RhdE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMub3JkZXJEaXJlY3Rpb24gPSAodGhpcy5vcmRlckRpcmVjdGlvbiA9PT0gJ2Rlc2MnKSA/ICdhc2MnIDogJ2Rlc2MnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcmRlckJ5ID0gdmFyaWFibGUudHlwZTtcbiAgICAgICAgICAgIHRoaXMub3JkZXJCeVZhcmlhYmxlID0gdmFyaWFibGUuc3RhdE5hbWU7XG4gICAgICAgICAgICB0aGlzLm9yZGVyRGlyZWN0aW9uID0gdmFyaWFibGUuZGVmYXVsdE9yZGVyO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3JkZXJDaGFtcHMoKTtcbiAgICB9XG5cbiAgICBnZXRPcmRlclZhcmlhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmRlckJ5VmFyaWFibGU7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlKCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUNoYW1wcygpO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZUNoYW1wcygpIHtcbiAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdCA9IHt9XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5yZWdpb25zLCByZWdpb24gPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVnaW9uTWF0Y2hlcyA9IHRoaXMuc3RhdHNbcmVnaW9uXTtcbiAgICAgICAgICAgIEFycmF5LmZyb20ocmVnaW9uTWF0Y2hlcywgbWF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucGF0Y2hlcy5pbmNsdWRlcyhtYXRjaC5wYXRjaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTdGF0cyhtYXRjaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3JkZXJDaGFtcHMoKTtcbiAgICB9XG5cbiAgICBnZXRQZXJjZW50YWdlKGEsIGIpIHtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChhIC8gYikgKiAxMDA7XG4gICAgICAgIHJldHVybiBgJHtNYXRoLmZsb29yKHBlcmNlbnRhZ2UpfSVgO1xuICAgIH1cblxuICAgIG9yZGVyQ2hhbXBzKCkge1xuICAgICAgICB0aGlzLmZiQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yKGNvbnN0IGNoYW1wSWQgaW4gdGhpcy5maXJzdENoYW1wc09iamVjdCkge1xuICAgICAgICAgICAgbGV0IGNoYW1wID0gdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXTtcbiAgICAgICAgICAgIGNoYW1wWydpZCddID0gY2hhbXBJZDtcbiAgICAgICAgICAgIHRoaXMuZmJBcnJheS5wdXNoKGNoYW1wKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZiQXJyYXkuc29ydCh0aGlzLnNvcnRGdW5jdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBzb3J0RnVuY3Rpb24oYSwgYikge1xuICAgICAgICBsZXQgdmFsQSA9ICcnO1xuICAgICAgICBsZXQgdmFsQiA9ICcnO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy5vcmRlckJ5ID09PSAncGVyY2VudCcpIHtcbiAgICAgICAgICAgIHZhbEEgPSBhW3RoaXMub3JkZXJCeVZhcmlhYmxlXSAvIGEucGxheWVkO1xuICAgICAgICAgICAgdmFsQiA9IGJbdGhpcy5vcmRlckJ5VmFyaWFibGVdIC8gYi5wbGF5ZWQ7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLm9yZGVyQnkgPT09ICdhbHBoYWJldGljYWxseScpIHtcbiAgICAgICAgICAgIHZhbEEgPSBpZFRvQ2hhbXAoYS5pZCk7XG4gICAgICAgICAgICB2YWxCID0gaWRUb0NoYW1wKGIuaWQpO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vcmRlckJ5ID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICB2YWxBID0gYVt0aGlzLm9yZGVyQnlWYXJpYWJsZV07XG4gICAgICAgICAgICB2YWxCID0gYlt0aGlzLm9yZGVyQnlWYXJpYWJsZV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsQSA8IHZhbEIpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5vcmRlckRpcmVjdGlvbiA9PT0gJ2FzYycpID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWxBID4gdmFsQikge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLm9yZGVyRGlyZWN0aW9uID09PSAnYXNjJykgPyAxIDogLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgYWRkU3RhdHMobWF0Y2gpIHtcbiAgICAgICAgZm9yIChsZXQgcGxheWVySW5kZXggPSAwOyBwbGF5ZXJJbmRleCA8IDEwOyBwbGF5ZXJJbmRleCsrKSB7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIgPSBtYXRjaFsncGxheWVycyddW3BsYXllckluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IGNoYW1wSWQgPSBwbGF5ZXIuY2hhbXBJZDtcbiAgICAgICAgICAgIGlmKHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF0gPSB0aGlzLmdldERlZmF1bHRTdGF0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWydwbGF5ZWQnXSsrO1xuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZWRHb3RWYXJpYWJsZShtYXRjaC5maXJzdEJsb29kLCBwbGF5ZXJJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWydmYlRlYW0nXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyLmZpcnN0Qmxvb2RLaWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmJLaWxsZXInXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyLmZpcnN0Qmxvb2RBc3Npc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWydmYkFzc2lzdCddKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXIuZmlyc3REZWF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF1bJ2ZpcnN0RGVhdGgnXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZWRHb3RWYXJpYWJsZShtYXRjaC5maXJzdFRvd2VyLCBwbGF5ZXJJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWydmdFRlYW0nXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyLmZpcnN0VG93ZXJLaWxsIHx8IHBsYXllci5maXJzdFRvd2VyQXNzaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZnRLaWxsZXInXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZWRHb3RWYXJpYWJsZShtYXRjaC5maXJzdERyYWdvbiwgcGxheWVySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmRUZWFtJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVkR290VmFyaWFibGUobWF0Y2gud2luLCBwbGF5ZXJJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWyd3aW4nXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheWVkR290VmFyaWFibGUoZmlyc3RUZWFtLCBwbGF5ZXJJbmRleCkge1xuICAgICAgICByZXR1cm4gKGZpcnN0VGVhbSA9PT0gMCAmJiBwbGF5ZXJJbmRleCA8IDUpIHx8IChmaXJzdFRlYW0gPT09IDEgJiYgcGxheWVySW5kZXggPiA0KVxuICAgIH1cblxuICAgIGdldERlZmF1bHRTdGF0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGxheWVkOiAwLFxuICAgICAgICAgICAgZmJUZWFtOiAwLFxuICAgICAgICAgICAgZnRUZWFtOiAwLFxuICAgICAgICAgICAgZmRUZWFtOiAwLFxuICAgICAgICAgICAgZmJLaWxsZXI6IDAsXG4gICAgICAgICAgICBmYkFzc2lzdDogMCxcbiAgICAgICAgICAgIGZpcnN0RGVhdGg6IDAsXG4gICAgICAgICAgICBmdEtpbGxlcjogMCxcbiAgICAgICAgICAgIHdpbjogMFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2hhbXBzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mYkFycmF5O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHM7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncHJlYWN0LXJlZHV4J1xuaW1wb3J0IGFwcFN0b3JlIGZyb20gJy4vcmVkdWNlcnMvc3RvcmUnXG5cblxuaW1wb3J0IEFwcE1haW4gZnJvbSAnLi9BcHBNYWluJztcbmltcG9ydCBOYXZCYXIgZnJvbSAnLi9OYXZCYXInO1xuaW1wb3J0IE1hdGNoZXMgZnJvbSAnLi9NYXRjaGVzL2luZGV4LmpzJztcblxuXG5cbi8vaHR0cHM6Ly93aXJlZnJhbWUuY2MveEtPdkNFXG5jbGFzcyBNYWluTGVhZ3VlQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuc3RvcmUgPSBhcHBTdG9yZVxuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGFwcFR5cGU6ICdtYXRjaFVwJ1xuXHRcdH07XG5cdH1cblxuXG5cdHVwZGF0ZUFwcFR5cGUodHlwZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe2FwcFR5cGUgOiB0eXBlIH0pO1xuXHR9XG4gXG5cdHJlbmRlcihwcm9wcywgc3RhdGUpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFByb3ZpZGVyIHN0b3JlPXt0aGlzLnN0b3JlfT5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdFx0PG5hdiBjbGFzcz1cIm5hdlwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibmF2X19sb2dvXCI+PGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZHdlYXRoZXJhbGxcIiB0YXJnZXQ9XCJfYmxhbmtcIj5EYXZpZCBXZWF0aGVyYWxsPC9hPjwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibmF2X19saW5rcyAganMtbmF2LWxpbmtzXCI+XG5cdFx0XHRcdFx0XHRcdFx0PE5hdkJhciB1cGRhdGVBcHBUeXBlPXsgdGhpcy51cGRhdGVBcHBUeXBlLmJpbmQodGhpcykgfSBhcHBUeXBlPXt0aGlzLnN0YXRlLmFwcFR5cGV9IC8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9uYXY+XG5cdFx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBhZ2VcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzXCI+XG5cdFx0XHRcdFx0XHRcdDxNYXRjaGVzLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PG1haW4gY2xhc3M9XCJtYWluXCI+XG5cdFx0XHRcdFx0XHRcdDxBcHBNYWluIGFwcFR5cGU9e3RoaXMuc3RhdGUuYXBwVHlwZX0gLz5cblx0XHRcdFx0XHRcdDwvbWFpbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdCk7XG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYWluTGVhZ3VlQXBwOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgUGxheWVycyBmcm9tICcuL1BsYXllcnMnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb246IHN0b3JlLmNvbmZpZy5hY3RpdmVSZWdpb24sXG4gICAgICAgIHJlZ2lvbkRhdGE6IHN0b3JlLnJlZ2lvbnMucmVnaW9uRGF0YSxcbiAgICAgICAgdGVhbTE6IHN0b3JlLmNvbmZpZy50ZWFtMSxcbiAgICAgICAgdGVhbTI6IHN0b3JlLmNvbmZpZy50ZWFtMixcbiAgICB9XG59KVxuY2xhc3MgTWF0Y2hDYXJkIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy50ZWFtQ29sb3VycyA9IFsnYmx1ZScsICdyZWQnXTtcblx0fVxuXG5cdGdldEluZGV4KGdldEVuZW15ID0gZmFsc2UpIHtcblx0XHRpZih0aGlzLnByb3BzLnRlYW0pIHtcblx0XHRcdHRoaXMuaW5kZXggPSAwO1xuXHRcdFx0dGhpcy5lbmVteUluZGV4ID0gMTtcblx0XHRcdGlmKHRoaXMucHJvcHMuZ2FtZS50ZWFtTmFtZXNbMV0gPT0gdGhpcy5wcm9wcy50ZWFtKSB7XG5cdFx0XHRcdHRoaXMuaW5kZXggPSAxO1xuXHRcdFx0XHR0aGlzLmVuZW15SW5kZXggPSAwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmluZGV4ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYoZ2V0RW5lbXkpIHtcblx0XHRcdHJldHVybiB0aGlzLmVuZW15SW5kZXg7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuaW5kZXg7XG5cblx0fVxuXG5cdGdldFRpbWUodW5peCkge1xuXHRcdGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSh1bml4KTtcblx0XHRyZXR1cm4gZGF0ZS50b0xvY2FsZVN0cmluZyhbXSwge2RheTogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCB5ZWFyOiAnbnVtZXJpYyd9KTtcblx0fVxuXG5cdHRvZ2dsZVBsYXllcnMoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7c2hvd1BsYXllcnM6ICF0aGlzLnN0YXRlLnNob3dQbGF5ZXJzfSk7XG5cdH1cblxuXHRnZXRCYWNrZ3JvdW5kKCkge1xuXHRcdGlmKHRoaXMucHJvcHMudGVhbSkge1xuXHRcdFx0cmV0dXJuIGBiZy1jb2xvci0tJHt0aGlzLnRlYW1Db2xvdXJzW3RoaXMuZ2V0SW5kZXgoKV19YDtcblx0XHR9XG5cdFx0cmV0dXJuIGBiZy1jb2xvci0tZGVmYXVsdGA7XG5cdH1cblxuXHRnZXRCb3JkZXIoKSB7XG5cdFx0aWYodGhpcy5nZXRJbmRleCgpICE9PSBmYWxzZSkge1xuXHRcdFx0aWYodGhpcy5wcm9wcy5nYW1lLndpbiA9PSB0aGlzLmdldEluZGV4KCkpIHtcblx0XHRcdFx0cmV0dXJuIGBiZHItY29sb3ItLWdyZWVuYDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBgYmRyLWNvbG9yLS1yZWRgO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gYGJkci1jb2xvci0tZ3JleWVyYDtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJBY2hpZXZlbWVudHModGVhbU51bSwgbXlUZWFtID0gZmFsc2UpIHtcblx0XHRsZXQgaXNNeVRlYW0gPSBmYWxzZTtcblx0XHRpZihteVRlYW0pIHtcblx0XHRcdGlmKHRoaXMucHJvcHMuZ2FtZS50ZWFtTmFtZXNbdGVhbU51bV0gPT0gbXlUZWFtKSB7XG5cdFx0XHRcdGlzTXlUZWFtID0gdHJ1ZTsgXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGNvbnN0IGNoZWNrcyA9IFx0e1xuXHRcdFx0XHRcdFx0XHQnZmlyc3RCYXJvbicgOiAnRmlyc3QgQmFyb24nLFxuXHRcdFx0XHRcdFx0XHQnZmlyc3RCbG9vZCcgOiAnRmlyc3QgQmxvb2QnLFxuXHRcdFx0XHRcdFx0XHQnZmlyc3REcmFnb24nIDogJ0ZpcnN0IERyYWdvbicsXG5cdFx0XHRcdFx0XHRcdCdmaXJzdEluaGliaXRvcicgOiAnRmlyc3QgSW5oaWJpdG9yJyxcblx0XHRcdFx0XHRcdFx0J2ZpcnN0VG93ZXInIDogJ0ZpcnN0IFRvd2VyJ1xuXHRcdFx0XHRcdFx0fTtcblx0XHRsZXQgYWNoaWV2ZW1lbnRzID0gW107XG5cdFx0Zm9yIChjb25zdCBjaGVjayBpbiBjaGVja3MpIHtcblx0XHRcdGlmKHRoaXMucHJvcHMuZ2FtZVtjaGVja10gPT0gdGVhbU51bSkge1xuXHRcdFx0XHRsZXQgY2xhc3NlcyA9ICcnO1xuXHRcdFx0XHRpZihteVRlYW0pIHtcblx0XHRcdFx0XHRpZiAoaXNNeVRlYW0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMgPSAndC1jb2xvdXItLWdyZWVuJztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2xhc3NlcyA9ICd0LWNvbG91ci0tcmVkJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y2xhc3NlcyA9ICd0LWNvbG91ci0tJyArIHRoaXMudGVhbUNvbG91cnNbdGVhbU51bV07XG5cdFx0XHRcdH1cblx0XHRcdFx0YWNoaWV2ZW1lbnRzLnB1c2goPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PntjaGVja3NbY2hlY2tdfTwvZGl2Pik7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBhY2hpZXZlbWVudHM7XG5cdH1cblxuXHRyZW5kZXJNYXRjaHVwKCkge1xuXHRcdGxldCB0ZWFtMSA9IHRoaXMucHJvcHMuZ2FtZS50ZWFtTmFtZXNbMF07XG5cdFx0bGV0IHRlYW0yID0gdGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1sxXTtcblx0XHRcblx0XHRpZih0aGlzLnByb3BzLnRlYW0pIHtcblx0XHRcdGlmKHRoaXMucHJvcHMuZ2FtZS50ZWFtTmFtZXNbMF0gIT0gdGhpcy5wcm9wcy50ZWFtKSB7XG5cdFx0XHRcdHRlYW0yID0gdGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1swXTtcblx0XHRcdFx0dGVhbTEgPSB0aGlzLnByb3BzLmdhbWUudGVhbU5hbWVzWzFdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbiAgZmxleCAgZmxleC1qdXN0aWZ5LS1iZXR3ZWVuXCI+XG5cdFx0XHRcdDxpbWcgY2xhc3NOYW1lPVwiY2FyZF9fbG9nb1wiICBzcmM9e2AvYXNzZXRzL2ltZy90ZWFtcy8ke3RlYW0xfS5wbmdgfSAvPlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjYXJkX192c1wiPlxuXHRcdFx0XHRcdHZzXG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0PGltZyBjbGFzc05hbWU9XCJjYXJkX19sb2dvXCIgIHNyYz17YC9hc3NldHMvaW1nL3RlYW1zLyR7dGVhbTJ9LnBuZ2B9IC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyU2hvd01vcmUoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZF9fc2hvd21vcmVcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVBsYXllcnMuYmluZCh0aGlzKX0+U2hvdyBNb3JlPC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cmVuZGVyUGxheWVycygpIHtcblx0XHRpZih0aGlzLnN0YXRlLnNob3dQbGF5ZXJzKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGxheWVycyBnYW1lPXt0aGlzLnByb3BzLmdhbWV9IGluZGV4PXt0aGlzLmdldEluZGV4KCl9IGFjdGl2ZVJlZ2lvbj17dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259Lz5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7c2hvd1BsYXllcnM6IGZhbHNlfSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgY2FyZCAgJHt0aGlzLmdldEJhY2tncm91bmQoKX0gICR7dGhpcy5nZXRCb3JkZXIoKX1gfSBkYXRhLWNvdW50PXt0aGlzLnByb3BzLmNvdW50fT4gXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZF9fZGF0ZVwiPlxuXHRcdFx0XHRcdHt0aGlzLmdldFRpbWUodGhpcy5wcm9wcy5nYW1lLnRpbWUpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5zICBmbGV4LWFsaWduLS1jZW50ZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbiAgdC1zaXplLS1zbWFsbFwiPlxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyQWNoaWV2ZW1lbnRzKHRoaXMuZ2V0SW5kZXgoKSwgdGhpcy5wcm9wcy50ZWFtKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJNYXRjaHVwKCl9XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW4gIHQtYWxpZ24tLXJpZ2h0ICB0LXNpemUtLXNtYWxsXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJBY2hpZXZlbWVudHModGhpcy5nZXRJbmRleCh0cnVlKSwgdGhpcy5wcm9wcy50ZWFtKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHt0aGlzLnJlbmRlclBsYXllcnMoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyU2hvd01vcmUoKX1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoQ2FyZDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBNYXRjaENhcmQgZnJvbSAnLi9NYXRjaENhcmQnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb246IHN0b3JlLmNvbmZpZy5hY3RpdmVSZWdpb24sXG4gICAgICAgIHJlZ2lvbkRhdGE6IHN0b3JlLnJlZ2lvbnMucmVnaW9uRGF0YSxcbiAgICAgICAgdGVhbTE6IHN0b3JlLmNvbmZpZy50ZWFtMSxcbiAgICAgICAgdGVhbTI6IHN0b3JlLmNvbmZpZy50ZWFtMixcbiAgICB9XG59KVxuY2xhc3MgTWF0Y2hFbGVtZW50cyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cmVuZGVyQ2FyZHModGVhbSwgdGVhbTIgPSBmYWxzZSkge1xuXHRcdGxldCBjYXJkcyA9IFtdO1xuXG5cdFx0aWYodGVhbTIpIHtcblx0XHRcdEFycmF5LmZyb20odGhpcy5wcm9wcy5nYW1lcywgKGdhbWUpID0+IHtcblx0XHRcdFx0aWYoZ2FtZS50ZWFtTmFtZXMuaW5jbHVkZXModGVhbSkgJiYgZ2FtZS50ZWFtTmFtZXMuaW5jbHVkZXModGVhbTIpKSB7XG5cdFx0XHRcdFx0Y2FyZHMucHVzaCg8TWF0Y2hDYXJkIGdhbWU9e2dhbWV9IHRlYW09e2ZhbHNlfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRBcnJheS5mcm9tKHRoaXMucHJvcHMuZ2FtZXMsIChnYW1lKSA9PiB7XG5cdFx0XHRcdGlmKGdhbWUudGVhbU5hbWVzLmluY2x1ZGVzKHRlYW0pKSB7XG5cdFx0XHRcdFx0Y2FyZHMucHVzaCg8TWF0Y2hDYXJkIGdhbWU9e2dhbWV9IHRlYW09e3RlYW19IHN0b3JlPXt0aGlzLnByb3BzLnN0b3JlfS8+KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiBjYXJkcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdFx0PGgyPnt0aGlzLnByb3BzLnRlYW0xfSdzIFJlY2VudCBNYXRjaGVzPC9oMj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDYXJkcyh0aGlzLnByb3BzLnRlYW0xKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdFx0PGgyPkhlYWQgdG8gSGVhZDwvaDI+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQ2FyZHModGhpcy5wcm9wcy50ZWFtMSwgdGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0PGgyPnt0aGlzLnByb3BzLnRlYW0yfSdzIFJlY2VudCBNYXRjaGVzPC9oMj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDYXJkcyh0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYXRjaEVsZW1lbnRzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuaW1wb3J0IFJlYWN0SGludEZhY3RvcnkgZnJvbSAncmVhY3QtaGludCdcbmNvbnN0IFJlYWN0SGludCA9IFJlYWN0SGludEZhY3Rvcnkoe2NyZWF0ZUVsZW1lbnQ6IGgsIENvbXBvbmVudH0pXG5cblxuY2xhc3MgUGxheWVycyBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGxheWVyRGF0YTogZmFsc2V9KTtcblx0fVxuXG5cdHJlbW92ZVRlYW0ocGxheWVyTmFtZSkge1xuXHRcdEFycmF5LmZyb20odGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lcywgKHRlYW1OYW1lKSA9PiB7XG5cdFx0XHRwbGF5ZXJOYW1lID0gcGxheWVyTmFtZS5yZXBsYWNlKHRlYW1OYW1lLCAnJyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHBsYXllck5hbWU7XG5cdH1cblxuXHRnZXRDaGFtcChjaGFtcElkKSB7XG5cdFx0Y29uc3QgY2hhbXBJZHMgPSB7JzE0NScgOiAnS2Fpc2EnLCAnNTU1JyA6ICdQeWtlJywgJzc3JzogJ1VkeXInLCAnNDI3JzogJ0l2ZXJuJywgJzg1JzogJ0tlbm5lbicsICcxOCc6ICdUcmlzdGFuYScsICc3OCc6ICdQb3BweScsICc5JzogJ0ZpZGRsZXN0aWNrcycsICcyNjcnOiAnTmFtaScsICcxNSc6ICdTaXZpcicsICcxOSc6ICdXYXJ3aWNrJywgJzU0JzogJ01hbHBoaXRlJywgJzE2NCc6ICdDYW1pbGxlJywgJzE0JzogJ1Npb24nLCAnNic6ICdVcmdvdCcsICc2MSc6ICdPcmlhbm5hJywgJzQ1JzogJ1ZlaWdhcicsICc0NCc6ICdUYXJpYycsICc2MCc6ICdFbGlzZScsICcyMCc6ICdOdW51JywgJzEwNic6ICdWb2xpYmVhcicsICcxMTAnOiAnVmFydXMnLCAnNjInOiAnTW9ua2V5S2luZycsICcxNjEnOiAnVmVsa296JywgJzQyOSc6ICdLYWxpc3RhJywgJzI3JzogJ1NpbmdlZCcsICc0OTgnOiAnWGF5YWgnLCAnODMnOiAnWW9yaWNrJywgJzUzJzogJ0JsaXR6Y3JhbmsnLCAnMTMzJzogJ1F1aW5uJywgJzI0NSc6ICdFa2tvJywgJzc0JzogJ0hlaW1lcmRpbmdlcicsICc1Nyc6ICdNYW9rYWknLCAnMjUnOiAnTW9yZ2FuYScsICcxNjMnOiAnVGFsaXlhaCcsICc2Myc6ICdCcmFuZCcsICcxMDcnOiAnUmVuZ2FyJywgJzEwJzogJ0theWxlJywgJzQxJzogJ0dhbmdwbGFuaycsICcyMDMnOiAnS2luZHJlZCcsICcyMjMnOiAnVGFobUtlbmNoJywgJzEyNyc6ICdMaXNzYW5kcmEnLCAnMTMnOiAnUnl6ZScsICcxMDUnOiAnRml6eicsICcxNyc6ICdUZWVtbycsICcxMTcnOiAnTHVsdScsICcyNTQnOiAnVmknLCAnMzQnOiAnQW5pdmlhJywgJzEwMic6ICdTaHl2YW5hJywgJzcnOiAnTGVibGFuYycsICc5Mic6ICdSaXZlbicsICczMSc6ICdDaG9nYXRoJywgJzQzJzogJ0thcm1hJywgJzIyMic6ICdKaW54JywgJzIzNic6ICdMdWNpYW4nLCAnMzknOiAnSXJlbGlhJywgJzE0MSc6ICdLYXluJywgJzg2JzogJ0dhcmVuJywgJzI2JzogJ1ppbGVhbicsICc5OSc6ICdMdXgnLCAnNCc6ICdUd2lzdGVkRmF0ZScsICc1OCc6ICdSZW5la3RvbicsICc2OCc6ICdSdW1ibGUnLCAnMTM0JzogJ1N5bmRyYScsICc1MSc6ICdDYWl0bHluJywgJzI5JzogJ1R3aXRjaCcsICc0MjEnOiAnUmVrU2FpJywgJzQ5Nyc6ICdSYWthbicsICcyNDAnOiAnS2xlZCcsICcyNjYnOiAnQWF0cm94JywgJzExMSc6ICdOYXV0aWx1cycsICczNic6ICdEck11bmRvJywgJzMyJzogJ0FtdW11JywgJzExMyc6ICdTZWp1YW5pJywgJzEyMSc6ICdLaGF6aXgnLCAnNTAnOiAnU3dhaW4nLCAnNzInOiAnU2thcm5lcicsICcxMjYnOiAnSmF5Y2UnLCAnMTIwJzogJ0hlY2FyaW0nLCAnMTA0JzogJ0dyYXZlcycsICc0OCc6ICdUcnVuZGxlJywgJzE0Myc6ICdaeXJhJywgJzMzJzogJ1JhbW11cycsICcyNjgnOiAnQXppcicsICcyMDEnOiAnQnJhdW0nLCAnMjMnOiAnVHJ5bmRhbWVyZScsICc2OSc6ICdDYXNzaW9wZWlhJywgJzExMic6ICdWaWt0b3InLCAnMzgnOiAnS2Fzc2FkaW4nLCAnODknOiAnTGVvbmEnLCAnMjQnOiAnSmF4JywgJzUxNic6ICdPcm5uJywgJzEzMSc6ICdEaWFuYScsICc0MzInOiAnQmFyZCcsICc3Nic6ICdOaWRhbGVlJywgJzQyJzogJ0NvcmtpJywgJzkwJzogJ01hbHphaGFyJywgJzE0Mic6ICdab2UnLCAnMSc6ICdBbm5pZScsICcxMTknOiAnRHJhdmVuJywgJzY0JzogJ0xlZVNpbicsICc4JzogJ1ZsYWRpbWlyJywgJzM3JzogJ1NvbmEnLCAnMTE0JzogJ0Zpb3JhJywgJzQwJzogJ0phbm5hJywgJzU5JzogJ0phcnZhbklWJywgJzQyMCc6ICdJbGxhb2knLCAnNSc6ICdYaW5aaGFvJywgJzM1JzogJ1NoYWNvJywgJzEwMyc6ICdBaHJpJywgJzY3JzogJ1ZheW5lJywgJzg0JzogJ0FrYWxpJywgJzIwMic6ICdKaGluJywgJzE1MCc6ICdHbmFyJywgJzkxJzogJ1RhbG9uJywgJzU1JzogJ0thdGFyaW5hJywgJzMwJzogJ0thcnRodXMnLCAnMjM4JzogJ1plZCcsICcyJzogJ09sYWYnLCAnMjgnOiAnRXZlbHlubicsICc5OCc6ICdTaGVuJywgJzE2JzogJ1NvcmFrYScsICc1Nic6ICdOb2N0dXJuZScsICcxMSc6ICdNYXN0ZXJZaScsICcxMjInOiAnRGFyaXVzJywgJzE1Nyc6ICdZYXN1bycsICc5Nic6ICdLb2dNYXcnLCAnMTInOiAnQWxpc3RhcicsICc0MTInOiAnVGhyZXNoJywgJzgyJzogJ01vcmRla2Fpc2VyJywgJzExNSc6ICdaaWdncycsICc4MSc6ICdFenJlYWwnLCAnMTAxJzogJ1hlcmF0aCcsICc3OSc6ICdHcmFnYXMnLCAnNzUnOiAnTmFzdXMnLCAnMjEnOiAnTWlzc0ZvcnR1bmUnLCAnMTM2JzogJ0F1cmVsaW9uU29sJywgJzIyJzogJ0FzaGUnLCAnODAnOiAnUGFudGhlb24nLCAnMyc6ICdHYWxpbycsICcxNTQnOiAnWmFjJ31cblx0XHRyZXR1cm4gY2hhbXBJZHNbY2hhbXBJZF07XG5cdH1cblxuXHRnZXRQbGF5ZXJEYXRhKCkge1xuXHRcdGZldGNoKGAvYXBpLyR7dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259L2dhbWVzLyR7dGhpcy5wcm9wcy5nYW1lLmdhbWVJZH0vcGxheWVycy5qc29uYClcblx0XHQudGhlbihcblx0XHRcdHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKVxuXHRcdCkudGhlbihkYXRhID0+IHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3BsYXllckRhdGE6IGRhdGF9KTtcblx0XHR9KTtcdFx0XG5cdH1cblxuXHRnZXRGQihwbGF5ZXJEYXRhKSB7XG5cdFx0bGV0IGZpcnN0Qmxvb2QgPSAnJztcblx0XHRpZihwbGF5ZXJEYXRhLmZpcnN0Qmxvb2RLaWxsKSB7XG5cdFx0XHRmaXJzdEJsb29kID0gPGltZyBkYXRhLXJoPVwiRmlyc3QgS2lsbFwiIHNyYz1cIi9hc3NldHMvc3ZnL3N3b3JkLnN2Z1wiLz47XG5cdFx0fSBlbHNlIGlmKHBsYXllckRhdGEuZmlyc3RCbG9vZEFzc2lzdCkge1xuXHRcdFx0Zmlyc3RCbG9vZCA9IDxpbWcgZGF0YS1yaD1cIkZpcnN0IEtpbGwgQXNzaXN0XCIgc3JjPVwiL2Fzc2V0cy9zdmcvaGVscC5zdmdcIi8+OyBcblx0XHR9IGVsc2UgaWYocGxheWVyRGF0YS5maXJzdERlYXRoKSB7XG5cdFx0XHRmaXJzdEJsb29kID0gPGltZyBkYXRhLXJoPVwiRmlyc3QgRGVhdGhcIiBzcmM9XCIvYXNzZXRzL3N2Zy9za3VsbC5zdmdcIi8+O1xuXHRcdH1cblx0XHRyZXR1cm4gZmlyc3RCbG9vZDtcblx0fVxuXG5cdHJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSB7XG5cdFx0bGV0IHBsYXllck5hbWUgPSBwbGF5ZXJEYXRhLm5hbWVcblx0XHRwbGF5ZXJOYW1lID0gdGhpcy5yZW1vdmVUZWFtKHBsYXllck5hbWUpXG5cdFx0Y29uc3QgZmlyc3RCbG9vZCA9IHRoaXMuZ2V0RkIocGxheWVyRGF0YSk7XG5cdFx0Y29uc3QgS0RBID0gYCR7cGxheWVyRGF0YS5raWxsc30vJHtwbGF5ZXJEYXRhLmRlYXRoc30vJHtwbGF5ZXJEYXRhLmtpbGxzfWA7XG5cdFx0Y29uc3QgY2hhbXBOYW5lID0gdGhpcy5nZXRDaGFtcChwbGF5ZXJEYXRhLmNoYW1wSWQpO1xuXHRcdGNvbnN0IGNoYW1wSW1hZ2UgPSBgaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vOC4xNC4xL2ltZy9jaGFtcGlvbi8ke2NoYW1wTmFuZX0ucG5nYFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8dHIgY2xhc3M9XCJjYXJkX19wbGF5ZXJcIj5cblx0XHRcdFx0PHRkPntwbGF5ZXJOYW1lfTwvdGQ+XG5cdFx0XHRcdDx0ZCBjbGFzcz1cImNhcmRfX2NoYW1wXCI+PGltZyBzcmM9e2NoYW1wSW1hZ2V9Lz48L3RkPlxuXHRcdFx0XHQ8dGQ+e0tEQX08L3RkPlxuXHRcdFx0XHQ8dGQgY2xhc3M9XCJjYXJkX19zdmdcIj5cblx0XHRcdFx0XHQ8UmVhY3RIaW50IGF1dG9Qb3NpdGlvbiBldmVudHMgZGVsYXk9ezEwMH0gLz5cblx0XHRcdFx0XHQ8UmVhY3RIaW50IHBlcnNpc3Rcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZT1cImRhdGEtY3VzdG9tXCJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImN1c3RvbS1oaW50XCJcblx0XHRcdFx0XHRcdGV2ZW50cz17e2hvdmVyOiB0cnVlfX1cblx0XHRcdFx0XHRcdHJlZj17KHJlZikgPT4gdGhpcy5pbnN0YW5jZSA9IHJlZn0gLz5cblx0XHRcdFx0XHR7Zmlyc3RCbG9vZH1cblx0XHRcdFx0PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclBsYXllcnMoKSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5wbGF5ZXJEYXRhKSB7XG5cdFx0XHRsZXQgdGVhbTFQbGF5ZXJzID0gW107XG5cdFx0XHRsZXQgdGVhbTJQbGF5ZXJzID0gW107XG5cdFx0XHRsZXQgcGxheWVyQ291bnQgPSAwO1xuXHRcdFx0d2hpbGUocGxheWVyQ291bnQgPCA1KSB7XG5cdFx0XHRcdGNvbnN0IHBsYXllckRhdGEgPSB0aGlzLnN0YXRlLnBsYXllckRhdGFbcGxheWVyQ291bnRdO1xuXHRcdFx0XHR0ZWFtMVBsYXllcnMucHVzaCh0aGlzLnJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSk7XG5cdFx0XHRcdHBsYXllckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZShwbGF5ZXJDb3VudCA8IDEwKSB7XG5cdFx0XHRcdGNvbnN0IHBsYXllckRhdGEgPSB0aGlzLnN0YXRlLnBsYXllckRhdGFbcGxheWVyQ291bnRdO1xuXHRcdFx0XHR0ZWFtMlBsYXllcnMucHVzaCh0aGlzLnJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSk7XG5cdFx0XHRcdHBsYXllckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZF9fcGxheWVyc1wiPlxuXHRcdFx0XHRcdDx0YWJsZSBjbGFzcz1cImNhcmRfX3RlYW1cIj5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmluZGV4ID09IDAgPyB0ZWFtMVBsYXllcnMgOiB0ZWFtMlBsYXllcnN9XG5cdFx0XHRcdFx0PC90YWJsZT5cblx0XHRcdFx0XHQ8dGFibGUgY2xhc3M9XCJjYXJkX190ZWFtXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5pbmRleCA9PSAwID8gdGVhbTJQbGF5ZXJzIDogdGVhbTFQbGF5ZXJzfVxuXHRcdFx0XHRcdDwvdGFibGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICdnZXR0aW5nIHBsYXllcnMuLi4nO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX3BsYXllcnNcIj57dGhpcy5yZW5kZXJQbGF5ZXJzKCl9PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMuZ2V0UGxheWVyRGF0YSgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcnM7IiwiLy8gQ3JlZGl0OiBodHRwczovL2NvZGVwZW4uaW8vc21sc3Zuc3NuL3Blbi9Gb2xhQVxuXG5pbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cblxuY2xhc3MgU3RhdENpcmNsZSBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjaXJjbGVUZXh0OiB0aGlzLnByb3BzLmZiVGV4dFxuXHRcdH0pXG5cdH1cblxuXHRjcmVhdGVTdmdBcmMoc3RhcnRQZXJjLCBleHRyYVBlcmMpIHtcblxuXHRcdGlmKCFOdW1iZXIuaXNJbnRlZ2VyKHN0YXJ0UGVyYykpIHtcblx0XHRcdHN0YXJ0UGVyYyA9IDA7XG5cdFx0fVxuXHRcdGlmKCFOdW1iZXIuaXNJbnRlZ2VyKGV4dHJhUGVyYykpIHtcblx0XHRcdGV4dHJhUGVyYyA9IDA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgeCA9IDA7XG5cdFx0Y29uc3QgeSA9IDA7XG5cdFx0Y29uc3QgciA9IDMwMDtcblxuXHRcdGxldCBzdGFydEFuZ2xlID0gKChzdGFydFBlcmMgLyAxMDApICogTWF0aC5QSSlcblxuXHRcdGxldCBlbmRBbmdsZSA9ICgoKGV4dHJhUGVyYyArIHN0YXJ0UGVyYykgLyAxMDApICogTWF0aC5QSSlcblx0XHRcblxuXHRcdGlmIChzdGFydEFuZ2xlID4gZW5kQW5nbGUpIHtcblx0XHRcdHZhciBzID0gc3RhcnRBbmdsZTtcblx0XHRcdHN0YXJ0QW5nbGUgPSBlbmRBbmdsZTtcblx0XHRcdGVuZEFuZ2xlID0gcztcblx0XHR9XG5cdFx0aWYgKGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA+IE1hdGguUEkgKiAyKSB7XG5cdFx0XHRlbmRBbmdsZSA9IE1hdGguUEkgKiAxLjk5OTk5O1xuXHRcdH1cblxuXHRcdHZhciBsYXJnZUFyYyA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA8PSBNYXRoLlBJID8gMCA6IDE7XG5cdFx0Y29uc29sZS5sb2coJ251bXM6ICcpO1xuXHRcdGNvbnNvbGUubG9nKHN0YXJ0UGVyYyk7XG5cdFx0Y29uc29sZS5sb2coZXh0cmFQZXJjKTtcblx0XHRjb25zb2xlLmxvZyhlbmRBbmdsZSk7XG5cdFx0Y29uc29sZS5sb2coc3RhcnRBbmdsZSk7XG5cdFx0cmV0dXJuIFtcblx0XHRcdFwiTVwiLFxuXHRcdFx0eCxcblx0XHRcdHksXG5cdFx0XHRcIkxcIixcblx0XHRcdHggKyBNYXRoLmNvcyhzdGFydEFuZ2xlKSAqIHIsXG5cdFx0XHR5IC0gTWF0aC5zaW4oc3RhcnRBbmdsZSkgKiByLFxuXHRcdFx0XCJBXCIsXG5cdFx0XHRyLFxuXHRcdFx0cixcblx0XHRcdDAsXG5cdFx0XHRsYXJnZUFyYyxcblx0XHRcdDAsXG5cdFx0XHR4ICsgTWF0aC5jb3MoZW5kQW5nbGUpICogcixcblx0XHRcdHkgLSBNYXRoLnNpbihlbmRBbmdsZSkgKiByLFxuXHRcdFx0XCJMXCIsXG5cdFx0XHR4LFxuXHRcdFx0eVxuXHRcdF0uam9pbihcIiBcIik7XG5cdH1cblxuXHR1cGRhdGVDaXJjbGUocGVyYykge1xuXHRcdGNvbnN0IHRleHQgPSBgJHtwZXJjLnRvU3RyaW5nKCl9JWA7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjaXJjbGVUZXh0OiB0ZXh0XG5cdFx0fSlcblx0fVxuXG5cdHJlc2V0Q2lyY2xlKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y2lyY2xlVGV4dDogdGhpcy5wcm9wcy5mYlRleHRcblx0XHR9KVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNpcmNsZVwiPlxuXHRcdFx0XHQ8c3ZnIGlkPVwidGhlTWFwXCIgd2lkdGg9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA2MDAgNjAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIj5cblx0XHRcdFx0XHQ8Y2lyY2xlIGN4PVwiMzAwXCIgY3k9XCIzMDBcIiByPVwiMzAwXCIgZmlsbD1cInJnYmEoMjU1LCAyNTUsIDI1NSwgMClcIi8+XG5cdFx0XHRcdFx0PGcgaWQ9XCJhcmNzXCIgdHJhbnNmb3JtPVwiIHRyYW5zbGF0ZSgzMDAgMzAwKSByb3RhdGUoLTkwKSBzY2FsZSgxIC0xKVwiPlxuXHRcdFx0XHRcdFx0PHBhdGggb25Nb3VzZUVudGVyPXsoKSA9PiB7IHRoaXMudXBkYXRlQ2lyY2xlKHRoaXMucHJvcHMucmVkKSB9fSBvbk1vdXNlTGVhdmU9e3RoaXMucmVzZXRDaXJjbGUuYmluZCh0aGlzKX0gZD17dGhpcy5jcmVhdGVTdmdBcmMoMCwgdGhpcy5wcm9wcy5yZWQpfSBmaWxsPVwiI2ZmMDAwMFwiIG9wYWNpdHk9XCIwLjVcIj48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8cGF0aCBvbk1vdXNlRW50ZXI9eygpID0+IHsgdGhpcy51cGRhdGVDaXJjbGUodGhpcy5wcm9wcy5ibHVlKSB9fSBvbk1vdXNlTGVhdmU9e3RoaXMucmVzZXRDaXJjbGUuYmluZCh0aGlzKX0gZD17dGhpcy5jcmVhdGVTdmdBcmModGhpcy5wcm9wcy5yZWQsIHRoaXMucHJvcHMuYmx1ZSl9IGZpbGw9XCIjMDAyM2ZmXCIgb3BhY2l0eT1cIjAuNVwiPjwvcGF0aD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PGNpcmNsZSBjeD1cIjMwMFwiIGN5PVwiMzAwXCIgcj1cIjEwMFwiIGZpbGw9XCIjZmZmXCIvPlxuXHRcdFx0XHRcdDx0ZXh0IHg9XCI1MCVcIiB5PVwiNTAlXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBzdHJva2U9XCIjMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMnB4XCIgZHk9XCIuM2VtXCIgc3R5bGU9XCJmb250LXNpemU6IDU1cHg7XCI+e3RoaXMuc3RhdGUuY2lyY2xlVGV4dH08L3RleHQ+XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcblx0XHRpZihuZXdQcm9wcy5mYlRleHQgIT09IHRoaXMucHJvcHMuZmJUZXh0KSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y2lyY2xlVGV4dDogbmV3UHJvcHMuZmJUZXh0XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0Q2lyY2xlOyAiLCJjbGFzcyBTdGF0c0NsYXNzIHtcblx0Y29uc3RydWN0b3Ioc3RhdHMpIHtcblx0XHR0aGlzLnN0YXRzID0gc3RhdHM7XG5cdH1cblxuXHRGQih0ZWFtKSB7XG5cdFx0Y29uc3QgZmIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmZpcnN0Qmxvb2RzIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gZmJcblx0fVxuXG5cdGJsdWVGQih0ZWFtKSB7XG5cdFx0Y29uc3QgZmIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdEJsb29kcyAvIHRoaXMuc3RhdHNbdGVhbV0uYmx1ZU1hdGNoZXNQbGF5ZWQpKVxuXHRcdHJldHVybiBmYlxuXHRcdFxuXHR9XG5cblx0cmVkRkIodGVhbSkge1xuXHRcdGNvbnN0IGZiID0gTWF0aC5yb3VuZCgxMDAgKiAodGhpcy5zdGF0c1t0ZWFtXS5yZWRGaXJzdEJsb29kcyAvIHRoaXMuc3RhdHNbdGVhbV0ucmVkTWF0Y2hlc1BsYXllZCkpXG5cdFx0cmV0dXJuIGZiXG5cdH1cblxuXHRUb3dlcih0ZWFtKSB7XG5cdFx0Y29uc3QgVG93ZXIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmZpcnN0VG93ZXJzIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gVG93ZXJcblx0fVxuXG5cdGJsdWVUb3dlcih0ZWFtKSB7XG5cdFx0Y29uc3QgVG93ZXIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdFRvd2VycyAvIHRoaXMuc3RhdHNbdGVhbV0uYmx1ZU1hdGNoZXNQbGF5ZWQpKVxuXHRcdHJldHVybiBUb3dlclxuXHR9XG5cblx0cmVkVG93ZXIodGVhbSkge1xuXHRcdGNvbnN0IFRvd2VyID0gTWF0aC5yb3VuZCgxMDAgKiAodGhpcy5zdGF0c1t0ZWFtXS5yZWRGaXJzdFRvd2VycyAvIHRoaXMuc3RhdHNbdGVhbV0ucmVkTWF0Y2hlc1BsYXllZCkpXG5cdFx0cmV0dXJuIFRvd2VyXG5cdH1cblxuXHREcmFnb24odGVhbSkge1xuXHRcdGNvbnN0IERyYWdvbiA9IE1hdGgucm91bmQoMTAwICogKHRoaXMuc3RhdHNbdGVhbV0uZmlyc3REcmFnb25zIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cblxuXHRibHVlRHJhZ29uKHRlYW0pIHtcblx0XHRjb25zdCBEcmFnb24gPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdERyYWdvbnMgLyB0aGlzLnN0YXRzW3RlYW1dLmJsdWVNYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cblxuXHRyZWREcmFnb24odGVhbSkge1xuXHRcdGNvbnN0IERyYWdvbiA9IE1hdGgucm91bmQoMTAwICogKHRoaXMuc3RhdHNbdGVhbV0ucmVkRmlyc3REcmFnb25zIC8gdGhpcy5zdGF0c1t0ZWFtXS5yZWRNYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHNDbGFzczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBTdGF0c0NsYXNzIGZyb20gJy4vU3RhdHNDbGFzcyc7XG5pbXBvcnQgU3RhdENpcmNsZSBmcm9tICcuL1N0YXRDaXJjbGUnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb246IHN0b3JlLmNvbmZpZy5hY3RpdmVSZWdpb24sXG4gICAgICAgIHJlZ2lvblN0YXRzOiBzdG9yZS5yZWdpb25zLnJlZ2lvblN0YXRzLFxuICAgICAgICB0ZWFtMTogc3RvcmUuY29uZmlnLnRlYW0xLFxuICAgICAgICB0ZWFtMjogc3RvcmUuY29uZmlnLnRlYW0yLFxuICAgIH1cbn0pXG5cbmNsYXNzIFRlYW1TdGF0cyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xhc3ModGhpcy5wcm9wcy5yZWdpb25TdGF0cyk7XG5cdH1cblxuXHRnZXRQbGF5ZXJGQlN0YXRzKHRlYW1OYW1lKSB7XG5cdFx0Y29uc3QgdGVhbSA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGVhbU5hbWVdO1xuXHRcdGxldCBwbGF5ZXJzID0gW107XG5cdFx0Zm9yIChjb25zdCBwbGF5ZXIgaW4gdGVhbS5wbGF5ZXJzTWF0Y2hlc1BsYXllZCkge1xuXHRcdFx0Y29uc3QgbWF0Y2hlc1BsYXllZCA9IHRlYW0ucGxheWVyc01hdGNoZXNQbGF5ZWRbcGxheWVyXTtcblx0XHRcdGNvbnN0IGZpcnN0Qmxvb2QgPSAxMDAgKiAoKHRlYW0uZmlyc3RCbG9vZFBsYXllcnNbcGxheWVyXSArIHRlYW0uZmlyc3RCbG9vZEFzc2lzdFBsYXllcnNbcGxheWVyXSkgLyBtYXRjaGVzUGxheWVkKTtcblx0XHRcdGNvbnN0IGZpcnN0Qmxvb2RTdHJpbmcgPSBwYXJzZUludChmaXJzdEJsb29kKTtcblx0XHRcdFxuXHRcdFx0Y29uc3QgZmlyc3REZWF0aCA9IDEwMCAqICh0ZWFtLmZpcnN0RGVhdGhQbGF5ZXJzW3BsYXllcl0gLyBtYXRjaGVzUGxheWVkKTtcblx0XHRcdGNvbnN0IGZpcnN0RGVhdGhTdHJpbmcgPSBwYXJzZUludChmaXJzdERlYXRoKTtcblxuXHRcdFx0cGxheWVycy5wdXNoKFxuXHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0PHRkPntwbGF5ZXIucmVwbGFjZSh0ZWFtTmFtZSwgJycpfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPntmaXJzdEJsb29kU3RyaW5nfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPntmaXJzdERlYXRoU3RyaW5nfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPnttYXRjaGVzUGxheWVkfTwvdGQ+XG5cdFx0XHRcdDwvdHI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8dGFibGUgY2xhc3M9XCJtYXRjaGVzX190YWJsZVwiPlxuXHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0PHRoPjwvdGg+XG5cdFx0XHRcdFx0PHRoPkZCJTwvdGg+XG5cdFx0XHRcdFx0PHRoPkZEJTwvdGg+XG5cdFx0XHRcdFx0PHRoPlNTPC90aD5cblx0XHRcdFx0PC90cj5cblx0XHRcdFx0e3BsYXllcnN9XG5cdFx0XHQ8L3RhYmxlPlxuXG5cdFx0KTtcblx0fVxuXG5cdGdldERyYWdvblN0YXRzKCkge1xuXHRcdGNvbnN0IHRlYW0xU3RhdHMgPSB0aGlzLnByb3BzLnJlZ2lvblN0YXRzW3RoaXMucHJvcHMudGVhbTFdXG5cdFx0Y29uc3QgdGVhbTJTdGF0cyA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGhpcy5wcm9wcy50ZWFtMl1cblxuXHRcdHJldHVybiAnJztcblxuXHR9XG5cblx0Z2V0UG9zaXRpb25Ub3dlclN0YXRzKHRlYW1OYW1lKSB7XG5cdFx0Y29uc3QgdGVhbSA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGVhbU5hbWVdO1xuXHRcdGxldCBwb3NpdGlvbnMgPSBbXTtcblxuXHRcdHBvc2l0aW9ucyA9IHRoaXMuZ2V0UG9zaXRpb25Ub3dlclN0YXQocG9zaXRpb25zLCB0ZWFtLCAnZmlyc3RUb3dlclBvc2l0aW9uJywgJ2ZpcnN0RW5lbXlUb3dlclBvc2l0aW9uJywgJ21hdGNoZXNQbGF5ZWQnLCAnJylcblx0XHRwb3NpdGlvbnMgPSB0aGlzLmdldFBvc2l0aW9uVG93ZXJTdGF0KHBvc2l0aW9ucywgdGVhbSwgJ2ZpcnN0Qmx1ZVRvd2VyUG9zaXRpb24nLCAnZmlyc3RCbHVlRW5lbXlUb3dlclBvc2l0aW9uJywgJ2JsdWVNYXRjaGVzUGxheWVkJywgJ2NvbG91cl9fYmx1ZScpXG5cdFx0cG9zaXRpb25zID0gdGhpcy5nZXRQb3NpdGlvblRvd2VyU3RhdChwb3NpdGlvbnMsIHRlYW0sICdmaXJzdFJlZFRvd2VyUG9zaXRpb24nLCAnZmlyc3RSZWRFbmVteVRvd2VyUG9zaXRpb24nLCAncmVkTWF0Y2hlc1BsYXllZCcsICdjb2xvdXJfX3JlZCcpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHRhYmxlIGNsYXNzPVwibWF0Y2hlc19fdGFibGVcIj5cblx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdDx0aD48L3RoPlxuXHRcdFx0XHRcdDx0aD5HRVQlPC90aD5cblx0XHRcdFx0XHQ8dGg+TE9TRSU8L3RoPlxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHR7cG9zaXRpb25zfVxuXHRcdFx0PC90YWJsZT5cblxuXHRcdCk7XG5cdH1cblxuXHRnZXRQb3NpdGlvblRvd2VyU3RhdChwb3NpdGlvbnMsIHRlYW0sIHZhcjEsIHZhcjIsIHZhcjMsIGNsYXNzU3R5bGUpIHtcblx0XHRmb3IgKGNvbnN0IHBvc2l0aW9uIGluIHRlYW0uZmlyc3RUb3dlclBvc2l0aW9uKSB7XG5cblx0XHRcdGNvbnN0IG1hdGNoZXNQbGF5ZWQgPSB0ZWFtW3ZhcjNdO1xuXG5cdFx0XHRjb25zdCBmaXJzdFRvd2VyUGVyY2VudGFnZSA9IHBhcnNlSW50KCh0ZWFtW3ZhcjFdW3Bvc2l0aW9uXSAvIG1hdGNoZXNQbGF5ZWQpICogMTAwKVxuXHRcdFx0Y29uc3QgZmlyc3RFbmVteVRvd2VyUGVyY2VudGFnZSA9IHBhcnNlSW50KCh0ZWFtW3ZhcjJdW3Bvc2l0aW9uXSAvIG1hdGNoZXNQbGF5ZWQpICogMTAwKVxuXG5cdFx0XHRwb3NpdGlvbnMucHVzaChcblx0XHRcdFx0PHRyIGNsYXNzTmFtZT17Y2xhc3NTdHlsZX0+XG5cdFx0XHRcdFx0PHRkPntwb3NpdGlvbi5yZXBsYWNlKCdfTEFORScsICcnKX08L3RkPlxuXHRcdFx0XHRcdDx0ZD57YCR7Zmlyc3RUb3dlclBlcmNlbnRhZ2V9JWB9PC90ZD5cblx0XHRcdFx0XHQ8dGQ+e2Ake2ZpcnN0RW5lbXlUb3dlclBlcmNlbnRhZ2V9JWB9PC90ZD5cblx0XHRcdFx0PC90cj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBvc2l0aW9ucztcblx0fVxuXG5cdHJlbmRlckNpcmNsZVN0YXRzKCkge1xuXHRcdGlmKCF0aGlzLnByb3BzLnRlYW0xIHx8ICF0aGlzLnByb3BzLnRlYW0yKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxoMj5GaXJzdCBCbG9vZDo8L2gyPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbiAgbWF0Y2hlc19fY29sdW1uLS1oYWxmICBuby1icmVha1wiPlxuXG5cdFx0XHRcdFx0XHRcdDxoMz57dGhpcy5wcm9wcy50ZWFtMX08L2gzPlxuXG5cdFx0XHRcdFx0XHRcdDxTdGF0Q2lyY2xlXG5cdFx0XHRcdFx0XHRcdFx0Ymx1ZT17dGhpcy5zdGF0cy5ibHVlRkIodGhpcy5wcm9wcy50ZWFtMSl9XG5cdFx0XHRcdFx0XHRcdFx0cmVkPXt0aGlzLnN0YXRzLnJlZEZCKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdGZiVGV4dD17YCR7dGhpcy5zdGF0cy5GQih0aGlzLnByb3BzLnRlYW0xKX0lYH1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblx0XHRcdFx0XHRcdFx0PGgzPnt0aGlzLnByb3BzLnRlYW0yfTwvaDM+XG5cblx0XHRcdFx0XHRcdFx0PFN0YXRDaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRibHVlPXt0aGlzLnN0YXRzLmJsdWVGQih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkRkIodGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLkZCKHRoaXMucHJvcHMudGVhbTIpfSVgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0PGgyPkZpcnN0IERyYWdvbjo8L2gyPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbiAgbWF0Y2hlc19fY29sdW1uLS1oYWxmICBuby1icmVha1wiPlxuXG5cdFx0XHRcdFx0XHRcdDxoMz57dGhpcy5wcm9wcy50ZWFtMX08L2gzPlxuXG5cdFx0XHRcdFx0XHRcdDxTdGF0Q2lyY2xlXG5cdFx0XHRcdFx0XHRcdFx0Ymx1ZT17dGhpcy5zdGF0cy5ibHVlRHJhZ29uKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdHJlZD17dGhpcy5zdGF0cy5yZWREcmFnb24odGhpcy5wcm9wcy50ZWFtMSl9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLkRyYWdvbih0aGlzLnByb3BzLnRlYW0xKX0lYH1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblxuXHRcdFx0XHRcdFx0XHQ8aDM+e3RoaXMucHJvcHMudGVhbTJ9PC9oMz5cblxuXHRcdFx0XHRcdFx0XHQ8U3RhdENpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdGJsdWU9e3RoaXMuc3RhdHMuYmx1ZURyYWdvbih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkRHJhZ29uKHRoaXMucHJvcHMudGVhbTIpfVxuXHRcdFx0XHRcdFx0XHRcdGZiVGV4dD17YCR7dGhpcy5zdGF0cy5EcmFnb24odGhpcy5wcm9wcy50ZWFtMil9JWB9XG5cdFx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cblx0XHRcdFx0XHQ8aDI+Rmlyc3QgVG93ZXI6PC9oMj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblxuXHRcdFx0XHRcdFx0XHQ8aDM+e3RoaXMucHJvcHMudGVhbTF9PC9oMz5cblxuXHRcdFx0XHRcdFx0XHQ8U3RhdENpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdGJsdWU9e3RoaXMuc3RhdHMuYmx1ZVRvd2VyKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdHJlZD17dGhpcy5zdGF0cy5yZWRUb3dlcih0aGlzLnByb3BzLnRlYW0xKX1cblx0XHRcdFx0XHRcdFx0XHRmYlRleHQ9e2Ake3RoaXMuc3RhdHMuVG93ZXIodGhpcy5wcm9wcy50ZWFtMSl9JWB9XG5cdFx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWF0Y2hlc19fY29sdW1uICBtYXRjaGVzX19jb2x1bW4tLWhhbGYgIG5vLWJyZWFrXCI+XG5cblx0XHRcdFx0XHRcdFx0PGgzPnt0aGlzLnByb3BzLnRlYW0yfTwvaDM+XG5cblx0XHRcdFx0XHRcdFx0PFN0YXRDaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRibHVlPXt0aGlzLnN0YXRzLmJsdWVUb3dlcih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkVG93ZXIodGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLlRvd2VyKHRoaXMucHJvcHMudGVhbTIpfSVgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclBsYXllclN0YXRzKCkge1xuXHRcdGlmKCF0aGlzLnByb3BzLnRlYW0xIHx8ICF0aGlzLnByb3BzLnRlYW0yKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgYmRyLXJpZ2h0XCI+XG5cblx0XHRcdFx0XHRcdFx0e3RoaXMuZ2V0UGxheWVyRkJTdGF0cyh0aGlzLnByb3BzLnRlYW0xKX1cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZlwiPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5nZXRQbGF5ZXJGQlN0YXRzKHRoaXMucHJvcHMudGVhbTIpfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0e3RoaXMuZ2V0RHJhZ29uU3RhdHMoKX1cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiBiZHItcmlnaHRcIj5cblxuXHRcdFx0XHRcdFx0XHR7dGhpcy5nZXRQb3NpdGlvblRvd2VyU3RhdHModGhpcy5wcm9wcy50ZWFtMSl9XHRcdFx0XHRcdFx0XHRcblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZlwiPlxuXG5cdFx0XHRcdFx0XHRcdHt0aGlzLmdldFBvc2l0aW9uVG93ZXJTdGF0cyh0aGlzLnByb3BzLnRlYW0yKX1cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXY+eyB0aGlzLnJlbmRlckNpcmNsZVN0YXRzKCkgfTwvZGl2PlxuXHRcdFx0XHQ8ZGl2PnsgdGhpcy5yZW5kZXJQbGF5ZXJTdGF0cygpIH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cdFxufVxuXG5leHBvcnQgZGVmYXVsdCBUZWFtU3RhdHMiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBNYXRjaEVsZW1lbnRzIGZyb20gJy4vTWF0Y2hFbGVtZW50cyc7XG5pbXBvcnQgVGVhbVN0YXRzIGZyb20gJy4vVGVhbVN0YXRzJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUmVnaW9uOiBzdG9yZS5jb25maWcuYWN0aXZlUmVnaW9uLFxuICAgICAgICByZWdpb25EYXRhOiBzdG9yZS5yZWdpb25zLnJlZ2lvbkRhdGEsXG4gICAgICAgIHRlYW0xOiBzdG9yZS5jb25maWcudGVhbTEsXG4gICAgICAgIHRlYW0yOiBzdG9yZS5jb25maWcudGVhbTIsXG4gICAgfVxufSlcbmNsYXNzIE1hdGNoVXAgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHVwZGF0ZVJlZ2lvbihlKSB7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiAnVVBEQVRFX1JFR0lPTicsXG5cdFx0XHRwYXlsb2FkOiBmZXRjaChgL2FwaS8ke2UudGFyZ2V0LnZhbHVlfS9saWdodC5qc29uYCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0fSk7XG5cblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6ICdVUERBVEVfUkVHSU9OX1NUQVRTJyxcblx0XHRcdHBheWxvYWQ6IGZldGNoKGAvYXBpLyR7ZS50YXJnZXQudmFsdWV9L3N0YXRzLmpzb25gKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHR9KTtcblxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9SRUdJT05fVEVYVCcsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlVGVhbTEoZSkge1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9URUFNMScsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlVGVhbTIoZSkge1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9URUFNMicsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VGVhbXMoKSB7XG5cdFx0aWYodGhpcy5wcm9wcy5yZWdpb25EYXRhKSB7XG5cdFx0XHRsZXQgdGVhbXMgPSBbXTtcblx0XHRcdGxldCBvcHRpb25zID0gW107XG5cdFx0XHRBcnJheS5mcm9tKHRoaXMucHJvcHMucmVnaW9uRGF0YSwgKGdhbWUpID0+IHtcblx0XHRcdFx0Y29uc3QgdGVhbTEgPSBnYW1lWyd0ZWFtTmFtZXMnXVswXTtcblx0XHRcdFx0Y29uc3QgdGVhbTIgPSBnYW1lWyd0ZWFtTmFtZXMnXVsxXTtcblxuXHRcdFx0XHRpZighdGVhbXMuaW5jbHVkZXModGVhbTEpKSB7XG5cdFx0XHRcdFx0dGVhbXMucHVzaCh0ZWFtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXRlYW1zLmluY2x1ZGVzKHRlYW0yKSkge1xuXHRcdFx0XHRcdHRlYW1zLnB1c2godGVhbTIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGVhbXMuc29ydCgpO1xuXG5cdFx0XHRBcnJheS5mcm9tKHRlYW1zLCAodGVhbSkgPT4ge1xuXHRcdFx0XHRvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17dGVhbX0+e3RlYW19PC9vcHRpb24+KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZW5kZXJSZWdpb25zKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8c2VsZWN0IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVSZWdpb24oZSl9IHZhbHVlPXt0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbn0+XG5cdFx0XHRcdFx0PG9wdGlvbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZT1cIlwiPlNlbGVjdCBSZWdpb248L29wdGlvbj5cblx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPSdMQ0snPkxDSzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J0NCTE9MJz5DQkxPTDwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J0VVTENTJz5FVUxDUzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J05BTENTJz5OQUxDUzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J1RDTCc+VENMPC9vcHRpb24+XG5cdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT0nTE1TJz5MTVM8L29wdGlvbj5cblx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPSdPUEwnPk9QTDwvb3B0aW9uPlxuXHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJUZWFtcygpIHtcblx0XHRjb25zdCB0ZWFtcyA9IHRoaXMuZ2V0VGVhbXMoKTtcblx0XHRpZih0ZWFtcykge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c2VsZWN0XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVRlYW0xKGUpfSBcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy50ZWFtMSA/IHRoaXMucHJvcHMudGVhbTEgOiAnc2VsZWN0J30+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIHZhbHVlPSdzZWxlY3QnPlNlbGVjdCBUZWFtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHR7dGVhbXN9XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdFx0PHNlbGVjdFxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVUZWFtMihlKX1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy50ZWFtMiA/IHRoaXMucHJvcHMudGVhbTIgOiAnc2VsZWN0J30+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIHZhbHVlPSdzZWxlY3QnPlNlbGVjdCBUZWFtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHR7dGVhbXN9XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c2VsZWN0IGRpc2FibGVkPjwvc2VsZWN0PlxuXHRcdFx0XHRcdDxzZWxlY3QgZGlzYWJsZWQ+PC9zZWxlY3Q+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJNYXRjaHVwKCkge1xuXHRcdGlmKHRoaXMucHJvcHMudGVhbTEgJiYgdGhpcy5wcm9wcy50ZWFtMikge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PE1hdGNoRWxlbWVudHMgdGVhbTE9e3RoaXMucHJvcHMudGVhbTF9IHRlYW0yPXt0aGlzLnByb3BzLnRlYW0yfSBnYW1lcz17dGhpcy5wcm9wcy5yZWdpb25EYXRhfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJTdGF0cygpIHtcblx0XHRpZih0aGlzLnByb3BzLnRlYW0xICYmIHRoaXMucHJvcHMudGVhbTIpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxUZWFtU3RhdHMgdGVhbTE9e3RoaXMucHJvcHMudGVhbTF9IHRlYW0yPXt0aGlzLnByb3BzLnRlYW0yfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19zZWxlY3RzXCI+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHsgdGhpcy5yZW5kZXJSZWdpb25zKCkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJUZWFtcygpIH1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyU3RhdHMoKSB9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlck1hdGNodXAoKSB9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWF0Y2hVcDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGVhbTE6IHN0b3JlLmNvbmZpZy50ZWFtMSxcbiAgICAgICAgdGVhbTI6IHN0b3JlLmNvbmZpZy50ZWFtMixcbiAgICB9XG59KVxuXG5jbGFzcyBNYXRjaEVsZW1lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICBoYW5kbGVDYXJkQ2xpY2soKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1VQREFURV9URUFNUycsXG4gICAgICAgICAgICB0ZWFtMTogdGhpcy5wcm9wcy5tYXRjaC50ZWFtMWFjcm8sXG4gICAgICAgICAgICB0ZWFtMjogdGhpcy5wcm9wcy5tYXRjaC50ZWFtMmFjcm8sXG4gICAgICAgICAgICByZWdpb246IHRoaXMucHJvcHMubWF0Y2gucmVnaW9uXG4gICAgICAgIH0pXG4gICAgfVxuIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0Y2gtY2FyZFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2FyZENsaWNrLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0Y2gtY2FyZF9fbGVhZ3VlXCI+e3RoaXMucHJvcHMubWF0Y2gucmVnaW9ufTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0Y2gtY2FyZF9fdGVhbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMubWF0Y2gudGVhbTFhY3JvfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+dnM8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnByb3BzLm1hdGNoLnRlYW0yYWNyb308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXRjaC1jYXJkX190aW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnRpbWV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYXRjaEVsZW1lbnQ7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBNYXRjaEVsZW1lbnQgZnJvbSAnLi9NYXRjaEVsZW1lbnQnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkaW5nOiBzdG9yZS5tYXRjaGVzLmxvYWRpbmcsXG4gICAgICAgIG1hdGNoZXM6IHN0b3JlLm1hdGNoZXMubWF0Y2hlcyxcbiAgICB9XG59KVxuY2xhc3MgTWF0Y2hlcyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICAvLyBzZXQgaW5pdGlhbCB0aW1lOlxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmV0Y2hNYXRjaGVzKCk7XG4gICAgfVxuXG4gICAgZmV0Y2hNYXRjaGVzKCkge1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ0dFVF9NQVRDSEVTJyxcblx0XHRcdHBheWxvYWQ6IGZldGNoKGAvYXBpL3NjaGVkdWxlLmpzb25gKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHR9KTtcbiAgICB9XG4gXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIHVwZGF0ZSB0aW1lIGV2ZXJ5IHNlY29uZFxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfVxuIFxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICAvLyBzdG9wIHdoZW4gbm90IHJlbmRlcmFibGVcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICB9XG5cbiAgICBnZXRUaW1lRGlmZmVyZW5jZSh0aW1lMSwgdGltZTIpIHtcbiAgICAgICAgaWYodGltZTEgPiB0aW1lMikge1xuICAgICAgICAgICAgbGV0IGRpZmZlcmVuY2UgPSB0aW1lMSAtIHRpbWUyO1xuICAgICAgICAgICAgY29uc3QgZGF5cyA9IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvICgzNjAwKjI0KSk7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWREYXlzID0gKFwiMFwiICsgZGF5cykuc2xpY2UoLTIpO1xuICAgICAgICAgICAgZGlmZmVyZW5jZSAgLT0gZGF5cyozNjAwKjI0O1xuICAgICAgICAgICAgY29uc3QgaHJzICAgPSBNYXRoLmZsb29yKGRpZmZlcmVuY2UgLyAzNjAwKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZEhycyA9IChcIjBcIiArIGhycykuc2xpY2UoLTIpO1xuICAgICAgICAgICAgZGlmZmVyZW5jZSAgLT0gaHJzKjM2MDA7XG4gICAgICAgICAgICBjb25zdCBtbnRzID0gTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gNjApO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTW50cyA9IChcIjBcIiArIG1udHMpLnNsaWNlKC0yKTtcbiAgICAgICAgICAgIGRpZmZlcmVuY2UgIC09IG1udHMqNjA7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcihkaWZmZXJlbmNlKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZHMgPSAoXCIwXCIgKyBzZWNvbmRzKS5zbGljZSgtMik7XG4gICAgICAgICAgICByZXR1cm4gYCR7Zm9ybWF0dGVkRGF5c306JHtmb3JtYXR0ZWRIcnN9OiR7Zm9ybWF0dGVkTW50c306JHtmb3JtYXR0ZWRTZWNvbmRzfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJzAwOjAwOjAwOjAwJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE5leHRNYXRjaGVzKGNvdW50ID0gMTApIHtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0xvYWRpbmcnO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMucHJvcHMubWF0Y2hlcykge1xuICAgICAgICAgICAgbGV0IG1hdGNoRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb3VudDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMucHJvcHMubWF0Y2hlcy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaEVsZW1lbnRzLnB1c2goPE1hdGNoRWxlbWVudCBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0gbWF0Y2g9e3RoaXMucHJvcHMubWF0Y2hlc1tpbmRleF19IHRpbWU9e3RoaXMuZ2V0VGltZURpZmZlcmVuY2UodGhpcy5wcm9wcy5tYXRjaGVzW2luZGV4XS5kYXRldGltZSwgdGhpcy5zdGF0ZS50aW1lKX0vPik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoRWxlbWVudHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiBcbiAgICByZW5kZXIocHJvcHMsIHN0YXRlKSB7XG4gICAgICAgIHJldHVybiA8c3Bhbj57IHRoaXMuZ2V0TmV4dE1hdGNoZXMoMTApIH08L3NwYW4+O1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYXRjaGVzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuY2xhc3MgTmF2QmFyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRnZXRMaW5rcygpIHtcblx0XHRsZXQgb3B0aW9ucyA9IHtcblx0XHRcdG1hdGNoVXAgOiAnTWF0Y2ggVXAnLFxuXHRcdFx0Y2hhbXBzIDogJ0NoYW1wcycsXG5cdFx0fVxuXHRcdGxldCBsaW5rcyA9IFtdXG5cblx0XHRmb3IgKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG5cdFx0XHRsaW5rcy5wdXNoKDxsaSBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLnVwZGF0ZUFwcFR5cGUob3B0aW9uKX0+e29wdGlvbnNbb3B0aW9uXX08L2xpPik7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5rcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PHVsPlxuXHRcdFx0XHR7dGhpcy5nZXRMaW5rcygpIH1cblx0XHRcdDwvdWw+XG5cdFx0KTtcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhcjsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWcoc3RhdGUgPSBbXSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblx0Y2FzZSAnVVBEQVRFX1JFR0lPTl9URVhUJzpcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRhY3RpdmVSZWdpb24gOiBhY3Rpb24udGV4dCxcblx0XHRcdHRlYW0xIDogZmFsc2UsXG5cdFx0XHR0ZWFtMiA6IGZhbHNlLFxuXHRcdH1cblx0Y2FzZSAnVVBEQVRFX1RFQU0xJzpcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUsXG5cdFx0XHR0ZWFtMSA6IGFjdGlvbi50ZXh0XG5cdFx0fVxuXHRjYXNlICdVUERBVEVfVEVBTTInOlxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5zdGF0ZSxcblx0XHRcdHRlYW0yIDogYWN0aW9uLnRleHRcblx0XHR9XG5cblx0Y2FzZSAnVVBEQVRFX1RFQU1TJzpcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUsXG5cdFx0XHR0ZWFtMTogYWN0aW9uLnRlYW0xLFxuXHRcdFx0dGVhbTI6IGFjdGlvbi50ZWFtMixcblx0XHRcdGFjdGl2ZVJlZ2lvbjogYWN0aW9uLnJlZ2lvblxuXHRcdH1cblxuXHRkZWZhdWx0OlxuXHRcdHJldHVybiBzdGF0ZVxuXHR9XG59XG4iLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCByZWdpb25zIGZyb20gJy4vcmVnaW9ucydcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgbWF0Y2hlcyBmcm9tICcuL21hdGNoZXMnXG5pbXBvcnQgc3RhdHMgZnJvbSAnLi9zdGF0cydcblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcblx0cmVnaW9ucyxcblx0Y29uZmlnLFxuXHRtYXRjaGVzLFxuXHRzdGF0c1xufSlcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hdGNoZXMoc3RhdGUgPSBbXSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSAnR0VUX01BVENIRVNfUEVORElORyc6XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgY2FzZSAnR0VUX01BVENIRVNfRlVMRklMTEVEJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgbG9hZGluZyA6IGZhbHNlLFxuICAgICAgICAgICAgICBtYXRjaGVzOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgICAgIH1cbiAgXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgfVxuICB9XG4gICIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lvbnMoc3RhdGUgPSBbXSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgXHRjYXNlICdVUERBVEVfUkVHSU9OX1BFTkRJTkcnOlxuICBcdFx0cmV0dXJuIHtcbiAgXHRcdFx0Li4uc3RhdGUsXG4gIFx0XHRcdHJlZ2lvbkxvYWRpbmc6IHRydWUsXG4gIFx0XHR9XG5cdGNhc2UgJ1VQREFURV9SRUdJT05fRlVMRklMTEVEJzpcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRyZWdpb25EYXRhIDogYWN0aW9uLnBheWxvYWQsXG5cdFx0XHRyZWdpb25Mb2FkaW5nOiBmYWxzZVxuXHRcdH1cblx0Y2FzZSAnVVBEQVRFX1JFR0lPTl9TVEFUU19QRU5ESU5HJzpcbiAgXHRcdHJldHVybiB7XG4gIFx0XHRcdC4uLnN0YXRlLFxuICBcdFx0XHRzdGF0c0xvYWRpbmc6IHRydWUsXG4gIFx0XHR9XG5cdGNhc2UgJ1VQREFURV9SRUdJT05fU1RBVFNfRlVMRklMTEVEJzpcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRyZWdpb25TdGF0cyA6IGFjdGlvbi5wYXlsb2FkLFxuXHRcdFx0c3RhdHNMb2FkaW5nOiBmYWxzZVxuXHRcdH1cblxuXHRkZWZhdWx0OlxuXHRcdHJldHVybiBzdGF0ZVxuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdGF0cyhzdGF0ZSA9IHtsb2FkaW5nOiAwfSwgYWN0aW9uKSB7XG5cdHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcblx0XHRjYXNlICdGRVRDSF9TVEFUU19QRU5ESU5HJzpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRsb2FkaW5nOiBzdGF0ZS5sb2FkaW5nICsgMSxcblx0XHRcdH1cblx0XHRjYXNlICdGRVRDSF9TVEFUU19GVUxGSUxMRUQnOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdGxvYWRpbmc6IHN0YXRlLmxvYWRpbmcgLSAxLFxuXHRcdFx0XHRzdGF0cyA6IHtcblx0XHRcdFx0XHQuLi5zdGF0ZS5zdGF0cyxcblx0XHRcdFx0XHRbYWN0aW9uLm1ldGFdIDogYWN0aW9uLnBheWxvYWRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Y2FzZSAnU0VUX0FMTF9QQVRDSEVTJzpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRhY3RpdmVQYXRjaGVzOiBhY3Rpb24ucGF0Y2hlc1xuXHRcdFx0fVxuXG5cdFx0Y2FzZSAnU0VUX0FMTF9SRUdJT05TJzpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRhY3RpdmVSZWdpb25zOiBhY3Rpb24ucmVnaW9uc1xuXHRcdFx0fVxuXG5cdFx0Y2FzZSAnU0VUX0FMTF9WQVJJQUJMRVMnOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdGFjdGl2ZVZhcmlhYmxlczogYWN0aW9uLnZhcmlhYmxlc1xuXHRcdFx0fVxuXG5cdFx0Y2FzZSAnU0VUX01JTlBMQVlFRCc6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0bWluUGxheWVkOiBhY3Rpb24ubWluUGxheWVkXG5cdFx0XHR9XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fVxufVxuIiwiaW1wb3J0IHsgYXBwbHlNaWRkbGV3YXJlLCBjcmVhdGVTdG9yZSB9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQgdGh1bmsgZnJvbSBcInJlZHV4LXRodW5rXCJcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcbmltcG9ydCByZWR1eFByb21pc2VNaWRkbGV3YXJlIGZyb20gXCJyZWR1eC1wcm9taXNlLW1pZGRsZXdhcmVcIlxuaW1wb3J0IHJlZHVjZXIgZnJvbSBcIi4vaW5kZXhcIlxuXG5jb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHJlZHV4UHJvbWlzZU1pZGRsZXdhcmUoKSwgY3JlYXRlTG9nZ2VyKCkpXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIG1pZGRsZXdhcmUpIiwiaW1wb3J0IExlYWd1ZVJlYWN0QXBwIGZyb20gJy4vY2xhc3Nlcy9MZWFndWVSZWFjdEFwcCc7XG5pbXBvcnQgTGVhZ3VlTWF0Y2hlc0FwcCBmcm9tICcuL2NsYXNzZXMvTGVhZ3VlTWF0Y2hlc0FwcCc7XG5cblxuXG5jb25zdCBsZWFndWVBcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbGVhZ3VlLWFwcCcpO1xuaWYobGVhZ3VlQXBwKSB7XG5cdG5ldyBMZWFndWVSZWFjdEFwcChsZWFndWVBcHApO1xufVxuXG5jb25zdCBsZWFndWVNYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWxlYWd1ZS1tYXRjaGVzJyk7XG5pZihsZWFndWVNYXRjaGVzKSB7XG5cdG5ldyBMZWFndWVNYXRjaGVzQXBwKGxlYWd1ZU1hdGNoZXMpO1xufSJdfQ==
