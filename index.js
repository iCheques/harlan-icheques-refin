(function (harlan, $$1, numeral) {
	'use strict';

	harlan = harlan && Object.prototype.hasOwnProperty.call(harlan, 'default') ? harlan['default'] : harlan;
	$$1 = $$1 && Object.prototype.hasOwnProperty.call($$1, 'default') ? $$1['default'] : $$1;
	numeral = numeral && Object.prototype.hasOwnProperty.call(numeral, 'default') ? numeral['default'] : numeral;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal || freeSelf || Function('return this')();

	var _root = root;

	/** Built-in value references. */
	var Symbol = _root.Symbol;

	var _Symbol = Symbol;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

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

	var _objectToString = objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

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
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject_1(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = _baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction;

	/** Used to detect overreaching core-js shims. */
	var coreJsData = _root['__core-js_shared__'];

	var _coreJsData = coreJsData;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	var _isMasked = isMasked;

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	var _toSource = toSource;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype,
	    objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject_1(value) || _isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(_toSource(value));
	}

	var _baseIsNative = baseIsNative;

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	var _getValue = getValue;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = _getValue(object, key);
	  return _baseIsNative(value) ? value : undefined;
	}

	var _getNative = getNative;

	/* Built-in method references that are verified to be native. */
	var nativeCreate = _getNative(Object, 'create');

	var _nativeCreate = nativeCreate;

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
	  this.size = 0;
	}

	var _hashClear = hashClear;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _hashDelete = hashDelete;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (_nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
	}

	var _hashGet = hashGet;

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
	}

	var _hashHas = hashHas;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
	  return this;
	}

	var _hashSet = hashSet;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = _hashClear;
	Hash.prototype['delete'] = _hashDelete;
	Hash.prototype.get = _hashGet;
	Hash.prototype.has = _hashHas;
	Hash.prototype.set = _hashSet;

	var _Hash = Hash;

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	var _listCacheClear = listCacheClear;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	var eq_1 = eq;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq_1(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	var _assocIndexOf = assocIndexOf;

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	var _listCacheDelete = listCacheDelete;

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	var _listCacheGet = listCacheGet;

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return _assocIndexOf(this.__data__, key) > -1;
	}

	var _listCacheHas = listCacheHas;

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = _assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	var _listCacheSet = listCacheSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = _listCacheClear;
	ListCache.prototype['delete'] = _listCacheDelete;
	ListCache.prototype.get = _listCacheGet;
	ListCache.prototype.has = _listCacheHas;
	ListCache.prototype.set = _listCacheSet;

	var _ListCache = ListCache;

	/* Built-in method references that are verified to be native. */
	var Map = _getNative(_root, 'Map');

	var _Map = Map;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new _Hash,
	    'map': new (_Map || _ListCache),
	    'string': new _Hash
	  };
	}

	var _mapCacheClear = mapCacheClear;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	var _isKeyable = isKeyable;

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return _isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	var _getMapData = getMapData;

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = _getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _mapCacheDelete = mapCacheDelete;

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return _getMapData(this, key).get(key);
	}

	var _mapCacheGet = mapCacheGet;

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return _getMapData(this, key).has(key);
	}

	var _mapCacheHas = mapCacheHas;

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = _getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	var _mapCacheSet = mapCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = _mapCacheClear;
	MapCache.prototype['delete'] = _mapCacheDelete;
	MapCache.prototype.get = _mapCacheGet;
	MapCache.prototype.has = _mapCacheHas;
	MapCache.prototype.set = _mapCacheSet;

	var _MapCache = MapCache;

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result) || cache;
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || _MapCache);
	  return memoized;
	}

	// Expose `MapCache`.
	memoize.Cache = _MapCache;

	var memoize_1 = memoize;

	/** Used as the maximum memoize cache size. */
	var MAX_MEMOIZE_SIZE = 500;

	/**
	 * A specialized version of `_.memoize` which clears the memoized function's
	 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
	 *
	 * @private
	 * @param {Function} func The function to have its output memoized.
	 * @returns {Function} Returns the new memoized function.
	 */
	function memoizeCapped(func) {
	  var result = memoize_1(func, function(key) {
	    if (cache.size === MAX_MEMOIZE_SIZE) {
	      cache.clear();
	    }
	    return key;
	  });

	  var cache = result.cache;
	  return result;
	}

	var _memoizeCapped = memoizeCapped;

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = _memoizeCapped(function(string) {
	  var result = [];
	  if (string.charCodeAt(0) === 46 /* . */) {
	    result.push('');
	  }
	  string.replace(rePropName, function(match, number, quote, subString) {
	    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = _Symbol ? _Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	var cpf = createCommonjsModule(function (module, exports) {
	(function(commonjs){
	  // Blacklist common values.
	  var BLACKLIST = [
	    "00000000000",
	    "11111111111",
	    "22222222222",
	    "33333333333",
	    "44444444444",
	    "55555555555",
	    "66666666666",
	    "77777777777",
	    "88888888888",
	    "99999999999",
	    "12345678909"
	  ];

	  var STRICT_STRIP_REGEX = /[.-]/g;
	  var LOOSE_STRIP_REGEX = /[^\d]/g;

	  var verifierDigit = function(numbers) {
	    numbers = numbers
	      .split("")
	      .map(function(number){ return parseInt(number, 10); })
	    ;

	    var modulus = numbers.length + 1;

	    var multiplied = numbers.map(function(number, index) {
	      return number * (modulus - index);
	    });

	    var mod = multiplied.reduce(function(buffer, number){
	      return buffer + number;
	    }) % 11;

	    return (mod < 2 ? 0 : 11 - mod);
	  };

	  var CPF = {};

	  CPF.format = function(number) {
	    return this.strip(number).replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
	  };

	  CPF.strip = function(number, strict) {
	    var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
	    return (number || "").toString().replace(regex, "");
	  };

	  CPF.isValid = function(number, strict) {
	    var stripped = this.strip(number, strict);

	    // CPF must be defined
	    if (!stripped) { return false; }

	    // CPF must have 11 chars
	    if (stripped.length !== 11) { return false; }

	    // CPF can't be blacklisted
	    if (BLACKLIST.indexOf(stripped) >= 0) { return false; }

	    var numbers = stripped.substr(0, 9);
	    numbers += verifierDigit(numbers);
	    numbers += verifierDigit(numbers);

	    return numbers.substr(-2) === stripped.substr(-2);
	  };

	  CPF.generate = function(formatted) {
	    var numbers = "";

	    for (var i = 0; i < 9; i++) {
	      numbers += Math.floor(Math.random() * 9);
	    }

	    numbers += verifierDigit(numbers);
	    numbers += verifierDigit(numbers);

	    return (formatted ? this.format(numbers) : numbers);
	  };

	  if (commonjs) {
	    module.exports = CPF;
	  } else {
	    window.CPF = CPF;
	  }
	})('object' !== "undefined");
	});

	var cnpj = createCommonjsModule(function (module, exports) {
	(function(commonjs){
	  // Blacklist common values.
	  var BLACKLIST = [
	    "00000000000000",
	    "11111111111111",
	    "22222222222222",
	    "33333333333333",
	    "44444444444444",
	    "55555555555555",
	    "66666666666666",
	    "77777777777777",
	    "88888888888888",
	    "99999999999999"
	  ];

	  var STRICT_STRIP_REGEX = /[-\/.]/g;
	  var LOOSE_STRIP_REGEX = /[^\d]/g;

	  var verifierDigit = function(numbers) {
	    var index = 2;
	    var reverse = numbers.split("").reduce(function(buffer, number) {
	      return [parseInt(number, 10)].concat(buffer);
	    }, []);

	    var sum = reverse.reduce(function(buffer, number) {
	      buffer += number * index;
	      index = (index === 9 ? 2 : index + 1);
	      return buffer;
	    }, 0);

	    var mod = sum % 11;
	    return (mod < 2 ? 0 : 11 - mod);
	  };

	  var CNPJ = {};

	  CNPJ.format = function(number) {
	    return this.strip(number).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
	  };

	  CNPJ.strip = function(number, strict) {
	    var regex = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
	    return (number || "").toString().replace(regex, "");
	  };

	  CNPJ.isValid = function(number, strict) {
	    var stripped = this.strip(number, strict);

	    // CNPJ must be defined
	    if (!stripped) { return false; }

	    // CNPJ must have 14 chars
	    if (stripped.length !== 14) { return false; }

	    // CNPJ can't be blacklisted
	    if (BLACKLIST.indexOf(stripped) >= 0) { return false; }

	    var numbers = stripped.substr(0, 12);
	    numbers += verifierDigit(numbers);
	    numbers += verifierDigit(numbers);

	    return numbers.substr(-2) === stripped.substr(-2);
	  };

	  CNPJ.generate = function(formatted) {
	    var numbers = "";

	    for (var i = 0; i < 12; i++) {
	      numbers += Math.floor(Math.random() * 9);
	    }

	    numbers += verifierDigit(numbers);
	    numbers += verifierDigit(numbers);

	    return (formatted ? this.format(numbers) : numbers);
	  };

	  if (commonjs) {
	    module.exports = CNPJ;
	  } else {
	    window.CNPJ = CNPJ;
	  }
	})('object' !== "undefined");
	});

	var cpf_cnpj = {
	  CPF: cpf,
	  CNPJ: cnpj
	};
	var cpf_cnpj_1 = cpf_cnpj.CPF;
	var cpf_cnpj_2 = cpf_cnpj.CNPJ;

	var serasaFields = {
	  ocorrencia: 'Tipo de Ocorrência',
	  entrada: 'Data de Entrada',
	  vencimento: 'Data de Vencimento',
	  valor: 'Valor',
	  informante: 'Informante',
	  contrato: 'Número de Contrato',
	  avalista: 'Avalista',
	  cidade: 'Cidade',
	  uf: 'UF',
	  situacao: 'Situação',
	  orgaoemissor: 'Orgão Emissor',
	  totalpendencias: 'Total de Pendências',
	  totalcredores: 'Total de Credores',
	  totalvalor: 'Valor Total',
	  categoria: 'Categoria',
	};

	var FieldsCreator = function FieldsCreator() {
	  this.content = $('<div>').addClass('content serasa');
	  this.container = $('<div>').addClass('container').append(this.content);
	};

	FieldsCreator.prototype.addItem = function addItem (name, value) {
	  var field = $('<div>').addClass('field');

	  var $name = $('<div>').addClass('name').css({
	    fontSize: '10px',
	    fontWeight: 'bold',
	  });

	  var $value = $('<div>').addClass('value');

	  field.append($name.text(name), $value.text(value));

	  this.content.append(field);
	};

	FieldsCreator.prototype.element = function element () {
	  return this.container;
	};

	FieldsCreator.prototype.resetFields = function resetFields () {
	  this.content = $('<div>').addClass('content serasa');
	  this.container = $('<div>').addClass('container').append(this.content);
	};

	harlan.addPlugin(function (controller) {
	  var systemTags = (controller.confs.user || {}).tags || [];
	  var hasCredits = function (c, b) { return controller.server.call(
	    "SELECT FROM 'ICHEQUES'.'IPAYTHEBILL'",
	    controller.call('loader::ajax', {
	      dataType: 'json',
	      success: function (data) {
	        if (data) {
	          controller.call('credits::has', c, function () {
	            b();
	          });
	        } else {
	          b();
	        }
	      },
	    })
	  ); };

	  controller.registerCall('icheques::consulta::imoveis::generate', function (data, result, doc, alertDisabled, firstCallDisabled, imoveisButton) {
	    if ( firstCallDisabled === void 0 ) firstCallDisabled = false;
	    if ( imoveisButton === void 0 ) imoveisButton = null;

	    if (!$$1.isEmptyObject(imoveisButton)) {
	      imoveisButton.parent();
	      imoveisButton.remove();
	    }

	    var firstCall = !firstCallDisabled;
	    var addItem = function (name, value) { return (value ? result.addItem(name, value) : null); };
	    var objectData = JSON.parse(data);

	    if ($$1.isEmptyObject(objectData)) { return; }

	    var iptus = objectData.IPTUS;

	    if (iptus === undefined || iptus.length === 0) {
	      var separatorElement = result
	        .addSeparator(
	          'Não foram encontrados registros de IPTU',
	          'O sistema não encontrou nenhum registro de IPTU para o documento informado.',
	          ("Para o documento " + (cpf_cnpj_1.isValid(doc) ? cpf_cnpj_1.format(doc) : cpf_cnpj_2.format(doc)) + " não foram encontrados registros de IPTU.")
	        )
	        .addClass('error');
	      controller.call('minimizar::categorias', result.element());
	      if (firstCall) {
	        $$1('html, body').animate({
	          scrollTop: separatorElement.offset().top,
	        },
	        2000);
	        firstCall = false;
	      }
	    } else {
	      iptus.forEach(function (iptu) {
	        var separatorElement = result
	          .addSeparator(
	            'Registro de IPTU no Nome',
	            'Apontamentos de IPTU para o documento informado',
	            'Imposto Predial e Territorial Urbano sendo cobrado para o documento'
	          )
	          .addClass('error');
	        if (firstCall) {
	          $$1('html, body').animate({
	            scrollTop: separatorElement.offset().top,
	          },
	          2000);
	          firstCall = false;
	        }

	        if (iptu.hasOwnProperty('COMPLEMENTO')) {
	          iptu.COMPLEMENTO.hasOwnProperty('CONJUNTO') ? addItem('Conjunto', iptu.COMPLEMENTO.CONJUNTO) : '';
	          iptu.COMPLEMENTO.hasOwnProperty('QUADRA') ? addItem('Quadra', iptu.COMPLEMENTO.QUADRA) : '';
	          iptu.COMPLEMENTO.hasOwnProperty('LOTE') ? addItem('Lote', iptu.COMPLEMENTO.LOTE) : '';
	        }
	        iptu.hasOwnProperty('ENDERECO') ? addItem('Endereço', iptu.ENDERECO) : '';
	        iptu.hasOwnProperty('NUMERO') ? addItem('Número', iptu.NUMERO) : '';
	        iptu.hasOwnProperty('BAIRRO') ? addItem('Bairro', iptu.BAIRRO) : '';
	        iptu.hasOwnProperty('CEP') ? addItem('CEP', iptu.CEP) : '';
	        // addItem('Código', iptu.CodLog);
	        if (iptu.hasOwnProperty('AREA')) {
	          iptu.AREA.hasOwnProperty('TOTAL') ? addItem(
	            'Área do Terreno',
	            iptu.AREA.TOTAL
	              ? ((numeral(iptu.AREA.TOTAL).format()) + " m²")
	              : null
	          ) : '';

	          iptu.AREA.hasOwnProperty('CONSTRUIDA') ? addItem(
	            'Área Construída',
	            iptu.AREA.CONSTRUIDA
	              ? ((numeral(iptu.AREA.CONSTRUIDA).format()) + " m²")
	              : null
	          ) : '';
	        }
	        iptu.hasOwnProperty('ANO') ? addItem(
	          'Ano de Construção',
	          iptu.ANO
	            ? numeral(iptu.ANO).format()
	            : null
	        ) : '';
	        iptu.hasOwnProperty('ANO') ? addItem(
	          'Base de Cálculo do IPTU',
	          iptu.ANO
	            ? numeral(iptu.ANO).format('$0,0.00')
	            : null
	        ) : '';
	        if (iptu.hasOwnProperty('VALOR')) {
	          iptu.VALOR.hasOwnProperty('IPTU') ? addItem(
	            'Valor do IPTU',
	            iptu.VALOR.IPTU
	              ? numeral(iptu.VALOR.IPTU).format('$0,0.00')
	              : null
	          ) : '';
	          iptu.VALOR.hasOwnProperty('IPTU') ? addItem(
	            'Valor do IMÓVEL',
	            iptu.VALOR.IPTU
	              ? numeral(iptu.VALOR.CONSTRUCAO).format('$0,0.00')
	              : null
	          ) : '';
	        }
	      });

	      controller.call('minimizar::categorias', result.element());
	    }
	  });

	  controller.registerCall(
	    'icheques::consulta::imoveis',
	    function (result, doc, imoveisButton) { return hasCredits(20000, function () { return controller.serverCommunication.call(
	      "SELECT FROM 'IMOVEIS'.'CONSULTA'",
	      controller.call(
	        'loader::ajax',
	        {
	          dataType: 'json',
	          data: {
	            documento: doc.replace(/[^0-9]/g, ''),
	          },
	          error: function () {
	            toastr.error('Houve um erro ao consultar imóveis. O valor da consulta já foi estornado, por favor, tente mais tarde.');
	          },
	          success: function (data) {
	            controller.call('icheques::consulta::imoveis::generate', data, result, doc, false, false, imoveisButton);
	          },
	        }
	      )
	    ); }); }
	  );

	  controller.registerCall('icheques::consulta::score::generate', function (dataRes, result, doc, alertDisabled, firstCallDisabled, scoreButton) {
	    if ( firstCallDisabled === void 0 ) firstCallDisabled = false;
	    if ( scoreButton === void 0 ) scoreButton = null;

	    var data = dataRes;
	    if (!data.hasOwnProperty('score')) { return; }
	    var score = data.score[0];

	    if (scoreButton != null) { scoreButton.remove(); }

	    var addItem = function (name, value, after) { return value && result.addItem(name, value, undefined, after); };
	    var firstCall = !firstCallDisabled;
	    var separatorElement = result
	      .addSeparator(
	        'Score Boa Vista',
	        'Consulta',
	        'Score, explicação do score pela Boa Vista, porcentagem de inadimplência.'
	      )
	      .addClass('error');
	    if (firstCall) {
	      $$1('html, body').animate({
	        scrollTop: separatorElement.offset().top,
	      },
	      2000);
	      firstCall = false;
	    }
	    addItem('Score', parseInt(score.score));
	    addItem('Probabilidade de Inadimplência', score.provavel);
	    if (!cpf_cnpj_2.isValid(doc)) { addItem('Classificação', score.classificacao); }
	    addItem('Análise', score.texto);
	    if (!cpf_cnpj_2.isValid(doc)) { addItem('Status', score.status); }
	    if (cpf_cnpj_2.isValid(doc)) {
	      addItem('Classificação Númerica', score.classificacao_numerica);
	      addItem('Classificação Alfabética', score.classificacao_alfabetica);
	    }
	    var dataScore = [{
	      name: 'Score Boa Vista',
	      value: parseInt(score.score),
	    }];

	    if (cpf_cnpj_2.isValid()) {
	      dataScore.push({
	        name: 'Classificação Númerica',
	        value: score.classificacao_numerica
	      }, {
	        name: 'Classificação Alfabética',
	        value: score.classificacao_alfabetica
	      });
	    } else {
	      dataScore.push({
	        name: 'Classificação',
	        value: score.classificacao
	      });
	    }
	    var content = result.element().parent().find('.separator.resumo_negativacoes').parent().find('.name:contains(Processos Jurídicos)').parent().parent();
	    
	    var fields = dataScore.map(function (info) {
	      var field = $$1('<div>').addClass('field');
	      var name = $$1('<div>').addClass('name').text(info.name);
	      var value = $$1('<div>').addClass('value').text(info.value);

	      return field.append(value, name);
	    });

	    console.log(content, fields);

	    content.append(fields);
	    
	  });

	  controller.registerCall('icheques::consulta::score', function (result, doc, scoreButton) { return hasCredits(cpf_cnpj_2.isValid(doc) ? 6000 : 3700, function () { return controller.serverCommunication.call(
	    'SELECT FROM \'SPCNet\'.\'ScoreBoaVista\'',
	    controller.call(
	      'loader::ajax',
	      {
	        dataType: 'json',
	        data: {
	          documento: doc.replace(/[^0-9]/g, ''),
	        },
	        error: function () {
	          toastr.error('Houve um erro ao consultar o Score. O valor da consulta já foi estornado, por favor, tente mais tarde.');
	        },
	        success: function (dataRes) {
	          controller.call('icheques::consulta::score::generate', dataRes, result, doc, false, false, scoreButton);
	        },
	      }
	    )
	  ); }); });

	  controller.registerCall('icheques::consulta::refin::generate', function (data, result, doc, alertDisabled, firstCallDisabled, refinButton, jdocument) {
	    if ( alertDisabled === void 0 ) alertDisabled = false;
	    if ( firstCallDisabled === void 0 ) firstCallDisabled = false;
	    if ( refinButton === void 0 ) refinButton = null;

	    if (refinButton != null) { refinButton.remove(); }

	    var newData;

	    try {
	      newData = JSON.parse(data);
	    } catch (e) {
	      newData = data;
	    }

	    if ($$1.isEmptyObject(newData)) { return; }

	    var possuiRestricoes = false;

	    if (newData.hasOwnProperty('spc')) { possuiRestricoes = newData.spc[0].length; }

	    var resumoNegativacoes = result.element().parent().find('.resumo_negativacoes');

	    var firstCall = !firstCallDisabled;
	    // eslint-disable-next-line max-len
	    var addItem = function (name, value, after) { return value && result.addItem(name, value, undefined, after).parent().css({paddingTop: 0, paddingBottom: 0}); };
	    if (!possuiRestricoes) {

	      if (resumoNegativacoes.length) {
	        var contentResumoNegativacoes = resumoNegativacoes.next().find('content');
	        if (contentResumoNegativacoes.length) {
	          var field = $$1('<div>').addClass('.field');
	          var name = $$1('<div>').addClass('.name');
	          var value = $$1('<div>').addClass('.value');

	          name.text('Não foram encontradas ocorrências');
	          value.text('Pefin/Refin Boa Vista');

	          field.append(value, name);

	          contentResumoNegativacoes.push(field);
	        }
	      }

	      var separatorElement = result.addSeparator(
	        'Restrições Pefin/Refin Boa Vista',
	        'Apontamentos e Restrições Financeiras e Comerciais',
	        'Pendências e restrições financeiras no Boa Vista'
	      ).addClass('error');

	      if (firstCall) {
	        $$1('html, body').animate({
	          scrollTop: separatorElement.offset().top,
	        },
	        2000);
	        firstCall = false;
	      }

	      addItem('Informação', ("Para o documento " + (cpf_cnpj_1.isValid(doc) ? cpf_cnpj_1.format(doc) : cpf_cnpj_2.format(doc)) + " não foram encontrados registros de restrições."));

	      if (!alertDisabled) {
	        controller.call('alert', {
	          icon: 'pass',
	          title: 'Não há Pefin/Refin Boa Vista no Target',
	          subtitle: 'O sistema encontrou 0 ocorrências de Pefin/Refin para o documento informado.',
	          paragraph: ("Para o documento " + (cpf_cnpj_1.isValid(doc) ? cpf_cnpj_1.format(doc) : cpf_cnpj_2.format(doc)) + " não foram encontrados registros de Refin/Pefin."),
	        });
	      }

	      return;
	    }

	    var formatter = (new Intl.NumberFormat('pt-BR', {
	      style: 'currency',
	      currency: 'BRL',
	    }));

	    var firstPefinRefin = true;
	    newData.spc[0].forEach(function (spc) {
	      var separatorElement = result
	        .addSeparator(
	          'Restrição no Refin/Pefin',
	          'Apontamentos e Restrições Financeiras e Comerciais',
	          'Pendências e restrições financeiras nos bureaus de crédito Refin e Pefin'
	        )
	        .addClass('error');
	      if (!firstPefinRefin) { separatorElement.hide().find('.container').remove(); }
	      if (firstPefinRefin) { firstPefinRefin = false; }
	        // controller.call('minimizar::categorias', result.element());
	      if (firstCall) {
	        $$1('html, body').animate({
	          scrollTop: separatorElement.offset().top,
	        },
	        2000);
	        firstCall = false;
	      }

	      addItem('Associado', spc.NomeAssociado);
	      addItem('Valor', ("" + (formatter.format(parseFloat(spc.Valor)))));
	      addItem('Data da Inclusão', spc.DataDeInclusao);
	      addItem('Data do Vencimento', spc.DataDoVencimento);
	      addItem('Entidade', spc.Entidade);
	      addItem('Número do Contrato', spc.NumeroContrato);
	      addItem(
	        'Comprador, Fiador ou Avalista',
	        spc.CompradorFiadorAvalista
	      );
	      addItem('Telefone Associado', spc.TelefoneAssociado);
	      addItem('Cidade Associado', spc.CidadeAssociado);
	      addItem('UF Associado', spc.UfAssociado);
	    });

	    if (resumoNegativacoes.length) {
	      result.element().parent().find('.result:contains(Resumo de Negativações)').remove();
	      controller.call('grafico::analitico', result.element().parent(), doc, jdocument, true);
	    }

	    if (newData.consultaRealizada.length) {
	      result.addSeparator(
	        'Quem consultou este CPF/CNPJ?',
	        'Veja o histórico de Pefin/Refin do Target',
	        'No passado um CPF/CNPJ consultou Pefin/Refin neste Target.'
	      );

	      newData.consultaRealizada.forEach(function (consultaRealizada) {
	        addItem('Nome Associado', consultaRealizada.NomeAssociado);
	        // addItem('CPF/CNPJ', consultaRealizada.CpfCnpj);
	        addItem(
	          'Data da Consulta',
	          consultaRealizada.DataDaConsulta, true
	        );
	        // addItem('Cidade Associado', consultaRealizada.CidadeAssociado,);
	        // addItem('UF Associado', consultaRealizada.UfAssociado);
	      });
	    }
	  });

	  controller.registerCall(
	    'icheques::consulta::refin',
	    function (result, doc, refinButton, jdocument) {
	      var config = {
	        cpf: {
	          endpointCall: "SELECT FROM 'PROTESTOS'.'REFIN'",
	          searchValue: 1200,
	        },
	        cnpj: {
	          endpointCall: "SELECT FROM 'PROTESTOS'.'REFIN'",
	          searchValue: 2700,
	        },
	      };

	      var opt = doc.replace(/[^0-9]/g, '').length > 11 ? 'cnpj' : 'cpf';
	      var ref = config[opt];
	      var endpointCall = ref.endpointCall;
	      var searchValue = ref.searchValue;

	      hasCredits(searchValue, function () { return controller.serverCommunication.call(
	        endpointCall,
	        controller.call(
	          'loader::ajax',
	          {
	            dataType: 'json',
	            data: {
	              documento: doc.replace(/[^0-9]/g, ''),
	            },
	            error: function () {
	              toastr.error('Houve um erro ao consultar a inadimplência. O valor da consulta já foi estornado, por favor, tente mais tarde.');
	            },
	            success: function (data) {
	              controller.call('icheques::consulta::refin::generate', data, result, doc, false, false, refinButton, jdocument);
	            },
	          }
	        )
	      ); });
	    }
	  );

	  controller.registerCall('icheques::consulta::serasa::generate', function (dataRes, result, doc, alertDisabled, firstCallDisabled, serasaButton, jdocument) {
	    if ( alertDisabled === void 0 ) alertDisabled = false;
	    if ( firstCallDisabled === void 0 ) firstCallDisabled = false;
	    if ( serasaButton === void 0 ) serasaButton = null;

	    if ($$1.isEmptyObject(dataRes)) { return; }
	    var data;

	    try {
	      data = JSON.parse(dataRes);
	    } catch (e) {
	      data = dataRes;
	    }

	    var valorTotalPendencias = data.informacoes.hasOwnProperty('valorTotalPendencias') ? data.informacoes.valorTotalPendencias : null;

	    try {
	      data = data.informacoes[0].bello;
	    } catch (e) {
	      console.log(e);
	    }

	    var formatter = (new Intl.NumberFormat('pt-BR', {
	      style: 'currency',
	      currency: 'BRL',
	    }));

	    if (serasaButton != null) { serasaButton.remove(); }

	    var fieldsCreator = new FieldsCreator();
	    var addItem = function (name, value) { return value && fieldsCreator.addItem(name, value); };

	    var firstCall = !firstCallDisabled;
	    var resumoNegativacoes = result.element().parent().find('.resumo_negativacoes');
	    if (!data.length) {
	      if (resumoNegativacoes.length) {
	        var contentResumoNegativacoes = resumoNegativacoes.next().find('content');
	        if (contentResumoNegativacoes.length) {
	          var field = $$1('<div>').addClass('.field');
	          var name = $$1('<div>').addClass('.name');
	          var value = $$1('<div>').addClass('.value');

	          name.text('Não foram encontradas ocorrências');
	          value.text('Pefin/Refin Boa Vista');

	          field.append(value, name);

	          contentResumoNegativacoes.push(field);
	        }
	      }
	      var separatorElement = result.addSeparator(
	        'Restrições Serasa',
	        'Apontamentos e Restrições Financeiras e Comerciais',
	        'Pendências e restrições financeiras no Serasa'
	      ).addClass('error');

	      if (firstCall) {
	        $$1('html, body').animate({
	          scrollTop: separatorElement.offset().top,
	        },
	        2000);
	        firstCall = false;
	      }

	      addItem('Informação', ("Para o documento " + (cpf_cnpj_1.isValid(doc) ? cpf_cnpj_1.format(doc) : cpf_cnpj_2.format(doc)) + " não foram encontrados registros de restrições."));
	      result.element().append(fieldsCreator.element());

	      if (!alertDisabled) {
	        controller.call('alert', {
	          icon: 'pass',
	          title: 'Não há Restrições Serasa no Target',
	          subtitle: 'O sistema encontrou 0 ocorrências de Restrições Serasa para o documento informado.',
	          paragraph: ("Para o documento " + (cpf_cnpj_1.isValid(doc) ? cpf_cnpj_1.format(doc) : cpf_cnpj_2.format(doc)) + " não foram encontrados registros de restrições."),
	        });
	      }
	    } else {
	      var separatorElement$1 = result.addSeparator(
	        'Restrições Serasa',
	        'Apontamentos e Restrições Financeiras e Comerciais',
	        valorTotalPendencias !== null ? 'O documento possui ' + formatter.format(valorTotalPendencias) + 'em pendências Financeiras' :'Pendências e restrições financeiras no Serasa'
	      ).addClass('error');

	      data.forEach(function (ocorrencia) {
	        if (firstCall) {
	          $$1('html, body').animate({
	            scrollTop: separatorElement$1.offset().top,
	          },
	          2000);
	          firstCall = false;
	        }

	        Object.keys(ocorrencia).forEach(function (field) { return addItem(serasaFields[field], ocorrencia[field] || 'Não Informado'); });

	        result.element().append(fieldsCreator.element().append($$1('<hr>')));
	        fieldsCreator.resetFields();
	      });

	      if (resumoNegativacoes.length) {
	        result.element().parent().find('.result:contains(Resumo de Negativações)').remove();
	        controller.call('grafico::analitico', result.element().parent(), doc, jdocument, true);
	      }
	    }
	  });

	  controller.registerCall('icheques::consulta::serasa', function (result, doc, serasaButton) { return hasCredits(4000, function () { return controller.serverCommunication.call(
	    'SELECT FROM \'PROTESTOS\'.\'SERASA\'', {
	      dataType: 'json',
	      data: {
	        documento: doc.replace(/[^0-9]/g, ''),
	      },
	      success: function (dataRes) {
	        controller.call('icheques::consulta::serasa::generate', dataRes, result, doc, false, false, serasaButton, jdocument);
	      },
	      error: function (err) {
	        toastr.error('Houve um erro ao consultar inadimplência. Tente novamente mais tarde.');
	      },
	    }
	  ); }); });
	  controller.registerTrigger(
	    'ccbusca::parser',
	    'imoveis',
	    function (ref, cb) {
	      var result = ref.result;
	      var doc = ref.doc;

	      if (cpf_cnpj_2.isValid(doc)) { return; }
	      var imoveisButton = null;
	      var consultaImoveisLiberada = systemTags.indexOf('no-imóveis') === -1;
	      imoveisButton = $$1('<button />')
	        .text('Consultar Imóveis SP Capital')
	        .addClass('button')
	        .append(
	          $$1('<small />')
	            .text('CPF Somente - R$20')
	            .css({
	              display: 'block',
	              'font-size': '9px',
	            })
	        );

	      if (consultaImoveisLiberada) {
	        imoveisButton.click(
	          controller.click(
	            'icheques::consulta::imoveis',
	            result,
	            doc,
	            imoveisButton
	          )
	        );
	      } else {
	        imoveisButton.on('click', function (ev) {
	          ev.preventDefault();
	          controller.call('blockedOperation', 'imóveis');
	        });
	      }


	      result.addItem().prepend(imoveisButton);
	      cb();
	    }
	  );

	  controller.registerTrigger(
	    'ccbusca::parser',
	    'refin',
	    function (ref, cb) {
	      var result = ref.result;
	      var doc = ref.doc;
	      var jdocument = ref.jdocument;

	      cb();
	      var refinButton = null;
	      var consultaRefinBoaVistaLiberada = systemTags.indexOf('no-consulta-pefin-refin-boa-vista') === -1;
	      refinButton = $$1('<button />')
	        .text('Consultar Pefin/Refin Boa Vista')
	        .addClass('button')
	        .append(
	          $$1('<small />')
	            .text('CPF R$1,20 / CNPJ R$2,70')
	            .css({
	              display: 'block',
	              'font-size': '9px',
	            })
	        );

	      if (consultaRefinBoaVistaLiberada) {
	        refinButton.click(
	          controller.click('icheques::consulta::refin', result, doc, refinButton, jdocument)
	        );
	      } else {
	        refinButton.on('click', function (ev) {
	          ev.preventDefault();
	          controller.call('blockedOperation', 'consulta-pefin-refin-boa-vista');
	        });
	      }
	    
	      result.addItem().prepend(refinButton);
	    }
	  );

	  controller.registerTrigger(
	    'ccbusca::parser',
	    'score',
	    function (ref, cb) {
	      var result = ref.result;
	      var doc = ref.doc;

	      cb();
	      var scoreButton = null;
	      var consultaScoreBoaVistaLiberada = systemTags.indexOf('no-score-boa-vista') === -1;
	      scoreButton = $$1('<button />')
	        .text('Consultar Score Boa Vista')
	        .addClass('button')
	        .append(
	          $$1('<small />')
	            .text('CPF R$ 3,00 / CNPJ R$ 6,00')
	            .css({
	              display: 'block',
	              'font-size': '9px',
	            })
	        );

	      if (consultaScoreBoaVistaLiberada) {
	        scoreButton.click(
	          controller.click('icheques::consulta::score', result, doc, scoreButton)
	        );
	      } else {
	        scoreButton.on('click', function (ev) {
	          ev.preventDefault();
	          controller.call('blockedOperation', 'score-boa-vista');
	        });
	      }
	      result.addItem().prepend(scoreButton);
	    }
	  );

	  controller.registerTrigger(
	    'ccbusca::parser',
	    'serasa',
	    function (ref, cb) {
	      var result = ref.result;
	      var doc = ref.doc;
	      var jdocument = ref.jdocument;

	      cb();
	      var serasaButton = null;
	      var consultaPefinSerasaLiberada = systemTags.indexOf('no-consulta-pefin-refin-serasa') === -1;
	      serasaButton = $$1('<button />')
	        .text('Consultar Pefin/Refin Serasa')
	        .addClass('button')
	        .append(
	          $$1('<small />')
	            .text('CPF/CNPJ - R$ 4')
	            .css({
	              display: 'block',
	              'font-size': '9px',
	            })
	        );
	      
	      if (consultaPefinSerasaLiberada && (systemTags.join().match(/(flex|ouro|prata|diamante)/) != null)) {
	        serasaButton.click(
	          controller.click('icheques::consulta::serasa', result, doc, serasaButton, jdocument)
	        );
	      } else {
	        serasaButton.on('click', function (ev) {
	          ev.preventDefault();
	          if (systemTags.join().match(/(flex|ouro|prata|diamante)/) === null) { return controller.call('alert', {
	            title: 'Infelizmente voce não tem permissão para isso!',
	            subtitle: 'Para realizar essa consulta é necessário que você esteja no plano flex, prata, ouro ou diamante.',
	          }); }
	          controller.call('blockedOperation', 'consulta-pefin-refin-serasa');
	        });
	      }
	      result.addItem().prepend(serasaButton);
	    }
	  );
	});

}(harlan, $, numeral));
