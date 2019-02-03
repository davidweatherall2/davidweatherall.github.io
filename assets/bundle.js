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

},{"./PreactClasses/Matches":36,"preact":2}],13:[function(require,module,exports){
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

},{"./PreactClasses/MainLeagueApp":27,"preact":2}],14:[function(require,module,exports){
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

var _index5 = require('./Players/index.js');

var _index6 = _interopRequireDefault(_index5);

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

				case 'players':
					return (0, _preact.h)(_index6.default, null);
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

},{"./Champs/index.js":23,"./MatchUp/index.js":34,"./Players/index.js":38,"preact":2}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _ChampFuncs = require('./methods/ChampFuncs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calculator = (_dec = (0, _preactRedux.connect)(function (store) {
	return {
		activeVariables: store.stats.activeVariables
	};
}), _dec(_class = function (_Component) {
	_inherits(Calculator, _Component);

	function Calculator(props) {
		_classCallCheck(this, Calculator);

		var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

		_this.setState({
			activeChamps: ['', '', '', '', '', '', '', '', '', '']
		});
		return _this;
	}

	_createClass(Calculator, [{
		key: 'handleChange',
		value: function handleChange(e, i) {
			var activeChamps = Object.assign([], this.state.activeChamps);
			activeChamps[i] = e.target.value;
			this.setState({
				activeChamps: activeChamps
			});
		}
	}, {
		key: 'checkChamps',
		value: function checkChamps() {
			var champsArray = this.props.champsArray;
			if (this.state.champsArray !== champsArray) {
				var champsList = [];
				var champsObject = {};
				Array.from(champsArray, function (champ) {
					champsList.push({
						name: (0, _ChampFuncs.idToChamp)(champ.id),
						id: champ.id
					});
					champsObject[champ.id] = champ;
				});
				this.setState({
					champsArray: champsArray,
					champsList: champsList,
					champsObject: champsObject
				});
			}
		}
	}, {
		key: 'renderChampSelector',
		value: function renderChampSelector(i) {
			var _this2 = this;

			var champOptions = [];
			Array.from(this.state.champsList, function (champ) {
				champOptions.push((0, _preact.h)(
					'option',
					{ value: champ.id },
					champ.name
				));
			});
			return (0, _preact.h)(
				'div',
				{ className: 'calculator__champ-holder' },
				(0, _preact.h)(
					'select',
					{ value: this.state.activeChamps[i], onChange: function onChange(e) {
							_this2.handleChange(e, i);
						} },
					(0, _preact.h)('option', { value: '' }),
					champOptions
				),
				this.getChampStats(this.state.activeChamps[i])
			);
		}
	}, {
		key: 'renderChampSelection',
		value: function renderChampSelection() {
			this.checkChamps();
			var i = 0;
			var champCells = [];
			while (i < 10) {
				champCells.push(this.renderChampSelector(i));
				i++;
			}
			return (0, _preact.h)(
				'div',
				{ className: 'calculator__champs' },
				champCells
			);
		}
	}, {
		key: 'getPercentage',
		value: function getPercentage(a, b) {
			var percentage = a / b * 100;
			return Math.floor(percentage) + '%';
		}
	}, {
		key: 'getVariableStat',
		value: function getVariableStat(champId, variable) {
			var champ = this.state.champsObject[champId];
			if (variable.type === 'percent') {
				return this.getPercentage(champ[variable.statName], champ.played);
			}
			if (variable.type === 'value') {
				return champ[variable.statName];
			}
		}
	}, {
		key: 'getSingleStat',
		value: function getSingleStat(variable, champId) {
			var modifier = '';
			var gamesPlayed = this.state.champsObject[champId].played;
			var stat = this.getVariableStat(champId, variable);
			console.log('variable is ', variable);
			console.log('variable average is ', variable.average);
			if (variable.average && variable.type === 'percent' && gamesPlayed > 10) {
				var statInt = Number.parseInt(stat);
				console.log('got here');
				if (statInt > variable.average + 5) {
					modifier = 'high';
				}
				if (statInt < variable.average - 5) {
					modifier = 'low';
				}
			}
			return (0, _preact.h)(
				'span',
				{ className: 'stat  stat--' + modifier },
				variable.friendlyName,
				': ',
				stat
			);
		}
	}, {
		key: 'getChampStats',
		value: function getChampStats(champId) {
			var _this3 = this;

			var champStats = [];
			if (this.state.champsObject && this.state.champsObject[champId]) {
				Array.from(this.props.activeVariables, function (variable) {
					champStats.push((0, _preact.h)(
						'li',
						null,
						_this3.getSingleStat(variable, champId)
					));
				});
			} else {
				champStats.push((0, _preact.h)(
					'li',
					null,
					'No stats found'
				));
			}
			return (0, _preact.h)(
				'ul',
				{ className: 'calculator__list' },
				champStats
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return (0, _preact.h)(
				'div',
				null,
				this.renderChampSelection()
			);
		}
	}]);

	return Calculator;
}(_preact.Component)) || _class);
exports.default = Calculator;

},{"./methods/ChampFuncs":24,"preact":2,"preact-redux":1}],16:[function(require,module,exports){
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

var Patches = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activePatches: store.stats.activePatches
    };
}), _dec(_class = function (_Component) {
    _inherits(Patches, _Component);

    function Patches(props) {
        _classCallCheck(this, Patches);

        var _this = _possibleConstructorReturn(this, (Patches.__proto__ || Object.getPrototypeOf(Patches)).call(this, props));

        if (window.localStorage.patches) {
            _this.setLocalPatches();
        } else {
            _this.setDefaultPatches();
        }
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
        key: 'setLocalPatches',
        value: function setLocalPatches() {
            this.props.dispatch({
                type: 'SET_ALL_PATCHES',
                patches: window.localStorage.patches
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
            window.localStorage.patches = activePatches;
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

},{"preact":2,"preact-redux":1}],18:[function(require,module,exports){
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

},{"preact":2,"preact-redux":1}],19:[function(require,module,exports){
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

var _Calculator = require('./Calculator');

var _Calculator2 = _interopRequireDefault(_Calculator);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

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
            activePatches: _this.props.activePatches,
            active: 'table'
        });
        _this.statsClass = new _Stats2.default(_this.props.stats);
        _this.calculateStats();
        return _this;
    }

    _createClass(StatsBlock, [{
        key: 'setDefaultOrder',
        value: function setDefaultOrder() {
            if (!this.statsClass.isDefaultOrder()) {
                this.statsClass.setDefaultOrder();
                this.calculateStats();
            }
        }
    }, {
        key: 'calculateStats',
        value: function calculateStats() {
            this.statsClass.setStates(this.state.activeRegions, this.state.activePatches);
            this.statsClass.calculate();
            this.setState({
                champs: this.statsClass.getChamps()
            });
        }
    }, {
        key: 'renderSwitcher',
        value: function renderSwitcher() {
            var _this2 = this;

            return (0, _preact.h)(
                'div',
                { className: 'table__choices' },
                (0, _preact.h)(
                    'a',
                    { onClick: function onClick() {
                            _this2.setState({ active: 'table' });
                        } },
                    'Table'
                ),
                (0, _preact.h)(
                    'a',
                    { onClick: function onClick() {
                            _this2.setState({ active: 'calculator' });
                        } },
                    'Calculator'
                )
            );
        }
    }, {
        key: 'getOrderVariable',
        value: function getOrderVariable() {
            return this.statsClass.getOrderVariable();
        }
    }, {
        key: 'setOrder',
        value: function setOrder(variable) {
            this.statsClass.setOrder(variable);
            this.calculateStats();
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            switch (this.state.active) {
                case 'table':
                    return (0, _preact.h)(_Table2.default, { setOrder: this.setOrder.bind(this), getOrderVariable: this.getOrderVariable.bind(this), champsArray: this.state.champs });
                case 'calculator':
                    this.setDefaultOrder();
                    return (0, _preact.h)(_Calculator2.default, { champsArray: this.state.champs });
                default:
                    return '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return (0, _preact.h)(
                'div',
                null,
                this.renderSwitcher(),
                this.renderContent()
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
            }
        }
    }]);

    return StatsBlock;
}(_preact.Component)) || _class);
exports.default = StatsBlock;

},{"./Calculator":15,"./Table":20,"./methods/ChampFuncs":24,"./methods/Stats":26,"preact":2,"preact-redux":1}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _preact = require('preact');

var _preactRedux = require('preact-redux');

var _ChampFuncs = require('./methods/ChampFuncs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = (_dec = (0, _preactRedux.connect)(function (store) {
    return {
        activeVariables: store.stats.activeVariables,
        minPlayed: store.stats.minPlayed
    };
}), _dec(_class = function (_Component) {
    _inherits(Table, _Component);

    function Table(props) {
        _classCallCheck(this, Table);

        return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));
    }

    _createClass(Table, [{
        key: 'getPercentage',
        value: function getPercentage(a, b) {
            var percentage = a / b * 100;
            return Math.floor(percentage) + '%';
        }
    }, {
        key: 'setActiveColumn',
        value: function setActiveColumn(variable) {
            this.props.setOrder(variable);
        }
    }, {
        key: 'isColumnActive',
        value: function isColumnActive(variable) {
            if (variable.statName === this.props.getOrderVariable()) {
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

            if (this.props.champsArray) {
                var firstArray = [];
                Array.from(this.props.champsArray, function (champ) {
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
    }]);

    return Table;
}(_preact.Component)) || _class);
exports.default = Table;

},{"./methods/ChampFuncs":24,"preact":2,"preact-redux":1}],21:[function(require,module,exports){
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

},{"./MinPlayed":16,"./Patches":17,"./Regions":18,"./Variables":22,"./methods/Filters":25,"preact":2,"preact-redux":1}],22:[function(require,module,exports){
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

        if (window.localStorage.variables) {
            _this.setLocalVariables();
        } else {
            _this.setDefaultVariables();
        }
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
        key: 'setLocalVariables',
        value: function setLocalVariables() {
            console.log('seting local');
            this.props.dispatch({
                type: 'SET_ALL_VARIABLES',
                variables: JSON.parse(window.localStorage.variables)
            });
        }
    }, {
        key: 'isVariableActive',
        value: function isVariableActive(variable) {
            if (this.props.activeVariables) {
                console.log('checker', this.props.activeVariables.some(function (activeVariable) {
                    return activeVariable.statName === variable.statName;
                }));
            }
            if (this.props.activeVariables && this.props.activeVariables.some(function (activeVariable) {
                return activeVariable.statName === variable.statName;
            })) {
                return 'checked';
            }
            return '';
        }
    }, {
        key: 'toggleVariable',
        value: function toggleVariable(variable) {
            var activeVariables = Object.assign([], this.props.activeVariables);
            if (this.props.activeVariables.some(function (activeVariable) {
                return activeVariable.statName === variable.statName;
            })) {
                activeVariables = activeVariables.filter(function (activeVariable) {
                    return activeVariable.statName !== variable.statName;
                });
            } else {
                activeVariables.push(variable);
            }
            this.props.dispatch({
                type: 'SET_ALL_VARIABLES',
                variables: activeVariables
            });
            console.log('active vars are ', activeVariables);
            window.localStorage.variables = JSON.stringify(activeVariables);
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

},{"preact":2,"preact-redux":1}],23:[function(require,module,exports){
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
		key: 'handleResetClick',
		value: function handleResetClick() {
			var _this3 = this;

			window.localStorage.removeItem('variables');
			window.localStorage.removeItem('patches');
			window.localStorage.removeItem('regions');
			this.props.dispatch({
				type: 'RESET_CHAMPS'
			});
			this.setState({
				reset: true
			});
			setTimeout(function () {
				_this3.setState({
					reset: false
				});
			}, 1);
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.reset) {
				return (0, _preact.h)(
					'div',
					null,
					'Resetting'
				);
			}
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
					(0, _preact.h)(
						'div',
						{ className: 'mb20' },
						(0, _preact.h)(
							'a',
							{ onClick: this.handleResetClick.bind(this) },
							'Reset'
						)
					),
					(0, _preact.h)(_TopNav2.default, null),
					(0, _preact.h)(_StatsBlock2.default, null)
				);
			}
		}
	}]);

	return Champs;
}(_preact.Component)) || _class);
exports.default = Champs;

},{"./StatsBlock":19,"./TopNav":21,"preact":2,"preact-redux":1}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.idToChamp = idToChamp;
function idToChamp(id) {
    var champdict = { '145': 'KaiSa', '555': 'Pyke', '77': 'Udyr', '427': 'Ivern', '85': 'Kennen', '18': 'Tristana', '78': 'Poppy', '9': 'Fiddlesticks', '267': 'Nami', '15': 'Sivir', '19': 'Warwick', '54': 'Malphite', '164': 'Camille', '14': 'Sion', '6': 'Urgot', '61': 'Orianna', '45': 'Veigar', '44': 'Taric', '60': 'Elise', '20': 'Nunu', '106': 'Volibear', '110': 'Varus', '62': 'MonkeyKing', '161': 'Velkoz', '429': 'Kalista', '27': 'Singed', '498': 'Xayah', '83': 'Yorick', '53': 'Blitzcrank', '133': 'Quinn', '245': 'Ekko', '74': 'Heimerdinger', '57': 'Maokai', '25': 'Morgana', '163': 'Taliyah', '63': 'Brand', '107': 'Rengar', '10': 'Kayle', '41': 'Gangplank', '203': 'Kindred', '223': 'TahmKench', '127': 'Lissandra', '13': 'Ryze', '105': 'Fizz', '17': 'Teemo', '117': 'Lulu', '254': 'Vi', '34': 'Anivia', '102': 'Shyvana', '7': 'Leblanc', '92': 'Riven', '31': 'Chogath', '43': 'Karma', '222': 'Jinx', '236': 'Lucian', '39': 'Irelia', '141': 'Kayn', '86': 'Garen', '26': 'Zilean', '99': 'Lux', '4': 'TwistedFate', '58': 'Renekton', '68': 'Rumble', '134': 'Syndra', '51': 'Caitlyn', '29': 'Twitch', '421': 'RekSai', '497': 'Rakan', '240': 'Kled', '266': 'Aatrox', '111': 'Nautilus', '36': 'DrMundo', '32': 'Amumu', '113': 'Sejuani', '121': 'Khazix', '50': 'Swain', '72': 'Skarner', '126': 'Jayce', '120': 'Hecarim', '104': 'Graves', '48': 'Trundle', '143': 'Zyra', '33': 'Rammus', '268': 'Azir', '201': 'Braum', '23': 'Tryndamere', '69': 'Cassiopeia', '112': 'Viktor', '38': 'Kassadin', '89': 'Leona', '24': 'Jax', '516': 'Ornn', '131': 'Diana', '432': 'Bard', '76': 'Nidalee', '42': 'Corki', '90': 'Malzahar', '142': 'Zoe', '1': 'Annie', '119': 'Draven', '64': 'LeeSin', '8': 'Vladimir', '37': 'Sona', '114': 'Fiora', '40': 'Janna', '59': 'JarvanIV', '420': 'Illaoi', '5': 'XinZhao', '35': 'Shaco', '103': 'Ahri', '67': 'Vayne', '84': 'Akali', '202': 'Jhin', '150': 'Gnar', '91': 'Talon', '55': 'Katarina', '30': 'Karthus', '238': 'Zed', '2': 'Olaf', '28': 'Evelynn', '98': 'Shen', '16': 'Soraka', '56': 'Nocturne', '11': 'MasterYi', '122': 'Darius', '157': 'Yasuo', '96': 'KogMaw', '12': 'Alistar', '412': 'Thresh', '82': 'Mordekaiser', '115': 'Ziggs', '81': 'Ezreal', '101': 'Xerath', '79': 'Gragas', '75': 'Nasus', '21': 'MissFortune', '136': 'AurelionSol', '22': 'Ashe', '80': 'Pantheon', '3': 'Galio', '154': 'Zac' };
    return champdict[id];
}

},{}],25:[function(require,module,exports){
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
            return [{ statName: 'fbTeam', friendlyName: 'First Blood Team', type: 'percent', defaultOrder: 'desc', average: 50 }, { statName: 'fbKiller', friendlyName: 'First Blood Killer', type: 'percent', defaultOrder: 'desc', average: 10 }, { statName: 'fbAssist', friendlyName: 'First Blood Assist', type: 'percent', defaultOrder: 'desc', average: false }, { statName: 'fbInvolved', friendlyName: 'FB Involvement', type: 'percent', defaultOrder: 'desc', average: false }, { statName: 'firstDeath', friendlyName: 'First Death', type: 'percent', defaultOrder: 'desc', average: 10 }, { statName: 'ftTeam', friendlyName: 'First Tower Team', type: 'percent', defaultOrder: 'desc', average: 50 }, { statName: 'ftKiller', friendlyName: 'First Tower Killer', type: 'percent', defaultOrder: 'desc', average: false }, { statName: 'fdTeam', friendlyName: 'First Dragon Team', type: 'percent', defaultOrder: 'desc', average: 50 }, { statName: 'played', friendlyName: 'Games Played', type: 'value', defaultOrder: 'desc' }, { statName: 'win', friendlyName: 'Win', type: 'percent', defaultOrder: 'desc', average: 50 }];
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

},{}],26:[function(require,module,exports){
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
        this.setDefaultOrder();
    }

    _createClass(Stats, [{
        key: 'isDefaultOrder',
        value: function isDefaultOrder() {
            return this.orderBy === 'alphabetically' && this.orderByVariable === 'alphabetically' && this.orderDirection === 'asc';
        }
    }, {
        key: 'setDefaultOrder',
        value: function setDefaultOrder() {
            this.orderBy = 'alphabetically';
            this.orderByVariable = 'alphabetically';
            this.orderDirection = 'asc';
            this.orderChamps();
        }
    }, {
        key: 'setStates',
        value: function setStates(regions, patches) {
            this.regions = regions;
            this.patches = patches;
        }
    }, {
        key: 'setOrder',
        value: function setOrder(variable) {
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
                if (player.firstBloodAssist || player.firstBloodKill) {
                    this.firstChampsObject[champId]['fbInvolved']++;
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
                win: 0,
                fbInvolved: 0
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

},{"./ChampFuncs":24}],27:[function(require,module,exports){
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
		if (window.localStorage.appType) {
			_this.state = {
				appType: window.localStorage.appType
			};
		} else {
			_this.state = {
				appType: 'matchUp'
			};
		}
		return _this;
	}

	_createClass(MainLeagueApp, [{
		key: 'updateAppType',
		value: function updateAppType(type) {
			this.setState({ appType: type });
			window.localStorage.appType = type;
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

},{"./AppMain":14,"./Matches/index.js":36,"./NavBar":37,"./reducers/store":44,"preact":2,"preact-redux":1,"redux":9}],28:[function(require,module,exports){
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
		key: 'getResult',
		value: function getResult() {
			if (this.getIndex() !== false) {
				if (this.props.game.win == this.getIndex()) {
					return (0, _preact.h)(
						'div',
						{ className: 'matches__result  matches__result--win' },
						'WIN'
					);
				} else {
					return (0, _preact.h)(
						'div',
						{ className: 'matches__result  matches__result--lose' },
						'LOSE'
					);
				}
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
				{ className: 'matches__column' },
				(0, _preact.h)(
					'div',
					{ className: 'flex  flex-justify--between' },
					(0, _preact.h)('img', { className: 'card__logo', src: '/assets/img/logos/' + this.props.activeRegion + '/' + team1 + '.png' }),
					(0, _preact.h)(
						'span',
						{ className: 'card__vs' },
						'vs'
					),
					(0, _preact.h)('img', { className: 'card__logo', src: '/assets/img/logos/' + this.props.activeRegion + '/' + team2 + '.png' })
				),
				this.getResult()
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
				{ className: 'card  ' + this.getBackground(), 'data-count': this.props.count },
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

},{"./Players":30,"preact":2,"preact-redux":1}],29:[function(require,module,exports){
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

},{"./MatchCard":28,"preact":2,"preact-redux":1}],30:[function(require,module,exports){
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

},{"preact":2,"react-hint":4}],31:[function(require,module,exports){
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

},{"preact":2}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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
			positions = this.getPositionTowerStat(positions, team, 'firstBlueTowerPosition', 'firstBlueEnemyTowerPosition', 'blueMatchesPlayed', 'colour__light-blue');
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

},{"./StatCircle":31,"./StatsClass":32,"preact":2,"preact-redux":1}],34:[function(require,module,exports){
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
		key: 'renderTeamsVS',
		value: function renderTeamsVS() {
			if (this.props.team1 && this.props.team2) {
				return (0, _preact.h)(
					'div',
					null,
					this.props.team1,
					' vs ',
					this.props.team2
				);
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
					this.renderTeamsVS()
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

},{"./MatchElements":29,"./TeamStats":33,"preact":2,"preact-redux":1}],35:[function(require,module,exports){
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
                    { className: 'match-card__backgrounds' },
                    (0, _preact.h)('div', { className: 'match-card__background', style: 'background-image: url(\'/assets/img/logos/' + this.props.match.region + '/' + this.props.match.team1acro + '.png\')' }),
                    (0, _preact.h)('div', { className: 'match-card__background', style: 'background-image: url(\'/assets/img/logos/' + this.props.match.region + '/' + this.props.match.team2acro + '.png\')' })
                ),
                (0, _preact.h)(
                    'div',
                    { className: 'match-card__content' },
                    (0, _preact.h)(
                        'div',
                        { className: 'match-card__league' },
                        this.props.match.region
                    ),
                    (0, _preact.h)(
                        'div',
                        { className: 'match-card__time' },
                        this.props.time
                    )
                )
            );
        }
    }]);

    return MatchElement;
}(_preact.Component)) || _class);
exports.default = MatchElement;

},{"preact":2,"preact-redux":1}],36:[function(require,module,exports){
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
            var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

            if (this.props.loading) {
                return 'Loading';
            }
            if (this.props.matches) {
                var matchElements = [];
                var count = 0;
                for (var index = 0; index < this.props.matches.length; index++) {
                    var match = this.props.matches[index];
                    if (count < max && this.props.matches[index].datetime > this.state.time) {
                        matchElements.push((0, _preact.h)(_MatchElement2.default, { store: this.props.store, match: this.props.matches[index], time: this.getTimeDifference(this.props.matches[index].datetime, this.state.time) }));
                        count++;
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
                this.getNextMatches(25)
            );
        }
    }]);

    return Matches;
}(_preact.Component)) || _class);
exports.default = Matches;

},{"./MatchElement":35,"preact":2,"preact-redux":1}],37:[function(require,module,exports){
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
				champs: 'Champs',
				players: 'Players'
			};
			var links = [];

			var _loop = function _loop(option) {
				links.push((0, _preact.h)(
					'li',
					{ onClick: function onClick() {
							return _this2.props.updateAppType(option);
						}, className: _this2.isActive(option) ? 'is-active' : '' },
					options[option]
				));
			};

			for (var option in options) {
				_loop(option);
			}
			return links;
		}
	}, {
		key: 'isActive',
		value: function isActive(option) {
			return option === this.props.appType;
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

},{"preact":2}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

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
		key: 'render',
		value: function render() {
			return 'players';
		}
	}]);

	return AppMain;
}(_preact.Component);

exports.default = AppMain;

},{"preact":2}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{"./config":39,"./matches":41,"./regions":42,"./stats":43,"redux":9}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

		case 'RESET_STATS':
			return _extends({}, state, {
				activePatches: undefined,
				activeRegions: undefined,
				activeVariables: undefined,
				minPlayed: undefined
			});

		default:
			return state;
	}
}

},{}],44:[function(require,module,exports){
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

},{"./index":40,"redux":9,"redux-logger":5,"redux-promise-middleware":6,"redux-thunk":8}],45:[function(require,module,exports){
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

},{"./classes/LeagueMatchesApp":12,"./classes/LeagueReactApp":13}]},{},[45])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcHJlYWN0LXJlZHV4L2Rpc3QvcHJlYWN0LXJlZHV4LmpzIiwibm9kZV9tb2R1bGVzL3ByZWFjdC9kaXN0L3ByZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QtaGludC9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2Rpc3QvcmVkdXgtbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXByb21pc2UtbWlkZGxld2FyZS9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXByb21pc2UtbWlkZGxld2FyZS9kaXN0L2lzUHJvbWlzZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC10aHVuay9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL3JlZHV4LmpzIiwibm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJzcmMvanMvY2xhc3Nlcy9MZWFndWVNYXRjaGVzQXBwLmpzIiwic3JjL2pzL2NsYXNzZXMvTGVhZ3VlUmVhY3RBcHAuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0FwcE1haW4uanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9DYWxjdWxhdG9yLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9DaGFtcHMvTWluUGxheWVkLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9DaGFtcHMvUGF0Y2hlcy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL1JlZ2lvbnMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9TdGF0c0Jsb2NrLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9DaGFtcHMvVGFibGUuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9Ub3BOYXYuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9WYXJpYWJsZXMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL0NoYW1wcy9pbmRleC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvQ2hhbXBGdW5jcy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvRmlsdGVycy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvQ2hhbXBzL21ldGhvZHMvU3RhdHMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01haW5MZWFndWVBcHAuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvTWF0Y2hDYXJkLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL01hdGNoRWxlbWVudHMuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvUGxheWVycy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTWF0Y2hVcC9TdGF0Q2lyY2xlLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL1N0YXRzQ2xhc3MuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL01hdGNoVXAvVGVhbVN0YXRzLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaFVwL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9NYXRjaGVzL01hdGNoRWxlbWVudC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTWF0Y2hlcy9pbmRleC5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvTmF2QmFyLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9QbGF5ZXJzL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9jb25maWcuanMiLCJzcmMvanMvY2xhc3Nlcy9QcmVhY3RDbGFzc2VzL3JlZHVjZXJzL2luZGV4LmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9tYXRjaGVzLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9yZWdpb25zLmpzIiwic3JjL2pzL2NsYXNzZXMvUHJlYWN0Q2xhc3Nlcy9yZWR1Y2Vycy9zdGF0cy5qcyIsInNyYy9qcy9jbGFzc2VzL1ByZWFjdENsYXNzZXMvcmVkdWNlcnMvc3RvcmUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdk9BO0FBQ0E7Ozs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN2bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3RCQTs7QUFDQTs7Ozs7Ozs7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QUFPO0FBRnZCOztBQUtELE9BQUssaUJBQUw7QUFDQyx1QkFDSSxLQURKO0FBRUMsbUJBQWUsT0FBTztBQUZ2Qjs7QUFLRCxPQUFLLG1CQUFMO0FBQ0MsdUJBQ0ksS0FESjtBQUVDLHFCQUFpQixPQUFPO0FBRnpCOztBQUtELE9BQUssZUFBTDtBQUNDLHVCQUNJLEtBREo7QUFFQyxlQUFXLE9BQU87QUFGbkI7O0FBS0QsT0FBSyxhQUFMO0FBQ0MsdUJBQ0ksS0FESjtBQUVDLG1CQUFlLFNBRmhCO0FBR0MsbUJBQWUsU0FIaEI7QUFJQyxxQkFBaUIsU0FKbEI7QUFLQyxlQUFXO0FBTFo7O0FBUUQ7QUFDQyxVQUFPLEtBQVA7QUFsREY7QUFvREE7Ozs7Ozs7OztBQ3JERDs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sYUFBYSw0QkFBZ0IsdUNBQWhCLEVBQTBDLGdDQUExQyxDQUFuQjs7a0JBRWUsd0JBQVksZUFBWixFQUFxQixVQUFyQixDOzs7OztBQ1JmOzs7O0FBQ0E7Ozs7OztBQUlBLElBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWxCO0FBQ0EsSUFBRyxTQUFILEVBQWM7QUFDYixLQUFJLHdCQUFKLENBQW1CLFNBQW5CO0FBQ0E7O0FBRUQsSUFBTSxnQkFBZ0IsU0FBUyxhQUFULENBQXVCLG9CQUF2QixDQUF0QjtBQUNBLElBQUcsYUFBSCxFQUFrQjtBQUNqQixLQUFJLDBCQUFKLENBQXFCLGFBQXJCO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgncHJlYWN0JyksIHJlcXVpcmUoJ3JlZHV4JykpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsncHJlYWN0JywgJ3JlZHV4J10sIGZhY3RvcnkpIDpcblx0KGdsb2JhbC5wcmVhY3RSZWR1eCA9IGZhY3RvcnkoZ2xvYmFsLnByZWFjdCxnbG9iYWwuUmVkdXgpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChwcmVhY3QscmVkdXgpIHtcblxudmFyIENoaWxkcmVuID0ge1xuXHRvbmx5OiBmdW5jdGlvbiBvbmx5KGNoaWxkcmVuKSB7XG5cdFx0cmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuWzBdIHx8IG51bGw7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIHByb3B0eXBlKCkge31cbnByb3B0eXBlLmlzUmVxdWlyZWQgPSBwcm9wdHlwZTtcblxudmFyIFByb3BUeXBlcyA9IHtcblx0ZWxlbWVudDogcHJvcHR5cGUsXG5cdGZ1bmM6IHByb3B0eXBlLFxuXHRzaGFwZTogZnVuY3Rpb24gc2hhcGUoKSB7XG5cdFx0cmV0dXJuIHByb3B0eXBlO1xuXHR9LFxuXHRpbnN0YW5jZU9mOiBmdW5jdGlvbiBpbnN0YW5jZU9mKCkge1xuXHRcdHJldHVybiBwcm9wdHlwZTtcblx0fVxufTtcblxudmFyIHN1YnNjcmlwdGlvblNoYXBlID0gUHJvcFR5cGVzLnNoYXBlKHtcbiAgdHJ5U3Vic2NyaWJlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB0cnlVbnN1YnNjcmliZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgbm90aWZ5TmVzdGVkU3ViczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaXNTdWJzY3JpYmVkOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59KTtcblxudmFyIHN0b3JlU2hhcGUgPSBQcm9wVHlwZXMuc2hhcGUoe1xuICBzdWJzY3JpYmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBnZXRTdGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufSk7XG5cbi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG5cblxuXG5cblxuXG5cblxuXG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cblxuXG5cblxuXG5cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cblxuXG52YXIgaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cblxuXG5cblxuXG5cblxudmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxudmFyIGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlID0gZmFsc2U7XG5mdW5jdGlvbiB3YXJuQWJvdXRSZWNlaXZpbmdTdG9yZSgpIHtcbiAgaWYgKGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRpZFdhcm5BYm91dFJlY2VpdmluZ1N0b3JlID0gdHJ1ZTtcblxuICB3YXJuaW5nKCc8UHJvdmlkZXI+IGRvZXMgbm90IHN1cHBvcnQgY2hhbmdpbmcgYHN0b3JlYCBvbiB0aGUgZmx5LiAnICsgJ0l0IGlzIG1vc3QgbGlrZWx5IHRoYXQgeW91IHNlZSB0aGlzIGVycm9yIGJlY2F1c2UgeW91IHVwZGF0ZWQgdG8gJyArICdSZWR1eCAyLnggYW5kIFJlYWN0IFJlZHV4IDIueCB3aGljaCBubyBsb25nZXIgaG90IHJlbG9hZCByZWR1Y2VycyAnICsgJ2F1dG9tYXRpY2FsbHkuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yZWR1eC9yZWxlYXNlcy8nICsgJ3RhZy92Mi4wLjAgZm9yIHRoZSBtaWdyYXRpb24gaW5zdHJ1Y3Rpb25zLicpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm92aWRlcigpIHtcbiAgdmFyIF9Qcm92aWRlciRjaGlsZENvbnRleDtcblxuICB2YXIgc3RvcmVLZXkgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6ICdzdG9yZSc7XG4gIHZhciBzdWJLZXkgPSBhcmd1bWVudHNbMV07XG5cbiAgdmFyIHN1YnNjcmlwdGlvbktleSA9IHN1YktleSB8fCBzdG9yZUtleSArICdTdWJzY3JpcHRpb24nO1xuXG4gIHZhciBQcm92aWRlciA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgaW5oZXJpdHMoUHJvdmlkZXIsIF9Db21wb25lbnQpO1xuXG4gICAgUHJvdmlkZXIucHJvdG90eXBlLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgIHZhciBfcmVmO1xuXG4gICAgICByZXR1cm4gX3JlZiA9IHt9LCBfcmVmW3N0b3JlS2V5XSA9IHRoaXNbc3RvcmVLZXldLCBfcmVmW3N1YnNjcmlwdGlvbktleV0gPSBudWxsLCBfcmVmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQcm92aWRlcihwcm9wcywgY29udGV4dCkge1xuICAgICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJvdmlkZXIpO1xuXG4gICAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgICBfdGhpc1tzdG9yZUtleV0gPSBwcm9wcy5zdG9yZTtcbiAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG5cbiAgICBQcm92aWRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIENoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgfTtcblxuICAgIHJldHVybiBQcm92aWRlcjtcbiAgfShwcmVhY3QuQ29tcG9uZW50KTtcblxuICB7XG4gICAgUHJvdmlkZXIucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgICBpZiAodGhpc1tzdG9yZUtleV0gIT09IG5leHRQcm9wcy5zdG9yZSkge1xuICAgICAgICB3YXJuQWJvdXRSZWNlaXZpbmdTdG9yZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBQcm92aWRlci5jaGlsZENvbnRleHRUeXBlcyA9IChfUHJvdmlkZXIkY2hpbGRDb250ZXggPSB7fSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W3N0b3JlS2V5XSA9IHN0b3JlU2hhcGUuaXNSZXF1aXJlZCwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4W3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX1Byb3ZpZGVyJGNoaWxkQ29udGV4KTtcblxuICByZXR1cm4gUHJvdmlkZXI7XG59XG5cbnZhciBQcm92aWRlciA9IGNyZWF0ZVByb3ZpZGVyKCk7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTUsIFlhaG9vISBJbmMuXG4gKiBDb3B5cmlnaHRzIGxpY2Vuc2VkIHVuZGVyIHRoZSBOZXcgQlNEIExpY2Vuc2UuIFNlZSB0aGUgYWNjb21wYW55aW5nIExJQ0VOU0UgZmlsZSBmb3IgdGVybXMuXG4gKi9cbnZhciBSRUFDVF9TVEFUSUNTID0ge1xuICAgIGNoaWxkQ29udGV4dFR5cGVzOiB0cnVlLFxuICAgIGNvbnRleHRUeXBlczogdHJ1ZSxcbiAgICBkZWZhdWx0UHJvcHM6IHRydWUsXG4gICAgZGlzcGxheU5hbWU6IHRydWUsXG4gICAgZ2V0RGVmYXVsdFByb3BzOiB0cnVlLFxuICAgIG1peGluczogdHJ1ZSxcbiAgICBwcm9wVHlwZXM6IHRydWUsXG4gICAgdHlwZTogdHJ1ZVxufTtcblxudmFyIEtOT1dOX1NUQVRJQ1MgPSB7XG4gICAgbmFtZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHRydWUsXG4gICAgcHJvdG90eXBlOiB0cnVlLFxuICAgIGNhbGxlcjogdHJ1ZSxcbiAgICBjYWxsZWU6IHRydWUsXG4gICAgYXJndW1lbnRzOiB0cnVlLFxuICAgIGFyaXR5OiB0cnVlXG59O1xuXG52YXIgZGVmaW5lUHJvcGVydHkkMSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIG9iamVjdFByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mICYmIGdldFByb3RvdHlwZU9mKE9iamVjdCk7XG5cbnZhciBob2lzdE5vblJlYWN0U3RhdGljcyA9IGZ1bmN0aW9uIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKHRhcmdldENvbXBvbmVudCwgc291cmNlQ29tcG9uZW50LCBibGFja2xpc3QpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZUNvbXBvbmVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gZG9uJ3QgaG9pc3Qgb3ZlciBzdHJpbmcgKGh0bWwpIGNvbXBvbmVudHNcblxuICAgICAgICBpZiAob2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICAgICAgICB2YXIgaW5oZXJpdGVkQ29tcG9uZW50ID0gZ2V0UHJvdG90eXBlT2Yoc291cmNlQ29tcG9uZW50KTtcbiAgICAgICAgICAgIGlmIChpbmhlcml0ZWRDb21wb25lbnQgJiYgaW5oZXJpdGVkQ29tcG9uZW50ICE9PSBvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICBob2lzdE5vblJlYWN0U3RhdGljcyh0YXJnZXRDb21wb25lbnQsIGluaGVyaXRlZENvbXBvbmVudCwgYmxhY2tsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VDb21wb25lbnQpO1xuXG4gICAgICAgIGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlQ29tcG9uZW50KSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYgKCFSRUFDVF9TVEFUSUNTW2tleV0gJiYgIUtOT1dOX1NUQVRJQ1Nba2V5XSAmJiAoIWJsYWNrbGlzdCB8fCAhYmxhY2tsaXN0W2tleV0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlQ29tcG9uZW50LCBrZXkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF2b2lkIGZhaWx1cmVzIGZyb20gcmVhZC1vbmx5IHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkkMSh0YXJnZXRDb21wb25lbnQsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXRDb21wb25lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldENvbXBvbmVudDtcbn07XG5cbnZhciBpbnZhcmlhbnQgPSBmdW5jdGlvbiAoKSB7fTtcblxuLy8gZW5jYXBzdWxhdGVzIHRoZSBzdWJzY3JpcHRpb24gbG9naWMgZm9yIGNvbm5lY3RpbmcgYSBjb21wb25lbnQgdG8gdGhlIHJlZHV4IHN0b3JlLCBhc1xuLy8gd2VsbCBhcyBuZXN0aW5nIHN1YnNjcmlwdGlvbnMgb2YgZGVzY2VuZGFudCBjb21wb25lbnRzLCBzbyB0aGF0IHdlIGNhbiBlbnN1cmUgdGhlXG4vLyBhbmNlc3RvciBjb21wb25lbnRzIHJlLXJlbmRlciBiZWZvcmUgZGVzY2VuZGFudHNcblxudmFyIENMRUFSRUQgPSBudWxsO1xudmFyIG51bGxMaXN0ZW5lcnMgPSB7XG4gIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge31cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RlbmVyQ29sbGVjdGlvbigpIHtcbiAgLy8gdGhlIGN1cnJlbnQvbmV4dCBwYXR0ZXJuIGlzIGNvcGllZCBmcm9tIHJlZHV4J3MgY3JlYXRlU3RvcmUgY29kZS5cbiAgLy8gVE9ETzogcmVmYWN0b3IrZXhwb3NlIHRoYXQgY29kZSB0byBiZSByZXVzYWJsZSBoZXJlP1xuICB2YXIgY3VycmVudCA9IFtdO1xuICB2YXIgbmV4dCA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgbmV4dCA9IENMRUFSRUQ7XG4gICAgICBjdXJyZW50ID0gQ0xFQVJFRDtcbiAgICB9LFxuICAgIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KCkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnQgPSBuZXh0O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGlzdGVuZXJzW2ldKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0sXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIG5leHQgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICBuZXh0LnB1c2gobGlzdGVuZXIpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgIGlmICghaXNTdWJzY3JpYmVkIHx8IGN1cnJlbnQgPT09IENMRUFSRUQpIHJldHVybjtcbiAgICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG5leHQgPT09IGN1cnJlbnQpIG5leHQgPSBjdXJyZW50LnNsaWNlKCk7XG4gICAgICAgIG5leHQuc3BsaWNlKG5leHQuaW5kZXhPZihsaXN0ZW5lciksIDEpO1xuICAgICAgfTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN1YnNjcmlwdGlvbihzdG9yZSwgcGFyZW50U3ViLCBvblN0YXRlQ2hhbmdlKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU3Vic2NyaXB0aW9uKTtcblxuICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcbiAgICB0aGlzLnBhcmVudFN1YiA9IHBhcmVudFN1YjtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2UgPSBvblN0YXRlQ2hhbmdlO1xuICAgIHRoaXMudW5zdWJzY3JpYmUgPSBudWxsO1xuICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbExpc3RlbmVycztcbiAgfVxuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuYWRkTmVzdGVkU3ViID0gZnVuY3Rpb24gYWRkTmVzdGVkU3ViKGxpc3RlbmVyKSB7XG4gICAgdGhpcy50cnlTdWJzY3JpYmUoKTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lcnMuc3Vic2NyaWJlKGxpc3RlbmVyKTtcbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLm5vdGlmeU5lc3RlZFN1YnMgPSBmdW5jdGlvbiBub3RpZnlOZXN0ZWRTdWJzKCkge1xuICAgIHRoaXMubGlzdGVuZXJzLm5vdGlmeSgpO1xuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUuaXNTdWJzY3JpYmVkID0gZnVuY3Rpb24gaXNTdWJzY3JpYmVkKCkge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMudW5zdWJzY3JpYmUpO1xuICB9O1xuXG4gIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudHJ5U3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5U3Vic2NyaWJlKCkge1xuICAgIGlmICghdGhpcy51bnN1YnNjcmliZSkge1xuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IHRoaXMucGFyZW50U3ViID8gdGhpcy5wYXJlbnRTdWIuYWRkTmVzdGVkU3ViKHRoaXMub25TdGF0ZUNoYW5nZSkgOiB0aGlzLnN0b3JlLnN1YnNjcmliZSh0aGlzLm9uU3RhdGVDaGFuZ2UpO1xuXG4gICAgICB0aGlzLmxpc3RlbmVycyA9IGNyZWF0ZUxpc3RlbmVyQ29sbGVjdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnRyeVVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdHJ5VW5zdWJzY3JpYmUoKSB7XG4gICAgaWYgKHRoaXMudW5zdWJzY3JpYmUpIHtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBudWxsO1xuICAgICAgdGhpcy5saXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gbnVsbExpc3RlbmVycztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKTtcblxudmFyIGhvdFJlbG9hZGluZ1ZlcnNpb24gPSAwO1xudmFyIGR1bW15U3RhdGUgPSB7fTtcbmZ1bmN0aW9uIG5vb3AoKSB7fVxuZnVuY3Rpb24gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHN0b3JlKSB7XG4gIC8vIHdyYXAgdGhlIHNlbGVjdG9yIGluIGFuIG9iamVjdCB0aGF0IHRyYWNrcyBpdHMgcmVzdWx0cyBiZXR3ZWVuIHJ1bnMuXG4gIHZhciBzZWxlY3RvciA9IHtcbiAgICBydW46IGZ1bmN0aW9uIHJ1bkNvbXBvbmVudFNlbGVjdG9yKHByb3BzKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgbmV4dFByb3BzID0gc291cmNlU2VsZWN0b3Ioc3RvcmUuZ2V0U3RhdGUoKSwgcHJvcHMpO1xuICAgICAgICBpZiAobmV4dFByb3BzICE9PSBzZWxlY3Rvci5wcm9wcyB8fCBzZWxlY3Rvci5lcnJvcikge1xuICAgICAgICAgIHNlbGVjdG9yLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgc2VsZWN0b3IucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgICAgICAgc2VsZWN0b3IuZXJyb3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBzZWxlY3Rvci5zaG91bGRDb21wb25lbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICBzZWxlY3Rvci5lcnJvciA9IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gc2VsZWN0b3I7XG59XG5cbmZ1bmN0aW9uIGNvbm5lY3RBZHZhbmNlZChcbi8qXG4gIHNlbGVjdG9yRmFjdG9yeSBpcyBhIGZ1bmMgdGhhdCBpcyByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIHRoZSBzZWxlY3RvciBmdW5jdGlvbiB1c2VkIHRvXG4gIGNvbXB1dGUgbmV3IHByb3BzIGZyb20gc3RhdGUsIHByb3BzLCBhbmQgZGlzcGF0Y2guIEZvciBleGFtcGxlOlxuICAgICBleHBvcnQgZGVmYXVsdCBjb25uZWN0QWR2YW5jZWQoKGRpc3BhdGNoLCBvcHRpb25zKSA9PiAoc3RhdGUsIHByb3BzKSA9PiAoe1xuICAgICAgdGhpbmc6IHN0YXRlLnRoaW5nc1twcm9wcy50aGluZ0lkXSxcbiAgICAgIHNhdmVUaGluZzogZmllbGRzID0+IGRpc3BhdGNoKGFjdGlvbkNyZWF0b3JzLnNhdmVUaGluZyhwcm9wcy50aGluZ0lkLCBmaWVsZHMpKSxcbiAgICB9KSkoWW91ckNvbXBvbmVudClcbiAgIEFjY2VzcyB0byBkaXNwYXRjaCBpcyBwcm92aWRlZCB0byB0aGUgZmFjdG9yeSBzbyBzZWxlY3RvckZhY3RvcmllcyBjYW4gYmluZCBhY3Rpb25DcmVhdG9yc1xuICBvdXRzaWRlIG9mIHRoZWlyIHNlbGVjdG9yIGFzIGFuIG9wdGltaXphdGlvbi4gT3B0aW9ucyBwYXNzZWQgdG8gY29ubmVjdEFkdmFuY2VkIGFyZSBwYXNzZWQgdG9cbiAgdGhlIHNlbGVjdG9yRmFjdG9yeSwgYWxvbmcgd2l0aCBkaXNwbGF5TmFtZSBhbmQgV3JhcHBlZENvbXBvbmVudCwgYXMgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgIE5vdGUgdGhhdCBzZWxlY3RvckZhY3RvcnkgaXMgcmVzcG9uc2libGUgZm9yIGFsbCBjYWNoaW5nL21lbW9pemF0aW9uIG9mIGluYm91bmQgYW5kIG91dGJvdW5kXG4gIHByb3BzLiBEbyBub3QgdXNlIGNvbm5lY3RBZHZhbmNlZCBkaXJlY3RseSB3aXRob3V0IG1lbW9pemluZyByZXN1bHRzIGJldHdlZW4gY2FsbHMgdG8geW91clxuICBzZWxlY3Rvciwgb3RoZXJ3aXNlIHRoZSBDb25uZWN0IGNvbXBvbmVudCB3aWxsIHJlLXJlbmRlciBvbiBldmVyeSBzdGF0ZSBvciBwcm9wcyBjaGFuZ2UuXG4qL1xuc2VsZWN0b3JGYWN0b3J5KSB7XG4gIHZhciBfY29udGV4dFR5cGVzLCBfY2hpbGRDb250ZXh0VHlwZXM7XG5cbiAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gIHZhciBfcmVmJGdldERpc3BsYXlOYW1lID0gX3JlZi5nZXREaXNwbGF5TmFtZSxcbiAgICAgIGdldERpc3BsYXlOYW1lID0gX3JlZiRnZXREaXNwbGF5TmFtZSA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gJ0Nvbm5lY3RBZHZhbmNlZCgnICsgbmFtZSArICcpJztcbiAgfSA6IF9yZWYkZ2V0RGlzcGxheU5hbWUsXG4gICAgICBfcmVmJG1ldGhvZE5hbWUgPSBfcmVmLm1ldGhvZE5hbWUsXG4gICAgICBtZXRob2ROYW1lID0gX3JlZiRtZXRob2ROYW1lID09PSB1bmRlZmluZWQgPyAnY29ubmVjdEFkdmFuY2VkJyA6IF9yZWYkbWV0aG9kTmFtZSxcbiAgICAgIF9yZWYkcmVuZGVyQ291bnRQcm9wID0gX3JlZi5yZW5kZXJDb3VudFByb3AsXG4gICAgICByZW5kZXJDb3VudFByb3AgPSBfcmVmJHJlbmRlckNvdW50UHJvcCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogX3JlZiRyZW5kZXJDb3VudFByb3AsXG4gICAgICBfcmVmJHNob3VsZEhhbmRsZVN0YXQgPSBfcmVmLnNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcyxcbiAgICAgIHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcyA9IF9yZWYkc2hvdWxkSGFuZGxlU3RhdCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYkc2hvdWxkSGFuZGxlU3RhdCxcbiAgICAgIF9yZWYkc3RvcmVLZXkgPSBfcmVmLnN0b3JlS2V5LFxuICAgICAgc3RvcmVLZXkgPSBfcmVmJHN0b3JlS2V5ID09PSB1bmRlZmluZWQgPyAnc3RvcmUnIDogX3JlZiRzdG9yZUtleSxcbiAgICAgIF9yZWYkd2l0aFJlZiA9IF9yZWYud2l0aFJlZixcbiAgICAgIHdpdGhSZWYgPSBfcmVmJHdpdGhSZWYgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiR3aXRoUmVmLFxuICAgICAgY29ubmVjdE9wdGlvbnMgPSBvYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2dldERpc3BsYXlOYW1lJywgJ21ldGhvZE5hbWUnLCAncmVuZGVyQ291bnRQcm9wJywgJ3Nob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcycsICdzdG9yZUtleScsICd3aXRoUmVmJ10pO1xuXG4gIHZhciBzdWJzY3JpcHRpb25LZXkgPSBzdG9yZUtleSArICdTdWJzY3JpcHRpb24nO1xuICB2YXIgdmVyc2lvbiA9IGhvdFJlbG9hZGluZ1ZlcnNpb24rKztcblxuICB2YXIgY29udGV4dFR5cGVzID0gKF9jb250ZXh0VHlwZXMgPSB7fSwgX2NvbnRleHRUeXBlc1tzdG9yZUtleV0gPSBzdG9yZVNoYXBlLCBfY29udGV4dFR5cGVzW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX2NvbnRleHRUeXBlcyk7XG4gIHZhciBjaGlsZENvbnRleHRUeXBlcyA9IChfY2hpbGRDb250ZXh0VHlwZXMgPSB7fSwgX2NoaWxkQ29udGV4dFR5cGVzW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb25TaGFwZSwgX2NoaWxkQ29udGV4dFR5cGVzKTtcblxuICByZXR1cm4gZnVuY3Rpb24gd3JhcFdpdGhDb25uZWN0KFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICBpbnZhcmlhbnQodHlwZW9mIFdyYXBwZWRDb21wb25lbnQgPT0gJ2Z1bmN0aW9uJywgJ1lvdSBtdXN0IHBhc3MgYSBjb21wb25lbnQgdG8gdGhlIGZ1bmN0aW9uIHJldHVybmVkIGJ5ICcgKyAoJ2Nvbm5lY3QuIEluc3RlYWQgcmVjZWl2ZWQgJyArIEpTT04uc3RyaW5naWZ5KFdyYXBwZWRDb21wb25lbnQpKSk7XG5cbiAgICB2YXIgd3JhcHBlZENvbXBvbmVudE5hbWUgPSBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IFdyYXBwZWRDb21wb25lbnQubmFtZSB8fCAnQ29tcG9uZW50JztcblxuICAgIHZhciBkaXNwbGF5TmFtZSA9IGdldERpc3BsYXlOYW1lKHdyYXBwZWRDb21wb25lbnROYW1lKTtcblxuICAgIHZhciBzZWxlY3RvckZhY3RvcnlPcHRpb25zID0gX2V4dGVuZHMoe30sIGNvbm5lY3RPcHRpb25zLCB7XG4gICAgICBnZXREaXNwbGF5TmFtZTogZ2V0RGlzcGxheU5hbWUsXG4gICAgICBtZXRob2ROYW1lOiBtZXRob2ROYW1lLFxuICAgICAgcmVuZGVyQ291bnRQcm9wOiByZW5kZXJDb3VudFByb3AsXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXM6IHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcyxcbiAgICAgIHN0b3JlS2V5OiBzdG9yZUtleSxcbiAgICAgIHdpdGhSZWY6IHdpdGhSZWYsXG4gICAgICBkaXNwbGF5TmFtZTogZGlzcGxheU5hbWUsXG4gICAgICB3cmFwcGVkQ29tcG9uZW50TmFtZTogd3JhcHBlZENvbXBvbmVudE5hbWUsXG4gICAgICBXcmFwcGVkQ29tcG9uZW50OiBXcmFwcGVkQ29tcG9uZW50XG4gICAgfSk7XG5cbiAgICB2YXIgQ29ubmVjdCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgICBpbmhlcml0cyhDb25uZWN0LCBfQ29tcG9uZW50KTtcblxuICAgICAgZnVuY3Rpb24gQ29ubmVjdChwcm9wcywgY29udGV4dCkge1xuICAgICAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBDb25uZWN0KTtcblxuICAgICAgICB2YXIgX3RoaXMgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIF9Db21wb25lbnQuY2FsbCh0aGlzLCBwcm9wcywgY29udGV4dCkpO1xuXG4gICAgICAgIF90aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IHt9O1xuICAgICAgICBfdGhpcy5yZW5kZXJDb3VudCA9IDA7XG4gICAgICAgIF90aGlzLnN0b3JlID0gcHJvcHNbc3RvcmVLZXldIHx8IGNvbnRleHRbc3RvcmVLZXldO1xuICAgICAgICBfdGhpcy5wcm9wc01vZGUgPSBCb29sZWFuKHByb3BzW3N0b3JlS2V5XSk7XG4gICAgICAgIF90aGlzLnNldFdyYXBwZWRJbnN0YW5jZSA9IF90aGlzLnNldFdyYXBwZWRJbnN0YW5jZS5iaW5kKF90aGlzKTtcblxuICAgICAgICBpbnZhcmlhbnQoX3RoaXMuc3RvcmUsICdDb3VsZCBub3QgZmluZCBcIicgKyBzdG9yZUtleSArICdcIiBpbiBlaXRoZXIgdGhlIGNvbnRleHQgb3IgcHJvcHMgb2YgJyArICgnXCInICsgZGlzcGxheU5hbWUgKyAnXCIuIEVpdGhlciB3cmFwIHRoZSByb290IGNvbXBvbmVudCBpbiBhIDxQcm92aWRlcj4sICcpICsgKCdvciBleHBsaWNpdGx5IHBhc3MgXCInICsgc3RvcmVLZXkgKyAnXCIgYXMgYSBwcm9wIHRvIFwiJyArIGRpc3BsYXlOYW1lICsgJ1wiLicpKTtcblxuICAgICAgICBfdGhpcy5pbml0U2VsZWN0b3IoKTtcbiAgICAgICAgX3RoaXMuaW5pdFN1YnNjcmlwdGlvbigpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmdldENoaWxkQ29udGV4dCA9IGZ1bmN0aW9uIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgIC8vIElmIHRoaXMgY29tcG9uZW50IHJlY2VpdmVkIHN0b3JlIGZyb20gcHJvcHMsIGl0cyBzdWJzY3JpcHRpb24gc2hvdWxkIGJlIHRyYW5zcGFyZW50XG4gICAgICAgIC8vIHRvIGFueSBkZXNjZW5kYW50cyByZWNlaXZpbmcgc3RvcmUrc3Vic2NyaXB0aW9uIGZyb20gY29udGV4dDsgaXQgcGFzc2VzIGFsb25nXG4gICAgICAgIC8vIHN1YnNjcmlwdGlvbiBwYXNzZWQgdG8gaXQuIE90aGVyd2lzZSwgaXQgc2hhZG93cyB0aGUgcGFyZW50IHN1YnNjcmlwdGlvbiwgd2hpY2ggYWxsb3dzXG4gICAgICAgIC8vIENvbm5lY3QgdG8gY29udHJvbCBvcmRlcmluZyBvZiBub3RpZmljYXRpb25zIHRvIGZsb3cgdG9wLWRvd24uXG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB0aGlzLnByb3BzTW9kZSA/IG51bGwgOiB0aGlzLnN1YnNjcmlwdGlvbjtcbiAgICAgICAgcmV0dXJuIF9yZWYyID0ge30sIF9yZWYyW3N1YnNjcmlwdGlvbktleV0gPSBzdWJzY3JpcHRpb24gfHwgdGhpcy5jb250ZXh0W3N1YnNjcmlwdGlvbktleV0sIF9yZWYyO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKCFzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXMpIHJldHVybjtcblxuICAgICAgICAvLyBjb21wb25lbnRXaWxsTW91bnQgZmlyZXMgZHVyaW5nIHNlcnZlciBzaWRlIHJlbmRlcmluZywgYnV0IGNvbXBvbmVudERpZE1vdW50IGFuZFxuICAgICAgICAvLyBjb21wb25lbnRXaWxsVW5tb3VudCBkbyBub3QuIEJlY2F1c2Ugb2YgdGhpcywgdHJ5U3Vic2NyaWJlIGhhcHBlbnMgZHVyaW5nIC4uLmRpZE1vdW50LlxuICAgICAgICAvLyBPdGhlcndpc2UsIHVuc3Vic2NyaXB0aW9uIHdvdWxkIG5ldmVyIHRha2UgcGxhY2UgZHVyaW5nIFNTUiwgY2F1c2luZyBhIG1lbW9yeSBsZWFrLlxuICAgICAgICAvLyBUbyBoYW5kbGUgdGhlIGNhc2Ugd2hlcmUgYSBjaGlsZCBjb21wb25lbnQgbWF5IGhhdmUgdHJpZ2dlcmVkIGEgc3RhdGUgY2hhbmdlIGJ5XG4gICAgICAgIC8vIGRpc3BhdGNoaW5nIGFuIGFjdGlvbiBpbiBpdHMgY29tcG9uZW50V2lsbE1vdW50LCB3ZSBoYXZlIHRvIHJlLXJ1biB0aGUgc2VsZWN0IGFuZCBtYXliZVxuICAgICAgICAvLyByZS1yZW5kZXIuXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnRyeVN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB0aGlzLmZvcmNlVXBkYXRlKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5ydW4obmV4dFByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnNob3VsZENvbXBvbmVudFVwZGF0ZSA9IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB0aGlzLnN1YnNjcmlwdGlvbi50cnlVbnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicyA9IG5vb3A7XG4gICAgICAgIHRoaXMuc3RvcmUgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1biA9IG5vb3A7XG4gICAgICAgIHRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5nZXRXcmFwcGVkSW5zdGFuY2UgPSBmdW5jdGlvbiBnZXRXcmFwcGVkSW5zdGFuY2UoKSB7XG4gICAgICAgIGludmFyaWFudCh3aXRoUmVmLCAnVG8gYWNjZXNzIHRoZSB3cmFwcGVkIGluc3RhbmNlLCB5b3UgbmVlZCB0byBzcGVjaWZ5ICcgKyAoJ3sgd2l0aFJlZjogdHJ1ZSB9IGluIHRoZSBvcHRpb25zIGFyZ3VtZW50IG9mIHRoZSAnICsgbWV0aG9kTmFtZSArICcoKSBjYWxsLicpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlZEluc3RhbmNlO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuc2V0V3JhcHBlZEluc3RhbmNlID0gZnVuY3Rpb24gc2V0V3JhcHBlZEluc3RhbmNlKHJlZikge1xuICAgICAgICB0aGlzLndyYXBwZWRJbnN0YW5jZSA9IHJlZjtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmluaXRTZWxlY3RvciA9IGZ1bmN0aW9uIGluaXRTZWxlY3RvcigpIHtcbiAgICAgICAgdmFyIHNvdXJjZVNlbGVjdG9yID0gc2VsZWN0b3JGYWN0b3J5KHRoaXMuc3RvcmUuZGlzcGF0Y2gsIHNlbGVjdG9yRmFjdG9yeU9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yID0gbWFrZVNlbGVjdG9yU3RhdGVmdWwoc291cmNlU2VsZWN0b3IsIHRoaXMuc3RvcmUpO1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLmluaXRTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiBpbml0U3Vic2NyaXB0aW9uKCkge1xuICAgICAgICBpZiAoIXNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykgcmV0dXJuO1xuXG4gICAgICAgIC8vIHBhcmVudFN1YidzIHNvdXJjZSBzaG91bGQgbWF0Y2ggd2hlcmUgc3RvcmUgY2FtZSBmcm9tOiBwcm9wcyB2cy4gY29udGV4dC4gQSBjb21wb25lbnRcbiAgICAgICAgLy8gY29ubmVjdGVkIHRvIHRoZSBzdG9yZSB2aWEgcHJvcHMgc2hvdWxkbid0IHVzZSBzdWJzY3JpcHRpb24gZnJvbSBjb250ZXh0LCBvciB2aWNlIHZlcnNhLlxuICAgICAgICB2YXIgcGFyZW50U3ViID0gKHRoaXMucHJvcHNNb2RlID8gdGhpcy5wcm9wcyA6IHRoaXMuY29udGV4dClbc3Vic2NyaXB0aW9uS2V5XTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKHRoaXMuc3RvcmUsIHBhcmVudFN1YiwgdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIGBub3RpZnlOZXN0ZWRTdWJzYCBpcyBkdXBsaWNhdGVkIHRvIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgY29tcG9uZW50IGlzICB1bm1vdW50ZWQgaW5cbiAgICAgICAgLy8gdGhlIG1pZGRsZSBvZiB0aGUgbm90aWZpY2F0aW9uIGxvb3AsIHdoZXJlIGB0aGlzLnN1YnNjcmlwdGlvbmAgd2lsbCB0aGVuIGJlIG51bGwuIEFuXG4gICAgICAgIC8vIGV4dHJhIG51bGwgY2hlY2sgZXZlcnkgY2hhbmdlIGNhbiBiZSBhdm9pZGVkIGJ5IGNvcHlpbmcgdGhlIG1ldGhvZCBvbnRvIGB0aGlzYCBhbmQgdGhlblxuICAgICAgICAvLyByZXBsYWNpbmcgaXQgd2l0aCBhIG5vLW9wIG9uIHVubW91bnQuIFRoaXMgY2FuIHByb2JhYmx5IGJlIGF2b2lkZWQgaWYgU3Vic2NyaXB0aW9uJ3NcbiAgICAgICAgLy8gbGlzdGVuZXJzIGxvZ2ljIGlzIGNoYW5nZWQgdG8gbm90IGNhbGwgbGlzdGVuZXJzIHRoYXQgaGF2ZSBiZWVuIHVuc3Vic2NyaWJlZCBpbiB0aGVcbiAgICAgICAgLy8gbWlkZGxlIG9mIHRoZSBub3RpZmljYXRpb24gbG9vcC5cbiAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzID0gdGhpcy5zdWJzY3JpcHRpb24ubm90aWZ5TmVzdGVkU3Vicy5iaW5kKHRoaXMuc3Vic2NyaXB0aW9uKTtcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLm9uU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLnJ1bih0aGlzLnByb3BzKTtcblxuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlKSB7XG4gICAgICAgICAgdGhpcy5ub3RpZnlOZXN0ZWRTdWJzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSB0aGlzLm5vdGlmeU5lc3RlZFN1YnNPbkNvbXBvbmVudERpZFVwZGF0ZTtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKGR1bW15U3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5ub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBub3RpZnlOZXN0ZWRTdWJzT25Db21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIC8vIGBjb21wb25lbnREaWRVcGRhdGVgIGlzIGNvbmRpdGlvbmFsbHkgaW1wbGVtZW50ZWQgd2hlbiBgb25TdGF0ZUNoYW5nZWAgZGV0ZXJtaW5lcyBpdFxuICAgICAgICAvLyBuZWVkcyB0byBub3RpZnkgbmVzdGVkIHN1YnMuIE9uY2UgY2FsbGVkLCBpdCB1bmltcGxlbWVudHMgaXRzZWxmIHVudGlsIGZ1cnRoZXIgc3RhdGVcbiAgICAgICAgLy8gY2hhbmdlcyBvY2N1ci4gRG9pbmcgaXQgdGhpcyB3YXkgdnMgaGF2aW5nIGEgcGVybWFuZW50IGBjb21wb25lbnREaWRVcGRhdGVgIHRoYXQgZG9lc1xuICAgICAgICAvLyBhIGJvb2xlYW4gY2hlY2sgZXZlcnkgdGltZSBhdm9pZHMgYW4gZXh0cmEgbWV0aG9kIGNhbGwgbW9zdCBvZiB0aGUgdGltZSwgcmVzdWx0aW5nXG4gICAgICAgIC8vIGluIHNvbWUgcGVyZiBib29zdC5cbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubm90aWZ5TmVzdGVkU3VicygpO1xuICAgICAgfTtcblxuICAgICAgQ29ubmVjdC5wcm90b3R5cGUuaXNTdWJzY3JpYmVkID0gZnVuY3Rpb24gaXNTdWJzY3JpYmVkKCkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbih0aGlzLnN1YnNjcmlwdGlvbikgJiYgdGhpcy5zdWJzY3JpcHRpb24uaXNTdWJzY3JpYmVkKCk7XG4gICAgICB9O1xuXG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5hZGRFeHRyYVByb3BzID0gZnVuY3Rpb24gYWRkRXh0cmFQcm9wcyhwcm9wcykge1xuICAgICAgICBpZiAoIXdpdGhSZWYgJiYgIXJlbmRlckNvdW50UHJvcCAmJiAhKHRoaXMucHJvcHNNb2RlICYmIHRoaXMuc3Vic2NyaXB0aW9uKSkgcmV0dXJuIHByb3BzO1xuICAgICAgICAvLyBtYWtlIGEgc2hhbGxvdyBjb3B5IHNvIHRoYXQgZmllbGRzIGFkZGVkIGRvbid0IGxlYWsgdG8gdGhlIG9yaWdpbmFsIHNlbGVjdG9yLlxuICAgICAgICAvLyB0aGlzIGlzIGVzcGVjaWFsbHkgaW1wb3J0YW50IGZvciAncmVmJyBzaW5jZSB0aGF0J3MgYSByZWZlcmVuY2UgYmFjayB0byB0aGUgY29tcG9uZW50XG4gICAgICAgIC8vIGluc3RhbmNlLiBhIHNpbmdsZXRvbiBtZW1vaXplZCBzZWxlY3RvciB3b3VsZCB0aGVuIGJlIGhvbGRpbmcgYSByZWZlcmVuY2UgdG8gdGhlXG4gICAgICAgIC8vIGluc3RhbmNlLCBwcmV2ZW50aW5nIHRoZSBpbnN0YW5jZSBmcm9tIGJlaW5nIGdhcmJhZ2UgY29sbGVjdGVkLCBhbmQgdGhhdCB3b3VsZCBiZSBiYWRcbiAgICAgICAgdmFyIHdpdGhFeHRyYXMgPSBfZXh0ZW5kcyh7fSwgcHJvcHMpO1xuICAgICAgICBpZiAod2l0aFJlZikgd2l0aEV4dHJhcy5yZWYgPSB0aGlzLnNldFdyYXBwZWRJbnN0YW5jZTtcbiAgICAgICAgaWYgKHJlbmRlckNvdW50UHJvcCkgd2l0aEV4dHJhc1tyZW5kZXJDb3VudFByb3BdID0gdGhpcy5yZW5kZXJDb3VudCsrO1xuICAgICAgICBpZiAodGhpcy5wcm9wc01vZGUgJiYgdGhpcy5zdWJzY3JpcHRpb24pIHdpdGhFeHRyYXNbc3Vic2NyaXB0aW9uS2V5XSA9IHRoaXMuc3Vic2NyaXB0aW9uO1xuICAgICAgICByZXR1cm4gd2l0aEV4dHJhcztcbiAgICAgIH07XG5cbiAgICAgIENvbm5lY3QucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3Iuc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHNlbGVjdG9yLmVycm9yKSB7XG4gICAgICAgICAgdGhyb3cgc2VsZWN0b3IuZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHByZWFjdC5oKFdyYXBwZWRDb21wb25lbnQsIHRoaXMuYWRkRXh0cmFQcm9wcyhzZWxlY3Rvci5wcm9wcykpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gQ29ubmVjdDtcbiAgICB9KHByZWFjdC5Db21wb25lbnQpO1xuXG4gICAgQ29ubmVjdC5XcmFwcGVkQ29tcG9uZW50ID0gV3JhcHBlZENvbXBvbmVudDtcbiAgICBDb25uZWN0LmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gICAgQ29ubmVjdC5jaGlsZENvbnRleHRUeXBlcyA9IGNoaWxkQ29udGV4dFR5cGVzO1xuICAgIENvbm5lY3QuY29udGV4dFR5cGVzID0gY29udGV4dFR5cGVzO1xuXG5cbiAgICB7XG4gICAgICBDb25uZWN0LnByb3RvdHlwZS5jb21wb25lbnRXaWxsVXBkYXRlID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbFVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgLy8gV2UgYXJlIGhvdCByZWxvYWRpbmchXG4gICAgICAgIGlmICh0aGlzLnZlcnNpb24gIT09IHZlcnNpb24pIHtcbiAgICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICAgIHRoaXMuaW5pdFNlbGVjdG9yKCk7XG5cbiAgICAgICAgICAvLyBJZiBhbnkgY29ubmVjdGVkIGRlc2NlbmRhbnRzIGRvbid0IGhvdCByZWxvYWQgKGFuZCByZXN1YnNjcmliZSBpbiB0aGUgcHJvY2VzcyksIHRoZWlyXG4gICAgICAgICAgLy8gbGlzdGVuZXJzIHdpbGwgYmUgbG9zdCB3aGVuIHdlIHVuc3Vic2NyaWJlLiBVbmZvcnR1bmF0ZWx5LCBieSBjb3B5aW5nIG92ZXIgYWxsXG4gICAgICAgICAgLy8gbGlzdGVuZXJzLCB0aGlzIGRvZXMgbWVhbiB0aGF0IHRoZSBvbGQgdmVyc2lvbnMgb2YgY29ubmVjdGVkIGRlc2NlbmRhbnRzIHdpbGwgc3RpbGwgYmVcbiAgICAgICAgICAvLyBub3RpZmllZCBvZiBzdGF0ZSBjaGFuZ2VzOyBob3dldmVyLCB0aGVpciBvblN0YXRlQ2hhbmdlIGZ1bmN0aW9uIGlzIGEgbm8tb3Agc28gdGhpc1xuICAgICAgICAgIC8vIGlzbid0IGEgaHVnZSBkZWFsLlxuICAgICAgICAgIHZhciBvbGRMaXN0ZW5lcnMgPSBbXTtcblxuICAgICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgb2xkTGlzdGVuZXJzID0gdGhpcy5zdWJzY3JpcHRpb24ubGlzdGVuZXJzLmdldCgpO1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5VW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pbml0U3Vic2NyaXB0aW9uKCk7XG4gICAgICAgICAgaWYgKHNob3VsZEhhbmRsZVN0YXRlQ2hhbmdlcykge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udHJ5U3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBvbGRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5zdWJzY3JpcHRpb24ubGlzdGVuZXJzLnN1YnNjcmliZShsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGhvaXN0Tm9uUmVhY3RTdGF0aWNzKENvbm5lY3QsIFdyYXBwZWRDb21wb25lbnQpO1xuICB9O1xufVxuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gaXMoeCwgeSkge1xuICBpZiAoeCA9PT0geSkge1xuICAgIHJldHVybiB4ICE9PSAwIHx8IHkgIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB4ICE9PSB4ICYmIHkgIT09IHk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKGlzKG9iakEsIG9iakIpKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoKHR5cGVvZiBvYmpBID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmpBKSkgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgKHR5cGVvZiBvYmpCID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmpCKSkgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwob2JqQiwga2V5c0FbaV0pIHx8ICFpcyhvYmpBW2tleXNBW2ldXSwgb2JqQltrZXlzQVtpXV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9ICh0eXBlb2YgZ2xvYmFsID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihnbG9iYWwpKSA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9ICh0eXBlb2Ygc2VsZiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc2VsZikpID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byQxID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkkMSA9IG9iamVjdFByb3RvJDEuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvJDEudG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnJDEgPSBfU3ltYm9sID8gX1N5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkkMS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyQxKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnJDFdO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWckMV0gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWckMV0gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZyQxXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvJDIgPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmckMSA9IG9iamVjdFByb3RvJDIudG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmckMS5jYWxsKHZhbHVlKTtcbn1cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXSc7XG52YXIgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gX1N5bWJvbCA/IF9TeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICAgIH1cbiAgICByZXR1cm4gc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gT2JqZWN0KHZhbHVlKSA/IGdldFJhd1RhZyh2YWx1ZSkgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWUpKSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBiYXNlR2V0VGFnKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZnVuY3Rpb24gdmVyaWZ5UGxhaW5PYmplY3QodmFsdWUsIGRpc3BsYXlOYW1lLCBtZXRob2ROYW1lKSB7XG4gIGlmICghaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcbiAgICB3YXJuaW5nKG1ldGhvZE5hbWUgKyAnKCkgaW4gJyArIGRpc3BsYXlOYW1lICsgJyBtdXN0IHJldHVybiBhIHBsYWluIG9iamVjdC4gSW5zdGVhZCByZWNlaXZlZCAnICsgdmFsdWUgKyAnLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyYXBNYXBUb1Byb3BzQ29uc3RhbnQoZ2V0Q29uc3RhbnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRDb25zdGFudFNlbGVjdG9yKGRpc3BhdGNoLCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnN0YW50ID0gZ2V0Q29uc3RhbnQoZGlzcGF0Y2gsIG9wdGlvbnMpO1xuXG4gICAgZnVuY3Rpb24gY29uc3RhbnRTZWxlY3RvcigpIHtcbiAgICAgIHJldHVybiBjb25zdGFudDtcbiAgICB9XG4gICAgY29uc3RhbnRTZWxlY3Rvci5kZXBlbmRzT25Pd25Qcm9wcyA9IGZhbHNlO1xuICAgIHJldHVybiBjb25zdGFudFNlbGVjdG9yO1xuICB9O1xufVxuXG4vLyBkZXBlbmRzT25Pd25Qcm9wcyBpcyB1c2VkIGJ5IGNyZWF0ZU1hcFRvUHJvcHNQcm94eSB0byBkZXRlcm1pbmUgd2hldGhlciB0byBwYXNzIHByb3BzIGFzIGFyZ3Ncbi8vIHRvIHRoZSBtYXBUb1Byb3BzIGZ1bmN0aW9uIGJlaW5nIHdyYXBwZWQuIEl0IGlzIGFsc28gdXNlZCBieSBtYWtlUHVyZVByb3BzU2VsZWN0b3IgdG8gZGV0ZXJtaW5lXG4vLyB3aGV0aGVyIG1hcFRvUHJvcHMgbmVlZHMgdG8gYmUgaW52b2tlZCB3aGVuIHByb3BzIGhhdmUgY2hhbmdlZC5cbi8vIFxuLy8gQSBsZW5ndGggb2Ygb25lIHNpZ25hbHMgdGhhdCBtYXBUb1Byb3BzIGRvZXMgbm90IGRlcGVuZCBvbiBwcm9wcyBmcm9tIHRoZSBwYXJlbnQgY29tcG9uZW50LlxuLy8gQSBsZW5ndGggb2YgemVybyBpcyBhc3N1bWVkIHRvIG1lYW4gbWFwVG9Qcm9wcyBpcyBnZXR0aW5nIGFyZ3MgdmlhIGFyZ3VtZW50cyBvciAuLi5hcmdzIGFuZFxuLy8gdGhlcmVmb3JlIG5vdCByZXBvcnRpbmcgaXRzIGxlbmd0aCBhY2N1cmF0ZWx5Li5cbmZ1bmN0aW9uIGdldERlcGVuZHNPbk93blByb3BzKG1hcFRvUHJvcHMpIHtcbiAgcmV0dXJuIG1hcFRvUHJvcHMuZGVwZW5kc09uT3duUHJvcHMgIT09IG51bGwgJiYgbWFwVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcyAhPT0gdW5kZWZpbmVkID8gQm9vbGVhbihtYXBUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSA6IG1hcFRvUHJvcHMubGVuZ3RoICE9PSAxO1xufVxuXG4vLyBVc2VkIGJ5IHdoZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uIGFuZCB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbixcbi8vIHRoaXMgZnVuY3Rpb24gd3JhcHMgbWFwVG9Qcm9wcyBpbiBhIHByb3h5IGZ1bmN0aW9uIHdoaWNoIGRvZXMgc2V2ZXJhbCB0aGluZ3M6XG4vLyBcbi8vICAqIERldGVjdHMgd2hldGhlciB0aGUgbWFwVG9Qcm9wcyBmdW5jdGlvbiBiZWluZyBjYWxsZWQgZGVwZW5kcyBvbiBwcm9wcywgd2hpY2hcbi8vICAgIGlzIHVzZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHRvIGRlY2lkZSBpZiBpdCBzaG91bGQgcmVpbnZva2Ugb24gcHJvcHMgY2hhbmdlcy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgaGFuZGxlcyBtYXBUb1Byb3BzIGlmIHJldHVybnMgYW5vdGhlciBmdW5jdGlvbiwgYW5kIHRyZWF0cyB0aGF0XG4vLyAgICBuZXcgZnVuY3Rpb24gYXMgdGhlIHRydWUgbWFwVG9Qcm9wcyBmb3Igc3Vic2VxdWVudCBjYWxscy5cbi8vICAgIFxuLy8gICogT24gZmlyc3QgY2FsbCwgdmVyaWZpZXMgdGhlIGZpcnN0IHJlc3VsdCBpcyBhIHBsYWluIG9iamVjdCwgaW4gb3JkZXIgdG8gd2FyblxuLy8gICAgdGhlIGRldmVsb3BlciB0aGF0IHRoZWlyIG1hcFRvUHJvcHMgZnVuY3Rpb24gaXMgbm90IHJldHVybmluZyBhIHZhbGlkIHJlc3VsdC5cbi8vICAgIFxuZnVuY3Rpb24gd3JhcE1hcFRvUHJvcHNGdW5jKG1hcFRvUHJvcHMsIG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGluaXRQcm94eVNlbGVjdG9yKGRpc3BhdGNoLCBfcmVmKSB7XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gX3JlZi5kaXNwbGF5TmFtZTtcblxuICAgIHZhciBwcm94eSA9IGZ1bmN0aW9uIG1hcFRvUHJvcHNQcm94eShzdGF0ZU9yRGlzcGF0Y2gsIG93blByb3BzKSB7XG4gICAgICByZXR1cm4gcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPyBwcm94eS5tYXBUb1Byb3BzKHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpIDogcHJveHkubWFwVG9Qcm9wcyhzdGF0ZU9yRGlzcGF0Y2gpO1xuICAgIH07XG5cbiAgICAvLyBhbGxvdyBkZXRlY3RGYWN0b3J5QW5kVmVyaWZ5IHRvIGdldCBvd25Qcm9wc1xuICAgIHByb3h5LmRlcGVuZHNPbk93blByb3BzID0gdHJ1ZTtcblxuICAgIHByb3h5Lm1hcFRvUHJvcHMgPSBmdW5jdGlvbiBkZXRlY3RGYWN0b3J5QW5kVmVyaWZ5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpIHtcbiAgICAgIHByb3h5Lm1hcFRvUHJvcHMgPSBtYXBUb1Byb3BzO1xuICAgICAgcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPSBnZXREZXBlbmRzT25Pd25Qcm9wcyhtYXBUb1Byb3BzKTtcbiAgICAgIHZhciBwcm9wcyA9IHByb3h5KHN0YXRlT3JEaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgICBpZiAodHlwZW9mIHByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHByb3h5Lm1hcFRvUHJvcHMgPSBwcm9wcztcbiAgICAgICAgcHJveHkuZGVwZW5kc09uT3duUHJvcHMgPSBnZXREZXBlbmRzT25Pd25Qcm9wcyhwcm9wcyk7XG4gICAgICAgIHByb3BzID0gcHJveHkoc3RhdGVPckRpc3BhdGNoLCBvd25Qcm9wcyk7XG4gICAgICB9XG5cbiAgICAgIHZlcmlmeVBsYWluT2JqZWN0KHByb3BzLCBkaXNwbGF5TmFtZSwgbWV0aG9kTmFtZSk7XG5cbiAgICAgIHJldHVybiBwcm9wcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xufVxuXG5mdW5jdGlvbiB3aGVuTWFwRGlzcGF0Y2hUb1Byb3BzSXNGdW5jdGlvbihtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBtYXBEaXNwYXRjaFRvUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWFwVG9Qcm9wc0Z1bmMobWFwRGlzcGF0Y2hUb1Byb3BzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJykgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc01pc3NpbmcobWFwRGlzcGF0Y2hUb1Byb3BzKSB7XG4gIHJldHVybiAhbWFwRGlzcGF0Y2hUb1Byb3BzID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICByZXR1cm4geyBkaXNwYXRjaDogZGlzcGF0Y2ggfTtcbiAgfSkgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc09iamVjdChtYXBEaXNwYXRjaFRvUHJvcHMpIHtcbiAgcmV0dXJuIG1hcERpc3BhdGNoVG9Qcm9wcyAmJiAodHlwZW9mIG1hcERpc3BhdGNoVG9Qcm9wcyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobWFwRGlzcGF0Y2hUb1Byb3BzKSkgPT09ICdvYmplY3QnID8gd3JhcE1hcFRvUHJvcHNDb25zdGFudChmdW5jdGlvbiAoZGlzcGF0Y2gpIHtcbiAgICByZXR1cm4gcmVkdXguYmluZEFjdGlvbkNyZWF0b3JzKG1hcERpc3BhdGNoVG9Qcm9wcywgZGlzcGF0Y2gpO1xuICB9KSA6IHVuZGVmaW5lZDtcbn1cblxudmFyIGRlZmF1bHRNYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMgPSBbd2hlbk1hcERpc3BhdGNoVG9Qcm9wc0lzRnVuY3Rpb24sIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc01pc3NpbmcsIHdoZW5NYXBEaXNwYXRjaFRvUHJvcHNJc09iamVjdF07XG5cbmZ1bmN0aW9uIHdoZW5NYXBTdGF0ZVRvUHJvcHNJc0Z1bmN0aW9uKG1hcFN0YXRlVG9Qcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1hcFN0YXRlVG9Qcm9wcyA9PT0gJ2Z1bmN0aW9uJyA/IHdyYXBNYXBUb1Byb3BzRnVuYyhtYXBTdGF0ZVRvUHJvcHMsICdtYXBTdGF0ZVRvUHJvcHMnKSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gd2hlbk1hcFN0YXRlVG9Qcm9wc0lzTWlzc2luZyhtYXBTdGF0ZVRvUHJvcHMpIHtcbiAgcmV0dXJuICFtYXBTdGF0ZVRvUHJvcHMgPyB3cmFwTWFwVG9Qcm9wc0NvbnN0YW50KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge307XG4gIH0pIDogdW5kZWZpbmVkO1xufVxuXG52YXIgZGVmYXVsdE1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA9IFt3aGVuTWFwU3RhdGVUb1Byb3BzSXNGdW5jdGlvbiwgd2hlbk1hcFN0YXRlVG9Qcm9wc0lzTWlzc2luZ107XG5cbmZ1bmN0aW9uIGRlZmF1bHRNZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgb3duUHJvcHMsIHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMpO1xufVxuXG5mdW5jdGlvbiB3cmFwTWVyZ2VQcm9wc0Z1bmMobWVyZ2VQcm9wcykge1xuICByZXR1cm4gZnVuY3Rpb24gaW5pdE1lcmdlUHJvcHNQcm94eShkaXNwYXRjaCwgX3JlZikge1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IF9yZWYuZGlzcGxheU5hbWUsXG4gICAgICAgIHB1cmUgPSBfcmVmLnB1cmUsXG4gICAgICAgIGFyZU1lcmdlZFByb3BzRXF1YWwgPSBfcmVmLmFyZU1lcmdlZFByb3BzRXF1YWw7XG5cbiAgICB2YXIgaGFzUnVuT25jZSA9IGZhbHNlO1xuICAgIHZhciBtZXJnZWRQcm9wcyA9IHZvaWQgMDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBtZXJnZVByb3BzUHJveHkoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpIHtcbiAgICAgIHZhciBuZXh0TWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcblxuICAgICAgaWYgKGhhc1J1bk9uY2UpIHtcbiAgICAgICAgaWYgKCFwdXJlIHx8ICFhcmVNZXJnZWRQcm9wc0VxdWFsKG5leHRNZXJnZWRQcm9wcywgbWVyZ2VkUHJvcHMpKSBtZXJnZWRQcm9wcyA9IG5leHRNZXJnZWRQcm9wcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhc1J1bk9uY2UgPSB0cnVlO1xuICAgICAgICBtZXJnZWRQcm9wcyA9IG5leHRNZXJnZWRQcm9wcztcblxuICAgICAgICB2ZXJpZnlQbGFpbk9iamVjdChtZXJnZWRQcm9wcywgZGlzcGxheU5hbWUsICdtZXJnZVByb3BzJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgICB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiB3aGVuTWVyZ2VQcm9wc0lzRnVuY3Rpb24obWVyZ2VQcm9wcykge1xuICByZXR1cm4gdHlwZW9mIG1lcmdlUHJvcHMgPT09ICdmdW5jdGlvbicgPyB3cmFwTWVyZ2VQcm9wc0Z1bmMobWVyZ2VQcm9wcykgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHdoZW5NZXJnZVByb3BzSXNPbWl0dGVkKG1lcmdlUHJvcHMpIHtcbiAgcmV0dXJuICFtZXJnZVByb3BzID8gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWVyZ2VQcm9wcztcbiAgfSA6IHVuZGVmaW5lZDtcbn1cblxudmFyIGRlZmF1bHRNZXJnZVByb3BzRmFjdG9yaWVzID0gW3doZW5NZXJnZVByb3BzSXNGdW5jdGlvbiwgd2hlbk1lcmdlUHJvcHNJc09taXR0ZWRdO1xuXG5mdW5jdGlvbiB2ZXJpZnkoc2VsZWN0b3IsIG1ldGhvZE5hbWUsIGRpc3BsYXlOYW1lKSB7XG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgdmFsdWUgZm9yICcgKyBtZXRob2ROYW1lICsgJyBpbiAnICsgZGlzcGxheU5hbWUgKyAnLicpO1xuICB9IGVsc2UgaWYgKG1ldGhvZE5hbWUgPT09ICdtYXBTdGF0ZVRvUHJvcHMnIHx8IG1ldGhvZE5hbWUgPT09ICdtYXBEaXNwYXRjaFRvUHJvcHMnKSB7XG4gICAgaWYgKCFzZWxlY3Rvci5oYXNPd25Qcm9wZXJ0eSgnZGVwZW5kc09uT3duUHJvcHMnKSkge1xuICAgICAgd2FybmluZygnVGhlIHNlbGVjdG9yIGZvciAnICsgbWV0aG9kTmFtZSArICcgb2YgJyArIGRpc3BsYXlOYW1lICsgJyBkaWQgbm90IHNwZWNpZnkgYSB2YWx1ZSBmb3IgZGVwZW5kc09uT3duUHJvcHMuJyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZlcmlmeVN1YnNlbGVjdG9ycyhtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmVyaWZ5KG1hcFN0YXRlVG9Qcm9wcywgJ21hcFN0YXRlVG9Qcm9wcycsIGRpc3BsYXlOYW1lKTtcbiAgdmVyaWZ5KG1hcERpc3BhdGNoVG9Qcm9wcywgJ21hcERpc3BhdGNoVG9Qcm9wcycsIGRpc3BsYXlOYW1lKTtcbiAgdmVyaWZ5KG1lcmdlUHJvcHMsICdtZXJnZVByb3BzJywgZGlzcGxheU5hbWUpO1xufVxuXG5mdW5jdGlvbiBpbXB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzLCBkaXNwYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24gaW1wdXJlRmluYWxQcm9wc1NlbGVjdG9yKHN0YXRlLCBvd25Qcm9wcykge1xuICAgIHJldHVybiBtZXJnZVByb3BzKG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpLCBtYXBEaXNwYXRjaFRvUHJvcHMoZGlzcGF0Y2gsIG93blByb3BzKSwgb3duUHJvcHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwdXJlRmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgZGlzcGF0Y2gsIF9yZWYpIHtcbiAgdmFyIGFyZVN0YXRlc0VxdWFsID0gX3JlZi5hcmVTdGF0ZXNFcXVhbCxcbiAgICAgIGFyZU93blByb3BzRXF1YWwgPSBfcmVmLmFyZU93blByb3BzRXF1YWwsXG4gICAgICBhcmVTdGF0ZVByb3BzRXF1YWwgPSBfcmVmLmFyZVN0YXRlUHJvcHNFcXVhbDtcblxuICB2YXIgaGFzUnVuQXRMZWFzdE9uY2UgPSBmYWxzZTtcbiAgdmFyIHN0YXRlID0gdm9pZCAwO1xuICB2YXIgb3duUHJvcHMgPSB2b2lkIDA7XG4gIHZhciBzdGF0ZVByb3BzID0gdm9pZCAwO1xuICB2YXIgZGlzcGF0Y2hQcm9wcyA9IHZvaWQgMDtcbiAgdmFyIG1lcmdlZFByb3BzID0gdm9pZCAwO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUZpcnN0Q2FsbChmaXJzdFN0YXRlLCBmaXJzdE93blByb3BzKSB7XG4gICAgc3RhdGUgPSBmaXJzdFN0YXRlO1xuICAgIG93blByb3BzID0gZmlyc3RPd25Qcm9wcztcbiAgICBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG4gICAgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuICAgIG1lcmdlZFByb3BzID0gbWVyZ2VQcm9wcyhzdGF0ZVByb3BzLCBkaXNwYXRjaFByb3BzLCBvd25Qcm9wcyk7XG4gICAgaGFzUnVuQXRMZWFzdE9uY2UgPSB0cnVlO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1Byb3BzQW5kTmV3U3RhdGUoKSB7XG4gICAgc3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuXG4gICAgaWYgKG1hcERpc3BhdGNoVG9Qcm9wcy5kZXBlbmRzT25Pd25Qcm9wcykgZGlzcGF0Y2hQcm9wcyA9IG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCwgb3duUHJvcHMpO1xuXG4gICAgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcbiAgICByZXR1cm4gbWVyZ2VkUHJvcHM7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVOZXdQcm9wcygpIHtcbiAgICBpZiAobWFwU3RhdGVUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBzdGF0ZVByb3BzID0gbWFwU3RhdGVUb1Byb3BzKHN0YXRlLCBvd25Qcm9wcyk7XG5cbiAgICBpZiAobWFwRGlzcGF0Y2hUb1Byb3BzLmRlcGVuZHNPbk93blByb3BzKSBkaXNwYXRjaFByb3BzID0gbWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICBtZXJnZWRQcm9wcyA9IG1lcmdlUHJvcHMoc3RhdGVQcm9wcywgZGlzcGF0Y2hQcm9wcywgb3duUHJvcHMpO1xuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU5ld1N0YXRlKCkge1xuICAgIHZhciBuZXh0U3RhdGVQcm9wcyA9IG1hcFN0YXRlVG9Qcm9wcyhzdGF0ZSwgb3duUHJvcHMpO1xuICAgIHZhciBzdGF0ZVByb3BzQ2hhbmdlZCA9ICFhcmVTdGF0ZVByb3BzRXF1YWwobmV4dFN0YXRlUHJvcHMsIHN0YXRlUHJvcHMpO1xuICAgIHN0YXRlUHJvcHMgPSBuZXh0U3RhdGVQcm9wcztcblxuICAgIGlmIChzdGF0ZVByb3BzQ2hhbmdlZCkgbWVyZ2VkUHJvcHMgPSBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKTtcblxuICAgIHJldHVybiBtZXJnZWRQcm9wcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVN1YnNlcXVlbnRDYWxscyhuZXh0U3RhdGUsIG5leHRPd25Qcm9wcykge1xuICAgIHZhciBwcm9wc0NoYW5nZWQgPSAhYXJlT3duUHJvcHNFcXVhbChuZXh0T3duUHJvcHMsIG93blByb3BzKTtcbiAgICB2YXIgc3RhdGVDaGFuZ2VkID0gIWFyZVN0YXRlc0VxdWFsKG5leHRTdGF0ZSwgc3RhdGUpO1xuICAgIHN0YXRlID0gbmV4dFN0YXRlO1xuICAgIG93blByb3BzID0gbmV4dE93blByb3BzO1xuXG4gICAgaWYgKHByb3BzQ2hhbmdlZCAmJiBzdGF0ZUNoYW5nZWQpIHJldHVybiBoYW5kbGVOZXdQcm9wc0FuZE5ld1N0YXRlKCk7XG4gICAgaWYgKHByb3BzQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1Byb3BzKCk7XG4gICAgaWYgKHN0YXRlQ2hhbmdlZCkgcmV0dXJuIGhhbmRsZU5ld1N0YXRlKCk7XG4gICAgcmV0dXJuIG1lcmdlZFByb3BzO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHB1cmVGaW5hbFByb3BzU2VsZWN0b3IobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIHtcbiAgICByZXR1cm4gaGFzUnVuQXRMZWFzdE9uY2UgPyBoYW5kbGVTdWJzZXF1ZW50Q2FsbHMobmV4dFN0YXRlLCBuZXh0T3duUHJvcHMpIDogaGFuZGxlRmlyc3RDYWxsKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKTtcbiAgfTtcbn1cblxuLy8gVE9ETzogQWRkIG1vcmUgY29tbWVudHNcblxuLy8gSWYgcHVyZSBpcyB0cnVlLCB0aGUgc2VsZWN0b3IgcmV0dXJuZWQgYnkgc2VsZWN0b3JGYWN0b3J5IHdpbGwgbWVtb2l6ZSBpdHMgcmVzdWx0cyxcbi8vIGFsbG93aW5nIGNvbm5lY3RBZHZhbmNlZCdzIHNob3VsZENvbXBvbmVudFVwZGF0ZSB0byByZXR1cm4gZmFsc2UgaWYgZmluYWxcbi8vIHByb3BzIGhhdmUgbm90IGNoYW5nZWQuIElmIGZhbHNlLCB0aGUgc2VsZWN0b3Igd2lsbCBhbHdheXMgcmV0dXJuIGEgbmV3XG4vLyBvYmplY3QgYW5kIHNob3VsZENvbXBvbmVudFVwZGF0ZSB3aWxsIGFsd2F5cyByZXR1cm4gdHJ1ZS5cblxuZnVuY3Rpb24gZmluYWxQcm9wc1NlbGVjdG9yRmFjdG9yeShkaXNwYXRjaCwgX3JlZjIpIHtcbiAgdmFyIGluaXRNYXBTdGF0ZVRvUHJvcHMgPSBfcmVmMi5pbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyA9IF9yZWYyLmluaXRNYXBEaXNwYXRjaFRvUHJvcHMsXG4gICAgICBpbml0TWVyZ2VQcm9wcyA9IF9yZWYyLmluaXRNZXJnZVByb3BzLFxuICAgICAgb3B0aW9ucyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ2luaXRNYXBTdGF0ZVRvUHJvcHMnLCAnaW5pdE1hcERpc3BhdGNoVG9Qcm9wcycsICdpbml0TWVyZ2VQcm9wcyddKTtcblxuICB2YXIgbWFwU3RhdGVUb1Byb3BzID0gaW5pdE1hcFN0YXRlVG9Qcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG4gIHZhciBtYXBEaXNwYXRjaFRvUHJvcHMgPSBpbml0TWFwRGlzcGF0Y2hUb1Byb3BzKGRpc3BhdGNoLCBvcHRpb25zKTtcbiAgdmFyIG1lcmdlUHJvcHMgPSBpbml0TWVyZ2VQcm9wcyhkaXNwYXRjaCwgb3B0aW9ucyk7XG5cbiAge1xuICAgIHZlcmlmeVN1YnNlbGVjdG9ycyhtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcywgb3B0aW9ucy5kaXNwbGF5TmFtZSk7XG4gIH1cblxuICB2YXIgc2VsZWN0b3JGYWN0b3J5ID0gb3B0aW9ucy5wdXJlID8gcHVyZUZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkgOiBpbXB1cmVGaW5hbFByb3BzU2VsZWN0b3JGYWN0b3J5O1xuXG4gIHJldHVybiBzZWxlY3RvckZhY3RvcnkobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMsIG1lcmdlUHJvcHMsIGRpc3BhdGNoLCBvcHRpb25zKTtcbn1cblxuLypcbiAgY29ubmVjdCBpcyBhIGZhY2FkZSBvdmVyIGNvbm5lY3RBZHZhbmNlZC4gSXQgdHVybnMgaXRzIGFyZ3MgaW50byBhIGNvbXBhdGlibGVcbiAgc2VsZWN0b3JGYWN0b3J5LCB3aGljaCBoYXMgdGhlIHNpZ25hdHVyZTpcblxuICAgIChkaXNwYXRjaCwgb3B0aW9ucykgPT4gKG5leHRTdGF0ZSwgbmV4dE93blByb3BzKSA9PiBuZXh0RmluYWxQcm9wc1xuICBcbiAgY29ubmVjdCBwYXNzZXMgaXRzIGFyZ3MgdG8gY29ubmVjdEFkdmFuY2VkIGFzIG9wdGlvbnMsIHdoaWNoIHdpbGwgaW4gdHVybiBwYXNzIHRoZW0gdG9cbiAgc2VsZWN0b3JGYWN0b3J5IGVhY2ggdGltZSBhIENvbm5lY3QgY29tcG9uZW50IGluc3RhbmNlIGlzIGluc3RhbnRpYXRlZCBvciBob3QgcmVsb2FkZWQuXG5cbiAgc2VsZWN0b3JGYWN0b3J5IHJldHVybnMgYSBmaW5hbCBwcm9wcyBzZWxlY3RvciBmcm9tIGl0cyBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHNGYWN0b3JpZXMsIG1lcmdlUHJvcHMsXG4gIG1lcmdlUHJvcHNGYWN0b3JpZXMsIGFuZCBwdXJlIGFyZ3MuXG5cbiAgVGhlIHJlc3VsdGluZyBmaW5hbCBwcm9wcyBzZWxlY3RvciBpcyBjYWxsZWQgYnkgdGhlIENvbm5lY3QgY29tcG9uZW50IGluc3RhbmNlIHdoZW5ldmVyXG4gIGl0IHJlY2VpdmVzIG5ldyBwcm9wcyBvciBzdG9yZSBzdGF0ZS5cbiAqL1xuXG5mdW5jdGlvbiBtYXRjaChhcmcsIGZhY3RvcmllcywgbmFtZSkge1xuICBmb3IgKHZhciBpID0gZmFjdG9yaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIHJlc3VsdCA9IGZhY3Rvcmllc1tpXShhcmcpO1xuICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGRpc3BhdGNoLCBvcHRpb25zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIG9mIHR5cGUgJyArICh0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhcmcpKSArICcgZm9yICcgKyBuYW1lICsgJyBhcmd1bWVudCB3aGVuIGNvbm5lY3RpbmcgY29tcG9uZW50ICcgKyBvcHRpb25zLndyYXBwZWRDb21wb25lbnROYW1lICsgJy4nKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3RyaWN0RXF1YWwoYSwgYikge1xuICByZXR1cm4gYSA9PT0gYjtcbn1cblxuLy8gY3JlYXRlQ29ubmVjdCB3aXRoIGRlZmF1bHQgYXJncyBidWlsZHMgdGhlICdvZmZpY2lhbCcgY29ubmVjdCBiZWhhdmlvci4gQ2FsbGluZyBpdCB3aXRoXG4vLyBkaWZmZXJlbnQgb3B0aW9ucyBvcGVucyB1cCBzb21lIHRlc3RpbmcgYW5kIGV4dGVuc2liaWxpdHkgc2NlbmFyaW9zXG5mdW5jdGlvbiBjcmVhdGVDb25uZWN0KCkge1xuICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBfcmVmJGNvbm5lY3RIT0MgPSBfcmVmLmNvbm5lY3RIT0MsXG4gICAgICBjb25uZWN0SE9DID0gX3JlZiRjb25uZWN0SE9DID09PSB1bmRlZmluZWQgPyBjb25uZWN0QWR2YW5jZWQgOiBfcmVmJGNvbm5lY3RIT0MsXG4gICAgICBfcmVmJG1hcFN0YXRlVG9Qcm9wc0YgPSBfcmVmLm1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyxcbiAgICAgIG1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWFwU3RhdGVUb1Byb3BzRiA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1hcFN0YXRlVG9Qcm9wc0ZhY3RvcmllcyA6IF9yZWYkbWFwU3RhdGVUb1Byb3BzRixcbiAgICAgIF9yZWYkbWFwRGlzcGF0Y2hUb1BybyA9IF9yZWYubWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLFxuICAgICAgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzID0gX3JlZiRtYXBEaXNwYXRjaFRvUHJvID09PSB1bmRlZmluZWQgPyBkZWZhdWx0TWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzIDogX3JlZiRtYXBEaXNwYXRjaFRvUHJvLFxuICAgICAgX3JlZiRtZXJnZVByb3BzRmFjdG9yID0gX3JlZi5tZXJnZVByb3BzRmFjdG9yaWVzLFxuICAgICAgbWVyZ2VQcm9wc0ZhY3RvcmllcyA9IF9yZWYkbWVyZ2VQcm9wc0ZhY3RvciA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdE1lcmdlUHJvcHNGYWN0b3JpZXMgOiBfcmVmJG1lcmdlUHJvcHNGYWN0b3IsXG4gICAgICBfcmVmJHNlbGVjdG9yRmFjdG9yeSA9IF9yZWYuc2VsZWN0b3JGYWN0b3J5LFxuICAgICAgc2VsZWN0b3JGYWN0b3J5ID0gX3JlZiRzZWxlY3RvckZhY3RvcnkgPT09IHVuZGVmaW5lZCA/IGZpbmFsUHJvcHNTZWxlY3RvckZhY3RvcnkgOiBfcmVmJHNlbGVjdG9yRmFjdG9yeTtcblxuICByZXR1cm4gZnVuY3Rpb24gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcywgbWVyZ2VQcm9wcykge1xuICAgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDoge307XG5cbiAgICB2YXIgX3JlZjIkcHVyZSA9IF9yZWYyLnB1cmUsXG4gICAgICAgIHB1cmUgPSBfcmVmMiRwdXJlID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjIkcHVyZSxcbiAgICAgICAgX3JlZjIkYXJlU3RhdGVzRXF1YWwgPSBfcmVmMi5hcmVTdGF0ZXNFcXVhbCxcbiAgICAgICAgYXJlU3RhdGVzRXF1YWwgPSBfcmVmMiRhcmVTdGF0ZXNFcXVhbCA9PT0gdW5kZWZpbmVkID8gc3RyaWN0RXF1YWwgOiBfcmVmMiRhcmVTdGF0ZXNFcXVhbCxcbiAgICAgICAgX3JlZjIkYXJlT3duUHJvcHNFcXVhID0gX3JlZjIuYXJlT3duUHJvcHNFcXVhbCxcbiAgICAgICAgYXJlT3duUHJvcHNFcXVhbCA9IF9yZWYyJGFyZU93blByb3BzRXF1YSA9PT0gdW5kZWZpbmVkID8gc2hhbGxvd0VxdWFsIDogX3JlZjIkYXJlT3duUHJvcHNFcXVhLFxuICAgICAgICBfcmVmMiRhcmVTdGF0ZVByb3BzRXEgPSBfcmVmMi5hcmVTdGF0ZVByb3BzRXF1YWwsXG4gICAgICAgIGFyZVN0YXRlUHJvcHNFcXVhbCA9IF9yZWYyJGFyZVN0YXRlUHJvcHNFcSA9PT0gdW5kZWZpbmVkID8gc2hhbGxvd0VxdWFsIDogX3JlZjIkYXJlU3RhdGVQcm9wc0VxLFxuICAgICAgICBfcmVmMiRhcmVNZXJnZWRQcm9wc0UgPSBfcmVmMi5hcmVNZXJnZWRQcm9wc0VxdWFsLFxuICAgICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsID0gX3JlZjIkYXJlTWVyZ2VkUHJvcHNFID09PSB1bmRlZmluZWQgPyBzaGFsbG93RXF1YWwgOiBfcmVmMiRhcmVNZXJnZWRQcm9wc0UsXG4gICAgICAgIGV4dHJhT3B0aW9ucyA9IG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYyLCBbJ3B1cmUnLCAnYXJlU3RhdGVzRXF1YWwnLCAnYXJlT3duUHJvcHNFcXVhbCcsICdhcmVTdGF0ZVByb3BzRXF1YWwnLCAnYXJlTWVyZ2VkUHJvcHNFcXVhbCddKTtcblxuICAgIHZhciBpbml0TWFwU3RhdGVUb1Byb3BzID0gbWF0Y2gobWFwU3RhdGVUb1Byb3BzLCBtYXBTdGF0ZVRvUHJvcHNGYWN0b3JpZXMsICdtYXBTdGF0ZVRvUHJvcHMnKTtcbiAgICB2YXIgaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyA9IG1hdGNoKG1hcERpc3BhdGNoVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzRmFjdG9yaWVzLCAnbWFwRGlzcGF0Y2hUb1Byb3BzJyk7XG4gICAgdmFyIGluaXRNZXJnZVByb3BzID0gbWF0Y2gobWVyZ2VQcm9wcywgbWVyZ2VQcm9wc0ZhY3RvcmllcywgJ21lcmdlUHJvcHMnKTtcblxuICAgIHJldHVybiBjb25uZWN0SE9DKHNlbGVjdG9yRmFjdG9yeSwgX2V4dGVuZHMoe1xuICAgICAgLy8gdXNlZCBpbiBlcnJvciBtZXNzYWdlc1xuICAgICAgbWV0aG9kTmFtZTogJ2Nvbm5lY3QnLFxuXG4gICAgICAvLyB1c2VkIHRvIGNvbXB1dGUgQ29ubmVjdCdzIGRpc3BsYXlOYW1lIGZyb20gdGhlIHdyYXBwZWQgY29tcG9uZW50J3MgZGlzcGxheU5hbWUuXG4gICAgICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUobmFtZSkge1xuICAgICAgICByZXR1cm4gJ0Nvbm5lY3QoJyArIG5hbWUgKyAnKSc7XG4gICAgICB9LFxuXG4gICAgICAvLyBpZiBtYXBTdGF0ZVRvUHJvcHMgaXMgZmFsc3ksIHRoZSBDb25uZWN0IGNvbXBvbmVudCBkb2Vzbid0IHN1YnNjcmliZSB0byBzdG9yZSBzdGF0ZSBjaGFuZ2VzXG4gICAgICBzaG91bGRIYW5kbGVTdGF0ZUNoYW5nZXM6IEJvb2xlYW4obWFwU3RhdGVUb1Byb3BzKSxcblxuICAgICAgLy8gcGFzc2VkIHRocm91Z2ggdG8gc2VsZWN0b3JGYWN0b3J5XG4gICAgICBpbml0TWFwU3RhdGVUb1Byb3BzOiBpbml0TWFwU3RhdGVUb1Byb3BzLFxuICAgICAgaW5pdE1hcERpc3BhdGNoVG9Qcm9wczogaW5pdE1hcERpc3BhdGNoVG9Qcm9wcyxcbiAgICAgIGluaXRNZXJnZVByb3BzOiBpbml0TWVyZ2VQcm9wcyxcbiAgICAgIHB1cmU6IHB1cmUsXG4gICAgICBhcmVTdGF0ZXNFcXVhbDogYXJlU3RhdGVzRXF1YWwsXG4gICAgICBhcmVPd25Qcm9wc0VxdWFsOiBhcmVPd25Qcm9wc0VxdWFsLFxuICAgICAgYXJlU3RhdGVQcm9wc0VxdWFsOiBhcmVTdGF0ZVByb3BzRXF1YWwsXG4gICAgICBhcmVNZXJnZWRQcm9wc0VxdWFsOiBhcmVNZXJnZWRQcm9wc0VxdWFsXG5cbiAgICB9LCBleHRyYU9wdGlvbnMpKTtcbiAgfTtcbn1cblxudmFyIGNvbm5lY3QgPSBjcmVhdGVDb25uZWN0KCk7XG5cbnZhciBpbmRleCA9IHsgUHJvdmlkZXI6IFByb3ZpZGVyLCBjb25uZWN0OiBjb25uZWN0LCBjb25uZWN0QWR2YW5jZWQ6IGNvbm5lY3RBZHZhbmNlZCB9O1xuXG5yZXR1cm4gaW5kZXg7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QtcmVkdXguanMubWFwXG4iLCIhZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGZ1bmN0aW9uIFZOb2RlKCkge31cbiAgICBmdW5jdGlvbiBoKG5vZGVOYW1lLCBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIHZhciBsYXN0U2ltcGxlLCBjaGlsZCwgc2ltcGxlLCBpLCBjaGlsZHJlbiA9IEVNUFRZX0NISUxEUkVOO1xuICAgICAgICBmb3IgKGkgPSBhcmd1bWVudHMubGVuZ3RoOyBpLS0gPiAyOyApIHN0YWNrLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMgJiYgbnVsbCAhPSBhdHRyaWJ1dGVzLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkgc3RhY2sucHVzaChhdHRyaWJ1dGVzLmNoaWxkcmVuKTtcbiAgICAgICAgICAgIGRlbGV0ZSBhdHRyaWJ1dGVzLmNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChzdGFjay5sZW5ndGgpIGlmICgoY2hpbGQgPSBzdGFjay5wb3AoKSkgJiYgdm9pZCAwICE9PSBjaGlsZC5wb3ApIGZvciAoaSA9IGNoaWxkLmxlbmd0aDsgaS0tOyApIHN0YWNrLnB1c2goY2hpbGRbaV0pOyBlbHNlIHtcbiAgICAgICAgICAgIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIGNoaWxkKSBjaGlsZCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoc2ltcGxlID0gJ2Z1bmN0aW9uJyAhPSB0eXBlb2Ygbm9kZU5hbWUpIGlmIChudWxsID09IGNoaWxkKSBjaGlsZCA9ICcnOyBlbHNlIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgY2hpbGQpIGNoaWxkID0gU3RyaW5nKGNoaWxkKTsgZWxzZSBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIGNoaWxkKSBzaW1wbGUgPSAhMTtcbiAgICAgICAgICAgIGlmIChzaW1wbGUgJiYgbGFzdFNpbXBsZSkgY2hpbGRyZW5bY2hpbGRyZW4ubGVuZ3RoIC0gMV0gKz0gY2hpbGQ7IGVsc2UgaWYgKGNoaWxkcmVuID09PSBFTVBUWV9DSElMRFJFTikgY2hpbGRyZW4gPSBbIGNoaWxkIF07IGVsc2UgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICBsYXN0U2ltcGxlID0gc2ltcGxlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwID0gbmV3IFZOb2RlKCk7XG4gICAgICAgIHAubm9kZU5hbWUgPSBub2RlTmFtZTtcbiAgICAgICAgcC5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgICBwLmF0dHJpYnV0ZXMgPSBudWxsID09IGF0dHJpYnV0ZXMgPyB2b2lkIDAgOiBhdHRyaWJ1dGVzO1xuICAgICAgICBwLmtleSA9IG51bGwgPT0gYXR0cmlidXRlcyA/IHZvaWQgMCA6IGF0dHJpYnV0ZXMua2V5O1xuICAgICAgICBpZiAodm9pZCAwICE9PSBvcHRpb25zLnZub2RlKSBvcHRpb25zLnZub2RlKHApO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZXh0ZW5kKG9iaiwgcHJvcHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBwcm9wcykgb2JqW2ldID0gcHJvcHNbaV07XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsb25lRWxlbWVudCh2bm9kZSwgcHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIGgodm5vZGUubm9kZU5hbWUsIGV4dGVuZChleHRlbmQoe30sIHZub2RlLmF0dHJpYnV0ZXMpLCBwcm9wcyksIGFyZ3VtZW50cy5sZW5ndGggPiAyID8gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogdm5vZGUuY2hpbGRyZW4pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbnF1ZXVlUmVuZGVyKGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoIWNvbXBvbmVudC5fX2QgJiYgKGNvbXBvbmVudC5fX2QgPSAhMCkgJiYgMSA9PSBpdGVtcy5wdXNoKGNvbXBvbmVudCkpIChvcHRpb25zLmRlYm91bmNlUmVuZGVyaW5nIHx8IGRlZmVyKShyZXJlbmRlcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcmVuZGVyKCkge1xuICAgICAgICB2YXIgcCwgbGlzdCA9IGl0ZW1zO1xuICAgICAgICBpdGVtcyA9IFtdO1xuICAgICAgICB3aGlsZSAocCA9IGxpc3QucG9wKCkpIGlmIChwLl9fZCkgcmVuZGVyQ29tcG9uZW50KHApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1NhbWVOb2RlVHlwZShub2RlLCB2bm9kZSwgaHlkcmF0aW5nKSB7XG4gICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2Ygdm5vZGUgfHwgJ251bWJlcicgPT0gdHlwZW9mIHZub2RlKSByZXR1cm4gdm9pZCAwICE9PSBub2RlLnNwbGl0VGV4dDtcbiAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB2bm9kZS5ub2RlTmFtZSkgcmV0dXJuICFub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciAmJiBpc05hbWVkTm9kZShub2RlLCB2bm9kZS5ub2RlTmFtZSk7IGVsc2UgcmV0dXJuIGh5ZHJhdGluZyB8fCBub2RlLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9PT0gdm5vZGUubm9kZU5hbWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTmFtZWROb2RlKG5vZGUsIG5vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiBub2RlLl9fbiA9PT0gbm9kZU5hbWUgfHwgbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXROb2RlUHJvcHModm5vZGUpIHtcbiAgICAgICAgdmFyIHByb3BzID0gZXh0ZW5kKHt9LCB2bm9kZS5hdHRyaWJ1dGVzKTtcbiAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICAgICAgdmFyIGRlZmF1bHRQcm9wcyA9IHZub2RlLm5vZGVOYW1lLmRlZmF1bHRQcm9wcztcbiAgICAgICAgaWYgKHZvaWQgMCAhPT0gZGVmYXVsdFByb3BzKSBmb3IgKHZhciBpIGluIGRlZmF1bHRQcm9wcykgaWYgKHZvaWQgMCA9PT0gcHJvcHNbaV0pIHByb3BzW2ldID0gZGVmYXVsdFByb3BzW2ldO1xuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5vZGUobm9kZU5hbWUsIGlzU3ZnKSB7XG4gICAgICAgIHZhciBub2RlID0gaXNTdmcgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbm9kZU5hbWUpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG4gICAgICAgIG5vZGUuX19uID0gbm9kZU5hbWU7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUpIHtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnROb2RlKSBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRBY2Nlc3Nvcihub2RlLCBuYW1lLCBvbGQsIHZhbHVlLCBpc1N2Zykge1xuICAgICAgICBpZiAoJ2NsYXNzTmFtZScgPT09IG5hbWUpIG5hbWUgPSAnY2xhc3MnO1xuICAgICAgICBpZiAoJ2tleScgPT09IG5hbWUpIDsgZWxzZSBpZiAoJ3JlZicgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGlmIChvbGQpIG9sZChudWxsKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkgdmFsdWUobm9kZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2NsYXNzJyA9PT0gbmFtZSAmJiAhaXNTdmcpIG5vZGUuY2xhc3NOYW1lID0gdmFsdWUgfHwgJyc7IGVsc2UgaWYgKCdzdHlsZScgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgJ3N0cmluZycgPT0gdHlwZW9mIHZhbHVlIHx8ICdzdHJpbmcnID09IHR5cGVvZiBvbGQpIG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlIHx8ICcnO1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmICdvYmplY3QnID09IHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICgnc3RyaW5nJyAhPSB0eXBlb2Ygb2xkKSBmb3IgKHZhciBpIGluIG9sZCkgaWYgKCEoaSBpbiB2YWx1ZSkpIG5vZGUuc3R5bGVbaV0gPSAnJztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHZhbHVlKSBub2RlLnN0eWxlW2ldID0gJ251bWJlcicgPT0gdHlwZW9mIHZhbHVlW2ldICYmICExID09PSBJU19OT05fRElNRU5TSU9OQUwudGVzdChpKSA/IHZhbHVlW2ldICsgJ3B4JyA6IHZhbHVlW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCdkYW5nZXJvdXNseVNldElubmVySFRNTCcgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkgbm9kZS5pbm5lckhUTUwgPSB2YWx1ZS5fX2h0bWwgfHwgJyc7XG4gICAgICAgIH0gZWxzZSBpZiAoJ28nID09IG5hbWVbMF0gJiYgJ24nID09IG5hbWVbMV0pIHtcbiAgICAgICAgICAgIHZhciB1c2VDYXB0dXJlID0gbmFtZSAhPT0gKG5hbWUgPSBuYW1lLnJlcGxhY2UoL0NhcHR1cmUkLywgJycpKTtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvbGQpIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudFByb3h5LCB1c2VDYXB0dXJlKTtcbiAgICAgICAgICAgIH0gZWxzZSBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnRQcm94eSwgdXNlQ2FwdHVyZSk7XG4gICAgICAgICAgICAobm9kZS5fX2wgfHwgKG5vZGUuX19sID0ge30pKVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKCdsaXN0JyAhPT0gbmFtZSAmJiAndHlwZScgIT09IG5hbWUgJiYgIWlzU3ZnICYmIG5hbWUgaW4gbm9kZSkge1xuICAgICAgICAgICAgc2V0UHJvcGVydHkobm9kZSwgbmFtZSwgbnVsbCA9PSB2YWx1ZSA/ICcnIDogdmFsdWUpO1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gdmFsdWUgfHwgITEgPT09IHZhbHVlKSBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBucyA9IGlzU3ZnICYmIG5hbWUgIT09IChuYW1lID0gbmFtZS5yZXBsYWNlKC9eeGxpbms6Py8sICcnKSk7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSB2YWx1ZSB8fCAhMSA9PT0gdmFsdWUpIGlmIChucykgbm9kZS5yZW1vdmVBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIG5hbWUudG9Mb3dlckNhc2UoKSk7IGVsc2Ugbm9kZS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IGVsc2UgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIHZhbHVlKSBpZiAobnMpIG5vZGUuc2V0QXR0cmlidXRlTlMoJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLCBuYW1lLnRvTG93ZXJDYXNlKCksIHZhbHVlKTsgZWxzZSBub2RlLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0UHJvcGVydHkobm9kZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vZGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG4gICAgZnVuY3Rpb24gZXZlbnRQcm94eShlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fbFtlLnR5cGVdKG9wdGlvbnMuZXZlbnQgJiYgb3B0aW9ucy5ldmVudChlKSB8fCBlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmx1c2hNb3VudHMoKSB7XG4gICAgICAgIHZhciBjO1xuICAgICAgICB3aGlsZSAoYyA9IG1vdW50cy5wb3AoKSkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWZ0ZXJNb3VudCkgb3B0aW9ucy5hZnRlck1vdW50KGMpO1xuICAgICAgICAgICAgaWYgKGMuY29tcG9uZW50RGlkTW91bnQpIGMuY29tcG9uZW50RGlkTW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkaWZmKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsLCBwYXJlbnQsIGNvbXBvbmVudFJvb3QpIHtcbiAgICAgICAgaWYgKCFkaWZmTGV2ZWwrKykge1xuICAgICAgICAgICAgaXNTdmdNb2RlID0gbnVsbCAhPSBwYXJlbnQgJiYgdm9pZCAwICE9PSBwYXJlbnQub3duZXJTVkdFbGVtZW50O1xuICAgICAgICAgICAgaHlkcmF0aW5nID0gbnVsbCAhPSBkb20gJiYgISgnX19wcmVhY3RhdHRyXycgaW4gZG9tKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV0ID0gaWRpZmYoZG9tLCB2bm9kZSwgY29udGV4dCwgbW91bnRBbGwsIGNvbXBvbmVudFJvb3QpO1xuICAgICAgICBpZiAocGFyZW50ICYmIHJldC5wYXJlbnROb2RlICE9PSBwYXJlbnQpIHBhcmVudC5hcHBlbmRDaGlsZChyZXQpO1xuICAgICAgICBpZiAoIS0tZGlmZkxldmVsKSB7XG4gICAgICAgICAgICBoeWRyYXRpbmcgPSAhMTtcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50Um9vdCkgZmx1c2hNb3VudHMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBpZGlmZihkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCwgY29tcG9uZW50Um9vdCkge1xuICAgICAgICB2YXIgb3V0ID0gZG9tLCBwcmV2U3ZnTW9kZSA9IGlzU3ZnTW9kZTtcbiAgICAgICAgaWYgKG51bGwgPT0gdm5vZGUgfHwgJ2Jvb2xlYW4nID09IHR5cGVvZiB2bm9kZSkgdm5vZGUgPSAnJztcbiAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB2bm9kZSB8fCAnbnVtYmVyJyA9PSB0eXBlb2Ygdm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChkb20gJiYgdm9pZCAwICE9PSBkb20uc3BsaXRUZXh0ICYmIGRvbS5wYXJlbnROb2RlICYmICghZG9tLl9jb21wb25lbnQgfHwgY29tcG9uZW50Um9vdCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9tLm5vZGVWYWx1ZSAhPSB2bm9kZSkgZG9tLm5vZGVWYWx1ZSA9IHZub2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh2bm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGRvbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tLnBhcmVudE5vZGUpIGRvbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChvdXQsIGRvbSk7XG4gICAgICAgICAgICAgICAgICAgIHJlY29sbGVjdE5vZGVUcmVlKGRvbSwgITApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dC5fX3ByZWFjdGF0dHJfID0gITA7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICAgIHZhciB2bm9kZU5hbWUgPSB2bm9kZS5ub2RlTmFtZTtcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHZub2RlTmFtZSkgcmV0dXJuIGJ1aWxkQ29tcG9uZW50RnJvbVZOb2RlKGRvbSwgdm5vZGUsIGNvbnRleHQsIG1vdW50QWxsKTtcbiAgICAgICAgaXNTdmdNb2RlID0gJ3N2ZycgPT09IHZub2RlTmFtZSA/ICEwIDogJ2ZvcmVpZ25PYmplY3QnID09PSB2bm9kZU5hbWUgPyAhMSA6IGlzU3ZnTW9kZTtcbiAgICAgICAgdm5vZGVOYW1lID0gU3RyaW5nKHZub2RlTmFtZSk7XG4gICAgICAgIGlmICghZG9tIHx8ICFpc05hbWVkTm9kZShkb20sIHZub2RlTmFtZSkpIHtcbiAgICAgICAgICAgIG91dCA9IGNyZWF0ZU5vZGUodm5vZGVOYW1lLCBpc1N2Z01vZGUpO1xuICAgICAgICAgICAgaWYgKGRvbSkge1xuICAgICAgICAgICAgICAgIHdoaWxlIChkb20uZmlyc3RDaGlsZCkgb3V0LmFwcGVuZENoaWxkKGRvbS5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoZG9tLnBhcmVudE5vZGUpIGRvbS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChvdXQsIGRvbSk7XG4gICAgICAgICAgICAgICAgcmVjb2xsZWN0Tm9kZVRyZWUoZG9tLCAhMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZjID0gb3V0LmZpcnN0Q2hpbGQsIHByb3BzID0gb3V0Ll9fcHJlYWN0YXR0cl8sIHZjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAobnVsbCA9PSBwcm9wcykge1xuICAgICAgICAgICAgcHJvcHMgPSBvdXQuX19wcmVhY3RhdHRyXyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgYSA9IG91dC5hdHRyaWJ1dGVzLCBpID0gYS5sZW5ndGg7IGktLTsgKSBwcm9wc1thW2ldLm5hbWVdID0gYVtpXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh5ZHJhdGluZyAmJiB2Y2hpbGRyZW4gJiYgMSA9PT0gdmNoaWxkcmVuLmxlbmd0aCAmJiAnc3RyaW5nJyA9PSB0eXBlb2YgdmNoaWxkcmVuWzBdICYmIG51bGwgIT0gZmMgJiYgdm9pZCAwICE9PSBmYy5zcGxpdFRleHQgJiYgbnVsbCA9PSBmYy5uZXh0U2libGluZykge1xuICAgICAgICAgICAgaWYgKGZjLm5vZGVWYWx1ZSAhPSB2Y2hpbGRyZW5bMF0pIGZjLm5vZGVWYWx1ZSA9IHZjaGlsZHJlblswXTtcbiAgICAgICAgfSBlbHNlIGlmICh2Y2hpbGRyZW4gJiYgdmNoaWxkcmVuLmxlbmd0aCB8fCBudWxsICE9IGZjKSBpbm5lckRpZmZOb2RlKG91dCwgdmNoaWxkcmVuLCBjb250ZXh0LCBtb3VudEFsbCwgaHlkcmF0aW5nIHx8IG51bGwgIT0gcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwpO1xuICAgICAgICBkaWZmQXR0cmlidXRlcyhvdXQsIHZub2RlLmF0dHJpYnV0ZXMsIHByb3BzKTtcbiAgICAgICAgaXNTdmdNb2RlID0gcHJldlN2Z01vZGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlubmVyRGlmZk5vZGUoZG9tLCB2Y2hpbGRyZW4sIGNvbnRleHQsIG1vdW50QWxsLCBpc0h5ZHJhdGluZykge1xuICAgICAgICB2YXIgaiwgYywgZiwgdmNoaWxkLCBjaGlsZCwgb3JpZ2luYWxDaGlsZHJlbiA9IGRvbS5jaGlsZE5vZGVzLCBjaGlsZHJlbiA9IFtdLCBrZXllZCA9IHt9LCBrZXllZExlbiA9IDAsIG1pbiA9IDAsIGxlbiA9IG9yaWdpbmFsQ2hpbGRyZW4ubGVuZ3RoLCBjaGlsZHJlbkxlbiA9IDAsIHZsZW4gPSB2Y2hpbGRyZW4gPyB2Y2hpbGRyZW4ubGVuZ3RoIDogMDtcbiAgICAgICAgaWYgKDAgIT09IGxlbikgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIF9jaGlsZCA9IG9yaWdpbmFsQ2hpbGRyZW5baV0sIHByb3BzID0gX2NoaWxkLl9fcHJlYWN0YXR0cl8sIGtleSA9IHZsZW4gJiYgcHJvcHMgPyBfY2hpbGQuX2NvbXBvbmVudCA/IF9jaGlsZC5fY29tcG9uZW50Ll9fayA6IHByb3BzLmtleSA6IG51bGw7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBrZXkpIHtcbiAgICAgICAgICAgICAgICBrZXllZExlbisrO1xuICAgICAgICAgICAgICAgIGtleWVkW2tleV0gPSBfY2hpbGQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb3BzIHx8ICh2b2lkIDAgIT09IF9jaGlsZC5zcGxpdFRleHQgPyBpc0h5ZHJhdGluZyA/IF9jaGlsZC5ub2RlVmFsdWUudHJpbSgpIDogITAgOiBpc0h5ZHJhdGluZykpIGNoaWxkcmVuW2NoaWxkcmVuTGVuKytdID0gX2NoaWxkO1xuICAgICAgICB9XG4gICAgICAgIGlmICgwICE9PSB2bGVuKSBmb3IgKHZhciBpID0gMDsgaSA8IHZsZW47IGkrKykge1xuICAgICAgICAgICAgdmNoaWxkID0gdmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgY2hpbGQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGtleSA9IHZjaGlsZC5rZXk7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ZWRMZW4gJiYgdm9pZCAwICE9PSBrZXllZFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0ga2V5ZWRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAga2V5ZWRba2V5XSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAga2V5ZWRMZW4tLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjaGlsZCAmJiBtaW4gPCBjaGlsZHJlbkxlbikgZm9yIChqID0gbWluOyBqIDwgY2hpbGRyZW5MZW47IGorKykgaWYgKHZvaWQgMCAhPT0gY2hpbGRyZW5bal0gJiYgaXNTYW1lTm9kZVR5cGUoYyA9IGNoaWxkcmVuW2pdLCB2Y2hpbGQsIGlzSHlkcmF0aW5nKSkge1xuICAgICAgICAgICAgICAgIGNoaWxkID0gYztcbiAgICAgICAgICAgICAgICBjaGlsZHJlbltqXSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBpZiAoaiA9PT0gY2hpbGRyZW5MZW4gLSAxKSBjaGlsZHJlbkxlbi0tO1xuICAgICAgICAgICAgICAgIGlmIChqID09PSBtaW4pIG1pbisrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hpbGQgPSBpZGlmZihjaGlsZCwgdmNoaWxkLCBjb250ZXh0LCBtb3VudEFsbCk7XG4gICAgICAgICAgICBmID0gb3JpZ2luYWxDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBjaGlsZCAhPT0gZG9tICYmIGNoaWxkICE9PSBmKSBpZiAobnVsbCA9PSBmKSBkb20uYXBwZW5kQ2hpbGQoY2hpbGQpOyBlbHNlIGlmIChjaGlsZCA9PT0gZi5uZXh0U2libGluZykgcmVtb3ZlTm9kZShmKTsgZWxzZSBkb20uaW5zZXJ0QmVmb3JlKGNoaWxkLCBmKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2V5ZWRMZW4pIGZvciAodmFyIGkgaW4ga2V5ZWQpIGlmICh2b2lkIDAgIT09IGtleWVkW2ldKSByZWNvbGxlY3ROb2RlVHJlZShrZXllZFtpXSwgITEpO1xuICAgICAgICB3aGlsZSAobWluIDw9IGNoaWxkcmVuTGVuKSBpZiAodm9pZCAwICE9PSAoY2hpbGQgPSBjaGlsZHJlbltjaGlsZHJlbkxlbi0tXSkpIHJlY29sbGVjdE5vZGVUcmVlKGNoaWxkLCAhMSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlY29sbGVjdE5vZGVUcmVlKG5vZGUsIHVubW91bnRPbmx5KSB7XG4gICAgICAgIHZhciBjb21wb25lbnQgPSBub2RlLl9jb21wb25lbnQ7XG4gICAgICAgIGlmIChjb21wb25lbnQpIHVubW91bnRDb21wb25lbnQoY29tcG9uZW50KTsgZWxzZSB7XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBub2RlLl9fcHJlYWN0YXR0cl8gJiYgbm9kZS5fX3ByZWFjdGF0dHJfLnJlZikgbm9kZS5fX3ByZWFjdGF0dHJfLnJlZihudWxsKTtcbiAgICAgICAgICAgIGlmICghMSA9PT0gdW5tb3VudE9ubHkgfHwgbnVsbCA9PSBub2RlLl9fcHJlYWN0YXR0cl8pIHJlbW92ZU5vZGUobm9kZSk7XG4gICAgICAgICAgICByZW1vdmVDaGlsZHJlbihub2RlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVDaGlsZHJlbihub2RlKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmxhc3RDaGlsZDtcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShub2RlLCAhMCk7XG4gICAgICAgICAgICBub2RlID0gbmV4dDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkaWZmQXR0cmlidXRlcyhkb20sIGF0dHJzLCBvbGQpIHtcbiAgICAgICAgdmFyIG5hbWU7XG4gICAgICAgIGZvciAobmFtZSBpbiBvbGQpIGlmICgoIWF0dHJzIHx8IG51bGwgPT0gYXR0cnNbbmFtZV0pICYmIG51bGwgIT0gb2xkW25hbWVdKSBzZXRBY2Nlc3Nvcihkb20sIG5hbWUsIG9sZFtuYW1lXSwgb2xkW25hbWVdID0gdm9pZCAwLCBpc1N2Z01vZGUpO1xuICAgICAgICBmb3IgKG5hbWUgaW4gYXR0cnMpIGlmICghKCdjaGlsZHJlbicgPT09IG5hbWUgfHwgJ2lubmVySFRNTCcgPT09IG5hbWUgfHwgbmFtZSBpbiBvbGQgJiYgYXR0cnNbbmFtZV0gPT09ICgndmFsdWUnID09PSBuYW1lIHx8ICdjaGVja2VkJyA9PT0gbmFtZSA/IGRvbVtuYW1lXSA6IG9sZFtuYW1lXSkpKSBzZXRBY2Nlc3Nvcihkb20sIG5hbWUsIG9sZFtuYW1lXSwgb2xkW25hbWVdID0gYXR0cnNbbmFtZV0sIGlzU3ZnTW9kZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbGxlY3RDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIHZhciBuYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgIChjb21wb25lbnRzW25hbWVdIHx8IChjb21wb25lbnRzW25hbWVdID0gW10pKS5wdXNoKGNvbXBvbmVudCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChDdG9yLCBwcm9wcywgY29udGV4dCkge1xuICAgICAgICB2YXIgaW5zdCwgbGlzdCA9IGNvbXBvbmVudHNbQ3Rvci5uYW1lXTtcbiAgICAgICAgaWYgKEN0b3IucHJvdG90eXBlICYmIEN0b3IucHJvdG90eXBlLnJlbmRlcikge1xuICAgICAgICAgICAgaW5zdCA9IG5ldyBDdG9yKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIENvbXBvbmVudC5jYWxsKGluc3QsIHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluc3QgPSBuZXcgQ29tcG9uZW50KHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGluc3QuY29uc3RydWN0b3IgPSBDdG9yO1xuICAgICAgICAgICAgaW5zdC5yZW5kZXIgPSBkb1JlbmRlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdCkgZm9yICh2YXIgaSA9IGxpc3QubGVuZ3RoOyBpLS07ICkgaWYgKGxpc3RbaV0uY29uc3RydWN0b3IgPT09IEN0b3IpIHtcbiAgICAgICAgICAgIGluc3QuX19iID0gbGlzdFtpXS5fX2I7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnN0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBkb1JlbmRlcihwcm9wcywgc3RhdGUsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRDb21wb25lbnRQcm9wcyhjb21wb25lbnQsIHByb3BzLCBvcHRzLCBjb250ZXh0LCBtb3VudEFsbCkge1xuICAgICAgICBpZiAoIWNvbXBvbmVudC5fX3gpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5fX3ggPSAhMDtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQuX19yID0gcHJvcHMucmVmKSBkZWxldGUgcHJvcHMucmVmO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5fX2sgPSBwcm9wcy5rZXkpIGRlbGV0ZSBwcm9wcy5rZXk7XG4gICAgICAgICAgICBpZiAoIWNvbXBvbmVudC5iYXNlIHx8IG1vdW50QWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQpIGNvbXBvbmVudC5jb21wb25lbnRXaWxsTW91bnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMpIGNvbXBvbmVudC5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGNvbXBvbmVudC5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wb25lbnQuX19jKSBjb21wb25lbnQuX19jID0gY29tcG9uZW50LmNvbnRleHQ7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjb21wb25lbnQuX19wKSBjb21wb25lbnQuX19wID0gY29tcG9uZW50LnByb3BzO1xuICAgICAgICAgICAgY29tcG9uZW50LnByb3BzID0gcHJvcHM7XG4gICAgICAgICAgICBjb21wb25lbnQuX194ID0gITE7XG4gICAgICAgICAgICBpZiAoMCAhPT0gb3B0cykgaWYgKDEgPT09IG9wdHMgfHwgITEgIT09IG9wdGlvbnMuc3luY0NvbXBvbmVudFVwZGF0ZXMgfHwgIWNvbXBvbmVudC5iYXNlKSByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCAxLCBtb3VudEFsbCk7IGVsc2UgZW5xdWV1ZVJlbmRlcihjb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudC5fX3IpIGNvbXBvbmVudC5fX3IoY29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJDb21wb25lbnQoY29tcG9uZW50LCBvcHRzLCBtb3VudEFsbCwgaXNDaGlsZCkge1xuICAgICAgICBpZiAoIWNvbXBvbmVudC5fX3gpIHtcbiAgICAgICAgICAgIHZhciByZW5kZXJlZCwgaW5zdCwgY2Jhc2UsIHByb3BzID0gY29tcG9uZW50LnByb3BzLCBzdGF0ZSA9IGNvbXBvbmVudC5zdGF0ZSwgY29udGV4dCA9IGNvbXBvbmVudC5jb250ZXh0LCBwcmV2aW91c1Byb3BzID0gY29tcG9uZW50Ll9fcCB8fCBwcm9wcywgcHJldmlvdXNTdGF0ZSA9IGNvbXBvbmVudC5fX3MgfHwgc3RhdGUsIHByZXZpb3VzQ29udGV4dCA9IGNvbXBvbmVudC5fX2MgfHwgY29udGV4dCwgaXNVcGRhdGUgPSBjb21wb25lbnQuYmFzZSwgbmV4dEJhc2UgPSBjb21wb25lbnQuX19iLCBpbml0aWFsQmFzZSA9IGlzVXBkYXRlIHx8IG5leHRCYXNlLCBpbml0aWFsQ2hpbGRDb21wb25lbnQgPSBjb21wb25lbnQuX2NvbXBvbmVudCwgc2tpcCA9ICExO1xuICAgICAgICAgICAgaWYgKGlzVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LnByb3BzID0gcHJldmlvdXNQcm9wcztcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuc3RhdGUgPSBwcmV2aW91c1N0YXRlO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5jb250ZXh0ID0gcHJldmlvdXNDb250ZXh0O1xuICAgICAgICAgICAgICAgIGlmICgyICE9PSBvcHRzICYmIGNvbXBvbmVudC5zaG91bGRDb21wb25lbnRVcGRhdGUgJiYgITEgPT09IGNvbXBvbmVudC5zaG91bGRDb21wb25lbnRVcGRhdGUocHJvcHMsIHN0YXRlLCBjb250ZXh0KSkgc2tpcCA9ICEwOyBlbHNlIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbFVwZGF0ZSkgY29tcG9uZW50LmNvbXBvbmVudFdpbGxVcGRhdGUocHJvcHMsIHN0YXRlLCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgICAgICBjb21wb25lbnQuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21wb25lbnQuX19wID0gY29tcG9uZW50Ll9fcyA9IGNvbXBvbmVudC5fX2MgPSBjb21wb25lbnQuX19iID0gbnVsbDtcbiAgICAgICAgICAgIGNvbXBvbmVudC5fX2QgPSAhMTtcbiAgICAgICAgICAgIGlmICghc2tpcCkge1xuICAgICAgICAgICAgICAgIHJlbmRlcmVkID0gY29tcG9uZW50LnJlbmRlcihwcm9wcywgc3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuZ2V0Q2hpbGRDb250ZXh0KSBjb250ZXh0ID0gZXh0ZW5kKGV4dGVuZCh7fSwgY29udGV4dCksIGNvbXBvbmVudC5nZXRDaGlsZENvbnRleHQoKSk7XG4gICAgICAgICAgICAgICAgdmFyIHRvVW5tb3VudCwgYmFzZSwgY2hpbGRDb21wb25lbnQgPSByZW5kZXJlZCAmJiByZW5kZXJlZC5ub2RlTmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgY2hpbGRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkUHJvcHMgPSBnZXROb2RlUHJvcHMocmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICBpbnN0ID0gaW5pdGlhbENoaWxkQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdCAmJiBpbnN0LmNvbnN0cnVjdG9yID09PSBjaGlsZENvbXBvbmVudCAmJiBjaGlsZFByb3BzLmtleSA9PSBpbnN0Ll9faykgc2V0Q29tcG9uZW50UHJvcHMoaW5zdCwgY2hpbGRQcm9wcywgMSwgY29udGV4dCwgITEpOyBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvVW5tb3VudCA9IGluc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQuX2NvbXBvbmVudCA9IGluc3QgPSBjcmVhdGVDb21wb25lbnQoY2hpbGRDb21wb25lbnQsIGNoaWxkUHJvcHMsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdC5fX2IgPSBpbnN0Ll9fYiB8fCBuZXh0QmFzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3QuX191ID0gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29tcG9uZW50UHJvcHMoaW5zdCwgY2hpbGRQcm9wcywgMCwgY29udGV4dCwgITEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyQ29tcG9uZW50KGluc3QsIDEsIG1vdW50QWxsLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYmFzZSA9IGluc3QuYmFzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYmFzZSA9IGluaXRpYWxCYXNlO1xuICAgICAgICAgICAgICAgICAgICB0b1VubW91bnQgPSBpbml0aWFsQ2hpbGRDb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b1VubW91bnQpIGNiYXNlID0gY29tcG9uZW50Ll9jb21wb25lbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbEJhc2UgfHwgMSA9PT0gb3B0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNiYXNlKSBjYmFzZS5fY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2UgPSBkaWZmKGNiYXNlLCByZW5kZXJlZCwgY29udGV4dCwgbW91bnRBbGwgfHwgIWlzVXBkYXRlLCBpbml0aWFsQmFzZSAmJiBpbml0aWFsQmFzZS5wYXJlbnROb2RlLCAhMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxCYXNlICYmIGJhc2UgIT09IGluaXRpYWxCYXNlICYmIGluc3QgIT09IGluaXRpYWxDaGlsZENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmFzZVBhcmVudCA9IGluaXRpYWxCYXNlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNlUGFyZW50ICYmIGJhc2UgIT09IGJhc2VQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VQYXJlbnQucmVwbGFjZUNoaWxkKGJhc2UsIGluaXRpYWxCYXNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdG9Vbm1vdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbEJhc2UuX2NvbXBvbmVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb2xsZWN0Tm9kZVRyZWUoaW5pdGlhbEJhc2UsICExKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG9Vbm1vdW50KSB1bm1vdW50Q29tcG9uZW50KHRvVW5tb3VudCk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50LmJhc2UgPSBiYXNlO1xuICAgICAgICAgICAgICAgIGlmIChiYXNlICYmICFpc0NoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRSZWYgPSBjb21wb25lbnQsIHQgPSBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ID0gdC5fX3UpIChjb21wb25lbnRSZWYgPSB0KS5iYXNlID0gYmFzZTtcbiAgICAgICAgICAgICAgICAgICAgYmFzZS5fY29tcG9uZW50ID0gY29tcG9uZW50UmVmO1xuICAgICAgICAgICAgICAgICAgICBiYXNlLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9IGNvbXBvbmVudFJlZi5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzVXBkYXRlIHx8IG1vdW50QWxsKSBtb3VudHMudW5zaGlmdChjb21wb25lbnQpOyBlbHNlIGlmICghc2tpcCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKSBjb21wb25lbnQuY29tcG9uZW50RGlkVXBkYXRlKHByZXZpb3VzUHJvcHMsIHByZXZpb3VzU3RhdGUsIHByZXZpb3VzQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuYWZ0ZXJVcGRhdGUpIG9wdGlvbnMuYWZ0ZXJVcGRhdGUoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChudWxsICE9IGNvbXBvbmVudC5fX2gpIHdoaWxlIChjb21wb25lbnQuX19oLmxlbmd0aCkgY29tcG9uZW50Ll9faC5wb3AoKS5jYWxsKGNvbXBvbmVudCk7XG4gICAgICAgICAgICBpZiAoIWRpZmZMZXZlbCAmJiAhaXNDaGlsZCkgZmx1c2hNb3VudHMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBidWlsZENvbXBvbmVudEZyb21WTm9kZShkb20sIHZub2RlLCBjb250ZXh0LCBtb3VudEFsbCkge1xuICAgICAgICB2YXIgYyA9IGRvbSAmJiBkb20uX2NvbXBvbmVudCwgb3JpZ2luYWxDb21wb25lbnQgPSBjLCBvbGREb20gPSBkb20sIGlzRGlyZWN0T3duZXIgPSBjICYmIGRvbS5fY29tcG9uZW50Q29uc3RydWN0b3IgPT09IHZub2RlLm5vZGVOYW1lLCBpc093bmVyID0gaXNEaXJlY3RPd25lciwgcHJvcHMgPSBnZXROb2RlUHJvcHModm5vZGUpO1xuICAgICAgICB3aGlsZSAoYyAmJiAhaXNPd25lciAmJiAoYyA9IGMuX191KSkgaXNPd25lciA9IGMuY29uc3RydWN0b3IgPT09IHZub2RlLm5vZGVOYW1lO1xuICAgICAgICBpZiAoYyAmJiBpc093bmVyICYmICghbW91bnRBbGwgfHwgYy5fY29tcG9uZW50KSkge1xuICAgICAgICAgICAgc2V0Q29tcG9uZW50UHJvcHMoYywgcHJvcHMsIDMsIGNvbnRleHQsIG1vdW50QWxsKTtcbiAgICAgICAgICAgIGRvbSA9IGMuYmFzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbENvbXBvbmVudCAmJiAhaXNEaXJlY3RPd25lcikge1xuICAgICAgICAgICAgICAgIHVubW91bnRDb21wb25lbnQob3JpZ2luYWxDb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIGRvbSA9IG9sZERvbSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjID0gY3JlYXRlQ29tcG9uZW50KHZub2RlLm5vZGVOYW1lLCBwcm9wcywgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAoZG9tICYmICFjLl9fYikge1xuICAgICAgICAgICAgICAgIGMuX19iID0gZG9tO1xuICAgICAgICAgICAgICAgIG9sZERvbSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRDb21wb25lbnRQcm9wcyhjLCBwcm9wcywgMSwgY29udGV4dCwgbW91bnRBbGwpO1xuICAgICAgICAgICAgZG9tID0gYy5iYXNlO1xuICAgICAgICAgICAgaWYgKG9sZERvbSAmJiBkb20gIT09IG9sZERvbSkge1xuICAgICAgICAgICAgICAgIG9sZERvbS5fY29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICByZWNvbGxlY3ROb2RlVHJlZShvbGREb20sICExKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9tO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1bm1vdW50Q29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICBpZiAob3B0aW9ucy5iZWZvcmVVbm1vdW50KSBvcHRpb25zLmJlZm9yZVVubW91bnQoY29tcG9uZW50KTtcbiAgICAgICAgdmFyIGJhc2UgPSBjb21wb25lbnQuYmFzZTtcbiAgICAgICAgY29tcG9uZW50Ll9feCA9ICEwO1xuICAgICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxVbm1vdW50KSBjb21wb25lbnQuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgICAgY29tcG9uZW50LmJhc2UgPSBudWxsO1xuICAgICAgICB2YXIgaW5uZXIgPSBjb21wb25lbnQuX2NvbXBvbmVudDtcbiAgICAgICAgaWYgKGlubmVyKSB1bm1vdW50Q29tcG9uZW50KGlubmVyKTsgZWxzZSBpZiAoYmFzZSkge1xuICAgICAgICAgICAgaWYgKGJhc2UuX19wcmVhY3RhdHRyXyAmJiBiYXNlLl9fcHJlYWN0YXR0cl8ucmVmKSBiYXNlLl9fcHJlYWN0YXR0cl8ucmVmKG51bGwpO1xuICAgICAgICAgICAgY29tcG9uZW50Ll9fYiA9IGJhc2U7XG4gICAgICAgICAgICByZW1vdmVOb2RlKGJhc2UpO1xuICAgICAgICAgICAgY29sbGVjdENvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgcmVtb3ZlQ2hpbGRyZW4oYmFzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBvbmVudC5fX3IpIGNvbXBvbmVudC5fX3IobnVsbCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCkge1xuICAgICAgICB0aGlzLl9fZCA9ICEwO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlIHx8IHt9O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXIodm5vZGUsIHBhcmVudCwgbWVyZ2UpIHtcbiAgICAgICAgcmV0dXJuIGRpZmYobWVyZ2UsIHZub2RlLCB7fSwgITEsIHBhcmVudCwgITEpO1xuICAgIH1cbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgIHZhciBzdGFjayA9IFtdO1xuICAgIHZhciBFTVBUWV9DSElMRFJFTiA9IFtdO1xuICAgIHZhciBkZWZlciA9ICdmdW5jdGlvbicgPT0gdHlwZW9mIFByb21pc2UgPyBQcm9taXNlLnJlc29sdmUoKS50aGVuLmJpbmQoUHJvbWlzZS5yZXNvbHZlKCkpIDogc2V0VGltZW91dDtcbiAgICB2YXIgSVNfTk9OX0RJTUVOU0lPTkFMID0gL2FjaXR8ZXgoPzpzfGd8bnxwfCQpfHJwaHxvd3N8bW5jfG50d3xpbmVbY2hdfHpvb3xeb3JkL2k7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdmFyIG1vdW50cyA9IFtdO1xuICAgIHZhciBkaWZmTGV2ZWwgPSAwO1xuICAgIHZhciBpc1N2Z01vZGUgPSAhMTtcbiAgICB2YXIgaHlkcmF0aW5nID0gITE7XG4gICAgdmFyIGNvbXBvbmVudHMgPSB7fTtcbiAgICBleHRlbmQoQ29tcG9uZW50LnByb3RvdHlwZSwge1xuICAgICAgICBzZXRTdGF0ZTogZnVuY3Rpb24oc3RhdGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgcyA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX19zKSB0aGlzLl9fcyA9IGV4dGVuZCh7fSwgcyk7XG4gICAgICAgICAgICBleHRlbmQocywgJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygc3RhdGUgPyBzdGF0ZShzLCB0aGlzLnByb3BzKSA6IHN0YXRlKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgKHRoaXMuX19oID0gdGhpcy5fX2ggfHwgW10pLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgICAgZW5xdWV1ZVJlbmRlcih0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZm9yY2VVcGRhdGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spICh0aGlzLl9faCA9IHRoaXMuX19oIHx8IFtdKS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHJlbmRlckNvbXBvbmVudCh0aGlzLCAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHt9XG4gICAgfSk7XG4gICAgdmFyIHByZWFjdCA9IHtcbiAgICAgICAgaDogaCxcbiAgICAgICAgY3JlYXRlRWxlbWVudDogaCxcbiAgICAgICAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG4gICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50LFxuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgcmVyZW5kZXI6IHJlcmVuZGVyLFxuICAgICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfTtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG1vZHVsZSkgbW9kdWxlLmV4cG9ydHMgPSBwcmVhY3Q7IGVsc2Ugc2VsZi5wcmVhY3QgPSBwcmVhY3Q7XG59KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmVhY3QuanMubWFwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoX3JlZikge1xuXHR2YXIgX2NsYXNzLCBfdGVtcDI7XG5cblx0dmFyIENvbXBvbmVudCA9IF9yZWYuQ29tcG9uZW50LFxuXHQgICAgY3JlYXRlRWxlbWVudCA9IF9yZWYuY3JlYXRlRWxlbWVudDtcblx0cmV0dXJuIF90ZW1wMiA9IF9jbGFzcyA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG5cdFx0X2luaGVyaXRzKFJlYWN0SGludCwgX0NvbXBvbmVudCk7XG5cblx0XHRmdW5jdGlvbiBSZWFjdEhpbnQoKSB7XG5cdFx0XHR2YXIgX3RlbXAsIF90aGlzLCBfcmV0O1xuXG5cdFx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVhY3RIaW50KTtcblxuXHRcdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRcdFx0YXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF9yZXQgPSAoX3RlbXAgPSAoX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBfQ29tcG9uZW50LmNhbGwuYXBwbHkoX0NvbXBvbmVudCwgW3RoaXNdLmNvbmNhdChhcmdzKSkpLCBfdGhpcyksIF90aGlzLnN0YXRlID0geyB0YXJnZXQ6IG51bGwgfSwgX3RoaXMuX2NvbnRhaW5lclN0eWxlID0geyBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9LCBfdGhpcy50b2dnbGVFdmVudHMgPSBmdW5jdGlvbiAoX3JlZjIsIGZsYWcpIHtcblx0XHRcdFx0dmFyIGV2ZW50cyA9IF9yZWYyLmV2ZW50cyxcblx0XHRcdFx0ICAgIF9yZWYyJGV2ZW50cyA9IF9yZWYyLmV2ZW50cyxcblx0XHRcdFx0ICAgIGNsaWNrID0gX3JlZjIkZXZlbnRzLmNsaWNrLFxuXHRcdFx0XHQgICAgZm9jdXMgPSBfcmVmMiRldmVudHMuZm9jdXMsXG5cdFx0XHRcdCAgICBob3ZlciA9IF9yZWYyJGV2ZW50cy5ob3ZlcjtcblxuXHRcdFx0XHR2YXIgYWN0aW9uID0gZmxhZyA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblx0XHRcdFx0dmFyIGhhc0V2ZW50cyA9IGV2ZW50cyA9PT0gdHJ1ZTsoY2xpY2sgfHwgaGFzRXZlbnRzKSAmJiBkb2N1bWVudFthY3Rpb25dKCdjbGljaycsIF90aGlzLnRvZ2dsZUhpbnQpOyhmb2N1cyB8fCBoYXNFdmVudHMpICYmIGRvY3VtZW50W2FjdGlvbl0oJ2ZvY3VzaW4nLCBfdGhpcy50b2dnbGVIaW50KTsoaG92ZXIgfHwgaGFzRXZlbnRzKSAmJiBkb2N1bWVudFthY3Rpb25dKCdtb3VzZW92ZXInLCBfdGhpcy50b2dnbGVIaW50KTsoY2xpY2sgfHwgaG92ZXIgfHwgaGFzRXZlbnRzKSAmJiBkb2N1bWVudFthY3Rpb25dKCd0b3VjaGVuZCcsIF90aGlzLnRvZ2dsZUhpbnQpO1xuXHRcdFx0fSwgX3RoaXMudG9nZ2xlSGludCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIF9yZWYzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcblx0XHRcdFx0ICAgIF9yZWYzJHRhcmdldCA9IF9yZWYzLnRhcmdldCxcblx0XHRcdFx0ICAgIHRhcmdldCA9IF9yZWYzJHRhcmdldCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IF9yZWYzJHRhcmdldDtcblxuXHRcdFx0XHRjbGVhclRpbWVvdXQoX3RoaXMuX3RpbWVvdXQpO1xuXHRcdFx0XHRfdGhpcy5fdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5zZXRTdGF0ZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IF90aGlzLmdldEhpbnQodGFyZ2V0KVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSwgX3RoaXMucHJvcHMuZGVsYXkpO1xuXHRcdFx0fSwgX3RoaXMuZ2V0SGludCA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0XHR2YXIgX3RoaXMkcHJvcHMgPSBfdGhpcy5wcm9wcyxcblx0XHRcdFx0ICAgIGF0dHJpYnV0ZSA9IF90aGlzJHByb3BzLmF0dHJpYnV0ZSxcblx0XHRcdFx0ICAgIHBlcnNpc3QgPSBfdGhpcyRwcm9wcy5wZXJzaXN0O1xuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gX3RoaXMuc3RhdGUudGFyZ2V0O1xuXG5cblx0XHRcdFx0d2hpbGUgKGVsKSB7XG5cdFx0XHRcdFx0aWYgKGVsID09PSBkb2N1bWVudCkgYnJlYWs7XG5cdFx0XHRcdFx0aWYgKHBlcnNpc3QgJiYgZWwgPT09IF90aGlzLl9oaW50KSByZXR1cm4gdGFyZ2V0O1xuXHRcdFx0XHRcdGlmIChlbC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKSkgcmV0dXJuIGVsO1xuXHRcdFx0XHRcdGVsID0gZWwucGFyZW50Tm9kZTtcblx0XHRcdFx0fXJldHVybiBudWxsO1xuXHRcdFx0fSwgX3RoaXMuc2hhbGxvd0VxdWFsID0gZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdFx0dmFyIGtleXMgPSBPYmplY3Qua2V5cyhhKTtcblx0XHRcdFx0cmV0dXJuIGtleXMubGVuZ3RoID09PSBPYmplY3Qua2V5cyhiKS5sZW5ndGggJiYga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwga2V5KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlc3VsdCAmJiAodHlwZW9mIGFba2V5XSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYltrZXldID09PSAnZnVuY3Rpb24nIHx8IGFba2V5XSA9PT0gYltrZXldKTtcblx0XHRcdFx0fSwgdHJ1ZSk7XG5cdFx0XHR9LCBfdGhpcy5nZXRIaW50RGF0YSA9IGZ1bmN0aW9uIChfcmVmNCwgX3JlZjUpIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IF9yZWY0LnRhcmdldDtcblx0XHRcdFx0dmFyIGF0dHJpYnV0ZSA9IF9yZWY1LmF0dHJpYnV0ZSxcblx0XHRcdFx0ICAgIGF1dG9Qb3NpdGlvbiA9IF9yZWY1LmF1dG9Qb3NpdGlvbixcblx0XHRcdFx0ICAgIHBvc2l0aW9uID0gX3JlZjUucG9zaXRpb247XG5cblx0XHRcdFx0dmFyIGNvbnRlbnQgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSkgfHwgJyc7XG5cdFx0XHRcdHZhciBhdCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlICsgJy1hdCcpIHx8IHBvc2l0aW9uO1xuXG5cdFx0XHRcdHZhciBfdGhpcyRfY29udGFpbmVyJGdldEIgPSBfdGhpcy5fY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0XHQgICAgY29udGFpbmVyVG9wID0gX3RoaXMkX2NvbnRhaW5lciRnZXRCLnRvcCxcblx0XHRcdFx0ICAgIGNvbnRhaW5lckxlZnQgPSBfdGhpcyRfY29udGFpbmVyJGdldEIubGVmdDtcblxuXHRcdFx0XHR2YXIgX3RoaXMkX2hpbnQkZ2V0Qm91bmRpID0gX3RoaXMuX2hpbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG5cdFx0XHRcdCAgICBoaW50V2lkdGggPSBfdGhpcyRfaGludCRnZXRCb3VuZGkud2lkdGgsXG5cdFx0XHRcdCAgICBoaW50SGVpZ2h0ID0gX3RoaXMkX2hpbnQkZ2V0Qm91bmRpLmhlaWdodDtcblxuXHRcdFx0XHR2YXIgX3RhcmdldCRnZXRCb3VuZGluZ0NsID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuXHRcdFx0XHQgICAgdGFyZ2V0VG9wID0gX3RhcmdldCRnZXRCb3VuZGluZ0NsLnRvcCxcblx0XHRcdFx0ICAgIHRhcmdldExlZnQgPSBfdGFyZ2V0JGdldEJvdW5kaW5nQ2wubGVmdCxcblx0XHRcdFx0ICAgIHRhcmdldFdpZHRoID0gX3RhcmdldCRnZXRCb3VuZGluZ0NsLndpZHRoLFxuXHRcdFx0XHQgICAgdGFyZ2V0SGVpZ2h0ID0gX3RhcmdldCRnZXRCb3VuZGluZ0NsLmhlaWdodDtcblxuXHRcdFx0XHRpZiAoYXV0b1Bvc2l0aW9uKSB7XG5cdFx0XHRcdFx0dmFyIGlzSG9yaXogPSBbJ2xlZnQnLCAncmlnaHQnXS5pbmNsdWRlcyhhdCk7XG5cblx0XHRcdFx0XHR2YXIgX2RvY3VtZW50JGRvY3VtZW50RWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuXHRcdFx0XHRcdCAgICBjbGllbnRIZWlnaHQgPSBfZG9jdW1lbnQkZG9jdW1lbnRFbGUuY2xpZW50SGVpZ2h0LFxuXHRcdFx0XHRcdCAgICBjbGllbnRXaWR0aCA9IF9kb2N1bWVudCRkb2N1bWVudEVsZS5jbGllbnRXaWR0aDtcblxuXG5cdFx0XHRcdFx0dmFyIGRpcmVjdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRsZWZ0OiAoaXNIb3JpeiA/IHRhcmdldExlZnQgLSBoaW50V2lkdGggOiB0YXJnZXRMZWZ0ICsgKHRhcmdldFdpZHRoIC0gaGludFdpZHRoID4+IDEpKSA+IDAsXG5cdFx0XHRcdFx0XHRyaWdodDogKGlzSG9yaXogPyB0YXJnZXRMZWZ0ICsgdGFyZ2V0V2lkdGggKyBoaW50V2lkdGggOiB0YXJnZXRMZWZ0ICsgKHRhcmdldFdpZHRoICsgaGludFdpZHRoID4+IDEpKSA8IGNsaWVudFdpZHRoLFxuXHRcdFx0XHRcdFx0Ym90dG9tOiAoaXNIb3JpeiA/IHRhcmdldFRvcCArICh0YXJnZXRIZWlnaHQgKyBoaW50SGVpZ2h0ID4+IDEpIDogdGFyZ2V0VG9wICsgdGFyZ2V0SGVpZ2h0ICsgaGludEhlaWdodCkgPCBjbGllbnRIZWlnaHQsXG5cdFx0XHRcdFx0XHR0b3A6IChpc0hvcml6ID8gdGFyZ2V0VG9wIC0gKGhpbnRIZWlnaHQgPj4gMSkgOiB0YXJnZXRUb3AgLSBoaW50SGVpZ2h0KSA+IDBcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0c3dpdGNoIChhdCkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5sZWZ0KSBhdCA9ICdyaWdodCc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy50b3ApIGF0ID0gJ2JvdHRvbSc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5ib3R0b20pIGF0ID0gJ3RvcCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRjYXNlICdyaWdodCc6XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5yaWdodCkgYXQgPSAnbGVmdCc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy50b3ApIGF0ID0gJ2JvdHRvbSc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5ib3R0b20pIGF0ID0gJ3RvcCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRjYXNlICdib3R0b20nOlxuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMuYm90dG9tKSBhdCA9ICd0b3AnO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMubGVmdCkgYXQgPSAncmlnaHQnO1xuXHRcdFx0XHRcdFx0XHRpZiAoIWRpcmVjdGlvbnMucmlnaHQpIGF0ID0gJ2xlZnQnO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0Y2FzZSAndG9wJzpcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy50b3ApIGF0ID0gJ2JvdHRvbSc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5sZWZ0KSBhdCA9ICdyaWdodCc7XG5cdFx0XHRcdFx0XHRcdGlmICghZGlyZWN0aW9ucy5yaWdodCkgYXQgPSAnbGVmdCc7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciB0b3AgPSB2b2lkIDAsXG5cdFx0XHRcdCAgICBsZWZ0ID0gdm9pZCAwO1xuXHRcdFx0XHRzd2l0Y2ggKGF0KSB7XG5cdFx0XHRcdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHRcdFx0XHR0b3AgPSB0YXJnZXRIZWlnaHQgLSBoaW50SGVpZ2h0ID4+IDE7XG5cdFx0XHRcdFx0XHRsZWZ0ID0gLWhpbnRXaWR0aDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSAncmlnaHQnOlxuXHRcdFx0XHRcdFx0dG9wID0gdGFyZ2V0SGVpZ2h0IC0gaGludEhlaWdodCA+PiAxO1xuXHRcdFx0XHRcdFx0bGVmdCA9IHRhcmdldFdpZHRoO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0XHRjYXNlICdib3R0b20nOlxuXHRcdFx0XHRcdFx0dG9wID0gdGFyZ2V0SGVpZ2h0O1xuXHRcdFx0XHRcdFx0bGVmdCA9IHRhcmdldFdpZHRoIC0gaGludFdpZHRoID4+IDE7XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdHRvcCA9IC1oaW50SGVpZ2h0O1xuXHRcdFx0XHRcdFx0bGVmdCA9IHRhcmdldFdpZHRoIC0gaGludFdpZHRoID4+IDE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGNvbnRlbnQ6IGNvbnRlbnQsIGF0OiBhdCxcblx0XHRcdFx0XHR0b3A6IHRvcCArIHRhcmdldFRvcCAtIGNvbnRhaW5lclRvcCB8IDAsXG5cdFx0XHRcdFx0bGVmdDogbGVmdCArIHRhcmdldExlZnQgLSBjb250YWluZXJMZWZ0IHwgMFxuXHRcdFx0XHR9O1xuXHRcdFx0fSwgX3RlbXApLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihfdGhpcywgX3JldCk7XG5cdFx0fVxuXG5cdFx0UmVhY3RIaW50LnByb3RvdHlwZS5jb21wb25lbnREaWRNb3VudCA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdFx0dGhpcy50b2dnbGVFdmVudHModGhpcy5wcm9wcywgdHJ1ZSk7XG5cdFx0fTtcblxuXHRcdFJlYWN0SGludC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFVubW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcblx0XHRcdHRoaXMudG9nZ2xlRXZlbnRzKHRoaXMucHJvcHMsIGZhbHNlKTtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KTtcblx0XHR9O1xuXG5cdFx0UmVhY3RIaW50LnByb3RvdHlwZS5zaG91bGRDb21wb25lbnRVcGRhdGUgPSBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUocHJvcHMsIHN0YXRlKSB7XG5cdFx0XHRyZXR1cm4gIXRoaXMuc2hhbGxvd0VxdWFsKHN0YXRlLCB0aGlzLnN0YXRlKSB8fCAhdGhpcy5zaGFsbG93RXF1YWwocHJvcHMsIHRoaXMucHJvcHMpO1xuXHRcdH07XG5cblx0XHRSZWFjdEhpbnQucHJvdG90eXBlLmNvbXBvbmVudERpZFVwZGF0ZSA9IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcblx0XHRcdGlmICh0aGlzLnN0YXRlLnRhcmdldCkgdGhpcy5zZXRTdGF0ZSh0aGlzLmdldEhpbnREYXRhKTtcblx0XHR9O1xuXG5cdFx0UmVhY3RIaW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0dmFyIF9wcm9wcyA9IHRoaXMucHJvcHMsXG5cdFx0XHQgICAgY2xhc3NOYW1lID0gX3Byb3BzLmNsYXNzTmFtZSxcblx0XHRcdCAgICBvblJlbmRlckNvbnRlbnQgPSBfcHJvcHMub25SZW5kZXJDb250ZW50O1xuXHRcdFx0dmFyIF9zdGF0ZSA9IHRoaXMuc3RhdGUsXG5cdFx0XHQgICAgdGFyZ2V0ID0gX3N0YXRlLnRhcmdldCxcblx0XHRcdCAgICBjb250ZW50ID0gX3N0YXRlLmNvbnRlbnQsXG5cdFx0XHQgICAgYXQgPSBfc3RhdGUuYXQsXG5cdFx0XHQgICAgdG9wID0gX3N0YXRlLnRvcCxcblx0XHRcdCAgICBsZWZ0ID0gX3N0YXRlLmxlZnQ7XG5cblxuXHRcdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHR7IHJlZjogZnVuY3Rpb24gcmVmKF9yZWY3KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3RoaXMyLl9jb250YWluZXIgPSBfcmVmNztcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHN0eWxlOiB0aGlzLl9jb250YWluZXJTdHlsZSB9LFxuXHRcdFx0XHR0YXJnZXQgJiYgY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHR7IGNsYXNzTmFtZTogY2xhc3NOYW1lICsgJyAnICsgY2xhc3NOYW1lICsgJy0tJyArIGF0LFxuXHRcdFx0XHRcdFx0cmVmOiBmdW5jdGlvbiByZWYoX3JlZjYpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIF90aGlzMi5faGludCA9IF9yZWY2O1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHN0eWxlOiB7IHRvcDogdG9wLCBsZWZ0OiBsZWZ0IH0gfSxcblx0XHRcdFx0XHRvblJlbmRlckNvbnRlbnQgPyBvblJlbmRlckNvbnRlbnQodGFyZ2V0LCBjb250ZW50KSA6IGNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHQnZGl2Jyxcblx0XHRcdFx0XHRcdHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgKyAnX19jb250ZW50JyB9LFxuXHRcdFx0XHRcdFx0Y29udGVudFxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIFJlYWN0SGludDtcblx0fShDb21wb25lbnQpLCBfY2xhc3MuZGVmYXVsdFByb3BzID0ge1xuXHRcdGF0dHJpYnV0ZTogJ2RhdGEtcmgnLFxuXHRcdGF1dG9Qb3NpdGlvbjogZmFsc2UsXG5cdFx0Y2xhc3NOYW1lOiAncmVhY3QtaGludCcsXG5cdFx0ZGVsYXk6IDAsXG5cdFx0ZXZlbnRzOiBmYWxzZSxcblx0XHRvblJlbmRlckNvbnRlbnQ6IG51bGwsXG5cdFx0cGVyc2lzdDogZmFsc2UsXG5cdFx0cG9zaXRpb246ICd0b3AnXG5cdH0sIF90ZW1wMjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP3QoZXhwb3J0cyk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJleHBvcnRzXCJdLHQpOnQoZS5yZWR1eExvZ2dlcj1lLnJlZHV4TG9nZ2VyfHx7fSl9KHRoaXMsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdChlLHQpe2Uuc3VwZXJfPXQsZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0LnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOmUsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSl9ZnVuY3Rpb24gcihlLHQpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwia2luZFwiLHt2YWx1ZTplLGVudW1lcmFibGU6ITB9KSx0JiZ0Lmxlbmd0aCYmT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJwYXRoXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIG4oZSx0LHIpe24uc3VwZXJfLmNhbGwodGhpcyxcIkVcIixlKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImxoc1wiLHt2YWx1ZTp0LGVudW1lcmFibGU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJoc1wiLHt2YWx1ZTpyLGVudW1lcmFibGU6ITB9KX1mdW5jdGlvbiBvKGUsdCl7by5zdXBlcl8uY2FsbCh0aGlzLFwiTlwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmhzXCIse3ZhbHVlOnQsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGkoZSx0KXtpLnN1cGVyXy5jYWxsKHRoaXMsXCJEXCIsZSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJsaHNcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSl9ZnVuY3Rpb24gYShlLHQscil7YS5zdXBlcl8uY2FsbCh0aGlzLFwiQVwiLGUpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiaW5kZXhcIix7dmFsdWU6dCxlbnVtZXJhYmxlOiEwfSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJpdGVtXCIse3ZhbHVlOnIsZW51bWVyYWJsZTohMH0pfWZ1bmN0aW9uIGYoZSx0LHIpe3ZhciBuPWUuc2xpY2UoKHJ8fHQpKzF8fGUubGVuZ3RoKTtyZXR1cm4gZS5sZW5ndGg9dDwwP2UubGVuZ3RoK3Q6dCxlLnB1c2guYXBwbHkoZSxuKSxlfWZ1bmN0aW9uIHUoZSl7dmFyIHQ9XCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpOKGUpO3JldHVyblwib2JqZWN0XCIhPT10P3Q6ZT09PU1hdGg/XCJtYXRoXCI6bnVsbD09PWU/XCJudWxsXCI6QXJyYXkuaXNBcnJheShlKT9cImFycmF5XCI6XCJbb2JqZWN0IERhdGVdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSk/XCJkYXRlXCI6XCJmdW5jdGlvblwiPT10eXBlb2YgZS50b1N0cmluZyYmL15cXC8uKlxcLy8udGVzdChlLnRvU3RyaW5nKCkpP1wicmVnZXhwXCI6XCJvYmplY3RcIn1mdW5jdGlvbiBsKGUsdCxyLGMscyxkLHApe3M9c3x8W10scD1wfHxbXTt2YXIgZz1zLnNsaWNlKDApO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBkKXtpZihjKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiZjKGcsZCkpcmV0dXJuO2lmKFwib2JqZWN0XCI9PT0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIGM/XCJ1bmRlZmluZWRcIjpOKGMpKSl7aWYoYy5wcmVmaWx0ZXImJmMucHJlZmlsdGVyKGcsZCkpcmV0dXJuO2lmKGMubm9ybWFsaXplKXt2YXIgaD1jLm5vcm1hbGl6ZShnLGQsZSx0KTtoJiYoZT1oWzBdLHQ9aFsxXSl9fX1nLnB1c2goZCl9XCJyZWdleHBcIj09PXUoZSkmJlwicmVnZXhwXCI9PT11KHQpJiYoZT1lLnRvU3RyaW5nKCksdD10LnRvU3RyaW5nKCkpO3ZhciB5PVwidW5kZWZpbmVkXCI9PXR5cGVvZiBlP1widW5kZWZpbmVkXCI6TihlKSx2PVwidW5kZWZpbmVkXCI9PXR5cGVvZiB0P1widW5kZWZpbmVkXCI6Tih0KSxiPVwidW5kZWZpbmVkXCIhPT15fHxwJiZwW3AubGVuZ3RoLTFdLmxocyYmcFtwLmxlbmd0aC0xXS5saHMuaGFzT3duUHJvcGVydHkoZCksbT1cInVuZGVmaW5lZFwiIT09dnx8cCYmcFtwLmxlbmd0aC0xXS5yaHMmJnBbcC5sZW5ndGgtMV0ucmhzLmhhc093blByb3BlcnR5KGQpO2lmKCFiJiZtKXIobmV3IG8oZyx0KSk7ZWxzZSBpZighbSYmYilyKG5ldyBpKGcsZSkpO2Vsc2UgaWYodShlKSE9PXUodCkpcihuZXcgbihnLGUsdCkpO2Vsc2UgaWYoXCJkYXRlXCI9PT11KGUpJiZlLXQhPT0wKXIobmV3IG4oZyxlLHQpKTtlbHNlIGlmKFwib2JqZWN0XCI9PT15JiZudWxsIT09ZSYmbnVsbCE9PXQpaWYocC5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQubGhzPT09ZX0pLmxlbmd0aCllIT09dCYmcihuZXcgbihnLGUsdCkpO2Vsc2V7aWYocC5wdXNoKHtsaHM6ZSxyaHM6dH0pLEFycmF5LmlzQXJyYXkoZSkpe3ZhciB3O2UubGVuZ3RoO2Zvcih3PTA7dzxlLmxlbmd0aDt3Kyspdz49dC5sZW5ndGg/cihuZXcgYShnLHcsbmV3IGkodm9pZCAwLGVbd10pKSk6bChlW3ddLHRbd10scixjLGcsdyxwKTtmb3IoO3c8dC5sZW5ndGg7KXIobmV3IGEoZyx3LG5ldyBvKHZvaWQgMCx0W3crK10pKSl9ZWxzZXt2YXIgeD1PYmplY3Qua2V5cyhlKSxTPU9iamVjdC5rZXlzKHQpO3guZm9yRWFjaChmdW5jdGlvbihuLG8pe3ZhciBpPVMuaW5kZXhPZihuKTtpPj0wPyhsKGVbbl0sdFtuXSxyLGMsZyxuLHApLFM9ZihTLGkpKTpsKGVbbl0sdm9pZCAwLHIsYyxnLG4scCl9KSxTLmZvckVhY2goZnVuY3Rpb24oZSl7bCh2b2lkIDAsdFtlXSxyLGMsZyxlLHApfSl9cC5sZW5ndGg9cC5sZW5ndGgtMX1lbHNlIGUhPT10JiYoXCJudW1iZXJcIj09PXkmJmlzTmFOKGUpJiZpc05hTih0KXx8cihuZXcgbihnLGUsdCkpKX1mdW5jdGlvbiBjKGUsdCxyLG4pe3JldHVybiBuPW58fFtdLGwoZSx0LGZ1bmN0aW9uKGUpe2UmJm4ucHVzaChlKX0sciksbi5sZW5ndGg/bjp2b2lkIDB9ZnVuY3Rpb24gcyhlLHQscil7aWYoci5wYXRoJiZyLnBhdGgubGVuZ3RoKXt2YXIgbixvPWVbdF0saT1yLnBhdGgubGVuZ3RoLTE7Zm9yKG49MDtuPGk7bisrKW89b1tyLnBhdGhbbl1dO3N3aXRjaChyLmtpbmQpe2Nhc2VcIkFcIjpzKG9bci5wYXRoW25dXSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmRlbGV0ZSBvW3IucGF0aFtuXV07YnJlYWs7Y2FzZVwiRVwiOmNhc2VcIk5cIjpvW3IucGF0aFtuXV09ci5yaHN9fWVsc2Ugc3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnMoZVt0XSxyLmluZGV4LHIuaXRlbSk7YnJlYWs7Y2FzZVwiRFwiOmU9ZihlLHQpO2JyZWFrO2Nhc2VcIkVcIjpjYXNlXCJOXCI6ZVt0XT1yLnJoc31yZXR1cm4gZX1mdW5jdGlvbiBkKGUsdCxyKXtpZihlJiZ0JiZyJiZyLmtpbmQpe2Zvcih2YXIgbj1lLG89LTEsaT1yLnBhdGg/ci5wYXRoLmxlbmd0aC0xOjA7KytvPGk7KVwidW5kZWZpbmVkXCI9PXR5cGVvZiBuW3IucGF0aFtvXV0mJihuW3IucGF0aFtvXV09XCJudW1iZXJcIj09dHlwZW9mIHIucGF0aFtvXT9bXTp7fSksbj1uW3IucGF0aFtvXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnMoci5wYXRoP25bci5wYXRoW29dXTpuLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZGVsZXRlIG5bci5wYXRoW29dXTticmVhaztjYXNlXCJFXCI6Y2FzZVwiTlwiOm5bci5wYXRoW29dXT1yLnJoc319fWZ1bmN0aW9uIHAoZSx0LHIpe2lmKHIucGF0aCYmci5wYXRoLmxlbmd0aCl7dmFyIG4sbz1lW3RdLGk9ci5wYXRoLmxlbmd0aC0xO2ZvcihuPTA7bjxpO24rKylvPW9bci5wYXRoW25dXTtzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cChvW3IucGF0aFtuXV0sci5pbmRleCxyLml0ZW0pO2JyZWFrO2Nhc2VcIkRcIjpvW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiRVwiOm9bci5wYXRoW25dXT1yLmxoczticmVhaztjYXNlXCJOXCI6ZGVsZXRlIG9bci5wYXRoW25dXX19ZWxzZSBzd2l0Y2goci5raW5kKXtjYXNlXCJBXCI6cChlW3RdLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6ZVt0XT1yLmxoczticmVhaztjYXNlXCJFXCI6ZVt0XT1yLmxoczticmVhaztjYXNlXCJOXCI6ZT1mKGUsdCl9cmV0dXJuIGV9ZnVuY3Rpb24gZyhlLHQscil7aWYoZSYmdCYmciYmci5raW5kKXt2YXIgbixvLGk9ZTtmb3Iobz1yLnBhdGgubGVuZ3RoLTEsbj0wO248bztuKyspXCJ1bmRlZmluZWRcIj09dHlwZW9mIGlbci5wYXRoW25dXSYmKGlbci5wYXRoW25dXT17fSksaT1pW3IucGF0aFtuXV07c3dpdGNoKHIua2luZCl7Y2FzZVwiQVwiOnAoaVtyLnBhdGhbbl1dLHIuaW5kZXgsci5pdGVtKTticmVhaztjYXNlXCJEXCI6aVtyLnBhdGhbbl1dPXIubGhzO2JyZWFrO2Nhc2VcIkVcIjppW3IucGF0aFtuXV09ci5saHM7YnJlYWs7Y2FzZVwiTlwiOmRlbGV0ZSBpW3IucGF0aFtuXV19fX1mdW5jdGlvbiBoKGUsdCxyKXtpZihlJiZ0KXt2YXIgbj1mdW5jdGlvbihuKXtyJiYhcihlLHQsbil8fGQoZSx0LG4pfTtsKGUsdCxuKX19ZnVuY3Rpb24geShlKXtyZXR1cm5cImNvbG9yOiBcIitGW2VdLmNvbG9yK1wiOyBmb250LXdlaWdodDogYm9sZFwifWZ1bmN0aW9uIHYoZSl7dmFyIHQ9ZS5raW5kLHI9ZS5wYXRoLG49ZS5saHMsbz1lLnJocyxpPWUuaW5kZXgsYT1lLml0ZW07c3dpdGNoKHQpe2Nhc2VcIkVcIjpyZXR1cm5bci5qb2luKFwiLlwiKSxuLFwi4oaSXCIsb107Y2FzZVwiTlwiOnJldHVybltyLmpvaW4oXCIuXCIpLG9dO2Nhc2VcIkRcIjpyZXR1cm5bci5qb2luKFwiLlwiKV07Y2FzZVwiQVwiOnJldHVybltyLmpvaW4oXCIuXCIpK1wiW1wiK2krXCJdXCIsYV07ZGVmYXVsdDpyZXR1cm5bXX19ZnVuY3Rpb24gYihlLHQscixuKXt2YXIgbz1jKGUsdCk7dHJ5e24/ci5ncm91cENvbGxhcHNlZChcImRpZmZcIik6ci5ncm91cChcImRpZmZcIil9Y2F0Y2goZSl7ci5sb2coXCJkaWZmXCIpfW8/by5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciB0PWUua2luZCxuPXYoZSk7ci5sb2cuYXBwbHkocixbXCIlYyBcIitGW3RdLnRleHQseSh0KV0uY29uY2F0KFAobikpKX0pOnIubG9nKFwi4oCU4oCUIG5vIGRpZmYg4oCU4oCUXCIpO3RyeXtyLmdyb3VwRW5kKCl9Y2F0Y2goZSl7ci5sb2coXCLigJTigJQgZGlmZiBlbmQg4oCU4oCUIFwiKX19ZnVuY3Rpb24gbShlLHQscixuKXtzd2l0Y2goXCJ1bmRlZmluZWRcIj09dHlwZW9mIGU/XCJ1bmRlZmluZWRcIjpOKGUpKXtjYXNlXCJvYmplY3RcIjpyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBlW25dP2Vbbl0uYXBwbHkoZSxQKHIpKTplW25dO2Nhc2VcImZ1bmN0aW9uXCI6cmV0dXJuIGUodCk7ZGVmYXVsdDpyZXR1cm4gZX19ZnVuY3Rpb24gdyhlKXt2YXIgdD1lLnRpbWVzdGFtcCxyPWUuZHVyYXRpb247cmV0dXJuIGZ1bmN0aW9uKGUsbixvKXt2YXIgaT1bXCJhY3Rpb25cIl07cmV0dXJuIGkucHVzaChcIiVjXCIrU3RyaW5nKGUudHlwZSkpLHQmJmkucHVzaChcIiVjQCBcIituKSxyJiZpLnB1c2goXCIlYyhpbiBcIitvLnRvRml4ZWQoMikrXCIgbXMpXCIpLGkuam9pbihcIiBcIil9fWZ1bmN0aW9uIHgoZSx0KXt2YXIgcj10LmxvZ2dlcixuPXQuYWN0aW9uVHJhbnNmb3JtZXIsbz10LnRpdGxlRm9ybWF0dGVyLGk9dm9pZCAwPT09bz93KHQpOm8sYT10LmNvbGxhcHNlZCxmPXQuY29sb3JzLHU9dC5sZXZlbCxsPXQuZGlmZixjPVwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LnRpdGxlRm9ybWF0dGVyO2UuZm9yRWFjaChmdW5jdGlvbihvLHMpe3ZhciBkPW8uc3RhcnRlZCxwPW8uc3RhcnRlZFRpbWUsZz1vLmFjdGlvbixoPW8ucHJldlN0YXRlLHk9by5lcnJvcix2PW8udG9vayx3PW8ubmV4dFN0YXRlLHg9ZVtzKzFdO3gmJih3PXgucHJldlN0YXRlLHY9eC5zdGFydGVkLWQpO3ZhciBTPW4oZyksaz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2EoZnVuY3Rpb24oKXtyZXR1cm4gd30sZyxvKTphLGo9RChwKSxFPWYudGl0bGU/XCJjb2xvcjogXCIrZi50aXRsZShTKStcIjtcIjpcIlwiLEE9W1wiY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyO1wiXTtBLnB1c2goRSksdC50aW1lc3RhbXAmJkEucHVzaChcImNvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjtcIiksdC5kdXJhdGlvbiYmQS5wdXNoKFwiY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyO1wiKTt2YXIgTz1pKFMsaix2KTt0cnl7az9mLnRpdGxlJiZjP3IuZ3JvdXBDb2xsYXBzZWQuYXBwbHkocixbXCIlYyBcIitPXS5jb25jYXQoQSkpOnIuZ3JvdXBDb2xsYXBzZWQoTyk6Zi50aXRsZSYmYz9yLmdyb3VwLmFwcGx5KHIsW1wiJWMgXCIrT10uY29uY2F0KEEpKTpyLmdyb3VwKE8pfWNhdGNoKGUpe3IubG9nKE8pfXZhciBOPW0odSxTLFtoXSxcInByZXZTdGF0ZVwiKSxQPW0odSxTLFtTXSxcImFjdGlvblwiKSxDPW0odSxTLFt5LGhdLFwiZXJyb3JcIiksRj1tKHUsUyxbd10sXCJuZXh0U3RhdGVcIik7aWYoTilpZihmLnByZXZTdGF0ZSl7dmFyIEw9XCJjb2xvcjogXCIrZi5wcmV2U3RhdGUoaCkrXCI7IGZvbnQtd2VpZ2h0OiBib2xkXCI7cltOXShcIiVjIHByZXYgc3RhdGVcIixMLGgpfWVsc2UgcltOXShcInByZXYgc3RhdGVcIixoKTtpZihQKWlmKGYuYWN0aW9uKXt2YXIgVD1cImNvbG9yOiBcIitmLmFjdGlvbihTKStcIjsgZm9udC13ZWlnaHQ6IGJvbGRcIjtyW1BdKFwiJWMgYWN0aW9uICAgIFwiLFQsUyl9ZWxzZSByW1BdKFwiYWN0aW9uICAgIFwiLFMpO2lmKHkmJkMpaWYoZi5lcnJvcil7dmFyIE09XCJjb2xvcjogXCIrZi5lcnJvcih5LGgpK1wiOyBmb250LXdlaWdodDogYm9sZDtcIjtyW0NdKFwiJWMgZXJyb3IgICAgIFwiLE0seSl9ZWxzZSByW0NdKFwiZXJyb3IgICAgIFwiLHkpO2lmKEYpaWYoZi5uZXh0U3RhdGUpe3ZhciBfPVwiY29sb3I6IFwiK2YubmV4dFN0YXRlKHcpK1wiOyBmb250LXdlaWdodDogYm9sZFwiO3JbRl0oXCIlYyBuZXh0IHN0YXRlXCIsXyx3KX1lbHNlIHJbRl0oXCJuZXh0IHN0YXRlXCIsdyk7bCYmYihoLHcscixrKTt0cnl7ci5ncm91cEVuZCgpfWNhdGNoKGUpe3IubG9nKFwi4oCU4oCUIGxvZyBlbmQg4oCU4oCUXCIpfX0pfWZ1bmN0aW9uIFMoKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sdD1PYmplY3QuYXNzaWduKHt9LEwsZSkscj10LmxvZ2dlcixuPXQuc3RhdGVUcmFuc2Zvcm1lcixvPXQuZXJyb3JUcmFuc2Zvcm1lcixpPXQucHJlZGljYXRlLGE9dC5sb2dFcnJvcnMsZj10LmRpZmZQcmVkaWNhdGU7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHIpcmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZSh0KX19fTtpZihlLmdldFN0YXRlJiZlLmRpc3BhdGNoKXJldHVybiBjb25zb2xlLmVycm9yKFwiW3JlZHV4LWxvZ2dlcl0gcmVkdXgtbG9nZ2VyIG5vdCBpbnN0YWxsZWQuIE1ha2Ugc3VyZSB0byBwYXNzIGxvZ2dlciBpbnN0YW5jZSBhcyBtaWRkbGV3YXJlOlxcbi8vIExvZ2dlciB3aXRoIGRlZmF1bHQgb3B0aW9uc1xcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxcbiAgcmVkdWNlcixcXG4gIGFwcGx5TWlkZGxld2FyZShsb2dnZXIpXFxuKVxcbi8vIE9yIHlvdSBjYW4gY3JlYXRlIHlvdXIgb3duIGxvZ2dlciB3aXRoIGN1c3RvbSBvcHRpb25zIGh0dHA6Ly9iaXQubHkvcmVkdXgtbG9nZ2VyLW9wdGlvbnNcXG5pbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xcbiAgLy8gLi4ub3B0aW9uc1xcbn0pO1xcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXFxuICByZWR1Y2VyLFxcbiAgYXBwbHlNaWRkbGV3YXJlKGxvZ2dlcilcXG4pXFxuXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gZSh0KX19fTt2YXIgdT1bXTtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHI9ZS5nZXRTdGF0ZTtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGwpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGkmJiFpKHIsbCkpcmV0dXJuIGUobCk7dmFyIGM9e307dS5wdXNoKGMpLGMuc3RhcnRlZD1PLm5vdygpLGMuc3RhcnRlZFRpbWU9bmV3IERhdGUsYy5wcmV2U3RhdGU9bihyKCkpLGMuYWN0aW9uPWw7dmFyIHM9dm9pZCAwO2lmKGEpdHJ5e3M9ZShsKX1jYXRjaChlKXtjLmVycm9yPW8oZSl9ZWxzZSBzPWUobCk7Yy50b29rPU8ubm93KCktYy5zdGFydGVkLGMubmV4dFN0YXRlPW4ocigpKTt2YXIgZD10LmRpZmYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/ZihyLGwpOnQuZGlmZjtpZih4KHUsT2JqZWN0LmFzc2lnbih7fSx0LHtkaWZmOmR9KSksdS5sZW5ndGg9MCxjLmVycm9yKXRocm93IGMuZXJyb3I7cmV0dXJuIHN9fX19dmFyIGssaixFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIG5ldyBBcnJheSh0KzEpLmpvaW4oZSl9LEE9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gRShcIjBcIix0LWUudG9TdHJpbmcoKS5sZW5ndGgpK2V9LEQ9ZnVuY3Rpb24oZSl7cmV0dXJuIEEoZS5nZXRIb3VycygpLDIpK1wiOlwiK0EoZS5nZXRNaW51dGVzKCksMikrXCI6XCIrQShlLmdldFNlY29uZHMoKSwyKStcIi5cIitBKGUuZ2V0TWlsbGlzZWNvbmRzKCksMyl9LE89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHBlcmZvcm1hbmNlJiZudWxsIT09cGVyZm9ybWFuY2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHBlcmZvcm1hbmNlLm5vdz9wZXJmb3JtYW5jZTpEYXRlLE49XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX0sUD1mdW5jdGlvbihlKXtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIHQ9MCxyPUFycmF5KGUubGVuZ3RoKTt0PGUubGVuZ3RoO3QrKylyW3RdPWVbdF07cmV0dXJuIHJ9cmV0dXJuIEFycmF5LmZyb20oZSl9LEM9W107az1cIm9iamVjdFwiPT09KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBnbG9iYWw/XCJ1bmRlZmluZWRcIjpOKGdsb2JhbCkpJiZnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9LGo9ay5EZWVwRGlmZixqJiZDLnB1c2goZnVuY3Rpb24oKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgaiYmay5EZWVwRGlmZj09PWMmJihrLkRlZXBEaWZmPWosaj12b2lkIDApfSksdChuLHIpLHQobyxyKSx0KGksciksdChhLHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGMse2RpZmY6e3ZhbHVlOmMsZW51bWVyYWJsZTohMH0sb2JzZXJ2YWJsZURpZmY6e3ZhbHVlOmwsZW51bWVyYWJsZTohMH0sYXBwbHlEaWZmOnt2YWx1ZTpoLGVudW1lcmFibGU6ITB9LGFwcGx5Q2hhbmdlOnt2YWx1ZTpkLGVudW1lcmFibGU6ITB9LHJldmVydENoYW5nZTp7dmFsdWU6ZyxlbnVtZXJhYmxlOiEwfSxpc0NvbmZsaWN0Ont2YWx1ZTpmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBqfSxlbnVtZXJhYmxlOiEwfSxub0NvbmZsaWN0Ont2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBDJiYoQy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UoKX0pLEM9bnVsbCksY30sZW51bWVyYWJsZTohMH19KTt2YXIgRj17RTp7Y29sb3I6XCIjMjE5NkYzXCIsdGV4dDpcIkNIQU5HRUQ6XCJ9LE46e2NvbG9yOlwiIzRDQUY1MFwiLHRleHQ6XCJBRERFRDpcIn0sRDp7Y29sb3I6XCIjRjQ0MzM2XCIsdGV4dDpcIkRFTEVURUQ6XCJ9LEE6e2NvbG9yOlwiIzIxOTZGM1wiLHRleHQ6XCJBUlJBWTpcIn19LEw9e2xldmVsOlwibG9nXCIsbG9nZ2VyOmNvbnNvbGUsbG9nRXJyb3JzOiEwLGNvbGxhcHNlZDp2b2lkIDAscHJlZGljYXRlOnZvaWQgMCxkdXJhdGlvbjohMSx0aW1lc3RhbXA6ITAsc3RhdGVUcmFuc2Zvcm1lcjpmdW5jdGlvbihlKXtyZXR1cm4gZX0sYWN0aW9uVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGVycm9yVHJhbnNmb3JtZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGV9LGNvbG9yczp7dGl0bGU6ZnVuY3Rpb24oKXtyZXR1cm5cImluaGVyaXRcIn0scHJldlN0YXRlOmZ1bmN0aW9uKCl7cmV0dXJuXCIjOUU5RTlFXCJ9LGFjdGlvbjpmdW5jdGlvbigpe3JldHVyblwiIzAzQTlGNFwifSxuZXh0U3RhdGU6ZnVuY3Rpb24oKXtyZXR1cm5cIiM0Q0FGNTBcIn0sZXJyb3I6ZnVuY3Rpb24oKXtyZXR1cm5cIiNGMjA0MDRcIn19LGRpZmY6ITEsZGlmZlByZWRpY2F0ZTp2b2lkIDAsdHJhbnNmb3JtZXI6dm9pZCAwfSxUPWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnt9LHQ9ZS5kaXNwYXRjaCxyPWUuZ2V0U3RhdGU7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdHx8XCJmdW5jdGlvblwiPT10eXBlb2Ygcj9TKCkoe2Rpc3BhdGNoOnQsZ2V0U3RhdGU6cn0pOnZvaWQgY29uc29sZS5lcnJvcihcIlxcbltyZWR1eC1sb2dnZXIgdjNdIEJSRUFLSU5HIENIQU5HRVxcbltyZWR1eC1sb2dnZXIgdjNdIFNpbmNlIDMuMC4wIHJlZHV4LWxvZ2dlciBleHBvcnRzIGJ5IGRlZmF1bHQgbG9nZ2VyIHdpdGggZGVmYXVsdCBzZXR0aW5ncy5cXG5bcmVkdXgtbG9nZ2VyIHYzXSBDaGFuZ2VcXG5bcmVkdXgtbG9nZ2VyIHYzXSBpbXBvcnQgY3JlYXRlTG9nZ2VyIGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5bcmVkdXgtbG9nZ2VyIHYzXSB0b1xcbltyZWR1eC1sb2dnZXIgdjNdIGltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcidcXG5cIil9O2UuZGVmYXVsdHM9TCxlLmNyZWF0ZUxvZ2dlcj1TLGUubG9nZ2VyPVQsZS5kZWZhdWx0PVQsT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSl9KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuUkVKRUNURUQgPSBleHBvcnRzLkZVTEZJTExFRCA9IGV4cG9ydHMuUEVORElORyA9IHVuZGVmaW5lZDtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBwcm9taXNlTWlkZGxld2FyZTtcblxudmFyIF9pc1Byb21pc2UgPSByZXF1aXJlKCcuL2lzUHJvbWlzZS5qcycpO1xuXG52YXIgX2lzUHJvbWlzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1Byb21pc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIE5vdGUgdG8gY29udHJpYnV0b3JzOiBQbGVhc2UgYWxzbyByZW1lbWJlciB0byBjaGVjayBhbmQgbWFrZSBzdXJlXG4gKiB0aGF0IGBpbmRleC5kLnRzYCBpcyBhbHNvIHVwIHRvIGRhdGUgd2l0aCB0aGUgaW1wbGVtZW50YXRpb24gd2hlblxuICogeW91IGFkZCBuZXcgZmVhdHVyZXMgb3IgbW9kaWZ5IGV4aXN0aW5nIG9uZXMuXG4gKi9cblxuLy8gVGhlIGRlZmF1bHQgYXN5bmMgYWN0aW9uIHR5cGVzXG52YXIgUEVORElORyA9IGV4cG9ydHMuUEVORElORyA9ICdQRU5ESU5HJztcbnZhciBGVUxGSUxMRUQgPSBleHBvcnRzLkZVTEZJTExFRCA9ICdGVUxGSUxMRUQnO1xudmFyIFJFSkVDVEVEID0gZXhwb3J0cy5SRUpFQ1RFRCA9ICdSRUpFQ1RFRCc7XG52YXIgZGVmYXVsdFR5cGVzID0gW1BFTkRJTkcsIEZVTEZJTExFRCwgUkVKRUNURURdO1xuXG4vKipcbiAqIEZ1bmN0aW9uOiBwcm9taXNlTWlkZGxld2FyZVxuICogRGVzY3JpcHRpb246IFRoZSBtYWluIHByb21pc2VNaWRkbGV3YXJlIGFjY2VwdHMgYSBjb25maWd1cmF0aW9uXG4gKiBvYmplY3QgYW5kIHJldHVybnMgdGhlIG1pZGRsZXdhcmUuXG4gKi9cbmZ1bmN0aW9uIHByb21pc2VNaWRkbGV3YXJlKCkge1xuICB2YXIgY29uZmlnID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICB2YXIgUFJPTUlTRV9UWVBFX1NVRkZJWEVTID0gY29uZmlnLnByb21pc2VUeXBlU3VmZml4ZXMgfHwgZGVmYXVsdFR5cGVzO1xuICB2YXIgUFJPTUlTRV9UWVBFX0RFTElNSVRFUiA9IGNvbmZpZy5wcm9taXNlVHlwZURlbGltaXRlciB8fCAnXyc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSByZWYuZGlzcGF0Y2g7XG5cblxuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5zdGFudGlhdGUgdmFyaWFibGVzIHRvIGhvbGQ6XG4gICAgICAgICAqICgxKSB0aGUgcHJvbWlzZVxuICAgICAgICAgKiAoMikgdGhlIGRhdGEgZm9yIG9wdGltaXN0aWMgdXBkYXRlc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHByb21pc2UgPSB2b2lkIDA7XG4gICAgICAgIHZhciBkYXRhID0gdm9pZCAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGVyZSBhcmUgbXVsdGlwbGUgd2F5cyB0byBkaXNwYXRjaCBhIHByb21pc2UuIFRoZSBmaXJzdCBzdGVwIGlzIHRvXG4gICAgICAgICAqIGRldGVybWluZSBpZiB0aGUgcHJvbWlzZSBpcyBkZWZpbmVkOlxuICAgICAgICAgKiAoYSkgZXhwbGljaXRseSAoYWN0aW9uLnBheWxvYWQucHJvbWlzZSBpcyB0aGUgcHJvbWlzZSlcbiAgICAgICAgICogKGIpIGltcGxpY2l0bHkgKGFjdGlvbi5wYXlsb2FkIGlzIHRoZSBwcm9taXNlKVxuICAgICAgICAgKiAoYykgYXMgYW4gYXN5bmMgZnVuY3Rpb24gKHJldHVybnMgYSBwcm9taXNlIHdoZW4gY2FsbGVkKVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB0aGUgcHJvbWlzZSBpcyBub3QgZGVmaW5lZCBpbiBvbmUgb2YgdGhlc2UgdGhyZWUgd2F5cywgd2UgZG9uJ3QgZG9cbiAgICAgICAgICogYW55dGhpbmcgYW5kIG1vdmUgb24gdG8gdGhlIG5leHQgbWlkZGxld2FyZSBpbiB0aGUgbWlkZGxld2FyZSBjaGFpbi5cbiAgICAgICAgICovXG5cbiAgICAgICAgLy8gU3RlcCAxYTogSXMgdGhlcmUgYSBwYXlsb2FkP1xuICAgICAgICBpZiAoYWN0aW9uLnBheWxvYWQpIHtcbiAgICAgICAgICB2YXIgUEFZTE9BRCA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgICAgICAgLy8gU3RlcCAxLjE6IElzIHRoZSBwcm9taXNlIGltcGxpY2l0bHkgZGVmaW5lZD9cbiAgICAgICAgICBpZiAoKDAsIF9pc1Byb21pc2UyLmRlZmF1bHQpKFBBWUxPQUQpKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gUEFZTE9BRDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTdGVwIDEuMjogSXMgdGhlIHByb21pc2UgZXhwbGljaXRseSBkZWZpbmVkP1xuICAgICAgICAgIGVsc2UgaWYgKCgwLCBfaXNQcm9taXNlMi5kZWZhdWx0KShQQVlMT0FELnByb21pc2UpKSB7XG4gICAgICAgICAgICAgIHByb21pc2UgPSBQQVlMT0FELnByb21pc2U7XG4gICAgICAgICAgICAgIGRhdGEgPSBQQVlMT0FELmRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN0ZXAgMS4zOiBJcyB0aGUgcHJvbWlzZSByZXR1cm5lZCBieSBhbiBhc3luYyBmdW5jdGlvbj9cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBQQVlMT0FEID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBQQVlMT0FELnByb21pc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gUEFZTE9BRC5wcm9taXNlID8gUEFZTE9BRC5wcm9taXNlKCkgOiBQQVlMT0FEKCk7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFBBWUxPQUQucHJvbWlzZSA/IFBBWUxPQUQuZGF0YSA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIC8vIFN0ZXAgMS4zLjE6IElzIHRoZSByZXR1cm4gb2YgYWN0aW9uLnBheWxvYWQgYSBwcm9taXNlP1xuICAgICAgICAgICAgICAgIGlmICghKDAsIF9pc1Byb21pc2UyLmRlZmF1bHQpKHByb21pc2UpKSB7XG5cbiAgICAgICAgICAgICAgICAgIC8vIElmIG5vdCwgbW92ZSBvbiB0byB0aGUgbmV4dCBtaWRkbGV3YXJlLlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQoX2V4dGVuZHMoe30sIGFjdGlvbiwge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkOiBwcm9taXNlXG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gU3RlcCAxLjQ6IElmIHRoZXJlJ3Mgbm8gcHJvbWlzZSwgbW92ZSBvbiB0byB0aGUgbmV4dCBtaWRkbGV3YXJlLlxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU3RlcCAxYjogSWYgdGhlcmUncyBubyBwYXlsb2FkLCBtb3ZlIG9uIHRvIHRoZSBuZXh0IG1pZGRsZXdhcmUuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnN0YW50aWF0ZSBhbmQgZGVmaW5lIGNvbnN0YW50cyBmb3I6XG4gICAgICAgICAqICgxKSB0aGUgYWN0aW9uIHR5cGVcbiAgICAgICAgICogKDIpIHRoZSBhY3Rpb24gbWV0YVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIFRZUEUgPSBhY3Rpb24udHlwZTtcbiAgICAgICAgdmFyIE1FVEEgPSBhY3Rpb24ubWV0YTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5zdGFudGlhdGUgYW5kIGRlZmluZSBjb25zdGFudHMgZm9yIHRoZSBhY3Rpb24gdHlwZSBzdWZmaXhlcy5cbiAgICAgICAgICogVGhlc2UgYXJlIGFwcGVuZGVkIHRvIHRoZSBlbmQgb2YgdGhlIGFjdGlvbiB0eXBlLlxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgX1BST01JU0VfVFlQRV9TVUZGSVhFID0gX3NsaWNlZFRvQXJyYXkoUFJPTUlTRV9UWVBFX1NVRkZJWEVTLCAzKSxcbiAgICAgICAgICAgIF9QRU5ESU5HID0gX1BST01JU0VfVFlQRV9TVUZGSVhFWzBdLFxuICAgICAgICAgICAgX0ZVTEZJTExFRCA9IF9QUk9NSVNFX1RZUEVfU1VGRklYRVsxXSxcbiAgICAgICAgICAgIF9SRUpFQ1RFRCA9IF9QUk9NSVNFX1RZUEVfU1VGRklYRVsyXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRnVuY3Rpb246IGdldEFjdGlvblxuICAgICAgICAgKiBEZXNjcmlwdGlvbjogVGhpcyBmdW5jdGlvbiBjb25zdHJ1Y3RzIGFuZCByZXR1cm5zIGEgcmVqZWN0ZWRcbiAgICAgICAgICogb3IgZnVsZmlsbGVkIGFjdGlvbiBvYmplY3QuIFRoZSBhY3Rpb24gb2JqZWN0IGlzIGJhc2VkIG9mZiB0aGUgRmx1eFxuICAgICAgICAgKiBTdGFuZGFyZCBBY3Rpb24gKEZTQSkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEdpdmVuIGFuIG9yaWdpbmFsIGFjdGlvbiB3aXRoIHRoZSB0eXBlIEZPTzpcbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIHJlamVjdGVkIG9iamVjdCBtb2RlbCB3aWxsIGJlOlxuICAgICAgICAgKiB7XG4gICAgICAgICAqICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAqICAgdHlwZTogJ0ZPT19SRUpFQ1RFRCcsXG4gICAgICAgICAqICAgcGF5bG9hZDogLi4uLFxuICAgICAgICAgKiAgIG1ldGE6IC4uLiAob3B0aW9uYWwpXG4gICAgICAgICAqIH1cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGZ1bGZpbGxlZCBvYmplY3QgbW9kZWwgd2lsbCBiZTpcbiAgICAgICAgICoge1xuICAgICAgICAgKiAgIHR5cGU6ICdGT09fRlVMRklMTEVEJyxcbiAgICAgICAgICogICBwYXlsb2FkOiAuLi4sXG4gICAgICAgICAqICAgbWV0YTogLi4uIChvcHRpb25hbClcbiAgICAgICAgICogfVxuICAgICAgICAgKi9cblxuXG4gICAgICAgIHZhciBnZXRBY3Rpb24gPSBmdW5jdGlvbiBnZXRBY3Rpb24obmV3UGF5bG9hZCwgaXNSZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiBfZXh0ZW5kcyh7XG4gICAgICAgICAgICAvLyBDb25jYXRlbnRhdGUgdGhlIHR5cGUgc3RyaW5nIHByb3BlcnR5LlxuICAgICAgICAgICAgdHlwZTogW1RZUEUsIGlzUmVqZWN0ZWQgPyBfUkVKRUNURUQgOiBfRlVMRklMTEVEXS5qb2luKFBST01JU0VfVFlQRV9ERUxJTUlURVIpXG5cbiAgICAgICAgICB9LCBuZXdQYXlsb2FkID09PSBudWxsIHx8IHR5cGVvZiBuZXdQYXlsb2FkID09PSAndW5kZWZpbmVkJyA/IHt9IDoge1xuICAgICAgICAgICAgcGF5bG9hZDogbmV3UGF5bG9hZFxuICAgICAgICAgIH0sIE1FVEEgIT09IHVuZGVmaW5lZCA/IHsgbWV0YTogTUVUQSB9IDoge30sIGlzUmVqZWN0ZWQgPyB7XG4gICAgICAgICAgICBlcnJvcjogdHJ1ZVxuICAgICAgICAgIH0gOiB7fSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZ1bmN0aW9uOiBoYW5kbGVSZWplY3RcbiAgICAgICAgICogQ2FsbHM6IGdldEFjdGlvbiB0byBjb25zdHJ1Y3QgdGhlIHJlamVjdGVkIGFjdGlvblxuICAgICAgICAgKiBEZXNjcmlwdGlvbjogVGhpcyBmdW5jdGlvbiBkaXNwYXRjaGVzIHRoZSByZWplY3RlZCBhY3Rpb24gYW5kIHJldHVybnNcbiAgICAgICAgICogdGhlIG9yaWdpbmFsIEVycm9yIG9iamVjdC4gUGxlYXNlIG5vdGUgdGhlIGRldmVsb3BlciBpcyByZXNwb25zaWJsZVxuICAgICAgICAgKiBmb3IgY29uc3RydWN0aW5nIGFuZCB0aHJvd2luZyBhbiBFcnJvciBvYmplY3QuIFRoZSBtaWRkbGV3YXJlIGRvZXMgbm90XG4gICAgICAgICAqIGNvbnN0cnVjdCBhbnkgRXJyb3JzLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGhhbmRsZVJlamVjdCA9IGZ1bmN0aW9uIGhhbmRsZVJlamVjdChyZWFzb24pIHtcbiAgICAgICAgICB2YXIgcmVqZWN0ZWRBY3Rpb24gPSBnZXRBY3Rpb24ocmVhc29uLCB0cnVlKTtcbiAgICAgICAgICBkaXNwYXRjaChyZWplY3RlZEFjdGlvbik7XG5cbiAgICAgICAgICB0aHJvdyByZWFzb247XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZ1bmN0aW9uOiBoYW5kbGVGdWxmaWxsXG4gICAgICAgICAqIENhbGxzOiBnZXRBY3Rpb24gdG8gY29uc3RydWN0IHRoZSBmdWxsZmlsbGVkIGFjdGlvblxuICAgICAgICAgKiBEZXNjcmlwdGlvbjogVGhpcyBmdW5jdGlvbiBkaXNwYXRjaGVzIHRoZSBmdWxmaWxsZWQgYWN0aW9uIGFuZFxuICAgICAgICAgKiByZXR1cm5zIHRoZSBzdWNjZXNzIG9iamVjdC4gVGhlIHN1Y2Nlc3Mgb2JqZWN0IHNob3VsZFxuICAgICAgICAgKiBjb250YWluIHRoZSB2YWx1ZSBhbmQgdGhlIGRpc3BhdGNoZWQgYWN0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGhhbmRsZUZ1bGZpbGwgPSBmdW5jdGlvbiBoYW5kbGVGdWxmaWxsKCkge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogbnVsbDtcblxuICAgICAgICAgIHZhciByZXNvbHZlZEFjdGlvbiA9IGdldEFjdGlvbih2YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgIGRpc3BhdGNoKHJlc29sdmVkQWN0aW9uKTtcblxuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgYWN0aW9uOiByZXNvbHZlZEFjdGlvbiB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXJzdCwgZGlzcGF0Y2ggdGhlIHBlbmRpbmcgYWN0aW9uOlxuICAgICAgICAgKiBUaGlzIG9iamVjdCBkZXNjcmliZXMgdGhlIHBlbmRpbmcgc3RhdGUgb2YgYSBwcm9taXNlIGFuZCB3aWxsIGluY2x1ZGVcbiAgICAgICAgICogYW55IGRhdGEgKGZvciBvcHRpbWlzdGljIHVwZGF0ZXMpIGFuZC9vciBtZXRhIGZyb20gdGhlIG9yaWdpbmFsIGFjdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIG5leHQoX2V4dGVuZHMoe1xuICAgICAgICAgIC8vIENvbmNhdGVudGF0ZSB0aGUgdHlwZSBzdHJpbmcuXG4gICAgICAgICAgdHlwZTogW1RZUEUsIF9QRU5ESU5HXS5qb2luKFBST01JU0VfVFlQRV9ERUxJTUlURVIpXG5cbiAgICAgICAgfSwgZGF0YSAhPT0gdW5kZWZpbmVkID8geyBwYXlsb2FkOiBkYXRhIH0gOiB7fSwgTUVUQSAhPT0gdW5kZWZpbmVkID8geyBtZXRhOiBNRVRBIH0gOiB7fSkpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZWNvbmQsIGRpc3BhdGNoIGEgcmVqZWN0ZWQgb3IgZnVsZmlsbGVkIGFjdGlvbiBhbmQgbW92ZSBvbiB0byB0aGVcbiAgICAgICAgICogbmV4dCBtaWRkbGV3YXJlLlxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihoYW5kbGVGdWxmaWxsLCBoYW5kbGVSZWplY3QpO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBpc1Byb21pc2U7XG5mdW5jdGlvbiBpc1Byb21pc2UodmFsdWUpIHtcbiAgaWYgKHZhbHVlICE9PSBudWxsICYmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGNyZWF0ZVRodW5rTWlkZGxld2FyZShleHRyYUFyZ3VtZW50KSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBkaXNwYXRjaCA9IF9yZWYuZGlzcGF0Y2gsXG4gICAgICAgIGdldFN0YXRlID0gX3JlZi5nZXRTdGF0ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvbihkaXNwYXRjaCwgZ2V0U3RhdGUsIGV4dHJhQXJndW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgIH07XG4gICAgfTtcbiAgfTtcbn1cblxudmFyIHRodW5rID0gY3JlYXRlVGh1bmtNaWRkbGV3YXJlKCk7XG50aHVuay53aXRoRXh0cmFBcmd1bWVudCA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gdGh1bms7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cblxudmFyICQkb2JzZXJ2YWJsZSA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCdzeW1ib2wtb2JzZXJ2YWJsZScpKTtcblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbnZhciBBY3Rpb25UeXBlcyA9IHtcbiAgSU5JVDogJ0BAcmVkdXgvSU5JVCcgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKSxcbiAgUkVQTEFDRTogJ0BAcmVkdXgvUkVQTEFDRScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKVxufTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBvYmogVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGFyZ3VtZW50IGFwcGVhcnMgdG8gYmUgYSBwbGFpbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qob2JqKSB7XG4gIGlmICgodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JqKSkgIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBwcm90byA9IG9iajtcbiAgd2hpbGUgKE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90bykgIT09IG51bGwpIHtcbiAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gKlxuICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICogaW50byBhIHNpbmdsZSByZWR1Y2VyIGZ1bmN0aW9uIGJ5IHVzaW5nIGBjb21iaW5lUmVkdWNlcnNgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAqIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBhY3Rpb24gdG8gaGFuZGxlLlxuICpcbiAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gaHlkcmF0ZSB0aGUgc3RhdGUgZnJvbSB0aGUgc2VydmVyIGluIHVuaXZlcnNhbCBhcHBzLCBvciB0byByZXN0b3JlIGFcbiAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gKiBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZSBhcyBgY29tYmluZVJlZHVjZXJzYCBrZXlzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtlbmhhbmNlcl0gVGhlIHN0b3JlIGVuaGFuY2VyLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gZW5oYW5jZSB0aGUgc3RvcmUgd2l0aCB0aGlyZC1wYXJ0eSBjYXBhYmlsaXRpZXMgc3VjaCBhcyBtaWRkbGV3YXJlLFxuICogdGltZSB0cmF2ZWwsIHBlcnNpc3RlbmNlLCBldGMuIFRoZSBvbmx5IHN0b3JlIGVuaGFuY2VyIHRoYXQgc2hpcHMgd2l0aCBSZWR1eFxuICogaXMgYGFwcGx5TWlkZGxld2FyZSgpYC5cbiAqXG4gKiBAcmV0dXJucyB7U3RvcmV9IEEgUmVkdXggc3RvcmUgdGhhdCBsZXRzIHlvdSByZWFkIHRoZSBzdGF0ZSwgZGlzcGF0Y2ggYWN0aW9uc1xuICogYW5kIHN1YnNjcmliZSB0byBjaGFuZ2VzLlxuICovXG5mdW5jdGlvbiBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpIHtcbiAgdmFyIF9yZWYyO1xuXG4gIGlmICh0eXBlb2YgcHJlbG9hZGVkU3RhdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVuaGFuY2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIGVuaGFuY2VyID0gcHJlbG9hZGVkU3RhdGU7XG4gICAgcHJlbG9hZGVkU3RhdGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIGVuaGFuY2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVuaGFuY2VyKGNyZWF0ZVN0b3JlKShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSByZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgY3VycmVudFJlZHVjZXIgPSByZWR1Y2VyO1xuICB2YXIgY3VycmVudFN0YXRlID0gcHJlbG9hZGVkU3RhdGU7XG4gIHZhciBjdXJyZW50TGlzdGVuZXJzID0gW107XG4gIHZhciBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycztcbiAgdmFyIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCkge1xuICAgIGlmIChuZXh0TGlzdGVuZXJzID09PSBjdXJyZW50TGlzdGVuZXJzKSB7XG4gICAgICBuZXh0TGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycy5zbGljZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgc3RhdGUgdHJlZSBtYW5hZ2VkIGJ5IHRoZSBzdG9yZS5cbiAgICpcbiAgICogQHJldHVybnMge2FueX0gVGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBvZiB5b3VyIGFwcGxpY2F0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBub3QgY2FsbCBzdG9yZS5nZXRTdGF0ZSgpIHdoaWxlIHRoZSByZWR1Y2VyIGlzIGV4ZWN1dGluZy4gJyArICdUaGUgcmVkdWNlciBoYXMgYWxyZWFkeSByZWNlaXZlZCB0aGUgc3RhdGUgYXMgYW4gYXJndW1lbnQuICcgKyAnUGFzcyBpdCBkb3duIGZyb20gdGhlIHRvcCByZWR1Y2VyIGluc3RlYWQgb2YgcmVhZGluZyBpdCBmcm9tIHRoZSBzdG9yZS4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbGlzdGVuZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbWF5IG5vdCBjYWxsIHN0b3JlLnN1YnNjcmliZSgpIHdoaWxlIHRoZSByZWR1Y2VyIGlzIGV4ZWN1dGluZy4gJyArICdJZiB5b3Ugd291bGQgbGlrZSB0byBiZSBub3RpZmllZCBhZnRlciB0aGUgc3RvcmUgaGFzIGJlZW4gdXBkYXRlZCwgc3Vic2NyaWJlIGZyb20gYSAnICsgJ2NvbXBvbmVudCBhbmQgaW52b2tlIHN0b3JlLmdldFN0YXRlKCkgaW4gdGhlIGNhbGxiYWNrIHRvIGFjY2VzcyB0aGUgbGF0ZXN0IHN0YXRlLiAnICsgJ1NlZSBodHRwczovL3JlZHV4LmpzLm9yZy9hcGktcmVmZXJlbmNlL3N0b3JlI3N1YnNjcmliZShsaXN0ZW5lcikgZm9yIG1vcmUgZGV0YWlscy4nKTtcbiAgICB9XG5cbiAgICB2YXIgaXNTdWJzY3JpYmVkID0gdHJ1ZTtcblxuICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICBuZXh0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgaWYgKCFpc1N1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBtYXkgbm90IHVuc3Vic2NyaWJlIGZyb20gYSBzdG9yZSBsaXN0ZW5lciB3aGlsZSB0aGUgcmVkdWNlciBpcyBleGVjdXRpbmcuICcgKyAnU2VlIGh0dHBzOi8vcmVkdXguanMub3JnL2FwaS1yZWZlcmVuY2Uvc3RvcmUjc3Vic2NyaWJlKGxpc3RlbmVyKSBmb3IgbW9yZSBkZXRhaWxzLicpO1xuICAgICAgfVxuXG4gICAgICBpc1N1YnNjcmliZWQgPSBmYWxzZTtcblxuICAgICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgICAgdmFyIGluZGV4ID0gbmV4dExpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgIG5leHRMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uLiBJdCBpcyB0aGUgb25seSB3YXkgdG8gdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS5cbiAgICpcbiAgICogVGhlIGByZWR1Y2VyYCBmdW5jdGlvbiwgdXNlZCB0byBjcmVhdGUgdGhlIHN0b3JlLCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZVxuICAgKiBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBnaXZlbiBgYWN0aW9uYC4gSXRzIHJldHVybiB2YWx1ZSB3aWxsXG4gICAqIGJlIGNvbnNpZGVyZWQgdGhlICoqbmV4dCoqIHN0YXRlIG9mIHRoZSB0cmVlLCBhbmQgdGhlIGNoYW5nZSBsaXN0ZW5lcnNcbiAgICogd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb25seSBzdXBwb3J0cyBwbGFpbiBvYmplY3QgYWN0aW9ucy4gSWYgeW91IHdhbnQgdG9cbiAgICogZGlzcGF0Y2ggYSBQcm9taXNlLCBhbiBPYnNlcnZhYmxlLCBhIHRodW5rLCBvciBzb21ldGhpbmcgZWxzZSwgeW91IG5lZWQgdG9cbiAgICogd3JhcCB5b3VyIHN0b3JlIGNyZWF0aW5nIGZ1bmN0aW9uIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgbWlkZGxld2FyZS4gRm9yXG4gICAqIGV4YW1wbGUsIHNlZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgdGhlIGByZWR1eC10aHVua2AgcGFja2FnZS4gRXZlbiB0aGVcbiAgICogbWlkZGxld2FyZSB3aWxsIGV2ZW50dWFsbHkgZGlzcGF0Y2ggcGxhaW4gb2JqZWN0IGFjdGlvbnMgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gQSBwbGFpbiBvYmplY3QgcmVwcmVzZW50aW5nIOKAnHdoYXQgY2hhbmdlZOKAnS4gSXQgaXNcbiAgICogYSBnb29kIGlkZWEgdG8ga2VlcCBhY3Rpb25zIHNlcmlhbGl6YWJsZSBzbyB5b3UgY2FuIHJlY29yZCBhbmQgcmVwbGF5IHVzZXJcbiAgICogc2Vzc2lvbnMsIG9yIHVzZSB0aGUgdGltZSB0cmF2ZWxsaW5nIGByZWR1eC1kZXZ0b29sc2AuIEFuIGFjdGlvbiBtdXN0IGhhdmVcbiAgICogYSBgdHlwZWAgcHJvcGVydHkgd2hpY2ggbWF5IG5vdCBiZSBgdW5kZWZpbmVkYC4gSXQgaXMgYSBnb29kIGlkZWEgdG8gdXNlXG4gICAqIHN0cmluZyBjb25zdGFudHMgZm9yIGFjdGlvbiB0eXBlcy5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gRm9yIGNvbnZlbmllbmNlLCB0aGUgc2FtZSBhY3Rpb24gb2JqZWN0IHlvdSBkaXNwYXRjaGVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQsIGlmIHlvdSB1c2UgYSBjdXN0b20gbWlkZGxld2FyZSwgaXQgbWF5IHdyYXAgYGRpc3BhdGNoKClgIHRvXG4gICAqIHJldHVybiBzb21ldGhpbmcgZWxzZSAoZm9yIGV4YW1wbGUsIGEgUHJvbWlzZSB5b3UgY2FuIGF3YWl0KS5cbiAgICovXG4gIGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdChhY3Rpb24pKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbXVzdCBiZSBwbGFpbiBvYmplY3RzLiAnICsgJ1VzZSBjdXN0b20gbWlkZGxld2FyZSBmb3IgYXN5bmMgYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGFjdGlvbi50eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG1heSBub3QgaGF2ZSBhbiB1bmRlZmluZWQgXCJ0eXBlXCIgcHJvcGVydHkuICcgKyAnSGF2ZSB5b3UgbWlzc3BlbGxlZCBhIGNvbnN0YW50PycpO1xuICAgIH1cblxuICAgIGlmIChpc0Rpc3BhdGNoaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXJzIG1heSBub3QgZGlzcGF0Y2ggYWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IHRydWU7XG4gICAgICBjdXJyZW50U3RhdGUgPSBjdXJyZW50UmVkdWNlcihjdXJyZW50U3RhdGUsIGFjdGlvbik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgbGlzdGVuZXJzID0gY3VycmVudExpc3RlbmVycyA9IG5leHRMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAgIGxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLlJFUExBQ0UgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICgodHlwZW9mIG9ic2VydmVyID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYnNlcnZlcikpICE9PSAnb2JqZWN0JyB8fCBvYnNlcnZlciA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHRoZSBvYnNlcnZlciB0byBiZSBhbiBvYmplY3QuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlU3RhdGUoKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLm5leHQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQoZ2V0U3RhdGUoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb2JzZXJ2ZVN0YXRlKCk7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZSA9IG91dGVyU3Vic2NyaWJlKG9ic2VydmVTdGF0ZSk7XG4gICAgICAgIHJldHVybiB7IHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZSB9O1xuICAgICAgfVxuICAgIH0sIF9yZWZbJCRvYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMlskJG9ic2VydmFibGVdID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59XG5cbi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfSBjYXRjaCAoZSkge30gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1lbXB0eVxufVxuXG5mdW5jdGlvbiBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbikge1xuICB2YXIgYWN0aW9uVHlwZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZTtcbiAgdmFyIGFjdGlvbkRlc2NyaXB0aW9uID0gYWN0aW9uVHlwZSAmJiAnYWN0aW9uIFwiJyArIFN0cmluZyhhY3Rpb25UeXBlKSArICdcIicgfHwgJ2FuIGFjdGlvbic7XG5cbiAgcmV0dXJuICdHaXZlbiAnICsgYWN0aW9uRGVzY3JpcHRpb24gKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLiAnICsgJ0lmIHlvdSB3YW50IHRoaXMgcmVkdWNlciB0byBob2xkIG5vIHZhbHVlLCB5b3UgY2FuIHJldHVybiBudWxsIGluc3RlYWQgb2YgdW5kZWZpbmVkLic7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gQWN0aW9uVHlwZXMuSU5JVCA/ICdwcmVsb2FkZWRTdGF0ZSBhcmd1bWVudCBwYXNzZWQgdG8gY3JlYXRlU3RvcmUnIDogJ3ByZXZpb3VzIHN0YXRlIHJlY2VpdmVkIGJ5IHRoZSByZWR1Y2VyJztcblxuICBpZiAocmVkdWNlcktleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICdTdG9yZSBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgcmVkdWNlci4gTWFrZSBzdXJlIHRoZSBhcmd1bWVudCBwYXNzZWQgJyArICd0byBjb21iaW5lUmVkdWNlcnMgaXMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgcmVkdWNlcnMuJztcbiAgfVxuXG4gIGlmICghaXNQbGFpbk9iamVjdChpbnB1dFN0YXRlKSkge1xuICAgIHJldHVybiAnVGhlICcgKyBhcmd1bWVudE5hbWUgKyAnIGhhcyB1bmV4cGVjdGVkIHR5cGUgb2YgXCInICsge30udG9TdHJpbmcuY2FsbChpbnB1dFN0YXRlKS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLylbMV0gKyAnXCIuIEV4cGVjdGVkIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgJyArICgna2V5czogXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCInKTtcbiAgfVxuXG4gIHZhciB1bmV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGlucHV0U3RhdGUpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuICFyZWR1Y2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XTtcbiAgfSk7XG5cbiAgdW5leHBlY3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlW2tleV0gPSB0cnVlO1xuICB9KTtcblxuICBpZiAoYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlcy5SRVBMQUNFKSByZXR1cm47XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2hhcGUocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICAgIGlmICh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgZHVyaW5nIGluaXRpYWxpemF0aW9uLiAnICsgJ0lmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlIHJlZHVjZXIgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCAnICsgJ2V4cGxpY2l0bHkgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgJyArICdub3QgYmUgdW5kZWZpbmVkLiBJZiB5b3UgZG9uXFwndCB3YW50IHRvIHNldCBhIHZhbHVlIGZvciB0aGlzIHJlZHVjZXIsICcgKyAneW91IGNhbiB1c2UgbnVsbCBpbnN0ZWFkIG9mIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgQWN0aW9uVHlwZXMuSU5JVCArICcgb3Igb3RoZXIgYWN0aW9ucyBpbiBcInJlZHV4LypcIiAnKSArICduYW1lc3BhY2UuIFRoZXkgYXJlIGNvbnNpZGVyZWQgcHJpdmF0ZS4gSW5zdGVhZCwgeW91IG11c3QgcmV0dXJuIHRoZSAnICsgJ2N1cnJlbnQgc3RhdGUgZm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHVubGVzcyBpdCBpcyB1bmRlZmluZWQsICcgKyAnaW4gd2hpY2ggY2FzZSB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUsIHJlZ2FyZGxlc3Mgb2YgdGhlICcgKyAnYWN0aW9uIHR5cGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSBub3QgYmUgdW5kZWZpbmVkLCBidXQgY2FuIGJlIG51bGwuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5mdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2FybmluZygnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0gdm9pZCAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNoYXBlQXNzZXJ0aW9uRXJyb3IgPSB2b2lkIDA7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNoYXBlKGZpbmFsUmVkdWNlcnMpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgc2hhcGVBc3NlcnRpb25FcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNoYXBlQXNzZXJ0aW9uRXJyb3IpIHtcbiAgICAgIHRocm93IHNoYXBlQXNzZXJ0aW9uRXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICB3YXJuaW5nKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZmluYWxSZWR1Y2VyS2V5cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfa2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tfaV07XG4gICAgICB2YXIgcmVkdWNlciA9IGZpbmFsUmVkdWNlcnNbX2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW19rZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2UoX2tleSwgYWN0aW9uKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBuZXh0U3RhdGVbX2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uIGNyZWF0b3JzLCBpbnRvIGFuIG9iamVjdCB3aXRoIHRoZVxuICogc2FtZSBrZXlzLCBidXQgd2l0aCBldmVyeSBmdW5jdGlvbiB3cmFwcGVkIGludG8gYSBgZGlzcGF0Y2hgIGNhbGwgc28gdGhleVxuICogbWF5IGJlIGludm9rZWQgZGlyZWN0bHkuIFRoaXMgaXMganVzdCBhIGNvbnZlbmllbmNlIG1ldGhvZCwgYXMgeW91IGNhbiBjYWxsXG4gKiBgc3RvcmUuZGlzcGF0Y2goTXlBY3Rpb25DcmVhdG9ycy5kb1NvbWV0aGluZygpKWAgeW91cnNlbGYganVzdCBmaW5lLlxuICpcbiAqIEZvciBjb252ZW5pZW5jZSwgeW91IGNhbiBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24gYXMgdGhlIGZpcnN0IGFyZ3VtZW50LFxuICogYW5kIGdldCBhIGZ1bmN0aW9uIGluIHJldHVybi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdH0gYWN0aW9uQ3JlYXRvcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgYWN0aW9uXG4gKiBjcmVhdG9yIGZ1bmN0aW9ucy4gT25lIGhhbmR5IHdheSB0byBvYnRhaW4gaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXNgXG4gKiBzeW50YXguIFlvdSBtYXkgYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRpc3BhdGNoIFRoZSBgZGlzcGF0Y2hgIGZ1bmN0aW9uIGF2YWlsYWJsZSBvbiB5b3VyIFJlZHV4XG4gKiBzdG9yZS5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb258T2JqZWN0fSBUaGUgb2JqZWN0IG1pbWlja2luZyB0aGUgb3JpZ2luYWwgb2JqZWN0LCBidXQgd2l0aFxuICogZXZlcnkgYWN0aW9uIGNyZWF0b3Igd3JhcHBlZCBpbnRvIHRoZSBgZGlzcGF0Y2hgIGNhbGwuIElmIHlvdSBwYXNzZWQgYVxuICogZnVuY3Rpb24gYXMgYGFjdGlvbkNyZWF0b3JzYCwgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGFsc28gYmUgYSBzaW5nbGVcbiAqIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKSB7XG4gIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvcnMsIGRpc3BhdGNoKTtcbiAgfVxuXG4gIGlmICgodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhY3Rpb25DcmVhdG9ycykpICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFjdGlvbkNyZWF0b3JzKSkgKyAnLiAnICsgJ0RpZCB5b3Ugd3JpdGUgXCJpbXBvcnQgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiIGluc3RlYWQgb2YgXCJpbXBvcnQgKiBhcyBBY3Rpb25DcmVhdG9ycyBmcm9tXCI/Jyk7XG4gIH1cblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFjdGlvbkNyZWF0b3JzKTtcbiAgdmFyIGJvdW5kQWN0aW9uQ3JlYXRvcnMgPSB7fTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIGFjdGlvbkNyZWF0b3IgPSBhY3Rpb25DcmVhdG9yc1trZXldO1xuICAgIGlmICh0eXBlb2YgYWN0aW9uQ3JlYXRvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYm91bmRBY3Rpb25DcmVhdG9yc1trZXldID0gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm91bmRBY3Rpb25DcmVhdG9ycztcbn1cblxuLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5mdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHJldHVybiBmdW5jcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGEoYi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZS5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgdmFyIF9kaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rpc3BhdGNoaW5nIHdoaWxlIGNvbnN0cnVjdGluZyB5b3VyIG1pZGRsZXdhcmUgaXMgbm90IGFsbG93ZWQuICcgKyAnT3RoZXIgbWlkZGxld2FyZSB3b3VsZCBub3QgYmUgYXBwbGllZCB0byB0aGlzIGRpc3BhdGNoLicpO1xuICAgICAgfTtcblxuICAgICAgdmFyIG1pZGRsZXdhcmVBUEkgPSB7XG4gICAgICAgIGdldFN0YXRlOiBzdG9yZS5nZXRTdGF0ZSxcbiAgICAgICAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICAgICAgICAgIHJldHVybiBfZGlzcGF0Y2guYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIGNoYWluID0gbWlkZGxld2FyZXMubWFwKGZ1bmN0aW9uIChtaWRkbGV3YXJlKSB7XG4gICAgICAgIHJldHVybiBtaWRkbGV3YXJlKG1pZGRsZXdhcmVBUEkpO1xuICAgICAgfSk7XG4gICAgICBfZGlzcGF0Y2ggPSBjb21wb3NlLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufVxuXG4vKlxuICogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuICogSWYgdGhlIGZ1bmN0aW9uIGhhcyBiZWVuIG1pbmlmaWVkIGFuZCBOT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLCB3YXJuIHRoZSB1c2VyLlxuICovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB0eXBlb2YgaXNDcnVzaGVkLm5hbWUgPT09ICdzdHJpbmcnICYmIGlzQ3J1c2hlZC5uYW1lICE9PSAnaXNDcnVzaGVkJykge1xuICB3YXJuaW5nKFwiWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSAncHJvZHVjdGlvbicuIFwiICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSBjcmVhdGVTdG9yZTtcbmV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzO1xuZXhwb3J0cy5iaW5kQWN0aW9uQ3JlYXRvcnMgPSBiaW5kQWN0aW9uQ3JlYXRvcnM7XG5leHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZTtcbmV4cG9ydHMuY29tcG9zZSA9IGNvbXBvc2U7XG5leHBvcnRzLl9fRE9fTk9UX1VTRV9fQWN0aW9uVHlwZXMgPSBBY3Rpb25UeXBlcztcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9wb255ZmlsbCA9IHJlcXVpcmUoJy4vcG9ueWZpbGwuanMnKTtcblxudmFyIF9wb255ZmlsbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb255ZmlsbCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIHJvb3Q7IC8qIGdsb2JhbCB3aW5kb3cgKi9cblxuXG5pZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBzZWxmO1xufSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gbW9kdWxlO1xufSBlbHNlIHtcbiAgcm9vdCA9IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG59XG5cbnZhciByZXN1bHQgPSAoMCwgX3BvbnlmaWxsMlsnZGVmYXVsdCddKShyb290KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJlc3VsdDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGw7XG5mdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgX1N5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5cdGlmICh0eXBlb2YgX1N5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChfU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2wub2JzZXJ2YWJsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbCgnb2JzZXJ2YWJsZScpO1xuXHRcdFx0X1N5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59OyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCBNYXRjaGVzIGZyb20gJy4vUHJlYWN0Q2xhc3Nlcy9NYXRjaGVzJztcblxuY2xhc3MgTGVhZ3VlTWF0Y2hlc0FwcCB7XG5cdGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdHRoaXMuYmluZEV2ZW50cygpO1xuXHR9XG5cblx0YmluZEV2ZW50cygpIHtcblx0XHRyZW5kZXIoPE1hdGNoZXMgLz4sIHRoaXMuZWxlbWVudCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGVhZ3VlTWF0Y2hlc0FwcDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgTWFpbkxlYWd1ZUFwcCBmcm9tICcuL1ByZWFjdENsYXNzZXMvTWFpbkxlYWd1ZUFwcCc7XG5cbmNsYXNzIExlYWd1ZVJlYWN0QXBwIHtcblx0Y29uc3RydWN0b3IoZWxlbWVudCkge1xuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cdFx0dGhpcy5iaW5kRXZlbnRzKCk7XG5cdH1cblxuXHRiaW5kRXZlbnRzKCkge1xuXHRcdGNvbnNvbGUubG9nKCdyZW5kZXJpbmcnKTtcblx0XHRyZW5kZXIoPE1haW5MZWFndWVBcHAgLz4sIHRoaXMuZWxlbWVudCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGVhZ3VlUmVhY3RBcHA7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IE1hdGNoVXAgZnJvbSAnLi9NYXRjaFVwL2luZGV4LmpzJztcbmltcG9ydCBDaGFtcHMgZnJvbSAnLi9DaGFtcHMvaW5kZXguanMnO1xuaW1wb3J0IFBsYXllcnMgZnJvbSAnLi9QbGF5ZXJzL2luZGV4LmpzJztcblxuY2xhc3MgQXBwTWFpbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Z2V0U3BlY2lmaWNBcHAoKSB7XG5cdFx0c3dpdGNoKHRoaXMucHJvcHMuYXBwVHlwZSkge1xuXHRcdFx0Y2FzZSAnbWF0Y2hVcCc6XG5cdFx0XHRcdHJldHVybiA8TWF0Y2hVcCBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPjtcblxuXHRcdFx0Y2FzZSAnY2hhbXBzJzpcblx0XHRcdFx0cmV0dXJuIDxDaGFtcHMgLz47XG5cblx0XHRcdGNhc2UgJ3BsYXllcnMnOlxuXHRcdFx0XHRyZXR1cm4gPFBsYXllcnMgLz5cblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0U3BlY2lmaWNBcHAoKTtcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwcE1haW47IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGlkVG9DaGFtcCB9IGZyb20gJy4vbWV0aG9kcy9DaGFtcEZ1bmNzJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlVmFyaWFibGVzOiBzdG9yZS5zdGF0cy5hY3RpdmVWYXJpYWJsZXNcbiAgICB9XG59KVxuY2xhc3MgQ2FsY3VsYXRvciBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRhY3RpdmVDaGFtcHM6IFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ11cblx0XHR9KVxuXHR9XG5cblx0aGFuZGxlQ2hhbmdlKGUsIGkpIHtcblx0XHRsZXQgYWN0aXZlQ2hhbXBzID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5zdGF0ZS5hY3RpdmVDaGFtcHMpO1xuXHRcdGFjdGl2ZUNoYW1wc1tpXSA9IGUudGFyZ2V0LnZhbHVlO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0YWN0aXZlQ2hhbXBzOiBhY3RpdmVDaGFtcHNcblx0XHR9KTtcblx0fVxuXG5cdGNoZWNrQ2hhbXBzKCkge1xuXHRcdGNvbnN0IGNoYW1wc0FycmF5ID0gdGhpcy5wcm9wcy5jaGFtcHNBcnJheTtcblx0XHRpZih0aGlzLnN0YXRlLmNoYW1wc0FycmF5ICE9PSBjaGFtcHNBcnJheSkge1xuXHRcdFx0bGV0IGNoYW1wc0xpc3QgPSBbXTtcblx0XHRcdGxldCBjaGFtcHNPYmplY3QgPSB7fTtcblx0XHRcdEFycmF5LmZyb20oY2hhbXBzQXJyYXksIGNoYW1wID0+IHtcblx0XHRcdFx0Y2hhbXBzTGlzdC5wdXNoKHtcblx0XHRcdFx0XHRuYW1lOiBpZFRvQ2hhbXAoY2hhbXAuaWQpLFxuXHRcdFx0XHRcdGlkOiBjaGFtcC5pZFxuXHRcdFx0XHR9KVxuXHRcdFx0XHRjaGFtcHNPYmplY3RbY2hhbXAuaWRdID0gY2hhbXBcblx0XHRcdH0pXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y2hhbXBzQXJyYXk6IGNoYW1wc0FycmF5LFxuXHRcdFx0XHRjaGFtcHNMaXN0OiBjaGFtcHNMaXN0LFxuXHRcdFx0XHRjaGFtcHNPYmplY3Q6IGNoYW1wc09iamVjdFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyQ2hhbXBTZWxlY3RvcihpKSB7XG5cdFx0bGV0IGNoYW1wT3B0aW9ucyA9IFtdO1xuXHRcdEFycmF5LmZyb20odGhpcy5zdGF0ZS5jaGFtcHNMaXN0LCBjaGFtcCA9PiB7XG5cdFx0XHRjaGFtcE9wdGlvbnMucHVzaCg8b3B0aW9uIHZhbHVlPXtjaGFtcC5pZH0+e2NoYW1wLm5hbWV9PC9vcHRpb24+KTtcblx0XHR9KVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhbGN1bGF0b3JfX2NoYW1wLWhvbGRlclwiPlxuXHRcdFx0XHQ8c2VsZWN0IHZhbHVlPXt0aGlzLnN0YXRlLmFjdGl2ZUNoYW1wc1tpXX0gb25DaGFuZ2U9eyhlKSA9PiB7dGhpcy5oYW5kbGVDaGFuZ2UoZSwgaSl9fT5cblx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPScnPjwvb3B0aW9uPlxuXHRcdFx0XHRcdHtjaGFtcE9wdGlvbnN9XG5cdFx0XHRcdDwvc2VsZWN0PlxuXHRcdFx0XHR7dGhpcy5nZXRDaGFtcFN0YXRzKHRoaXMuc3RhdGUuYWN0aXZlQ2hhbXBzW2ldKX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJDaGFtcFNlbGVjdGlvbigpIHtcblx0XHR0aGlzLmNoZWNrQ2hhbXBzKCk7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdGxldCBjaGFtcENlbGxzID0gW107XG5cdFx0d2hpbGUoaSA8IDEwKSB7XG5cdFx0XHRjaGFtcENlbGxzLnB1c2godGhpcy5yZW5kZXJDaGFtcFNlbGVjdG9yKGkpKTtcblx0XHRcdGkrKztcblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FsY3VsYXRvcl9fY2hhbXBzXCI+XG5cdFx0XHRcdHtjaGFtcENlbGxzfVxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0Z2V0UGVyY2VudGFnZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAoYSAvIGIpICogMTAwO1xuICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lYDtcbiAgICB9XG5cblx0Z2V0VmFyaWFibGVTdGF0KGNoYW1wSWQsIHZhcmlhYmxlKSB7XG5cdFx0Y29uc3QgY2hhbXAgPSB0aGlzLnN0YXRlLmNoYW1wc09iamVjdFtjaGFtcElkXTtcblx0XHRpZih2YXJpYWJsZS50eXBlID09PSAncGVyY2VudCcpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldFBlcmNlbnRhZ2UoY2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdLCBjaGFtcC5wbGF5ZWQpO1xuXHRcdH1cblx0XHRpZih2YXJpYWJsZS50eXBlID09PSAndmFsdWUnKSB7XG5cdFx0XHRyZXR1cm4gY2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdXG5cdFx0fVxuXHR9XG5cblx0Z2V0U2luZ2xlU3RhdCh2YXJpYWJsZSwgY2hhbXBJZCkge1xuXHRcdGxldCBtb2RpZmllciA9ICcnO1xuXHRcdGNvbnN0IGdhbWVzUGxheWVkID0gdGhpcy5zdGF0ZS5jaGFtcHNPYmplY3RbY2hhbXBJZF0ucGxheWVkO1xuXHRcdGNvbnN0IHN0YXQgPSB0aGlzLmdldFZhcmlhYmxlU3RhdChjaGFtcElkLCB2YXJpYWJsZSk7XG5cdFx0Y29uc29sZS5sb2coJ3ZhcmlhYmxlIGlzICcsIHZhcmlhYmxlKTtcblx0XHRjb25zb2xlLmxvZygndmFyaWFibGUgYXZlcmFnZSBpcyAnLCB2YXJpYWJsZS5hdmVyYWdlKTtcblx0XHRpZih2YXJpYWJsZS5hdmVyYWdlICYmIHZhcmlhYmxlLnR5cGUgPT09ICdwZXJjZW50JyAmJiBnYW1lc1BsYXllZCA+IDEwKSB7XG5cdFx0XHRjb25zdCBzdGF0SW50ID0gTnVtYmVyLnBhcnNlSW50KHN0YXQpO1xuXHRcdFx0Y29uc29sZS5sb2coJ2dvdCBoZXJlJyk7XG5cdFx0XHRpZihzdGF0SW50ID4gdmFyaWFibGUuYXZlcmFnZSArIDUpIHtcblx0XHRcdFx0bW9kaWZpZXIgPSAnaGlnaCc7XG5cdFx0XHR9XG5cdFx0XHRpZihzdGF0SW50IDwgdmFyaWFibGUuYXZlcmFnZSAtIDUpIHtcblx0XHRcdFx0bW9kaWZpZXIgPSAnbG93Jztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxzcGFuIGNsYXNzTmFtZT17YHN0YXQgIHN0YXQtLSR7bW9kaWZpZXJ9YH0+e3ZhcmlhYmxlLmZyaWVuZGx5TmFtZX06IHtzdGF0fTwvc3Bhbj5cblx0XHQpO1xuXHR9XG5cblx0Z2V0Q2hhbXBTdGF0cyhjaGFtcElkKSB7XG5cdFx0bGV0IGNoYW1wU3RhdHMgPSBbXTtcblx0XHRpZih0aGlzLnN0YXRlLmNoYW1wc09iamVjdCAmJiB0aGlzLnN0YXRlLmNoYW1wc09iamVjdFtjaGFtcElkXSkge1xuXHRcdFx0QXJyYXkuZnJvbSh0aGlzLnByb3BzLmFjdGl2ZVZhcmlhYmxlcywgdmFyaWFibGUgPT4ge1xuXHRcdFx0XHRjaGFtcFN0YXRzLnB1c2goPGxpPnt0aGlzLmdldFNpbmdsZVN0YXQodmFyaWFibGUsIGNoYW1wSWQpfTwvbGk+KVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNoYW1wU3RhdHMucHVzaCg8bGk+Tm8gc3RhdHMgZm91bmQ8L2xpPilcblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDx1bCBjbGFzc05hbWU9XCJjYWxjdWxhdG9yX19saXN0XCI+XG5cdFx0XHRcdHtjaGFtcFN0YXRzfVxuXHRcdFx0PC91bD5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJDaGFtcFNlbGVjdGlvbigpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2FsY3VsYXRvcjsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWluUGxheWVkOiBzdG9yZS5zdGF0cy5taW5QbGF5ZWRcbiAgICB9XG59KVxuY2xhc3MgUGF0Y2hlcyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZShlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9NSU5QTEFZRUQnLFxuICAgICAgICAgICAgbWluUGxheWVkOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMucHJvcHMubWluUGxheWVkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX0gdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIk1pbiBHYW1lcyBQbGF5ZWRcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0Y2hlczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUGF0Y2hlczogc3RvcmUuc3RhdHMuYWN0aXZlUGF0Y2hlc1xuICAgIH1cbn0pXG5jbGFzcyBQYXRjaGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICAgICAgaWYod2luZG93LmxvY2FsU3RvcmFnZS5wYXRjaGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsUGF0Y2hlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0UGF0Y2hlcygpO1xuICAgICAgICB9XG5cdH1cblxuICAgIHNldERlZmF1bHRQYXRjaGVzKCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdTRVRfQUxMX1BBVENIRVMnLFxuICAgICAgICAgICAgcGF0Y2hlczogdGhpcy5wcm9wcy5wYXRjaGVzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldExvY2FsUGF0Y2hlcygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9QQVRDSEVTJyxcbiAgICAgICAgICAgIHBhdGNoZXM6IHdpbmRvdy5sb2NhbFN0b3JhZ2UucGF0Y2hlc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc1BhdGNoQWN0aXZlKHBhdGNoKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlcyAmJiB0aGlzLnByb3BzLmFjdGl2ZVBhdGNoZXMuaW5jbHVkZXMocGF0Y2gpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrZWQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB0b2dnbGVQYXRjaChwYXRjaCkge1xuICAgICAgICBsZXQgYWN0aXZlUGF0Y2hlcyA9IE9iamVjdC5hc3NpZ24oW10sIHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlcyk7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlUGF0Y2hlcy5pbmNsdWRlcyhwYXRjaCkpIHtcbiAgICAgICAgICAgIGFjdGl2ZVBhdGNoZXMgPSBhY3RpdmVQYXRjaGVzLmZpbHRlcihhY3RpdmVQYXRjaCA9PiBhY3RpdmVQYXRjaCAhPT0gcGF0Y2gpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVQYXRjaGVzLnB1c2gocGF0Y2gpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9BTExfUEFUQ0hFUycsXG4gICAgICAgICAgICBwYXRjaGVzOiBhY3RpdmVQYXRjaGVzXG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucGF0Y2hlcyA9IGFjdGl2ZVBhdGNoZXM7XG4gICAgfVxuXG4gICAgcmVuZGVyUGF0Y2hlcygpIHtcbiAgICAgICAgbGV0IHBhdGNoZXMgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3BzLnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9faW5wdXQtaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNoYW5nZT17KCkgPT4geyB0aGlzLnRvZ2dsZVBhdGNoKHBhdGNoKX19IGNoZWNrZWQ9e3RoaXMuaXNQYXRjaEFjdGl2ZShwYXRjaCl9IGlkPXtgcGF0Y2gtJHtwYXRjaH1gfSB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPXtgcGF0Y2gtJHtwYXRjaH1gfT57cGF0Y2h9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXRjaGVzO1xuICAgIH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyUGF0Y2hlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUGF0Y2hlczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUmVnaW9uczogc3RvcmUuc3RhdHMuYWN0aXZlUmVnaW9uc1xuICAgIH1cbn0pXG5jbGFzcyBSZWdpb25zIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0UmVnaW9ucygpO1xuXHR9XG5cbiAgICBzZXREZWZhdWx0UmVnaW9ucygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9SRUdJT05TJyxcbiAgICAgICAgICAgIHJlZ2lvbnM6IHRoaXMucHJvcHMucmVnaW9uc1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGlzUmVnaW9uQWN0aXZlKHJlZ2lvbikge1xuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMgJiYgdGhpcy5wcm9wcy5hY3RpdmVSZWdpb25zLmluY2x1ZGVzKHJlZ2lvbikpIHtcbiAgICAgICAgICAgIHJldHVybiAnY2hlY2tlZCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHRvZ2dsZVJlZ2lvbihyZWdpb24pIHtcbiAgICAgICAgbGV0IGFjdGl2ZVJlZ2lvbnMgPSBPYmplY3QuYXNzaWduKFtdLCB0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMpO1xuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMuaW5jbHVkZXMocmVnaW9uKSkge1xuICAgICAgICAgICAgYWN0aXZlUmVnaW9ucyA9IGFjdGl2ZVJlZ2lvbnMuZmlsdGVyKGFjdGl2ZVJlZ2lvbiA9PiBhY3RpdmVSZWdpb24gIT09IHJlZ2lvbilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZVJlZ2lvbnMucHVzaChyZWdpb24pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9BTExfUkVHSU9OUycsXG4gICAgICAgICAgICByZWdpb25zOiBhY3RpdmVSZWdpb25zXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyUmVnaW9ucygpIHtcbiAgICAgICAgbGV0IHJlZ2lvbnMgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3BzLnJlZ2lvbnMsIHJlZ2lvbiA9PiB7XG4gICAgICAgICAgICByZWdpb25zLnB1c2goXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX2lucHV0LWhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgb25DaGFuZ2U9eygpID0+IHsgdGhpcy50b2dnbGVSZWdpb24ocmVnaW9uKX19IGNoZWNrZWQ9e3RoaXMuaXNSZWdpb25BY3RpdmUocmVnaW9uKX0gaWQ9e2ByZWdpb24tJHtyZWdpb259YH0gdHlwZT1cImNoZWNrYm94XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj17YHJlZ2lvbi0ke3JlZ2lvbn1gfT57cmVnaW9ufTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVnaW9ucztcbiAgICB9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclJlZ2lvbnMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lvbnM7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCBTdGF0cyBmcm9tICcuL21ldGhvZHMvU3RhdHMnO1xuaW1wb3J0IHsgaWRUb0NoYW1wIH0gZnJvbSAnLi9tZXRob2RzL0NoYW1wRnVuY3MnO1xuXG5pbXBvcnQgQ2FsY3VsYXRvciBmcm9tICcuL0NhbGN1bGF0b3InO1xuaW1wb3J0IFRhYmxlIGZyb20gJy4vVGFibGUnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0czogc3RvcmUuc3RhdHMuc3RhdHMsXG4gICAgICAgIGFjdGl2ZVJlZ2lvbnM6IHN0b3JlLnN0YXRzLmFjdGl2ZVJlZ2lvbnMsXG4gICAgICAgIGFjdGl2ZVBhdGNoZXM6IHN0b3JlLnN0YXRzLmFjdGl2ZVBhdGNoZXMsXG4gICAgICAgIGFjdGl2ZVZhcmlhYmxlczogc3RvcmUuc3RhdHMuYWN0aXZlVmFyaWFibGVzLFxuICAgICAgICBtaW5QbGF5ZWQ6IHN0b3JlLnN0YXRzLm1pblBsYXllZFxuICAgIH1cbn0pXG5jbGFzcyBTdGF0c0Jsb2NrIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmVSZWdpb25zOiB0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbnMsXG4gICAgICAgICAgICBhY3RpdmVQYXRjaGVzOiB0aGlzLnByb3BzLmFjdGl2ZVBhdGNoZXMsXG4gICAgICAgICAgICBhY3RpdmU6ICd0YWJsZSdcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhdHNDbGFzcyA9IG5ldyBTdGF0cyh0aGlzLnByb3BzLnN0YXRzKTtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVTdGF0cygpO1xuICAgIH1cbiAgICBcbiAgICBzZXREZWZhdWx0T3JkZXIoKSB7XG4gICAgICAgIGlmKCF0aGlzLnN0YXRzQ2xhc3MuaXNEZWZhdWx0T3JkZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0c0NsYXNzLnNldERlZmF1bHRPcmRlcigpO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVTdGF0cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU3RhdHMoKSB7XG4gICAgICAgIHRoaXMuc3RhdHNDbGFzcy5zZXRTdGF0ZXModGhpcy5zdGF0ZS5hY3RpdmVSZWdpb25zLCB0aGlzLnN0YXRlLmFjdGl2ZVBhdGNoZXMpO1xuICAgICAgICB0aGlzLnN0YXRzQ2xhc3MuY2FsY3VsYXRlKCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY2hhbXBzOiB0aGlzLnN0YXRzQ2xhc3MuZ2V0Q2hhbXBzKClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3dpdGNoZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYmxlX19jaG9pY2VzXCI+XG4gICAgICAgICAgICAgICAgPGEgb25DbGljaz17KCkgPT4geyB0aGlzLnNldFN0YXRlKHthY3RpdmU6ICd0YWJsZSd9KX19PlRhYmxlPC9hPlxuICAgICAgICAgICAgICAgIDxhIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiAnY2FsY3VsYXRvcid9KX19PkNhbGN1bGF0b3I8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBnZXRPcmRlclZhcmlhYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0c0NsYXNzLmdldE9yZGVyVmFyaWFibGUoKTtcbiAgICB9XG5cbiAgICBzZXRPcmRlcih2YXJpYWJsZSkge1xuICAgICAgICB0aGlzLnN0YXRzQ2xhc3Muc2V0T3JkZXIodmFyaWFibGUpO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVN0YXRzKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgc3dpdGNoKHRoaXMuc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxUYWJsZSBzZXRPcmRlcj17dGhpcy5zZXRPcmRlci5iaW5kKHRoaXMpfSBnZXRPcmRlclZhcmlhYmxlPXt0aGlzLmdldE9yZGVyVmFyaWFibGUuYmluZCh0aGlzKX0gY2hhbXBzQXJyYXk9e3RoaXMuc3RhdGUuY2hhbXBzfS8+XG4gICAgICAgICAgICBjYXNlICdjYWxjdWxhdG9yJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNldERlZmF1bHRPcmRlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiA8Q2FsY3VsYXRvciBjaGFtcHNBcnJheT17dGhpcy5zdGF0ZS5jaGFtcHN9Lz5cbiAgICAgICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICB9XG4gICAgfVxuXG5cdHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3dpdGNoZXIoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuYWN0aXZlUGF0Y2hlcyAhPT0gbmV3UHJvcHMuYWN0aXZlUGF0Y2hlcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYWN0aXZlUGF0Y2hlczogbmV3UHJvcHMuYWN0aXZlUGF0Y2hlc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZS5hY3RpdmVSZWdpb25zICE9PSBuZXdQcm9wcy5hY3RpdmVSZWdpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBhY3RpdmVSZWdpb25zOiBuZXdQcm9wcy5hY3RpdmVSZWdpb25zXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVTdGF0cygpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzQmxvY2s7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGlkVG9DaGFtcCB9IGZyb20gJy4vbWV0aG9kcy9DaGFtcEZ1bmNzJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlVmFyaWFibGVzOiBzdG9yZS5zdGF0cy5hY3RpdmVWYXJpYWJsZXMsXG4gICAgICAgIG1pblBsYXllZDogc3RvcmUuc3RhdHMubWluUGxheWVkXG4gICAgfVxufSlcbmNsYXNzIFRhYmxlIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuXHRjb25zdHJ1Y3Rvcihwcm9wcykge1xuXHRcdHN1cGVyKHByb3BzKTtcblx0fVxuXG5cdGdldFBlcmNlbnRhZ2UoYSwgYikge1xuICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gKGEgLyBiKSAqIDEwMDtcbiAgICAgICAgcmV0dXJuIGAke01hdGguZmxvb3IocGVyY2VudGFnZSl9JWA7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlQ29sdW1uKHZhcmlhYmxlKSB7XG4gICAgICAgIHRoaXMucHJvcHMuc2V0T3JkZXIodmFyaWFibGUpO1xuICAgIH1cblxuICAgIGlzQ29sdW1uQWN0aXZlKHZhcmlhYmxlKSB7XG4gICAgICAgIGlmKHZhcmlhYmxlLnN0YXROYW1lID09PSB0aGlzLnByb3BzLmdldE9yZGVyVmFyaWFibGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlckNoYW1wQ29sdW1ucygpIHtcbiAgICAgICAgbGV0IGNvbHVtbnMgPSBbXTtcbiAgICAgICAgQXJyYXkuZnJvbSh0aGlzLnByb3BzLmFjdGl2ZVZhcmlhYmxlcywgdmFyaWFibGUgPT4ge1xuICAgICAgICAgICAgY29sdW1ucy5wdXNoKDx0aCBjbGFzc05hbWU9e3RoaXMuaXNDb2x1bW5BY3RpdmUodmFyaWFibGUpID8gJ2lzLWFjdGl2ZScgOiAnJ30gb25DbGljaz17KCkgPT4gdGhpcy5zZXRBY3RpdmVDb2x1bW4odmFyaWFibGUpfT57dmFyaWFibGUuZnJpZW5kbHlOYW1lfTwvdGg+KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29sdW1ucztcbiAgICB9XG5cbiAgICByZW5kZXJDaGFtcENlbGxzKGNoYW1wKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXIgbmV3Jyk7XG4gICAgICAgIGxldCBjZWxscyA9IFtdO1xuXG4gICAgICAgIEFycmF5LmZyb20odGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMsIHZhcmlhYmxlID0+IHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gJyc7XG4gICAgICAgICAgICBpZih2YXJpYWJsZS50eXBlID09PSAncGVyY2VudCcpIHtcbiAgICAgICAgICAgICAgICBjZWxsID0gPHRkPnt0aGlzLmdldFBlcmNlbnRhZ2UoY2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdLCBjaGFtcC5wbGF5ZWQpfTwvdGQ+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih2YXJpYWJsZS50eXBlID09PSAndmFsdWUnKSB7XG4gICAgICAgICAgICAgICAgY2VsbCA9IDx0ZD57Y2hhbXBbdmFyaWFibGUuc3RhdE5hbWVdfTwvdGQ+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjZWxscy5wdXNoKGNlbGwpO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY2VsbHM7XG4gICAgfVxuXG4gICAgcmVuZGVyZmlyc3RDaGFtcHMoKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuY2hhbXBzQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBmaXJzdEFycmF5ID0gW107XG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMucHJvcHMuY2hhbXBzQXJyYXksIGNoYW1wID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnByb3BzLm1pblBsYXllZCAmJiB0aGlzLnByb3BzLm1pblBsYXllZCA+IGNoYW1wLnBsYXllZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGZpcnN0QXJyYXkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntpZFRvQ2hhbXAoY2hhbXAuaWQpfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGFtcENlbGxzKGNoYW1wKX1cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0QXJyYXk7XG4gICAgICAgIH1cblx0fVxuXG5cdHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgY2hhbXBDb2x1bW4gPSB7dHlwZSA6ICdhbHBoYWJldGljYWxseScsIGRlZmF1bHRPcmRlciA6ICdhc2MnLCBzdGF0TmFtZSA6ICdhbHBoYWJldGljYWxseSd9XG5cdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGVfX2hvbGRlclwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT17dGhpcy5pc0NvbHVtbkFjdGl2ZShjaGFtcENvbHVtbikgPyAnaXMtYWN0aXZlJyA6ICcnfSBvbkNsaWNrPXsoKSA9PiB0aGlzLnNldEFjdGl2ZUNvbHVtbihjaGFtcENvbHVtbil9PkNoYW1wPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGFtcENvbHVtbnMoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJmaXJzdENoYW1wcygpfVxuICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuXHR9XG5cdFxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5pbXBvcnQgRmlsdGVycyBmcm9tICcuL21ldGhvZHMvRmlsdGVycyc7XG5cbmltcG9ydCBQYXRjaGVzIGZyb20gJy4vUGF0Y2hlcyc7XG5pbXBvcnQgUmVnaW9ucyBmcm9tICcuL1JlZ2lvbnMnO1xuaW1wb3J0IFZhcmlhYmxlcyBmcm9tICcuL1ZhcmlhYmxlcyc7XG5pbXBvcnQgTWluUGxheWVkIGZyb20gJy4vTWluUGxheWVkJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHM6IHN0b3JlLnN0YXRzLnN0YXRzLFxuICAgICAgICBsb2FkaW5nOiBzdG9yZS5zdGF0cy5sb2FkaW5nLFxuICAgIH1cbn0pXG5jbGFzcyBUb3BOYXYgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IG5ldyBGaWx0ZXJzKHRoaXMucHJvcHMuc3RhdHMpO1xuXG4gICAgICAgIHRoaXMucmVnaW9ucyA9IHRoaXMuZmlsdGVycy5nZXRSZWdpb25zKCk7XG4gICAgICAgIHRoaXMucGF0Y2hlcyA9IHRoaXMuZmlsdGVycy5nZXRQYXRjaGVzKCk7XG4gICAgICAgIHRoaXMudmFyaWFibGVzID0gdGhpcy5maWx0ZXJzLmdldFZhcmlhYmxlcygpO1xuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9faG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX2Ryb3Bkb3duXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fdGl0bGVcIj5QYXRjaGVzPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGF0Y2hlcyBwYXRjaGVzPXt0aGlzLnBhdGNoZXN9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X19kcm9wZG93blwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b3BuYXZfX3RpdGxlXCI+UmVnaW9uczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJlZ2lvbnMgcmVnaW9ucz17dGhpcy5yZWdpb25zfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X190aXRsZVwiPlZhcmlhYmxlczwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFZhcmlhYmxlcyB2YXJpYWJsZXM9e3RoaXMudmFyaWFibGVzfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9fZHJvcGRvd25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidG9wbmF2X190aXRsZVwiPk1pbiBQbGF5ZWQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNaW5QbGF5ZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVG9wTmF2OyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdwcmVhY3QtcmVkdXgnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVWYXJpYWJsZXM6IHN0b3JlLnN0YXRzLmFjdGl2ZVZhcmlhYmxlc1xuICAgIH1cbn0pXG5jbGFzcyBWYXJpYWJsZXMgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuICAgICAgICBpZih3aW5kb3cubG9jYWxTdG9yYWdlLnZhcmlhYmxlcykge1xuICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFZhcmlhYmxlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0VmFyaWFibGVzKCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgc2V0RGVmYXVsdFZhcmlhYmxlcygpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9WQVJJQUJMRVMnLFxuICAgICAgICAgICAgdmFyaWFibGVzOiB0aGlzLnByb3BzLnZhcmlhYmxlc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgc2V0TG9jYWxWYXJpYWJsZXMoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRpbmcgbG9jYWwnKTtcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7XG4gICAgICAgICAgICB0eXBlOiAnU0VUX0FMTF9WQVJJQUJMRVMnLFxuICAgICAgICAgICAgdmFyaWFibGVzOiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UudmFyaWFibGVzKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc1ZhcmlhYmxlQWN0aXZlKHZhcmlhYmxlKSB7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlVmFyaWFibGVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tlcicsIHRoaXMucHJvcHMuYWN0aXZlVmFyaWFibGVzLnNvbWUoYWN0aXZlVmFyaWFibGUgPT4gYWN0aXZlVmFyaWFibGUuc3RhdE5hbWUgPT09IHZhcmlhYmxlLnN0YXROYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMgJiYgdGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMuc29tZShhY3RpdmVWYXJpYWJsZSA9PiBhY3RpdmVWYXJpYWJsZS5zdGF0TmFtZSA9PT0gdmFyaWFibGUuc3RhdE5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NoZWNrZWQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB0b2dnbGVWYXJpYWJsZSh2YXJpYWJsZSkge1xuICAgICAgICBsZXQgYWN0aXZlVmFyaWFibGVzID0gT2JqZWN0LmFzc2lnbihbXSwgdGhpcy5wcm9wcy5hY3RpdmVWYXJpYWJsZXMpO1xuICAgICAgICBpZih0aGlzLnByb3BzLmFjdGl2ZVZhcmlhYmxlcy5zb21lKGFjdGl2ZVZhcmlhYmxlID0+IGFjdGl2ZVZhcmlhYmxlLnN0YXROYW1lID09PSB2YXJpYWJsZS5zdGF0TmFtZSkpIHtcbiAgICAgICAgICAgIGFjdGl2ZVZhcmlhYmxlcyA9IGFjdGl2ZVZhcmlhYmxlcy5maWx0ZXIoYWN0aXZlVmFyaWFibGUgPT4gYWN0aXZlVmFyaWFibGUuc3RhdE5hbWUgIT09IHZhcmlhYmxlLnN0YXROYW1lKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlVmFyaWFibGVzLnB1c2godmFyaWFibGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogJ1NFVF9BTExfVkFSSUFCTEVTJyxcbiAgICAgICAgICAgIHZhcmlhYmxlczogYWN0aXZlVmFyaWFibGVzXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKCdhY3RpdmUgdmFycyBhcmUgJywgYWN0aXZlVmFyaWFibGVzKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS52YXJpYWJsZXMgPSBKU09OLnN0cmluZ2lmeShhY3RpdmVWYXJpYWJsZXMpO1xuICAgIH1cblxuICAgIHJlbmRlclZhcmlhYmxlcygpIHtcbiAgICAgICAgbGV0IHZhcmlhYmxlcyA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKHRoaXMucHJvcHMudmFyaWFibGVzLCB2YXJpYWJsZSA9PiB7XG4gICAgICAgICAgICB2YXJpYWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvcG5hdl9faW5wdXQtaG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBvbkNoYW5nZT17KCkgPT4geyB0aGlzLnRvZ2dsZVZhcmlhYmxlKHZhcmlhYmxlKX19IGNoZWNrZWQ9e3RoaXMuaXNWYXJpYWJsZUFjdGl2ZSh2YXJpYWJsZSl9IGlkPXtgdmFyaWFibGUtJHt2YXJpYWJsZS5mcmllbmRseU5hbWV9YH0gdHlwZT1cImNoZWNrYm94XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj17YHZhcmlhYmxlLSR7dmFyaWFibGUuZnJpZW5kbHlOYW1lfWB9Pnt2YXJpYWJsZS5mcmllbmRseU5hbWV9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YXJpYWJsZXM7XG4gICAgfVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJWYXJpYWJsZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFZhcmlhYmxlczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IFN0YXRzQmxvY2sgZnJvbSAnLi9TdGF0c0Jsb2NrJztcbmltcG9ydCBUb3BOYXYgZnJvbSAnLi9Ub3BOYXYnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0czogc3RvcmUuc3RhdHMuc3RhdHMsXG4gICAgICAgIGxvYWRpbmc6IHN0b3JlLnN0YXRzLmxvYWRpbmcsXG4gICAgfVxufSlcbmNsYXNzIENoYW1wcyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5yZWdpb25zID0gWydOQUxDUycsICdFVUxDUycsICdDQkxPTCcsICdMQ0snLCAnTE1TJywgJ1RDTCcsICdPUEwnXVxuXHRcdGlmKCF0aGlzLnByb3BzLnN0YXRzKSB7XG5cdFx0XHR0aGlzLmZldGNoU3RhdHMoKTtcblx0XHR9XG5cdH1cblxuXHRmZXRjaFN0YXRzKCkge1xuXHRcdEFycmF5LmZyb20odGhpcy5yZWdpb25zLCByZWdpb24gPT4ge1xuXHRcdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7XG5cdFx0XHRcdHR5cGU6ICdGRVRDSF9TVEFUUycsXG5cdFx0XHRcdHBheWxvYWQ6IGZldGNoKGAvYXBpLyR7cmVnaW9ufS9mdWxsLmpzb25gKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSksXG5cdFx0XHRcdG1ldGE6IHJlZ2lvblxuXHRcdFx0fSk7XG5cdFx0fSlcblx0fVxuXG5cdGhhbmRsZVJlc2V0Q2xpY2soKSB7XG5cdFx0d2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd2YXJpYWJsZXMnKTtcblx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3BhdGNoZXMnKTtcblx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZ2lvbnMnKTtcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6ICdSRVNFVF9DSEFNUFMnXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRyZXNldDogdHJ1ZVxuXHRcdH0pO1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRcdHJlc2V0OiBmYWxzZVxuXHRcdFx0fSk7XG5cdFx0fSwgMSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5yZXNldCkge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRSZXNldHRpbmdcblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRpZih0aGlzLnByb3BzLmxvYWRpbmcgfHwgIXRoaXMucHJvcHMuc3RhdHMpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXY+bG9hZGluZzwvZGl2PlxuXHRcdFx0KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWIyMFwiPlxuXHRcdFx0XHRcdFx0PGEgb25DbGljaz17dGhpcy5oYW5kbGVSZXNldENsaWNrLmJpbmQodGhpcyl9PlJlc2V0PC9hPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxUb3BOYXYgLz5cblx0XHRcdFx0XHQ8U3RhdHNCbG9jayAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDaGFtcHM7IiwiZXhwb3J0IGZ1bmN0aW9uIGlkVG9DaGFtcChpZCkge1xuICAgIGNvbnN0IGNoYW1wZGljdCA9IHsnMTQ1JyA6ICdLYWlTYScsICc1NTUnIDogJ1B5a2UnLCAnNzcnOiAnVWR5cicsICc0MjcnOiAnSXZlcm4nLCAnODUnOiAnS2VubmVuJywgJzE4JzogJ1RyaXN0YW5hJywgJzc4JzogJ1BvcHB5JywgJzknOiAnRmlkZGxlc3RpY2tzJywgJzI2Nyc6ICdOYW1pJywgJzE1JzogJ1NpdmlyJywgJzE5JzogJ1dhcndpY2snLCAnNTQnOiAnTWFscGhpdGUnLCAnMTY0JzogJ0NhbWlsbGUnLCAnMTQnOiAnU2lvbicsICc2JzogJ1VyZ290JywgJzYxJzogJ09yaWFubmEnLCAnNDUnOiAnVmVpZ2FyJywgJzQ0JzogJ1RhcmljJywgJzYwJzogJ0VsaXNlJywgJzIwJzogJ051bnUnLCAnMTA2JzogJ1ZvbGliZWFyJywgJzExMCc6ICdWYXJ1cycsICc2Mic6ICdNb25rZXlLaW5nJywgJzE2MSc6ICdWZWxrb3onLCAnNDI5JzogJ0thbGlzdGEnLCAnMjcnOiAnU2luZ2VkJywgJzQ5OCc6ICdYYXlhaCcsICc4Myc6ICdZb3JpY2snLCAnNTMnOiAnQmxpdHpjcmFuaycsICcxMzMnOiAnUXVpbm4nLCAnMjQ1JzogJ0Vra28nLCAnNzQnOiAnSGVpbWVyZGluZ2VyJywgJzU3JzogJ01hb2thaScsICcyNSc6ICdNb3JnYW5hJywgJzE2Myc6ICdUYWxpeWFoJywgJzYzJzogJ0JyYW5kJywgJzEwNyc6ICdSZW5nYXInLCAnMTAnOiAnS2F5bGUnLCAnNDEnOiAnR2FuZ3BsYW5rJywgJzIwMyc6ICdLaW5kcmVkJywgJzIyMyc6ICdUYWhtS2VuY2gnLCAnMTI3JzogJ0xpc3NhbmRyYScsICcxMyc6ICdSeXplJywgJzEwNSc6ICdGaXp6JywgJzE3JzogJ1RlZW1vJywgJzExNyc6ICdMdWx1JywgJzI1NCc6ICdWaScsICczNCc6ICdBbml2aWEnLCAnMTAyJzogJ1NoeXZhbmEnLCAnNyc6ICdMZWJsYW5jJywgJzkyJzogJ1JpdmVuJywgJzMxJzogJ0Nob2dhdGgnLCAnNDMnOiAnS2FybWEnLCAnMjIyJzogJ0ppbngnLCAnMjM2JzogJ0x1Y2lhbicsICczOSc6ICdJcmVsaWEnLCAnMTQxJzogJ0theW4nLCAnODYnOiAnR2FyZW4nLCAnMjYnOiAnWmlsZWFuJywgJzk5JzogJ0x1eCcsICc0JzogJ1R3aXN0ZWRGYXRlJywgJzU4JzogJ1JlbmVrdG9uJywgJzY4JzogJ1J1bWJsZScsICcxMzQnOiAnU3luZHJhJywgJzUxJzogJ0NhaXRseW4nLCAnMjknOiAnVHdpdGNoJywgJzQyMSc6ICdSZWtTYWknLCAnNDk3JzogJ1Jha2FuJywgJzI0MCc6ICdLbGVkJywgJzI2Nic6ICdBYXRyb3gnLCAnMTExJzogJ05hdXRpbHVzJywgJzM2JzogJ0RyTXVuZG8nLCAnMzInOiAnQW11bXUnLCAnMTEzJzogJ1NlanVhbmknLCAnMTIxJzogJ0toYXppeCcsICc1MCc6ICdTd2FpbicsICc3Mic6ICdTa2FybmVyJywgJzEyNic6ICdKYXljZScsICcxMjAnOiAnSGVjYXJpbScsICcxMDQnOiAnR3JhdmVzJywgJzQ4JzogJ1RydW5kbGUnLCAnMTQzJzogJ1p5cmEnLCAnMzMnOiAnUmFtbXVzJywgJzI2OCc6ICdBemlyJywgJzIwMSc6ICdCcmF1bScsICcyMyc6ICdUcnluZGFtZXJlJywgJzY5JzogJ0Nhc3Npb3BlaWEnLCAnMTEyJzogJ1Zpa3RvcicsICczOCc6ICdLYXNzYWRpbicsICc4OSc6ICdMZW9uYScsICcyNCc6ICdKYXgnLCAnNTE2JzogJ09ybm4nLCAnMTMxJzogJ0RpYW5hJywgJzQzMic6ICdCYXJkJywgJzc2JzogJ05pZGFsZWUnLCAnNDInOiAnQ29ya2knLCAnOTAnOiAnTWFsemFoYXInLCAnMTQyJzogJ1pvZScsICcxJzogJ0FubmllJywgJzExOSc6ICdEcmF2ZW4nLCAnNjQnOiAnTGVlU2luJywgJzgnOiAnVmxhZGltaXInLCAnMzcnOiAnU29uYScsICcxMTQnOiAnRmlvcmEnLCAnNDAnOiAnSmFubmEnLCAnNTknOiAnSmFydmFuSVYnLCAnNDIwJzogJ0lsbGFvaScsICc1JzogJ1hpblpoYW8nLCAnMzUnOiAnU2hhY28nLCAnMTAzJzogJ0FocmknLCAnNjcnOiAnVmF5bmUnLCAnODQnOiAnQWthbGknLCAnMjAyJzogJ0poaW4nLCAnMTUwJzogJ0duYXInLCAnOTEnOiAnVGFsb24nLCAnNTUnOiAnS2F0YXJpbmEnLCAnMzAnOiAnS2FydGh1cycsICcyMzgnOiAnWmVkJywgJzInOiAnT2xhZicsICcyOCc6ICdFdmVseW5uJywgJzk4JzogJ1NoZW4nLCAnMTYnOiAnU29yYWthJywgJzU2JzogJ05vY3R1cm5lJywgJzExJzogJ01hc3RlcllpJywgJzEyMic6ICdEYXJpdXMnLCAnMTU3JzogJ1lhc3VvJywgJzk2JzogJ0tvZ01hdycsICcxMic6ICdBbGlzdGFyJywgJzQxMic6ICdUaHJlc2gnLCAnODInOiAnTW9yZGVrYWlzZXInLCAnMTE1JzogJ1ppZ2dzJywgJzgxJzogJ0V6cmVhbCcsICcxMDEnOiAnWGVyYXRoJywgJzc5JzogJ0dyYWdhcycsICc3NSc6ICdOYXN1cycsICcyMSc6ICdNaXNzRm9ydHVuZScsICcxMzYnOiAnQXVyZWxpb25Tb2wnLCAnMjInOiAnQXNoZScsICc4MCc6ICdQYW50aGVvbicsICczJzogJ0dhbGlvJywgJzE1NCc6ICdaYWMnfVxuXHRyZXR1cm4gY2hhbXBkaWN0W2lkXTtcbn0iLCJjbGFzcyBGaWx0ZXJzIHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0cykge1xuICAgICAgICB0aGlzLnN0YXRzID0gc3RhdHM7XG4gICAgICAgIHRoaXMucmVnaW9ucyA9IE9iamVjdC5rZXlzKHN0YXRzKTtcbiAgICB9XG5cbiAgICBnZXRSZWdpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpb25zO1xuICAgIH1cblxuICAgIGdldFZhcmlhYmxlcygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2ZiVGVhbScsIGZyaWVuZGx5TmFtZTogJ0ZpcnN0IEJsb29kIFRlYW0nLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJywgYXZlcmFnZTogNTB9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZmJLaWxsZXInLCBmcmllbmRseU5hbWU6ICdGaXJzdCBCbG9vZCBLaWxsZXInLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJywgYXZlcmFnZTogMTB9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZmJBc3Npc3QnLCBmcmllbmRseU5hbWU6ICdGaXJzdCBCbG9vZCBBc3Npc3QnLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJywgYXZlcmFnZTogZmFsc2V9LFxuICAgICAgICAgICAge3N0YXROYW1lOiAnZmJJbnZvbHZlZCcsIGZyaWVuZGx5TmFtZTogJ0ZCIEludm9sdmVtZW50JywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYycsIGF2ZXJhZ2U6IGZhbHNlfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2ZpcnN0RGVhdGgnLCBmcmllbmRseU5hbWU6ICdGaXJzdCBEZWF0aCcsIHR5cGU6ICdwZXJjZW50JywgZGVmYXVsdE9yZGVyIDogJ2Rlc2MnLCBhdmVyYWdlOiAxMH0sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICdmdFRlYW0nLCBmcmllbmRseU5hbWU6ICdGaXJzdCBUb3dlciBUZWFtJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYycsIGF2ZXJhZ2U6IDUwfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2Z0S2lsbGVyJywgZnJpZW5kbHlOYW1lOiAnRmlyc3QgVG93ZXIgS2lsbGVyJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYycsIGF2ZXJhZ2U6IGZhbHNlfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ2ZkVGVhbScsIGZyaWVuZGx5TmFtZTogJ0ZpcnN0IERyYWdvbiBUZWFtJywgdHlwZTogJ3BlcmNlbnQnLCBkZWZhdWx0T3JkZXIgOiAnZGVzYycsIGF2ZXJhZ2U6IDUwfSxcbiAgICAgICAgICAgIHtzdGF0TmFtZTogJ3BsYXllZCcsIGZyaWVuZGx5TmFtZTogJ0dhbWVzIFBsYXllZCcsIHR5cGU6ICd2YWx1ZScsIGRlZmF1bHRPcmRlciA6ICdkZXNjJ30sXG4gICAgICAgICAgICB7c3RhdE5hbWU6ICd3aW4nLCBmcmllbmRseU5hbWU6ICdXaW4nLCB0eXBlOiAncGVyY2VudCcsIGRlZmF1bHRPcmRlciA6ICdkZXNjJywgYXZlcmFnZTogNTB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0UGF0Y2hlcygpIHtcbiAgICAgICAgaWYodGhpcy5wYXRjaGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXRjaGVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0Y2hlcyA9IFtdO1xuICAgICAgICBBcnJheS5mcm9tKHRoaXMucmVnaW9ucywgcmVnaW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lvbk1hdGNoZXMgPSB0aGlzLnN0YXRzW3JlZ2lvbl07XG4gICAgICAgICAgICBBcnJheS5mcm9tKHJlZ2lvbk1hdGNoZXMsIG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5wYXRjaGVzLmluY2x1ZGVzKG1hdGNoLnBhdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhdGNoZXMucHVzaChtYXRjaC5wYXRjaCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gdGhpcy5wYXRjaGVzO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyczsiLCJpbXBvcnQgeyBpZFRvQ2hhbXAgfSBmcm9tICcuL0NoYW1wRnVuY3MnO1xuXG5jbGFzcyBTdGF0cyB7XG4gICAgY29uc3RydWN0b3Ioc3RhdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0cyA9IHN0YXRzO1xuICAgICAgICB0aGlzLnNldERlZmF1bHRPcmRlcigpO1xuICAgIH1cblxuICAgIGlzRGVmYXVsdE9yZGVyKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMub3JkZXJCeSA9PT0gJ2FscGhhYmV0aWNhbGx5JyAmJlxuICAgICAgICAgICAgdGhpcy5vcmRlckJ5VmFyaWFibGUgPT09ICdhbHBoYWJldGljYWxseScgJiZcbiAgICAgICAgICAgIHRoaXMub3JkZXJEaXJlY3Rpb24gPT09ICdhc2MnKTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0T3JkZXIoKSB7XG4gICAgICAgIHRoaXMub3JkZXJCeSA9ICdhbHBoYWJldGljYWxseSc7XG4gICAgICAgIHRoaXMub3JkZXJCeVZhcmlhYmxlID0gJ2FscGhhYmV0aWNhbGx5JztcbiAgICAgICAgdGhpcy5vcmRlckRpcmVjdGlvbiA9ICdhc2MnO1xuICAgICAgICB0aGlzLm9yZGVyQ2hhbXBzKCk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGVzKHJlZ2lvbnMsIHBhdGNoZXMpIHtcbiAgICAgICAgdGhpcy5yZWdpb25zID0gcmVnaW9ucztcbiAgICAgICAgdGhpcy5wYXRjaGVzID0gcGF0Y2hlcztcbiAgICB9XG5cbiAgICBzZXRPcmRlcih2YXJpYWJsZSkge1xuICAgICAgICBpZih0aGlzLm9yZGVyQnkgPT09IHZhcmlhYmxlLnR5cGUgJiYgdGhpcy5vcmRlckJ5VmFyaWFibGUgPT09IHZhcmlhYmxlLnN0YXROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLm9yZGVyRGlyZWN0aW9uID0gKHRoaXMub3JkZXJEaXJlY3Rpb24gPT09ICdkZXNjJykgPyAnYXNjJyA6ICdkZXNjJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3JkZXJCeSA9IHZhcmlhYmxlLnR5cGU7XG4gICAgICAgICAgICB0aGlzLm9yZGVyQnlWYXJpYWJsZSA9IHZhcmlhYmxlLnN0YXROYW1lO1xuICAgICAgICAgICAgdGhpcy5vcmRlckRpcmVjdGlvbiA9IHZhcmlhYmxlLmRlZmF1bHRPcmRlcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9yZGVyQ2hhbXBzKCk7XG4gICAgfVxuXG4gICAgZ2V0T3JkZXJWYXJpYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3JkZXJCeVZhcmlhYmxlO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVDaGFtcHMoKTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDaGFtcHMoKSB7XG4gICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3QgPSB7fVxuICAgICAgICBBcnJheS5mcm9tKHRoaXMucmVnaW9ucywgcmVnaW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lvbk1hdGNoZXMgPSB0aGlzLnN0YXRzW3JlZ2lvbl07XG4gICAgICAgICAgICBBcnJheS5mcm9tKHJlZ2lvbk1hdGNoZXMsIG1hdGNoID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnBhdGNoZXMuaW5jbHVkZXMobWF0Y2gucGF0Y2gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RhdHMobWF0Y2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9yZGVyQ2hhbXBzKCk7XG4gICAgfVxuXG4gICAgZ2V0UGVyY2VudGFnZShhLCBiKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAoYSAvIGIpICogMTAwO1xuICAgICAgICByZXR1cm4gYCR7TWF0aC5mbG9vcihwZXJjZW50YWdlKX0lYDtcbiAgICB9XG5cbiAgICBvcmRlckNoYW1wcygpIHtcbiAgICAgICAgdGhpcy5mYkFycmF5ID0gW107XG4gICAgICAgIGZvcihjb25zdCBjaGFtcElkIGluIHRoaXMuZmlyc3RDaGFtcHNPYmplY3QpIHtcbiAgICAgICAgICAgIGxldCBjaGFtcCA9IHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF07XG4gICAgICAgICAgICBjaGFtcFsnaWQnXSA9IGNoYW1wSWQ7XG4gICAgICAgICAgICB0aGlzLmZiQXJyYXkucHVzaChjaGFtcCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mYkFycmF5LnNvcnQodGhpcy5zb3J0RnVuY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc29ydEZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgbGV0IHZhbEEgPSAnJztcbiAgICAgICAgbGV0IHZhbEIgPSAnJztcbiAgICAgICAgXG4gICAgICAgIGlmKHRoaXMub3JkZXJCeSA9PT0gJ3BlcmNlbnQnKSB7XG4gICAgICAgICAgICB2YWxBID0gYVt0aGlzLm9yZGVyQnlWYXJpYWJsZV0gLyBhLnBsYXllZDtcbiAgICAgICAgICAgIHZhbEIgPSBiW3RoaXMub3JkZXJCeVZhcmlhYmxlXSAvIGIucGxheWVkO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5vcmRlckJ5ID09PSAnYWxwaGFiZXRpY2FsbHknKSB7XG4gICAgICAgICAgICB2YWxBID0gaWRUb0NoYW1wKGEuaWQpO1xuICAgICAgICAgICAgdmFsQiA9IGlkVG9DaGFtcChiLmlkKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMub3JkZXJCeSA9PT0gJ3ZhbHVlJykge1xuICAgICAgICAgICAgdmFsQSA9IGFbdGhpcy5vcmRlckJ5VmFyaWFibGVdO1xuICAgICAgICAgICAgdmFsQiA9IGJbdGhpcy5vcmRlckJ5VmFyaWFibGVdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbEEgPCB2YWxCKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMub3JkZXJEaXJlY3Rpb24gPT09ICdhc2MnKSA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsQSA+IHZhbEIpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5vcmRlckRpcmVjdGlvbiA9PT0gJ2FzYycpID8gMSA6IC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGFkZFN0YXRzKG1hdGNoKSB7XG4gICAgICAgIGZvciAobGV0IHBsYXllckluZGV4ID0gMDsgcGxheWVySW5kZXggPCAxMDsgcGxheWVySW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgcGxheWVyID0gbWF0Y2hbJ3BsYXllcnMnXVtwbGF5ZXJJbmRleF07XG4gICAgICAgICAgICBjb25zdCBjaGFtcElkID0gcGxheWVyLmNoYW1wSWQ7XG4gICAgICAgICAgICBpZih0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdID0gdGhpcy5nZXREZWZhdWx0U3RhdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsncGxheWVkJ10rKztcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVkR290VmFyaWFibGUobWF0Y2guZmlyc3RCbG9vZCwgcGxheWVySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmJUZWFtJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllci5maXJzdEJsb29kS2lsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF1bJ2ZiS2lsbGVyJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBsYXllci5maXJzdEJsb29kQXNzaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmJBc3Npc3QnXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyLmZpcnN0Qmxvb2RBc3Npc3QgfHwgcGxheWVyLmZpcnN0Qmxvb2RLaWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmJJbnZvbHZlZCddKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihwbGF5ZXIuZmlyc3REZWF0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFtcHNPYmplY3RbY2hhbXBJZF1bJ2ZpcnN0RGVhdGgnXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZWRHb3RWYXJpYWJsZShtYXRjaC5maXJzdFRvd2VyLCBwbGF5ZXJJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWydmdFRlYW0nXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYocGxheWVyLmZpcnN0VG93ZXJLaWxsIHx8IHBsYXllci5maXJzdFRvd2VyQXNzaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZnRLaWxsZXInXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZWRHb3RWYXJpYWJsZShtYXRjaC5maXJzdERyYWdvbiwgcGxheWVySW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW1wc09iamVjdFtjaGFtcElkXVsnZmRUZWFtJ10rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVkR290VmFyaWFibGUobWF0Y2gud2luLCBwbGF5ZXJJbmRleCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbXBzT2JqZWN0W2NoYW1wSWRdWyd3aW4nXSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheWVkR290VmFyaWFibGUoZmlyc3RUZWFtLCBwbGF5ZXJJbmRleCkge1xuICAgICAgICByZXR1cm4gKGZpcnN0VGVhbSA9PT0gMCAmJiBwbGF5ZXJJbmRleCA8IDUpIHx8IChmaXJzdFRlYW0gPT09IDEgJiYgcGxheWVySW5kZXggPiA0KVxuICAgIH1cblxuICAgIGdldERlZmF1bHRTdGF0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGxheWVkOiAwLFxuICAgICAgICAgICAgZmJUZWFtOiAwLFxuICAgICAgICAgICAgZnRUZWFtOiAwLFxuICAgICAgICAgICAgZmRUZWFtOiAwLFxuICAgICAgICAgICAgZmJLaWxsZXI6IDAsXG4gICAgICAgICAgICBmYkFzc2lzdDogMCxcbiAgICAgICAgICAgIGZpcnN0RGVhdGg6IDAsXG4gICAgICAgICAgICBmdEtpbGxlcjogMCxcbiAgICAgICAgICAgIHdpbjogMCxcbiAgICAgICAgICAgIGZiSW52b2x2ZWQ6IDBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENoYW1wcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmJBcnJheTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVN0b3JlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3ByZWFjdC1yZWR1eCdcbmltcG9ydCBhcHBTdG9yZSBmcm9tICcuL3JlZHVjZXJzL3N0b3JlJ1xuXG5cbmltcG9ydCBBcHBNYWluIGZyb20gJy4vQXBwTWFpbic7XG5pbXBvcnQgTmF2QmFyIGZyb20gJy4vTmF2QmFyJztcbmltcG9ydCBNYXRjaGVzIGZyb20gJy4vTWF0Y2hlcy9pbmRleC5qcyc7XG5cblxuXG4vL2h0dHBzOi8vd2lyZWZyYW1lLmNjL3hLT3ZDRVxuY2xhc3MgTWFpbkxlYWd1ZUFwcCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnN0b3JlID0gYXBwU3RvcmVcblx0XHRpZih3aW5kb3cubG9jYWxTdG9yYWdlLmFwcFR5cGUpIHtcblx0XHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRcdGFwcFR5cGU6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuYXBwVHlwZVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdFx0YXBwVHlwZTogJ21hdGNoVXAnXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cblx0dXBkYXRlQXBwVHlwZSh0eXBlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7YXBwVHlwZSA6IHR5cGUgfSk7XG5cdFx0d2luZG93LmxvY2FsU3RvcmFnZS5hcHBUeXBlID0gdHlwZTtcblx0fVxuIFxuXHRyZW5kZXIocHJvcHMsIHN0YXRlKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxQcm92aWRlciBzdG9yZT17dGhpcy5zdG9yZX0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHRcdDxuYXYgY2xhc3M9XCJuYXZcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hdl9fbG9nb1wiPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vZGF2aWR3ZWF0aGVyYWxsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RGF2aWQgV2VhdGhlcmFsbDwvYT48L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm5hdl9fbGlua3MgIGpzLW5hdi1saW5rc1wiPlxuXHRcdFx0XHRcdFx0XHRcdDxOYXZCYXIgdXBkYXRlQXBwVHlwZT17IHRoaXMudXBkYXRlQXBwVHlwZS5iaW5kKHRoaXMpIH0gYXBwVHlwZT17dGhpcy5zdGF0ZS5hcHBUeXBlfSAvPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvbmF2PlxuXHRcdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwYWdlXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWF0Y2hlc1wiPlxuXHRcdFx0XHRcdFx0XHQ8TWF0Y2hlcy8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxtYWluIGNsYXNzPVwibWFpblwiPlxuXHRcdFx0XHRcdFx0XHQ8QXBwTWFpbiBhcHBUeXBlPXt0aGlzLnN0YXRlLmFwcFR5cGV9IC8+XG5cdFx0XHRcdFx0XHQ8L21haW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9Qcm92aWRlcj5cblx0XHQpO1xuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFpbkxlYWd1ZUFwcDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IFBsYXllcnMgZnJvbSAnLi9QbGF5ZXJzJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUmVnaW9uOiBzdG9yZS5jb25maWcuYWN0aXZlUmVnaW9uLFxuICAgICAgICByZWdpb25EYXRhOiBzdG9yZS5yZWdpb25zLnJlZ2lvbkRhdGEsXG4gICAgICAgIHRlYW0xOiBzdG9yZS5jb25maWcudGVhbTEsXG4gICAgICAgIHRlYW0yOiBzdG9yZS5jb25maWcudGVhbTIsXG4gICAgfVxufSlcbmNsYXNzIE1hdGNoQ2FyZCBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMudGVhbUNvbG91cnMgPSBbJ2JsdWUnLCAncmVkJ107XG5cdH1cblxuXHRnZXRJbmRleChnZXRFbmVteSA9IGZhbHNlKSB7XG5cdFx0aWYodGhpcy5wcm9wcy50ZWFtKSB7XG5cdFx0XHR0aGlzLmluZGV4ID0gMDtcblx0XHRcdHRoaXMuZW5lbXlJbmRleCA9IDE7XG5cdFx0XHRpZih0aGlzLnByb3BzLmdhbWUudGVhbU5hbWVzWzFdID09IHRoaXMucHJvcHMudGVhbSkge1xuXHRcdFx0XHR0aGlzLmluZGV4ID0gMTtcblx0XHRcdFx0dGhpcy5lbmVteUluZGV4ID0gMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5pbmRleCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmKGdldEVuZW15KSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbmVteUluZGV4O1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmluZGV4O1xuXG5cdH1cblxuXHRnZXRUaW1lKHVuaXgpIHtcblx0XHRjb25zdCBkYXRlID0gbmV3IERhdGUodW5peCk7XG5cdFx0cmV0dXJuIGRhdGUudG9Mb2NhbGVTdHJpbmcoW10sIHtkYXk6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgeWVhcjogJ251bWVyaWMnfSk7XG5cdH1cblxuXHR0b2dnbGVQbGF5ZXJzKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe3Nob3dQbGF5ZXJzOiAhdGhpcy5zdGF0ZS5zaG93UGxheWVyc30pO1xuXHR9XG5cblx0Z2V0QmFja2dyb3VuZCgpIHtcblx0XHRpZih0aGlzLnByb3BzLnRlYW0pIHtcblx0XHRcdHJldHVybiBgYmctY29sb3ItLSR7dGhpcy50ZWFtQ29sb3Vyc1t0aGlzLmdldEluZGV4KCldfWA7XG5cdFx0fVxuXHRcdHJldHVybiBgYmctY29sb3ItLWRlZmF1bHRgO1xuXHR9XG5cblx0Z2V0UmVzdWx0KCkge1xuXHRcdGlmKHRoaXMuZ2V0SW5kZXgoKSAhPT0gZmFsc2UpIHtcblx0XHRcdGlmKHRoaXMucHJvcHMuZ2FtZS53aW4gPT0gdGhpcy5nZXRJbmRleCgpKSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19yZXN1bHQgIG1hdGNoZXNfX3Jlc3VsdC0td2luXCI+XG5cdFx0XHRcdFx0XHRXSU5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19yZXN1bHQgIG1hdGNoZXNfX3Jlc3VsdC0tbG9zZVwiPlxuXHRcdFx0XHRcdFx0TE9TRVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlckFjaGlldmVtZW50cyh0ZWFtTnVtLCBteVRlYW0gPSBmYWxzZSkge1xuXHRcdGxldCBpc015VGVhbSA9IGZhbHNlO1xuXHRcdGlmKG15VGVhbSkge1xuXHRcdFx0aWYodGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1t0ZWFtTnVtXSA9PSBteVRlYW0pIHtcblx0XHRcdFx0aXNNeVRlYW0gPSB0cnVlOyBcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3QgY2hlY2tzID0gXHR7XG5cdFx0XHRcdFx0XHRcdCdmaXJzdEJhcm9uJyA6ICdGaXJzdCBCYXJvbicsXG5cdFx0XHRcdFx0XHRcdCdmaXJzdEJsb29kJyA6ICdGaXJzdCBCbG9vZCcsXG5cdFx0XHRcdFx0XHRcdCdmaXJzdERyYWdvbicgOiAnRmlyc3QgRHJhZ29uJyxcblx0XHRcdFx0XHRcdFx0J2ZpcnN0SW5oaWJpdG9yJyA6ICdGaXJzdCBJbmhpYml0b3InLFxuXHRcdFx0XHRcdFx0XHQnZmlyc3RUb3dlcicgOiAnRmlyc3QgVG93ZXInXG5cdFx0XHRcdFx0XHR9O1xuXHRcdGxldCBhY2hpZXZlbWVudHMgPSBbXTtcblx0XHRmb3IgKGNvbnN0IGNoZWNrIGluIGNoZWNrcykge1xuXHRcdFx0aWYodGhpcy5wcm9wcy5nYW1lW2NoZWNrXSA9PSB0ZWFtTnVtKSB7XG5cdFx0XHRcdGxldCBjbGFzc2VzID0gJyc7XG5cdFx0XHRcdGlmKG15VGVhbSkge1xuXHRcdFx0XHRcdGlmIChpc015VGVhbSkge1xuXHRcdFx0XHRcdFx0Y2xhc3NlcyA9ICd0LWNvbG91ci0tZ3JlZW4nO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzID0gJ3QtY29sb3VyLS1yZWQnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjbGFzc2VzID0gJ3QtY29sb3VyLS0nICsgdGhpcy50ZWFtQ29sb3Vyc1t0ZWFtTnVtXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRhY2hpZXZlbWVudHMucHVzaCg8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+e2NoZWNrc1tjaGVja119PC9kaXY+KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGFjaGlldmVtZW50cztcblx0fVxuXG5cdHJlbmRlck1hdGNodXAoKSB7XG5cdFx0bGV0IHRlYW0xID0gdGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1swXTtcblx0XHRsZXQgdGVhbTIgPSB0aGlzLnByb3BzLmdhbWUudGVhbU5hbWVzWzFdO1xuXHRcdFxuXHRcdGlmKHRoaXMucHJvcHMudGVhbSkge1xuXHRcdFx0aWYodGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lc1swXSAhPSB0aGlzLnByb3BzLnRlYW0pIHtcblx0XHRcdFx0dGVhbTIgPSB0aGlzLnByb3BzLmdhbWUudGVhbU5hbWVzWzBdO1xuXHRcdFx0XHR0ZWFtMSA9IHRoaXMucHJvcHMuZ2FtZS50ZWFtTmFtZXNbMV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCAgZmxleC1qdXN0aWZ5LS1iZXR3ZWVuXCI+XG5cdFx0XHRcdFx0PGltZyBjbGFzc05hbWU9XCJjYXJkX19sb2dvXCIgIHNyYz17YC9hc3NldHMvaW1nL2xvZ29zLyR7dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259LyR7dGVhbTF9LnBuZ2B9IC8+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2FyZF9fdnNcIj5cblx0XHRcdFx0XHRcdHZzXG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdDxpbWcgY2xhc3NOYW1lPVwiY2FyZF9fbG9nb1wiICBzcmM9e2AvYXNzZXRzL2ltZy9sb2dvcy8ke3RoaXMucHJvcHMuYWN0aXZlUmVnaW9ufS8ke3RlYW0yfS5wbmdgfSAvPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0e3RoaXMuZ2V0UmVzdWx0KCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cblx0cmVuZGVyU2hvd01vcmUoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZF9fc2hvd21vcmVcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVBsYXllcnMuYmluZCh0aGlzKX0+U2hvdyBNb3JlPC9kaXY+XG5cdFx0KVxuXHR9XG5cblx0cmVuZGVyUGxheWVycygpIHtcblx0XHRpZih0aGlzLnN0YXRlLnNob3dQbGF5ZXJzKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8UGxheWVycyBnYW1lPXt0aGlzLnByb3BzLmdhbWV9IGluZGV4PXt0aGlzLmdldEluZGV4KCl9IGFjdGl2ZVJlZ2lvbj17dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259Lz5cblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7c2hvd1BsYXllcnM6IGZhbHNlfSk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtgY2FyZCAgJHt0aGlzLmdldEJhY2tncm91bmQoKX1gfSBkYXRhLWNvdW50PXt0aGlzLnByb3BzLmNvdW50fT4gXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2FyZF9fZGF0ZVwiPlxuXHRcdFx0XHRcdHt0aGlzLmdldFRpbWUodGhpcy5wcm9wcy5nYW1lLnRpbWUpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5zICBmbGV4LWFsaWduLS1jZW50ZXJcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbiAgdC1zaXplLS1zbWFsbFwiPlxuXHRcdFx0XHRcdFx0e3RoaXMucmVuZGVyQWNoaWV2ZW1lbnRzKHRoaXMuZ2V0SW5kZXgoKSwgdGhpcy5wcm9wcy50ZWFtKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJNYXRjaHVwKCl9XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW4gIHQtYWxpZ24tLXJpZ2h0ICB0LXNpemUtLXNtYWxsXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5yZW5kZXJBY2hpZXZlbWVudHModGhpcy5nZXRJbmRleCh0cnVlKSwgdGhpcy5wcm9wcy50ZWFtKX1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHt0aGlzLnJlbmRlclBsYXllcnMoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyU2hvd01vcmUoKX1cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoQ2FyZDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBNYXRjaENhcmQgZnJvbSAnLi9NYXRjaENhcmQnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb246IHN0b3JlLmNvbmZpZy5hY3RpdmVSZWdpb24sXG4gICAgICAgIHJlZ2lvbkRhdGE6IHN0b3JlLnJlZ2lvbnMucmVnaW9uRGF0YSxcbiAgICAgICAgdGVhbTE6IHN0b3JlLmNvbmZpZy50ZWFtMSxcbiAgICAgICAgdGVhbTI6IHN0b3JlLmNvbmZpZy50ZWFtMixcbiAgICB9XG59KVxuY2xhc3MgTWF0Y2hFbGVtZW50cyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cmVuZGVyQ2FyZHModGVhbSwgdGVhbTIgPSBmYWxzZSkge1xuXHRcdGxldCBjYXJkcyA9IFtdO1xuXG5cdFx0aWYodGVhbTIpIHtcblx0XHRcdEFycmF5LmZyb20odGhpcy5wcm9wcy5nYW1lcywgKGdhbWUpID0+IHtcblx0XHRcdFx0aWYoZ2FtZS50ZWFtTmFtZXMuaW5jbHVkZXModGVhbSkgJiYgZ2FtZS50ZWFtTmFtZXMuaW5jbHVkZXModGVhbTIpKSB7XG5cdFx0XHRcdFx0Y2FyZHMucHVzaCg8TWF0Y2hDYXJkIGdhbWU9e2dhbWV9IHRlYW09e2ZhbHNlfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRBcnJheS5mcm9tKHRoaXMucHJvcHMuZ2FtZXMsIChnYW1lKSA9PiB7XG5cdFx0XHRcdGlmKGdhbWUudGVhbU5hbWVzLmluY2x1ZGVzKHRlYW0pKSB7XG5cdFx0XHRcdFx0Y2FyZHMucHVzaCg8TWF0Y2hDYXJkIGdhbWU9e2dhbWV9IHRlYW09e3RlYW19IHN0b3JlPXt0aGlzLnByb3BzLnN0b3JlfS8+KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiBjYXJkcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdFx0PGgyPnt0aGlzLnByb3BzLnRlYW0xfSdzIFJlY2VudCBNYXRjaGVzPC9oMj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDYXJkcyh0aGlzLnByb3BzLnRlYW0xKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cdFx0XHRcdFx0PGgyPkhlYWQgdG8gSGVhZDwvaDI+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQ2FyZHModGhpcy5wcm9wcy50ZWFtMSwgdGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0PGgyPnt0aGlzLnByb3BzLnRlYW0yfSdzIFJlY2VudCBNYXRjaGVzPC9oMj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDYXJkcyh0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYXRjaEVsZW1lbnRzOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuaW1wb3J0IFJlYWN0SGludEZhY3RvcnkgZnJvbSAncmVhY3QtaGludCdcbmNvbnN0IFJlYWN0SGludCA9IFJlYWN0SGludEZhY3Rvcnkoe2NyZWF0ZUVsZW1lbnQ6IGgsIENvbXBvbmVudH0pXG5cblxuY2xhc3MgUGxheWVycyBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGxheWVyRGF0YTogZmFsc2V9KTtcblx0fVxuXG5cdHJlbW92ZVRlYW0ocGxheWVyTmFtZSkge1xuXHRcdEFycmF5LmZyb20odGhpcy5wcm9wcy5nYW1lLnRlYW1OYW1lcywgKHRlYW1OYW1lKSA9PiB7XG5cdFx0XHRwbGF5ZXJOYW1lID0gcGxheWVyTmFtZS5yZXBsYWNlKHRlYW1OYW1lLCAnJyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHBsYXllck5hbWU7XG5cdH1cblxuXHRnZXRDaGFtcChjaGFtcElkKSB7XG5cdFx0Y29uc3QgY2hhbXBJZHMgPSB7JzE0NScgOiAnS2Fpc2EnLCAnNTU1JyA6ICdQeWtlJywgJzc3JzogJ1VkeXInLCAnNDI3JzogJ0l2ZXJuJywgJzg1JzogJ0tlbm5lbicsICcxOCc6ICdUcmlzdGFuYScsICc3OCc6ICdQb3BweScsICc5JzogJ0ZpZGRsZXN0aWNrcycsICcyNjcnOiAnTmFtaScsICcxNSc6ICdTaXZpcicsICcxOSc6ICdXYXJ3aWNrJywgJzU0JzogJ01hbHBoaXRlJywgJzE2NCc6ICdDYW1pbGxlJywgJzE0JzogJ1Npb24nLCAnNic6ICdVcmdvdCcsICc2MSc6ICdPcmlhbm5hJywgJzQ1JzogJ1ZlaWdhcicsICc0NCc6ICdUYXJpYycsICc2MCc6ICdFbGlzZScsICcyMCc6ICdOdW51JywgJzEwNic6ICdWb2xpYmVhcicsICcxMTAnOiAnVmFydXMnLCAnNjInOiAnTW9ua2V5S2luZycsICcxNjEnOiAnVmVsa296JywgJzQyOSc6ICdLYWxpc3RhJywgJzI3JzogJ1NpbmdlZCcsICc0OTgnOiAnWGF5YWgnLCAnODMnOiAnWW9yaWNrJywgJzUzJzogJ0JsaXR6Y3JhbmsnLCAnMTMzJzogJ1F1aW5uJywgJzI0NSc6ICdFa2tvJywgJzc0JzogJ0hlaW1lcmRpbmdlcicsICc1Nyc6ICdNYW9rYWknLCAnMjUnOiAnTW9yZ2FuYScsICcxNjMnOiAnVGFsaXlhaCcsICc2Myc6ICdCcmFuZCcsICcxMDcnOiAnUmVuZ2FyJywgJzEwJzogJ0theWxlJywgJzQxJzogJ0dhbmdwbGFuaycsICcyMDMnOiAnS2luZHJlZCcsICcyMjMnOiAnVGFobUtlbmNoJywgJzEyNyc6ICdMaXNzYW5kcmEnLCAnMTMnOiAnUnl6ZScsICcxMDUnOiAnRml6eicsICcxNyc6ICdUZWVtbycsICcxMTcnOiAnTHVsdScsICcyNTQnOiAnVmknLCAnMzQnOiAnQW5pdmlhJywgJzEwMic6ICdTaHl2YW5hJywgJzcnOiAnTGVibGFuYycsICc5Mic6ICdSaXZlbicsICczMSc6ICdDaG9nYXRoJywgJzQzJzogJ0thcm1hJywgJzIyMic6ICdKaW54JywgJzIzNic6ICdMdWNpYW4nLCAnMzknOiAnSXJlbGlhJywgJzE0MSc6ICdLYXluJywgJzg2JzogJ0dhcmVuJywgJzI2JzogJ1ppbGVhbicsICc5OSc6ICdMdXgnLCAnNCc6ICdUd2lzdGVkRmF0ZScsICc1OCc6ICdSZW5la3RvbicsICc2OCc6ICdSdW1ibGUnLCAnMTM0JzogJ1N5bmRyYScsICc1MSc6ICdDYWl0bHluJywgJzI5JzogJ1R3aXRjaCcsICc0MjEnOiAnUmVrU2FpJywgJzQ5Nyc6ICdSYWthbicsICcyNDAnOiAnS2xlZCcsICcyNjYnOiAnQWF0cm94JywgJzExMSc6ICdOYXV0aWx1cycsICczNic6ICdEck11bmRvJywgJzMyJzogJ0FtdW11JywgJzExMyc6ICdTZWp1YW5pJywgJzEyMSc6ICdLaGF6aXgnLCAnNTAnOiAnU3dhaW4nLCAnNzInOiAnU2thcm5lcicsICcxMjYnOiAnSmF5Y2UnLCAnMTIwJzogJ0hlY2FyaW0nLCAnMTA0JzogJ0dyYXZlcycsICc0OCc6ICdUcnVuZGxlJywgJzE0Myc6ICdaeXJhJywgJzMzJzogJ1JhbW11cycsICcyNjgnOiAnQXppcicsICcyMDEnOiAnQnJhdW0nLCAnMjMnOiAnVHJ5bmRhbWVyZScsICc2OSc6ICdDYXNzaW9wZWlhJywgJzExMic6ICdWaWt0b3InLCAnMzgnOiAnS2Fzc2FkaW4nLCAnODknOiAnTGVvbmEnLCAnMjQnOiAnSmF4JywgJzUxNic6ICdPcm5uJywgJzEzMSc6ICdEaWFuYScsICc0MzInOiAnQmFyZCcsICc3Nic6ICdOaWRhbGVlJywgJzQyJzogJ0NvcmtpJywgJzkwJzogJ01hbHphaGFyJywgJzE0Mic6ICdab2UnLCAnMSc6ICdBbm5pZScsICcxMTknOiAnRHJhdmVuJywgJzY0JzogJ0xlZVNpbicsICc4JzogJ1ZsYWRpbWlyJywgJzM3JzogJ1NvbmEnLCAnMTE0JzogJ0Zpb3JhJywgJzQwJzogJ0phbm5hJywgJzU5JzogJ0phcnZhbklWJywgJzQyMCc6ICdJbGxhb2knLCAnNSc6ICdYaW5aaGFvJywgJzM1JzogJ1NoYWNvJywgJzEwMyc6ICdBaHJpJywgJzY3JzogJ1ZheW5lJywgJzg0JzogJ0FrYWxpJywgJzIwMic6ICdKaGluJywgJzE1MCc6ICdHbmFyJywgJzkxJzogJ1RhbG9uJywgJzU1JzogJ0thdGFyaW5hJywgJzMwJzogJ0thcnRodXMnLCAnMjM4JzogJ1plZCcsICcyJzogJ09sYWYnLCAnMjgnOiAnRXZlbHlubicsICc5OCc6ICdTaGVuJywgJzE2JzogJ1NvcmFrYScsICc1Nic6ICdOb2N0dXJuZScsICcxMSc6ICdNYXN0ZXJZaScsICcxMjInOiAnRGFyaXVzJywgJzE1Nyc6ICdZYXN1bycsICc5Nic6ICdLb2dNYXcnLCAnMTInOiAnQWxpc3RhcicsICc0MTInOiAnVGhyZXNoJywgJzgyJzogJ01vcmRla2Fpc2VyJywgJzExNSc6ICdaaWdncycsICc4MSc6ICdFenJlYWwnLCAnMTAxJzogJ1hlcmF0aCcsICc3OSc6ICdHcmFnYXMnLCAnNzUnOiAnTmFzdXMnLCAnMjEnOiAnTWlzc0ZvcnR1bmUnLCAnMTM2JzogJ0F1cmVsaW9uU29sJywgJzIyJzogJ0FzaGUnLCAnODAnOiAnUGFudGhlb24nLCAnMyc6ICdHYWxpbycsICcxNTQnOiAnWmFjJ31cblx0XHRyZXR1cm4gY2hhbXBJZHNbY2hhbXBJZF07XG5cdH1cblxuXHRnZXRQbGF5ZXJEYXRhKCkge1xuXHRcdGZldGNoKGAvYXBpLyR7dGhpcy5wcm9wcy5hY3RpdmVSZWdpb259L2dhbWVzLyR7dGhpcy5wcm9wcy5nYW1lLmdhbWVJZH0vcGxheWVycy5qc29uYClcblx0XHQudGhlbihcblx0XHRcdHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKVxuXHRcdCkudGhlbihkYXRhID0+IHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3BsYXllckRhdGE6IGRhdGF9KTtcblx0XHR9KTtcdFx0XG5cdH1cblxuXHRnZXRGQihwbGF5ZXJEYXRhKSB7XG5cdFx0bGV0IGZpcnN0Qmxvb2QgPSAnJztcblx0XHRpZihwbGF5ZXJEYXRhLmZpcnN0Qmxvb2RLaWxsKSB7XG5cdFx0XHRmaXJzdEJsb29kID0gPGltZyBkYXRhLXJoPVwiRmlyc3QgS2lsbFwiIHNyYz1cIi9hc3NldHMvc3ZnL3N3b3JkLnN2Z1wiLz47XG5cdFx0fSBlbHNlIGlmKHBsYXllckRhdGEuZmlyc3RCbG9vZEFzc2lzdCkge1xuXHRcdFx0Zmlyc3RCbG9vZCA9IDxpbWcgZGF0YS1yaD1cIkZpcnN0IEtpbGwgQXNzaXN0XCIgc3JjPVwiL2Fzc2V0cy9zdmcvaGVscC5zdmdcIi8+OyBcblx0XHR9IGVsc2UgaWYocGxheWVyRGF0YS5maXJzdERlYXRoKSB7XG5cdFx0XHRmaXJzdEJsb29kID0gPGltZyBkYXRhLXJoPVwiRmlyc3QgRGVhdGhcIiBzcmM9XCIvYXNzZXRzL3N2Zy9za3VsbC5zdmdcIi8+O1xuXHRcdH1cblx0XHRyZXR1cm4gZmlyc3RCbG9vZDtcblx0fVxuXG5cdHJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSB7XG5cdFx0bGV0IHBsYXllck5hbWUgPSBwbGF5ZXJEYXRhLm5hbWVcblx0XHRwbGF5ZXJOYW1lID0gdGhpcy5yZW1vdmVUZWFtKHBsYXllck5hbWUpXG5cdFx0Y29uc3QgZmlyc3RCbG9vZCA9IHRoaXMuZ2V0RkIocGxheWVyRGF0YSk7XG5cdFx0Y29uc3QgS0RBID0gYCR7cGxheWVyRGF0YS5raWxsc30vJHtwbGF5ZXJEYXRhLmRlYXRoc30vJHtwbGF5ZXJEYXRhLmtpbGxzfWA7XG5cdFx0Y29uc3QgY2hhbXBOYW5lID0gdGhpcy5nZXRDaGFtcChwbGF5ZXJEYXRhLmNoYW1wSWQpO1xuXHRcdGNvbnN0IGNoYW1wSW1hZ2UgPSBgaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vOC4xNC4xL2ltZy9jaGFtcGlvbi8ke2NoYW1wTmFuZX0ucG5nYFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8dHIgY2xhc3M9XCJjYXJkX19wbGF5ZXJcIj5cblx0XHRcdFx0PHRkPntwbGF5ZXJOYW1lfTwvdGQ+XG5cdFx0XHRcdDx0ZCBjbGFzcz1cImNhcmRfX2NoYW1wXCI+PGltZyBzcmM9e2NoYW1wSW1hZ2V9Lz48L3RkPlxuXHRcdFx0XHQ8dGQ+e0tEQX08L3RkPlxuXHRcdFx0XHQ8dGQgY2xhc3M9XCJjYXJkX19zdmdcIj5cblx0XHRcdFx0XHQ8UmVhY3RIaW50IGF1dG9Qb3NpdGlvbiBldmVudHMgZGVsYXk9ezEwMH0gLz5cblx0XHRcdFx0XHQ8UmVhY3RIaW50IHBlcnNpc3Rcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZT1cImRhdGEtY3VzdG9tXCJcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT1cImN1c3RvbS1oaW50XCJcblx0XHRcdFx0XHRcdGV2ZW50cz17e2hvdmVyOiB0cnVlfX1cblx0XHRcdFx0XHRcdHJlZj17KHJlZikgPT4gdGhpcy5pbnN0YW5jZSA9IHJlZn0gLz5cblx0XHRcdFx0XHR7Zmlyc3RCbG9vZH1cblx0XHRcdFx0PC90ZD5cblx0XHRcdDwvdHI+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclBsYXllcnMoKSB7XG5cdFx0aWYodGhpcy5zdGF0ZS5wbGF5ZXJEYXRhKSB7XG5cdFx0XHRsZXQgdGVhbTFQbGF5ZXJzID0gW107XG5cdFx0XHRsZXQgdGVhbTJQbGF5ZXJzID0gW107XG5cdFx0XHRsZXQgcGxheWVyQ291bnQgPSAwO1xuXHRcdFx0d2hpbGUocGxheWVyQ291bnQgPCA1KSB7XG5cdFx0XHRcdGNvbnN0IHBsYXllckRhdGEgPSB0aGlzLnN0YXRlLnBsYXllckRhdGFbcGxheWVyQ291bnRdO1xuXHRcdFx0XHR0ZWFtMVBsYXllcnMucHVzaCh0aGlzLnJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSk7XG5cdFx0XHRcdHBsYXllckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZShwbGF5ZXJDb3VudCA8IDEwKSB7XG5cdFx0XHRcdGNvbnN0IHBsYXllckRhdGEgPSB0aGlzLnN0YXRlLnBsYXllckRhdGFbcGxheWVyQ291bnRdO1xuXHRcdFx0XHR0ZWFtMlBsYXllcnMucHVzaCh0aGlzLnJlbmRlclBsYXllcihwbGF5ZXJEYXRhKSk7XG5cdFx0XHRcdHBsYXllckNvdW50Kys7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2FyZF9fcGxheWVyc1wiPlxuXHRcdFx0XHRcdDx0YWJsZSBjbGFzcz1cImNhcmRfX3RlYW1cIj5cblx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmluZGV4ID09IDAgPyB0ZWFtMVBsYXllcnMgOiB0ZWFtMlBsYXllcnN9XG5cdFx0XHRcdFx0PC90YWJsZT5cblx0XHRcdFx0XHQ8dGFibGUgY2xhc3M9XCJjYXJkX190ZWFtXCI+XG5cdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5pbmRleCA9PSAwID8gdGVhbTJQbGF5ZXJzIDogdGVhbTFQbGF5ZXJzfVxuXHRcdFx0XHRcdDwvdGFibGU+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICdnZXR0aW5nIHBsYXllcnMuLi4nO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX3BsYXllcnNcIj57dGhpcy5yZW5kZXJQbGF5ZXJzKCl9PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50KCkge1xuXHRcdHRoaXMuZ2V0UGxheWVyRGF0YSgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcnM7IiwiLy8gQ3JlZGl0OiBodHRwczovL2NvZGVwZW4uaW8vc21sc3Zuc3NuL3Blbi9Gb2xhQVxuXG5pbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5cblxuY2xhc3MgU3RhdENpcmNsZSBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjaXJjbGVUZXh0OiB0aGlzLnByb3BzLmZiVGV4dFxuXHRcdH0pXG5cdH1cblxuXHRjcmVhdGVTdmdBcmMoc3RhcnRQZXJjLCBleHRyYVBlcmMpIHtcblxuXHRcdGlmKCFOdW1iZXIuaXNJbnRlZ2VyKHN0YXJ0UGVyYykpIHtcblx0XHRcdHN0YXJ0UGVyYyA9IDA7XG5cdFx0fVxuXHRcdGlmKCFOdW1iZXIuaXNJbnRlZ2VyKGV4dHJhUGVyYykpIHtcblx0XHRcdGV4dHJhUGVyYyA9IDA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgeCA9IDA7XG5cdFx0Y29uc3QgeSA9IDA7XG5cdFx0Y29uc3QgciA9IDMwMDtcblxuXHRcdGxldCBzdGFydEFuZ2xlID0gKChzdGFydFBlcmMgLyAxMDApICogTWF0aC5QSSlcblxuXHRcdGxldCBlbmRBbmdsZSA9ICgoKGV4dHJhUGVyYyArIHN0YXJ0UGVyYykgLyAxMDApICogTWF0aC5QSSlcblx0XHRcblxuXHRcdGlmIChzdGFydEFuZ2xlID4gZW5kQW5nbGUpIHtcblx0XHRcdHZhciBzID0gc3RhcnRBbmdsZTtcblx0XHRcdHN0YXJ0QW5nbGUgPSBlbmRBbmdsZTtcblx0XHRcdGVuZEFuZ2xlID0gcztcblx0XHR9XG5cdFx0aWYgKGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA+IE1hdGguUEkgKiAyKSB7XG5cdFx0XHRlbmRBbmdsZSA9IE1hdGguUEkgKiAxLjk5OTk5O1xuXHRcdH1cblxuXHRcdHZhciBsYXJnZUFyYyA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA8PSBNYXRoLlBJID8gMCA6IDE7XG5cdFx0Y29uc29sZS5sb2coJ251bXM6ICcpO1xuXHRcdGNvbnNvbGUubG9nKHN0YXJ0UGVyYyk7XG5cdFx0Y29uc29sZS5sb2coZXh0cmFQZXJjKTtcblx0XHRjb25zb2xlLmxvZyhlbmRBbmdsZSk7XG5cdFx0Y29uc29sZS5sb2coc3RhcnRBbmdsZSk7XG5cdFx0cmV0dXJuIFtcblx0XHRcdFwiTVwiLFxuXHRcdFx0eCxcblx0XHRcdHksXG5cdFx0XHRcIkxcIixcblx0XHRcdHggKyBNYXRoLmNvcyhzdGFydEFuZ2xlKSAqIHIsXG5cdFx0XHR5IC0gTWF0aC5zaW4oc3RhcnRBbmdsZSkgKiByLFxuXHRcdFx0XCJBXCIsXG5cdFx0XHRyLFxuXHRcdFx0cixcblx0XHRcdDAsXG5cdFx0XHRsYXJnZUFyYyxcblx0XHRcdDAsXG5cdFx0XHR4ICsgTWF0aC5jb3MoZW5kQW5nbGUpICogcixcblx0XHRcdHkgLSBNYXRoLnNpbihlbmRBbmdsZSkgKiByLFxuXHRcdFx0XCJMXCIsXG5cdFx0XHR4LFxuXHRcdFx0eVxuXHRcdF0uam9pbihcIiBcIik7XG5cdH1cblxuXHR1cGRhdGVDaXJjbGUocGVyYykge1xuXHRcdGNvbnN0IHRleHQgPSBgJHtwZXJjLnRvU3RyaW5nKCl9JWA7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjaXJjbGVUZXh0OiB0ZXh0XG5cdFx0fSlcblx0fVxuXG5cdHJlc2V0Q2lyY2xlKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y2lyY2xlVGV4dDogdGhpcy5wcm9wcy5mYlRleHRcblx0XHR9KVxuXHR9XG5cblx0cmVuZGVyKCkge1xuXHRcdFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNpcmNsZVwiPlxuXHRcdFx0XHQ8c3ZnIGlkPVwidGhlTWFwXCIgd2lkdGg9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA2MDAgNjAwXCIgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaWRZTWlkIG1lZXRcIj5cblx0XHRcdFx0XHQ8Y2lyY2xlIGN4PVwiMzAwXCIgY3k9XCIzMDBcIiByPVwiMzAwXCIgZmlsbD1cInJnYmEoMjU1LCAyNTUsIDI1NSwgMClcIi8+XG5cdFx0XHRcdFx0PGcgaWQ9XCJhcmNzXCIgdHJhbnNmb3JtPVwiIHRyYW5zbGF0ZSgzMDAgMzAwKSByb3RhdGUoLTkwKSBzY2FsZSgxIC0xKVwiPlxuXHRcdFx0XHRcdFx0PHBhdGggb25Nb3VzZUVudGVyPXsoKSA9PiB7IHRoaXMudXBkYXRlQ2lyY2xlKHRoaXMucHJvcHMucmVkKSB9fSBvbk1vdXNlTGVhdmU9e3RoaXMucmVzZXRDaXJjbGUuYmluZCh0aGlzKX0gZD17dGhpcy5jcmVhdGVTdmdBcmMoMCwgdGhpcy5wcm9wcy5yZWQpfSBmaWxsPVwiI2ZmMDAwMFwiIG9wYWNpdHk9XCIwLjVcIj48L3BhdGg+XG5cdFx0XHRcdFx0XHQ8cGF0aCBvbk1vdXNlRW50ZXI9eygpID0+IHsgdGhpcy51cGRhdGVDaXJjbGUodGhpcy5wcm9wcy5ibHVlKSB9fSBvbk1vdXNlTGVhdmU9e3RoaXMucmVzZXRDaXJjbGUuYmluZCh0aGlzKX0gZD17dGhpcy5jcmVhdGVTdmdBcmModGhpcy5wcm9wcy5yZWQsIHRoaXMucHJvcHMuYmx1ZSl9IGZpbGw9XCIjMDAyM2ZmXCIgb3BhY2l0eT1cIjAuNVwiPjwvcGF0aD5cblx0XHRcdFx0XHQ8L2c+XG5cdFx0XHRcdFx0PGNpcmNsZSBjeD1cIjMwMFwiIGN5PVwiMzAwXCIgcj1cIjEwMFwiIGZpbGw9XCIjZmZmXCIvPlxuXHRcdFx0XHRcdDx0ZXh0IHg9XCI1MCVcIiB5PVwiNTAlXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBzdHJva2U9XCIjMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMnB4XCIgZHk9XCIuM2VtXCIgc3R5bGU9XCJmb250LXNpemU6IDU1cHg7XCI+e3RoaXMuc3RhdGUuY2lyY2xlVGV4dH08L3RleHQ+XG5cdFx0XHRcdDwvc3ZnPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcblx0XHRpZihuZXdQcm9wcy5mYlRleHQgIT09IHRoaXMucHJvcHMuZmJUZXh0KSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0Y2lyY2xlVGV4dDogbmV3UHJvcHMuZmJUZXh0XG5cdFx0XHR9KVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0Q2lyY2xlOyAiLCJjbGFzcyBTdGF0c0NsYXNzIHtcblx0Y29uc3RydWN0b3Ioc3RhdHMpIHtcblx0XHR0aGlzLnN0YXRzID0gc3RhdHM7XG5cdH1cblxuXHRGQih0ZWFtKSB7XG5cdFx0Y29uc3QgZmIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmZpcnN0Qmxvb2RzIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gZmJcblx0fVxuXG5cdGJsdWVGQih0ZWFtKSB7XG5cdFx0Y29uc3QgZmIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdEJsb29kcyAvIHRoaXMuc3RhdHNbdGVhbV0uYmx1ZU1hdGNoZXNQbGF5ZWQpKVxuXHRcdHJldHVybiBmYlxuXHRcdFxuXHR9XG5cblx0cmVkRkIodGVhbSkge1xuXHRcdGNvbnN0IGZiID0gTWF0aC5yb3VuZCgxMDAgKiAodGhpcy5zdGF0c1t0ZWFtXS5yZWRGaXJzdEJsb29kcyAvIHRoaXMuc3RhdHNbdGVhbV0ucmVkTWF0Y2hlc1BsYXllZCkpXG5cdFx0cmV0dXJuIGZiXG5cdH1cblxuXHRUb3dlcih0ZWFtKSB7XG5cdFx0Y29uc3QgVG93ZXIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmZpcnN0VG93ZXJzIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gVG93ZXJcblx0fVxuXG5cdGJsdWVUb3dlcih0ZWFtKSB7XG5cdFx0Y29uc3QgVG93ZXIgPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdFRvd2VycyAvIHRoaXMuc3RhdHNbdGVhbV0uYmx1ZU1hdGNoZXNQbGF5ZWQpKVxuXHRcdHJldHVybiBUb3dlclxuXHR9XG5cblx0cmVkVG93ZXIodGVhbSkge1xuXHRcdGNvbnN0IFRvd2VyID0gTWF0aC5yb3VuZCgxMDAgKiAodGhpcy5zdGF0c1t0ZWFtXS5yZWRGaXJzdFRvd2VycyAvIHRoaXMuc3RhdHNbdGVhbV0ucmVkTWF0Y2hlc1BsYXllZCkpXG5cdFx0cmV0dXJuIFRvd2VyXG5cdH1cblxuXHREcmFnb24odGVhbSkge1xuXHRcdGNvbnN0IERyYWdvbiA9IE1hdGgucm91bmQoMTAwICogKHRoaXMuc3RhdHNbdGVhbV0uZmlyc3REcmFnb25zIC8gdGhpcy5zdGF0c1t0ZWFtXS5tYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cblxuXHRibHVlRHJhZ29uKHRlYW0pIHtcblx0XHRjb25zdCBEcmFnb24gPSBNYXRoLnJvdW5kKDEwMCAqICh0aGlzLnN0YXRzW3RlYW1dLmJsdWVGaXJzdERyYWdvbnMgLyB0aGlzLnN0YXRzW3RlYW1dLmJsdWVNYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cblxuXHRyZWREcmFnb24odGVhbSkge1xuXHRcdGNvbnN0IERyYWdvbiA9IE1hdGgucm91bmQoMTAwICogKHRoaXMuc3RhdHNbdGVhbV0ucmVkRmlyc3REcmFnb25zIC8gdGhpcy5zdGF0c1t0ZWFtXS5yZWRNYXRjaGVzUGxheWVkKSlcblx0XHRyZXR1cm4gRHJhZ29uXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RhdHNDbGFzczsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBTdGF0c0NsYXNzIGZyb20gJy4vU3RhdHNDbGFzcyc7XG5pbXBvcnQgU3RhdENpcmNsZSBmcm9tICcuL1N0YXRDaXJjbGUnO1xuXG5AY29ubmVjdCgoc3RvcmUpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhY3RpdmVSZWdpb246IHN0b3JlLmNvbmZpZy5hY3RpdmVSZWdpb24sXG4gICAgICAgIHJlZ2lvblN0YXRzOiBzdG9yZS5yZWdpb25zLnJlZ2lvblN0YXRzLFxuICAgICAgICB0ZWFtMTogc3RvcmUuY29uZmlnLnRlYW0xLFxuICAgICAgICB0ZWFtMjogc3RvcmUuY29uZmlnLnRlYW0yLFxuICAgIH1cbn0pXG5cbmNsYXNzIFRlYW1TdGF0cyBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRzID0gbmV3IFN0YXRzQ2xhc3ModGhpcy5wcm9wcy5yZWdpb25TdGF0cyk7XG5cdH1cblxuXHRnZXRQbGF5ZXJGQlN0YXRzKHRlYW1OYW1lKSB7XG5cdFx0Y29uc3QgdGVhbSA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGVhbU5hbWVdO1xuXHRcdGxldCBwbGF5ZXJzID0gW107XG5cdFx0Zm9yIChjb25zdCBwbGF5ZXIgaW4gdGVhbS5wbGF5ZXJzTWF0Y2hlc1BsYXllZCkge1xuXHRcdFx0Y29uc3QgbWF0Y2hlc1BsYXllZCA9IHRlYW0ucGxheWVyc01hdGNoZXNQbGF5ZWRbcGxheWVyXTtcblx0XHRcdGNvbnN0IGZpcnN0Qmxvb2QgPSAxMDAgKiAoKHRlYW0uZmlyc3RCbG9vZFBsYXllcnNbcGxheWVyXSArIHRlYW0uZmlyc3RCbG9vZEFzc2lzdFBsYXllcnNbcGxheWVyXSkgLyBtYXRjaGVzUGxheWVkKTtcblx0XHRcdGNvbnN0IGZpcnN0Qmxvb2RTdHJpbmcgPSBwYXJzZUludChmaXJzdEJsb29kKTtcblx0XHRcdFxuXHRcdFx0Y29uc3QgZmlyc3REZWF0aCA9IDEwMCAqICh0ZWFtLmZpcnN0RGVhdGhQbGF5ZXJzW3BsYXllcl0gLyBtYXRjaGVzUGxheWVkKTtcblx0XHRcdGNvbnN0IGZpcnN0RGVhdGhTdHJpbmcgPSBwYXJzZUludChmaXJzdERlYXRoKTtcblxuXHRcdFx0cGxheWVycy5wdXNoKFxuXHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0PHRkPntwbGF5ZXIucmVwbGFjZSh0ZWFtTmFtZSwgJycpfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPntmaXJzdEJsb29kU3RyaW5nfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPntmaXJzdERlYXRoU3RyaW5nfTwvdGQ+XG5cdFx0XHRcdFx0PHRkPnttYXRjaGVzUGxheWVkfTwvdGQ+XG5cdFx0XHRcdDwvdHI+XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8dGFibGUgY2xhc3M9XCJtYXRjaGVzX190YWJsZVwiPlxuXHRcdFx0XHQ8dHI+XG5cdFx0XHRcdFx0PHRoPjwvdGg+XG5cdFx0XHRcdFx0PHRoPkZCJTwvdGg+XG5cdFx0XHRcdFx0PHRoPkZEJTwvdGg+XG5cdFx0XHRcdFx0PHRoPlNTPC90aD5cblx0XHRcdFx0PC90cj5cblx0XHRcdFx0e3BsYXllcnN9XG5cdFx0XHQ8L3RhYmxlPlxuXG5cdFx0KTtcblx0fVxuXG5cdGdldERyYWdvblN0YXRzKCkge1xuXHRcdGNvbnN0IHRlYW0xU3RhdHMgPSB0aGlzLnByb3BzLnJlZ2lvblN0YXRzW3RoaXMucHJvcHMudGVhbTFdXG5cdFx0Y29uc3QgdGVhbTJTdGF0cyA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGhpcy5wcm9wcy50ZWFtMl1cblxuXHRcdHJldHVybiAnJztcblxuXHR9XG5cblx0Z2V0UG9zaXRpb25Ub3dlclN0YXRzKHRlYW1OYW1lKSB7XG5cdFx0Y29uc3QgdGVhbSA9IHRoaXMucHJvcHMucmVnaW9uU3RhdHNbdGVhbU5hbWVdO1xuXHRcdGxldCBwb3NpdGlvbnMgPSBbXTtcblxuXHRcdHBvc2l0aW9ucyA9IHRoaXMuZ2V0UG9zaXRpb25Ub3dlclN0YXQocG9zaXRpb25zLCB0ZWFtLCAnZmlyc3RUb3dlclBvc2l0aW9uJywgJ2ZpcnN0RW5lbXlUb3dlclBvc2l0aW9uJywgJ21hdGNoZXNQbGF5ZWQnLCAnJylcblx0XHRwb3NpdGlvbnMgPSB0aGlzLmdldFBvc2l0aW9uVG93ZXJTdGF0KHBvc2l0aW9ucywgdGVhbSwgJ2ZpcnN0Qmx1ZVRvd2VyUG9zaXRpb24nLCAnZmlyc3RCbHVlRW5lbXlUb3dlclBvc2l0aW9uJywgJ2JsdWVNYXRjaGVzUGxheWVkJywgJ2NvbG91cl9fbGlnaHQtYmx1ZScpXG5cdFx0cG9zaXRpb25zID0gdGhpcy5nZXRQb3NpdGlvblRvd2VyU3RhdChwb3NpdGlvbnMsIHRlYW0sICdmaXJzdFJlZFRvd2VyUG9zaXRpb24nLCAnZmlyc3RSZWRFbmVteVRvd2VyUG9zaXRpb24nLCAncmVkTWF0Y2hlc1BsYXllZCcsICdjb2xvdXJfX3JlZCcpXG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PHRhYmxlIGNsYXNzPVwibWF0Y2hlc19fdGFibGVcIj5cblx0XHRcdFx0PHRyPlxuXHRcdFx0XHRcdDx0aD48L3RoPlxuXHRcdFx0XHRcdDx0aD5HRVQlPC90aD5cblx0XHRcdFx0XHQ8dGg+TE9TRSU8L3RoPlxuXHRcdFx0XHQ8L3RyPlxuXHRcdFx0XHR7cG9zaXRpb25zfVxuXHRcdFx0PC90YWJsZT5cblxuXHRcdCk7XG5cdH1cblxuXHRnZXRQb3NpdGlvblRvd2VyU3RhdChwb3NpdGlvbnMsIHRlYW0sIHZhcjEsIHZhcjIsIHZhcjMsIGNsYXNzU3R5bGUpIHtcblx0XHRmb3IgKGNvbnN0IHBvc2l0aW9uIGluIHRlYW0uZmlyc3RUb3dlclBvc2l0aW9uKSB7XG5cblx0XHRcdGNvbnN0IG1hdGNoZXNQbGF5ZWQgPSB0ZWFtW3ZhcjNdO1xuXG5cdFx0XHRjb25zdCBmaXJzdFRvd2VyUGVyY2VudGFnZSA9IHBhcnNlSW50KCh0ZWFtW3ZhcjFdW3Bvc2l0aW9uXSAvIG1hdGNoZXNQbGF5ZWQpICogMTAwKVxuXHRcdFx0Y29uc3QgZmlyc3RFbmVteVRvd2VyUGVyY2VudGFnZSA9IHBhcnNlSW50KCh0ZWFtW3ZhcjJdW3Bvc2l0aW9uXSAvIG1hdGNoZXNQbGF5ZWQpICogMTAwKVxuXG5cdFx0XHRwb3NpdGlvbnMucHVzaChcblx0XHRcdFx0PHRyIGNsYXNzTmFtZT17Y2xhc3NTdHlsZX0+XG5cdFx0XHRcdFx0PHRkPntwb3NpdGlvbi5yZXBsYWNlKCdfTEFORScsICcnKX08L3RkPlxuXHRcdFx0XHRcdDx0ZD57YCR7Zmlyc3RUb3dlclBlcmNlbnRhZ2V9JWB9PC90ZD5cblx0XHRcdFx0XHQ8dGQ+e2Ake2ZpcnN0RW5lbXlUb3dlclBlcmNlbnRhZ2V9JWB9PC90ZD5cblx0XHRcdFx0PC90cj5cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHBvc2l0aW9ucztcblx0fVxuXG5cdHJlbmRlckNpcmNsZVN0YXRzKCkge1xuXHRcdGlmKCF0aGlzLnByb3BzLnRlYW0xIHx8ICF0aGlzLnByb3BzLnRlYW0yKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxoMj5GaXJzdCBCbG9vZDo8L2gyPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbiAgbWF0Y2hlc19fY29sdW1uLS1oYWxmICBuby1icmVha1wiPlxuXG5cdFx0XHRcdFx0XHRcdDxoMz57dGhpcy5wcm9wcy50ZWFtMX08L2gzPlxuXG5cdFx0XHRcdFx0XHRcdDxTdGF0Q2lyY2xlXG5cdFx0XHRcdFx0XHRcdFx0Ymx1ZT17dGhpcy5zdGF0cy5ibHVlRkIodGhpcy5wcm9wcy50ZWFtMSl9XG5cdFx0XHRcdFx0XHRcdFx0cmVkPXt0aGlzLnN0YXRzLnJlZEZCKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdGZiVGV4dD17YCR7dGhpcy5zdGF0cy5GQih0aGlzLnByb3BzLnRlYW0xKX0lYH1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblx0XHRcdFx0XHRcdFx0PGgzPnt0aGlzLnByb3BzLnRlYW0yfTwvaDM+XG5cblx0XHRcdFx0XHRcdFx0PFN0YXRDaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRibHVlPXt0aGlzLnN0YXRzLmJsdWVGQih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkRkIodGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLkZCKHRoaXMucHJvcHMudGVhbTIpfSVgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0PGgyPkZpcnN0IERyYWdvbjo8L2gyPlxuXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX2NvbHVtbiAgbWF0Y2hlc19fY29sdW1uLS1oYWxmICBuby1icmVha1wiPlxuXG5cdFx0XHRcdFx0XHRcdDxoMz57dGhpcy5wcm9wcy50ZWFtMX08L2gzPlxuXG5cdFx0XHRcdFx0XHRcdDxTdGF0Q2lyY2xlXG5cdFx0XHRcdFx0XHRcdFx0Ymx1ZT17dGhpcy5zdGF0cy5ibHVlRHJhZ29uKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdHJlZD17dGhpcy5zdGF0cy5yZWREcmFnb24odGhpcy5wcm9wcy50ZWFtMSl9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLkRyYWdvbih0aGlzLnByb3BzLnRlYW0xKX0lYH1cblx0XHRcdFx0XHRcdFx0Lz5cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblxuXHRcdFx0XHRcdFx0XHQ8aDM+e3RoaXMucHJvcHMudGVhbTJ9PC9oMz5cblxuXHRcdFx0XHRcdFx0XHQ8U3RhdENpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdGJsdWU9e3RoaXMuc3RhdHMuYmx1ZURyYWdvbih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkRHJhZ29uKHRoaXMucHJvcHMudGVhbTIpfVxuXHRcdFx0XHRcdFx0XHRcdGZiVGV4dD17YCR7dGhpcy5zdGF0cy5EcmFnb24odGhpcy5wcm9wcy50ZWFtMil9JWB9XG5cdFx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWF0Y2hlc19fY29sdW1uXCI+XG5cblx0XHRcdFx0XHQ8aDI+Rmlyc3QgVG93ZXI6PC9oMj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgbm8tYnJlYWtcIj5cblxuXHRcdFx0XHRcdFx0XHQ8aDM+e3RoaXMucHJvcHMudGVhbTF9PC9oMz5cblxuXHRcdFx0XHRcdFx0XHQ8U3RhdENpcmNsZVxuXHRcdFx0XHRcdFx0XHRcdGJsdWU9e3RoaXMuc3RhdHMuYmx1ZVRvd2VyKHRoaXMucHJvcHMudGVhbTEpfVxuXHRcdFx0XHRcdFx0XHRcdHJlZD17dGhpcy5zdGF0cy5yZWRUb3dlcih0aGlzLnByb3BzLnRlYW0xKX1cblx0XHRcdFx0XHRcdFx0XHRmYlRleHQ9e2Ake3RoaXMuc3RhdHMuVG93ZXIodGhpcy5wcm9wcy50ZWFtMSl9JWB9XG5cdFx0XHRcdFx0XHRcdC8+XG5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibWF0Y2hlc19fY29sdW1uICBtYXRjaGVzX19jb2x1bW4tLWhhbGYgIG5vLWJyZWFrXCI+XG5cblx0XHRcdFx0XHRcdFx0PGgzPnt0aGlzLnByb3BzLnRlYW0yfTwvaDM+XG5cblx0XHRcdFx0XHRcdFx0PFN0YXRDaXJjbGVcblx0XHRcdFx0XHRcdFx0XHRibHVlPXt0aGlzLnN0YXRzLmJsdWVUb3dlcih0aGlzLnByb3BzLnRlYW0yKX1cblx0XHRcdFx0XHRcdFx0XHRyZWQ9e3RoaXMuc3RhdHMucmVkVG93ZXIodGhpcy5wcm9wcy50ZWFtMil9XG5cdFx0XHRcdFx0XHRcdFx0ZmJUZXh0PXtgJHt0aGlzLnN0YXRzLlRvd2VyKHRoaXMucHJvcHMudGVhbTIpfSVgfVxuXHRcdFx0XHRcdFx0XHQvPlxuXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXG5cdHJlbmRlclBsYXllclN0YXRzKCkge1xuXHRcdGlmKCF0aGlzLnByb3BzLnRlYW0xIHx8ICF0aGlzLnByb3BzLnRlYW0yKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtbnNcIj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiAgYmRyLXJpZ2h0XCI+XG5cblx0XHRcdFx0XHRcdFx0e3RoaXMuZ2V0UGxheWVyRkJTdGF0cyh0aGlzLnByb3BzLnRlYW0xKX1cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZlwiPlxuXHRcdFx0XHRcdFx0XHR7dGhpcy5nZXRQbGF5ZXJGQlN0YXRzKHRoaXMucHJvcHMudGVhbTIpfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoZXNfX2NvbHVtblwiPlxuXG5cdFx0XHRcdFx0e3RoaXMuZ2V0RHJhZ29uU3RhdHMoKX1cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXRjaGVzX19jb2x1bW5cIj5cblxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW5zXCI+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZiBiZHItcmlnaHRcIj5cblxuXHRcdFx0XHRcdFx0XHR7dGhpcy5nZXRQb3NpdGlvblRvd2VyU3RhdHModGhpcy5wcm9wcy50ZWFtMSl9XHRcdFx0XHRcdFx0XHRcblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtYXRjaGVzX19jb2x1bW4gIG1hdGNoZXNfX2NvbHVtbi0taGFsZlwiPlxuXG5cdFx0XHRcdFx0XHRcdHt0aGlzLmdldFBvc2l0aW9uVG93ZXJTdGF0cyh0aGlzLnByb3BzLnRlYW0yKX1cblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXY+eyB0aGlzLnJlbmRlckNpcmNsZVN0YXRzKCkgfTwvZGl2PlxuXHRcdFx0XHQ8ZGl2PnsgdGhpcy5yZW5kZXJQbGF5ZXJTdGF0cygpIH08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cdFxufVxuXG5leHBvcnQgZGVmYXVsdCBUZWFtU3RhdHMiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcbmltcG9ydCBNYXRjaEVsZW1lbnRzIGZyb20gJy4vTWF0Y2hFbGVtZW50cyc7XG5pbXBvcnQgVGVhbVN0YXRzIGZyb20gJy4vVGVhbVN0YXRzJztcblxuQGNvbm5lY3QoKHN0b3JlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlUmVnaW9uOiBzdG9yZS5jb25maWcuYWN0aXZlUmVnaW9uLFxuICAgICAgICByZWdpb25EYXRhOiBzdG9yZS5yZWdpb25zLnJlZ2lvbkRhdGEsXG4gICAgICAgIHRlYW0xOiBzdG9yZS5jb25maWcudGVhbTEsXG4gICAgICAgIHRlYW0yOiBzdG9yZS5jb25maWcudGVhbTIsXG4gICAgfVxufSlcbmNsYXNzIE1hdGNoVXAgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdHVwZGF0ZVJlZ2lvbihlKSB7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiAnVVBEQVRFX1JFR0lPTicsXG5cdFx0XHRwYXlsb2FkOiBmZXRjaChgL2FwaS8ke2UudGFyZ2V0LnZhbHVlfS9saWdodC5qc29uYCkudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG5cdFx0fSk7XG5cblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6ICdVUERBVEVfUkVHSU9OX1NUQVRTJyxcblx0XHRcdHBheWxvYWQ6IGZldGNoKGAvYXBpLyR7ZS50YXJnZXQudmFsdWV9L3N0YXRzLmpzb25gKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHR9KTtcblxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9SRUdJT05fVEVYVCcsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlVGVhbTEoZSkge1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9URUFNMScsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlVGVhbTIoZSkge1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogJ1VQREFURV9URUFNMicsXG5cdFx0XHR0ZXh0OiBlLnRhcmdldC52YWx1ZVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VGVhbXMoKSB7XG5cdFx0aWYodGhpcy5wcm9wcy5yZWdpb25EYXRhKSB7XG5cdFx0XHRsZXQgdGVhbXMgPSBbXTtcblx0XHRcdGxldCBvcHRpb25zID0gW107XG5cdFx0XHRBcnJheS5mcm9tKHRoaXMucHJvcHMucmVnaW9uRGF0YSwgKGdhbWUpID0+IHtcblx0XHRcdFx0Y29uc3QgdGVhbTEgPSBnYW1lWyd0ZWFtTmFtZXMnXVswXTtcblx0XHRcdFx0Y29uc3QgdGVhbTIgPSBnYW1lWyd0ZWFtTmFtZXMnXVsxXTtcblxuXHRcdFx0XHRpZighdGVhbXMuaW5jbHVkZXModGVhbTEpKSB7XG5cdFx0XHRcdFx0dGVhbXMucHVzaCh0ZWFtMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXRlYW1zLmluY2x1ZGVzKHRlYW0yKSkge1xuXHRcdFx0XHRcdHRlYW1zLnB1c2godGVhbTIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGVhbXMuc29ydCgpO1xuXG5cdFx0XHRBcnJheS5mcm9tKHRlYW1zLCAodGVhbSkgPT4ge1xuXHRcdFx0XHRvcHRpb25zLnB1c2goPG9wdGlvbiB2YWx1ZT17dGVhbX0+e3RlYW19PC9vcHRpb24+KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gb3B0aW9ucztcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZW5kZXJSZWdpb25zKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8c2VsZWN0IG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVSZWdpb24oZSl9IHZhbHVlPXt0aGlzLnByb3BzLmFjdGl2ZVJlZ2lvbn0+XG5cdFx0XHRcdFx0PG9wdGlvbiBkaXNhYmxlZCBzZWxlY3RlZCB2YWx1ZT1cIlwiPlNlbGVjdCBSZWdpb248L29wdGlvbj5cblx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPSdMQ0snPkxDSzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J0NCTE9MJz5DQkxPTDwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J0VVTENTJz5FVUxDUzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J05BTENTJz5OQUxDUzwvb3B0aW9uPlxuXHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9J1RDTCc+VENMPC9vcHRpb24+XG5cdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT0nTE1TJz5MTVM8L29wdGlvbj5cblx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPSdPUEwnPk9QTDwvb3B0aW9uPlxuXHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblxuXHRyZW5kZXJUZWFtcygpIHtcblx0XHRjb25zdCB0ZWFtcyA9IHRoaXMuZ2V0VGVhbXMoKTtcblx0XHRpZih0ZWFtcykge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c2VsZWN0XG5cdFx0XHRcdFx0b25DaGFuZ2U9eyhlKSA9PiB0aGlzLnVwZGF0ZVRlYW0xKGUpfSBcblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy50ZWFtMSA/IHRoaXMucHJvcHMudGVhbTEgOiAnc2VsZWN0J30+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIHZhbHVlPSdzZWxlY3QnPlNlbGVjdCBUZWFtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHR7dGVhbXN9XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdFx0PHNlbGVjdFxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy51cGRhdGVUZWFtMihlKX1cblx0XHRcdFx0XHR2YWx1ZT17dGhpcy5wcm9wcy50ZWFtMiA/IHRoaXMucHJvcHMudGVhbTIgOiAnc2VsZWN0J30+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHNlbGVjdGVkIGRpc2FibGVkIHZhbHVlPSdzZWxlY3QnPlNlbGVjdCBUZWFtPC9vcHRpb24+XG5cdFx0XHRcdFx0XHR7dGVhbXN9XG5cdFx0XHRcdFx0PC9zZWxlY3Q+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHQ8c2VsZWN0IGRpc2FibGVkPjwvc2VsZWN0PlxuXHRcdFx0XHRcdDxzZWxlY3QgZGlzYWJsZWQ+PC9zZWxlY3Q+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJNYXRjaHVwKCkge1xuXHRcdGlmKHRoaXMucHJvcHMudGVhbTEgJiYgdGhpcy5wcm9wcy50ZWFtMikge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PE1hdGNoRWxlbWVudHMgdGVhbTE9e3RoaXMucHJvcHMudGVhbTF9IHRlYW0yPXt0aGlzLnByb3BzLnRlYW0yfSBnYW1lcz17dGhpcy5wcm9wcy5yZWdpb25EYXRhfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJTdGF0cygpIHtcblx0XHRpZih0aGlzLnByb3BzLnRlYW0xICYmIHRoaXMucHJvcHMudGVhbTIpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxUZWFtU3RhdHMgdGVhbTE9e3RoaXMucHJvcHMudGVhbTF9IHRlYW0yPXt0aGlzLnByb3BzLnRlYW0yfSBzdG9yZT17dGhpcy5wcm9wcy5zdG9yZX0vPlxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJUZWFtc1ZTKCkge1xuXHRcdGlmKHRoaXMucHJvcHMudGVhbTEgJiYgdGhpcy5wcm9wcy50ZWFtMikge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7dGhpcy5wcm9wcy50ZWFtMX0gdnMge3RoaXMucHJvcHMudGVhbTJ9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIm1hdGNoZXNfX3NlbGVjdHNcIj5cblx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0eyB0aGlzLnJlbmRlclJlZ2lvbnMoKSB9XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlclRlYW1zKCkgfVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJUZWFtc1ZTKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlclN0YXRzKCkgfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJNYXRjaHVwKCkgfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoVXA7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3ByZWFjdC1yZWR1eCc7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlYW0xOiBzdG9yZS5jb25maWcudGVhbTEsXG4gICAgICAgIHRlYW0yOiBzdG9yZS5jb25maWcudGVhbTIsXG4gICAgfVxufSlcblxuY2xhc3MgTWF0Y2hFbGVtZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlQ2FyZENsaWNrKCkge1xuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIHR5cGU6ICdVUERBVEVfVEVBTVMnLFxuICAgICAgICAgICAgdGVhbTE6IHRoaXMucHJvcHMubWF0Y2gudGVhbTFhY3JvLFxuICAgICAgICAgICAgdGVhbTI6IHRoaXMucHJvcHMubWF0Y2gudGVhbTJhY3JvLFxuICAgICAgICAgICAgcmVnaW9uOiB0aGlzLnByb3BzLm1hdGNoLnJlZ2lvblxuICAgICAgICB9KVxuICAgIH1cbiBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNhcmRDbGljay5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRfX2JhY2tncm91bmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0Y2gtY2FyZF9fYmFja2dyb3VuZFwiIHN0eWxlPXtgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvYXNzZXRzL2ltZy9sb2dvcy8ke3RoaXMucHJvcHMubWF0Y2gucmVnaW9ufS8ke3RoaXMucHJvcHMubWF0Y2gudGVhbTFhY3JvfS5wbmcnKWB9PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRfX2JhY2tncm91bmRcIiBzdHlsZT17YGJhY2tncm91bmQtaW1hZ2U6IHVybCgnL2Fzc2V0cy9pbWcvbG9nb3MvJHt0aGlzLnByb3BzLm1hdGNoLnJlZ2lvbn0vJHt0aGlzLnByb3BzLm1hdGNoLnRlYW0yYWNyb30ucG5nJylgfT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hdGNoLWNhcmRfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXRjaC1jYXJkX19sZWFndWVcIj57dGhpcy5wcm9wcy5tYXRjaC5yZWdpb259PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF0Y2gtY2FyZF9fdGltZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMudGltZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoRWxlbWVudDsiLCJpbXBvcnQgeyBoLCByZW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ3ByZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncHJlYWN0LXJlZHV4JztcblxuaW1wb3J0IE1hdGNoRWxlbWVudCBmcm9tICcuL01hdGNoRWxlbWVudCc7XG5cbkBjb25uZWN0KChzdG9yZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGxvYWRpbmc6IHN0b3JlLm1hdGNoZXMubG9hZGluZyxcbiAgICAgICAgbWF0Y2hlczogc3RvcmUubWF0Y2hlcy5tYXRjaGVzLFxuICAgIH1cbn0pXG5jbGFzcyBNYXRjaGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIC8vIHNldCBpbml0aWFsIHRpbWU6XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDBcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mZXRjaE1hdGNoZXMoKTtcbiAgICB9XG5cbiAgICBmZXRjaE1hdGNoZXMoKSB7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiAnR0VUX01BVENIRVMnLFxuXHRcdFx0cGF5bG9hZDogZmV0Y2goYC9hcGkvc2NoZWR1bGUuanNvbmApLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHRcdH0pO1xuICAgIH1cbiBcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgLy8gdXBkYXRlIHRpbWUgZXZlcnkgc2Vjb25kXG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG4gXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIC8vIHN0b3Agd2hlbiBub3QgcmVuZGVyYWJsZVxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuICAgIH1cblxuICAgIGdldFRpbWVEaWZmZXJlbmNlKHRpbWUxLCB0aW1lMikge1xuICAgICAgICBpZih0aW1lMSA+IHRpbWUyKSB7XG4gICAgICAgICAgICBsZXQgZGlmZmVyZW5jZSA9IHRpbWUxIC0gdGltZTI7XG4gICAgICAgICAgICBjb25zdCBkYXlzID0gTWF0aC5mbG9vcihkaWZmZXJlbmNlIC8gKDM2MDAqMjQpKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZERheXMgPSAoXCIwXCIgKyBkYXlzKS5zbGljZSgtMik7XG4gICAgICAgICAgICBkaWZmZXJlbmNlICAtPSBkYXlzKjM2MDAqMjQ7XG4gICAgICAgICAgICBjb25zdCBocnMgICA9IE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvIDM2MDApO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkSHJzID0gKFwiMFwiICsgaHJzKS5zbGljZSgtMik7XG4gICAgICAgICAgICBkaWZmZXJlbmNlICAtPSBocnMqMzYwMDtcbiAgICAgICAgICAgIGNvbnN0IG1udHMgPSBNYXRoLmZsb29yKGRpZmZlcmVuY2UgLyA2MCk7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRNbnRzID0gKFwiMFwiICsgbW50cykuc2xpY2UoLTIpO1xuICAgICAgICAgICAgZGlmZmVyZW5jZSAgLT0gbW50cyo2MDtcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKGRpZmZlcmVuY2UpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IChcIjBcIiArIHNlY29uZHMpLnNsaWNlKC0yKTtcbiAgICAgICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWREYXlzfToke2Zvcm1hdHRlZEhyc306JHtmb3JtYXR0ZWRNbnRzfToke2Zvcm1hdHRlZFNlY29uZHN9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnMDA6MDA6MDA6MDAnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TmV4dE1hdGNoZXMobWF4ID0gMTApIHtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gJ0xvYWRpbmcnO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMucHJvcHMubWF0Y2hlcykge1xuICAgICAgICAgICAgbGV0IG1hdGNoRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5wcm9wcy5tYXRjaGVzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gdGhpcy5wcm9wcy5tYXRjaGVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8IG1heCAmJiB0aGlzLnByb3BzLm1hdGNoZXNbaW5kZXhdLmRhdGV0aW1lID4gdGhpcy5zdGF0ZS50aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoRWxlbWVudHMucHVzaCg8TWF0Y2hFbGVtZW50IHN0b3JlPXt0aGlzLnByb3BzLnN0b3JlfSBtYXRjaD17dGhpcy5wcm9wcy5tYXRjaGVzW2luZGV4XX0gdGltZT17dGhpcy5nZXRUaW1lRGlmZmVyZW5jZSh0aGlzLnByb3BzLm1hdGNoZXNbaW5kZXhdLmRhdGV0aW1lLCB0aGlzLnN0YXRlLnRpbWUpfS8+KTtcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hFbGVtZW50cztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuIFxuICAgIHJlbmRlcihwcm9wcywgc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIDxzcGFuPnsgdGhpcy5nZXROZXh0TWF0Y2hlcygyNSkgfTwvc3Bhbj47XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hdGNoZXM7IiwiaW1wb3J0IHsgaCwgcmVuZGVyLCBDb21wb25lbnQgfSBmcm9tICdwcmVhY3QnO1xuXG5jbGFzcyBOYXZCYXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGdldExpbmtzKCkge1xuXHRcdGxldCBvcHRpb25zID0ge1xuXHRcdFx0bWF0Y2hVcCA6ICdNYXRjaCBVcCcsXG5cdFx0XHRjaGFtcHMgOiAnQ2hhbXBzJyxcblx0XHRcdHBsYXllcnM6ICdQbGF5ZXJzJ1xuXHRcdH1cblx0XHRsZXQgbGlua3MgPSBbXVxuXG5cdFx0Zm9yIChjb25zdCBvcHRpb24gaW4gb3B0aW9ucykge1xuXHRcdFx0bGlua3MucHVzaCg8bGkgb25DbGljaz17KCkgPT4gdGhpcy5wcm9wcy51cGRhdGVBcHBUeXBlKG9wdGlvbil9IGNsYXNzTmFtZT17dGhpcy5pc0FjdGl2ZShvcHRpb24pID8gJ2lzLWFjdGl2ZScgOiAnJ30+e29wdGlvbnNbb3B0aW9uXX08L2xpPik7XG5cdFx0fVxuXHRcdHJldHVybiBsaW5rcztcblx0fVxuXG5cdGlzQWN0aXZlKG9wdGlvbikge1xuXHRcdHJldHVybiBvcHRpb24gPT09IHRoaXMucHJvcHMuYXBwVHlwZTtcblx0fVxuXG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8dWw+XG5cdFx0XHRcdHt0aGlzLmdldExpbmtzKCkgfVxuXHRcdFx0PC91bD5cblx0XHQpO1xuXHR9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTmF2QmFyOyIsImltcG9ydCB7IGgsIHJlbmRlciwgQ29tcG9uZW50IH0gZnJvbSAncHJlYWN0JztcblxuY2xhc3MgQXBwTWFpbiBleHRlbmRzIENvbXBvbmVudCB7XG5cblx0cmVuZGVyKCkge1xuXHRcdHJldHVybiAncGxheWVycyc7XG5cdH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBBcHBNYWluOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZyhzdGF0ZSA9IFtdLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuXHRjYXNlICdVUERBVEVfUkVHSU9OX1RFWFQnOlxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5zdGF0ZSxcblx0XHRcdGFjdGl2ZVJlZ2lvbiA6IGFjdGlvbi50ZXh0LFxuXHRcdFx0dGVhbTEgOiBmYWxzZSxcblx0XHRcdHRlYW0yIDogZmFsc2UsXG5cdFx0fVxuXHRjYXNlICdVUERBVEVfVEVBTTEnOlxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5zdGF0ZSxcblx0XHRcdHRlYW0xIDogYWN0aW9uLnRleHRcblx0XHR9XG5cdGNhc2UgJ1VQREFURV9URUFNMic6XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0dGVhbTIgOiBhY3Rpb24udGV4dFxuXHRcdH1cblxuXHRjYXNlICdVUERBVEVfVEVBTVMnOlxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5zdGF0ZSxcblx0XHRcdHRlYW0xOiBhY3Rpb24udGVhbTEsXG5cdFx0XHR0ZWFtMjogYWN0aW9uLnRlYW0yLFxuXHRcdFx0YWN0aXZlUmVnaW9uOiBhY3Rpb24ucmVnaW9uXG5cdFx0fVxuXG5cdGRlZmF1bHQ6XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cbiIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHJlZ2lvbnMgZnJvbSAnLi9yZWdpb25zJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBtYXRjaGVzIGZyb20gJy4vbWF0Y2hlcydcbmltcG9ydCBzdGF0cyBmcm9tICcuL3N0YXRzJ1xuXG5leHBvcnQgZGVmYXVsdCBjb21iaW5lUmVkdWNlcnMoe1xuXHRyZWdpb25zLFxuXHRjb25maWcsXG5cdG1hdGNoZXMsXG5cdHN0YXRzXG59KVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0Y2hlcyhzdGF0ZSA9IFtdLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlICdHRVRfTUFUQ0hFU19QRU5ESU5HJzpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICBjYXNlICdHRVRfTUFUQ0hFU19GVUxGSUxMRUQnOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgICAgICBsb2FkaW5nIDogZmFsc2UsXG4gICAgICAgICAgICAgIG1hdGNoZXM6IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICAgfVxuICBcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICB9XG4gIH1cbiAgIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVnaW9ucyhzdGF0ZSA9IFtdLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICBcdGNhc2UgJ1VQREFURV9SRUdJT05fUEVORElORyc6XG4gIFx0XHRyZXR1cm4ge1xuICBcdFx0XHQuLi5zdGF0ZSxcbiAgXHRcdFx0cmVnaW9uTG9hZGluZzogdHJ1ZSxcbiAgXHRcdH1cblx0Y2FzZSAnVVBEQVRFX1JFR0lPTl9GVUxGSUxMRUQnOlxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5zdGF0ZSxcblx0XHRcdHJlZ2lvbkRhdGEgOiBhY3Rpb24ucGF5bG9hZCxcblx0XHRcdHJlZ2lvbkxvYWRpbmc6IGZhbHNlXG5cdFx0fVxuXHRjYXNlICdVUERBVEVfUkVHSU9OX1NUQVRTX1BFTkRJTkcnOlxuICBcdFx0cmV0dXJuIHtcbiAgXHRcdFx0Li4uc3RhdGUsXG4gIFx0XHRcdHN0YXRzTG9hZGluZzogdHJ1ZSxcbiAgXHRcdH1cblx0Y2FzZSAnVVBEQVRFX1JFR0lPTl9TVEFUU19GVUxGSUxMRUQnOlxuXHRcdHJldHVybiB7XG5cdFx0XHQuLi5zdGF0ZSxcblx0XHRcdHJlZ2lvblN0YXRzIDogYWN0aW9uLnBheWxvYWQsXG5cdFx0XHRzdGF0c0xvYWRpbmc6IGZhbHNlXG5cdFx0fVxuXG5cdGRlZmF1bHQ6XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXRzKHN0YXRlID0ge2xvYWRpbmc6IDB9LCBhY3Rpb24pIHtcblx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xuXHRcdGNhc2UgJ0ZFVENIX1NUQVRTX1BFTkRJTkcnOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdGxvYWRpbmc6IHN0YXRlLmxvYWRpbmcgKyAxLFxuXHRcdFx0fVxuXHRcdGNhc2UgJ0ZFVENIX1NUQVRTX0ZVTEZJTExFRCc6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0bG9hZGluZzogc3RhdGUubG9hZGluZyAtIDEsXG5cdFx0XHRcdHN0YXRzIDoge1xuXHRcdFx0XHRcdC4uLnN0YXRlLnN0YXRzLFxuXHRcdFx0XHRcdFthY3Rpb24ubWV0YV0gOiBhY3Rpb24ucGF5bG9hZFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRjYXNlICdTRVRfQUxMX1BBVENIRVMnOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdGFjdGl2ZVBhdGNoZXM6IGFjdGlvbi5wYXRjaGVzXG5cdFx0XHR9XG5cblx0XHRjYXNlICdTRVRfQUxMX1JFR0lPTlMnOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Li4uc3RhdGUsXG5cdFx0XHRcdGFjdGl2ZVJlZ2lvbnM6IGFjdGlvbi5yZWdpb25zXG5cdFx0XHR9XG5cblx0XHRjYXNlICdTRVRfQUxMX1ZBUklBQkxFUyc6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHQuLi5zdGF0ZSxcblx0XHRcdFx0YWN0aXZlVmFyaWFibGVzOiBhY3Rpb24udmFyaWFibGVzXG5cdFx0XHR9XG5cblx0XHRjYXNlICdTRVRfTUlOUExBWUVEJzpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRtaW5QbGF5ZWQ6IGFjdGlvbi5taW5QbGF5ZWRcblx0XHRcdH1cblxuXHRcdGNhc2UgJ1JFU0VUX1NUQVRTJzpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdC4uLnN0YXRlLFxuXHRcdFx0XHRhY3RpdmVQYXRjaGVzOiB1bmRlZmluZWQsXG5cdFx0XHRcdGFjdGl2ZVJlZ2lvbnM6IHVuZGVmaW5lZCxcblx0XHRcdFx0YWN0aXZlVmFyaWFibGVzOiB1bmRlZmluZWQsXG5cdFx0XHRcdG1pblBsYXllZDogdW5kZWZpbmVkLFxuXHRcdFx0fVxuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH1cbn1cbiIsImltcG9ydCB7IGFwcGx5TWlkZGxld2FyZSwgY3JlYXRlU3RvcmUgfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHRodW5rIGZyb20gXCJyZWR1eC10aHVua1wiXG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInXG5pbXBvcnQgcmVkdXhQcm9taXNlTWlkZGxld2FyZSBmcm9tIFwicmVkdXgtcHJvbWlzZS1taWRkbGV3YXJlXCJcbmltcG9ydCByZWR1Y2VyIGZyb20gXCIuL2luZGV4XCJcblxuY29uc3QgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZShyZWR1eFByb21pc2VNaWRkbGV3YXJlKCksIGNyZWF0ZUxvZ2dlcigpKVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2VyLCBtaWRkbGV3YXJlKSIsImltcG9ydCBMZWFndWVSZWFjdEFwcCBmcm9tICcuL2NsYXNzZXMvTGVhZ3VlUmVhY3RBcHAnO1xuaW1wb3J0IExlYWd1ZU1hdGNoZXNBcHAgZnJvbSAnLi9jbGFzc2VzL0xlYWd1ZU1hdGNoZXNBcHAnO1xuXG5cblxuY29uc3QgbGVhZ3VlQXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWxlYWd1ZS1hcHAnKTtcbmlmKGxlYWd1ZUFwcCkge1xuXHRuZXcgTGVhZ3VlUmVhY3RBcHAobGVhZ3VlQXBwKTtcbn1cblxuY29uc3QgbGVhZ3VlTWF0Y2hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1sZWFndWUtbWF0Y2hlcycpO1xuaWYobGVhZ3VlTWF0Y2hlcykge1xuXHRuZXcgTGVhZ3VlTWF0Y2hlc0FwcChsZWFndWVNYXRjaGVzKTtcbn0iXX0=
