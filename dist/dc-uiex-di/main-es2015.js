(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/bind-context.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection-weak.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/collection-weak.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var getWeakData = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js").getWeakData;
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var ArrayIterationModule = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js");
var $has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/collection.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/collection.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");

module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(a) {
        nativeMethod.call(this, a === 0 ? 0 : a);
        return this;
      } : KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : function set(a, b) {
        nativeMethod.call(this, a === 0 ? 0 : a, b);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/freezing.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/freezing.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ "./node_modules/core-js/internals/function-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/function-to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

module.exports = shared('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof global == O && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();


/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/hide.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/hide.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/inherit-if-required.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/inherit-if-required.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "./node_modules/core-js/internals/internal-metadata.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/internal-metadata.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var FREEZING = __webpack_require__(/*! ../internals/freezing */ "./node_modules/core-js/internals/freezing.js");

var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");


/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.1.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.weak-map.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es.weak-map.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");
var InternalMetadataModule = __webpack_require__(/*! ../internals/internal-metadata */ "./node_modules/core-js/internals/internal-metadata.js");
var collection = __webpack_require__(/*! ../internals/collection */ "./node_modules/core-js/internals/collection.js");
var collectionWeak = __webpack_require__(/*! ../internals/collection-weak */ "./node_modules/core-js/internals/collection-weak.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var enforceIternalState = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").enforce;
var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");

var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak, true, true);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div style=\"height:500px\">\n<amp-edit-toolbar [ngClass]=\"{'amp-root__topbar--hide': !showToolbar}\"></amp-edit-toolbar>\n<amp-preview-canvas></amp-preview-canvas>\n</div>\n<amp-transform-list *ngIf=\"showToolbar\"></amp-transform-list>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/metadata/transform-list/transform-list.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/metadata/transform-list/transform-list.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table mat-table [dataSource]=\"di.transformations\" class=\"mat-elevation-z8 amp-transform-list\">\n\n  <!-- Name Column -->\n  <ng-container matColumnDef=\"name\">\n    <th mat-header-cell *matHeaderCellDef class=\"amp-transform-list__name\"> Name </th>\n    <td mat-cell *matCellDef=\"let element\" class=\"amp-transform-list__name\"> {{element.name}} </td>\n  </ng-container>\n\n  <!-- Query Column -->\n  <ng-container matColumnDef=\"query\">\n    <th mat-header-cell *matHeaderCellDef> Query </th>\n    <td mat-cell *matCellDef=\"let element\" class=\"amp-transform-list__query\"> {{element.queryString()}} </td>\n  </ng-container>\n\n  <!-- Delete Column -->\n  <ng-container matColumnDef=\"fields\">\n    <th mat-header-cell *matHeaderCellDef class=\"amp-transform-list__remove\"> </th>\n    <td mat-cell *matCellDef=\"let element\" class=\"amp-transform-list__remove\">\n      <button mat-icon-button (click)=\"clearTransform(element)\"><mat-icon>clear</mat-icon></button>\n    </td>\n  </ng-container>\n\n  <!--<tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>-->\n  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n</table>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/preview/crop-toolbar/crop-toolbar.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/preview/crop-toolbar/crop-toolbar.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<label class=\"amp-crop-toolbar__label\" [ngClass]=\"{'amp-crop-toolbar__label--active': focus[0]}\">\n  <span class=\"amp-crop-toolbar__label--full\">Crop X</span>\n  <span class=\"amp-crop-toolbar__label--short\">X</span>\n</label>\n<mat-form-field>\n  <input matInput [(ngModel)]=\"crop[0]\" type=\"number\" (change)=\"updateCrop(false)\" (focus)=\"focus[0] = true\" (blur)=\"focus[0] = false\"/>\n</mat-form-field>\n\n<label class=\"amp-crop-toolbar__label\" [ngClass]=\"{'amp-crop-toolbar__label--active': focus[1]}\">\n  <span class=\"amp-crop-toolbar__label--full\">Crop Y</span>\n  <span class=\"amp-crop-toolbar__label--short\">Y</span>\n</label>\n<mat-form-field>\n  <input matInput [(ngModel)]=\"crop[1]\" type=\"number\" (change)=\"updateCrop(false)\" (focus)=\"focus[1] = true\" (blur)=\"focus[1] = false\"/>\n</mat-form-field>\n\n<label class=\"amp-crop-toolbar__label\" [ngClass]=\"{'amp-crop-toolbar__label--active': focus[2]}\">\n  <span class=\"amp-crop-toolbar__label--full\">Crop Width</span>\n  <span class=\"amp-crop-toolbar__label--short\">W</span>\n</label>\n<mat-form-field>\n  <input matInput [(ngModel)]=\"crop[2]\" type=\"number\" (change)=\"updateCrop(true)\" (focus)=\"focus[2] = true\" (blur)=\"focus[2] = false\"/>\n</mat-form-field>\n\n<label class=\"amp-crop-toolbar__label\" [ngClass]=\"{'amp-crop-toolbar__label--active': focus[3]}\">\n  <span class=\"amp-crop-toolbar__label--full\">Crop Height</span>\n  <span class=\"amp-crop-toolbar__label--short\">H</span>\n</label>\n<mat-form-field>\n  <input matInput [(ngModel)]=\"crop[3]\" type=\"number\" (change)=\"updateCrop(true)\" (focus)=\"focus[3] = true\" (blur)=\"focus[3] = false\"/>\n</mat-form-field>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/preview/di-preview/di-preview.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/preview/di-preview/di-preview.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngFor=\"let item of preview.previews\">\n  <div\n  class=\"amp-di-preview__image\"\n  [ngClass]=\"{'amp-di-preview__image--invalid': item.preferred().error && item.displayImage != null}\"\n  [style.width]=\"item.preferred().width+'px'\"\n  [style.height]=\"item.preferred().height+'px'\" #imageContainer>\n    <!-- populated by \"update containers\" in the controller. -->\n  </div>\n</ng-container>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/preview/edit-toolbar/edit-toolbar.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/preview/edit-toolbar/edit-toolbar.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-simplebar class=\"amp-edit-toolbar__modescroll\">\n  <div class=\"amp-edit-toolbar__modes\">\n    <mat-menu #buttonMenu=\"matMenu\" class=\"amp-edit-toolbar__menu\">\n      <div class=\"amp-edit-toolbar__slidergroup\" *ngFor=\"let slider of activeSliders\" (click)=\"$event.stopPropagation()\"\n        [ngClass]=\"{'amp-edit-toolbar__slidergroup--margin': slider.type !== 'listItem'}\">\n\n        <button mat-menu-item\n        *ngIf=\"slider.type == 'listItem'\"\n        class=\"amp-edit-toolbar__item\"\n        [ngClass]=\"{'amp-edit-toolbar__item--active': getSliderValue(slider) === slider.value }\"\n        (click)=\"(slider.action) ? slider.action(slider) : updateSliderValue(slider, slider.value)\">\n          <mat-icon>check</mat-icon><span>{{slider.name}}</span>\n        </button>\n\n        <div class=\"amp-edit-toolbar__menu__label\" *ngIf=\"slider.type != 'listItem'\">{{slider.name}}</div>\n        <mat-slide-toggle\n        *ngIf=\"slider.type == 'bool'\"\n        [checked]=\"!!getSliderValue(slider)\"\n        (change)=\"updateSliderValue(slider, $event.checked)\">\n        </mat-slide-toggle>\n        <mat-slider\n        *ngIf=\"slider.type == 'slider'\"\n        thumbLabel=\"true\"\n        [value]=\"getSliderValue(slider)\"\n        [min]=\"slider.min\"\n        [max]=\"slider.max\"\n        (input)=\"updateSliderValue(slider, $event.value)\"></mat-slider>\n      </div>\n    </mat-menu>\n    <div class=\"amp-edit-toolbar__crop-menu-anchor\" [matMenuTriggerFor]=\"cropMenu\" #cropMenuTrigger=\"matMenuTrigger\"></div>\n    <ng-container *ngFor=\"let button of buttons\">\n      <button mat-flat-button\n      *ngIf=\"button.sliders.length !== 0\"\n      [color]=\"(modeActive(button.mode)) ? 'primary' : 'secondary'\"\n      [disabled]=\"isLoading\"\n      (click)=\"setMode(button)\"\n      [matMenuTriggerFor]=\"buttonMenu\">\n        {{button.name}}\n      </button>\n      <button mat-flat-button\n      *ngIf=\"button.sliders.length === 0\"\n      [color]=\"(modeActive(button.mode)) ? 'primary' : 'secondary'\"\n      [disabled]=\"isLoading\"\n      (click)=\"setMode(button)\">\n        {{button.name}}\n      </button>\n    </ng-container>\n    <mat-divider [vertical]=\"true\"></mat-divider>\n    <button mat-flat-button [disabled]=\"isLoading\" (click)=\"resetTransforms()\" matTooltip=\"Reset all\" class=\"amp-edit-toolbar__reset\">\n      <mat-icon>undo</mat-icon>\n    </button>\n\n    <mat-menu #cropMenu=\"matMenu\" class=\"amp-edit-toolbar__cropmenu\">\n      <div class=\"amp-edit-toolbar__cropmenu\" (click)=\"$event.stopPropagation()\">\n        <h5 class=\"amp-edit-toolbar__croptitle\">Custom Crop Rectangle</h5>\n        <div class=\"amp-edit-toolbar__cropgroup\">\n          <mat-form-field>\n            <input matInput placeholder=\"Crop X\" [(ngModel)]=\"crop[0]\" type=\"number\"/>\n          </mat-form-field>\n\n          <mat-form-field>\n            <input matInput placeholder=\"Crop Y\" [(ngModel)]=\"crop[1]\" type=\"number\"/>\n          </mat-form-field>\n        </div>\n\n        <div class=\"amp-edit-toolbar__cropgroup\">\n          <mat-form-field>\n            <input matInput placeholder=\"Crop Width\" [(ngModel)]=\"crop[2]\" type=\"number\"/>\n          </mat-form-field>\n\n          <mat-form-field>\n            <input matInput placeholder=\"Crop Height\" [(ngModel)]=\"crop[3]\" type=\"number\"/>\n          </mat-form-field>\n        </div>\n\n        <div class=\"amp-edit-toolbar__cropgroup\">\n          <button mat-flat-button color=\"primary\" (click)=\"cropMenuTrigger.closeMenu()\">Done</button>\n        </div>\n      </div>\n    </mat-menu>\n  </div>\n</ngx-simplebar>\n<div class=\"amp-edit-toolbar__right\">\n    <button mat-button (click)=\"exitMode(true)\">Cancel</button>\n    <button mat-flat-button color=\"primary\" (click)=\"exitMode(false)\">Done</button>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/preview/mode-buttons/mode-buttons.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/preview/mode-buttons/mode-buttons.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"showButtons\">\n  <ng-container *ngIf=\"hasImage\">\n      <button mat-fab (click)=\"changeMode('edit')\" matTooltip=\"Edit image & focal point\" class=\"amp-fab\">\n        <mat-icon class=\"amp-icon-small\">edit</mat-icon>\n      </button>\n      <button mat-fab color=\"secondary\" (click)=\"changeMode('swap')\" matTooltip=\"Replace\" class=\"amp-fab\">\n        <mat-icon class=\"amp-icon-small\">swap_horiz</mat-icon>\n      </button>\n    <button mat-fab color=\"secondary\" (click)=\"changeMode('delete')\" matTooltip=\"Remove\" class=\"amp-fab\">\n      <mat-icon class=\"amp-icon-small\" svgIcon=\"delete\"></mat-icon>\n    </button>\n  </ng-container>\n  <ng-container *ngIf=\"!hasImage\">\n    <button mat-fab (click)=\"changeMode('swap')\" matTooltip=\"Set image\" class=\"amp-fab\">\n      <mat-icon class=\"amp-icon-small\">add</mat-icon>\n    </button>\n  </ng-container>\n</ng-container>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/preview/preview-canvas/preview-canvas.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/preview/preview-canvas/preview-canvas.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- The image itself, transformed -->\n<div class=\"amp-preview-canvas__imagesplit\">\n  <div class=\"amp-preview-canvas__previewarea\">\n    <amp-crop-toolbar *ngIf=\"isCrop && data != null && data.aspectLock == 'none'\"></amp-crop-toolbar>\n    <div class=\"amp-preview-canvas__canvas\" [style.transform]=\"canvasTransform\" #canvas>\n      <div *ngIf=\"image\" class=\"amp-preview-canvas__imagecontainer\"\n      [style.width]=\"imageWidth+'px'\"\n      [style.height]=\"imageHeight+'px'\"\n      (mousedown)=\"grabCropHandle(5)\"\n      #imageContainer>\n        <img #image\n        crossorigin=\"anonymous\"\n        style=\"display:none\">\n\n        <canvas class=\"amp-preview-canvas__image\"\n        #imageCanvas\n        [style.width]=\"imageWidth + 'px'\"\n        [style.height]=\"imageHeight + 'px'\"\n        [style.filter]=\"getImageFilter()\"\n        [style.transform]=\"getImageTransform()\">\n        </canvas>\n\n        <!-- The crop overlay -->\n        <div class=\"amp-preview-canvas__croprect\"\n        [ngClass]=\"{'amp-preview-canvas__croprect--inactive': !isCrop, 'amp-preview-canvas__croprect--simulated': isPreview}\"\n        *ngIf=\"cropPx && cropPx[2] > 0 && cropPx[3] > 0\"\n        [style.left]=\"cropPx[0]+'px'\"\n        [style.top]=\"cropPx[1]+'px'\"\n        [style.width]=\"cropPx[2]+'px'\"\n        [style.height]=\"cropPx[3]+'px'\"\n        [style.borderWidth]=\"cropRectStroke\"\n        [style.outlineWidth]=\"outlineSize\"\n        (mousedown)=\"grabCropHandle(4)\">\n          <ng-container *ngIf=\"isCrop\">\n            <div class=\"amp-preview-canvas__crophandle amp-preview-canvas__crophandle--topleft\" (mousedown)=\"grabCropHandle(0); $event.stopPropagation()\" [style.width]=\"handleSize\" [style.height]=\"handleSize\" [style.marginLeft]=\"handleHSize\" [style.marginTop]=\"handleHSize\"></div>\n            <div class=\"amp-preview-canvas__crophandle amp-preview-canvas__crophandle--topright\" (mousedown)=\"grabCropHandle(1); $event.stopPropagation()\" [style.width]=\"handleSize\" [style.height]=\"handleSize\" [style.marginLeft]=\"handleHSize\" [style.marginTop]=\"handleHSize\"></div>\n            <div class=\"amp-preview-canvas__crophandle amp-preview-canvas__crophandle--bottomright\" (mousedown)=\"grabCropHandle(2); $event.stopPropagation()\" [style.width]=\"handleSize\" [style.height]=\"handleSize\" [style.marginLeft]=\"handleHSize\" [style.marginTop]=\"handleHSize\"></div>\n            <div class=\"amp-preview-canvas__crophandle amp-preview-canvas__crophandle--bottomleft\" (mousedown)=\"grabCropHandle(3); $event.stopPropagation()\" [style.width]=\"handleSize\" [style.height]=\"handleSize\" [style.marginLeft]=\"handleHSize\" [style.marginTop]=\"handleHSize\"></div>\n          </ng-container>\n        </div>\n\n        <!-- The POI overlay -->\n\n        <div *ngIf=\"(isPreview || isPOI) && poiPx != null\" class=\"amp-preview-canvas__poi\"\n          (mousedown)=\"grabPOI()\"\n          [style.left]=\"(poiPx[0]-20)+'px'\"\n          [style.top]=\"(poiPx[1]-20)+'px'\"\n          [style.transform]=\"'scale('+ 1/scale +')'\">\n          <svg width=\"40\" height=\"40\">\n              <rect class=\"amp-preview-canvas__poi-background\" height=\"40\" width=\"40\"></rect><polygon class=\"amp-preview-canvas__poi-plus\" points=\"18,8 22,8 22,18 32,18 32,22 22,22 22,32 18,32 18,22 8,22 8,18 18,18 18,8\"></polygon>\n          </svg>\n        </div>\n      </div>\n    </div>\n    <amp-spinner *ngIf=\"hasImage\"\n    class=\"amp-preview-canvas__loading\"\n    [ngClass]=\"{'amp-preview-canvas__loading--hide': !isLoading}\"\n    [message]=\"imageError\">\n    </amp-spinner>\n  </div>\n  <amp-di-preview [ngClass]=\"{'amp-preview-canvas__dipreview--hide': isPreview}\"></amp-di-preview>\n</div>\n\n<!-- Pre-edit options -->\n<amp-mode-buttons></amp-mode-buttons>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/preview/spinner/spinner.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/preview/spinner/spinner.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div\n  fxLayout=\"column\" fxLayoutAlign=\"center center\" fxFlexFill fxAlign=\"\">\n  <div fxLayout>\n    <div\n      class=\"amp-spinner__bounce amp-spinner__bounce--{{index}}\"\n      *ngFor=\"let index of dots\" >\n    </div>\n  </div>\n  <div class=\"amp-spinner__message\" [ngClass]=\"{'amp-spinner__message--in': newMessage}\">\n    {{message}}\n  </div>\n  <div class=\"amp-spinner__messageone amp-spinner__message--out\" style=\"margin-top: -29px;\" [ngClass]=\"{'amp-spinner__message--outreset': oldMessage}\">\n    {{lastMessage}}\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/api/dc-sdk.service.ts":
/*!***************************************!*\
  !*** ./src/app/api/dc-sdk.service.ts ***!
  \***************************************/
/*! exports provided: DcSdkService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DcSdkService", function() { return DcSdkService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


/** A simple wrapper around the dc-extensions-sdk */
let DcSdkService = class DcSdkService {
    constructor() {
    }
    getSDK() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.sdk == null) {
                this.sdk = window.extensionsSdkInstance;
            }
            return yield this.sdk;
        });
    }
};
DcSdkService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DcSdkService);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button {\n  color: #333333;\n  text-transform: none;\n  min-height: 0;\n  min-width: 0;\n  line-height: normal;\n  margin: 0;\n  font-weight: 400;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  outline: none;\n  transition: color 0.3s;\n}\n.mat-button:not([disabled]):hover {\n  background-color: transparent !important;\n  color: #1ab0f9;\n}\n.mat-button:not([disabled]).mat-focused {\n  background-color: transparent;\n}\n.mat-button[disabled] {\n  color: #bfbfbf;\n}\n.mat-flat-button {\n  border-radius: 3px;\n  padding: 0 10px;\n  transition: all 0.3s;\n}\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-primary.disabled {\n  color: #bfbfbf;\n  background-color: #e5e5e5;\n  cursor: default;\n}\n.mat-flat-button.mat-primary[disabled] mat-icon, .mat-flat-button.mat-primary.disabled mat-icon {\n  fill: #a2a6ab;\n  color: #a2a6ab;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) {\n  color: #fff;\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]), .mat-flat-button.mat-primary.faux-hover:not([disabled]) {\n  color: #fff;\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]) mat-icon, .mat-flat-button.mat-primary.faux-hover:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary.ng-click-active {\n  color: #fff;\n  background-color: #0279b3 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.ng-click-active mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-secondary {\n  font-weight: 400;\n}\n.mat-fab.amp-fab {\n  box-shadow: none !important;\n  background-color: #c9cccf;\n}\n.mat-fab.amp-fab mat-icon {\n  color: #fff;\n  fill: #fff;\n}\n.mat-fab.amp-fab mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab[disabled] {\n  cursor: auto !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon {\n  fill: #ccc !important;\n  color: #ccc !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon * {\n  fill: #ccc !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]), .mat-fab.amp-fab.faux-hover:not([disabled]), .mat-fab.amp-fab.mat-focused:not([disabled]) {\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) {\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n:host {\n  width: 100%;\n  background-color: #f2f2f2;\n}\n.amp-root__topbar--hide {\n  margin-top: -42px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9DOlxcZGNcXHNyYy9hcHBcXGFwcC5jb21wb25lbnQuc2NzcyIsImFwcC9DOlxcZGNcXHNyYy9hcHBcXGNvcmVcXHNjc3NcXHZhcnNcXF9jb2xvdXJzLnNjc3MiLCJhcHAvQzpcXGRjXFxzcmMvYXBwXFxjb3JlXFxzY3NzXFx2YXJzXFxfdHlwb2dyYXBoeS5zY3NzIiwiYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsImFwcC9DOlxcZGNcXHNyYy9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQTtFQUNFLGNDWW1CO0VEWG5CLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxnQkVPbUI7RUZObkIsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUdKRjtBSE1JO0VBQ0Usd0NBQUE7RUFDQSxjQ3BCZ0I7QUVnQnRCO0FITUk7RUFDRSw2QkFBQTtBR0pOO0FIT0U7RUFDRSxjQ1JxQjtBRUd6QjtBSFNBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7QUdORjtBSFNJO0VBQ0UsY0NuQm1CO0VEb0JuQix5QkM1QmU7RUQ2QmYsZUFBQTtBR1BOO0FIU007RUFDRSxhQ2ZTO0VEZ0JULGNDaEJTO0FFU2pCO0FIV0k7RUFDRSxXQ3pDUTtFRDBDUix5QkNuRFU7RURvRFYsMkJBQUE7QUdUTjtBSFdNO0VBQ0UsVUM5Q007RUQrQ04sV0MvQ007QUVzQ2Q7QUhhSTtFQUNFLFdDcERRO0VEcURSLG9DQUFBO0VBQ0EsMkJBQUE7QUdYTjtBSGFNO0VBQ0UsVUN6RE07RUQwRE4sV0MxRE07QUUrQ2Q7QUhlSTtFQUNFLFdDL0RRO0VEZ0VSLG9DQUFBO0VBQ0EsMkJBQUE7QUdiTjtBSGVNO0VBQ0UsVUNwRU07RURxRU4sV0NyRU07QUV3RGQ7QUhrQkU7RUFDRSxnQkFBQTtBR2hCSjtBSG9CQTtFQUNFLDJCQUFBO0VBS0EseUJDekVXO0FFb0RiO0FIdUJFO0VBSUUsV0MzRlU7RUQ0RlYsVUM1RlU7QUVvRWQ7QUh5Qkk7RUFDRSxVQzlGUTtBRXVFZDtBSG1DRTtFQUNFLHVCQUFBO0FHakNKO0FIa0NJO0VBQ0UscUJBQUE7RUFDQSxzQkFBQTtBR2hDTjtBSGlDTTtFQUNFLHFCQUFBO0FHL0JSO0FIcUNFO0VBQ0UseUJDaElZO0VEaUlaLDJCQUFBO0FHbkNKO0FIcUNJO0VBQ0UsVUMzSFE7RUQ0SFIsV0M1SFE7QUV5RmQ7QUhvQ007RUFDRSxVQzlITTtBRTRGZDtBSHVDRTtFQUNFLG9DQUFBO0VBQ0EsMkJBQUE7QUdyQ0o7QUh1Q0k7RUFDRSxVQ3hJUTtFRHlJUixXQ3pJUTtBRW9HZDtBSHNDTTtFQUNFLFVDM0lNO0FFdUdkO0FDOUdBO0VBQ0UsV0FBQTtFQUNBLHlCSFdvQjtBRXNHdEI7QUM3R0U7RUFDRSxpQkFBQTtBRGdISiIsImZpbGUiOiJhcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGJ1dHRvbi1mYWItd2lkdGg6IDUwcHg7XG4kYnV0dG9uLWZhYi1oZWlnaHQ6ICRidXR0b24tZmFiLXdpZHRoO1xuJGJ1dHRvbi1mYWItaWNvbi1zaXplOiAzMnB4O1xuJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsOiAyMHB4O1xuXG4ubWF0LWJ1dHRvbiB7XG4gIGNvbG9yOiAkY29sb3ItZGFya2VzdC1ncmV5O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAwO1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIGZvbnQtd2VpZ2h0OiAkZm9udC13ZWlnaHQtbm9ybWFsO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBvdXRsaW5lOiBub25lO1xuICB0cmFuc2l0aW9uOiBjb2xvciAkdHJhbnNpdGlvbi1zcGVlZDtcbiAgJjpub3QoW2Rpc2FibGVkXSkge1xuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodDtcbiAgICB9XG4gICAgJi5tYXQtZm9jdXNlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gIH1cbiAgJltkaXNhYmxlZF0ge1xuICAgIGNvbG9yOiAkY29sb3IteWV0LWFub3RoZXItZ3JleTtcbiAgfVxufVxuXG4ubWF0LWZsYXQtYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwICRic3UvMjtcbiAgdHJhbnNpdGlvbjogYWxsICR0cmFuc2l0aW9uLXNwZWVkO1xuXG4gICYubWF0LXByaW1hcnkge1xuICAgICZbZGlzYWJsZWRdLCAmLmRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiAkY29sb3IteWV0LWFub3RoZXItZ3JleTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1saWdodGVyLWdyZXk7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLW1pZC1ncmV5O1xuICAgICAgICBjb2xvcjogJGNvbG9yLW1pZC1ncmV5O1xuICAgICAgfVxuICAgIH1cblxuICAgICYubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpob3Zlcjpub3QoW2Rpc2FibGVkXSksICYuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5LWxpZ2h0ICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgICYubmctY2xpY2stYWN0aXZlIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1kYXJrICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYubWF0LXNlY29uZGFyeSB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxufVxuXG4ubWF0LWZhYi5hbXAtZmFiIHtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAvL21hcmdpbjogM3B4O1xuICAvL3dpZHRoOiAkYnV0dG9uLWZhYi13aWR0aCAhaW1wb3J0YW50O1xuICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaGVpZ2h0ICFpbXBvcnRhbnQ7XG4gIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWhlaWdodDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWlyb247XG5cbiAgbWF0LWljb24ge1xuICAgIC8vaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemU7XG4gICAgLy93aWR0aDogJGJ1dHRvbi1mYWItaWNvbi1zaXplO1xuICAgIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZTtcbiAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAqIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICB9XG4gIH1cblxuICAmLmFtcC1pY29uLXNtYWxsIHtcbiAgICBtYXQtaWNvbiB7XG4gICAgICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgICAgLy93aWR0aDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgICAgLy9saW5lLWhlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgIH1cbiAgfVxuXG4gICZbZGlzYWJsZWRdIHtcbiAgICBjdXJzb3I6IGF1dG8gIWltcG9ydGFudDtcbiAgICBtYXQtaWNvbiB7XG4gICAgICBmaWxsOiAkY29sb3ItbGlnaHQtZ3JleSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICRjb2xvci1saWdodC1ncmV5ICFpbXBvcnRhbnQ7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLWxpZ2h0LWdyZXkgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gICY6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgbWF0LWljb24ge1xuICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgICoge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodCAhaW1wb3J0YW50O1xuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgIG1hdC1pY29uIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiJGNvbG9yLXByaW1hcnk6ICMwMzliZTU7XG4kY29sb3ItcHJpbWFyeS1saWdodDogIzFhYjBmOTtcbiRjb2xvci1wcmltYXJ5LWxpZ2h0ZXI6ICMzOWIxZjM7XG4kY29sb3ItcHJpbWFyeS1saWdodGVyZXI6ICNlZGY4ZmQ7XG4kY29sb3ItcHJpbWFyeS1saWdodGVzdDogI2YyZmFmZTtcbiRjb2xvci1henp1cnJvOiAjMjZiNmVhO1xuJGNvbG9yLXByaW1hcnktZGFyazogIzAyNzliMztcbiRjb2xvci1wcmltYXJ5LWRpc2FibGVkOiAjYTNkMWYyO1xuJGNvbG9yLWJsZXU6ICMwMjg4ZDE7XG4kY29sb3Itd2hpdGU6ICNmZmY7XG4kY29sb3ItZ3JleTogIzc0Nzk4MDtcbiRjb2xvci1yb2xsaW5nLXN0b25lOiAjODA4MDgwO1xuJGNvbG9yLWxpZ2h0ZXItZ3JleTogI2U1ZTVlNTtcbiRjb2xvci1saWdodC1ncmV5OiAjY2NjO1xuJGNvbG9yLWdyZXllZDogI2RkZDtcbiRjb2xvci1saWdodGVzdC1ncmV5OiAjZjJmMmYyO1xuJGNvbG9yLWRvdmUtZ3JleTogIzY2NjY2NjtcbiRjb2xvci1ndW5tZXRhbC1ncmV5OiAjNWU2NjZmO1xuJGNvbG9yLWRhcmtlc3QtZ3JleTogIzMzMzMzMztcbiRjb2xvci1hbm90aGVyLWdyZXk6ICM5OTk7XG4kY29sb3IteWV0LWFub3RoZXItZ3JleTogI2JmYmZiZjtcbiRjb2xvci1pcm9uOiAjYzljY2NmO1xuJGNvbG9yLWdyZWVlZWV5OiAjZWVlO1xuJGNvbG9yLWRpY2stZ3JheXNvbjogI2M2YzZjNjsgXG4kY29sb3ItYWxtb3N0LWlyb246ICNjYWNjY2Y7XG4kY29sb3ItZ3JleS1vbi1ncmV5LWdyZXk6ICNkOWQ5ZDk7XG4kY29sb3ItbGlnaHQtYmFja2dyb3VuZC1ncmV5OiNmYWZhZmE7XG4kY29sb3ItamVhbi1ncmV5OiAjYjJiMmIyO1xuJGNvbG9yLXdpbGQtc2FuZDogI2Y1ZjVmNTtcbiRjb2xvci1taWQtZ3JleTogI2EyYTZhYjtcbiRjb2xvci1kYXJrLWdyZXk6ICMyZTM2NDE7XG4kY29sb3ItZ2lyZ2lvOiAjN0I4MDg1O1xuJGNvbG9yLXRoZS1za3ktaXMtZ3JleTogIzlEQTJBNztcbiRjb2xvci1ncmVveTogI2UwZTBlMDtcbiRjb2xvci1ibHVlLWdyZXk6ICNlOWVhZWI7XG4kY29sb3ItZ3JleS1mb2ZvOiAjZjBmMGYwO1xuJGNvbG9yLW1heWJlLWdyZXk6ICM5ZGEyYTI7XG4kY29sb3ItbWlkLWJsYWNrOiAjMjkzMzNmO1xuJGNvbG9yLW5lcm86ICMxRDFEMUI7XG4kY29sb3ItYmxhY2s6ICMxNzIwMmM7XG4kY29sb3ItYWJzb2x1dGUtYmxhY2s6ICMwMDA7XG4kY29sb3ItcHVycGxlLWZ1c2lvbjogI2I3NGNkOTtcbiRjb2xvci13YXJuaW5nLW9yYW5nZTogI2ZmNjYwMDtcbiRjb2xvci1pY29uLW9yYW5nZTogI2ZmOGEwMDtcbiRjb2xvci1lcnJvci1yZWQ6ICNmZjMzNjY7XG4kY29sb3ItZGFyay1yZWQ6ICNlNTIyNTM7XG4kY29sb3ItcmVkLXJlZDogI2YwMDtcbiRjb2xvci1hbm90aGVyLXJlZDogI2RkMmMwMDtcbiRjb2xvci1kYW5nZXItcmVkOiAjZjQ0MzM2O1xuJGNvbG9yLXBpbms6ICNmZjk4YjE7XG4kY29sb3ItdmFsaWQtZ3JlZW46ICM3ZWQ5MDA7XG4kY29sb3ItcHVibGlzaGVkLWdyZWVuOiAjNjZjYzAwO1xuJGNvbG9yLXN0cm9uZy1ncmVlbjogIzBhMDtcbiRjb2xvci1saWdodC1ibHVlOiAjOTlkOGYyO1xuJGNvbG9yLWxpZ2h0ZXItYmx1ZTogI2QxZWZmZTtcbiRjb2xvci1saWdodC1saWdodC1ibHVlOiAjYTZkN2VmO1xuJGNvbG9yLWRhcmstYmx1ZTogIzAzOWJlNTtcbiRjb2xvci1oeXBlcmxpbmstYmx1ZTogIzAwMDBlZTtcbiRjb2xvci13aHktZG8td2UtbmVlZC1hbm90aGVyLWJsdWU6ICNhOWUxZmQ7XG4kY29sb3ItcHJpbWFyeS03cDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC4wNyk7XG4kY29sb3ItcHJpbWFyeS0xMHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMSk7XG4kY29sb3ItcHJpbWFyeS0yMHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMik7XG4kY29sb3ItcHJpbWFyeS00MHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuNCk7XG4kY29sb3ItYmxhY2stMTBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC4xKTtcbiRjb2xvci1ibGFjay0yMHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjIpO1xuJGNvbG9yLWJsYWNrLTQwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNCk7XG4kY29sb3ItYmxhY2stNTBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC41KTtcbiRjb2xvci1ibGFjay02MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjYpO1xuJGNvbG9yLWJsYWNrLTcwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNyk7XG4kY29sb3ItYmxhY2stODBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC44KTtcbiRjb2xvci13aGl0ZS0wcDogcmdiYSgkY29sb3Itd2hpdGUsIDApO1xuJGNvbG9yLXdoaXRlLTIwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuMik7XG4kY29sb3Itd2hpdGUtNDBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC40KTtcbiRjb2xvci13aGl0ZS01MHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjUpO1xuJGNvbG9yLXdoaXRlLTgwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuOCk7XG4kY29sb3Itcm9sbGluZy1zdG9uZS0yMHA6IHJnYmEoJGNvbG9yLXJvbGxpbmctc3RvbmUsIDAuMik7XG4kY29sb3ItZ3JleWVkLTUwcDogcmdiYSgkY29sb3ItZ3JleWVkLCAwLjUpO1xuJGNvbG9yLW1pZC1ibGFjay01MHA6IHJnYmEoJGNvbG9yLW1pZC1ibGFjaywgMC41KTtcbiRjb2xvci1taWQtYmxhY2stODBwOiByZ2JhKCRjb2xvci1taWQtYmxhY2ssIDAuOCk7XG4kY29sb3ItbWF5YmUtZ3JleS0zMHA6IHJnYmEoJGNvbG9yLW1heWJlLWdyZXksIDAuMyk7XG4kY29sb3ItbWF5YmUtZ3JleS02MHA6IHJnYmEoJGNvbG9yLW1heWJlLWdyZXksIDAuNik7IiwiJGJhc2UtZm9udC1zaXplOiAxM3B4O1xuJGJmejogJGJhc2UtZm9udC1zaXplO1xuJGZvbnQtc2l6ZS14eHgtbGFyZ2U6IDMycHg7XG4kZm9udC1zaXplLXh4LWxhcmdlOiAyN3B4O1xuJGZvbnQtc2l6ZS14LWxhcmdlOiAyMnB4O1xuJGZvbnQtc2l6ZS14cC1sYXJnZTogMjRweDtcbiRmb250LXNpemUtdGl0bGU6IDE4cHg7XG4kZm9udC1zaXplLXgtdGl0bGU6IDE5cHg7XG4kZm9udC1zaXplLXh4LXRpdGxlOiAyMHB4O1xuJGZvbnQtc2l6ZS14eHgtdGl0bGU6IDIxcHg7XG4kZm9udC1zaXplLWxhcmdlOiAxNnB4O1xuJGZvbnQtc2l6ZS1hbG1vc3QtbGFyZ2U6IDE1cHg7XG4kZm9udC1zaXplLW1pZDogMTRweDtcbiRmb250LXNpemUtc21hbGw6IDEycHg7XG4kZm9udC1zaXplLXRpbnk6IDExcHg7XG4kZm9udC1zaXplLXgtdGlueTogMTBweDtcbiRmb250LXNpemUteHMtdGlueTogOS41cHg7XG5cbiRmb250LXdlaWdodC1saWdodDogMzAwO1xuJGZvbnQtd2VpZ2h0LW5vcm1hbDogNDAwO1xuJGZvbnQtd2VpZ2h0LW1lZGl1bTogNTAwO1xuJGZvbnQtd2VpZ2h0LWJvbGQ6IDcwMDtcbiIsIi5tYXQtYnV0dG9uIHtcbiAgY29sb3I6ICMzMzMzMzM7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBtaW4taGVpZ2h0OiAwO1xuICBtaW4td2lkdGg6IDA7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbjogMDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcztcbn1cbi5tYXQtYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjMWFiMGY5O1xufVxuLm1hdC1idXR0b246bm90KFtkaXNhYmxlZF0pLm1hdC1mb2N1c2VkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4ubWF0LWJ1dHRvbltkaXNhYmxlZF0ge1xuICBjb2xvcjogI2JmYmZiZjtcbn1cblxuLm1hdC1mbGF0LWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgcGFkZGluZzogMCAxMHB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnlbZGlzYWJsZWRdLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmRpc2FibGVkIHtcbiAgY29sb3I6ICNiZmJmYmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnlbZGlzYWJsZWRdIG1hdC1pY29uLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmRpc2FibGVkIG1hdC1pY29uIHtcbiAgZmlsbDogI2EyYTZhYjtcbiAgY29sb3I6ICNhMmE2YWI7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5YmU1O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeTpob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhYjBmOSAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5OmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5uZy1jbGljay1hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyNzliMyAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm5nLWNsaWNrLWFjdGl2ZSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtc2Vjb25kYXJ5IHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLm1hdC1mYWIuYW1wLWZhYiB7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M5Y2NjZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWIgbWF0LWljb24ge1xuICBjb2xvcjogI2ZmZjtcbiAgZmlsbDogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWIgbWF0LWljb24gKiB7XG4gIGZpbGw6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSB7XG4gIGN1cnNvcjogYXV0byAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYltkaXNhYmxlZF0gbWF0LWljb24ge1xuICBmaWxsOiAjY2NjICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjY2NjICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2NjYyAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzOWJlNTtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqLCAubWF0LWZhYi5hbXAtZmFiLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICosIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICoge1xuICBmaWxsOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhYjBmOSAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2ZmZjtcbn1cblxuOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbn1cblxuLmFtcC1yb290X190b3BiYXItLWhpZGUge1xuICBtYXJnaW4tdG9wOiAtNDJweDtcbn0iLCJAaW1wb3J0IFwiLi9jb3JlL2NvcmUuc2Nzc1wiO1xuXG46aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItbGlnaHRlc3QtZ3JleTtcbn1cblxuLmFtcC1yb290X190b3BiYXIge1xuICAmLS1oaWRlIHtcbiAgICBtYXJnaW4tdG9wOiAtNDJweDtcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_dc_sdk_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/dc-sdk.service */ "./src/app/api/dc-sdk.service.ts");
/* harmony import */ var _editor_editor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor/editor.service */ "./src/app/editor/editor.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");






let AppComponent = class AppComponent {
    constructor(sdkService, editor, icons, sanitizer) {
        this.sdkService = sdkService;
        this.editor = editor;
        this.icons = icons;
        this.sanitizer = sanitizer;
        this.title = 'dc-uiex-di';
        icons.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/ic-asset-delete.svg'));
    }
    get showToolbar() {
        return this.editor.previewMode !== _editor_editor_service__WEBPACK_IMPORTED_MODULE_3__["PreviewMode"].View;
    }
};
AppComponent.ctorParameters = () => [
    { type: _api_dc_sdk_service__WEBPACK_IMPORTED_MODULE_2__["DcSdkService"] },
    { type: _editor_editor_service__WEBPACK_IMPORTED_MODULE_3__["EditorService"] },
    { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconRegistry"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__["DomSanitizer"] }
];
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm2015/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _preview_preview_canvas_preview_canvas_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./preview/preview-canvas/preview-canvas.component */ "./src/app/preview/preview-canvas/preview-canvas.component.ts");
/* harmony import */ var _preview_di_preview_di_preview_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./preview/di-preview/di-preview.component */ "./src/app/preview/di-preview/di-preview.component.ts");
/* harmony import */ var _preview_mode_buttons_mode_buttons_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preview/mode-buttons/mode-buttons.component */ "./src/app/preview/mode-buttons/mode-buttons.component.ts");
/* harmony import */ var _preview_edit_toolbar_edit_toolbar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./preview/edit-toolbar/edit-toolbar.component */ "./src/app/preview/edit-toolbar/edit-toolbar.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _metadata_transform_list_transform_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./metadata/transform-list/transform-list.component */ "./src/app/metadata/transform-list/transform-list.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _preview_crop_toolbar_crop_toolbar_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./preview/crop-toolbar/crop-toolbar.component */ "./src/app/preview/crop-toolbar/crop-toolbar.component.ts");
/* harmony import */ var _preview_spinner_spinner_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./preview/spinner/spinner.component */ "./src/app/preview/spinner/spinner.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm2015/flex-layout.js");
/* harmony import */ var simplebar_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! simplebar-angular */ "./node_modules/simplebar-angular/fesm2015/simplebar-angular.js");

















let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
            _preview_preview_canvas_preview_canvas_component__WEBPACK_IMPORTED_MODULE_6__["PreviewCanvasComponent"],
            _preview_di_preview_di_preview_component__WEBPACK_IMPORTED_MODULE_7__["DiPreviewComponent"],
            _preview_mode_buttons_mode_buttons_component__WEBPACK_IMPORTED_MODULE_8__["ModeButtonsComponent"],
            _preview_edit_toolbar_edit_toolbar_component__WEBPACK_IMPORTED_MODULE_9__["EditToolbarComponent"],
            _metadata_transform_list_transform_list_component__WEBPACK_IMPORTED_MODULE_11__["TransformListComponent"],
            _preview_crop_toolbar_crop_toolbar_component__WEBPACK_IMPORTED_MODULE_13__["CropToolbarComponent"],
            _preview_spinner_spinner_component__WEBPACK_IMPORTED_MODULE_14__["SpinnerComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSliderModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSlideToggleModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTooltipModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDividerModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_15__["FlexLayoutModule"],
            simplebar_angular__WEBPACK_IMPORTED_MODULE_16__["SimplebarAngularModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/editor/di-edit-slider.ts":
/*!******************************************!*\
  !*** ./src/app/editor/di-edit-slider.ts ***!
  \******************************************/
/*! exports provided: DiEditModeButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiEditModeButton", function() { return DiEditModeButton; });
class DiEditModeButton {
    constructor(mode, name, sliders) {
        this.mode = mode;
        this.name = name;
        this.sliders = sliders;
    }
}
DiEditModeButton.ctorParameters = () => [
    { type: undefined },
    { type: String },
    { type: Array }
];


/***/ }),

/***/ "./src/app/editor/di-field.service.ts":
/*!********************************************!*\
  !*** ./src/app/editor/di-field.service.ts ***!
  \********************************************/
/*! exports provided: DiFieldService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiFieldService", function() { return DiFieldService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _api_dc_sdk_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/dc-sdk.service */ "./src/app/api/dc-sdk.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let DiFieldService = class DiFieldService {
    constructor(sdk) {
        this.sdk = sdk;
        this.fieldUpdated = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.defaultParams = [];
        this.updated = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        const db = this.updated.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounce"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(100)));
        db.subscribe(() => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const sdkInstance = yield this.sdk.getSDK();
            sdkInstance.field.setValue(this.data);
        }));
        sdk.getSDK().then((sdkInstance) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            sdkInstance.frame.startAutoResizer();
            this.stagingEnvironment = sdkInstance.stagingEnvironment;
            this.loadParams(sdkInstance.params.instance);
            this.data = yield sdkInstance.field.getValue();
            this.parseData();
            this.updateField();
        }));
    }
    loadParams(params) {
        if (params.customVSE) {
            this.stagingEnvironment = params.customVSE;
        }
        if (!params.useVSE) {
            this.stagingEnvironment = null;
        }
        this.fullRes = params.alwaysFullRes;
    }
    updateField() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.updateInProgress) {
                return;
            }
            this.updateInProgress = true;
            this.fieldUpdated.emit(this.data);
            this.updated.next(true);
            this.updateInProgress = false;
        });
    }
    getImageHost() {
        return this.stagingEnvironment || ((this.data && this.data.image) ? this.data.image.defaultHost : null);
    }
    parseData() {
        if (this.data == null) {
            // initialize the data with an empty object
            this.data = {
                crop: [0, 0, 0, 0],
                rot: 0,
                hue: 0,
                sat: 0,
                bri: 0,
                fliph: false,
                flipv: false,
                poi: { x: -1, y: -1 },
                aspectLock: 'clear',
                query: ''
            };
        }
        if (this.data.image != null && this.data.image._meta == null) {
            // image is uninitialized.
            this.data.image = null;
        }
        if (this.data.poi != null && this.data.poi.x == null) {
            // poi is uninitialized.
            this.data.poi = null;
        }
    }
    isCropActive() {
        return this.data.crop != null && this.data.crop[0] != null && this.data.crop[2] !== 0 && this.data.crop[3] !== 0;
    }
    isPOIActive() {
        return this.data.poi != null && this.data.poi.x !== -1 && this.data.poi.y !== -1;
    }
    isImageActive() {
        return this.data != null && this.data.image != null && this.data.image.name != null;
    }
    updateSliderValue(slider, value) {
        if (this.data == null) {
            return;
        }
        this.data[slider.field] = value;
        this.updateField();
    }
    getSliderValue(slider) {
        if (this.data == null) {
            return 0;
        }
        const value = this.data[slider.field];
        return (value == null) ? 0 : value;
    }
    resetDefault() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const image = this.data.image;
            this.data = null;
            this.parseData();
            this.data.image = image;
            yield this.updateField();
        });
    }
};
DiFieldService.ctorParameters = () => [
    { type: _api_dc_sdk_service__WEBPACK_IMPORTED_MODULE_2__["DcSdkService"] }
];
DiFieldService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DiFieldService);



/***/ }),

/***/ "./src/app/editor/di-image.service.ts":
/*!********************************************!*\
  !*** ./src/app/editor/di-image.service.ts ***!
  \********************************************/
/*! exports provided: DiImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiImageService", function() { return DiImageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _di_field_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./di-field.service */ "./src/app/editor/di-field.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");




/**
 * Handles image related fields in the content item, such as crop and point of interest.
 * These require information such as the image width and height, therefore the image must
 * be loaded to process the fields.
 */
let DiImageService = class DiImageService {
    constructor(field, http) {
        this.field = field;
        this.http = http;
        this.imageWidth = 1;
        this.imageHeight = 1;
        this.imageSizeMultiplier = [1, 1];
        this.imageReady = false;
        this.imageParams = '';
        this.imageSizeLimit = 1000;
        this.imageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        if (field.data != null) {
            this.parseDataChange(field.data);
        }
        field.fieldUpdated.subscribe(data => {
            this.parseDataChange(data);
        });
    }
    buildImageSrc(image) {
        return `https://${this.field.getImageHost()}/i/${image.endpoint}/${encodeURIComponent(image.name)}`;
    }
    loadImage(data) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.imageReady = false;
            this.imageError = null;
            if (data.image != null) {
                let defaultParams = '';
                try {
                    this.imageMeta = (yield this.http.get(this.buildImageSrc(this.field.data.image) + '.json').toPromise());
                    if (this.imageMeta.status === 'error') {
                        throw new Error(this.imageMeta.errorMsg);
                    }
                    this.imageSizeMultiplier = [this.imageMeta.width / this.imageWidth, this.imageMeta.height / this.imageHeight];
                    this.imageWidth = this.imageMeta.width;
                    this.imageHeight = this.imageMeta.height;
                    // limit size of preview image to a reasonable scale
                    if (!this.field.fullRes) {
                        if (this.imageWidth > this.imageHeight) {
                            if (this.imageWidth > this.imageSizeLimit) {
                                defaultParams = `?w=${this.imageSizeLimit}`;
                            }
                        }
                        else {
                            if (this.imageHeight > this.imageSizeLimit) {
                                defaultParams = `?h=${this.imageSizeLimit}`;
                            }
                        }
                    }
                }
                catch (_a) {
                    console.log('Could not load image metadata... Using width/height from image.');
                    this.imageMeta = null;
                    this.imageSizeMultiplier = [1, 1];
                }
                const image = yield this.imageUIProvider();
                image.onload = this.imageLoaded.bind(this);
                image.onerror = (event) => {
                    this.imageError = 'Could not load image!';
                };
                this.imageParams = defaultParams;
                image.src = this.buildImageSrc(data.image) + defaultParams;
                this.image = image;
            }
            else {
                this.image = null;
            }
        });
    }
    imageLoaded(event) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.imageMeta == null) {
                this.imageWidth = event.target.width;
                this.imageHeight = event.target.height;
            }
            this.imageReady = true;
            const data = this.field.data;
            if (this.poiPx == null && this.field.isPOIActive()) {
                const bound = this.cropPx || this.getRotatedBounds();
                this.poiPx = [bound[0] + bound[2] * data.poi.x, bound[1] + bound[3] * data.poi.y];
            }
            this.imageChanged.emit(this.image);
        });
    }
    rotatePoint(point, angle) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        return [cos * point[0] + sin * point[1], cos * point[1] - sin * point[0]];
    }
    getRotatedBounds() {
        const hw = this.imageWidth / 2;
        const hh = this.imageHeight / 2;
        let angle = this.field.data.rot;
        if (angle == null) {
            angle = 0;
        }
        angle = (angle / 180) * Math.PI;
        const corner1 = this.rotatePoint([hw, hh], angle);
        const corner2 = this.rotatePoint([hw, -hh], angle);
        const newHalfWidth = Math.max(Math.abs(corner1[0]), Math.abs(corner2[0]));
        const newHalfHeight = Math.max(Math.abs(corner1[1]), Math.abs(corner2[1]));
        return [hw - newHalfWidth, hh - newHalfHeight, newHalfWidth * 2, newHalfHeight * 2];
    }
    parseDataChange(data) {
        if (this.lastImage !== data.image) {
            if (this.lastImage != null) {
                // clear data from the last image.
                data.crop = [0, 0, 0, 0];
                data.poi = { x: -1, y: -1 };
                this.poiPx = null;
            }
            this.loadImage(data);
            this.lastImage = data.image;
        }
        if (this.field.isCropActive()) {
            // crop must be initialized
            this.cropPx = data.crop;
        }
        else {
            this.cropPx = null;
        }
        if (this.imageReady && this.field.isPOIActive()) {
            // initialize point of interest
            const bounds = this.cropPx || this.getRotatedBounds();
            this.poiPx = [bounds[0] + bounds[2] * data.poi.x, bounds[1] + bounds[3] * data.poi.y];
        }
        else {
            this.poiPx = null;
        }
    }
    saveCrop() {
        const data = this.field.data;
        for (let i = 0; i < 4; i++) {
            this.cropPx[i] = Math.round(this.cropPx[i]);
        }
        data.crop = this.cropPx;
        this.savePOI(true);
        this.field.updateField();
    }
    savePOI(withoutSave) {
        if (this.poiPx == null) {
            return;
        }
        const data = this.field.data;
        // bound the point of interest within the crop area
        const bounds = this.cropPx || this.getRotatedBounds();
        this.poiPx[0] = Math.max(bounds[0], Math.min(bounds[0] + bounds[2], this.poiPx[0]));
        this.poiPx[1] = Math.max(bounds[1], Math.min(bounds[1] + bounds[3], this.poiPx[1]));
        // transform into % terms
        data.poi = {
            x: (this.poiPx[0] - bounds[0]) / bounds[2],
            y: (this.poiPx[1] - bounds[1]) / bounds[3]
        };
        if (!withoutSave) {
            this.field.updateField();
        }
    }
};
DiImageService.ctorParameters = () => [
    { type: _di_field_service__WEBPACK_IMPORTED_MODULE_2__["DiFieldService"] },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"] }
];
DiImageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DiImageService);



/***/ }),

/***/ "./src/app/editor/di-preview-image.ts":
/*!********************************************!*\
  !*** ./src/app/editor/di-preview-image.ts ***!
  \********************************************/
/*! exports provided: DiPreviewImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiPreviewImage", function() { return DiPreviewImage; });
class DiPreviewImage {
    constructor(url, width, height, changeFunc) {
        this.changeFunc = changeFunc;
        this.url = url;
        this.width = width;
        this.height = height;
        this.beginLoading();
    }
    beginLoading() {
        this.image = new Image();
        this.image.onload = () => {
            this.displayImage = this;
            this.changeFunc(this);
        };
        this.image.onerror = () => {
            this.error = 'Not available.';
            if (this.displayImage) {
                this.displayImage.error = 'Not available.';
            }
            this.changeFunc(this);
        };
        this.image.src = this.url;
        this.image.style.width = this.width + 'px';
        this.image.style.height = this.height + 'px';
    }
    preferred() {
        return (this.displayImage == null) ? this : this.displayImage;
    }
    preferredImage() {
        if (this.displayImage == null && this.error) {
            return null;
        }
        return this.preferred().image;
    }
}
DiPreviewImage.ctorParameters = () => [
    { type: String },
    { type: Number },
    { type: Number },
    { type: Function }
];


/***/ }),

/***/ "./src/app/editor/di-preview.service.ts":
/*!**********************************************!*\
  !*** ./src/app/editor/di-preview.service.ts ***!
  \**********************************************/
/*! exports provided: DiTransformationSegment, DiPreviewService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiTransformationSegment", function() { return DiTransformationSegment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiPreviewService", function() { return DiPreviewService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _di_field_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./di-field.service */ "./src/app/editor/di-field.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _di_image_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./di-image.service */ "./src/app/editor/di-image.service.ts");
/* harmony import */ var _di_preview_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./di-preview-image */ "./src/app/editor/di-preview-image.ts");







class DiTransformationSegment {
    constructor(name, query, fields, defaults) {
        this.name = name;
        this.query = [query];
        this.fields = fields;
        this.defaults = defaults;
    }
    queryString() {
        return this.query.join('&');
    }
}
DiTransformationSegment.ctorParameters = () => [
    { type: String },
    { type: String },
    { type: Array },
    { type: Array }
];
let DiPreviewService = class DiPreviewService {
    constructor(field, image) {
        this.field = field;
        this.image = image;
        this.previews = [];
        this.transformations = [];
        this.previewLoaded = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.transformationsChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.updated = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        field.fieldUpdated.subscribe(data => {
            this.updateDiQuery();
        });
        image.imageChanged.subscribe(result => {
            this.updateDiQuery();
        });
        const db = this.updated.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounce"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(100)));
        db.subscribe(() => {
            this.updateDiPreview();
        });
    }
    decimalRound(value, mul) {
        return Math.round(value * mul) / mul;
    }
    addSegment(commands, name, query, field, defaultValue) {
        let elem = commands.find((trans) => trans.name === name);
        if (elem == null) {
            elem = new DiTransformationSegment(name, query, [field], [defaultValue]);
            commands.push(elem);
        }
        else {
            if (query != null) {
                elem.query.push(query);
            }
            elem.fields.push(field);
            elem.defaults.push(defaultValue);
        }
        return elem;
    }
    updatePreviews(previews) {
        // track which previews updated, and the last "loaded" image for each preview.
        // this lets us show the last preview if an image fails to load
        if (this.previews != null && this.previews.length === previews.length) {
            // assume the preview arrangement is the same, for now.
            // copy over the "displayImage" pointer. when an image loads, this sets to itself.
            for (let i = 0; i < previews.length; i++) {
                previews[i].displayImage = this.previews[i].displayImage;
            }
        }
        this.previews = previews;
    }
    previewChange(preview) {
        this.previewLoaded.emit(preview);
    }
    updateDiQuery() {
        if (!this.image.imageReady) {
            return;
        }
        const queryCommands = [];
        const data = this.field.data;
        if (data.rot != null && data.rot !== 0) {
            this.addSegment(queryCommands, 'Rotate', `protate=${data.rot}`, 'rot');
        }
        if (data.hue != null && data.hue !== 0) {
            this.addSegment(queryCommands, 'HSB', `hue=${data.hue * (100 / 180)}`, 'hue');
        }
        if (data.sat != null && data.sat !== 0) {
            this.addSegment(queryCommands, 'HSB', `sat=${data.sat}`, 'sat');
        }
        if (data.bri != null && data.bri !== 0) {
            this.addSegment(queryCommands, 'HSB', `bri=${data.bri}`, 'bri');
        }
        if (data.fliph) {
            this.addSegment(queryCommands, 'Flip', `fliph=true`, 'fliph', false);
        }
        if (data.flipv) {
            this.addSegment(queryCommands, 'Flip', `flipv=true`, 'flipv', false);
        }
        if (this.field.isPOIActive()) {
            this.addSegment(queryCommands, 'Point of Interest', `poi=${this.decimalRound(data.poi.x, 10000)},${this.decimalRound(data.poi.y, 10000)},0,0&scaleFit=poi`, 'poi', { x: -1, y: -1 });
        }
        if (this.field.isCropActive()) {
            const crop = data.crop;
            const alwaysCrop = true; // prefer crop over pcrop right now
            if (alwaysCrop || (data.rot != null && data.rot !== 0)) {
                // cropping after a rotation. protate then crop. if the user wants to crop after this, they should use ecrop.
                // rotating resizes the image so we're going to want to use percentage calculations to align crops to the center
                const bounds = this.image.getRotatedBounds();
                const xOff = Math.round((this.image.imageWidth / 2) - crop[0]);
                const yOff = Math.round((this.image.imageHeight / 2) - crop[1]);
                const cropPercent = [
                    this.decimalRound((crop[0] - bounds[0]) / bounds[2] * 100, 100),
                    this.decimalRound((crop[1] - bounds[1]) / bounds[3] * 100, 100),
                    this.decimalRound(crop[2] / bounds[2] * 100, 100),
                    this.decimalRound(crop[3] / bounds[3] * 100, 100),
                ];
                this.addSegment(queryCommands, 'Crop', `crop={${cropPercent[0]}%},{${cropPercent[1]}%},{${cropPercent[2]}%},{${cropPercent[3]}%}`, 'crop', [0, 0, 0, 0]);
            }
            else {
                // cropping with no rotation (pcrop)
                this.addSegment(queryCommands, 'Crop', `pcrop=${Math.round(crop[0])},${Math.round(crop[1])},${Math.round(crop[2])},${Math.round(crop[3])}`, 'crop', [0, 0, 0, 0]);
            }
            this.addSegment(queryCommands, 'Crop', null, 'aspectLock', 'clear');
        }
        this.transformations = queryCommands;
        this.field.data.query = queryCommands.map(command => command.queryString()).join('&');
        this.transformationsChanged.emit(this.transformations);
        this.updated.next(true);
    }
    getCustomQueryURL(query) {
        const data = this.field.data;
        const image = data.image;
        if (image == null) {
            return null;
        }
        const params = ((this.image.imageParams.length > 0) ? (this.image.imageParams + '&' + query) : ('?' + query));
        return `http://${this.field.getImageHost()}/i/${image.endpoint}/${encodeURIComponent(image.name)}` + params;
    }
    updateDiPreview() {
        const data = this.field.data;
        const bounds = this.image.getRotatedBounds();
        const image = data.image;
        if (image == null) {
            this.previews = null;
            return;
        }
        const previewSize = 141;
        const previewPoi = (data.rot != null && data.rot !== 0) || this.field.isPOIActive();
        const baseQuery = `http://${this.field.getImageHost()}/i/${image.endpoint}/${encodeURIComponent(image.name)}?` + data.query;
        const func = this.previewChange.bind(this);
        let previews;
        if (previewPoi) {
            previews = [];
            previews.push(new _di_preview_image__WEBPACK_IMPORTED_MODULE_6__["DiPreviewImage"](baseQuery + `&sm=aspect&aspect=1:1&w=${previewSize}`, previewSize, previewSize, func));
            previews.push(new _di_preview_image__WEBPACK_IMPORTED_MODULE_6__["DiPreviewImage"](baseQuery + `&sm=aspect&aspect=2:3&h=${previewSize}`, previewSize * 2 / 3, previewSize, func));
            previews.push(new _di_preview_image__WEBPACK_IMPORTED_MODULE_6__["DiPreviewImage"](baseQuery + `&sm=aspect&aspect=3:2&w=${previewSize}`, previewSize, previewSize * 2 / 3, func));
        }
        else {
            const crop = (this.image.cropPx == null) ? bounds : this.image.cropPx;
            let width = previewSize;
            let height = previewSize * crop[3] / crop[2];
            if (height > previewSize) {
                width /= height / previewSize;
                height /= height / previewSize;
            }
            const requestWidth = Math.round(width * bounds[2] / crop[2]);
            const requestHeight = Math.round(height * bounds[3] / crop[3]);
            previews = [new _di_preview_image__WEBPACK_IMPORTED_MODULE_6__["DiPreviewImage"](baseQuery + `&w=${requestWidth}&h=${requestHeight}`, width, height, func)];
        }
        this.updatePreviews(previews);
    }
};
DiPreviewService.ctorParameters = () => [
    { type: _di_field_service__WEBPACK_IMPORTED_MODULE_2__["DiFieldService"] },
    { type: _di_image_service__WEBPACK_IMPORTED_MODULE_5__["DiImageService"] }
];
DiPreviewService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DiPreviewService);



/***/ }),

/***/ "./src/app/editor/editor.service.ts":
/*!******************************************!*\
  !*** ./src/app/editor/editor.service.ts ***!
  \******************************************/
/*! exports provided: PreviewMode, EditorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewMode", function() { return PreviewMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorService", function() { return EditorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _di_field_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./di-field.service */ "./src/app/editor/di-field.service.ts");
/* harmony import */ var _api_dc_sdk_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/dc-sdk.service */ "./src/app/api/dc-sdk.service.ts");
/* harmony import */ var _di_image_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./di-image.service */ "./src/app/editor/di-image.service.ts");





var PreviewMode;
(function (PreviewMode) {
    PreviewMode[PreviewMode["View"] = 0] = "View";
    PreviewMode[PreviewMode["EditCrop"] = 1] = "EditCrop";
    PreviewMode[PreviewMode["EditRotate"] = 2] = "EditRotate";
    PreviewMode[PreviewMode["EditHSV"] = 3] = "EditHSV";
    PreviewMode[PreviewMode["EditFlip"] = 4] = "EditFlip";
    PreviewMode[PreviewMode["EditScale"] = 5] = "EditScale";
    PreviewMode[PreviewMode["POI"] = 6] = "POI";
})(PreviewMode || (PreviewMode = {}));
let EditorService = class EditorService {
    constructor(field, sdkService, image) {
        this.field = field;
        this.sdkService = sdkService;
        this.image = image;
        this.previewMode = PreviewMode.View;
        this.modeChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.entered = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    modeRequest(mode) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const needBackup = this.previewMode === PreviewMode.View;
            switch (mode) {
                case 'view':
                    this.previewMode = PreviewMode.View;
                    break;
                case 'swap':
                    this.switchImage();
                    break;
                case 'edit':
                    this.previewMode = PreviewMode.EditCrop;
                    this.entered.emit(true);
                    if (needBackup) {
                        this.backup();
                    }
                    break;
                case 'poi':
                    this.previewMode = PreviewMode.POI;
                    if (needBackup) {
                        this.backup();
                    }
                    break;
                case 'delete':
                    yield this.field.resetDefault();
                    this.field.data.image = null;
                    this.previewMode = PreviewMode.View;
                    this.field.updateField();
                    break;
            }
            this.modeChange.emit(this.previewMode);
        });
    }
    backup() {
        // todo: better deep copy?
        this.cancelBackup = JSON.parse(JSON.stringify(this.field.data));
    }
    cancelChanges() {
        const image = this.field.data.image;
        this.field.data = this.cancelBackup;
        this.field.data.image = image;
        this.field.updateField();
    }
    switchImage() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const sdk = yield this.sdkService.getSDK();
            let result;
            try {
                result = yield sdk.mediaLink.getImage();
            }
            catch (err) {
                // decided against switching the image.
                return;
            }
            yield this.field.resetDefault();
            this.field.data.image = result;
            yield this.field.updateField();
            this.image.loadImage(this.field.data);
            this.image.parseDataChange(this.field.data);
            yield this.field.updateField();
            this.modeRequest('edit');
        });
    }
    setMode(mode) {
        this.previewMode = mode;
        this.modeChange.emit(this.previewMode);
    }
};
EditorService.ctorParameters = () => [
    { type: _di_field_service__WEBPACK_IMPORTED_MODULE_2__["DiFieldService"] },
    { type: _api_dc_sdk_service__WEBPACK_IMPORTED_MODULE_3__["DcSdkService"] },
    { type: _di_image_service__WEBPACK_IMPORTED_MODULE_4__["DiImageService"] }
];
EditorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], EditorService);



/***/ }),

/***/ "./src/app/metadata/transform-list/transform-list.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/metadata/transform-list/transform-list.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".amp-transform-list {\n  width: 100%;\n  table-layout: fixed;\n}\n.amp-transform-list__remove {\n  width: 32px;\n}\n.amp-transform-list__name {\n  max-width: 220px;\n  width: 20%;\n  min-width: 100px;\n}\n.amp-transform-list__query {\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.amp-transform-list ::ng-deep .mat-row {\n  height: 32px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tZXRhZGF0YS90cmFuc2Zvcm0tbGlzdC9DOlxcZGNcXHNyYy9hcHBcXG1ldGFkYXRhXFx0cmFuc2Zvcm0tbGlzdFxcdHJhbnNmb3JtLWxpc3QuY29tcG9uZW50LnNjc3MiLCJhcHAvbWV0YWRhdGEvdHJhbnNmb3JtLWxpc3QvdHJhbnNmb3JtLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7QUNDRjtBRENFO0VBQ0UsV0FBQTtBQ0NKO0FERUU7RUFDRSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQ0FKO0FER0U7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FDREo7QURJRTtFQUNFLFlBQUE7QUNGSiIsImZpbGUiOiJhcHAvbWV0YWRhdGEvdHJhbnNmb3JtLWxpc3QvdHJhbnNmb3JtLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYW1wLXRyYW5zZm9ybS1saXN0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG5cbiAgJl9fcmVtb3ZlIHtcbiAgICB3aWR0aDogMzJweDtcbiAgfVxuXG4gICZfX25hbWUge1xuICAgIG1heC13aWR0aDogMjIwcHg7XG4gICAgd2lkdGg6IDIwJTtcbiAgICBtaW4td2lkdGg6IDEwMHB4O1xuICB9XG5cbiAgJl9fcXVlcnkge1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIDo6bmctZGVlcCAubWF0LXJvdyB7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICB9XG59XG4iLCIuYW1wLXRyYW5zZm9ybS1saXN0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIHRhYmxlLWxheW91dDogZml4ZWQ7XG59XG4uYW1wLXRyYW5zZm9ybS1saXN0X19yZW1vdmUge1xuICB3aWR0aDogMzJweDtcbn1cbi5hbXAtdHJhbnNmb3JtLWxpc3RfX25hbWUge1xuICBtYXgtd2lkdGg6IDIyMHB4O1xuICB3aWR0aDogMjAlO1xuICBtaW4td2lkdGg6IDEwMHB4O1xufVxuLmFtcC10cmFuc2Zvcm0tbGlzdF9fcXVlcnkge1xuICB3aWR0aDogYXV0bztcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG4uYW1wLXRyYW5zZm9ybS1saXN0IDo6bmctZGVlcCAubWF0LXJvdyB7XG4gIGhlaWdodDogMzJweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/metadata/transform-list/transform-list.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/metadata/transform-list/transform-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: TransformListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformListComponent", function() { return TransformListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_editor_di_preview_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/editor/di-preview.service */ "./src/app/editor/di-preview.service.ts");
/* harmony import */ var src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/editor/di-field.service */ "./src/app/editor/di-field.service.ts");




let TransformListComponent = class TransformListComponent {
    constructor(di, field) {
        this.di = di;
        this.field = field;
        this.displayedColumns = ['name', 'query', 'fields'];
    }
    ngOnInit() {
    }
    clearTransform(transformation) {
        const data = this.field.data;
        for (let i = 0; i < transformation.fields.length; i++) {
            if (transformation.defaults && transformation.defaults[i] !== undefined) {
                data[transformation.fields[i]] = transformation.defaults[i];
            }
            else {
                data[transformation.fields[i]] = 0;
            }
        }
        this.field.updateField();
        this.di.updateDiPreview();
    }
};
TransformListComponent.ctorParameters = () => [
    { type: src_app_editor_di_preview_service__WEBPACK_IMPORTED_MODULE_2__["DiPreviewService"] },
    { type: src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_3__["DiFieldService"] }
];
TransformListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-transform-list',
        template: __webpack_require__(/*! raw-loader!./transform-list.component.html */ "./node_modules/raw-loader/index.js!./src/app/metadata/transform-list/transform-list.component.html"),
        styles: [__webpack_require__(/*! ./transform-list.component.scss */ "./src/app/metadata/transform-list/transform-list.component.scss")]
    })
], TransformListComponent);



/***/ }),

/***/ "./src/app/preview/crop-toolbar/crop-toolbar.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/preview/crop-toolbar/crop-toolbar.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button {\n  color: #333333;\n  text-transform: none;\n  min-height: 0;\n  min-width: 0;\n  line-height: normal;\n  margin: 0;\n  font-weight: 400;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  outline: none;\n  transition: color 0.3s;\n}\n.mat-button:not([disabled]):hover {\n  background-color: transparent !important;\n  color: #1ab0f9;\n}\n.mat-button:not([disabled]).mat-focused {\n  background-color: transparent;\n}\n.mat-button[disabled] {\n  color: #bfbfbf;\n}\n.mat-flat-button {\n  border-radius: 3px;\n  padding: 0 10px;\n  transition: all 0.3s;\n}\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-primary.disabled {\n  color: #bfbfbf;\n  background-color: #e5e5e5;\n  cursor: default;\n}\n.mat-flat-button.mat-primary[disabled] mat-icon, .mat-flat-button.mat-primary.disabled mat-icon {\n  fill: #a2a6ab;\n  color: #a2a6ab;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) {\n  color: #fff;\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]), .mat-flat-button.mat-primary.faux-hover:not([disabled]) {\n  color: #fff;\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]) mat-icon, .mat-flat-button.mat-primary.faux-hover:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary.ng-click-active {\n  color: #fff;\n  background-color: #0279b3 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.ng-click-active mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-secondary {\n  font-weight: 400;\n}\n.mat-fab.amp-fab {\n  box-shadow: none !important;\n  background-color: #c9cccf;\n}\n.mat-fab.amp-fab mat-icon {\n  color: #fff;\n  fill: #fff;\n}\n.mat-fab.amp-fab mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab[disabled] {\n  cursor: auto !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon {\n  fill: #ccc !important;\n  color: #ccc !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon * {\n  fill: #ccc !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]), .mat-fab.amp-fab.faux-hover:not([disabled]), .mat-fab.amp-fab.mat-focused:not([disabled]) {\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) {\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n:host {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  position: relative;\n  background-color: white;\n  z-index: 1;\n  border-bottom: 1px solid #ccc;\n}\n.amp-crop-toolbar__label {\n  font-size: 12px;\n  white-space: nowrap;\n  text-align: right;\n  padding-right: 2px;\n  padding-left: 15px;\n  transition: 0.5s color;\n}\n.amp-crop-toolbar__label--active {\n  color: #039be5;\n}\n.amp-crop-toolbar__label--short {\n  display: none;\n}\n@media only screen and (max-width: 670px) {\n  .amp-crop-toolbar__label--full {\n    display: none;\n  }\n  .amp-crop-toolbar__label--short {\n    display: inline;\n  }\n}\nmat-form-field {\n  flex: 1;\n  margin: 6px;\n}\n::ng-deep .mat-form-field-wrapper {\n  padding: 0 !important;\n}\n::ng-deep .mat-form-field-underline {\n  bottom: 0 !important;\n}\n::ng-deep .mat-form-field-infix {\n  width: auto;\n  border: 0;\n  margin-top: -2px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wcmV2aWV3L2Nyb3AtdG9vbGJhci9DOlxcZGNcXHNyYy9hcHBcXHByZXZpZXdcXGNyb3AtdG9vbGJhclxcY3JvcC10b29sYmFyLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvY3JvcC10b29sYmFyL0M6XFxkY1xcc3JjL2FwcFxcY29yZVxcc2Nzc1xcdmFyc1xcX2NvbG91cnMuc2NzcyIsImFwcC9wcmV2aWV3L2Nyb3AtdG9vbGJhci9DOlxcZGNcXHNyYy9hcHBcXGNvcmVcXHNjc3NcXHZhcnNcXF90eXBvZ3JhcGh5LnNjc3MiLCJhcHAvcHJldmlldy9jcm9wLXRvb2xiYXIvY3JvcC10b29sYmFyLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvY3JvcC10b29sYmFyL0M6XFxkY1xcc3JjL3N0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0VBQ0UsY0NZbUI7RURYbkIsb0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGdCRU9tQjtFRk5uQixnQkFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBR0pGO0FITUk7RUFDRSx3Q0FBQTtFQUNBLGNDcEJnQjtBRWdCdEI7QUhNSTtFQUNFLDZCQUFBO0FHSk47QUhPRTtFQUNFLGNDUnFCO0FFR3pCO0FIU0E7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtBR05GO0FIU0k7RUFDRSxjQ25CbUI7RURvQm5CLHlCQzVCZTtFRDZCZixlQUFBO0FHUE47QUhTTTtFQUNFLGFDZlM7RURnQlQsY0NoQlM7QUVTakI7QUhXSTtFQUNFLFdDekNRO0VEMENSLHlCQ25EVTtFRG9EViwyQkFBQTtBR1ROO0FIV007RUFDRSxVQzlDTTtFRCtDTixXQy9DTTtBRXNDZDtBSGFJO0VBQ0UsV0NwRFE7RURxRFIsb0NBQUE7RUFDQSwyQkFBQTtBR1hOO0FIYU07RUFDRSxVQ3pETTtFRDBETixXQzFETTtBRStDZDtBSGVJO0VBQ0UsV0MvRFE7RURnRVIsb0NBQUE7RUFDQSwyQkFBQTtBR2JOO0FIZU07RUFDRSxVQ3BFTTtFRHFFTixXQ3JFTTtBRXdEZDtBSGtCRTtFQUNFLGdCQUFBO0FHaEJKO0FIb0JBO0VBQ0UsMkJBQUE7RUFLQSx5QkN6RVc7QUVvRGI7QUh1QkU7RUFJRSxXQzNGVTtFRDRGVixVQzVGVTtBRW9FZDtBSHlCSTtFQUNFLFVDOUZRO0FFdUVkO0FIbUNFO0VBQ0UsdUJBQUE7QUdqQ0o7QUhrQ0k7RUFDRSxxQkFBQTtFQUNBLHNCQUFBO0FHaENOO0FIaUNNO0VBQ0UscUJBQUE7QUcvQlI7QUhxQ0U7RUFDRSx5QkNoSVk7RURpSVosMkJBQUE7QUduQ0o7QUhxQ0k7RUFDRSxVQzNIUTtFRDRIUixXQzVIUTtBRXlGZDtBSG9DTTtFQUNFLFVDOUhNO0FFNEZkO0FIdUNFO0VBQ0Usb0NBQUE7RUFDQSwyQkFBQTtBR3JDSjtBSHVDSTtFQUNFLFVDeElRO0VEeUlSLFdDeklRO0FFb0dkO0FIc0NNO0VBQ0UsVUMzSU07QUV1R2Q7QUM5R0E7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSw2QkFBQTtBRGlIRjtBQzlHQTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtFQUVBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FEZ0hGO0FDOUdFO0VBQ0UsY0h0Qlk7QUVzSWhCO0FDN0dFO0VBQ0UsYUFBQTtBRCtHSjtBQzVHRTtFQUNFO0lBQ0UsYUFBQTtFRDhHSjtFQzNHRTtJQUNFLGVBQUE7RUQ2R0o7QUFDRjtBQ3hHQTtFQUNFLE9BQUE7RUFDQSxXQUFBO0FEMkdGO0FDeEdBO0VBQ0UscUJBQUE7QUQyR0Y7QUN4R0E7RUFDRSxvQkFBQTtBRDJHRjtBQ3hHQTtFQUNFLFdBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUQyR0YiLCJmaWxlIjoiYXBwL3ByZXZpZXcvY3JvcC10b29sYmFyL2Nyb3AtdG9vbGJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRidXR0b24tZmFiLXdpZHRoOiA1MHB4O1xuJGJ1dHRvbi1mYWItaGVpZ2h0OiAkYnV0dG9uLWZhYi13aWR0aDtcbiRidXR0b24tZmFiLWljb24tc2l6ZTogMzJweDtcbiRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDogMjBweDtcblxuLm1hdC1idXR0b24ge1xuICBjb2xvcjogJGNvbG9yLWRhcmtlc3QtZ3JleTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIG1pbi13aWR0aDogMDtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgbWFyZ2luOiAwO1xuICBmb250LXdlaWdodDogJGZvbnQtd2VpZ2h0LW5vcm1hbDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgJHRyYW5zaXRpb24tc3BlZWQ7XG4gICY6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogJGNvbG9yLXByaW1hcnktbGlnaHQ7XG4gICAgfVxuICAgICYubWF0LWZvY3VzZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICB9XG4gICZbZGlzYWJsZWRdIHtcbiAgICBjb2xvcjogJGNvbG9yLXlldC1hbm90aGVyLWdyZXk7XG4gIH1cbn1cblxuLm1hdC1mbGF0LWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgcGFkZGluZzogMCAkYnN1LzI7XG4gIHRyYW5zaXRpb246IGFsbCAkdHJhbnNpdGlvbi1zcGVlZDtcblxuICAmLm1hdC1wcmltYXJ5IHtcbiAgICAmW2Rpc2FibGVkXSwgJi5kaXNhYmxlZCB7XG4gICAgICBjb2xvcjogJGNvbG9yLXlldC1hbm90aGVyLWdyZXk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItbGlnaHRlci1ncmV5O1xuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci1taWQtZ3JleTtcbiAgICAgICAgY29sb3I6ICRjb2xvci1taWQtZ3JleTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgICY6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodCAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm5nLWNsaWNrLWFjdGl2ZSB7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnktZGFyayAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLm1hdC1zZWNvbmRhcnkge1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIH1cbn1cblxuLm1hdC1mYWIuYW1wLWZhYiB7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgLy9tYXJnaW46IDNweDtcbiAgLy93aWR0aDogJGJ1dHRvbi1mYWItd2lkdGggIWltcG9ydGFudDtcbiAgLy9oZWlnaHQ6ICRidXR0b24tZmFiLWhlaWdodCAhaW1wb3J0YW50O1xuICAvL2xpbmUtaGVpZ2h0OiAkYnV0dG9uLWZhYi1oZWlnaHQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1pcm9uO1xuXG4gIG1hdC1pY29uIHtcbiAgICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplO1xuICAgIC8vd2lkdGg6ICRidXR0b24tZmFiLWljb24tc2l6ZTtcbiAgICAvL2xpbmUtaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemU7XG4gICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgKiB7XG4gICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgfVxuICB9XG5cbiAgJi5hbXAtaWNvbi1zbWFsbCB7XG4gICAgbWF0LWljb24ge1xuICAgICAgLy9oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDtcbiAgICAgIC8vd2lkdGg6ICRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDtcbiAgICAgIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDtcbiAgICB9XG4gIH1cblxuICAmW2Rpc2FibGVkXSB7XG4gICAgY3Vyc29yOiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgbWF0LWljb24ge1xuICAgICAgZmlsbDogJGNvbG9yLWxpZ2h0LWdyZXkgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAkY29sb3ItbGlnaHQtZ3JleSAhaW1wb3J0YW50O1xuICAgICAgKiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci1saWdodC1ncmV5ICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAmOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgJi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSwgJi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgIG1hdC1pY29uIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICY6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnktbGlnaHQgIWltcG9ydGFudDtcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICBtYXQtaWNvbiB7XG4gICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgKiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIiRjb2xvci1wcmltYXJ5OiAjMDM5YmU1O1xuJGNvbG9yLXByaW1hcnktbGlnaHQ6ICMxYWIwZjk7XG4kY29sb3ItcHJpbWFyeS1saWdodGVyOiAjMzliMWYzO1xuJGNvbG9yLXByaW1hcnktbGlnaHRlcmVyOiAjZWRmOGZkO1xuJGNvbG9yLXByaW1hcnktbGlnaHRlc3Q6ICNmMmZhZmU7XG4kY29sb3ItYXp6dXJybzogIzI2YjZlYTtcbiRjb2xvci1wcmltYXJ5LWRhcms6ICMwMjc5YjM7XG4kY29sb3ItcHJpbWFyeS1kaXNhYmxlZDogI2EzZDFmMjtcbiRjb2xvci1ibGV1OiAjMDI4OGQxO1xuJGNvbG9yLXdoaXRlOiAjZmZmO1xuJGNvbG9yLWdyZXk6ICM3NDc5ODA7XG4kY29sb3Itcm9sbGluZy1zdG9uZTogIzgwODA4MDtcbiRjb2xvci1saWdodGVyLWdyZXk6ICNlNWU1ZTU7XG4kY29sb3ItbGlnaHQtZ3JleTogI2NjYztcbiRjb2xvci1ncmV5ZWQ6ICNkZGQ7XG4kY29sb3ItbGlnaHRlc3QtZ3JleTogI2YyZjJmMjtcbiRjb2xvci1kb3ZlLWdyZXk6ICM2NjY2NjY7XG4kY29sb3ItZ3VubWV0YWwtZ3JleTogIzVlNjY2ZjtcbiRjb2xvci1kYXJrZXN0LWdyZXk6ICMzMzMzMzM7XG4kY29sb3ItYW5vdGhlci1ncmV5OiAjOTk5O1xuJGNvbG9yLXlldC1hbm90aGVyLWdyZXk6ICNiZmJmYmY7XG4kY29sb3ItaXJvbjogI2M5Y2NjZjtcbiRjb2xvci1ncmVlZWVleTogI2VlZTtcbiRjb2xvci1kaWNrLWdyYXlzb246ICNjNmM2YzY7IFxuJGNvbG9yLWFsbW9zdC1pcm9uOiAjY2FjY2NmO1xuJGNvbG9yLWdyZXktb24tZ3JleS1ncmV5OiAjZDlkOWQ5O1xuJGNvbG9yLWxpZ2h0LWJhY2tncm91bmQtZ3JleTojZmFmYWZhO1xuJGNvbG9yLWplYW4tZ3JleTogI2IyYjJiMjtcbiRjb2xvci13aWxkLXNhbmQ6ICNmNWY1ZjU7XG4kY29sb3ItbWlkLWdyZXk6ICNhMmE2YWI7XG4kY29sb3ItZGFyay1ncmV5OiAjMmUzNjQxO1xuJGNvbG9yLWdpcmdpbzogIzdCODA4NTtcbiRjb2xvci10aGUtc2t5LWlzLWdyZXk6ICM5REEyQTc7XG4kY29sb3ItZ3Jlb3k6ICNlMGUwZTA7XG4kY29sb3ItYmx1ZS1ncmV5OiAjZTllYWViO1xuJGNvbG9yLWdyZXktZm9mbzogI2YwZjBmMDtcbiRjb2xvci1tYXliZS1ncmV5OiAjOWRhMmEyO1xuJGNvbG9yLW1pZC1ibGFjazogIzI5MzMzZjtcbiRjb2xvci1uZXJvOiAjMUQxRDFCO1xuJGNvbG9yLWJsYWNrOiAjMTcyMDJjO1xuJGNvbG9yLWFic29sdXRlLWJsYWNrOiAjMDAwO1xuJGNvbG9yLXB1cnBsZS1mdXNpb246ICNiNzRjZDk7XG4kY29sb3Itd2FybmluZy1vcmFuZ2U6ICNmZjY2MDA7XG4kY29sb3ItaWNvbi1vcmFuZ2U6ICNmZjhhMDA7XG4kY29sb3ItZXJyb3ItcmVkOiAjZmYzMzY2O1xuJGNvbG9yLWRhcmstcmVkOiAjZTUyMjUzO1xuJGNvbG9yLXJlZC1yZWQ6ICNmMDA7XG4kY29sb3ItYW5vdGhlci1yZWQ6ICNkZDJjMDA7XG4kY29sb3ItZGFuZ2VyLXJlZDogI2Y0NDMzNjtcbiRjb2xvci1waW5rOiAjZmY5OGIxO1xuJGNvbG9yLXZhbGlkLWdyZWVuOiAjN2VkOTAwO1xuJGNvbG9yLXB1Ymxpc2hlZC1ncmVlbjogIzY2Y2MwMDtcbiRjb2xvci1zdHJvbmctZ3JlZW46ICMwYTA7XG4kY29sb3ItbGlnaHQtYmx1ZTogIzk5ZDhmMjtcbiRjb2xvci1saWdodGVyLWJsdWU6ICNkMWVmZmU7XG4kY29sb3ItbGlnaHQtbGlnaHQtYmx1ZTogI2E2ZDdlZjtcbiRjb2xvci1kYXJrLWJsdWU6ICMwMzliZTU7XG4kY29sb3ItaHlwZXJsaW5rLWJsdWU6ICMwMDAwZWU7XG4kY29sb3Itd2h5LWRvLXdlLW5lZWQtYW5vdGhlci1ibHVlOiAjYTllMWZkO1xuJGNvbG9yLXByaW1hcnktN3A6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMDcpO1xuJGNvbG9yLXByaW1hcnktMTBwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjEpO1xuJGNvbG9yLXByaW1hcnktMjBwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjIpO1xuJGNvbG9yLXByaW1hcnktNDBwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjQpO1xuJGNvbG9yLWJsYWNrLTEwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuMSk7XG4kY29sb3ItYmxhY2stMjBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC4yKTtcbiRjb2xvci1ibGFjay00MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjQpO1xuJGNvbG9yLWJsYWNrLTUwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNSk7XG4kY29sb3ItYmxhY2stNjBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC42KTtcbiRjb2xvci1ibGFjay03MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjcpO1xuJGNvbG9yLWJsYWNrLTgwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuOCk7XG4kY29sb3Itd2hpdGUtMHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwKTtcbiRjb2xvci13aGl0ZS0yMHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjIpO1xuJGNvbG9yLXdoaXRlLTQwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuNCk7XG4kY29sb3Itd2hpdGUtNTBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC41KTtcbiRjb2xvci13aGl0ZS04MHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjgpO1xuJGNvbG9yLXJvbGxpbmctc3RvbmUtMjBwOiByZ2JhKCRjb2xvci1yb2xsaW5nLXN0b25lLCAwLjIpO1xuJGNvbG9yLWdyZXllZC01MHA6IHJnYmEoJGNvbG9yLWdyZXllZCwgMC41KTtcbiRjb2xvci1taWQtYmxhY2stNTBwOiByZ2JhKCRjb2xvci1taWQtYmxhY2ssIDAuNSk7XG4kY29sb3ItbWlkLWJsYWNrLTgwcDogcmdiYSgkY29sb3ItbWlkLWJsYWNrLCAwLjgpO1xuJGNvbG9yLW1heWJlLWdyZXktMzBwOiByZ2JhKCRjb2xvci1tYXliZS1ncmV5LCAwLjMpO1xuJGNvbG9yLW1heWJlLWdyZXktNjBwOiByZ2JhKCRjb2xvci1tYXliZS1ncmV5LCAwLjYpOyIsIiRiYXNlLWZvbnQtc2l6ZTogMTNweDtcbiRiZno6ICRiYXNlLWZvbnQtc2l6ZTtcbiRmb250LXNpemUteHh4LWxhcmdlOiAzMnB4O1xuJGZvbnQtc2l6ZS14eC1sYXJnZTogMjdweDtcbiRmb250LXNpemUteC1sYXJnZTogMjJweDtcbiRmb250LXNpemUteHAtbGFyZ2U6IDI0cHg7XG4kZm9udC1zaXplLXRpdGxlOiAxOHB4O1xuJGZvbnQtc2l6ZS14LXRpdGxlOiAxOXB4O1xuJGZvbnQtc2l6ZS14eC10aXRsZTogMjBweDtcbiRmb250LXNpemUteHh4LXRpdGxlOiAyMXB4O1xuJGZvbnQtc2l6ZS1sYXJnZTogMTZweDtcbiRmb250LXNpemUtYWxtb3N0LWxhcmdlOiAxNXB4O1xuJGZvbnQtc2l6ZS1taWQ6IDE0cHg7XG4kZm9udC1zaXplLXNtYWxsOiAxMnB4O1xuJGZvbnQtc2l6ZS10aW55OiAxMXB4O1xuJGZvbnQtc2l6ZS14LXRpbnk6IDEwcHg7XG4kZm9udC1zaXplLXhzLXRpbnk6IDkuNXB4O1xuXG4kZm9udC13ZWlnaHQtbGlnaHQ6IDMwMDtcbiRmb250LXdlaWdodC1ub3JtYWw6IDQwMDtcbiRmb250LXdlaWdodC1tZWRpdW06IDUwMDtcbiRmb250LXdlaWdodC1ib2xkOiA3MDA7XG4iLCIubWF0LWJ1dHRvbiB7XG4gIGNvbG9yOiAjMzMzMzMzO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAwO1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3M7XG59XG4ubWF0LWJ1dHRvbjpub3QoW2Rpc2FibGVkXSk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICBjb2xvcjogIzFhYjBmOTtcbn1cbi5tYXQtYnV0dG9uOm5vdChbZGlzYWJsZWRdKS5tYXQtZm9jdXNlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuLm1hdC1idXR0b25bZGlzYWJsZWRdIHtcbiAgY29sb3I6ICNiZmJmYmY7XG59XG5cbi5tYXQtZmxhdC1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmc6IDAgMTBweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5W2Rpc2FibGVkXSwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5kaXNhYmxlZCB7XG4gIGNvbG9yOiAjYmZiZmJmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVlNWU1O1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5W2Rpc2FibGVkXSBtYXQtaWNvbiwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5kaXNhYmxlZCBtYXQtaWNvbiB7XG4gIGZpbGw6ICNhMmE2YWI7XG4gIGNvbG9yOiAjYTJhNmFiO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzOWJlNTtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnk6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYWIwZjkgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeTpob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubmctY2xpY2stYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMjc5YjMgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5uZy1jbGljay1hY3RpdmUgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXNlY29uZGFyeSB7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5tYXQtZmFiLmFtcC1mYWIge1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjOWNjY2Y7XG59XG4ubWF0LWZhYi5hbXAtZmFiIG1hdC1pY29uIHtcbiAgY29sb3I6ICNmZmY7XG4gIGZpbGw6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiIG1hdC1pY29uICoge1xuICBmaWxsOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYltkaXNhYmxlZF0ge1xuICBjdXJzb3I6IGF1dG8gIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWJbZGlzYWJsZWRdIG1hdC1pY29uIHtcbiAgZmlsbDogI2NjYyAhaW1wb3J0YW50O1xuICBjb2xvcjogI2NjYyAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYltkaXNhYmxlZF0gbWF0LWljb24gKiB7XG4gIGZpbGw6ICNjY2MgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAubWF0LWZhYi5hbXAtZmFiLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pLCAubWF0LWZhYi5hbXAtZmFiLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzliZTU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6aG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uLCAubWF0LWZhYi5hbXAtZmFiLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uLCAubWF0LWZhYi5hbXAtZmFiLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiwgLm1hdC1mYWIuYW1wLWZhYi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqLCAubWF0LWZhYi5hbXAtZmFiLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYWIwZjkgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiB7XG4gIGZpbGw6ICNmZmY7XG59XG5cbjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHotaW5kZXg6IDE7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO1xufVxuXG4uYW1wLWNyb3AtdG9vbGJhcl9fbGFiZWwge1xuICBmb250LXNpemU6IDEycHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBwYWRkaW5nLXJpZ2h0OiAycHg7XG4gIHBhZGRpbmctbGVmdDogMTVweDtcbiAgdHJhbnNpdGlvbjogMC41cyBjb2xvcjtcbn1cbi5hbXAtY3JvcC10b29sYmFyX19sYWJlbC0tYWN0aXZlIHtcbiAgY29sb3I6ICMwMzliZTU7XG59XG4uYW1wLWNyb3AtdG9vbGJhcl9fbGFiZWwtLXNob3J0IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjcwcHgpIHtcbiAgLmFtcC1jcm9wLXRvb2xiYXJfX2xhYmVsLS1mdWxsIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG4gIC5hbXAtY3JvcC10b29sYmFyX19sYWJlbC0tc2hvcnQge1xuICAgIGRpc3BsYXk6IGlubGluZTtcbiAgfVxufVxuXG5tYXQtZm9ybS1maWVsZCB7XG4gIGZsZXg6IDE7XG4gIG1hcmdpbjogNnB4O1xufVxuXG46Om5nLWRlZXAgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgYm90dG9tOiAwICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICB3aWR0aDogYXV0bztcbiAgYm9yZGVyOiAwO1xuICBtYXJnaW4tdG9wOiAtMnB4O1xufSIsIkBpbXBvcnQgXCIuLi8uLi9jb3JlL2NvcmUuc2Nzc1wiO1xuXG46aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB6LWluZGV4OiAxO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGNvbG9yLWxpZ2h0LWdyZXk7XG59XG5cbi5hbXAtY3JvcC10b29sYmFyX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgLy93aWR0aDogNjRweDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHBhZGRpbmctcmlnaHQ6IDJweDtcbiAgcGFkZGluZy1sZWZ0OiAxNXB4O1xuICB0cmFuc2l0aW9uOiAwLjVzIGNvbG9yO1xuXG4gICYtLWFjdGl2ZSB7XG4gICAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICB9XG5cbiAgJi0tc2hvcnQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY3MHB4KSB7XG4gICAgJi0tZnVsbCB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgICYtLXNob3J0IHtcbiAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICB9XG4gIH1cblxufVxuXG5tYXQtZm9ybS1maWVsZCB7XG4gIGZsZXg6IDE7XG4gIG1hcmdpbjogNnB4O1xufVxuXG46Om5nLWRlZXAgLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgYm90dG9tOiAwICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcCAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICB3aWR0aDogYXV0bztcbiAgYm9yZGVyOiAwO1xuICBtYXJnaW4tdG9wOiAtMnB4O1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/preview/crop-toolbar/crop-toolbar.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/preview/crop-toolbar/crop-toolbar.component.ts ***!
  \****************************************************************/
/*! exports provided: CropToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CropToolbarComponent", function() { return CropToolbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/editor/di-field.service */ "./src/app/editor/di-field.service.ts");
/* harmony import */ var src_app_editor_di_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/editor/di-image.service */ "./src/app/editor/di-image.service.ts");




let CropToolbarComponent = class CropToolbarComponent {
    constructor(field, image) {
        this.field = field;
        this.image = image;
        this.focus = [false, false, false, false];
        this.crop = [0, 0, 0, 0];
        this.readCrop();
        field.fieldUpdated.subscribe(data => {
            this.readCrop();
        });
    }
    ngOnInit() {
    }
    readCrop() {
        if (this.field.data == null) {
            this.crop = [0, 0, 0, 0];
        }
        else {
            this.crop = this.field.data.crop.slice(0);
        }
    }
    updateCrop(sizeUpdate) {
        // if position is changed, bound the position based on the size
        // if size is changed, do the opposite!
        const bounds = this.image.getRotatedBounds();
        const crop = this.crop;
        if (sizeUpdate) {
            // size is bounded to the crop bounds minus the position
            crop[2] = Math.max(1, Math.min(crop[2], (bounds[0] + bounds[2]) - crop[0]));
            crop[3] = Math.max(1, Math.min(crop[3], (bounds[1] + bounds[3]) - crop[1]));
        }
        else {
            // location is bounded to the crop bounds minus the size
            crop[0] = Math.max(bounds[0], Math.min(crop[0], bounds[2] - crop[2]));
            crop[1] = Math.max(bounds[1], Math.min(crop[1], bounds[3] - crop[3]));
        }
        this.field.data.crop = crop.slice(0);
        this.field.updateField();
    }
};
CropToolbarComponent.ctorParameters = () => [
    { type: src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_2__["DiFieldService"] },
    { type: src_app_editor_di_image_service__WEBPACK_IMPORTED_MODULE_3__["DiImageService"] }
];
CropToolbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-crop-toolbar',
        template: __webpack_require__(/*! raw-loader!./crop-toolbar.component.html */ "./node_modules/raw-loader/index.js!./src/app/preview/crop-toolbar/crop-toolbar.component.html"),
        styles: [__webpack_require__(/*! ./crop-toolbar.component.scss */ "./src/app/preview/crop-toolbar/crop-toolbar.component.scss")]
    })
], CropToolbarComponent);



/***/ }),

/***/ "./src/app/preview/di-preview/di-preview.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/preview/di-preview/di-preview.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button {\n  color: #333333;\n  text-transform: none;\n  min-height: 0;\n  min-width: 0;\n  line-height: normal;\n  margin: 0;\n  font-weight: 400;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  outline: none;\n  transition: color 0.3s;\n}\n.mat-button:not([disabled]):hover {\n  background-color: transparent !important;\n  color: #1ab0f9;\n}\n.mat-button:not([disabled]).mat-focused {\n  background-color: transparent;\n}\n.mat-button[disabled] {\n  color: #bfbfbf;\n}\n.mat-flat-button {\n  border-radius: 3px;\n  padding: 0 10px;\n  transition: all 0.3s;\n}\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-primary.disabled {\n  color: #bfbfbf;\n  background-color: #e5e5e5;\n  cursor: default;\n}\n.mat-flat-button.mat-primary[disabled] mat-icon, .mat-flat-button.mat-primary.disabled mat-icon {\n  fill: #a2a6ab;\n  color: #a2a6ab;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) {\n  color: #fff;\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]), .mat-flat-button.mat-primary.faux-hover:not([disabled]) {\n  color: #fff;\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]) mat-icon, .mat-flat-button.mat-primary.faux-hover:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary.ng-click-active {\n  color: #fff;\n  background-color: #0279b3 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.ng-click-active mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-secondary {\n  font-weight: 400;\n}\n.mat-fab.amp-fab {\n  box-shadow: none !important;\n  background-color: #c9cccf;\n}\n.mat-fab.amp-fab mat-icon {\n  color: #fff;\n  fill: #fff;\n}\n.mat-fab.amp-fab mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab[disabled] {\n  cursor: auto !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon {\n  fill: #ccc !important;\n  color: #ccc !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon * {\n  fill: #ccc !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]), .mat-fab.amp-fab.faux-hover:not([disabled]), .mat-fab.amp-fab.mat-focused:not([disabled]) {\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) {\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n:host {\n  width: 200px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n  transition: 0.5s margin-right;\n  background-color: #fcfcfc;\n}\n.amp-di-preview__image {\n  padding: 5px;\n  background: white;\n  margin: 5px;\n  border: 1px solid #ccc;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #747980;\n  font-size: 15px;\n  text-align: center;\n  overflow: hidden;\n  transition: 0.5s -webkit-filter;\n  transition: 0.5s filter;\n  transition: 0.5s filter, 0.5s -webkit-filter;\n}\n.amp-di-preview__image--invalid {\n  -webkit-filter: grayscale(1);\n          filter: grayscale(1);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wcmV2aWV3L2RpLXByZXZpZXcvQzpcXGRjXFxzcmMvYXBwXFxwcmV2aWV3XFxkaS1wcmV2aWV3XFxkaS1wcmV2aWV3LmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvZGktcHJldmlldy9DOlxcZGNcXHNyYy9hcHBcXGNvcmVcXHNjc3NcXHZhcnNcXF9jb2xvdXJzLnNjc3MiLCJhcHAvcHJldmlldy9kaS1wcmV2aWV3L0M6XFxkY1xcc3JjL2FwcFxcY29yZVxcc2Nzc1xcdmFyc1xcX3R5cG9ncmFwaHkuc2NzcyIsImFwcC9wcmV2aWV3L2RpLXByZXZpZXcvZGktcHJldmlldy5jb21wb25lbnQuc2NzcyIsImFwcC9wcmV2aWV3L2RpLXByZXZpZXcvQzpcXGRjXFxzcmMvc3RkaW4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDRSxjQ1ltQjtFRFhuQixvQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JFT21CO0VGTm5CLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLDZCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FHSkY7QUhNSTtFQUNFLHdDQUFBO0VBQ0EsY0NwQmdCO0FFZ0J0QjtBSE1JO0VBQ0UsNkJBQUE7QUdKTjtBSE9FO0VBQ0UsY0NScUI7QUVHekI7QUhTQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0FHTkY7QUhTSTtFQUNFLGNDbkJtQjtFRG9CbkIseUJDNUJlO0VENkJmLGVBQUE7QUdQTjtBSFNNO0VBQ0UsYUNmUztFRGdCVCxjQ2hCUztBRVNqQjtBSFdJO0VBQ0UsV0N6Q1E7RUQwQ1IseUJDbkRVO0VEb0RWLDJCQUFBO0FHVE47QUhXTTtFQUNFLFVDOUNNO0VEK0NOLFdDL0NNO0FFc0NkO0FIYUk7RUFDRSxXQ3BEUTtFRHFEUixvQ0FBQTtFQUNBLDJCQUFBO0FHWE47QUhhTTtFQUNFLFVDekRNO0VEMEROLFdDMURNO0FFK0NkO0FIZUk7RUFDRSxXQy9EUTtFRGdFUixvQ0FBQTtFQUNBLDJCQUFBO0FHYk47QUhlTTtFQUNFLFVDcEVNO0VEcUVOLFdDckVNO0FFd0RkO0FIa0JFO0VBQ0UsZ0JBQUE7QUdoQko7QUhvQkE7RUFDRSwyQkFBQTtFQUtBLHlCQ3pFVztBRW9EYjtBSHVCRTtFQUlFLFdDM0ZVO0VENEZWLFVDNUZVO0FFb0VkO0FIeUJJO0VBQ0UsVUM5RlE7QUV1RWQ7QUhtQ0U7RUFDRSx1QkFBQTtBR2pDSjtBSGtDSTtFQUNFLHFCQUFBO0VBQ0Esc0JBQUE7QUdoQ047QUhpQ007RUFDRSxxQkFBQTtBRy9CUjtBSHFDRTtFQUNFLHlCQ2hJWTtFRGlJWiwyQkFBQTtBR25DSjtBSHFDSTtFQUNFLFVDM0hRO0VENEhSLFdDNUhRO0FFeUZkO0FIb0NNO0VBQ0UsVUM5SE07QUU0RmQ7QUh1Q0U7RUFDRSxvQ0FBQTtFQUNBLDJCQUFBO0FHckNKO0FIdUNJO0VBQ0UsVUN4SVE7RUR5SVIsV0N6SVE7QUVvR2Q7QUhzQ007RUFDRSxVQzNJTTtBRXVHZDtBQzlHQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO0FEaUhGO0FDOUdBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLHNCQUFBO0VBRUEsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjSFpXO0VHYVgsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFFQSwrQkFBQTtFQUFBLHVCQUFBO0VBQUEsNENBQUE7QUQrR0Y7QUM3R0U7RUFDRSw0QkFBQTtVQUFBLG9CQUFBO0FEK0dKIiwiZmlsZSI6ImFwcC9wcmV2aWV3L2RpLXByZXZpZXcvZGktcHJldmlldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiRidXR0b24tZmFiLXdpZHRoOiA1MHB4O1xuJGJ1dHRvbi1mYWItaGVpZ2h0OiAkYnV0dG9uLWZhYi13aWR0aDtcbiRidXR0b24tZmFiLWljb24tc2l6ZTogMzJweDtcbiRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDogMjBweDtcblxuLm1hdC1idXR0b24ge1xuICBjb2xvcjogJGNvbG9yLWRhcmtlc3QtZ3JleTtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIG1pbi13aWR0aDogMDtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgbWFyZ2luOiAwO1xuICBmb250LXdlaWdodDogJGZvbnQtd2VpZ2h0LW5vcm1hbDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgJHRyYW5zaXRpb24tc3BlZWQ7XG4gICY6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogJGNvbG9yLXByaW1hcnktbGlnaHQ7XG4gICAgfVxuICAgICYubWF0LWZvY3VzZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICB9XG4gICZbZGlzYWJsZWRdIHtcbiAgICBjb2xvcjogJGNvbG9yLXlldC1hbm90aGVyLWdyZXk7XG4gIH1cbn1cblxuLm1hdC1mbGF0LWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgcGFkZGluZzogMCAkYnN1LzI7XG4gIHRyYW5zaXRpb246IGFsbCAkdHJhbnNpdGlvbi1zcGVlZDtcblxuICAmLm1hdC1wcmltYXJ5IHtcbiAgICAmW2Rpc2FibGVkXSwgJi5kaXNhYmxlZCB7XG4gICAgICBjb2xvcjogJGNvbG9yLXlldC1hbm90aGVyLWdyZXk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItbGlnaHRlci1ncmV5O1xuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci1taWQtZ3JleTtcbiAgICAgICAgY29sb3I6ICRjb2xvci1taWQtZ3JleTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgICY6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodCAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm5nLWNsaWNrLWFjdGl2ZSB7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnktZGFyayAhaW1wb3J0YW50O1xuICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmLm1hdC1zZWNvbmRhcnkge1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIH1cbn1cblxuLm1hdC1mYWIuYW1wLWZhYiB7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgLy9tYXJnaW46IDNweDtcbiAgLy93aWR0aDogJGJ1dHRvbi1mYWItd2lkdGggIWltcG9ydGFudDtcbiAgLy9oZWlnaHQ6ICRidXR0b24tZmFiLWhlaWdodCAhaW1wb3J0YW50O1xuICAvL2xpbmUtaGVpZ2h0OiAkYnV0dG9uLWZhYi1oZWlnaHQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1pcm9uO1xuXG4gIG1hdC1pY29uIHtcbiAgICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplO1xuICAgIC8vd2lkdGg6ICRidXR0b24tZmFiLWljb24tc2l6ZTtcbiAgICAvL2xpbmUtaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemU7XG4gICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgKiB7XG4gICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgfVxuICB9XG5cbiAgJi5hbXAtaWNvbi1zbWFsbCB7XG4gICAgbWF0LWljb24ge1xuICAgICAgLy9oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDtcbiAgICAgIC8vd2lkdGg6ICRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDtcbiAgICAgIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZS1zbWFsbDtcbiAgICB9XG4gIH1cblxuICAmW2Rpc2FibGVkXSB7XG4gICAgY3Vyc29yOiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgbWF0LWljb24ge1xuICAgICAgZmlsbDogJGNvbG9yLWxpZ2h0LWdyZXkgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAkY29sb3ItbGlnaHQtZ3JleSAhaW1wb3J0YW50O1xuICAgICAgKiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci1saWdodC1ncmV5ICFpbXBvcnRhbnQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAmOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgJi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSwgJi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgIG1hdC1pY29uIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICY6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnktbGlnaHQgIWltcG9ydGFudDtcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICBtYXQtaWNvbiB7XG4gICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgKiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIiRjb2xvci1wcmltYXJ5OiAjMDM5YmU1O1xuJGNvbG9yLXByaW1hcnktbGlnaHQ6ICMxYWIwZjk7XG4kY29sb3ItcHJpbWFyeS1saWdodGVyOiAjMzliMWYzO1xuJGNvbG9yLXByaW1hcnktbGlnaHRlcmVyOiAjZWRmOGZkO1xuJGNvbG9yLXByaW1hcnktbGlnaHRlc3Q6ICNmMmZhZmU7XG4kY29sb3ItYXp6dXJybzogIzI2YjZlYTtcbiRjb2xvci1wcmltYXJ5LWRhcms6ICMwMjc5YjM7XG4kY29sb3ItcHJpbWFyeS1kaXNhYmxlZDogI2EzZDFmMjtcbiRjb2xvci1ibGV1OiAjMDI4OGQxO1xuJGNvbG9yLXdoaXRlOiAjZmZmO1xuJGNvbG9yLWdyZXk6ICM3NDc5ODA7XG4kY29sb3Itcm9sbGluZy1zdG9uZTogIzgwODA4MDtcbiRjb2xvci1saWdodGVyLWdyZXk6ICNlNWU1ZTU7XG4kY29sb3ItbGlnaHQtZ3JleTogI2NjYztcbiRjb2xvci1ncmV5ZWQ6ICNkZGQ7XG4kY29sb3ItbGlnaHRlc3QtZ3JleTogI2YyZjJmMjtcbiRjb2xvci1kb3ZlLWdyZXk6ICM2NjY2NjY7XG4kY29sb3ItZ3VubWV0YWwtZ3JleTogIzVlNjY2ZjtcbiRjb2xvci1kYXJrZXN0LWdyZXk6ICMzMzMzMzM7XG4kY29sb3ItYW5vdGhlci1ncmV5OiAjOTk5O1xuJGNvbG9yLXlldC1hbm90aGVyLWdyZXk6ICNiZmJmYmY7XG4kY29sb3ItaXJvbjogI2M5Y2NjZjtcbiRjb2xvci1ncmVlZWVleTogI2VlZTtcbiRjb2xvci1kaWNrLWdyYXlzb246ICNjNmM2YzY7IFxuJGNvbG9yLWFsbW9zdC1pcm9uOiAjY2FjY2NmO1xuJGNvbG9yLWdyZXktb24tZ3JleS1ncmV5OiAjZDlkOWQ5O1xuJGNvbG9yLWxpZ2h0LWJhY2tncm91bmQtZ3JleTojZmFmYWZhO1xuJGNvbG9yLWplYW4tZ3JleTogI2IyYjJiMjtcbiRjb2xvci13aWxkLXNhbmQ6ICNmNWY1ZjU7XG4kY29sb3ItbWlkLWdyZXk6ICNhMmE2YWI7XG4kY29sb3ItZGFyay1ncmV5OiAjMmUzNjQxO1xuJGNvbG9yLWdpcmdpbzogIzdCODA4NTtcbiRjb2xvci10aGUtc2t5LWlzLWdyZXk6ICM5REEyQTc7XG4kY29sb3ItZ3Jlb3k6ICNlMGUwZTA7XG4kY29sb3ItYmx1ZS1ncmV5OiAjZTllYWViO1xuJGNvbG9yLWdyZXktZm9mbzogI2YwZjBmMDtcbiRjb2xvci1tYXliZS1ncmV5OiAjOWRhMmEyO1xuJGNvbG9yLW1pZC1ibGFjazogIzI5MzMzZjtcbiRjb2xvci1uZXJvOiAjMUQxRDFCO1xuJGNvbG9yLWJsYWNrOiAjMTcyMDJjO1xuJGNvbG9yLWFic29sdXRlLWJsYWNrOiAjMDAwO1xuJGNvbG9yLXB1cnBsZS1mdXNpb246ICNiNzRjZDk7XG4kY29sb3Itd2FybmluZy1vcmFuZ2U6ICNmZjY2MDA7XG4kY29sb3ItaWNvbi1vcmFuZ2U6ICNmZjhhMDA7XG4kY29sb3ItZXJyb3ItcmVkOiAjZmYzMzY2O1xuJGNvbG9yLWRhcmstcmVkOiAjZTUyMjUzO1xuJGNvbG9yLXJlZC1yZWQ6ICNmMDA7XG4kY29sb3ItYW5vdGhlci1yZWQ6ICNkZDJjMDA7XG4kY29sb3ItZGFuZ2VyLXJlZDogI2Y0NDMzNjtcbiRjb2xvci1waW5rOiAjZmY5OGIxO1xuJGNvbG9yLXZhbGlkLWdyZWVuOiAjN2VkOTAwO1xuJGNvbG9yLXB1Ymxpc2hlZC1ncmVlbjogIzY2Y2MwMDtcbiRjb2xvci1zdHJvbmctZ3JlZW46ICMwYTA7XG4kY29sb3ItbGlnaHQtYmx1ZTogIzk5ZDhmMjtcbiRjb2xvci1saWdodGVyLWJsdWU6ICNkMWVmZmU7XG4kY29sb3ItbGlnaHQtbGlnaHQtYmx1ZTogI2E2ZDdlZjtcbiRjb2xvci1kYXJrLWJsdWU6ICMwMzliZTU7XG4kY29sb3ItaHlwZXJsaW5rLWJsdWU6ICMwMDAwZWU7XG4kY29sb3Itd2h5LWRvLXdlLW5lZWQtYW5vdGhlci1ibHVlOiAjYTllMWZkO1xuJGNvbG9yLXByaW1hcnktN3A6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMDcpO1xuJGNvbG9yLXByaW1hcnktMTBwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjEpO1xuJGNvbG9yLXByaW1hcnktMjBwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjIpO1xuJGNvbG9yLXByaW1hcnktNDBwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjQpO1xuJGNvbG9yLWJsYWNrLTEwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuMSk7XG4kY29sb3ItYmxhY2stMjBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC4yKTtcbiRjb2xvci1ibGFjay00MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjQpO1xuJGNvbG9yLWJsYWNrLTUwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNSk7XG4kY29sb3ItYmxhY2stNjBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC42KTtcbiRjb2xvci1ibGFjay03MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjcpO1xuJGNvbG9yLWJsYWNrLTgwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuOCk7XG4kY29sb3Itd2hpdGUtMHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwKTtcbiRjb2xvci13aGl0ZS0yMHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjIpO1xuJGNvbG9yLXdoaXRlLTQwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuNCk7XG4kY29sb3Itd2hpdGUtNTBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC41KTtcbiRjb2xvci13aGl0ZS04MHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjgpO1xuJGNvbG9yLXJvbGxpbmctc3RvbmUtMjBwOiByZ2JhKCRjb2xvci1yb2xsaW5nLXN0b25lLCAwLjIpO1xuJGNvbG9yLWdyZXllZC01MHA6IHJnYmEoJGNvbG9yLWdyZXllZCwgMC41KTtcbiRjb2xvci1taWQtYmxhY2stNTBwOiByZ2JhKCRjb2xvci1taWQtYmxhY2ssIDAuNSk7XG4kY29sb3ItbWlkLWJsYWNrLTgwcDogcmdiYSgkY29sb3ItbWlkLWJsYWNrLCAwLjgpO1xuJGNvbG9yLW1heWJlLWdyZXktMzBwOiByZ2JhKCRjb2xvci1tYXliZS1ncmV5LCAwLjMpO1xuJGNvbG9yLW1heWJlLWdyZXktNjBwOiByZ2JhKCRjb2xvci1tYXliZS1ncmV5LCAwLjYpOyIsIiRiYXNlLWZvbnQtc2l6ZTogMTNweDtcbiRiZno6ICRiYXNlLWZvbnQtc2l6ZTtcbiRmb250LXNpemUteHh4LWxhcmdlOiAzMnB4O1xuJGZvbnQtc2l6ZS14eC1sYXJnZTogMjdweDtcbiRmb250LXNpemUteC1sYXJnZTogMjJweDtcbiRmb250LXNpemUteHAtbGFyZ2U6IDI0cHg7XG4kZm9udC1zaXplLXRpdGxlOiAxOHB4O1xuJGZvbnQtc2l6ZS14LXRpdGxlOiAxOXB4O1xuJGZvbnQtc2l6ZS14eC10aXRsZTogMjBweDtcbiRmb250LXNpemUteHh4LXRpdGxlOiAyMXB4O1xuJGZvbnQtc2l6ZS1sYXJnZTogMTZweDtcbiRmb250LXNpemUtYWxtb3N0LWxhcmdlOiAxNXB4O1xuJGZvbnQtc2l6ZS1taWQ6IDE0cHg7XG4kZm9udC1zaXplLXNtYWxsOiAxMnB4O1xuJGZvbnQtc2l6ZS10aW55OiAxMXB4O1xuJGZvbnQtc2l6ZS14LXRpbnk6IDEwcHg7XG4kZm9udC1zaXplLXhzLXRpbnk6IDkuNXB4O1xuXG4kZm9udC13ZWlnaHQtbGlnaHQ6IDMwMDtcbiRmb250LXdlaWdodC1ub3JtYWw6IDQwMDtcbiRmb250LXdlaWdodC1tZWRpdW06IDUwMDtcbiRmb250LXdlaWdodC1ib2xkOiA3MDA7XG4iLCIubWF0LWJ1dHRvbiB7XG4gIGNvbG9yOiAjMzMzMzMzO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAwO1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yIDAuM3M7XG59XG4ubWF0LWJ1dHRvbjpub3QoW2Rpc2FibGVkXSk6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICBjb2xvcjogIzFhYjBmOTtcbn1cbi5tYXQtYnV0dG9uOm5vdChbZGlzYWJsZWRdKS5tYXQtZm9jdXNlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuLm1hdC1idXR0b25bZGlzYWJsZWRdIHtcbiAgY29sb3I6ICNiZmJmYmY7XG59XG5cbi5tYXQtZmxhdC1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmc6IDAgMTBweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5W2Rpc2FibGVkXSwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5kaXNhYmxlZCB7XG4gIGNvbG9yOiAjYmZiZmJmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTVlNWU1O1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5W2Rpc2FibGVkXSBtYXQtaWNvbiwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5kaXNhYmxlZCBtYXQtaWNvbiB7XG4gIGZpbGw6ICNhMmE2YWI7XG4gIGNvbG9yOiAjYTJhNmFiO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzOWJlNTtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnk6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYWIwZjkgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeTpob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubmctY2xpY2stYWN0aXZlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMjc5YjMgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5uZy1jbGljay1hY3RpdmUgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXNlY29uZGFyeSB7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5tYXQtZmFiLmFtcC1mYWIge1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNjOWNjY2Y7XG59XG4ubWF0LWZhYi5hbXAtZmFiIG1hdC1pY29uIHtcbiAgY29sb3I6ICNmZmY7XG4gIGZpbGw6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiIG1hdC1pY29uICoge1xuICBmaWxsOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYltkaXNhYmxlZF0ge1xuICBjdXJzb3I6IGF1dG8gIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWJbZGlzYWJsZWRdIG1hdC1pY29uIHtcbiAgZmlsbDogI2NjYyAhaW1wb3J0YW50O1xuICBjb2xvcjogI2NjYyAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYltkaXNhYmxlZF0gbWF0LWljb24gKiB7XG4gIGZpbGw6ICNjY2MgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAubWF0LWZhYi5hbXAtZmFiLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pLCAubWF0LWZhYi5hbXAtZmFiLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzliZTU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6aG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uLCAubWF0LWZhYi5hbXAtZmFiLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uLCAubWF0LWZhYi5hbXAtZmFiLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiwgLm1hdC1mYWIuYW1wLWZhYi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqLCAubWF0LWZhYi5hbXAtZmFiLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxYWIwZjkgIWltcG9ydGFudDtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiB7XG4gIGZpbGw6ICNmZmY7XG59XG5cbjpob3N0IHtcbiAgd2lkdGg6IDIwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2l0aW9uOiAwLjVzIG1hcmdpbi1yaWdodDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZmNmYztcbn1cblxuLmFtcC1kaS1wcmV2aWV3X19pbWFnZSB7XG4gIHBhZGRpbmc6IDVweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY29sb3I6ICM3NDc5ODA7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0cmFuc2l0aW9uOiAwLjVzIGZpbHRlcjtcbn1cbi5hbXAtZGktcHJldmlld19faW1hZ2UtLWludmFsaWQge1xuICBmaWx0ZXI6IGdyYXlzY2FsZSgxKTtcbn0iLCJAaW1wb3J0IFwiLi4vLi4vY29yZS9jb3JlLnNjc3NcIjtcblxuOmhvc3Qge1xuICB3aWR0aDogMjAwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRyYW5zaXRpb246IDAuNXMgbWFyZ2luLXJpZ2h0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmY2ZjO1xufVxuXG4uYW1wLWRpLXByZXZpZXdfX2ltYWdlIHtcbiAgcGFkZGluZzogNXB4O1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgbWFyZ2luOiA1cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvci1saWdodC1ncmV5O1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2xvcjogJGNvbG9yLWdyZXk7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIHRyYW5zaXRpb246IDAuNXMgZmlsdGVyO1xuXG4gICYtLWludmFsaWQge1xuICAgIGZpbHRlcjogZ3JheXNjYWxlKDEpO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/preview/di-preview/di-preview.component.ts":
/*!************************************************************!*\
  !*** ./src/app/preview/di-preview/di-preview.component.ts ***!
  \************************************************************/
/*! exports provided: DiPreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiPreviewComponent", function() { return DiPreviewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_editor_di_preview_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/editor/di-preview.service */ "./src/app/editor/di-preview.service.ts");



let DiPreviewComponent = class DiPreviewComponent {
    constructor(preview) {
        this.preview = preview;
        this.preview.previewLoaded.subscribe(item => {
            this.updateContainers();
        });
    }
    ngOnInit() {
    }
    ngAfterViewChecked() {
        this.updateContainers();
    }
    ngOnChanges(changes) {
        this.updateContainers();
    }
    updateContainers() {
        let previews = this.preview.previews;
        if (previews == null) {
            previews = [];
        }
        const elems = this.imageContainers.toArray();
        for (let i = 0; i < previews.length; i++) {
            const preview = previews[i];
            const elem = elems[i].nativeElement;
            // make sure the elem contains only the latest preview
            const img = preview.preferredImage();
            if (img === null) {
                const toRemove = Array.from(elem.children).filter(child => child.tagName === 'IMG');
                toRemove.forEach(remove => elem.removeChild(remove));
                elem.textContent = preview.error;
            }
            else {
                if (elem.firstChild !== img || elem.children.length !== 1) {
                    while (elem.lastChild) {
                        elem.removeChild(elem.lastChild);
                    }
                    elem.appendChild(img);
                }
            }
        }
    }
};
DiPreviewComponent.ctorParameters = () => [
    { type: src_app_editor_di_preview_service__WEBPACK_IMPORTED_MODULE_2__["DiPreviewService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"])('imageContainer')
], DiPreviewComponent.prototype, "imageContainers", void 0);
DiPreviewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-di-preview',
        template: __webpack_require__(/*! raw-loader!./di-preview.component.html */ "./node_modules/raw-loader/index.js!./src/app/preview/di-preview/di-preview.component.html"),
        styles: [__webpack_require__(/*! ./di-preview.component.scss */ "./src/app/preview/di-preview/di-preview.component.scss")]
    })
], DiPreviewComponent);



/***/ }),

/***/ "./src/app/preview/edit-toolbar/edit-toolbar.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/preview/edit-toolbar/edit-toolbar.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button {\n  color: #333333;\n  text-transform: none;\n  min-height: 0;\n  min-width: 0;\n  line-height: normal;\n  margin: 0;\n  font-weight: 400;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  outline: none;\n  transition: color 0.3s;\n}\n.mat-button:not([disabled]):hover {\n  background-color: transparent !important;\n  color: #1ab0f9;\n}\n.mat-button:not([disabled]).mat-focused {\n  background-color: transparent;\n}\n.mat-button[disabled] {\n  color: #bfbfbf;\n}\n.mat-flat-button {\n  border-radius: 3px;\n  padding: 0 10px;\n  transition: all 0.3s;\n}\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-primary.disabled {\n  color: #bfbfbf;\n  background-color: #e5e5e5;\n  cursor: default;\n}\n.mat-flat-button.mat-primary[disabled] mat-icon, .mat-flat-button.mat-primary.disabled mat-icon {\n  fill: #a2a6ab;\n  color: #a2a6ab;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) {\n  color: #fff;\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]), .mat-flat-button.mat-primary.faux-hover:not([disabled]) {\n  color: #fff;\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]) mat-icon, .mat-flat-button.mat-primary.faux-hover:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary.ng-click-active {\n  color: #fff;\n  background-color: #0279b3 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.ng-click-active mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-secondary {\n  font-weight: 400;\n}\n.mat-fab.amp-fab {\n  box-shadow: none !important;\n  background-color: #c9cccf;\n}\n.mat-fab.amp-fab mat-icon {\n  color: #fff;\n  fill: #fff;\n}\n.mat-fab.amp-fab mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab[disabled] {\n  cursor: auto !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon {\n  fill: #ccc !important;\n  color: #ccc !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon * {\n  fill: #ccc !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]), .mat-fab.amp-fab.faux-hover:not([disabled]), .mat-fab.amp-fab.mat-focused:not([disabled]) {\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) {\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n:host {\n  transition: margin-top 0.5s;\n  margin-top: 0;\n  display: flex;\n  position: relative;\n  z-index: 1;\n  background-color: #e5e5e5;\n  width: 100%;\n  height: 42px;\n}\n:host button {\n  margin: 5px;\n  height: 32px;\n  line-height: 32px;\n  flex-shrink: 0;\n}\n.amp-edit-toolbar__modescroll {\n  overflow: auto;\n  overflow-y: hidden;\n  flex: 1;\n}\n.amp-edit-toolbar__modes {\n  flex: 1;\n  display: inline-flex;\n}\n.amp-edit-toolbar__modes mat-divider {\n  margin: 5px;\n}\n.amp-edit-toolbar__reset {\n  min-width: 32px;\n  padding: 0;\n}\n.amp-edit-toolbar__slidergroup {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 150px;\n}\n.amp-edit-toolbar__slidergroup--margin {\n  margin: 0px 10px;\n}\n::ng-deep .amp-edit-toolbar__menu {\n  display: flex;\n  flex-direction: column;\n  overflow: visible !important;\n}\n::ng-deep .amp-edit-toolbar__menu__label {\n  font-size: 12px;\n  display: block;\n  margin: 5px;\n  width: 80px;\n}\n.amp-edit-toolbar__item {\n  margin: 0px -10px;\n  height: 35px;\n  line-height: 35px;\n}\n.amp-edit-toolbar__item mat-icon {\n  opacity: 0;\n  margin-right: 10px;\n}\n.amp-edit-toolbar__item--active {\n  color: #039be5;\n}\n.amp-edit-toolbar__item--active mat-icon {\n  opacity: 1;\n  color: #039be5;\n}\n.amp-edit-toolbar__cropmenu {\n  display: flex;\n  flex-direction: column;\n}\n.amp-edit-toolbar__croptitle {\n  margin: 5px 10px 15px 10px;\n}\n.amp-edit-toolbar__cropgroup {\n  display: flex;\n  padding: 0px 10px;\n  justify-content: flex-end;\n}\n.amp-edit-toolbar__cropgroup mat-form-field {\n  flex: 1;\n  margin-right: 5px;\n  margin-left: 5px;\n  min-width: 0;\n}\n.amp-edit-toolbar__crop-menu-anchor {\n  margin: 5px;\n  height: 32px;\n  width: 1px;\n  position: absolute;\n  pointer-events: none;\n}\n.amp-edit-toolbar--hide {\n  margin-top: -42px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wcmV2aWV3L2VkaXQtdG9vbGJhci9DOlxcZGNcXHNyYy9hcHBcXHByZXZpZXdcXGVkaXQtdG9vbGJhclxcZWRpdC10b29sYmFyLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvZWRpdC10b29sYmFyL0M6XFxkY1xcc3JjL2FwcFxcY29yZVxcc2Nzc1xcdmFyc1xcX2NvbG91cnMuc2NzcyIsImFwcC9wcmV2aWV3L2VkaXQtdG9vbGJhci9DOlxcZGNcXHNyYy9hcHBcXGNvcmVcXHNjc3NcXHZhcnNcXF90eXBvZ3JhcGh5LnNjc3MiLCJhcHAvcHJldmlldy9lZGl0LXRvb2xiYXIvZWRpdC10b29sYmFyLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvZWRpdC10b29sYmFyL0M6XFxkY1xcc3JjL3N0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0VBQ0UsY0NZbUI7RURYbkIsb0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGdCRU9tQjtFRk5uQixnQkFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBR0pGO0FITUk7RUFDRSx3Q0FBQTtFQUNBLGNDcEJnQjtBRWdCdEI7QUhNSTtFQUNFLDZCQUFBO0FHSk47QUhPRTtFQUNFLGNDUnFCO0FFR3pCO0FIU0E7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtBR05GO0FIU0k7RUFDRSxjQ25CbUI7RURvQm5CLHlCQzVCZTtFRDZCZixlQUFBO0FHUE47QUhTTTtFQUNFLGFDZlM7RURnQlQsY0NoQlM7QUVTakI7QUhXSTtFQUNFLFdDekNRO0VEMENSLHlCQ25EVTtFRG9EViwyQkFBQTtBR1ROO0FIV007RUFDRSxVQzlDTTtFRCtDTixXQy9DTTtBRXNDZDtBSGFJO0VBQ0UsV0NwRFE7RURxRFIsb0NBQUE7RUFDQSwyQkFBQTtBR1hOO0FIYU07RUFDRSxVQ3pETTtFRDBETixXQzFETTtBRStDZDtBSGVJO0VBQ0UsV0MvRFE7RURnRVIsb0NBQUE7RUFDQSwyQkFBQTtBR2JOO0FIZU07RUFDRSxVQ3BFTTtFRHFFTixXQ3JFTTtBRXdEZDtBSGtCRTtFQUNFLGdCQUFBO0FHaEJKO0FIb0JBO0VBQ0UsMkJBQUE7RUFLQSx5QkN6RVc7QUVvRGI7QUh1QkU7RUFJRSxXQzNGVTtFRDRGVixVQzVGVTtBRW9FZDtBSHlCSTtFQUNFLFVDOUZRO0FFdUVkO0FIbUNFO0VBQ0UsdUJBQUE7QUdqQ0o7QUhrQ0k7RUFDRSxxQkFBQTtFQUNBLHNCQUFBO0FHaENOO0FIaUNNO0VBQ0UscUJBQUE7QUcvQlI7QUhxQ0U7RUFDRSx5QkNoSVk7RURpSVosMkJBQUE7QUduQ0o7QUhxQ0k7RUFDRSxVQzNIUTtFRDRIUixXQzVIUTtBRXlGZDtBSG9DTTtFQUNFLFVDOUhNO0FFNEZkO0FIdUNFO0VBQ0Usb0NBQUE7RUFDQSwyQkFBQTtBR3JDSjtBSHVDSTtFQUNFLFVDeElRO0VEeUlSLFdDeklRO0FFb0dkO0FIc0NNO0VBQ0UsVUMzSU07QUV1R2Q7QUM5R0E7RUFDRSwyQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxVQUFBO0VBQ0EseUJISW1CO0VHSG5CLFdBQUE7RUFDQSxZQUFBO0FEaUhGO0FDL0dFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QURpSEo7QUM1R0U7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0FEK0dKO0FDNUdFO0VBQ0UsT0FBQTtFQUNBLG9CQUFBO0FEOEdKO0FDNUdJO0VBQ0UsV0FBQTtBRDhHTjtBQ3RHRTtFQUNFLGVBQUE7RUFDQSxVQUFBO0FEd0dKO0FDckdFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFJQSxnQkFBQTtBRG9HSjtBQ3ZHSTtFQUNFLGdCQUFBO0FEeUdOO0FDcEdFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsNEJBQUE7QURzR0o7QUNwR0k7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0FEc0dOO0FDbEdFO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7QURvR0o7QUNuR0k7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7QURxR047QUNsR0k7RUFDRSxjSDlFVTtBRWtMaEI7QUNuR007RUFDRSxVQUFBO0VBQ0EsY0hqRlE7QUVzTGhCO0FDaEdFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FEa0dKO0FDL0ZFO0VBQ0UsMEJBQUE7QURpR0o7QUM5RkU7RUFDRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFBQTtBRGdHSjtBQzlGSTtFQUNFLE9BQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtBRGdHTjtBQzVGRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7QUQ4Rko7QUMzRkU7RUFDRSxpQkFBQTtBRDZGSiIsImZpbGUiOiJhcHAvcHJldmlldy9lZGl0LXRvb2xiYXIvZWRpdC10b29sYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGJ1dHRvbi1mYWItd2lkdGg6IDUwcHg7XG4kYnV0dG9uLWZhYi1oZWlnaHQ6ICRidXR0b24tZmFiLXdpZHRoO1xuJGJ1dHRvbi1mYWItaWNvbi1zaXplOiAzMnB4O1xuJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsOiAyMHB4O1xuXG4ubWF0LWJ1dHRvbiB7XG4gIGNvbG9yOiAkY29sb3ItZGFya2VzdC1ncmV5O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAwO1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIGZvbnQtd2VpZ2h0OiAkZm9udC13ZWlnaHQtbm9ybWFsO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBvdXRsaW5lOiBub25lO1xuICB0cmFuc2l0aW9uOiBjb2xvciAkdHJhbnNpdGlvbi1zcGVlZDtcbiAgJjpub3QoW2Rpc2FibGVkXSkge1xuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodDtcbiAgICB9XG4gICAgJi5tYXQtZm9jdXNlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gIH1cbiAgJltkaXNhYmxlZF0ge1xuICAgIGNvbG9yOiAkY29sb3IteWV0LWFub3RoZXItZ3JleTtcbiAgfVxufVxuXG4ubWF0LWZsYXQtYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwICRic3UvMjtcbiAgdHJhbnNpdGlvbjogYWxsICR0cmFuc2l0aW9uLXNwZWVkO1xuXG4gICYubWF0LXByaW1hcnkge1xuICAgICZbZGlzYWJsZWRdLCAmLmRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiAkY29sb3IteWV0LWFub3RoZXItZ3JleTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1saWdodGVyLWdyZXk7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLW1pZC1ncmV5O1xuICAgICAgICBjb2xvcjogJGNvbG9yLW1pZC1ncmV5O1xuICAgICAgfVxuICAgIH1cblxuICAgICYubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpob3Zlcjpub3QoW2Rpc2FibGVkXSksICYuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5LWxpZ2h0ICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgICYubmctY2xpY2stYWN0aXZlIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1kYXJrICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYubWF0LXNlY29uZGFyeSB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxufVxuXG4ubWF0LWZhYi5hbXAtZmFiIHtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAvL21hcmdpbjogM3B4O1xuICAvL3dpZHRoOiAkYnV0dG9uLWZhYi13aWR0aCAhaW1wb3J0YW50O1xuICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaGVpZ2h0ICFpbXBvcnRhbnQ7XG4gIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWhlaWdodDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWlyb247XG5cbiAgbWF0LWljb24ge1xuICAgIC8vaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemU7XG4gICAgLy93aWR0aDogJGJ1dHRvbi1mYWItaWNvbi1zaXplO1xuICAgIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZTtcbiAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAqIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICB9XG4gIH1cblxuICAmLmFtcC1pY29uLXNtYWxsIHtcbiAgICBtYXQtaWNvbiB7XG4gICAgICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgICAgLy93aWR0aDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgICAgLy9saW5lLWhlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgIH1cbiAgfVxuXG4gICZbZGlzYWJsZWRdIHtcbiAgICBjdXJzb3I6IGF1dG8gIWltcG9ydGFudDtcbiAgICBtYXQtaWNvbiB7XG4gICAgICBmaWxsOiAkY29sb3ItbGlnaHQtZ3JleSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICRjb2xvci1saWdodC1ncmV5ICFpbXBvcnRhbnQ7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLWxpZ2h0LWdyZXkgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gICY6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgbWF0LWljb24ge1xuICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgICoge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodCAhaW1wb3J0YW50O1xuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgIG1hdC1pY29uIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiJGNvbG9yLXByaW1hcnk6ICMwMzliZTU7XG4kY29sb3ItcHJpbWFyeS1saWdodDogIzFhYjBmOTtcbiRjb2xvci1wcmltYXJ5LWxpZ2h0ZXI6ICMzOWIxZjM7XG4kY29sb3ItcHJpbWFyeS1saWdodGVyZXI6ICNlZGY4ZmQ7XG4kY29sb3ItcHJpbWFyeS1saWdodGVzdDogI2YyZmFmZTtcbiRjb2xvci1henp1cnJvOiAjMjZiNmVhO1xuJGNvbG9yLXByaW1hcnktZGFyazogIzAyNzliMztcbiRjb2xvci1wcmltYXJ5LWRpc2FibGVkOiAjYTNkMWYyO1xuJGNvbG9yLWJsZXU6ICMwMjg4ZDE7XG4kY29sb3Itd2hpdGU6ICNmZmY7XG4kY29sb3ItZ3JleTogIzc0Nzk4MDtcbiRjb2xvci1yb2xsaW5nLXN0b25lOiAjODA4MDgwO1xuJGNvbG9yLWxpZ2h0ZXItZ3JleTogI2U1ZTVlNTtcbiRjb2xvci1saWdodC1ncmV5OiAjY2NjO1xuJGNvbG9yLWdyZXllZDogI2RkZDtcbiRjb2xvci1saWdodGVzdC1ncmV5OiAjZjJmMmYyO1xuJGNvbG9yLWRvdmUtZ3JleTogIzY2NjY2NjtcbiRjb2xvci1ndW5tZXRhbC1ncmV5OiAjNWU2NjZmO1xuJGNvbG9yLWRhcmtlc3QtZ3JleTogIzMzMzMzMztcbiRjb2xvci1hbm90aGVyLWdyZXk6ICM5OTk7XG4kY29sb3IteWV0LWFub3RoZXItZ3JleTogI2JmYmZiZjtcbiRjb2xvci1pcm9uOiAjYzljY2NmO1xuJGNvbG9yLWdyZWVlZWV5OiAjZWVlO1xuJGNvbG9yLWRpY2stZ3JheXNvbjogI2M2YzZjNjsgXG4kY29sb3ItYWxtb3N0LWlyb246ICNjYWNjY2Y7XG4kY29sb3ItZ3JleS1vbi1ncmV5LWdyZXk6ICNkOWQ5ZDk7XG4kY29sb3ItbGlnaHQtYmFja2dyb3VuZC1ncmV5OiNmYWZhZmE7XG4kY29sb3ItamVhbi1ncmV5OiAjYjJiMmIyO1xuJGNvbG9yLXdpbGQtc2FuZDogI2Y1ZjVmNTtcbiRjb2xvci1taWQtZ3JleTogI2EyYTZhYjtcbiRjb2xvci1kYXJrLWdyZXk6ICMyZTM2NDE7XG4kY29sb3ItZ2lyZ2lvOiAjN0I4MDg1O1xuJGNvbG9yLXRoZS1za3ktaXMtZ3JleTogIzlEQTJBNztcbiRjb2xvci1ncmVveTogI2UwZTBlMDtcbiRjb2xvci1ibHVlLWdyZXk6ICNlOWVhZWI7XG4kY29sb3ItZ3JleS1mb2ZvOiAjZjBmMGYwO1xuJGNvbG9yLW1heWJlLWdyZXk6ICM5ZGEyYTI7XG4kY29sb3ItbWlkLWJsYWNrOiAjMjkzMzNmO1xuJGNvbG9yLW5lcm86ICMxRDFEMUI7XG4kY29sb3ItYmxhY2s6ICMxNzIwMmM7XG4kY29sb3ItYWJzb2x1dGUtYmxhY2s6ICMwMDA7XG4kY29sb3ItcHVycGxlLWZ1c2lvbjogI2I3NGNkOTtcbiRjb2xvci13YXJuaW5nLW9yYW5nZTogI2ZmNjYwMDtcbiRjb2xvci1pY29uLW9yYW5nZTogI2ZmOGEwMDtcbiRjb2xvci1lcnJvci1yZWQ6ICNmZjMzNjY7XG4kY29sb3ItZGFyay1yZWQ6ICNlNTIyNTM7XG4kY29sb3ItcmVkLXJlZDogI2YwMDtcbiRjb2xvci1hbm90aGVyLXJlZDogI2RkMmMwMDtcbiRjb2xvci1kYW5nZXItcmVkOiAjZjQ0MzM2O1xuJGNvbG9yLXBpbms6ICNmZjk4YjE7XG4kY29sb3ItdmFsaWQtZ3JlZW46ICM3ZWQ5MDA7XG4kY29sb3ItcHVibGlzaGVkLWdyZWVuOiAjNjZjYzAwO1xuJGNvbG9yLXN0cm9uZy1ncmVlbjogIzBhMDtcbiRjb2xvci1saWdodC1ibHVlOiAjOTlkOGYyO1xuJGNvbG9yLWxpZ2h0ZXItYmx1ZTogI2QxZWZmZTtcbiRjb2xvci1saWdodC1saWdodC1ibHVlOiAjYTZkN2VmO1xuJGNvbG9yLWRhcmstYmx1ZTogIzAzOWJlNTtcbiRjb2xvci1oeXBlcmxpbmstYmx1ZTogIzAwMDBlZTtcbiRjb2xvci13aHktZG8td2UtbmVlZC1hbm90aGVyLWJsdWU6ICNhOWUxZmQ7XG4kY29sb3ItcHJpbWFyeS03cDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC4wNyk7XG4kY29sb3ItcHJpbWFyeS0xMHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMSk7XG4kY29sb3ItcHJpbWFyeS0yMHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMik7XG4kY29sb3ItcHJpbWFyeS00MHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuNCk7XG4kY29sb3ItYmxhY2stMTBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC4xKTtcbiRjb2xvci1ibGFjay0yMHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjIpO1xuJGNvbG9yLWJsYWNrLTQwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNCk7XG4kY29sb3ItYmxhY2stNTBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC41KTtcbiRjb2xvci1ibGFjay02MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjYpO1xuJGNvbG9yLWJsYWNrLTcwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNyk7XG4kY29sb3ItYmxhY2stODBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC44KTtcbiRjb2xvci13aGl0ZS0wcDogcmdiYSgkY29sb3Itd2hpdGUsIDApO1xuJGNvbG9yLXdoaXRlLTIwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuMik7XG4kY29sb3Itd2hpdGUtNDBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC40KTtcbiRjb2xvci13aGl0ZS01MHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjUpO1xuJGNvbG9yLXdoaXRlLTgwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuOCk7XG4kY29sb3Itcm9sbGluZy1zdG9uZS0yMHA6IHJnYmEoJGNvbG9yLXJvbGxpbmctc3RvbmUsIDAuMik7XG4kY29sb3ItZ3JleWVkLTUwcDogcmdiYSgkY29sb3ItZ3JleWVkLCAwLjUpO1xuJGNvbG9yLW1pZC1ibGFjay01MHA6IHJnYmEoJGNvbG9yLW1pZC1ibGFjaywgMC41KTtcbiRjb2xvci1taWQtYmxhY2stODBwOiByZ2JhKCRjb2xvci1taWQtYmxhY2ssIDAuOCk7XG4kY29sb3ItbWF5YmUtZ3JleS0zMHA6IHJnYmEoJGNvbG9yLW1heWJlLWdyZXksIDAuMyk7XG4kY29sb3ItbWF5YmUtZ3JleS02MHA6IHJnYmEoJGNvbG9yLW1heWJlLWdyZXksIDAuNik7IiwiJGJhc2UtZm9udC1zaXplOiAxM3B4O1xuJGJmejogJGJhc2UtZm9udC1zaXplO1xuJGZvbnQtc2l6ZS14eHgtbGFyZ2U6IDMycHg7XG4kZm9udC1zaXplLXh4LWxhcmdlOiAyN3B4O1xuJGZvbnQtc2l6ZS14LWxhcmdlOiAyMnB4O1xuJGZvbnQtc2l6ZS14cC1sYXJnZTogMjRweDtcbiRmb250LXNpemUtdGl0bGU6IDE4cHg7XG4kZm9udC1zaXplLXgtdGl0bGU6IDE5cHg7XG4kZm9udC1zaXplLXh4LXRpdGxlOiAyMHB4O1xuJGZvbnQtc2l6ZS14eHgtdGl0bGU6IDIxcHg7XG4kZm9udC1zaXplLWxhcmdlOiAxNnB4O1xuJGZvbnQtc2l6ZS1hbG1vc3QtbGFyZ2U6IDE1cHg7XG4kZm9udC1zaXplLW1pZDogMTRweDtcbiRmb250LXNpemUtc21hbGw6IDEycHg7XG4kZm9udC1zaXplLXRpbnk6IDExcHg7XG4kZm9udC1zaXplLXgtdGlueTogMTBweDtcbiRmb250LXNpemUteHMtdGlueTogOS41cHg7XG5cbiRmb250LXdlaWdodC1saWdodDogMzAwO1xuJGZvbnQtd2VpZ2h0LW5vcm1hbDogNDAwO1xuJGZvbnQtd2VpZ2h0LW1lZGl1bTogNTAwO1xuJGZvbnQtd2VpZ2h0LWJvbGQ6IDcwMDtcbiIsIi5tYXQtYnV0dG9uIHtcbiAgY29sb3I6ICMzMzMzMzM7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBtaW4taGVpZ2h0OiAwO1xuICBtaW4td2lkdGg6IDA7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbjogMDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcztcbn1cbi5tYXQtYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjMWFiMGY5O1xufVxuLm1hdC1idXR0b246bm90KFtkaXNhYmxlZF0pLm1hdC1mb2N1c2VkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4ubWF0LWJ1dHRvbltkaXNhYmxlZF0ge1xuICBjb2xvcjogI2JmYmZiZjtcbn1cblxuLm1hdC1mbGF0LWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgcGFkZGluZzogMCAxMHB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnlbZGlzYWJsZWRdLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmRpc2FibGVkIHtcbiAgY29sb3I6ICNiZmJmYmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnlbZGlzYWJsZWRdIG1hdC1pY29uLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmRpc2FibGVkIG1hdC1pY29uIHtcbiAgZmlsbDogI2EyYTZhYjtcbiAgY29sb3I6ICNhMmE2YWI7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5YmU1O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeTpob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhYjBmOSAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5OmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5uZy1jbGljay1hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyNzliMyAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm5nLWNsaWNrLWFjdGl2ZSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtc2Vjb25kYXJ5IHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLm1hdC1mYWIuYW1wLWZhYiB7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M5Y2NjZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWIgbWF0LWljb24ge1xuICBjb2xvcjogI2ZmZjtcbiAgZmlsbDogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWIgbWF0LWljb24gKiB7XG4gIGZpbGw6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSB7XG4gIGN1cnNvcjogYXV0byAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYltkaXNhYmxlZF0gbWF0LWljb24ge1xuICBmaWxsOiAjY2NjICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjY2NjICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2NjYyAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzOWJlNTtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqLCAubWF0LWZhYi5hbXAtZmFiLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICosIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICoge1xuICBmaWxsOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhYjBmOSAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2ZmZjtcbn1cblxuOmhvc3Qge1xuICB0cmFuc2l0aW9uOiBtYXJnaW4tdG9wIDAuNXM7XG4gIG1hcmdpbi10b3A6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDJweDtcbn1cbjpob3N0IGJ1dHRvbiB7XG4gIG1hcmdpbjogNXB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGxpbmUtaGVpZ2h0OiAzMnB4O1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLmFtcC1lZGl0LXRvb2xiYXJfX21vZGVzY3JvbGwge1xuICBvdmVyZmxvdzogYXV0bztcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICBmbGV4OiAxO1xufVxuLmFtcC1lZGl0LXRvb2xiYXJfX21vZGVzIHtcbiAgZmxleDogMTtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG4uYW1wLWVkaXQtdG9vbGJhcl9fbW9kZXMgbWF0LWRpdmlkZXIge1xuICBtYXJnaW46IDVweDtcbn1cbi5hbXAtZWRpdC10b29sYmFyX19yZXNldCB7XG4gIG1pbi13aWR0aDogMzJweDtcbiAgcGFkZGluZzogMDtcbn1cbi5hbXAtZWRpdC10b29sYmFyX19zbGlkZXJncm91cCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtaW4td2lkdGg6IDE1MHB4O1xufVxuLmFtcC1lZGl0LXRvb2xiYXJfX3NsaWRlcmdyb3VwLS1tYXJnaW4ge1xuICBtYXJnaW46IDBweCAxMHB4O1xufVxuOjpuZy1kZWVwIC5hbXAtZWRpdC10b29sYmFyX19tZW51IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgb3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDtcbn1cbjo6bmctZGVlcCAuYW1wLWVkaXQtdG9vbGJhcl9fbWVudV9fbGFiZWwge1xuICBmb250LXNpemU6IDEycHg7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IDVweDtcbiAgd2lkdGg6IDgwcHg7XG59XG4uYW1wLWVkaXQtdG9vbGJhcl9faXRlbSB7XG4gIG1hcmdpbjogMHB4IC0xMHB4O1xuICBoZWlnaHQ6IDM1cHg7XG4gIGxpbmUtaGVpZ2h0OiAzNXB4O1xufVxuLmFtcC1lZGl0LXRvb2xiYXJfX2l0ZW0gbWF0LWljb24ge1xuICBvcGFjaXR5OiAwO1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG59XG4uYW1wLWVkaXQtdG9vbGJhcl9faXRlbS0tYWN0aXZlIHtcbiAgY29sb3I6ICMwMzliZTU7XG59XG4uYW1wLWVkaXQtdG9vbGJhcl9faXRlbS0tYWN0aXZlIG1hdC1pY29uIHtcbiAgb3BhY2l0eTogMTtcbiAgY29sb3I6ICMwMzliZTU7XG59XG4uYW1wLWVkaXQtdG9vbGJhcl9fY3JvcG1lbnUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLmFtcC1lZGl0LXRvb2xiYXJfX2Nyb3B0aXRsZSB7XG4gIG1hcmdpbjogNXB4IDEwcHggMTVweCAxMHB4O1xufVxuLmFtcC1lZGl0LXRvb2xiYXJfX2Nyb3Bncm91cCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDBweCAxMHB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xufVxuLmFtcC1lZGl0LXRvb2xiYXJfX2Nyb3Bncm91cCBtYXQtZm9ybS1maWVsZCB7XG4gIGZsZXg6IDE7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBtYXJnaW4tbGVmdDogNXB4O1xuICBtaW4td2lkdGg6IDA7XG59XG4uYW1wLWVkaXQtdG9vbGJhcl9fY3JvcC1tZW51LWFuY2hvciB7XG4gIG1hcmdpbjogNXB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIHdpZHRoOiAxcHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uYW1wLWVkaXQtdG9vbGJhci0taGlkZSB7XG4gIG1hcmdpbi10b3A6IC00MnB4O1xufSIsIkBpbXBvcnQgXCIuLi8uLi9jb3JlL2NvcmUuc2Nzc1wiO1xuXG46aG9zdCB7XG4gIHRyYW5zaXRpb246IG1hcmdpbi10b3AgMC41cztcbiAgbWFyZ2luLXRvcDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItbGlnaHRlci1ncmV5O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0MnB4O1xuXG4gIGJ1dHRvbiB7XG4gICAgbWFyZ2luOiA1cHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAzMnB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG59XG5cbi5hbXAtZWRpdC10b29sYmFyIHtcbiAgJl9fbW9kZXNjcm9sbCB7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xuICAgIGZsZXg6IDE7XG4gIH1cblxuICAmX19tb2RlcyB7XG4gICAgZmxleDogMTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcblxuICAgIG1hdC1kaXZpZGVyIHtcbiAgICAgIG1hcmdpbjogNXB4O1xuICAgIH1cbiAgfVxuXG4gICZfX3JpZ2h0IHtcblxuICB9XG5cbiAgJl9fcmVzZXQge1xuICAgIG1pbi13aWR0aDogMzJweDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5cbiAgJl9fc2xpZGVyZ3JvdXAge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAmLS1tYXJnaW4ge1xuICAgICAgbWFyZ2luOiAwcHggMTBweDtcbiAgICB9XG4gICAgbWluLXdpZHRoOiAxNTBweDtcbiAgfVxuXG4gIDo6bmctZGVlcCAmX19tZW51IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgb3ZlcmZsb3c6IHZpc2libGUgIWltcG9ydGFudDtcblxuICAgICZfX2xhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgbWFyZ2luOiA1cHg7XG4gICAgICB3aWR0aDogODBweDtcbiAgICB9XG4gIH1cblxuICAmX19pdGVtIHtcbiAgICBtYXJnaW46IDBweCAtMTBweDtcbiAgICBoZWlnaHQ6IDM1cHg7XG4gICAgbGluZS1oZWlnaHQ6IDM1cHg7XG4gICAgbWF0LWljb24ge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICB9XG5cbiAgICAmLS1hY3RpdmUge1xuICAgICAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICAgICAgbWF0LWljb24ge1xuICAgICAgICBvcGFjaXR5OiAxO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJl9fY3JvcG1lbnUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuXG4gICZfX2Nyb3B0aXRsZSB7XG4gICAgbWFyZ2luOiA1cHggMTBweCAxNXB4IDEwcHg7XG4gIH1cblxuICAmX19jcm9wZ3JvdXAge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcGFkZGluZzogMHB4IDEwcHg7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgIG1hdC1mb3JtLWZpZWxkIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gICAgICBtaW4td2lkdGg6IDA7XG4gICAgfVxuICB9XG5cbiAgJl9fY3JvcC1tZW51LWFuY2hvciB7XG4gICAgbWFyZ2luOiA1cHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIHdpZHRoOiAxcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgJi0taGlkZSB7XG4gICAgbWFyZ2luLXRvcDogLTQycHg7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/preview/edit-toolbar/edit-toolbar.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/preview/edit-toolbar/edit-toolbar.component.ts ***!
  \****************************************************************/
/*! exports provided: EditToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditToolbarComponent", function() { return EditToolbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/editor/di-field.service */ "./src/app/editor/di-field.service.ts");
/* harmony import */ var src_app_editor_di_edit_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/editor/di-edit-slider */ "./src/app/editor/di-edit-slider.ts");
/* harmony import */ var src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/editor/editor.service */ "./src/app/editor/editor.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var src_app_editor_di_image_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/editor/di-image.service */ "./src/app/editor/di-image.service.ts");







let EditToolbarComponent = class EditToolbarComponent {
    constructor(field, editor, dimage) {
        this.field = field;
        this.editor = editor;
        this.dimage = dimage;
        this.activeSliders = [];
        this.previewMode = src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"];
        this.editButtons = [
            new src_app_editor_di_edit_slider__WEBPACK_IMPORTED_MODULE_3__["DiEditModeButton"](src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].EditCrop, 'Crop', [
                { type: 'listItem', name: 'Focal Point', field: 'aspectLock', value: 'poi', action: () => this.poiMode() },
                { type: 'listItem', name: 'Custom', field: 'aspectLock', value: 'none' },
                { type: 'listItem', name: 'Square', field: 'aspectLock', value: '1:1' },
                { type: 'listItem', name: '16:9', field: 'aspectLock', value: '16:9' },
                { type: 'listItem', name: '4:3', field: 'aspectLock', value: '4:3' },
                { type: 'listItem', name: '3:2', field: 'aspectLock', value: '3:2' },
                { type: 'listItem', name: '2:3', field: 'aspectLock', value: '2:3' },
            ]),
            /* disabled until POI and rotate can be used at the same time
        
            new DiEditModeButton(PreviewMode.EditRotate, 'Rotate', [
              {type: 'slider', name: 'Rotation (degrees)', field: 'rot', min: 0, max: 360}
            ] as DiEditSlider[]),
            */
            new src_app_editor_di_edit_slider__WEBPACK_IMPORTED_MODULE_3__["DiEditModeButton"](src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].EditFlip, 'Flip', [
                { type: 'bool', name: 'Horizontal', field: 'fliph' },
                { type: 'bool', name: 'Vertical', field: 'flipv' }
            ]),
            new src_app_editor_di_edit_slider__WEBPACK_IMPORTED_MODULE_3__["DiEditModeButton"](src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].EditHSV, 'HSB', [
                { type: 'slider', name: 'Hue (degrees)', field: 'hue', min: -180, max: 180 },
                { type: 'slider', name: 'Saturation', field: 'sat', min: -100, max: 100 },
                { type: 'slider', name: 'Brightness', field: 'bri', min: -100, max: 100 }
            ])
        ];
        this.poiButtons = [
            new src_app_editor_di_edit_slider__WEBPACK_IMPORTED_MODULE_3__["DiEditModeButton"](src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].POI, 'POI', []),
        ];
        this.modeChanged();
        editor.modeChange.subscribe((mode) => {
            this.modeChanged();
        });
    }
    get crop() {
        return this.field.data == null ? [0, 0, 0, 0] : this.field.data.crop;
    }
    set crop(value) {
        this.field.data.crop = value;
    }
    get isLoading() {
        return !this.dimage.imageReady;
    }
    modeChanged() {
        switch (this.editor.previewMode) {
            default:
                this.buttons = this.editButtons;
                break;
        }
    }
    ngOnInit() {
    }
    updateSliderValue(slider, value) {
        this.field.updateSliderValue(slider, value);
    }
    getSliderValue(slider) {
        return this.field.getSliderValue(slider);
    }
    exitMode(rollback) {
        if (rollback) {
            this.editor.cancelChanges();
        }
        this.editor.modeRequest('view');
    }
    setMode(button) {
        if (!this.modeActive(button.mode)) {
            this.editor.setMode(button.mode);
        }
        this.activeSliders = button.sliders;
    }
    resetTransforms() {
        this.field.resetDefault();
    }
    clearCrop() {
        this.field.data.crop = [0, 0, 0, 0];
        this.field.data.aspectLock = 'clear';
        this.field.updateField();
    }
    poiMode() {
        this.field.data.crop = [0, 0, 0, 0];
        this.field.data.aspectLock = 'poi';
        this.field.updateField();
        // this.editor.setMode(PreviewMode.POI);
    }
    showCropMenu() {
        this.cropMenuTrigger.openMenu();
    }
    modeActive(mode) {
        let active = this.editor.previewMode;
        if (active === src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].POI) {
            active = src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].EditCrop;
        }
        return (active === mode);
    }
};
EditToolbarComponent.ctorParameters = () => [
    { type: src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_2__["DiFieldService"] },
    { type: src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["EditorService"] },
    { type: src_app_editor_di_image_service__WEBPACK_IMPORTED_MODULE_6__["DiImageService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('cropMenuTrigger', { read: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuTrigger"], static: true })
], EditToolbarComponent.prototype, "cropMenuTrigger", void 0);
EditToolbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-edit-toolbar',
        template: __webpack_require__(/*! raw-loader!./edit-toolbar.component.html */ "./node_modules/raw-loader/index.js!./src/app/preview/edit-toolbar/edit-toolbar.component.html"),
        styles: [__webpack_require__(/*! ./edit-toolbar.component.scss */ "./src/app/preview/edit-toolbar/edit-toolbar.component.scss")]
    })
], EditToolbarComponent);



/***/ }),

/***/ "./src/app/preview/image-transformer.service.ts":
/*!******************************************************!*\
  !*** ./src/app/preview/image-transformer.service.ts ***!
  \******************************************************/
/*! exports provided: ImageTransformerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageTransformerService", function() { return ImageTransformerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _editor_di_preview_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../editor/di-preview.service */ "./src/app/editor/di-preview.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");





let ImageTransformerService = class ImageTransformerService {
    constructor(diPreview) {
        this.diPreview = diPreview;
        this.cachedHSVImageLoaded = false;
        this.lastTransform = [];
        const db = diPreview.transformationsChanged.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounce"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["interval"])(666)));
        db.subscribe(this.updateCachedHSV.bind(this));
    }
    updateCachedHSV(transformations) {
        const queryString = transformations.filter(x => x.name === 'HSB').map(command => command.queryString()).join('&');
        if (queryString.length === 0) {
            // do not need a transformation
            this.cachedHSVImage = null;
            this.cachedHSVImageLoaded = false;
            return;
        }
        const imgSrc = this.diPreview.getCustomQueryURL(queryString);
        if (this.cachedHSVImage != null && this.cachedHSVImage.src === imgSrc) {
            return;
        }
        const cachedImage = new Image();
        this.cachedHSVImage = cachedImage;
        cachedImage.crossOrigin = 'anonymous';
        cachedImage.onload = () => {
            if (cachedImage !== this.cachedHSVImage) {
                return;
            }
            this.cachedHSVImageLoaded = true;
            this.drawCachedHSV();
        };
        cachedImage.src = imgSrc;
    }
    drawCachedHSV() {
        const canvas = this.canvas;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(this.cachedHSVImage, 0, 0);
    }
    renderCanvas(canvas, imageElem, data, force) {
        if (canvas !== this.canvas) {
            this.initCanvas(canvas);
            this.lastTransform = [];
        }
        if (canvas.width !== imageElem.width || canvas.height !== imageElem.height) {
            canvas.width = imageElem.width;
            canvas.height = imageElem.height;
            this.lastTransform = [];
        }
        if (force) {
            this.lastTransform = [];
        }
        const transform = [data.hue, data.sat, data.bri];
        if (!this.transformDirty(transform)) {
            if (this.cachedHSVImageLoaded) {
                this.drawCachedHSV();
            }
            return;
        }
        this.lastTransform = transform;
        this.cachedHSVImageLoaded = false;
        this.cachedHSVImage = null;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(imageElem, 0, 0);
        if (this.transformNeeded()) {
            this.applyFilters(data);
        }
    }
    initCanvas(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    transformDirty(transform) {
        if (transform.length !== this.lastTransform.length) {
            return true;
        }
        for (let i = 0; i < transform.length; i++) {
            if (this.lastTransform[i] !== transform[i]) {
                return true;
            }
        }
        return false;
    }
    transformNeeded() {
        return this.lastTransform.findIndex(value => (value !== 0 && value != null)) !== -1;
    }
    applyFilters(meta) {
        const idata = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = idata.data;
        const hMod = ((meta.hue || 0) + 360) % 360;
        const sMod = 1 + (meta.sat || 0) / 100;
        const lMod = 1 + (meta.bri || 0) / 100;
        const dataLength = data.length;
        for (let i = 0; i < dataLength; i += 4) {
            // for each pixel
            // calculate its hsl value
            let r = data[i] / 255;
            let g = data[i + 1] / 255;
            let b = data[i + 2] / 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const delta = max - min;
            let h;
            if (delta === 0) {
                h = 0;
            }
            else if (max === r) {
                h = 60 * (((g - b) / delta + 6) % 6);
            }
            else if (max === g) {
                h = 60 * ((b - r) / delta + 2);
            }
            else {
                h = 60 * ((r - g) / delta + 4);
            }
            let l = (max + min) / 2;
            let s = (delta === 0) ? 0 : (delta / (1 - Math.abs(2 * l - 1)));
            h = (h + hMod) % 360;
            s = Math.min(1, (s * sMod));
            l = (l * lMod);
            const c = (1 - Math.abs(2 * l - 1)) * s;
            const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
            const m = l - c / 2;
            const hSeg = Math.floor(h / 60);
            switch (hSeg) {
                case 0:
                    r = c;
                    g = x;
                    b = 0;
                    break;
                case 1:
                    r = x;
                    g = c;
                    b = 0;
                    break;
                case 2:
                    r = 0;
                    g = c;
                    b = x;
                    break;
                case 3:
                    r = 0;
                    g = x;
                    b = c;
                    break;
                case 4:
                    r = x;
                    g = 0;
                    b = c;
                    break;
                case 5:
                    r = c;
                    g = 0;
                    b = x;
                    break;
            }
            data[i] = Math.round((r + m) * 255);
            data[i + 1] = Math.round((g + m) * 255);
            data[i + 2] = Math.round((b + m) * 255);
        }
        this.ctx.putImageData(idata, 0, 0);
    }
};
ImageTransformerService.ctorParameters = () => [
    { type: _editor_di_preview_service__WEBPACK_IMPORTED_MODULE_2__["DiPreviewService"] }
];
ImageTransformerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ImageTransformerService);



/***/ }),

/***/ "./src/app/preview/mode-buttons/mode-buttons.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/preview/mode-buttons/mode-buttons.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button {\n  color: #333333;\n  text-transform: none;\n  min-height: 0;\n  min-width: 0;\n  line-height: normal;\n  margin: 0;\n  font-weight: 400;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  outline: none;\n  transition: color 0.3s;\n}\n.mat-button:not([disabled]):hover {\n  background-color: transparent !important;\n  color: #1ab0f9;\n}\n.mat-button:not([disabled]).mat-focused {\n  background-color: transparent;\n}\n.mat-button[disabled] {\n  color: #bfbfbf;\n}\n.mat-flat-button {\n  border-radius: 3px;\n  padding: 0 10px;\n  transition: all 0.3s;\n}\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-primary.disabled {\n  color: #bfbfbf;\n  background-color: #e5e5e5;\n  cursor: default;\n}\n.mat-flat-button.mat-primary[disabled] mat-icon, .mat-flat-button.mat-primary.disabled mat-icon {\n  fill: #a2a6ab;\n  color: #a2a6ab;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) {\n  color: #fff;\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]), .mat-flat-button.mat-primary.faux-hover:not([disabled]) {\n  color: #fff;\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]) mat-icon, .mat-flat-button.mat-primary.faux-hover:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary.ng-click-active {\n  color: #fff;\n  background-color: #0279b3 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.ng-click-active mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-secondary {\n  font-weight: 400;\n}\n.mat-fab.amp-fab {\n  box-shadow: none !important;\n  background-color: #c9cccf;\n}\n.mat-fab.amp-fab mat-icon {\n  color: #fff;\n  fill: #fff;\n}\n.mat-fab.amp-fab mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab[disabled] {\n  cursor: auto !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon {\n  fill: #ccc !important;\n  color: #ccc !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon * {\n  fill: #ccc !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]), .mat-fab.amp-fab.faux-hover:not([disabled]), .mat-fab.amp-fab.mat-focused:not([disabled]) {\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) {\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n:host {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  background-color: rgba(41, 51, 63, 0.8);\n  transition: all 0.3s;\n  opacity: 0;\n  position: absolute;\n  z-index: 101;\n}\n:host button {\n  margin: 10px;\n}\n:host:hover {\n  opacity: 1;\n}\n::ng-deep .amp-mode-buttons__hide {\n  opacity: 0;\n  pointer-events: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wcmV2aWV3L21vZGUtYnV0dG9ucy9DOlxcZGNcXHNyYy9hcHBcXHByZXZpZXdcXG1vZGUtYnV0dG9uc1xcbW9kZS1idXR0b25zLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvbW9kZS1idXR0b25zL0M6XFxkY1xcc3JjL2FwcFxcY29yZVxcc2Nzc1xcdmFyc1xcX2NvbG91cnMuc2NzcyIsImFwcC9wcmV2aWV3L21vZGUtYnV0dG9ucy9DOlxcZGNcXHNyYy9hcHBcXGNvcmVcXHNjc3NcXHZhcnNcXF90eXBvZ3JhcGh5LnNjc3MiLCJhcHAvcHJldmlldy9tb2RlLWJ1dHRvbnMvbW9kZS1idXR0b25zLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvbW9kZS1idXR0b25zL0M6XFxkY1xcc3JjL3N0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0VBQ0UsY0NZbUI7RURYbkIsb0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGdCRU9tQjtFRk5uQixnQkFBQTtFQUNBLFlBQUE7RUFDQSw2QkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtBR0pGO0FITUk7RUFDRSx3Q0FBQTtFQUNBLGNDcEJnQjtBRWdCdEI7QUhNSTtFQUNFLDZCQUFBO0FHSk47QUhPRTtFQUNFLGNDUnFCO0FFR3pCO0FIU0E7RUFDRSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtBR05GO0FIU0k7RUFDRSxjQ25CbUI7RURvQm5CLHlCQzVCZTtFRDZCZixlQUFBO0FHUE47QUhTTTtFQUNFLGFDZlM7RURnQlQsY0NoQlM7QUVTakI7QUhXSTtFQUNFLFdDekNRO0VEMENSLHlCQ25EVTtFRG9EViwyQkFBQTtBR1ROO0FIV007RUFDRSxVQzlDTTtFRCtDTixXQy9DTTtBRXNDZDtBSGFJO0VBQ0UsV0NwRFE7RURxRFIsb0NBQUE7RUFDQSwyQkFBQTtBR1hOO0FIYU07RUFDRSxVQ3pETTtFRDBETixXQzFETTtBRStDZDtBSGVJO0VBQ0UsV0MvRFE7RURnRVIsb0NBQUE7RUFDQSwyQkFBQTtBR2JOO0FIZU07RUFDRSxVQ3BFTTtFRHFFTixXQ3JFTTtBRXdEZDtBSGtCRTtFQUNFLGdCQUFBO0FHaEJKO0FIb0JBO0VBQ0UsMkJBQUE7RUFLQSx5QkN6RVc7QUVvRGI7QUh1QkU7RUFJRSxXQzNGVTtFRDRGVixVQzVGVTtBRW9FZDtBSHlCSTtFQUNFLFVDOUZRO0FFdUVkO0FIbUNFO0VBQ0UsdUJBQUE7QUdqQ0o7QUhrQ0k7RUFDRSxxQkFBQTtFQUNBLHNCQUFBO0FHaENOO0FIaUNNO0VBQ0UscUJBQUE7QUcvQlI7QUhxQ0U7RUFDRSx5QkNoSVk7RURpSVosMkJBQUE7QUduQ0o7QUhxQ0k7RUFDRSxVQzNIUTtFRDRIUixXQzVIUTtBRXlGZDtBSG9DTTtFQUNFLFVDOUhNO0FFNEZkO0FIdUNFO0VBQ0Usb0NBQUE7RUFDQSwyQkFBQTtBR3JDSjtBSHVDSTtFQUNFLFVDeElRO0VEeUlSLFdDeklRO0FFb0dkO0FIc0NNO0VBQ0UsVUMzSU07QUV1R2Q7QUM5R0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFFQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFFQSx1Q0FBQTtFQUNBLG9CQUFBO0VBQ0EsVUFBQTtFQUVBLGtCQUFBO0VBQ0EsWUFBQTtBRDhHRjtBQzVHRTtFQUNFLFlBQUE7QUQ4R0o7QUMzR0U7RUFDRSxVQUFBO0FENkdKO0FDekdBO0VBQ0UsVUFBQTtFQUNBLG9CQUFBO0FENEdGIiwiZmlsZSI6ImFwcC9wcmV2aWV3L21vZGUtYnV0dG9ucy9tb2RlLWJ1dHRvbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYnV0dG9uLWZhYi13aWR0aDogNTBweDtcbiRidXR0b24tZmFiLWhlaWdodDogJGJ1dHRvbi1mYWItd2lkdGg7XG4kYnV0dG9uLWZhYi1pY29uLXNpemU6IDMycHg7XG4kYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw6IDIwcHg7XG5cbi5tYXQtYnV0dG9uIHtcbiAgY29sb3I6ICRjb2xvci1kYXJrZXN0LWdyZXk7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBtaW4taGVpZ2h0OiAwO1xuICBtaW4td2lkdGg6IDA7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbjogMDtcbiAgZm9udC13ZWlnaHQ6ICRmb250LXdlaWdodC1ub3JtYWw7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yICR0cmFuc2l0aW9uLXNwZWVkO1xuICAmOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgJjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICRjb2xvci1wcmltYXJ5LWxpZ2h0O1xuICAgIH1cbiAgICAmLm1hdC1mb2N1c2VkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxuICAmW2Rpc2FibGVkXSB7XG4gICAgY29sb3I6ICRjb2xvci15ZXQtYW5vdGhlci1ncmV5O1xuICB9XG59XG5cbi5tYXQtZmxhdC1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmc6IDAgJGJzdS8yO1xuICB0cmFuc2l0aW9uOiBhbGwgJHRyYW5zaXRpb24tc3BlZWQ7XG5cbiAgJi5tYXQtcHJpbWFyeSB7XG4gICAgJltkaXNhYmxlZF0sICYuZGlzYWJsZWQge1xuICAgICAgY29sb3I6ICRjb2xvci15ZXQtYW5vdGhlci1ncmV5O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWxpZ2h0ZXItZ3JleTtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3ItbWlkLWdyZXk7XG4gICAgICAgIGNvbG9yOiAkY29sb3ItbWlkLWdyZXk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgJi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnktbGlnaHQgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5uZy1jbGljay1hY3RpdmUge1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5LWRhcmsgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJi5tYXQtc2Vjb25kYXJ5IHtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG59XG5cbi5tYXQtZmFiLmFtcC1mYWIge1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gIC8vbWFyZ2luOiAzcHg7XG4gIC8vd2lkdGg6ICRidXR0b24tZmFiLXdpZHRoICFpbXBvcnRhbnQ7XG4gIC8vaGVpZ2h0OiAkYnV0dG9uLWZhYi1oZWlnaHQgIWltcG9ydGFudDtcbiAgLy9saW5lLWhlaWdodDogJGJ1dHRvbi1mYWItaGVpZ2h0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItaXJvbjtcblxuICBtYXQtaWNvbiB7XG4gICAgLy9oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZTtcbiAgICAvL3dpZHRoOiAkYnV0dG9uLWZhYi1pY29uLXNpemU7XG4gICAgLy9saW5lLWhlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplO1xuICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICoge1xuICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgIH1cbiAgfVxuXG4gICYuYW1wLWljb24tc21hbGwge1xuICAgIG1hdC1pY29uIHtcbiAgICAgIC8vaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw7XG4gICAgICAvL3dpZHRoOiAkYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw7XG4gICAgICAvL2xpbmUtaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw7XG4gICAgfVxuICB9XG5cbiAgJltkaXNhYmxlZF0ge1xuICAgIGN1cnNvcjogYXV0byAhaW1wb3J0YW50O1xuICAgIG1hdC1pY29uIHtcbiAgICAgIGZpbGw6ICRjb2xvci1saWdodC1ncmV5ICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogJGNvbG9yLWxpZ2h0LWdyZXkgIWltcG9ydGFudDtcbiAgICAgICoge1xuICAgICAgICBmaWxsOiAkY29sb3ItbGlnaHQtZ3JleSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgJjpob3Zlcjpub3QoW2Rpc2FibGVkXSksICYuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSksICYubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICBtYXQtaWNvbiB7XG4gICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgKiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5LWxpZ2h0ICFpbXBvcnRhbnQ7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgbWF0LWljb24ge1xuICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgICoge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIkY29sb3ItcHJpbWFyeTogIzAzOWJlNTtcbiRjb2xvci1wcmltYXJ5LWxpZ2h0OiAjMWFiMGY5O1xuJGNvbG9yLXByaW1hcnktbGlnaHRlcjogIzM5YjFmMztcbiRjb2xvci1wcmltYXJ5LWxpZ2h0ZXJlcjogI2VkZjhmZDtcbiRjb2xvci1wcmltYXJ5LWxpZ2h0ZXN0OiAjZjJmYWZlO1xuJGNvbG9yLWF6enVycm86ICMyNmI2ZWE7XG4kY29sb3ItcHJpbWFyeS1kYXJrOiAjMDI3OWIzO1xuJGNvbG9yLXByaW1hcnktZGlzYWJsZWQ6ICNhM2QxZjI7XG4kY29sb3ItYmxldTogIzAyODhkMTtcbiRjb2xvci13aGl0ZTogI2ZmZjtcbiRjb2xvci1ncmV5OiAjNzQ3OTgwO1xuJGNvbG9yLXJvbGxpbmctc3RvbmU6ICM4MDgwODA7XG4kY29sb3ItbGlnaHRlci1ncmV5OiAjZTVlNWU1O1xuJGNvbG9yLWxpZ2h0LWdyZXk6ICNjY2M7XG4kY29sb3ItZ3JleWVkOiAjZGRkO1xuJGNvbG9yLWxpZ2h0ZXN0LWdyZXk6ICNmMmYyZjI7XG4kY29sb3ItZG92ZS1ncmV5OiAjNjY2NjY2O1xuJGNvbG9yLWd1bm1ldGFsLWdyZXk6ICM1ZTY2NmY7XG4kY29sb3ItZGFya2VzdC1ncmV5OiAjMzMzMzMzO1xuJGNvbG9yLWFub3RoZXItZ3JleTogIzk5OTtcbiRjb2xvci15ZXQtYW5vdGhlci1ncmV5OiAjYmZiZmJmO1xuJGNvbG9yLWlyb246ICNjOWNjY2Y7XG4kY29sb3ItZ3JlZWVlZXk6ICNlZWU7XG4kY29sb3ItZGljay1ncmF5c29uOiAjYzZjNmM2OyBcbiRjb2xvci1hbG1vc3QtaXJvbjogI2NhY2NjZjtcbiRjb2xvci1ncmV5LW9uLWdyZXktZ3JleTogI2Q5ZDlkOTtcbiRjb2xvci1saWdodC1iYWNrZ3JvdW5kLWdyZXk6I2ZhZmFmYTtcbiRjb2xvci1qZWFuLWdyZXk6ICNiMmIyYjI7XG4kY29sb3Itd2lsZC1zYW5kOiAjZjVmNWY1O1xuJGNvbG9yLW1pZC1ncmV5OiAjYTJhNmFiO1xuJGNvbG9yLWRhcmstZ3JleTogIzJlMzY0MTtcbiRjb2xvci1naXJnaW86ICM3QjgwODU7XG4kY29sb3ItdGhlLXNreS1pcy1ncmV5OiAjOURBMkE3O1xuJGNvbG9yLWdyZW95OiAjZTBlMGUwO1xuJGNvbG9yLWJsdWUtZ3JleTogI2U5ZWFlYjtcbiRjb2xvci1ncmV5LWZvZm86ICNmMGYwZjA7XG4kY29sb3ItbWF5YmUtZ3JleTogIzlkYTJhMjtcbiRjb2xvci1taWQtYmxhY2s6ICMyOTMzM2Y7XG4kY29sb3ItbmVybzogIzFEMUQxQjtcbiRjb2xvci1ibGFjazogIzE3MjAyYztcbiRjb2xvci1hYnNvbHV0ZS1ibGFjazogIzAwMDtcbiRjb2xvci1wdXJwbGUtZnVzaW9uOiAjYjc0Y2Q5O1xuJGNvbG9yLXdhcm5pbmctb3JhbmdlOiAjZmY2NjAwO1xuJGNvbG9yLWljb24tb3JhbmdlOiAjZmY4YTAwO1xuJGNvbG9yLWVycm9yLXJlZDogI2ZmMzM2NjtcbiRjb2xvci1kYXJrLXJlZDogI2U1MjI1MztcbiRjb2xvci1yZWQtcmVkOiAjZjAwO1xuJGNvbG9yLWFub3RoZXItcmVkOiAjZGQyYzAwO1xuJGNvbG9yLWRhbmdlci1yZWQ6ICNmNDQzMzY7XG4kY29sb3ItcGluazogI2ZmOThiMTtcbiRjb2xvci12YWxpZC1ncmVlbjogIzdlZDkwMDtcbiRjb2xvci1wdWJsaXNoZWQtZ3JlZW46ICM2NmNjMDA7XG4kY29sb3Itc3Ryb25nLWdyZWVuOiAjMGEwO1xuJGNvbG9yLWxpZ2h0LWJsdWU6ICM5OWQ4ZjI7XG4kY29sb3ItbGlnaHRlci1ibHVlOiAjZDFlZmZlO1xuJGNvbG9yLWxpZ2h0LWxpZ2h0LWJsdWU6ICNhNmQ3ZWY7XG4kY29sb3ItZGFyay1ibHVlOiAjMDM5YmU1O1xuJGNvbG9yLWh5cGVybGluay1ibHVlOiAjMDAwMGVlO1xuJGNvbG9yLXdoeS1kby13ZS1uZWVkLWFub3RoZXItYmx1ZTogI2E5ZTFmZDtcbiRjb2xvci1wcmltYXJ5LTdwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjA3KTtcbiRjb2xvci1wcmltYXJ5LTEwcDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC4xKTtcbiRjb2xvci1wcmltYXJ5LTIwcDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC4yKTtcbiRjb2xvci1wcmltYXJ5LTQwcDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC40KTtcbiRjb2xvci1ibGFjay0xMHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjEpO1xuJGNvbG9yLWJsYWNrLTIwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuMik7XG4kY29sb3ItYmxhY2stNDBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC40KTtcbiRjb2xvci1ibGFjay01MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjUpO1xuJGNvbG9yLWJsYWNrLTYwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNik7XG4kY29sb3ItYmxhY2stNzBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC43KTtcbiRjb2xvci1ibGFjay04MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjgpO1xuJGNvbG9yLXdoaXRlLTBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMCk7XG4kY29sb3Itd2hpdGUtMjBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC4yKTtcbiRjb2xvci13aGl0ZS00MHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjQpO1xuJGNvbG9yLXdoaXRlLTUwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuNSk7XG4kY29sb3Itd2hpdGUtODBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC44KTtcbiRjb2xvci1yb2xsaW5nLXN0b25lLTIwcDogcmdiYSgkY29sb3Itcm9sbGluZy1zdG9uZSwgMC4yKTtcbiRjb2xvci1ncmV5ZWQtNTBwOiByZ2JhKCRjb2xvci1ncmV5ZWQsIDAuNSk7XG4kY29sb3ItbWlkLWJsYWNrLTUwcDogcmdiYSgkY29sb3ItbWlkLWJsYWNrLCAwLjUpO1xuJGNvbG9yLW1pZC1ibGFjay04MHA6IHJnYmEoJGNvbG9yLW1pZC1ibGFjaywgMC44KTtcbiRjb2xvci1tYXliZS1ncmV5LTMwcDogcmdiYSgkY29sb3ItbWF5YmUtZ3JleSwgMC4zKTtcbiRjb2xvci1tYXliZS1ncmV5LTYwcDogcmdiYSgkY29sb3ItbWF5YmUtZ3JleSwgMC42KTsiLCIkYmFzZS1mb250LXNpemU6IDEzcHg7XG4kYmZ6OiAkYmFzZS1mb250LXNpemU7XG4kZm9udC1zaXplLXh4eC1sYXJnZTogMzJweDtcbiRmb250LXNpemUteHgtbGFyZ2U6IDI3cHg7XG4kZm9udC1zaXplLXgtbGFyZ2U6IDIycHg7XG4kZm9udC1zaXplLXhwLWxhcmdlOiAyNHB4O1xuJGZvbnQtc2l6ZS10aXRsZTogMThweDtcbiRmb250LXNpemUteC10aXRsZTogMTlweDtcbiRmb250LXNpemUteHgtdGl0bGU6IDIwcHg7XG4kZm9udC1zaXplLXh4eC10aXRsZTogMjFweDtcbiRmb250LXNpemUtbGFyZ2U6IDE2cHg7XG4kZm9udC1zaXplLWFsbW9zdC1sYXJnZTogMTVweDtcbiRmb250LXNpemUtbWlkOiAxNHB4O1xuJGZvbnQtc2l6ZS1zbWFsbDogMTJweDtcbiRmb250LXNpemUtdGlueTogMTFweDtcbiRmb250LXNpemUteC10aW55OiAxMHB4O1xuJGZvbnQtc2l6ZS14cy10aW55OiA5LjVweDtcblxuJGZvbnQtd2VpZ2h0LWxpZ2h0OiAzMDA7XG4kZm9udC13ZWlnaHQtbm9ybWFsOiA0MDA7XG4kZm9udC13ZWlnaHQtbWVkaXVtOiA1MDA7XG4kZm9udC13ZWlnaHQtYm9sZDogNzAwO1xuIiwiLm1hdC1idXR0b24ge1xuICBjb2xvcjogIzMzMzMzMztcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIG1pbi13aWR0aDogMDtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgbWFyZ2luOiAwO1xuICBmb250LXdlaWdodDogNDAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBvdXRsaW5lOiBub25lO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzO1xufVxuLm1hdC1idXR0b246bm90KFtkaXNhYmxlZF0pOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgY29sb3I6ICMxYWIwZjk7XG59XG4ubWF0LWJ1dHRvbjpub3QoW2Rpc2FibGVkXSkubWF0LWZvY3VzZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbi5tYXQtYnV0dG9uW2Rpc2FibGVkXSB7XG4gIGNvbG9yOiAjYmZiZmJmO1xufVxuXG4ubWF0LWZsYXQtYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwIDEwcHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeVtkaXNhYmxlZF0sIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZGlzYWJsZWQge1xuICBjb2xvcjogI2JmYmZiZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeVtkaXNhYmxlZF0gbWF0LWljb24sIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZGlzYWJsZWQgbWF0LWljb24ge1xuICBmaWxsOiAjYTJhNmFiO1xuICBjb2xvcjogI2EyYTZhYjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzliZTU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5OmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWFiMGY5ICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnk6aG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm5nLWNsaWNrLWFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDI3OWIzICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubmctY2xpY2stYWN0aXZlIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1zZWNvbmRhcnkge1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4ubWF0LWZhYi5hbXAtZmFiIHtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzljY2NmO1xufVxuLm1hdC1mYWIuYW1wLWZhYiBtYXQtaWNvbiB7XG4gIGNvbG9yOiAjZmZmO1xuICBmaWxsOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYiBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWJbZGlzYWJsZWRdIHtcbiAgY3Vyc29yOiBhdXRvICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNjY2MgIWltcG9ydGFudDtcbiAgY29sb3I6ICNjY2MgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWJbZGlzYWJsZWRdIG1hdC1pY29uICoge1xuICBmaWxsOiAjY2NjICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLm1hdC1mYWIuYW1wLWZhYi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLm1hdC1mYWIuYW1wLWZhYi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5YmU1O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiwgLm1hdC1mYWIuYW1wLWZhYi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiwgLm1hdC1mYWIuYW1wLWZhYi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6aG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICosIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiwgLm1hdC1mYWIuYW1wLWZhYi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiB7XG4gIGZpbGw6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWFiMGY5ICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICoge1xuICBmaWxsOiAjZmZmO1xufVxuXG46aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQxLCA1MSwgNjMsIDAuOCk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xuICBvcGFjaXR5OiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDEwMTtcbn1cbjpob3N0IGJ1dHRvbiB7XG4gIG1hcmdpbjogMTBweDtcbn1cbjpob3N0OmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuOjpuZy1kZWVwIC5hbXAtbW9kZS1idXR0b25zX19oaWRlIHtcbiAgb3BhY2l0eTogMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59IiwiQGltcG9ydCBcIi4uLy4uL2NvcmUvY29yZS5zY3NzXCI7XG5cbjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcblxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQxLDUxLDYzLC44KTtcbiAgdHJhbnNpdGlvbjogYWxsIC4zcztcbiAgb3BhY2l0eTogMDtcblxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDEwMTtcblxuICBidXR0b24ge1xuICAgIG1hcmdpbjogMTBweDtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuOjpuZy1kZWVwIC5hbXAtbW9kZS1idXR0b25zX19oaWRlIHtcbiAgb3BhY2l0eTogMDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/preview/mode-buttons/mode-buttons.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/preview/mode-buttons/mode-buttons.component.ts ***!
  \****************************************************************/
/*! exports provided: ModeButtonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModeButtonsComponent", function() { return ModeButtonsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/editor/di-field.service */ "./src/app/editor/di-field.service.ts");
/* harmony import */ var src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/editor/editor.service */ "./src/app/editor/editor.service.ts");




let ModeButtonsComponent = class ModeButtonsComponent {
    constructor(field, editor) {
        this.field = field;
        this.editor = editor;
        this.updateData();
        field.fieldUpdated.subscribe(data => {
            this.updateData();
        });
        editor.modeChange.subscribe(mode => {
            this.hidden = !this.showButtons;
        });
    }
    get showButtons() {
        return this.editor.previewMode === src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_3__["PreviewMode"].View;
    }
    updateData() {
        const data = this.field.data;
        this.hasImage = data != null && data.image != null && data.image.name !== '';
    }
    ngOnInit() {
    }
    changeMode(mode) {
        this.editor.modeRequest(mode);
    }
};
ModeButtonsComponent.ctorParameters = () => [
    { type: src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_2__["DiFieldService"] },
    { type: src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_3__["EditorService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.amp-mode-buttons__hide')
], ModeButtonsComponent.prototype, "hidden", void 0);
ModeButtonsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-mode-buttons',
        template: __webpack_require__(/*! raw-loader!./mode-buttons.component.html */ "./node_modules/raw-loader/index.js!./src/app/preview/mode-buttons/mode-buttons.component.html"),
        styles: [__webpack_require__(/*! ./mode-buttons.component.scss */ "./src/app/preview/mode-buttons/mode-buttons.component.scss")]
    })
], ModeButtonsComponent);



/***/ }),

/***/ "./src/app/preview/preview-canvas/preview-canvas.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/preview/preview-canvas/preview-canvas.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button {\n  color: #333333;\n  text-transform: none;\n  min-height: 0;\n  min-width: 0;\n  line-height: normal;\n  margin: 0;\n  font-weight: 400;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  outline: none;\n  transition: color 0.3s;\n}\n.mat-button:not([disabled]):hover {\n  background-color: transparent !important;\n  color: #1ab0f9;\n}\n.mat-button:not([disabled]).mat-focused {\n  background-color: transparent;\n}\n.mat-button[disabled] {\n  color: #bfbfbf;\n}\n.mat-flat-button {\n  border-radius: 3px;\n  padding: 0 10px;\n  transition: all 0.3s;\n}\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-primary.disabled {\n  color: #bfbfbf;\n  background-color: #e5e5e5;\n  cursor: default;\n}\n.mat-flat-button.mat-primary[disabled] mat-icon, .mat-flat-button.mat-primary.disabled mat-icon {\n  fill: #a2a6ab;\n  color: #a2a6ab;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) {\n  color: #fff;\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]), .mat-flat-button.mat-primary.faux-hover:not([disabled]) {\n  color: #fff;\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]) mat-icon, .mat-flat-button.mat-primary.faux-hover:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary.ng-click-active {\n  color: #fff;\n  background-color: #0279b3 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.ng-click-active mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-secondary {\n  font-weight: 400;\n}\n.mat-fab.amp-fab {\n  box-shadow: none !important;\n  background-color: #c9cccf;\n}\n.mat-fab.amp-fab mat-icon {\n  color: #fff;\n  fill: #fff;\n}\n.mat-fab.amp-fab mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab[disabled] {\n  cursor: auto !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon {\n  fill: #ccc !important;\n  color: #ccc !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon * {\n  fill: #ccc !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]), .mat-fab.amp-fab.faux-hover:not([disabled]), .mat-fab.amp-fab.mat-focused:not([disabled]) {\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) {\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n:host {\n  height: 458px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  position: relative;\n}\n.amp-preview-canvas__imagecontainer {\n  position: absolute;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.amp-preview-canvas__imagesplit {\n  position: absolute;\n  display: flex;\n  width: 100%;\n  height: 100%;\n}\n.amp-preview-canvas__dipreview {\n  width: 200px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  position: relative;\n  transition: 0.5s margin-right;\n  background-color: #fcfcfc;\n}\n.amp-preview-canvas__dipreview--hide {\n  margin-right: -201px;\n}\n.amp-preview-canvas__dipreview img {\n  padding: 5px;\n  background: white;\n  margin: 5px;\n  border: 1px solid #ccc;\n}\n.amp-preview-canvas__previewarea {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n.amp-preview-canvas__canvas {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.amp-preview-canvas__image {\n  position: absolute;\n  pointer-events: none;\n}\n.amp-preview-canvas__croprect {\n  outline: 1000px solid rgba(255, 255, 255, 0.8);\n  border: 2px solid #039be5;\n  position: absolute;\n  -webkit-animation: 0.5s border, 0.5s outline-color;\n          animation: 0.5s border, 0.5s outline-color;\n}\n.amp-preview-canvas__croprect--inactive {\n  border: 2px solid #ccc;\n}\n.amp-preview-canvas__croprect--simulated {\n  border: none;\n  outline-color: white;\n}\n.amp-preview-canvas__poi {\n  position: absolute;\n}\n.amp-preview-canvas__poi-plus {\n  stroke-dasharray: 0;\n  fill: #fff;\n  fill-opacity: 1;\n}\n.amp-preview-canvas__poi-background {\n  opacity: 0.5;\n  color: rgba(0, 0, 0, 0.87);\n}\n.amp-preview-canvas__poi--selected {\n  stroke: #fff;\n  stroke-dasharray: 4 4;\n}\n.amp-preview-canvas__crophandle {\n  width: 8px;\n  height: 8px;\n  background-color: #039be5;\n  margin-left: -4px;\n  margin-top: -4px;\n  z-index: 2;\n  position: absolute;\n}\n.amp-preview-canvas__crophandle--topleft {\n  top: 0;\n  left: 0;\n}\n.amp-preview-canvas__crophandle--topright {\n  top: 0;\n  left: 100%;\n}\n.amp-preview-canvas__crophandle--bottomright {\n  top: 100%;\n  left: 100%;\n}\n.amp-preview-canvas__crophandle--bottomleft {\n  top: 100%;\n  left: 0;\n}\n.amp-preview-canvas__overlay {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n.amp-preview-canvas__overlay button {\n  margin: 10px;\n}\n.amp-preview-canvas__loading {\n  z-index: 100;\n}\n.amp-preview-canvas__loading--hide {\n  pointer-events: none;\n  opacity: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wcmV2aWV3L3ByZXZpZXctY2FudmFzL0M6XFxkY1xcc3JjL2FwcFxccHJldmlld1xccHJldmlldy1jYW52YXNcXHByZXZpZXctY2FudmFzLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvcHJldmlldy1jYW52YXMvQzpcXGRjXFxzcmMvYXBwXFxjb3JlXFxzY3NzXFx2YXJzXFxfY29sb3Vycy5zY3NzIiwiYXBwL3ByZXZpZXcvcHJldmlldy1jYW52YXMvQzpcXGRjXFxzcmMvYXBwXFxjb3JlXFxzY3NzXFx2YXJzXFxfdHlwb2dyYXBoeS5zY3NzIiwiYXBwL3ByZXZpZXcvcHJldmlldy1jYW52YXMvcHJldmlldy1jYW52YXMuY29tcG9uZW50LnNjc3MiLCJhcHAvcHJldmlldy9wcmV2aWV3LWNhbnZhcy9DOlxcZGNcXHNyYy9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQTtFQUNFLGNDWW1CO0VEWG5CLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxnQkVPbUI7RUZObkIsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsNkJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUdKRjtBSE1JO0VBQ0Usd0NBQUE7RUFDQSxjQ3BCZ0I7QUVnQnRCO0FITUk7RUFDRSw2QkFBQTtBR0pOO0FIT0U7RUFDRSxjQ1JxQjtBRUd6QjtBSFNBO0VBQ0Usa0JBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7QUdORjtBSFNJO0VBQ0UsY0NuQm1CO0VEb0JuQix5QkM1QmU7RUQ2QmYsZUFBQTtBR1BOO0FIU007RUFDRSxhQ2ZTO0VEZ0JULGNDaEJTO0FFU2pCO0FIV0k7RUFDRSxXQ3pDUTtFRDBDUix5QkNuRFU7RURvRFYsMkJBQUE7QUdUTjtBSFdNO0VBQ0UsVUM5Q007RUQrQ04sV0MvQ007QUVzQ2Q7QUhhSTtFQUNFLFdDcERRO0VEcURSLG9DQUFBO0VBQ0EsMkJBQUE7QUdYTjtBSGFNO0VBQ0UsVUN6RE07RUQwRE4sV0MxRE07QUUrQ2Q7QUhlSTtFQUNFLFdDL0RRO0VEZ0VSLG9DQUFBO0VBQ0EsMkJBQUE7QUdiTjtBSGVNO0VBQ0UsVUNwRU07RURxRU4sV0NyRU07QUV3RGQ7QUhrQkU7RUFDRSxnQkFBQTtBR2hCSjtBSG9CQTtFQUNFLDJCQUFBO0VBS0EseUJDekVXO0FFb0RiO0FIdUJFO0VBSUUsV0MzRlU7RUQ0RlYsVUM1RlU7QUVvRWQ7QUh5Qkk7RUFDRSxVQzlGUTtBRXVFZDtBSG1DRTtFQUNFLHVCQUFBO0FHakNKO0FIa0NJO0VBQ0UscUJBQUE7RUFDQSxzQkFBQTtBR2hDTjtBSGlDTTtFQUNFLHFCQUFBO0FHL0JSO0FIcUNFO0VBQ0UseUJDaElZO0VEaUlaLDJCQUFBO0FHbkNKO0FIcUNJO0VBQ0UsVUMzSFE7RUQ0SFIsV0M1SFE7QUV5RmQ7QUhvQ007RUFDRSxVQzlITTtBRTRGZDtBSHVDRTtFQUNFLG9DQUFBO0VBQ0EsMkJBQUE7QUdyQ0o7QUh1Q0k7RUFDRSxVQ3hJUTtFRHlJUixXQ3pJUTtBRW9HZDtBSHNDTTtFQUNFLFVDM0lNO0FFdUdkO0FDOUdBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBRGlIRjtBQzdHRTtFQUNFLGtCQUFBO0VBQ0EseUJBQUE7S0FBQSxzQkFBQTtNQUFBLHFCQUFBO1VBQUEsaUJBQUE7QURnSEo7QUM5R0U7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBRGdISjtBQzlHRTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSw2QkFBQTtFQUNBLHlCQUFBO0FEZ0hKO0FDOUdJO0VBQ0Usb0JBQUE7QURnSE47QUM3R0k7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0Esc0JBQUE7QUQrR047QUM1R0U7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FEOEdKO0FDNUdFO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FEOEdKO0FDNUdFO0VBQ0Usa0JBQUE7RUFDQSxvQkFBQTtBRDhHSjtBQzVHRTtFQUNFLDhDQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtEQUFBO1VBQUEsMENBQUE7QUQ4R0o7QUM3R0k7RUFDRSxzQkFBQTtBRCtHTjtBQzdHSTtFQUNFLFlBQUE7RUFDQSxvQkFBQTtBRCtHTjtBQzVHRTtFQUNFLGtCQUFBO0FEOEdKO0FDNUdJO0VBQ0UsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtBRDhHTjtBQzNHSTtFQUNFLFlBQUE7RUFDQSwwQkFBQTtBRDZHTjtBQzFHSTtFQUNFLFlBQUE7RUFDQSxxQkFBQTtBRDRHTjtBQ3pHRTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EseUJIN0ZZO0VHOEZaLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7QUQyR0o7QUMxR0k7RUFDRSxNQUFBO0VBQ0EsT0FBQTtBRDRHTjtBQzFHSTtFQUNFLE1BQUE7RUFDQSxVQUFBO0FENEdOO0FDMUdJO0VBQ0UsU0FBQTtFQUNBLFVBQUE7QUQ0R047QUMxR0k7RUFDRSxTQUFBO0VBQ0EsT0FBQTtBRDRHTjtBQ3pHRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUVBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBRDBHSjtBQ3hHSTtFQUNFLFlBQUE7QUQwR047QUN0R0U7RUFDRSxZQUFBO0FEd0dKO0FDdEdJO0VBQ0Usb0JBQUE7RUFDQSxVQUFBO0FEd0dOIiwiZmlsZSI6ImFwcC9wcmV2aWV3L3ByZXZpZXctY2FudmFzL3ByZXZpZXctY2FudmFzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiJGJ1dHRvbi1mYWItd2lkdGg6IDUwcHg7XG4kYnV0dG9uLWZhYi1oZWlnaHQ6ICRidXR0b24tZmFiLXdpZHRoO1xuJGJ1dHRvbi1mYWItaWNvbi1zaXplOiAzMnB4O1xuJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsOiAyMHB4O1xuXG4ubWF0LWJ1dHRvbiB7XG4gIGNvbG9yOiAkY29sb3ItZGFya2VzdC1ncmV5O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgbWluLWhlaWdodDogMDtcbiAgbWluLXdpZHRoOiAwO1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIGZvbnQtd2VpZ2h0OiAkZm9udC13ZWlnaHQtbm9ybWFsO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBvdXRsaW5lOiBub25lO1xuICB0cmFuc2l0aW9uOiBjb2xvciAkdHJhbnNpdGlvbi1zcGVlZDtcbiAgJjpub3QoW2Rpc2FibGVkXSkge1xuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodDtcbiAgICB9XG4gICAgJi5tYXQtZm9jdXNlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gIH1cbiAgJltkaXNhYmxlZF0ge1xuICAgIGNvbG9yOiAkY29sb3IteWV0LWFub3RoZXItZ3JleTtcbiAgfVxufVxuXG4ubWF0LWZsYXQtYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwICRic3UvMjtcbiAgdHJhbnNpdGlvbjogYWxsICR0cmFuc2l0aW9uLXNwZWVkO1xuXG4gICYubWF0LXByaW1hcnkge1xuICAgICZbZGlzYWJsZWRdLCAmLmRpc2FibGVkIHtcbiAgICAgIGNvbG9yOiAkY29sb3IteWV0LWFub3RoZXItZ3JleTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1saWdodGVyLWdyZXk7XG4gICAgICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLW1pZC1ncmV5O1xuICAgICAgICBjb2xvcjogJGNvbG9yLW1pZC1ncmV5O1xuICAgICAgfVxuICAgIH1cblxuICAgICYubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJjpob3Zlcjpub3QoW2Rpc2FibGVkXSksICYuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5LWxpZ2h0ICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cblxuICAgICYubmctY2xpY2stYWN0aXZlIHtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1kYXJrICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICAgIG1hdC1pY29uIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYubWF0LXNlY29uZGFyeSB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxufVxuXG4ubWF0LWZhYi5hbXAtZmFiIHtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAvL21hcmdpbjogM3B4O1xuICAvL3dpZHRoOiAkYnV0dG9uLWZhYi13aWR0aCAhaW1wb3J0YW50O1xuICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaGVpZ2h0ICFpbXBvcnRhbnQ7XG4gIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWhlaWdodDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWlyb247XG5cbiAgbWF0LWljb24ge1xuICAgIC8vaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemU7XG4gICAgLy93aWR0aDogJGJ1dHRvbi1mYWItaWNvbi1zaXplO1xuICAgIC8vbGluZS1oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZTtcbiAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAqIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICB9XG4gIH1cblxuICAmLmFtcC1pY29uLXNtYWxsIHtcbiAgICBtYXQtaWNvbiB7XG4gICAgICAvL2hlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgICAgLy93aWR0aDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgICAgLy9saW5lLWhlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplLXNtYWxsO1xuICAgIH1cbiAgfVxuXG4gICZbZGlzYWJsZWRdIHtcbiAgICBjdXJzb3I6IGF1dG8gIWltcG9ydGFudDtcbiAgICBtYXQtaWNvbiB7XG4gICAgICBmaWxsOiAkY29sb3ItbGlnaHQtZ3JleSAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICRjb2xvci1saWdodC1ncmV5ICFpbXBvcnRhbnQ7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLWxpZ2h0LWdyZXkgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gICY6aG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pLCAmLm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgbWF0LWljb24ge1xuICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgICoge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeS1saWdodCAhaW1wb3J0YW50O1xuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgIG1hdC1pY29uIHtcbiAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICAqIHtcbiAgICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiJGNvbG9yLXByaW1hcnk6ICMwMzliZTU7XG4kY29sb3ItcHJpbWFyeS1saWdodDogIzFhYjBmOTtcbiRjb2xvci1wcmltYXJ5LWxpZ2h0ZXI6ICMzOWIxZjM7XG4kY29sb3ItcHJpbWFyeS1saWdodGVyZXI6ICNlZGY4ZmQ7XG4kY29sb3ItcHJpbWFyeS1saWdodGVzdDogI2YyZmFmZTtcbiRjb2xvci1henp1cnJvOiAjMjZiNmVhO1xuJGNvbG9yLXByaW1hcnktZGFyazogIzAyNzliMztcbiRjb2xvci1wcmltYXJ5LWRpc2FibGVkOiAjYTNkMWYyO1xuJGNvbG9yLWJsZXU6ICMwMjg4ZDE7XG4kY29sb3Itd2hpdGU6ICNmZmY7XG4kY29sb3ItZ3JleTogIzc0Nzk4MDtcbiRjb2xvci1yb2xsaW5nLXN0b25lOiAjODA4MDgwO1xuJGNvbG9yLWxpZ2h0ZXItZ3JleTogI2U1ZTVlNTtcbiRjb2xvci1saWdodC1ncmV5OiAjY2NjO1xuJGNvbG9yLWdyZXllZDogI2RkZDtcbiRjb2xvci1saWdodGVzdC1ncmV5OiAjZjJmMmYyO1xuJGNvbG9yLWRvdmUtZ3JleTogIzY2NjY2NjtcbiRjb2xvci1ndW5tZXRhbC1ncmV5OiAjNWU2NjZmO1xuJGNvbG9yLWRhcmtlc3QtZ3JleTogIzMzMzMzMztcbiRjb2xvci1hbm90aGVyLWdyZXk6ICM5OTk7XG4kY29sb3IteWV0LWFub3RoZXItZ3JleTogI2JmYmZiZjtcbiRjb2xvci1pcm9uOiAjYzljY2NmO1xuJGNvbG9yLWdyZWVlZWV5OiAjZWVlO1xuJGNvbG9yLWRpY2stZ3JheXNvbjogI2M2YzZjNjsgXG4kY29sb3ItYWxtb3N0LWlyb246ICNjYWNjY2Y7XG4kY29sb3ItZ3JleS1vbi1ncmV5LWdyZXk6ICNkOWQ5ZDk7XG4kY29sb3ItbGlnaHQtYmFja2dyb3VuZC1ncmV5OiNmYWZhZmE7XG4kY29sb3ItamVhbi1ncmV5OiAjYjJiMmIyO1xuJGNvbG9yLXdpbGQtc2FuZDogI2Y1ZjVmNTtcbiRjb2xvci1taWQtZ3JleTogI2EyYTZhYjtcbiRjb2xvci1kYXJrLWdyZXk6ICMyZTM2NDE7XG4kY29sb3ItZ2lyZ2lvOiAjN0I4MDg1O1xuJGNvbG9yLXRoZS1za3ktaXMtZ3JleTogIzlEQTJBNztcbiRjb2xvci1ncmVveTogI2UwZTBlMDtcbiRjb2xvci1ibHVlLWdyZXk6ICNlOWVhZWI7XG4kY29sb3ItZ3JleS1mb2ZvOiAjZjBmMGYwO1xuJGNvbG9yLW1heWJlLWdyZXk6ICM5ZGEyYTI7XG4kY29sb3ItbWlkLWJsYWNrOiAjMjkzMzNmO1xuJGNvbG9yLW5lcm86ICMxRDFEMUI7XG4kY29sb3ItYmxhY2s6ICMxNzIwMmM7XG4kY29sb3ItYWJzb2x1dGUtYmxhY2s6ICMwMDA7XG4kY29sb3ItcHVycGxlLWZ1c2lvbjogI2I3NGNkOTtcbiRjb2xvci13YXJuaW5nLW9yYW5nZTogI2ZmNjYwMDtcbiRjb2xvci1pY29uLW9yYW5nZTogI2ZmOGEwMDtcbiRjb2xvci1lcnJvci1yZWQ6ICNmZjMzNjY7XG4kY29sb3ItZGFyay1yZWQ6ICNlNTIyNTM7XG4kY29sb3ItcmVkLXJlZDogI2YwMDtcbiRjb2xvci1hbm90aGVyLXJlZDogI2RkMmMwMDtcbiRjb2xvci1kYW5nZXItcmVkOiAjZjQ0MzM2O1xuJGNvbG9yLXBpbms6ICNmZjk4YjE7XG4kY29sb3ItdmFsaWQtZ3JlZW46ICM3ZWQ5MDA7XG4kY29sb3ItcHVibGlzaGVkLWdyZWVuOiAjNjZjYzAwO1xuJGNvbG9yLXN0cm9uZy1ncmVlbjogIzBhMDtcbiRjb2xvci1saWdodC1ibHVlOiAjOTlkOGYyO1xuJGNvbG9yLWxpZ2h0ZXItYmx1ZTogI2QxZWZmZTtcbiRjb2xvci1saWdodC1saWdodC1ibHVlOiAjYTZkN2VmO1xuJGNvbG9yLWRhcmstYmx1ZTogIzAzOWJlNTtcbiRjb2xvci1oeXBlcmxpbmstYmx1ZTogIzAwMDBlZTtcbiRjb2xvci13aHktZG8td2UtbmVlZC1hbm90aGVyLWJsdWU6ICNhOWUxZmQ7XG4kY29sb3ItcHJpbWFyeS03cDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC4wNyk7XG4kY29sb3ItcHJpbWFyeS0xMHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMSk7XG4kY29sb3ItcHJpbWFyeS0yMHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuMik7XG4kY29sb3ItcHJpbWFyeS00MHA6IHJnYmEoJGNvbG9yLXByaW1hcnksIDAuNCk7XG4kY29sb3ItYmxhY2stMTBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC4xKTtcbiRjb2xvci1ibGFjay0yMHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjIpO1xuJGNvbG9yLWJsYWNrLTQwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNCk7XG4kY29sb3ItYmxhY2stNTBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC41KTtcbiRjb2xvci1ibGFjay02MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjYpO1xuJGNvbG9yLWJsYWNrLTcwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNyk7XG4kY29sb3ItYmxhY2stODBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC44KTtcbiRjb2xvci13aGl0ZS0wcDogcmdiYSgkY29sb3Itd2hpdGUsIDApO1xuJGNvbG9yLXdoaXRlLTIwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuMik7XG4kY29sb3Itd2hpdGUtNDBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC40KTtcbiRjb2xvci13aGl0ZS01MHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjUpO1xuJGNvbG9yLXdoaXRlLTgwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuOCk7XG4kY29sb3Itcm9sbGluZy1zdG9uZS0yMHA6IHJnYmEoJGNvbG9yLXJvbGxpbmctc3RvbmUsIDAuMik7XG4kY29sb3ItZ3JleWVkLTUwcDogcmdiYSgkY29sb3ItZ3JleWVkLCAwLjUpO1xuJGNvbG9yLW1pZC1ibGFjay01MHA6IHJnYmEoJGNvbG9yLW1pZC1ibGFjaywgMC41KTtcbiRjb2xvci1taWQtYmxhY2stODBwOiByZ2JhKCRjb2xvci1taWQtYmxhY2ssIDAuOCk7XG4kY29sb3ItbWF5YmUtZ3JleS0zMHA6IHJnYmEoJGNvbG9yLW1heWJlLWdyZXksIDAuMyk7XG4kY29sb3ItbWF5YmUtZ3JleS02MHA6IHJnYmEoJGNvbG9yLW1heWJlLWdyZXksIDAuNik7IiwiJGJhc2UtZm9udC1zaXplOiAxM3B4O1xuJGJmejogJGJhc2UtZm9udC1zaXplO1xuJGZvbnQtc2l6ZS14eHgtbGFyZ2U6IDMycHg7XG4kZm9udC1zaXplLXh4LWxhcmdlOiAyN3B4O1xuJGZvbnQtc2l6ZS14LWxhcmdlOiAyMnB4O1xuJGZvbnQtc2l6ZS14cC1sYXJnZTogMjRweDtcbiRmb250LXNpemUtdGl0bGU6IDE4cHg7XG4kZm9udC1zaXplLXgtdGl0bGU6IDE5cHg7XG4kZm9udC1zaXplLXh4LXRpdGxlOiAyMHB4O1xuJGZvbnQtc2l6ZS14eHgtdGl0bGU6IDIxcHg7XG4kZm9udC1zaXplLWxhcmdlOiAxNnB4O1xuJGZvbnQtc2l6ZS1hbG1vc3QtbGFyZ2U6IDE1cHg7XG4kZm9udC1zaXplLW1pZDogMTRweDtcbiRmb250LXNpemUtc21hbGw6IDEycHg7XG4kZm9udC1zaXplLXRpbnk6IDExcHg7XG4kZm9udC1zaXplLXgtdGlueTogMTBweDtcbiRmb250LXNpemUteHMtdGlueTogOS41cHg7XG5cbiRmb250LXdlaWdodC1saWdodDogMzAwO1xuJGZvbnQtd2VpZ2h0LW5vcm1hbDogNDAwO1xuJGZvbnQtd2VpZ2h0LW1lZGl1bTogNTAwO1xuJGZvbnQtd2VpZ2h0LWJvbGQ6IDcwMDtcbiIsIi5tYXQtYnV0dG9uIHtcbiAgY29sb3I6ICMzMzMzMzM7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBtaW4taGVpZ2h0OiAwO1xuICBtaW4td2lkdGg6IDA7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbjogMDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgb3V0bGluZTogbm9uZTtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4zcztcbn1cbi5tYXQtYnV0dG9uOm5vdChbZGlzYWJsZWRdKTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjMWFiMGY5O1xufVxuLm1hdC1idXR0b246bm90KFtkaXNhYmxlZF0pLm1hdC1mb2N1c2VkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4ubWF0LWJ1dHRvbltkaXNhYmxlZF0ge1xuICBjb2xvcjogI2JmYmZiZjtcbn1cblxuLm1hdC1mbGF0LWJ1dHRvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgcGFkZGluZzogMCAxMHB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnlbZGlzYWJsZWRdLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmRpc2FibGVkIHtcbiAgY29sb3I6ICNiZmJmYmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlNWU1ZTU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnlbZGlzYWJsZWRdIG1hdC1pY29uLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmRpc2FibGVkIG1hdC1pY29uIHtcbiAgZmlsbDogI2EyYTZhYjtcbiAgY29sb3I6ICNhMmE2YWI7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5YmU1O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm1hdC1mb2N1c2VkOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeTpob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhYjBmOSAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5OmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5uZy1jbGljay1hY3RpdmUge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAyNzliMyAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm5nLWNsaWNrLWFjdGl2ZSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtc2Vjb25kYXJ5IHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLm1hdC1mYWIuYW1wLWZhYiB7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2M5Y2NjZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWIgbWF0LWljb24ge1xuICBjb2xvcjogI2ZmZjtcbiAgZmlsbDogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWIgbWF0LWljb24gKiB7XG4gIGZpbGw6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSB7XG4gIGN1cnNvcjogYXV0byAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYltkaXNhYmxlZF0gbWF0LWljb24ge1xuICBmaWxsOiAjY2NjICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiAjY2NjICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2NjYyAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAzOWJlNTtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuLm1hdC1mYWIuYW1wLWZhYjpob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24sIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqLCAubWF0LWZhYi5hbXAtZmFiLmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICosIC5tYXQtZmFiLmFtcC1mYWIubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICoge1xuICBmaWxsOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFhYjBmOSAhaW1wb3J0YW50O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2ZmZjtcbn1cblxuOmhvc3Qge1xuICBoZWlnaHQ6IDQ1OHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uYW1wLXByZXZpZXctY2FudmFzX19pbWFnZWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19pbWFnZXNwbGl0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fZGlwcmV2aWV3IHtcbiAgd2lkdGg6IDIwMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2l0aW9uOiAwLjVzIG1hcmdpbi1yaWdodDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZjZmNmYztcbn1cbi5hbXAtcHJldmlldy1jYW52YXNfX2RpcHJldmlldy0taGlkZSB7XG4gIG1hcmdpbi1yaWdodDogLTIwMXB4O1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fZGlwcmV2aWV3IGltZyB7XG4gIHBhZGRpbmc6IDVweDtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fcHJldmlld2FyZWEge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fY2FudmFzIHtcbiAgZmxleDogMTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19pbWFnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19jcm9wcmVjdCB7XG4gIG91dGxpbmU6IDEwMDBweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gIGJvcmRlcjogMnB4IHNvbGlkICMwMzliZTU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYW5pbWF0aW9uOiAwLjVzIGJvcmRlciwgMC41cyBvdXRsaW5lLWNvbG9yO1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fY3JvcHJlY3QtLWluYWN0aXZlIHtcbiAgYm9yZGVyOiAycHggc29saWQgI2NjYztcbn1cbi5hbXAtcHJldmlldy1jYW52YXNfX2Nyb3ByZWN0LS1zaW11bGF0ZWQge1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmUtY29sb3I6IHdoaXRlO1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fcG9pIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fcG9pLXBsdXMge1xuICBzdHJva2UtZGFzaGFycmF5OiAwO1xuICBmaWxsOiAjZmZmO1xuICBmaWxsLW9wYWNpdHk6IDE7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19wb2ktYmFja2dyb3VuZCB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19wb2ktLXNlbGVjdGVkIHtcbiAgc3Ryb2tlOiAjZmZmO1xuICBzdHJva2UtZGFzaGFycmF5OiA0IDQ7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19jcm9waGFuZGxlIHtcbiAgd2lkdGg6IDhweDtcbiAgaGVpZ2h0OiA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzliZTU7XG4gIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICBtYXJnaW4tdG9wOiAtNHB4O1xuICB6LWluZGV4OiAyO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19jcm9waGFuZGxlLS10b3BsZWZ0IHtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xufVxuLmFtcC1wcmV2aWV3LWNhbnZhc19fY3JvcGhhbmRsZS0tdG9wcmlnaHQge1xuICB0b3A6IDA7XG4gIGxlZnQ6IDEwMCU7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19jcm9waGFuZGxlLS1ib3R0b21yaWdodCB7XG4gIHRvcDogMTAwJTtcbiAgbGVmdDogMTAwJTtcbn1cbi5hbXAtcHJldmlldy1jYW52YXNfX2Nyb3BoYW5kbGUtLWJvdHRvbWxlZnQge1xuICB0b3A6IDEwMCU7XG4gIGxlZnQ6IDA7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19vdmVybGF5IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19vdmVybGF5IGJ1dHRvbiB7XG4gIG1hcmdpbjogMTBweDtcbn1cbi5hbXAtcHJldmlldy1jYW52YXNfX2xvYWRpbmcge1xuICB6LWluZGV4OiAxMDA7XG59XG4uYW1wLXByZXZpZXctY2FudmFzX19sb2FkaW5nLS1oaWRlIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIG9wYWNpdHk6IDA7XG59IiwiQGltcG9ydCBcIi4uLy4uL2NvcmUvY29yZS5zY3NzXCI7XG5cbjpob3N0IHtcbiAgaGVpZ2h0OiA0NThweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmFtcC1wcmV2aWV3LWNhbnZhcyB7XG4gICZfX2ltYWdlY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIH1cbiAgJl9faW1hZ2VzcGxpdCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICB9XG4gICZfX2RpcHJldmlldyB7XG4gICAgd2lkdGg6IDIwMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB0cmFuc2l0aW9uOiAwLjVzIG1hcmdpbi1yaWdodDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmY2ZjO1xuXG4gICAgJi0taGlkZSB7XG4gICAgICBtYXJnaW4tcmlnaHQ6IC0yMDFweDtcbiAgICB9XG5cbiAgICBpbWcge1xuICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICBtYXJnaW46IDVweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvci1saWdodC1ncmV5O1xuICAgIH1cbiAgfVxuICAmX19wcmV2aWV3YXJlYSB7XG4gICAgZmxleDogMTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cbiAgJl9fY2FudmFzIHtcbiAgICBmbGV4OiAxO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxuICAmX19pbWFnZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG4gICZfX2Nyb3ByZWN0IHtcbiAgICBvdXRsaW5lOiAxMDAwcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjgpO1xuICAgIGJvcmRlcjogMnB4IHNvbGlkICRjb2xvci1wcmltYXJ5O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBhbmltYXRpb246IDAuNXMgYm9yZGVyLCAwLjVzIG91dGxpbmUtY29sb3I7XG4gICAgJi0taW5hY3RpdmUge1xuICAgICAgYm9yZGVyOiAycHggc29saWQgJGNvbG9yLWxpZ2h0LWdyZXk7XG4gICAgfVxuICAgICYtLXNpbXVsYXRlZCB7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBvdXRsaW5lLWNvbG9yOiB3aGl0ZTtcbiAgICB9XG4gIH1cbiAgJl9fcG9pIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG5cbiAgICAmLXBsdXMge1xuICAgICAgc3Ryb2tlLWRhc2hhcnJheTogMDtcbiAgICAgIGZpbGw6ICNmZmY7XG4gICAgICBmaWxsLW9wYWNpdHk6IDE7XG4gICAgfVxuXG4gICAgJi1iYWNrZ3JvdW5kIHtcbiAgICAgIG9wYWNpdHk6IC41O1xuICAgICAgY29sb3I6IHJnYmEoMCwwLDAsLjg3KTtcbiAgICB9XG5cbiAgICAmLS1zZWxlY3RlZCB7XG4gICAgICBzdHJva2U6ICNmZmY7XG4gICAgICBzdHJva2UtZGFzaGFycmF5OiA0IDQ7XG4gICAgfVxuICB9XG4gICZfX2Nyb3BoYW5kbGUge1xuICAgIHdpZHRoOiA4cHg7XG4gICAgaGVpZ2h0OiA4cHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnk7XG4gICAgbWFyZ2luLWxlZnQ6IC00cHg7XG4gICAgbWFyZ2luLXRvcDogLTRweDtcbiAgICB6LWluZGV4OiAyO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAmLS10b3BsZWZ0IHtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgfVxuICAgICYtLXRvcHJpZ2h0IHtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDEwMCU7XG4gICAgfVxuICAgICYtLWJvdHRvbXJpZ2h0IHtcbiAgICAgIHRvcDogMTAwJTtcbiAgICAgIGxlZnQ6IDEwMCU7XG4gICAgfVxuICAgICYtLWJvdHRvbWxlZnQge1xuICAgICAgdG9wOiAxMDAlO1xuICAgICAgbGVmdDogMDtcbiAgICB9XG4gIH1cbiAgJl9fb3ZlcmxheSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICBidXR0b24ge1xuICAgICAgbWFyZ2luOiAxMHB4O1xuICAgIH1cbiAgfVxuXG4gICZfX2xvYWRpbmcge1xuICAgIHotaW5kZXg6IDEwMDtcblxuICAgICYtLWhpZGUge1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/preview/preview-canvas/preview-canvas.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/preview/preview-canvas/preview-canvas.component.ts ***!
  \********************************************************************/
/*! exports provided: PreviewCanvasComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreviewCanvasComponent", function() { return PreviewCanvasComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var src_app_editor_di_image_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/editor/di-image.service */ "./src/app/editor/di-image.service.ts");
/* harmony import */ var src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/editor/editor.service */ "./src/app/editor/editor.service.ts");
/* harmony import */ var src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/editor/di-field.service */ "./src/app/editor/di-field.service.ts");
/* harmony import */ var _image_transformer_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../image-transformer.service */ "./src/app/preview/image-transformer.service.ts");







let PreviewCanvasComponent = class PreviewCanvasComponent {
    constructor(myElem, sanitizer, dimage, editor, field, transform) {
        this.myElem = myElem;
        this.sanitizer = sanitizer;
        this.dimage = dimage;
        this.editor = editor;
        this.field = field;
        this.transform = transform;
        // scale related parameters
        this.scale = 1;
        this.handleHSize = '-4px';
        this.handleSize = '8px';
        this.cropRectStroke = '2px';
        this.outlineSize = '1000px';
        this.movingHandle = -1;
        this.lastFlip = [false, false];
        this.dataUpdated(this.field.data);
        this.dimage.imageChanged.subscribe((image) => {
            this.updateCanvasTransform();
            this.renderCanvas(true);
        });
        editor.modeChange.subscribe((mode) => {
            this.updateTransformFrames(2);
        });
        editor.entered.subscribe((mode) => {
            this.updateTransformFrames(30);
        });
        field.fieldUpdated.subscribe((data) => {
            this.dataUpdated(data);
        });
        window.addEventListener('resize', () => { this.updateCanvasTransform(); });
    }
    get isCrop() {
        return this.editor.previewMode === src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].EditCrop && !this.isPOI;
    }
    get isPreview() {
        return this.editor.previewMode === src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["PreviewMode"].View;
    }
    get isPOI() {
        // when crop and POI are exclusive, poi mode is a special aspect lock.
        return this.field.data.aspectLock === 'poi'; // this.editor.previewMode === PreviewMode.POI;
    }
    get isPOIActive() {
        return this.field.isPOIActive();
    }
    get isLoading() {
        return !this.dimage.imageReady;
    }
    get hasImage() {
        return this.field.isImageActive();
    }
    get imageError() {
        return this.dimage.imageError;
    }
    get imageWidth() { return this.dimage.imageWidth; }
    get imageHeight() { return this.dimage.imageHeight; }
    get cropPx() { return this.dimage.cropPx; }
    set cropPx(value) { this.dimage.cropPx = value; }
    get poiPx() { return this.dimage.poiPx; }
    set poiPx(value) { this.dimage.poiPx = value; }
    getImageHost() {
        return this.field.getImageHost();
    }
    renderCanvas(force) {
        const data = this.data;
        if (this.dimage.imageReady && data != null) {
            this.transform.renderCanvas(this.imageCanvas.nativeElement, this.imageElem.nativeElement, data, force);
        }
    }
    dataUpdated(data) {
        this.data = data;
        this.image = (data == null) ? null : data.image;
        if (data != null) {
            this.updateTransformFrames(1);
            const isAspect = data.aspectLock != null && data.aspectLock.indexOf(':') !== -1;
            // ensure that poi and crop are exclusive
            if (data.aspectLock === 'poi') {
                data.crop = [0, 0, 0, 0];
                this.cropPx = null;
            }
            else {
                data.poi = { x: -1, y: -1 };
                this.poiPx = null;
            }
            if (isAspect) {
                // attempt to lock aspect of the crop rectangle
                const split = data.aspectLock.split(':');
                if (split.length === 2) {
                    const aspect = Number(split[0]) / Number(split[1]);
                    if (this.dimage.imageReady) {
                        this.forceAspect(aspect);
                    }
                    else {
                        // image is not ready, so we are loading the data for the first time.
                        this.activeAspect = aspect; // set the current aspect but do not process the change.
                    }
                }
            }
            else {
                this.activeAspect = null;
            }
            this.renderCanvas(false);
        }
    }
    ngOnInit() {
        this.dimage.imageUIProvider = this.getImageElem.bind(this);
    }
    getImageElem() {
        // it's possible that the image element has not been created yet
        // if we're calling this function, we should be in a state where angular will create it
        // so just wait a few frames until it does.
        return new Promise((resolve, reject) => {
            if (this.imageElem == null) {
                let continueFunc;
                continueFunc = () => {
                    if (this.imageElem == null) {
                        requestAnimationFrame(continueFunc);
                    }
                    else {
                        resolve(this.imageElem.nativeElement);
                    }
                };
                requestAnimationFrame(continueFunc);
            }
            else {
                resolve(this.imageElem.nativeElement);
            }
        });
    }
    ngOnChanges(changes) {
    }
    getImageTransform() {
        const transformCommands = [];
        if (this.data.rot != null) {
            transformCommands.push(`rotate(${this.data.rot}deg)`);
        }
        return this.sanitizer.bypassSecurityTrustStyle(transformCommands.join(' '));
    }
    updateTransformFrames(frames) {
        requestAnimationFrame(() => {
            this.updateCanvasTransform();
            frames--;
            if (frames > 0) {
                this.updateTransformFrames(frames);
            }
        });
    }
    updateCanvasTransform() {
        if (this.canvas == null) {
            return;
        }
        const container = this.canvas.nativeElement;
        // const size = [window.innerWidth - 20, 500 - 20];
        const size = [container.clientWidth - 20, container.clientHeight - 20];
        /*
        if (!this.isPreview) {
          size[0] -= 201;
          size[1] -= 42;
        }
        */
        const bounds = this.dimage.getRotatedBounds();
        const imageSize = (this.isPreview && this.cropPx != null) ? [this.cropPx[2], this.cropPx[3]] : [bounds[2], bounds[3]];
        const transformCommands = [];
        const scale = Math.min(1, size[0] / imageSize[0], size[1] / imageSize[1]);
        this.handleHSize = (-4 / scale) + 'px';
        this.handleSize = (8 / scale) + 'px';
        this.cropRectStroke = (2 / scale) + 'px';
        this.outlineSize = (Math.max(size[0], size[1]) / scale) + 'px';
        this.scale = scale;
        transformCommands.push(`scale(${scale}, ${scale})`);
        if (this.data.fliph || this.data.flipv) {
            transformCommands.push(`scale(${this.data.fliph ? -1 : 1}, ${this.data.flipv ? -1 : 1})`);
        }
        // crop offset - in preview mode, offset the image to the middle
        if (this.isPreview && this.cropPx != null) {
            const centerOff = [
                this.imageWidth / 2 - (this.cropPx[0] + this.cropPx[2] / 2),
                this.imageHeight / 2 - (this.cropPx[1] + this.cropPx[3] / 2),
            ];
            transformCommands.push(`translate(${centerOff[0]}px, ${centerOff[1]}px)`);
        }
        this.lastFlip = [this.data.fliph, this.data.flipv];
        this.canvasTransform = this.sanitizer.bypassSecurityTrustStyle(transformCommands.join(' '));
    }
    getImageFilter() {
        const useCSS = false;
        if (useCSS) {
            const filterCommands = [];
            if (this.data.hue != null) {
                filterCommands.push(`hue-rotate(${this.data.hue}deg)`);
            }
            if (this.data.sat != null) {
                filterCommands.push(`saturate(${this.diIntensityToBrowser(this.data.sat)})`);
            }
            if (this.data.bri != null) {
                filterCommands.push(`brightness(${this.diIntensityToBrowser(this.data.bri)})`);
            }
            this.sanitizer.bypassSecurityTrustStyle(filterCommands.join(' '));
        }
        else {
            return this.sanitizer.bypassSecurityTrustStyle('');
        }
    }
    boundSize(size, bounds) {
        if (size[0] > bounds[2]) {
            size[1] *= bounds[2] / size[0];
            size[0] *= bounds[2] / size[0];
        }
        if (size[1] > bounds[3]) {
            size[0] *= bounds[3] / size[1];
            size[1] *= bounds[3] / size[1];
        }
    }
    forceAspect(aspect) {
        const bounds = this.dimage.getRotatedBounds();
        if (this.cropPx == null || (this.activeAspect !== aspect)) {
            this.cropPx = bounds;
        }
        // find a target size less than the size, based on the current size
        // a good choice is the average of aspect correcting both dimensions, limited to the size of the bounds
        const aspectBound1 = [this.cropPx[2], this.cropPx[2] / aspect];
        const aspectBound2 = [this.cropPx[3] * aspect, this.cropPx[3]];
        if (this.dimage.imageReady) {
            this.boundSize(aspectBound1, bounds);
            this.boundSize(aspectBound2, bounds);
        }
        const newBound = [(aspectBound1[0] + aspectBound2[0]) / 2.0, (aspectBound1[1] + aspectBound2[1]) / 2.0];
        // if holding the rectangle by a corner, anchor it to the opposite corner
        switch (this.movingHandle) {
            case 0: // top left: anchor to bottom right
                this.cropPx[0] = this.cropPx[0] + this.cropPx[2] - newBound[0];
                this.cropPx[1] = this.cropPx[1] + this.cropPx[3] - newBound[1];
                break;
            case 1: // top right: anchor to bottom left
                this.cropPx[1] = this.cropPx[1] + this.cropPx[3] - newBound[1];
                break;
            case 2: // bottom right: anchor to top left (default)
                break;
            case 3: // bottom left: anchor to top right
                this.cropPx[0] = this.cropPx[0] + this.cropPx[2] - newBound[0];
                break;
        }
        this.cropPx[2] = newBound[0];
        this.cropPx[3] = newBound[1];
        // move the rectangle back in bounds, if necessary
        const boundLimitX = bounds[0] + bounds[2];
        if (this.cropPx[0] + this.cropPx[2] > boundLimitX) {
            this.cropPx[0] = boundLimitX - this.cropPx[2];
        }
        const boundLimitY = bounds[1] + bounds[3];
        if (this.cropPx[1] + this.cropPx[3] > boundLimitY) {
            this.cropPx[1] = boundLimitY - this.cropPx[3];
        }
        if (this.cropPx[0] < bounds[0]) {
            this.cropPx[0] = bounds[0];
        }
        if (this.cropPx[1] < bounds[1]) {
            this.cropPx[1] = bounds[1];
        }
        this.saveCrop();
        this.activeAspect = aspect;
    }
    diIntensityToBrowser(intensity) {
        return intensity / 100 + 1;
    }
    escapeUrl(text) {
        return encodeURIComponent(text);
    }
    moveHandle(event) {
        const pos = this.getMousePosition(event);
        const localx = pos[0];
        const localy = pos[1];
        const bounds = this.dimage.getRotatedBounds();
        switch (this.movingHandle) {
            case 0:
                this.cropPx[2] = (this.cropPx[0] + this.cropPx[2]) - localx; // width anchored to old width
                this.cropPx[3] = (this.cropPx[1] + this.cropPx[3]) - localy; // height anchored to old height
                this.cropPx[0] = localx; // x
                this.cropPx[1] = localy; // y
                break;
            case 1: // top right (x is unchanged)
                this.cropPx[3] = (this.cropPx[1] + this.cropPx[3]) - localy; // height anchored to old height
                this.cropPx[1] = localy; // y
                this.cropPx[2] = localx - this.cropPx[0]; // width anchored to left
                break;
            case 2: // bottom right
                this.cropPx[2] = localx - this.cropPx[0]; // width anchored to left
                this.cropPx[3] = localy - this.cropPx[1]; // width anchored to top
                break;
            case 3: // bottom left
                this.cropPx[2] = (this.cropPx[0] + this.cropPx[2]) - localx; // width anchored to old width
                this.cropPx[0] = localx; // x
                this.cropPx[3] = localy - this.cropPx[1]; // height anchored to top
                break;
            case 4: // move box
                let delta = (this.lastPos == null) ? [0, 0] : [localx - this.lastPos[0], localy - this.lastPos[1]];
                const allowedMove = [
                    this.cropPx[0] - bounds[0],
                    this.cropPx[1] - bounds[1],
                    (bounds[2] + bounds[0]) - (this.cropPx[2] + this.cropPx[0]),
                    (bounds[3] + bounds[1]) - (this.cropPx[3] + this.cropPx[1]),
                ];
                delta = this.clampMovement(delta, allowedMove);
                this.cropPx[0] += delta[0];
                this.cropPx[1] += delta[1];
                this.lastPos = [localx, localy];
                break;
            case 5: // creating a box
                this.cropPx = [localx, localy, 1, 1];
                this.movingHandle = 2;
                break;
        }
        this.clampCrop(bounds);
        this.saveCrop();
    }
    movePOI(event) {
        const pos = this.getMousePosition(event);
        const localx = pos[0];
        const localy = pos[1];
        this.poiPx = [localx, localy];
        this.savePOI();
    }
    upHandle(event) {
        if (this.field.isCropActive && (this.field.data.aspectLock == null || this.field.data.aspectLock === 'clear')) {
            this.data.aspectLock = 'none';
            this.field.updateField();
        }
        this.lastPos = null;
    }
    globalOffset(elem) {
        if (elem.offsetParent == null) {
            return [elem.offsetLeft, elem.offsetTop];
        }
        else {
            const parent = this.globalOffset(elem.offsetParent);
            return [elem.offsetLeft + parent[0], elem.offsetTop + parent[1]];
        }
    }
    getMousePosition(event) {
        const container = this.imageContainer.nativeElement;
        const offset = this.globalOffset(container);
        const ctrx = event.clientX - (offset[0] + this.imageWidth / 2);
        const ctry = event.clientY - (offset[1] + this.imageHeight / 2);
        const scalex = (this.data.fliph ? -1 : 1) / this.scale;
        const scaley = (this.data.flipv ? -1 : 1) / this.scale;
        const localx = ctrx * scalex + this.imageWidth / 2;
        const localy = ctry * scaley + this.imageHeight / 2;
        return [localx, localy];
    }
    clampCrop(clamp) {
        if (this.activeAspect != null) {
            this.forceAspect(this.activeAspect);
        }
        this.cropPx = [
            Math.min(Math.max(this.cropPx[0], clamp[0]), clamp[2] + clamp[0]),
            Math.min(Math.max(this.cropPx[1], clamp[1]), clamp[3] + clamp[1]),
            Math.max(0, Math.min(this.cropPx[2] + this.cropPx[0], clamp[2] + clamp[0])),
            Math.max(0, Math.min(this.cropPx[3] + this.cropPx[1], clamp[3] + clamp[1])),
        ];
        this.cropPx[2] -= this.cropPx[0];
        this.cropPx[3] -= this.cropPx[1];
        if (this.cropPx[2] < 1) {
            this.cropPx[2] = 1;
        }
        if (this.cropPx[3] < 1) {
            this.cropPx[3] = 1;
        }
    }
    clampMovement(delta, allowed) {
        if (delta[0] < -allowed[0]) {
            delta[0] = -allowed[0];
        }
        if (delta[1] < -allowed[1]) {
            delta[1] = -allowed[1];
        }
        if (delta[0] > allowed[2]) {
            delta[0] = allowed[2];
        }
        if (delta[1] > allowed[3]) {
            delta[1] = allowed[3];
        }
        return delta;
    }
    saveCrop() {
        this.dimage.saveCrop();
    }
    savePOI(withoutSave) {
        this.dimage.savePOI(withoutSave);
    }
    grabCropHandle(handle) {
        // handle is 0 for top left, incrementing clockwise
        if (this.isCrop) {
            if (handle === 5 && this.field.isCropActive()) {
                return;
            }
            this.movingHandle = handle;
            const moveEvent = this.moveHandle.bind(this);
            this.bindMouseEvent(moveEvent, this.upHandle.bind(this));
        }
        else if (this.isPOI) {
            // place point of interest
            if (handle !== 5) {
                return;
            }
            if (!this.field.isPOIActive()) {
                this.field.data.poi = { x: 0.5, y: 0.5 };
            }
            this.grabPOI();
        }
    }
    grabPOI() {
        if (!this.isPOI) {
            return;
        }
        const moveEvent = this.movePOI.bind(this);
        this.bindMouseEvent(moveEvent, this.upHandle.bind(this));
    }
    bindMouseEvent(moveEvent, upHandle) {
        let upEvent;
        const outEvent = (event) => {
            if (!(event.relatedTarget)) {
                upEvent(event);
            }
        };
        upEvent = (event) => {
            this.myElem.nativeElement.removeEventListener('mousemove', moveEvent);
            window.removeEventListener('mouseup', upEvent);
            window.removeEventListener('mouseout', outEvent);
            upHandle(event);
        };
        this.myElem.nativeElement.addEventListener('mousemove', moveEvent);
        window.addEventListener('mouseup', upEvent);
        window.addEventListener('mouseout', outEvent);
    }
};
PreviewCanvasComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"] },
    { type: src_app_editor_di_image_service__WEBPACK_IMPORTED_MODULE_3__["DiImageService"] },
    { type: src_app_editor_editor_service__WEBPACK_IMPORTED_MODULE_4__["EditorService"] },
    { type: src_app_editor_di_field_service__WEBPACK_IMPORTED_MODULE_5__["DiFieldService"] },
    { type: _image_transformer_service__WEBPACK_IMPORTED_MODULE_6__["ImageTransformerService"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('imageContainer', { static: false })
], PreviewCanvasComponent.prototype, "imageContainer", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('canvas', { static: false })
], PreviewCanvasComponent.prototype, "canvas", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('image', { static: false })
], PreviewCanvasComponent.prototype, "imageElem", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('imageCanvas', { static: false })
], PreviewCanvasComponent.prototype, "imageCanvas", void 0);
PreviewCanvasComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-preview-canvas',
        template: __webpack_require__(/*! raw-loader!./preview-canvas.component.html */ "./node_modules/raw-loader/index.js!./src/app/preview/preview-canvas/preview-canvas.component.html"),
        styles: [__webpack_require__(/*! ./preview-canvas.component.scss */ "./src/app/preview/preview-canvas/preview-canvas.component.scss")]
    })
], PreviewCanvasComponent);



/***/ }),

/***/ "./src/app/preview/spinner/spinner.component.scss":
/*!********************************************************!*\
  !*** ./src/app/preview/spinner/spinner.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-button {\n  color: #333333;\n  text-transform: none;\n  min-height: 0;\n  min-width: 0;\n  line-height: normal;\n  margin: 0;\n  font-weight: 400;\n  text-align: left;\n  border: none;\n  background-color: transparent;\n  outline: none;\n  transition: color 0.3s;\n}\n.mat-button:not([disabled]):hover {\n  background-color: transparent !important;\n  color: #1ab0f9;\n}\n.mat-button:not([disabled]).mat-focused {\n  background-color: transparent;\n}\n.mat-button[disabled] {\n  color: #bfbfbf;\n}\n.mat-flat-button {\n  border-radius: 3px;\n  padding: 0 10px;\n  transition: all 0.3s;\n}\n.mat-flat-button.mat-primary[disabled], .mat-flat-button.mat-primary.disabled {\n  color: #bfbfbf;\n  background-color: #e5e5e5;\n  cursor: default;\n}\n.mat-flat-button.mat-primary[disabled] mat-icon, .mat-flat-button.mat-primary.disabled mat-icon {\n  fill: #a2a6ab;\n  color: #a2a6ab;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) {\n  color: #fff;\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]), .mat-flat-button.mat-primary.faux-hover:not([disabled]) {\n  color: #fff;\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary:hover:not([disabled]) mat-icon, .mat-flat-button.mat-primary.faux-hover:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-primary.ng-click-active {\n  color: #fff;\n  background-color: #0279b3 !important;\n  box-shadow: none !important;\n}\n.mat-flat-button.mat-primary.ng-click-active mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-flat-button.mat-secondary {\n  font-weight: 400;\n}\n.mat-fab.amp-fab {\n  box-shadow: none !important;\n  background-color: #c9cccf;\n}\n.mat-fab.amp-fab mat-icon {\n  color: #fff;\n  fill: #fff;\n}\n.mat-fab.amp-fab mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab[disabled] {\n  cursor: auto !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon {\n  fill: #ccc !important;\n  color: #ccc !important;\n}\n.mat-fab.amp-fab[disabled] mat-icon * {\n  fill: #ccc !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]), .mat-fab.amp-fab.faux-hover:not([disabled]), .mat-fab.amp-fab.mat-focused:not([disabled]) {\n  background-color: #039be5;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.faux-hover:not([disabled]) mat-icon *, .mat-fab.amp-fab.mat-focused:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) {\n  background-color: #1ab0f9 !important;\n  box-shadow: none !important;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon {\n  fill: #fff;\n  color: #fff;\n}\n.mat-fab.amp-fab:active:not([disabled]) mat-icon * {\n  fill: #fff;\n}\n:host {\n  width: 100%;\n  height: 100%;\n  opacity: 1;\n  transition: opacity 0.3s;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 0 !important;\n  box-sizing: border-box;\n  background-color: white;\n}\n:host.ng-enter {\n  opacity: 0;\n}\n:host.ng-leave-active {\n  opacity: 0;\n}\n.amp-spinner__bounce {\n  width: 8px;\n  height: 8px;\n  margin: 1px;\n  background-color: #747980;\n  border-radius: 100%;\n  display: inline-block;\n  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n          animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n.amp-spinner__bounce--1 {\n  -webkit-animation-delay: -0.32s !important;\n          animation-delay: -0.32s !important;\n}\n.amp-spinner__bounce--2 {\n  -webkit-animation-delay: -0.16s !important;\n          animation-delay: -0.16s !important;\n}\n@-webkit-keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}\n.amp-spinner__message {\n  margin: 10px;\n  font-size: 16px;\n  transition: all 0.5s;\n}\n.amp-spinner__message--in {\n  opacity: 0;\n  transform: translate(-50px, 0px);\n  transition: none !important;\n}\n.amp-spinner__message--out {\n  opacity: 0;\n  transform: translate(50px, 0px);\n}\n.amp-spinner__message--outreset {\n  opacity: 1;\n  transform: translate(0px, 0px);\n  transition: none !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9wcmV2aWV3L3NwaW5uZXIvQzpcXGRjXFxzcmMvYXBwXFxwcmV2aWV3XFxzcGlubmVyXFxzcGlubmVyLmNvbXBvbmVudC5zY3NzIiwiYXBwL3ByZXZpZXcvc3Bpbm5lci9DOlxcZGNcXHNyYy9hcHBcXGNvcmVcXHNjc3NcXHZhcnNcXF9jb2xvdXJzLnNjc3MiLCJhcHAvcHJldmlldy9zcGlubmVyL0M6XFxkY1xcc3JjL2FwcFxcY29yZVxcc2Nzc1xcdmFyc1xcX3R5cG9ncmFwaHkuc2NzcyIsImFwcC9wcmV2aWV3L3NwaW5uZXIvc3Bpbm5lci5jb21wb25lbnQuc2NzcyIsImFwcC9wcmV2aWV3L3NwaW5uZXIvQzpcXGRjXFxzcmMvc3RkaW4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7RUFDRSxjQ1ltQjtFRFhuQixvQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JFT21CO0VGTm5CLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLDZCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FHSkY7QUhNSTtFQUNFLHdDQUFBO0VBQ0EsY0NwQmdCO0FFZ0J0QjtBSE1JO0VBQ0UsNkJBQUE7QUdKTjtBSE9FO0VBQ0UsY0NScUI7QUVHekI7QUhTQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0FHTkY7QUhTSTtFQUNFLGNDbkJtQjtFRG9CbkIseUJDNUJlO0VENkJmLGVBQUE7QUdQTjtBSFNNO0VBQ0UsYUNmUztFRGdCVCxjQ2hCUztBRVNqQjtBSFdJO0VBQ0UsV0N6Q1E7RUQwQ1IseUJDbkRVO0VEb0RWLDJCQUFBO0FHVE47QUhXTTtFQUNFLFVDOUNNO0VEK0NOLFdDL0NNO0FFc0NkO0FIYUk7RUFDRSxXQ3BEUTtFRHFEUixvQ0FBQTtFQUNBLDJCQUFBO0FHWE47QUhhTTtFQUNFLFVDekRNO0VEMEROLFdDMURNO0FFK0NkO0FIZUk7RUFDRSxXQy9EUTtFRGdFUixvQ0FBQTtFQUNBLDJCQUFBO0FHYk47QUhlTTtFQUNFLFVDcEVNO0VEcUVOLFdDckVNO0FFd0RkO0FIa0JFO0VBQ0UsZ0JBQUE7QUdoQko7QUhvQkE7RUFDRSwyQkFBQTtFQUtBLHlCQ3pFVztBRW9EYjtBSHVCRTtFQUlFLFdDM0ZVO0VENEZWLFVDNUZVO0FFb0VkO0FIeUJJO0VBQ0UsVUM5RlE7QUV1RWQ7QUhtQ0U7RUFDRSx1QkFBQTtBR2pDSjtBSGtDSTtFQUNFLHFCQUFBO0VBQ0Esc0JBQUE7QUdoQ047QUhpQ007RUFDRSxxQkFBQTtBRy9CUjtBSHFDRTtFQUNFLHlCQ2hJWTtFRGlJWiwyQkFBQTtBR25DSjtBSHFDSTtFQUNFLFVDM0hRO0VENEhSLFdDNUhRO0FFeUZkO0FIb0NNO0VBQ0UsVUM5SE07QUU0RmQ7QUh1Q0U7RUFDRSxvQ0FBQTtFQUNBLDJCQUFBO0FHckNKO0FIdUNJO0VBQ0UsVUN4SVE7RUR5SVIsV0N6SVE7QUVvR2Q7QUhzQ007RUFDRSxVQzNJTTtBRXVHZDtBQzlHQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLHdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsU0FBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EscUJBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FEaUhGO0FDaEhFO0VBQ0UsVUFBQTtBRGtISjtBQ2hIRTtFQUNFLFVBQUE7QURrSEo7QUM3R0U7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSx5QkhsQlM7RUdtQlQsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGdFQUFBO1VBQUEsd0RBQUE7QURnSEo7QUMvR0k7RUFDRSwwQ0FBQTtVQUFBLGtDQUFBO0FEaUhOO0FDOUdJO0VBQ0UsMENBQUE7VUFBQSxrQ0FBQTtBRGdITjtBQzVHRTtFQUNFO0lBQ0UsbUJBQUE7RUQ4R0o7RUM1R0U7SUFDRSxtQkFBQTtFRDhHSjtBQUNGO0FDM0dFO0VBQ0U7SUFDRSxtQkFBQTtFRDZHSjtFQzNHRTtJQUNFLG1CQUFBO0VENkdKO0FBQ0Y7QUMxR0U7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0FENEdKO0FDMUdJO0VBQ0UsVUFBQTtFQUNBLGdDQUFBO0VBQ0EsMkJBQUE7QUQ0R047QUN6R0k7RUFDRSxVQUFBO0VBQ0EsK0JBQUE7QUQyR047QUN4R0k7RUFDRSxVQUFBO0VBQ0EsOEJBQUE7RUFDQSwyQkFBQTtBRDBHTiIsImZpbGUiOiJhcHAvcHJldmlldy9zcGlubmVyL3NwaW5uZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIkYnV0dG9uLWZhYi13aWR0aDogNTBweDtcbiRidXR0b24tZmFiLWhlaWdodDogJGJ1dHRvbi1mYWItd2lkdGg7XG4kYnV0dG9uLWZhYi1pY29uLXNpemU6IDMycHg7XG4kYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw6IDIwcHg7XG5cbi5tYXQtYnV0dG9uIHtcbiAgY29sb3I6ICRjb2xvci1kYXJrZXN0LWdyZXk7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBtaW4taGVpZ2h0OiAwO1xuICBtaW4td2lkdGg6IDA7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbjogMDtcbiAgZm9udC13ZWlnaHQ6ICRmb250LXdlaWdodC1ub3JtYWw7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHRyYW5zaXRpb246IGNvbG9yICR0cmFuc2l0aW9uLXNwZWVkO1xuICAmOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgJjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgY29sb3I6ICRjb2xvci1wcmltYXJ5LWxpZ2h0O1xuICAgIH1cbiAgICAmLm1hdC1mb2N1c2VkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxuICAmW2Rpc2FibGVkXSB7XG4gICAgY29sb3I6ICRjb2xvci15ZXQtYW5vdGhlci1ncmV5O1xuICB9XG59XG5cbi5tYXQtZmxhdC1idXR0b24ge1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIHBhZGRpbmc6IDAgJGJzdS8yO1xuICB0cmFuc2l0aW9uOiBhbGwgJHRyYW5zaXRpb24tc3BlZWQ7XG5cbiAgJi5tYXQtcHJpbWFyeSB7XG4gICAgJltkaXNhYmxlZF0sICYuZGlzYWJsZWQge1xuICAgICAgY29sb3I6ICRjb2xvci15ZXQtYW5vdGhlci1ncmV5O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLWxpZ2h0ZXItZ3JleTtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3ItbWlkLWdyZXk7XG4gICAgICAgIGNvbG9yOiAkY29sb3ItbWlkLWdyZXk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5O1xuICAgICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgICBtYXQtaWNvbiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgJi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yLXByaW1hcnktbGlnaHQgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5uZy1jbGljay1hY3RpdmUge1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5LWRhcmsgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcblxuICAgICAgbWF0LWljb24ge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJi5tYXQtc2Vjb25kYXJ5IHtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG59XG5cbi5tYXQtZmFiLmFtcC1mYWIge1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gIC8vbWFyZ2luOiAzcHg7XG4gIC8vd2lkdGg6ICRidXR0b24tZmFiLXdpZHRoICFpbXBvcnRhbnQ7XG4gIC8vaGVpZ2h0OiAkYnV0dG9uLWZhYi1oZWlnaHQgIWltcG9ydGFudDtcbiAgLy9saW5lLWhlaWdodDogJGJ1dHRvbi1mYWItaGVpZ2h0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItaXJvbjtcblxuICBtYXQtaWNvbiB7XG4gICAgLy9oZWlnaHQ6ICRidXR0b24tZmFiLWljb24tc2l6ZTtcbiAgICAvL3dpZHRoOiAkYnV0dG9uLWZhYi1pY29uLXNpemU7XG4gICAgLy9saW5lLWhlaWdodDogJGJ1dHRvbi1mYWItaWNvbi1zaXplO1xuICAgIGNvbG9yOiAkY29sb3Itd2hpdGU7XG4gICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICoge1xuICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgIH1cbiAgfVxuXG4gICYuYW1wLWljb24tc21hbGwge1xuICAgIG1hdC1pY29uIHtcbiAgICAgIC8vaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw7XG4gICAgICAvL3dpZHRoOiAkYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw7XG4gICAgICAvL2xpbmUtaGVpZ2h0OiAkYnV0dG9uLWZhYi1pY29uLXNpemUtc21hbGw7XG4gICAgfVxuICB9XG5cbiAgJltkaXNhYmxlZF0ge1xuICAgIGN1cnNvcjogYXV0byAhaW1wb3J0YW50O1xuICAgIG1hdC1pY29uIHtcbiAgICAgIGZpbGw6ICRjb2xvci1saWdodC1ncmV5ICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogJGNvbG9yLWxpZ2h0LWdyZXkgIWltcG9ydGFudDtcbiAgICAgICoge1xuICAgICAgICBmaWxsOiAkY29sb3ItbGlnaHQtZ3JleSAhaW1wb3J0YW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgJjpob3Zlcjpub3QoW2Rpc2FibGVkXSksICYuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSksICYubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3ItcHJpbWFyeTtcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG5cbiAgICBtYXQtaWNvbiB7XG4gICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICBjb2xvcjogJGNvbG9yLXdoaXRlO1xuICAgICAgKiB7XG4gICAgICAgIGZpbGw6ICRjb2xvci13aGl0ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAmOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1wcmltYXJ5LWxpZ2h0ICFpbXBvcnRhbnQ7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuXG4gICAgbWF0LWljb24ge1xuICAgICAgZmlsbDogJGNvbG9yLXdoaXRlO1xuICAgICAgY29sb3I6ICRjb2xvci13aGl0ZTtcbiAgICAgICoge1xuICAgICAgICBmaWxsOiAkY29sb3Itd2hpdGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIkY29sb3ItcHJpbWFyeTogIzAzOWJlNTtcbiRjb2xvci1wcmltYXJ5LWxpZ2h0OiAjMWFiMGY5O1xuJGNvbG9yLXByaW1hcnktbGlnaHRlcjogIzM5YjFmMztcbiRjb2xvci1wcmltYXJ5LWxpZ2h0ZXJlcjogI2VkZjhmZDtcbiRjb2xvci1wcmltYXJ5LWxpZ2h0ZXN0OiAjZjJmYWZlO1xuJGNvbG9yLWF6enVycm86ICMyNmI2ZWE7XG4kY29sb3ItcHJpbWFyeS1kYXJrOiAjMDI3OWIzO1xuJGNvbG9yLXByaW1hcnktZGlzYWJsZWQ6ICNhM2QxZjI7XG4kY29sb3ItYmxldTogIzAyODhkMTtcbiRjb2xvci13aGl0ZTogI2ZmZjtcbiRjb2xvci1ncmV5OiAjNzQ3OTgwO1xuJGNvbG9yLXJvbGxpbmctc3RvbmU6ICM4MDgwODA7XG4kY29sb3ItbGlnaHRlci1ncmV5OiAjZTVlNWU1O1xuJGNvbG9yLWxpZ2h0LWdyZXk6ICNjY2M7XG4kY29sb3ItZ3JleWVkOiAjZGRkO1xuJGNvbG9yLWxpZ2h0ZXN0LWdyZXk6ICNmMmYyZjI7XG4kY29sb3ItZG92ZS1ncmV5OiAjNjY2NjY2O1xuJGNvbG9yLWd1bm1ldGFsLWdyZXk6ICM1ZTY2NmY7XG4kY29sb3ItZGFya2VzdC1ncmV5OiAjMzMzMzMzO1xuJGNvbG9yLWFub3RoZXItZ3JleTogIzk5OTtcbiRjb2xvci15ZXQtYW5vdGhlci1ncmV5OiAjYmZiZmJmO1xuJGNvbG9yLWlyb246ICNjOWNjY2Y7XG4kY29sb3ItZ3JlZWVlZXk6ICNlZWU7XG4kY29sb3ItZGljay1ncmF5c29uOiAjYzZjNmM2OyBcbiRjb2xvci1hbG1vc3QtaXJvbjogI2NhY2NjZjtcbiRjb2xvci1ncmV5LW9uLWdyZXktZ3JleTogI2Q5ZDlkOTtcbiRjb2xvci1saWdodC1iYWNrZ3JvdW5kLWdyZXk6I2ZhZmFmYTtcbiRjb2xvci1qZWFuLWdyZXk6ICNiMmIyYjI7XG4kY29sb3Itd2lsZC1zYW5kOiAjZjVmNWY1O1xuJGNvbG9yLW1pZC1ncmV5OiAjYTJhNmFiO1xuJGNvbG9yLWRhcmstZ3JleTogIzJlMzY0MTtcbiRjb2xvci1naXJnaW86ICM3QjgwODU7XG4kY29sb3ItdGhlLXNreS1pcy1ncmV5OiAjOURBMkE3O1xuJGNvbG9yLWdyZW95OiAjZTBlMGUwO1xuJGNvbG9yLWJsdWUtZ3JleTogI2U5ZWFlYjtcbiRjb2xvci1ncmV5LWZvZm86ICNmMGYwZjA7XG4kY29sb3ItbWF5YmUtZ3JleTogIzlkYTJhMjtcbiRjb2xvci1taWQtYmxhY2s6ICMyOTMzM2Y7XG4kY29sb3ItbmVybzogIzFEMUQxQjtcbiRjb2xvci1ibGFjazogIzE3MjAyYztcbiRjb2xvci1hYnNvbHV0ZS1ibGFjazogIzAwMDtcbiRjb2xvci1wdXJwbGUtZnVzaW9uOiAjYjc0Y2Q5O1xuJGNvbG9yLXdhcm5pbmctb3JhbmdlOiAjZmY2NjAwO1xuJGNvbG9yLWljb24tb3JhbmdlOiAjZmY4YTAwO1xuJGNvbG9yLWVycm9yLXJlZDogI2ZmMzM2NjtcbiRjb2xvci1kYXJrLXJlZDogI2U1MjI1MztcbiRjb2xvci1yZWQtcmVkOiAjZjAwO1xuJGNvbG9yLWFub3RoZXItcmVkOiAjZGQyYzAwO1xuJGNvbG9yLWRhbmdlci1yZWQ6ICNmNDQzMzY7XG4kY29sb3ItcGluazogI2ZmOThiMTtcbiRjb2xvci12YWxpZC1ncmVlbjogIzdlZDkwMDtcbiRjb2xvci1wdWJsaXNoZWQtZ3JlZW46ICM2NmNjMDA7XG4kY29sb3Itc3Ryb25nLWdyZWVuOiAjMGEwO1xuJGNvbG9yLWxpZ2h0LWJsdWU6ICM5OWQ4ZjI7XG4kY29sb3ItbGlnaHRlci1ibHVlOiAjZDFlZmZlO1xuJGNvbG9yLWxpZ2h0LWxpZ2h0LWJsdWU6ICNhNmQ3ZWY7XG4kY29sb3ItZGFyay1ibHVlOiAjMDM5YmU1O1xuJGNvbG9yLWh5cGVybGluay1ibHVlOiAjMDAwMGVlO1xuJGNvbG9yLXdoeS1kby13ZS1uZWVkLWFub3RoZXItYmx1ZTogI2E5ZTFmZDtcbiRjb2xvci1wcmltYXJ5LTdwOiByZ2JhKCRjb2xvci1wcmltYXJ5LCAwLjA3KTtcbiRjb2xvci1wcmltYXJ5LTEwcDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC4xKTtcbiRjb2xvci1wcmltYXJ5LTIwcDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC4yKTtcbiRjb2xvci1wcmltYXJ5LTQwcDogcmdiYSgkY29sb3ItcHJpbWFyeSwgMC40KTtcbiRjb2xvci1ibGFjay0xMHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjEpO1xuJGNvbG9yLWJsYWNrLTIwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuMik7XG4kY29sb3ItYmxhY2stNDBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC40KTtcbiRjb2xvci1ibGFjay01MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjUpO1xuJGNvbG9yLWJsYWNrLTYwcDogcmdiYSgkY29sb3ItYmxhY2ssIDAuNik7XG4kY29sb3ItYmxhY2stNzBwOiByZ2JhKCRjb2xvci1ibGFjaywgMC43KTtcbiRjb2xvci1ibGFjay04MHA6IHJnYmEoJGNvbG9yLWJsYWNrLCAwLjgpO1xuJGNvbG9yLXdoaXRlLTBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMCk7XG4kY29sb3Itd2hpdGUtMjBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC4yKTtcbiRjb2xvci13aGl0ZS00MHA6IHJnYmEoJGNvbG9yLXdoaXRlLCAwLjQpO1xuJGNvbG9yLXdoaXRlLTUwcDogcmdiYSgkY29sb3Itd2hpdGUsIDAuNSk7XG4kY29sb3Itd2hpdGUtODBwOiByZ2JhKCRjb2xvci13aGl0ZSwgMC44KTtcbiRjb2xvci1yb2xsaW5nLXN0b25lLTIwcDogcmdiYSgkY29sb3Itcm9sbGluZy1zdG9uZSwgMC4yKTtcbiRjb2xvci1ncmV5ZWQtNTBwOiByZ2JhKCRjb2xvci1ncmV5ZWQsIDAuNSk7XG4kY29sb3ItbWlkLWJsYWNrLTUwcDogcmdiYSgkY29sb3ItbWlkLWJsYWNrLCAwLjUpO1xuJGNvbG9yLW1pZC1ibGFjay04MHA6IHJnYmEoJGNvbG9yLW1pZC1ibGFjaywgMC44KTtcbiRjb2xvci1tYXliZS1ncmV5LTMwcDogcmdiYSgkY29sb3ItbWF5YmUtZ3JleSwgMC4zKTtcbiRjb2xvci1tYXliZS1ncmV5LTYwcDogcmdiYSgkY29sb3ItbWF5YmUtZ3JleSwgMC42KTsiLCIkYmFzZS1mb250LXNpemU6IDEzcHg7XG4kYmZ6OiAkYmFzZS1mb250LXNpemU7XG4kZm9udC1zaXplLXh4eC1sYXJnZTogMzJweDtcbiRmb250LXNpemUteHgtbGFyZ2U6IDI3cHg7XG4kZm9udC1zaXplLXgtbGFyZ2U6IDIycHg7XG4kZm9udC1zaXplLXhwLWxhcmdlOiAyNHB4O1xuJGZvbnQtc2l6ZS10aXRsZTogMThweDtcbiRmb250LXNpemUteC10aXRsZTogMTlweDtcbiRmb250LXNpemUteHgtdGl0bGU6IDIwcHg7XG4kZm9udC1zaXplLXh4eC10aXRsZTogMjFweDtcbiRmb250LXNpemUtbGFyZ2U6IDE2cHg7XG4kZm9udC1zaXplLWFsbW9zdC1sYXJnZTogMTVweDtcbiRmb250LXNpemUtbWlkOiAxNHB4O1xuJGZvbnQtc2l6ZS1zbWFsbDogMTJweDtcbiRmb250LXNpemUtdGlueTogMTFweDtcbiRmb250LXNpemUteC10aW55OiAxMHB4O1xuJGZvbnQtc2l6ZS14cy10aW55OiA5LjVweDtcblxuJGZvbnQtd2VpZ2h0LWxpZ2h0OiAzMDA7XG4kZm9udC13ZWlnaHQtbm9ybWFsOiA0MDA7XG4kZm9udC13ZWlnaHQtbWVkaXVtOiA1MDA7XG4kZm9udC13ZWlnaHQtYm9sZDogNzAwO1xuIiwiLm1hdC1idXR0b24ge1xuICBjb2xvcjogIzMzMzMzMztcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIG1pbi1oZWlnaHQ6IDA7XG4gIG1pbi13aWR0aDogMDtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgbWFyZ2luOiAwO1xuICBmb250LXdlaWdodDogNDAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBvdXRsaW5lOiBub25lO1xuICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzO1xufVxuLm1hdC1idXR0b246bm90KFtkaXNhYmxlZF0pOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgY29sb3I6ICMxYWIwZjk7XG59XG4ubWF0LWJ1dHRvbjpub3QoW2Rpc2FibGVkXSkubWF0LWZvY3VzZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbi5tYXQtYnV0dG9uW2Rpc2FibGVkXSB7XG4gIGNvbG9yOiAjYmZiZmJmO1xufVxuXG4ubWF0LWZsYXQtYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICBwYWRkaW5nOiAwIDEwcHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzO1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeVtkaXNhYmxlZF0sIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZGlzYWJsZWQge1xuICBjb2xvcjogI2JmYmZiZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U1ZTVlNTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeVtkaXNhYmxlZF0gbWF0LWljb24sIC5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkuZGlzYWJsZWQgbWF0LWljb24ge1xuICBmaWxsOiAjYTJhNmFiO1xuICBjb2xvcjogI2EyYTZhYjtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIHtcbiAgY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMzliZTU7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubWF0LWZvY3VzZWQ6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5OmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLm1hdC1mbGF0LWJ1dHRvbi5tYXQtcHJpbWFyeS5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWFiMGY5ICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnk6aG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uLCAubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5LmZhdXgtaG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1wcmltYXJ5Lm5nLWNsaWNrLWFjdGl2ZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDI3OWIzICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmxhdC1idXR0b24ubWF0LXByaW1hcnkubmctY2xpY2stYWN0aXZlIG1hdC1pY29uIHtcbiAgZmlsbDogI2ZmZjtcbiAgY29sb3I6ICNmZmY7XG59XG4ubWF0LWZsYXQtYnV0dG9uLm1hdC1zZWNvbmRhcnkge1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4ubWF0LWZhYi5hbXAtZmFiIHtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzljY2NmO1xufVxuLm1hdC1mYWIuYW1wLWZhYiBtYXQtaWNvbiB7XG4gIGNvbG9yOiAjZmZmO1xuICBmaWxsOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYiBtYXQtaWNvbiAqIHtcbiAgZmlsbDogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWJbZGlzYWJsZWRdIHtcbiAgY3Vyc29yOiBhdXRvICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiW2Rpc2FibGVkXSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNjY2MgIWltcG9ydGFudDtcbiAgY29sb3I6ICNjY2MgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWJbZGlzYWJsZWRdIG1hdC1pY29uICoge1xuICBmaWxsOiAjY2NjICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLm1hdC1mYWIuYW1wLWZhYi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLm1hdC1mYWIuYW1wLWZhYi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDM5YmU1O1xuICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiwgLm1hdC1mYWIuYW1wLWZhYi5mYXV4LWhvdmVyOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiwgLm1hdC1mYWIuYW1wLWZhYi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24ge1xuICBmaWxsOiAjZmZmO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6aG92ZXI6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICosIC5tYXQtZmFiLmFtcC1mYWIuZmF1eC1ob3Zlcjpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiwgLm1hdC1mYWIuYW1wLWZhYi5tYXQtZm9jdXNlZDpub3QoW2Rpc2FibGVkXSkgbWF0LWljb24gKiB7XG4gIGZpbGw6ICNmZmY7XG59XG4ubWF0LWZhYi5hbXAtZmFiOmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWFiMGY5ICFpbXBvcnRhbnQ7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cbi5tYXQtZmFiLmFtcC1mYWI6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSBtYXQtaWNvbiB7XG4gIGZpbGw6ICNmZmY7XG4gIGNvbG9yOiAjZmZmO1xufVxuLm1hdC1mYWIuYW1wLWZhYjphY3RpdmU6bm90KFtkaXNhYmxlZF0pIG1hdC1pY29uICoge1xuICBmaWxsOiAjZmZmO1xufVxuXG46aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG59XG46aG9zdC5uZy1lbnRlciB7XG4gIG9wYWNpdHk6IDA7XG59XG46aG9zdC5uZy1sZWF2ZS1hY3RpdmUge1xuICBvcGFjaXR5OiAwO1xufVxuXG4uYW1wLXNwaW5uZXJfX2JvdW5jZSB7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBtYXJnaW46IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzc0Nzk4MDtcbiAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBhbmltYXRpb246IHNrLWJvdW5jZWRlbGF5IDEuNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQgYm90aDtcbn1cbi5hbXAtc3Bpbm5lcl9fYm91bmNlLS0xIHtcbiAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnMgIWltcG9ydGFudDtcbn1cbi5hbXAtc3Bpbm5lcl9fYm91bmNlLS0yIHtcbiAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNnMgIWltcG9ydGFudDtcbn1cbkAtd2Via2l0LWtleWZyYW1lcyBzay1ib3VuY2VkZWxheSB7XG4gIDAlLCA4MCUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG4gIH1cbiAgNDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5Aa2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5IHtcbiAgMCUsIDgwJSwgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgfVxuICA0MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cbi5hbXAtc3Bpbm5lcl9fbWVzc2FnZSB7XG4gIG1hcmdpbjogMTBweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cztcbn1cbi5hbXAtc3Bpbm5lcl9fbWVzc2FnZS0taW4ge1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTBweCwgMHB4KTtcbiAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xufVxuLmFtcC1zcGlubmVyX19tZXNzYWdlLS1vdXQge1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSg1MHB4LCAwcHgpO1xufVxuLmFtcC1zcGlubmVyX19tZXNzYWdlLS1vdXRyZXNldCB7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDBweCwgMHB4KTtcbiAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xufSIsIkBpbXBvcnQgXCIuLy4uLy4uL2NvcmUvY29yZVwiO1xuXG46aG9zdCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICYubmctZW50ZXIge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgJi5uZy1sZWF2ZS1hY3RpdmUge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbn1cblxuLmFtcC1zcGlubmVyIHtcbiAgJl9fYm91bmNlIHtcbiAgICB3aWR0aDogOHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIG1hcmdpbjogMXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvci1ncmV5O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGFuaW1hdGlvbjogc2stYm91bmNlZGVsYXkgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xuICAgICYtLTEge1xuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnMgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAmLS0yIHtcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogLTAuMTZzICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG5cbiAgQC13ZWJraXQta2V5ZnJhbWVzIHNrLWJvdW5jZWRlbGF5IHtcbiAgICAwJSwgODAlLCAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMClcbiAgICB9XG4gICAgNDAlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKVxuICAgIH1cbiAgfVxuXG4gIEBrZXlmcmFtZXMgc2stYm91bmNlZGVsYXkge1xuICAgIDAlLCA4MCUsIDEwMCUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbiAgICB9XG4gICAgNDAlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4wKTtcbiAgICB9XG4gIH1cblxuICAmX19tZXNzYWdlIHtcbiAgICBtYXJnaW46IDEwcHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjVzO1xuXG4gICAgJi0taW4ge1xuICAgICAgb3BhY2l0eTogMDtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MHB4LCAwcHgpO1xuICAgICAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgICYtLW91dCB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNTBweCwgMHB4KTtcbiAgICB9XG5cbiAgICAmLS1vdXRyZXNldCB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMHB4LCAwcHgpO1xuICAgICAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/preview/spinner/spinner.component.ts":
/*!******************************************************!*\
  !*** ./src/app/preview/spinner/spinner.component.ts ***!
  \******************************************************/
/*! exports provided: SpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerComponent", function() { return SpinnerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SpinnerComponent = class SpinnerComponent {
    constructor() {
        this.numberOfDots = 3;
    }
    ngOnChanges(changes) {
        if (changes.message) {
            this.lastMessage = changes.message.previousValue;
            this.newMessage = true;
            if (this.lastMessage != null) {
                this.oldMessage = true;
            }
            setTimeout(() => {
                this.newMessage = false;
                this.oldMessage = false;
            }, 1);
        }
    }
    ngOnInit() {
        this.dots = [];
        for (let i = 0; i < this.numberOfDots; i++) {
            this.dots.push(i);
        }
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], SpinnerComponent.prototype, "numberOfDots", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], SpinnerComponent.prototype, "message", void 0);
SpinnerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'amp-spinner',
        template: __webpack_require__(/*! raw-loader!./spinner.component.html */ "./node_modules/raw-loader/index.js!./src/app/preview/spinner/spinner.component.html"),
        styles: [__webpack_require__(/*! ./spinner.component.scss */ "./src/app/preview/spinner/spinner.component.scss")]
    })
], SpinnerComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dc\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map