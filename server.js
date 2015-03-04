(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jlowe/dev/apps/peer-connect/admin.js":[function(require,module,exports){
'use strict'

var Connection = require('./src/connection'),
  config = require('./config.json'),
  connection = new Connection(config.room)

window.client = connection

connection.on('ready', function(){
  if (chrome.tabs) {
    chrome.tabs.query({}, function(Tabs){
      var tabs = []
      for(var i = 0; i < Tabs.length; i += 1){
        var Tab = Tabs[i]
        tabs[Tab.id] = Tab
      }
      connection.broadcast({
        name: 'tabs',
        client: true,
        value: tabs
      })
    })
  }
})

connection.on('tabs', function(){
  console.log(arguments)
})

connection.on('newTab', function(){
  // add new tab
})

connection.on('removeTab', function(){

})

connection.on('closeTab', function(){

})

// chrome.tabs.query({}, function(Tabs){
//     console.log(Tabs)
//     for(var i = 0; i < Tabs.length; i += 1){
//       var Tab = Tabs[i];
//       tabs[Tab.id] = Tab;
//     }
// });

// chrome.tabs.onCreated.addListener(function(tab) {
//   tabs[tab.id] = tab;
//   // emit the new tab with the client id
//   socket.emit("new_tab", {tab : tab});
//   //removing timeout time its better tracked
//   //setTimeout(function(){chrome.tabs.remove(tab.id)}, (Math.random() * 240000) + 60000);
// });

// // remove tabs from tracking when a tab is removed
// chrome.tabs.onRemoved.addListener(function(tabid) {
//   delete tabs[tabid];
//   socket.emit("close_tab", {tabid : tabid})
// });

// chrome.tabs.onUpdated.addListener(function(tabid , change) {
//   if(change.url){
//     tabs[tabid].url = change.url;
//     socket.emit("url_change", {tabid : tabid, url : change.url})
//   }
// });

},{"./config.json":"/Users/jlowe/dev/apps/peer-connect/config.json","./src/connection":"/Users/jlowe/dev/apps/peer-connect/src/connection.js"}],"/Users/jlowe/dev/apps/peer-connect/config.json":[function(require,module,exports){
module.exports={
  "room": "AA:JACOB:TEST"
}

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/inherits/inherits_browser.js":[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/support/isBufferBrowser.js":[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/util.js":[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/support/isBufferBrowser.js","_process":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/process/browser.js","inherits":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/inherits/inherits_browser.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/eventemitter2/lib/eventemitter2.js":[function(require,module,exports){
/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {

      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this.newListener = conf.newListener);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this.newListener = false;
    configure.call(this, conf);
  }

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else if(typeof tree._listeners === 'function') {
          tree._listeners = [tree._listeners, listener];
        }
        else if (isArray(tree._listeners)) {

          tree._listeners.push(listener);

          if (!tree._listeners.warned) {

            var m = defaultMaxListeners;

            if (typeof this._events.maxListeners !== 'undefined') {
              m = this._events.maxListeners;
            }

            if (m > 0 && tree._listeners.length > m) {

              tree._listeners.warned = true;
              console.error('(node) warning: possible EventEmitter memory ' +
                            'leak detected. %d listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit.',
                            tree._listeners.length);
              console.trace();
            }
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    this._events || init.call(this);
    this._events.maxListeners = n;
    if (!this._conf) this._conf = {};
    this._conf.maxListeners = n;
  };

  EventEmitter.prototype.event = '';

  EventEmitter.prototype.once = function(event, fn) {
    this.many(event, 1, fn);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      fn.apply(this, arguments);
    }

    listener._origin = fn;

    this.on(event, listener);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this.newListener) {
      if (!this._events.newListener) { return false; }
    }

    // Loop through the *_all* functions and invoke them.
    if (this._all) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        this._all[i].apply(this, args);
      }
    }

    // If there is no 'error' event listener then throw.
    if (type === 'error') {

      if (!this._all &&
        !this._events.error &&
        !(this.wildcard && this.listenerTree.error)) {

        if (arguments[1] instanceof Error) {
          throw arguments[1]; // Unhandled 'error' event
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
    }

    var handler;

    if(this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    }
    else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      if (arguments.length === 1) {
        handler.call(this);
      }
      else if (arguments.length > 1)
        switch (arguments.length) {
          case 2:
            handler.call(this, arguments[1]);
            break;
          case 3:
            handler.call(this, arguments[1], arguments[2]);
            break;
          // slower
          default:
            var l = arguments.length;
            var args = new Array(l - 1);
            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
            handler.apply(this, args);
        }
      return true;
    }
    else if (handler) {
      var l = arguments.length;
      var args = new Array(l - 1);
      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

      var listeners = handler.slice();
      for (var i = 0, l = listeners.length; i < l; i++) {
        this.event = type;
        listeners[i].apply(this, args);
      }
      return (listeners.length > 0) || !!this._all;
    }
    else {
      return !!this._all;
    }

  };

  EventEmitter.prototype.on = function(type, listener) {

    if (typeof type === 'function') {
      this.onAny(type);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    this.emit('newListener', type, listener);

    if(this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else if(typeof this._events[type] === 'function') {
      // Adding the second element, need to change to array.
      this._events[type] = [this._events[type], listener];
    }
    else if (isArray(this._events[type])) {
      // If we've already got an array, just append.
      this._events[type].push(listener);

      // Check for listener leak
      if (!this._events[type].warned) {

        var m = defaultMaxListeners;

        if (typeof this._events.maxListeners !== 'undefined') {
          m = this._events.maxListeners;
        }

        if (m > 0 && this._events[type].length > m) {

          this._events[type].warned = true;
          console.error('(node) warning: possible EventEmitter memory ' +
                        'leak detected. %d listeners added. ' +
                        'Use emitter.setMaxListeners() to increase limit.',
                        this._events[type].length);
          console.trace();
        }
      }
    }
    return this;
  };

  EventEmitter.prototype.onAny = function(fn) {

    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if(!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    this._all.push(fn);
    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
      }
    }

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          return this;
        }
      }
    } else {
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (arguments.length === 0) {
      !this._events || init.call(this);
      return this;
    }

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else {
      if (!this._events[type]) return this;
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if(this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (typeof define === 'function' && define.amd) {
     // AMD. Register as an anonymous module.
    define(function() {
      return EventEmitter;
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.EventEmitter2 = EventEmitter;
  }
  else {
    // Browser global.
    window.EventEmitter2 = EventEmitter;
  }
}();

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/attachmediastream/attachmediastream.js":[function(require,module,exports){
module.exports = function (stream, el, options) {
    var URL = window.URL;
    var opts = {
        autoplay: true,
        mirror: false,
        muted: false
    };
    var element = el || document.createElement('video');
    var item;

    if (options) {
        for (item in options) {
            opts[item] = options[item];
        }
    }

    if (opts.autoplay) element.autoplay = 'autoplay';
    if (opts.muted) element.muted = true;
    if (opts.mirror) {
        ['', 'moz', 'webkit', 'o', 'ms'].forEach(function (prefix) {
            var styleName = prefix ? prefix + 'Transform' : 'transform';
            element.style[styleName] = 'scaleX(-1)';
        });
    }

    // this first one should work most everywhere now
    // but we have a few fallbacks just in case.
    if (URL && URL.createObjectURL) {
        element.src = URL.createObjectURL(stream);
    } else if (element.srcObject) {
        element.srcObject = stream;
    } else if (element.mozSrcObject) {
        element.mozSrcObject = stream;
    } else {
        return false;
    }

    return element;
};

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/mockconsole/mockconsole.js":[function(require,module,exports){
var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");
var l = methods.length;
var fn = function () {};
var mockconsole = {};

while (l--) {
    mockconsole[methods[l]] = fn;
}

module.exports = mockconsole;

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/socket.io-client/dist/socket.io.js":[function(require,module,exports){
/*! Socket.IO.js build:0.9.16, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

var io = ('undefined' === typeof module ? {} : module.exports);
(function() {

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, global) {

  /**
   * IO namespace.
   *
   * @namespace
   */

  var io = exports;

  /**
   * Socket.IO version
   *
   * @api public
   */

  io.version = '0.9.16';

  /**
   * Protocol implemented.
   *
   * @api public
   */

  io.protocol = 1;

  /**
   * Available transports, these will be populated with the available transports
   *
   * @api public
   */

  io.transports = [];

  /**
   * Keep track of jsonp callbacks.
   *
   * @api private
   */

  io.j = [];

  /**
   * Keep track of our io.Sockets
   *
   * @api private
   */
  io.sockets = {};


  /**
   * Manages connections to hosts.
   *
   * @param {String} uri
   * @Param {Boolean} force creation of new socket (defaults to false)
   * @api public
   */

  io.connect = function (host, details) {
    var uri = io.util.parseUri(host)
      , uuri
      , socket;

    if (global && global.location) {
      uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
      uri.host = uri.host || (global.document
        ? global.document.domain : global.location.hostname);
      uri.port = uri.port || global.location.port;
    }

    uuri = io.util.uniqueUri(uri);

    var options = {
        host: uri.host
      , secure: 'https' == uri.protocol
      , port: uri.port || ('https' == uri.protocol ? 443 : 80)
      , query: uri.query || ''
    };

    io.util.merge(options, details);

    if (options['force new connection'] || !io.sockets[uuri]) {
      socket = new io.Socket(options);
    }

    if (!options['force new connection'] && socket) {
      io.sockets[uuri] = socket;
    }

    socket = socket || io.sockets[uuri];

    // if path is different from '' or /
    return socket.of(uri.path.length > 1 ? uri.path : '');
  };

})('object' === typeof module ? module.exports : (this.io = {}), this);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, global) {

  /**
   * Utilities namespace.
   *
   * @namespace
   */

  var util = exports.util = {};

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api public
   */

  var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
               'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
               'anchor'];

  util.parseUri = function (str) {
    var m = re.exec(str || '')
      , uri = {}
      , i = 14;

    while (i--) {
      uri[parts[i]] = m[i] || '';
    }

    return uri;
  };

  /**
   * Produces a unique url that identifies a Socket.IO connection.
   *
   * @param {Object} uri
   * @api public
   */

  util.uniqueUri = function (uri) {
    var protocol = uri.protocol
      , host = uri.host
      , port = uri.port;

    if ('document' in global) {
      host = host || document.domain;
      port = port || (protocol == 'https'
        && document.location.protocol !== 'https:' ? 443 : document.location.port);
    } else {
      host = host || 'localhost';

      if (!port && protocol == 'https') {
        port = 443;
      }
    }

    return (protocol || 'http') + '://' + host + ':' + (port || 80);
  };

  /**
   * Mergest 2 query strings in to once unique query string
   *
   * @param {String} base
   * @param {String} addition
   * @api public
   */

  util.query = function (base, addition) {
    var query = util.chunkQuery(base || '')
      , components = [];

    util.merge(query, util.chunkQuery(addition || ''));
    for (var part in query) {
      if (query.hasOwnProperty(part)) {
        components.push(part + '=' + query[part]);
      }
    }

    return components.length ? '?' + components.join('&') : '';
  };

  /**
   * Transforms a querystring in to an object
   *
   * @param {String} qs
   * @api public
   */

  util.chunkQuery = function (qs) {
    var query = {}
      , params = qs.split('&')
      , i = 0
      , l = params.length
      , kv;

    for (; i < l; ++i) {
      kv = params[i].split('=');
      if (kv[0]) {
        query[kv[0]] = kv[1];
      }
    }

    return query;
  };

  /**
   * Executes the given function when the page is loaded.
   *
   *     io.util.load(function () { console.log('page loaded'); });
   *
   * @param {Function} fn
   * @api public
   */

  var pageLoaded = false;

  util.load = function (fn) {
    if ('document' in global && document.readyState === 'complete' || pageLoaded) {
      return fn();
    }

    util.on(global, 'load', fn, false);
  };

  /**
   * Adds an event.
   *
   * @api private
   */

  util.on = function (element, event, fn, capture) {
    if (element.attachEvent) {
      element.attachEvent('on' + event, fn);
    } else if (element.addEventListener) {
      element.addEventListener(event, fn, capture);
    }
  };

  /**
   * Generates the correct `XMLHttpRequest` for regular and cross domain requests.
   *
   * @param {Boolean} [xdomain] Create a request that can be used cross domain.
   * @returns {XMLHttpRequest|false} If we can create a XMLHttpRequest.
   * @api private
   */

  util.request = function (xdomain) {

    if (xdomain && 'undefined' != typeof XDomainRequest && !util.ua.hasCORS) {
      return new XDomainRequest();
    }

    if ('undefined' != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
      return new XMLHttpRequest();
    }

    if (!xdomain) {
      try {
        return new window[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
      } catch(e) { }
    }

    return null;
  };

  /**
   * XHR based transport constructor.
   *
   * @constructor
   * @api public
   */

  /**
   * Change the internal pageLoaded value.
   */

  if ('undefined' != typeof window) {
    util.load(function () {
      pageLoaded = true;
    });
  }

  /**
   * Defers a function to ensure a spinner is not displayed by the browser
   *
   * @param {Function} fn
   * @api public
   */

  util.defer = function (fn) {
    if (!util.ua.webkit || 'undefined' != typeof importScripts) {
      return fn();
    }

    util.load(function () {
      setTimeout(fn, 100);
    });
  };

  /**
   * Merges two objects.
   *
   * @api public
   */

  util.merge = function merge (target, additional, deep, lastseen) {
    var seen = lastseen || []
      , depth = typeof deep == 'undefined' ? 2 : deep
      , prop;

    for (prop in additional) {
      if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
        if (typeof target[prop] !== 'object' || !depth) {
          target[prop] = additional[prop];
          seen.push(additional[prop]);
        } else {
          util.merge(target[prop], additional[prop], depth - 1, seen);
        }
      }
    }

    return target;
  };

  /**
   * Merges prototypes from objects
   *
   * @api public
   */

  util.mixin = function (ctor, ctor2) {
    util.merge(ctor.prototype, ctor2.prototype);
  };

  /**
   * Shortcut for prototypical and static inheritance.
   *
   * @api private
   */

  util.inherit = function (ctor, ctor2) {
    function f() {};
    f.prototype = ctor2.prototype;
    ctor.prototype = new f;
  };

  /**
   * Checks if the given object is an Array.
   *
   *     io.util.isArray([]); // true
   *     io.util.isArray({}); // false
   *
   * @param Object obj
   * @api public
   */

  util.isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  /**
   * Intersects values of two arrays into a third
   *
   * @api public
   */

  util.intersect = function (arr, arr2) {
    var ret = []
      , longest = arr.length > arr2.length ? arr : arr2
      , shortest = arr.length > arr2.length ? arr2 : arr;

    for (var i = 0, l = shortest.length; i < l; i++) {
      if (~util.indexOf(longest, shortest[i]))
        ret.push(shortest[i]);
    }

    return ret;
  };

  /**
   * Array indexOf compatibility.
   *
   * @see bit.ly/a5Dxa2
   * @api public
   */

  util.indexOf = function (arr, o, i) {

    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0;
         i < j && arr[i] !== o; i++) {}

    return j <= i ? -1 : i;
  };

  /**
   * Converts enumerables to array.
   *
   * @api public
   */

  util.toArray = function (enu) {
    var arr = [];

    for (var i = 0, l = enu.length; i < l; i++)
      arr.push(enu[i]);

    return arr;
  };

  /**
   * UA / engines detection namespace.
   *
   * @namespace
   */

  util.ua = {};

  /**
   * Whether the UA supports CORS for XHR.
   *
   * @api public
   */

  util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && (function () {
    try {
      var a = new XMLHttpRequest();
    } catch (e) {
      return false;
    }

    return a.withCredentials != undefined;
  })();

  /**
   * Detect webkit.
   *
   * @api public
   */

  util.ua.webkit = 'undefined' != typeof navigator
    && /webkit/i.test(navigator.userAgent);

   /**
   * Detect iPad/iPhone/iPod.
   *
   * @api public
   */

  util.ua.iDevice = 'undefined' != typeof navigator
      && /iPad|iPhone|iPod/i.test(navigator.userAgent);

})('undefined' != typeof io ? io : module.exports, this);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.EventEmitter = EventEmitter;

  /**
   * Event emitter constructor.
   *
   * @api public.
   */

  function EventEmitter () {};

  /**
   * Adds a listener
   *
   * @api public
   */

  EventEmitter.prototype.on = function (name, fn) {
    if (!this.$events) {
      this.$events = {};
    }

    if (!this.$events[name]) {
      this.$events[name] = fn;
    } else if (io.util.isArray(this.$events[name])) {
      this.$events[name].push(fn);
    } else {
      this.$events[name] = [this.$events[name], fn];
    }

    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  /**
   * Adds a volatile listener.
   *
   * @api public
   */

  EventEmitter.prototype.once = function (name, fn) {
    var self = this;

    function on () {
      self.removeListener(name, on);
      fn.apply(this, arguments);
    };

    on.listener = fn;
    this.on(name, on);

    return this;
  };

  /**
   * Removes a listener.
   *
   * @api public
   */

  EventEmitter.prototype.removeListener = function (name, fn) {
    if (this.$events && this.$events[name]) {
      var list = this.$events[name];

      if (io.util.isArray(list)) {
        var pos = -1;

        for (var i = 0, l = list.length; i < l; i++) {
          if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
            pos = i;
            break;
          }
        }

        if (pos < 0) {
          return this;
        }

        list.splice(pos, 1);

        if (!list.length) {
          delete this.$events[name];
        }
      } else if (list === fn || (list.listener && list.listener === fn)) {
        delete this.$events[name];
      }
    }

    return this;
  };

  /**
   * Removes all listeners for an event.
   *
   * @api public
   */

  EventEmitter.prototype.removeAllListeners = function (name) {
    if (name === undefined) {
      this.$events = {};
      return this;
    }

    if (this.$events && this.$events[name]) {
      this.$events[name] = null;
    }

    return this;
  };

  /**
   * Gets all listeners for a certain event.
   *
   * @api publci
   */

  EventEmitter.prototype.listeners = function (name) {
    if (!this.$events) {
      this.$events = {};
    }

    if (!this.$events[name]) {
      this.$events[name] = [];
    }

    if (!io.util.isArray(this.$events[name])) {
      this.$events[name] = [this.$events[name]];
    }

    return this.$events[name];
  };

  /**
   * Emits an event.
   *
   * @api public
   */

  EventEmitter.prototype.emit = function (name) {
    if (!this.$events) {
      return false;
    }

    var handler = this.$events[name];

    if (!handler) {
      return false;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    if ('function' == typeof handler) {
      handler.apply(this, args);
    } else if (io.util.isArray(handler)) {
      var listeners = handler.slice();

      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i].apply(this, args);
      }
    } else {
      return false;
    }

    return true;
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Based on JSON2 (http://www.JSON.org/js.html).
 */

(function (exports, nativeJSON) {
  "use strict";

  // use native JSON if it's available
  if (nativeJSON && nativeJSON.parse){
    return exports.JSON = {
      parse: nativeJSON.parse
    , stringify: nativeJSON.stringify
    };
  }

  var JSON = exports.JSON = {};

  function f(n) {
      // Format integers to have at least two digits.
      return n < 10 ? '0' + n : n;
  }

  function date(d, key) {
    return isFinite(d.valueOf()) ?
        d.getUTCFullYear()     + '-' +
        f(d.getUTCMonth() + 1) + '-' +
        f(d.getUTCDate())      + 'T' +
        f(d.getUTCHours())     + ':' +
        f(d.getUTCMinutes())   + ':' +
        f(d.getUTCSeconds())   + 'Z' : null;
  };

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {    // table of character substitutions
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"' : '\\"',
          '\\': '\\\\'
      },
      rep;


  function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
          var c = meta[a];
          return typeof c === 'string' ? c :
              '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
  }


  function str(key, holder) {

// Produce a string from holder[key].

      var i,          // The loop counter.
          k,          // The member key.
          v,          // The member value.
          length,
          mind = gap,
          partial,
          value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

      if (value instanceof Date) {
          value = date(key);
      }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

      if (typeof rep === 'function') {
          value = rep.call(holder, key, value);
      }

// What happens next depends on the value's type.

      switch (typeof value) {
      case 'string':
          return quote(value);

      case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

          return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

          return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

      case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

          if (!value) {
              return 'null';
          }

// Make an array to hold the partial results of stringifying this object value.

          gap += indent;
          partial = [];

// Is the value an array?

          if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

              length = value.length;
              for (i = 0; i < length; i += 1) {
                  partial[i] = str(i, value) || 'null';
              }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

              v = partial.length === 0 ? '[]' : gap ?
                  '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                  '[' + partial.join(',') + ']';
              gap = mind;
              return v;
          }

// If the replacer is an array, use it to select the members to be stringified.

          if (rep && typeof rep === 'object') {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                  if (typeof rep[i] === 'string') {
                      k = rep[i];
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
                      }
                  }
              }
          } else {

// Otherwise, iterate through all of the keys in the object.

              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
                      }
                  }
              }
          }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

          v = partial.length === 0 ? '{}' : gap ?
              '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
              '{' + partial.join(',') + '}';
          gap = mind;
          return v;
      }
  }

// If the JSON object does not yet have a stringify method, give it one.

  JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

      var i;
      gap = '';
      indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

      if (typeof space === 'number') {
          for (i = 0; i < space; i += 1) {
              indent += ' ';
          }

// If the space parameter is a string, it will be used as the indent string.

      } else if (typeof space === 'string') {
          indent = space;
      }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== 'function' &&
              (typeof replacer !== 'object' ||
              typeof replacer.length !== 'number')) {
          throw new Error('JSON.stringify');
      }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

      return str('', {'': value});
  };

// If the JSON object does not yet have a parse method, give it one.

  JSON.parse = function (text, reviver) {
  // The parse method takes a text and an optional reviver function, and returns
  // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {

  // The walk method is used to recursively walk the resulting structure so
  // that modifications can be made.

          var k, v, value = holder[key];
          if (value && typeof value === 'object') {
              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = walk(value, k);
                      if (v !== undefined) {
                          value[k] = v;
                      } else {
                          delete value[k];
                      }
                  }
              }
          }
          return reviver.call(holder, key, value);
      }


  // Parsing happens in four stages. In the first stage, we replace certain
  // Unicode characters with escape sequences. JavaScript handles many characters
  // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
          text = text.replace(cx, function (a) {
              return '\\u' +
                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          });
      }

  // In the second stage, we run the text against regular expressions that look
  // for non-JSON patterns. We are especially concerned with '()' and 'new'
  // because they can cause invocation, and '=' because it can cause mutation.
  // But just to be safe, we want to reject all unexpected forms.

  // We split the second stage into 4 regexp operations in order to work around
  // crippling inefficiencies in IE's and Safari's regexp engines. First we
  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
  // replace all simple value tokens with ']' characters. Third, we delete all
  // open brackets that follow a colon or comma or that begin the text. Finally,
  // we look to see that the remaining characters are only whitespace or ']' or
  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (/^[\],:{}\s]*$/
              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

  // In the third stage we use the eval function to compile the text into a
  // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
  // in JavaScript: it can begin a block or an object literal. We wrap the text
  // in parens to eliminate the ambiguity.

          j = eval('(' + text + ')');

  // In the optional fourth stage, we recursively walk the new structure, passing
  // each name/value pair to a reviver function for possible transformation.

          return typeof reviver === 'function' ?
              walk({'': j}, '') : j;
      }

  // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError('JSON.parse');
  };

})(
    'undefined' != typeof io ? io : module.exports
  , typeof JSON !== 'undefined' ? JSON : undefined
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Parser namespace.
   *
   * @namespace
   */

  var parser = exports.parser = {};

  /**
   * Packet types.
   */

  var packets = parser.packets = [
      'disconnect'
    , 'connect'
    , 'heartbeat'
    , 'message'
    , 'json'
    , 'event'
    , 'ack'
    , 'error'
    , 'noop'
  ];

  /**
   * Errors reasons.
   */

  var reasons = parser.reasons = [
      'transport not supported'
    , 'client not handshaken'
    , 'unauthorized'
  ];

  /**
   * Errors advice.
   */

  var advice = parser.advice = [
      'reconnect'
  ];

  /**
   * Shortcuts.
   */

  var JSON = io.JSON
    , indexOf = io.util.indexOf;

  /**
   * Encodes a packet.
   *
   * @api private
   */

  parser.encodePacket = function (packet) {
    var type = indexOf(packets, packet.type)
      , id = packet.id || ''
      , endpoint = packet.endpoint || ''
      , ack = packet.ack
      , data = null;

    switch (packet.type) {
      case 'error':
        var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
          , adv = packet.advice ? indexOf(advice, packet.advice) : '';

        if (reason !== '' || adv !== '')
          data = reason + (adv !== '' ? ('+' + adv) : '');

        break;

      case 'message':
        if (packet.data !== '')
          data = packet.data;
        break;

      case 'event':
        var ev = { name: packet.name };

        if (packet.args && packet.args.length) {
          ev.args = packet.args;
        }

        data = JSON.stringify(ev);
        break;

      case 'json':
        data = JSON.stringify(packet.data);
        break;

      case 'connect':
        if (packet.qs)
          data = packet.qs;
        break;

      case 'ack':
        data = packet.ackId
          + (packet.args && packet.args.length
              ? '+' + JSON.stringify(packet.args) : '');
        break;
    }

    // construct packet with required fragments
    var encoded = [
        type
      , id + (ack == 'data' ? '+' : '')
      , endpoint
    ];

    // data fragment is optional
    if (data !== null && data !== undefined)
      encoded.push(data);

    return encoded.join(':');
  };

  /**
   * Encodes multiple messages (payload).
   *
   * @param {Array} messages
   * @api private
   */

  parser.encodePayload = function (packets) {
    var decoded = '';

    if (packets.length == 1)
      return packets[0];

    for (var i = 0, l = packets.length; i < l; i++) {
      var packet = packets[i];
      decoded += '\ufffd' + packet.length + '\ufffd' + packets[i];
    }

    return decoded;
  };

  /**
   * Decodes a packet
   *
   * @api private
   */

  var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

  parser.decodePacket = function (data) {
    var pieces = data.match(regexp);

    if (!pieces) return {};

    var id = pieces[2] || ''
      , data = pieces[5] || ''
      , packet = {
            type: packets[pieces[1]]
          , endpoint: pieces[4] || ''
        };

    // whether we need to acknowledge the packet
    if (id) {
      packet.id = id;
      if (pieces[3])
        packet.ack = 'data';
      else
        packet.ack = true;
    }

    // handle different packet types
    switch (packet.type) {
      case 'error':
        var pieces = data.split('+');
        packet.reason = reasons[pieces[0]] || '';
        packet.advice = advice[pieces[1]] || '';
        break;

      case 'message':
        packet.data = data || '';
        break;

      case 'event':
        try {
          var opts = JSON.parse(data);
          packet.name = opts.name;
          packet.args = opts.args;
        } catch (e) { }

        packet.args = packet.args || [];
        break;

      case 'json':
        try {
          packet.data = JSON.parse(data);
        } catch (e) { }
        break;

      case 'connect':
        packet.qs = data || '';
        break;

      case 'ack':
        var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
        if (pieces) {
          packet.ackId = pieces[1];
          packet.args = [];

          if (pieces[3]) {
            try {
              packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
            } catch (e) { }
          }
        }
        break;

      case 'disconnect':
      case 'heartbeat':
        break;
    };

    return packet;
  };

  /**
   * Decodes data payload. Detects multiple messages
   *
   * @return {Array} messages
   * @api public
   */

  parser.decodePayload = function (data) {
    // IE doesn't like data[i] for unicode chars, charAt works fine
    if (data.charAt(0) == '\ufffd') {
      var ret = [];

      for (var i = 1, length = ''; i < data.length; i++) {
        if (data.charAt(i) == '\ufffd') {
          ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
          i += Number(length) + 1;
          length = '';
        } else {
          length += data.charAt(i);
        }
      }

      return ret;
    } else {
      return [parser.decodePacket(data)];
    }
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.Transport = Transport;

  /**
   * This is the transport template for all supported transport methods.
   *
   * @constructor
   * @api public
   */

  function Transport (socket, sessid) {
    this.socket = socket;
    this.sessid = sessid;
  };

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(Transport, io.EventEmitter);


  /**
   * Indicates whether heartbeats is enabled for this transport
   *
   * @api private
   */

  Transport.prototype.heartbeats = function () {
    return true;
  };

  /**
   * Handles the response from the server. When a new response is received
   * it will automatically update the timeout, decode the message and
   * forwards the response to the onMessage function for further processing.
   *
   * @param {String} data Response from the server.
   * @api private
   */

  Transport.prototype.onData = function (data) {
    this.clearCloseTimeout();

    // If the connection in currently open (or in a reopening state) reset the close
    // timeout since we have just received data. This check is necessary so
    // that we don't reset the timeout on an explicitly disconnected connection.
    if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
      this.setCloseTimeout();
    }

    if (data !== '') {
      // todo: we should only do decodePayload for xhr transports
      var msgs = io.parser.decodePayload(data);

      if (msgs && msgs.length) {
        for (var i = 0, l = msgs.length; i < l; i++) {
          this.onPacket(msgs[i]);
        }
      }
    }

    return this;
  };

  /**
   * Handles packets.
   *
   * @api private
   */

  Transport.prototype.onPacket = function (packet) {
    this.socket.setHeartbeatTimeout();

    if (packet.type == 'heartbeat') {
      return this.onHeartbeat();
    }

    if (packet.type == 'connect' && packet.endpoint == '') {
      this.onConnect();
    }

    if (packet.type == 'error' && packet.advice == 'reconnect') {
      this.isOpen = false;
    }

    this.socket.onPacket(packet);

    return this;
  };

  /**
   * Sets close timeout
   *
   * @api private
   */

  Transport.prototype.setCloseTimeout = function () {
    if (!this.closeTimeout) {
      var self = this;

      this.closeTimeout = setTimeout(function () {
        self.onDisconnect();
      }, this.socket.closeTimeout);
    }
  };

  /**
   * Called when transport disconnects.
   *
   * @api private
   */

  Transport.prototype.onDisconnect = function () {
    if (this.isOpen) this.close();
    this.clearTimeouts();
    this.socket.onDisconnect();
    return this;
  };

  /**
   * Called when transport connects
   *
   * @api private
   */

  Transport.prototype.onConnect = function () {
    this.socket.onConnect();
    return this;
  };

  /**
   * Clears close timeout
   *
   * @api private
   */

  Transport.prototype.clearCloseTimeout = function () {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  };

  /**
   * Clear timeouts
   *
   * @api private
   */

  Transport.prototype.clearTimeouts = function () {
    this.clearCloseTimeout();

    if (this.reopenTimeout) {
      clearTimeout(this.reopenTimeout);
    }
  };

  /**
   * Sends a packet
   *
   * @param {Object} packet object.
   * @api private
   */

  Transport.prototype.packet = function (packet) {
    this.send(io.parser.encodePacket(packet));
  };

  /**
   * Send the received heartbeat message back to server. So the server
   * knows we are still connected.
   *
   * @param {String} heartbeat Heartbeat response from the server.
   * @api private
   */

  Transport.prototype.onHeartbeat = function (heartbeat) {
    this.packet({ type: 'heartbeat' });
  };

  /**
   * Called when the transport opens.
   *
   * @api private
   */

  Transport.prototype.onOpen = function () {
    this.isOpen = true;
    this.clearCloseTimeout();
    this.socket.onOpen();
  };

  /**
   * Notifies the base when the connection with the Socket.IO server
   * has been disconnected.
   *
   * @api private
   */

  Transport.prototype.onClose = function () {
    var self = this;

    /* FIXME: reopen delay causing a infinit loop
    this.reopenTimeout = setTimeout(function () {
      self.open();
    }, this.socket.options['reopen delay']);*/

    this.isOpen = false;
    this.socket.onClose();
    this.onDisconnect();
  };

  /**
   * Generates a connection url based on the Socket.IO URL Protocol.
   * See <https://github.com/learnboost/socket.io-node/> for more details.
   *
   * @returns {String} Connection url
   * @api private
   */

  Transport.prototype.prepareUrl = function () {
    var options = this.socket.options;

    return this.scheme() + '://'
      + options.host + ':' + options.port + '/'
      + options.resource + '/' + io.protocol
      + '/' + this.name + '/' + this.sessid;
  };

  /**
   * Checks if the transport is ready to start a connection.
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  Transport.prototype.ready = function (socket, fn) {
    fn.call(this);
  };
})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   */

  exports.Socket = Socket;

  /**
   * Create a new `Socket.IO client` which can establish a persistent
   * connection with a Socket.IO enabled server.
   *
   * @api public
   */

  function Socket (options) {
    this.options = {
        port: 80
      , secure: false
      , document: 'document' in global ? document : false
      , resource: 'socket.io'
      , transports: io.transports
      , 'connect timeout': 10000
      , 'try multiple transports': true
      , 'reconnect': true
      , 'reconnection delay': 500
      , 'reconnection limit': Infinity
      , 'reopen delay': 3000
      , 'max reconnection attempts': 10
      , 'sync disconnect on unload': false
      , 'auto connect': true
      , 'flash policy port': 10843
      , 'manualFlush': false
    };

    io.util.merge(this.options, options);

    this.connected = false;
    this.open = false;
    this.connecting = false;
    this.reconnecting = false;
    this.namespaces = {};
    this.buffer = [];
    this.doBuffer = false;

    if (this.options['sync disconnect on unload'] &&
        (!this.isXDomain() || io.util.ua.hasCORS)) {
      var self = this;
      io.util.on(global, 'beforeunload', function () {
        self.disconnectSync();
      }, false);
    }

    if (this.options['auto connect']) {
      this.connect();
    }
};

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(Socket, io.EventEmitter);

  /**
   * Returns a namespace listener/emitter for this socket
   *
   * @api public
   */

  Socket.prototype.of = function (name) {
    if (!this.namespaces[name]) {
      this.namespaces[name] = new io.SocketNamespace(this, name);

      if (name !== '') {
        this.namespaces[name].packet({ type: 'connect' });
      }
    }

    return this.namespaces[name];
  };

  /**
   * Emits the given event to the Socket and all namespaces
   *
   * @api private
   */

  Socket.prototype.publish = function () {
    this.emit.apply(this, arguments);

    var nsp;

    for (var i in this.namespaces) {
      if (this.namespaces.hasOwnProperty(i)) {
        nsp = this.of(i);
        nsp.$emit.apply(nsp, arguments);
      }
    }
  };

  /**
   * Performs the handshake
   *
   * @api private
   */

  function empty () { };

  Socket.prototype.handshake = function (fn) {
    var self = this
      , options = this.options;

    function complete (data) {
      if (data instanceof Error) {
        self.connecting = false;
        self.onError(data.message);
      } else {
        fn.apply(null, data.split(':'));
      }
    };

    var url = [
          'http' + (options.secure ? 's' : '') + ':/'
        , options.host + ':' + options.port
        , options.resource
        , io.protocol
        , io.util.query(this.options.query, 't=' + +new Date)
      ].join('/');

    if (this.isXDomain() && !io.util.ua.hasCORS) {
      var insertAt = document.getElementsByTagName('script')[0]
        , script = document.createElement('script');

      script.src = url + '&jsonp=' + io.j.length;
      insertAt.parentNode.insertBefore(script, insertAt);

      io.j.push(function (data) {
        complete(data);
        script.parentNode.removeChild(script);
      });
    } else {
      var xhr = io.util.request();

      xhr.open('GET', url, true);
      if (this.isXDomain()) {
        xhr.withCredentials = true;
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          xhr.onreadystatechange = empty;

          if (xhr.status == 200) {
            complete(xhr.responseText);
          } else if (xhr.status == 403) {
            self.onError(xhr.responseText);
          } else {
            self.connecting = false;            
            !self.reconnecting && self.onError(xhr.responseText);
          }
        }
      };
      xhr.send(null);
    }
  };

  /**
   * Find an available transport based on the options supplied in the constructor.
   *
   * @api private
   */

  Socket.prototype.getTransport = function (override) {
    var transports = override || this.transports, match;

    for (var i = 0, transport; transport = transports[i]; i++) {
      if (io.Transport[transport]
        && io.Transport[transport].check(this)
        && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
        return new io.Transport[transport](this, this.sessionid);
      }
    }

    return null;
  };

  /**
   * Connects to the server.
   *
   * @param {Function} [fn] Callback.
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.connect = function (fn) {
    if (this.connecting) {
      return this;
    }

    var self = this;
    self.connecting = true;
    
    this.handshake(function (sid, heartbeat, close, transports) {
      self.sessionid = sid;
      self.closeTimeout = close * 1000;
      self.heartbeatTimeout = heartbeat * 1000;
      if(!self.transports)
          self.transports = self.origTransports = (transports ? io.util.intersect(
              transports.split(',')
            , self.options.transports
          ) : self.options.transports);

      self.setHeartbeatTimeout();

      function connect (transports){
        if (self.transport) self.transport.clearTimeouts();

        self.transport = self.getTransport(transports);
        if (!self.transport) return self.publish('connect_failed');

        // once the transport is ready
        self.transport.ready(self, function () {
          self.connecting = true;
          self.publish('connecting', self.transport.name);
          self.transport.open();

          if (self.options['connect timeout']) {
            self.connectTimeoutTimer = setTimeout(function () {
              if (!self.connected) {
                self.connecting = false;

                if (self.options['try multiple transports']) {
                  var remaining = self.transports;

                  while (remaining.length > 0 && remaining.splice(0,1)[0] !=
                         self.transport.name) {}

                    if (remaining.length){
                      connect(remaining);
                    } else {
                      self.publish('connect_failed');
                    }
                }
              }
            }, self.options['connect timeout']);
          }
        });
      }

      connect(self.transports);

      self.once('connect', function (){
        clearTimeout(self.connectTimeoutTimer);

        fn && typeof fn == 'function' && fn();
      });
    });

    return this;
  };

  /**
   * Clears and sets a new heartbeat timeout using the value given by the
   * server during the handshake.
   *
   * @api private
   */

  Socket.prototype.setHeartbeatTimeout = function () {
    clearTimeout(this.heartbeatTimeoutTimer);
    if(this.transport && !this.transport.heartbeats()) return;

    var self = this;
    this.heartbeatTimeoutTimer = setTimeout(function () {
      self.transport.onClose();
    }, this.heartbeatTimeout);
  };

  /**
   * Sends a message.
   *
   * @param {Object} data packet.
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.packet = function (data) {
    if (this.connected && !this.doBuffer) {
      this.transport.packet(data);
    } else {
      this.buffer.push(data);
    }

    return this;
  };

  /**
   * Sets buffer state
   *
   * @api private
   */

  Socket.prototype.setBuffer = function (v) {
    this.doBuffer = v;

    if (!v && this.connected && this.buffer.length) {
      if (!this.options['manualFlush']) {
        this.flushBuffer();
      }
    }
  };

  /**
   * Flushes the buffer data over the wire.
   * To be invoked manually when 'manualFlush' is set to true.
   *
   * @api public
   */

  Socket.prototype.flushBuffer = function() {
    this.transport.payload(this.buffer);
    this.buffer = [];
  };
  

  /**
   * Disconnect the established connect.
   *
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.disconnect = function () {
    if (this.connected || this.connecting) {
      if (this.open) {
        this.of('').packet({ type: 'disconnect' });
      }

      // handle disconnection immediately
      this.onDisconnect('booted');
    }

    return this;
  };

  /**
   * Disconnects the socket with a sync XHR.
   *
   * @api private
   */

  Socket.prototype.disconnectSync = function () {
    // ensure disconnection
    var xhr = io.util.request();
    var uri = [
        'http' + (this.options.secure ? 's' : '') + ':/'
      , this.options.host + ':' + this.options.port
      , this.options.resource
      , io.protocol
      , ''
      , this.sessionid
    ].join('/') + '/?disconnect=1';

    xhr.open('GET', uri, false);
    xhr.send(null);

    // handle disconnection immediately
    this.onDisconnect('booted');
  };

  /**
   * Check if we need to use cross domain enabled transports. Cross domain would
   * be a different port or different domain name.
   *
   * @returns {Boolean}
   * @api private
   */

  Socket.prototype.isXDomain = function () {

    var port = global.location.port ||
      ('https:' == global.location.protocol ? 443 : 80);

    return this.options.host !== global.location.hostname 
      || this.options.port != port;
  };

  /**
   * Called upon handshake.
   *
   * @api private
   */

  Socket.prototype.onConnect = function () {
    if (!this.connected) {
      this.connected = true;
      this.connecting = false;
      if (!this.doBuffer) {
        // make sure to flush the buffer
        this.setBuffer(false);
      }
      this.emit('connect');
    }
  };

  /**
   * Called when the transport opens
   *
   * @api private
   */

  Socket.prototype.onOpen = function () {
    this.open = true;
  };

  /**
   * Called when the transport closes.
   *
   * @api private
   */

  Socket.prototype.onClose = function () {
    this.open = false;
    clearTimeout(this.heartbeatTimeoutTimer);
  };

  /**
   * Called when the transport first opens a connection
   *
   * @param text
   */

  Socket.prototype.onPacket = function (packet) {
    this.of(packet.endpoint).onPacket(packet);
  };

  /**
   * Handles an error.
   *
   * @api private
   */

  Socket.prototype.onError = function (err) {
    if (err && err.advice) {
      if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
        this.disconnect();
        if (this.options.reconnect) {
          this.reconnect();
        }
      }
    }

    this.publish('error', err && err.reason ? err.reason : err);
  };

  /**
   * Called when the transport disconnects.
   *
   * @api private
   */

  Socket.prototype.onDisconnect = function (reason) {
    var wasConnected = this.connected
      , wasConnecting = this.connecting;

    this.connected = false;
    this.connecting = false;
    this.open = false;

    if (wasConnected || wasConnecting) {
      this.transport.close();
      this.transport.clearTimeouts();
      if (wasConnected) {
        this.publish('disconnect', reason);

        if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
          this.reconnect();
        }
      }
    }
  };

  /**
   * Called upon reconnection.
   *
   * @api private
   */

  Socket.prototype.reconnect = function () {
    this.reconnecting = true;
    this.reconnectionAttempts = 0;
    this.reconnectionDelay = this.options['reconnection delay'];

    var self = this
      , maxAttempts = this.options['max reconnection attempts']
      , tryMultiple = this.options['try multiple transports']
      , limit = this.options['reconnection limit'];

    function reset () {
      if (self.connected) {
        for (var i in self.namespaces) {
          if (self.namespaces.hasOwnProperty(i) && '' !== i) {
              self.namespaces[i].packet({ type: 'connect' });
          }
        }
        self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
      }

      clearTimeout(self.reconnectionTimer);

      self.removeListener('connect_failed', maybeReconnect);
      self.removeListener('connect', maybeReconnect);

      self.reconnecting = false;

      delete self.reconnectionAttempts;
      delete self.reconnectionDelay;
      delete self.reconnectionTimer;
      delete self.redoTransports;

      self.options['try multiple transports'] = tryMultiple;
    };

    function maybeReconnect () {
      if (!self.reconnecting) {
        return;
      }

      if (self.connected) {
        return reset();
      };

      if (self.connecting && self.reconnecting) {
        return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
      }

      if (self.reconnectionAttempts++ >= maxAttempts) {
        if (!self.redoTransports) {
          self.on('connect_failed', maybeReconnect);
          self.options['try multiple transports'] = true;
          self.transports = self.origTransports;
          self.transport = self.getTransport();
          self.redoTransports = true;
          self.connect();
        } else {
          self.publish('reconnect_failed');
          reset();
        }
      } else {
        if (self.reconnectionDelay < limit) {
          self.reconnectionDelay *= 2; // exponential back off
        }

        self.connect();
        self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
        self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
      }
    };

    this.options['try multiple transports'] = false;
    this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

    this.on('connect', maybeReconnect);
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.SocketNamespace = SocketNamespace;

  /**
   * Socket namespace constructor.
   *
   * @constructor
   * @api public
   */

  function SocketNamespace (socket, name) {
    this.socket = socket;
    this.name = name || '';
    this.flags = {};
    this.json = new Flag(this, 'json');
    this.ackPackets = 0;
    this.acks = {};
  };

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(SocketNamespace, io.EventEmitter);

  /**
   * Copies emit since we override it
   *
   * @api private
   */

  SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

  /**
   * Creates a new namespace, by proxying the request to the socket. This
   * allows us to use the synax as we do on the server.
   *
   * @api public
   */

  SocketNamespace.prototype.of = function () {
    return this.socket.of.apply(this.socket, arguments);
  };

  /**
   * Sends a packet.
   *
   * @api private
   */

  SocketNamespace.prototype.packet = function (packet) {
    packet.endpoint = this.name;
    this.socket.packet(packet);
    this.flags = {};
    return this;
  };

  /**
   * Sends a message
   *
   * @api public
   */

  SocketNamespace.prototype.send = function (data, fn) {
    var packet = {
        type: this.flags.json ? 'json' : 'message'
      , data: data
    };

    if ('function' == typeof fn) {
      packet.id = ++this.ackPackets;
      packet.ack = true;
      this.acks[packet.id] = fn;
    }

    return this.packet(packet);
  };

  /**
   * Emits an event
   *
   * @api public
   */
  
  SocketNamespace.prototype.emit = function (name) {
    var args = Array.prototype.slice.call(arguments, 1)
      , lastArg = args[args.length - 1]
      , packet = {
            type: 'event'
          , name: name
        };

    if ('function' == typeof lastArg) {
      packet.id = ++this.ackPackets;
      packet.ack = 'data';
      this.acks[packet.id] = lastArg;
      args = args.slice(0, args.length - 1);
    }

    packet.args = args;

    return this.packet(packet);
  };

  /**
   * Disconnects the namespace
   *
   * @api private
   */

  SocketNamespace.prototype.disconnect = function () {
    if (this.name === '') {
      this.socket.disconnect();
    } else {
      this.packet({ type: 'disconnect' });
      this.$emit('disconnect');
    }

    return this;
  };

  /**
   * Handles a packet
   *
   * @api private
   */

  SocketNamespace.prototype.onPacket = function (packet) {
    var self = this;

    function ack () {
      self.packet({
          type: 'ack'
        , args: io.util.toArray(arguments)
        , ackId: packet.id
      });
    };

    switch (packet.type) {
      case 'connect':
        this.$emit('connect');
        break;

      case 'disconnect':
        if (this.name === '') {
          this.socket.onDisconnect(packet.reason || 'booted');
        } else {
          this.$emit('disconnect', packet.reason);
        }
        break;

      case 'message':
      case 'json':
        var params = ['message', packet.data];

        if (packet.ack == 'data') {
          params.push(ack);
        } else if (packet.ack) {
          this.packet({ type: 'ack', ackId: packet.id });
        }

        this.$emit.apply(this, params);
        break;

      case 'event':
        var params = [packet.name].concat(packet.args);

        if (packet.ack == 'data')
          params.push(ack);

        this.$emit.apply(this, params);
        break;

      case 'ack':
        if (this.acks[packet.ackId]) {
          this.acks[packet.ackId].apply(this, packet.args);
          delete this.acks[packet.ackId];
        }
        break;

      case 'error':
        if (packet.advice){
          this.socket.onError(packet);
        } else {
          if (packet.reason == 'unauthorized') {
            this.$emit('connect_failed', packet.reason);
          } else {
            this.$emit('error', packet.reason);
          }
        }
        break;
    }
  };

  /**
   * Flag interface.
   *
   * @api private
   */

  function Flag (nsp, name) {
    this.namespace = nsp;
    this.name = name;
  };

  /**
   * Send a message
   *
   * @api public
   */

  Flag.prototype.send = function () {
    this.namespace.flags[this.name] = true;
    this.namespace.send.apply(this.namespace, arguments);
  };

  /**
   * Emit an event
   *
   * @api public
   */

  Flag.prototype.emit = function () {
    this.namespace.flags[this.name] = true;
    this.namespace.emit.apply(this.namespace, arguments);
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   */

  exports.websocket = WS;

  /**
   * The WebSocket transport uses the HTML5 WebSocket API to establish an
   * persistent connection with the Socket.IO server. This transport will also
   * be inherited by the FlashSocket fallback as it provides a API compatible
   * polyfill for the WebSockets.
   *
   * @constructor
   * @extends {io.Transport}
   * @api public
   */

  function WS (socket) {
    io.Transport.apply(this, arguments);
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(WS, io.Transport);

  /**
   * Transport name
   *
   * @api public
   */

  WS.prototype.name = 'websocket';

  /**
   * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
   * all the appropriate listeners to handle the responses from the server.
   *
   * @returns {Transport}
   * @api public
   */

  WS.prototype.open = function () {
    var query = io.util.query(this.socket.options.query)
      , self = this
      , Socket


    if (!Socket) {
      Socket = global.MozWebSocket || global.WebSocket;
    }

    this.websocket = new Socket(this.prepareUrl() + query);

    this.websocket.onopen = function () {
      self.onOpen();
      self.socket.setBuffer(false);
    };
    this.websocket.onmessage = function (ev) {
      self.onData(ev.data);
    };
    this.websocket.onclose = function () {
      self.onClose();
      self.socket.setBuffer(true);
    };
    this.websocket.onerror = function (e) {
      self.onError(e);
    };

    return this;
  };

  /**
   * Send a message to the Socket.IO server. The message will automatically be
   * encoded in the correct message format.
   *
   * @returns {Transport}
   * @api public
   */

  // Do to a bug in the current IDevices browser, we need to wrap the send in a 
  // setTimeout, when they resume from sleeping the browser will crash if 
  // we don't allow the browser time to detect the socket has been closed
  if (io.util.ua.iDevice) {
    WS.prototype.send = function (data) {
      var self = this;
      setTimeout(function() {
         self.websocket.send(data);
      },0);
      return this;
    };
  } else {
    WS.prototype.send = function (data) {
      this.websocket.send(data);
      return this;
    };
  }

  /**
   * Payload
   *
   * @api private
   */

  WS.prototype.payload = function (arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
      this.packet(arr[i]);
    }
    return this;
  };

  /**
   * Disconnect the established `WebSocket` connection.
   *
   * @returns {Transport}
   * @api public
   */

  WS.prototype.close = function () {
    this.websocket.close();
    return this;
  };

  /**
   * Handle the errors that `WebSocket` might be giving when we
   * are attempting to connect or send messages.
   *
   * @param {Error} e The error.
   * @api private
   */

  WS.prototype.onError = function (e) {
    this.socket.onError(e);
  };

  /**
   * Returns the appropriate scheme for the URI generation.
   *
   * @api private
   */
  WS.prototype.scheme = function () {
    return this.socket.options.secure ? 'wss' : 'ws';
  };

  /**
   * Checks if the browser has support for native `WebSockets` and that
   * it's not the polyfill created for the FlashSocket transport.
   *
   * @return {Boolean}
   * @api public
   */

  WS.check = function () {
    return ('WebSocket' in global && !('__addTask' in WebSocket))
          || 'MozWebSocket' in global;
  };

  /**
   * Check if the `WebSocket` transport support cross domain communications.
   *
   * @returns {Boolean}
   * @api public
   */

  WS.xdomainCheck = function () {
    return true;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('websocket');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.flashsocket = Flashsocket;

  /**
   * The FlashSocket transport. This is a API wrapper for the HTML5 WebSocket
   * specification. It uses a .swf file to communicate with the server. If you want
   * to serve the .swf file from a other server than where the Socket.IO script is
   * coming from you need to use the insecure version of the .swf. More information
   * about this can be found on the github page.
   *
   * @constructor
   * @extends {io.Transport.websocket}
   * @api public
   */

  function Flashsocket () {
    io.Transport.websocket.apply(this, arguments);
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(Flashsocket, io.Transport.websocket);

  /**
   * Transport name
   *
   * @api public
   */

  Flashsocket.prototype.name = 'flashsocket';

  /**
   * Disconnect the established `FlashSocket` connection. This is done by adding a 
   * new task to the FlashSocket. The rest will be handled off by the `WebSocket` 
   * transport.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.open = function () {
    var self = this
      , args = arguments;

    WebSocket.__addTask(function () {
      io.Transport.websocket.prototype.open.apply(self, args);
    });
    return this;
  };
  
  /**
   * Sends a message to the Socket.IO server. This is done by adding a new
   * task to the FlashSocket. The rest will be handled off by the `WebSocket` 
   * transport.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.send = function () {
    var self = this, args = arguments;
    WebSocket.__addTask(function () {
      io.Transport.websocket.prototype.send.apply(self, args);
    });
    return this;
  };

  /**
   * Disconnects the established `FlashSocket` connection.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.close = function () {
    WebSocket.__tasks.length = 0;
    io.Transport.websocket.prototype.close.call(this);
    return this;
  };

  /**
   * The WebSocket fall back needs to append the flash container to the body
   * element, so we need to make sure we have access to it. Or defer the call
   * until we are sure there is a body element.
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  Flashsocket.prototype.ready = function (socket, fn) {
    function init () {
      var options = socket.options
        , port = options['flash policy port']
        , path = [
              'http' + (options.secure ? 's' : '') + ':/'
            , options.host + ':' + options.port
            , options.resource
            , 'static/flashsocket'
            , 'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
          ];

      // Only start downloading the swf file when the checked that this browser
      // actually supports it
      if (!Flashsocket.loaded) {
        if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
          // Set the correct file based on the XDomain settings
          WEB_SOCKET_SWF_LOCATION = path.join('/');
        }

        if (port !== 843) {
          WebSocket.loadFlashPolicyFile('xmlsocket://' + options.host + ':' + port);
        }

        WebSocket.__initialize();
        Flashsocket.loaded = true;
      }

      fn.call(self);
    }

    var self = this;
    if (document.body) return init();

    io.util.load(init);
  };

  /**
   * Check if the FlashSocket transport is supported as it requires that the Adobe
   * Flash Player plug-in version `10.0.0` or greater is installed. And also check if
   * the polyfill is correctly loaded.
   *
   * @returns {Boolean}
   * @api public
   */

  Flashsocket.check = function () {
    if (
        typeof WebSocket == 'undefined'
      || !('__initialize' in WebSocket) || !swfobject
    ) return false;

    return swfobject.getFlashPlayerVersion().major >= 10;
  };

  /**
   * Check if the FlashSocket transport can be used as cross domain / cross origin 
   * transport. Because we can't see which type (secure or insecure) of .swf is used
   * we will just return true.
   *
   * @returns {Boolean}
   * @api public
   */

  Flashsocket.xdomainCheck = function () {
    return true;
  };

  /**
   * Disable AUTO_INITIALIZATION
   */

  if (typeof window != 'undefined') {
    WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
  }

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('flashsocket');
})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
if ('undefined' != typeof window) {
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O[(['Active'].concat('Object').join('X'))]!=D){try{var ad=new window[(['Active'].concat('Object').join('X'))](W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?(['Active'].concat('').join('X')):"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
}
// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
// License: New BSD License
// Reference: http://dev.w3.org/html5/websockets/
// Reference: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol

(function() {
  
  if ('undefined' == typeof window || window.WebSocket) return;

  var console = window.console;
  if (!console || !console.log || !console.error) {
    console = {log: function(){ }, error: function(){ }};
  }
  
  if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
    console.error("Flash Player >= 10.0.0 is required.");
    return;
  }
  if (location.protocol == "file:") {
    console.error(
      "WARNING: web-socket-js doesn't work in file:///... URL " +
      "unless you set Flash Security Settings properly. " +
      "Open the page via Web server i.e. http://...");
  }

  /**
   * This class represents a faux web socket.
   * @param {string} url
   * @param {array or string} protocols
   * @param {string} proxyHost
   * @param {int} proxyPort
   * @param {string} headers
   */
  WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
    var self = this;
    self.__id = WebSocket.__nextId++;
    WebSocket.__instances[self.__id] = self;
    self.readyState = WebSocket.CONNECTING;
    self.bufferedAmount = 0;
    self.__events = {};
    if (!protocols) {
      protocols = [];
    } else if (typeof protocols == "string") {
      protocols = [protocols];
    }
    // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
    // Otherwise, when onopen fires immediately, onopen is called before it is set.
    setTimeout(function() {
      WebSocket.__addTask(function() {
        WebSocket.__flash.create(
            self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
      });
    }, 0);
  };

  /**
   * Send data to the web socket.
   * @param {string} data  The data to send to the socket.
   * @return {boolean}  True for success, false for failure.
   */
  WebSocket.prototype.send = function(data) {
    if (this.readyState == WebSocket.CONNECTING) {
      throw "INVALID_STATE_ERR: Web Socket connection has not been established";
    }
    // We use encodeURIComponent() here, because FABridge doesn't work if
    // the argument includes some characters. We don't use escape() here
    // because of this:
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
    // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
    // preserve all Unicode characters either e.g. "\uffff" in Firefox.
    // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
    // additional testing.
    var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
    if (result < 0) { // success
      return true;
    } else {
      this.bufferedAmount += result;
      return false;
    }
  };

  /**
   * Close this web socket gracefully.
   */
  WebSocket.prototype.close = function() {
    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
      return;
    }
    this.readyState = WebSocket.CLOSING;
    WebSocket.__flash.close(this.__id);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) {
      this.__events[type] = [];
    }
    this.__events[type].push(listener);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) return;
    var events = this.__events[type];
    for (var i = events.length - 1; i >= 0; --i) {
      if (events[i] === listener) {
        events.splice(i, 1);
        break;
      }
    }
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {Event} event
   * @return void
   */
  WebSocket.prototype.dispatchEvent = function(event) {
    var events = this.__events[event.type] || [];
    for (var i = 0; i < events.length; ++i) {
      events[i](event);
    }
    var handler = this["on" + event.type];
    if (handler) handler(event);
  };

  /**
   * Handles an event from Flash.
   * @param {Object} flashEvent
   */
  WebSocket.prototype.__handleEvent = function(flashEvent) {
    if ("readyState" in flashEvent) {
      this.readyState = flashEvent.readyState;
    }
    if ("protocol" in flashEvent) {
      this.protocol = flashEvent.protocol;
    }
    
    var jsEvent;
    if (flashEvent.type == "open" || flashEvent.type == "error") {
      jsEvent = this.__createSimpleEvent(flashEvent.type);
    } else if (flashEvent.type == "close") {
      // TODO implement jsEvent.wasClean
      jsEvent = this.__createSimpleEvent("close");
    } else if (flashEvent.type == "message") {
      var data = decodeURIComponent(flashEvent.message);
      jsEvent = this.__createMessageEvent("message", data);
    } else {
      throw "unknown event type: " + flashEvent.type;
    }
    
    this.dispatchEvent(jsEvent);
  };
  
  WebSocket.prototype.__createSimpleEvent = function(type) {
    if (document.createEvent && window.Event) {
      var event = document.createEvent("Event");
      event.initEvent(type, false, false);
      return event;
    } else {
      return {type: type, bubbles: false, cancelable: false};
    }
  };
  
  WebSocket.prototype.__createMessageEvent = function(type, data) {
    if (document.createEvent && window.MessageEvent && !window.opera) {
      var event = document.createEvent("MessageEvent");
      event.initMessageEvent("message", false, false, data, null, null, window, null);
      return event;
    } else {
      // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
      return {type: type, data: data, bubbles: false, cancelable: false};
    }
  };
  
  /**
   * Define the WebSocket readyState enumeration.
   */
  WebSocket.CONNECTING = 0;
  WebSocket.OPEN = 1;
  WebSocket.CLOSING = 2;
  WebSocket.CLOSED = 3;

  WebSocket.__flash = null;
  WebSocket.__instances = {};
  WebSocket.__tasks = [];
  WebSocket.__nextId = 0;
  
  /**
   * Load a new flash security policy file.
   * @param {string} url
   */
  WebSocket.loadFlashPolicyFile = function(url){
    WebSocket.__addTask(function() {
      WebSocket.__flash.loadManualPolicyFile(url);
    });
  };

  /**
   * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
   */
  WebSocket.__initialize = function() {
    if (WebSocket.__flash) return;
    
    if (WebSocket.__swfLocation) {
      // For backword compatibility.
      window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
    }
    if (!window.WEB_SOCKET_SWF_LOCATION) {
      console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
      return;
    }
    var container = document.createElement("div");
    container.id = "webSocketContainer";
    // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
    // Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
    // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
    // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
    // the best we can do as far as we know now.
    container.style.position = "absolute";
    if (WebSocket.__isFlashLite()) {
      container.style.left = "0px";
      container.style.top = "0px";
    } else {
      container.style.left = "-100px";
      container.style.top = "-100px";
    }
    var holder = document.createElement("div");
    holder.id = "webSocketFlash";
    container.appendChild(holder);
    document.body.appendChild(container);
    // See this article for hasPriority:
    // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
    swfobject.embedSWF(
      WEB_SOCKET_SWF_LOCATION,
      "webSocketFlash",
      "1" /* width */,
      "1" /* height */,
      "10.0.0" /* SWF version */,
      null,
      null,
      {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
      null,
      function(e) {
        if (!e.success) {
          console.error("[WebSocket] swfobject.embedSWF failed");
        }
      });
  };
  
  /**
   * Called by Flash to notify JS that it's fully loaded and ready
   * for communication.
   */
  WebSocket.__onFlashInitialized = function() {
    // We need to set a timeout here to avoid round-trip calls
    // to flash during the initialization process.
    setTimeout(function() {
      WebSocket.__flash = document.getElementById("webSocketFlash");
      WebSocket.__flash.setCallerUrl(location.href);
      WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
      for (var i = 0; i < WebSocket.__tasks.length; ++i) {
        WebSocket.__tasks[i]();
      }
      WebSocket.__tasks = [];
    }, 0);
  };
  
  /**
   * Called by Flash to notify WebSockets events are fired.
   */
  WebSocket.__onFlashEvent = function() {
    setTimeout(function() {
      try {
        // Gets events using receiveEvents() instead of getting it from event object
        // of Flash event. This is to make sure to keep message order.
        // It seems sometimes Flash events don't arrive in the same order as they are sent.
        var events = WebSocket.__flash.receiveEvents();
        for (var i = 0; i < events.length; ++i) {
          WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
        }
      } catch (e) {
        console.error(e);
      }
    }, 0);
    return true;
  };
  
  // Called by Flash.
  WebSocket.__log = function(message) {
    console.log(decodeURIComponent(message));
  };
  
  // Called by Flash.
  WebSocket.__error = function(message) {
    console.error(decodeURIComponent(message));
  };
  
  WebSocket.__addTask = function(task) {
    if (WebSocket.__flash) {
      task();
    } else {
      WebSocket.__tasks.push(task);
    }
  };
  
  /**
   * Test if the browser is running flash lite.
   * @return {boolean} True if flash lite is running, false otherwise.
   */
  WebSocket.__isFlashLite = function() {
    if (!window.navigator || !window.navigator.mimeTypes) {
      return false;
    }
    var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
    if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
      return false;
    }
    return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
  };
  
  if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
    if (window.addEventListener) {
      window.addEventListener("load", function(){
        WebSocket.__initialize();
      }, false);
    } else {
      window.attachEvent("onload", function(){
        WebSocket.__initialize();
      });
    }
  }
  
})();

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   *
   * @api public
   */

  exports.XHR = XHR;

  /**
   * XHR constructor
   *
   * @costructor
   * @api public
   */

  function XHR (socket) {
    if (!socket) return;

    io.Transport.apply(this, arguments);
    this.sendBuffer = [];
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(XHR, io.Transport);

  /**
   * Establish a connection
   *
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.open = function () {
    this.socket.setBuffer(false);
    this.onOpen();
    this.get();

    // we need to make sure the request succeeds since we have no indication
    // whether the request opened or not until it succeeded.
    this.setCloseTimeout();

    return this;
  };

  /**
   * Check if we need to send data to the Socket.IO server, if we have data in our
   * buffer we encode it and forward it to the `post` method.
   *
   * @api private
   */

  XHR.prototype.payload = function (payload) {
    var msgs = [];

    for (var i = 0, l = payload.length; i < l; i++) {
      msgs.push(io.parser.encodePacket(payload[i]));
    }

    this.send(io.parser.encodePayload(msgs));
  };

  /**
   * Send data to the Socket.IO server.
   *
   * @param data The message
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.send = function (data) {
    this.post(data);
    return this;
  };

  /**
   * Posts a encoded message to the Socket.IO server.
   *
   * @param {String} data A encoded message.
   * @api private
   */

  function empty () { };

  XHR.prototype.post = function (data) {
    var self = this;
    this.socket.setBuffer(true);

    function stateChange () {
      if (this.readyState == 4) {
        this.onreadystatechange = empty;
        self.posting = false;

        if (this.status == 200){
          self.socket.setBuffer(false);
        } else {
          self.onClose();
        }
      }
    }

    function onload () {
      this.onload = empty;
      self.socket.setBuffer(false);
    };

    this.sendXHR = this.request('POST');

    if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
      this.sendXHR.onload = this.sendXHR.onerror = onload;
    } else {
      this.sendXHR.onreadystatechange = stateChange;
    }

    this.sendXHR.send(data);
  };

  /**
   * Disconnects the established `XHR` connection.
   *
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.close = function () {
    this.onClose();
    return this;
  };

  /**
   * Generates a configured XHR request
   *
   * @param {String} url The url that needs to be requested.
   * @param {String} method The method the request should use.
   * @returns {XMLHttpRequest}
   * @api private
   */

  XHR.prototype.request = function (method) {
    var req = io.util.request(this.socket.isXDomain())
      , query = io.util.query(this.socket.options.query, 't=' + +new Date);

    req.open(method || 'GET', this.prepareUrl() + query, true);

    if (method == 'POST') {
      try {
        if (req.setRequestHeader) {
          req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        } else {
          // XDomainRequest
          req.contentType = 'text/plain';
        }
      } catch (e) {}
    }

    return req;
  };

  /**
   * Returns the scheme to use for the transport URLs.
   *
   * @api private
   */

  XHR.prototype.scheme = function () {
    return this.socket.options.secure ? 'https' : 'http';
  };

  /**
   * Check if the XHR transports are supported
   *
   * @param {Boolean} xdomain Check if we support cross domain requests.
   * @returns {Boolean}
   * @api public
   */

  XHR.check = function (socket, xdomain) {
    try {
      var request = io.util.request(xdomain),
          usesXDomReq = (global.XDomainRequest && request instanceof XDomainRequest),
          socketProtocol = (socket && socket.options && socket.options.secure ? 'https:' : 'http:'),
          isXProtocol = (global.location && socketProtocol != global.location.protocol);
      if (request && !(usesXDomReq && isXProtocol)) {
        return true;
      }
    } catch(e) {}

    return false;
  };

  /**
   * Check if the XHR transport supports cross domain requests.
   *
   * @returns {Boolean}
   * @api public
   */

  XHR.xdomainCheck = function (socket) {
    return XHR.check(socket, true);
  };

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.htmlfile = HTMLFile;

  /**
   * The HTMLFile transport creates a `forever iframe` based transport
   * for Internet Explorer. Regular forever iframe implementations will 
   * continuously trigger the browsers buzy indicators. If the forever iframe
   * is created inside a `htmlfile` these indicators will not be trigged.
   *
   * @constructor
   * @extends {io.Transport.XHR}
   * @api public
   */

  function HTMLFile (socket) {
    io.Transport.XHR.apply(this, arguments);
  };

  /**
   * Inherits from XHR transport.
   */

  io.util.inherit(HTMLFile, io.Transport.XHR);

  /**
   * Transport name
   *
   * @api public
   */

  HTMLFile.prototype.name = 'htmlfile';

  /**
   * Creates a new Ac...eX `htmlfile` with a forever loading iframe
   * that can be used to listen to messages. Inside the generated
   * `htmlfile` a reference will be made to the HTMLFile transport.
   *
   * @api private
   */

  HTMLFile.prototype.get = function () {
    this.doc = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
    this.doc.open();
    this.doc.write('<html></html>');
    this.doc.close();
    this.doc.parentWindow.s = this;

    var iframeC = this.doc.createElement('div');
    iframeC.className = 'socketio';

    this.doc.body.appendChild(iframeC);
    this.iframe = this.doc.createElement('iframe');

    iframeC.appendChild(this.iframe);

    var self = this
      , query = io.util.query(this.socket.options.query, 't='+ +new Date);

    this.iframe.src = this.prepareUrl() + query;

    io.util.on(window, 'unload', function () {
      self.destroy();
    });
  };

  /**
   * The Socket.IO server will write script tags inside the forever
   * iframe, this function will be used as callback for the incoming
   * information.
   *
   * @param {String} data The message
   * @param {document} doc Reference to the context
   * @api private
   */

  HTMLFile.prototype._ = function (data, doc) {
    // unescape all forward slashes. see GH-1251
    data = data.replace(/\\\//g, '/');
    this.onData(data);
    try {
      var script = doc.getElementsByTagName('script')[0];
      script.parentNode.removeChild(script);
    } catch (e) { }
  };

  /**
   * Destroy the established connection, iframe and `htmlfile`.
   * And calls the `CollectGarbage` function of Internet Explorer
   * to release the memory.
   *
   * @api private
   */

  HTMLFile.prototype.destroy = function () {
    if (this.iframe){
      try {
        this.iframe.src = 'about:blank';
      } catch(e){}

      this.doc = null;
      this.iframe.parentNode.removeChild(this.iframe);
      this.iframe = null;

      CollectGarbage();
    }
  };

  /**
   * Disconnects the established connection.
   *
   * @returns {Transport} Chaining.
   * @api public
   */

  HTMLFile.prototype.close = function () {
    this.destroy();
    return io.Transport.XHR.prototype.close.call(this);
  };

  /**
   * Checks if the browser supports this transport. The browser
   * must have an `Ac...eXObject` implementation.
   *
   * @return {Boolean}
   * @api public
   */

  HTMLFile.check = function (socket) {
    if (typeof window != "undefined" && (['Active'].concat('Object').join('X')) in window){
      try {
        var a = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
        return a && io.Transport.XHR.check(socket);
      } catch(e){}
    }
    return false;
  };

  /**
   * Check if cross domain requests are supported.
   *
   * @returns {Boolean}
   * @api public
   */

  HTMLFile.xdomainCheck = function () {
    // we can probably do handling for sub-domains, we should
    // test that it's cross domain but a subdomain here
    return false;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('htmlfile');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   */

  exports['xhr-polling'] = XHRPolling;

  /**
   * The XHR-polling transport uses long polling XHR requests to create a
   * "persistent" connection with the server.
   *
   * @constructor
   * @api public
   */

  function XHRPolling () {
    io.Transport.XHR.apply(this, arguments);
  };

  /**
   * Inherits from XHR transport.
   */

  io.util.inherit(XHRPolling, io.Transport.XHR);

  /**
   * Merge the properties from XHR transport
   */

  io.util.merge(XHRPolling, io.Transport.XHR);

  /**
   * Transport name
   *
   * @api public
   */

  XHRPolling.prototype.name = 'xhr-polling';

  /**
   * Indicates whether heartbeats is enabled for this transport
   *
   * @api private
   */

  XHRPolling.prototype.heartbeats = function () {
    return false;
  };

  /** 
   * Establish a connection, for iPhone and Android this will be done once the page
   * is loaded.
   *
   * @returns {Transport} Chaining.
   * @api public
   */

  XHRPolling.prototype.open = function () {
    var self = this;

    io.Transport.XHR.prototype.open.call(self);
    return false;
  };

  /**
   * Starts a XHR request to wait for incoming messages.
   *
   * @api private
   */

  function empty () {};

  XHRPolling.prototype.get = function () {
    if (!this.isOpen) return;

    var self = this;

    function stateChange () {
      if (this.readyState == 4) {
        this.onreadystatechange = empty;

        if (this.status == 200) {
          self.onData(this.responseText);
          self.get();
        } else {
          self.onClose();
        }
      }
    };

    function onload () {
      this.onload = empty;
      this.onerror = empty;
      self.retryCounter = 1;
      self.onData(this.responseText);
      self.get();
    };

    function onerror () {
      self.retryCounter ++;
      if(!self.retryCounter || self.retryCounter > 3) {
        self.onClose();  
      } else {
        self.get();
      }
    };

    this.xhr = this.request();

    if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
      this.xhr.onload = onload;
      this.xhr.onerror = onerror;
    } else {
      this.xhr.onreadystatechange = stateChange;
    }

    this.xhr.send(null);
  };

  /**
   * Handle the unclean close behavior.
   *
   * @api private
   */

  XHRPolling.prototype.onClose = function () {
    io.Transport.XHR.prototype.onClose.call(this);

    if (this.xhr) {
      this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
      try {
        this.xhr.abort();
      } catch(e){}
      this.xhr = null;
    }
  };

  /**
   * Webkit based browsers show a infinit spinner when you start a XHR request
   * before the browsers onload event is called so we need to defer opening of
   * the transport until the onload event is called. Wrapping the cb in our
   * defer method solve this.
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  XHRPolling.prototype.ready = function (socket, fn) {
    var self = this;

    io.util.defer(function () {
      fn.call(self);
    });
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('xhr-polling');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {
  /**
   * There is a way to hide the loading indicator in Firefox. If you create and
   * remove a iframe it will stop showing the current loading indicator.
   * Unfortunately we can't feature detect that and UA sniffing is evil.
   *
   * @api private
   */

  var indicator = global.document && "MozAppearance" in
    global.document.documentElement.style;

  /**
   * Expose constructor.
   */

  exports['jsonp-polling'] = JSONPPolling;

  /**
   * The JSONP transport creates an persistent connection by dynamically
   * inserting a script tag in the page. This script tag will receive the
   * information of the Socket.IO server. When new information is received
   * it creates a new script tag for the new data stream.
   *
   * @constructor
   * @extends {io.Transport.xhr-polling}
   * @api public
   */

  function JSONPPolling (socket) {
    io.Transport['xhr-polling'].apply(this, arguments);

    this.index = io.j.length;

    var self = this;

    io.j.push(function (msg) {
      self._(msg);
    });
  };

  /**
   * Inherits from XHR polling transport.
   */

  io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);

  /**
   * Transport name
   *
   * @api public
   */

  JSONPPolling.prototype.name = 'jsonp-polling';

  /**
   * Posts a encoded message to the Socket.IO server using an iframe.
   * The iframe is used because script tags can create POST based requests.
   * The iframe is positioned outside of the view so the user does not
   * notice it's existence.
   *
   * @param {String} data A encoded message.
   * @api private
   */

  JSONPPolling.prototype.post = function (data) {
    var self = this
      , query = io.util.query(
             this.socket.options.query
          , 't='+ (+new Date) + '&i=' + this.index
        );

    if (!this.form) {
      var form = document.createElement('form')
        , area = document.createElement('textarea')
        , id = this.iframeId = 'socketio_iframe_' + this.index
        , iframe;

      form.className = 'socketio';
      form.style.position = 'absolute';
      form.style.top = '0px';
      form.style.left = '0px';
      form.style.display = 'none';
      form.target = id;
      form.method = 'POST';
      form.setAttribute('accept-charset', 'utf-8');
      area.name = 'd';
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.prepareUrl() + query;

    function complete () {
      initIframe();
      self.socket.setBuffer(false);
    };

    function initIframe () {
      if (self.iframe) {
        self.form.removeChild(self.iframe);
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        iframe = document.createElement('<iframe name="'+ self.iframeId +'">');
      } catch (e) {
        iframe = document.createElement('iframe');
        iframe.name = self.iframeId;
      }

      iframe.id = self.iframeId;

      self.form.appendChild(iframe);
      self.iframe = iframe;
    };

    initIframe();

    // we temporarily stringify until we figure out how to prevent
    // browsers from turning `\n` into `\r\n` in form inputs
    this.area.value = io.JSON.stringify(data);

    try {
      this.form.submit();
    } catch(e) {}

    if (this.iframe.attachEvent) {
      iframe.onreadystatechange = function () {
        if (self.iframe.readyState == 'complete') {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }

    this.socket.setBuffer(true);
  };

  /**
   * Creates a new JSONP poll that can be used to listen
   * for messages from the Socket.IO server.
   *
   * @api private
   */

  JSONPPolling.prototype.get = function () {
    var self = this
      , script = document.createElement('script')
      , query = io.util.query(
             this.socket.options.query
          , 't='+ (+new Date) + '&i=' + this.index
        );

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.prepareUrl() + query;
    script.onerror = function () {
      self.onClose();
    };

    var insertAt = document.getElementsByTagName('script')[0];
    insertAt.parentNode.insertBefore(script, insertAt);
    this.script = script;

    if (indicator) {
      setTimeout(function () {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  };

  /**
   * Callback function for the incoming message stream from the Socket.IO server.
   *
   * @param {String} data The message
   * @api private
   */

  JSONPPolling.prototype._ = function (msg) {
    this.onData(msg);
    if (this.isOpen) {
      this.get();
    }
    return this;
  };

  /**
   * The indicator hack only works after onload
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  JSONPPolling.prototype.ready = function (socket, fn) {
    var self = this;
    if (!indicator) return fn.call(this);

    io.util.load(function () {
      fn.call(self);
    });
  };

  /**
   * Checks if browser supports this transport.
   *
   * @return {Boolean}
   * @api public
   */

  JSONPPolling.check = function () {
    return 'document' in global;
  };

  /**
   * Check if cross domain requests are supported
   *
   * @returns {Boolean}
   * @api public
   */

  JSONPPolling.xdomainCheck = function () {
    return true;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('jsonp-polling');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);

if (typeof define === "function" && define.amd) {
  define([], function () { return io; });
}
})();
},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/filetransfer/filetransfer.js":[function(require,module,exports){
var WildEmitter = require('wildemitter');
var util = require('util');

function Sender(opts) {
    WildEmitter.call(this);
    var options = opts || {};
    this.config = {
        chunksize: 16384,
        pacing: 0
    };
    // set our config from options
    var item;
    for (item in options) {
        this.config[item] = options[item];
    }

    this.file = null;
    this.channel = null;
}
util.inherits(Sender, WildEmitter);

Sender.prototype.send = function (file, channel) {
    var self = this;
    this.file = file;
    this.channel = channel;
    var sliceFile = function(offset) {
        var reader = new window.FileReader();
        reader.onload = (function() {
            return function(e) {
                self.channel.send(e.target.result);
                self.emit('progress', offset, file.size, e.target.result);
                if (file.size > offset + e.target.result.byteLength) {
                    window.setTimeout(sliceFile, self.config.pacing, offset + self.config.chunksize);
                } else {
                    self.emit('progress', file.size, file.size, null);
                    self.emit('sentFile');
                }
            };
        })(file);
        var slice = file.slice(offset, offset + self.config.chunksize);
        reader.readAsArrayBuffer(slice);
    };
    window.setTimeout(sliceFile, 0, 0);
};

function Receiver() {
    WildEmitter.call(this);

    this.receiveBuffer = [];
    this.received = 0;
    this.metadata = {};
    this.channel = null;
}
util.inherits(Receiver, WildEmitter);

Receiver.prototype.receive = function (metadata, channel) {
    var self = this;

    if (metadata) {
        this.metadata = metadata;
    }
    this.channel = channel;
    // chrome only supports arraybuffers and those make it easier to calc the hash
    channel.binaryType = 'arraybuffer';
    this.channel.onmessage = function (event) {
        var len = event.data.byteLength;
        self.received += len;
        self.receiveBuffer.push(event.data);

        self.emit('progress', self.received, self.metadata.size, event.data);
        if (self.received === self.metadata.size) {
            self.emit('receivedFile', new window.Blob(self.receiveBuffer), self.metadata);
            self.receiveBuffer = []; // discard receivebuffer
        } else if (self.received > self.metadata.size) {
            // FIXME
            console.error('received more than expected, discarding...');
            self.receiveBuffer = []; // just discard...

        }
    };
};

module.exports = {};
module.exports.support = window && window.File && window.FileReader && window.Blob;
module.exports.Sender = Sender;
module.exports.Receiver = Receiver;

},{"util":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/util.js","wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/index.js":[function(require,module,exports){
var util = require('util');
var hark = require('hark');
var webrtc = require('webrtcsupport');
var getUserMedia = require('getusermedia');
var getScreenMedia = require('getscreenmedia');
var WildEmitter = require('wildemitter');
var GainController = require('mediastream-gain');
var mockconsole = require('mockconsole');


function LocalMedia(opts) {
    WildEmitter.call(this);

    var config = this.config = {
        autoAdjustMic: false,
        detectSpeakingEvents: true,
        media: {
            audio: true,
            video: true
        },
        logger: mockconsole
    };

    var item;
    for (item in opts) {
        this.config[item] = opts[item];
    }

    this.logger = config.logger;
    this._log = this.logger.log.bind(this.logger, 'LocalMedia:');
    this._logerror = this.logger.error.bind(this.logger, 'LocalMedia:');

    this.screenSharingSupport = webrtc.screenSharing;

    this.localStreams = [];
    this.localScreens = [];

    if (!webrtc.support) {
        this._logerror('Your browser does not support local media capture.');
    }
}

util.inherits(LocalMedia, WildEmitter);


LocalMedia.prototype.start = function (mediaConstraints, cb) {
    var self = this;
    var constraints = mediaConstraints || this.config.media;

    getUserMedia(constraints, function (err, stream) {
        if (!err) {
            if (constraints.audio && self.config.detectSpeakingEvents) {
                self.setupAudioMonitor(stream, self.config.harkOptions);
            }
            self.localStreams.push(stream);

            if (self.config.autoAdjustMic) {
                self.gainController = new GainController(stream);
                // start out somewhat muted if we can track audio
                self.setMicIfEnabled(0.5);
            }

            // TODO: might need to migrate to the video tracks onended
            // FIXME: firefox does not seem to trigger this...
            stream.onended = function () {
                /*
                var idx = self.localStreams.indexOf(stream);
                if (idx > -1) {
                    self.localScreens.splice(idx, 1);
                }
                self.emit('localStreamStopped', stream);
                */
            };

            self.emit('localStream', stream);
        }
        if (cb) {
            return cb(err, stream);
        }
    });
};

LocalMedia.prototype.stop = function (stream) {
    var self = this;
    // FIXME: duplicates cleanup code until fixed in FF
    if (stream) {
        stream.stop();
        self.emit('localStreamStopped', stream);
        var idx = self.localStreams.indexOf(stream);
        if (idx > -1) {
            self.localStreams = self.localStreams.splice(idx, 1);
        }
    } else {
        if (this.audioMonitor) {
            this.audioMonitor.stop();
            delete this.audioMonitor;
        }
        this.localStreams.forEach(function (stream) {
            stream.stop();
            self.emit('localStreamStopped', stream);
        });
        this.localStreams = [];
    }
};

LocalMedia.prototype.startScreenShare = function (cb) {
    var self = this;
    getScreenMedia(function (err, stream) {
        if (!err) {
            self.localScreens.push(stream);

            // TODO: might need to migrate to the video tracks onended
            // Firefox does not support .onended but it does not support
            // screensharing either
            stream.onended = function () {
                var idx = self.localScreens.indexOf(stream);
                if (idx > -1) {
                    self.localScreens.splice(idx, 1);
                }
                self.emit('localScreenStopped', stream);
            };
            self.emit('localScreen', stream);
        }

        // enable the callback
        if (cb) {
            return cb(err, stream);
        }
    });
};

LocalMedia.prototype.stopScreenShare = function (stream) {
    if (stream) {
        stream.stop();
    } else {
        this.localScreens.forEach(function (stream) {
            stream.stop();
        });
        this.localScreens = [];
    }
};

// Audio controls
LocalMedia.prototype.mute = function () {
    this._audioEnabled(false);
    this.hardMuted = true;
    this.emit('audioOff');
};

LocalMedia.prototype.unmute = function () {
    this._audioEnabled(true);
    this.hardMuted = false;
    this.emit('audioOn');
};

LocalMedia.prototype.setupAudioMonitor = function (stream, harkOptions) {
    this._log('Setup audio');
    var audio = this.audioMonitor = hark(stream, harkOptions);
    var self = this;
    var timeout;

    audio.on('speaking', function () {
        self.emit('speaking');
        if (self.hardMuted) {
            return;
        }
        self.setMicIfEnabled(1);
    });

    audio.on('stopped_speaking', function () {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(function () {
            self.emit('stoppedSpeaking');
            if (self.hardMuted) {
                return;
            }
            self.setMicIfEnabled(0.5);
        }, 1000);
    });
    audio.on('volume_change', function (volume, treshold) {
        self.emit('volumeChange', volume, treshold);
    });
};

// We do this as a seperate method in order to
// still leave the "setMicVolume" as a working
// method.
LocalMedia.prototype.setMicIfEnabled = function (volume) {
    if (!this.config.autoAdjustMic) {
        return;
    }
    this.gainController.setGain(volume);
};

// Video controls
LocalMedia.prototype.pauseVideo = function () {
    this._videoEnabled(false);
    this.emit('videoOff');
};
LocalMedia.prototype.resumeVideo = function () {
    this._videoEnabled(true);
    this.emit('videoOn');
};

// Combined controls
LocalMedia.prototype.pause = function () {
    this.mute();
    this.pauseVideo();
};
LocalMedia.prototype.resume = function () {
    this.unmute();
    this.resumeVideo();
};

// Internal methods for enabling/disabling audio/video
LocalMedia.prototype._audioEnabled = function (bool) {
    // work around for chrome 27 bug where disabling tracks
    // doesn't seem to work (works in canary, remove when working)
    this.setMicIfEnabled(bool ? 1 : 0);
    this.localStreams.forEach(function (stream) {
        stream.getAudioTracks().forEach(function (track) {
            track.enabled = !!bool;
        });
    });
};
LocalMedia.prototype._videoEnabled = function (bool) {
    this.localStreams.forEach(function (stream) {
        stream.getVideoTracks().forEach(function (track) {
            track.enabled = !!bool;
        });
    });
};

// check if all audio streams are enabled
LocalMedia.prototype.isAudioEnabled = function () {
    var enabled = true;
    this.localStreams.forEach(function (stream) {
        stream.getAudioTracks().forEach(function (track) {
            enabled = enabled && track.enabled;
        });
    });
    return enabled;
};

// check if all video streams are enabled
LocalMedia.prototype.isVideoEnabled = function () {
    var enabled = true;
    this.localStreams.forEach(function (stream) {
        stream.getVideoTracks().forEach(function (track) {
            enabled = enabled && track.enabled;
        });
    });
    return enabled;
};

// Backwards Compat
LocalMedia.prototype.startLocalMedia = LocalMedia.prototype.start;
LocalMedia.prototype.stopLocalMedia = LocalMedia.prototype.stop;

// fallback for old .localStream behaviour
Object.defineProperty(LocalMedia.prototype, 'localStream', {
    get: function () {
        return this.localStreams.length > 0 ? this.localStreams[0] : null;
    }
});
// fallback for old .localScreen behaviour
Object.defineProperty(LocalMedia.prototype, 'localScreen', {
    get: function () {
        return this.localScreens.length > 0 ? this.localScreens[0] : null;
    }
});

module.exports = LocalMedia;

},{"getscreenmedia":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getscreenmedia/getscreenmedia.js","getusermedia":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getusermedia/index-browser.js","hark":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/hark/hark.js","mediastream-gain":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/mediastream-gain/mediastream-gain.js","mockconsole":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/mockconsole/mockconsole.js","util":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/util.js","webrtcsupport":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js","wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getscreenmedia/getscreenmedia.js":[function(require,module,exports){
// getScreenMedia helper by @HenrikJoreteg
var getUserMedia = require('getusermedia');

// cache for constraints and callback
var cache = {};

module.exports = function (constraints, cb) {
    var hasConstraints = arguments.length === 2;
    var callback = hasConstraints ? cb : constraints;
    var error;

    if (typeof window === 'undefined' || window.location.protocol === 'http:') {
        error = new Error('NavigatorUserMediaError');
        error.name = 'HTTPS_REQUIRED';
        return callback(error);
    }

    if (window.navigator.userAgent.match('Chrome')) {
        var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10);
        var maxver = 33;
        var isCef = !window.chrome.webstore;
        // "known" crash in chrome 34 and 35 on linux
        if (window.navigator.userAgent.match('Linux')) maxver = 35;
        if (isCef || (chromever >= 26 && chromever <= maxver)) {
            // chrome 26 - chrome 33 way to do it -- requires bad chrome://flags
            // note: this is basically in maintenance mode and will go away soon
            constraints = (hasConstraints && constraints) || {
                video: {
                    mandatory: {
                        googLeakyBucket: true,
                        maxWidth: window.screen.width,
                        maxHeight: window.screen.height,
                        maxFrameRate: 3,
                        chromeMediaSource: 'screen'
                    }
                }
            };
            getUserMedia(constraints, callback);
        } else {
            // chrome 34+ way requiring an extension
            var pending = window.setTimeout(function () {
                error = new Error('NavigatorUserMediaError');
                error.name = 'EXTENSION_UNAVAILABLE';
                return callback(error);
            }, 1000);
            cache[pending] = [callback, hasConstraints ? constraint : null];
            window.postMessage({ type: 'getScreen', id: pending }, '*');
        }
    } else if (window.navigator.userAgent.match('Firefox')) {
        var ffver = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
        if (ffver >= 33) {
            constraints = (hasConstraints && constraints) || {
                video: {
                    mozMediaSource: 'window',
                    mediaSource: 'window'
                }
            }
            getUserMedia(constraints, function (err, stream) {
                callback(err, stream);
                // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1045810
                if (!err) {
                    var lastTime = stream.currentTime;
                    var polly = window.setInterval(function () {
                        if (!stream) window.clearInterval(polly);
                        if (stream.currentTime == lastTime) {
                            window.clearInterval(polly);
                            if (stream.onended) {
                                stream.onended();
                            }
                        }
                        lastTime = stream.currentTime;
                    }, 500);
                }
            });
        } else {
            error = new Error('NavigatorUserMediaError');
            error.name = 'EXTENSION_UNAVAILABLE'; // does not make much sense but...
        }
    }
};

window.addEventListener('message', function (event) {
    if (event.origin != window.location.origin) {
        return;
    }
    if (event.data.type == 'gotScreen' && cache[event.data.id]) {
        var data = cache[event.data.id];
        var constraints = data[1];
        var callback = data[0];
        delete cache[event.data.id];

        if (event.data.sourceId === '') { // user canceled
            var error = new Error('NavigatorUserMediaError');
            error.name = 'PERMISSION_DENIED';
            callback(error);
        } else {
            constraints = constraints || {audio: false, video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    maxWidth: window.screen.width,
                    maxHeight: window.screen.height,
                    maxFrameRate: 3
                },
                optional: [
                    {googLeakyBucket: true},
                    {googTemporalLayeredScreencast: true}
                ]
            }};
            constraints.video.mandatory.chromeMediaSourceId = event.data.sourceId;
            getUserMedia(constraints, callback);
        }
    } else if (event.data.type == 'getScreenPending') {
        window.clearTimeout(event.data.id);
    }
});

},{"getusermedia":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getusermedia/index-browser.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/getusermedia/index-browser.js":[function(require,module,exports){
// getUserMedia helper by @HenrikJoreteg
var func = (window.navigator.getUserMedia ||
            window.navigator.webkitGetUserMedia ||
            window.navigator.mozGetUserMedia ||
            window.navigator.msGetUserMedia);


module.exports = function (constraints, cb) {
    var options, error;
    var haveOpts = arguments.length === 2;
    var defaultOpts = {video: true, audio: true};
    var denied = 'PermissionDeniedError';
    var notSatisfied = 'ConstraintNotSatisfiedError';

    // make constraints optional
    if (!haveOpts) {
        cb = constraints;
        constraints = defaultOpts;
    }

    // treat lack of browser support like an error
    if (!func) {
        // throw proper error per spec
        error = new Error('MediaStreamError');
        error.name = 'NotSupportedError';

        // keep all callbacks async
        return window.setTimeout(function () {
            cb(error);
        }, 0);
    }

    // make requesting media from non-http sources trigger an error
    // current browsers silently drop the request instead
    var protocol = window.location.protocol;
    if (protocol !== 'http:' && protocol !== 'https:') {
        error = new Error('MediaStreamError');
        error.name = 'NotSupportedError';

        // keep all callbacks async
        return window.setTimeout(function () {
            cb(error);
        }, 0);
    }

    // normalize error handling when no media types are requested
    if (!constraints.audio && !constraints.video) {
        error = new Error('MediaStreamError');
        error.name = 'NoMediaRequestedError';

        // keep all callbacks async
        return window.setTimeout(function () {
            cb(error);
        }, 0);
    }

    if (localStorage && localStorage.useFirefoxFakeDevice === "true") {
        constraints.fake = true;
    }

    func.call(window.navigator, constraints, function (stream) {
        cb(null, stream);
    }, function (err) {
        var error;
        // coerce into an error object since FF gives us a string
        // there are only two valid names according to the spec
        // we coerce all non-denied to "constraint not satisfied".
        if (typeof err === 'string') {
            error = new Error('MediaStreamError');
            if (err === denied) {
                error.name = denied;
            } else {
                error.name = notSatisfied;
            }
        } else {
            // if we get an error object make sure '.name' property is set
            // according to spec: http://dev.w3.org/2011/webrtc/editor/getusermedia.html#navigatorusermediaerror-and-navigatorusermediaerrorcallback
            error = err;
            if (!error.name) {
                // this is likely chrome which
                // sets a property called "ERROR_DENIED" on the error object
                // if so we make sure to set a name
                if (error[denied]) {
                    err.name = denied;
                } else {
                    err.name = notSatisfied;
                }
            }
        }

        cb(error);
    });
};

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/hark/hark.js":[function(require,module,exports){
var WildEmitter = require('wildemitter');

function getMaxVolume (analyser, fftBins) {
  var maxVolume = -Infinity;
  analyser.getFloatFrequencyData(fftBins);

  for(var i=4, ii=fftBins.length; i < ii; i++) {
    if (fftBins[i] > maxVolume && fftBins[i] < 0) {
      maxVolume = fftBins[i];
    }
  };

  return maxVolume;
}


var audioContextType = window.AudioContext || window.webkitAudioContext;
// use a single audio context due to hardware limits
var audioContext = null;
module.exports = function(stream, options) {
  var harker = new WildEmitter();


  // make it not break in non-supported browsers
  if (!audioContextType) return harker;

  //Config
  var options = options || {},
      smoothing = (options.smoothing || 0.1),
      interval = (options.interval || 50),
      threshold = options.threshold,
      play = options.play,
      history = options.history || 10,
      running = true;

  //Setup Audio Context
  if (!audioContext) {
    audioContext = new audioContextType();
  }
  var sourceNode, fftBins, analyser;

  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = smoothing;
  fftBins = new Float32Array(analyser.fftSize);

  if (stream.jquery) stream = stream[0];
  if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
    //Audio Tag
    sourceNode = audioContext.createMediaElementSource(stream);
    if (typeof play === 'undefined') play = true;
    threshold = threshold || -50;
  } else {
    //WebRTC Stream
    sourceNode = audioContext.createMediaStreamSource(stream);
    threshold = threshold || -50;
  }

  sourceNode.connect(analyser);
  if (play) analyser.connect(audioContext.destination);

  harker.speaking = false;

  harker.setThreshold = function(t) {
    threshold = t;
  };

  harker.setInterval = function(i) {
    interval = i;
  };
  
  harker.stop = function() {
    running = false;
    harker.emit('volume_change', -100, threshold);
    if (harker.speaking) {
      harker.speaking = false;
      harker.emit('stopped_speaking');
    }
  };
  harker.speakingHistory = [];
  for (var i = 0; i < history; i++) {
      harker.speakingHistory.push(0);
  }

  // Poll the analyser node to determine if speaking
  // and emit events if changed
  var looper = function() {
    setTimeout(function() {
    
      //check if stop has been called
      if(!running) {
        return;
      }
      
      var currentVolume = getMaxVolume(analyser, fftBins);

      harker.emit('volume_change', currentVolume, threshold);

      var history = 0;
      if (currentVolume > threshold && !harker.speaking) {
        // trigger quickly, short history
        for (var i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }
        if (history >= 2) {
          harker.speaking = true;
          harker.emit('speaking');
        }
      } else if (currentVolume < threshold && harker.speaking) {
        for (var i = 0; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }
        if (history == 0) {
          harker.speaking = false;
          harker.emit('stopped_speaking');
        }
      }
      harker.speakingHistory.shift();
      harker.speakingHistory.push(0 + (currentVolume > threshold));

      looper();
    }, interval);
  };
  looper();


  return harker;
}

},{"wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/node_modules/mediastream-gain/mediastream-gain.js":[function(require,module,exports){
var support = require('webrtcsupport');


function GainController(stream) {
    this.support = support.webAudio && support.mediaStream;

    // set our starting value
    this.gain = 1;

    if (this.support) {
        var context = this.context = new support.AudioContext();
        this.microphone = context.createMediaStreamSource(stream);
        this.gainFilter = context.createGain();
        this.destination = context.createMediaStreamDestination();
        this.outputStream = this.destination.stream;
        this.microphone.connect(this.gainFilter);
        this.gainFilter.connect(this.destination);
        stream.addTrack(this.outputStream.getAudioTracks()[0]);
        stream.removeTrack(stream.getAudioTracks()[0]);
    }
    this.stream = stream;
}

// setting
GainController.prototype.setGain = function (val) {
    // check for support
    if (!this.support) return;
    this.gainFilter.gain.value = val;
    this.gain = val;
};

GainController.prototype.getGain = function () {
    return this.gain;
};

GainController.prototype.off = function () {
    return this.setGain(0);
};

GainController.prototype.on = function () {
    this.setGain(1);
};


module.exports = GainController;

},{"webrtcsupport":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/index.js":[function(require,module,exports){
var toSDP = require('./lib/tosdp');
var toJSON = require('./lib/tojson');


// Converstion from JSON to SDP

exports.toIncomingSDPOffer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'responder',
        direction: 'incoming'
    });
};
exports.toOutgoingSDPOffer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'initiator',
        direction: 'outgoing'
    });
};
exports.toIncomingSDPAnswer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'initiator',
        direction: 'incoming'
    });
};
exports.toOutgoingSDPAnswer = function (session) {
    return toSDP.toSessionSDP(session, {
        role: 'responder',
        direction: 'outgoing'
    });
};
exports.toIncomingMediaSDPOffer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'responder',
        direction: 'incoming'
    });
};
exports.toOutgoingMediaSDPOffer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'initiator',
        direction: 'outgoing'
    });
};
exports.toIncomingMediaSDPAnswer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'initiator',
        direction: 'incoming'
    });
};
exports.toOutgoingMediaSDPAnswer = function (media) {
    return toSDP.toMediaSDP(media, {
        role: 'responder',
        direction: 'outgoing'
    });
};
exports.toCandidateSDP = toSDP.toCandidateSDP;
exports.toMediaSDP = toSDP.toMediaSDP;
exports.toSessionSDP = toSDP.toSessionSDP;


// Conversion from SDP to JSON

exports.toIncomingJSONOffer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'responder',
        direction: 'incoming',
        creators: creators
    });
};
exports.toOutgoingJSONOffer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'initiator',
        direction: 'outgoing',
        creators: creators
    });
};
exports.toIncomingJSONAnswer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'initiator',
        direction: 'incoming',
        creators: creators
    });
};
exports.toOutgoingJSONAnswer = function (sdp, creators) {
    return toJSON.toSessionJSON(sdp, {
        role: 'responder',
        direction: 'outgoing',
        creators: creators
    });
};
exports.toIncomingMediaJSONOffer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'responder',
        direction: 'incoming',
        creator: creator
    });
};
exports.toOutgoingMediaJSONOffer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'initiator',
        direction: 'outgoing',
        creator: creator
    });
};
exports.toIncomingMediaJSONAnswer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'initiator',
        direction: 'incoming',
        creator: creator
    });
};
exports.toOutgoingMediaJSONAnswer = function (sdp, creator) {
    return toJSON.toMediaJSON(sdp, {
        role: 'responder',
        direction: 'outgoing',
        creator: creator
    });
};
exports.toCandidateJSON = toJSON.toCandidateJSON;
exports.toMediaJSON = toJSON.toMediaJSON;
exports.toSessionJSON = toJSON.toSessionJSON;

},{"./lib/tojson":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/tojson.js","./lib/tosdp":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/tosdp.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/parsers.js":[function(require,module,exports){
exports.lines = function (sdp) {
    return sdp.split('\r\n').filter(function (line) {
        return line.length > 0;
    });
};

exports.findLine = function (prefix, mediaLines, sessionLines) {
    var prefixLength = prefix.length;
    for (var i = 0; i < mediaLines.length; i++) {
        if (mediaLines[i].substr(0, prefixLength) === prefix) {
            return mediaLines[i];
        }
    }
    // Continue searching in parent session section
    if (!sessionLines) {
        return false;
    }

    for (var j = 0; j < sessionLines.length; j++) {
        if (sessionLines[j].substr(0, prefixLength) === prefix) {
            return sessionLines[j];
        }
    }

    return false;
};

exports.findLines = function (prefix, mediaLines, sessionLines) {
    var results = [];
    var prefixLength = prefix.length;
    for (var i = 0; i < mediaLines.length; i++) {
        if (mediaLines[i].substr(0, prefixLength) === prefix) {
            results.push(mediaLines[i]);
        }
    }
    if (results.length || !sessionLines) {
        return results;
    }
    for (var j = 0; j < sessionLines.length; j++) {
        if (sessionLines[j].substr(0, prefixLength) === prefix) {
            results.push(sessionLines[j]);
        }
    }
    return results;
};

exports.mline = function (line) {
    var parts = line.substr(2).split(' ');
    var parsed = {
        media: parts[0],
        port: parts[1],
        proto: parts[2],
        formats: []
    };
    for (var i = 3; i < parts.length; i++) {
        if (parts[i]) {
            parsed.formats.push(parts[i]);
        }
    }
    return parsed;
};

exports.rtpmap = function (line) {
    var parts = line.substr(9).split(' ');
    var parsed = {
        id: parts.shift()
    };

    parts = parts[0].split('/');

    parsed.name = parts[0];
    parsed.clockrate = parts[1];
    parsed.channels = parts.length == 3 ? parts[2] : '1';
    return parsed;
};

exports.sctpmap = function (line) {
    // based on -05 draft
    var parts = line.substr(10).split(' ');
    var parsed = {
        number: parts.shift(),
        protocol: parts.shift(),
        streams: parts.shift()
    };
    return parsed;
};


exports.fmtp = function (line) {
    var kv, key, value;
    var parts = line.substr(line.indexOf(' ') + 1).split(';');
    var parsed = [];
    for (var i = 0; i < parts.length; i++) {
        kv = parts[i].split('=');
        key = kv[0].trim();
        value = kv[1];
        if (key && value) {
            parsed.push({key: key, value: value});
        } else if (key) {
            parsed.push({key: '', value: key});
        }
    }
    return parsed;
};

exports.crypto = function (line) {
    var parts = line.substr(9).split(' ');
    var parsed = {
        tag: parts[0],
        cipherSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3).join(' ')
    };
    return parsed;
};

exports.fingerprint = function (line) {
    var parts = line.substr(14).split(' ');
    return {
        hash: parts[0],
        value: parts[1]
    };
};

exports.extmap = function (line) {
    var parts = line.substr(9).split(' ');
    var parsed = {};

    var idpart = parts.shift();
    var sp = idpart.indexOf('/');
    if (sp >= 0) {
        parsed.id = idpart.substr(0, sp);
        parsed.senders = idpart.substr(sp + 1);
    } else {
        parsed.id = idpart;
        parsed.senders = 'sendrecv';
    }

    parsed.uri = parts.shift() || '';

    return parsed;
};

exports.rtcpfb = function (line) {
    var parts = line.substr(10).split(' ');
    var parsed = {};
    parsed.id = parts.shift();
    parsed.type = parts.shift();
    if (parsed.type === 'trr-int') {
        parsed.value = parts.shift();
    } else {
        parsed.subtype = parts.shift() || '';
    }
    parsed.parameters = parts;
    return parsed;
};

exports.candidate = function (line) {
    var parts;
    if (line.indexOf('a=candidate:') === 0) {
        parts = line.substring(12).split(' ');
    } else { // no a=candidate
        parts = line.substring(10).split(' ');
    }

    var candidate = {
        foundation: parts[0],
        component: parts[1],
        protocol: parts[2].toLowerCase(),
        priority: parts[3],
        ip: parts[4],
        port: parts[5],
        // skip parts[6] == 'typ'
        type: parts[7],
        generation: '0'
    };

    for (var i = 8; i < parts.length; i += 2) {
        if (parts[i] === 'raddr') {
            candidate.relAddr = parts[i + 1];
        } else if (parts[i] === 'rport') {
            candidate.relPort = parts[i + 1];
        } else if (parts[i] === 'generation') {
            candidate.generation = parts[i + 1];
        } else if (parts[i] === 'tcptype') {
            candidate.tcpType = parts[i + 1];
        }
    }

    candidate.network = '1';

    return candidate;
};

exports.sourceGroups = function (lines) {
    var parsed = [];
    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].substr(13).split(' ');
        parsed.push({
            semantics: parts.shift(),
            sources: parts
        });
    }
    return parsed;
};

exports.sources = function (lines) {
    // http://tools.ietf.org/html/rfc5576
    var parsed = [];
    var sources = {};
    for (var i = 0; i < lines.length; i++) {
        var parts = lines[i].substr(7).split(' ');
        var ssrc = parts.shift();

        if (!sources[ssrc]) {
            var source = {
                ssrc: ssrc,
                parameters: []
            };
            parsed.push(source);

            // Keep an index
            sources[ssrc] = source;
        }

        parts = parts.join(' ').split(':');
        var attribute = parts.shift();
        var value = parts.join(':') || null;

        sources[ssrc].parameters.push({
            key: attribute,
            value: value
        });
    }

    return parsed;
};

exports.groups = function (lines) {
    // http://tools.ietf.org/html/rfc5888
    var parsed = [];
    var parts;
    for (var i = 0; i < lines.length; i++) {
        parts = lines[i].substr(8).split(' ');
        parsed.push({
            semantics: parts.shift(),
            contents: parts
        });
    }
    return parsed;
};

exports.bandwidth = function (line) {
    var parts = line.substr(2).split(':');
    var parsed = {};
    parsed.type = parts.shift();
    parsed.bandwidth = parts.shift();
    return parsed;
};

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/senders.js":[function(require,module,exports){
module.exports = {
    initiator: {
        incoming: {
            initiator: 'recvonly',
            responder: 'sendonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'initiator',
            sendonly: 'responder',
            sendrecv: 'both',
            inactive: 'none'
        },
        outgoing: {
            initiator: 'sendonly',
            responder: 'recvonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'responder',
            sendonly: 'initiator',
            sendrecv: 'both',
            inactive: 'none'
        }
    },
    responder: {
        incoming: {
            initiator: 'sendonly',
            responder: 'recvonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'responder',
            sendonly: 'initiator',
            sendrecv: 'both',
            inactive: 'none'
        },
        outgoing: {
            initiator: 'recvonly',
            responder: 'sendonly',
            both: 'sendrecv',
            none: 'inactive',
            recvonly: 'initiator',
            sendonly: 'responder',
            sendrecv: 'both',
            inactive: 'none'
        }
    }
};

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/tojson.js":[function(require,module,exports){
var SENDERS = require('./senders');
var parsers = require('./parsers');
var idCounter = Math.random();


exports._setIdCounter = function (counter) {
    idCounter = counter;
};

exports.toSessionJSON = function (sdp, opts) {
    var i;
    var creators = opts.creators || [];
    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';


    // Divide the SDP into session and media sections.
    var media = sdp.split('\r\nm=');
    for (i = 1; i < media.length; i++) {
        media[i] = 'm=' + media[i];
        if (i !== media.length - 1) {
            media[i] += '\r\n';
        }
    }
    var session = media.shift() + '\r\n';
    var sessionLines = parsers.lines(session);
    var parsed = {};

    var contents = [];
    for (i = 0; i < media.length; i++) {
        contents.push(exports.toMediaJSON(media[i], session, {
            role: role,
            direction: direction,
            creator: creators[i] || 'initiator'
        }));
    }
    parsed.contents = contents;

    var groupLines = parsers.findLines('a=group:', sessionLines);
    if (groupLines.length) {
        parsed.groups = parsers.groups(groupLines);
    }

    return parsed;
};

exports.toMediaJSON = function (media, session, opts) {
    var creator = opts.creator || 'initiator';
    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';

    var lines = parsers.lines(media);
    var sessionLines = parsers.lines(session);
    var mline = parsers.mline(lines[0]);

    var content = {
        creator: creator,
        name: mline.media,
        description: {
            descType: 'rtp',
            media: mline.media,
            payloads: [],
            encryption: [],
            feedback: [],
            headerExtensions: []
        },
        transport: {
            transType: 'iceUdp',
            candidates: [],
            fingerprints: []
        }
    };
    if (mline.media == 'application') {
        // FIXME: the description is most likely to be independent
        // of the SDP and should be processed by other parts of the library
        content.description = {
            descType: 'datachannel'
        };
        content.transport.sctp = [];
    }
    var desc = content.description;
    var trans = content.transport;

    // If we have a mid, use that for the content name instead.
    var mid = parsers.findLine('a=mid:', lines);
    if (mid) {
        content.name = mid.substr(6);
    }

    if (parsers.findLine('a=sendrecv', lines, sessionLines)) {
        content.senders = 'both';
    } else if (parsers.findLine('a=sendonly', lines, sessionLines)) {
        content.senders = SENDERS[role][direction].sendonly;
    } else if (parsers.findLine('a=recvonly', lines, sessionLines)) {
        content.senders = SENDERS[role][direction].recvonly;
    } else if (parsers.findLine('a=inactive', lines, sessionLines)) {
        content.senders = 'none';
    }

    if (desc.descType == 'rtp') {
        var bandwidth = parsers.findLine('b=', lines);
        if (bandwidth) {
            desc.bandwidth = parsers.bandwidth(bandwidth);
        }

        var ssrc = parsers.findLine('a=ssrc:', lines);
        if (ssrc) {
            desc.ssrc = ssrc.substr(7).split(' ')[0];
        }

        var rtpmapLines = parsers.findLines('a=rtpmap:', lines);
        rtpmapLines.forEach(function (line) {
            var payload = parsers.rtpmap(line);
            payload.parameters = [];
            payload.feedback = [];

            var fmtpLines = parsers.findLines('a=fmtp:' + payload.id, lines);
            // There should only be one fmtp line per payload
            fmtpLines.forEach(function (line) {
                payload.parameters = parsers.fmtp(line);
            });

            var fbLines = parsers.findLines('a=rtcp-fb:' + payload.id, lines);
            fbLines.forEach(function (line) {
                payload.feedback.push(parsers.rtcpfb(line));
            });

            desc.payloads.push(payload);
        });

        var cryptoLines = parsers.findLines('a=crypto:', lines, sessionLines);
        cryptoLines.forEach(function (line) {
            desc.encryption.push(parsers.crypto(line));
        });

        if (parsers.findLine('a=rtcp-mux', lines)) {
            desc.mux = true;
        }

        var fbLines = parsers.findLines('a=rtcp-fb:*', lines);
        fbLines.forEach(function (line) {
            desc.feedback.push(parsers.rtcpfb(line));
        });

        var extLines = parsers.findLines('a=extmap:', lines);
        extLines.forEach(function (line) {
            var ext = parsers.extmap(line);

            ext.senders = SENDERS[role][direction][ext.senders];

            desc.headerExtensions.push(ext);
        });

        var ssrcGroupLines = parsers.findLines('a=ssrc-group:', lines);
        desc.sourceGroups = parsers.sourceGroups(ssrcGroupLines || []);

        var ssrcLines = parsers.findLines('a=ssrc:', lines);
        desc.sources = parsers.sources(ssrcLines || []);

        if (parsers.findLine('a=x-google-flag:conference', lines, sessionLines)) {
            desc.googConferenceFlag = true;
        }
    }

    // transport specific attributes
    var fingerprintLines = parsers.findLines('a=fingerprint:', lines, sessionLines);
    var setup = parsers.findLine('a=setup:', lines, sessionLines);
    fingerprintLines.forEach(function (line) {
        var fp = parsers.fingerprint(line);
        if (setup) {
            fp.setup = setup.substr(8);
        }
        trans.fingerprints.push(fp);
    });

    var ufragLine = parsers.findLine('a=ice-ufrag:', lines, sessionLines);
    var pwdLine = parsers.findLine('a=ice-pwd:', lines, sessionLines);
    if (ufragLine && pwdLine) {
        trans.ufrag = ufragLine.substr(12);
        trans.pwd = pwdLine.substr(10);
        trans.candidates = [];

        var candidateLines = parsers.findLines('a=candidate:', lines, sessionLines);
        candidateLines.forEach(function (line) {
            trans.candidates.push(exports.toCandidateJSON(line));
        });
    }

    if (desc.descType == 'datachannel') {
        var sctpmapLines = parsers.findLines('a=sctpmap:', lines);
        sctpmapLines.forEach(function (line) {
            var sctp = parsers.sctpmap(line);
            trans.sctp.push(sctp);
        });
    }

    return content;
};

exports.toCandidateJSON = function (line) {
    var candidate = parsers.candidate(line.split('\r\n')[0]);
    candidate.id = (idCounter++).toString(36).substr(0, 12);
    return candidate;
};

},{"./parsers":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/parsers.js","./senders":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/senders.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/tosdp.js":[function(require,module,exports){
var SENDERS = require('./senders');


exports.toSessionSDP = function (session, opts) {
    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';
    var sid = opts.sid || session.sid || Date.now();
    var time = opts.time || Date.now();

    var sdp = [
        'v=0',
        'o=- ' + sid + ' ' + time + ' IN IP4 0.0.0.0',
        's=-',
        't=0 0'
    ];

    var groups = session.groups || [];
    groups.forEach(function (group) {
        sdp.push('a=group:' + group.semantics + ' ' + group.contents.join(' '));
    });

    var contents = session.contents || [];
    contents.forEach(function (content) {
        sdp.push(exports.toMediaSDP(content, opts));
    });

    return sdp.join('\r\n') + '\r\n';
};

exports.toMediaSDP = function (content, opts) {
    var sdp = [];

    var role = opts.role || 'initiator';
    var direction = opts.direction || 'outgoing';

    var desc = content.description;
    var transport = content.transport;
    var payloads = desc.payloads || [];
    var fingerprints = (transport && transport.fingerprints) || [];

    var mline = [];
    if (desc.descType == 'datachannel') {
        mline.push('application');
        mline.push('1');
        mline.push('DTLS/SCTP');
        if (transport.sctp) {
            transport.sctp.forEach(function (map) {
                mline.push(map.number);
            });
        }
    } else {
        mline.push(desc.media);
        mline.push('1');
        if ((desc.encryption && desc.encryption.length > 0) || (fingerprints.length > 0)) {
            mline.push('RTP/SAVPF');
        } else {
            mline.push('RTP/AVPF');
        }
        payloads.forEach(function (payload) {
            mline.push(payload.id);
        });
    }


    sdp.push('m=' + mline.join(' '));

    sdp.push('c=IN IP4 0.0.0.0');
    if (desc.bandwidth && desc.bandwidth.type && desc.bandwidth.bandwidth) {
        sdp.push('b=' + desc.bandwidth.type + ':' + desc.bandwidth.bandwidth);
    }
    if (desc.descType == 'rtp') {
        sdp.push('a=rtcp:1 IN IP4 0.0.0.0');
    }

    if (transport) {
        if (transport.ufrag) {
            sdp.push('a=ice-ufrag:' + transport.ufrag);
        }
        if (transport.pwd) {
            sdp.push('a=ice-pwd:' + transport.pwd);
        }

        var pushedSetup = false;
        fingerprints.forEach(function (fingerprint) {
            sdp.push('a=fingerprint:' + fingerprint.hash + ' ' + fingerprint.value);
            if (fingerprint.setup && !pushedSetup) {
                sdp.push('a=setup:' + fingerprint.setup);
            }
        });

        if (transport.sctp) {
            transport.sctp.forEach(function (map) {
                sdp.push('a=sctpmap:' + map.number + ' ' + map.protocol + ' ' + map.streams);
            });
        }
    }

    if (desc.descType == 'rtp') {
        sdp.push('a=' + (SENDERS[role][direction][content.senders] || 'sendrecv'));
    }
    sdp.push('a=mid:' + content.name);

    if (desc.mux) {
        sdp.push('a=rtcp-mux');
    }

    var encryption = desc.encryption || [];
    encryption.forEach(function (crypto) {
        sdp.push('a=crypto:' + crypto.tag + ' ' + crypto.cipherSuite + ' ' + crypto.keyParams + (crypto.sessionParams ? ' ' + crypto.sessionParams : ''));
    });
    if (desc.googConferenceFlag) {
        sdp.push('a=x-google-flag:conference');
    }

    payloads.forEach(function (payload) {
        var rtpmap = 'a=rtpmap:' + payload.id + ' ' + payload.name + '/' + payload.clockrate;
        if (payload.channels && payload.channels != '1') {
            rtpmap += '/' + payload.channels;
        }
        sdp.push(rtpmap);

        if (payload.parameters && payload.parameters.length) {
            var fmtp = ['a=fmtp:' + payload.id];
            var parameters = [];
            payload.parameters.forEach(function (param) {
                parameters.push((param.key ? param.key + '=' : '') + param.value);
            });
            fmtp.push(parameters.join(';'));
            sdp.push(fmtp.join(' '));
        }

        if (payload.feedback) {
            payload.feedback.forEach(function (fb) {
                if (fb.type === 'trr-int') {
                    sdp.push('a=rtcp-fb:' + payload.id + ' trr-int ' + (fb.value ? fb.value : '0'));
                } else {
                    sdp.push('a=rtcp-fb:' + payload.id + ' ' + fb.type + (fb.subtype ? ' ' + fb.subtype : ''));
                }
            });
        }
    });

    if (desc.feedback) {
        desc.feedback.forEach(function (fb) {
            if (fb.type === 'trr-int') {
                sdp.push('a=rtcp-fb:* trr-int ' + (fb.value ? fb.value : '0'));
            } else {
                sdp.push('a=rtcp-fb:* ' + fb.type + (fb.subtype ? ' ' + fb.subtype : ''));
            }
        });
    }

    var hdrExts = desc.headerExtensions || [];
    hdrExts.forEach(function (hdr) {
        sdp.push('a=extmap:' + hdr.id + (hdr.senders ? '/' + SENDERS[role][direction][hdr.senders] : '') + ' ' + hdr.uri);
    });

    var ssrcGroups = desc.sourceGroups || [];
    ssrcGroups.forEach(function (ssrcGroup) {
        sdp.push('a=ssrc-group:' + ssrcGroup.semantics + ' ' + ssrcGroup.sources.join(' '));
    });

    var ssrcs = desc.sources || [];
    ssrcs.forEach(function (ssrc) {
        for (var i = 0; i < ssrc.parameters.length; i++) {
            var param = ssrc.parameters[i];
            sdp.push('a=ssrc:' + (ssrc.ssrc || desc.ssrc) + ' ' + param.key + (param.value ? (':' + param.value) : ''));
        }
    });

    var candidates = transport.candidates || [];
    candidates.forEach(function (candidate) {
        sdp.push(exports.toCandidateSDP(candidate));
    });

    return sdp.join('\r\n');
};

exports.toCandidateSDP = function (candidate) {
    var sdp = [];

    sdp.push(candidate.foundation);
    sdp.push(candidate.component);
    sdp.push(candidate.protocol.toUpperCase());
    sdp.push(candidate.priority);
    sdp.push(candidate.ip);
    sdp.push(candidate.port);

    var type = candidate.type;
    sdp.push('typ');
    sdp.push(type);
    if (type === 'srflx' || type === 'prflx' || type === 'relay') {
        if (candidate.relAddr && candidate.relPort) {
            sdp.push('raddr');
            sdp.push(candidate.relAddr);
            sdp.push('rport');
            sdp.push(candidate.relPort);
        }
    }
    if (candidate.tcpType && candidate.protocol.toUpperCase() == 'TCP') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
    }

    sdp.push('generation');
    sdp.push(candidate.generation || '0');

    // FIXME: apparently this is wrong per spec
    // but then, we need this when actually putting this into
    // SDP so it's going to stay.
    // decision needs to be revisited when browsers dont
    // accept this any longer
    return 'a=candidate:' + sdp.join(' ');
};

},{"./senders":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/lib/senders.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/traceablepeerconnection/index.js":[function(require,module,exports){
// based on https://github.com/ESTOS/strophe.jingle/
// adds wildemitter support
var util = require('util');
var webrtc = require('webrtcsupport');
var WildEmitter = require('wildemitter');

function dumpSDP(description) {
    return {
        type: description.type,
        sdp: description.sdp
    };
}

function dumpStream(stream) {
    var info = {
        label: stream.id,
    };
    if (stream.getAudioTracks().length) {
        info.audio = stream.getAudioTracks().map(function (track) {
            return track.id;
        });
    }
    if (stream.getVideoTracks().length) {
        info.video = stream.getVideoTracks().map(function (track) {
            return track.id;
        });
    }
    return info;
}

function TraceablePeerConnection(config, constraints) {
    var self = this;
    WildEmitter.call(this);

    this.peerconnection = new webrtc.PeerConnection(config, constraints);

    this.trace = function (what, info) {
        self.emit('PeerConnectionTrace', {
            time: new Date(),
            type: what,
            value: info || ""
        });
    };

    this.onicecandidate = null;
    this.peerconnection.onicecandidate = function (event) {
        self.trace('onicecandidate', event.candidate);
        if (self.onicecandidate !== null) {
            self.onicecandidate(event);
        }
    };
    this.onaddstream = null;
    this.peerconnection.onaddstream = function (event) {
        self.trace('onaddstream', dumpStream(event.stream));
        if (self.onaddstream !== null) {
            self.onaddstream(event);
        }
    };
    this.onremovestream = null;
    this.peerconnection.onremovestream = function (event) {
        self.trace('onremovestream', dumpStream(event.stream));
        if (self.onremovestream !== null) {
            self.onremovestream(event);
        }
    };
    this.onsignalingstatechange = null;
    this.peerconnection.onsignalingstatechange = function (event) {
        self.trace('onsignalingstatechange', self.signalingState);
        if (self.onsignalingstatechange !== null) {
            self.onsignalingstatechange(event);
        }
    };
    this.oniceconnectionstatechange = null;
    this.peerconnection.oniceconnectionstatechange = function (event) {
        self.trace('oniceconnectionstatechange', self.iceConnectionState);
        if (self.oniceconnectionstatechange !== null) {
            self.oniceconnectionstatechange(event);
        }
    };
    this.onnegotiationneeded = null;
    this.peerconnection.onnegotiationneeded = function (event) {
        self.trace('onnegotiationneeded');
        if (self.onnegotiationneeded !== null) {
            self.onnegotiationneeded(event);
        }
    };
    self.ondatachannel = null;
    this.peerconnection.ondatachannel = function (event) {
        self.trace('ondatachannel', event);
        if (self.ondatachannel !== null) {
            self.ondatachannel(event);
        }
    };
    this.getLocalStreams = this.peerconnection.getLocalStreams.bind(this.peerconnection);
    this.getRemoteStreams = this.peerconnection.getRemoteStreams.bind(this.peerconnection);
}

util.inherits(TraceablePeerConnection, WildEmitter);

Object.defineProperty(TraceablePeerConnection.prototype, 'signalingState', {
    get: function () {
        return this.peerconnection.signalingState;
    }
});

Object.defineProperty(TraceablePeerConnection.prototype, 'iceConnectionState', {
    get: function () {
        return this.peerconnection.iceConnectionState;
    }
});

Object.defineProperty(TraceablePeerConnection.prototype, 'localDescription', {
    get: function () {
        return this.peerconnection.localDescription;
    }
});

Object.defineProperty(TraceablePeerConnection.prototype, 'remoteDescription', {
    get: function () {
        return this.peerconnection.remoteDescription;
    }
});

TraceablePeerConnection.prototype.addStream = function (stream) {
    this.trace('addStream', dumpStream(stream));
    this.peerconnection.addStream(stream);
};

TraceablePeerConnection.prototype.removeStream = function (stream) {
    this.trace('removeStream', dumpStream(stream));
    this.peerconnection.removeStream(stream);
};

TraceablePeerConnection.prototype.createDataChannel = function (label, opts) {
    this.trace('createDataChannel', label, opts);
    return this.peerconnection.createDataChannel(label, opts);
};

TraceablePeerConnection.prototype.setLocalDescription = function (description, successCallback, failureCallback) {
    var self = this;
    this.trace('setLocalDescription', dumpSDP(description));
    this.peerconnection.setLocalDescription(description,
        function () {
            self.trace('setLocalDescriptionOnSuccess');
            successCallback();
        },
        function (err) {
            self.trace('setLocalDescriptionOnFailure', err);
            failureCallback(err);
        }
    );
};

TraceablePeerConnection.prototype.setRemoteDescription = function (description, successCallback, failureCallback) {
    var self = this;
    this.trace('setRemoteDescription', dumpSDP(description));
    this.peerconnection.setRemoteDescription(description,
        function () {
            self.trace('setRemoteDescriptionOnSuccess');
            successCallback();
        },
        function (err) {
            self.trace('setRemoteDescriptionOnFailure', err);
            failureCallback(err);
        }
    );
};

TraceablePeerConnection.prototype.close = function () {
    this.trace('stop');
    if (this.statsinterval !== null) {
        window.clearInterval(this.statsinterval);
        this.statsinterval = null;
    }
    if (this.peerconnection.signalingState != 'closed') {
        this.peerconnection.close();
    }
};

TraceablePeerConnection.prototype.createOffer = function (successCallback, failureCallback, constraints) {
    var self = this;
    this.trace('createOffer', constraints);
    this.peerconnection.createOffer(
        function (offer) {
            self.trace('createOfferOnSuccess', dumpSDP(offer));
            successCallback(offer);
        },
        function (err) {
            self.trace('createOfferOnFailure', err);
            failureCallback(err);
        },
        constraints
    );
};

TraceablePeerConnection.prototype.createAnswer = function (successCallback, failureCallback, constraints) {
    var self = this;
    this.trace('createAnswer', constraints);
    this.peerconnection.createAnswer(
        function (answer) {
            self.trace('createAnswerOnSuccess', dumpSDP(answer));
            successCallback(answer);
        },
        function (err) {
            self.trace('createAnswerOnFailure', err);
            failureCallback(err);
        },
        constraints
    );
};

TraceablePeerConnection.prototype.addIceCandidate = function (candidate, successCallback, failureCallback) {
    var self = this;
    this.trace('addIceCandidate', candidate);
    this.peerconnection.addIceCandidate(candidate,
        function () {
            //self.trace('addIceCandidateOnSuccess');
            if (successCallback) successCallback();
        },
        function (err) {
            self.trace('addIceCandidateOnFailure', err);
            if (failureCallback) failureCallback(err);
        }
    );
};

TraceablePeerConnection.prototype.getStats = function (callback, errback) {
    if (navigator.mozGetUserMedia) {
        this.peerconnection.getStats(null, callback, errback);
    } else {
        this.peerconnection.getStats(callback);
    }
};

module.exports = TraceablePeerConnection;

},{"util":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/util.js","webrtcsupport":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js","wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/underscore/underscore.js":[function(require,module,exports){
//     Underscore.js 1.8.2
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.2';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var isArrayLike = function(collection) {
    var length = collection && collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, target, fromIndex) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    return _.indexOf(obj, target, typeof fromIndex == 'number' && fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = input && input.length; i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, 'length').length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = list && list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    var i = 0, length = array && array.length;
    if (typeof isSorted == 'number') {
      i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
    } else if (isSorted && length) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (item !== item) {
      return _.findIndex(slice.call(array, i), _.isNaN);
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    var idx = array ? array.length : 0;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    if (item !== item) {
      return _.findLastIndex(slice.call(array, 0, idx), _.isNaN);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = array != null && array.length;
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createIndexFinder(1);

  _.findLastIndex = createIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of 
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
  
  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/rtcpeerconnection.js":[function(require,module,exports){
var _ = require('underscore');
var util = require('util');
var webrtc = require('webrtcsupport');
var SJJ = require('sdp-jingle-json');
var WildEmitter = require('wildemitter');
var peerconn = require('traceablepeerconnection');

function PeerConnection(config, constraints) {
    var self = this;
    var item;
    WildEmitter.call(this);

    config = config || {};
    config.iceServers = config.iceServers || [];

    // make sure this only gets enabled in Google Chrome
    // EXPERIMENTAL FLAG, might get removed without notice
    this.enableChromeNativeSimulcast = false;
    if (constraints && constraints.optional &&
            webrtc.prefix === 'webkit' &&
            navigator.appVersion.match(/Chromium\//) === null) {
        constraints.optional.forEach(function (constraint, idx) {
            if (constraint.enableChromeNativeSimulcast) {
                self.enableChromeNativeSimulcast = true;
            }
        });
    }

    // EXPERIMENTAL FLAG, might get removed without notice
    this.enableMultiStreamHacks = false;
    if (constraints && constraints.optional) {
        constraints.optional.forEach(function (constraint, idx) {
            if (constraint.enableMultiStreamHacks) {
                self.enableMultiStreamHacks = true;
            }
        });
    }

    this.pc = new peerconn(config, constraints);

    this.getLocalStreams = this.pc.getLocalStreams.bind(this.pc);
    this.getRemoteStreams = this.pc.getRemoteStreams.bind(this.pc);
    this.addStream = this.pc.addStream.bind(this.pc);
    this.removeStream = this.pc.removeStream.bind(this.pc);

    // proxy events 
    this.pc.on('*', function () {
        self.emit.apply(self, arguments);
    });

    // proxy some events directly
    this.pc.onremovestream = this.emit.bind(this, 'removeStream');
    this.pc.onnegotiationneeded = this.emit.bind(this, 'negotiationNeeded');
    this.pc.oniceconnectionstatechange = this.emit.bind(this, 'iceConnectionStateChange');
    this.pc.onsignalingstatechange = this.emit.bind(this, 'signalingStateChange');

    // handle incoming ice and data channel events
    this.pc.onaddstream = this._onAddStream.bind(this);
    this.pc.onicecandidate = this._onIce.bind(this);
    this.pc.ondatachannel = this._onDataChannel.bind(this);

    this.localDescription = {
        contents: []
    };
    this.remoteDescription = {
        contents: []
    };

    this.localStream = null;
    this.remoteStreams = [];

    this.config = {
        debug: false,
        ice: {},
        sid: '',
        isInitiator: true,
        sdpSessionID: Date.now(),
        useJingle: false
    };

    // apply our config
    for (item in config) {
        this.config[item] = config[item];
    }

    this._role = this.isInitiator ? 'initiator' : 'responder';

    if (this.config.debug) {
        this.on('*', function (eventName, event) {
            var logger = config.logger || console;
            logger.log('PeerConnection event:', arguments);
        });
    }
    this.hadLocalStunCandidate = false;
    this.hadRemoteStunCandidate = false;
    this.hadLocalRelayCandidate = false;
    this.hadRemoteRelayCandidate = false;

    this.hadLocalIPv6Candidate = false;
    this.hadRemoteIPv6Candidate = false;

    // keeping references for all our data channels
    // so they dont get garbage collected
    // can be removed once the following bugs have been fixed
    // https://crbug.com/405545 
    // https://bugzilla.mozilla.org/show_bug.cgi?id=964092
    // to be filed for opera
    this._remoteDataChannels = [];
    this._localDataChannels = [];
}

util.inherits(PeerConnection, WildEmitter);

Object.defineProperty(PeerConnection.prototype, 'signalingState', {
    get: function () {
        return this.pc.signalingState;
    }
});
Object.defineProperty(PeerConnection.prototype, 'iceConnectionState', {
    get: function () {
        return this.pc.iceConnectionState;
    }
});

// Add a stream to the peer connection object
PeerConnection.prototype.addStream = function (stream) {
    this.localStream = stream;
    this.pc.addStream(stream);
};

// helper function to check if a remote candidate is a stun/relay
// candidate or an ipv6 candidate
PeerConnection.prototype._checkLocalCandidate = function (candidate) {
    var cand = SJJ.toCandidateJSON(candidate);
    if (cand.type == 'srflx') {
        this.hadLocalStunCandidate = true;
    } else if (cand.type == 'relay') {
        this.hadLocalRelayCandidate = true;
    }
    if (cand.ip.indexOf(':') != -1) {
        this.hadLocalIPv6Candidate = true;
    }
};

// helper function to check if a remote candidate is a stun/relay
// candidate or an ipv6 candidate
PeerConnection.prototype._checkRemoteCandidate = function (candidate) {
    var cand = SJJ.toCandidateJSON(candidate);
    if (cand.type == 'srflx') {
        this.hadRemoteStunCandidate = true;
    } else if (cand.type == 'relay') {
        this.hadRemoteRelayCandidate = true;
    }
    if (cand.ip.indexOf(':') != -1) {
        this.hadRemoteIPv6Candidate = true;
    }
};


// Init and add ice candidate object with correct constructor
PeerConnection.prototype.processIce = function (update, cb) {
    cb = cb || function () {};
    var self = this;

    if (update.contents) {
        var contentNames = _.pluck(this.remoteDescription.contents, 'name');
        var contents = update.contents;

        contents.forEach(function (content) {
            var transport = content.transport || {};
            var candidates = transport.candidates || [];
            var mline = contentNames.indexOf(content.name);
            var mid = content.name;

            candidates.forEach(
                function (candidate) {
                var iceCandidate = SJJ.toCandidateSDP(candidate) + '\r\n';
                self.pc.addIceCandidate(
                    new webrtc.IceCandidate({
                        candidate: iceCandidate,
                        sdpMLineIndex: mline,
                        sdpMid: mid
                    }), function () {
                        // well, this success callback is pretty meaningless
                    },
                    function (err) {
                        self.emit('error', err);
                    }
                );
                self._checkRemoteCandidate(iceCandidate);
            });
        });
    } else {
        // working around https://code.google.com/p/webrtc/issues/detail?id=3669
        if (update.candidate.candidate.indexOf('a=') !== 0) {
            update.candidate.candidate = 'a=' + update.candidate.candidate;
        }

        self.pc.addIceCandidate(
            new webrtc.IceCandidate(update.candidate),
            function () { },
            function (err) {
                self.emit('error', err);
            }
        );
        self._checkRemoteCandidate(update.candidate.candidate);
    }
    cb();
};

// Generate and emit an offer with the given constraints
PeerConnection.prototype.offer = function (constraints, cb) {
    var self = this;
    var hasConstraints = arguments.length === 2;
    var mediaConstraints = hasConstraints ? constraints : {
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        };
    cb = hasConstraints ? cb : constraints;
    cb = cb || function () {};

    // Actually generate the offer
    this.pc.createOffer(
        function (offer) {
            self.pc.setLocalDescription(offer,
                function () {
                    var jingle;
                    var expandedOffer = {
                        type: 'offer',
                        sdp: offer.sdp
                    };
                    if (self.config.useJingle) {
                        jingle = SJJ.toSessionJSON(offer.sdp, {
                            role: self._role,
                            direction: 'outgoing'
                        });
                        jingle.sid = self.config.sid;
                        self.localDescription = jingle;

                        // Save ICE credentials
                        _.each(jingle.contents, function (content) {
                            var transport = content.transport || {};
                            if (transport.ufrag) {
                                self.config.ice[content.name] = {
                                    ufrag: transport.ufrag,
                                    pwd: transport.pwd
                                };
                            }
                        });

                        expandedOffer.jingle = jingle;
                    }
                    expandedOffer.sdp.split('\r\n').forEach(function (line) {
                        if (line.indexOf('a=candidate:') === 0) {
                            self._checkLocalCandidate(line);
                        }
                    });

                    self.emit('offer', expandedOffer);
                    cb(null, expandedOffer);
                },
                function (err) {
                    self.emit('error', err);
                    cb(err);
                }
            );
        },
        function (err) {
            self.emit('error', err);
            cb(err);
        },
        mediaConstraints
    );
};


// Process an incoming offer so that ICE may proceed before deciding
// to answer the request.
PeerConnection.prototype.handleOffer = function (offer, cb) {
    cb = cb || function () {};
    var self = this;
    offer.type = 'offer';
    if (offer.jingle) {
        if (this.enableChromeNativeSimulcast) {
            offer.jingle.contents.forEach(function (content) {
                if (content.name === 'video') {
                    content.description.googConferenceFlag = true;
                }
            });
        }
        /*
        if (this.enableMultiStreamHacks) {
            // add a mixed video stream as first stream
            offer.jingle.contents.forEach(function (content) {
                if (content.name === 'video') {
                    var sources = content.description.sources || [];
                    if (sources.length === 0 || sources[0].ssrc !== "3735928559") {
                        sources.unshift({
                            ssrc: "3735928559", // 0xdeadbeef
                            parameters: [
                                {
                                    key: "cname",
                                    value: "deadbeef"
                                },
                                {
                                    key: "msid",
                                    value: "mixyourfecintothis please"
                                }
                            ]
                        });
                        content.description.sources = sources;
                    }
                }
            });
        }
        */
        offer.sdp = SJJ.toSessionSDP(offer.jingle, {
            sid: self.config.sdpSessionID,
            role: self._role,
            direction: 'incoming'
        });
        self.remoteDescription = offer.jingle;
    }
    offer.sdp.split('\r\n').forEach(function (line) {
        if (line.indexOf('a=candidate:') === 0) {
            self._checkRemoteCandidate(line);
        }
    });
    self.pc.setRemoteDescription(new webrtc.SessionDescription(offer),
        function () {
            cb();
        },
        cb
    );
};

// Answer an offer with audio only
PeerConnection.prototype.answerAudioOnly = function (cb) {
    var mediaConstraints = {
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: false
            }
        };
    this._answer(mediaConstraints, cb);
};

// Answer an offer without offering to recieve
PeerConnection.prototype.answerBroadcastOnly = function (cb) {
    var mediaConstraints = {
            mandatory: {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            }
        };
    this._answer(mediaConstraints, cb);
};

// Answer an offer with given constraints default is audio/video
PeerConnection.prototype.answer = function (constraints, cb) {
    var self = this;
    var hasConstraints = arguments.length === 2;
    var callback = hasConstraints ? cb : constraints;
    var mediaConstraints = hasConstraints ? constraints : {
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        };

    this._answer(mediaConstraints, callback);
};

// Process an answer
PeerConnection.prototype.handleAnswer = function (answer, cb) {
    cb = cb || function () {};
    var self = this;
    if (answer.jingle) {
        answer.sdp = SJJ.toSessionSDP(answer.jingle, {
            sid: self.config.sdpSessionID,
            role: self._role,
            direction: 'incoming'
        });
        self.remoteDescription = answer.jingle;
    }
    answer.sdp.split('\r\n').forEach(function (line) {
        if (line.indexOf('a=candidate:') === 0) {
            self._checkRemoteCandidate(line);
        }
    });
    self.pc.setRemoteDescription(
        new webrtc.SessionDescription(answer),
        function () {
            cb(null);
        },
        cb
    );
};

// Close the peer connection
PeerConnection.prototype.close = function () {
    this.pc.close();

    this._localDataChannels = [];
    this._remoteDataChannels = [];

    this.emit('close');
};

// Internal code sharing for various types of answer methods
PeerConnection.prototype._answer = function (constraints, cb) {
    cb = cb || function () {};
    var self = this;
    if (!this.pc.remoteDescription) {
        // the old API is used, call handleOffer
        throw new Error('remoteDescription not set');
    }
    self.pc.createAnswer(
        function (answer) {
            var sim = [];
            var rtx = [];
            if (self.enableChromeNativeSimulcast) {
                // native simulcast part 1: add another SSRC
                answer.jingle = SJJ.toSessionJSON(answer.sdp, {
                    role: self._role,
                    direction: 'outoing'
                });
                if (answer.jingle.contents.length >= 2 && answer.jingle.contents[1].name === 'video') {
                    var hasSimgroup = false;
                    var groups = answer.jingle.contents[1].description.sourceGroups || [];
                    var hasSim = false;
                    groups.forEach(function (group) {
                        if (group.semantics == 'SIM') hasSim = true;
                    });
                    if (!hasSim &&
                        answer.jingle.contents[1].description.sources.length) {
                        var newssrc = JSON.parse(JSON.stringify(answer.jingle.contents[1].description.sources[0]));
                        newssrc.ssrc = '' + Math.floor(Math.random() * 0xffffffff); // FIXME: look for conflicts
                        answer.jingle.contents[1].description.sources.push(newssrc);

                        sim.push(answer.jingle.contents[1].description.sources[0].ssrc);
                        sim.push(newssrc.ssrc);
                        groups.push({
                            semantics: 'SIM',
                            sources: sim
                        });

                        // also create an RTX one for the SIM one
                        var rtxssrc = JSON.parse(JSON.stringify(newssrc));
                        rtxssrc.ssrc = '' + Math.floor(Math.random() * 0xffffffff); // FIXME: look for conflicts
                        answer.jingle.contents[1].description.sources.push(rtxssrc);
                        groups.push({
                            semantics: 'FID',
                            sources: [newssrc.ssrc, rtxssrc.ssrc]
                        });

                        answer.jingle.contents[1].description.sourceGroups = groups;
                        answer.sdp = SJJ.toSessionSDP(answer.jingle, {
                            sid: self.config.sdpSessionID,
                            role: self._role,
                            direction: 'outgoing'
                        });
                    }
                }
            }
            self.pc.setLocalDescription(answer,
                function () {
                    var expandedAnswer = {
                        type: 'answer',
                        sdp: answer.sdp
                    };
                    if (self.config.useJingle) {
                        var jingle = SJJ.toSessionJSON(answer.sdp, {
                            role: self._role,
                            direction: 'outgoing'
                        });
                        jingle.sid = self.config.sid;
                        self.localDescription = jingle;
                        expandedAnswer.jingle = jingle;
                    }
                    if (self.enableChromeNativeSimulcast) {
                        // native simulcast part 2: 
                        // signal multiple tracks to the receiver
                        // for anything in the SIM group
                        if (!expandedAnswer.jingle) {
                            expandedAnswer.jingle = SJJ.toSessionJSON(answer.sdp, {
                                role: self._role,
                                direction: 'outgoing'
                            });
                        }
                        var groups = expandedAnswer.jingle.contents[1].description.sourceGroups || [];
                        expandedAnswer.jingle.contents[1].description.sources.forEach(function (source, idx) {
                            // the floor idx/2 is a hack that relies on a particular order
                            // of groups, alternating between sim and rtx
                            source.parameters = source.parameters.map(function (parameter) {
                                if (parameter.key === 'msid') {
                                    parameter.value += '-' + Math.floor(idx / 2);
                                }
                                return parameter;
                            });
                        });
                        expandedAnswer.sdp = SJJ.toSessionSDP(expandedAnswer.jingle, {
                            sid: self.sdpSessionID,
                            role: self._role,
                            direction: 'outgoing'
                        });
                    }
                    expandedAnswer.sdp.split('\r\n').forEach(function (line) {
                        if (line.indexOf('a=candidate:') === 0) {
                            self._checkLocalCandidate(line);
                        }
                    });
                    self.emit('answer', expandedAnswer);
                    cb(null, expandedAnswer);
                },
                function (err) {
                    self.emit('error', err);
                    cb(err);
                }
            );
        },
        function (err) {
            self.emit('error', err);
            cb(err);
        },
        constraints
    );
};

// Internal method for emitting ice candidates on our peer object
PeerConnection.prototype._onIce = function (event) {
    var self = this;
    if (event.candidate) {
        var ice = event.candidate;

        var expandedCandidate = {
            candidate: event.candidate
        };

        var cand = SJJ.toCandidateJSON(ice.candidate);
        if (self.config.useJingle) {
            if (!ice.sdpMid) { // firefox doesn't set this
                ice.sdpMid = self.localDescription.contents[ice.sdpMLineIndex].name;
            }
            if (!self.config.ice[ice.sdpMid]) {
                var jingle = SJJ.toSessionJSON(self.pc.localDescription.sdp, {
                    role: self._role,
                    direction: 'incoming'
                });
                _.each(jingle.contents, function (content) {
                    var transport = content.transport || {};
                    if (transport.ufrag) {
                        self.config.ice[content.name] = {
                            ufrag: transport.ufrag,
                            pwd: transport.pwd
                        };
                    }
                });
            }
            expandedCandidate.jingle = {
                contents: [{
                    name: ice.sdpMid,
                    creator: self._role,
                    transport: {
                        transType: 'iceUdp',
                        ufrag: self.config.ice[ice.sdpMid].ufrag,
                        pwd: self.config.ice[ice.sdpMid].pwd,
                        candidates: [
                            cand
                        ]
                    }
                }]
            };
        }
        this._checkLocalCandidate(ice.candidate);
        this.emit('ice', expandedCandidate);
    } else {
        this.emit('endOfCandidates');
    }
};

// Internal method for processing a new data channel being added by the
// other peer.
PeerConnection.prototype._onDataChannel = function (event) {
    // make sure we keep a reference so this doesn't get garbage collected
    var channel = event.channel;
    this._remoteDataChannels.push(channel);

    this.emit('addChannel', channel);
};

// Internal handling of adding stream
PeerConnection.prototype._onAddStream = function (event) {
    this.remoteStreams.push(event.stream);
    this.emit('addStream', event);
};

// Create a data channel spec reference:
// http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCDataChannelInit
PeerConnection.prototype.createDataChannel = function (name, opts) {
    var channel = this.pc.createDataChannel(name, opts);

    // make sure we keep a reference so this doesn't get garbage collected
    this._localDataChannels.push(channel);

    return channel;
};

// a wrapper around getStats which hides the differences (where possible)
PeerConnection.prototype.getStats = function (cb) {
    if (webrtc.prefix === 'moz') {
        this.pc.getStats(
            function (res) {
                var items = [];
                for (var result in res) {
                    if (typeof res[result] === 'object') {
                        items.push(res[result]);
                    }
                }
                cb(null, items);
            },
            cb
        );
    } else {
        this.pc.getStats(function (res) {
            var items = [];
            res.result().forEach(function (result) {
                var item = {};
                result.names().forEach(function (name) {
                    item[name] = result.stat(name);
                });
                item.id = result.id;
                item.type = result.type;
                item.timestamp = result.timestamp;
                items.push(item);
            });
            cb(null, items);
        });
    }
};

module.exports = PeerConnection;

},{"sdp-jingle-json":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/sdp-jingle-json/index.js","traceablepeerconnection":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/traceablepeerconnection/index.js","underscore":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/node_modules/underscore/underscore.js","util":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/util.js","webrtcsupport":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js","wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/peer.js":[function(require,module,exports){
var util = require('util');
var webrtc = require('webrtcsupport');
var PeerConnection = require('rtcpeerconnection');
var WildEmitter = require('wildemitter');
var FileTransfer = require('filetransfer');

// the inband-v1 protocol is sending metadata inband in a serialized JSON object
// followed by the actual data. Receiver closes the datachannel upon completion
var INBAND_FILETRANSFER_V1 = 'https://simplewebrtc.com/protocol/filetransfer#inband-v1';

function Peer(options) {
    var self = this;

    this.id = options.id;
    this.parent = options.parent;
    this.type = options.type || 'video';
    this.oneway = options.oneway || false;
    this.sharemyscreen = options.sharemyscreen || false;
    this.browserPrefix = options.prefix;
    this.stream = options.stream;
    this.enableDataChannels = options.enableDataChannels === undefined ? this.parent.config.enableDataChannels : options.enableDataChannels;
    this.receiveMedia = options.receiveMedia || this.parent.config.receiveMedia;
    this.channels = {};
    this.sid = options.sid || Date.now().toString();
    // Create an RTCPeerConnection via the polyfill
    this.pc = new PeerConnection(this.parent.config.peerConnectionConfig, this.parent.config.peerConnectionConstraints);
    this.pc.on('ice', this.onIceCandidate.bind(this));
    this.pc.on('offer', function (offer) {
        self.send('offer', offer);
    });
    this.pc.on('answer', function (offer) {
        self.send('answer', offer);
    });
    this.pc.on('addStream', this.handleRemoteStreamAdded.bind(this));
    this.pc.on('addChannel', this.handleDataChannelAdded.bind(this));
    this.pc.on('removeStream', this.handleStreamRemoved.bind(this));
    // Just fire negotiation needed events for now
    // When browser re-negotiation handling seems to work
    // we can use this as the trigger for starting the offer/answer process
    // automatically. We'll just leave it be for now while this stabalizes.
    this.pc.on('negotiationNeeded', this.emit.bind(this, 'negotiationNeeded'));
    this.pc.on('iceConnectionStateChange', this.emit.bind(this, 'iceConnectionStateChange'));
    this.pc.on('iceConnectionStateChange', function () {
        switch (self.pc.iceConnectionState) {
        case 'failed':
            // currently, in chrome only the initiator goes to failed
            // so we need to signal this to the peer
            if (self.pc.pc.peerconnection.localDescription.type === 'offer') {
                self.parent.emit('iceFailed', self);
                self.send('connectivityError');
            }
            break;
        }
    });
    this.pc.on('signalingStateChange', this.emit.bind(this, 'signalingStateChange'));
    this.logger = this.parent.logger;

    // handle screensharing/broadcast mode
    if (options.type === 'screen') {
        if (this.parent.localScreen && this.sharemyscreen) {
            this.logger.log('adding local screen stream to peer connection');
            this.pc.addStream(this.parent.localScreen);
            this.broadcaster = options.broadcaster;
        }
    } else {
        this.parent.localStreams.forEach(function (stream) {
            self.pc.addStream(stream);
        });
    }

    // call emitter constructor
    WildEmitter.call(this);

    this.on('channelOpen', function (channel) {
        if (channel.protocol === INBAND_FILETRANSFER_V1) {
            channel.onmessage = function (event) {
                var metadata = JSON.parse(event.data);
                var receiver = new FileTransfer.Receiver();
                receiver.receive(metadata, channel);
                self.emit('fileTransfer', metadata, receiver);
                receiver.on('receivedFile', function (file, metadata) {
                    receiver.channel.close();
                });
            };
        }
    });

    // proxy events to parent
    this.on('*', function () {
        self.parent.emit.apply(self.parent, arguments);
    });
}

util.inherits(Peer, WildEmitter);

Peer.prototype.handleMessage = function (message) {
    var self = this;

    this.logger.log('getting', message.type, message);

    if (message.prefix) this.browserPrefix = message.prefix;

    if (message.type === 'offer') {
        // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1064247
        message.payload.sdp = message.payload.sdp.replace('a=fmtp:0 profile-level-id=0x42e00c;packetization-mode=1\r\n', '');
        this.pc.handleOffer(message.payload, function (err) {
            if (err) {
                return;
            }
            // auto-accept
            self.pc.answer(self.receiveMedia, function (err, sessionDescription) {
                //self.send('answer', sessionDescription);
            });
        });
    } else if (message.type === 'answer') {
        this.pc.handleAnswer(message.payload);
    } else if (message.type === 'candidate') {
        this.pc.processIce(message.payload);
    } else if (message.type === 'connectivityError') {
        this.parent.emit('connectivityError', self);
    } else if (message.type === 'mute') {
        this.parent.emit('mute', {id: message.from, name: message.payload.name});
    } else if (message.type === 'unmute') {
        this.parent.emit('unmute', {id: message.from, name: message.payload.name});
    }
};

// send via signalling channel
Peer.prototype.send = function (messageType, payload) {
    var message = {
        to: this.id,
        sid: this.sid,
        broadcaster: this.broadcaster,
        roomType: this.type,
        type: messageType,
        payload: payload,
        prefix: webrtc.prefix
    };
    this.logger.log('sending', messageType, message);
    this.parent.emit('message', message);
};

// send via data channel
// returns true when message was sent and false if channel is not open
Peer.prototype.sendDirectly = function (channel, messageType, payload) {
    var message = {
        type: messageType,
        payload: payload
    };
    this.logger.log('sending via datachannel', channel, messageType, message);
    var dc = this.getDataChannel(channel);
    if (dc.readyState != 'open') return false;
    dc.send(JSON.stringify(message));
    return true;
};

// Internal method registering handlers for a data channel and emitting events on the peer
Peer.prototype._observeDataChannel = function (channel) {
    var self = this;
    channel.onclose = this.emit.bind(this, 'channelClose', channel);
    channel.onerror = this.emit.bind(this, 'channelError', channel);
    channel.onmessage = function (event) {
        self.emit('channelMessage', self, channel.label, JSON.parse(event.data), channel, event);
    };
    channel.onopen = this.emit.bind(this, 'channelOpen', channel);
};

// Fetch or create a data channel by the given name
Peer.prototype.getDataChannel = function (name, opts) {
    if (!webrtc.supportDataChannel) return this.emit('error', new Error('createDataChannel not supported'));
    var channel = this.channels[name];
    opts || (opts = {});
    if (channel) return channel;
    // if we don't have one by this label, create it
    channel = this.channels[name] = this.pc.createDataChannel(name, opts);
    this._observeDataChannel(channel);
    return channel;
};

Peer.prototype.onIceCandidate = function (candidate) {
    if (this.closed) return;
    if (candidate) {
        this.send('candidate', candidate);
    } else {
        this.logger.log("End of candidates.");
    }
};

Peer.prototype.start = function () {
    var self = this;

    // well, the webrtc api requires that we either
    // a) create a datachannel a priori
    // b) do a renegotiation later to add the SCTP m-line
    // Let's do (a) first...
    if (this.enableDataChannels) {
        this.getDataChannel('simplewebrtc');
    }

    this.pc.offer(this.receiveMedia, function (err, sessionDescription) {
        //self.send('offer', sessionDescription);
    });
};

Peer.prototype.icerestart = function () {
    var constraints = this.receiveMedia;
    constraints.mandatory.IceRestart = true;
    this.pc.offer(constraints, function (err, success) { });
};

Peer.prototype.end = function () {
    if (this.closed) return;
    this.pc.close();
    this.handleStreamRemoved();
};

Peer.prototype.handleRemoteStreamAdded = function (event) {
    var self = this;
    if (this.stream) {
        this.logger.warn('Already have a remote stream');
    } else {
        this.stream = event.stream;
        // FIXME: addEventListener('ended', ...) would be nicer
        // but does not work in firefox 
        this.stream.onended = function () {
            self.end();
        };
        this.parent.emit('peerStreamAdded', this);
    }
};

Peer.prototype.handleStreamRemoved = function () {
    this.parent.peers.splice(this.parent.peers.indexOf(this), 1);
    this.closed = true;
    this.parent.emit('peerStreamRemoved', this);
};

Peer.prototype.handleDataChannelAdded = function (channel) {
    this.channels[channel.label] = channel;
    this._observeDataChannel(channel);
};

Peer.prototype.sendFile = function (file) {
    var sender = new FileTransfer.Sender();
    var dc = this.getDataChannel('filetransfer' + (new Date()).getTime(), {
        protocol: INBAND_FILETRANSFER_V1
    });
    // override onopen
    dc.onopen = function () {
        dc.send(JSON.stringify({
            size: file.size,
            name: file.name
        }));
        sender.send(file, dc);
    };
    // override onclose
    dc.onclose = function () {
        console.log('sender received transfer');
        sender.emit('complete');
    };
    return sender;
};

module.exports = Peer;

},{"filetransfer":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/filetransfer/filetransfer.js","rtcpeerconnection":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/rtcpeerconnection/rtcpeerconnection.js","util":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/util.js","webrtcsupport":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js","wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/webrtc.js":[function(require,module,exports){
var util = require('util');
var webrtc = require('webrtcsupport');
var WildEmitter = require('wildemitter');
var mockconsole = require('mockconsole');
var localMedia = require('localmedia');
var Peer = require('./peer');


function WebRTC(opts) {
    var self = this;
    var options = opts || {};
    var config = this.config = {
            debug: false,
            // makes the entire PC config overridable
            peerConnectionConfig: {
                iceServers: [{"url": "stun:stun.l.google.com:19302"}]
            },
            peerConnectionConstraints: {
                optional: [
                    {DtlsSrtpKeyAgreement: true}
                ]
            },
            receiveMedia: {
                mandatory: {
                    OfferToReceiveAudio: true,
                    OfferToReceiveVideo: true
                }
            },
            enableDataChannels: true
        };
    var item;

    // expose screensharing check
    this.screenSharingSupport = webrtc.screenSharing;

    // We also allow a 'logger' option. It can be any object that implements
    // log, warn, and error methods.
    // We log nothing by default, following "the rule of silence":
    // http://www.linfo.org/rule_of_silence.html
    this.logger = function () {
        // we assume that if you're in debug mode and you didn't
        // pass in a logger, you actually want to log as much as
        // possible.
        if (opts.debug) {
            return opts.logger || console;
        } else {
        // or we'll use your logger which should have its own logic
        // for output. Or we'll return the no-op.
            return opts.logger || mockconsole;
        }
    }();

    // set options
    for (item in options) {
        this.config[item] = options[item];
    }

    // check for support
    if (!webrtc.support) {
        this.logger.error('Your browser doesn\'t seem to support WebRTC');
    }

    // where we'll store our peer connections
    this.peers = [];

    // call localMedia constructor
    localMedia.call(this, this.config);

    this.on('speaking', function () {
        if (!self.hardMuted) {
            // FIXME: should use sendDirectlyToAll, but currently has different semantics wrt payload
            self.peers.forEach(function (peer) {
                if (peer.enableDataChannels) {
                    var dc = peer.getDataChannel('hark');
                    if (dc.readyState != 'open') return;
                    dc.send(JSON.stringify({type: 'speaking'}));
                }
            });
        }
    });
    this.on('stoppedSpeaking', function () {
        if (!self.hardMuted) {
            // FIXME: should use sendDirectlyToAll, but currently has different semantics wrt payload
            self.peers.forEach(function (peer) {
                if (peer.enableDataChannels) {
                    var dc = peer.getDataChannel('hark');
                    if (dc.readyState != 'open') return;
                    dc.send(JSON.stringify({type: 'stoppedSpeaking'}));
                }
            });
        }
    });
    this.on('volumeChange', function (volume, treshold) {
        if (!self.hardMuted) {
            // FIXME: should use sendDirectlyToAll, but currently has different semantics wrt payload
            self.peers.forEach(function (peer) {
                if (peer.enableDataChannels) {
                    var dc = peer.getDataChannel('hark');
                    if (dc.readyState != 'open') return;
                    dc.send(JSON.stringify({type: 'volume', volume: volume }));
                }
            });
        }
    });

    // log events in debug mode
    if (this.config.debug) {
        this.on('*', function (event, val1, val2) {
            var logger;
            // if you didn't pass in a logger and you explicitly turning on debug
            // we're just going to assume you're wanting log output with console
            if (self.config.logger === mockconsole) {
                logger = console;
            } else {
                logger = self.logger;
            }
            logger.log('event:', event, val1, val2);
        });
    }
}

util.inherits(WebRTC, localMedia);

WebRTC.prototype.createPeer = function (opts) {
    var peer;
    opts.parent = this;
    peer = new Peer(opts);
    this.peers.push(peer);
    return peer;
};

// removes peers
WebRTC.prototype.removePeers = function (id, type) {
    this.getPeers(id, type).forEach(function (peer) {
        peer.end();
    });
};

// fetches all Peer objects by session id and/or type
WebRTC.prototype.getPeers = function (sessionId, type) {
    return this.peers.filter(function (peer) {
        return (!sessionId || peer.id === sessionId) && (!type || peer.type === type);
    });
};

// sends message to all
WebRTC.prototype.sendToAll = function (message, payload) {
    this.peers.forEach(function (peer) {
        peer.send(message, payload);
    });
};

// sends message to all using a datachannel
// only sends to anyone who has an open datachannel
WebRTC.prototype.sendDirectlyToAll = function (channel, message, payload) {
    this.peers.forEach(function (peer) {
        if (peer.enableDataChannels) {
            peer.sendDirectly(channel, message, payload);
        }
    });
};

module.exports = WebRTC;

},{"./peer":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/peer.js","localmedia":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/node_modules/localmedia/index.js","mockconsole":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/mockconsole/mockconsole.js","util":"/Users/jlowe/dev/apps/peer-connect/node_modules/browserify/node_modules/util/util.js","webrtcsupport":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js","wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js":[function(require,module,exports){
// created by @HenrikJoreteg
var prefix;

if (window.mozRTCPeerConnection || navigator.mozGetUserMedia) {
    prefix = 'moz';
} else if (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) {
    prefix = 'webkit';
}

var PC = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
var MediaStream = window.webkitMediaStream || window.MediaStream;
var screenSharing = window.location.protocol === 'https:' &&
    ((window.navigator.userAgent.match('Chrome') && parseInt(window.navigator.userAgent.match(/Chrome\/(.*) /)[1], 10) >= 26) ||
     (window.navigator.userAgent.match('Firefox') && parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10) >= 33));
var AudioContext = window.AudioContext || window.webkitAudioContext;
var supportVp8 = document.createElement('video').canPlayType('video/webm; codecs="vp8", vorbis') === "probably";
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

// export support flags and constructors.prototype && PC
module.exports = {
    prefix: prefix,
    support: !!PC && supportVp8 && !!getUserMedia,
    // new support style
    supportRTCPeerConnection: !!PC,
    supportVp8: supportVp8,
    supportGetUserMedia: !!getUserMedia,
    supportDataChannel: !!(PC && PC.prototype && PC.prototype.createDataChannel),
    supportWebAudio: !!(AudioContext && AudioContext.prototype.createMediaStreamSource),
    supportMediaStream: !!(MediaStream && MediaStream.prototype.removeTrack),
    supportScreenSharing: !!screenSharing,
    // old deprecated style. Dont use this anymore
    dataChannel: !!(PC && PC.prototype && PC.prototype.createDataChannel),
    webAudio: !!(AudioContext && AudioContext.prototype.createMediaStreamSource),
    mediaStream: !!(MediaStream && MediaStream.prototype.removeTrack),
    screenSharing: !!screenSharing,
    // constructors
    AudioContext: AudioContext,
    PeerConnection: PC,
    SessionDescription: SessionDescription,
    IceCandidate: IceCandidate,
    MediaStream: MediaStream,
    getUserMedia: getUserMedia
};

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js":[function(require,module,exports){
/*
WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based 
on @visionmedia's Emitter from UI Kit.

Why? I wanted it standalone.

I also wanted support for wildcard emitters like this:

emitter.on('*', function (eventName, other, event, payloads) {
    
});

emitter.on('somenamespace*', function (eventName, payloads) {
    
});

Please note that callbacks triggered by wildcard registered events also get 
the event name as the first argument.
*/
module.exports = WildEmitter;

function WildEmitter() {
    this.callbacks = {};
}

// Listen on the given `event` with `fn`. Store a group name if present.
WildEmitter.prototype.on = function (event, groupName, fn) {
    var hasGroup = (arguments.length === 3),
        group = hasGroup ? arguments[1] : undefined,
        func = hasGroup ? arguments[2] : arguments[1];
    func._groupName = group;
    (this.callbacks[event] = this.callbacks[event] || []).push(func);
    return this;
};

// Adds an `event` listener that will be invoked a single
// time then automatically removed.
WildEmitter.prototype.once = function (event, groupName, fn) {
    var self = this,
        hasGroup = (arguments.length === 3),
        group = hasGroup ? arguments[1] : undefined,
        func = hasGroup ? arguments[2] : arguments[1];
    function on() {
        self.off(event, on);
        func.apply(this, arguments);
    }
    this.on(event, group, on);
    return this;
};

// Unbinds an entire group
WildEmitter.prototype.releaseGroup = function (groupName) {
    var item, i, len, handlers;
    for (item in this.callbacks) {
        handlers = this.callbacks[item];
        for (i = 0, len = handlers.length; i < len; i++) {
            if (handlers[i]._groupName === groupName) {
                //console.log('removing');
                // remove it and shorten the array we're looping through
                handlers.splice(i, 1);
                i--;
                len--;
            }
        }
    }
    return this;
};

// Remove the given callback for `event` or all
// registered callbacks.
WildEmitter.prototype.off = function (event, fn) {
    var callbacks = this.callbacks[event],
        i;

    if (!callbacks) return this;

    // remove all handlers
    if (arguments.length === 1) {
        delete this.callbacks[event];
        return this;
    }

    // remove specific handler
    i = callbacks.indexOf(fn);
    callbacks.splice(i, 1);
    return this;
};

/// Emit `event` with the given args.
// also calls any `*` handlers
WildEmitter.prototype.emit = function (event) {
    var args = [].slice.call(arguments, 1),
        callbacks = this.callbacks[event],
        specialCallbacks = this.getWildcardCallbacks(event),
        i,
        len,
        item,
        listeners;

    if (callbacks) {
        listeners = callbacks.slice();
        for (i = 0, len = listeners.length; i < len; ++i) {
            if (listeners[i]) {
                listeners[i].apply(this, args);
            } else {
                break;
            }
        }
    }

    if (specialCallbacks) {
        len = specialCallbacks.length;
        listeners = specialCallbacks.slice();
        for (i = 0, len = listeners.length; i < len; ++i) {
            if (listeners[i]) {
                listeners[i].apply(this, [event].concat(args));
            } else {
                break;
            }
        }
    }

    return this;
};

// Helper for for finding special wildcard event handlers that match the event
WildEmitter.prototype.getWildcardCallbacks = function (eventName) {
    var item,
        split,
        result = [];

    for (item in this.callbacks) {
        split = item.split('*');
        if (item === '*' || (split.length === 2 && eventName.slice(0, split[0].length) === split[0])) {
            result = result.concat(this.callbacks[item]);
        }
    }
    return result;
};

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/simplewebrtc.js":[function(require,module,exports){
var WebRTC = require('webrtc');
var WildEmitter = require('wildemitter');
var webrtcSupport = require('webrtcsupport');
var attachMediaStream = require('attachmediastream');
var mockconsole = require('mockconsole');
var io = require('socket.io-client');


function SimpleWebRTC(opts) {
    var self = this;
    var options = opts || {};
    var config = this.config = {
            url: 'https://signaling.simplewebrtc.com',
            socketio: {/* 'force new connection':true*/},
            debug: false,
            localVideoEl: '',
            remoteVideosEl: '',
            enableDataChannels: true,
            autoRequestMedia: false,
            autoRemoveVideos: true,
            adjustPeerVolume: true,
            peerVolumeWhenSpeaking: 0.25,
            media: {
                video: true,
                audio: true
            },
            receiveMedia: { // FIXME: remove old chrome <= 37 constraints format
                mandatory: {
                    OfferToReceiveAudio: true,
                    OfferToReceiveVideo: true
                }
            },
            localVideo: {
                autoplay: true,
                mirror: true,
                muted: true
            }
        };
    var item, connection;

    // We also allow a 'logger' option. It can be any object that implements
    // log, warn, and error methods.
    // We log nothing by default, following "the rule of silence":
    // http://www.linfo.org/rule_of_silence.html
    this.logger = function () {
        // we assume that if you're in debug mode and you didn't
        // pass in a logger, you actually want to log as much as
        // possible.
        if (opts.debug) {
            return opts.logger || console;
        } else {
        // or we'll use your logger which should have its own logic
        // for output. Or we'll return the no-op.
            return opts.logger || mockconsole;
        }
    }();

    // set our config from options
    for (item in options) {
        this.config[item] = options[item];
    }

    // attach detected support for convenience
    this.capabilities = webrtcSupport;

    // call WildEmitter constructor
    WildEmitter.call(this);

    // our socket.io connection
    connection = this.connection = io.connect(this.config.url, this.config.socketio);

    connection.on('connect', function () {
        self.emit('connectionReady', connection.socket.sessionid);
        self.sessionReady = true;
        self.testReadiness();
    });

    connection.on('message', function (message) {
        var peers = self.webrtc.getPeers(message.from, message.roomType);
        var peer;

        if (message.type === 'offer') {
            if (peers.length) {
                peers.forEach(function (p) {
                    if (p.sid == message.sid) peer = p;
                });
                //if (!peer) peer = peers[0]; // fallback for old protocol versions
            }
            if (!peer) {
                peer = self.webrtc.createPeer({
                    id: message.from,
                    sid: message.sid,
                    type: message.roomType,
                    enableDataChannels: self.config.enableDataChannels && message.roomType !== 'screen',
                    sharemyscreen: message.roomType === 'screen' && !message.broadcaster,
                    broadcaster: message.roomType === 'screen' && !message.broadcaster ? self.connection.socket.sessionid : null
                });
                self.emit('createdPeer', peer);
            }
            peer.handleMessage(message);
        } else if (peers.length) {
            peers.forEach(function (peer) {
                if (message.sid) {
                    if (peer.sid === message.sid) {
                        peer.handleMessage(message);
                    }
                } else {
                    peer.handleMessage(message);
                }
            });
        }
    });

    connection.on('remove', function (room) {
        if (room.id !== self.connection.socket.sessionid) {
            self.webrtc.removePeers(room.id, room.type);
        }
    });

    // instantiate our main WebRTC helper
    // using same logger from logic here
    opts.logger = this.logger;
    opts.debug = false;
    this.webrtc = new WebRTC(opts);

    // attach a few methods from underlying lib to simple.
    ['mute', 'unmute', 'pauseVideo', 'resumeVideo', 'pause', 'resume', 'sendToAll', 'sendDirectlyToAll'].forEach(function (method) {
        self[method] = self.webrtc[method].bind(self.webrtc);
    });

    // proxy events from WebRTC
    this.webrtc.on('*', function () {
        self.emit.apply(self, arguments);
    });

    // log all events in debug mode
    if (config.debug) {
        this.on('*', this.logger.log.bind(this.logger, 'SimpleWebRTC event:'));
    }

    // check for readiness
    this.webrtc.on('localStream', function () {
        self.testReadiness();
    });

    this.webrtc.on('message', function (payload) {
        self.connection.emit('message', payload);
    });

    this.webrtc.on('peerStreamAdded', this.handlePeerStreamAdded.bind(this));
    this.webrtc.on('peerStreamRemoved', this.handlePeerStreamRemoved.bind(this));

    // echo cancellation attempts
    if (this.config.adjustPeerVolume) {
        this.webrtc.on('speaking', this.setVolumeForAll.bind(this, this.config.peerVolumeWhenSpeaking));
        this.webrtc.on('stoppedSpeaking', this.setVolumeForAll.bind(this, 1));
    }

    connection.on('stunservers', function (args) {
        // resets/overrides the config
        self.webrtc.config.peerConnectionConfig.iceServers = args;
        self.emit('stunservers', args);
    });
    connection.on('turnservers', function (args) {
        // appends to the config
        self.webrtc.config.peerConnectionConfig.iceServers = self.webrtc.config.peerConnectionConfig.iceServers.concat(args);
        self.emit('turnservers', args);
    });

    this.webrtc.on('iceFailed', function (peer) {
        // local ice failure
    });
    this.webrtc.on('connectivityError', function (peer) {
        // remote ice failure
    });


    // sending mute/unmute to all peers
    this.webrtc.on('audioOn', function () {
        self.webrtc.sendToAll('unmute', {name: 'audio'});
    });
    this.webrtc.on('audioOff', function () {
        self.webrtc.sendToAll('mute', {name: 'audio'});
    });
    this.webrtc.on('videoOn', function () {
        self.webrtc.sendToAll('unmute', {name: 'video'});
    });
    this.webrtc.on('videoOff', function () {
        self.webrtc.sendToAll('mute', {name: 'video'});
    });

    // screensharing events
    this.webrtc.on('localScreen', function (stream) {
        var item,
            el = document.createElement('video'),
            container = self.getRemoteVideoContainer();

        el.oncontextmenu = function () { return false; };
        el.id = 'localScreen';
        attachMediaStream(stream, el);
        if (container) {
            container.appendChild(el);
        }

        self.emit('localScreenAdded', el);
        self.connection.emit('shareScreen');

        self.webrtc.peers.forEach(function (existingPeer) {
            var peer;
            if (existingPeer.type === 'video') {
                peer = self.webrtc.createPeer({
                    id: existingPeer.id,
                    type: 'screen',
                    sharemyscreen: true,
                    enableDataChannels: false,
                    receiveMedia: {
                        mandatory: {
                            OfferToReceiveAudio: false,
                            OfferToReceiveVideo: false
                        }
                    },
                    broadcaster: self.connection.socket.sessionid,
                });
                self.emit('createdPeer', peer);
                peer.start();
            }
        });
    });
    this.webrtc.on('localScreenStopped', function (stream) {
        self.stopScreenShare();
        /*
        self.connection.emit('unshareScreen');
        self.webrtc.peers.forEach(function (peer) {
            if (peer.sharemyscreen) {
                peer.end();
            }
        });
        */
    });

    this.webrtc.on('channelMessage', function (peer, label, data) {
        if (data.type == 'volume') {
            self.emit('remoteVolumeChange', peer, data.volume);
        }
    });

    if (this.config.autoRequestMedia) this.startLocalVideo();
}


SimpleWebRTC.prototype = Object.create(WildEmitter.prototype, {
    constructor: {
        value: SimpleWebRTC
    }
});

SimpleWebRTC.prototype.leaveRoom = function () {
    if (this.roomName) {
        this.connection.emit('leave');
        this.webrtc.peers.forEach(function (peer) {
            peer.end();
        });
        if (this.getLocalScreen()) {
            this.stopScreenShare();
        }
        this.emit('leftRoom', this.roomName);
        this.roomName = undefined;
    }
};

SimpleWebRTC.prototype.disconnect = function () {
    this.connection.disconnect();
    delete this.connection;
};

SimpleWebRTC.prototype.handlePeerStreamAdded = function (peer) {
    var self = this;
    var container = this.getRemoteVideoContainer();
    var video = attachMediaStream(peer.stream);

    // store video element as part of peer for easy removal
    peer.videoEl = video;
    video.id = this.getDomId(peer);

    if (container) container.appendChild(video);

    this.emit('videoAdded', video, peer);

    // send our mute status to new peer if we're muted
    // currently called with a small delay because it arrives before
    // the video element is created otherwise (which happens after
    // the async setRemoteDescription-createAnswer)
    window.setTimeout(function () {
        if (!self.webrtc.isAudioEnabled()) {
            peer.send('mute', {name: 'audio'});
        }
        if (!self.webrtc.isVideoEnabled()) {
            peer.send('mute', {name: 'video'});
        }
    }, 250);
};

SimpleWebRTC.prototype.handlePeerStreamRemoved = function (peer) {
    var container = this.getRemoteVideoContainer();
    var videoEl = peer.videoEl;
    if (this.config.autoRemoveVideos && container && videoEl) {
        container.removeChild(videoEl);
    }
    if (videoEl) this.emit('videoRemoved', videoEl, peer);
};

SimpleWebRTC.prototype.getDomId = function (peer) {
    return [peer.id, peer.type, peer.broadcaster ? 'broadcasting' : 'incoming'].join('_');
};

// set volume on video tag for all peers takse a value between 0 and 1
SimpleWebRTC.prototype.setVolumeForAll = function (volume) {
    this.webrtc.peers.forEach(function (peer) {
        if (peer.videoEl) peer.videoEl.volume = volume;
    });
};

SimpleWebRTC.prototype.joinRoom = function (name, cb) {
    var self = this;
    this.roomName = name;
    this.connection.emit('join', name, function (err, roomDescription) {
        if (err) {
            self.emit('error', err);
        } else {
            var id,
                client,
                type,
                peer;
            for (id in roomDescription.clients) {
                client = roomDescription.clients[id];
                for (type in client) {
                    if (client[type]) {
                        peer = self.webrtc.createPeer({
                            id: id,
                            type: type,
                            enableDataChannels: self.config.enableDataChannels && type !== 'screen',
                            receiveMedia: {
                                mandatory: {
                                    OfferToReceiveAudio: type !== 'screen' && self.config.receiveMedia.mandatory.OfferToReceiveAudio,
                                    OfferToReceiveVideo: self.config.receiveMedia.mandatory.OfferToReceiveVideo
                                }
                            }
                        });
                        self.emit('createdPeer', peer);
                        peer.start();
                    }
                }
            }
        }

        if (cb) cb(err, roomDescription);
        self.emit('joinedRoom', name);
    });
};

SimpleWebRTC.prototype.getEl = function (idOrEl) {
    if (typeof idOrEl === 'string') {
        return document.getElementById(idOrEl);
    } else {
        return idOrEl;
    }
};

SimpleWebRTC.prototype.startLocalVideo = function () {
    var self = this;
    this.webrtc.startLocalMedia(this.config.media, function (err, stream) {
        if (err) {
            self.emit('localMediaError', err);
        } else {
            attachMediaStream(stream, self.getLocalVideoContainer(), self.config.localVideo);
        }
    });
};

SimpleWebRTC.prototype.stopLocalVideo = function () {
    this.webrtc.stopLocalMedia();
};

// this accepts either element ID or element
// and either the video tag itself or a container
// that will be used to put the video tag into.
SimpleWebRTC.prototype.getLocalVideoContainer = function () {
    var el = this.getEl(this.config.localVideoEl);
    if (el && el.tagName === 'VIDEO') {
        el.oncontextmenu = function () { return false; };
        return el;
    } else if (el) {
        var video = document.createElement('video');
        video.oncontextmenu = function () { return false; };
        el.appendChild(video);
        return video;
    } else {
        return;
    }
};

SimpleWebRTC.prototype.getRemoteVideoContainer = function () {
    return this.getEl(this.config.remoteVideosEl);
};

SimpleWebRTC.prototype.shareScreen = function (cb) {
    this.webrtc.startScreenShare(cb);
};

SimpleWebRTC.prototype.getLocalScreen = function () {
    return this.webrtc.localScreen;
};

SimpleWebRTC.prototype.stopScreenShare = function () {
    this.connection.emit('unshareScreen');
    var videoEl = document.getElementById('localScreen');
    var container = this.getRemoteVideoContainer();
    var stream = this.getLocalScreen();

    if (this.config.autoRemoveVideos && container && videoEl) {
        container.removeChild(videoEl);
    }

    // a hack to emit the event the removes the video
    // element that we want
    if (videoEl) this.emit('videoRemoved', videoEl);
    if (stream) stream.stop();
    this.webrtc.peers.forEach(function (peer) {
        if (peer.broadcaster) {
            peer.end();
        }
    });
    //delete this.webrtc.localScreen;
};

SimpleWebRTC.prototype.testReadiness = function () {
    var self = this;
    if (this.webrtc.localStream && this.sessionReady) {
        self.emit('readyToCall', self.connection.socket.sessionid);
    }
};

SimpleWebRTC.prototype.createRoom = function (name, cb) {
    if (arguments.length === 2) {
        this.connection.emit('create', name, cb);
    } else {
        this.connection.emit('create', name);
    }
};

SimpleWebRTC.prototype.sendFile = function () {
    if (!webrtcSupport.dataChannel) {
        return this.emit('error', new Error('DataChannelNotSupported'));
    }

};

module.exports = SimpleWebRTC;

},{"attachmediastream":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/attachmediastream/attachmediastream.js","mockconsole":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/mockconsole/mockconsole.js","socket.io-client":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/socket.io-client/dist/socket.io.js","webrtc":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtc/webrtc.js","webrtcsupport":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/webrtcsupport/index-browser.js","wildemitter":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/node_modules/wildemitter/wildemitter.js"}],"/Users/jlowe/dev/apps/peer-connect/node_modules/uuid/rng-browser.js":[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/Users/jlowe/dev/apps/peer-connect/node_modules/uuid/uuid.js":[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":"/Users/jlowe/dev/apps/peer-connect/node_modules/uuid/rng-browser.js"}],"/Users/jlowe/dev/apps/peer-connect/src/connection.js":[function(require,module,exports){
'use strict'

var EventEmitter = require('eventemitter2').EventEmitter2,
  uuid = require('uuid')

function Connection(channel) {

  var SimpleWebRTC = require('simplewebrtc')
  this.webrtc = new SimpleWebRTC({
    // we don't do video
    localVideoEl: '',
    remoteVideosEl: '',
    // debug: true,
    // dont ask for camera access
    autoRequestMedia: false,
    // dont negotiate media
    receiveMedia: {
      mandatory: {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false
      }
    }
  })

  this.clients = []
  this.admins = []
  this.admin = true

  this.webrtc.joinRoom(channel)
  this.webrtc.on('mute', this.onMessage.bind(this))
  this.webrtc.on('connectionReady', this.onReady.bind(this))
}

Connection.prototype = Object.create(EventEmitter.prototype)

Connection.prototype.onReady = function() {

  var id = localStorage.getItem('clientId')

  if (!id) {
    id = uuid.v4()
    localStorage.setItem('clientId', id)
  }

  this.id = id

  var broadcast = this.broadcast.bind(this),
    admin = this.admin,
    emit = this.emit.bind(this)
  setTimeout(function() {
    broadcast({
      _connection: true,
      isAdmin: admin
    })
    emit('ready')
  }, 1000)
}

Connection.prototype.broadcast = function(payload) {
  payload.clientId = this.id
  this.webrtc.sendToAll('mute', {
    name: JSON.stringify(payload),
  })
}

Connection.prototype.onMessage = function(e) {
  var payload;
  try {
    payload = JSON.parse(e.name)
  } catch (err) {
    payload = null
  }

  if (payload.name && payload.value) {
    this.emit(payload.name, payload.value, payload.clientId)
  }
}

module.exports = Connection;

},{"eventemitter2":"/Users/jlowe/dev/apps/peer-connect/node_modules/eventemitter2/lib/eventemitter2.js","simplewebrtc":"/Users/jlowe/dev/apps/peer-connect/node_modules/simplewebrtc/simplewebrtc.js","uuid":"/Users/jlowe/dev/apps/peer-connect/node_modules/uuid/uuid.js"}]},{},["/Users/jlowe/dev/apps/peer-connect/admin.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZG1pbi5qcyIsImNvbmZpZy5qc29uIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjIvbGliL2V2ZW50ZW1pdHRlcjIuanMiLCJub2RlX21vZHVsZXMvc2ltcGxld2VicnRjL25vZGVfbW9kdWxlcy9hdHRhY2htZWRpYXN0cmVhbS9hdHRhY2htZWRpYXN0cmVhbS5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL21vY2tjb25zb2xlL21vY2tjb25zb2xlLmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsZXdlYnJ0Yy9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9kaXN0L3NvY2tldC5pby5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvZmlsZXRyYW5zZmVyL2ZpbGV0cmFuc2Zlci5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvbG9jYWxtZWRpYS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvbG9jYWxtZWRpYS9ub2RlX21vZHVsZXMvZ2V0c2NyZWVubWVkaWEvZ2V0c2NyZWVubWVkaWEuanMiLCJub2RlX21vZHVsZXMvc2ltcGxld2VicnRjL25vZGVfbW9kdWxlcy93ZWJydGMvbm9kZV9tb2R1bGVzL2xvY2FsbWVkaWEvbm9kZV9tb2R1bGVzL2dldHVzZXJtZWRpYS9pbmRleC1icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsZXdlYnJ0Yy9ub2RlX21vZHVsZXMvd2VicnRjL25vZGVfbW9kdWxlcy9sb2NhbG1lZGlhL25vZGVfbW9kdWxlcy9oYXJrL2hhcmsuanMiLCJub2RlX21vZHVsZXMvc2ltcGxld2VicnRjL25vZGVfbW9kdWxlcy93ZWJydGMvbm9kZV9tb2R1bGVzL2xvY2FsbWVkaWEvbm9kZV9tb2R1bGVzL21lZGlhc3RyZWFtLWdhaW4vbWVkaWFzdHJlYW0tZ2Fpbi5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvcnRjcGVlcmNvbm5lY3Rpb24vbm9kZV9tb2R1bGVzL3NkcC1qaW5nbGUtanNvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvcnRjcGVlcmNvbm5lY3Rpb24vbm9kZV9tb2R1bGVzL3NkcC1qaW5nbGUtanNvbi9saWIvcGFyc2Vycy5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvcnRjcGVlcmNvbm5lY3Rpb24vbm9kZV9tb2R1bGVzL3NkcC1qaW5nbGUtanNvbi9saWIvc2VuZGVycy5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvcnRjcGVlcmNvbm5lY3Rpb24vbm9kZV9tb2R1bGVzL3NkcC1qaW5nbGUtanNvbi9saWIvdG9qc29uLmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsZXdlYnJ0Yy9ub2RlX21vZHVsZXMvd2VicnRjL25vZGVfbW9kdWxlcy9ydGNwZWVyY29ubmVjdGlvbi9ub2RlX21vZHVsZXMvc2RwLWppbmdsZS1qc29uL2xpYi90b3NkcC5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9ub2RlX21vZHVsZXMvcnRjcGVlcmNvbm5lY3Rpb24vbm9kZV9tb2R1bGVzL3RyYWNlYWJsZXBlZXJjb25uZWN0aW9uL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsZXdlYnJ0Yy9ub2RlX21vZHVsZXMvd2VicnRjL25vZGVfbW9kdWxlcy9ydGNwZWVyY29ubmVjdGlvbi9ub2RlX21vZHVsZXMvdW5kZXJzY29yZS91bmRlcnNjb3JlLmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsZXdlYnJ0Yy9ub2RlX21vZHVsZXMvd2VicnRjL25vZGVfbW9kdWxlcy9ydGNwZWVyY29ubmVjdGlvbi9ydGNwZWVyY29ubmVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Yy9wZWVyLmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsZXdlYnJ0Yy9ub2RlX21vZHVsZXMvd2VicnRjL3dlYnJ0Yy5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dlYnJ0Y3N1cHBvcnQvaW5kZXgtYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zaW1wbGV3ZWJydGMvbm9kZV9tb2R1bGVzL3dpbGRlbWl0dGVyL3dpbGRlbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsZXdlYnJ0Yy9zaW1wbGV3ZWJydGMuanMiLCJub2RlX21vZHVsZXMvdXVpZC9ybmctYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3V1aWQuanMiLCJzcmMvY29ubmVjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2h5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25RQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaGdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcG9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMWNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBDb25uZWN0aW9uID0gcmVxdWlyZSgnLi9zcmMvY29ubmVjdGlvbicpLFxuICBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZy5qc29uJyksXG4gIGNvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbihjb25maWcucm9vbSlcblxud2luZG93LmNsaWVudCA9IGNvbm5lY3Rpb25cblxuY29ubmVjdGlvbi5vbigncmVhZHknLCBmdW5jdGlvbigpe1xuICBpZiAoY2hyb21lLnRhYnMpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7fSwgZnVuY3Rpb24oVGFicyl7XG4gICAgICB2YXIgdGFicyA9IFtdXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgVGFicy5sZW5ndGg7IGkgKz0gMSl7XG4gICAgICAgIHZhciBUYWIgPSBUYWJzW2ldXG4gICAgICAgIHRhYnNbVGFiLmlkXSA9IFRhYlxuICAgICAgfVxuICAgICAgY29ubmVjdGlvbi5icm9hZGNhc3Qoe1xuICAgICAgICBuYW1lOiAndGFicycsXG4gICAgICAgIGNsaWVudDogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHRhYnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufSlcblxuY29ubmVjdGlvbi5vbigndGFicycsIGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKGFyZ3VtZW50cylcbn0pXG5cbmNvbm5lY3Rpb24ub24oJ25ld1RhYicsIGZ1bmN0aW9uKCl7XG4gIC8vIGFkZCBuZXcgdGFiXG59KVxuXG5jb25uZWN0aW9uLm9uKCdyZW1vdmVUYWInLCBmdW5jdGlvbigpe1xuXG59KVxuXG5jb25uZWN0aW9uLm9uKCdjbG9zZVRhYicsIGZ1bmN0aW9uKCl7XG5cbn0pXG5cbi8vIGNocm9tZS50YWJzLnF1ZXJ5KHt9LCBmdW5jdGlvbihUYWJzKXtcbi8vICAgICBjb25zb2xlLmxvZyhUYWJzKVxuLy8gICAgIGZvcih2YXIgaSA9IDA7IGkgPCBUYWJzLmxlbmd0aDsgaSArPSAxKXtcbi8vICAgICAgIHZhciBUYWIgPSBUYWJzW2ldO1xuLy8gICAgICAgdGFic1tUYWIuaWRdID0gVGFiO1xuLy8gICAgIH1cbi8vIH0pO1xuXG4vLyBjaHJvbWUudGFicy5vbkNyZWF0ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24odGFiKSB7XG4vLyAgIHRhYnNbdGFiLmlkXSA9IHRhYjtcbi8vICAgLy8gZW1pdCB0aGUgbmV3IHRhYiB3aXRoIHRoZSBjbGllbnQgaWRcbi8vICAgc29ja2V0LmVtaXQoXCJuZXdfdGFiXCIsIHt0YWIgOiB0YWJ9KTtcbi8vICAgLy9yZW1vdmluZyB0aW1lb3V0IHRpbWUgaXRzIGJldHRlciB0cmFja2VkXG4vLyAgIC8vc2V0VGltZW91dChmdW5jdGlvbigpe2Nocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQpfSwgKE1hdGgucmFuZG9tKCkgKiAyNDAwMDApICsgNjAwMDApO1xuLy8gfSk7XG5cbi8vIC8vIHJlbW92ZSB0YWJzIGZyb20gdHJhY2tpbmcgd2hlbiBhIHRhYiBpcyByZW1vdmVkXG4vLyBjaHJvbWUudGFicy5vblJlbW92ZWQuYWRkTGlzdGVuZXIoZnVuY3Rpb24odGFiaWQpIHtcbi8vICAgZGVsZXRlIHRhYnNbdGFiaWRdO1xuLy8gICBzb2NrZXQuZW1pdChcImNsb3NlX3RhYlwiLCB7dGFiaWQgOiB0YWJpZH0pXG4vLyB9KTtcblxuLy8gY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHRhYmlkICwgY2hhbmdlKSB7XG4vLyAgIGlmKGNoYW5nZS51cmwpe1xuLy8gICAgIHRhYnNbdGFiaWRdLnVybCA9IGNoYW5nZS51cmw7XG4vLyAgICAgc29ja2V0LmVtaXQoXCJ1cmxfY2hhbmdlXCIsIHt0YWJpZCA6IHRhYmlkLCB1cmwgOiBjaGFuZ2UudXJsfSlcbi8vICAgfVxuLy8gfSk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicm9vbVwiOiBcIkFBOkpBQ09COlRFU1RcIlxufVxuIiwiaWYgKHR5cGVvZiBPYmplY3QuY3JlYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gIC8vIGltcGxlbWVudGF0aW9uIGZyb20gc3RhbmRhcmQgbm9kZS5qcyAndXRpbCcgbW9kdWxlXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgdmFyIFRlbXBDdG9yID0gZnVuY3Rpb24gKCkge31cbiAgICBUZW1wQ3Rvci5wcm90b3R5cGUgPSBzdXBlckN0b3IucHJvdG90eXBlXG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKVxuICAgIGN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY3RvclxuICB9XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRRdWV1ZTtcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xufVxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICBxdWV1ZS5wdXNoKGZ1bik7XG4gICAgaWYgKCFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlcihhcmcpIHtcbiAgcmV0dXJuIGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0J1xuICAgICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcuZmlsbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICYmIHR5cGVvZiBhcmcucmVhZFVJbnQ4ID09PSAnZnVuY3Rpb24nO1xufSIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgLy8gQWxsb3cgZm9yIGRlcHJlY2F0aW5nIHRoaW5ncyBpbiB0aGUgcHJvY2VzcyBvZiBzdGFydGluZyB1cC5cbiAgaWYgKGlzVW5kZWZpbmVkKGdsb2JhbC5wcm9jZXNzKSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cblxudmFyIGRlYnVncyA9IHt9O1xudmFyIGRlYnVnRW52aXJvbjtcbmV4cG9ydHMuZGVidWdsb2cgPSBmdW5jdGlvbihzZXQpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKGRlYnVnRW52aXJvbikpXG4gICAgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpO1xuICAgICAgICBjb25zb2xlLmVycm9yKCclcyAlZDogJXMnLCBzZXQsIHBpZCwgbXNnKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24oKSB7fTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlYnVnc1tzZXRdO1xufTtcblxuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FOU0lfZXNjYXBlX2NvZGUjZ3JhcGhpY3Ncbmluc3BlY3QuY29sb3JzID0ge1xuICAnYm9sZCcgOiBbMSwgMjJdLFxuICAnaXRhbGljJyA6IFszLCAyM10sXG4gICd1bmRlcmxpbmUnIDogWzQsIDI0XSxcbiAgJ2ludmVyc2UnIDogWzcsIDI3XSxcbiAgJ3doaXRlJyA6IFszNywgMzldLFxuICAnZ3JleScgOiBbOTAsIDM5XSxcbiAgJ2JsYWNrJyA6IFszMCwgMzldLFxuICAnYmx1ZScgOiBbMzQsIDM5XSxcbiAgJ2N5YW4nIDogWzM2LCAzOV0sXG4gICdncmVlbicgOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnIDogWzM1LCAzOV0sXG4gICdyZWQnIDogWzMxLCAzOV0sXG4gICd5ZWxsb3cnIDogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuXG5mdW5jdGlvbiBzdHlsaXplV2l0aENvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHZhciBzdHlsZSA9IGluc3BlY3Quc3R5bGVzW3N0eWxlVHlwZV07XG5cbiAgaWYgKHN0eWxlKSB7XG4gICAgcmV0dXJuICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMF0gKyAnbScgKyBzdHIgK1xuICAgICAgICAgICAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzFdICsgJ20nO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBzdHlsaXplTm9Db2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICByZXR1cm4gc3RyO1xufVxuXG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbih2YWwsIGlkeCkge1xuICAgIGhhc2hbdmFsXSA9IHRydWU7XG4gIH0pO1xuXG4gIHJldHVybiBoYXNoO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcykge1xuICAvLyBQcm92aWRlIGEgaG9vayBmb3IgdXNlci1zcGVjaWZpZWQgaW5zcGVjdCBmdW5jdGlvbnMuXG4gIC8vIENoZWNrIHRoYXQgdmFsdWUgaXMgYW4gb2JqZWN0IHdpdGggYW4gaW5zcGVjdCBmdW5jdGlvbiBvbiBpdFxuICBpZiAoY3R4LmN1c3RvbUluc3BlY3QgJiZcbiAgICAgIHZhbHVlICYmXG4gICAgICBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gICAgICAvLyBGaWx0ZXIgb3V0IHRoZSB1dGlsIG1vZHVsZSwgaXQncyBpbnNwZWN0IGZ1bmN0aW9uIGlzIHNwZWNpYWxcbiAgICAgIHZhbHVlLmluc3BlY3QgIT09IGV4cG9ydHMuaW5zcGVjdCAmJlxuICAgICAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICAgICAhKHZhbHVlLmNvbnN0cnVjdG9yICYmIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSA9PT0gdmFsdWUpKSB7XG4gICAgdmFyIHJldCA9IHZhbHVlLmluc3BlY3QocmVjdXJzZVRpbWVzLCBjdHgpO1xuICAgIGlmICghaXNTdHJpbmcocmV0KSkge1xuICAgICAgcmV0ID0gZm9ybWF0VmFsdWUoY3R4LCByZXQsIHJlY3Vyc2VUaW1lcyk7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICAvLyBQcmltaXRpdmUgdHlwZXMgY2Fubm90IGhhdmUgcHJvcGVydGllc1xuICB2YXIgcHJpbWl0aXZlID0gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpO1xuICBpZiAocHJpbWl0aXZlKSB7XG4gICAgcmV0dXJuIHByaW1pdGl2ZTtcbiAgfVxuXG4gIC8vIExvb2sgdXAgdGhlIGtleXMgb2YgdGhlIG9iamVjdC5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG4gIHZhciB2aXNpYmxlS2V5cyA9IGFycmF5VG9IYXNoKGtleXMpO1xuXG4gIGlmIChjdHguc2hvd0hpZGRlbikge1xuICAgIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh2YWx1ZSk7XG4gIH1cblxuICAvLyBJRSBkb2Vzbid0IG1ha2UgZXJyb3IgZmllbGRzIG5vbi1lbnVtZXJhYmxlXG4gIC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9pZS9kd3c1MnNidCh2PXZzLjk0KS5hc3B4XG4gIGlmIChpc0Vycm9yKHZhbHVlKVxuICAgICAgJiYgKGtleXMuaW5kZXhPZignbWVzc2FnZScpID49IDAgfHwga2V5cy5pbmRleE9mKCdkZXNjcmlwdGlvbicpID49IDApKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIC8vIFNvbWUgdHlwZSBvZiBvYmplY3Qgd2l0aG91dCBwcm9wZXJ0aWVzIGNhbiBiZSBzaG9ydGN1dHRlZC5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbRnVuY3Rpb24nICsgbmFtZSArICddJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9XG4gICAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShEYXRlLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ2RhdGUnKTtcbiAgICB9XG4gICAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBiYXNlID0gJycsIGFycmF5ID0gZmFsc2UsIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgY3R4LnNlZW4ucG9wKCk7XG5cbiAgcmV0dXJuIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSkge1xuICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpICsgJ1xcJyc7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuICB9XG4gIGlmIChpc051bWJlcih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdib29sZWFuJyk7XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKGlzTnVsbCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyLCBkZXNjO1xuICBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YWx1ZSwga2V5KSB8fCB7IHZhbHVlOiB2YWx1ZVtrZXldIH07XG4gIGlmIChkZXNjLmdldCkge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChkZXNjLnNldCkge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tTZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFoYXNPd25Qcm9wZXJ0eSh2aXNpYmxlS2V5cywga2V5KSkge1xuICAgIG5hbWUgPSAnWycgKyBrZXkgKyAnXSc7XG4gIH1cbiAgaWYgKCFzdHIpIHtcbiAgICBpZiAoY3R4LnNlZW4uaW5kZXhPZihkZXNjLnZhbHVlKSA8IDApIHtcbiAgICAgIGlmIChpc051bGwocmVjdXJzZVRpbWVzKSkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmIChpc1VuZGVmaW5lZChuYW1lKSkge1xuICAgIGlmIChhcnJheSAmJiBrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBuYW1lID0gSlNPTi5zdHJpbmdpZnkoJycgKyBrZXkpO1xuICAgIGlmIChuYW1lLm1hdGNoKC9eXCIoW2EtekEtWl9dW2EtekEtWl8wLTldKilcIiQvKSkge1xuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDEsIG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ25hbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJylcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG4gICAgICBuYW1lID0gY3R4LnN0eWxpemUobmFtZSwgJ3N0cmluZycpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuYW1lICsgJzogJyArIHN0cjtcbn1cblxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbihwcmV2LCBjdXIpIHtcbiAgICBudW1MaW5lc0VzdCsrO1xuICAgIGlmIChjdXIuaW5kZXhPZignXFxuJykgPj0gMCkgbnVtTGluZXNFc3QrKztcbiAgICByZXR1cm4gcHJldiArIGN1ci5yZXBsYWNlKC9cXHUwMDFiXFxbXFxkXFxkP20vZywgJycpLmxlbmd0aCArIDE7XG4gIH0sIDApO1xuXG4gIGlmIChsZW5ndGggPiA2MCkge1xuICAgIHJldHVybiBicmFjZXNbMF0gK1xuICAgICAgICAgICAoYmFzZSA9PT0gJycgPyAnJyA6IGJhc2UgKyAnXFxuICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgb3V0cHV0LmpvaW4oJyxcXG4gICcpICtcbiAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgYnJhY2VzWzFdO1xuICB9XG5cbiAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyAnICcgKyBvdXRwdXQuam9pbignLCAnKSArICcgJyArIGJyYWNlc1sxXTtcbn1cblxuXG4vLyBOT1RFOiBUaGVzZSB0eXBlIGNoZWNraW5nIGZ1bmN0aW9ucyBpbnRlbnRpb25hbGx5IGRvbid0IHVzZSBgaW5zdGFuY2VvZmBcbi8vIGJlY2F1c2UgaXQgaXMgZnJhZ2lsZSBhbmQgY2FuIGJlIGVhc2lseSBmYWtlZCB3aXRoIGBPYmplY3QuY3JlYXRlKClgLlxuZnVuY3Rpb24gaXNBcnJheShhcikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcik7XG59XG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnYm9vbGVhbic7XG59XG5leHBvcnRzLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcblxuZnVuY3Rpb24gaXNOdWxsKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGwgPSBpc051bGw7XG5cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbE9yVW5kZWZpbmVkID0gaXNOdWxsT3JVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5leHBvcnRzLmlzTnVtYmVyID0gaXNOdW1iZXI7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N0cmluZyc7XG59XG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzU3ltYm9sKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCc7XG59XG5leHBvcnRzLmlzU3ltYm9sID0gaXNTeW1ib2w7XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG5leHBvcnRzLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKHJlKSB7XG4gIHJldHVybiBpc09iamVjdChyZSkgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmV4cG9ydHMuaXNSZWdFeHAgPSBpc1JlZ0V4cDtcblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShkKSB7XG4gIHJldHVybiBpc09iamVjdChkKSAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuZXhwb3J0cy5pc0RhdGUgPSBpc0RhdGU7XG5cbmZ1bmN0aW9uIGlzRXJyb3IoZSkge1xuICByZXR1cm4gaXNPYmplY3QoZSkgJiZcbiAgICAgIChvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyB8fCBlIGluc3RhbmNlb2YgRXJyb3IpO1xufVxuZXhwb3J0cy5pc0Vycm9yID0gaXNFcnJvcjtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5leHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZShhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8ICAvLyBFUzYgc3ltYm9sXG4gICAgICAgICB0eXBlb2YgYXJnID09PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNQcmltaXRpdmUgPSBpc1ByaW1pdGl2ZTtcblxuZXhwb3J0cy5pc0J1ZmZlciA9IHJlcXVpcmUoJy4vc3VwcG9ydC9pc0J1ZmZlcicpO1xuXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyhvKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobyk7XG59XG5cblxuZnVuY3Rpb24gcGFkKG4pIHtcbiAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4udG9TdHJpbmcoMTApIDogbi50b1N0cmluZygxMCk7XG59XG5cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLFxuICAgICAgICAgICAgICAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldE1pbnV0ZXMoKSksXG4gICAgICAgICAgICAgIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuXG4vLyBsb2cgaXMganVzdCBhIHRoaW4gd3JhcHBlciB0byBjb25zb2xlLmxvZyB0aGF0IHByZXBlbmRzIGEgdGltZXN0YW1wXG5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygnJXMgLSAlcycsIHRpbWVzdGFtcCgpLCBleHBvcnRzLmZvcm1hdC5hcHBseShleHBvcnRzLCBhcmd1bWVudHMpKTtcbn07XG5cblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbihvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8ICFpc09iamVjdChhZGQpKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cbiIsIi8qIVxuICogRXZlbnRFbWl0dGVyMlxuICogaHR0cHM6Ly9naXRodWIuY29tL2hpajFueC9FdmVudEVtaXR0ZXIyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEzIGhpajFueFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG47IWZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSA/IEFycmF5LmlzQXJyYXkgOiBmdW5jdGlvbiBfaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgfTtcbiAgdmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGlmICh0aGlzLl9jb25mKSB7XG4gICAgICBjb25maWd1cmUuY2FsbCh0aGlzLCB0aGlzLl9jb25mKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjb25maWd1cmUoY29uZikge1xuICAgIGlmIChjb25mKSB7XG5cbiAgICAgIHRoaXMuX2NvbmYgPSBjb25mO1xuXG4gICAgICBjb25mLmRlbGltaXRlciAmJiAodGhpcy5kZWxpbWl0ZXIgPSBjb25mLmRlbGltaXRlcik7XG4gICAgICBjb25mLm1heExpc3RlbmVycyAmJiAodGhpcy5fZXZlbnRzLm1heExpc3RlbmVycyA9IGNvbmYubWF4TGlzdGVuZXJzKTtcbiAgICAgIGNvbmYud2lsZGNhcmQgJiYgKHRoaXMud2lsZGNhcmQgPSBjb25mLndpbGRjYXJkKTtcbiAgICAgIGNvbmYubmV3TGlzdGVuZXIgJiYgKHRoaXMubmV3TGlzdGVuZXIgPSBjb25mLm5ld0xpc3RlbmVyKTtcblxuICAgICAgaWYgKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lclRyZWUgPSB7fTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoY29uZikge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHRoaXMubmV3TGlzdGVuZXIgPSBmYWxzZTtcbiAgICBjb25maWd1cmUuY2FsbCh0aGlzLCBjb25mKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEF0dGVudGlvbiwgZnVuY3Rpb24gcmV0dXJuIHR5cGUgbm93IGlzIGFycmF5LCBhbHdheXMgIVxuICAvLyBJdCBoYXMgemVybyBlbGVtZW50cyBpZiBubyBhbnkgbWF0Y2hlcyBmb3VuZCBhbmQgb25lIG9yIG1vcmVcbiAgLy8gZWxlbWVudHMgKGxlYWZzKSBpZiB0aGVyZSBhcmUgbWF0Y2hlc1xuICAvL1xuICBmdW5jdGlvbiBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWUsIGkpIHtcbiAgICBpZiAoIXRyZWUpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIGxpc3RlbmVycz1bXSwgbGVhZiwgbGVuLCBicmFuY2gsIHhUcmVlLCB4eFRyZWUsIGlzb2xhdGVkQnJhbmNoLCBlbmRSZWFjaGVkLFxuICAgICAgICB0eXBlTGVuZ3RoID0gdHlwZS5sZW5ndGgsIGN1cnJlbnRUeXBlID0gdHlwZVtpXSwgbmV4dFR5cGUgPSB0eXBlW2krMV07XG4gICAgaWYgKGkgPT09IHR5cGVMZW5ndGggJiYgdHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAvL1xuICAgICAgLy8gSWYgYXQgdGhlIGVuZCBvZiB0aGUgZXZlbnQocykgbGlzdCBhbmQgdGhlIHRyZWUgaGFzIGxpc3RlbmVyc1xuICAgICAgLy8gaW52b2tlIHRob3NlIGxpc3RlbmVycy5cbiAgICAgIC8vXG4gICAgICBpZiAodHlwZW9mIHRyZWUuX2xpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVycyAmJiBoYW5kbGVycy5wdXNoKHRyZWUuX2xpc3RlbmVycyk7XG4gICAgICAgIHJldHVybiBbdHJlZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxlYWYgPSAwLCBsZW4gPSB0cmVlLl9saXN0ZW5lcnMubGVuZ3RoOyBsZWFmIDwgbGVuOyBsZWFmKyspIHtcbiAgICAgICAgICBoYW5kbGVycyAmJiBoYW5kbGVycy5wdXNoKHRyZWUuX2xpc3RlbmVyc1tsZWFmXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt0cmVlXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKGN1cnJlbnRUeXBlID09PSAnKicgfHwgY3VycmVudFR5cGUgPT09ICcqKicpIHx8IHRyZWVbY3VycmVudFR5cGVdKSB7XG4gICAgICAvL1xuICAgICAgLy8gSWYgdGhlIGV2ZW50IGVtaXR0ZWQgaXMgJyonIGF0IHRoaXMgcGFydFxuICAgICAgLy8gb3IgdGhlcmUgaXMgYSBjb25jcmV0ZSBtYXRjaCBhdCB0aGlzIHBhdGNoXG4gICAgICAvL1xuICAgICAgaWYgKGN1cnJlbnRUeXBlID09PSAnKicpIHtcbiAgICAgICAgZm9yIChicmFuY2ggaW4gdHJlZSkge1xuICAgICAgICAgIGlmIChicmFuY2ggIT09ICdfbGlzdGVuZXJzJyAmJiB0cmVlLmhhc093blByb3BlcnR5KGJyYW5jaCkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkrMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdGVuZXJzO1xuICAgICAgfSBlbHNlIGlmKGN1cnJlbnRUeXBlID09PSAnKionKSB7XG4gICAgICAgIGVuZFJlYWNoZWQgPSAoaSsxID09PSB0eXBlTGVuZ3RoIHx8IChpKzIgPT09IHR5cGVMZW5ndGggJiYgbmV4dFR5cGUgPT09ICcqJykpO1xuICAgICAgICBpZihlbmRSZWFjaGVkICYmIHRyZWUuX2xpc3RlbmVycykge1xuICAgICAgICAgIC8vIFRoZSBuZXh0IGVsZW1lbnQgaGFzIGEgX2xpc3RlbmVycywgYWRkIGl0IHRvIHRoZSBoYW5kbGVycy5cbiAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZSwgdHlwZUxlbmd0aCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChicmFuY2ggaW4gdHJlZSkge1xuICAgICAgICAgIGlmIChicmFuY2ggIT09ICdfbGlzdGVuZXJzJyAmJiB0cmVlLmhhc093blByb3BlcnR5KGJyYW5jaCkpIHtcbiAgICAgICAgICAgIGlmKGJyYW5jaCA9PT0gJyonIHx8IGJyYW5jaCA9PT0gJyoqJykge1xuICAgICAgICAgICAgICBpZih0cmVlW2JyYW5jaF0uX2xpc3RlbmVycyAmJiAhZW5kUmVhY2hlZCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIHR5cGVMZW5ndGgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYnJhbmNoID09PSBuZXh0VHlwZSkge1xuICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuY29uY2F0KHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgdHJlZVticmFuY2hdLCBpKzIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIE5vIG1hdGNoIG9uIHRoaXMgb25lLCBzaGlmdCBpbnRvIHRoZSB0cmVlIGJ1dCBub3QgaW4gdGhlIHR5cGUgYXJyYXkuXG4gICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQoc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB0cmVlW2JyYW5jaF0sIGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3RlbmVycztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLmNvbmNhdChzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHRyZWVbY3VycmVudFR5cGVdLCBpKzEpKTtcbiAgICB9XG5cbiAgICB4VHJlZSA9IHRyZWVbJyonXTtcbiAgICBpZiAoeFRyZWUpIHtcbiAgICAgIC8vXG4gICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgdHJlZSB3aWxsIGFsbG93IGFueSBtYXRjaCBmb3IgdGhpcyBwYXJ0LFxuICAgICAgLy8gdGhlbiByZWN1cnNpdmVseSBleHBsb3JlIGFsbCBicmFuY2hlcyBvZiB0aGUgdHJlZVxuICAgICAgLy9cbiAgICAgIHNlYXJjaExpc3RlbmVyVHJlZShoYW5kbGVycywgdHlwZSwgeFRyZWUsIGkrMSk7XG4gICAgfVxuXG4gICAgeHhUcmVlID0gdHJlZVsnKionXTtcbiAgICBpZih4eFRyZWUpIHtcbiAgICAgIGlmKGkgPCB0eXBlTGVuZ3RoKSB7XG4gICAgICAgIGlmKHh4VHJlZS5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIGxpc3RlbmVyIG9uIGEgJyoqJywgaXQgd2lsbCBjYXRjaCBhbGwsIHNvIGFkZCBpdHMgaGFuZGxlci5cbiAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZSwgdHlwZUxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCdWlsZCBhcnJheXMgb2YgbWF0Y2hpbmcgbmV4dCBicmFuY2hlcyBhbmQgb3RoZXJzLlxuICAgICAgICBmb3IoYnJhbmNoIGluIHh4VHJlZSkge1xuICAgICAgICAgIGlmKGJyYW5jaCAhPT0gJ19saXN0ZW5lcnMnICYmIHh4VHJlZS5oYXNPd25Qcm9wZXJ0eShicmFuY2gpKSB7XG4gICAgICAgICAgICBpZihicmFuY2ggPT09IG5leHRUeXBlKSB7XG4gICAgICAgICAgICAgIC8vIFdlIGtub3cgdGhlIG5leHQgZWxlbWVudCB3aWxsIG1hdGNoLCBzbyBqdW1wIHR3aWNlLlxuICAgICAgICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZVticmFuY2hdLCBpKzIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGJyYW5jaCA9PT0gY3VycmVudFR5cGUpIHtcbiAgICAgICAgICAgICAgLy8gQ3VycmVudCBub2RlIG1hdGNoZXMsIG1vdmUgaW50byB0aGUgdHJlZS5cbiAgICAgICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB4eFRyZWVbYnJhbmNoXSwgaSsxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlzb2xhdGVkQnJhbmNoID0ge307XG4gICAgICAgICAgICAgIGlzb2xhdGVkQnJhbmNoW2JyYW5jaF0gPSB4eFRyZWVbYnJhbmNoXTtcbiAgICAgICAgICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlKGhhbmRsZXJzLCB0eXBlLCB7ICcqKic6IGlzb2xhdGVkQnJhbmNoIH0sIGkrMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoeHhUcmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSByZWFjaGVkIHRoZSBlbmQgYW5kIHN0aWxsIG9uIGEgJyoqJ1xuICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZSwgdHlwZUxlbmd0aCk7XG4gICAgICB9IGVsc2UgaWYoeHhUcmVlWycqJ10gJiYgeHhUcmVlWycqJ10uX2xpc3RlbmVycykge1xuICAgICAgICBzZWFyY2hMaXN0ZW5lclRyZWUoaGFuZGxlcnMsIHR5cGUsIHh4VHJlZVsnKiddLCB0eXBlTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdGVuZXJzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ3Jvd0xpc3RlbmVyVHJlZSh0eXBlLCBsaXN0ZW5lcikge1xuXG4gICAgdHlwZSA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuXG4gICAgLy9cbiAgICAvLyBMb29rcyBmb3IgdHdvIGNvbnNlY3V0aXZlICcqKicsIGlmIHNvLCBkb24ndCBhZGQgdGhlIGV2ZW50IGF0IGFsbC5cbiAgICAvL1xuICAgIGZvcih2YXIgaSA9IDAsIGxlbiA9IHR5cGUubGVuZ3RoOyBpKzEgPCBsZW47IGkrKykge1xuICAgICAgaWYodHlwZVtpXSA9PT0gJyoqJyAmJiB0eXBlW2krMV0gPT09ICcqKicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciB0cmVlID0gdGhpcy5saXN0ZW5lclRyZWU7XG4gICAgdmFyIG5hbWUgPSB0eXBlLnNoaWZ0KCk7XG5cbiAgICB3aGlsZSAobmFtZSkge1xuXG4gICAgICBpZiAoIXRyZWVbbmFtZV0pIHtcbiAgICAgICAgdHJlZVtuYW1lXSA9IHt9O1xuICAgICAgfVxuXG4gICAgICB0cmVlID0gdHJlZVtuYW1lXTtcblxuICAgICAgaWYgKHR5cGUubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgICAgaWYgKCF0cmVlLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMgPSBsaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiB0cmVlLl9saXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMgPSBbdHJlZS5fbGlzdGVuZXJzLCBsaXN0ZW5lcl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNBcnJheSh0cmVlLl9saXN0ZW5lcnMpKSB7XG5cbiAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgICAgICBpZiAoIXRyZWUuX2xpc3RlbmVycy53YXJuZWQpIHtcblxuICAgICAgICAgICAgdmFyIG0gPSBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIG0gPSB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobSA+IDAgJiYgdHJlZS5fbGlzdGVuZXJzLmxlbmd0aCA+IG0pIHtcblxuICAgICAgICAgICAgICB0cmVlLl9saXN0ZW5lcnMud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZS5fbGlzdGVuZXJzLmxlbmd0aCk7XG4gICAgICAgICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBuYW1lID0gdHlwZS5zaGlmdCgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW5cbiAgLy8gMTAgbGlzdGVuZXJzIGFyZSBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoXG4gIC8vIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuICAvL1xuICAvLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3NcbiAgLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5kZWxpbWl0ZXIgPSAnLic7XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcbiAgICB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzID0gbjtcbiAgICBpZiAoIXRoaXMuX2NvbmYpIHRoaXMuX2NvbmYgPSB7fTtcbiAgICB0aGlzLl9jb25mLm1heExpc3RlbmVycyA9IG47XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudCA9ICcnO1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgIHRoaXMubWFueShldmVudCwgMSwgZm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubWFueSA9IGZ1bmN0aW9uKGV2ZW50LCB0dGwsIGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtYW55IG9ubHkgYWNjZXB0cyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaXN0ZW5lcigpIHtcbiAgICAgIGlmICgtLXR0bCA9PT0gMCkge1xuICAgICAgICBzZWxmLm9mZihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lci5fb3JpZ2luID0gZm47XG5cbiAgICB0aGlzLm9uKGV2ZW50LCBsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG5cbiAgICB2YXIgdHlwZSA9IGFyZ3VtZW50c1swXTtcblxuICAgIGlmICh0eXBlID09PSAnbmV3TGlzdGVuZXInICYmICF0aGlzLm5ld0xpc3RlbmVyKSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcikgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlICpfYWxsKiBmdW5jdGlvbnMgYW5kIGludm9rZSB0aGVtLlxuICAgIGlmICh0aGlzLl9hbGwpIHtcbiAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbDsgaSsrKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoaSA9IDAsIGwgPSB0aGlzLl9hbGwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZXZlbnQgPSB0eXBlO1xuICAgICAgICB0aGlzLl9hbGxbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICAgIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG5cbiAgICAgIGlmICghdGhpcy5fYWxsICYmXG4gICAgICAgICF0aGlzLl9ldmVudHMuZXJyb3IgJiZcbiAgICAgICAgISh0aGlzLndpbGRjYXJkICYmIHRoaXMubGlzdGVuZXJUcmVlLmVycm9yKSkge1xuXG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHRocm93IGFyZ3VtZW50c1sxXTsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmNhdWdodCwgdW5zcGVjaWZpZWQgJ2Vycm9yJyBldmVudC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYW5kbGVyO1xuXG4gICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgaGFuZGxlciA9IFtdO1xuICAgICAgdmFyIG5zID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8gdHlwZS5zcGxpdCh0aGlzLmRlbGltaXRlcikgOiB0eXBlLnNsaWNlKCk7XG4gICAgICBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBoYW5kbGVyLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmV2ZW50ID0gdHlwZTtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvLyBzbG93ZXJcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyIGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsOyBpKyspIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhhbmRsZXIpIHtcbiAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbDsgaSsrKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLmV2ZW50ID0gdHlwZTtcbiAgICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChsaXN0ZW5lcnMubGVuZ3RoID4gMCkgfHwgISF0aGlzLl9hbGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuICEhdGhpcy5fYWxsO1xuICAgIH1cblxuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLm9uQW55KHR5cGUpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdvbiBvbmx5IGFjY2VwdHMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG5cbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09IFwibmV3TGlzdGVuZXJzXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJzXCIuXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIGdyb3dMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCB0eXBlLCBsaXN0ZW5lcik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkge1xuICAgICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICB9XG4gICAgZWxzZSBpZih0eXBlb2YgdGhpcy5fZXZlbnRzW3R5cGVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNBcnJheSh0aGlzLl9ldmVudHNbdHlwZV0pKSB7XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cbiAgICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcblxuICAgICAgICB2YXIgbSA9IGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIG0gPSB0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG5cbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbkFueSA9IGZ1bmN0aW9uKGZuKSB7XG5cbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ29uQW55IG9ubHkgYWNjZXB0cyBpbnN0YW5jZXMgb2YgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBpZighdGhpcy5fYWxsKSB7XG4gICAgICB0aGlzLl9hbGwgPSBbXTtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZ1bmN0aW9uIHRvIHRoZSBldmVudCBsaXN0ZW5lciBjb2xsZWN0aW9uLlxuICAgIHRoaXMuX2FsbC5wdXNoKGZuKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvbicpO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVycyxsZWFmcz1bXTtcblxuICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgbGVhZnMgPSBzZWFyY2hMaXN0ZW5lclRyZWUuY2FsbCh0aGlzLCBudWxsLCBucywgdGhpcy5saXN0ZW5lclRyZWUsIDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIGRvZXMgbm90IHVzZSBsaXN0ZW5lcnMoKSwgc28gbm8gc2lkZSBlZmZlY3Qgb2YgY3JlYXRpbmcgX2V2ZW50c1t0eXBlXVxuICAgICAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pIHJldHVybiB0aGlzO1xuICAgICAgaGFuZGxlcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgICBsZWFmcy5wdXNoKHtfbGlzdGVuZXJzOmhhbmRsZXJzfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaUxlYWY9MDsgaUxlYWY8bGVhZnMubGVuZ3RoOyBpTGVhZisrKSB7XG4gICAgICB2YXIgbGVhZiA9IGxlYWZzW2lMZWFmXTtcbiAgICAgIGhhbmRsZXJzID0gbGVhZi5fbGlzdGVuZXJzO1xuICAgICAgaWYgKGlzQXJyYXkoaGFuZGxlcnMpKSB7XG5cbiAgICAgICAgdmFyIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGhhbmRsZXJzW2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgICAgKGhhbmRsZXJzW2ldLmxpc3RlbmVyICYmIGhhbmRsZXJzW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikgfHxcbiAgICAgICAgICAgIChoYW5kbGVyc1tpXS5fb3JpZ2luICYmIGhhbmRsZXJzW2ldLl9vcmlnaW4gPT09IGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy53aWxkY2FyZCkge1xuICAgICAgICAgIGxlYWYuX2xpc3RlbmVycy5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsZWFmLl9saXN0ZW5lcnM7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChoYW5kbGVycyA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgKGhhbmRsZXJzLmxpc3RlbmVyICYmIGhhbmRsZXJzLmxpc3RlbmVyID09PSBsaXN0ZW5lcikgfHxcbiAgICAgICAgKGhhbmRsZXJzLl9vcmlnaW4gJiYgaGFuZGxlcnMuX29yaWdpbiA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIGlmKHRoaXMud2lsZGNhcmQpIHtcbiAgICAgICAgICBkZWxldGUgbGVhZi5fbGlzdGVuZXJzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZkFueSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIGkgPSAwLCBsID0gMCwgZm5zO1xuICAgIGlmIChmbiAmJiB0aGlzLl9hbGwgJiYgdGhpcy5fYWxsLmxlbmd0aCA+IDApIHtcbiAgICAgIGZucyA9IHRoaXMuX2FsbDtcbiAgICAgIGZvcihpID0gMCwgbCA9IGZucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYoZm4gPT09IGZuc1tpXSkge1xuICAgICAgICAgIGZucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWxsID0gW107XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZjtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgIXRoaXMuX2V2ZW50cyB8fCBpbml0LmNhbGwodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICB2YXIgbnMgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlLnNwbGl0KHRoaXMuZGVsaW1pdGVyKSA6IHR5cGUuc2xpY2UoKTtcbiAgICAgIHZhciBsZWFmcyA9IHNlYXJjaExpc3RlbmVyVHJlZS5jYWxsKHRoaXMsIG51bGwsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG5cbiAgICAgIGZvciAodmFyIGlMZWFmPTA7IGlMZWFmPGxlYWZzLmxlbmd0aDsgaUxlYWYrKykge1xuICAgICAgICB2YXIgbGVhZiA9IGxlYWZzW2lMZWFmXTtcbiAgICAgICAgbGVhZi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSkgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBpZih0aGlzLndpbGRjYXJkKSB7XG4gICAgICB2YXIgaGFuZGxlcnMgPSBbXTtcbiAgICAgIHZhciBucyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyA/IHR5cGUuc3BsaXQodGhpcy5kZWxpbWl0ZXIpIDogdHlwZS5zbGljZSgpO1xuICAgICAgc2VhcmNoTGlzdGVuZXJUcmVlLmNhbGwodGhpcywgaGFuZGxlcnMsIG5zLCB0aGlzLmxpc3RlbmVyVHJlZSwgMCk7XG4gICAgICByZXR1cm4gaGFuZGxlcnM7XG4gICAgfVxuXG4gICAgdGhpcy5fZXZlbnRzIHx8IGluaXQuY2FsbCh0aGlzKTtcblxuICAgIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKSB0aGlzLl9ldmVudHNbdHlwZV0gPSBbXTtcbiAgICBpZiAoIWlzQXJyYXkodGhpcy5fZXZlbnRzW3R5cGVdKSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9ldmVudHNbdHlwZV07XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnNBbnkgPSBmdW5jdGlvbigpIHtcblxuICAgIGlmKHRoaXMuX2FsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FsbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gIH07XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBDb21tb25KU1xuICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyMiA9IEV2ZW50RW1pdHRlcjtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbC5cbiAgICB3aW5kb3cuRXZlbnRFbWl0dGVyMiA9IEV2ZW50RW1pdHRlcjtcbiAgfVxufSgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyZWFtLCBlbCwgb3B0aW9ucykge1xuICAgIHZhciBVUkwgPSB3aW5kb3cuVVJMO1xuICAgIHZhciBvcHRzID0ge1xuICAgICAgICBhdXRvcGxheTogdHJ1ZSxcbiAgICAgICAgbWlycm9yOiBmYWxzZSxcbiAgICAgICAgbXV0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgICB2YXIgZWxlbWVudCA9IGVsIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdmFyIGl0ZW07XG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBmb3IgKGl0ZW0gaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0c1tpdGVtXSA9IG9wdGlvbnNbaXRlbV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0cy5hdXRvcGxheSkgZWxlbWVudC5hdXRvcGxheSA9ICdhdXRvcGxheSc7XG4gICAgaWYgKG9wdHMubXV0ZWQpIGVsZW1lbnQubXV0ZWQgPSB0cnVlO1xuICAgIGlmIChvcHRzLm1pcnJvcikge1xuICAgICAgICBbJycsICdtb3onLCAnd2Via2l0JywgJ28nLCAnbXMnXS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZU5hbWUgPSBwcmVmaXggPyBwcmVmaXggKyAnVHJhbnNmb3JtJyA6ICd0cmFuc2Zvcm0nO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdID0gJ3NjYWxlWCgtMSknO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGZpcnN0IG9uZSBzaG91bGQgd29yayBtb3N0IGV2ZXJ5d2hlcmUgbm93XG4gICAgLy8gYnV0IHdlIGhhdmUgYSBmZXcgZmFsbGJhY2tzIGp1c3QgaW4gY2FzZS5cbiAgICBpZiAoVVJMICYmIFVSTC5jcmVhdGVPYmplY3RVUkwpIHtcbiAgICAgICAgZWxlbWVudC5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xuICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQubW96U3JjT2JqZWN0KSB7XG4gICAgICAgIGVsZW1lbnQubW96U3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG4iLCJ2YXIgbWV0aG9kcyA9IFwiYXNzZXJ0LGNvdW50LGRlYnVnLGRpcixkaXJ4bWwsZXJyb3IsZXhjZXB0aW9uLGdyb3VwLGdyb3VwQ29sbGFwc2VkLGdyb3VwRW5kLGluZm8sbG9nLG1hcmtUaW1lbGluZSxwcm9maWxlLHByb2ZpbGVFbmQsdGltZSx0aW1lRW5kLHRyYWNlLHdhcm5cIi5zcGxpdChcIixcIik7XG52YXIgbCA9IG1ldGhvZHMubGVuZ3RoO1xudmFyIGZuID0gZnVuY3Rpb24gKCkge307XG52YXIgbW9ja2NvbnNvbGUgPSB7fTtcblxud2hpbGUgKGwtLSkge1xuICAgIG1vY2tjb25zb2xlW21ldGhvZHNbbF1dID0gZm47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9ja2NvbnNvbGU7XG4iLCIvKiEgU29ja2V0LklPLmpzIGJ1aWxkOjAuOS4xNiwgZGV2ZWxvcG1lbnQuIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT4gTUlUIExpY2Vuc2VkICovXG5cbnZhciBpbyA9ICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG1vZHVsZSA/IHt9IDogbW9kdWxlLmV4cG9ydHMpO1xuKGZ1bmN0aW9uKCkge1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBnbG9iYWwpIHtcblxuICAvKipcbiAgICogSU8gbmFtZXNwYWNlLlxuICAgKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqL1xuXG4gIHZhciBpbyA9IGV4cG9ydHM7XG5cbiAgLyoqXG4gICAqIFNvY2tldC5JTyB2ZXJzaW9uXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGlvLnZlcnNpb24gPSAnMC45LjE2JztcblxuICAvKipcbiAgICogUHJvdG9jb2wgaW1wbGVtZW50ZWQuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGlvLnByb3RvY29sID0gMTtcblxuICAvKipcbiAgICogQXZhaWxhYmxlIHRyYW5zcG9ydHMsIHRoZXNlIHdpbGwgYmUgcG9wdWxhdGVkIHdpdGggdGhlIGF2YWlsYWJsZSB0cmFuc3BvcnRzXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMgPSBbXTtcblxuICAvKipcbiAgICogS2VlcCB0cmFjayBvZiBqc29ucCBjYWxsYmFja3MuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBpby5qID0gW107XG5cbiAgLyoqXG4gICAqIEtlZXAgdHJhY2sgb2Ygb3VyIGlvLlNvY2tldHNcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBpby5zb2NrZXRzID0ge307XG5cblxuICAvKipcbiAgICogTWFuYWdlcyBjb25uZWN0aW9ucyB0byBob3N0cy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICAgKiBAUGFyYW0ge0Jvb2xlYW59IGZvcmNlIGNyZWF0aW9uIG9mIG5ldyBzb2NrZXQgKGRlZmF1bHRzIHRvIGZhbHNlKVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBpby5jb25uZWN0ID0gZnVuY3Rpb24gKGhvc3QsIGRldGFpbHMpIHtcbiAgICB2YXIgdXJpID0gaW8udXRpbC5wYXJzZVVyaShob3N0KVxuICAgICAgLCB1dXJpXG4gICAgICAsIHNvY2tldDtcblxuICAgIGlmIChnbG9iYWwgJiYgZ2xvYmFsLmxvY2F0aW9uKSB7XG4gICAgICB1cmkucHJvdG9jb2wgPSB1cmkucHJvdG9jb2wgfHwgZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sLnNsaWNlKDAsIC0xKTtcbiAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3QgfHwgKGdsb2JhbC5kb2N1bWVudFxuICAgICAgICA/IGdsb2JhbC5kb2N1bWVudC5kb21haW4gOiBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUpO1xuICAgICAgdXJpLnBvcnQgPSB1cmkucG9ydCB8fCBnbG9iYWwubG9jYXRpb24ucG9ydDtcbiAgICB9XG5cbiAgICB1dXJpID0gaW8udXRpbC51bmlxdWVVcmkodXJpKTtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBob3N0OiB1cmkuaG9zdFxuICAgICAgLCBzZWN1cmU6ICdodHRwcycgPT0gdXJpLnByb3RvY29sXG4gICAgICAsIHBvcnQ6IHVyaS5wb3J0IHx8ICgnaHR0cHMnID09IHVyaS5wcm90b2NvbCA/IDQ0MyA6IDgwKVxuICAgICAgLCBxdWVyeTogdXJpLnF1ZXJ5IHx8ICcnXG4gICAgfTtcblxuICAgIGlvLnV0aWwubWVyZ2Uob3B0aW9ucywgZGV0YWlscyk7XG5cbiAgICBpZiAob3B0aW9uc1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fCAhaW8uc29ja2V0c1t1dXJpXSkge1xuICAgICAgc29ja2V0ID0gbmV3IGlvLlNvY2tldChvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnNbJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJ10gJiYgc29ja2V0KSB7XG4gICAgICBpby5zb2NrZXRzW3V1cmldID0gc29ja2V0O1xuICAgIH1cblxuICAgIHNvY2tldCA9IHNvY2tldCB8fCBpby5zb2NrZXRzW3V1cmldO1xuXG4gICAgLy8gaWYgcGF0aCBpcyBkaWZmZXJlbnQgZnJvbSAnJyBvciAvXG4gICAgcmV0dXJuIHNvY2tldC5vZih1cmkucGF0aC5sZW5ndGggPiAxID8gdXJpLnBhdGggOiAnJyk7XG4gIH07XG5cbn0pKCdvYmplY3QnID09PSB0eXBlb2YgbW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiAodGhpcy5pbyA9IHt9KSwgdGhpcyk7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBnbG9iYWwpIHtcblxuICAvKipcbiAgICogVXRpbGl0aWVzIG5hbWVzcGFjZS5cbiAgICpcbiAgICogQG5hbWVzcGFjZVxuICAgKi9cblxuICB2YXIgdXRpbCA9IGV4cG9ydHMudXRpbCA9IHt9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW4gVVJJXG4gICAqXG4gICAqIEBhdXRob3IgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+IChNSVQgbGljZW5zZSlcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdmFyIHJlID0gL14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoW146XFwvPyMuXSspOik/KD86XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPyhbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO1xuXG4gIHZhciBwYXJ0cyA9IFsnc291cmNlJywgJ3Byb3RvY29sJywgJ2F1dGhvcml0eScsICd1c2VySW5mbycsICd1c2VyJywgJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICAgICdob3N0JywgJ3BvcnQnLCAncmVsYXRpdmUnLCAncGF0aCcsICdkaXJlY3RvcnknLCAnZmlsZScsICdxdWVyeScsXG4gICAgICAgICAgICAgICAnYW5jaG9yJ107XG5cbiAgdXRpbC5wYXJzZVVyaSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICB2YXIgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKVxuICAgICAgLCB1cmkgPSB7fVxuICAgICAgLCBpID0gMTQ7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gdXJpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQcm9kdWNlcyBhIHVuaXF1ZSB1cmwgdGhhdCBpZGVudGlmaWVzIGEgU29ja2V0LklPIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB1cmlcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC51bmlxdWVVcmkgPSBmdW5jdGlvbiAodXJpKSB7XG4gICAgdmFyIHByb3RvY29sID0gdXJpLnByb3RvY29sXG4gICAgICAsIGhvc3QgPSB1cmkuaG9zdFxuICAgICAgLCBwb3J0ID0gdXJpLnBvcnQ7XG5cbiAgICBpZiAoJ2RvY3VtZW50JyBpbiBnbG9iYWwpIHtcbiAgICAgIGhvc3QgPSBob3N0IHx8IGRvY3VtZW50LmRvbWFpbjtcbiAgICAgIHBvcnQgPSBwb3J0IHx8IChwcm90b2NvbCA9PSAnaHR0cHMnXG4gICAgICAgICYmIGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sICE9PSAnaHR0cHM6JyA/IDQ0MyA6IGRvY3VtZW50LmxvY2F0aW9uLnBvcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBob3N0ID0gaG9zdCB8fCAnbG9jYWxob3N0JztcblxuICAgICAgaWYgKCFwb3J0ICYmIHByb3RvY29sID09ICdodHRwcycpIHtcbiAgICAgICAgcG9ydCA9IDQ0MztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKHByb3RvY29sIHx8ICdodHRwJykgKyAnOi8vJyArIGhvc3QgKyAnOicgKyAocG9ydCB8fCA4MCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1lcmdlc3QgMiBxdWVyeSBzdHJpbmdzIGluIHRvIG9uY2UgdW5pcXVlIHF1ZXJ5IHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYmFzZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gYWRkaXRpb25cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5xdWVyeSA9IGZ1bmN0aW9uIChiYXNlLCBhZGRpdGlvbikge1xuICAgIHZhciBxdWVyeSA9IHV0aWwuY2h1bmtRdWVyeShiYXNlIHx8ICcnKVxuICAgICAgLCBjb21wb25lbnRzID0gW107XG5cbiAgICB1dGlsLm1lcmdlKHF1ZXJ5LCB1dGlsLmNodW5rUXVlcnkoYWRkaXRpb24gfHwgJycpKTtcbiAgICBmb3IgKHZhciBwYXJ0IGluIHF1ZXJ5KSB7XG4gICAgICBpZiAocXVlcnkuaGFzT3duUHJvcGVydHkocGFydCkpIHtcbiAgICAgICAgY29tcG9uZW50cy5wdXNoKHBhcnQgKyAnPScgKyBxdWVyeVtwYXJ0XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBvbmVudHMubGVuZ3RoID8gJz8nICsgY29tcG9uZW50cy5qb2luKCcmJykgOiAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJhbnNmb3JtcyBhIHF1ZXJ5c3RyaW5nIGluIHRvIGFuIG9iamVjdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXNcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5jaHVua1F1ZXJ5ID0gZnVuY3Rpb24gKHFzKSB7XG4gICAgdmFyIHF1ZXJ5ID0ge31cbiAgICAgICwgcGFyYW1zID0gcXMuc3BsaXQoJyYnKVxuICAgICAgLCBpID0gMFxuICAgICAgLCBsID0gcGFyYW1zLmxlbmd0aFxuICAgICAgLCBrdjtcblxuICAgIGZvciAoOyBpIDwgbDsgKytpKSB7XG4gICAgICBrdiA9IHBhcmFtc1tpXS5zcGxpdCgnPScpO1xuICAgICAgaWYgKGt2WzBdKSB7XG4gICAgICAgIHF1ZXJ5W2t2WzBdXSA9IGt2WzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBxdWVyeTtcbiAgfTtcblxuICAvKipcbiAgICogRXhlY3V0ZXMgdGhlIGdpdmVuIGZ1bmN0aW9uIHdoZW4gdGhlIHBhZ2UgaXMgbG9hZGVkLlxuICAgKlxuICAgKiAgICAgaW8udXRpbC5sb2FkKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coJ3BhZ2UgbG9hZGVkJyk7IH0pO1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB2YXIgcGFnZUxvYWRlZCA9IGZhbHNlO1xuXG4gIHV0aWwubG9hZCA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICgnZG9jdW1lbnQnIGluIGdsb2JhbCAmJiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IHBhZ2VMb2FkZWQpIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cblxuICAgIHV0aWwub24oZ2xvYmFsLCAnbG9hZCcsIGZuLCBmYWxzZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZHMgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICB1dGlsLm9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50LCBmbiwgY2FwdHVyZSkge1xuICAgIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgICBlbGVtZW50LmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgZm4pO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZuLCBjYXB0dXJlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyB0aGUgY29ycmVjdCBgWE1MSHR0cFJlcXVlc3RgIGZvciByZWd1bGFyIGFuZCBjcm9zcyBkb21haW4gcmVxdWVzdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3hkb21haW5dIENyZWF0ZSBhIHJlcXVlc3QgdGhhdCBjYW4gYmUgdXNlZCBjcm9zcyBkb21haW4uXG4gICAqIEByZXR1cm5zIHtYTUxIdHRwUmVxdWVzdHxmYWxzZX0gSWYgd2UgY2FuIGNyZWF0ZSBhIFhNTEh0dHBSZXF1ZXN0LlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdXRpbC5yZXF1ZXN0ID0gZnVuY3Rpb24gKHhkb21haW4pIHtcblxuICAgIGlmICh4ZG9tYWluICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBYRG9tYWluUmVxdWVzdCAmJiAhdXRpbC51YS5oYXNDT1JTKSB7XG4gICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgdXRpbC51YS5oYXNDT1JTKSkge1xuICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIH1cblxuICAgIGlmICgheGRvbWFpbikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3dbKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXSgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcbiAgICAgIH0gY2F0Y2goZSkgeyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIFhIUiBiYXNlZCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSBpbnRlcm5hbCBwYWdlTG9hZGVkIHZhbHVlLlxuICAgKi9cblxuICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIHdpbmRvdykge1xuICAgIHV0aWwubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICBwYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZlcnMgYSBmdW5jdGlvbiB0byBlbnN1cmUgYSBzcGlubmVyIGlzIG5vdCBkaXNwbGF5ZWQgYnkgdGhlIGJyb3dzZXJcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5kZWZlciA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICghdXRpbC51YS53ZWJraXQgfHwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGltcG9ydFNjcmlwdHMpIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cblxuICAgIHV0aWwubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KGZuLCAxMDApO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXJnZXMgdHdvIG9iamVjdHMuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSAodGFyZ2V0LCBhZGRpdGlvbmFsLCBkZWVwLCBsYXN0c2Vlbikge1xuICAgIHZhciBzZWVuID0gbGFzdHNlZW4gfHwgW11cbiAgICAgICwgZGVwdGggPSB0eXBlb2YgZGVlcCA9PSAndW5kZWZpbmVkJyA/IDIgOiBkZWVwXG4gICAgICAsIHByb3A7XG5cbiAgICBmb3IgKHByb3AgaW4gYWRkaXRpb25hbCkge1xuICAgICAgaWYgKGFkZGl0aW9uYWwuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgdXRpbC5pbmRleE9mKHNlZW4sIHByb3ApIDwgMCkge1xuICAgICAgICBpZiAodHlwZW9mIHRhcmdldFtwcm9wXSAhPT0gJ29iamVjdCcgfHwgIWRlcHRoKSB7XG4gICAgICAgICAgdGFyZ2V0W3Byb3BdID0gYWRkaXRpb25hbFtwcm9wXTtcbiAgICAgICAgICBzZWVuLnB1c2goYWRkaXRpb25hbFtwcm9wXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXRpbC5tZXJnZSh0YXJnZXRbcHJvcF0sIGFkZGl0aW9uYWxbcHJvcF0sIGRlcHRoIC0gMSwgc2Vlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXJnZXMgcHJvdG90eXBlcyBmcm9tIG9iamVjdHNcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5taXhpbiA9IGZ1bmN0aW9uIChjdG9yLCBjdG9yMikge1xuICAgIHV0aWwubWVyZ2UoY3Rvci5wcm90b3R5cGUsIGN0b3IyLnByb3RvdHlwZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0IGZvciBwcm90b3R5cGljYWwgYW5kIHN0YXRpYyBpbmhlcml0YW5jZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHV0aWwuaW5oZXJpdCA9IGZ1bmN0aW9uIChjdG9yLCBjdG9yMikge1xuICAgIGZ1bmN0aW9uIGYoKSB7fTtcbiAgICBmLnByb3RvdHlwZSA9IGN0b3IyLnByb3RvdHlwZTtcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBmO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGdpdmVuIG9iamVjdCBpcyBhbiBBcnJheS5cbiAgICpcbiAgICogICAgIGlvLnV0aWwuaXNBcnJheShbXSk7IC8vIHRydWVcbiAgICogICAgIGlvLnV0aWwuaXNBcnJheSh7fSk7IC8vIGZhbHNlXG4gICAqXG4gICAqIEBwYXJhbSBPYmplY3Qgb2JqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwuaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICAvKipcbiAgICogSW50ZXJzZWN0cyB2YWx1ZXMgb2YgdHdvIGFycmF5cyBpbnRvIGEgdGhpcmRcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5pbnRlcnNlY3QgPSBmdW5jdGlvbiAoYXJyLCBhcnIyKSB7XG4gICAgdmFyIHJldCA9IFtdXG4gICAgICAsIGxvbmdlc3QgPSBhcnIubGVuZ3RoID4gYXJyMi5sZW5ndGggPyBhcnIgOiBhcnIyXG4gICAgICAsIHNob3J0ZXN0ID0gYXJyLmxlbmd0aCA+IGFycjIubGVuZ3RoID8gYXJyMiA6IGFycjtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gc2hvcnRlc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAofnV0aWwuaW5kZXhPZihsb25nZXN0LCBzaG9ydGVzdFtpXSkpXG4gICAgICAgIHJldC5wdXNoKHNob3J0ZXN0W2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcnJheSBpbmRleE9mIGNvbXBhdGliaWxpdHkuXG4gICAqXG4gICAqIEBzZWUgYml0Lmx5L2E1RHhhMlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmluZGV4T2YgPSBmdW5jdGlvbiAoYXJyLCBvLCBpKSB7XG5cbiAgICBmb3IgKHZhciBqID0gYXJyLmxlbmd0aCwgaSA9IGkgPCAwID8gaSArIGogPCAwID8gMCA6IGkgKyBqIDogaSB8fCAwO1xuICAgICAgICAgaSA8IGogJiYgYXJyW2ldICE9PSBvOyBpKyspIHt9XG5cbiAgICByZXR1cm4gaiA8PSBpID8gLTEgOiBpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBlbnVtZXJhYmxlcyB0byBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC50b0FycmF5ID0gZnVuY3Rpb24gKGVudSkge1xuICAgIHZhciBhcnIgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZW51Lmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgIGFyci5wdXNoKGVudVtpXSk7XG5cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVQSAvIGVuZ2luZXMgZGV0ZWN0aW9uIG5hbWVzcGFjZS5cbiAgICpcbiAgICogQG5hbWVzcGFjZVxuICAgKi9cblxuICB1dGlsLnVhID0ge307XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIFVBIHN1cHBvcnRzIENPUlMgZm9yIFhIUi5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC51YS5oYXNDT1JTID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmIChmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBhID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBhLndpdGhDcmVkZW50aWFscyAhPSB1bmRlZmluZWQ7XG4gIH0pKCk7XG5cbiAgLyoqXG4gICAqIERldGVjdCB3ZWJraXQuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwudWEud2Via2l0ID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG5hdmlnYXRvclxuICAgICYmIC93ZWJraXQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gICAvKipcbiAgICogRGV0ZWN0IGlQYWQvaVBob25lL2lQb2QuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwudWEuaURldmljZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBuYXZpZ2F0b3JcbiAgICAgICYmIC9pUGFkfGlQaG9uZXxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxufSkoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0cywgdGhpcyk7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVyIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpYy5cbiAgICovXG5cbiAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyICgpIHt9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgbGlzdGVuZXJcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIGlmICghdGhpcy4kZXZlbnRzKSB7XG4gICAgICB0aGlzLiRldmVudHMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuJGV2ZW50c1tuYW1lXSkge1xuICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gZm47XG4gICAgfSBlbHNlIGlmIChpby51dGlsLmlzQXJyYXkodGhpcy4kZXZlbnRzW25hbWVdKSkge1xuICAgICAgdGhpcy4kZXZlbnRzW25hbWVdLnB1c2goZm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0gPSBbdGhpcy4kZXZlbnRzW25hbWVdLCBmbl07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbiAgLyoqXG4gICAqIEFkZHMgYSB2b2xhdGlsZSBsaXN0ZW5lci5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gb24gKCkge1xuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcihuYW1lLCBvbik7XG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBvbi5saXN0ZW5lciA9IGZuO1xuICAgIHRoaXMub24obmFtZSwgb24pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBsaXN0ZW5lci5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIGlmICh0aGlzLiRldmVudHMgJiYgdGhpcy4kZXZlbnRzW25hbWVdKSB7XG4gICAgICB2YXIgbGlzdCA9IHRoaXMuJGV2ZW50c1tuYW1lXTtcblxuICAgICAgaWYgKGlvLnV0aWwuaXNBcnJheShsaXN0KSkge1xuICAgICAgICB2YXIgcG9zID0gLTE7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBmbiB8fCAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBmbikpIHtcbiAgICAgICAgICAgIHBvcyA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zIDwgMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5zcGxpY2UocG9zLCAxKTtcblxuICAgICAgICBpZiAoIWxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuJGV2ZW50c1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsaXN0ID09PSBmbiB8fCAobGlzdC5saXN0ZW5lciAmJiBsaXN0Lmxpc3RlbmVyID09PSBmbikpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuJGV2ZW50c1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZvciBhbiBldmVudC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuJGV2ZW50cyA9IHt9O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJGV2ZW50cyAmJiB0aGlzLiRldmVudHNbbmFtZV0pIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIGxpc3RlbmVycyBmb3IgYSBjZXJ0YWluIGV2ZW50LlxuICAgKlxuICAgKiBAYXBpIHB1YmxjaVxuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLiRldmVudHMpIHtcbiAgICAgIHRoaXMuJGV2ZW50cyA9IHt9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy4kZXZlbnRzW25hbWVdKSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBpZiAoIWlvLnV0aWwuaXNBcnJheSh0aGlzLiRldmVudHNbbmFtZV0pKSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0gPSBbdGhpcy4kZXZlbnRzW25hbWVdXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy4kZXZlbnRzW25hbWVdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuJGV2ZW50cykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBoYW5kbGVyID0gdGhpcy4kZXZlbnRzW25hbWVdO1xuXG4gICAgaWYgKCFoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGhhbmRsZXIpIHtcbiAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBlbHNlIGlmIChpby51dGlsLmlzQXJyYXkoaGFuZGxlcikpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiBCYXNlZCBvbiBKU09OMiAoaHR0cDovL3d3dy5KU09OLm9yZy9qcy5odG1sKS5cbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIG5hdGl2ZUpTT04pIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gdXNlIG5hdGl2ZSBKU09OIGlmIGl0J3MgYXZhaWxhYmxlXG4gIGlmIChuYXRpdmVKU09OICYmIG5hdGl2ZUpTT04ucGFyc2Upe1xuICAgIHJldHVybiBleHBvcnRzLkpTT04gPSB7XG4gICAgICBwYXJzZTogbmF0aXZlSlNPTi5wYXJzZVxuICAgICwgc3RyaW5naWZ5OiBuYXRpdmVKU09OLnN0cmluZ2lmeVxuICAgIH07XG4gIH1cblxuICB2YXIgSlNPTiA9IGV4cG9ydHMuSlNPTiA9IHt9O1xuXG4gIGZ1bmN0aW9uIGYobikge1xuICAgICAgLy8gRm9ybWF0IGludGVnZXJzIHRvIGhhdmUgYXQgbGVhc3QgdHdvIGRpZ2l0cy5cbiAgICAgIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuIDogbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRhdGUoZCwga2V5KSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKGQudmFsdWVPZigpKSA/XG4gICAgICAgIGQuZ2V0VVRDRnVsbFllYXIoKSAgICAgKyAnLScgK1xuICAgICAgICBmKGQuZ2V0VVRDTW9udGgoKSArIDEpICsgJy0nICtcbiAgICAgICAgZihkLmdldFVUQ0RhdGUoKSkgICAgICArICdUJyArXG4gICAgICAgIGYoZC5nZXRVVENIb3VycygpKSAgICAgKyAnOicgK1xuICAgICAgICBmKGQuZ2V0VVRDTWludXRlcygpKSAgICsgJzonICtcbiAgICAgICAgZihkLmdldFVUQ1NlY29uZHMoKSkgICArICdaJyA6IG51bGw7XG4gIH07XG5cbiAgdmFyIGN4ID0gL1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgICBlc2NhcGFibGUgPSAvW1xcXFxcXFwiXFx4MDAtXFx4MWZcXHg3Zi1cXHg5ZlxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLFxuICAgICAgZ2FwLFxuICAgICAgaW5kZW50LFxuICAgICAgbWV0YSA9IHsgICAgLy8gdGFibGUgb2YgY2hhcmFjdGVyIHN1YnN0aXR1dGlvbnNcbiAgICAgICAgICAnXFxiJzogJ1xcXFxiJyxcbiAgICAgICAgICAnXFx0JzogJ1xcXFx0JyxcbiAgICAgICAgICAnXFxuJzogJ1xcXFxuJyxcbiAgICAgICAgICAnXFxmJzogJ1xcXFxmJyxcbiAgICAgICAgICAnXFxyJzogJ1xcXFxyJyxcbiAgICAgICAgICAnXCInIDogJ1xcXFxcIicsXG4gICAgICAgICAgJ1xcXFwnOiAnXFxcXFxcXFwnXG4gICAgICB9LFxuICAgICAgcmVwO1xuXG5cbiAgZnVuY3Rpb24gcXVvdGUoc3RyaW5nKSB7XG5cbi8vIElmIHRoZSBzdHJpbmcgY29udGFpbnMgbm8gY29udHJvbCBjaGFyYWN0ZXJzLCBubyBxdW90ZSBjaGFyYWN0ZXJzLCBhbmQgbm9cbi8vIGJhY2tzbGFzaCBjaGFyYWN0ZXJzLCB0aGVuIHdlIGNhbiBzYWZlbHkgc2xhcCBzb21lIHF1b3RlcyBhcm91bmQgaXQuXG4vLyBPdGhlcndpc2Ugd2UgbXVzdCBhbHNvIHJlcGxhY2UgdGhlIG9mZmVuZGluZyBjaGFyYWN0ZXJzIHdpdGggc2FmZSBlc2NhcGVcbi8vIHNlcXVlbmNlcy5cblxuICAgICAgZXNjYXBhYmxlLmxhc3RJbmRleCA9IDA7XG4gICAgICByZXR1cm4gZXNjYXBhYmxlLnRlc3Qoc3RyaW5nKSA/ICdcIicgKyBzdHJpbmcucmVwbGFjZShlc2NhcGFibGUsIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgdmFyIGMgPSBtZXRhW2FdO1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgYyA9PT0gJ3N0cmluZycgPyBjIDpcbiAgICAgICAgICAgICAgJ1xcXFx1JyArICgnMDAwMCcgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7XG4gICAgICB9KSArICdcIicgOiAnXCInICsgc3RyaW5nICsgJ1wiJztcbiAgfVxuXG5cbiAgZnVuY3Rpb24gc3RyKGtleSwgaG9sZGVyKSB7XG5cbi8vIFByb2R1Y2UgYSBzdHJpbmcgZnJvbSBob2xkZXJba2V5XS5cblxuICAgICAgdmFyIGksICAgICAgICAgIC8vIFRoZSBsb29wIGNvdW50ZXIuXG4gICAgICAgICAgaywgICAgICAgICAgLy8gVGhlIG1lbWJlciBrZXkuXG4gICAgICAgICAgdiwgICAgICAgICAgLy8gVGhlIG1lbWJlciB2YWx1ZS5cbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgbWluZCA9IGdhcCxcbiAgICAgICAgICBwYXJ0aWFsLFxuICAgICAgICAgIHZhbHVlID0gaG9sZGVyW2tleV07XG5cbi8vIElmIHRoZSB2YWx1ZSBoYXMgYSB0b0pTT04gbWV0aG9kLCBjYWxsIGl0IHRvIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuXG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgdmFsdWUgPSBkYXRlKGtleSk7XG4gICAgICB9XG5cbi8vIElmIHdlIHdlcmUgY2FsbGVkIHdpdGggYSByZXBsYWNlciBmdW5jdGlvbiwgdGhlbiBjYWxsIHRoZSByZXBsYWNlciB0b1xuLy8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG5cbiAgICAgIGlmICh0eXBlb2YgcmVwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSByZXAuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xuICAgICAgfVxuXG4vLyBXaGF0IGhhcHBlbnMgbmV4dCBkZXBlbmRzIG9uIHRoZSB2YWx1ZSdzIHR5cGUuXG5cbiAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHJldHVybiBxdW90ZSh2YWx1ZSk7XG5cbiAgICAgIGNhc2UgJ251bWJlcic6XG5cbi8vIEpTT04gbnVtYmVycyBtdXN0IGJlIGZpbml0ZS4gRW5jb2RlIG5vbi1maW5pdGUgbnVtYmVycyBhcyBudWxsLlxuXG4gICAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbHVlKSA/IFN0cmluZyh2YWx1ZSkgOiAnbnVsbCc7XG5cbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnbnVsbCc6XG5cbi8vIElmIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW4gb3IgbnVsbCwgY29udmVydCBpdCB0byBhIHN0cmluZy4gTm90ZTpcbi8vIHR5cGVvZiBudWxsIGRvZXMgbm90IHByb2R1Y2UgJ251bGwnLiBUaGUgY2FzZSBpcyBpbmNsdWRlZCBoZXJlIGluXG4vLyB0aGUgcmVtb3RlIGNoYW5jZSB0aGF0IHRoaXMgZ2V0cyBmaXhlZCBzb21lZGF5LlxuXG4gICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG5cbi8vIElmIHRoZSB0eXBlIGlzICdvYmplY3QnLCB3ZSBtaWdodCBiZSBkZWFsaW5nIHdpdGggYW4gb2JqZWN0IG9yIGFuIGFycmF5IG9yXG4vLyBudWxsLlxuXG4gICAgICBjYXNlICdvYmplY3QnOlxuXG4vLyBEdWUgdG8gYSBzcGVjaWZpY2F0aW9uIGJsdW5kZXIgaW4gRUNNQVNjcmlwdCwgdHlwZW9mIG51bGwgaXMgJ29iamVjdCcsXG4vLyBzbyB3YXRjaCBvdXQgZm9yIHRoYXQgY2FzZS5cblxuICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICAgICAgICB9XG5cbi8vIE1ha2UgYW4gYXJyYXkgdG8gaG9sZCB0aGUgcGFydGlhbCByZXN1bHRzIG9mIHN0cmluZ2lmeWluZyB0aGlzIG9iamVjdCB2YWx1ZS5cblxuICAgICAgICAgIGdhcCArPSBpbmRlbnQ7XG4gICAgICAgICAgcGFydGlhbCA9IFtdO1xuXG4vLyBJcyB0aGUgdmFsdWUgYW4gYXJyYXk/XG5cbiAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcblxuLy8gVGhlIHZhbHVlIGlzIGFuIGFycmF5LiBTdHJpbmdpZnkgZXZlcnkgZWxlbWVudC4gVXNlIG51bGwgYXMgYSBwbGFjZWhvbGRlclxuLy8gZm9yIG5vbi1KU09OIHZhbHVlcy5cblxuICAgICAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgcGFydGlhbFtpXSA9IHN0cihpLCB2YWx1ZSkgfHwgJ251bGwnO1xuICAgICAgICAgICAgICB9XG5cbi8vIEpvaW4gYWxsIG9mIHRoZSBlbGVtZW50cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLCBhbmQgd3JhcCB0aGVtIGluXG4vLyBicmFja2V0cy5cblxuICAgICAgICAgICAgICB2ID0gcGFydGlhbC5sZW5ndGggPT09IDAgPyAnW10nIDogZ2FwID9cbiAgICAgICAgICAgICAgICAgICdbXFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ10nIDpcbiAgICAgICAgICAgICAgICAgICdbJyArIHBhcnRpYWwuam9pbignLCcpICsgJ10nO1xuICAgICAgICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICB9XG5cbi8vIElmIHRoZSByZXBsYWNlciBpcyBhbiBhcnJheSwgdXNlIGl0IHRvIHNlbGVjdCB0aGUgbWVtYmVycyB0byBiZSBzdHJpbmdpZmllZC5cblxuICAgICAgICAgIGlmIChyZXAgJiYgdHlwZW9mIHJlcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgbGVuZ3RoID0gcmVwLmxlbmd0aDtcbiAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlcFtpXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICBrID0gcmVwW2ldO1xuICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG5cbi8vIE90aGVyd2lzZSwgaXRlcmF0ZSB0aHJvdWdoIGFsbCBvZiB0aGUga2V5cyBpbiB0aGUgb2JqZWN0LlxuXG4gICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbi8vIEpvaW4gYWxsIG9mIHRoZSBtZW1iZXIgdGV4dHMgdG9nZXRoZXIsIHNlcGFyYXRlZCB3aXRoIGNvbW1hcyxcbi8vIGFuZCB3cmFwIHRoZW0gaW4gYnJhY2VzLlxuXG4gICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ3t9JyA6IGdhcCA/XG4gICAgICAgICAgICAgICd7XFxuJyArIGdhcCArIHBhcnRpYWwuam9pbignLFxcbicgKyBnYXApICsgJ1xcbicgKyBtaW5kICsgJ30nIDpcbiAgICAgICAgICAgICAgJ3snICsgcGFydGlhbC5qb2luKCcsJykgKyAnfSc7XG4gICAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgICByZXR1cm4gdjtcbiAgICAgIH1cbiAgfVxuXG4vLyBJZiB0aGUgSlNPTiBvYmplY3QgZG9lcyBub3QgeWV0IGhhdmUgYSBzdHJpbmdpZnkgbWV0aG9kLCBnaXZlIGl0IG9uZS5cblxuICBKU09OLnN0cmluZ2lmeSA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVwbGFjZXIsIHNwYWNlKSB7XG5cbi8vIFRoZSBzdHJpbmdpZnkgbWV0aG9kIHRha2VzIGEgdmFsdWUgYW5kIGFuIG9wdGlvbmFsIHJlcGxhY2VyLCBhbmQgYW4gb3B0aW9uYWxcbi8vIHNwYWNlIHBhcmFtZXRlciwgYW5kIHJldHVybnMgYSBKU09OIHRleHQuIFRoZSByZXBsYWNlciBjYW4gYmUgYSBmdW5jdGlvblxuLy8gdGhhdCBjYW4gcmVwbGFjZSB2YWx1ZXMsIG9yIGFuIGFycmF5IG9mIHN0cmluZ3MgdGhhdCB3aWxsIHNlbGVjdCB0aGUga2V5cy5cbi8vIEEgZGVmYXVsdCByZXBsYWNlciBtZXRob2QgY2FuIGJlIHByb3ZpZGVkLiBVc2Ugb2YgdGhlIHNwYWNlIHBhcmFtZXRlciBjYW5cbi8vIHByb2R1Y2UgdGV4dCB0aGF0IGlzIG1vcmUgZWFzaWx5IHJlYWRhYmxlLlxuXG4gICAgICB2YXIgaTtcbiAgICAgIGdhcCA9ICcnO1xuICAgICAgaW5kZW50ID0gJyc7XG5cbi8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBudW1iZXIsIG1ha2UgYW4gaW5kZW50IHN0cmluZyBjb250YWluaW5nIHRoYXRcbi8vIG1hbnkgc3BhY2VzLlxuXG4gICAgICBpZiAodHlwZW9mIHNwYWNlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzcGFjZTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGluZGVudCArPSAnICc7XG4gICAgICAgICAgfVxuXG4vLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgc3RyaW5nLCBpdCB3aWxsIGJlIHVzZWQgYXMgdGhlIGluZGVudCBzdHJpbmcuXG5cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGluZGVudCA9IHNwYWNlO1xuICAgICAgfVxuXG4vLyBJZiB0aGVyZSBpcyBhIHJlcGxhY2VyLCBpdCBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgYW4gYXJyYXkuXG4vLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yLlxuXG4gICAgICByZXAgPSByZXBsYWNlcjtcbiAgICAgIGlmIChyZXBsYWNlciAmJiB0eXBlb2YgcmVwbGFjZXIgIT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgICAgICAgKHR5cGVvZiByZXBsYWNlciAhPT0gJ29iamVjdCcgfHxcbiAgICAgICAgICAgICAgdHlwZW9mIHJlcGxhY2VyLmxlbmd0aCAhPT0gJ251bWJlcicpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdKU09OLnN0cmluZ2lmeScpO1xuICAgICAgfVxuXG4vLyBNYWtlIGEgZmFrZSByb290IG9iamVjdCBjb250YWluaW5nIG91ciB2YWx1ZSB1bmRlciB0aGUga2V5IG9mICcnLlxuLy8gUmV0dXJuIHRoZSByZXN1bHQgb2Ygc3RyaW5naWZ5aW5nIHRoZSB2YWx1ZS5cblxuICAgICAgcmV0dXJuIHN0cignJywgeycnOiB2YWx1ZX0pO1xuICB9O1xuXG4vLyBJZiB0aGUgSlNPTiBvYmplY3QgZG9lcyBub3QgeWV0IGhhdmUgYSBwYXJzZSBtZXRob2QsIGdpdmUgaXQgb25lLlxuXG4gIEpTT04ucGFyc2UgPSBmdW5jdGlvbiAodGV4dCwgcmV2aXZlcikge1xuICAvLyBUaGUgcGFyc2UgbWV0aG9kIHRha2VzIGEgdGV4dCBhbmQgYW4gb3B0aW9uYWwgcmV2aXZlciBmdW5jdGlvbiwgYW5kIHJldHVybnNcbiAgLy8gYSBKYXZhU2NyaXB0IHZhbHVlIGlmIHRoZSB0ZXh0IGlzIGEgdmFsaWQgSlNPTiB0ZXh0LlxuXG4gICAgICB2YXIgajtcblxuICAgICAgZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xuXG4gIC8vIFRoZSB3YWxrIG1ldGhvZCBpcyB1c2VkIHRvIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIHJlc3VsdGluZyBzdHJ1Y3R1cmUgc29cbiAgLy8gdGhhdCBtb2RpZmljYXRpb25zIGNhbiBiZSBtYWRlLlxuXG4gICAgICAgICAgdmFyIGssIHYsIHZhbHVlID0gaG9sZGVyW2tleV07XG4gICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHYgPSB3YWxrKHZhbHVlLCBrKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2tdID0gdjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdmFsdWVba107XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICAgIH1cblxuXG4gIC8vIFBhcnNpbmcgaGFwcGVucyBpbiBmb3VyIHN0YWdlcy4gSW4gdGhlIGZpcnN0IHN0YWdlLCB3ZSByZXBsYWNlIGNlcnRhaW5cbiAgLy8gVW5pY29kZSBjaGFyYWN0ZXJzIHdpdGggZXNjYXBlIHNlcXVlbmNlcy4gSmF2YVNjcmlwdCBoYW5kbGVzIG1hbnkgY2hhcmFjdGVyc1xuICAvLyBpbmNvcnJlY3RseSwgZWl0aGVyIHNpbGVudGx5IGRlbGV0aW5nIHRoZW0sIG9yIHRyZWF0aW5nIHRoZW0gYXMgbGluZSBlbmRpbmdzLlxuXG4gICAgICB0ZXh0ID0gU3RyaW5nKHRleHQpO1xuICAgICAgY3gubGFzdEluZGV4ID0gMDtcbiAgICAgIGlmIChjeC50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShjeCwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdcXFxcdScgK1xuICAgICAgICAgICAgICAgICAgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAvLyBJbiB0aGUgc2Vjb25kIHN0YWdlLCB3ZSBydW4gdGhlIHRleHQgYWdhaW5zdCByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgbG9va1xuICAvLyBmb3Igbm9uLUpTT04gcGF0dGVybnMuIFdlIGFyZSBlc3BlY2lhbGx5IGNvbmNlcm5lZCB3aXRoICcoKScgYW5kICduZXcnXG4gIC8vIGJlY2F1c2UgdGhleSBjYW4gY2F1c2UgaW52b2NhdGlvbiwgYW5kICc9JyBiZWNhdXNlIGl0IGNhbiBjYXVzZSBtdXRhdGlvbi5cbiAgLy8gQnV0IGp1c3QgdG8gYmUgc2FmZSwgd2Ugd2FudCB0byByZWplY3QgYWxsIHVuZXhwZWN0ZWQgZm9ybXMuXG5cbiAgLy8gV2Ugc3BsaXQgdGhlIHNlY29uZCBzdGFnZSBpbnRvIDQgcmVnZXhwIG9wZXJhdGlvbnMgaW4gb3JkZXIgdG8gd29yayBhcm91bmRcbiAgLy8gY3JpcHBsaW5nIGluZWZmaWNpZW5jaWVzIGluIElFJ3MgYW5kIFNhZmFyaSdzIHJlZ2V4cCBlbmdpbmVzLiBGaXJzdCB3ZVxuICAvLyByZXBsYWNlIHRoZSBKU09OIGJhY2tzbGFzaCBwYWlycyB3aXRoICdAJyAoYSBub24tSlNPTiBjaGFyYWN0ZXIpLiBTZWNvbmQsIHdlXG4gIC8vIHJlcGxhY2UgYWxsIHNpbXBsZSB2YWx1ZSB0b2tlbnMgd2l0aCAnXScgY2hhcmFjdGVycy4gVGhpcmQsIHdlIGRlbGV0ZSBhbGxcbiAgLy8gb3BlbiBicmFja2V0cyB0aGF0IGZvbGxvdyBhIGNvbG9uIG9yIGNvbW1hIG9yIHRoYXQgYmVnaW4gdGhlIHRleHQuIEZpbmFsbHksXG4gIC8vIHdlIGxvb2sgdG8gc2VlIHRoYXQgdGhlIHJlbWFpbmluZyBjaGFyYWN0ZXJzIGFyZSBvbmx5IHdoaXRlc3BhY2Ugb3IgJ10nIG9yXG4gIC8vICcsJyBvciAnOicgb3IgJ3snIG9yICd9Jy4gSWYgdGhhdCBpcyBzbywgdGhlbiB0aGUgdGV4dCBpcyBzYWZlIGZvciBldmFsLlxuXG4gICAgICBpZiAoL15bXFxdLDp7fVxcc10qJC9cbiAgICAgICAgICAgICAgLnRlc3QodGV4dC5yZXBsYWNlKC9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1WzAtOWEtZkEtRl17NH0pL2csICdAJylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIlteXCJcXFxcXFxuXFxyXSpcInx0cnVlfGZhbHNlfG51bGx8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8vZywgJ10nKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyg/Ol58OnwsKSg/OlxccypcXFspKy9nLCAnJykpKSB7XG5cbiAgLy8gSW4gdGhlIHRoaXJkIHN0YWdlIHdlIHVzZSB0aGUgZXZhbCBmdW5jdGlvbiB0byBjb21waWxlIHRoZSB0ZXh0IGludG8gYVxuICAvLyBKYXZhU2NyaXB0IHN0cnVjdHVyZS4gVGhlICd7JyBvcGVyYXRvciBpcyBzdWJqZWN0IHRvIGEgc3ludGFjdGljIGFtYmlndWl0eVxuICAvLyBpbiBKYXZhU2NyaXB0OiBpdCBjYW4gYmVnaW4gYSBibG9jayBvciBhbiBvYmplY3QgbGl0ZXJhbC4gV2Ugd3JhcCB0aGUgdGV4dFxuICAvLyBpbiBwYXJlbnMgdG8gZWxpbWluYXRlIHRoZSBhbWJpZ3VpdHkuXG5cbiAgICAgICAgICBqID0gZXZhbCgnKCcgKyB0ZXh0ICsgJyknKTtcblxuICAvLyBJbiB0aGUgb3B0aW9uYWwgZm91cnRoIHN0YWdlLCB3ZSByZWN1cnNpdmVseSB3YWxrIHRoZSBuZXcgc3RydWN0dXJlLCBwYXNzaW5nXG4gIC8vIGVhY2ggbmFtZS92YWx1ZSBwYWlyIHRvIGEgcmV2aXZlciBmdW5jdGlvbiBmb3IgcG9zc2libGUgdHJhbnNmb3JtYXRpb24uXG5cbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHJldml2ZXIgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICB3YWxrKHsnJzogan0sICcnKSA6IGo7XG4gICAgICB9XG5cbiAgLy8gSWYgdGhlIHRleHQgaXMgbm90IEpTT04gcGFyc2VhYmxlLCB0aGVuIGEgU3ludGF4RXJyb3IgaXMgdGhyb3duLlxuXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0pTT04ucGFyc2UnKTtcbiAgfTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsIHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJyA/IEpTT04gOiB1bmRlZmluZWRcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIFBhcnNlciBuYW1lc3BhY2UuXG4gICAqXG4gICAqIEBuYW1lc3BhY2VcbiAgICovXG5cbiAgdmFyIHBhcnNlciA9IGV4cG9ydHMucGFyc2VyID0ge307XG5cbiAgLyoqXG4gICAqIFBhY2tldCB0eXBlcy5cbiAgICovXG5cbiAgdmFyIHBhY2tldHMgPSBwYXJzZXIucGFja2V0cyA9IFtcbiAgICAgICdkaXNjb25uZWN0J1xuICAgICwgJ2Nvbm5lY3QnXG4gICAgLCAnaGVhcnRiZWF0J1xuICAgICwgJ21lc3NhZ2UnXG4gICAgLCAnanNvbidcbiAgICAsICdldmVudCdcbiAgICAsICdhY2snXG4gICAgLCAnZXJyb3InXG4gICAgLCAnbm9vcCdcbiAgXTtcblxuICAvKipcbiAgICogRXJyb3JzIHJlYXNvbnMuXG4gICAqL1xuXG4gIHZhciByZWFzb25zID0gcGFyc2VyLnJlYXNvbnMgPSBbXG4gICAgICAndHJhbnNwb3J0IG5vdCBzdXBwb3J0ZWQnXG4gICAgLCAnY2xpZW50IG5vdCBoYW5kc2hha2VuJ1xuICAgICwgJ3VuYXV0aG9yaXplZCdcbiAgXTtcblxuICAvKipcbiAgICogRXJyb3JzIGFkdmljZS5cbiAgICovXG5cbiAgdmFyIGFkdmljZSA9IHBhcnNlci5hZHZpY2UgPSBbXG4gICAgICAncmVjb25uZWN0J1xuICBdO1xuXG4gIC8qKlxuICAgKiBTaG9ydGN1dHMuXG4gICAqL1xuXG4gIHZhciBKU09OID0gaW8uSlNPTlxuICAgICwgaW5kZXhPZiA9IGlvLnV0aWwuaW5kZXhPZjtcblxuICAvKipcbiAgICogRW5jb2RlcyBhIHBhY2tldC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHBhcnNlci5lbmNvZGVQYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdmFyIHR5cGUgPSBpbmRleE9mKHBhY2tldHMsIHBhY2tldC50eXBlKVxuICAgICAgLCBpZCA9IHBhY2tldC5pZCB8fCAnJ1xuICAgICAgLCBlbmRwb2ludCA9IHBhY2tldC5lbmRwb2ludCB8fCAnJ1xuICAgICAgLCBhY2sgPSBwYWNrZXQuYWNrXG4gICAgICAsIGRhdGEgPSBudWxsO1xuXG4gICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB2YXIgcmVhc29uID0gcGFja2V0LnJlYXNvbiA/IGluZGV4T2YocmVhc29ucywgcGFja2V0LnJlYXNvbikgOiAnJ1xuICAgICAgICAgICwgYWR2ID0gcGFja2V0LmFkdmljZSA/IGluZGV4T2YoYWR2aWNlLCBwYWNrZXQuYWR2aWNlKSA6ICcnO1xuXG4gICAgICAgIGlmIChyZWFzb24gIT09ICcnIHx8IGFkdiAhPT0gJycpXG4gICAgICAgICAgZGF0YSA9IHJlYXNvbiArIChhZHYgIT09ICcnID8gKCcrJyArIGFkdikgOiAnJyk7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICBpZiAocGFja2V0LmRhdGEgIT09ICcnKVxuICAgICAgICAgIGRhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2V2ZW50JzpcbiAgICAgICAgdmFyIGV2ID0geyBuYW1lOiBwYWNrZXQubmFtZSB9O1xuXG4gICAgICAgIGlmIChwYWNrZXQuYXJncyAmJiBwYWNrZXQuYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICBldi5hcmdzID0gcGFja2V0LmFyZ3M7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZXYpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShwYWNrZXQuZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjb25uZWN0JzpcbiAgICAgICAgaWYgKHBhY2tldC5xcylcbiAgICAgICAgICBkYXRhID0gcGFja2V0LnFzO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYWNrJzpcbiAgICAgICAgZGF0YSA9IHBhY2tldC5hY2tJZFxuICAgICAgICAgICsgKHBhY2tldC5hcmdzICYmIHBhY2tldC5hcmdzLmxlbmd0aFxuICAgICAgICAgICAgICA/ICcrJyArIEpTT04uc3RyaW5naWZ5KHBhY2tldC5hcmdzKSA6ICcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gY29uc3RydWN0IHBhY2tldCB3aXRoIHJlcXVpcmVkIGZyYWdtZW50c1xuICAgIHZhciBlbmNvZGVkID0gW1xuICAgICAgICB0eXBlXG4gICAgICAsIGlkICsgKGFjayA9PSAnZGF0YScgPyAnKycgOiAnJylcbiAgICAgICwgZW5kcG9pbnRcbiAgICBdO1xuXG4gICAgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuICAgIGlmIChkYXRhICE9PSBudWxsICYmIGRhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgIGVuY29kZWQucHVzaChkYXRhKTtcblxuICAgIHJldHVybiBlbmNvZGVkLmpvaW4oJzonKTtcbiAgfTtcblxuICAvKipcbiAgICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IG1lc3NhZ2VzXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBwYXJzZXIuZW5jb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gICAgdmFyIGRlY29kZWQgPSAnJztcblxuICAgIGlmIChwYWNrZXRzLmxlbmd0aCA9PSAxKVxuICAgICAgcmV0dXJuIHBhY2tldHNbMF07XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHBhY2tldHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgIGRlY29kZWQgKz0gJ1xcdWZmZmQnICsgcGFja2V0Lmxlbmd0aCArICdcXHVmZmZkJyArIHBhY2tldHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlY29kZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlY29kZXMgYSBwYWNrZXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHZhciByZWdleHAgPSAvKFteOl0rKTooWzAtOV0rKT8oXFwrKT86KFteOl0rKT86PyhbXFxzXFxTXSopPy87XG5cbiAgcGFyc2VyLmRlY29kZVBhY2tldCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHBpZWNlcyA9IGRhdGEubWF0Y2gocmVnZXhwKTtcblxuICAgIGlmICghcGllY2VzKSByZXR1cm4ge307XG5cbiAgICB2YXIgaWQgPSBwaWVjZXNbMl0gfHwgJydcbiAgICAgICwgZGF0YSA9IHBpZWNlc1s1XSB8fCAnJ1xuICAgICAgLCBwYWNrZXQgPSB7XG4gICAgICAgICAgICB0eXBlOiBwYWNrZXRzW3BpZWNlc1sxXV1cbiAgICAgICAgICAsIGVuZHBvaW50OiBwaWVjZXNbNF0gfHwgJydcbiAgICAgICAgfTtcblxuICAgIC8vIHdoZXRoZXIgd2UgbmVlZCB0byBhY2tub3dsZWRnZSB0aGUgcGFja2V0XG4gICAgaWYgKGlkKSB7XG4gICAgICBwYWNrZXQuaWQgPSBpZDtcbiAgICAgIGlmIChwaWVjZXNbM10pXG4gICAgICAgIHBhY2tldC5hY2sgPSAnZGF0YSc7XG4gICAgICBlbHNlXG4gICAgICAgIHBhY2tldC5hY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBkaWZmZXJlbnQgcGFja2V0IHR5cGVzXG4gICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB2YXIgcGllY2VzID0gZGF0YS5zcGxpdCgnKycpO1xuICAgICAgICBwYWNrZXQucmVhc29uID0gcmVhc29uc1twaWVjZXNbMF1dIHx8ICcnO1xuICAgICAgICBwYWNrZXQuYWR2aWNlID0gYWR2aWNlW3BpZWNlc1sxXV0gfHwgJyc7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgcGFja2V0LmRhdGEgPSBkYXRhIHx8ICcnO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXZlbnQnOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBvcHRzID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICBwYWNrZXQubmFtZSA9IG9wdHMubmFtZTtcbiAgICAgICAgICBwYWNrZXQuYXJncyA9IG9wdHMuYXJncztcbiAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICAgICAgcGFja2V0LmFyZ3MgPSBwYWNrZXQuYXJncyB8fCBbXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHBhY2tldC5kYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdjb25uZWN0JzpcbiAgICAgICAgcGFja2V0LnFzID0gZGF0YSB8fCAnJztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Fjayc6XG4gICAgICAgIHZhciBwaWVjZXMgPSBkYXRhLm1hdGNoKC9eKFswLTldKykoXFwrKT8oLiopLyk7XG4gICAgICAgIGlmIChwaWVjZXMpIHtcbiAgICAgICAgICBwYWNrZXQuYWNrSWQgPSBwaWVjZXNbMV07XG4gICAgICAgICAgcGFja2V0LmFyZ3MgPSBbXTtcblxuICAgICAgICAgIGlmIChwaWVjZXNbM10pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHBhY2tldC5hcmdzID0gcGllY2VzWzNdID8gSlNPTi5wYXJzZShwaWVjZXNbM10pIDogW107XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Rpc2Nvbm5lY3QnOlxuICAgICAgY2FzZSAnaGVhcnRiZWF0JzpcbiAgICAgICAgYnJlYWs7XG4gICAgfTtcblxuICAgIHJldHVybiBwYWNrZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIERlY29kZXMgZGF0YSBwYXlsb2FkLiBEZXRlY3RzIG11bHRpcGxlIG1lc3NhZ2VzXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5fSBtZXNzYWdlc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBwYXJzZXIuZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgLy8gSUUgZG9lc24ndCBsaWtlIGRhdGFbaV0gZm9yIHVuaWNvZGUgY2hhcnMsIGNoYXJBdCB3b3JrcyBmaW5lXG4gICAgaWYgKGRhdGEuY2hhckF0KDApID09ICdcXHVmZmZkJykge1xuICAgICAgdmFyIHJldCA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gJyc7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkYXRhLmNoYXJBdChpKSA9PSAnXFx1ZmZmZCcpIHtcbiAgICAgICAgICByZXQucHVzaChwYXJzZXIuZGVjb2RlUGFja2V0KGRhdGEuc3Vic3RyKGkgKyAxKS5zdWJzdHIoMCwgbGVuZ3RoKSkpO1xuICAgICAgICAgIGkgKz0gTnVtYmVyKGxlbmd0aCkgKyAxO1xuICAgICAgICAgIGxlbmd0aCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxlbmd0aCArPSBkYXRhLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3BhcnNlci5kZWNvZGVQYWNrZXQoZGF0YSldO1xuICAgIH1cbiAgfTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLlRyYW5zcG9ydCA9IFRyYW5zcG9ydDtcblxuICAvKipcbiAgICogVGhpcyBpcyB0aGUgdHJhbnNwb3J0IHRlbXBsYXRlIGZvciBhbGwgc3VwcG9ydGVkIHRyYW5zcG9ydCBtZXRob2RzLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gVHJhbnNwb3J0IChzb2NrZXQsIHNlc3NpZCkge1xuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgIHRoaXMuc2Vzc2lkID0gc2Vzc2lkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBseSBFdmVudEVtaXR0ZXIgbWl4aW4uXG4gICAqL1xuXG4gIGlvLnV0aWwubWl4aW4oVHJhbnNwb3J0LCBpby5FdmVudEVtaXR0ZXIpO1xuXG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIGhlYXJ0YmVhdHMgaXMgZW5hYmxlZCBmb3IgdGhpcyB0cmFuc3BvcnRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUuaGVhcnRiZWF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLiBXaGVuIGEgbmV3IHJlc3BvbnNlIGlzIHJlY2VpdmVkXG4gICAqIGl0IHdpbGwgYXV0b21hdGljYWxseSB1cGRhdGUgdGhlIHRpbWVvdXQsIGRlY29kZSB0aGUgbWVzc2FnZSBhbmRcbiAgICogZm9yd2FyZHMgdGhlIHJlc3BvbnNlIHRvIHRoZSBvbk1lc3NhZ2UgZnVuY3Rpb24gZm9yIGZ1cnRoZXIgcHJvY2Vzc2luZy5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgUmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRoaXMuY2xlYXJDbG9zZVRpbWVvdXQoKTtcblxuICAgIC8vIElmIHRoZSBjb25uZWN0aW9uIGluIGN1cnJlbnRseSBvcGVuIChvciBpbiBhIHJlb3BlbmluZyBzdGF0ZSkgcmVzZXQgdGhlIGNsb3NlXG4gICAgLy8gdGltZW91dCBzaW5jZSB3ZSBoYXZlIGp1c3QgcmVjZWl2ZWQgZGF0YS4gVGhpcyBjaGVjayBpcyBuZWNlc3Nhcnkgc29cbiAgICAvLyB0aGF0IHdlIGRvbid0IHJlc2V0IHRoZSB0aW1lb3V0IG9uIGFuIGV4cGxpY2l0bHkgZGlzY29ubmVjdGVkIGNvbm5lY3Rpb24uXG4gICAgaWYgKHRoaXMuc29ja2V0LmNvbm5lY3RlZCB8fCB0aGlzLnNvY2tldC5jb25uZWN0aW5nIHx8IHRoaXMuc29ja2V0LnJlY29ubmVjdGluZykge1xuICAgICAgdGhpcy5zZXRDbG9zZVRpbWVvdXQoKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAhPT0gJycpIHtcbiAgICAgIC8vIHRvZG86IHdlIHNob3VsZCBvbmx5IGRvIGRlY29kZVBheWxvYWQgZm9yIHhociB0cmFuc3BvcnRzXG4gICAgICB2YXIgbXNncyA9IGlvLnBhcnNlci5kZWNvZGVQYXlsb2FkKGRhdGEpO1xuXG4gICAgICBpZiAobXNncyAmJiBtc2dzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1zZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5vblBhY2tldChtc2dzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHBhY2tldHMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHRoaXMuc29ja2V0LnNldEhlYXJ0YmVhdFRpbWVvdXQoKTtcblxuICAgIGlmIChwYWNrZXQudHlwZSA9PSAnaGVhcnRiZWF0Jykge1xuICAgICAgcmV0dXJuIHRoaXMub25IZWFydGJlYXQoKTtcbiAgICB9XG5cbiAgICBpZiAocGFja2V0LnR5cGUgPT0gJ2Nvbm5lY3QnICYmIHBhY2tldC5lbmRwb2ludCA9PSAnJykge1xuICAgICAgdGhpcy5vbkNvbm5lY3QoKTtcbiAgICB9XG5cbiAgICBpZiAocGFja2V0LnR5cGUgPT0gJ2Vycm9yJyAmJiBwYWNrZXQuYWR2aWNlID09ICdyZWNvbm5lY3QnKSB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc29ja2V0Lm9uUGFja2V0KHBhY2tldCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBjbG9zZSB0aW1lb3V0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLnNldENsb3NlVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuY2xvc2VUaW1lb3V0KSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHRoaXMuY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYub25EaXNjb25uZWN0KCk7XG4gICAgICB9LCB0aGlzLnNvY2tldC5jbG9zZVRpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdHJhbnNwb3J0IGRpc2Nvbm5lY3RzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB0aGlzLmNsb3NlKCk7XG4gICAgdGhpcy5jbGVhclRpbWVvdXRzKCk7XG4gICAgdGhpcy5zb2NrZXQub25EaXNjb25uZWN0KCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRyYW5zcG9ydCBjb25uZWN0c1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zb2NrZXQub25Db25uZWN0KCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFycyBjbG9zZSB0aW1lb3V0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLmNsZWFyQ2xvc2VUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNsb3NlVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VUaW1lb3V0KTtcbiAgICAgIHRoaXMuY2xvc2VUaW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFyIHRpbWVvdXRzXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLmNsZWFyVGltZW91dHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jbGVhckNsb3NlVGltZW91dCgpO1xuXG4gICAgaWYgKHRoaXMucmVvcGVuVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVvcGVuVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhIHBhY2tldFxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IG9iamVjdC5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHRoaXMuc2VuZChpby5wYXJzZXIuZW5jb2RlUGFja2V0KHBhY2tldCkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIHRoZSByZWNlaXZlZCBoZWFydGJlYXQgbWVzc2FnZSBiYWNrIHRvIHNlcnZlci4gU28gdGhlIHNlcnZlclxuICAgKiBrbm93cyB3ZSBhcmUgc3RpbGwgY29ubmVjdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaGVhcnRiZWF0IEhlYXJ0YmVhdCByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24gKGhlYXJ0YmVhdCkge1xuICAgIHRoaXMucGFja2V0KHsgdHlwZTogJ2hlYXJ0YmVhdCcgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB0cmFuc3BvcnQgb3BlbnMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5jbGVhckNsb3NlVGltZW91dCgpO1xuICAgIHRoaXMuc29ja2V0Lm9uT3BlbigpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBOb3RpZmllcyB0aGUgYmFzZSB3aGVuIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIFNvY2tldC5JTyBzZXJ2ZXJcbiAgICogaGFzIGJlZW4gZGlzY29ubmVjdGVkLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8qIEZJWE1FOiByZW9wZW4gZGVsYXkgY2F1c2luZyBhIGluZmluaXQgbG9vcFxuICAgIHRoaXMucmVvcGVuVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5vcGVuKCk7XG4gICAgfSwgdGhpcy5zb2NrZXQub3B0aW9uc1sncmVvcGVuIGRlbGF5J10pOyovXG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuc29ja2V0Lm9uQ2xvc2UoKTtcbiAgICB0aGlzLm9uRGlzY29ubmVjdCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBjb25uZWN0aW9uIHVybCBiYXNlZCBvbiB0aGUgU29ja2V0LklPIFVSTCBQcm90b2NvbC5cbiAgICogU2VlIDxodHRwczovL2dpdGh1Yi5jb20vbGVhcm5ib29zdC9zb2NrZXQuaW8tbm9kZS8+IGZvciBtb3JlIGRldGFpbHMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IENvbm5lY3Rpb24gdXJsXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLnByZXBhcmVVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLnNvY2tldC5vcHRpb25zO1xuXG4gICAgcmV0dXJuIHRoaXMuc2NoZW1lKCkgKyAnOi8vJ1xuICAgICAgKyBvcHRpb25zLmhvc3QgKyAnOicgKyBvcHRpb25zLnBvcnQgKyAnLydcbiAgICAgICsgb3B0aW9ucy5yZXNvdXJjZSArICcvJyArIGlvLnByb3RvY29sXG4gICAgICArICcvJyArIHRoaXMubmFtZSArICcvJyArIHRoaXMuc2Vzc2lkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHRyYW5zcG9ydCBpcyByZWFkeSB0byBzdGFydCBhIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgVGhlIHNvY2tldCBpbnN0YW5jZSB0aGF0IG5lZWRzIGEgdHJhbnNwb3J0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFja1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIChzb2NrZXQsIGZuKSB7XG4gICAgZm4uY2FsbCh0aGlzKTtcbiAgfTtcbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvLCBnbG9iYWwpIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLlNvY2tldCA9IFNvY2tldDtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBTb2NrZXQuSU8gY2xpZW50YCB3aGljaCBjYW4gZXN0YWJsaXNoIGEgcGVyc2lzdGVudFxuICAgKiBjb25uZWN0aW9uIHdpdGggYSBTb2NrZXQuSU8gZW5hYmxlZCBzZXJ2ZXIuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFNvY2tldCAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgcG9ydDogODBcbiAgICAgICwgc2VjdXJlOiBmYWxzZVxuICAgICAgLCBkb2N1bWVudDogJ2RvY3VtZW50JyBpbiBnbG9iYWwgPyBkb2N1bWVudCA6IGZhbHNlXG4gICAgICAsIHJlc291cmNlOiAnc29ja2V0LmlvJ1xuICAgICAgLCB0cmFuc3BvcnRzOiBpby50cmFuc3BvcnRzXG4gICAgICAsICdjb25uZWN0IHRpbWVvdXQnOiAxMDAwMFxuICAgICAgLCAndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnOiB0cnVlXG4gICAgICAsICdyZWNvbm5lY3QnOiB0cnVlXG4gICAgICAsICdyZWNvbm5lY3Rpb24gZGVsYXknOiA1MDBcbiAgICAgICwgJ3JlY29ubmVjdGlvbiBsaW1pdCc6IEluZmluaXR5XG4gICAgICAsICdyZW9wZW4gZGVsYXknOiAzMDAwXG4gICAgICAsICdtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzJzogMTBcbiAgICAgICwgJ3N5bmMgZGlzY29ubmVjdCBvbiB1bmxvYWQnOiBmYWxzZVxuICAgICAgLCAnYXV0byBjb25uZWN0JzogdHJ1ZVxuICAgICAgLCAnZmxhc2ggcG9saWN5IHBvcnQnOiAxMDg0M1xuICAgICAgLCAnbWFudWFsRmx1c2gnOiBmYWxzZVxuICAgIH07XG5cbiAgICBpby51dGlsLm1lcmdlKHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5uYW1lc3BhY2VzID0ge307XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB0aGlzLmRvQnVmZmVyID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zWydzeW5jIGRpc2Nvbm5lY3Qgb24gdW5sb2FkJ10gJiZcbiAgICAgICAgKCF0aGlzLmlzWERvbWFpbigpIHx8IGlvLnV0aWwudWEuaGFzQ09SUykpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIGlvLnV0aWwub24oZ2xvYmFsLCAnYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmRpc2Nvbm5lY3RTeW5jKCk7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9uc1snYXV0byBjb25uZWN0J10pIHtcbiAgICAgIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cbn07XG5cbiAgLyoqXG4gICAqIEFwcGx5IEV2ZW50RW1pdHRlciBtaXhpbi5cbiAgICovXG5cbiAgaW8udXRpbC5taXhpbihTb2NrZXQsIGlvLkV2ZW50RW1pdHRlcik7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuYW1lc3BhY2UgbGlzdGVuZXIvZW1pdHRlciBmb3IgdGhpcyBzb2NrZXRcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLm5hbWVzcGFjZXNbbmFtZV0pIHtcbiAgICAgIHRoaXMubmFtZXNwYWNlc1tuYW1lXSA9IG5ldyBpby5Tb2NrZXROYW1lc3BhY2UodGhpcywgbmFtZSk7XG5cbiAgICAgIGlmIChuYW1lICE9PSAnJykge1xuICAgICAgICB0aGlzLm5hbWVzcGFjZXNbbmFtZV0ucGFja2V0KHsgdHlwZTogJ2Nvbm5lY3QnIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5hbWVzcGFjZXNbbmFtZV07XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBnaXZlbiBldmVudCB0byB0aGUgU29ja2V0IGFuZCBhbGwgbmFtZXNwYWNlc1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5wdWJsaXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdmFyIG5zcDtcblxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5uYW1lc3BhY2VzKSB7XG4gICAgICBpZiAodGhpcy5uYW1lc3BhY2VzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgIG5zcCA9IHRoaXMub2YoaSk7XG4gICAgICAgIG5zcC4kZW1pdC5hcHBseShuc3AsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgaGFuZHNoYWtlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBlbXB0eSAoKSB7IH07XG5cbiAgU29ja2V0LnByb3RvdHlwZS5oYW5kc2hha2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlIChkYXRhKSB7XG4gICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHNlbGYuY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICBzZWxmLm9uRXJyb3IoZGF0YS5tZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGRhdGEuc3BsaXQoJzonKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciB1cmwgPSBbXG4gICAgICAgICAgJ2h0dHAnICsgKG9wdGlvbnMuc2VjdXJlID8gJ3MnIDogJycpICsgJzovJ1xuICAgICAgICAsIG9wdGlvbnMuaG9zdCArICc6JyArIG9wdGlvbnMucG9ydFxuICAgICAgICAsIG9wdGlvbnMucmVzb3VyY2VcbiAgICAgICAgLCBpby5wcm90b2NvbFxuICAgICAgICAsIGlvLnV0aWwucXVlcnkodGhpcy5vcHRpb25zLnF1ZXJ5LCAndD0nICsgK25ldyBEYXRlKVxuICAgICAgXS5qb2luKCcvJyk7XG5cbiAgICBpZiAodGhpcy5pc1hEb21haW4oKSAmJiAhaW8udXRpbC51YS5oYXNDT1JTKSB7XG4gICAgICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF1cbiAgICAgICAgLCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgc2NyaXB0LnNyYyA9IHVybCArICcmanNvbnA9JyArIGlvLmoubGVuZ3RoO1xuICAgICAgaW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBpbnNlcnRBdCk7XG5cbiAgICAgIGlvLmoucHVzaChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjb21wbGV0ZShkYXRhKTtcbiAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgeGhyID0gaW8udXRpbC5yZXF1ZXN0KCk7XG5cbiAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgaWYgKHRoaXMuaXNYRG9tYWluKCkpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICB9XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcblxuICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgY29tcGxldGUoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh4aHIuc3RhdHVzID09IDQwMykge1xuICAgICAgICAgICAgc2VsZi5vbkVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmNvbm5lY3RpbmcgPSBmYWxzZTsgICAgICAgICAgICBcbiAgICAgICAgICAgICFzZWxmLnJlY29ubmVjdGluZyAmJiBzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgeGhyLnNlbmQobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIGFuIGF2YWlsYWJsZSB0cmFuc3BvcnQgYmFzZWQgb24gdGhlIG9wdGlvbnMgc3VwcGxpZWQgaW4gdGhlIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5nZXRUcmFuc3BvcnQgPSBmdW5jdGlvbiAob3ZlcnJpZGUpIHtcbiAgICB2YXIgdHJhbnNwb3J0cyA9IG92ZXJyaWRlIHx8IHRoaXMudHJhbnNwb3J0cywgbWF0Y2g7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgdHJhbnNwb3J0OyB0cmFuc3BvcnQgPSB0cmFuc3BvcnRzW2ldOyBpKyspIHtcbiAgICAgIGlmIChpby5UcmFuc3BvcnRbdHJhbnNwb3J0XVxuICAgICAgICAmJiBpby5UcmFuc3BvcnRbdHJhbnNwb3J0XS5jaGVjayh0aGlzKVxuICAgICAgICAmJiAoIXRoaXMuaXNYRG9tYWluKCkgfHwgaW8uVHJhbnNwb3J0W3RyYW5zcG9ydF0ueGRvbWFpbkNoZWNrKHRoaXMpKSkge1xuICAgICAgICByZXR1cm4gbmV3IGlvLlRyYW5zcG9ydFt0cmFuc3BvcnRdKHRoaXMsIHRoaXMuc2Vzc2lvbmlkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogQ29ubmVjdHMgdG8gdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXSBDYWxsYmFjay5cbiAgICogQHJldHVybnMge2lvLlNvY2tldH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGluZykge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29ubmVjdGluZyA9IHRydWU7XG4gICAgXG4gICAgdGhpcy5oYW5kc2hha2UoZnVuY3Rpb24gKHNpZCwgaGVhcnRiZWF0LCBjbG9zZSwgdHJhbnNwb3J0cykge1xuICAgICAgc2VsZi5zZXNzaW9uaWQgPSBzaWQ7XG4gICAgICBzZWxmLmNsb3NlVGltZW91dCA9IGNsb3NlICogMTAwMDtcbiAgICAgIHNlbGYuaGVhcnRiZWF0VGltZW91dCA9IGhlYXJ0YmVhdCAqIDEwMDA7XG4gICAgICBpZighc2VsZi50cmFuc3BvcnRzKVxuICAgICAgICAgIHNlbGYudHJhbnNwb3J0cyA9IHNlbGYub3JpZ1RyYW5zcG9ydHMgPSAodHJhbnNwb3J0cyA/IGlvLnV0aWwuaW50ZXJzZWN0KFxuICAgICAgICAgICAgICB0cmFuc3BvcnRzLnNwbGl0KCcsJylcbiAgICAgICAgICAgICwgc2VsZi5vcHRpb25zLnRyYW5zcG9ydHNcbiAgICAgICAgICApIDogc2VsZi5vcHRpb25zLnRyYW5zcG9ydHMpO1xuXG4gICAgICBzZWxmLnNldEhlYXJ0YmVhdFRpbWVvdXQoKTtcblxuICAgICAgZnVuY3Rpb24gY29ubmVjdCAodHJhbnNwb3J0cyl7XG4gICAgICAgIGlmIChzZWxmLnRyYW5zcG9ydCkgc2VsZi50cmFuc3BvcnQuY2xlYXJUaW1lb3V0cygpO1xuXG4gICAgICAgIHNlbGYudHJhbnNwb3J0ID0gc2VsZi5nZXRUcmFuc3BvcnQodHJhbnNwb3J0cyk7XG4gICAgICAgIGlmICghc2VsZi50cmFuc3BvcnQpIHJldHVybiBzZWxmLnB1Ymxpc2goJ2Nvbm5lY3RfZmFpbGVkJyk7XG5cbiAgICAgICAgLy8gb25jZSB0aGUgdHJhbnNwb3J0IGlzIHJlYWR5XG4gICAgICAgIHNlbGYudHJhbnNwb3J0LnJlYWR5KHNlbGYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLmNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgIHNlbGYucHVibGlzaCgnY29ubmVjdGluZycsIHNlbGYudHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICAgIHNlbGYudHJhbnNwb3J0Lm9wZW4oKTtcblxuICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnNbJ2Nvbm5lY3QgdGltZW91dCddKSB7XG4gICAgICAgICAgICBzZWxmLmNvbm5lY3RUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKCFzZWxmLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuY29ubmVjdGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHJlbWFpbmluZyA9IHNlbGYudHJhbnNwb3J0cztcblxuICAgICAgICAgICAgICAgICAgd2hpbGUgKHJlbWFpbmluZy5sZW5ndGggPiAwICYmIHJlbWFpbmluZy5zcGxpY2UoMCwxKVswXSAhPVxuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHJhbnNwb3J0Lm5hbWUpIHt9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlbWFpbmluZy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3QocmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLnB1Ymxpc2goJ2Nvbm5lY3RfZmFpbGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHNlbGYub3B0aW9uc1snY29ubmVjdCB0aW1lb3V0J10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbm5lY3Qoc2VsZi50cmFuc3BvcnRzKTtcblxuICAgICAgc2VsZi5vbmNlKCdjb25uZWN0JywgZnVuY3Rpb24gKCl7XG4gICAgICAgIGNsZWFyVGltZW91dChzZWxmLmNvbm5lY3RUaW1lb3V0VGltZXIpO1xuXG4gICAgICAgIGZuICYmIHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nICYmIGZuKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYW5kIHNldHMgYSBuZXcgaGVhcnRiZWF0IHRpbWVvdXQgdXNpbmcgdGhlIHZhbHVlIGdpdmVuIGJ5IHRoZVxuICAgKiBzZXJ2ZXIgZHVyaW5nIHRoZSBoYW5kc2hha2UuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnNldEhlYXJ0YmVhdFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyKTtcbiAgICBpZih0aGlzLnRyYW5zcG9ydCAmJiAhdGhpcy50cmFuc3BvcnQuaGVhcnRiZWF0cygpKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYudHJhbnNwb3J0Lm9uQ2xvc2UoKTtcbiAgICB9LCB0aGlzLmhlYXJ0YmVhdFRpbWVvdXQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIHBhY2tldC5cbiAgICogQHJldHVybnMge2lvLlNvY2tldH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmICh0aGlzLmNvbm5lY3RlZCAmJiAhdGhpcy5kb0J1ZmZlcikge1xuICAgICAgdGhpcy50cmFuc3BvcnQucGFja2V0KGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIGJ1ZmZlciBzdGF0ZVxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5zZXRCdWZmZXIgPSBmdW5jdGlvbiAodikge1xuICAgIHRoaXMuZG9CdWZmZXIgPSB2O1xuXG4gICAgaWYgKCF2ICYmIHRoaXMuY29ubmVjdGVkICYmIHRoaXMuYnVmZmVyLmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnNbJ21hbnVhbEZsdXNoJ10pIHtcbiAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRmx1c2hlcyB0aGUgYnVmZmVyIGRhdGEgb3ZlciB0aGUgd2lyZS5cbiAgICogVG8gYmUgaW52b2tlZCBtYW51YWxseSB3aGVuICdtYW51YWxGbHVzaCcgaXMgc2V0IHRvIHRydWUuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuZmx1c2hCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRyYW5zcG9ydC5wYXlsb2FkKHRoaXMuYnVmZmVyKTtcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICB9O1xuICBcblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgZXN0YWJsaXNoZWQgY29ubmVjdC5cbiAgICpcbiAgICogQHJldHVybnMge2lvLlNvY2tldH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNvbm5lY3RlZCB8fCB0aGlzLmNvbm5lY3RpbmcpIHtcbiAgICAgIGlmICh0aGlzLm9wZW4pIHtcbiAgICAgICAgdGhpcy5vZignJykucGFja2V0KHsgdHlwZTogJ2Rpc2Nvbm5lY3QnIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGUgZGlzY29ubmVjdGlvbiBpbW1lZGlhdGVseVxuICAgICAgdGhpcy5vbkRpc2Nvbm5lY3QoJ2Jvb3RlZCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IHdpdGggYSBzeW5jIFhIUi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuZGlzY29ubmVjdFN5bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gZW5zdXJlIGRpc2Nvbm5lY3Rpb25cbiAgICB2YXIgeGhyID0gaW8udXRpbC5yZXF1ZXN0KCk7XG4gICAgdmFyIHVyaSA9IFtcbiAgICAgICAgJ2h0dHAnICsgKHRoaXMub3B0aW9ucy5zZWN1cmUgPyAncycgOiAnJykgKyAnOi8nXG4gICAgICAsIHRoaXMub3B0aW9ucy5ob3N0ICsgJzonICsgdGhpcy5vcHRpb25zLnBvcnRcbiAgICAgICwgdGhpcy5vcHRpb25zLnJlc291cmNlXG4gICAgICAsIGlvLnByb3RvY29sXG4gICAgICAsICcnXG4gICAgICAsIHRoaXMuc2Vzc2lvbmlkXG4gICAgXS5qb2luKCcvJykgKyAnLz9kaXNjb25uZWN0PTEnO1xuXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVyaSwgZmFsc2UpO1xuICAgIHhoci5zZW5kKG51bGwpO1xuXG4gICAgLy8gaGFuZGxlIGRpc2Nvbm5lY3Rpb24gaW1tZWRpYXRlbHlcbiAgICB0aGlzLm9uRGlzY29ubmVjdCgnYm9vdGVkJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHdlIG5lZWQgdG8gdXNlIGNyb3NzIGRvbWFpbiBlbmFibGVkIHRyYW5zcG9ydHMuIENyb3NzIGRvbWFpbiB3b3VsZFxuICAgKiBiZSBhIGRpZmZlcmVudCBwb3J0IG9yIGRpZmZlcmVudCBkb21haW4gbmFtZS5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmlzWERvbWFpbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBwb3J0ID0gZ2xvYmFsLmxvY2F0aW9uLnBvcnQgfHxcbiAgICAgICgnaHR0cHM6JyA9PSBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wgPyA0NDMgOiA4MCk7XG5cbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmhvc3QgIT09IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSBcbiAgICAgIHx8IHRoaXMub3B0aW9ucy5wb3J0ICE9IHBvcnQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB1cG9uIGhhbmRzaGFrZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25Db25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCF0aGlzLmRvQnVmZmVyKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0byBmbHVzaCB0aGUgYnVmZmVyXG4gICAgICAgIHRoaXMuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdCgnY29ubmVjdCcpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBvcGVuc1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcGVuID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBjbG9zZXMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBmaXJzdCBvcGVucyBhIGNvbm5lY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHRleHRcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICB0aGlzLm9mKHBhY2tldC5lbmRwb2ludCkub25QYWNrZXQocGFja2V0KTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBlcnJvci5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICBpZiAoZXJyICYmIGVyci5hZHZpY2UpIHtcbiAgICAgIGlmIChlcnIuYWR2aWNlID09PSAncmVjb25uZWN0JyAmJiAodGhpcy5jb25uZWN0ZWQgfHwgdGhpcy5jb25uZWN0aW5nKSkge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZWNvbm5lY3QpIHtcbiAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wdWJsaXNoKCdlcnJvcicsIGVyciAmJiBlcnIucmVhc29uID8gZXJyLnJlYXNvbiA6IGVycik7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB0cmFuc3BvcnQgZGlzY29ubmVjdHMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uRGlzY29ubmVjdCA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICB2YXIgd2FzQ29ubmVjdGVkID0gdGhpcy5jb25uZWN0ZWRcbiAgICAgICwgd2FzQ29ubmVjdGluZyA9IHRoaXMuY29ubmVjdGluZztcblxuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG5cbiAgICBpZiAod2FzQ29ubmVjdGVkIHx8IHdhc0Nvbm5lY3RpbmcpIHtcbiAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICB0aGlzLnRyYW5zcG9ydC5jbGVhclRpbWVvdXRzKCk7XG4gICAgICBpZiAod2FzQ29ubmVjdGVkKSB7XG4gICAgICAgIHRoaXMucHVibGlzaCgnZGlzY29ubmVjdCcsIHJlYXNvbik7XG5cbiAgICAgICAgaWYgKCdib290ZWQnICE9IHJlYXNvbiAmJiB0aGlzLm9wdGlvbnMucmVjb25uZWN0ICYmICF0aGlzLnJlY29ubmVjdGluZykge1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB1cG9uIHJlY29ubmVjdGlvbi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gMDtcbiAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5ID0gdGhpcy5vcHRpb25zWydyZWNvbm5lY3Rpb24gZGVsYXknXTtcblxuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBtYXhBdHRlbXB0cyA9IHRoaXMub3B0aW9uc1snbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyddXG4gICAgICAsIHRyeU11bHRpcGxlID0gdGhpcy5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddXG4gICAgICAsIGxpbWl0ID0gdGhpcy5vcHRpb25zWydyZWNvbm5lY3Rpb24gbGltaXQnXTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICAgIGlmIChzZWxmLmNvbm5lY3RlZCkge1xuICAgICAgICBmb3IgKHZhciBpIGluIHNlbGYubmFtZXNwYWNlcykge1xuICAgICAgICAgIGlmIChzZWxmLm5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkoaSkgJiYgJycgIT09IGkpIHtcbiAgICAgICAgICAgICAgc2VsZi5uYW1lc3BhY2VzW2ldLnBhY2tldCh7IHR5cGU6ICdjb25uZWN0JyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5wdWJsaXNoKCdyZWNvbm5lY3QnLCBzZWxmLnRyYW5zcG9ydC5uYW1lLCBzZWxmLnJlY29ubmVjdGlvbkF0dGVtcHRzKTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYucmVjb25uZWN0aW9uVGltZXIpO1xuXG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjb25uZWN0X2ZhaWxlZCcsIG1heWJlUmVjb25uZWN0KTtcbiAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3QnLCBtYXliZVJlY29ubmVjdCk7XG5cbiAgICAgIHNlbGYucmVjb25uZWN0aW5nID0gZmFsc2U7XG5cbiAgICAgIGRlbGV0ZSBzZWxmLnJlY29ubmVjdGlvbkF0dGVtcHRzO1xuICAgICAgZGVsZXRlIHNlbGYucmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICBkZWxldGUgc2VsZi5yZWNvbm5lY3Rpb25UaW1lcjtcbiAgICAgIGRlbGV0ZSBzZWxmLnJlZG9UcmFuc3BvcnRzO1xuXG4gICAgICBzZWxmLm9wdGlvbnNbJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJ10gPSB0cnlNdWx0aXBsZTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWF5YmVSZWNvbm5lY3QgKCkge1xuICAgICAgaWYgKCFzZWxmLnJlY29ubmVjdGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxmLmNvbm5lY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChzZWxmLmNvbm5lY3RpbmcgJiYgc2VsZi5yZWNvbm5lY3RpbmcpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYucmVjb25uZWN0aW9uVGltZXIgPSBzZXRUaW1lb3V0KG1heWJlUmVjb25uZWN0LCAxMDAwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHMrKyA+PSBtYXhBdHRlbXB0cykge1xuICAgICAgICBpZiAoIXNlbGYucmVkb1RyYW5zcG9ydHMpIHtcbiAgICAgICAgICBzZWxmLm9uKCdjb25uZWN0X2ZhaWxlZCcsIG1heWJlUmVjb25uZWN0KTtcbiAgICAgICAgICBzZWxmLm9wdGlvbnNbJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJ10gPSB0cnVlO1xuICAgICAgICAgIHNlbGYudHJhbnNwb3J0cyA9IHNlbGYub3JpZ1RyYW5zcG9ydHM7XG4gICAgICAgICAgc2VsZi50cmFuc3BvcnQgPSBzZWxmLmdldFRyYW5zcG9ydCgpO1xuICAgICAgICAgIHNlbGYucmVkb1RyYW5zcG9ydHMgPSB0cnVlO1xuICAgICAgICAgIHNlbGYuY29ubmVjdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYucHVibGlzaCgncmVjb25uZWN0X2ZhaWxlZCcpO1xuICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZWxmLnJlY29ubmVjdGlvbkRlbGF5IDwgbGltaXQpIHtcbiAgICAgICAgICBzZWxmLnJlY29ubmVjdGlvbkRlbGF5ICo9IDI7IC8vIGV4cG9uZW50aWFsIGJhY2sgb2ZmXG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmNvbm5lY3QoKTtcbiAgICAgICAgc2VsZi5wdWJsaXNoKCdyZWNvbm5lY3RpbmcnLCBzZWxmLnJlY29ubmVjdGlvbkRlbGF5LCBzZWxmLnJlY29ubmVjdGlvbkF0dGVtcHRzKTtcbiAgICAgICAgc2VsZi5yZWNvbm5lY3Rpb25UaW1lciA9IHNldFRpbWVvdXQobWF5YmVSZWNvbm5lY3QsIHNlbGYucmVjb25uZWN0aW9uRGVsYXkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnNbJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJ10gPSBmYWxzZTtcbiAgICB0aGlzLnJlY29ubmVjdGlvblRpbWVyID0gc2V0VGltZW91dChtYXliZVJlY29ubmVjdCwgdGhpcy5yZWNvbm5lY3Rpb25EZWxheSk7XG5cbiAgICB0aGlzLm9uKCdjb25uZWN0JywgbWF5YmVSZWNvbm5lY3QpO1xuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbiAgLCB0aGlzXG4pO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLlNvY2tldE5hbWVzcGFjZSA9IFNvY2tldE5hbWVzcGFjZTtcblxuICAvKipcbiAgICogU29ja2V0IG5hbWVzcGFjZSBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFNvY2tldE5hbWVzcGFjZSAoc29ja2V0LCBuYW1lKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZSB8fCAnJztcbiAgICB0aGlzLmZsYWdzID0ge307XG4gICAgdGhpcy5qc29uID0gbmV3IEZsYWcodGhpcywgJ2pzb24nKTtcbiAgICB0aGlzLmFja1BhY2tldHMgPSAwO1xuICAgIHRoaXMuYWNrcyA9IHt9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBBcHBseSBFdmVudEVtaXR0ZXIgbWl4aW4uXG4gICAqL1xuXG4gIGlvLnV0aWwubWl4aW4oU29ja2V0TmFtZXNwYWNlLCBpby5FdmVudEVtaXR0ZXIpO1xuXG4gIC8qKlxuICAgKiBDb3BpZXMgZW1pdCBzaW5jZSB3ZSBvdmVycmlkZSBpdFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS4kZW1pdCA9IGlvLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBuYW1lc3BhY2UsIGJ5IHByb3h5aW5nIHRoZSByZXF1ZXN0IHRvIHRoZSBzb2NrZXQuIFRoaXNcbiAgICogYWxsb3dzIHVzIHRvIHVzZSB0aGUgc3luYXggYXMgd2UgZG8gb24gdGhlIHNlcnZlci5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5vZiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQub2YuYXBwbHkodGhpcy5zb2NrZXQsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgcGFja2V0LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgcGFja2V0LmVuZHBvaW50ID0gdGhpcy5uYW1lO1xuICAgIHRoaXMuc29ja2V0LnBhY2tldChwYWNrZXQpO1xuICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuZmxhZ3MuanNvbiA/ICdqc29uJyA6ICdtZXNzYWdlJ1xuICAgICAgLCBkYXRhOiBkYXRhXG4gICAgfTtcblxuICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBmbikge1xuICAgICAgcGFja2V0LmlkID0gKyt0aGlzLmFja1BhY2tldHM7XG4gICAgICBwYWNrZXQuYWNrID0gdHJ1ZTtcbiAgICAgIHRoaXMuYWNrc1twYWNrZXQuaWRdID0gZm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFja2V0KHBhY2tldCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50XG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuICBcbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICAgICwgbGFzdEFyZyA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgLCBwYWNrZXQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnZXZlbnQnXG4gICAgICAgICAgLCBuYW1lOiBuYW1lXG4gICAgICAgIH07XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgbGFzdEFyZykge1xuICAgICAgcGFja2V0LmlkID0gKyt0aGlzLmFja1BhY2tldHM7XG4gICAgICBwYWNrZXQuYWNrID0gJ2RhdGEnO1xuICAgICAgdGhpcy5hY2tzW3BhY2tldC5pZF0gPSBsYXN0QXJnO1xuICAgICAgYXJncyA9IGFyZ3Muc2xpY2UoMCwgYXJncy5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICBwYWNrZXQuYXJncyA9IGFyZ3M7XG5cbiAgICByZXR1cm4gdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIG5hbWVzcGFjZVxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm5hbWUgPT09ICcnKSB7XG4gICAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogJ2Rpc2Nvbm5lY3QnIH0pO1xuICAgICAgdGhpcy4kZW1pdCgnZGlzY29ubmVjdCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGEgcGFja2V0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIGFjayAoKSB7XG4gICAgICBzZWxmLnBhY2tldCh7XG4gICAgICAgICAgdHlwZTogJ2FjaydcbiAgICAgICAgLCBhcmdzOiBpby51dGlsLnRvQXJyYXkoYXJndW1lbnRzKVxuICAgICAgICAsIGFja0lkOiBwYWNrZXQuaWRcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdjb25uZWN0JzpcbiAgICAgICAgdGhpcy4kZW1pdCgnY29ubmVjdCcpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZGlzY29ubmVjdCc6XG4gICAgICAgIGlmICh0aGlzLm5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5zb2NrZXQub25EaXNjb25uZWN0KHBhY2tldC5yZWFzb24gfHwgJ2Jvb3RlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuJGVtaXQoJ2Rpc2Nvbm5lY3QnLCBwYWNrZXQucmVhc29uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgdmFyIHBhcmFtcyA9IFsnbWVzc2FnZScsIHBhY2tldC5kYXRhXTtcblxuICAgICAgICBpZiAocGFja2V0LmFjayA9PSAnZGF0YScpIHtcbiAgICAgICAgICBwYXJhbXMucHVzaChhY2spO1xuICAgICAgICB9IGVsc2UgaWYgKHBhY2tldC5hY2spIHtcbiAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6ICdhY2snLCBhY2tJZDogcGFja2V0LmlkIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kZW1pdC5hcHBseSh0aGlzLCBwYXJhbXMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXZlbnQnOlxuICAgICAgICB2YXIgcGFyYW1zID0gW3BhY2tldC5uYW1lXS5jb25jYXQocGFja2V0LmFyZ3MpO1xuXG4gICAgICAgIGlmIChwYWNrZXQuYWNrID09ICdkYXRhJylcbiAgICAgICAgICBwYXJhbXMucHVzaChhY2spO1xuXG4gICAgICAgIHRoaXMuJGVtaXQuYXBwbHkodGhpcywgcGFyYW1zKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Fjayc6XG4gICAgICAgIGlmICh0aGlzLmFja3NbcGFja2V0LmFja0lkXSkge1xuICAgICAgICAgIHRoaXMuYWNrc1twYWNrZXQuYWNrSWRdLmFwcGx5KHRoaXMsIHBhY2tldC5hcmdzKTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5hY2tJZF07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgaWYgKHBhY2tldC5hZHZpY2Upe1xuICAgICAgICAgIHRoaXMuc29ja2V0Lm9uRXJyb3IocGFja2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocGFja2V0LnJlYXNvbiA9PSAndW5hdXRob3JpemVkJykge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnY29ubmVjdF9mYWlsZWQnLCBwYWNrZXQucmVhc29uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZXJyb3InLCBwYWNrZXQucmVhc29uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGbGFnIGludGVyZmFjZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEZsYWcgKG5zcCwgbmFtZSkge1xuICAgIHRoaXMubmFtZXNwYWNlID0gbnNwO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBtZXNzYWdlXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYWcucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5uYW1lc3BhY2UuZmxhZ3NbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgdGhpcy5uYW1lc3BhY2Uuc2VuZC5hcHBseSh0aGlzLm5hbWVzcGFjZSwgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdCBhbiBldmVudFxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFnLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubmFtZXNwYWNlLmZsYWdzW3RoaXMubmFtZV0gPSB0cnVlO1xuICAgIHRoaXMubmFtZXNwYWNlLmVtaXQuYXBwbHkodGhpcy5uYW1lc3BhY2UsIGFyZ3VtZW50cyk7XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8sIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMud2Vic29ja2V0ID0gV1M7XG5cbiAgLyoqXG4gICAqIFRoZSBXZWJTb2NrZXQgdHJhbnNwb3J0IHVzZXMgdGhlIEhUTUw1IFdlYlNvY2tldCBBUEkgdG8gZXN0YWJsaXNoIGFuXG4gICAqIHBlcnNpc3RlbnQgY29ubmVjdGlvbiB3aXRoIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBUaGlzIHRyYW5zcG9ydCB3aWxsIGFsc29cbiAgICogYmUgaW5oZXJpdGVkIGJ5IHRoZSBGbGFzaFNvY2tldCBmYWxsYmFjayBhcyBpdCBwcm92aWRlcyBhIEFQSSBjb21wYXRpYmxlXG4gICAqIHBvbHlmaWxsIGZvciB0aGUgV2ViU29ja2V0cy5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBleHRlbmRzIHtpby5UcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFdTIChzb2NrZXQpIHtcbiAgICBpby5UcmFuc3BvcnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChXUywgaW8uVHJhbnNwb3J0KTtcblxuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWVcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgV1MucHJvdG90eXBlLm5hbWUgPSAnd2Vic29ja2V0JztcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgYSBuZXcgYFdlYlNvY2tldGAgY29ubmVjdGlvbiB3aXRoIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBXZSBhdHRhY2hcbiAgICogYWxsIHRoZSBhcHByb3ByaWF0ZSBsaXN0ZW5lcnMgdG8gaGFuZGxlIHRoZSByZXNwb25zZXMgZnJvbSB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBXUy5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcXVlcnkgPSBpby51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnkpXG4gICAgICAsIHNlbGYgPSB0aGlzXG4gICAgICAsIFNvY2tldFxuXG5cbiAgICBpZiAoIVNvY2tldCkge1xuICAgICAgU29ja2V0ID0gZ2xvYmFsLk1veldlYlNvY2tldCB8fCBnbG9iYWwuV2ViU29ja2V0O1xuICAgIH1cblxuICAgIHRoaXMud2Vic29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLnByZXBhcmVVcmwoKSArIHF1ZXJ5KTtcblxuICAgIHRoaXMud2Vic29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25PcGVuKCk7XG4gICAgICBzZWxmLnNvY2tldC5zZXRCdWZmZXIoZmFsc2UpO1xuICAgIH07XG4gICAgdGhpcy53ZWJzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICBzZWxmLm9uRGF0YShldi5kYXRhKTtcbiAgICB9O1xuICAgIHRoaXMud2Vic29ja2V0Lm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcih0cnVlKTtcbiAgICB9O1xuICAgIHRoaXMud2Vic29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgc2VsZi5vbkVycm9yKGUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFRoZSBtZXNzYWdlIHdpbGwgYXV0b21hdGljYWxseSBiZVxuICAgKiBlbmNvZGVkIGluIHRoZSBjb3JyZWN0IG1lc3NhZ2UgZm9ybWF0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICAvLyBEbyB0byBhIGJ1ZyBpbiB0aGUgY3VycmVudCBJRGV2aWNlcyBicm93c2VyLCB3ZSBuZWVkIHRvIHdyYXAgdGhlIHNlbmQgaW4gYSBcbiAgLy8gc2V0VGltZW91dCwgd2hlbiB0aGV5IHJlc3VtZSBmcm9tIHNsZWVwaW5nIHRoZSBicm93c2VyIHdpbGwgY3Jhc2ggaWYgXG4gIC8vIHdlIGRvbid0IGFsbG93IHRoZSBicm93c2VyIHRpbWUgdG8gZGV0ZWN0IHRoZSBzb2NrZXQgaGFzIGJlZW4gY2xvc2VkXG4gIGlmIChpby51dGlsLnVhLmlEZXZpY2UpIHtcbiAgICBXUy5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgc2VsZi53ZWJzb2NrZXQuc2VuZChkYXRhKTtcbiAgICAgIH0sMCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIFdTLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHRoaXMud2Vic29ja2V0LnNlbmQoZGF0YSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBheWxvYWRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFdTLnByb3RvdHlwZS5wYXlsb2FkID0gZnVuY3Rpb24gKGFycikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpcy5wYWNrZXQoYXJyW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgdGhlIGVzdGFibGlzaGVkIGBXZWJTb2NrZXRgIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFdTLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLndlYnNvY2tldC5jbG9zZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGUgdGhlIGVycm9ycyB0aGF0IGBXZWJTb2NrZXRgIG1pZ2h0IGJlIGdpdmluZyB3aGVuIHdlXG4gICAqIGFyZSBhdHRlbXB0aW5nIHRvIGNvbm5lY3Qgb3Igc2VuZCBtZXNzYWdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtFcnJvcn0gZSBUaGUgZXJyb3IuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBXUy5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5zb2NrZXQub25FcnJvcihlKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXBwcm9wcmlhdGUgc2NoZW1lIGZvciB0aGUgVVJJIGdlbmVyYXRpb24uXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgV1MucHJvdG90eXBlLnNjaGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQub3B0aW9ucy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgYnJvd3NlciBoYXMgc3VwcG9ydCBmb3IgbmF0aXZlIGBXZWJTb2NrZXRzYCBhbmQgdGhhdFxuICAgKiBpdCdzIG5vdCB0aGUgcG9seWZpbGwgY3JlYXRlZCBmb3IgdGhlIEZsYXNoU29ja2V0IHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgV1MuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICgnV2ViU29ja2V0JyBpbiBnbG9iYWwgJiYgISgnX19hZGRUYXNrJyBpbiBXZWJTb2NrZXQpKVxuICAgICAgICAgIHx8ICdNb3pXZWJTb2NrZXQnIGluIGdsb2JhbDtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGBXZWJTb2NrZXRgIHRyYW5zcG9ydCBzdXBwb3J0IGNyb3NzIGRvbWFpbiBjb21tdW5pY2F0aW9ucy5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFdTLnhkb21haW5DaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgnd2Vic29ja2V0Jyk7XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbiAgLCB0aGlzXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuZmxhc2hzb2NrZXQgPSBGbGFzaHNvY2tldDtcblxuICAvKipcbiAgICogVGhlIEZsYXNoU29ja2V0IHRyYW5zcG9ydC4gVGhpcyBpcyBhIEFQSSB3cmFwcGVyIGZvciB0aGUgSFRNTDUgV2ViU29ja2V0XG4gICAqIHNwZWNpZmljYXRpb24uIEl0IHVzZXMgYSAuc3dmIGZpbGUgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgc2VydmVyLiBJZiB5b3Ugd2FudFxuICAgKiB0byBzZXJ2ZSB0aGUgLnN3ZiBmaWxlIGZyb20gYSBvdGhlciBzZXJ2ZXIgdGhhbiB3aGVyZSB0aGUgU29ja2V0LklPIHNjcmlwdCBpc1xuICAgKiBjb21pbmcgZnJvbSB5b3UgbmVlZCB0byB1c2UgdGhlIGluc2VjdXJlIHZlcnNpb24gb2YgdGhlIC5zd2YuIE1vcmUgaW5mb3JtYXRpb25cbiAgICogYWJvdXQgdGhpcyBjYW4gYmUgZm91bmQgb24gdGhlIGdpdGh1YiBwYWdlLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGV4dGVuZHMge2lvLlRyYW5zcG9ydC53ZWJzb2NrZXR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEZsYXNoc29ja2V0ICgpIHtcbiAgICBpby5UcmFuc3BvcnQud2Vic29ja2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICAgKi9cblxuICBpby51dGlsLmluaGVyaXQoRmxhc2hzb2NrZXQsIGlvLlRyYW5zcG9ydC53ZWJzb2NrZXQpO1xuXG4gIC8qKlxuICAgKiBUcmFuc3BvcnQgbmFtZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC5wcm90b3R5cGUubmFtZSA9ICdmbGFzaHNvY2tldCc7XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgdGhlIGVzdGFibGlzaGVkIGBGbGFzaFNvY2tldGAgY29ubmVjdGlvbi4gVGhpcyBpcyBkb25lIGJ5IGFkZGluZyBhIFxuICAgKiBuZXcgdGFzayB0byB0aGUgRmxhc2hTb2NrZXQuIFRoZSByZXN0IHdpbGwgYmUgaGFuZGxlZCBvZmYgYnkgdGhlIGBXZWJTb2NrZXRgIFxuICAgKiB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgV2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICBpby5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5vcGVuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSB0byB0aGUgU29ja2V0LklPIHNlcnZlci4gVGhpcyBpcyBkb25lIGJ5IGFkZGluZyBhIG5ld1xuICAgKiB0YXNrIHRvIHRoZSBGbGFzaFNvY2tldC4gVGhlIHJlc3Qgd2lsbCBiZSBoYW5kbGVkIG9mZiBieSB0aGUgYFdlYlNvY2tldGAgXG4gICAqIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24gKCkge1xuICAgICAgaW8uVHJhbnNwb3J0LndlYnNvY2tldC5wcm90b3R5cGUuc2VuZC5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIGVzdGFibGlzaGVkIGBGbGFzaFNvY2tldGAgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIFdlYlNvY2tldC5fX3Rhc2tzLmxlbmd0aCA9IDA7XG4gICAgaW8uVHJhbnNwb3J0LndlYnNvY2tldC5wcm90b3R5cGUuY2xvc2UuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogVGhlIFdlYlNvY2tldCBmYWxsIGJhY2sgbmVlZHMgdG8gYXBwZW5kIHRoZSBmbGFzaCBjb250YWluZXIgdG8gdGhlIGJvZHlcbiAgICogZWxlbWVudCwgc28gd2UgbmVlZCB0byBtYWtlIHN1cmUgd2UgaGF2ZSBhY2Nlc3MgdG8gaXQuIE9yIGRlZmVyIHRoZSBjYWxsXG4gICAqIHVudGlsIHdlIGFyZSBzdXJlIHRoZXJlIGlzIGEgYm9keSBlbGVtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2UgdGhhdCBuZWVkcyBhIHRyYW5zcG9ydFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2tcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0LnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIChzb2NrZXQsIGZuKSB7XG4gICAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHNvY2tldC5vcHRpb25zXG4gICAgICAgICwgcG9ydCA9IG9wdGlvbnNbJ2ZsYXNoIHBvbGljeSBwb3J0J11cbiAgICAgICAgLCBwYXRoID0gW1xuICAgICAgICAgICAgICAnaHR0cCcgKyAob3B0aW9ucy5zZWN1cmUgPyAncycgOiAnJykgKyAnOi8nXG4gICAgICAgICAgICAsIG9wdGlvbnMuaG9zdCArICc6JyArIG9wdGlvbnMucG9ydFxuICAgICAgICAgICAgLCBvcHRpb25zLnJlc291cmNlXG4gICAgICAgICAgICAsICdzdGF0aWMvZmxhc2hzb2NrZXQnXG4gICAgICAgICAgICAsICdXZWJTb2NrZXRNYWluJyArIChzb2NrZXQuaXNYRG9tYWluKCkgPyAnSW5zZWN1cmUnIDogJycpICsgJy5zd2YnXG4gICAgICAgICAgXTtcblxuICAgICAgLy8gT25seSBzdGFydCBkb3dubG9hZGluZyB0aGUgc3dmIGZpbGUgd2hlbiB0aGUgY2hlY2tlZCB0aGF0IHRoaXMgYnJvd3NlclxuICAgICAgLy8gYWN0dWFsbHkgc3VwcG9ydHMgaXRcbiAgICAgIGlmICghRmxhc2hzb2NrZXQubG9hZGVkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gU2V0IHRoZSBjb3JyZWN0IGZpbGUgYmFzZWQgb24gdGhlIFhEb21haW4gc2V0dGluZ3NcbiAgICAgICAgICBXRUJfU09DS0VUX1NXRl9MT0NBVElPTiA9IHBhdGguam9pbignLycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvcnQgIT09IDg0Mykge1xuICAgICAgICAgIFdlYlNvY2tldC5sb2FkRmxhc2hQb2xpY3lGaWxlKCd4bWxzb2NrZXQ6Ly8nICsgb3B0aW9ucy5ob3N0ICsgJzonICsgcG9ydCk7XG4gICAgICAgIH1cblxuICAgICAgICBXZWJTb2NrZXQuX19pbml0aWFsaXplKCk7XG4gICAgICAgIEZsYXNoc29ja2V0LmxvYWRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGZuLmNhbGwoc2VsZik7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmIChkb2N1bWVudC5ib2R5KSByZXR1cm4gaW5pdCgpO1xuXG4gICAgaW8udXRpbC5sb2FkKGluaXQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgRmxhc2hTb2NrZXQgdHJhbnNwb3J0IGlzIHN1cHBvcnRlZCBhcyBpdCByZXF1aXJlcyB0aGF0IHRoZSBBZG9iZVxuICAgKiBGbGFzaCBQbGF5ZXIgcGx1Zy1pbiB2ZXJzaW9uIGAxMC4wLjBgIG9yIGdyZWF0ZXIgaXMgaW5zdGFsbGVkLiBBbmQgYWxzbyBjaGVjayBpZlxuICAgKiB0aGUgcG9seWZpbGwgaXMgY29ycmVjdGx5IGxvYWRlZC5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0LmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChcbiAgICAgICAgdHlwZW9mIFdlYlNvY2tldCA9PSAndW5kZWZpbmVkJ1xuICAgICAgfHwgISgnX19pbml0aWFsaXplJyBpbiBXZWJTb2NrZXQpIHx8ICFzd2ZvYmplY3RcbiAgICApIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBzd2ZvYmplY3QuZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uKCkubWFqb3IgPj0gMTA7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBGbGFzaFNvY2tldCB0cmFuc3BvcnQgY2FuIGJlIHVzZWQgYXMgY3Jvc3MgZG9tYWluIC8gY3Jvc3Mgb3JpZ2luIFxuICAgKiB0cmFuc3BvcnQuIEJlY2F1c2Ugd2UgY2FuJ3Qgc2VlIHdoaWNoIHR5cGUgKHNlY3VyZSBvciBpbnNlY3VyZSkgb2YgLnN3ZiBpcyB1c2VkXG4gICAqIHdlIHdpbGwganVzdCByZXR1cm4gdHJ1ZS5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0Lnhkb21haW5DaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzYWJsZSBBVVRPX0lOSVRJQUxJWkFUSU9OXG4gICAqL1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgV0VCX1NPQ0tFVF9ESVNBQkxFX0FVVE9fSU5JVElBTElaQVRJT04gPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgdHJhbnNwb3J0IHRvIHlvdXIgcHVibGljIGlvLnRyYW5zcG9ydHMgYXJyYXkuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBpby50cmFuc3BvcnRzLnB1c2goJ2ZsYXNoc29ja2V0Jyk7XG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuLypcdFNXRk9iamVjdCB2Mi4yIDxodHRwOi8vY29kZS5nb29nbGUuY29tL3Avc3dmb2JqZWN0Lz4gXG5cdGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSA8aHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHA+IFxuKi9cbmlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2Ygd2luZG93KSB7XG52YXIgc3dmb2JqZWN0PWZ1bmN0aW9uKCl7dmFyIEQ9XCJ1bmRlZmluZWRcIixyPVwib2JqZWN0XCIsUz1cIlNob2Nrd2F2ZSBGbGFzaFwiLFc9XCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaFwiLHE9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiLFI9XCJTV0ZPYmplY3RFeHBySW5zdFwiLHg9XCJvbnJlYWR5c3RhdGVjaGFuZ2VcIixPPXdpbmRvdyxqPWRvY3VtZW50LHQ9bmF2aWdhdG9yLFQ9ZmFsc2UsVT1baF0sbz1bXSxOPVtdLEk9W10sbCxRLEUsQixKPWZhbHNlLGE9ZmFsc2UsbixHLG09dHJ1ZSxNPWZ1bmN0aW9uKCl7dmFyIGFhPXR5cGVvZiBqLmdldEVsZW1lbnRCeUlkIT1EJiZ0eXBlb2Ygai5nZXRFbGVtZW50c0J5VGFnTmFtZSE9RCYmdHlwZW9mIGouY3JlYXRlRWxlbWVudCE9RCxhaD10LnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFk9dC5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLGFlPVk/L3dpbi8udGVzdChZKTovd2luLy50ZXN0KGFoKSxhYz1ZPy9tYWMvLnRlc3QoWSk6L21hYy8udGVzdChhaCksYWY9L3dlYmtpdC8udGVzdChhaCk/cGFyc2VGbG9hdChhaC5yZXBsYWNlKC9eLip3ZWJraXRcXC8oXFxkKyhcXC5cXGQrKT8pLiokLyxcIiQxXCIpKTpmYWxzZSxYPSErXCJcXHYxXCIsYWc9WzAsMCwwXSxhYj1udWxsO2lmKHR5cGVvZiB0LnBsdWdpbnMhPUQmJnR5cGVvZiB0LnBsdWdpbnNbU109PXIpe2FiPXQucGx1Z2luc1tTXS5kZXNjcmlwdGlvbjtpZihhYiYmISh0eXBlb2YgdC5taW1lVHlwZXMhPUQmJnQubWltZVR5cGVzW3FdJiYhdC5taW1lVHlwZXNbcV0uZW5hYmxlZFBsdWdpbikpe1Q9dHJ1ZTtYPWZhbHNlO2FiPWFiLnJlcGxhY2UoL14uKlxccysoXFxTK1xccytcXFMrJCkvLFwiJDFcIik7YWdbMF09cGFyc2VJbnQoYWIucmVwbGFjZSgvXiguKilcXC4uKiQvLFwiJDFcIiksMTApO2FnWzFdPXBhcnNlSW50KGFiLnJlcGxhY2UoL14uKlxcLiguKilcXHMuKiQvLFwiJDFcIiksMTApO2FnWzJdPS9bYS16QS1aXS8udGVzdChhYik/cGFyc2VJbnQoYWIucmVwbGFjZSgvXi4qW2EtekEtWl0rKC4qKSQvLFwiJDFcIiksMTApOjB9fWVsc2V7aWYodHlwZW9mIE9bKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXSE9RCl7dHJ5e3ZhciBhZD1uZXcgd2luZG93WyhbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpKV0oVyk7aWYoYWQpe2FiPWFkLkdldFZhcmlhYmxlKFwiJHZlcnNpb25cIik7aWYoYWIpe1g9dHJ1ZTthYj1hYi5zcGxpdChcIiBcIilbMV0uc3BsaXQoXCIsXCIpO2FnPVtwYXJzZUludChhYlswXSwxMCkscGFyc2VJbnQoYWJbMV0sMTApLHBhcnNlSW50KGFiWzJdLDEwKV19fX1jYXRjaChaKXt9fX1yZXR1cm57dzM6YWEscHY6YWcsd2s6YWYsaWU6WCx3aW46YWUsbWFjOmFjfX0oKSxrPWZ1bmN0aW9uKCl7aWYoIU0udzMpe3JldHVybn1pZigodHlwZW9mIGoucmVhZHlTdGF0ZSE9RCYmai5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCIpfHwodHlwZW9mIGoucmVhZHlTdGF0ZT09RCYmKGouZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdfHxqLmJvZHkpKSl7ZigpfWlmKCFKKXtpZih0eXBlb2Ygai5hZGRFdmVudExpc3RlbmVyIT1EKXtqLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsZixmYWxzZSl9aWYoTS5pZSYmTS53aW4pe2ouYXR0YWNoRXZlbnQoeCxmdW5jdGlvbigpe2lmKGoucmVhZHlTdGF0ZT09XCJjb21wbGV0ZVwiKXtqLmRldGFjaEV2ZW50KHgsYXJndW1lbnRzLmNhbGxlZSk7ZigpfX0pO2lmKE89PXRvcCl7KGZ1bmN0aW9uKCl7aWYoSil7cmV0dXJufXRyeXtqLmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbChcImxlZnRcIil9Y2F0Y2goWCl7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDApO3JldHVybn1mKCl9KSgpfX1pZihNLndrKXsoZnVuY3Rpb24oKXtpZihKKXtyZXR1cm59aWYoIS9sb2FkZWR8Y29tcGxldGUvLnRlc3Qoai5yZWFkeVN0YXRlKSl7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDApO3JldHVybn1mKCl9KSgpfXMoZil9fSgpO2Z1bmN0aW9uIGYoKXtpZihKKXtyZXR1cm59dHJ5e3ZhciBaPWouZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLmFwcGVuZENoaWxkKEMoXCJzcGFuXCIpKTtaLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoWil9Y2F0Y2goYWEpe3JldHVybn1KPXRydWU7dmFyIFg9VS5sZW5ndGg7Zm9yKHZhciBZPTA7WTxYO1krKyl7VVtZXSgpfX1mdW5jdGlvbiBLKFgpe2lmKEope1goKX1lbHNle1VbVS5sZW5ndGhdPVh9fWZ1bmN0aW9uIHMoWSl7aWYodHlwZW9mIE8uYWRkRXZlbnRMaXN0ZW5lciE9RCl7Ty5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLFksZmFsc2UpfWVsc2V7aWYodHlwZW9mIGouYWRkRXZlbnRMaXN0ZW5lciE9RCl7ai5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLFksZmFsc2UpfWVsc2V7aWYodHlwZW9mIE8uYXR0YWNoRXZlbnQhPUQpe2koTyxcIm9ubG9hZFwiLFkpfWVsc2V7aWYodHlwZW9mIE8ub25sb2FkPT1cImZ1bmN0aW9uXCIpe3ZhciBYPU8ub25sb2FkO08ub25sb2FkPWZ1bmN0aW9uKCl7WCgpO1koKX19ZWxzZXtPLm9ubG9hZD1ZfX19fX1mdW5jdGlvbiBoKCl7aWYoVCl7VigpfWVsc2V7SCgpfX1mdW5jdGlvbiBWKCl7dmFyIFg9ai5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07dmFyIGFhPUMocik7YWEuc2V0QXR0cmlidXRlKFwidHlwZVwiLHEpO3ZhciBaPVguYXBwZW5kQ2hpbGQoYWEpO2lmKFope3ZhciBZPTA7KGZ1bmN0aW9uKCl7aWYodHlwZW9mIFouR2V0VmFyaWFibGUhPUQpe3ZhciBhYj1aLkdldFZhcmlhYmxlKFwiJHZlcnNpb25cIik7aWYoYWIpe2FiPWFiLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIixcIik7TS5wdj1bcGFyc2VJbnQoYWJbMF0sMTApLHBhcnNlSW50KGFiWzFdLDEwKSxwYXJzZUludChhYlsyXSwxMCldfX1lbHNle2lmKFk8MTApe1krKztzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApO3JldHVybn19WC5yZW1vdmVDaGlsZChhYSk7Wj1udWxsO0goKX0pKCl9ZWxzZXtIKCl9fWZ1bmN0aW9uIEgoKXt2YXIgYWc9by5sZW5ndGg7aWYoYWc+MCl7Zm9yKHZhciBhZj0wO2FmPGFnO2FmKyspe3ZhciBZPW9bYWZdLmlkO3ZhciBhYj1vW2FmXS5jYWxsYmFja0ZuO3ZhciBhYT17c3VjY2VzczpmYWxzZSxpZDpZfTtpZihNLnB2WzBdPjApe3ZhciBhZT1jKFkpO2lmKGFlKXtpZihGKG9bYWZdLnN3ZlZlcnNpb24pJiYhKE0ud2smJk0ud2s8MzEyKSl7dyhZLHRydWUpO2lmKGFiKXthYS5zdWNjZXNzPXRydWU7YWEucmVmPXooWSk7YWIoYWEpfX1lbHNle2lmKG9bYWZdLmV4cHJlc3NJbnN0YWxsJiZBKCkpe3ZhciBhaT17fTthaS5kYXRhPW9bYWZdLmV4cHJlc3NJbnN0YWxsO2FpLndpZHRoPWFlLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpfHxcIjBcIjthaS5oZWlnaHQ9YWUuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpfHxcIjBcIjtpZihhZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSl7YWkuc3R5bGVjbGFzcz1hZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKX1pZihhZS5nZXRBdHRyaWJ1dGUoXCJhbGlnblwiKSl7YWkuYWxpZ249YWUuZ2V0QXR0cmlidXRlKFwiYWxpZ25cIil9dmFyIGFoPXt9O3ZhciBYPWFlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFyYW1cIik7dmFyIGFjPVgubGVuZ3RoO2Zvcih2YXIgYWQ9MDthZDxhYzthZCsrKXtpZihYW2FkXS5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpLnRvTG93ZXJDYXNlKCkhPVwibW92aWVcIil7YWhbWFthZF0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKV09WFthZF0uZ2V0QXR0cmlidXRlKFwidmFsdWVcIil9fVAoYWksYWgsWSxhYil9ZWxzZXtwKGFlKTtpZihhYil7YWIoYWEpfX19fX1lbHNle3coWSx0cnVlKTtpZihhYil7dmFyIFo9eihZKTtpZihaJiZ0eXBlb2YgWi5TZXRWYXJpYWJsZSE9RCl7YWEuc3VjY2Vzcz10cnVlO2FhLnJlZj1afWFiKGFhKX19fX19ZnVuY3Rpb24geihhYSl7dmFyIFg9bnVsbDt2YXIgWT1jKGFhKTtpZihZJiZZLm5vZGVOYW1lPT1cIk9CSkVDVFwiKXtpZih0eXBlb2YgWS5TZXRWYXJpYWJsZSE9RCl7WD1ZfWVsc2V7dmFyIFo9WS5nZXRFbGVtZW50c0J5VGFnTmFtZShyKVswXTtpZihaKXtYPVp9fX1yZXR1cm4gWH1mdW5jdGlvbiBBKCl7cmV0dXJuICFhJiZGKFwiNi4wLjY1XCIpJiYoTS53aW58fE0ubWFjKSYmIShNLndrJiZNLndrPDMxMil9ZnVuY3Rpb24gUChhYSxhYixYLFope2E9dHJ1ZTtFPVp8fG51bGw7Qj17c3VjY2VzczpmYWxzZSxpZDpYfTt2YXIgYWU9YyhYKTtpZihhZSl7aWYoYWUubm9kZU5hbWU9PVwiT0JKRUNUXCIpe2w9ZyhhZSk7UT1udWxsfWVsc2V7bD1hZTtRPVh9YWEuaWQ9UjtpZih0eXBlb2YgYWEud2lkdGg9PUR8fCghLyUkLy50ZXN0KGFhLndpZHRoKSYmcGFyc2VJbnQoYWEud2lkdGgsMTApPDMxMCkpe2FhLndpZHRoPVwiMzEwXCJ9aWYodHlwZW9mIGFhLmhlaWdodD09RHx8KCEvJSQvLnRlc3QoYWEuaGVpZ2h0KSYmcGFyc2VJbnQoYWEuaGVpZ2h0LDEwKTwxMzcpKXthYS5oZWlnaHQ9XCIxMzdcIn1qLnRpdGxlPWoudGl0bGUuc2xpY2UoMCw0NykrXCIgLSBGbGFzaCBQbGF5ZXIgSW5zdGFsbGF0aW9uXCI7dmFyIGFkPU0uaWUmJk0ud2luPyhbJ0FjdGl2ZSddLmNvbmNhdCgnJykuam9pbignWCcpKTpcIlBsdWdJblwiLGFjPVwiTU1yZWRpcmVjdFVSTD1cIitPLmxvY2F0aW9uLnRvU3RyaW5nKCkucmVwbGFjZSgvJi9nLFwiJTI2XCIpK1wiJk1NcGxheWVyVHlwZT1cIithZCtcIiZNTWRvY3RpdGxlPVwiK2oudGl0bGU7aWYodHlwZW9mIGFiLmZsYXNodmFycyE9RCl7YWIuZmxhc2h2YXJzKz1cIiZcIithY31lbHNle2FiLmZsYXNodmFycz1hY31pZihNLmllJiZNLndpbiYmYWUucmVhZHlTdGF0ZSE9NCl7dmFyIFk9QyhcImRpdlwiKTtYKz1cIlNXRk9iamVjdE5ld1wiO1kuc2V0QXR0cmlidXRlKFwiaWRcIixYKTthZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShZLGFlKTthZS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiOyhmdW5jdGlvbigpe2lmKGFlLnJlYWR5U3RhdGU9PTQpe2FlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYWUpfWVsc2V7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX19KSgpfXUoYWEsYWIsWCl9fWZ1bmN0aW9uIHAoWSl7aWYoTS5pZSYmTS53aW4mJlkucmVhZHlTdGF0ZSE9NCl7dmFyIFg9QyhcImRpdlwiKTtZLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFgsWSk7WC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChnKFkpLFgpO1kuc3R5bGUuZGlzcGxheT1cIm5vbmVcIjsoZnVuY3Rpb24oKXtpZihZLnJlYWR5U3RhdGU9PTQpe1kucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChZKX1lbHNle3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCl9fSkoKX1lbHNle1kucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZyhZKSxZKX19ZnVuY3Rpb24gZyhhYil7dmFyIGFhPUMoXCJkaXZcIik7aWYoTS53aW4mJk0uaWUpe2FhLmlubmVySFRNTD1hYi5pbm5lckhUTUx9ZWxzZXt2YXIgWT1hYi5nZXRFbGVtZW50c0J5VGFnTmFtZShyKVswXTtpZihZKXt2YXIgYWQ9WS5jaGlsZE5vZGVzO2lmKGFkKXt2YXIgWD1hZC5sZW5ndGg7Zm9yKHZhciBaPTA7WjxYO1orKyl7aWYoIShhZFtaXS5ub2RlVHlwZT09MSYmYWRbWl0ubm9kZU5hbWU9PVwiUEFSQU1cIikmJiEoYWRbWl0ubm9kZVR5cGU9PTgpKXthYS5hcHBlbmRDaGlsZChhZFtaXS5jbG9uZU5vZGUodHJ1ZSkpfX19fX1yZXR1cm4gYWF9ZnVuY3Rpb24gdShhaSxhZyxZKXt2YXIgWCxhYT1jKFkpO2lmKE0ud2smJk0ud2s8MzEyKXtyZXR1cm4gWH1pZihhYSl7aWYodHlwZW9mIGFpLmlkPT1EKXthaS5pZD1ZfWlmKE0uaWUmJk0ud2luKXt2YXIgYWg9XCJcIjtmb3IodmFyIGFlIGluIGFpKXtpZihhaVthZV0hPU9iamVjdC5wcm90b3R5cGVbYWVdKXtpZihhZS50b0xvd2VyQ2FzZSgpPT1cImRhdGFcIil7YWcubW92aWU9YWlbYWVdfWVsc2V7aWYoYWUudG9Mb3dlckNhc2UoKT09XCJzdHlsZWNsYXNzXCIpe2FoKz0nIGNsYXNzPVwiJythaVthZV0rJ1wiJ31lbHNle2lmKGFlLnRvTG93ZXJDYXNlKCkhPVwiY2xhc3NpZFwiKXthaCs9XCIgXCIrYWUrJz1cIicrYWlbYWVdKydcIid9fX19fXZhciBhZj1cIlwiO2Zvcih2YXIgYWQgaW4gYWcpe2lmKGFnW2FkXSE9T2JqZWN0LnByb3RvdHlwZVthZF0pe2FmKz0nPHBhcmFtIG5hbWU9XCInK2FkKydcIiB2YWx1ZT1cIicrYWdbYWRdKydcIiAvPid9fWFhLm91dGVySFRNTD0nPG9iamVjdCBjbGFzc2lkPVwiY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwXCInK2FoK1wiPlwiK2FmK1wiPC9vYmplY3Q+XCI7TltOLmxlbmd0aF09YWkuaWQ7WD1jKGFpLmlkKX1lbHNle3ZhciBaPUMocik7Wi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIscSk7Zm9yKHZhciBhYyBpbiBhaSl7aWYoYWlbYWNdIT1PYmplY3QucHJvdG90eXBlW2FjXSl7aWYoYWMudG9Mb3dlckNhc2UoKT09XCJzdHlsZWNsYXNzXCIpe1ouc2V0QXR0cmlidXRlKFwiY2xhc3NcIixhaVthY10pfWVsc2V7aWYoYWMudG9Mb3dlckNhc2UoKSE9XCJjbGFzc2lkXCIpe1ouc2V0QXR0cmlidXRlKGFjLGFpW2FjXSl9fX19Zm9yKHZhciBhYiBpbiBhZyl7aWYoYWdbYWJdIT1PYmplY3QucHJvdG90eXBlW2FiXSYmYWIudG9Mb3dlckNhc2UoKSE9XCJtb3ZpZVwiKXtlKFosYWIsYWdbYWJdKX19YWEucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoWixhYSk7WD1afX1yZXR1cm4gWH1mdW5jdGlvbiBlKFosWCxZKXt2YXIgYWE9QyhcInBhcmFtXCIpO2FhLnNldEF0dHJpYnV0ZShcIm5hbWVcIixYKTthYS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLFkpO1ouYXBwZW5kQ2hpbGQoYWEpfWZ1bmN0aW9uIHkoWSl7dmFyIFg9YyhZKTtpZihYJiZYLm5vZGVOYW1lPT1cIk9CSkVDVFwiKXtpZihNLmllJiZNLndpbil7WC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiOyhmdW5jdGlvbigpe2lmKFgucmVhZHlTdGF0ZT09NCl7YihZKX1lbHNle3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCl9fSkoKX1lbHNle1gucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChYKX19fWZ1bmN0aW9uIGIoWil7dmFyIFk9YyhaKTtpZihZKXtmb3IodmFyIFggaW4gWSl7aWYodHlwZW9mIFlbWF09PVwiZnVuY3Rpb25cIil7WVtYXT1udWxsfX1ZLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoWSl9fWZ1bmN0aW9uIGMoWil7dmFyIFg9bnVsbDt0cnl7WD1qLmdldEVsZW1lbnRCeUlkKFopfWNhdGNoKFkpe31yZXR1cm4gWH1mdW5jdGlvbiBDKFgpe3JldHVybiBqLmNyZWF0ZUVsZW1lbnQoWCl9ZnVuY3Rpb24gaShaLFgsWSl7Wi5hdHRhY2hFdmVudChYLFkpO0lbSS5sZW5ndGhdPVtaLFgsWV19ZnVuY3Rpb24gRihaKXt2YXIgWT1NLnB2LFg9Wi5zcGxpdChcIi5cIik7WFswXT1wYXJzZUludChYWzBdLDEwKTtYWzFdPXBhcnNlSW50KFhbMV0sMTApfHwwO1hbMl09cGFyc2VJbnQoWFsyXSwxMCl8fDA7cmV0dXJuKFlbMF0+WFswXXx8KFlbMF09PVhbMF0mJllbMV0+WFsxXSl8fChZWzBdPT1YWzBdJiZZWzFdPT1YWzFdJiZZWzJdPj1YWzJdKSk/dHJ1ZTpmYWxzZX1mdW5jdGlvbiB2KGFjLFksYWQsYWIpe2lmKE0uaWUmJk0ubWFjKXtyZXR1cm59dmFyIGFhPWouZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO2lmKCFhYSl7cmV0dXJufXZhciBYPShhZCYmdHlwZW9mIGFkPT1cInN0cmluZ1wiKT9hZDpcInNjcmVlblwiO2lmKGFiKXtuPW51bGw7Rz1udWxsfWlmKCFufHxHIT1YKXt2YXIgWj1DKFwic3R5bGVcIik7Wi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJ0ZXh0L2Nzc1wiKTtaLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsWCk7bj1hYS5hcHBlbmRDaGlsZChaKTtpZihNLmllJiZNLndpbiYmdHlwZW9mIGouc3R5bGVTaGVldHMhPUQmJmouc3R5bGVTaGVldHMubGVuZ3RoPjApe249ai5zdHlsZVNoZWV0c1tqLnN0eWxlU2hlZXRzLmxlbmd0aC0xXX1HPVh9aWYoTS5pZSYmTS53aW4pe2lmKG4mJnR5cGVvZiBuLmFkZFJ1bGU9PXIpe24uYWRkUnVsZShhYyxZKX19ZWxzZXtpZihuJiZ0eXBlb2Ygai5jcmVhdGVUZXh0Tm9kZSE9RCl7bi5hcHBlbmRDaGlsZChqLmNyZWF0ZVRleHROb2RlKGFjK1wiIHtcIitZK1wifVwiKSl9fX1mdW5jdGlvbiB3KFosWCl7aWYoIW0pe3JldHVybn12YXIgWT1YP1widmlzaWJsZVwiOlwiaGlkZGVuXCI7aWYoSiYmYyhaKSl7YyhaKS5zdHlsZS52aXNpYmlsaXR5PVl9ZWxzZXt2KFwiI1wiK1osXCJ2aXNpYmlsaXR5OlwiK1kpfX1mdW5jdGlvbiBMKFkpe3ZhciBaPS9bXFxcXFxcXCI8PlxcLjtdLzt2YXIgWD1aLmV4ZWMoWSkhPW51bGw7cmV0dXJuIFgmJnR5cGVvZiBlbmNvZGVVUklDb21wb25lbnQhPUQ/ZW5jb2RlVVJJQ29tcG9uZW50KFkpOll9dmFyIGQ9ZnVuY3Rpb24oKXtpZihNLmllJiZNLndpbil7d2luZG93LmF0dGFjaEV2ZW50KFwib251bmxvYWRcIixmdW5jdGlvbigpe3ZhciBhYz1JLmxlbmd0aDtmb3IodmFyIGFiPTA7YWI8YWM7YWIrKyl7SVthYl1bMF0uZGV0YWNoRXZlbnQoSVthYl1bMV0sSVthYl1bMl0pfXZhciBaPU4ubGVuZ3RoO2Zvcih2YXIgYWE9MDthYTxaO2FhKyspe3koTlthYV0pfWZvcih2YXIgWSBpbiBNKXtNW1ldPW51bGx9TT1udWxsO2Zvcih2YXIgWCBpbiBzd2ZvYmplY3Qpe3N3Zm9iamVjdFtYXT1udWxsfXN3Zm9iamVjdD1udWxsfSl9fSgpO3JldHVybntyZWdpc3Rlck9iamVjdDpmdW5jdGlvbihhYixYLGFhLFope2lmKE0udzMmJmFiJiZYKXt2YXIgWT17fTtZLmlkPWFiO1kuc3dmVmVyc2lvbj1YO1kuZXhwcmVzc0luc3RhbGw9YWE7WS5jYWxsYmFja0ZuPVo7b1tvLmxlbmd0aF09WTt3KGFiLGZhbHNlKX1lbHNle2lmKFope1ooe3N1Y2Nlc3M6ZmFsc2UsaWQ6YWJ9KX19fSxnZXRPYmplY3RCeUlkOmZ1bmN0aW9uKFgpe2lmKE0udzMpe3JldHVybiB6KFgpfX0sZW1iZWRTV0Y6ZnVuY3Rpb24oYWIsYWgsYWUsYWcsWSxhYSxaLGFkLGFmLGFjKXt2YXIgWD17c3VjY2VzczpmYWxzZSxpZDphaH07aWYoTS53MyYmIShNLndrJiZNLndrPDMxMikmJmFiJiZhaCYmYWUmJmFnJiZZKXt3KGFoLGZhbHNlKTtLKGZ1bmN0aW9uKCl7YWUrPVwiXCI7YWcrPVwiXCI7dmFyIGFqPXt9O2lmKGFmJiZ0eXBlb2YgYWY9PT1yKXtmb3IodmFyIGFsIGluIGFmKXthalthbF09YWZbYWxdfX1hai5kYXRhPWFiO2FqLndpZHRoPWFlO2FqLmhlaWdodD1hZzt2YXIgYW09e307aWYoYWQmJnR5cGVvZiBhZD09PXIpe2Zvcih2YXIgYWsgaW4gYWQpe2FtW2FrXT1hZFtha119fWlmKFomJnR5cGVvZiBaPT09cil7Zm9yKHZhciBhaSBpbiBaKXtpZih0eXBlb2YgYW0uZmxhc2h2YXJzIT1EKXthbS5mbGFzaHZhcnMrPVwiJlwiK2FpK1wiPVwiK1pbYWldfWVsc2V7YW0uZmxhc2h2YXJzPWFpK1wiPVwiK1pbYWldfX19aWYoRihZKSl7dmFyIGFuPXUoYWosYW0sYWgpO2lmKGFqLmlkPT1haCl7dyhhaCx0cnVlKX1YLnN1Y2Nlc3M9dHJ1ZTtYLnJlZj1hbn1lbHNle2lmKGFhJiZBKCkpe2FqLmRhdGE9YWE7UChhaixhbSxhaCxhYyk7cmV0dXJufWVsc2V7dyhhaCx0cnVlKX19aWYoYWMpe2FjKFgpfX0pfWVsc2V7aWYoYWMpe2FjKFgpfX19LHN3aXRjaE9mZkF1dG9IaWRlU2hvdzpmdW5jdGlvbigpe209ZmFsc2V9LHVhOk0sZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uOmZ1bmN0aW9uKCl7cmV0dXJue21ham9yOk0ucHZbMF0sbWlub3I6TS5wdlsxXSxyZWxlYXNlOk0ucHZbMl19fSxoYXNGbGFzaFBsYXllclZlcnNpb246RixjcmVhdGVTV0Y6ZnVuY3Rpb24oWixZLFgpe2lmKE0udzMpe3JldHVybiB1KFosWSxYKX1lbHNle3JldHVybiB1bmRlZmluZWR9fSxzaG93RXhwcmVzc0luc3RhbGw6ZnVuY3Rpb24oWixhYSxYLFkpe2lmKE0udzMmJkEoKSl7UChaLGFhLFgsWSl9fSxyZW1vdmVTV0Y6ZnVuY3Rpb24oWCl7aWYoTS53Myl7eShYKX19LGNyZWF0ZUNTUzpmdW5jdGlvbihhYSxaLFksWCl7aWYoTS53Myl7dihhYSxaLFksWCl9fSxhZGREb21Mb2FkRXZlbnQ6SyxhZGRMb2FkRXZlbnQ6cyxnZXRRdWVyeVBhcmFtVmFsdWU6ZnVuY3Rpb24oYWEpe3ZhciBaPWoubG9jYXRpb24uc2VhcmNofHxqLmxvY2F0aW9uLmhhc2g7aWYoWil7aWYoL1xcPy8udGVzdChaKSl7Wj1aLnNwbGl0KFwiP1wiKVsxXX1pZihhYT09bnVsbCl7cmV0dXJuIEwoWil9dmFyIFk9Wi5zcGxpdChcIiZcIik7Zm9yKHZhciBYPTA7WDxZLmxlbmd0aDtYKyspe2lmKFlbWF0uc3Vic3RyaW5nKDAsWVtYXS5pbmRleE9mKFwiPVwiKSk9PWFhKXtyZXR1cm4gTChZW1hdLnN1YnN0cmluZygoWVtYXS5pbmRleE9mKFwiPVwiKSsxKSkpfX19cmV0dXJuXCJcIn0sZXhwcmVzc0luc3RhbGxDYWxsYmFjazpmdW5jdGlvbigpe2lmKGEpe3ZhciBYPWMoUik7aWYoWCYmbCl7WC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChsLFgpO2lmKFEpe3coUSx0cnVlKTtpZihNLmllJiZNLndpbil7bC5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIn19aWYoRSl7RShCKX19YT1mYWxzZX19fX0oKTtcbn1cbi8vIENvcHlyaWdodDogSGlyb3NoaSBJY2hpa2F3YSA8aHR0cDovL2dpbWl0ZS5uZXQvZW4vPlxuLy8gTGljZW5zZTogTmV3IEJTRCBMaWNlbnNlXG4vLyBSZWZlcmVuY2U6IGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnNvY2tldHMvXG4vLyBSZWZlcmVuY2U6IGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWhpeGllLXRoZXdlYnNvY2tldHByb3RvY29sXG5cbihmdW5jdGlvbigpIHtcbiAgXG4gIGlmICgndW5kZWZpbmVkJyA9PSB0eXBlb2Ygd2luZG93IHx8IHdpbmRvdy5XZWJTb2NrZXQpIHJldHVybjtcblxuICB2YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuICBpZiAoIWNvbnNvbGUgfHwgIWNvbnNvbGUubG9nIHx8ICFjb25zb2xlLmVycm9yKSB7XG4gICAgY29uc29sZSA9IHtsb2c6IGZ1bmN0aW9uKCl7IH0sIGVycm9yOiBmdW5jdGlvbigpeyB9fTtcbiAgfVxuICBcbiAgaWYgKCFzd2ZvYmplY3QuaGFzRmxhc2hQbGF5ZXJWZXJzaW9uKFwiMTAuMC4wXCIpKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkZsYXNoIFBsYXllciA+PSAxMC4wLjAgaXMgcmVxdWlyZWQuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobG9jYXRpb24ucHJvdG9jb2wgPT0gXCJmaWxlOlwiKSB7XG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgIFwiV0FSTklORzogd2ViLXNvY2tldC1qcyBkb2Vzbid0IHdvcmsgaW4gZmlsZTovLy8uLi4gVVJMIFwiICtcbiAgICAgIFwidW5sZXNzIHlvdSBzZXQgRmxhc2ggU2VjdXJpdHkgU2V0dGluZ3MgcHJvcGVybHkuIFwiICtcbiAgICAgIFwiT3BlbiB0aGUgcGFnZSB2aWEgV2ViIHNlcnZlciBpLmUuIGh0dHA6Ly8uLi5cIik7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgZmF1eCB3ZWIgc29ja2V0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqIEBwYXJhbSB7YXJyYXkgb3Igc3RyaW5nfSBwcm90b2NvbHNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3h5SG9zdFxuICAgKiBAcGFyYW0ge2ludH0gcHJveHlQb3J0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoZWFkZXJzXG4gICAqL1xuICBXZWJTb2NrZXQgPSBmdW5jdGlvbih1cmwsIHByb3RvY29scywgcHJveHlIb3N0LCBwcm94eVBvcnQsIGhlYWRlcnMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5fX2lkID0gV2ViU29ja2V0Ll9fbmV4dElkKys7XG4gICAgV2ViU29ja2V0Ll9faW5zdGFuY2VzW3NlbGYuX19pZF0gPSBzZWxmO1xuICAgIHNlbGYucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DT05ORUNUSU5HO1xuICAgIHNlbGYuYnVmZmVyZWRBbW91bnQgPSAwO1xuICAgIHNlbGYuX19ldmVudHMgPSB7fTtcbiAgICBpZiAoIXByb3RvY29scykge1xuICAgICAgcHJvdG9jb2xzID0gW107XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJvdG9jb2xzID09IFwic3RyaW5nXCIpIHtcbiAgICAgIHByb3RvY29scyA9IFtwcm90b2NvbHNdO1xuICAgIH1cbiAgICAvLyBVc2VzIHNldFRpbWVvdXQoKSB0byBtYWtlIHN1cmUgX19jcmVhdGVGbGFzaCgpIHJ1bnMgYWZ0ZXIgdGhlIGNhbGxlciBzZXRzIHdzLm9ub3BlbiBldGMuXG4gICAgLy8gT3RoZXJ3aXNlLCB3aGVuIG9ub3BlbiBmaXJlcyBpbW1lZGlhdGVseSwgb25vcGVuIGlzIGNhbGxlZCBiZWZvcmUgaXQgaXMgc2V0LlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBXZWJTb2NrZXQuX19mbGFzaC5jcmVhdGUoXG4gICAgICAgICAgICBzZWxmLl9faWQsIHVybCwgcHJvdG9jb2xzLCBwcm94eUhvc3QgfHwgbnVsbCwgcHJveHlQb3J0IHx8IDAsIGhlYWRlcnMgfHwgbnVsbCk7XG4gICAgICB9KTtcbiAgICB9LCAwKTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZCBkYXRhIHRvIHRoZSB3ZWIgc29ja2V0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSAgVGhlIGRhdGEgdG8gc2VuZCB0byB0aGUgc29ja2V0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSAgVHJ1ZSBmb3Igc3VjY2VzcywgZmFsc2UgZm9yIGZhaWx1cmUuXG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgdGhyb3cgXCJJTlZBTElEX1NUQVRFX0VSUjogV2ViIFNvY2tldCBjb25uZWN0aW9uIGhhcyBub3QgYmVlbiBlc3RhYmxpc2hlZFwiO1xuICAgIH1cbiAgICAvLyBXZSB1c2UgZW5jb2RlVVJJQ29tcG9uZW50KCkgaGVyZSwgYmVjYXVzZSBGQUJyaWRnZSBkb2Vzbid0IHdvcmsgaWZcbiAgICAvLyB0aGUgYXJndW1lbnQgaW5jbHVkZXMgc29tZSBjaGFyYWN0ZXJzLiBXZSBkb24ndCB1c2UgZXNjYXBlKCkgaGVyZVxuICAgIC8vIGJlY2F1c2Ugb2YgdGhpczpcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9Db3JlX0phdmFTY3JpcHRfMS41X0d1aWRlL0Z1bmN0aW9ucyNlc2NhcGVfYW5kX3VuZXNjYXBlX0Z1bmN0aW9uc1xuICAgIC8vIEJ1dCBpdCBsb29rcyBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KHMpKSBkb2Vzbid0XG4gICAgLy8gcHJlc2VydmUgYWxsIFVuaWNvZGUgY2hhcmFjdGVycyBlaXRoZXIgZS5nLiBcIlxcdWZmZmZcIiBpbiBGaXJlZm94LlxuICAgIC8vIE5vdGUgYnkgd3RyaXRjaDogSG9wZWZ1bGx5IHRoaXMgd2lsbCBub3QgYmUgbmVjZXNzYXJ5IHVzaW5nIEV4dGVybmFsSW50ZXJmYWNlLiAgV2lsbCByZXF1aXJlXG4gICAgLy8gYWRkaXRpb25hbCB0ZXN0aW5nLlxuICAgIHZhciByZXN1bHQgPSBXZWJTb2NrZXQuX19mbGFzaC5zZW5kKHRoaXMuX19pZCwgZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEpKTtcbiAgICBpZiAocmVzdWx0IDwgMCkgeyAvLyBzdWNjZXNzXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idWZmZXJlZEFtb3VudCArPSByZXN1bHQ7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbG9zZSB0aGlzIHdlYiBzb2NrZXQgZ3JhY2VmdWxseS5cbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DTE9TRUQgfHwgdGhpcy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DTE9TSU5HKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgIFdlYlNvY2tldC5fX2ZsYXNoLmNsb3NlKHRoaXMuX19pZCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGF0aW9uIG9mIHtAbGluayA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItRXZlbnRzL2V2ZW50cy5odG1sI0V2ZW50cy1yZWdpc3RyYXRpb25cIj5ET00gMiBFdmVudFRhcmdldCBJbnRlcmZhY2U8L2E+fVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy5fX2V2ZW50cykpIHtcbiAgICAgIHRoaXMuX19ldmVudHNbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy5fX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgfTtcblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1FdmVudHMvZXZlbnRzLmh0bWwjRXZlbnRzLXJlZ2lzdHJhdGlvblwiPkRPTSAyIEV2ZW50VGFyZ2V0IEludGVyZmFjZTwvYT59XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlQ2FwdHVyZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLl9fZXZlbnRzKSkgcmV0dXJuO1xuICAgIHZhciBldmVudHMgPSB0aGlzLl9fZXZlbnRzW3R5cGVdO1xuICAgIGZvciAodmFyIGkgPSBldmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIGlmIChldmVudHNbaV0gPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGV2ZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1FdmVudHMvZXZlbnRzLmh0bWwjRXZlbnRzLXJlZ2lzdHJhdGlvblwiPkRPTSAyIEV2ZW50VGFyZ2V0IEludGVyZmFjZTwvYT59XG4gICAqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fX2V2ZW50c1tldmVudC50eXBlXSB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgZXZlbnRzW2ldKGV2ZW50KTtcbiAgICB9XG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzW1wib25cIiArIGV2ZW50LnR5cGVdO1xuICAgIGlmIChoYW5kbGVyKSBoYW5kbGVyKGV2ZW50KTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBhbiBldmVudCBmcm9tIEZsYXNoLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZmxhc2hFdmVudFxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5fX2hhbmRsZUV2ZW50ID0gZnVuY3Rpb24oZmxhc2hFdmVudCkge1xuICAgIGlmIChcInJlYWR5U3RhdGVcIiBpbiBmbGFzaEV2ZW50KSB7XG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPSBmbGFzaEV2ZW50LnJlYWR5U3RhdGU7XG4gICAgfVxuICAgIGlmIChcInByb3RvY29sXCIgaW4gZmxhc2hFdmVudCkge1xuICAgICAgdGhpcy5wcm90b2NvbCA9IGZsYXNoRXZlbnQucHJvdG9jb2w7XG4gICAgfVxuICAgIFxuICAgIHZhciBqc0V2ZW50O1xuICAgIGlmIChmbGFzaEV2ZW50LnR5cGUgPT0gXCJvcGVuXCIgfHwgZmxhc2hFdmVudC50eXBlID09IFwiZXJyb3JcIikge1xuICAgICAganNFdmVudCA9IHRoaXMuX19jcmVhdGVTaW1wbGVFdmVudChmbGFzaEV2ZW50LnR5cGUpO1xuICAgIH0gZWxzZSBpZiAoZmxhc2hFdmVudC50eXBlID09IFwiY2xvc2VcIikge1xuICAgICAgLy8gVE9ETyBpbXBsZW1lbnQganNFdmVudC53YXNDbGVhblxuICAgICAganNFdmVudCA9IHRoaXMuX19jcmVhdGVTaW1wbGVFdmVudChcImNsb3NlXCIpO1xuICAgIH0gZWxzZSBpZiAoZmxhc2hFdmVudC50eXBlID09IFwibWVzc2FnZVwiKSB7XG4gICAgICB2YXIgZGF0YSA9IGRlY29kZVVSSUNvbXBvbmVudChmbGFzaEV2ZW50Lm1lc3NhZ2UpO1xuICAgICAganNFdmVudCA9IHRoaXMuX19jcmVhdGVNZXNzYWdlRXZlbnQoXCJtZXNzYWdlXCIsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBcInVua25vd24gZXZlbnQgdHlwZTogXCIgKyBmbGFzaEV2ZW50LnR5cGU7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChqc0V2ZW50KTtcbiAgfTtcbiAgXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuX19jcmVhdGVTaW1wbGVFdmVudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQgJiYgd2luZG93LkV2ZW50KSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICAgICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7dHlwZTogdHlwZSwgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlfTtcbiAgICB9XG4gIH07XG4gIFxuICBXZWJTb2NrZXQucHJvdG90eXBlLl9fY3JlYXRlTWVzc2FnZUV2ZW50ID0gZnVuY3Rpb24odHlwZSwgZGF0YSkge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCAmJiB3aW5kb3cuTWVzc2FnZUV2ZW50ICYmICF3aW5kb3cub3BlcmEpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTWVzc2FnZUV2ZW50XCIpO1xuICAgICAgZXZlbnQuaW5pdE1lc3NhZ2VFdmVudChcIm1lc3NhZ2VcIiwgZmFsc2UsIGZhbHNlLCBkYXRhLCBudWxsLCBudWxsLCB3aW5kb3csIG51bGwpO1xuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSBhbmQgT3BlcmEsIHRoZSBsYXR0ZXIgb25lIHRydW5jYXRlcyB0aGUgZGF0YSBwYXJhbWV0ZXIgYWZ0ZXIgYW55IDB4MDAgYnl0ZXMuXG4gICAgICByZXR1cm4ge3R5cGU6IHR5cGUsIGRhdGE6IGRhdGEsIGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZX07XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIERlZmluZSB0aGUgV2ViU29ja2V0IHJlYWR5U3RhdGUgZW51bWVyYXRpb24uXG4gICAqL1xuICBXZWJTb2NrZXQuQ09OTkVDVElORyA9IDA7XG4gIFdlYlNvY2tldC5PUEVOID0gMTtcbiAgV2ViU29ja2V0LkNMT1NJTkcgPSAyO1xuICBXZWJTb2NrZXQuQ0xPU0VEID0gMztcblxuICBXZWJTb2NrZXQuX19mbGFzaCA9IG51bGw7XG4gIFdlYlNvY2tldC5fX2luc3RhbmNlcyA9IHt9O1xuICBXZWJTb2NrZXQuX190YXNrcyA9IFtdO1xuICBXZWJTb2NrZXQuX19uZXh0SWQgPSAwO1xuICBcbiAgLyoqXG4gICAqIExvYWQgYSBuZXcgZmxhc2ggc2VjdXJpdHkgcG9saWN5IGZpbGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIFdlYlNvY2tldC5sb2FkRmxhc2hQb2xpY3lGaWxlID0gZnVuY3Rpb24odXJsKXtcbiAgICBXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uKCkge1xuICAgICAgV2ViU29ja2V0Ll9fZmxhc2gubG9hZE1hbnVhbFBvbGljeUZpbGUodXJsKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogTG9hZHMgV2ViU29ja2V0TWFpbi5zd2YgYW5kIGNyZWF0ZXMgV2ViU29ja2V0TWFpbiBvYmplY3QgaW4gRmxhc2guXG4gICAqL1xuICBXZWJTb2NrZXQuX19pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKFdlYlNvY2tldC5fX2ZsYXNoKSByZXR1cm47XG4gICAgXG4gICAgaWYgKFdlYlNvY2tldC5fX3N3ZkxvY2F0aW9uKSB7XG4gICAgICAvLyBGb3IgYmFja3dvcmQgY29tcGF0aWJpbGl0eS5cbiAgICAgIHdpbmRvdy5XRUJfU09DS0VUX1NXRl9MT0NBVElPTiA9IFdlYlNvY2tldC5fX3N3ZkxvY2F0aW9uO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5XRUJfU09DS0VUX1NXRl9MT0NBVElPTikge1xuICAgICAgY29uc29sZS5lcnJvcihcIltXZWJTb2NrZXRdIHNldCBXRUJfU09DS0VUX1NXRl9MT0NBVElPTiB0byBsb2NhdGlvbiBvZiBXZWJTb2NrZXRNYWluLnN3ZlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmlkID0gXCJ3ZWJTb2NrZXRDb250YWluZXJcIjtcbiAgICAvLyBIaWRlcyBGbGFzaCBib3guIFdlIGNhbm5vdCB1c2UgZGlzcGxheTogbm9uZSBvciB2aXNpYmlsaXR5OiBoaWRkZW4gYmVjYXVzZSBpdCBwcmV2ZW50c1xuICAgIC8vIEZsYXNoIGZyb20gbG9hZGluZyBhdCBsZWFzdCBpbiBJRS4gU28gd2UgbW92ZSBpdCBvdXQgb2YgdGhlIHNjcmVlbiBhdCAoLTEwMCwgLTEwMCkuXG4gICAgLy8gQnV0IHRoaXMgZXZlbiBkb2Vzbid0IHdvcmsgd2l0aCBGbGFzaCBMaXRlIChlLmcuIGluIERyb2lkIEluY3JlZGlibGUpLiBTbyB3aXRoIEZsYXNoXG4gICAgLy8gTGl0ZSwgd2UgcHV0IGl0IGF0ICgwLCAwKS4gVGhpcyBzaG93cyAxeDEgYm94IHZpc2libGUgYXQgbGVmdC10b3AgY29ybmVyIGJ1dCB0aGlzIGlzXG4gICAgLy8gdGhlIGJlc3Qgd2UgY2FuIGRvIGFzIGZhciBhcyB3ZSBrbm93IG5vdy5cbiAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgaWYgKFdlYlNvY2tldC5fX2lzRmxhc2hMaXRlKCkpIHtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBcIjBweFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IFwiLTEwMHB4XCI7XG4gICAgICBjb250YWluZXIuc3R5bGUudG9wID0gXCItMTAwcHhcIjtcbiAgICB9XG4gICAgdmFyIGhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaG9sZGVyLmlkID0gXCJ3ZWJTb2NrZXRGbGFzaFwiO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChob2xkZXIpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAvLyBTZWUgdGhpcyBhcnRpY2xlIGZvciBoYXNQcmlvcml0eTpcbiAgICAvLyBodHRwOi8vaGVscC5hZG9iZS5jb20vZW5fVVMvYXMzL21vYmlsZS9XUzRiZWJjZDY2YTc0Mjc1YzM2Y2ZiODEzNzEyNDMxOGVlYmM2LTdmZmQuaHRtbFxuICAgIHN3Zm9iamVjdC5lbWJlZFNXRihcbiAgICAgIFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OLFxuICAgICAgXCJ3ZWJTb2NrZXRGbGFzaFwiLFxuICAgICAgXCIxXCIgLyogd2lkdGggKi8sXG4gICAgICBcIjFcIiAvKiBoZWlnaHQgKi8sXG4gICAgICBcIjEwLjAuMFwiIC8qIFNXRiB2ZXJzaW9uICovLFxuICAgICAgbnVsbCxcbiAgICAgIG51bGwsXG4gICAgICB7aGFzUHJpb3JpdHk6IHRydWUsIHN3bGl2ZWNvbm5lY3QgOiB0cnVlLCBhbGxvd1NjcmlwdEFjY2VzczogXCJhbHdheXNcIn0sXG4gICAgICBudWxsLFxuICAgICAgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWUuc3VjY2Vzcykge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbV2ViU29ja2V0XSBzd2ZvYmplY3QuZW1iZWRTV0YgZmFpbGVkXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDYWxsZWQgYnkgRmxhc2ggdG8gbm90aWZ5IEpTIHRoYXQgaXQncyBmdWxseSBsb2FkZWQgYW5kIHJlYWR5XG4gICAqIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKi9cbiAgV2ViU29ja2V0Ll9fb25GbGFzaEluaXRpYWxpemVkID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gV2UgbmVlZCB0byBzZXQgYSB0aW1lb3V0IGhlcmUgdG8gYXZvaWQgcm91bmQtdHJpcCBjYWxsc1xuICAgIC8vIHRvIGZsYXNoIGR1cmluZyB0aGUgaW5pdGlhbGl6YXRpb24gcHJvY2Vzcy5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgV2ViU29ja2V0Ll9fZmxhc2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYlNvY2tldEZsYXNoXCIpO1xuICAgICAgV2ViU29ja2V0Ll9fZmxhc2guc2V0Q2FsbGVyVXJsKGxvY2F0aW9uLmhyZWYpO1xuICAgICAgV2ViU29ja2V0Ll9fZmxhc2guc2V0RGVidWcoISF3aW5kb3cuV0VCX1NPQ0tFVF9ERUJVRyk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFdlYlNvY2tldC5fX3Rhc2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIFdlYlNvY2tldC5fX3Rhc2tzW2ldKCk7XG4gICAgICB9XG4gICAgICBXZWJTb2NrZXQuX190YXNrcyA9IFtdO1xuICAgIH0sIDApO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIENhbGxlZCBieSBGbGFzaCB0byBub3RpZnkgV2ViU29ja2V0cyBldmVudHMgYXJlIGZpcmVkLlxuICAgKi9cbiAgV2ViU29ja2V0Ll9fb25GbGFzaEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIEdldHMgZXZlbnRzIHVzaW5nIHJlY2VpdmVFdmVudHMoKSBpbnN0ZWFkIG9mIGdldHRpbmcgaXQgZnJvbSBldmVudCBvYmplY3RcbiAgICAgICAgLy8gb2YgRmxhc2ggZXZlbnQuIFRoaXMgaXMgdG8gbWFrZSBzdXJlIHRvIGtlZXAgbWVzc2FnZSBvcmRlci5cbiAgICAgICAgLy8gSXQgc2VlbXMgc29tZXRpbWVzIEZsYXNoIGV2ZW50cyBkb24ndCBhcnJpdmUgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhleSBhcmUgc2VudC5cbiAgICAgICAgdmFyIGV2ZW50cyA9IFdlYlNvY2tldC5fX2ZsYXNoLnJlY2VpdmVFdmVudHMoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBXZWJTb2NrZXQuX19pbnN0YW5jZXNbZXZlbnRzW2ldLndlYlNvY2tldElkXS5fX2hhbmRsZUV2ZW50KGV2ZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgXG4gIC8vIENhbGxlZCBieSBGbGFzaC5cbiAgV2ViU29ja2V0Ll9fbG9nID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIGNvbnNvbGUubG9nKGRlY29kZVVSSUNvbXBvbmVudChtZXNzYWdlKSk7XG4gIH07XG4gIFxuICAvLyBDYWxsZWQgYnkgRmxhc2guXG4gIFdlYlNvY2tldC5fX2Vycm9yID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZGVjb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpKTtcbiAgfTtcbiAgXG4gIFdlYlNvY2tldC5fX2FkZFRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XG4gICAgaWYgKFdlYlNvY2tldC5fX2ZsYXNoKSB7XG4gICAgICB0YXNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlYlNvY2tldC5fX3Rhc2tzLnB1c2godGFzayk7XG4gICAgfVxuICB9O1xuICBcbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhlIGJyb3dzZXIgaXMgcnVubmluZyBmbGFzaCBsaXRlLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGZsYXNoIGxpdGUgaXMgcnVubmluZywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgV2ViU29ja2V0Ll9faXNGbGFzaExpdGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXdpbmRvdy5uYXZpZ2F0b3IgfHwgIXdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBtaW1lVHlwZSA9IHdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzW1wiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIl07XG4gICAgaWYgKCFtaW1lVHlwZSB8fCAhbWltZVR5cGUuZW5hYmxlZFBsdWdpbiB8fCAhbWltZVR5cGUuZW5hYmxlZFBsdWdpbi5maWxlbmFtZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gbWltZVR5cGUuZW5hYmxlZFBsdWdpbi5maWxlbmFtZS5tYXRjaCgvZmxhc2hsaXRlL2kpID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICBcbiAgaWYgKCF3aW5kb3cuV0VCX1NPQ0tFVF9ESVNBQkxFX0FVVE9fSU5JVElBTElaQVRJT04pIHtcbiAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBXZWJTb2NrZXQuX19pbml0aWFsaXplKCk7XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9ubG9hZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBXZWJTb2NrZXQuX19pbml0aWFsaXplKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgXG59KSgpO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZXhwb3J0cy5YSFIgPSBYSFI7XG5cbiAgLyoqXG4gICAqIFhIUiBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAY29zdHJ1Y3RvclxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBYSFIgKHNvY2tldCkge1xuICAgIGlmICghc29ja2V0KSByZXR1cm47XG5cbiAgICBpby5UcmFuc3BvcnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChYSFIsIGlvLlRyYW5zcG9ydCk7XG5cbiAgLyoqXG4gICAqIEVzdGFibGlzaCBhIGNvbm5lY3Rpb25cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgdGhpcy5vbk9wZW4oKTtcbiAgICB0aGlzLmdldCgpO1xuXG4gICAgLy8gd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhlIHJlcXVlc3Qgc3VjY2VlZHMgc2luY2Ugd2UgaGF2ZSBubyBpbmRpY2F0aW9uXG4gICAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBvcGVuZWQgb3Igbm90IHVudGlsIGl0IHN1Y2NlZWRlZC5cbiAgICB0aGlzLnNldENsb3NlVGltZW91dCgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHdlIG5lZWQgdG8gc2VuZCBkYXRhIHRvIHRoZSBTb2NrZXQuSU8gc2VydmVyLCBpZiB3ZSBoYXZlIGRhdGEgaW4gb3VyXG4gICAqIGJ1ZmZlciB3ZSBlbmNvZGUgaXQgYW5kIGZvcndhcmQgaXQgdG8gdGhlIGBwb3N0YCBtZXRob2QuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFIucHJvdG90eXBlLnBheWxvYWQgPSBmdW5jdGlvbiAocGF5bG9hZCkge1xuICAgIHZhciBtc2dzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHBheWxvYWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBtc2dzLnB1c2goaW8ucGFyc2VyLmVuY29kZVBhY2tldChwYXlsb2FkW2ldKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZW5kKGlvLnBhcnNlci5lbmNvZGVQYXlsb2FkKG1zZ3MpKTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZCBkYXRhIHRvIHRoZSBTb2NrZXQuSU8gc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0gZGF0YSBUaGUgbWVzc2FnZVxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFIucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHRoaXMucG9zdChkYXRhKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUG9zdHMgYSBlbmNvZGVkIG1lc3NhZ2UgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIEEgZW5jb2RlZCBtZXNzYWdlLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gZW1wdHkgKCkgeyB9O1xuXG4gIFhIUi5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuc29ja2V0LnNldEJ1ZmZlcih0cnVlKTtcblxuICAgIGZ1bmN0aW9uIHN0YXRlQ2hhbmdlICgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICB0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBzZWxmLnBvc3RpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICBzZWxmLnNvY2tldC5zZXRCdWZmZXIoZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25sb2FkICgpIHtcbiAgICAgIHRoaXMub25sb2FkID0gZW1wdHk7XG4gICAgICBzZWxmLnNvY2tldC5zZXRCdWZmZXIoZmFsc2UpO1xuICAgIH07XG5cbiAgICB0aGlzLnNlbmRYSFIgPSB0aGlzLnJlcXVlc3QoJ1BPU1QnKTtcblxuICAgIGlmIChnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgdGhpcy5zZW5kWEhSIGluc3RhbmNlb2YgWERvbWFpblJlcXVlc3QpIHtcbiAgICAgIHRoaXMuc2VuZFhIUi5vbmxvYWQgPSB0aGlzLnNlbmRYSFIub25lcnJvciA9IG9ubG9hZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kWEhSLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHN0YXRlQ2hhbmdlO1xuICAgIH1cblxuICAgIHRoaXMuc2VuZFhIUi5zZW5kKGRhdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgZXN0YWJsaXNoZWQgYFhIUmAgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgY29uZmlndXJlZCBYSFIgcmVxdWVzdFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSB1cmwgdGhhdCBuZWVkcyB0byBiZSByZXF1ZXN0ZWQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgVGhlIG1ldGhvZCB0aGUgcmVxdWVzdCBzaG91bGQgdXNlLlxuICAgKiBAcmV0dXJucyB7WE1MSHR0cFJlcXVlc3R9XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFIucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgdmFyIHJlcSA9IGlvLnV0aWwucmVxdWVzdCh0aGlzLnNvY2tldC5pc1hEb21haW4oKSlcbiAgICAgICwgcXVlcnkgPSBpby51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnksICd0PScgKyArbmV3IERhdGUpO1xuXG4gICAgcmVxLm9wZW4obWV0aG9kIHx8ICdHRVQnLCB0aGlzLnByZXBhcmVVcmwoKSArIHF1ZXJ5LCB0cnVlKTtcblxuICAgIGlmIChtZXRob2QgPT0gJ1BPU1QnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAocmVxLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFhEb21haW5SZXF1ZXN0XG4gICAgICAgICAgcmVxLmNvbnRlbnRUeXBlID0gJ3RleHQvcGxhaW4nO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cblxuICAgIHJldHVybiByZXE7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNjaGVtZSB0byB1c2UgZm9yIHRoZSB0cmFuc3BvcnQgVVJMcy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUuc2NoZW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5vcHRpb25zLnNlY3VyZSA/ICdodHRwcycgOiAnaHR0cCc7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBYSFIgdHJhbnNwb3J0cyBhcmUgc3VwcG9ydGVkXG4gICAqXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0geGRvbWFpbiBDaGVjayBpZiB3ZSBzdXBwb3J0IGNyb3NzIGRvbWFpbiByZXF1ZXN0cy5cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUi5jaGVjayA9IGZ1bmN0aW9uIChzb2NrZXQsIHhkb21haW4pIHtcbiAgICB0cnkge1xuICAgICAgdmFyIHJlcXVlc3QgPSBpby51dGlsLnJlcXVlc3QoeGRvbWFpbiksXG4gICAgICAgICAgdXNlc1hEb21SZXEgPSAoZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmIHJlcXVlc3QgaW5zdGFuY2VvZiBYRG9tYWluUmVxdWVzdCksXG4gICAgICAgICAgc29ja2V0UHJvdG9jb2wgPSAoc29ja2V0ICYmIHNvY2tldC5vcHRpb25zICYmIHNvY2tldC5vcHRpb25zLnNlY3VyZSA/ICdodHRwczonIDogJ2h0dHA6JyksXG4gICAgICAgICAgaXNYUHJvdG9jb2wgPSAoZ2xvYmFsLmxvY2F0aW9uICYmIHNvY2tldFByb3RvY29sICE9IGdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbCk7XG4gICAgICBpZiAocmVxdWVzdCAmJiAhKHVzZXNYRG9tUmVxICYmIGlzWFByb3RvY29sKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGUpIHt9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBYSFIgdHJhbnNwb3J0IHN1cHBvcnRzIGNyb3NzIGRvbWFpbiByZXF1ZXN0cy5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUi54ZG9tYWluQ2hlY2sgPSBmdW5jdGlvbiAoc29ja2V0KSB7XG4gICAgcmV0dXJuIFhIUi5jaGVjayhzb2NrZXQsIHRydWUpO1xuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4gICwgdGhpc1xuKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5odG1sZmlsZSA9IEhUTUxGaWxlO1xuXG4gIC8qKlxuICAgKiBUaGUgSFRNTEZpbGUgdHJhbnNwb3J0IGNyZWF0ZXMgYSBgZm9yZXZlciBpZnJhbWVgIGJhc2VkIHRyYW5zcG9ydFxuICAgKiBmb3IgSW50ZXJuZXQgRXhwbG9yZXIuIFJlZ3VsYXIgZm9yZXZlciBpZnJhbWUgaW1wbGVtZW50YXRpb25zIHdpbGwgXG4gICAqIGNvbnRpbnVvdXNseSB0cmlnZ2VyIHRoZSBicm93c2VycyBidXp5IGluZGljYXRvcnMuIElmIHRoZSBmb3JldmVyIGlmcmFtZVxuICAgKiBpcyBjcmVhdGVkIGluc2lkZSBhIGBodG1sZmlsZWAgdGhlc2UgaW5kaWNhdG9ycyB3aWxsIG5vdCBiZSB0cmlnZ2VkLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGV4dGVuZHMge2lvLlRyYW5zcG9ydC5YSFJ9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEhUTUxGaWxlIChzb2NrZXQpIHtcbiAgICBpby5UcmFuc3BvcnQuWEhSLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaGVyaXRzIGZyb20gWEhSIHRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KEhUTUxGaWxlLCBpby5UcmFuc3BvcnQuWEhSKTtcblxuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWVcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSFRNTEZpbGUucHJvdG90eXBlLm5hbWUgPSAnaHRtbGZpbGUnO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEFjLi4uZVggYGh0bWxmaWxlYCB3aXRoIGEgZm9yZXZlciBsb2FkaW5nIGlmcmFtZVxuICAgKiB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpc3RlbiB0byBtZXNzYWdlcy4gSW5zaWRlIHRoZSBnZW5lcmF0ZWRcbiAgICogYGh0bWxmaWxlYCBhIHJlZmVyZW5jZSB3aWxsIGJlIG1hZGUgdG8gdGhlIEhUTUxGaWxlIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEhUTUxGaWxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5kb2MgPSBuZXcgd2luZG93WyhbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpKV0oJ2h0bWxmaWxlJyk7XG4gICAgdGhpcy5kb2Mub3BlbigpO1xuICAgIHRoaXMuZG9jLndyaXRlKCc8aHRtbD48L2h0bWw+Jyk7XG4gICAgdGhpcy5kb2MuY2xvc2UoKTtcbiAgICB0aGlzLmRvYy5wYXJlbnRXaW5kb3cucyA9IHRoaXM7XG5cbiAgICB2YXIgaWZyYW1lQyA9IHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGlmcmFtZUMuY2xhc3NOYW1lID0gJ3NvY2tldGlvJztcblxuICAgIHRoaXMuZG9jLmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lQyk7XG4gICAgdGhpcy5pZnJhbWUgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcblxuICAgIGlmcmFtZUMuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIHF1ZXJ5ID0gaW8udXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5LCAndD0nKyArbmV3IERhdGUpO1xuXG4gICAgdGhpcy5pZnJhbWUuc3JjID0gdGhpcy5wcmVwYXJlVXJsKCkgKyBxdWVyeTtcblxuICAgIGlvLnV0aWwub24od2luZG93LCAndW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5kZXN0cm95KCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBTb2NrZXQuSU8gc2VydmVyIHdpbGwgd3JpdGUgc2NyaXB0IHRhZ3MgaW5zaWRlIHRoZSBmb3JldmVyXG4gICAqIGlmcmFtZSwgdGhpcyBmdW5jdGlvbiB3aWxsIGJlIHVzZWQgYXMgY2FsbGJhY2sgZm9yIHRoZSBpbmNvbWluZ1xuICAgKiBpbmZvcm1hdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgVGhlIG1lc3NhZ2VcbiAgICogQHBhcmFtIHtkb2N1bWVudH0gZG9jIFJlZmVyZW5jZSB0byB0aGUgY29udGV4dFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSFRNTEZpbGUucHJvdG90eXBlLl8gPSBmdW5jdGlvbiAoZGF0YSwgZG9jKSB7XG4gICAgLy8gdW5lc2NhcGUgYWxsIGZvcndhcmQgc2xhc2hlcy4gc2VlIEdILTEyNTFcbiAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9cXFxcXFwvL2csICcvJyk7XG4gICAgdGhpcy5vbkRhdGEoZGF0YSk7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBzY3JpcHQgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cbiAgfTtcblxuICAvKipcbiAgICogRGVzdHJveSB0aGUgZXN0YWJsaXNoZWQgY29ubmVjdGlvbiwgaWZyYW1lIGFuZCBgaHRtbGZpbGVgLlxuICAgKiBBbmQgY2FsbHMgdGhlIGBDb2xsZWN0R2FyYmFnZWAgZnVuY3Rpb24gb2YgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICogdG8gcmVsZWFzZSB0aGUgbWVtb3J5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSFRNTEZpbGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaWZyYW1lKXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICB9IGNhdGNoKGUpe31cblxuICAgICAgdGhpcy5kb2MgPSBudWxsO1xuICAgICAgdGhpcy5pZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmlmcmFtZSk7XG4gICAgICB0aGlzLmlmcmFtZSA9IG51bGw7XG5cbiAgICAgIENvbGxlY3RHYXJiYWdlKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgZXN0YWJsaXNoZWQgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH0gQ2hhaW5pbmcuXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEhUTUxGaWxlLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICByZXR1cm4gaW8uVHJhbnNwb3J0LlhIUi5wcm90b3R5cGUuY2xvc2UuY2FsbCh0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoaXMgdHJhbnNwb3J0LiBUaGUgYnJvd3NlclxuICAgKiBtdXN0IGhhdmUgYW4gYEFjLi4uZVhPYmplY3RgIGltcGxlbWVudGF0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBIVE1MRmlsZS5jaGVjayA9IGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPSBcInVuZGVmaW5lZFwiICYmIChbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpKSBpbiB3aW5kb3cpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGEgPSBuZXcgd2luZG93WyhbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpKV0oJ2h0bWxmaWxlJyk7XG4gICAgICAgIHJldHVybiBhICYmIGlvLlRyYW5zcG9ydC5YSFIuY2hlY2soc29ja2V0KTtcbiAgICAgIH0gY2F0Y2goZSl7fVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGNyb3NzIGRvbWFpbiByZXF1ZXN0cyBhcmUgc3VwcG9ydGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSFRNTEZpbGUueGRvbWFpbkNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIHdlIGNhbiBwcm9iYWJseSBkbyBoYW5kbGluZyBmb3Igc3ViLWRvbWFpbnMsIHdlIHNob3VsZFxuICAgIC8vIHRlc3QgdGhhdCBpdCdzIGNyb3NzIGRvbWFpbiBidXQgYSBzdWJkb21haW4gaGVyZVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgnaHRtbGZpbGUnKTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8sIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHNbJ3hoci1wb2xsaW5nJ10gPSBYSFJQb2xsaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgWEhSLXBvbGxpbmcgdHJhbnNwb3J0IHVzZXMgbG9uZyBwb2xsaW5nIFhIUiByZXF1ZXN0cyB0byBjcmVhdGUgYVxuICAgKiBcInBlcnNpc3RlbnRcIiBjb25uZWN0aW9uIHdpdGggdGhlIHNlcnZlci5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFhIUlBvbGxpbmcgKCkge1xuICAgIGlvLlRyYW5zcG9ydC5YSFIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBYSFIgdHJhbnNwb3J0LlxuICAgKi9cblxuICBpby51dGlsLmluaGVyaXQoWEhSUG9sbGluZywgaW8uVHJhbnNwb3J0LlhIUik7XG5cbiAgLyoqXG4gICAqIE1lcmdlIHRoZSBwcm9wZXJ0aWVzIGZyb20gWEhSIHRyYW5zcG9ydFxuICAgKi9cblxuICBpby51dGlsLm1lcmdlKFhIUlBvbGxpbmcsIGlvLlRyYW5zcG9ydC5YSFIpO1xuXG4gIC8qKlxuICAgKiBUcmFuc3BvcnQgbmFtZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5uYW1lID0gJ3hoci1wb2xsaW5nJztcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgaGVhcnRiZWF0cyBpcyBlbmFibGVkIGZvciB0aGlzIHRyYW5zcG9ydFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUuaGVhcnRiZWF0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLyoqIFxuICAgKiBFc3RhYmxpc2ggYSBjb25uZWN0aW9uLCBmb3IgaVBob25lIGFuZCBBbmRyb2lkIHRoaXMgd2lsbCBiZSBkb25lIG9uY2UgdGhlIHBhZ2VcbiAgICogaXMgbG9hZGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fSBDaGFpbmluZy5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpby5UcmFuc3BvcnQuWEhSLnByb3RvdHlwZS5vcGVuLmNhbGwoc2VsZik7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTdGFydHMgYSBYSFIgcmVxdWVzdCB0byB3YWl0IGZvciBpbmNvbWluZyBtZXNzYWdlcy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVtcHR5ICgpIHt9O1xuXG4gIFhIUlBvbGxpbmcucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuaXNPcGVuKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzdGF0ZUNoYW5nZSAoKSB7XG4gICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcblxuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgc2VsZi5vbkRhdGEodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIHNlbGYuZ2V0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkICgpIHtcbiAgICAgIHRoaXMub25sb2FkID0gZW1wdHk7XG4gICAgICB0aGlzLm9uZXJyb3IgPSBlbXB0eTtcbiAgICAgIHNlbGYucmV0cnlDb3VudGVyID0gMTtcbiAgICAgIHNlbGYub25EYXRhKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgIHNlbGYuZ2V0KCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG9uZXJyb3IgKCkge1xuICAgICAgc2VsZi5yZXRyeUNvdW50ZXIgKys7XG4gICAgICBpZighc2VsZi5yZXRyeUNvdW50ZXIgfHwgc2VsZi5yZXRyeUNvdW50ZXIgPiAzKSB7XG4gICAgICAgIHNlbGYub25DbG9zZSgpOyAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmdldCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnhociA9IHRoaXMucmVxdWVzdCgpO1xuXG4gICAgaWYgKGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiB0aGlzLnhociBpbnN0YW5jZW9mIFhEb21haW5SZXF1ZXN0KSB7XG4gICAgICB0aGlzLnhoci5vbmxvYWQgPSBvbmxvYWQ7XG4gICAgICB0aGlzLnhoci5vbmVycm9yID0gb25lcnJvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gc3RhdGVDaGFuZ2U7XG4gICAgfVxuXG4gICAgdGhpcy54aHIuc2VuZChudWxsKTtcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlIHRoZSB1bmNsZWFuIGNsb3NlIGJlaGF2aW9yLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpby5UcmFuc3BvcnQuWEhSLnByb3RvdHlwZS5vbkNsb3NlLmNhbGwodGhpcyk7XG5cbiAgICBpZiAodGhpcy54aHIpIHtcbiAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHRoaXMueGhyLm9ubG9hZCA9IHRoaXMueGhyLm9uZXJyb3IgPSBlbXB0eTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICB9IGNhdGNoKGUpe31cbiAgICAgIHRoaXMueGhyID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFdlYmtpdCBiYXNlZCBicm93c2VycyBzaG93IGEgaW5maW5pdCBzcGlubmVyIHdoZW4geW91IHN0YXJ0IGEgWEhSIHJlcXVlc3RcbiAgICogYmVmb3JlIHRoZSBicm93c2VycyBvbmxvYWQgZXZlbnQgaXMgY2FsbGVkIHNvIHdlIG5lZWQgdG8gZGVmZXIgb3BlbmluZyBvZlxuICAgKiB0aGUgdHJhbnNwb3J0IHVudGlsIHRoZSBvbmxvYWQgZXZlbnQgaXMgY2FsbGVkLiBXcmFwcGluZyB0aGUgY2IgaW4gb3VyXG4gICAqIGRlZmVyIG1ldGhvZCBzb2x2ZSB0aGlzLlxuICAgKlxuICAgKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2UgdGhhdCBuZWVkcyBhIHRyYW5zcG9ydFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2tcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUlBvbGxpbmcucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKHNvY2tldCwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpby51dGlsLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZuLmNhbGwoc2VsZik7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgdHJhbnNwb3J0IHRvIHlvdXIgcHVibGljIGlvLnRyYW5zcG9ydHMgYXJyYXkuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBpby50cmFuc3BvcnRzLnB1c2goJ3hoci1wb2xsaW5nJyk7XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbiAgLCB0aGlzXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XG4gIC8qKlxuICAgKiBUaGVyZSBpcyBhIHdheSB0byBoaWRlIHRoZSBsb2FkaW5nIGluZGljYXRvciBpbiBGaXJlZm94LiBJZiB5b3UgY3JlYXRlIGFuZFxuICAgKiByZW1vdmUgYSBpZnJhbWUgaXQgd2lsbCBzdG9wIHNob3dpbmcgdGhlIGN1cnJlbnQgbG9hZGluZyBpbmRpY2F0b3IuXG4gICAqIFVuZm9ydHVuYXRlbHkgd2UgY2FuJ3QgZmVhdHVyZSBkZXRlY3QgdGhhdCBhbmQgVUEgc25pZmZpbmcgaXMgZXZpbC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHZhciBpbmRpY2F0b3IgPSBnbG9iYWwuZG9jdW1lbnQgJiYgXCJNb3pBcHBlYXJhbmNlXCIgaW5cbiAgICBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHNbJ2pzb25wLXBvbGxpbmcnXSA9IEpTT05QUG9sbGluZztcblxuICAvKipcbiAgICogVGhlIEpTT05QIHRyYW5zcG9ydCBjcmVhdGVzIGFuIHBlcnNpc3RlbnQgY29ubmVjdGlvbiBieSBkeW5hbWljYWxseVxuICAgKiBpbnNlcnRpbmcgYSBzY3JpcHQgdGFnIGluIHRoZSBwYWdlLiBUaGlzIHNjcmlwdCB0YWcgd2lsbCByZWNlaXZlIHRoZVxuICAgKiBpbmZvcm1hdGlvbiBvZiB0aGUgU29ja2V0LklPIHNlcnZlci4gV2hlbiBuZXcgaW5mb3JtYXRpb24gaXMgcmVjZWl2ZWRcbiAgICogaXQgY3JlYXRlcyBhIG5ldyBzY3JpcHQgdGFnIGZvciB0aGUgbmV3IGRhdGEgc3RyZWFtLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGV4dGVuZHMge2lvLlRyYW5zcG9ydC54aHItcG9sbGluZ31cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gSlNPTlBQb2xsaW5nIChzb2NrZXQpIHtcbiAgICBpby5UcmFuc3BvcnRbJ3hoci1wb2xsaW5nJ10uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHRoaXMuaW5kZXggPSBpby5qLmxlbmd0aDtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlvLmoucHVzaChmdW5jdGlvbiAobXNnKSB7XG4gICAgICBzZWxmLl8obXNnKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBYSFIgcG9sbGluZyB0cmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChKU09OUFBvbGxpbmcsIGlvLlRyYW5zcG9ydFsneGhyLXBvbGxpbmcnXSk7XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBuYW1lXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5wcm90b3R5cGUubmFtZSA9ICdqc29ucC1wb2xsaW5nJztcblxuICAvKipcbiAgICogUG9zdHMgYSBlbmNvZGVkIG1lc3NhZ2UgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIgdXNpbmcgYW4gaWZyYW1lLlxuICAgKiBUaGUgaWZyYW1lIGlzIHVzZWQgYmVjYXVzZSBzY3JpcHQgdGFncyBjYW4gY3JlYXRlIFBPU1QgYmFzZWQgcmVxdWVzdHMuXG4gICAqIFRoZSBpZnJhbWUgaXMgcG9zaXRpb25lZCBvdXRzaWRlIG9mIHRoZSB2aWV3IHNvIHRoZSB1c2VyIGRvZXMgbm90XG4gICAqIG5vdGljZSBpdCdzIGV4aXN0ZW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgQSBlbmNvZGVkIG1lc3NhZ2UuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBKU09OUFBvbGxpbmcucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBxdWVyeSA9IGlvLnV0aWwucXVlcnkoXG4gICAgICAgICAgICAgdGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeVxuICAgICAgICAgICwgJ3Q9JysgKCtuZXcgRGF0ZSkgKyAnJmk9JyArIHRoaXMuaW5kZXhcbiAgICAgICAgKTtcblxuICAgIGlmICghdGhpcy5mb3JtKSB7XG4gICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKVxuICAgICAgICAsIGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpXG4gICAgICAgICwgaWQgPSB0aGlzLmlmcmFtZUlkID0gJ3NvY2tldGlvX2lmcmFtZV8nICsgdGhpcy5pbmRleFxuICAgICAgICAsIGlmcmFtZTtcblxuICAgICAgZm9ybS5jbGFzc05hbWUgPSAnc29ja2V0aW8nO1xuICAgICAgZm9ybS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBmb3JtLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgZm9ybS5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBmb3JtLnRhcmdldCA9IGlkO1xuICAgICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCAndXRmLTgnKTtcbiAgICAgIGFyZWEubmFtZSA9ICdkJztcbiAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoYXJlYSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICAgICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICB9XG5cbiAgICB0aGlzLmZvcm0uYWN0aW9uID0gdGhpcy5wcmVwYXJlVXJsKCkgKyBxdWVyeTtcblxuICAgIGZ1bmN0aW9uIGNvbXBsZXRlICgpIHtcbiAgICAgIGluaXRJZnJhbWUoKTtcbiAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGluaXRJZnJhbWUgKCkge1xuICAgICAgaWYgKHNlbGYuaWZyYW1lKSB7XG4gICAgICAgIHNlbGYuZm9ybS5yZW1vdmVDaGlsZChzZWxmLmlmcmFtZSk7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8aWZyYW1lIG5hbWU9XCInKyBzZWxmLmlmcmFtZUlkICsnXCI+Jyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBpZnJhbWUubmFtZSA9IHNlbGYuaWZyYW1lSWQ7XG4gICAgICB9XG5cbiAgICAgIGlmcmFtZS5pZCA9IHNlbGYuaWZyYW1lSWQ7XG5cbiAgICAgIHNlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgc2VsZi5pZnJhbWUgPSBpZnJhbWU7XG4gICAgfTtcblxuICAgIGluaXRJZnJhbWUoKTtcblxuICAgIC8vIHdlIHRlbXBvcmFyaWx5IHN0cmluZ2lmeSB1bnRpbCB3ZSBmaWd1cmUgb3V0IGhvdyB0byBwcmV2ZW50XG4gICAgLy8gYnJvd3NlcnMgZnJvbSB0dXJuaW5nIGBcXG5gIGludG8gYFxcclxcbmAgaW4gZm9ybSBpbnB1dHNcbiAgICB0aGlzLmFyZWEudmFsdWUgPSBpby5KU09OLnN0cmluZ2lmeShkYXRhKTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgfSBjYXRjaChlKSB7fVxuXG4gICAgaWYgKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgICBpZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2VsZi5pZnJhbWUucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pZnJhbWUub25sb2FkID0gY29tcGxldGU7XG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQuc2V0QnVmZmVyKHRydWUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEpTT05QIHBvbGwgdGhhdCBjYW4gYmUgdXNlZCB0byBsaXN0ZW5cbiAgICogZm9yIG1lc3NhZ2VzIGZyb20gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBKU09OUFBvbGxpbmcucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcbiAgICAgICwgcXVlcnkgPSBpby51dGlsLnF1ZXJ5KFxuICAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnlcbiAgICAgICAgICAsICd0PScrICgrbmV3IERhdGUpICsgJyZpPScgKyB0aGlzLmluZGV4XG4gICAgICAgICk7XG5cbiAgICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICAgIH1cblxuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgc2NyaXB0LnNyYyA9IHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnk7XG4gICAgc2NyaXB0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICB9O1xuXG4gICAgdmFyIGluc2VydEF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGluc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaW5zZXJ0QXQpO1xuICAgIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuXG4gICAgaWYgKGluZGljYXRvcikge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRoZSBpbmNvbWluZyBtZXNzYWdlIHN0cmVhbSBmcm9tIHRoZSBTb2NrZXQuSU8gc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBUaGUgbWVzc2FnZVxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5fID0gZnVuY3Rpb24gKG1zZykge1xuICAgIHRoaXMub25EYXRhKG1zZyk7XG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICB0aGlzLmdldCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogVGhlIGluZGljYXRvciBoYWNrIG9ubHkgd29ya3MgYWZ0ZXIgb25sb2FkXG4gICAqXG4gICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgVGhlIHNvY2tldCBpbnN0YW5jZSB0aGF0IG5lZWRzIGEgdHJhbnNwb3J0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFja1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIChzb2NrZXQsIGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICghaW5kaWNhdG9yKSByZXR1cm4gZm4uY2FsbCh0aGlzKTtcblxuICAgIGlvLnV0aWwubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICBmbi5jYWxsKHNlbGYpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYnJvd3NlciBzdXBwb3J0cyB0aGlzIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnZG9jdW1lbnQnIGluIGdsb2JhbDtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgY3Jvc3MgZG9tYWluIHJlcXVlc3RzIGFyZSBzdXBwb3J0ZWRcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy54ZG9tYWluQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgdHJhbnNwb3J0IHRvIHlvdXIgcHVibGljIGlvLnRyYW5zcG9ydHMgYXJyYXkuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBpby50cmFuc3BvcnRzLnB1c2goJ2pzb25wLXBvbGxpbmcnKTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG5cbmlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGlvOyB9KTtcbn1cbn0pKCk7IiwidmFyIFdpbGRFbWl0dGVyID0gcmVxdWlyZSgnd2lsZGVtaXR0ZXInKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5mdW5jdGlvbiBTZW5kZXIob3B0cykge1xuICAgIFdpbGRFbWl0dGVyLmNhbGwodGhpcyk7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICBjaHVua3NpemU6IDE2Mzg0LFxuICAgICAgICBwYWNpbmc6IDBcbiAgICB9O1xuICAgIC8vIHNldCBvdXIgY29uZmlnIGZyb20gb3B0aW9uc1xuICAgIHZhciBpdGVtO1xuICAgIGZvciAoaXRlbSBpbiBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2l0ZW1dID0gb3B0aW9uc1tpdGVtXTtcbiAgICB9XG5cbiAgICB0aGlzLmZpbGUgPSBudWxsO1xuICAgIHRoaXMuY2hhbm5lbCA9IG51bGw7XG59XG51dGlsLmluaGVyaXRzKFNlbmRlciwgV2lsZEVtaXR0ZXIpO1xuXG5TZW5kZXIucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZmlsZSwgY2hhbm5lbCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmZpbGUgPSBmaWxlO1xuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgdmFyIHNsaWNlRmlsZSA9IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICAgICB2YXIgcmVhZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuY2hhbm5lbC5zZW5kKGUudGFyZ2V0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIG9mZnNldCwgZmlsZS5zaXplLCBlLnRhcmdldC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlLnNpemUgPiBvZmZzZXQgKyBlLnRhcmdldC5yZXN1bHQuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChzbGljZUZpbGUsIHNlbGYuY29uZmlnLnBhY2luZywgb2Zmc2V0ICsgc2VsZi5jb25maWcuY2h1bmtzaXplKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgZmlsZS5zaXplLCBmaWxlLnNpemUsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3NlbnRGaWxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkoZmlsZSk7XG4gICAgICAgIHZhciBzbGljZSA9IGZpbGUuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBzZWxmLmNvbmZpZy5jaHVua3NpemUpO1xuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoc2xpY2UpO1xuICAgIH07XG4gICAgd2luZG93LnNldFRpbWVvdXQoc2xpY2VGaWxlLCAwLCAwKTtcbn07XG5cbmZ1bmN0aW9uIFJlY2VpdmVyKCkge1xuICAgIFdpbGRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICB0aGlzLnJlY2VpdmVkID0gMDtcbiAgICB0aGlzLm1ldGFkYXRhID0ge307XG4gICAgdGhpcy5jaGFubmVsID0gbnVsbDtcbn1cbnV0aWwuaW5oZXJpdHMoUmVjZWl2ZXIsIFdpbGRFbWl0dGVyKTtcblxuUmVjZWl2ZXIucHJvdG90eXBlLnJlY2VpdmUgPSBmdW5jdGlvbiAobWV0YWRhdGEsIGNoYW5uZWwpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAobWV0YWRhdGEpIHtcbiAgICAgICAgdGhpcy5tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgIH1cbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsO1xuICAgIC8vIGNocm9tZSBvbmx5IHN1cHBvcnRzIGFycmF5YnVmZmVycyBhbmQgdGhvc2UgbWFrZSBpdCBlYXNpZXIgdG8gY2FsYyB0aGUgaGFzaFxuICAgIGNoYW5uZWwuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgdGhpcy5jaGFubmVsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgbGVuID0gZXZlbnQuZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICBzZWxmLnJlY2VpdmVkICs9IGxlbjtcbiAgICAgICAgc2VsZi5yZWNlaXZlQnVmZmVyLnB1c2goZXZlbnQuZGF0YSk7XG5cbiAgICAgICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIHNlbGYucmVjZWl2ZWQsIHNlbGYubWV0YWRhdGEuc2l6ZSwgZXZlbnQuZGF0YSk7XG4gICAgICAgIGlmIChzZWxmLnJlY2VpdmVkID09PSBzZWxmLm1ldGFkYXRhLnNpemUpIHtcbiAgICAgICAgICAgIHNlbGYuZW1pdCgncmVjZWl2ZWRGaWxlJywgbmV3IHdpbmRvdy5CbG9iKHNlbGYucmVjZWl2ZUJ1ZmZlciksIHNlbGYubWV0YWRhdGEpO1xuICAgICAgICAgICAgc2VsZi5yZWNlaXZlQnVmZmVyID0gW107IC8vIGRpc2NhcmQgcmVjZWl2ZWJ1ZmZlclxuICAgICAgICB9IGVsc2UgaWYgKHNlbGYucmVjZWl2ZWQgPiBzZWxmLm1ldGFkYXRhLnNpemUpIHtcbiAgICAgICAgICAgIC8vIEZJWE1FXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdyZWNlaXZlZCBtb3JlIHRoYW4gZXhwZWN0ZWQsIGRpc2NhcmRpbmcuLi4nKTtcbiAgICAgICAgICAgIHNlbGYucmVjZWl2ZUJ1ZmZlciA9IFtdOyAvLyBqdXN0IGRpc2NhcmQuLi5cblxuICAgICAgICB9XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge307XG5tb2R1bGUuZXhwb3J0cy5zdXBwb3J0ID0gd2luZG93ICYmIHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5CbG9iO1xubW9kdWxlLmV4cG9ydHMuU2VuZGVyID0gU2VuZGVyO1xubW9kdWxlLmV4cG9ydHMuUmVjZWl2ZXIgPSBSZWNlaXZlcjtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIGhhcmsgPSByZXF1aXJlKCdoYXJrJyk7XG52YXIgd2VicnRjID0gcmVxdWlyZSgnd2VicnRjc3VwcG9ydCcpO1xudmFyIGdldFVzZXJNZWRpYSA9IHJlcXVpcmUoJ2dldHVzZXJtZWRpYScpO1xudmFyIGdldFNjcmVlbk1lZGlhID0gcmVxdWlyZSgnZ2V0c2NyZWVubWVkaWEnKTtcbnZhciBXaWxkRW1pdHRlciA9IHJlcXVpcmUoJ3dpbGRlbWl0dGVyJyk7XG52YXIgR2FpbkNvbnRyb2xsZXIgPSByZXF1aXJlKCdtZWRpYXN0cmVhbS1nYWluJyk7XG52YXIgbW9ja2NvbnNvbGUgPSByZXF1aXJlKCdtb2NrY29uc29sZScpO1xuXG5cbmZ1bmN0aW9uIExvY2FsTWVkaWEob3B0cykge1xuICAgIFdpbGRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWcgPSB7XG4gICAgICAgIGF1dG9BZGp1c3RNaWM6IGZhbHNlLFxuICAgICAgICBkZXRlY3RTcGVha2luZ0V2ZW50czogdHJ1ZSxcbiAgICAgICAgbWVkaWE6IHtcbiAgICAgICAgICAgIGF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgdmlkZW86IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgbG9nZ2VyOiBtb2NrY29uc29sZVxuICAgIH07XG5cbiAgICB2YXIgaXRlbTtcbiAgICBmb3IgKGl0ZW0gaW4gb3B0cykge1xuICAgICAgICB0aGlzLmNvbmZpZ1tpdGVtXSA9IG9wdHNbaXRlbV07XG4gICAgfVxuXG4gICAgdGhpcy5sb2dnZXIgPSBjb25maWcubG9nZ2VyO1xuICAgIHRoaXMuX2xvZyA9IHRoaXMubG9nZ2VyLmxvZy5iaW5kKHRoaXMubG9nZ2VyLCAnTG9jYWxNZWRpYTonKTtcbiAgICB0aGlzLl9sb2dlcnJvciA9IHRoaXMubG9nZ2VyLmVycm9yLmJpbmQodGhpcy5sb2dnZXIsICdMb2NhbE1lZGlhOicpO1xuXG4gICAgdGhpcy5zY3JlZW5TaGFyaW5nU3VwcG9ydCA9IHdlYnJ0Yy5zY3JlZW5TaGFyaW5nO1xuXG4gICAgdGhpcy5sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICB0aGlzLmxvY2FsU2NyZWVucyA9IFtdO1xuXG4gICAgaWYgKCF3ZWJydGMuc3VwcG9ydCkge1xuICAgICAgICB0aGlzLl9sb2dlcnJvcignWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgbG9jYWwgbWVkaWEgY2FwdHVyZS4nKTtcbiAgICB9XG59XG5cbnV0aWwuaW5oZXJpdHMoTG9jYWxNZWRpYSwgV2lsZEVtaXR0ZXIpO1xuXG5cbkxvY2FsTWVkaWEucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKG1lZGlhQ29uc3RyYWludHMsIGNiKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBjb25zdHJhaW50cyA9IG1lZGlhQ29uc3RyYWludHMgfHwgdGhpcy5jb25maWcubWVkaWE7XG5cbiAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGZ1bmN0aW9uIChlcnIsIHN0cmVhbSkge1xuICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgaWYgKGNvbnN0cmFpbnRzLmF1ZGlvICYmIHNlbGYuY29uZmlnLmRldGVjdFNwZWFraW5nRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR1cEF1ZGlvTW9uaXRvcihzdHJlYW0sIHNlbGYuY29uZmlnLmhhcmtPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYubG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcblxuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmF1dG9BZGp1c3RNaWMpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmdhaW5Db250cm9sbGVyID0gbmV3IEdhaW5Db250cm9sbGVyKHN0cmVhbSk7XG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgb3V0IHNvbWV3aGF0IG11dGVkIGlmIHdlIGNhbiB0cmFjayBhdWRpb1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0TWljSWZFbmFibGVkKDAuNSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE86IG1pZ2h0IG5lZWQgdG8gbWlncmF0ZSB0byB0aGUgdmlkZW8gdHJhY2tzIG9uZW5kZWRcbiAgICAgICAgICAgIC8vIEZJWE1FOiBmaXJlZm94IGRvZXMgbm90IHNlZW0gdG8gdHJpZ2dlciB0aGlzLi4uXG4gICAgICAgICAgICBzdHJlYW0ub25lbmRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHZhciBpZHggPSBzZWxmLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYubG9jYWxTY3JlZW5zLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2xvY2FsU3RyZWFtU3RvcHBlZCcsIHN0cmVhbSk7XG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNlbGYuZW1pdCgnbG9jYWxTdHJlYW0nLCBzdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgICAgcmV0dXJuIGNiKGVyciwgc3RyZWFtKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuTG9jYWxNZWRpYS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgLy8gRklYTUU6IGR1cGxpY2F0ZXMgY2xlYW51cCBjb2RlIHVudGlsIGZpeGVkIGluIEZGXG4gICAgaWYgKHN0cmVhbSkge1xuICAgICAgICBzdHJlYW0uc3RvcCgpO1xuICAgICAgICBzZWxmLmVtaXQoJ2xvY2FsU3RyZWFtU3RvcHBlZCcsIHN0cmVhbSk7XG4gICAgICAgIHZhciBpZHggPSBzZWxmLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgc2VsZi5sb2NhbFN0cmVhbXMgPSBzZWxmLmxvY2FsU3RyZWFtcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmF1ZGlvTW9uaXRvcikge1xuICAgICAgICAgICAgdGhpcy5hdWRpb01vbml0b3Iuc3RvcCgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYXVkaW9Nb25pdG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgICAgIHNlbGYuZW1pdCgnbG9jYWxTdHJlYW1TdG9wcGVkJywgc3RyZWFtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9jYWxTdHJlYW1zID0gW107XG4gICAgfVxufTtcblxuTG9jYWxNZWRpYS5wcm90b3R5cGUuc3RhcnRTY3JlZW5TaGFyZSA9IGZ1bmN0aW9uIChjYikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBnZXRTY3JlZW5NZWRpYShmdW5jdGlvbiAoZXJyLCBzdHJlYW0pIHtcbiAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgIHNlbGYubG9jYWxTY3JlZW5zLnB1c2goc3RyZWFtKTtcblxuICAgICAgICAgICAgLy8gVE9ETzogbWlnaHQgbmVlZCB0byBtaWdyYXRlIHRvIHRoZSB2aWRlbyB0cmFja3Mgb25lbmRlZFxuICAgICAgICAgICAgLy8gRmlyZWZveCBkb2VzIG5vdCBzdXBwb3J0IC5vbmVuZGVkIGJ1dCBpdCBkb2VzIG5vdCBzdXBwb3J0XG4gICAgICAgICAgICAvLyBzY3JlZW5zaGFyaW5nIGVpdGhlclxuICAgICAgICAgICAgc3RyZWFtLm9uZW5kZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkeCA9IHNlbGYubG9jYWxTY3JlZW5zLmluZGV4T2Yoc3RyZWFtKTtcbiAgICAgICAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2NhbFNjcmVlbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnbG9jYWxTY3JlZW5TdG9wcGVkJywgc3RyZWFtKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzZWxmLmVtaXQoJ2xvY2FsU2NyZWVuJywgc3RyZWFtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVuYWJsZSB0aGUgY2FsbGJhY2tcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICByZXR1cm4gY2IoZXJyLCBzdHJlYW0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Mb2NhbE1lZGlhLnByb3RvdHlwZS5zdG9wU2NyZWVuU2hhcmUgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgaWYgKHN0cmVhbSkge1xuICAgICAgICBzdHJlYW0uc3RvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9jYWxTY3JlZW5zLmZvckVhY2goZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICAgICAgc3RyZWFtLnN0b3AoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9jYWxTY3JlZW5zID0gW107XG4gICAgfVxufTtcblxuLy8gQXVkaW8gY29udHJvbHNcbkxvY2FsTWVkaWEucHJvdG90eXBlLm11dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fYXVkaW9FbmFibGVkKGZhbHNlKTtcbiAgICB0aGlzLmhhcmRNdXRlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KCdhdWRpb09mZicpO1xufTtcblxuTG9jYWxNZWRpYS5wcm90b3R5cGUudW5tdXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX2F1ZGlvRW5hYmxlZCh0cnVlKTtcbiAgICB0aGlzLmhhcmRNdXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgnYXVkaW9PbicpO1xufTtcblxuTG9jYWxNZWRpYS5wcm90b3R5cGUuc2V0dXBBdWRpb01vbml0b3IgPSBmdW5jdGlvbiAoc3RyZWFtLCBoYXJrT3B0aW9ucykge1xuICAgIHRoaXMuX2xvZygnU2V0dXAgYXVkaW8nKTtcbiAgICB2YXIgYXVkaW8gPSB0aGlzLmF1ZGlvTW9uaXRvciA9IGhhcmsoc3RyZWFtLCBoYXJrT3B0aW9ucyk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB0aW1lb3V0O1xuXG4gICAgYXVkaW8ub24oJ3NwZWFraW5nJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmVtaXQoJ3NwZWFraW5nJyk7XG4gICAgICAgIGlmIChzZWxmLmhhcmRNdXRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuc2V0TWljSWZFbmFibGVkKDEpO1xuICAgIH0pO1xuXG4gICAgYXVkaW8ub24oJ3N0b3BwZWRfc3BlYWtpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmVtaXQoJ3N0b3BwZWRTcGVha2luZycpO1xuICAgICAgICAgICAgaWYgKHNlbGYuaGFyZE11dGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5zZXRNaWNJZkVuYWJsZWQoMC41KTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG4gICAgYXVkaW8ub24oJ3ZvbHVtZV9jaGFuZ2UnLCBmdW5jdGlvbiAodm9sdW1lLCB0cmVzaG9sZCkge1xuICAgICAgICBzZWxmLmVtaXQoJ3ZvbHVtZUNoYW5nZScsIHZvbHVtZSwgdHJlc2hvbGQpO1xuICAgIH0pO1xufTtcblxuLy8gV2UgZG8gdGhpcyBhcyBhIHNlcGVyYXRlIG1ldGhvZCBpbiBvcmRlciB0b1xuLy8gc3RpbGwgbGVhdmUgdGhlIFwic2V0TWljVm9sdW1lXCIgYXMgYSB3b3JraW5nXG4vLyBtZXRob2QuXG5Mb2NhbE1lZGlhLnByb3RvdHlwZS5zZXRNaWNJZkVuYWJsZWQgPSBmdW5jdGlvbiAodm9sdW1lKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5hdXRvQWRqdXN0TWljKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5nYWluQ29udHJvbGxlci5zZXRHYWluKHZvbHVtZSk7XG59O1xuXG4vLyBWaWRlbyBjb250cm9sc1xuTG9jYWxNZWRpYS5wcm90b3R5cGUucGF1c2VWaWRlbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl92aWRlb0VuYWJsZWQoZmFsc2UpO1xuICAgIHRoaXMuZW1pdCgndmlkZW9PZmYnKTtcbn07XG5Mb2NhbE1lZGlhLnByb3RvdHlwZS5yZXN1bWVWaWRlbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl92aWRlb0VuYWJsZWQodHJ1ZSk7XG4gICAgdGhpcy5lbWl0KCd2aWRlb09uJyk7XG59O1xuXG4vLyBDb21iaW5lZCBjb250cm9sc1xuTG9jYWxNZWRpYS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tdXRlKCk7XG4gICAgdGhpcy5wYXVzZVZpZGVvKCk7XG59O1xuTG9jYWxNZWRpYS5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudW5tdXRlKCk7XG4gICAgdGhpcy5yZXN1bWVWaWRlbygpO1xufTtcblxuLy8gSW50ZXJuYWwgbWV0aG9kcyBmb3IgZW5hYmxpbmcvZGlzYWJsaW5nIGF1ZGlvL3ZpZGVvXG5Mb2NhbE1lZGlhLnByb3RvdHlwZS5fYXVkaW9FbmFibGVkID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgICAvLyB3b3JrIGFyb3VuZCBmb3IgY2hyb21lIDI3IGJ1ZyB3aGVyZSBkaXNhYmxpbmcgdHJhY2tzXG4gICAgLy8gZG9lc24ndCBzZWVtIHRvIHdvcmsgKHdvcmtzIGluIGNhbmFyeSwgcmVtb3ZlIHdoZW4gd29ya2luZylcbiAgICB0aGlzLnNldE1pY0lmRW5hYmxlZChib29sID8gMSA6IDApO1xuICAgIHRoaXMubG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICBzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICAgICAgdHJhY2suZW5hYmxlZCA9ICEhYm9vbDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuTG9jYWxNZWRpYS5wcm90b3R5cGUuX3ZpZGVvRW5hYmxlZCA9IGZ1bmN0aW9uIChib29sKSB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgICAgIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goZnVuY3Rpb24gKHRyYWNrKSB7XG4gICAgICAgICAgICB0cmFjay5lbmFibGVkID0gISFib29sO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8vIGNoZWNrIGlmIGFsbCBhdWRpbyBzdHJlYW1zIGFyZSBlbmFibGVkXG5Mb2NhbE1lZGlhLnByb3RvdHlwZS5pc0F1ZGlvRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5sb2NhbFN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgICAgIHN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmZvckVhY2goZnVuY3Rpb24gKHRyYWNrKSB7XG4gICAgICAgICAgICBlbmFibGVkID0gZW5hYmxlZCAmJiB0cmFjay5lbmFibGVkO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZW5hYmxlZDtcbn07XG5cbi8vIGNoZWNrIGlmIGFsbCB2aWRlbyBzdHJlYW1zIGFyZSBlbmFibGVkXG5Mb2NhbE1lZGlhLnByb3RvdHlwZS5pc1ZpZGVvRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5sb2NhbFN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgICAgIHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goZnVuY3Rpb24gKHRyYWNrKSB7XG4gICAgICAgICAgICBlbmFibGVkID0gZW5hYmxlZCAmJiB0cmFjay5lbmFibGVkO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZW5hYmxlZDtcbn07XG5cbi8vIEJhY2t3YXJkcyBDb21wYXRcbkxvY2FsTWVkaWEucHJvdG90eXBlLnN0YXJ0TG9jYWxNZWRpYSA9IExvY2FsTWVkaWEucHJvdG90eXBlLnN0YXJ0O1xuTG9jYWxNZWRpYS5wcm90b3R5cGUuc3RvcExvY2FsTWVkaWEgPSBMb2NhbE1lZGlhLnByb3RvdHlwZS5zdG9wO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIC5sb2NhbFN0cmVhbSBiZWhhdmlvdXJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShMb2NhbE1lZGlhLnByb3RvdHlwZSwgJ2xvY2FsU3RyZWFtJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbFN0cmVhbXMubGVuZ3RoID4gMCA/IHRoaXMubG9jYWxTdHJlYW1zWzBdIDogbnVsbDtcbiAgICB9XG59KTtcbi8vIGZhbGxiYWNrIGZvciBvbGQgLmxvY2FsU2NyZWVuIGJlaGF2aW91clxuT2JqZWN0LmRlZmluZVByb3BlcnR5KExvY2FsTWVkaWEucHJvdG90eXBlLCAnbG9jYWxTY3JlZW4nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsU2NyZWVucy5sZW5ndGggPiAwID8gdGhpcy5sb2NhbFNjcmVlbnNbMF0gOiBudWxsO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvY2FsTWVkaWE7XG4iLCIvLyBnZXRTY3JlZW5NZWRpYSBoZWxwZXIgYnkgQEhlbnJpa0pvcmV0ZWdcbnZhciBnZXRVc2VyTWVkaWEgPSByZXF1aXJlKCdnZXR1c2VybWVkaWEnKTtcblxuLy8gY2FjaGUgZm9yIGNvbnN0cmFpbnRzIGFuZCBjYWxsYmFja1xudmFyIGNhY2hlID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbnN0cmFpbnRzLCBjYikge1xuICAgIHZhciBoYXNDb25zdHJhaW50cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDI7XG4gICAgdmFyIGNhbGxiYWNrID0gaGFzQ29uc3RyYWludHMgPyBjYiA6IGNvbnN0cmFpbnRzO1xuICAgIHZhciBlcnJvcjtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwOicpIHtcbiAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ05hdmlnYXRvclVzZXJNZWRpYUVycm9yJyk7XG4gICAgICAgIGVycm9yLm5hbWUgPSAnSFRUUFNfUkVRVUlSRUQnO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgnQ2hyb21lJykpIHtcbiAgICAgICAgdmFyIGNocm9tZXZlciA9IHBhcnNlSW50KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oLiopIC8pWzFdLCAxMCk7XG4gICAgICAgIHZhciBtYXh2ZXIgPSAzMztcbiAgICAgICAgdmFyIGlzQ2VmID0gIXdpbmRvdy5jaHJvbWUud2Vic3RvcmU7XG4gICAgICAgIC8vIFwia25vd25cIiBjcmFzaCBpbiBjaHJvbWUgMzQgYW5kIDM1IG9uIGxpbnV4XG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgnTGludXgnKSkgbWF4dmVyID0gMzU7XG4gICAgICAgIGlmIChpc0NlZiB8fCAoY2hyb21ldmVyID49IDI2ICYmIGNocm9tZXZlciA8PSBtYXh2ZXIpKSB7XG4gICAgICAgICAgICAvLyBjaHJvbWUgMjYgLSBjaHJvbWUgMzMgd2F5IHRvIGRvIGl0IC0tIHJlcXVpcmVzIGJhZCBjaHJvbWU6Ly9mbGFnc1xuICAgICAgICAgICAgLy8gbm90ZTogdGhpcyBpcyBiYXNpY2FsbHkgaW4gbWFpbnRlbmFuY2UgbW9kZSBhbmQgd2lsbCBnbyBhd2F5IHNvb25cbiAgICAgICAgICAgIGNvbnN0cmFpbnRzID0gKGhhc0NvbnN0cmFpbnRzICYmIGNvbnN0cmFpbnRzKSB8fCB7XG4gICAgICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnb29nTGVha3lCdWNrZXQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogd2luZG93LnNjcmVlbi53aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEhlaWdodDogd2luZG93LnNjcmVlbi5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhGcmFtZVJhdGU6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWVNZWRpYVNvdXJjZTogJ3NjcmVlbidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNocm9tZSAzNCsgd2F5IHJlcXVpcmluZyBhbiBleHRlbnNpb25cbiAgICAgICAgICAgIHZhciBwZW5kaW5nID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKCdOYXZpZ2F0b3JVc2VyTWVkaWFFcnJvcicpO1xuICAgICAgICAgICAgICAgIGVycm9yLm5hbWUgPSAnRVhURU5TSU9OX1VOQVZBSUxBQkxFJztcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICBjYWNoZVtwZW5kaW5nXSA9IFtjYWxsYmFjaywgaGFzQ29uc3RyYWludHMgPyBjb25zdHJhaW50IDogbnVsbF07XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZ2V0U2NyZWVuJywgaWQ6IHBlbmRpbmcgfSwgJyonKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goJ0ZpcmVmb3gnKSkge1xuICAgICAgICB2YXIgZmZ2ZXIgPSBwYXJzZUludCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRmlyZWZveFxcLyguKikvKVsxXSwgMTApO1xuICAgICAgICBpZiAoZmZ2ZXIgPj0gMzMpIHtcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzID0gKGhhc0NvbnN0cmFpbnRzICYmIGNvbnN0cmFpbnRzKSB8fCB7XG4gICAgICAgICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgICAgICAgICAgbW96TWVkaWFTb3VyY2U6ICd3aW5kb3cnLFxuICAgICAgICAgICAgICAgICAgICBtZWRpYVNvdXJjZTogJ3dpbmRvdydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGZ1bmN0aW9uIChlcnIsIHN0cmVhbSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVyciwgc3RyZWFtKTtcbiAgICAgICAgICAgICAgICAvLyB3b3JrYXJvdW5kIGZvciBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMDQ1ODEwXG4gICAgICAgICAgICAgICAgaWYgKCFlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RUaW1lID0gc3RyZWFtLmN1cnJlbnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9sbHkgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHdpbmRvdy5jbGVhckludGVydmFsKHBvbGx5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHJlYW0uY3VycmVudFRpbWUgPT0gbGFzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChwb2xseSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0cmVhbS5vbmVuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS5vbmVuZGVkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRpbWUgPSBzdHJlYW0uY3VycmVudFRpbWU7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcignTmF2aWdhdG9yVXNlck1lZGlhRXJyb3InKTtcbiAgICAgICAgICAgIGVycm9yLm5hbWUgPSAnRVhURU5TSU9OX1VOQVZBSUxBQkxFJzsgLy8gZG9lcyBub3QgbWFrZSBtdWNoIHNlbnNlIGJ1dC4uLlxuICAgICAgICB9XG4gICAgfVxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQub3JpZ2luICE9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZXZlbnQuZGF0YS50eXBlID09ICdnb3RTY3JlZW4nICYmIGNhY2hlW2V2ZW50LmRhdGEuaWRdKSB7XG4gICAgICAgIHZhciBkYXRhID0gY2FjaGVbZXZlbnQuZGF0YS5pZF07XG4gICAgICAgIHZhciBjb25zdHJhaW50cyA9IGRhdGFbMV07XG4gICAgICAgIHZhciBjYWxsYmFjayA9IGRhdGFbMF07XG4gICAgICAgIGRlbGV0ZSBjYWNoZVtldmVudC5kYXRhLmlkXTtcblxuICAgICAgICBpZiAoZXZlbnQuZGF0YS5zb3VyY2VJZCA9PT0gJycpIHsgLy8gdXNlciBjYW5jZWxlZFxuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdOYXZpZ2F0b3JVc2VyTWVkaWFFcnJvcicpO1xuICAgICAgICAgICAgZXJyb3IubmFtZSA9ICdQRVJNSVNTSU9OX0RFTklFRCc7XG4gICAgICAgICAgICBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdHJhaW50cyA9IGNvbnN0cmFpbnRzIHx8IHthdWRpbzogZmFsc2UsIHZpZGVvOiB7XG4gICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIGNocm9tZU1lZGlhU291cmNlOiAnZGVza3RvcCcsXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiB3aW5kb3cuc2NyZWVuLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHdpbmRvdy5zY3JlZW4uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBtYXhGcmFtZVJhdGU6IDNcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wdGlvbmFsOiBbXG4gICAgICAgICAgICAgICAgICAgIHtnb29nTGVha3lCdWNrZXQ6IHRydWV9LFxuICAgICAgICAgICAgICAgICAgICB7Z29vZ1RlbXBvcmFsTGF5ZXJlZFNjcmVlbmNhc3Q6IHRydWV9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfX07XG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5tYW5kYXRvcnkuY2hyb21lTWVkaWFTb3VyY2VJZCA9IGV2ZW50LmRhdGEuc291cmNlSWQ7XG4gICAgICAgICAgICBnZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZXZlbnQuZGF0YS50eXBlID09ICdnZXRTY3JlZW5QZW5kaW5nJykge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGV2ZW50LmRhdGEuaWQpO1xuICAgIH1cbn0pO1xuIiwiLy8gZ2V0VXNlck1lZGlhIGhlbHBlciBieSBASGVucmlrSm9yZXRlZ1xudmFyIGZ1bmMgPSAod2luZG93Lm5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8XG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSB8fFxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRvci5tc0dldFVzZXJNZWRpYSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY29uc3RyYWludHMsIGNiKSB7XG4gICAgdmFyIG9wdGlvbnMsIGVycm9yO1xuICAgIHZhciBoYXZlT3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDI7XG4gICAgdmFyIGRlZmF1bHRPcHRzID0ge3ZpZGVvOiB0cnVlLCBhdWRpbzogdHJ1ZX07XG4gICAgdmFyIGRlbmllZCA9ICdQZXJtaXNzaW9uRGVuaWVkRXJyb3InO1xuICAgIHZhciBub3RTYXRpc2ZpZWQgPSAnQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yJztcblxuICAgIC8vIG1ha2UgY29uc3RyYWludHMgb3B0aW9uYWxcbiAgICBpZiAoIWhhdmVPcHRzKSB7XG4gICAgICAgIGNiID0gY29uc3RyYWludHM7XG4gICAgICAgIGNvbnN0cmFpbnRzID0gZGVmYXVsdE9wdHM7XG4gICAgfVxuXG4gICAgLy8gdHJlYXQgbGFjayBvZiBicm93c2VyIHN1cHBvcnQgbGlrZSBhbiBlcnJvclxuICAgIGlmICghZnVuYykge1xuICAgICAgICAvLyB0aHJvdyBwcm9wZXIgZXJyb3IgcGVyIHNwZWNcbiAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01lZGlhU3RyZWFtRXJyb3InKTtcbiAgICAgICAgZXJyb3IubmFtZSA9ICdOb3RTdXBwb3J0ZWRFcnJvcic7XG5cbiAgICAgICAgLy8ga2VlcCBhbGwgY2FsbGJhY2tzIGFzeW5jXG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYihlcnJvcik7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIC8vIG1ha2UgcmVxdWVzdGluZyBtZWRpYSBmcm9tIG5vbi1odHRwIHNvdXJjZXMgdHJpZ2dlciBhbiBlcnJvclxuICAgIC8vIGN1cnJlbnQgYnJvd3NlcnMgc2lsZW50bHkgZHJvcCB0aGUgcmVxdWVzdCBpbnN0ZWFkXG4gICAgdmFyIHByb3RvY29sID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgIGlmIChwcm90b2NvbCAhPT0gJ2h0dHA6JyAmJiBwcm90b2NvbCAhPT0gJ2h0dHBzOicpIHtcbiAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01lZGlhU3RyZWFtRXJyb3InKTtcbiAgICAgICAgZXJyb3IubmFtZSA9ICdOb3RTdXBwb3J0ZWRFcnJvcic7XG5cbiAgICAgICAgLy8ga2VlcCBhbGwgY2FsbGJhY2tzIGFzeW5jXG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYihlcnJvcik7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIC8vIG5vcm1hbGl6ZSBlcnJvciBoYW5kbGluZyB3aGVuIG5vIG1lZGlhIHR5cGVzIGFyZSByZXF1ZXN0ZWRcbiAgICBpZiAoIWNvbnN0cmFpbnRzLmF1ZGlvICYmICFjb25zdHJhaW50cy52aWRlbykge1xuICAgICAgICBlcnJvciA9IG5ldyBFcnJvcignTWVkaWFTdHJlYW1FcnJvcicpO1xuICAgICAgICBlcnJvci5uYW1lID0gJ05vTWVkaWFSZXF1ZXN0ZWRFcnJvcic7XG5cbiAgICAgICAgLy8ga2VlcCBhbGwgY2FsbGJhY2tzIGFzeW5jXG4gICAgICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYihlcnJvcik7XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGlmIChsb2NhbFN0b3JhZ2UgJiYgbG9jYWxTdG9yYWdlLnVzZUZpcmVmb3hGYWtlRGV2aWNlID09PSBcInRydWVcIikge1xuICAgICAgICBjb25zdHJhaW50cy5mYWtlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jLmNhbGwod2luZG93Lm5hdmlnYXRvciwgY29uc3RyYWludHMsIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICAgICAgY2IobnVsbCwgc3RyZWFtKTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gY29lcmNlIGludG8gYW4gZXJyb3Igb2JqZWN0IHNpbmNlIEZGIGdpdmVzIHVzIGEgc3RyaW5nXG4gICAgICAgIC8vIHRoZXJlIGFyZSBvbmx5IHR3byB2YWxpZCBuYW1lcyBhY2NvcmRpbmcgdG8gdGhlIHNwZWNcbiAgICAgICAgLy8gd2UgY29lcmNlIGFsbCBub24tZGVuaWVkIHRvIFwiY29uc3RyYWludCBub3Qgc2F0aXNmaWVkXCIuXG4gICAgICAgIGlmICh0eXBlb2YgZXJyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01lZGlhU3RyZWFtRXJyb3InKTtcbiAgICAgICAgICAgIGlmIChlcnIgPT09IGRlbmllZCkge1xuICAgICAgICAgICAgICAgIGVycm9yLm5hbWUgPSBkZW5pZWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVycm9yLm5hbWUgPSBub3RTYXRpc2ZpZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBnZXQgYW4gZXJyb3Igb2JqZWN0IG1ha2Ugc3VyZSAnLm5hbWUnIHByb3BlcnR5IGlzIHNldFxuICAgICAgICAgICAgLy8gYWNjb3JkaW5nIHRvIHNwZWM6IGh0dHA6Ly9kZXYudzMub3JnLzIwMTEvd2VicnRjL2VkaXRvci9nZXR1c2VybWVkaWEuaHRtbCNuYXZpZ2F0b3J1c2VybWVkaWFlcnJvci1hbmQtbmF2aWdhdG9ydXNlcm1lZGlhZXJyb3JjYWxsYmFja1xuICAgICAgICAgICAgZXJyb3IgPSBlcnI7XG4gICAgICAgICAgICBpZiAoIWVycm9yLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzIGlzIGxpa2VseSBjaHJvbWUgd2hpY2hcbiAgICAgICAgICAgICAgICAvLyBzZXRzIGEgcHJvcGVydHkgY2FsbGVkIFwiRVJST1JfREVOSUVEXCIgb24gdGhlIGVycm9yIG9iamVjdFxuICAgICAgICAgICAgICAgIC8vIGlmIHNvIHdlIG1ha2Ugc3VyZSB0byBzZXQgYSBuYW1lXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yW2RlbmllZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyLm5hbWUgPSBkZW5pZWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyLm5hbWUgPSBub3RTYXRpc2ZpZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2IoZXJyb3IpO1xuICAgIH0pO1xufTtcbiIsInZhciBXaWxkRW1pdHRlciA9IHJlcXVpcmUoJ3dpbGRlbWl0dGVyJyk7XG5cbmZ1bmN0aW9uIGdldE1heFZvbHVtZSAoYW5hbHlzZXIsIGZmdEJpbnMpIHtcbiAgdmFyIG1heFZvbHVtZSA9IC1JbmZpbml0eTtcbiAgYW5hbHlzZXIuZ2V0RmxvYXRGcmVxdWVuY3lEYXRhKGZmdEJpbnMpO1xuXG4gIGZvcih2YXIgaT00LCBpaT1mZnRCaW5zLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcbiAgICBpZiAoZmZ0Qmluc1tpXSA+IG1heFZvbHVtZSAmJiBmZnRCaW5zW2ldIDwgMCkge1xuICAgICAgbWF4Vm9sdW1lID0gZmZ0Qmluc1tpXTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIG1heFZvbHVtZTtcbn1cblxuXG52YXIgYXVkaW9Db250ZXh0VHlwZSA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbi8vIHVzZSBhIHNpbmdsZSBhdWRpbyBjb250ZXh0IGR1ZSB0byBoYXJkd2FyZSBsaW1pdHNcbnZhciBhdWRpb0NvbnRleHQgPSBudWxsO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdHJlYW0sIG9wdGlvbnMpIHtcbiAgdmFyIGhhcmtlciA9IG5ldyBXaWxkRW1pdHRlcigpO1xuXG5cbiAgLy8gbWFrZSBpdCBub3QgYnJlYWsgaW4gbm9uLXN1cHBvcnRlZCBicm93c2Vyc1xuICBpZiAoIWF1ZGlvQ29udGV4dFR5cGUpIHJldHVybiBoYXJrZXI7XG5cbiAgLy9Db25maWdcbiAgdmFyIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxuICAgICAgc21vb3RoaW5nID0gKG9wdGlvbnMuc21vb3RoaW5nIHx8IDAuMSksXG4gICAgICBpbnRlcnZhbCA9IChvcHRpb25zLmludGVydmFsIHx8IDUwKSxcbiAgICAgIHRocmVzaG9sZCA9IG9wdGlvbnMudGhyZXNob2xkLFxuICAgICAgcGxheSA9IG9wdGlvbnMucGxheSxcbiAgICAgIGhpc3RvcnkgPSBvcHRpb25zLmhpc3RvcnkgfHwgMTAsXG4gICAgICBydW5uaW5nID0gdHJ1ZTtcblxuICAvL1NldHVwIEF1ZGlvIENvbnRleHRcbiAgaWYgKCFhdWRpb0NvbnRleHQpIHtcbiAgICBhdWRpb0NvbnRleHQgPSBuZXcgYXVkaW9Db250ZXh0VHlwZSgpO1xuICB9XG4gIHZhciBzb3VyY2VOb2RlLCBmZnRCaW5zLCBhbmFseXNlcjtcblxuICBhbmFseXNlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuICBhbmFseXNlci5mZnRTaXplID0gNTEyO1xuICBhbmFseXNlci5zbW9vdGhpbmdUaW1lQ29uc3RhbnQgPSBzbW9vdGhpbmc7XG4gIGZmdEJpbnMgPSBuZXcgRmxvYXQzMkFycmF5KGFuYWx5c2VyLmZmdFNpemUpO1xuXG4gIGlmIChzdHJlYW0uanF1ZXJ5KSBzdHJlYW0gPSBzdHJlYW1bMF07XG4gIGlmIChzdHJlYW0gaW5zdGFuY2VvZiBIVE1MQXVkaW9FbGVtZW50IHx8IHN0cmVhbSBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICAvL0F1ZGlvIFRhZ1xuICAgIHNvdXJjZU5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKHN0cmVhbSk7XG4gICAgaWYgKHR5cGVvZiBwbGF5ID09PSAndW5kZWZpbmVkJykgcGxheSA9IHRydWU7XG4gICAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IC01MDtcbiAgfSBlbHNlIHtcbiAgICAvL1dlYlJUQyBTdHJlYW1cbiAgICBzb3VyY2VOb2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gICAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IC01MDtcbiAgfVxuXG4gIHNvdXJjZU5vZGUuY29ubmVjdChhbmFseXNlcik7XG4gIGlmIChwbGF5KSBhbmFseXNlci5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XG5cbiAgaGFya2VyLnNwZWFraW5nID0gZmFsc2U7XG5cbiAgaGFya2VyLnNldFRocmVzaG9sZCA9IGZ1bmN0aW9uKHQpIHtcbiAgICB0aHJlc2hvbGQgPSB0O1xuICB9O1xuXG4gIGhhcmtlci5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKGkpIHtcbiAgICBpbnRlcnZhbCA9IGk7XG4gIH07XG4gIFxuICBoYXJrZXIuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBoYXJrZXIuZW1pdCgndm9sdW1lX2NoYW5nZScsIC0xMDAsIHRocmVzaG9sZCk7XG4gICAgaWYgKGhhcmtlci5zcGVha2luZykge1xuICAgICAgaGFya2VyLnNwZWFraW5nID0gZmFsc2U7XG4gICAgICBoYXJrZXIuZW1pdCgnc3RvcHBlZF9zcGVha2luZycpO1xuICAgIH1cbiAgfTtcbiAgaGFya2VyLnNwZWFraW5nSGlzdG9yeSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGhpc3Rvcnk7IGkrKykge1xuICAgICAgaGFya2VyLnNwZWFraW5nSGlzdG9yeS5wdXNoKDApO1xuICB9XG5cbiAgLy8gUG9sbCB0aGUgYW5hbHlzZXIgbm9kZSB0byBkZXRlcm1pbmUgaWYgc3BlYWtpbmdcbiAgLy8gYW5kIGVtaXQgZXZlbnRzIGlmIGNoYW5nZWRcbiAgdmFyIGxvb3BlciA9IGZ1bmN0aW9uKCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAvL2NoZWNrIGlmIHN0b3AgaGFzIGJlZW4gY2FsbGVkXG4gICAgICBpZighcnVubmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIHZhciBjdXJyZW50Vm9sdW1lID0gZ2V0TWF4Vm9sdW1lKGFuYWx5c2VyLCBmZnRCaW5zKTtcblxuICAgICAgaGFya2VyLmVtaXQoJ3ZvbHVtZV9jaGFuZ2UnLCBjdXJyZW50Vm9sdW1lLCB0aHJlc2hvbGQpO1xuXG4gICAgICB2YXIgaGlzdG9yeSA9IDA7XG4gICAgICBpZiAoY3VycmVudFZvbHVtZSA+IHRocmVzaG9sZCAmJiAhaGFya2VyLnNwZWFraW5nKSB7XG4gICAgICAgIC8vIHRyaWdnZXIgcXVpY2tseSwgc2hvcnQgaGlzdG9yeVxuICAgICAgICBmb3IgKHZhciBpID0gaGFya2VyLnNwZWFraW5nSGlzdG9yeS5sZW5ndGggLSAzOyBpIDwgaGFya2VyLnNwZWFraW5nSGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGhpc3RvcnkgKz0gaGFya2VyLnNwZWFraW5nSGlzdG9yeVtpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGlzdG9yeSA+PSAyKSB7XG4gICAgICAgICAgaGFya2VyLnNwZWFraW5nID0gdHJ1ZTtcbiAgICAgICAgICBoYXJrZXIuZW1pdCgnc3BlYWtpbmcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50Vm9sdW1lIDwgdGhyZXNob2xkICYmIGhhcmtlci5zcGVha2luZykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhcmtlci5zcGVha2luZ0hpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBoaXN0b3J5ICs9IGhhcmtlci5zcGVha2luZ0hpc3RvcnlbaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhpc3RvcnkgPT0gMCkge1xuICAgICAgICAgIGhhcmtlci5zcGVha2luZyA9IGZhbHNlO1xuICAgICAgICAgIGhhcmtlci5lbWl0KCdzdG9wcGVkX3NwZWFraW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGhhcmtlci5zcGVha2luZ0hpc3Rvcnkuc2hpZnQoKTtcbiAgICAgIGhhcmtlci5zcGVha2luZ0hpc3RvcnkucHVzaCgwICsgKGN1cnJlbnRWb2x1bWUgPiB0aHJlc2hvbGQpKTtcblxuICAgICAgbG9vcGVyKCk7XG4gICAgfSwgaW50ZXJ2YWwpO1xuICB9O1xuICBsb29wZXIoKTtcblxuXG4gIHJldHVybiBoYXJrZXI7XG59XG4iLCJ2YXIgc3VwcG9ydCA9IHJlcXVpcmUoJ3dlYnJ0Y3N1cHBvcnQnKTtcblxuXG5mdW5jdGlvbiBHYWluQ29udHJvbGxlcihzdHJlYW0pIHtcbiAgICB0aGlzLnN1cHBvcnQgPSBzdXBwb3J0LndlYkF1ZGlvICYmIHN1cHBvcnQubWVkaWFTdHJlYW07XG5cbiAgICAvLyBzZXQgb3VyIHN0YXJ0aW5nIHZhbHVlXG4gICAgdGhpcy5nYWluID0gMTtcblxuICAgIGlmICh0aGlzLnN1cHBvcnQpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHQgPSBuZXcgc3VwcG9ydC5BdWRpb0NvbnRleHQoKTtcbiAgICAgICAgdGhpcy5taWNyb3Bob25lID0gY29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuICAgICAgICB0aGlzLmdhaW5GaWx0ZXIgPSBjb250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbiA9IGNvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1EZXN0aW5hdGlvbigpO1xuICAgICAgICB0aGlzLm91dHB1dFN0cmVhbSA9IHRoaXMuZGVzdGluYXRpb24uc3RyZWFtO1xuICAgICAgICB0aGlzLm1pY3JvcGhvbmUuY29ubmVjdCh0aGlzLmdhaW5GaWx0ZXIpO1xuICAgICAgICB0aGlzLmdhaW5GaWx0ZXIuY29ubmVjdCh0aGlzLmRlc3RpbmF0aW9uKTtcbiAgICAgICAgc3RyZWFtLmFkZFRyYWNrKHRoaXMub3V0cHV0U3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0pO1xuICAgICAgICBzdHJlYW0ucmVtb3ZlVHJhY2soc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0pO1xuICAgIH1cbiAgICB0aGlzLnN0cmVhbSA9IHN0cmVhbTtcbn1cblxuLy8gc2V0dGluZ1xuR2FpbkNvbnRyb2xsZXIucHJvdG90eXBlLnNldEdhaW4gPSBmdW5jdGlvbiAodmFsKSB7XG4gICAgLy8gY2hlY2sgZm9yIHN1cHBvcnRcbiAgICBpZiAoIXRoaXMuc3VwcG9ydCkgcmV0dXJuO1xuICAgIHRoaXMuZ2FpbkZpbHRlci5nYWluLnZhbHVlID0gdmFsO1xuICAgIHRoaXMuZ2FpbiA9IHZhbDtcbn07XG5cbkdhaW5Db250cm9sbGVyLnByb3RvdHlwZS5nZXRHYWluID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdhaW47XG59O1xuXG5HYWluQ29udHJvbGxlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNldEdhaW4oMCk7XG59O1xuXG5HYWluQ29udHJvbGxlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZXRHYWluKDEpO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhaW5Db250cm9sbGVyO1xuIiwidmFyIHRvU0RQID0gcmVxdWlyZSgnLi9saWIvdG9zZHAnKTtcbnZhciB0b0pTT04gPSByZXF1aXJlKCcuL2xpYi90b2pzb24nKTtcblxuXG4vLyBDb252ZXJzdGlvbiBmcm9tIEpTT04gdG8gU0RQXG5cbmV4cG9ydHMudG9JbmNvbWluZ1NEUE9mZmVyID0gZnVuY3Rpb24gKHNlc3Npb24pIHtcbiAgICByZXR1cm4gdG9TRFAudG9TZXNzaW9uU0RQKHNlc3Npb24sIHtcbiAgICAgICAgcm9sZTogJ3Jlc3BvbmRlcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJ1xuICAgIH0pO1xufTtcbmV4cG9ydHMudG9PdXRnb2luZ1NEUE9mZmVyID0gZnVuY3Rpb24gKHNlc3Npb24pIHtcbiAgICByZXR1cm4gdG9TRFAudG9TZXNzaW9uU0RQKHNlc3Npb24sIHtcbiAgICAgICAgcm9sZTogJ2luaXRpYXRvcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJ1xuICAgIH0pO1xufTtcbmV4cG9ydHMudG9JbmNvbWluZ1NEUEFuc3dlciA9IGZ1bmN0aW9uIChzZXNzaW9uKSB7XG4gICAgcmV0dXJuIHRvU0RQLnRvU2Vzc2lvblNEUChzZXNzaW9uLCB7XG4gICAgICAgIHJvbGU6ICdpbml0aWF0b3InLFxuICAgICAgICBkaXJlY3Rpb246ICdpbmNvbWluZydcbiAgICB9KTtcbn07XG5leHBvcnRzLnRvT3V0Z29pbmdTRFBBbnN3ZXIgPSBmdW5jdGlvbiAoc2Vzc2lvbikge1xuICAgIHJldHVybiB0b1NEUC50b1Nlc3Npb25TRFAoc2Vzc2lvbiwge1xuICAgICAgICByb2xlOiAncmVzcG9uZGVyJyxcbiAgICAgICAgZGlyZWN0aW9uOiAnb3V0Z29pbmcnXG4gICAgfSk7XG59O1xuZXhwb3J0cy50b0luY29taW5nTWVkaWFTRFBPZmZlciA9IGZ1bmN0aW9uIChtZWRpYSkge1xuICAgIHJldHVybiB0b1NEUC50b01lZGlhU0RQKG1lZGlhLCB7XG4gICAgICAgIHJvbGU6ICdyZXNwb25kZXInLFxuICAgICAgICBkaXJlY3Rpb246ICdpbmNvbWluZydcbiAgICB9KTtcbn07XG5leHBvcnRzLnRvT3V0Z29pbmdNZWRpYVNEUE9mZmVyID0gZnVuY3Rpb24gKG1lZGlhKSB7XG4gICAgcmV0dXJuIHRvU0RQLnRvTWVkaWFTRFAobWVkaWEsIHtcbiAgICAgICAgcm9sZTogJ2luaXRpYXRvcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJ1xuICAgIH0pO1xufTtcbmV4cG9ydHMudG9JbmNvbWluZ01lZGlhU0RQQW5zd2VyID0gZnVuY3Rpb24gKG1lZGlhKSB7XG4gICAgcmV0dXJuIHRvU0RQLnRvTWVkaWFTRFAobWVkaWEsIHtcbiAgICAgICAgcm9sZTogJ2luaXRpYXRvcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJ1xuICAgIH0pO1xufTtcbmV4cG9ydHMudG9PdXRnb2luZ01lZGlhU0RQQW5zd2VyID0gZnVuY3Rpb24gKG1lZGlhKSB7XG4gICAgcmV0dXJuIHRvU0RQLnRvTWVkaWFTRFAobWVkaWEsIHtcbiAgICAgICAgcm9sZTogJ3Jlc3BvbmRlcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJ1xuICAgIH0pO1xufTtcbmV4cG9ydHMudG9DYW5kaWRhdGVTRFAgPSB0b1NEUC50b0NhbmRpZGF0ZVNEUDtcbmV4cG9ydHMudG9NZWRpYVNEUCA9IHRvU0RQLnRvTWVkaWFTRFA7XG5leHBvcnRzLnRvU2Vzc2lvblNEUCA9IHRvU0RQLnRvU2Vzc2lvblNEUDtcblxuXG4vLyBDb252ZXJzaW9uIGZyb20gU0RQIHRvIEpTT05cblxuZXhwb3J0cy50b0luY29taW5nSlNPTk9mZmVyID0gZnVuY3Rpb24gKHNkcCwgY3JlYXRvcnMpIHtcbiAgICByZXR1cm4gdG9KU09OLnRvU2Vzc2lvbkpTT04oc2RwLCB7XG4gICAgICAgIHJvbGU6ICdyZXNwb25kZXInLFxuICAgICAgICBkaXJlY3Rpb246ICdpbmNvbWluZycsXG4gICAgICAgIGNyZWF0b3JzOiBjcmVhdG9yc1xuICAgIH0pO1xufTtcbmV4cG9ydHMudG9PdXRnb2luZ0pTT05PZmZlciA9IGZ1bmN0aW9uIChzZHAsIGNyZWF0b3JzKSB7XG4gICAgcmV0dXJuIHRvSlNPTi50b1Nlc3Npb25KU09OKHNkcCwge1xuICAgICAgICByb2xlOiAnaW5pdGlhdG9yJyxcbiAgICAgICAgZGlyZWN0aW9uOiAnb3V0Z29pbmcnLFxuICAgICAgICBjcmVhdG9yczogY3JlYXRvcnNcbiAgICB9KTtcbn07XG5leHBvcnRzLnRvSW5jb21pbmdKU09OQW5zd2VyID0gZnVuY3Rpb24gKHNkcCwgY3JlYXRvcnMpIHtcbiAgICByZXR1cm4gdG9KU09OLnRvU2Vzc2lvbkpTT04oc2RwLCB7XG4gICAgICAgIHJvbGU6ICdpbml0aWF0b3InLFxuICAgICAgICBkaXJlY3Rpb246ICdpbmNvbWluZycsXG4gICAgICAgIGNyZWF0b3JzOiBjcmVhdG9yc1xuICAgIH0pO1xufTtcbmV4cG9ydHMudG9PdXRnb2luZ0pTT05BbnN3ZXIgPSBmdW5jdGlvbiAoc2RwLCBjcmVhdG9ycykge1xuICAgIHJldHVybiB0b0pTT04udG9TZXNzaW9uSlNPTihzZHAsIHtcbiAgICAgICAgcm9sZTogJ3Jlc3BvbmRlcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICAgICAgY3JlYXRvcnM6IGNyZWF0b3JzXG4gICAgfSk7XG59O1xuZXhwb3J0cy50b0luY29taW5nTWVkaWFKU09OT2ZmZXIgPSBmdW5jdGlvbiAoc2RwLCBjcmVhdG9yKSB7XG4gICAgcmV0dXJuIHRvSlNPTi50b01lZGlhSlNPTihzZHAsIHtcbiAgICAgICAgcm9sZTogJ3Jlc3BvbmRlcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJyxcbiAgICAgICAgY3JlYXRvcjogY3JlYXRvclxuICAgIH0pO1xufTtcbmV4cG9ydHMudG9PdXRnb2luZ01lZGlhSlNPTk9mZmVyID0gZnVuY3Rpb24gKHNkcCwgY3JlYXRvcikge1xuICAgIHJldHVybiB0b0pTT04udG9NZWRpYUpTT04oc2RwLCB7XG4gICAgICAgIHJvbGU6ICdpbml0aWF0b3InLFxuICAgICAgICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG4gICAgICAgIGNyZWF0b3I6IGNyZWF0b3JcbiAgICB9KTtcbn07XG5leHBvcnRzLnRvSW5jb21pbmdNZWRpYUpTT05BbnN3ZXIgPSBmdW5jdGlvbiAoc2RwLCBjcmVhdG9yKSB7XG4gICAgcmV0dXJuIHRvSlNPTi50b01lZGlhSlNPTihzZHAsIHtcbiAgICAgICAgcm9sZTogJ2luaXRpYXRvcicsXG4gICAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJyxcbiAgICAgICAgY3JlYXRvcjogY3JlYXRvclxuICAgIH0pO1xufTtcbmV4cG9ydHMudG9PdXRnb2luZ01lZGlhSlNPTkFuc3dlciA9IGZ1bmN0aW9uIChzZHAsIGNyZWF0b3IpIHtcbiAgICByZXR1cm4gdG9KU09OLnRvTWVkaWFKU09OKHNkcCwge1xuICAgICAgICByb2xlOiAncmVzcG9uZGVyJyxcbiAgICAgICAgZGlyZWN0aW9uOiAnb3V0Z29pbmcnLFxuICAgICAgICBjcmVhdG9yOiBjcmVhdG9yXG4gICAgfSk7XG59O1xuZXhwb3J0cy50b0NhbmRpZGF0ZUpTT04gPSB0b0pTT04udG9DYW5kaWRhdGVKU09OO1xuZXhwb3J0cy50b01lZGlhSlNPTiA9IHRvSlNPTi50b01lZGlhSlNPTjtcbmV4cG9ydHMudG9TZXNzaW9uSlNPTiA9IHRvSlNPTi50b1Nlc3Npb25KU09OO1xuIiwiZXhwb3J0cy5saW5lcyA9IGZ1bmN0aW9uIChzZHApIHtcbiAgICByZXR1cm4gc2RwLnNwbGl0KCdcXHJcXG4nKS5maWx0ZXIoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubGVuZ3RoID4gMDtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMuZmluZExpbmUgPSBmdW5jdGlvbiAocHJlZml4LCBtZWRpYUxpbmVzLCBzZXNzaW9uTGluZXMpIHtcbiAgICB2YXIgcHJlZml4TGVuZ3RoID0gcHJlZml4Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lZGlhTGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1lZGlhTGluZXNbaV0uc3Vic3RyKDAsIHByZWZpeExlbmd0aCkgPT09IHByZWZpeCkge1xuICAgICAgICAgICAgcmV0dXJuIG1lZGlhTGluZXNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQ29udGludWUgc2VhcmNoaW5nIGluIHBhcmVudCBzZXNzaW9uIHNlY3Rpb25cbiAgICBpZiAoIXNlc3Npb25MaW5lcykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXNzaW9uTGluZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHNlc3Npb25MaW5lc1tqXS5zdWJzdHIoMCwgcHJlZml4TGVuZ3RoKSA9PT0gcHJlZml4KSB7XG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbkxpbmVzW2pdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0cy5maW5kTGluZXMgPSBmdW5jdGlvbiAocHJlZml4LCBtZWRpYUxpbmVzLCBzZXNzaW9uTGluZXMpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHZhciBwcmVmaXhMZW5ndGggPSBwcmVmaXgubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVkaWFMaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobWVkaWFMaW5lc1tpXS5zdWJzdHIoMCwgcHJlZml4TGVuZ3RoKSA9PT0gcHJlZml4KSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gobWVkaWFMaW5lc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoIHx8ICFzZXNzaW9uTGluZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2Vzc2lvbkxpbmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChzZXNzaW9uTGluZXNbal0uc3Vic3RyKDAsIHByZWZpeExlbmd0aCkgPT09IHByZWZpeCkge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNlc3Npb25MaW5lc1tqXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5leHBvcnRzLm1saW5lID0gZnVuY3Rpb24gKGxpbmUpIHtcbiAgICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICAgIHZhciBwYXJzZWQgPSB7XG4gICAgICAgIG1lZGlhOiBwYXJ0c1swXSxcbiAgICAgICAgcG9ydDogcGFydHNbMV0sXG4gICAgICAgIHByb3RvOiBwYXJ0c1syXSxcbiAgICAgICAgZm9ybWF0czogW11cbiAgICB9O1xuICAgIGZvciAodmFyIGkgPSAzOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBhcnRzW2ldKSB7XG4gICAgICAgICAgICBwYXJzZWQuZm9ybWF0cy5wdXNoKHBhcnRzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkO1xufTtcblxuZXhwb3J0cy5ydHBtYXAgPSBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gICAgdmFyIHBhcnNlZCA9IHtcbiAgICAgICAgaWQ6IHBhcnRzLnNoaWZ0KClcbiAgICB9O1xuXG4gICAgcGFydHMgPSBwYXJ0c1swXS5zcGxpdCgnLycpO1xuXG4gICAgcGFyc2VkLm5hbWUgPSBwYXJ0c1swXTtcbiAgICBwYXJzZWQuY2xvY2tyYXRlID0gcGFydHNbMV07XG4gICAgcGFyc2VkLmNoYW5uZWxzID0gcGFydHMubGVuZ3RoID09IDMgPyBwYXJ0c1syXSA6ICcxJztcbiAgICByZXR1cm4gcGFyc2VkO1xufTtcblxuZXhwb3J0cy5zY3RwbWFwID0gZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAvLyBiYXNlZCBvbiAtMDUgZHJhZnRcbiAgICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigxMCkuc3BsaXQoJyAnKTtcbiAgICB2YXIgcGFyc2VkID0ge1xuICAgICAgICBudW1iZXI6IHBhcnRzLnNoaWZ0KCksXG4gICAgICAgIHByb3RvY29sOiBwYXJ0cy5zaGlmdCgpLFxuICAgICAgICBzdHJlYW1zOiBwYXJ0cy5zaGlmdCgpXG4gICAgfTtcbiAgICByZXR1cm4gcGFyc2VkO1xufTtcblxuXG5leHBvcnRzLmZtdHAgPSBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBrdiwga2V5LCB2YWx1ZTtcbiAgICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCc7Jyk7XG4gICAgdmFyIHBhcnNlZCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAga3YgPSBwYXJ0c1tpXS5zcGxpdCgnPScpO1xuICAgICAgICBrZXkgPSBrdlswXS50cmltKCk7XG4gICAgICAgIHZhbHVlID0ga3ZbMV07XG4gICAgICAgIGlmIChrZXkgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKHtrZXk6IGtleSwgdmFsdWU6IHZhbHVlfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5KSB7XG4gICAgICAgICAgICBwYXJzZWQucHVzaCh7a2V5OiAnJywgdmFsdWU6IGtleX0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWQ7XG59O1xuXG5leHBvcnRzLmNyeXB0byA9IGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgICB2YXIgcGFyc2VkID0ge1xuICAgICAgICB0YWc6IHBhcnRzWzBdLFxuICAgICAgICBjaXBoZXJTdWl0ZTogcGFydHNbMV0sXG4gICAgICAgIGtleVBhcmFtczogcGFydHNbMl0sXG4gICAgICAgIHNlc3Npb25QYXJhbXM6IHBhcnRzLnNsaWNlKDMpLmpvaW4oJyAnKVxuICAgIH07XG4gICAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmV4cG9ydHMuZmluZ2VycHJpbnQgPSBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGhhc2g6IHBhcnRzWzBdLFxuICAgICAgICB2YWx1ZTogcGFydHNbMV1cbiAgICB9O1xufTtcblxuZXhwb3J0cy5leHRtYXAgPSBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gICAgdmFyIHBhcnNlZCA9IHt9O1xuXG4gICAgdmFyIGlkcGFydCA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgdmFyIHNwID0gaWRwYXJ0LmluZGV4T2YoJy8nKTtcbiAgICBpZiAoc3AgPj0gMCkge1xuICAgICAgICBwYXJzZWQuaWQgPSBpZHBhcnQuc3Vic3RyKDAsIHNwKTtcbiAgICAgICAgcGFyc2VkLnNlbmRlcnMgPSBpZHBhcnQuc3Vic3RyKHNwICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkLmlkID0gaWRwYXJ0O1xuICAgICAgICBwYXJzZWQuc2VuZGVycyA9ICdzZW5kcmVjdic7XG4gICAgfVxuXG4gICAgcGFyc2VkLnVyaSA9IHBhcnRzLnNoaWZ0KCkgfHwgJyc7XG5cbiAgICByZXR1cm4gcGFyc2VkO1xufTtcblxuZXhwb3J0cy5ydGNwZmIgPSBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDEwKS5zcGxpdCgnICcpO1xuICAgIHZhciBwYXJzZWQgPSB7fTtcbiAgICBwYXJzZWQuaWQgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIHBhcnNlZC50eXBlID0gcGFydHMuc2hpZnQoKTtcbiAgICBpZiAocGFyc2VkLnR5cGUgPT09ICd0cnItaW50Jykge1xuICAgICAgICBwYXJzZWQudmFsdWUgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZC5zdWJ0eXBlID0gcGFydHMuc2hpZnQoKSB8fCAnJztcbiAgICB9XG4gICAgcGFyc2VkLnBhcmFtZXRlcnMgPSBwYXJ0cztcbiAgICByZXR1cm4gcGFyc2VkO1xufTtcblxuZXhwb3J0cy5jYW5kaWRhdGUgPSBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBwYXJ0cztcbiAgICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xuICAgICAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEyKS5zcGxpdCgnICcpO1xuICAgIH0gZWxzZSB7IC8vIG5vIGE9Y2FuZGlkYXRlXG4gICAgICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTApLnNwbGl0KCcgJyk7XG4gICAgfVxuXG4gICAgdmFyIGNhbmRpZGF0ZSA9IHtcbiAgICAgICAgZm91bmRhdGlvbjogcGFydHNbMF0sXG4gICAgICAgIGNvbXBvbmVudDogcGFydHNbMV0sXG4gICAgICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBwcmlvcml0eTogcGFydHNbM10sXG4gICAgICAgIGlwOiBwYXJ0c1s0XSxcbiAgICAgICAgcG9ydDogcGFydHNbNV0sXG4gICAgICAgIC8vIHNraXAgcGFydHNbNl0gPT0gJ3R5cCdcbiAgICAgICAgdHlwZTogcGFydHNbN10sXG4gICAgICAgIGdlbmVyYXRpb246ICcwJ1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGlmIChwYXJ0c1tpXSA9PT0gJ3JhZGRyJykge1xuICAgICAgICAgICAgY2FuZGlkYXRlLnJlbEFkZHIgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV0gPT09ICdycG9ydCcpIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5yZWxQb3J0ID0gcGFydHNbaSArIDFdO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSAnZ2VuZXJhdGlvbicpIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5nZW5lcmF0aW9uID0gcGFydHNbaSArIDFdO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSAndGNwdHlwZScpIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZS50Y3BUeXBlID0gcGFydHNbaSArIDFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuZGlkYXRlLm5ldHdvcmsgPSAnMSc7XG5cbiAgICByZXR1cm4gY2FuZGlkYXRlO1xufTtcblxuZXhwb3J0cy5zb3VyY2VHcm91cHMgPSBmdW5jdGlvbiAobGluZXMpIHtcbiAgICB2YXIgcGFyc2VkID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydHMgPSBsaW5lc1tpXS5zdWJzdHIoMTMpLnNwbGl0KCcgJyk7XG4gICAgICAgIHBhcnNlZC5wdXNoKHtcbiAgICAgICAgICAgIHNlbWFudGljczogcGFydHMuc2hpZnQoKSxcbiAgICAgICAgICAgIHNvdXJjZXM6IHBhcnRzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkO1xufTtcblxuZXhwb3J0cy5zb3VyY2VzID0gZnVuY3Rpb24gKGxpbmVzKSB7XG4gICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTU3NlxuICAgIHZhciBwYXJzZWQgPSBbXTtcbiAgICB2YXIgc291cmNlcyA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRzID0gbGluZXNbaV0uc3Vic3RyKDcpLnNwbGl0KCcgJyk7XG4gICAgICAgIHZhciBzc3JjID0gcGFydHMuc2hpZnQoKTtcblxuICAgICAgICBpZiAoIXNvdXJjZXNbc3NyY10pIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSB7XG4gICAgICAgICAgICAgICAgc3NyYzogc3NyYyxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhcnNlZC5wdXNoKHNvdXJjZSk7XG5cbiAgICAgICAgICAgIC8vIEtlZXAgYW4gaW5kZXhcbiAgICAgICAgICAgIHNvdXJjZXNbc3NyY10gPSBzb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cyA9IHBhcnRzLmpvaW4oJyAnKS5zcGxpdCgnOicpO1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gcGFydHMuc2hpZnQoKTtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpIHx8IG51bGw7XG5cbiAgICAgICAgc291cmNlc1tzc3JjXS5wYXJhbWV0ZXJzLnB1c2goe1xuICAgICAgICAgICAga2V5OiBhdHRyaWJ1dGUsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmV4cG9ydHMuZ3JvdXBzID0gZnVuY3Rpb24gKGxpbmVzKSB7XG4gICAgLy8gaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNTg4OFxuICAgIHZhciBwYXJzZWQgPSBbXTtcbiAgICB2YXIgcGFydHM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJ0cyA9IGxpbmVzW2ldLnN1YnN0cig4KS5zcGxpdCgnICcpO1xuICAgICAgICBwYXJzZWQucHVzaCh7XG4gICAgICAgICAgICBzZW1hbnRpY3M6IHBhcnRzLnNoaWZ0KCksXG4gICAgICAgICAgICBjb250ZW50czogcGFydHNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWQ7XG59O1xuXG5leHBvcnRzLmJhbmR3aWR0aCA9IGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMikuc3BsaXQoJzonKTtcbiAgICB2YXIgcGFyc2VkID0ge307XG4gICAgcGFyc2VkLnR5cGUgPSBwYXJ0cy5zaGlmdCgpO1xuICAgIHBhcnNlZC5iYW5kd2lkdGggPSBwYXJ0cy5zaGlmdCgpO1xuICAgIHJldHVybiBwYXJzZWQ7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdGlhdG9yOiB7XG4gICAgICAgIGluY29taW5nOiB7XG4gICAgICAgICAgICBpbml0aWF0b3I6ICdyZWN2b25seScsXG4gICAgICAgICAgICByZXNwb25kZXI6ICdzZW5kb25seScsXG4gICAgICAgICAgICBib3RoOiAnc2VuZHJlY3YnLFxuICAgICAgICAgICAgbm9uZTogJ2luYWN0aXZlJyxcbiAgICAgICAgICAgIHJlY3Zvbmx5OiAnaW5pdGlhdG9yJyxcbiAgICAgICAgICAgIHNlbmRvbmx5OiAncmVzcG9uZGVyJyxcbiAgICAgICAgICAgIHNlbmRyZWN2OiAnYm90aCcsXG4gICAgICAgICAgICBpbmFjdGl2ZTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgIG91dGdvaW5nOiB7XG4gICAgICAgICAgICBpbml0aWF0b3I6ICdzZW5kb25seScsXG4gICAgICAgICAgICByZXNwb25kZXI6ICdyZWN2b25seScsXG4gICAgICAgICAgICBib3RoOiAnc2VuZHJlY3YnLFxuICAgICAgICAgICAgbm9uZTogJ2luYWN0aXZlJyxcbiAgICAgICAgICAgIHJlY3Zvbmx5OiAncmVzcG9uZGVyJyxcbiAgICAgICAgICAgIHNlbmRvbmx5OiAnaW5pdGlhdG9yJyxcbiAgICAgICAgICAgIHNlbmRyZWN2OiAnYm90aCcsXG4gICAgICAgICAgICBpbmFjdGl2ZTogJ25vbmUnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlc3BvbmRlcjoge1xuICAgICAgICBpbmNvbWluZzoge1xuICAgICAgICAgICAgaW5pdGlhdG9yOiAnc2VuZG9ubHknLFxuICAgICAgICAgICAgcmVzcG9uZGVyOiAncmVjdm9ubHknLFxuICAgICAgICAgICAgYm90aDogJ3NlbmRyZWN2JyxcbiAgICAgICAgICAgIG5vbmU6ICdpbmFjdGl2ZScsXG4gICAgICAgICAgICByZWN2b25seTogJ3Jlc3BvbmRlcicsXG4gICAgICAgICAgICBzZW5kb25seTogJ2luaXRpYXRvcicsXG4gICAgICAgICAgICBzZW5kcmVjdjogJ2JvdGgnLFxuICAgICAgICAgICAgaW5hY3RpdmU6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICBvdXRnb2luZzoge1xuICAgICAgICAgICAgaW5pdGlhdG9yOiAncmVjdm9ubHknLFxuICAgICAgICAgICAgcmVzcG9uZGVyOiAnc2VuZG9ubHknLFxuICAgICAgICAgICAgYm90aDogJ3NlbmRyZWN2JyxcbiAgICAgICAgICAgIG5vbmU6ICdpbmFjdGl2ZScsXG4gICAgICAgICAgICByZWN2b25seTogJ2luaXRpYXRvcicsXG4gICAgICAgICAgICBzZW5kb25seTogJ3Jlc3BvbmRlcicsXG4gICAgICAgICAgICBzZW5kcmVjdjogJ2JvdGgnLFxuICAgICAgICAgICAgaW5hY3RpdmU6ICdub25lJ1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsInZhciBTRU5ERVJTID0gcmVxdWlyZSgnLi9zZW5kZXJzJyk7XG52YXIgcGFyc2VycyA9IHJlcXVpcmUoJy4vcGFyc2VycycpO1xudmFyIGlkQ291bnRlciA9IE1hdGgucmFuZG9tKCk7XG5cblxuZXhwb3J0cy5fc2V0SWRDb3VudGVyID0gZnVuY3Rpb24gKGNvdW50ZXIpIHtcbiAgICBpZENvdW50ZXIgPSBjb3VudGVyO1xufTtcblxuZXhwb3J0cy50b1Nlc3Npb25KU09OID0gZnVuY3Rpb24gKHNkcCwgb3B0cykge1xuICAgIHZhciBpO1xuICAgIHZhciBjcmVhdG9ycyA9IG9wdHMuY3JlYXRvcnMgfHwgW107XG4gICAgdmFyIHJvbGUgPSBvcHRzLnJvbGUgfHwgJ2luaXRpYXRvcic7XG4gICAgdmFyIGRpcmVjdGlvbiA9IG9wdHMuZGlyZWN0aW9uIHx8ICdvdXRnb2luZyc7XG5cblxuICAgIC8vIERpdmlkZSB0aGUgU0RQIGludG8gc2Vzc2lvbiBhbmQgbWVkaWEgc2VjdGlvbnMuXG4gICAgdmFyIG1lZGlhID0gc2RwLnNwbGl0KCdcXHJcXG5tPScpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBtZWRpYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBtZWRpYVtpXSA9ICdtPScgKyBtZWRpYVtpXTtcbiAgICAgICAgaWYgKGkgIT09IG1lZGlhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIG1lZGlhW2ldICs9ICdcXHJcXG4nO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzZXNzaW9uID0gbWVkaWEuc2hpZnQoKSArICdcXHJcXG4nO1xuICAgIHZhciBzZXNzaW9uTGluZXMgPSBwYXJzZXJzLmxpbmVzKHNlc3Npb24pO1xuICAgIHZhciBwYXJzZWQgPSB7fTtcblxuICAgIHZhciBjb250ZW50cyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtZWRpYS5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZW50cy5wdXNoKGV4cG9ydHMudG9NZWRpYUpTT04obWVkaWFbaV0sIHNlc3Npb24sIHtcbiAgICAgICAgICAgIHJvbGU6IHJvbGUsXG4gICAgICAgICAgICBkaXJlY3Rpb246IGRpcmVjdGlvbixcbiAgICAgICAgICAgIGNyZWF0b3I6IGNyZWF0b3JzW2ldIHx8ICdpbml0aWF0b3InXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgcGFyc2VkLmNvbnRlbnRzID0gY29udGVudHM7XG5cbiAgICB2YXIgZ3JvdXBMaW5lcyA9IHBhcnNlcnMuZmluZExpbmVzKCdhPWdyb3VwOicsIHNlc3Npb25MaW5lcyk7XG4gICAgaWYgKGdyb3VwTGluZXMubGVuZ3RoKSB7XG4gICAgICAgIHBhcnNlZC5ncm91cHMgPSBwYXJzZXJzLmdyb3Vwcyhncm91cExpbmVzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkO1xufTtcblxuZXhwb3J0cy50b01lZGlhSlNPTiA9IGZ1bmN0aW9uIChtZWRpYSwgc2Vzc2lvbiwgb3B0cykge1xuICAgIHZhciBjcmVhdG9yID0gb3B0cy5jcmVhdG9yIHx8ICdpbml0aWF0b3InO1xuICAgIHZhciByb2xlID0gb3B0cy5yb2xlIHx8ICdpbml0aWF0b3InO1xuICAgIHZhciBkaXJlY3Rpb24gPSBvcHRzLmRpcmVjdGlvbiB8fCAnb3V0Z29pbmcnO1xuXG4gICAgdmFyIGxpbmVzID0gcGFyc2Vycy5saW5lcyhtZWRpYSk7XG4gICAgdmFyIHNlc3Npb25MaW5lcyA9IHBhcnNlcnMubGluZXMoc2Vzc2lvbik7XG4gICAgdmFyIG1saW5lID0gcGFyc2Vycy5tbGluZShsaW5lc1swXSk7XG5cbiAgICB2YXIgY29udGVudCA9IHtcbiAgICAgICAgY3JlYXRvcjogY3JlYXRvcixcbiAgICAgICAgbmFtZTogbWxpbmUubWVkaWEsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICBkZXNjVHlwZTogJ3J0cCcsXG4gICAgICAgICAgICBtZWRpYTogbWxpbmUubWVkaWEsXG4gICAgICAgICAgICBwYXlsb2FkczogW10sXG4gICAgICAgICAgICBlbmNyeXB0aW9uOiBbXSxcbiAgICAgICAgICAgIGZlZWRiYWNrOiBbXSxcbiAgICAgICAgICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdXG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zcG9ydDoge1xuICAgICAgICAgICAgdHJhbnNUeXBlOiAnaWNlVWRwJyxcbiAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtdLFxuICAgICAgICAgICAgZmluZ2VycHJpbnRzOiBbXVxuICAgICAgICB9XG4gICAgfTtcbiAgICBpZiAobWxpbmUubWVkaWEgPT0gJ2FwcGxpY2F0aW9uJykge1xuICAgICAgICAvLyBGSVhNRTogdGhlIGRlc2NyaXB0aW9uIGlzIG1vc3QgbGlrZWx5IHRvIGJlIGluZGVwZW5kZW50XG4gICAgICAgIC8vIG9mIHRoZSBTRFAgYW5kIHNob3VsZCBiZSBwcm9jZXNzZWQgYnkgb3RoZXIgcGFydHMgb2YgdGhlIGxpYnJhcnlcbiAgICAgICAgY29udGVudC5kZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIGRlc2NUeXBlOiAnZGF0YWNoYW5uZWwnXG4gICAgICAgIH07XG4gICAgICAgIGNvbnRlbnQudHJhbnNwb3J0LnNjdHAgPSBbXTtcbiAgICB9XG4gICAgdmFyIGRlc2MgPSBjb250ZW50LmRlc2NyaXB0aW9uO1xuICAgIHZhciB0cmFucyA9IGNvbnRlbnQudHJhbnNwb3J0O1xuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIG1pZCwgdXNlIHRoYXQgZm9yIHRoZSBjb250ZW50IG5hbWUgaW5zdGVhZC5cbiAgICB2YXIgbWlkID0gcGFyc2Vycy5maW5kTGluZSgnYT1taWQ6JywgbGluZXMpO1xuICAgIGlmIChtaWQpIHtcbiAgICAgICAgY29udGVudC5uYW1lID0gbWlkLnN1YnN0cig2KTtcbiAgICB9XG5cbiAgICBpZiAocGFyc2Vycy5maW5kTGluZSgnYT1zZW5kcmVjdicsIGxpbmVzLCBzZXNzaW9uTGluZXMpKSB7XG4gICAgICAgIGNvbnRlbnQuc2VuZGVycyA9ICdib3RoJztcbiAgICB9IGVsc2UgaWYgKHBhcnNlcnMuZmluZExpbmUoJ2E9c2VuZG9ubHknLCBsaW5lcywgc2Vzc2lvbkxpbmVzKSkge1xuICAgICAgICBjb250ZW50LnNlbmRlcnMgPSBTRU5ERVJTW3JvbGVdW2RpcmVjdGlvbl0uc2VuZG9ubHk7XG4gICAgfSBlbHNlIGlmIChwYXJzZXJzLmZpbmRMaW5lKCdhPXJlY3Zvbmx5JywgbGluZXMsIHNlc3Npb25MaW5lcykpIHtcbiAgICAgICAgY29udGVudC5zZW5kZXJzID0gU0VOREVSU1tyb2xlXVtkaXJlY3Rpb25dLnJlY3Zvbmx5O1xuICAgIH0gZWxzZSBpZiAocGFyc2Vycy5maW5kTGluZSgnYT1pbmFjdGl2ZScsIGxpbmVzLCBzZXNzaW9uTGluZXMpKSB7XG4gICAgICAgIGNvbnRlbnQuc2VuZGVycyA9ICdub25lJztcbiAgICB9XG5cbiAgICBpZiAoZGVzYy5kZXNjVHlwZSA9PSAncnRwJykge1xuICAgICAgICB2YXIgYmFuZHdpZHRoID0gcGFyc2Vycy5maW5kTGluZSgnYj0nLCBsaW5lcyk7XG4gICAgICAgIGlmIChiYW5kd2lkdGgpIHtcbiAgICAgICAgICAgIGRlc2MuYmFuZHdpZHRoID0gcGFyc2Vycy5iYW5kd2lkdGgoYmFuZHdpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzc3JjID0gcGFyc2Vycy5maW5kTGluZSgnYT1zc3JjOicsIGxpbmVzKTtcbiAgICAgICAgaWYgKHNzcmMpIHtcbiAgICAgICAgICAgIGRlc2Muc3NyYyA9IHNzcmMuc3Vic3RyKDcpLnNwbGl0KCcgJylbMF07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcnRwbWFwTGluZXMgPSBwYXJzZXJzLmZpbmRMaW5lcygnYT1ydHBtYXA6JywgbGluZXMpO1xuICAgICAgICBydHBtYXBMaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICB2YXIgcGF5bG9hZCA9IHBhcnNlcnMucnRwbWFwKGxpbmUpO1xuICAgICAgICAgICAgcGF5bG9hZC5wYXJhbWV0ZXJzID0gW107XG4gICAgICAgICAgICBwYXlsb2FkLmZlZWRiYWNrID0gW107XG5cbiAgICAgICAgICAgIHZhciBmbXRwTGluZXMgPSBwYXJzZXJzLmZpbmRMaW5lcygnYT1mbXRwOicgKyBwYXlsb2FkLmlkLCBsaW5lcyk7XG4gICAgICAgICAgICAvLyBUaGVyZSBzaG91bGQgb25seSBiZSBvbmUgZm10cCBsaW5lIHBlciBwYXlsb2FkXG4gICAgICAgICAgICBmbXRwTGluZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgICAgIHBheWxvYWQucGFyYW1ldGVycyA9IHBhcnNlcnMuZm10cChsaW5lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgZmJMaW5lcyA9IHBhcnNlcnMuZmluZExpbmVzKCdhPXJ0Y3AtZmI6JyArIHBheWxvYWQuaWQsIGxpbmVzKTtcbiAgICAgICAgICAgIGZiTGluZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgICAgIHBheWxvYWQuZmVlZGJhY2sucHVzaChwYXJzZXJzLnJ0Y3BmYihsaW5lKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVzYy5wYXlsb2Fkcy5wdXNoKHBheWxvYWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgY3J5cHRvTGluZXMgPSBwYXJzZXJzLmZpbmRMaW5lcygnYT1jcnlwdG86JywgbGluZXMsIHNlc3Npb25MaW5lcyk7XG4gICAgICAgIGNyeXB0b0xpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgIGRlc2MuZW5jcnlwdGlvbi5wdXNoKHBhcnNlcnMuY3J5cHRvKGxpbmUpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBhcnNlcnMuZmluZExpbmUoJ2E9cnRjcC1tdXgnLCBsaW5lcykpIHtcbiAgICAgICAgICAgIGRlc2MubXV4ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmYkxpbmVzID0gcGFyc2Vycy5maW5kTGluZXMoJ2E9cnRjcC1mYjoqJywgbGluZXMpO1xuICAgICAgICBmYkxpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgIGRlc2MuZmVlZGJhY2sucHVzaChwYXJzZXJzLnJ0Y3BmYihsaW5lKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBleHRMaW5lcyA9IHBhcnNlcnMuZmluZExpbmVzKCdhPWV4dG1hcDonLCBsaW5lcyk7XG4gICAgICAgIGV4dExpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBleHQgPSBwYXJzZXJzLmV4dG1hcChsaW5lKTtcblxuICAgICAgICAgICAgZXh0LnNlbmRlcnMgPSBTRU5ERVJTW3JvbGVdW2RpcmVjdGlvbl1bZXh0LnNlbmRlcnNdO1xuXG4gICAgICAgICAgICBkZXNjLmhlYWRlckV4dGVuc2lvbnMucHVzaChleHQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgc3NyY0dyb3VwTGluZXMgPSBwYXJzZXJzLmZpbmRMaW5lcygnYT1zc3JjLWdyb3VwOicsIGxpbmVzKTtcbiAgICAgICAgZGVzYy5zb3VyY2VHcm91cHMgPSBwYXJzZXJzLnNvdXJjZUdyb3Vwcyhzc3JjR3JvdXBMaW5lcyB8fCBbXSk7XG5cbiAgICAgICAgdmFyIHNzcmNMaW5lcyA9IHBhcnNlcnMuZmluZExpbmVzKCdhPXNzcmM6JywgbGluZXMpO1xuICAgICAgICBkZXNjLnNvdXJjZXMgPSBwYXJzZXJzLnNvdXJjZXMoc3NyY0xpbmVzIHx8IFtdKTtcblxuICAgICAgICBpZiAocGFyc2Vycy5maW5kTGluZSgnYT14LWdvb2dsZS1mbGFnOmNvbmZlcmVuY2UnLCBsaW5lcywgc2Vzc2lvbkxpbmVzKSkge1xuICAgICAgICAgICAgZGVzYy5nb29nQ29uZmVyZW5jZUZsYWcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJhbnNwb3J0IHNwZWNpZmljIGF0dHJpYnV0ZXNcbiAgICB2YXIgZmluZ2VycHJpbnRMaW5lcyA9IHBhcnNlcnMuZmluZExpbmVzKCdhPWZpbmdlcnByaW50OicsIGxpbmVzLCBzZXNzaW9uTGluZXMpO1xuICAgIHZhciBzZXR1cCA9IHBhcnNlcnMuZmluZExpbmUoJ2E9c2V0dXA6JywgbGluZXMsIHNlc3Npb25MaW5lcyk7XG4gICAgZmluZ2VycHJpbnRMaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIHZhciBmcCA9IHBhcnNlcnMuZmluZ2VycHJpbnQobGluZSk7XG4gICAgICAgIGlmIChzZXR1cCkge1xuICAgICAgICAgICAgZnAuc2V0dXAgPSBzZXR1cC5zdWJzdHIoOCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnMuZmluZ2VycHJpbnRzLnB1c2goZnApO1xuICAgIH0pO1xuXG4gICAgdmFyIHVmcmFnTGluZSA9IHBhcnNlcnMuZmluZExpbmUoJ2E9aWNlLXVmcmFnOicsIGxpbmVzLCBzZXNzaW9uTGluZXMpO1xuICAgIHZhciBwd2RMaW5lID0gcGFyc2Vycy5maW5kTGluZSgnYT1pY2UtcHdkOicsIGxpbmVzLCBzZXNzaW9uTGluZXMpO1xuICAgIGlmICh1ZnJhZ0xpbmUgJiYgcHdkTGluZSkge1xuICAgICAgICB0cmFucy51ZnJhZyA9IHVmcmFnTGluZS5zdWJzdHIoMTIpO1xuICAgICAgICB0cmFucy5wd2QgPSBwd2RMaW5lLnN1YnN0cigxMCk7XG4gICAgICAgIHRyYW5zLmNhbmRpZGF0ZXMgPSBbXTtcblxuICAgICAgICB2YXIgY2FuZGlkYXRlTGluZXMgPSBwYXJzZXJzLmZpbmRMaW5lcygnYT1jYW5kaWRhdGU6JywgbGluZXMsIHNlc3Npb25MaW5lcyk7XG4gICAgICAgIGNhbmRpZGF0ZUxpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgIHRyYW5zLmNhbmRpZGF0ZXMucHVzaChleHBvcnRzLnRvQ2FuZGlkYXRlSlNPTihsaW5lKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkZXNjLmRlc2NUeXBlID09ICdkYXRhY2hhbm5lbCcpIHtcbiAgICAgICAgdmFyIHNjdHBtYXBMaW5lcyA9IHBhcnNlcnMuZmluZExpbmVzKCdhPXNjdHBtYXA6JywgbGluZXMpO1xuICAgICAgICBzY3RwbWFwTGluZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgdmFyIHNjdHAgPSBwYXJzZXJzLnNjdHBtYXAobGluZSk7XG4gICAgICAgICAgICB0cmFucy5zY3RwLnB1c2goc2N0cCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjb250ZW50O1xufTtcblxuZXhwb3J0cy50b0NhbmRpZGF0ZUpTT04gPSBmdW5jdGlvbiAobGluZSkge1xuICAgIHZhciBjYW5kaWRhdGUgPSBwYXJzZXJzLmNhbmRpZGF0ZShsaW5lLnNwbGl0KCdcXHJcXG4nKVswXSk7XG4gICAgY2FuZGlkYXRlLmlkID0gKGlkQ291bnRlcisrKS50b1N0cmluZygzNikuc3Vic3RyKDAsIDEyKTtcbiAgICByZXR1cm4gY2FuZGlkYXRlO1xufTtcbiIsInZhciBTRU5ERVJTID0gcmVxdWlyZSgnLi9zZW5kZXJzJyk7XG5cblxuZXhwb3J0cy50b1Nlc3Npb25TRFAgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgb3B0cykge1xuICAgIHZhciByb2xlID0gb3B0cy5yb2xlIHx8ICdpbml0aWF0b3InO1xuICAgIHZhciBkaXJlY3Rpb24gPSBvcHRzLmRpcmVjdGlvbiB8fCAnb3V0Z29pbmcnO1xuICAgIHZhciBzaWQgPSBvcHRzLnNpZCB8fCBzZXNzaW9uLnNpZCB8fCBEYXRlLm5vdygpO1xuICAgIHZhciB0aW1lID0gb3B0cy50aW1lIHx8IERhdGUubm93KCk7XG5cbiAgICB2YXIgc2RwID0gW1xuICAgICAgICAndj0wJyxcbiAgICAgICAgJ289LSAnICsgc2lkICsgJyAnICsgdGltZSArICcgSU4gSVA0IDAuMC4wLjAnLFxuICAgICAgICAncz0tJyxcbiAgICAgICAgJ3Q9MCAwJ1xuICAgIF07XG5cbiAgICB2YXIgZ3JvdXBzID0gc2Vzc2lvbi5ncm91cHMgfHwgW107XG4gICAgZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKGdyb3VwKSB7XG4gICAgICAgIHNkcC5wdXNoKCdhPWdyb3VwOicgKyBncm91cC5zZW1hbnRpY3MgKyAnICcgKyBncm91cC5jb250ZW50cy5qb2luKCcgJykpO1xuICAgIH0pO1xuXG4gICAgdmFyIGNvbnRlbnRzID0gc2Vzc2lvbi5jb250ZW50cyB8fCBbXTtcbiAgICBjb250ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIHNkcC5wdXNoKGV4cG9ydHMudG9NZWRpYVNEUChjb250ZW50LCBvcHRzKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2RwLmpvaW4oJ1xcclxcbicpICsgJ1xcclxcbic7XG59O1xuXG5leHBvcnRzLnRvTWVkaWFTRFAgPSBmdW5jdGlvbiAoY29udGVudCwgb3B0cykge1xuICAgIHZhciBzZHAgPSBbXTtcblxuICAgIHZhciByb2xlID0gb3B0cy5yb2xlIHx8ICdpbml0aWF0b3InO1xuICAgIHZhciBkaXJlY3Rpb24gPSBvcHRzLmRpcmVjdGlvbiB8fCAnb3V0Z29pbmcnO1xuXG4gICAgdmFyIGRlc2MgPSBjb250ZW50LmRlc2NyaXB0aW9uO1xuICAgIHZhciB0cmFuc3BvcnQgPSBjb250ZW50LnRyYW5zcG9ydDtcbiAgICB2YXIgcGF5bG9hZHMgPSBkZXNjLnBheWxvYWRzIHx8IFtdO1xuICAgIHZhciBmaW5nZXJwcmludHMgPSAodHJhbnNwb3J0ICYmIHRyYW5zcG9ydC5maW5nZXJwcmludHMpIHx8IFtdO1xuXG4gICAgdmFyIG1saW5lID0gW107XG4gICAgaWYgKGRlc2MuZGVzY1R5cGUgPT0gJ2RhdGFjaGFubmVsJykge1xuICAgICAgICBtbGluZS5wdXNoKCdhcHBsaWNhdGlvbicpO1xuICAgICAgICBtbGluZS5wdXNoKCcxJyk7XG4gICAgICAgIG1saW5lLnB1c2goJ0RUTFMvU0NUUCcpO1xuICAgICAgICBpZiAodHJhbnNwb3J0LnNjdHApIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zY3RwLmZvckVhY2goZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgICAgIG1saW5lLnB1c2gobWFwLm51bWJlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG1saW5lLnB1c2goZGVzYy5tZWRpYSk7XG4gICAgICAgIG1saW5lLnB1c2goJzEnKTtcbiAgICAgICAgaWYgKChkZXNjLmVuY3J5cHRpb24gJiYgZGVzYy5lbmNyeXB0aW9uLmxlbmd0aCA+IDApIHx8IChmaW5nZXJwcmludHMubGVuZ3RoID4gMCkpIHtcbiAgICAgICAgICAgIG1saW5lLnB1c2goJ1JUUC9TQVZQRicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWxpbmUucHVzaCgnUlRQL0FWUEYnKTtcbiAgICAgICAgfVxuICAgICAgICBwYXlsb2Fkcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgICAgICAgICBtbGluZS5wdXNoKHBheWxvYWQuaWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHNkcC5wdXNoKCdtPScgKyBtbGluZS5qb2luKCcgJykpO1xuXG4gICAgc2RwLnB1c2goJ2M9SU4gSVA0IDAuMC4wLjAnKTtcbiAgICBpZiAoZGVzYy5iYW5kd2lkdGggJiYgZGVzYy5iYW5kd2lkdGgudHlwZSAmJiBkZXNjLmJhbmR3aWR0aC5iYW5kd2lkdGgpIHtcbiAgICAgICAgc2RwLnB1c2goJ2I9JyArIGRlc2MuYmFuZHdpZHRoLnR5cGUgKyAnOicgKyBkZXNjLmJhbmR3aWR0aC5iYW5kd2lkdGgpO1xuICAgIH1cbiAgICBpZiAoZGVzYy5kZXNjVHlwZSA9PSAncnRwJykge1xuICAgICAgICBzZHAucHVzaCgnYT1ydGNwOjEgSU4gSVA0IDAuMC4wLjAnKTtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNwb3J0KSB7XG4gICAgICAgIGlmICh0cmFuc3BvcnQudWZyYWcpIHtcbiAgICAgICAgICAgIHNkcC5wdXNoKCdhPWljZS11ZnJhZzonICsgdHJhbnNwb3J0LnVmcmFnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNwb3J0LnB3ZCkge1xuICAgICAgICAgICAgc2RwLnB1c2goJ2E9aWNlLXB3ZDonICsgdHJhbnNwb3J0LnB3ZCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHVzaGVkU2V0dXAgPSBmYWxzZTtcbiAgICAgICAgZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24gKGZpbmdlcnByaW50KSB7XG4gICAgICAgICAgICBzZHAucHVzaCgnYT1maW5nZXJwcmludDonICsgZmluZ2VycHJpbnQuaGFzaCArICcgJyArIGZpbmdlcnByaW50LnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChmaW5nZXJwcmludC5zZXR1cCAmJiAhcHVzaGVkU2V0dXApIHtcbiAgICAgICAgICAgICAgICBzZHAucHVzaCgnYT1zZXR1cDonICsgZmluZ2VycHJpbnQuc2V0dXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHJhbnNwb3J0LnNjdHApIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zY3RwLmZvckVhY2goZnVuY3Rpb24gKG1hcCkge1xuICAgICAgICAgICAgICAgIHNkcC5wdXNoKCdhPXNjdHBtYXA6JyArIG1hcC5udW1iZXIgKyAnICcgKyBtYXAucHJvdG9jb2wgKyAnICcgKyBtYXAuc3RyZWFtcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZXNjLmRlc2NUeXBlID09ICdydHAnKSB7XG4gICAgICAgIHNkcC5wdXNoKCdhPScgKyAoU0VOREVSU1tyb2xlXVtkaXJlY3Rpb25dW2NvbnRlbnQuc2VuZGVyc10gfHwgJ3NlbmRyZWN2JykpO1xuICAgIH1cbiAgICBzZHAucHVzaCgnYT1taWQ6JyArIGNvbnRlbnQubmFtZSk7XG5cbiAgICBpZiAoZGVzYy5tdXgpIHtcbiAgICAgICAgc2RwLnB1c2goJ2E9cnRjcC1tdXgnKTtcbiAgICB9XG5cbiAgICB2YXIgZW5jcnlwdGlvbiA9IGRlc2MuZW5jcnlwdGlvbiB8fCBbXTtcbiAgICBlbmNyeXB0aW9uLmZvckVhY2goZnVuY3Rpb24gKGNyeXB0bykge1xuICAgICAgICBzZHAucHVzaCgnYT1jcnlwdG86JyArIGNyeXB0by50YWcgKyAnICcgKyBjcnlwdG8uY2lwaGVyU3VpdGUgKyAnICcgKyBjcnlwdG8ua2V5UGFyYW1zICsgKGNyeXB0by5zZXNzaW9uUGFyYW1zID8gJyAnICsgY3J5cHRvLnNlc3Npb25QYXJhbXMgOiAnJykpO1xuICAgIH0pO1xuICAgIGlmIChkZXNjLmdvb2dDb25mZXJlbmNlRmxhZykge1xuICAgICAgICBzZHAucHVzaCgnYT14LWdvb2dsZS1mbGFnOmNvbmZlcmVuY2UnKTtcbiAgICB9XG5cbiAgICBwYXlsb2Fkcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgICAgIHZhciBydHBtYXAgPSAnYT1ydHBtYXA6JyArIHBheWxvYWQuaWQgKyAnICcgKyBwYXlsb2FkLm5hbWUgKyAnLycgKyBwYXlsb2FkLmNsb2NrcmF0ZTtcbiAgICAgICAgaWYgKHBheWxvYWQuY2hhbm5lbHMgJiYgcGF5bG9hZC5jaGFubmVscyAhPSAnMScpIHtcbiAgICAgICAgICAgIHJ0cG1hcCArPSAnLycgKyBwYXlsb2FkLmNoYW5uZWxzO1xuICAgICAgICB9XG4gICAgICAgIHNkcC5wdXNoKHJ0cG1hcCk7XG5cbiAgICAgICAgaWYgKHBheWxvYWQucGFyYW1ldGVycyAmJiBwYXlsb2FkLnBhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgZm10cCA9IFsnYT1mbXRwOicgKyBwYXlsb2FkLmlkXTtcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzID0gW107XG4gICAgICAgICAgICBwYXlsb2FkLnBhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLnB1c2goKHBhcmFtLmtleSA/IHBhcmFtLmtleSArICc9JyA6ICcnKSArIHBhcmFtLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm10cC5wdXNoKHBhcmFtZXRlcnMuam9pbignOycpKTtcbiAgICAgICAgICAgIHNkcC5wdXNoKGZtdHAuam9pbignICcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXlsb2FkLmZlZWRiYWNrKSB7XG4gICAgICAgICAgICBwYXlsb2FkLmZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24gKGZiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZiLnR5cGUgPT09ICd0cnItaW50Jykge1xuICAgICAgICAgICAgICAgICAgICBzZHAucHVzaCgnYT1ydGNwLWZiOicgKyBwYXlsb2FkLmlkICsgJyB0cnItaW50ICcgKyAoZmIudmFsdWUgPyBmYi52YWx1ZSA6ICcwJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNkcC5wdXNoKCdhPXJ0Y3AtZmI6JyArIHBheWxvYWQuaWQgKyAnICcgKyBmYi50eXBlICsgKGZiLnN1YnR5cGUgPyAnICcgKyBmYi5zdWJ0eXBlIDogJycpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGRlc2MuZmVlZGJhY2spIHtcbiAgICAgICAgZGVzYy5mZWVkYmFjay5mb3JFYWNoKGZ1bmN0aW9uIChmYikge1xuICAgICAgICAgICAgaWYgKGZiLnR5cGUgPT09ICd0cnItaW50Jykge1xuICAgICAgICAgICAgICAgIHNkcC5wdXNoKCdhPXJ0Y3AtZmI6KiB0cnItaW50ICcgKyAoZmIudmFsdWUgPyBmYi52YWx1ZSA6ICcwJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZHAucHVzaCgnYT1ydGNwLWZiOiogJyArIGZiLnR5cGUgKyAoZmIuc3VidHlwZSA/ICcgJyArIGZiLnN1YnR5cGUgOiAnJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgaGRyRXh0cyA9IGRlc2MuaGVhZGVyRXh0ZW5zaW9ucyB8fCBbXTtcbiAgICBoZHJFeHRzLmZvckVhY2goZnVuY3Rpb24gKGhkcikge1xuICAgICAgICBzZHAucHVzaCgnYT1leHRtYXA6JyArIGhkci5pZCArIChoZHIuc2VuZGVycyA/ICcvJyArIFNFTkRFUlNbcm9sZV1bZGlyZWN0aW9uXVtoZHIuc2VuZGVyc10gOiAnJykgKyAnICcgKyBoZHIudXJpKTtcbiAgICB9KTtcblxuICAgIHZhciBzc3JjR3JvdXBzID0gZGVzYy5zb3VyY2VHcm91cHMgfHwgW107XG4gICAgc3NyY0dyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChzc3JjR3JvdXApIHtcbiAgICAgICAgc2RwLnB1c2goJ2E9c3NyYy1ncm91cDonICsgc3NyY0dyb3VwLnNlbWFudGljcyArICcgJyArIHNzcmNHcm91cC5zb3VyY2VzLmpvaW4oJyAnKSk7XG4gICAgfSk7XG5cbiAgICB2YXIgc3NyY3MgPSBkZXNjLnNvdXJjZXMgfHwgW107XG4gICAgc3NyY3MuZm9yRWFjaChmdW5jdGlvbiAoc3NyYykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNzcmMucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhcmFtID0gc3NyYy5wYXJhbWV0ZXJzW2ldO1xuICAgICAgICAgICAgc2RwLnB1c2goJ2E9c3NyYzonICsgKHNzcmMuc3NyYyB8fCBkZXNjLnNzcmMpICsgJyAnICsgcGFyYW0ua2V5ICsgKHBhcmFtLnZhbHVlID8gKCc6JyArIHBhcmFtLnZhbHVlKSA6ICcnKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBjYW5kaWRhdGVzID0gdHJhbnNwb3J0LmNhbmRpZGF0ZXMgfHwgW107XG4gICAgY2FuZGlkYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChjYW5kaWRhdGUpIHtcbiAgICAgICAgc2RwLnB1c2goZXhwb3J0cy50b0NhbmRpZGF0ZVNEUChjYW5kaWRhdGUpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzZHAuam9pbignXFxyXFxuJyk7XG59O1xuXG5leHBvcnRzLnRvQ2FuZGlkYXRlU0RQID0gZnVuY3Rpb24gKGNhbmRpZGF0ZSkge1xuICAgIHZhciBzZHAgPSBbXTtcblxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5mb3VuZGF0aW9uKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucHJvdG9jb2wudG9VcHBlckNhc2UoKSk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnByaW9yaXR5KTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUuaXApO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5wb3J0KTtcblxuICAgIHZhciB0eXBlID0gY2FuZGlkYXRlLnR5cGU7XG4gICAgc2RwLnB1c2goJ3R5cCcpO1xuICAgIHNkcC5wdXNoKHR5cGUpO1xuICAgIGlmICh0eXBlID09PSAnc3JmbHgnIHx8IHR5cGUgPT09ICdwcmZseCcgfHwgdHlwZSA9PT0gJ3JlbGF5Jykge1xuICAgICAgICBpZiAoY2FuZGlkYXRlLnJlbEFkZHIgJiYgY2FuZGlkYXRlLnJlbFBvcnQpIHtcbiAgICAgICAgICAgIHNkcC5wdXNoKCdyYWRkcicpO1xuICAgICAgICAgICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbEFkZHIpO1xuICAgICAgICAgICAgc2RwLnB1c2goJ3Jwb3J0Jyk7XG4gICAgICAgICAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsUG9ydCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNhbmRpZGF0ZS50Y3BUeXBlICYmIGNhbmRpZGF0ZS5wcm90b2NvbC50b1VwcGVyQ2FzZSgpID09ICdUQ1AnKSB7XG4gICAgICAgIHNkcC5wdXNoKCd0Y3B0eXBlJyk7XG4gICAgICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcbiAgICB9XG5cbiAgICBzZHAucHVzaCgnZ2VuZXJhdGlvbicpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5nZW5lcmF0aW9uIHx8ICcwJyk7XG5cbiAgICAvLyBGSVhNRTogYXBwYXJlbnRseSB0aGlzIGlzIHdyb25nIHBlciBzcGVjXG4gICAgLy8gYnV0IHRoZW4sIHdlIG5lZWQgdGhpcyB3aGVuIGFjdHVhbGx5IHB1dHRpbmcgdGhpcyBpbnRvXG4gICAgLy8gU0RQIHNvIGl0J3MgZ29pbmcgdG8gc3RheS5cbiAgICAvLyBkZWNpc2lvbiBuZWVkcyB0byBiZSByZXZpc2l0ZWQgd2hlbiBicm93c2VycyBkb250XG4gICAgLy8gYWNjZXB0IHRoaXMgYW55IGxvbmdlclxuICAgIHJldHVybiAnYT1jYW5kaWRhdGU6JyArIHNkcC5qb2luKCcgJyk7XG59O1xuIiwiLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL0VTVE9TL3N0cm9waGUuamluZ2xlL1xuLy8gYWRkcyB3aWxkZW1pdHRlciBzdXBwb3J0XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciB3ZWJydGMgPSByZXF1aXJlKCd3ZWJydGNzdXBwb3J0Jyk7XG52YXIgV2lsZEVtaXR0ZXIgPSByZXF1aXJlKCd3aWxkZW1pdHRlcicpO1xuXG5mdW5jdGlvbiBkdW1wU0RQKGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBkdW1wU3RyZWFtKHN0cmVhbSkge1xuICAgIHZhciBpbmZvID0ge1xuICAgICAgICBsYWJlbDogc3RyZWFtLmlkLFxuICAgIH07XG4gICAgaWYgKHN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICBpbmZvLmF1ZGlvID0gc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubWFwKGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrLmlkO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICBpbmZvLnZpZGVvID0gc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubWFwKGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrLmlkO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG59XG5cbmZ1bmN0aW9uIFRyYWNlYWJsZVBlZXJDb25uZWN0aW9uKGNvbmZpZywgY29uc3RyYWludHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgV2lsZEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMucGVlcmNvbm5lY3Rpb24gPSBuZXcgd2VicnRjLlBlZXJDb25uZWN0aW9uKGNvbmZpZywgY29uc3RyYWludHMpO1xuXG4gICAgdGhpcy50cmFjZSA9IGZ1bmN0aW9uICh3aGF0LCBpbmZvKSB7XG4gICAgICAgIHNlbGYuZW1pdCgnUGVlckNvbm5lY3Rpb25UcmFjZScsIHtcbiAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCksXG4gICAgICAgICAgICB0eXBlOiB3aGF0LFxuICAgICAgICAgICAgdmFsdWU6IGluZm8gfHwgXCJcIlxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XG4gICAgdGhpcy5wZWVyY29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLnRyYWNlKCdvbmljZWNhbmRpZGF0ZScsIGV2ZW50LmNhbmRpZGF0ZSk7XG4gICAgICAgIGlmIChzZWxmLm9uaWNlY2FuZGlkYXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzZWxmLm9uaWNlY2FuZGlkYXRlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vbmFkZHN0cmVhbSA9IG51bGw7XG4gICAgdGhpcy5wZWVyY29ubmVjdGlvbi5vbmFkZHN0cmVhbSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLnRyYWNlKCdvbmFkZHN0cmVhbScsIGR1bXBTdHJlYW0oZXZlbnQuc3RyZWFtKSk7XG4gICAgICAgIGlmIChzZWxmLm9uYWRkc3RyZWFtICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzZWxmLm9uYWRkc3RyZWFtKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vbnJlbW92ZXN0cmVhbSA9IG51bGw7XG4gICAgdGhpcy5wZWVyY29ubmVjdGlvbi5vbnJlbW92ZXN0cmVhbSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLnRyYWNlKCdvbnJlbW92ZXN0cmVhbScsIGR1bXBTdHJlYW0oZXZlbnQuc3RyZWFtKSk7XG4gICAgICAgIGlmIChzZWxmLm9ucmVtb3Zlc3RyZWFtICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzZWxmLm9ucmVtb3Zlc3RyZWFtKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgICB0aGlzLnBlZXJjb25uZWN0aW9uLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2VsZi50cmFjZSgnb25zaWduYWxpbmdzdGF0ZWNoYW5nZScsIHNlbGYuc2lnbmFsaW5nU3RhdGUpO1xuICAgICAgICBpZiAoc2VsZi5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzZWxmLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICB0aGlzLnBlZXJjb25uZWN0aW9uLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNlbGYudHJhY2UoJ29uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgc2VsZi5pY2VDb25uZWN0aW9uU3RhdGUpO1xuICAgICAgICBpZiAoc2VsZi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2VsZi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XG4gICAgdGhpcy5wZWVyY29ubmVjdGlvbi5vbm5lZ290aWF0aW9ubmVlZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNlbGYudHJhY2UoJ29ubmVnb3RpYXRpb25uZWVkZWQnKTtcbiAgICAgICAgaWYgKHNlbGYub25uZWdvdGlhdGlvbm5lZWRlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2VsZi5vbm5lZ290aWF0aW9ubmVlZGVkKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgc2VsZi5vbmRhdGFjaGFubmVsID0gbnVsbDtcbiAgICB0aGlzLnBlZXJjb25uZWN0aW9uLm9uZGF0YWNoYW5uZWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2VsZi50cmFjZSgnb25kYXRhY2hhbm5lbCcsIGV2ZW50KTtcbiAgICAgICAgaWYgKHNlbGYub25kYXRhY2hhbm5lbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc2VsZi5vbmRhdGFjaGFubmVsKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5nZXRMb2NhbFN0cmVhbXMgPSB0aGlzLnBlZXJjb25uZWN0aW9uLmdldExvY2FsU3RyZWFtcy5iaW5kKHRoaXMucGVlcmNvbm5lY3Rpb24pO1xuICAgIHRoaXMuZ2V0UmVtb3RlU3RyZWFtcyA9IHRoaXMucGVlcmNvbm5lY3Rpb24uZ2V0UmVtb3RlU3RyZWFtcy5iaW5kKHRoaXMucGVlcmNvbm5lY3Rpb24pO1xufVxuXG51dGlsLmluaGVyaXRzKFRyYWNlYWJsZVBlZXJDb25uZWN0aW9uLCBXaWxkRW1pdHRlcik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdzaWduYWxpbmdTdGF0ZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVlcmNvbm5lY3Rpb24uc2lnbmFsaW5nU3RhdGU7XG4gICAgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdpY2VDb25uZWN0aW9uU3RhdGUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBlZXJjb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZTtcbiAgICB9XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYWNlYWJsZVBlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBlZXJjb25uZWN0aW9uLmxvY2FsRGVzY3JpcHRpb247XG4gICAgfVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdyZW1vdGVEZXNjcmlwdGlvbicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVlcmNvbm5lY3Rpb24ucmVtb3RlRGVzY3JpcHRpb247XG4gICAgfVxufSk7XG5cblRyYWNlYWJsZVBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgdGhpcy50cmFjZSgnYWRkU3RyZWFtJywgZHVtcFN0cmVhbShzdHJlYW0pKTtcbiAgICB0aGlzLnBlZXJjb25uZWN0aW9uLmFkZFN0cmVhbShzdHJlYW0pO1xufTtcblxuVHJhY2VhYmxlUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICB0aGlzLnRyYWNlKCdyZW1vdmVTdHJlYW0nLCBkdW1wU3RyZWFtKHN0cmVhbSkpO1xuICAgIHRoaXMucGVlcmNvbm5lY3Rpb24ucmVtb3ZlU3RyZWFtKHN0cmVhbSk7XG59O1xuXG5UcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbiAobGFiZWwsIG9wdHMpIHtcbiAgICB0aGlzLnRyYWNlKCdjcmVhdGVEYXRhQ2hhbm5lbCcsIGxhYmVsLCBvcHRzKTtcbiAgICByZXR1cm4gdGhpcy5wZWVyY29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbChsYWJlbCwgb3B0cyk7XG59O1xuXG5UcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uIChkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50cmFjZSgnc2V0TG9jYWxEZXNjcmlwdGlvbicsIGR1bXBTRFAoZGVzY3JpcHRpb24pKTtcbiAgICB0aGlzLnBlZXJjb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oZGVzY3JpcHRpb24sXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudHJhY2UoJ3NldExvY2FsRGVzY3JpcHRpb25PblN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzZWxmLnRyYWNlKCdzZXRMb2NhbERlc2NyaXB0aW9uT25GYWlsdXJlJywgZXJyKTtcbiAgICAgICAgICAgIGZhaWx1cmVDYWxsYmFjayhlcnIpO1xuICAgICAgICB9XG4gICAgKTtcbn07XG5cblRyYWNlYWJsZVBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uIChkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50cmFjZSgnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCBkdW1wU0RQKGRlc2NyaXB0aW9uKSk7XG4gICAgdGhpcy5wZWVyY29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihkZXNjcmlwdGlvbixcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi50cmFjZSgnc2V0UmVtb3RlRGVzY3JpcHRpb25PblN1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjaygpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzZWxmLnRyYWNlKCdzZXRSZW1vdGVEZXNjcmlwdGlvbk9uRmFpbHVyZScsIGVycik7XG4gICAgICAgICAgICBmYWlsdXJlQ2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuICAgICk7XG59O1xuXG5UcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy50cmFjZSgnc3RvcCcpO1xuICAgIGlmICh0aGlzLnN0YXRzaW50ZXJ2YWwgIT09IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5zdGF0c2ludGVydmFsKTtcbiAgICAgICAgdGhpcy5zdGF0c2ludGVydmFsID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMucGVlcmNvbm5lY3Rpb24uc2lnbmFsaW5nU3RhdGUgIT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhpcy5wZWVyY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgIH1cbn07XG5cblRyYWNlYWJsZVBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uIChzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaywgY29uc3RyYWludHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50cmFjZSgnY3JlYXRlT2ZmZXInLCBjb25zdHJhaW50cyk7XG4gICAgdGhpcy5wZWVyY29ubmVjdGlvbi5jcmVhdGVPZmZlcihcbiAgICAgICAgZnVuY3Rpb24gKG9mZmVyKSB7XG4gICAgICAgICAgICBzZWxmLnRyYWNlKCdjcmVhdGVPZmZlck9uU3VjY2VzcycsIGR1bXBTRFAob2ZmZXIpKTtcbiAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayhvZmZlcik7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHNlbGYudHJhY2UoJ2NyZWF0ZU9mZmVyT25GYWlsdXJlJywgZXJyKTtcbiAgICAgICAgICAgIGZhaWx1cmVDYWxsYmFjayhlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBjb25zdHJhaW50c1xuICAgICk7XG59O1xuXG5UcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24gKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrLCBjb25zdHJhaW50cykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnRyYWNlKCdjcmVhdGVBbnN3ZXInLCBjb25zdHJhaW50cyk7XG4gICAgdGhpcy5wZWVyY29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoXG4gICAgICAgIGZ1bmN0aW9uIChhbnN3ZXIpIHtcbiAgICAgICAgICAgIHNlbGYudHJhY2UoJ2NyZWF0ZUFuc3dlck9uU3VjY2VzcycsIGR1bXBTRFAoYW5zd2VyKSk7XG4gICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2soYW5zd2VyKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc2VsZi50cmFjZSgnY3JlYXRlQW5zd2VyT25GYWlsdXJlJywgZXJyKTtcbiAgICAgICAgICAgIGZhaWx1cmVDYWxsYmFjayhlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBjb25zdHJhaW50c1xuICAgICk7XG59O1xuXG5UcmFjZWFibGVQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24gKGNhbmRpZGF0ZSwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50cmFjZSgnYWRkSWNlQ2FuZGlkYXRlJywgY2FuZGlkYXRlKTtcbiAgICB0aGlzLnBlZXJjb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShjYW5kaWRhdGUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vc2VsZi50cmFjZSgnYWRkSWNlQ2FuZGlkYXRlT25TdWNjZXNzJyk7XG4gICAgICAgICAgICBpZiAoc3VjY2Vzc0NhbGxiYWNrKSBzdWNjZXNzQ2FsbGJhY2soKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc2VsZi50cmFjZSgnYWRkSWNlQ2FuZGlkYXRlT25GYWlsdXJlJywgZXJyKTtcbiAgICAgICAgICAgIGlmIChmYWlsdXJlQ2FsbGJhY2spIGZhaWx1cmVDYWxsYmFjayhlcnIpO1xuICAgICAgICB9XG4gICAgKTtcbn07XG5cblRyYWNlYWJsZVBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZXJyYmFjaykge1xuICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XG4gICAgICAgIHRoaXMucGVlcmNvbm5lY3Rpb24uZ2V0U3RhdHMobnVsbCwgY2FsbGJhY2ssIGVycmJhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGVlcmNvbm5lY3Rpb24uZ2V0U3RhdHMoY2FsbGJhY2spO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhY2VhYmxlUGVlckNvbm5lY3Rpb247XG4iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjguMlxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxNSBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXJcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxuICAgIG5hdGl2ZUtleXMgICAgICAgICA9IE9iamVjdC5rZXlzLFxuICAgIG5hdGl2ZUJpbmQgICAgICAgICA9IEZ1bmNQcm90by5iaW5kLFxuICAgIG5hdGl2ZUNyZWF0ZSAgICAgICA9IE9iamVjdC5jcmVhdGU7XG5cbiAgLy8gTmFrZWQgZnVuY3Rpb24gcmVmZXJlbmNlIGZvciBzdXJyb2dhdGUtcHJvdG90eXBlLXN3YXBwaW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuOC4yJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXJcbiAgLy8gaWRlbnRpdHksIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgY29udGV4dCwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVBc3NpZ25lciA9IGZ1bmN0aW9uKGtleXNGdW5jLCB1bmRlZmluZWRPbmx5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF0sXG4gICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoIXVuZGVmaW5lZE9ubHkgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXG4gIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcbiAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xuICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEhlbHBlciBmb3IgY29sbGVjdGlvbiBtZXRob2RzIHRvIGRldGVybWluZSB3aGV0aGVyIGEgY29sbGVjdGlvblxuICAvLyBzaG91bGQgYmUgaXRlcmF0ZWQgYXMgYW4gYXJyYXkgb3IgYXMgYW4gb2JqZWN0XG4gIC8vIFJlbGF0ZWQ6IGh0dHA6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoXG4gIHZhciBNQVhfQVJSQVlfSU5ERVggPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuICB2YXIgaXNBcnJheUxpa2UgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24gJiYgY29sbGVjdGlvbi5sZW5ndGg7XG4gICAgcmV0dXJuIHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgJiYgbGVuZ3RoID49IDAgJiYgbGVuZ3RoIDw9IE1BWF9BUlJBWV9JTkRFWDtcbiAgfTtcblxuICAvLyBDb2xsZWN0aW9uIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFRoZSBjb3JuZXJzdG9uZSwgYW4gYGVhY2hgIGltcGxlbWVudGF0aW9uLCBha2EgYGZvckVhY2hgLlxuICAvLyBIYW5kbGVzIHJhdyBvYmplY3RzIGluIGFkZGl0aW9uIHRvIGFycmF5LWxpa2VzLiBUcmVhdHMgYWxsXG4gIC8vIHNwYXJzZSBhcnJheS1saWtlcyBhcyBpZiB0aGV5IHdlcmUgZGVuc2UuXG4gIF8uZWFjaCA9IF8uZm9yRWFjaCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBpLCBsZW5ndGg7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcbiAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpbaV0sIGksIG9iaik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdGVlKG9ialtrZXlzW2ldXSwga2V5c1tpXSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdGVlIHRvIGVhY2ggZWxlbWVudC5cbiAgXy5tYXAgPSBfLmNvbGxlY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIHJlc3VsdHMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICByZXN1bHRzW2luZGV4XSA9IGl0ZXJhdGVlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgcmVkdWNpbmcgZnVuY3Rpb24gaXRlcmF0aW5nIGxlZnQgb3IgcmlnaHQuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJlZHVjZShkaXIpIHtcbiAgICAvLyBPcHRpbWl6ZWQgaXRlcmF0b3IgZnVuY3Rpb24gYXMgdXNpbmcgYXJndW1lbnRzLmxlbmd0aFxuICAgIC8vIGluIHRoZSBtYWluIGZ1bmN0aW9uIHdpbGwgZGVvcHRpbWl6ZSB0aGUsIHNlZSAjMTk5MS5cbiAgICBmdW5jdGlvbiBpdGVyYXRvcihvYmosIGl0ZXJhdGVlLCBtZW1vLCBrZXlzLCBpbmRleCwgbGVuZ3RoKSB7XG4gICAgICBmb3IgKDsgaW5kZXggPj0gMCAmJiBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gZGlyKSB7XG4gICAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICAgIG1lbW8gPSBpdGVyYXRlZShtZW1vLCBvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgbWVtbywgY29udGV4dCkge1xuICAgICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCA0KTtcbiAgICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgICAgaW5kZXggPSBkaXIgPiAwID8gMCA6IGxlbmd0aCAtIDE7XG4gICAgICAvLyBEZXRlcm1pbmUgdGhlIGluaXRpYWwgdmFsdWUgaWYgbm9uZSBpcyBwcm92aWRlZC5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBtZW1vID0gb2JqW2tleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4XTtcbiAgICAgICAgaW5kZXggKz0gZGlyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGl0ZXJhdG9yKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGtleXMsIGluZGV4LCBsZW5ndGgpO1xuICAgIH07XG4gIH1cblxuICAvLyAqKlJlZHVjZSoqIGJ1aWxkcyB1cCBhIHNpbmdsZSByZXN1bHQgZnJvbSBhIGxpc3Qgb2YgdmFsdWVzLCBha2EgYGluamVjdGAsXG4gIC8vIG9yIGBmb2xkbGAuXG4gIF8ucmVkdWNlID0gXy5mb2xkbCA9IF8uaW5qZWN0ID0gY3JlYXRlUmVkdWNlKDEpO1xuXG4gIC8vIFRoZSByaWdodC1hc3NvY2lhdGl2ZSB2ZXJzaW9uIG9mIHJlZHVjZSwgYWxzbyBrbm93biBhcyBgZm9sZHJgLlxuICBfLnJlZHVjZVJpZ2h0ID0gXy5mb2xkciA9IGNyZWF0ZVJlZHVjZSgtMSk7XG5cbiAgLy8gUmV0dXJuIHRoZSBmaXJzdCB2YWx1ZSB3aGljaCBwYXNzZXMgYSB0cnV0aCB0ZXN0LiBBbGlhc2VkIGFzIGBkZXRlY3RgLlxuICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIGtleTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkge1xuICAgICAga2V5ID0gXy5maW5kSW5kZXgob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBfLmZpbmRLZXkob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAoa2V5ICE9PSB2b2lkIDAgJiYga2V5ICE9PSAtMSkgcmV0dXJuIG9ialtrZXldO1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgcGFzcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYHNlbGVjdGAuXG4gIF8uZmlsdGVyID0gXy5zZWxlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBsaXN0KSkgcmVzdWx0cy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBmb3Igd2hpY2ggYSB0cnV0aCB0ZXN0IGZhaWxzLlxuICBfLnJlamVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5uZWdhdGUoY2IocHJlZGljYXRlKSksIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBhbGxgLlxuICBfLmV2ZXJ5ID0gXy5hbGwgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmICghcHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIG9iamVjdCBtYXRjaGVzIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYW55YC5cbiAgXy5zb21lID0gXy5hbnkgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiB0aGUgYXJyYXkgb3Igb2JqZWN0IGNvbnRhaW5zIGEgZ2l2ZW4gdmFsdWUgKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCB0YXJnZXQsIGZyb21JbmRleCkge1xuICAgIGlmICghaXNBcnJheUxpa2Uob2JqKSkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICByZXR1cm4gXy5pbmRleE9mKG9iaiwgdGFyZ2V0LCB0eXBlb2YgZnJvbUluZGV4ID09ICdudW1iZXInICYmIGZyb21JbmRleCkgPj0gMDtcbiAgfTtcblxuICAvLyBJbnZva2UgYSBtZXRob2QgKHdpdGggYXJndW1lbnRzKSBvbiBldmVyeSBpdGVtIGluIGEgY29sbGVjdGlvbi5cbiAgXy5pbnZva2UgPSBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBpc0Z1bmMgPSBfLmlzRnVuY3Rpb24obWV0aG9kKTtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGZ1bmMgPSBpc0Z1bmMgPyBtZXRob2QgOiB2YWx1ZVttZXRob2RdO1xuICAgICAgcmV0dXJuIGZ1bmMgPT0gbnVsbCA/IGZ1bmMgOiBmdW5jLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBtYXBgOiBmZXRjaGluZyBhIHByb3BlcnR5LlxuICBfLnBsdWNrID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBfLnByb3BlcnR5KGtleSkpO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbHRlcmA6IHNlbGVjdGluZyBvbmx5IG9iamVjdHNcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy53aGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaW5kYDogZ2V0dGluZyB0aGUgZmlyc3Qgb2JqZWN0XG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uZmluZFdoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xuICAgIHJldHVybiBfLmZpbmQob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG1heGltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXG4gIF8ubWF4ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSAtSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IC1JbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA+IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkID4gbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSAtSW5maW5pdHkgJiYgcmVzdWx0ID09PSAtSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtaW5pbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1pbiA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IEluZmluaXR5LFxuICAgICAgICB2YWx1ZSwgY29tcHV0ZWQ7XG4gICAgaWYgKGl0ZXJhdGVlID09IG51bGwgJiYgb2JqICE9IG51bGwpIHtcbiAgICAgIG9iaiA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IG9ialtpXTtcbiAgICAgICAgaWYgKHZhbHVlIDwgcmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgICAgICBpZiAoY29tcHV0ZWQgPCBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IEluZmluaXR5ICYmIHJlc3VsdCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gU2h1ZmZsZSBhIGNvbGxlY3Rpb24sIHVzaW5nIHRoZSBtb2Rlcm4gdmVyc2lvbiBvZiB0aGVcbiAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxuICBfLnNodWZmbGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgc2V0ID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IHNldC5sZW5ndGg7XG4gICAgdmFyIHNodWZmbGVkID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIHJhbmQ7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByYW5kID0gXy5yYW5kb20oMCwgaW5kZXgpO1xuICAgICAgaWYgKHJhbmQgIT09IGluZGV4KSBzaHVmZmxlZFtpbmRleF0gPSBzaHVmZmxlZFtyYW5kXTtcbiAgICAgIHNodWZmbGVkW3JhbmRdID0gc2V0W2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIHNodWZmbGVkO1xuICB9O1xuXG4gIC8vIFNhbXBsZSAqKm4qKiByYW5kb20gdmFsdWVzIGZyb20gYSBjb2xsZWN0aW9uLlxuICAvLyBJZiAqKm4qKiBpcyBub3Qgc3BlY2lmaWVkLCByZXR1cm5zIGEgc2luZ2xlIHJhbmRvbSBlbGVtZW50LlxuICAvLyBUaGUgaW50ZXJuYWwgYGd1YXJkYCBhcmd1bWVudCBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBtYXBgLlxuICBfLnNhbXBsZSA9IGZ1bmN0aW9uKG9iaiwgbiwgZ3VhcmQpIHtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSB7XG4gICAgICBpZiAoIWlzQXJyYXlMaWtlKG9iaikpIG9iaiA9IF8udmFsdWVzKG9iaik7XG4gICAgICByZXR1cm4gb2JqW18ucmFuZG9tKG9iai5sZW5ndGggLSAxKV07XG4gICAgfVxuICAgIHJldHVybiBfLnNodWZmbGUob2JqKS5zbGljZSgwLCBNYXRoLm1heCgwLCBuKSk7XG4gIH07XG5cbiAgLy8gU29ydCB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uIHByb2R1Y2VkIGJ5IGFuIGl0ZXJhdGVlLlxuICBfLnNvcnRCeSA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gXy5wbHVjayhfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIGNyaXRlcmlhOiBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpXG4gICAgICB9O1xuICAgIH0pLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYTtcbiAgICAgIHZhciBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICBpZiAoYSAhPT0gYikge1xuICAgICAgICBpZiAoYSA+IGIgfHwgYSA9PT0gdm9pZCAwKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgPCBiIHx8IGIgPT09IHZvaWQgMCkgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcbiAgICB9KSwgJ3ZhbHVlJyk7XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdXNlZCBmb3IgYWdncmVnYXRlIFwiZ3JvdXAgYnlcIiBvcGVyYXRpb25zLlxuICB2YXIgZ3JvdXAgPSBmdW5jdGlvbihiZWhhdmlvcikge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICB2YXIga2V5ID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBvYmopO1xuICAgICAgICBiZWhhdmlvcihyZXN1bHQsIHZhbHVlLCBrZXkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxuICAvLyB0byBncm91cCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNyaXRlcmlvbi5cbiAgXy5ncm91cEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSk7IGVsc2UgcmVzdWx0W2tleV0gPSBbdmFsdWVdO1xuICB9KTtcblxuICAvLyBJbmRleGVzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24sIHNpbWlsYXIgdG8gYGdyb3VwQnlgLCBidXQgZm9yXG4gIC8vIHdoZW4geW91IGtub3cgdGhhdCB5b3VyIGluZGV4IHZhbHVlcyB3aWxsIGJlIHVuaXF1ZS5cbiAgXy5pbmRleEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgfSk7XG5cbiAgLy8gQ291bnRzIGluc3RhbmNlcyBvZiBhbiBvYmplY3QgdGhhdCBncm91cCBieSBhIGNlcnRhaW4gY3JpdGVyaW9uLiBQYXNzXG4gIC8vIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGUgdG8gY291bnQgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAvLyBjcml0ZXJpb24uXG4gIF8uY291bnRCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldKys7IGVsc2UgcmVzdWx0W2tleV0gPSAxO1xuICB9KTtcblxuICAvLyBTYWZlbHkgY3JlYXRlIGEgcmVhbCwgbGl2ZSBhcnJheSBmcm9tIGFueXRoaW5nIGl0ZXJhYmxlLlxuICBfLnRvQXJyYXkgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIFtdO1xuICAgIGlmIChfLmlzQXJyYXkob2JqKSkgcmV0dXJuIHNsaWNlLmNhbGwob2JqKTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkgcmV0dXJuIF8ubWFwKG9iaiwgXy5pZGVudGl0eSk7XG4gICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxuICBfLnNpemUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xuICAgIHJldHVybiBpc0FycmF5TGlrZShvYmopID8gb2JqLmxlbmd0aCA6IF8ua2V5cyhvYmopLmxlbmd0aDtcbiAgfTtcblxuICAvLyBTcGxpdCBhIGNvbGxlY3Rpb24gaW50byB0d28gYXJyYXlzOiBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIHNhdGlzZnkgdGhlIGdpdmVuXG4gIC8vIHByZWRpY2F0ZSwgYW5kIG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgZG8gbm90IHNhdGlzZnkgdGhlIHByZWRpY2F0ZS5cbiAgXy5wYXJ0aXRpb24gPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIHBhc3MgPSBbXSwgZmFpbCA9IFtdO1xuICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBrZXksIG9iaikge1xuICAgICAgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBvYmopID8gcGFzcyA6IGZhaWwpLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBbcGFzcywgZmFpbF07XG4gIH07XG5cbiAgLy8gQXJyYXkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEdldCB0aGUgZmlyc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgZmlyc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBBbGlhc2VkIGFzIGBoZWFkYCBhbmQgYHRha2VgLiBUaGUgKipndWFyZCoqIGNoZWNrXG4gIC8vIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5maXJzdCA9IF8uaGVhZCA9IF8udGFrZSA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVswXTtcbiAgICByZXR1cm4gXy5pbml0aWFsKGFycmF5LCBhcnJheS5sZW5ndGggLSBuKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBsYXN0IGVudHJ5IG9mIHRoZSBhcnJheS4gRXNwZWNpYWxseSB1c2VmdWwgb25cbiAgLy8gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gYWxsIHRoZSB2YWx1ZXMgaW5cbiAgLy8gdGhlIGFycmF5LCBleGNsdWRpbmcgdGhlIGxhc3QgTi5cbiAgXy5pbml0aWFsID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIDAsIE1hdGgubWF4KDAsIGFycmF5Lmxlbmd0aCAtIChuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbikpKTtcbiAgfTtcblxuICAvLyBHZXQgdGhlIGxhc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgbGFzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuXG4gIF8ubGFzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gXy5yZXN0KGFycmF5LCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSBuKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgZmlyc3QgZW50cnkgb2YgdGhlIGFycmF5LiBBbGlhc2VkIGFzIGB0YWlsYCBhbmQgYGRyb3BgLlxuICAvLyBFc3BlY2lhbGx5IHVzZWZ1bCBvbiB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyBhbiAqKm4qKiB3aWxsIHJldHVyblxuICAvLyB0aGUgcmVzdCBOIHZhbHVlcyBpbiB0aGUgYXJyYXkuXG4gIF8ucmVzdCA9IF8udGFpbCA9IF8uZHJvcCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCBuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbik7XG4gIH07XG5cbiAgLy8gVHJpbSBvdXQgYWxsIGZhbHN5IHZhbHVlcyBmcm9tIGFuIGFycmF5LlxuICBfLmNvbXBhY3QgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgXy5pZGVudGl0eSk7XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgaW1wbGVtZW50YXRpb24gb2YgYSByZWN1cnNpdmUgYGZsYXR0ZW5gIGZ1bmN0aW9uLlxuICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uKGlucHV0LCBzaGFsbG93LCBzdHJpY3QsIHN0YXJ0SW5kZXgpIHtcbiAgICB2YXIgb3V0cHV0ID0gW10sIGlkeCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0SW5kZXggfHwgMCwgbGVuZ3RoID0gaW5wdXQgJiYgaW5wdXQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGlucHV0W2ldO1xuICAgICAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSAmJiAoXy5pc0FycmF5KHZhbHVlKSB8fCBfLmlzQXJndW1lbnRzKHZhbHVlKSkpIHtcbiAgICAgICAgLy9mbGF0dGVuIGN1cnJlbnQgbGV2ZWwgb2YgYXJyYXkgb3IgYXJndW1lbnRzIG9iamVjdFxuICAgICAgICBpZiAoIXNoYWxsb3cpIHZhbHVlID0gZmxhdHRlbih2YWx1ZSwgc2hhbGxvdywgc3RyaWN0KTtcbiAgICAgICAgdmFyIGogPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIG91dHB1dC5sZW5ndGggKz0gbGVuO1xuICAgICAgICB3aGlsZSAoaiA8IGxlbikge1xuICAgICAgICAgIG91dHB1dFtpZHgrK10gPSB2YWx1ZVtqKytdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFzdHJpY3QpIHtcbiAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIC8vIEZsYXR0ZW4gb3V0IGFuIGFycmF5LCBlaXRoZXIgcmVjdXJzaXZlbHkgKGJ5IGRlZmF1bHQpLCBvciBqdXN0IG9uZSBsZXZlbC5cbiAgXy5mbGF0dGVuID0gZnVuY3Rpb24oYXJyYXksIHNoYWxsb3cpIHtcbiAgICByZXR1cm4gZmxhdHRlbihhcnJheSwgc2hhbGxvdywgZmFsc2UpO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHZlcnNpb24gb2YgdGhlIGFycmF5IHRoYXQgZG9lcyBub3QgY29udGFpbiB0aGUgc3BlY2lmaWVkIHZhbHVlKHMpLlxuICBfLndpdGhvdXQgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHJldHVybiBfLmRpZmZlcmVuY2UoYXJyYXksIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgdGhlIGFycmF5LiBJZiB0aGUgYXJyYXkgaGFzIGFscmVhZHlcbiAgLy8gYmVlbiBzb3J0ZWQsIHlvdSBoYXZlIHRoZSBvcHRpb24gb2YgdXNpbmcgYSBmYXN0ZXIgYWxnb3JpdGhtLlxuICAvLyBBbGlhc2VkIGFzIGB1bmlxdWVgLlxuICBfLnVuaXEgPSBfLnVuaXF1ZSA9IGZ1bmN0aW9uKGFycmF5LCBpc1NvcnRlZCwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaV0sXG4gICAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpLCBhcnJheSkgOiB2YWx1ZTtcbiAgICAgIGlmIChpc1NvcnRlZCkge1xuICAgICAgICBpZiAoIWkgfHwgc2VlbiAhPT0gY29tcHV0ZWQpIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgc2VlbiA9IGNvbXB1dGVkO1xuICAgICAgfSBlbHNlIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoc2VlbiwgY29tcHV0ZWQpKSB7XG4gICAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIV8uY29udGFpbnMocmVzdWx0LCB2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUgdW5pb246IGVhY2ggZGlzdGluY3QgZWxlbWVudCBmcm9tIGFsbCBvZlxuICAvLyB0aGUgcGFzc2VkLWluIGFycmF5cy5cbiAgXy51bmlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuaXEoZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZXZlcnkgaXRlbSBzaGFyZWQgYmV0d2VlbiBhbGwgdGhlXG4gIC8vIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUsIDEpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuemlwKGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gQ29tcGxlbWVudCBvZiBfLnppcC4gVW56aXAgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGdyb3Vwc1xuICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXNcbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCAnbGVuZ3RoJykubGVuZ3RoIHx8IDA7XG4gICAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gXy5wbHVjayhhcnJheSwgaW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIENvbnZlcnRzIGxpc3RzIGludG8gb2JqZWN0cy4gUGFzcyBlaXRoZXIgYSBzaW5nbGUgYXJyYXkgb2YgYFtrZXksIHZhbHVlXWBcbiAgLy8gcGFpcnMsIG9yIHR3byBwYXJhbGxlbCBhcnJheXMgb2YgdGhlIHNhbWUgbGVuZ3RoIC0tIG9uZSBvZiBrZXlzLCBhbmQgb25lIG9mXG4gIC8vIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgXy5vYmplY3QgPSBmdW5jdGlvbihsaXN0LCB2YWx1ZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QgJiYgbGlzdC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW4gaXRlbSBpbiBhbiBhcnJheSxcbiAgLy8gb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cbiAgLy8gSWYgdGhlIGFycmF5IGlzIGxhcmdlIGFuZCBhbHJlYWR5IGluIHNvcnQgb3JkZXIsIHBhc3MgYHRydWVgXG4gIC8vIGZvciAqKmlzU29ydGVkKiogdG8gdXNlIGJpbmFyeSBzZWFyY2guXG4gIF8uaW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBpc1NvcnRlZCkge1xuICAgIHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkgJiYgYXJyYXkubGVuZ3RoO1xuICAgIGlmICh0eXBlb2YgaXNTb3J0ZWQgPT0gJ251bWJlcicpIHtcbiAgICAgIGkgPSBpc1NvcnRlZCA8IDAgPyBNYXRoLm1heCgwLCBsZW5ndGggKyBpc1NvcnRlZCkgOiBpc1NvcnRlZDtcbiAgICB9IGVsc2UgaWYgKGlzU29ydGVkICYmIGxlbmd0aCkge1xuICAgICAgaSA9IF8uc29ydGVkSW5kZXgoYXJyYXksIGl0ZW0pO1xuICAgICAgcmV0dXJuIGFycmF5W2ldID09PSBpdGVtID8gaSA6IC0xO1xuICAgIH1cbiAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xuICAgICAgcmV0dXJuIF8uZmluZEluZGV4KHNsaWNlLmNhbGwoYXJyYXksIGkpLCBfLmlzTmFOKTtcbiAgICB9XG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgaWYgKGFycmF5W2ldID09PSBpdGVtKSByZXR1cm4gaTtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgXy5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBmcm9tKSB7XG4gICAgdmFyIGlkeCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgICBpZiAodHlwZW9mIGZyb20gPT0gJ251bWJlcicpIHtcbiAgICAgIGlkeCA9IGZyb20gPCAwID8gaWR4ICsgZnJvbSArIDEgOiBNYXRoLm1pbihpZHgsIGZyb20gKyAxKTtcbiAgICB9XG4gICAgaWYgKGl0ZW0gIT09IGl0ZW0pIHtcbiAgICAgIHJldHVybiBfLmZpbmRMYXN0SW5kZXgoc2xpY2UuY2FsbChhcnJheSwgMCwgaWR4KSwgXy5pc05hTik7XG4gICAgfVxuICAgIHdoaWxlICgtLWlkeCA+PSAwKSBpZiAoYXJyYXlbaWR4XSA9PT0gaXRlbSkgcmV0dXJuIGlkeDtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgLy8gR2VuZXJhdG9yIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgZmluZEluZGV4IGFuZCBmaW5kTGFzdEluZGV4IGZ1bmN0aW9uc1xuICBmdW5jdGlvbiBjcmVhdGVJbmRleEZpbmRlcihkaXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYXJyYXksIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICAgIHZhciBsZW5ndGggPSBhcnJheSAhPSBudWxsICYmIGFycmF5Lmxlbmd0aDtcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XG4gIF8uZmluZEluZGV4ID0gY3JlYXRlSW5kZXhGaW5kZXIoMSk7XG5cbiAgXy5maW5kTGFzdEluZGV4ID0gY3JlYXRlSW5kZXhGaW5kZXIoLTEpO1xuXG4gIC8vIFVzZSBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gdG8gZmlndXJlIG91dCB0aGUgc21hbGxlc3QgaW5kZXggYXQgd2hpY2hcbiAgLy8gYW4gb2JqZWN0IHNob3VsZCBiZSBpbnNlcnRlZCBzbyBhcyB0byBtYWludGFpbiBvcmRlci4gVXNlcyBiaW5hcnkgc2VhcmNoLlxuICBfLnNvcnRlZEluZGV4ID0gZnVuY3Rpb24oYXJyYXksIG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICB2YXIgdmFsdWUgPSBpdGVyYXRlZShvYmopO1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICB2YXIgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcbiAgICAgIGlmIChpdGVyYXRlZShhcnJheVttaWRdKSA8IHZhbHVlKSBsb3cgPSBtaWQgKyAxOyBlbHNlIGhpZ2ggPSBtaWQ7XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYW4gaW50ZWdlciBBcnJheSBjb250YWluaW5nIGFuIGFyaXRobWV0aWMgcHJvZ3Jlc3Npb24uIEEgcG9ydCBvZlxuICAvLyB0aGUgbmF0aXZlIFB5dGhvbiBgcmFuZ2UoKWAgZnVuY3Rpb24uIFNlZVxuICAvLyBbdGhlIFB5dGhvbiBkb2N1bWVudGF0aW9uXShodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjcmFuZ2UpLlxuICBfLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG4gICAgICBzdG9wID0gc3RhcnQgfHwgMDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgc3RlcCA9IHN0ZXAgfHwgMTtcblxuICAgIHZhciBsZW5ndGggPSBNYXRoLm1heChNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSwgMCk7XG4gICAgdmFyIHJhbmdlID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGxlbmd0aDsgaWR4KyssIHN0YXJ0ICs9IHN0ZXApIHtcbiAgICAgIHJhbmdlW2lkeF0gPSBzdGFydDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2U7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gKGFoZW0pIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gZXhlY3V0ZSBhIGZ1bmN0aW9uIGFzIGEgY29uc3RydWN0b3JcbiAgLy8gb3IgYSBub3JtYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzXG4gIHZhciBleGVjdXRlQm91bmQgPSBmdW5jdGlvbihzb3VyY2VGdW5jLCBib3VuZEZ1bmMsIGNvbnRleHQsIGNhbGxpbmdDb250ZXh0LCBhcmdzKSB7XG4gICAgaWYgKCEoY2FsbGluZ0NvbnRleHQgaW5zdGFuY2VvZiBib3VuZEZ1bmMpKSByZXR1cm4gc291cmNlRnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB2YXIgc2VsZiA9IGJhc2VDcmVhdGUoc291cmNlRnVuYy5wcm90b3R5cGUpO1xuICAgIHZhciByZXN1bHQgPSBzb3VyY2VGdW5jLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgZnVuY3Rpb24gYm91bmQgdG8gYSBnaXZlbiBvYmplY3QgKGFzc2lnbmluZyBgdGhpc2AsIGFuZCBhcmd1bWVudHMsXG4gIC8vIG9wdGlvbmFsbHkpLiBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgRnVuY3Rpb24uYmluZGAgaWZcbiAgLy8gYXZhaWxhYmxlLlxuICBfLmJpbmQgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0KSB7XG4gICAgaWYgKG5hdGl2ZUJpbmQgJiYgZnVuYy5iaW5kID09PSBuYXRpdmVCaW5kKSByZXR1cm4gbmF0aXZlQmluZC5hcHBseShmdW5jLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKGZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb24nKTtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgYm91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBleGVjdXRlQm91bmQoZnVuYywgYm91bmQsIGNvbnRleHQsIHRoaXMsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH07XG4gICAgcmV0dXJuIGJvdW5kO1xuICB9O1xuXG4gIC8vIFBhcnRpYWxseSBhcHBseSBhIGZ1bmN0aW9uIGJ5IGNyZWF0aW5nIGEgdmVyc2lvbiB0aGF0IGhhcyBoYWQgc29tZSBvZiBpdHNcbiAgLy8gYXJndW1lbnRzIHByZS1maWxsZWQsIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGR5bmFtaWMgYHRoaXNgIGNvbnRleHQuIF8gYWN0c1xuICAvLyBhcyBhIHBsYWNlaG9sZGVyLCBhbGxvd2luZyBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzIHRvIGJlIHByZS1maWxsZWQuXG4gIF8ucGFydGlhbCA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICB2YXIgYm91bmRBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gMCwgbGVuZ3RoID0gYm91bmRBcmdzLmxlbmd0aDtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJnc1tpXSA9IGJvdW5kQXJnc1tpXSA9PT0gXyA/IGFyZ3VtZW50c1twb3NpdGlvbisrXSA6IGJvdW5kQXJnc1tpXTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA8IGFyZ3VtZW50cy5sZW5ndGgpIGFyZ3MucHVzaChhcmd1bWVudHNbcG9zaXRpb24rK10pO1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgdGhpcywgdGhpcywgYXJncyk7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gQmluZCBhIG51bWJlciBvZiBhbiBvYmplY3QncyBtZXRob2RzIHRvIHRoYXQgb2JqZWN0LiBSZW1haW5pbmcgYXJndW1lbnRzXG4gIC8vIGFyZSB0aGUgbWV0aG9kIG5hbWVzIHRvIGJlIGJvdW5kLiBVc2VmdWwgZm9yIGVuc3VyaW5nIHRoYXQgYWxsIGNhbGxiYWNrc1xuICAvLyBkZWZpbmVkIG9uIGFuIG9iamVjdCBiZWxvbmcgdG8gaXQuXG4gIF8uYmluZEFsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBpLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLCBrZXk7XG4gICAgaWYgKGxlbmd0aCA8PSAxKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXMnKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIG9ialtrZXldID0gXy5iaW5kKG9ialtrZXldLCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIE1lbW9pemUgYW4gZXhwZW5zaXZlIGZ1bmN0aW9uIGJ5IHN0b3JpbmcgaXRzIHJlc3VsdHMuXG4gIF8ubWVtb2l6ZSA9IGZ1bmN0aW9uKGZ1bmMsIGhhc2hlcikge1xuICAgIHZhciBtZW1vaXplID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgY2FjaGUgPSBtZW1vaXplLmNhY2hlO1xuICAgICAgdmFyIGFkZHJlc3MgPSAnJyArIChoYXNoZXIgPyBoYXNoZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGtleSk7XG4gICAgICBpZiAoIV8uaGFzKGNhY2hlLCBhZGRyZXNzKSkgY2FjaGVbYWRkcmVzc10gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gY2FjaGVbYWRkcmVzc107XG4gICAgfTtcbiAgICBtZW1vaXplLmNhY2hlID0ge307XG4gICAgcmV0dXJuIG1lbW9pemU7XG4gIH07XG5cbiAgLy8gRGVsYXlzIGEgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLCBhbmQgdGhlbiBjYWxsc1xuICAvLyBpdCB3aXRoIHRoZSBhcmd1bWVudHMgc3VwcGxpZWQuXG4gIF8uZGVsYXkgPSBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIHdhaXQpO1xuICB9O1xuXG4gIC8vIERlZmVycyBhIGZ1bmN0aW9uLCBzY2hlZHVsaW5nIGl0IHRvIHJ1biBhZnRlciB0aGUgY3VycmVudCBjYWxsIHN0YWNrIGhhc1xuICAvLyBjbGVhcmVkLlxuICBfLmRlZmVyID0gXy5wYXJ0aWFsKF8uZGVsYXksIF8sIDEpO1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIGF0IG1vc3Qgb25jZVxuICAvLyBkdXJpbmcgYSBnaXZlbiB3aW5kb3cgb2YgdGltZS4gTm9ybWFsbHksIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gd2lsbCBydW5cbiAgLy8gYXMgbXVjaCBhcyBpdCBjYW4sIHdpdGhvdXQgZXZlciBnb2luZyBtb3JlIHRoYW4gb25jZSBwZXIgYHdhaXRgIGR1cmF0aW9uO1xuICAvLyBidXQgaWYgeW91J2QgbGlrZSB0byBkaXNhYmxlIHRoZSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgcGFzc1xuICAvLyBge2xlYWRpbmc6IGZhbHNlfWAuIFRvIGRpc2FibGUgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlLCBkaXR0by5cbiAgXy50aHJvdHRsZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgICB2YXIgcHJldmlvdXMgPSAwO1xuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IF8ubm93KCk7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub3cgPSBfLm5vdygpO1xuICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcbiAgICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICAvLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICBfLmRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGFzdCA9IF8ubm93KCkgLSB0aW1lc3RhbXA7XG5cbiAgICAgIGlmIChsYXN0IDwgd2FpdCAmJiBsYXN0ID49IDApIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdGltZXN0YW1wID0gXy5ub3coKTtcbiAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgaWYgKCF0aW1lb3V0KSB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBmdW5jdGlvbiBwYXNzZWQgYXMgYW4gYXJndW1lbnQgdG8gdGhlIHNlY29uZCxcbiAgLy8gYWxsb3dpbmcgeW91IHRvIGFkanVzdCBhcmd1bWVudHMsIHJ1biBjb2RlIGJlZm9yZSBhbmQgYWZ0ZXIsIGFuZFxuICAvLyBjb25kaXRpb25hbGx5IGV4ZWN1dGUgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxuICBfLndyYXAgPSBmdW5jdGlvbihmdW5jLCB3cmFwcGVyKSB7XG4gICAgcmV0dXJuIF8ucGFydGlhbCh3cmFwcGVyLCBmdW5jKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgbmVnYXRlZCB2ZXJzaW9uIG9mIHRoZSBwYXNzZWQtaW4gcHJlZGljYXRlLlxuICBfLm5lZ2F0ZSA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBpcyB0aGUgY29tcG9zaXRpb24gb2YgYSBsaXN0IG9mIGZ1bmN0aW9ucywgZWFjaFxuICAvLyBjb25zdW1pbmcgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZnVuY3Rpb24gdGhhdCBmb2xsb3dzLlxuICBfLmNvbXBvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgc3RhcnQgPSBhcmdzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGkgPSBzdGFydDtcbiAgICAgIHZhciByZXN1bHQgPSBhcmdzW3N0YXJ0XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgd2hpbGUgKGktLSkgcmVzdWx0ID0gYXJnc1tpXS5jYWxsKHRoaXMsIHJlc3VsdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIG9uIGFuZCBhZnRlciB0aGUgTnRoIGNhbGwuXG4gIF8uYWZ0ZXIgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzIDwgMSkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIHVwIHRvIChidXQgbm90IGluY2x1ZGluZykgdGhlIE50aCBjYWxsLlxuICBfLmJlZm9yZSA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgdmFyIG1lbW87XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPiAwKSB7XG4gICAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZiAodGltZXMgPD0gMSkgZnVuYyA9IG51bGw7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYXQgbW9zdCBvbmUgdGltZSwgbm8gbWF0dGVyIGhvd1xuICAvLyBvZnRlbiB5b3UgY2FsbCBpdC4gVXNlZnVsIGZvciBsYXp5IGluaXRpYWxpemF0aW9uLlxuICBfLm9uY2UgPSBfLnBhcnRpYWwoXy5iZWZvcmUsIDIpO1xuXG4gIC8vIE9iamVjdCBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEtleXMgaW4gSUUgPCA5IHRoYXQgd29uJ3QgYmUgaXRlcmF0ZWQgYnkgYGZvciBrZXkgaW4gLi4uYCBhbmQgdGh1cyBtaXNzZWQuXG4gIHZhciBoYXNFbnVtQnVnID0gIXt0b1N0cmluZzogbnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG4gIHZhciBub25FbnVtZXJhYmxlUHJvcHMgPSBbJ3ZhbHVlT2YnLCAnaXNQcm90b3R5cGVPZicsICd0b1N0cmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2hhc093blByb3BlcnR5JywgJ3RvTG9jYWxlU3RyaW5nJ107XG5cbiAgZnVuY3Rpb24gY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpIHtcbiAgICB2YXIgbm9uRW51bUlkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGg7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gb2JqLmNvbnN0cnVjdG9yO1xuICAgIHZhciBwcm90byA9IChfLmlzRnVuY3Rpb24oY29uc3RydWN0b3IpICYmIGNvbnN0cnVjdG9yLnByb3RvdHlwZSkgfHwgT2JqUHJvdG87XG5cbiAgICAvLyBDb25zdHJ1Y3RvciBpcyBhIHNwZWNpYWwgY2FzZS5cbiAgICB2YXIgcHJvcCA9ICdjb25zdHJ1Y3Rvcic7XG4gICAgaWYgKF8uaGFzKG9iaiwgcHJvcCkgJiYgIV8uY29udGFpbnMoa2V5cywgcHJvcCkpIGtleXMucHVzaChwcm9wKTtcblxuICAgIHdoaWxlIChub25FbnVtSWR4LS0pIHtcbiAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbm9uRW51bUlkeF07XG4gICAgICBpZiAocHJvcCBpbiBvYmogJiYgb2JqW3Byb3BdICE9PSBwcm90b1twcm9wXSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkge1xuICAgICAgICBrZXlzLnB1c2gocHJvcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0cmlldmUgdGhlIG5hbWVzIG9mIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgT2JqZWN0LmtleXNgXG4gIF8ua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XG4gICAgaWYgKG5hdGl2ZUtleXMpIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICAvLyBBaGVtLCBJRSA8IDkuXG4gICAgaWYgKGhhc0VudW1CdWcpIGNvbGxlY3ROb25FbnVtUHJvcHMob2JqLCBrZXlzKTtcbiAgICByZXR1cm4ga2V5cztcbiAgfTtcblxuICAvLyBSZXRyaWV2ZSBhbGwgdGhlIHByb3BlcnR5IG5hbWVzIG9mIGFuIG9iamVjdC5cbiAgXy5hbGxLZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIHRoZSB2YWx1ZXMgb2YgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgXy52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZXNbaV0gPSBvYmpba2V5c1tpXV07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0ZWUgdG8gZWFjaCBlbGVtZW50IG9mIHRoZSBvYmplY3RcbiAgLy8gSW4gY29udHJhc3QgdG8gXy5tYXAgaXQgcmV0dXJucyBhbiBvYmplY3RcbiAgXy5tYXBPYmplY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSAgXy5rZXlzKG9iaiksXG4gICAgICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGgsXG4gICAgICAgICAgcmVzdWx0cyA9IHt9LFxuICAgICAgICAgIGN1cnJlbnRLZXk7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGN1cnJlbnRLZXkgPSBrZXlzW2luZGV4XTtcbiAgICAgICAgcmVzdWx0c1tjdXJyZW50S2V5XSA9IGl0ZXJhdGVlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxuICBfLnBhaXJzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBwYWlyc1tpXSA9IFtrZXlzW2ldLCBvYmpba2V5c1tpXV1dO1xuICAgIH1cbiAgICByZXR1cm4gcGFpcnM7XG4gIH07XG5cbiAgLy8gSW52ZXJ0IHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgYW4gb2JqZWN0LiBUaGUgdmFsdWVzIG11c3QgYmUgc2VyaWFsaXphYmxlLlxuICBfLmludmVydCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRbb2JqW2tleXNbaV1dXSA9IGtleXNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgc29ydGVkIGxpc3Qgb2YgdGhlIGZ1bmN0aW9uIG5hbWVzIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0LlxuICAvLyBBbGlhc2VkIGFzIGBtZXRob2RzYFxuICBfLmZ1bmN0aW9ucyA9IF8ubWV0aG9kcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24ob2JqW2tleV0pKSBuYW1lcy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lcy5zb3J0KCk7XG4gIH07XG5cbiAgLy8gRXh0ZW5kIGEgZ2l2ZW4gb2JqZWN0IHdpdGggYWxsIHRoZSBwcm9wZXJ0aWVzIGluIHBhc3NlZC1pbiBvYmplY3QocykuXG4gIF8uZXh0ZW5kID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzKTtcblxuICAvLyBBc3NpZ25zIGEgZ2l2ZW4gb2JqZWN0IHdpdGggYWxsIHRoZSBvd24gcHJvcGVydGllcyBpbiB0aGUgcGFzc2VkLWluIG9iamVjdChzKVxuICAvLyAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnbilcbiAgXy5leHRlbmRPd24gPSBfLmFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKF8ua2V5cyk7XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3Qga2V5IG9uIGFuIG9iamVjdCB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0XG4gIF8uZmluZEtleSA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopLCBrZXk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtrZXldLCBrZXksIG9iaikpIHJldHVybiBrZXk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ucGljayA9IGZ1bmN0aW9uKG9iamVjdCwgb2l0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9LCBvYmogPSBvYmplY3QsIGl0ZXJhdGVlLCBrZXlzO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKG9pdGVyYXRlZSkpIHtcbiAgICAgIGtleXMgPSBfLmFsbEtleXMob2JqKTtcbiAgICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihvaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXlzID0gZmxhdHRlbihhcmd1bWVudHMsIGZhbHNlLCBmYWxzZSwgMSk7XG4gICAgICBpdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBrZXksIG9iaikgeyByZXR1cm4ga2V5IGluIG9iajsgfTtcbiAgICAgIG9iaiA9IE9iamVjdChvYmopO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgIGlmIChpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmopKSByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aG91dCB0aGUgYmxhY2tsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5vbWl0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlcmF0ZWUpKSB7XG4gICAgICBpdGVyYXRlZSA9IF8ubmVnYXRlKGl0ZXJhdGVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBfLm1hcChmbGF0dGVuKGFyZ3VtZW50cywgZmFsc2UsIGZhbHNlLCAxKSwgU3RyaW5nKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gIV8uY29udGFpbnMoa2V5cywga2V5KTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBfLnBpY2sob2JqLCBpdGVyYXRlZSwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gRmlsbCBpbiBhIGdpdmVuIG9iamVjdCB3aXRoIGRlZmF1bHQgcHJvcGVydGllcy5cbiAgXy5kZWZhdWx0cyA9IGNyZWF0ZUFzc2lnbmVyKF8uYWxsS2V5cywgdHJ1ZSk7XG5cbiAgLy8gQ3JlYXRlIGEgKHNoYWxsb3ctY2xvbmVkKSBkdXBsaWNhdGUgb2YgYW4gb2JqZWN0LlxuICBfLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcbiAgfTtcblxuICAvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXG4gIC8vIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhpcyBtZXRob2QgaXMgdG8gXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluLCBpblxuICAvLyBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cbiAgXy50YXAgPSBmdW5jdGlvbihvYmosIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3Iob2JqKTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybnMgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmlzTWF0Y2ggPSBmdW5jdGlvbihvYmplY3QsIGF0dHJzKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMoYXR0cnMpLCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiAhbGVuZ3RoO1xuICAgIHZhciBvYmogPSBPYmplY3Qob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChhdHRyc1trZXldICE9PSBvYmpba2V5XSB8fCAhKGtleSBpbiBvYmopKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5cbiAgLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbiAgdmFyIGVxID0gZnVuY3Rpb24oYSwgYiwgYVN0YWNrLCBiU3RhY2spIHtcbiAgICAvLyBJZGVudGljYWwgb2JqZWN0cyBhcmUgZXF1YWwuIGAwID09PSAtMGAsIGJ1dCB0aGV5IGFyZW4ndCBpZGVudGljYWwuXG4gICAgLy8gU2VlIHRoZSBbSGFybW9ueSBgZWdhbGAgcHJvcG9zYWxdKGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPWhhcm1vbnk6ZWdhbCkuXG4gICAgaWYgKGEgPT09IGIpIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgICAvLyBBIHN0cmljdCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGBudWxsID09IHVuZGVmaW5lZGAuXG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBhID09PSBiO1xuICAgIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICAgIGlmIChhIGluc3RhbmNlb2YgXykgYSA9IGEuX3dyYXBwZWQ7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBfKSBiID0gYi5fd3JhcHBlZDtcbiAgICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICAgIGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpIHJldHVybiBmYWxzZTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgLy8gU3RyaW5ncywgbnVtYmVycywgcmVndWxhciBleHByZXNzaW9ucywgZGF0ZXMsIGFuZCBib29sZWFucyBhcmUgY29tcGFyZWQgYnkgdmFsdWUuXG4gICAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxuICAgICAgLy8gUmVnRXhwcyBhcmUgY29lcmNlZCB0byBzdHJpbmdzIGZvciBjb21wYXJpc29uIChOb3RlOiAnJyArIC9hL2kgPT09ICcvYS9pJylcbiAgICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXG4gICAgICAgIC8vIGVxdWl2YWxlbnQgdG8gYG5ldyBTdHJpbmcoXCI1XCIpYC5cbiAgICAgICAgcmV0dXJuICcnICsgYSA9PT0gJycgKyBiO1xuICAgICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICAgICAgLy8gT2JqZWN0KE5hTikgaXMgZXF1aXZhbGVudCB0byBOYU5cbiAgICAgICAgaWYgKCthICE9PSArYSkgcmV0dXJuICtiICE9PSArYjtcbiAgICAgICAgLy8gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvciBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgcmV0dXJuICthID09PSAwID8gMSAvICthID09PSAxIC8gYiA6ICthID09PSArYjtcbiAgICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOlxuICAgICAgY2FzZSAnW29iamVjdCBCb29sZWFuXSc6XG4gICAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtZXJpYyBwcmltaXRpdmUgdmFsdWVzLiBEYXRlcyBhcmUgY29tcGFyZWQgYnkgdGhlaXJcbiAgICAgICAgLy8gbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zLiBOb3RlIHRoYXQgaW52YWxpZCBkYXRlcyB3aXRoIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9uc1xuICAgICAgICAvLyBvZiBgTmFOYCBhcmUgbm90IGVxdWl2YWxlbnQuXG4gICAgICAgIHJldHVybiArYSA9PT0gK2I7XG4gICAgfVxuXG4gICAgdmFyIGFyZUFycmF5cyA9IGNsYXNzTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICBpZiAoIWFyZUFycmF5cykge1xuICAgICAgaWYgKHR5cGVvZiBhICE9ICdvYmplY3QnIHx8IHR5cGVvZiBiICE9ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIE9iamVjdHMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1aXZhbGVudCwgYnV0IGBPYmplY3RgcyBvciBgQXJyYXlgc1xuICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICAgIHZhciBhQ3RvciA9IGEuY29uc3RydWN0b3IsIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcbiAgICAgIGlmIChhQ3RvciAhPT0gYkN0b3IgJiYgIShfLmlzRnVuY3Rpb24oYUN0b3IpICYmIGFDdG9yIGluc3RhbmNlb2YgYUN0b3IgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmlzRnVuY3Rpb24oYkN0b3IpICYmIGJDdG9yIGluc3RhbmNlb2YgYkN0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICYmICgnY29uc3RydWN0b3InIGluIGEgJiYgJ2NvbnN0cnVjdG9yJyBpbiBiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcbiAgICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cbiAgICBcbiAgICAvLyBJbml0aWFsaXppbmcgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgLy8gSXQncyBkb25lIGhlcmUgc2luY2Ugd2Ugb25seSBuZWVkIHRoZW0gZm9yIG9iamVjdHMgYW5kIGFycmF5cyBjb21wYXJpc29uLlxuICAgIGFTdGFjayA9IGFTdGFjayB8fCBbXTtcbiAgICBiU3RhY2sgPSBiU3RhY2sgfHwgW107XG4gICAgdmFyIGxlbmd0aCA9IGFTdGFjay5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAgIC8vIHVuaXF1ZSBuZXN0ZWQgc3RydWN0dXJlcy5cbiAgICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PT0gYSkgcmV0dXJuIGJTdGFja1tsZW5ndGhdID09PSBiO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcblxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgIGlmIChhcmVBcnJheXMpIHtcbiAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBpZiAoIWVxKGFbbGVuZ3RoXSwgYltsZW5ndGhdLCBhU3RhY2ssIGJTdGFjaykpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVlcCBjb21wYXJlIG9iamVjdHMuXG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhhKSwga2V5O1xuICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAvLyBFbnN1cmUgdGhhdCBib3RoIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgcHJvcGVydGllcyBiZWZvcmUgY29tcGFyaW5nIGRlZXAgZXF1YWxpdHkuXG4gICAgICBpZiAoXy5rZXlzKGIpLmxlbmd0aCAhPT0gbGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgLy8gRGVlcCBjb21wYXJlIGVhY2ggbWVtYmVyXG4gICAgICAgIGtleSA9IGtleXNbbGVuZ3RoXTtcbiAgICAgICAgaWYgKCEoXy5oYXMoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucG9wKCk7XG4gICAgYlN0YWNrLnBvcCgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gYSBkZWVwIGNvbXBhcmlzb24gdG8gY2hlY2sgaWYgdHdvIG9iamVjdHMgYXJlIGVxdWFsLlxuICBfLmlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGVxKGEsIGIpO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gYXJyYXksIHN0cmluZywgb3Igb2JqZWN0IGVtcHR5P1xuICAvLyBBbiBcImVtcHR5XCIgb2JqZWN0IGhhcyBubyBlbnVtZXJhYmxlIG93bi1wcm9wZXJ0aWVzLlxuICBfLmlzRW1wdHkgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiB0cnVlO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopICYmIChfLmlzQXJyYXkob2JqKSB8fCBfLmlzU3RyaW5nKG9iaikgfHwgXy5pc0FyZ3VtZW50cyhvYmopKSkgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XG4gICAgcmV0dXJuIF8ua2V5cyhvYmopLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgRE9NIGVsZW1lbnQ/XG4gIF8uaXNFbGVtZW50ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYW4gYXJyYXk/XG4gIC8vIERlbGVnYXRlcyB0byBFQ01BNSdzIG5hdGl2ZSBBcnJheS5pc0FycmF5XG4gIF8uaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIGFuIG9iamVjdD9cbiAgXy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbiAgfTtcblxuICAvLyBBZGQgc29tZSBpc1R5cGUgbWV0aG9kczogaXNBcmd1bWVudHMsIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc051bWJlciwgaXNEYXRlLCBpc1JlZ0V4cCwgaXNFcnJvci5cbiAgXy5lYWNoKFsnQXJndW1lbnRzJywgJ0Z1bmN0aW9uJywgJ1N0cmluZycsICdOdW1iZXInLCAnRGF0ZScsICdSZWdFeHAnLCAnRXJyb3InXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIF9bJ2lzJyArIG5hbWVdID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCAnICsgbmFtZSArICddJztcbiAgICB9O1xuICB9KTtcblxuICAvLyBEZWZpbmUgYSBmYWxsYmFjayB2ZXJzaW9uIG9mIHRoZSBtZXRob2QgaW4gYnJvd3NlcnMgKGFoZW0sIElFIDwgOSksIHdoZXJlXG4gIC8vIHRoZXJlIGlzbid0IGFueSBpbnNwZWN0YWJsZSBcIkFyZ3VtZW50c1wiIHR5cGUuXG4gIGlmICghXy5pc0FyZ3VtZW50cyhhcmd1bWVudHMpKSB7XG4gICAgXy5pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIF8uaGFzKG9iaiwgJ2NhbGxlZScpO1xuICAgIH07XG4gIH1cblxuICAvLyBPcHRpbWl6ZSBgaXNGdW5jdGlvbmAgaWYgYXBwcm9wcmlhdGUuIFdvcmsgYXJvdW5kIHNvbWUgdHlwZW9mIGJ1Z3MgaW4gb2xkIHY4LFxuICAvLyBJRSAxMSAoIzE2MjEpLCBhbmQgaW4gU2FmYXJpIDggKCMxOTI5KS5cbiAgaWYgKHR5cGVvZiAvLi8gIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSW50OEFycmF5ICE9ICdvYmplY3QnKSB7XG4gICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XG4gIF8uaXNGaW5pdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcbiAgfTtcblxuICAvLyBJcyB0aGUgZ2l2ZW4gdmFsdWUgYE5hTmA/IChOYU4gaXMgdGhlIG9ubHkgbnVtYmVyIHdoaWNoIGRvZXMgbm90IGVxdWFsIGl0c2VsZikuXG4gIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXy5pc051bWJlcihvYmopICYmIG9iaiAhPT0gK29iajtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgYm9vbGVhbj9cbiAgXy5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBlcXVhbCB0byBudWxsP1xuICBfLmlzTnVsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSB1bmRlZmluZWQ/XG4gIF8uaXNVbmRlZmluZWQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB2b2lkIDA7XG4gIH07XG5cbiAgLy8gU2hvcnRjdXQgZnVuY3Rpb24gZm9yIGNoZWNraW5nIGlmIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBwcm9wZXJ0eSBkaXJlY3RseVxuICAvLyBvbiBpdHNlbGYgKGluIG90aGVyIHdvcmRzLCBub3Qgb24gYSBwcm90b3R5cGUpLlxuICBfLmhhcyA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICB9O1xuXG4gIC8vIFV0aWxpdHkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUnVuIFVuZGVyc2NvcmUuanMgaW4gKm5vQ29uZmxpY3QqIG1vZGUsIHJldHVybmluZyB0aGUgYF9gIHZhcmlhYmxlIHRvIGl0c1xuICAvLyBwcmV2aW91cyBvd25lci4gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJvb3QuXyA9IHByZXZpb3VzVW5kZXJzY29yZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBLZWVwIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBhcm91bmQgZm9yIGRlZmF1bHQgaXRlcmF0ZWVzLlxuICBfLmlkZW50aXR5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLy8gUHJlZGljYXRlLWdlbmVyYXRpbmcgZnVuY3Rpb25zLiBPZnRlbiB1c2VmdWwgb3V0c2lkZSBvZiBVbmRlcnNjb3JlLlxuICBfLmNvbnN0YW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgfTtcblxuICBfLm5vb3AgPSBmdW5jdGlvbigpe307XG5cbiAgXy5wcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gR2VuZXJhdGVzIGEgZnVuY3Rpb24gZm9yIGEgZ2l2ZW4gb2JqZWN0IHRoYXQgcmV0dXJucyBhIGdpdmVuIHByb3BlcnR5LlxuICBfLnByb3BlcnR5T2YgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09IG51bGwgPyBmdW5jdGlvbigpe30gOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBwcmVkaWNhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZiBcbiAgLy8gYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ubWF0Y2hlciA9IF8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgYXR0cnMgPSBfLmV4dGVuZE93bih7fSwgYXR0cnMpO1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmlzTWF0Y2gob2JqLCBhdHRycyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSdW4gYSBmdW5jdGlvbiAqKm4qKiB0aW1lcy5cbiAgXy50aW1lcyA9IGZ1bmN0aW9uKG4sIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIGFjY3VtID0gQXJyYXkoTWF0aC5tYXgoMCwgbikpO1xuICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIGFjY3VtW2ldID0gaXRlcmF0ZWUoaSk7XG4gICAgcmV0dXJuIGFjY3VtO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXggKGluY2x1c2l2ZSkuXG4gIF8ucmFuZG9tID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICBpZiAobWF4ID09IG51bGwpIHtcbiAgICAgIG1heCA9IG1pbjtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICB9O1xuXG4gIC8vIEEgKHBvc3NpYmx5IGZhc3Rlcikgd2F5IHRvIGdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgYXMgYW4gaW50ZWdlci5cbiAgXy5ub3cgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH07XG5cbiAgIC8vIExpc3Qgb2YgSFRNTCBlbnRpdGllcyBmb3IgZXNjYXBpbmcuXG4gIHZhciBlc2NhcGVNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgICAnYCc6ICcmI3g2MDsnXG4gIH07XG4gIHZhciB1bmVzY2FwZU1hcCA9IF8uaW52ZXJ0KGVzY2FwZU1hcCk7XG5cbiAgLy8gRnVuY3Rpb25zIGZvciBlc2NhcGluZyBhbmQgdW5lc2NhcGluZyBzdHJpbmdzIHRvL2Zyb20gSFRNTCBpbnRlcnBvbGF0aW9uLlxuICB2YXIgY3JlYXRlRXNjYXBlciA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIHZhciBlc2NhcGVyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXBbbWF0Y2hdO1xuICAgIH07XG4gICAgLy8gUmVnZXhlcyBmb3IgaWRlbnRpZnlpbmcgYSBrZXkgdGhhdCBuZWVkcyB0byBiZSBlc2NhcGVkXG4gICAgdmFyIHNvdXJjZSA9ICcoPzonICsgXy5rZXlzKG1hcCkuam9pbignfCcpICsgJyknO1xuICAgIHZhciB0ZXN0UmVnZXhwID0gUmVnRXhwKHNvdXJjZSk7XG4gICAgdmFyIHJlcGxhY2VSZWdleHAgPSBSZWdFeHAoc291cmNlLCAnZycpO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZyA9PSBudWxsID8gJycgOiAnJyArIHN0cmluZztcbiAgICAgIHJldHVybiB0ZXN0UmVnZXhwLnRlc3Qoc3RyaW5nKSA/IHN0cmluZy5yZXBsYWNlKHJlcGxhY2VSZWdleHAsIGVzY2FwZXIpIDogc3RyaW5nO1xuICAgIH07XG4gIH07XG4gIF8uZXNjYXBlID0gY3JlYXRlRXNjYXBlcihlc2NhcGVNYXApO1xuICBfLnVuZXNjYXBlID0gY3JlYXRlRXNjYXBlcih1bmVzY2FwZU1hcCk7XG5cbiAgLy8gSWYgdGhlIHZhbHVlIG9mIHRoZSBuYW1lZCBgcHJvcGVydHlgIGlzIGEgZnVuY3Rpb24gdGhlbiBpbnZva2UgaXQgd2l0aCB0aGVcbiAgLy8gYG9iamVjdGAgYXMgY29udGV4dDsgb3RoZXJ3aXNlLCByZXR1cm4gaXQuXG4gIF8ucmVzdWx0ID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSwgZmFsbGJhY2spIHtcbiAgICB2YXIgdmFsdWUgPSBvYmplY3QgPT0gbnVsbCA/IHZvaWQgMCA6IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgIHZhbHVlID0gZmFsbGJhY2s7XG4gICAgfVxuICAgIHJldHVybiBfLmlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbChvYmplY3QpIDogdmFsdWU7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYSB1bmlxdWUgaW50ZWdlciBpZCAodW5pcXVlIHdpdGhpbiB0aGUgZW50aXJlIGNsaWVudCBzZXNzaW9uKS5cbiAgLy8gVXNlZnVsIGZvciB0ZW1wb3JhcnkgRE9NIGlkcy5cbiAgdmFyIGlkQ291bnRlciA9IDA7XG4gIF8udW5pcXVlSWQgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICB2YXIgaWQgPSArK2lkQ291bnRlciArICcnO1xuICAgIHJldHVybiBwcmVmaXggPyBwcmVmaXggKyBpZCA6IGlkO1xuICB9O1xuXG4gIC8vIEJ5IGRlZmF1bHQsIFVuZGVyc2NvcmUgdXNlcyBFUkItc3R5bGUgdGVtcGxhdGUgZGVsaW1pdGVycywgY2hhbmdlIHRoZVxuICAvLyBmb2xsb3dpbmcgdGVtcGxhdGUgc2V0dGluZ3MgdG8gdXNlIGFsdGVybmF0aXZlIGRlbGltaXRlcnMuXG4gIF8udGVtcGxhdGVTZXR0aW5ncyA9IHtcbiAgICBldmFsdWF0ZSAgICA6IC88JShbXFxzXFxTXSs/KSU+L2csXG4gICAgaW50ZXJwb2xhdGUgOiAvPCU9KFtcXHNcXFNdKz8pJT4vZyxcbiAgICBlc2NhcGUgICAgICA6IC88JS0oW1xcc1xcU10rPyklPi9nXG4gIH07XG5cbiAgLy8gV2hlbiBjdXN0b21pemluZyBgdGVtcGxhdGVTZXR0aW5nc2AsIGlmIHlvdSBkb24ndCB3YW50IHRvIGRlZmluZSBhblxuICAvLyBpbnRlcnBvbGF0aW9uLCBldmFsdWF0aW9uIG9yIGVzY2FwaW5nIHJlZ2V4LCB3ZSBuZWVkIG9uZSB0aGF0IGlzXG4gIC8vIGd1YXJhbnRlZWQgbm90IHRvIG1hdGNoLlxuICB2YXIgbm9NYXRjaCA9IC8oLileLztcblxuICAvLyBDZXJ0YWluIGNoYXJhY3RlcnMgbmVlZCB0byBiZSBlc2NhcGVkIHNvIHRoYXQgdGhleSBjYW4gYmUgcHV0IGludG8gYVxuICAvLyBzdHJpbmcgbGl0ZXJhbC5cbiAgdmFyIGVzY2FwZXMgPSB7XG4gICAgXCInXCI6ICAgICAgXCInXCIsXG4gICAgJ1xcXFwnOiAgICAgJ1xcXFwnLFxuICAgICdcXHInOiAgICAgJ3InLFxuICAgICdcXG4nOiAgICAgJ24nLFxuICAgICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICd1MjAyOSdcbiAgfTtcblxuICB2YXIgZXNjYXBlciA9IC9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZztcblxuICB2YXIgZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdO1xuICB9O1xuXG4gIC8vIEphdmFTY3JpcHQgbWljcm8tdGVtcGxhdGluZywgc2ltaWxhciB0byBKb2huIFJlc2lnJ3MgaW1wbGVtZW50YXRpb24uXG4gIC8vIFVuZGVyc2NvcmUgdGVtcGxhdGluZyBoYW5kbGVzIGFyYml0cmFyeSBkZWxpbWl0ZXJzLCBwcmVzZXJ2ZXMgd2hpdGVzcGFjZSxcbiAgLy8gYW5kIGNvcnJlY3RseSBlc2NhcGVzIHF1b3RlcyB3aXRoaW4gaW50ZXJwb2xhdGVkIGNvZGUuXG4gIC8vIE5COiBgb2xkU2V0dGluZ3NgIG9ubHkgZXhpc3RzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgXy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzLCBvbGRTZXR0aW5ncykge1xuICAgIGlmICghc2V0dGluZ3MgJiYgb2xkU2V0dGluZ3MpIHNldHRpbmdzID0gb2xkU2V0dGluZ3M7XG4gICAgc2V0dGluZ3MgPSBfLmRlZmF1bHRzKHt9LCBzZXR0aW5ncywgXy50ZW1wbGF0ZVNldHRpbmdzKTtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gUmVnRXhwKFtcbiAgICAgIChzZXR0aW5ncy5lc2NhcGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmludGVycG9sYXRlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5ldmFsdWF0ZSB8fCBub01hdGNoKS5zb3VyY2VcbiAgICBdLmpvaW4oJ3wnKSArICd8JCcsICdnJyk7XG5cbiAgICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHNvdXJjZSA9IFwiX19wKz0nXCI7XG4gICAgdGV4dC5yZXBsYWNlKG1hdGNoZXIsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGUsIGludGVycG9sYXRlLCBldmFsdWF0ZSwgb2Zmc2V0KSB7XG4gICAgICBzb3VyY2UgKz0gdGV4dC5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKGVzY2FwZXIsIGVzY2FwZUNoYXIpO1xuICAgICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBlc2NhcGUgKyBcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGV2YWx1YXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZSArIFwiXFxuX19wKz0nXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkb2JlIFZNcyBuZWVkIHRoZSBtYXRjaCByZXR1cm5lZCB0byBwcm9kdWNlIHRoZSBjb3JyZWN0IG9mZmVzdC5cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcbiAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gICAgLy8gSWYgYSB2YXJpYWJsZSBpcyBub3Qgc3BlY2lmaWVkLCBwbGFjZSBkYXRhIHZhbHVlcyBpbiBsb2NhbCBzY29wZS5cbiAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlKSBzb3VyY2UgPSAnd2l0aChvYmp8fHt9KXtcXG4nICsgc291cmNlICsgJ31cXG4nO1xuXG4gICAgc291cmNlID0gXCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIgK1xuICAgICAgXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiICtcbiAgICAgIHNvdXJjZSArICdyZXR1cm4gX19wO1xcbic7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ18nLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgXyk7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB2YXIgYXJndW1lbnQgPSBzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJztcbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIGFyZ3VtZW50ICsgJyl7XFxuJyArIHNvdXJjZSArICd9JztcblxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfTtcblxuICAvLyBBZGQgYSBcImNoYWluXCIgZnVuY3Rpb24uIFN0YXJ0IGNoYWluaW5nIGEgd3JhcHBlZCBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5jaGFpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBpbnN0YW5jZSA9IF8ob2JqKTtcbiAgICBpbnN0YW5jZS5fY2hhaW4gPSB0cnVlO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcblxuICAvLyBPT1BcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG4gIC8vIElmIFVuZGVyc2NvcmUgaXMgY2FsbGVkIGFzIGEgZnVuY3Rpb24sIGl0IHJldHVybnMgYSB3cmFwcGVkIG9iamVjdCB0aGF0XG4gIC8vIGNhbiBiZSB1c2VkIE9PLXN0eWxlLiBUaGlzIHdyYXBwZXIgaG9sZHMgYWx0ZXJlZCB2ZXJzaW9ucyBvZiBhbGwgdGhlXG4gIC8vIHVuZGVyc2NvcmUgZnVuY3Rpb25zLiBXcmFwcGVkIG9iamVjdHMgbWF5IGJlIGNoYWluZWQuXG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnRpbnVlIGNoYWluaW5nIGludGVybWVkaWF0ZSByZXN1bHRzLlxuICB2YXIgcmVzdWx0ID0gZnVuY3Rpb24oaW5zdGFuY2UsIG9iaikge1xuICAgIHJldHVybiBpbnN0YW5jZS5fY2hhaW4gPyBfKG9iaikuY2hhaW4oKSA6IG9iajtcbiAgfTtcblxuICAvLyBBZGQgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9ucyB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubWl4aW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICBfLmVhY2goXy5mdW5jdGlvbnMob2JqKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xuICAgICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fd3JhcHBlZF07XG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCh0aGlzLCBmdW5jLmFwcGx5KF8sIGFyZ3MpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQWRkIGFsbCBvZiB0aGUgVW5kZXJzY29yZSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIgb2JqZWN0LlxuICBfLm1peGluKF8pO1xuXG4gIC8vIEFkZCBhbGwgbXV0YXRvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvYmogPSB0aGlzLl93cmFwcGVkO1xuICAgICAgbWV0aG9kLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICAgIGlmICgobmFtZSA9PT0gJ3NoaWZ0JyB8fCBuYW1lID09PSAnc3BsaWNlJykgJiYgb2JqLmxlbmd0aCA9PT0gMCkgZGVsZXRlIG9ialswXTtcbiAgICAgIHJldHVybiByZXN1bHQodGhpcywgb2JqKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBBZGQgYWxsIGFjY2Vzc29yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsnY29uY2F0JywgJ2pvaW4nLCAnc2xpY2UnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVzdWx0KHRoaXMsIG1ldGhvZC5hcHBseSh0aGlzLl93cmFwcGVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBFeHRyYWN0cyB0aGUgcmVzdWx0IGZyb20gYSB3cmFwcGVkIGFuZCBjaGFpbmVkIG9iamVjdC5cbiAgXy5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcbiAgfTtcblxuICAvLyBQcm92aWRlIHVud3JhcHBpbmcgcHJveHkgZm9yIHNvbWUgbWV0aG9kcyB1c2VkIGluIGVuZ2luZSBvcGVyYXRpb25zXG4gIC8vIHN1Y2ggYXMgYXJpdGhtZXRpYyBhbmQgSlNPTiBzdHJpbmdpZmljYXRpb24uXG4gIF8ucHJvdG90eXBlLnZhbHVlT2YgPSBfLnByb3RvdHlwZS50b0pTT04gPSBfLnByb3RvdHlwZS52YWx1ZTtcbiAgXG4gIF8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICcnICsgdGhpcy5fd3JhcHBlZDtcbiAgfTtcblxuICAvLyBBTUQgcmVnaXN0cmF0aW9uIGhhcHBlbnMgYXQgdGhlIGVuZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFNRCBsb2FkZXJzXG4gIC8vIHRoYXQgbWF5IG5vdCBlbmZvcmNlIG5leHQtdHVybiBzZW1hbnRpY3Mgb24gbW9kdWxlcy4gRXZlbiB0aG91Z2ggZ2VuZXJhbFxuICAvLyBwcmFjdGljZSBmb3IgQU1EIHJlZ2lzdHJhdGlvbiBpcyB0byBiZSBhbm9ueW1vdXMsIHVuZGVyc2NvcmUgcmVnaXN0ZXJzXG4gIC8vIGFzIGEgbmFtZWQgbW9kdWxlIGJlY2F1c2UsIGxpa2UgalF1ZXJ5LCBpdCBpcyBhIGJhc2UgbGlicmFyeSB0aGF0IGlzXG4gIC8vIHBvcHVsYXIgZW5vdWdoIHRvIGJlIGJ1bmRsZWQgaW4gYSB0aGlyZCBwYXJ0eSBsaWIsIGJ1dCBub3QgYmUgcGFydCBvZlxuICAvLyBhbiBBTUQgbG9hZCByZXF1ZXN0LiBUaG9zZSBjYXNlcyBjb3VsZCBnZW5lcmF0ZSBhbiBlcnJvciB3aGVuIGFuXG4gIC8vIGFub255bW91cyBkZWZpbmUoKSBpcyBjYWxsZWQgb3V0c2lkZSBvZiBhIGxvYWRlciByZXF1ZXN0LlxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCd1bmRlcnNjb3JlJywgW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF87XG4gICAgfSk7XG4gIH1cbn0uY2FsbCh0aGlzKSk7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIHdlYnJ0YyA9IHJlcXVpcmUoJ3dlYnJ0Y3N1cHBvcnQnKTtcbnZhciBTSkogPSByZXF1aXJlKCdzZHAtamluZ2xlLWpzb24nKTtcbnZhciBXaWxkRW1pdHRlciA9IHJlcXVpcmUoJ3dpbGRlbWl0dGVyJyk7XG52YXIgcGVlcmNvbm4gPSByZXF1aXJlKCd0cmFjZWFibGVwZWVyY29ubmVjdGlvbicpO1xuXG5mdW5jdGlvbiBQZWVyQ29ubmVjdGlvbihjb25maWcsIGNvbnN0cmFpbnRzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBpdGVtO1xuICAgIFdpbGRFbWl0dGVyLmNhbGwodGhpcyk7XG5cbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLmljZVNlcnZlcnMgPSBjb25maWcuaWNlU2VydmVycyB8fCBbXTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGlzIG9ubHkgZ2V0cyBlbmFibGVkIGluIEdvb2dsZSBDaHJvbWVcbiAgICAvLyBFWFBFUklNRU5UQUwgRkxBRywgbWlnaHQgZ2V0IHJlbW92ZWQgd2l0aG91dCBub3RpY2VcbiAgICB0aGlzLmVuYWJsZUNocm9tZU5hdGl2ZVNpbXVsY2FzdCA9IGZhbHNlO1xuICAgIGlmIChjb25zdHJhaW50cyAmJiBjb25zdHJhaW50cy5vcHRpb25hbCAmJlxuICAgICAgICAgICAgd2VicnRjLnByZWZpeCA9PT0gJ3dlYmtpdCcgJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci5hcHBWZXJzaW9uLm1hdGNoKC9DaHJvbWl1bVxcLy8pID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLm9wdGlvbmFsLmZvckVhY2goZnVuY3Rpb24gKGNvbnN0cmFpbnQsIGlkeCkge1xuICAgICAgICAgICAgaWYgKGNvbnN0cmFpbnQuZW5hYmxlQ2hyb21lTmF0aXZlU2ltdWxjYXN0KSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbmFibGVDaHJvbWVOYXRpdmVTaW11bGNhc3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBFWFBFUklNRU5UQUwgRkxBRywgbWlnaHQgZ2V0IHJlbW92ZWQgd2l0aG91dCBub3RpY2VcbiAgICB0aGlzLmVuYWJsZU11bHRpU3RyZWFtSGFja3MgPSBmYWxzZTtcbiAgICBpZiAoY29uc3RyYWludHMgJiYgY29uc3RyYWludHMub3B0aW9uYWwpIHtcbiAgICAgICAgY29uc3RyYWludHMub3B0aW9uYWwuZm9yRWFjaChmdW5jdGlvbiAoY29uc3RyYWludCwgaWR4KSB7XG4gICAgICAgICAgICBpZiAoY29uc3RyYWludC5lbmFibGVNdWx0aVN0cmVhbUhhY2tzKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbmFibGVNdWx0aVN0cmVhbUhhY2tzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5wYyA9IG5ldyBwZWVyY29ubihjb25maWcsIGNvbnN0cmFpbnRzKTtcblxuICAgIHRoaXMuZ2V0TG9jYWxTdHJlYW1zID0gdGhpcy5wYy5nZXRMb2NhbFN0cmVhbXMuYmluZCh0aGlzLnBjKTtcbiAgICB0aGlzLmdldFJlbW90ZVN0cmVhbXMgPSB0aGlzLnBjLmdldFJlbW90ZVN0cmVhbXMuYmluZCh0aGlzLnBjKTtcbiAgICB0aGlzLmFkZFN0cmVhbSA9IHRoaXMucGMuYWRkU3RyZWFtLmJpbmQodGhpcy5wYyk7XG4gICAgdGhpcy5yZW1vdmVTdHJlYW0gPSB0aGlzLnBjLnJlbW92ZVN0cmVhbS5iaW5kKHRoaXMucGMpO1xuXG4gICAgLy8gcHJveHkgZXZlbnRzIFxuICAgIHRoaXMucGMub24oJyonLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZW1pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH0pO1xuXG4gICAgLy8gcHJveHkgc29tZSBldmVudHMgZGlyZWN0bHlcbiAgICB0aGlzLnBjLm9ucmVtb3Zlc3RyZWFtID0gdGhpcy5lbWl0LmJpbmQodGhpcywgJ3JlbW92ZVN0cmVhbScpO1xuICAgIHRoaXMucGMub25uZWdvdGlhdGlvbm5lZWRlZCA9IHRoaXMuZW1pdC5iaW5kKHRoaXMsICduZWdvdGlhdGlvbk5lZWRlZCcpO1xuICAgIHRoaXMucGMub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSB0aGlzLmVtaXQuYmluZCh0aGlzLCAnaWNlQ29ubmVjdGlvblN0YXRlQ2hhbmdlJyk7XG4gICAgdGhpcy5wYy5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gdGhpcy5lbWl0LmJpbmQodGhpcywgJ3NpZ25hbGluZ1N0YXRlQ2hhbmdlJyk7XG5cbiAgICAvLyBoYW5kbGUgaW5jb21pbmcgaWNlIGFuZCBkYXRhIGNoYW5uZWwgZXZlbnRzXG4gICAgdGhpcy5wYy5vbmFkZHN0cmVhbSA9IHRoaXMuX29uQWRkU3RyZWFtLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wYy5vbmljZWNhbmRpZGF0ZSA9IHRoaXMuX29uSWNlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wYy5vbmRhdGFjaGFubmVsID0gdGhpcy5fb25EYXRhQ2hhbm5lbC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5sb2NhbERlc2NyaXB0aW9uID0ge1xuICAgICAgICBjb250ZW50czogW11cbiAgICB9O1xuICAgIHRoaXMucmVtb3RlRGVzY3JpcHRpb24gPSB7XG4gICAgICAgIGNvbnRlbnRzOiBbXVxuICAgIH07XG5cbiAgICB0aGlzLmxvY2FsU3RyZWFtID0gbnVsbDtcbiAgICB0aGlzLnJlbW90ZVN0cmVhbXMgPSBbXTtcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgIGljZToge30sXG4gICAgICAgIHNpZDogJycsXG4gICAgICAgIGlzSW5pdGlhdG9yOiB0cnVlLFxuICAgICAgICBzZHBTZXNzaW9uSUQ6IERhdGUubm93KCksXG4gICAgICAgIHVzZUppbmdsZTogZmFsc2VcbiAgICB9O1xuXG4gICAgLy8gYXBwbHkgb3VyIGNvbmZpZ1xuICAgIGZvciAoaXRlbSBpbiBjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWdbaXRlbV0gPSBjb25maWdbaXRlbV07XG4gICAgfVxuXG4gICAgdGhpcy5fcm9sZSA9IHRoaXMuaXNJbml0aWF0b3IgPyAnaW5pdGlhdG9yJyA6ICdyZXNwb25kZXInO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSB7XG4gICAgICAgIHRoaXMub24oJyonLCBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudCkge1xuICAgICAgICAgICAgdmFyIGxvZ2dlciA9IGNvbmZpZy5sb2dnZXIgfHwgY29uc29sZTtcbiAgICAgICAgICAgIGxvZ2dlci5sb2coJ1BlZXJDb25uZWN0aW9uIGV2ZW50OicsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmhhZExvY2FsU3R1bkNhbmRpZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaGFkUmVtb3RlU3R1bkNhbmRpZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaGFkTG9jYWxSZWxheUNhbmRpZGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaGFkUmVtb3RlUmVsYXlDYW5kaWRhdGUgPSBmYWxzZTtcblxuICAgIHRoaXMuaGFkTG9jYWxJUHY2Q2FuZGlkYXRlID0gZmFsc2U7XG4gICAgdGhpcy5oYWRSZW1vdGVJUHY2Q2FuZGlkYXRlID0gZmFsc2U7XG5cbiAgICAvLyBrZWVwaW5nIHJlZmVyZW5jZXMgZm9yIGFsbCBvdXIgZGF0YSBjaGFubmVsc1xuICAgIC8vIHNvIHRoZXkgZG9udCBnZXQgZ2FyYmFnZSBjb2xsZWN0ZWRcbiAgICAvLyBjYW4gYmUgcmVtb3ZlZCBvbmNlIHRoZSBmb2xsb3dpbmcgYnVncyBoYXZlIGJlZW4gZml4ZWRcbiAgICAvLyBodHRwczovL2NyYnVnLmNvbS80MDU1NDUgXG4gICAgLy8gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTY0MDkyXG4gICAgLy8gdG8gYmUgZmlsZWQgZm9yIG9wZXJhXG4gICAgdGhpcy5fcmVtb3RlRGF0YUNoYW5uZWxzID0gW107XG4gICAgdGhpcy5fbG9jYWxEYXRhQ2hhbm5lbHMgPSBbXTtcbn1cblxudXRpbC5pbmhlcml0cyhQZWVyQ29ubmVjdGlvbiwgV2lsZEVtaXR0ZXIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnc2lnbmFsaW5nU3RhdGUnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBjLnNpZ25hbGluZ1N0YXRlO1xuICAgIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFBlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2ljZUNvbm5lY3Rpb25TdGF0ZScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGMuaWNlQ29ubmVjdGlvblN0YXRlO1xuICAgIH1cbn0pO1xuXG4vLyBBZGQgYSBzdHJlYW0gdG8gdGhlIHBlZXIgY29ubmVjdGlvbiBvYmplY3RcblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgdGhpcy5sb2NhbFN0cmVhbSA9IHN0cmVhbTtcbiAgICB0aGlzLnBjLmFkZFN0cmVhbShzdHJlYW0pO1xufTtcblxuLy8gaGVscGVyIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIGEgcmVtb3RlIGNhbmRpZGF0ZSBpcyBhIHN0dW4vcmVsYXlcbi8vIGNhbmRpZGF0ZSBvciBhbiBpcHY2IGNhbmRpZGF0ZVxuUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jaGVja0xvY2FsQ2FuZGlkYXRlID0gZnVuY3Rpb24gKGNhbmRpZGF0ZSkge1xuICAgIHZhciBjYW5kID0gU0pKLnRvQ2FuZGlkYXRlSlNPTihjYW5kaWRhdGUpO1xuICAgIGlmIChjYW5kLnR5cGUgPT0gJ3NyZmx4Jykge1xuICAgICAgICB0aGlzLmhhZExvY2FsU3R1bkNhbmRpZGF0ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjYW5kLnR5cGUgPT0gJ3JlbGF5Jykge1xuICAgICAgICB0aGlzLmhhZExvY2FsUmVsYXlDYW5kaWRhdGUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoY2FuZC5pcC5pbmRleE9mKCc6JykgIT0gLTEpIHtcbiAgICAgICAgdGhpcy5oYWRMb2NhbElQdjZDYW5kaWRhdGUgPSB0cnVlO1xuICAgIH1cbn07XG5cbi8vIGhlbHBlciBmdW5jdGlvbiB0byBjaGVjayBpZiBhIHJlbW90ZSBjYW5kaWRhdGUgaXMgYSBzdHVuL3JlbGF5XG4vLyBjYW5kaWRhdGUgb3IgYW4gaXB2NiBjYW5kaWRhdGVcblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY2hlY2tSZW1vdGVDYW5kaWRhdGUgPSBmdW5jdGlvbiAoY2FuZGlkYXRlKSB7XG4gICAgdmFyIGNhbmQgPSBTSkoudG9DYW5kaWRhdGVKU09OKGNhbmRpZGF0ZSk7XG4gICAgaWYgKGNhbmQudHlwZSA9PSAnc3JmbHgnKSB7XG4gICAgICAgIHRoaXMuaGFkUmVtb3RlU3R1bkNhbmRpZGF0ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjYW5kLnR5cGUgPT0gJ3JlbGF5Jykge1xuICAgICAgICB0aGlzLmhhZFJlbW90ZVJlbGF5Q2FuZGlkYXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNhbmQuaXAuaW5kZXhPZignOicpICE9IC0xKSB7XG4gICAgICAgIHRoaXMuaGFkUmVtb3RlSVB2NkNhbmRpZGF0ZSA9IHRydWU7XG4gICAgfVxufTtcblxuXG4vLyBJbml0IGFuZCBhZGQgaWNlIGNhbmRpZGF0ZSBvYmplY3Qgd2l0aCBjb3JyZWN0IGNvbnN0cnVjdG9yXG5QZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucHJvY2Vzc0ljZSA9IGZ1bmN0aW9uICh1cGRhdGUsIGNiKSB7XG4gICAgY2IgPSBjYiB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodXBkYXRlLmNvbnRlbnRzKSB7XG4gICAgICAgIHZhciBjb250ZW50TmFtZXMgPSBfLnBsdWNrKHRoaXMucmVtb3RlRGVzY3JpcHRpb24uY29udGVudHMsICduYW1lJyk7XG4gICAgICAgIHZhciBjb250ZW50cyA9IHVwZGF0ZS5jb250ZW50cztcblxuICAgICAgICBjb250ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gY29udGVudC50cmFuc3BvcnQgfHwge307XG4gICAgICAgICAgICB2YXIgY2FuZGlkYXRlcyA9IHRyYW5zcG9ydC5jYW5kaWRhdGVzIHx8IFtdO1xuICAgICAgICAgICAgdmFyIG1saW5lID0gY29udGVudE5hbWVzLmluZGV4T2YoY29udGVudC5uYW1lKTtcbiAgICAgICAgICAgIHZhciBtaWQgPSBjb250ZW50Lm5hbWU7XG5cbiAgICAgICAgICAgIGNhbmRpZGF0ZXMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGljZUNhbmRpZGF0ZSA9IFNKSi50b0NhbmRpZGF0ZVNEUChjYW5kaWRhdGUpICsgJ1xcclxcbic7XG4gICAgICAgICAgICAgICAgc2VsZi5wYy5hZGRJY2VDYW5kaWRhdGUoXG4gICAgICAgICAgICAgICAgICAgIG5ldyB3ZWJydGMuSWNlQ2FuZGlkYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZTogaWNlQ2FuZGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogbWxpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZHBNaWQ6IG1pZFxuICAgICAgICAgICAgICAgICAgICB9KSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2VsbCwgdGhpcyBzdWNjZXNzIGNhbGxiYWNrIGlzIHByZXR0eSBtZWFuaW5nbGVzc1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2hlY2tSZW1vdGVDYW5kaWRhdGUoaWNlQ2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB3b3JraW5nIGFyb3VuZCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTM2NjlcbiAgICAgICAgaWYgKHVwZGF0ZS5jYW5kaWRhdGUuY2FuZGlkYXRlLmluZGV4T2YoJ2E9JykgIT09IDApIHtcbiAgICAgICAgICAgIHVwZGF0ZS5jYW5kaWRhdGUuY2FuZGlkYXRlID0gJ2E9JyArIHVwZGF0ZS5jYW5kaWRhdGUuY2FuZGlkYXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5wYy5hZGRJY2VDYW5kaWRhdGUoXG4gICAgICAgICAgICBuZXcgd2VicnRjLkljZUNhbmRpZGF0ZSh1cGRhdGUuY2FuZGlkYXRlKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgc2VsZi5fY2hlY2tSZW1vdGVDYW5kaWRhdGUodXBkYXRlLmNhbmRpZGF0ZS5jYW5kaWRhdGUpO1xuICAgIH1cbiAgICBjYigpO1xufTtcblxuLy8gR2VuZXJhdGUgYW5kIGVtaXQgYW4gb2ZmZXIgd2l0aCB0aGUgZ2l2ZW4gY29uc3RyYWludHNcblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vZmZlciA9IGZ1bmN0aW9uIChjb25zdHJhaW50cywgY2IpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGhhc0NvbnN0cmFpbnRzID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMjtcbiAgICB2YXIgbWVkaWFDb25zdHJhaW50cyA9IGhhc0NvbnN0cmFpbnRzID8gY29uc3RyYWludHMgOiB7XG4gICAgICAgICAgICBtYW5kYXRvcnk6IHtcbiAgICAgICAgICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgICAgIE9mZmVyVG9SZWNlaXZlVmlkZW86IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICBjYiA9IGhhc0NvbnN0cmFpbnRzID8gY2IgOiBjb25zdHJhaW50cztcbiAgICBjYiA9IGNiIHx8IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgLy8gQWN0dWFsbHkgZ2VuZXJhdGUgdGhlIG9mZmVyXG4gICAgdGhpcy5wYy5jcmVhdGVPZmZlcihcbiAgICAgICAgZnVuY3Rpb24gKG9mZmVyKSB7XG4gICAgICAgICAgICBzZWxmLnBjLnNldExvY2FsRGVzY3JpcHRpb24ob2ZmZXIsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgamluZ2xlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwYW5kZWRPZmZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdvZmZlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZHA6IG9mZmVyLnNkcFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcudXNlSmluZ2xlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqaW5nbGUgPSBTSkoudG9TZXNzaW9uSlNPTihvZmZlci5zZHAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBzZWxmLl9yb2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBqaW5nbGUuc2lkID0gc2VsZi5jb25maWcuc2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5sb2NhbERlc2NyaXB0aW9uID0gamluZ2xlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTYXZlIElDRSBjcmVkZW50aWFsc1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5lYWNoKGppbmdsZS5jb250ZW50cywgZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gY29udGVudC50cmFuc3BvcnQgfHwge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zcG9ydC51ZnJhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5pY2VbY29udGVudC5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVmcmFnOiB0cmFuc3BvcnQudWZyYWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwd2Q6IHRyYW5zcG9ydC5wd2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRPZmZlci5qaW5nbGUgPSBqaW5nbGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kZWRPZmZlci5zZHAuc3BsaXQoJ1xcclxcbicpLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmluZGV4T2YoJ2E9Y2FuZGlkYXRlOicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fY2hlY2tMb2NhbENhbmRpZGF0ZShsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdvZmZlcicsIGV4cGFuZGVkT2ZmZXIpO1xuICAgICAgICAgICAgICAgICAgICBjYihudWxsLCBleHBhbmRlZE9mZmVyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBtZWRpYUNvbnN0cmFpbnRzXG4gICAgKTtcbn07XG5cblxuLy8gUHJvY2VzcyBhbiBpbmNvbWluZyBvZmZlciBzbyB0aGF0IElDRSBtYXkgcHJvY2VlZCBiZWZvcmUgZGVjaWRpbmdcbi8vIHRvIGFuc3dlciB0aGUgcmVxdWVzdC5cblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5oYW5kbGVPZmZlciA9IGZ1bmN0aW9uIChvZmZlciwgY2IpIHtcbiAgICBjYiA9IGNiIHx8IGZ1bmN0aW9uICgpIHt9O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBvZmZlci50eXBlID0gJ29mZmVyJztcbiAgICBpZiAob2ZmZXIuamluZ2xlKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZUNocm9tZU5hdGl2ZVNpbXVsY2FzdCkge1xuICAgICAgICAgICAgb2ZmZXIuamluZ2xlLmNvbnRlbnRzLmZvckVhY2goZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5uYW1lID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuZGVzY3JpcHRpb24uZ29vZ0NvbmZlcmVuY2VGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKlxuICAgICAgICBpZiAodGhpcy5lbmFibGVNdWx0aVN0cmVhbUhhY2tzKSB7XG4gICAgICAgICAgICAvLyBhZGQgYSBtaXhlZCB2aWRlbyBzdHJlYW0gYXMgZmlyc3Qgc3RyZWFtXG4gICAgICAgICAgICBvZmZlci5qaW5nbGUuY29udGVudHMuZm9yRWFjaChmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZW50Lm5hbWUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZXMgPSBjb250ZW50LmRlc2NyaXB0aW9uLnNvdXJjZXMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzLmxlbmd0aCA9PT0gMCB8fCBzb3VyY2VzWzBdLnNzcmMgIT09IFwiMzczNTkyODU1OVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VzLnVuc2hpZnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNzcmM6IFwiMzczNTkyODU1OVwiLCAvLyAweGRlYWRiZWVmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiY25hbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImRlYWRiZWVmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIm1zaWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIm1peHlvdXJmZWNpbnRvdGhpcyBwbGVhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmRlc2NyaXB0aW9uLnNvdXJjZXMgPSBzb3VyY2VzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgKi9cbiAgICAgICAgb2ZmZXIuc2RwID0gU0pKLnRvU2Vzc2lvblNEUChvZmZlci5qaW5nbGUsIHtcbiAgICAgICAgICAgIHNpZDogc2VsZi5jb25maWcuc2RwU2Vzc2lvbklELFxuICAgICAgICAgICAgcm9sZTogc2VsZi5fcm9sZSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJ1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5yZW1vdGVEZXNjcmlwdGlvbiA9IG9mZmVyLmppbmdsZTtcbiAgICB9XG4gICAgb2ZmZXIuc2RwLnNwbGl0KCdcXHJcXG4nKS5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgIGlmIChsaW5lLmluZGV4T2YoJ2E9Y2FuZGlkYXRlOicpID09PSAwKSB7XG4gICAgICAgICAgICBzZWxmLl9jaGVja1JlbW90ZUNhbmRpZGF0ZShsaW5lKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHNlbGYucGMuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IHdlYnJ0Yy5TZXNzaW9uRGVzY3JpcHRpb24ob2ZmZXIpLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9LFxuICAgICAgICBjYlxuICAgICk7XG59O1xuXG4vLyBBbnN3ZXIgYW4gb2ZmZXIgd2l0aCBhdWRpbyBvbmx5XG5QZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYW5zd2VyQXVkaW9Pbmx5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgICBtYW5kYXRvcnk6IHtcbiAgICAgICAgICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgICAgIE9mZmVyVG9SZWNlaXZlVmlkZW86IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgdGhpcy5fYW5zd2VyKG1lZGlhQ29uc3RyYWludHMsIGNiKTtcbn07XG5cbi8vIEFuc3dlciBhbiBvZmZlciB3aXRob3V0IG9mZmVyaW5nIHRvIHJlY2lldmVcblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hbnN3ZXJCcm9hZGNhc3RPbmx5ID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgdmFyIG1lZGlhQ29uc3RyYWludHMgPSB7XG4gICAgICAgICAgICBtYW5kYXRvcnk6IHtcbiAgICAgICAgICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBPZmZlclRvUmVjZWl2ZVZpZGVvOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIHRoaXMuX2Fuc3dlcihtZWRpYUNvbnN0cmFpbnRzLCBjYik7XG59O1xuXG4vLyBBbnN3ZXIgYW4gb2ZmZXIgd2l0aCBnaXZlbiBjb25zdHJhaW50cyBkZWZhdWx0IGlzIGF1ZGlvL3ZpZGVvXG5QZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYW5zd2VyID0gZnVuY3Rpb24gKGNvbnN0cmFpbnRzLCBjYikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgaGFzQ29uc3RyYWludHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAyO1xuICAgIHZhciBjYWxsYmFjayA9IGhhc0NvbnN0cmFpbnRzID8gY2IgOiBjb25zdHJhaW50cztcbiAgICB2YXIgbWVkaWFDb25zdHJhaW50cyA9IGhhc0NvbnN0cmFpbnRzID8gY29uc3RyYWludHMgOiB7XG4gICAgICAgICAgICBtYW5kYXRvcnk6IHtcbiAgICAgICAgICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgICAgIE9mZmVyVG9SZWNlaXZlVmlkZW86IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIHRoaXMuX2Fuc3dlcihtZWRpYUNvbnN0cmFpbnRzLCBjYWxsYmFjayk7XG59O1xuXG4vLyBQcm9jZXNzIGFuIGFuc3dlclxuUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmhhbmRsZUFuc3dlciA9IGZ1bmN0aW9uIChhbnN3ZXIsIGNiKSB7XG4gICAgY2IgPSBjYiB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKGFuc3dlci5qaW5nbGUpIHtcbiAgICAgICAgYW5zd2VyLnNkcCA9IFNKSi50b1Nlc3Npb25TRFAoYW5zd2VyLmppbmdsZSwge1xuICAgICAgICAgICAgc2lkOiBzZWxmLmNvbmZpZy5zZHBTZXNzaW9uSUQsXG4gICAgICAgICAgICByb2xlOiBzZWxmLl9yb2xlLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaW5jb21pbmcnXG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnJlbW90ZURlc2NyaXB0aW9uID0gYW5zd2VyLmppbmdsZTtcbiAgICB9XG4gICAgYW5zd2VyLnNkcC5zcGxpdCgnXFxyXFxuJykuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi5fY2hlY2tSZW1vdGVDYW5kaWRhdGUobGluZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzZWxmLnBjLnNldFJlbW90ZURlc2NyaXB0aW9uKFxuICAgICAgICBuZXcgd2VicnRjLlNlc3Npb25EZXNjcmlwdGlvbihhbnN3ZXIpLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjYihudWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgY2JcbiAgICApO1xufTtcblxuLy8gQ2xvc2UgdGhlIHBlZXIgY29ubmVjdGlvblxuUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGMuY2xvc2UoKTtcblxuICAgIHRoaXMuX2xvY2FsRGF0YUNoYW5uZWxzID0gW107XG4gICAgdGhpcy5fcmVtb3RlRGF0YUNoYW5uZWxzID0gW107XG5cbiAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG59O1xuXG4vLyBJbnRlcm5hbCBjb2RlIHNoYXJpbmcgZm9yIHZhcmlvdXMgdHlwZXMgb2YgYW5zd2VyIG1ldGhvZHNcblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fYW5zd2VyID0gZnVuY3Rpb24gKGNvbnN0cmFpbnRzLCBjYikge1xuICAgIGNiID0gY2IgfHwgZnVuY3Rpb24gKCkge307XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICghdGhpcy5wYy5yZW1vdGVEZXNjcmlwdGlvbikge1xuICAgICAgICAvLyB0aGUgb2xkIEFQSSBpcyB1c2VkLCBjYWxsIGhhbmRsZU9mZmVyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVtb3RlRGVzY3JpcHRpb24gbm90IHNldCcpO1xuICAgIH1cbiAgICBzZWxmLnBjLmNyZWF0ZUFuc3dlcihcbiAgICAgICAgZnVuY3Rpb24gKGFuc3dlcikge1xuICAgICAgICAgICAgdmFyIHNpbSA9IFtdO1xuICAgICAgICAgICAgdmFyIHJ0eCA9IFtdO1xuICAgICAgICAgICAgaWYgKHNlbGYuZW5hYmxlQ2hyb21lTmF0aXZlU2ltdWxjYXN0KSB7XG4gICAgICAgICAgICAgICAgLy8gbmF0aXZlIHNpbXVsY2FzdCBwYXJ0IDE6IGFkZCBhbm90aGVyIFNTUkNcbiAgICAgICAgICAgICAgICBhbnN3ZXIuamluZ2xlID0gU0pKLnRvU2Vzc2lvbkpTT04oYW5zd2VyLnNkcCwge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiBzZWxmLl9yb2xlLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdvdXRvaW5nJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChhbnN3ZXIuamluZ2xlLmNvbnRlbnRzLmxlbmd0aCA+PSAyICYmIGFuc3dlci5qaW5nbGUuY29udGVudHNbMV0ubmFtZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzU2ltZ3JvdXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwcyA9IGFuc3dlci5qaW5nbGUuY29udGVudHNbMV0uZGVzY3JpcHRpb24uc291cmNlR3JvdXBzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzU2ltID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyb3VwLnNlbWFudGljcyA9PSAnU0lNJykgaGFzU2ltID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaGFzU2ltICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXIuamluZ2xlLmNvbnRlbnRzWzFdLmRlc2NyaXB0aW9uLnNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3c3NyYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYW5zd2VyLmppbmdsZS5jb250ZW50c1sxXS5kZXNjcmlwdGlvbi5zb3VyY2VzWzBdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdzc3JjLnNzcmMgPSAnJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4ZmZmZmZmZmYpOyAvLyBGSVhNRTogbG9vayBmb3IgY29uZmxpY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXIuamluZ2xlLmNvbnRlbnRzWzFdLmRlc2NyaXB0aW9uLnNvdXJjZXMucHVzaChuZXdzc3JjKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2ltLnB1c2goYW5zd2VyLmppbmdsZS5jb250ZW50c1sxXS5kZXNjcmlwdGlvbi5zb3VyY2VzWzBdLnNzcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2ltLnB1c2gobmV3c3NyYy5zc3JjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW1hbnRpY3M6ICdTSU0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZXM6IHNpbVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gY3JlYXRlIGFuIFJUWCBvbmUgZm9yIHRoZSBTSU0gb25lXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcnR4c3NyYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobmV3c3NyYykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcnR4c3NyYy5zc3JjID0gJycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweGZmZmZmZmZmKTsgLy8gRklYTUU6IGxvb2sgZm9yIGNvbmZsaWN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyLmppbmdsZS5jb250ZW50c1sxXS5kZXNjcmlwdGlvbi5zb3VyY2VzLnB1c2gocnR4c3NyYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VtYW50aWNzOiAnRklEJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VzOiBbbmV3c3NyYy5zc3JjLCBydHhzc3JjLnNzcmNdXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyLmppbmdsZS5jb250ZW50c1sxXS5kZXNjcmlwdGlvbi5zb3VyY2VHcm91cHMgPSBncm91cHM7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXIuc2RwID0gU0pKLnRvU2Vzc2lvblNEUChhbnN3ZXIuamluZ2xlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkOiBzZWxmLmNvbmZpZy5zZHBTZXNzaW9uSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogc2VsZi5fcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdvdXRnb2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5wYy5zZXRMb2NhbERlc2NyaXB0aW9uKGFuc3dlcixcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBleHBhbmRlZEFuc3dlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdhbnN3ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2RwOiBhbnN3ZXIuc2RwXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy51c2VKaW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqaW5nbGUgPSBTSkoudG9TZXNzaW9uSlNPTihhbnN3ZXIuc2RwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogc2VsZi5fcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdvdXRnb2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgamluZ2xlLnNpZCA9IHNlbGYuY29uZmlnLnNpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubG9jYWxEZXNjcmlwdGlvbiA9IGppbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkQW5zd2VyLmppbmdsZSA9IGppbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5lbmFibGVDaHJvbWVOYXRpdmVTaW11bGNhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hdGl2ZSBzaW11bGNhc3QgcGFydCAyOiBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpZ25hbCBtdWx0aXBsZSB0cmFja3MgdG8gdGhlIHJlY2VpdmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgYW55dGhpbmcgaW4gdGhlIFNJTSBncm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFleHBhbmRlZEFuc3dlci5qaW5nbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZEFuc3dlci5qaW5nbGUgPSBTSkoudG9TZXNzaW9uSlNPTihhbnN3ZXIuc2RwLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IHNlbGYuX3JvbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwcyA9IGV4cGFuZGVkQW5zd2VyLmppbmdsZS5jb250ZW50c1sxXS5kZXNjcmlwdGlvbi5zb3VyY2VHcm91cHMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZEFuc3dlci5qaW5nbGUuY29udGVudHNbMV0uZGVzY3JpcHRpb24uc291cmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UsIGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBmbG9vciBpZHgvMiBpcyBhIGhhY2sgdGhhdCByZWxpZXMgb24gYSBwYXJ0aWN1bGFyIG9yZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgZ3JvdXBzLCBhbHRlcm5hdGluZyBiZXR3ZWVuIHNpbSBhbmQgcnR4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLnBhcmFtZXRlcnMgPSBzb3VyY2UucGFyYW1ldGVycy5tYXAoZnVuY3Rpb24gKHBhcmFtZXRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1ldGVyLmtleSA9PT0gJ21zaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIudmFsdWUgKz0gJy0nICsgTWF0aC5mbG9vcihpZHggLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW1ldGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBhbmRlZEFuc3dlci5zZHAgPSBTSkoudG9TZXNzaW9uU0RQKGV4cGFuZGVkQW5zd2VyLmppbmdsZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZDogc2VsZi5zZHBTZXNzaW9uSUQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogc2VsZi5fcm9sZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdvdXRnb2luZydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkQW5zd2VyLnNkcC5zcGxpdCgnXFxyXFxuJykuZm9yRWFjaChmdW5jdGlvbiAobGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUuaW5kZXhPZignYT1jYW5kaWRhdGU6JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jaGVja0xvY2FsQ2FuZGlkYXRlKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdhbnN3ZXInLCBleHBhbmRlZEFuc3dlcik7XG4gICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGV4cGFuZGVkQW5zd2VyKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIGNiKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICBjYihlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBjb25zdHJhaW50c1xuICAgICk7XG59O1xuXG4vLyBJbnRlcm5hbCBtZXRob2QgZm9yIGVtaXR0aW5nIGljZSBjYW5kaWRhdGVzIG9uIG91ciBwZWVyIG9iamVjdFxuUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9vbkljZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XG4gICAgICAgIHZhciBpY2UgPSBldmVudC5jYW5kaWRhdGU7XG5cbiAgICAgICAgdmFyIGV4cGFuZGVkQ2FuZGlkYXRlID0ge1xuICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGVcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2FuZCA9IFNKSi50b0NhbmRpZGF0ZUpTT04oaWNlLmNhbmRpZGF0ZSk7XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy51c2VKaW5nbGUpIHtcbiAgICAgICAgICAgIGlmICghaWNlLnNkcE1pZCkgeyAvLyBmaXJlZm94IGRvZXNuJ3Qgc2V0IHRoaXNcbiAgICAgICAgICAgICAgICBpY2Uuc2RwTWlkID0gc2VsZi5sb2NhbERlc2NyaXB0aW9uLmNvbnRlbnRzW2ljZS5zZHBNTGluZUluZGV4XS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5pY2VbaWNlLnNkcE1pZF0pIHtcbiAgICAgICAgICAgICAgICB2YXIgamluZ2xlID0gU0pKLnRvU2Vzc2lvbkpTT04oc2VsZi5wYy5sb2NhbERlc2NyaXB0aW9uLnNkcCwge1xuICAgICAgICAgICAgICAgICAgICByb2xlOiBzZWxmLl9yb2xlLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246ICdpbmNvbWluZydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBfLmVhY2goamluZ2xlLmNvbnRlbnRzLCBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gY29udGVudC50cmFuc3BvcnQgfHwge307XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQudWZyYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLmljZVtjb250ZW50Lm5hbWVdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVmcmFnOiB0cmFuc3BvcnQudWZyYWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHdkOiB0cmFuc3BvcnQucHdkXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHBhbmRlZENhbmRpZGF0ZS5qaW5nbGUgPSB7XG4gICAgICAgICAgICAgICAgY29udGVudHM6IFt7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGljZS5zZHBNaWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3I6IHNlbGYuX3JvbGUsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNUeXBlOiAnaWNlVWRwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVmcmFnOiBzZWxmLmNvbmZpZy5pY2VbaWNlLnNkcE1pZF0udWZyYWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwd2Q6IHNlbGYuY29uZmlnLmljZVtpY2Uuc2RwTWlkXS5wd2QsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuZFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hlY2tMb2NhbENhbmRpZGF0ZShpY2UuY2FuZGlkYXRlKTtcbiAgICAgICAgdGhpcy5lbWl0KCdpY2UnLCBleHBhbmRlZENhbmRpZGF0ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlbmRPZkNhbmRpZGF0ZXMnKTtcbiAgICB9XG59O1xuXG4vLyBJbnRlcm5hbCBtZXRob2QgZm9yIHByb2Nlc3NpbmcgYSBuZXcgZGF0YSBjaGFubmVsIGJlaW5nIGFkZGVkIGJ5IHRoZVxuLy8gb3RoZXIgcGVlci5cblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fb25EYXRhQ2hhbm5lbCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIC8vIG1ha2Ugc3VyZSB3ZSBrZWVwIGEgcmVmZXJlbmNlIHNvIHRoaXMgZG9lc24ndCBnZXQgZ2FyYmFnZSBjb2xsZWN0ZWRcbiAgICB2YXIgY2hhbm5lbCA9IGV2ZW50LmNoYW5uZWw7XG4gICAgdGhpcy5fcmVtb3RlRGF0YUNoYW5uZWxzLnB1c2goY2hhbm5lbCk7XG5cbiAgICB0aGlzLmVtaXQoJ2FkZENoYW5uZWwnLCBjaGFubmVsKTtcbn07XG5cbi8vIEludGVybmFsIGhhbmRsaW5nIG9mIGFkZGluZyBzdHJlYW1cblBlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fb25BZGRTdHJlYW0gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLnJlbW90ZVN0cmVhbXMucHVzaChldmVudC5zdHJlYW0pO1xuICAgIHRoaXMuZW1pdCgnYWRkU3RyZWFtJywgZXZlbnQpO1xufTtcblxuLy8gQ3JlYXRlIGEgZGF0YSBjaGFubmVsIHNwZWMgcmVmZXJlbmNlOlxuLy8gaHR0cDovL2Rldi53My5vcmcvMjAxMS93ZWJydGMvZWRpdG9yL3dlYnJ0Yy5odG1sI2lkbC1kZWYtUlRDRGF0YUNoYW5uZWxJbml0XG5QZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbiAobmFtZSwgb3B0cykge1xuICAgIHZhciBjaGFubmVsID0gdGhpcy5wYy5jcmVhdGVEYXRhQ2hhbm5lbChuYW1lLCBvcHRzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBrZWVwIGEgcmVmZXJlbmNlIHNvIHRoaXMgZG9lc24ndCBnZXQgZ2FyYmFnZSBjb2xsZWN0ZWRcbiAgICB0aGlzLl9sb2NhbERhdGFDaGFubmVscy5wdXNoKGNoYW5uZWwpO1xuXG4gICAgcmV0dXJuIGNoYW5uZWw7XG59O1xuXG4vLyBhIHdyYXBwZXIgYXJvdW5kIGdldFN0YXRzIHdoaWNoIGhpZGVzIHRoZSBkaWZmZXJlbmNlcyAod2hlcmUgcG9zc2libGUpXG5QZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICBpZiAod2VicnRjLnByZWZpeCA9PT0gJ21veicpIHtcbiAgICAgICAgdGhpcy5wYy5nZXRTdGF0cyhcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByZXN1bHQgaW4gcmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzW3Jlc3VsdF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHJlc1tyZXN1bHRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYihudWxsLCBpdGVtcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2JcbiAgICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBjLmdldFN0YXRzKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICAgICAgcmVzLnJlc3VsdCgpLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0ge307XG4gICAgICAgICAgICAgICAgcmVzdWx0Lm5hbWVzKCkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtW25hbWVdID0gcmVzdWx0LnN0YXQobmFtZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaXRlbS5pZCA9IHJlc3VsdC5pZDtcbiAgICAgICAgICAgICAgICBpdGVtLnR5cGUgPSByZXN1bHQudHlwZTtcbiAgICAgICAgICAgICAgICBpdGVtLnRpbWVzdGFtcCA9IHJlc3VsdC50aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2IobnVsbCwgaXRlbXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBlZXJDb25uZWN0aW9uO1xuIiwidmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG52YXIgd2VicnRjID0gcmVxdWlyZSgnd2VicnRjc3VwcG9ydCcpO1xudmFyIFBlZXJDb25uZWN0aW9uID0gcmVxdWlyZSgncnRjcGVlcmNvbm5lY3Rpb24nKTtcbnZhciBXaWxkRW1pdHRlciA9IHJlcXVpcmUoJ3dpbGRlbWl0dGVyJyk7XG52YXIgRmlsZVRyYW5zZmVyID0gcmVxdWlyZSgnZmlsZXRyYW5zZmVyJyk7XG5cbi8vIHRoZSBpbmJhbmQtdjEgcHJvdG9jb2wgaXMgc2VuZGluZyBtZXRhZGF0YSBpbmJhbmQgaW4gYSBzZXJpYWxpemVkIEpTT04gb2JqZWN0XG4vLyBmb2xsb3dlZCBieSB0aGUgYWN0dWFsIGRhdGEuIFJlY2VpdmVyIGNsb3NlcyB0aGUgZGF0YWNoYW5uZWwgdXBvbiBjb21wbGV0aW9uXG52YXIgSU5CQU5EX0ZJTEVUUkFOU0ZFUl9WMSA9ICdodHRwczovL3NpbXBsZXdlYnJ0Yy5jb20vcHJvdG9jb2wvZmlsZXRyYW5zZmVyI2luYmFuZC12MSc7XG5cbmZ1bmN0aW9uIFBlZXIob3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkO1xuICAgIHRoaXMucGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XG4gICAgdGhpcy50eXBlID0gb3B0aW9ucy50eXBlIHx8ICd2aWRlbyc7XG4gICAgdGhpcy5vbmV3YXkgPSBvcHRpb25zLm9uZXdheSB8fCBmYWxzZTtcbiAgICB0aGlzLnNoYXJlbXlzY3JlZW4gPSBvcHRpb25zLnNoYXJlbXlzY3JlZW4gfHwgZmFsc2U7XG4gICAgdGhpcy5icm93c2VyUHJlZml4ID0gb3B0aW9ucy5wcmVmaXg7XG4gICAgdGhpcy5zdHJlYW0gPSBvcHRpb25zLnN0cmVhbTtcbiAgICB0aGlzLmVuYWJsZURhdGFDaGFubmVscyA9IG9wdGlvbnMuZW5hYmxlRGF0YUNoYW5uZWxzID09PSB1bmRlZmluZWQgPyB0aGlzLnBhcmVudC5jb25maWcuZW5hYmxlRGF0YUNoYW5uZWxzIDogb3B0aW9ucy5lbmFibGVEYXRhQ2hhbm5lbHM7XG4gICAgdGhpcy5yZWNlaXZlTWVkaWEgPSBvcHRpb25zLnJlY2VpdmVNZWRpYSB8fCB0aGlzLnBhcmVudC5jb25maWcucmVjZWl2ZU1lZGlhO1xuICAgIHRoaXMuY2hhbm5lbHMgPSB7fTtcbiAgICB0aGlzLnNpZCA9IG9wdGlvbnMuc2lkIHx8IERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgICAvLyBDcmVhdGUgYW4gUlRDUGVlckNvbm5lY3Rpb24gdmlhIHRoZSBwb2x5ZmlsbFxuICAgIHRoaXMucGMgPSBuZXcgUGVlckNvbm5lY3Rpb24odGhpcy5wYXJlbnQuY29uZmlnLnBlZXJDb25uZWN0aW9uQ29uZmlnLCB0aGlzLnBhcmVudC5jb25maWcucGVlckNvbm5lY3Rpb25Db25zdHJhaW50cyk7XG4gICAgdGhpcy5wYy5vbignaWNlJywgdGhpcy5vbkljZUNhbmRpZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnBjLm9uKCdvZmZlcicsIGZ1bmN0aW9uIChvZmZlcikge1xuICAgICAgICBzZWxmLnNlbmQoJ29mZmVyJywgb2ZmZXIpO1xuICAgIH0pO1xuICAgIHRoaXMucGMub24oJ2Fuc3dlcicsIGZ1bmN0aW9uIChvZmZlcikge1xuICAgICAgICBzZWxmLnNlbmQoJ2Fuc3dlcicsIG9mZmVyKTtcbiAgICB9KTtcbiAgICB0aGlzLnBjLm9uKCdhZGRTdHJlYW0nLCB0aGlzLmhhbmRsZVJlbW90ZVN0cmVhbUFkZGVkLmJpbmQodGhpcykpO1xuICAgIHRoaXMucGMub24oJ2FkZENoYW5uZWwnLCB0aGlzLmhhbmRsZURhdGFDaGFubmVsQWRkZWQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5wYy5vbigncmVtb3ZlU3RyZWFtJywgdGhpcy5oYW5kbGVTdHJlYW1SZW1vdmVkLmJpbmQodGhpcykpO1xuICAgIC8vIEp1c3QgZmlyZSBuZWdvdGlhdGlvbiBuZWVkZWQgZXZlbnRzIGZvciBub3dcbiAgICAvLyBXaGVuIGJyb3dzZXIgcmUtbmVnb3RpYXRpb24gaGFuZGxpbmcgc2VlbXMgdG8gd29ya1xuICAgIC8vIHdlIGNhbiB1c2UgdGhpcyBhcyB0aGUgdHJpZ2dlciBmb3Igc3RhcnRpbmcgdGhlIG9mZmVyL2Fuc3dlciBwcm9jZXNzXG4gICAgLy8gYXV0b21hdGljYWxseS4gV2UnbGwganVzdCBsZWF2ZSBpdCBiZSBmb3Igbm93IHdoaWxlIHRoaXMgc3RhYmFsaXplcy5cbiAgICB0aGlzLnBjLm9uKCduZWdvdGlhdGlvbk5lZWRlZCcsIHRoaXMuZW1pdC5iaW5kKHRoaXMsICduZWdvdGlhdGlvbk5lZWRlZCcpKTtcbiAgICB0aGlzLnBjLm9uKCdpY2VDb25uZWN0aW9uU3RhdGVDaGFuZ2UnLCB0aGlzLmVtaXQuYmluZCh0aGlzLCAnaWNlQ29ubmVjdGlvblN0YXRlQ2hhbmdlJykpO1xuICAgIHRoaXMucGMub24oJ2ljZUNvbm5lY3Rpb25TdGF0ZUNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3dpdGNoIChzZWxmLnBjLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgICBjYXNlICdmYWlsZWQnOlxuICAgICAgICAgICAgLy8gY3VycmVudGx5LCBpbiBjaHJvbWUgb25seSB0aGUgaW5pdGlhdG9yIGdvZXMgdG8gZmFpbGVkXG4gICAgICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIHNpZ25hbCB0aGlzIHRvIHRoZSBwZWVyXG4gICAgICAgICAgICBpZiAoc2VsZi5wYy5wYy5wZWVyY29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnBhcmVudC5lbWl0KCdpY2VGYWlsZWQnLCBzZWxmKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmQoJ2Nvbm5lY3Rpdml0eUVycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucGMub24oJ3NpZ25hbGluZ1N0YXRlQ2hhbmdlJywgdGhpcy5lbWl0LmJpbmQodGhpcywgJ3NpZ25hbGluZ1N0YXRlQ2hhbmdlJykpO1xuICAgIHRoaXMubG9nZ2VyID0gdGhpcy5wYXJlbnQubG9nZ2VyO1xuXG4gICAgLy8gaGFuZGxlIHNjcmVlbnNoYXJpbmcvYnJvYWRjYXN0IG1vZGVcbiAgICBpZiAob3B0aW9ucy50eXBlID09PSAnc2NyZWVuJykge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnQubG9jYWxTY3JlZW4gJiYgdGhpcy5zaGFyZW15c2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5sb2coJ2FkZGluZyBsb2NhbCBzY3JlZW4gc3RyZWFtIHRvIHBlZXIgY29ubmVjdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5wYy5hZGRTdHJlYW0odGhpcy5wYXJlbnQubG9jYWxTY3JlZW4pO1xuICAgICAgICAgICAgdGhpcy5icm9hZGNhc3RlciA9IG9wdGlvbnMuYnJvYWRjYXN0ZXI7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmVudC5sb2NhbFN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgICAgICAgICBzZWxmLnBjLmFkZFN0cmVhbShzdHJlYW0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjYWxsIGVtaXR0ZXIgY29uc3RydWN0b3JcbiAgICBXaWxkRW1pdHRlci5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5vbignY2hhbm5lbE9wZW4nLCBmdW5jdGlvbiAoY2hhbm5lbCkge1xuICAgICAgICBpZiAoY2hhbm5lbC5wcm90b2NvbCA9PT0gSU5CQU5EX0ZJTEVUUkFOU0ZFUl9WMSkge1xuICAgICAgICAgICAgY2hhbm5lbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWV0YWRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgIHZhciByZWNlaXZlciA9IG5ldyBGaWxlVHJhbnNmZXIuUmVjZWl2ZXIoKTtcbiAgICAgICAgICAgICAgICByZWNlaXZlci5yZWNlaXZlKG1ldGFkYXRhLCBjaGFubmVsKTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2ZpbGVUcmFuc2ZlcicsIG1ldGFkYXRhLCByZWNlaXZlcik7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIub24oJ3JlY2VpdmVkRmlsZScsIGZ1bmN0aW9uIChmaWxlLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZWNlaXZlci5jaGFubmVsLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBwcm94eSBldmVudHMgdG8gcGFyZW50XG4gICAgdGhpcy5vbignKicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5wYXJlbnQuZW1pdC5hcHBseShzZWxmLnBhcmVudCwgYXJndW1lbnRzKTtcbiAgICB9KTtcbn1cblxudXRpbC5pbmhlcml0cyhQZWVyLCBXaWxkRW1pdHRlcik7XG5cblBlZXIucHJvdG90eXBlLmhhbmRsZU1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMubG9nZ2VyLmxvZygnZ2V0dGluZycsIG1lc3NhZ2UudHlwZSwgbWVzc2FnZSk7XG5cbiAgICBpZiAobWVzc2FnZS5wcmVmaXgpIHRoaXMuYnJvd3NlclByZWZpeCA9IG1lc3NhZ2UucHJlZml4O1xuXG4gICAgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgICAvLyB3b3JrYXJvdW5kIGZvciBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMDY0MjQ3XG4gICAgICAgIG1lc3NhZ2UucGF5bG9hZC5zZHAgPSBtZXNzYWdlLnBheWxvYWQuc2RwLnJlcGxhY2UoJ2E9Zm10cDowIHByb2ZpbGUtbGV2ZWwtaWQ9MHg0MmUwMGM7cGFja2V0aXphdGlvbi1tb2RlPTFcXHJcXG4nLCAnJyk7XG4gICAgICAgIHRoaXMucGMuaGFuZGxlT2ZmZXIobWVzc2FnZS5wYXlsb2FkLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYXV0by1hY2NlcHRcbiAgICAgICAgICAgIHNlbGYucGMuYW5zd2VyKHNlbGYucmVjZWl2ZU1lZGlhLCBmdW5jdGlvbiAoZXJyLCBzZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAvL3NlbGYuc2VuZCgnYW5zd2VyJywgc2Vzc2lvbkRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ2Fuc3dlcicpIHtcbiAgICAgICAgdGhpcy5wYy5oYW5kbGVBbnN3ZXIobWVzc2FnZS5wYXlsb2FkKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ2NhbmRpZGF0ZScpIHtcbiAgICAgICAgdGhpcy5wYy5wcm9jZXNzSWNlKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLnR5cGUgPT09ICdjb25uZWN0aXZpdHlFcnJvcicpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuZW1pdCgnY29ubmVjdGl2aXR5RXJyb3InLCBzZWxmKTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ211dGUnKSB7XG4gICAgICAgIHRoaXMucGFyZW50LmVtaXQoJ211dGUnLCB7aWQ6IG1lc3NhZ2UuZnJvbSwgbmFtZTogbWVzc2FnZS5wYXlsb2FkLm5hbWV9KTtcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UudHlwZSA9PT0gJ3VubXV0ZScpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuZW1pdCgndW5tdXRlJywge2lkOiBtZXNzYWdlLmZyb20sIG5hbWU6IG1lc3NhZ2UucGF5bG9hZC5uYW1lfSk7XG4gICAgfVxufTtcblxuLy8gc2VuZCB2aWEgc2lnbmFsbGluZyBjaGFubmVsXG5QZWVyLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKG1lc3NhZ2VUeXBlLCBwYXlsb2FkKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgICAgIHRvOiB0aGlzLmlkLFxuICAgICAgICBzaWQ6IHRoaXMuc2lkLFxuICAgICAgICBicm9hZGNhc3RlcjogdGhpcy5icm9hZGNhc3RlcixcbiAgICAgICAgcm9vbVR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgdHlwZTogbWVzc2FnZVR5cGUsXG4gICAgICAgIHBheWxvYWQ6IHBheWxvYWQsXG4gICAgICAgIHByZWZpeDogd2VicnRjLnByZWZpeFxuICAgIH07XG4gICAgdGhpcy5sb2dnZXIubG9nKCdzZW5kaW5nJywgbWVzc2FnZVR5cGUsIG1lc3NhZ2UpO1xuICAgIHRoaXMucGFyZW50LmVtaXQoJ21lc3NhZ2UnLCBtZXNzYWdlKTtcbn07XG5cbi8vIHNlbmQgdmlhIGRhdGEgY2hhbm5lbFxuLy8gcmV0dXJucyB0cnVlIHdoZW4gbWVzc2FnZSB3YXMgc2VudCBhbmQgZmFsc2UgaWYgY2hhbm5lbCBpcyBub3Qgb3BlblxuUGVlci5wcm90b3R5cGUuc2VuZERpcmVjdGx5ID0gZnVuY3Rpb24gKGNoYW5uZWwsIG1lc3NhZ2VUeXBlLCBwYXlsb2FkKSB7XG4gICAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgICAgIHR5cGU6IG1lc3NhZ2VUeXBlLFxuICAgICAgICBwYXlsb2FkOiBwYXlsb2FkXG4gICAgfTtcbiAgICB0aGlzLmxvZ2dlci5sb2coJ3NlbmRpbmcgdmlhIGRhdGFjaGFubmVsJywgY2hhbm5lbCwgbWVzc2FnZVR5cGUsIG1lc3NhZ2UpO1xuICAgIHZhciBkYyA9IHRoaXMuZ2V0RGF0YUNoYW5uZWwoY2hhbm5lbCk7XG4gICAgaWYgKGRjLnJlYWR5U3RhdGUgIT0gJ29wZW4nKSByZXR1cm4gZmFsc2U7XG4gICAgZGMuc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBJbnRlcm5hbCBtZXRob2QgcmVnaXN0ZXJpbmcgaGFuZGxlcnMgZm9yIGEgZGF0YSBjaGFubmVsIGFuZCBlbWl0dGluZyBldmVudHMgb24gdGhlIHBlZXJcblBlZXIucHJvdG90eXBlLl9vYnNlcnZlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbiAoY2hhbm5lbCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBjaGFubmVsLm9uY2xvc2UgPSB0aGlzLmVtaXQuYmluZCh0aGlzLCAnY2hhbm5lbENsb3NlJywgY2hhbm5lbCk7XG4gICAgY2hhbm5lbC5vbmVycm9yID0gdGhpcy5lbWl0LmJpbmQodGhpcywgJ2NoYW5uZWxFcnJvcicsIGNoYW5uZWwpO1xuICAgIGNoYW5uZWwub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNlbGYuZW1pdCgnY2hhbm5lbE1lc3NhZ2UnLCBzZWxmLCBjaGFubmVsLmxhYmVsLCBKU09OLnBhcnNlKGV2ZW50LmRhdGEpLCBjaGFubmVsLCBldmVudCk7XG4gICAgfTtcbiAgICBjaGFubmVsLm9ub3BlbiA9IHRoaXMuZW1pdC5iaW5kKHRoaXMsICdjaGFubmVsT3BlbicsIGNoYW5uZWwpO1xufTtcblxuLy8gRmV0Y2ggb3IgY3JlYXRlIGEgZGF0YSBjaGFubmVsIGJ5IHRoZSBnaXZlbiBuYW1lXG5QZWVyLnByb3RvdHlwZS5nZXREYXRhQ2hhbm5lbCA9IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XG4gICAgaWYgKCF3ZWJydGMuc3VwcG9ydERhdGFDaGFubmVsKSByZXR1cm4gdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignY3JlYXRlRGF0YUNoYW5uZWwgbm90IHN1cHBvcnRlZCcpKTtcbiAgICB2YXIgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbbmFtZV07XG4gICAgb3B0cyB8fCAob3B0cyA9IHt9KTtcbiAgICBpZiAoY2hhbm5lbCkgcmV0dXJuIGNoYW5uZWw7XG4gICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBvbmUgYnkgdGhpcyBsYWJlbCwgY3JlYXRlIGl0XG4gICAgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbbmFtZV0gPSB0aGlzLnBjLmNyZWF0ZURhdGFDaGFubmVsKG5hbWUsIG9wdHMpO1xuICAgIHRoaXMuX29ic2VydmVEYXRhQ2hhbm5lbChjaGFubmVsKTtcbiAgICByZXR1cm4gY2hhbm5lbDtcbn07XG5cblBlZXIucHJvdG90eXBlLm9uSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24gKGNhbmRpZGF0ZSkge1xuICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xuICAgIGlmIChjYW5kaWRhdGUpIHtcbiAgICAgICAgdGhpcy5zZW5kKCdjYW5kaWRhdGUnLCBjYW5kaWRhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhcIkVuZCBvZiBjYW5kaWRhdGVzLlwiKTtcbiAgICB9XG59O1xuXG5QZWVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyB3ZWxsLCB0aGUgd2VicnRjIGFwaSByZXF1aXJlcyB0aGF0IHdlIGVpdGhlclxuICAgIC8vIGEpIGNyZWF0ZSBhIGRhdGFjaGFubmVsIGEgcHJpb3JpXG4gICAgLy8gYikgZG8gYSByZW5lZ290aWF0aW9uIGxhdGVyIHRvIGFkZCB0aGUgU0NUUCBtLWxpbmVcbiAgICAvLyBMZXQncyBkbyAoYSkgZmlyc3QuLi5cbiAgICBpZiAodGhpcy5lbmFibGVEYXRhQ2hhbm5lbHMpIHtcbiAgICAgICAgdGhpcy5nZXREYXRhQ2hhbm5lbCgnc2ltcGxld2VicnRjJyk7XG4gICAgfVxuXG4gICAgdGhpcy5wYy5vZmZlcih0aGlzLnJlY2VpdmVNZWRpYSwgZnVuY3Rpb24gKGVyciwgc2Vzc2lvbkRlc2NyaXB0aW9uKSB7XG4gICAgICAgIC8vc2VsZi5zZW5kKCdvZmZlcicsIHNlc3Npb25EZXNjcmlwdGlvbik7XG4gICAgfSk7XG59O1xuXG5QZWVyLnByb3RvdHlwZS5pY2VyZXN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb25zdHJhaW50cyA9IHRoaXMucmVjZWl2ZU1lZGlhO1xuICAgIGNvbnN0cmFpbnRzLm1hbmRhdG9yeS5JY2VSZXN0YXJ0ID0gdHJ1ZTtcbiAgICB0aGlzLnBjLm9mZmVyKGNvbnN0cmFpbnRzLCBmdW5jdGlvbiAoZXJyLCBzdWNjZXNzKSB7IH0pO1xufTtcblxuUGVlci5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmNsb3NlZCkgcmV0dXJuO1xuICAgIHRoaXMucGMuY2xvc2UoKTtcbiAgICB0aGlzLmhhbmRsZVN0cmVhbVJlbW92ZWQoKTtcbn07XG5cblBlZXIucHJvdG90eXBlLmhhbmRsZVJlbW90ZVN0cmVhbUFkZGVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICh0aGlzLnN0cmVhbSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdBbHJlYWR5IGhhdmUgYSByZW1vdGUgc3RyZWFtJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBldmVudC5zdHJlYW07XG4gICAgICAgIC8vIEZJWE1FOiBhZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIC4uLikgd291bGQgYmUgbmljZXJcbiAgICAgICAgLy8gYnV0IGRvZXMgbm90IHdvcmsgaW4gZmlyZWZveCBcbiAgICAgICAgdGhpcy5zdHJlYW0ub25lbmRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZW5kKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGFyZW50LmVtaXQoJ3BlZXJTdHJlYW1BZGRlZCcsIHRoaXMpO1xuICAgIH1cbn07XG5cblBlZXIucHJvdG90eXBlLmhhbmRsZVN0cmVhbVJlbW92ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wYXJlbnQucGVlcnMuc3BsaWNlKHRoaXMucGFyZW50LnBlZXJzLmluZGV4T2YodGhpcyksIDEpO1xuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudC5lbWl0KCdwZWVyU3RyZWFtUmVtb3ZlZCcsIHRoaXMpO1xufTtcblxuUGVlci5wcm90b3R5cGUuaGFuZGxlRGF0YUNoYW5uZWxBZGRlZCA9IGZ1bmN0aW9uIChjaGFubmVsKSB7XG4gICAgdGhpcy5jaGFubmVsc1tjaGFubmVsLmxhYmVsXSA9IGNoYW5uZWw7XG4gICAgdGhpcy5fb2JzZXJ2ZURhdGFDaGFubmVsKGNoYW5uZWwpO1xufTtcblxuUGVlci5wcm90b3R5cGUuc2VuZEZpbGUgPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgIHZhciBzZW5kZXIgPSBuZXcgRmlsZVRyYW5zZmVyLlNlbmRlcigpO1xuICAgIHZhciBkYyA9IHRoaXMuZ2V0RGF0YUNoYW5uZWwoJ2ZpbGV0cmFuc2ZlcicgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpLCB7XG4gICAgICAgIHByb3RvY29sOiBJTkJBTkRfRklMRVRSQU5TRkVSX1YxXG4gICAgfSk7XG4gICAgLy8gb3ZlcnJpZGUgb25vcGVuXG4gICAgZGMub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkYy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZVxuICAgICAgICB9KSk7XG4gICAgICAgIHNlbmRlci5zZW5kKGZpbGUsIGRjKTtcbiAgICB9O1xuICAgIC8vIG92ZXJyaWRlIG9uY2xvc2VcbiAgICBkYy5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2VuZGVyIHJlY2VpdmVkIHRyYW5zZmVyJyk7XG4gICAgICAgIHNlbmRlci5lbWl0KCdjb21wbGV0ZScpO1xuICAgIH07XG4gICAgcmV0dXJuIHNlbmRlcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGVlcjtcbiIsInZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xudmFyIHdlYnJ0YyA9IHJlcXVpcmUoJ3dlYnJ0Y3N1cHBvcnQnKTtcbnZhciBXaWxkRW1pdHRlciA9IHJlcXVpcmUoJ3dpbGRlbWl0dGVyJyk7XG52YXIgbW9ja2NvbnNvbGUgPSByZXF1aXJlKCdtb2NrY29uc29sZScpO1xudmFyIGxvY2FsTWVkaWEgPSByZXF1aXJlKCdsb2NhbG1lZGlhJyk7XG52YXIgUGVlciA9IHJlcXVpcmUoJy4vcGVlcicpO1xuXG5cbmZ1bmN0aW9uIFdlYlJUQyhvcHRzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBvcHRpb25zID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWcgPSB7XG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICAvLyBtYWtlcyB0aGUgZW50aXJlIFBDIGNvbmZpZyBvdmVycmlkYWJsZVxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWc6IHtcbiAgICAgICAgICAgICAgICBpY2VTZXJ2ZXJzOiBbe1widXJsXCI6IFwic3R1bjpzdHVuLmwuZ29vZ2xlLmNvbToxOTMwMlwifV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbnN0cmFpbnRzOiB7XG4gICAgICAgICAgICAgICAgb3B0aW9uYWw6IFtcbiAgICAgICAgICAgICAgICAgICAge0R0bHNTcnRwS2V5QWdyZWVtZW50OiB0cnVlfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWNlaXZlTWVkaWE6IHtcbiAgICAgICAgICAgICAgICBtYW5kYXRvcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgT2ZmZXJUb1JlY2VpdmVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgT2ZmZXJUb1JlY2VpdmVWaWRlbzogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmFibGVEYXRhQ2hhbm5lbHM6IHRydWVcbiAgICAgICAgfTtcbiAgICB2YXIgaXRlbTtcblxuICAgIC8vIGV4cG9zZSBzY3JlZW5zaGFyaW5nIGNoZWNrXG4gICAgdGhpcy5zY3JlZW5TaGFyaW5nU3VwcG9ydCA9IHdlYnJ0Yy5zY3JlZW5TaGFyaW5nO1xuXG4gICAgLy8gV2UgYWxzbyBhbGxvdyBhICdsb2dnZXInIG9wdGlvbi4gSXQgY2FuIGJlIGFueSBvYmplY3QgdGhhdCBpbXBsZW1lbnRzXG4gICAgLy8gbG9nLCB3YXJuLCBhbmQgZXJyb3IgbWV0aG9kcy5cbiAgICAvLyBXZSBsb2cgbm90aGluZyBieSBkZWZhdWx0LCBmb2xsb3dpbmcgXCJ0aGUgcnVsZSBvZiBzaWxlbmNlXCI6XG4gICAgLy8gaHR0cDovL3d3dy5saW5mby5vcmcvcnVsZV9vZl9zaWxlbmNlLmh0bWxcbiAgICB0aGlzLmxvZ2dlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gd2UgYXNzdW1lIHRoYXQgaWYgeW91J3JlIGluIGRlYnVnIG1vZGUgYW5kIHlvdSBkaWRuJ3RcbiAgICAgICAgLy8gcGFzcyBpbiBhIGxvZ2dlciwgeW91IGFjdHVhbGx5IHdhbnQgdG8gbG9nIGFzIG11Y2ggYXNcbiAgICAgICAgLy8gcG9zc2libGUuXG4gICAgICAgIGlmIChvcHRzLmRlYnVnKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0cy5sb2dnZXIgfHwgY29uc29sZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3Igd2UnbGwgdXNlIHlvdXIgbG9nZ2VyIHdoaWNoIHNob3VsZCBoYXZlIGl0cyBvd24gbG9naWNcbiAgICAgICAgLy8gZm9yIG91dHB1dC4gT3Igd2UnbGwgcmV0dXJuIHRoZSBuby1vcC5cbiAgICAgICAgICAgIHJldHVybiBvcHRzLmxvZ2dlciB8fCBtb2NrY29uc29sZTtcbiAgICAgICAgfVxuICAgIH0oKTtcblxuICAgIC8vIHNldCBvcHRpb25zXG4gICAgZm9yIChpdGVtIGluIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5jb25maWdbaXRlbV0gPSBvcHRpb25zW2l0ZW1dO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGZvciBzdXBwb3J0XG4gICAgaWYgKCF3ZWJydGMuc3VwcG9ydCkge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcignWW91ciBicm93c2VyIGRvZXNuXFwndCBzZWVtIHRvIHN1cHBvcnQgV2ViUlRDJyk7XG4gICAgfVxuXG4gICAgLy8gd2hlcmUgd2UnbGwgc3RvcmUgb3VyIHBlZXIgY29ubmVjdGlvbnNcbiAgICB0aGlzLnBlZXJzID0gW107XG5cbiAgICAvLyBjYWxsIGxvY2FsTWVkaWEgY29uc3RydWN0b3JcbiAgICBsb2NhbE1lZGlhLmNhbGwodGhpcywgdGhpcy5jb25maWcpO1xuXG4gICAgdGhpcy5vbignc3BlYWtpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc2VsZi5oYXJkTXV0ZWQpIHtcbiAgICAgICAgICAgIC8vIEZJWE1FOiBzaG91bGQgdXNlIHNlbmREaXJlY3RseVRvQWxsLCBidXQgY3VycmVudGx5IGhhcyBkaWZmZXJlbnQgc2VtYW50aWNzIHdydCBwYXlsb2FkXG4gICAgICAgICAgICBzZWxmLnBlZXJzLmZvckVhY2goZnVuY3Rpb24gKHBlZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVlci5lbmFibGVEYXRhQ2hhbm5lbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRjID0gcGVlci5nZXREYXRhQ2hhbm5lbCgnaGFyaycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGMucmVhZHlTdGF0ZSAhPSAnb3BlbicpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgZGMuc2VuZChKU09OLnN0cmluZ2lmeSh7dHlwZTogJ3NwZWFraW5nJ30pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub24oJ3N0b3BwZWRTcGVha2luZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFzZWxmLmhhcmRNdXRlZCkge1xuICAgICAgICAgICAgLy8gRklYTUU6IHNob3VsZCB1c2Ugc2VuZERpcmVjdGx5VG9BbGwsIGJ1dCBjdXJyZW50bHkgaGFzIGRpZmZlcmVudCBzZW1hbnRpY3Mgd3J0IHBheWxvYWRcbiAgICAgICAgICAgIHNlbGYucGVlcnMuZm9yRWFjaChmdW5jdGlvbiAocGVlcikge1xuICAgICAgICAgICAgICAgIGlmIChwZWVyLmVuYWJsZURhdGFDaGFubmVscykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGMgPSBwZWVyLmdldERhdGFDaGFubmVsKCdoYXJrJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYy5yZWFkeVN0YXRlICE9ICdvcGVuJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBkYy5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOiAnc3RvcHBlZFNwZWFraW5nJ30pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub24oJ3ZvbHVtZUNoYW5nZScsIGZ1bmN0aW9uICh2b2x1bWUsIHRyZXNob2xkKSB7XG4gICAgICAgIGlmICghc2VsZi5oYXJkTXV0ZWQpIHtcbiAgICAgICAgICAgIC8vIEZJWE1FOiBzaG91bGQgdXNlIHNlbmREaXJlY3RseVRvQWxsLCBidXQgY3VycmVudGx5IGhhcyBkaWZmZXJlbnQgc2VtYW50aWNzIHdydCBwYXlsb2FkXG4gICAgICAgICAgICBzZWxmLnBlZXJzLmZvckVhY2goZnVuY3Rpb24gKHBlZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAocGVlci5lbmFibGVEYXRhQ2hhbm5lbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRjID0gcGVlci5nZXREYXRhQ2hhbm5lbCgnaGFyaycpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGMucmVhZHlTdGF0ZSAhPSAnb3BlbicpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgZGMuc2VuZChKU09OLnN0cmluZ2lmeSh7dHlwZTogJ3ZvbHVtZScsIHZvbHVtZTogdm9sdW1lIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gbG9nIGV2ZW50cyBpbiBkZWJ1ZyBtb2RlXG4gICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSB7XG4gICAgICAgIHRoaXMub24oJyonLCBmdW5jdGlvbiAoZXZlbnQsIHZhbDEsIHZhbDIpIHtcbiAgICAgICAgICAgIHZhciBsb2dnZXI7XG4gICAgICAgICAgICAvLyBpZiB5b3UgZGlkbid0IHBhc3MgaW4gYSBsb2dnZXIgYW5kIHlvdSBleHBsaWNpdGx5IHR1cm5pbmcgb24gZGVidWdcbiAgICAgICAgICAgIC8vIHdlJ3JlIGp1c3QgZ29pbmcgdG8gYXNzdW1lIHlvdSdyZSB3YW50aW5nIGxvZyBvdXRwdXQgd2l0aCBjb25zb2xlXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcubG9nZ2VyID09PSBtb2NrY29uc29sZSkge1xuICAgICAgICAgICAgICAgIGxvZ2dlciA9IGNvbnNvbGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2dlciA9IHNlbGYubG9nZ2VyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9nZ2VyLmxvZygnZXZlbnQ6JywgZXZlbnQsIHZhbDEsIHZhbDIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbnV0aWwuaW5oZXJpdHMoV2ViUlRDLCBsb2NhbE1lZGlhKTtcblxuV2ViUlRDLnByb3RvdHlwZS5jcmVhdGVQZWVyID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICB2YXIgcGVlcjtcbiAgICBvcHRzLnBhcmVudCA9IHRoaXM7XG4gICAgcGVlciA9IG5ldyBQZWVyKG9wdHMpO1xuICAgIHRoaXMucGVlcnMucHVzaChwZWVyKTtcbiAgICByZXR1cm4gcGVlcjtcbn07XG5cbi8vIHJlbW92ZXMgcGVlcnNcbldlYlJUQy5wcm90b3R5cGUucmVtb3ZlUGVlcnMgPSBmdW5jdGlvbiAoaWQsIHR5cGUpIHtcbiAgICB0aGlzLmdldFBlZXJzKGlkLCB0eXBlKS5mb3JFYWNoKGZ1bmN0aW9uIChwZWVyKSB7XG4gICAgICAgIHBlZXIuZW5kKCk7XG4gICAgfSk7XG59O1xuXG4vLyBmZXRjaGVzIGFsbCBQZWVyIG9iamVjdHMgYnkgc2Vzc2lvbiBpZCBhbmQvb3IgdHlwZVxuV2ViUlRDLnByb3RvdHlwZS5nZXRQZWVycyA9IGZ1bmN0aW9uIChzZXNzaW9uSWQsIHR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5wZWVycy5maWx0ZXIoZnVuY3Rpb24gKHBlZXIpIHtcbiAgICAgICAgcmV0dXJuICghc2Vzc2lvbklkIHx8IHBlZXIuaWQgPT09IHNlc3Npb25JZCkgJiYgKCF0eXBlIHx8IHBlZXIudHlwZSA9PT0gdHlwZSk7XG4gICAgfSk7XG59O1xuXG4vLyBzZW5kcyBtZXNzYWdlIHRvIGFsbFxuV2ViUlRDLnByb3RvdHlwZS5zZW5kVG9BbGwgPSBmdW5jdGlvbiAobWVzc2FnZSwgcGF5bG9hZCkge1xuICAgIHRoaXMucGVlcnMuZm9yRWFjaChmdW5jdGlvbiAocGVlcikge1xuICAgICAgICBwZWVyLnNlbmQobWVzc2FnZSwgcGF5bG9hZCk7XG4gICAgfSk7XG59O1xuXG4vLyBzZW5kcyBtZXNzYWdlIHRvIGFsbCB1c2luZyBhIGRhdGFjaGFubmVsXG4vLyBvbmx5IHNlbmRzIHRvIGFueW9uZSB3aG8gaGFzIGFuIG9wZW4gZGF0YWNoYW5uZWxcbldlYlJUQy5wcm90b3R5cGUuc2VuZERpcmVjdGx5VG9BbGwgPSBmdW5jdGlvbiAoY2hhbm5lbCwgbWVzc2FnZSwgcGF5bG9hZCkge1xuICAgIHRoaXMucGVlcnMuZm9yRWFjaChmdW5jdGlvbiAocGVlcikge1xuICAgICAgICBpZiAocGVlci5lbmFibGVEYXRhQ2hhbm5lbHMpIHtcbiAgICAgICAgICAgIHBlZXIuc2VuZERpcmVjdGx5KGNoYW5uZWwsIG1lc3NhZ2UsIHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlJUQztcbiIsIi8vIGNyZWF0ZWQgYnkgQEhlbnJpa0pvcmV0ZWdcbnZhciBwcmVmaXg7XG5cbmlmICh3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24gfHwgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSkge1xuICAgIHByZWZpeCA9ICdtb3onO1xufSBlbHNlIGlmICh3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24gfHwgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xuICAgIHByZWZpeCA9ICd3ZWJraXQnO1xufVxuXG52YXIgUEMgPSB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24gfHwgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uO1xudmFyIEljZUNhbmRpZGF0ZSA9IHdpbmRvdy5tb3pSVENJY2VDYW5kaWRhdGUgfHwgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZTtcbnZhciBTZXNzaW9uRGVzY3JpcHRpb24gPSB3aW5kb3cubW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIHx8IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb247XG52YXIgTWVkaWFTdHJlYW0gPSB3aW5kb3cud2Via2l0TWVkaWFTdHJlYW0gfHwgd2luZG93Lk1lZGlhU3RyZWFtO1xudmFyIHNjcmVlblNoYXJpbmcgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT09ICdodHRwczonICYmXG4gICAgKCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgnQ2hyb21lJykgJiYgcGFyc2VJbnQod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyguKikgLylbMV0sIDEwKSA+PSAyNikgfHxcbiAgICAgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKCdGaXJlZm94JykgJiYgcGFyc2VJbnQod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0ZpcmVmb3hcXC8oLiopLylbMV0sIDEwKSA+PSAzMykpO1xudmFyIEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbnZhciBzdXBwb3J0VnA4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKS5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4XCIsIHZvcmJpcycpID09PSBcInByb2JhYmx5XCI7XG52YXIgZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLmdldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhIHx8IG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYSB8fCBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhO1xuXG4vLyBleHBvcnQgc3VwcG9ydCBmbGFncyBhbmQgY29uc3RydWN0b3JzLnByb3RvdHlwZSAmJiBQQ1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcHJlZml4OiBwcmVmaXgsXG4gICAgc3VwcG9ydDogISFQQyAmJiBzdXBwb3J0VnA4ICYmICEhZ2V0VXNlck1lZGlhLFxuICAgIC8vIG5ldyBzdXBwb3J0IHN0eWxlXG4gICAgc3VwcG9ydFJUQ1BlZXJDb25uZWN0aW9uOiAhIVBDLFxuICAgIHN1cHBvcnRWcDg6IHN1cHBvcnRWcDgsXG4gICAgc3VwcG9ydEdldFVzZXJNZWRpYTogISFnZXRVc2VyTWVkaWEsXG4gICAgc3VwcG9ydERhdGFDaGFubmVsOiAhIShQQyAmJiBQQy5wcm90b3R5cGUgJiYgUEMucHJvdG90eXBlLmNyZWF0ZURhdGFDaGFubmVsKSxcbiAgICBzdXBwb3J0V2ViQXVkaW86ICEhKEF1ZGlvQ29udGV4dCAmJiBBdWRpb0NvbnRleHQucHJvdG90eXBlLmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKSxcbiAgICBzdXBwb3J0TWVkaWFTdHJlYW06ICEhKE1lZGlhU3RyZWFtICYmIE1lZGlhU3RyZWFtLnByb3RvdHlwZS5yZW1vdmVUcmFjayksXG4gICAgc3VwcG9ydFNjcmVlblNoYXJpbmc6ICEhc2NyZWVuU2hhcmluZyxcbiAgICAvLyBvbGQgZGVwcmVjYXRlZCBzdHlsZS4gRG9udCB1c2UgdGhpcyBhbnltb3JlXG4gICAgZGF0YUNoYW5uZWw6ICEhKFBDICYmIFBDLnByb3RvdHlwZSAmJiBQQy5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwpLFxuICAgIHdlYkF1ZGlvOiAhIShBdWRpb0NvbnRleHQgJiYgQXVkaW9Db250ZXh0LnByb3RvdHlwZS5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZSksXG4gICAgbWVkaWFTdHJlYW06ICEhKE1lZGlhU3RyZWFtICYmIE1lZGlhU3RyZWFtLnByb3RvdHlwZS5yZW1vdmVUcmFjayksXG4gICAgc2NyZWVuU2hhcmluZzogISFzY3JlZW5TaGFyaW5nLFxuICAgIC8vIGNvbnN0cnVjdG9yc1xuICAgIEF1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0LFxuICAgIFBlZXJDb25uZWN0aW9uOiBQQyxcbiAgICBTZXNzaW9uRGVzY3JpcHRpb246IFNlc3Npb25EZXNjcmlwdGlvbixcbiAgICBJY2VDYW5kaWRhdGU6IEljZUNhbmRpZGF0ZSxcbiAgICBNZWRpYVN0cmVhbTogTWVkaWFTdHJlYW0sXG4gICAgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFcbn07XG4iLCIvKlxuV2lsZEVtaXR0ZXIuanMgaXMgYSBzbGltIGxpdHRsZSBldmVudCBlbWl0dGVyIGJ5IEBoZW5yaWtqb3JldGVnIGxhcmdlbHkgYmFzZWQgXG5vbiBAdmlzaW9ubWVkaWEncyBFbWl0dGVyIGZyb20gVUkgS2l0LlxuXG5XaHk/IEkgd2FudGVkIGl0IHN0YW5kYWxvbmUuXG5cbkkgYWxzbyB3YW50ZWQgc3VwcG9ydCBmb3Igd2lsZGNhcmQgZW1pdHRlcnMgbGlrZSB0aGlzOlxuXG5lbWl0dGVyLm9uKCcqJywgZnVuY3Rpb24gKGV2ZW50TmFtZSwgb3RoZXIsIGV2ZW50LCBwYXlsb2Fkcykge1xuICAgIFxufSk7XG5cbmVtaXR0ZXIub24oJ3NvbWVuYW1lc3BhY2UqJywgZnVuY3Rpb24gKGV2ZW50TmFtZSwgcGF5bG9hZHMpIHtcbiAgICBcbn0pO1xuXG5QbGVhc2Ugbm90ZSB0aGF0IGNhbGxiYWNrcyB0cmlnZ2VyZWQgYnkgd2lsZGNhcmQgcmVnaXN0ZXJlZCBldmVudHMgYWxzbyBnZXQgXG50aGUgZXZlbnQgbmFtZSBhcyB0aGUgZmlyc3QgYXJndW1lbnQuXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBXaWxkRW1pdHRlcjtcblxuZnVuY3Rpb24gV2lsZEVtaXR0ZXIoKSB7XG4gICAgdGhpcy5jYWxsYmFja3MgPSB7fTtcbn1cblxuLy8gTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC4gU3RvcmUgYSBncm91cCBuYW1lIGlmIHByZXNlbnQuXG5XaWxkRW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnQsIGdyb3VwTmFtZSwgZm4pIHtcbiAgICB2YXIgaGFzR3JvdXAgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyksXG4gICAgICAgIGdyb3VwID0gaGFzR3JvdXAgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGZ1bmMgPSBoYXNHcm91cCA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1sxXTtcbiAgICBmdW5jLl9ncm91cE5hbWUgPSBncm91cDtcbiAgICAodGhpcy5jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5jYWxsYmFja3NbZXZlbnRdIHx8IFtdKS5wdXNoKGZ1bmMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLy8gQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4vLyB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuV2lsZEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGdyb3VwTmFtZSwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGhhc0dyb3VwID0gKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpLFxuICAgICAgICBncm91cCA9IGhhc0dyb3VwID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLFxuICAgICAgICBmdW5jID0gaGFzR3JvdXAgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMV07XG4gICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgIHNlbGYub2ZmKGV2ZW50LCBvbik7XG4gICAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgdGhpcy5vbihldmVudCwgZ3JvdXAsIG9uKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFVuYmluZHMgYW4gZW50aXJlIGdyb3VwXG5XaWxkRW1pdHRlci5wcm90b3R5cGUucmVsZWFzZUdyb3VwID0gZnVuY3Rpb24gKGdyb3VwTmFtZSkge1xuICAgIHZhciBpdGVtLCBpLCBsZW4sIGhhbmRsZXJzO1xuICAgIGZvciAoaXRlbSBpbiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICBoYW5kbGVycyA9IHRoaXMuY2FsbGJhY2tzW2l0ZW1dO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXJzW2ldLl9ncm91cE5hbWUgPT09IGdyb3VwTmFtZSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3JlbW92aW5nJyk7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGl0IGFuZCBzaG9ydGVuIHRoZSBhcnJheSB3ZSdyZSBsb29waW5nIHRocm91Z2hcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblxuLy8gUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbi8vIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuV2lsZEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5jYWxsYmFja3NbZXZlbnRdLFxuICAgICAgICBpO1xuXG4gICAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gICAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1tldmVudF07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gICAgaSA9IGNhbGxiYWNrcy5pbmRleE9mKGZuKTtcbiAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLy8vIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuLy8gYWxzbyBjYWxscyBhbnkgYCpgIGhhbmRsZXJzXG5XaWxkRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICBjYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrc1tldmVudF0sXG4gICAgICAgIHNwZWNpYWxDYWxsYmFja3MgPSB0aGlzLmdldFdpbGRjYXJkQ2FsbGJhY2tzKGV2ZW50KSxcbiAgICAgICAgaSxcbiAgICAgICAgbGVuLFxuICAgICAgICBpdGVtLFxuICAgICAgICBsaXN0ZW5lcnM7XG5cbiAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgIGxpc3RlbmVycyA9IGNhbGxiYWNrcy5zbGljZSgpO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0pIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNwZWNpYWxDYWxsYmFja3MpIHtcbiAgICAgICAgbGVuID0gc3BlY2lhbENhbGxiYWNrcy5sZW5ndGg7XG4gICAgICAgIGxpc3RlbmVycyA9IHNwZWNpYWxDYWxsYmFja3Muc2xpY2UoKTtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIFtldmVudF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8vIEhlbHBlciBmb3IgZm9yIGZpbmRpbmcgc3BlY2lhbCB3aWxkY2FyZCBldmVudCBoYW5kbGVycyB0aGF0IG1hdGNoIHRoZSBldmVudFxuV2lsZEVtaXR0ZXIucHJvdG90eXBlLmdldFdpbGRjYXJkQ2FsbGJhY2tzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgIHZhciBpdGVtLFxuICAgICAgICBzcGxpdCxcbiAgICAgICAgcmVzdWx0ID0gW107XG5cbiAgICBmb3IgKGl0ZW0gaW4gdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgc3BsaXQgPSBpdGVtLnNwbGl0KCcqJyk7XG4gICAgICAgIGlmIChpdGVtID09PSAnKicgfHwgKHNwbGl0Lmxlbmd0aCA9PT0gMiAmJiBldmVudE5hbWUuc2xpY2UoMCwgc3BsaXRbMF0ubGVuZ3RoKSA9PT0gc3BsaXRbMF0pKSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHRoaXMuY2FsbGJhY2tzW2l0ZW1dKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBXZWJSVEMgPSByZXF1aXJlKCd3ZWJydGMnKTtcbnZhciBXaWxkRW1pdHRlciA9IHJlcXVpcmUoJ3dpbGRlbWl0dGVyJyk7XG52YXIgd2VicnRjU3VwcG9ydCA9IHJlcXVpcmUoJ3dlYnJ0Y3N1cHBvcnQnKTtcbnZhciBhdHRhY2hNZWRpYVN0cmVhbSA9IHJlcXVpcmUoJ2F0dGFjaG1lZGlhc3RyZWFtJyk7XG52YXIgbW9ja2NvbnNvbGUgPSByZXF1aXJlKCdtb2NrY29uc29sZScpO1xudmFyIGlvID0gcmVxdWlyZSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG5cbmZ1bmN0aW9uIFNpbXBsZVdlYlJUQyhvcHRzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBvcHRpb25zID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgY29uZmlnID0gdGhpcy5jb25maWcgPSB7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL3NpZ25hbGluZy5zaW1wbGV3ZWJydGMuY29tJyxcbiAgICAgICAgICAgIHNvY2tldGlvOiB7LyogJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJzp0cnVlKi99LFxuICAgICAgICAgICAgZGVidWc6IGZhbHNlLFxuICAgICAgICAgICAgbG9jYWxWaWRlb0VsOiAnJyxcbiAgICAgICAgICAgIHJlbW90ZVZpZGVvc0VsOiAnJyxcbiAgICAgICAgICAgIGVuYWJsZURhdGFDaGFubmVsczogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9SZXF1ZXN0TWVkaWE6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b1JlbW92ZVZpZGVvczogdHJ1ZSxcbiAgICAgICAgICAgIGFkanVzdFBlZXJWb2x1bWU6IHRydWUsXG4gICAgICAgICAgICBwZWVyVm9sdW1lV2hlblNwZWFraW5nOiAwLjI1LFxuICAgICAgICAgICAgbWVkaWE6IHtcbiAgICAgICAgICAgICAgICB2aWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdWRpbzogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlY2VpdmVNZWRpYTogeyAvLyBGSVhNRTogcmVtb3ZlIG9sZCBjaHJvbWUgPD0gMzcgY29uc3RyYWludHMgZm9ybWF0XG4gICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIE9mZmVyVG9SZWNlaXZlQXVkaW86IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIE9mZmVyVG9SZWNlaXZlVmlkZW86IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9jYWxWaWRlbzoge1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgIG1pcnJvcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtdXRlZDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIHZhciBpdGVtLCBjb25uZWN0aW9uO1xuXG4gICAgLy8gV2UgYWxzbyBhbGxvdyBhICdsb2dnZXInIG9wdGlvbi4gSXQgY2FuIGJlIGFueSBvYmplY3QgdGhhdCBpbXBsZW1lbnRzXG4gICAgLy8gbG9nLCB3YXJuLCBhbmQgZXJyb3IgbWV0aG9kcy5cbiAgICAvLyBXZSBsb2cgbm90aGluZyBieSBkZWZhdWx0LCBmb2xsb3dpbmcgXCJ0aGUgcnVsZSBvZiBzaWxlbmNlXCI6XG4gICAgLy8gaHR0cDovL3d3dy5saW5mby5vcmcvcnVsZV9vZl9zaWxlbmNlLmh0bWxcbiAgICB0aGlzLmxvZ2dlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gd2UgYXNzdW1lIHRoYXQgaWYgeW91J3JlIGluIGRlYnVnIG1vZGUgYW5kIHlvdSBkaWRuJ3RcbiAgICAgICAgLy8gcGFzcyBpbiBhIGxvZ2dlciwgeW91IGFjdHVhbGx5IHdhbnQgdG8gbG9nIGFzIG11Y2ggYXNcbiAgICAgICAgLy8gcG9zc2libGUuXG4gICAgICAgIGlmIChvcHRzLmRlYnVnKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0cy5sb2dnZXIgfHwgY29uc29sZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gb3Igd2UnbGwgdXNlIHlvdXIgbG9nZ2VyIHdoaWNoIHNob3VsZCBoYXZlIGl0cyBvd24gbG9naWNcbiAgICAgICAgLy8gZm9yIG91dHB1dC4gT3Igd2UnbGwgcmV0dXJuIHRoZSBuby1vcC5cbiAgICAgICAgICAgIHJldHVybiBvcHRzLmxvZ2dlciB8fCBtb2NrY29uc29sZTtcbiAgICAgICAgfVxuICAgIH0oKTtcblxuICAgIC8vIHNldCBvdXIgY29uZmlnIGZyb20gb3B0aW9uc1xuICAgIGZvciAoaXRlbSBpbiBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29uZmlnW2l0ZW1dID0gb3B0aW9uc1tpdGVtXTtcbiAgICB9XG5cbiAgICAvLyBhdHRhY2ggZGV0ZWN0ZWQgc3VwcG9ydCBmb3IgY29udmVuaWVuY2VcbiAgICB0aGlzLmNhcGFiaWxpdGllcyA9IHdlYnJ0Y1N1cHBvcnQ7XG5cbiAgICAvLyBjYWxsIFdpbGRFbWl0dGVyIGNvbnN0cnVjdG9yXG4gICAgV2lsZEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIC8vIG91ciBzb2NrZXQuaW8gY29ubmVjdGlvblxuICAgIGNvbm5lY3Rpb24gPSB0aGlzLmNvbm5lY3Rpb24gPSBpby5jb25uZWN0KHRoaXMuY29uZmlnLnVybCwgdGhpcy5jb25maWcuc29ja2V0aW8pO1xuXG4gICAgY29ubmVjdGlvbi5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5lbWl0KCdjb25uZWN0aW9uUmVhZHknLCBjb25uZWN0aW9uLnNvY2tldC5zZXNzaW9uaWQpO1xuICAgICAgICBzZWxmLnNlc3Npb25SZWFkeSA9IHRydWU7XG4gICAgICAgIHNlbGYudGVzdFJlYWRpbmVzcygpO1xuICAgIH0pO1xuXG4gICAgY29ubmVjdGlvbi5vbignbWVzc2FnZScsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgIHZhciBwZWVycyA9IHNlbGYud2VicnRjLmdldFBlZXJzKG1lc3NhZ2UuZnJvbSwgbWVzc2FnZS5yb29tVHlwZSk7XG4gICAgICAgIHZhciBwZWVyO1xuXG4gICAgICAgIGlmIChtZXNzYWdlLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgICAgICAgIGlmIChwZWVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwZWVycy5mb3JFYWNoKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwLnNpZCA9PSBtZXNzYWdlLnNpZCkgcGVlciA9IHA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9pZiAoIXBlZXIpIHBlZXIgPSBwZWVyc1swXTsgLy8gZmFsbGJhY2sgZm9yIG9sZCBwcm90b2NvbCB2ZXJzaW9uc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwZWVyKSB7XG4gICAgICAgICAgICAgICAgcGVlciA9IHNlbGYud2VicnRjLmNyZWF0ZVBlZXIoe1xuICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5mcm9tLFxuICAgICAgICAgICAgICAgICAgICBzaWQ6IG1lc3NhZ2Uuc2lkLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBtZXNzYWdlLnJvb21UeXBlLFxuICAgICAgICAgICAgICAgICAgICBlbmFibGVEYXRhQ2hhbm5lbHM6IHNlbGYuY29uZmlnLmVuYWJsZURhdGFDaGFubmVscyAmJiBtZXNzYWdlLnJvb21UeXBlICE9PSAnc2NyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgc2hhcmVteXNjcmVlbjogbWVzc2FnZS5yb29tVHlwZSA9PT0gJ3NjcmVlbicgJiYgIW1lc3NhZ2UuYnJvYWRjYXN0ZXIsXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdGVyOiBtZXNzYWdlLnJvb21UeXBlID09PSAnc2NyZWVuJyAmJiAhbWVzc2FnZS5icm9hZGNhc3RlciA/IHNlbGYuY29ubmVjdGlvbi5zb2NrZXQuc2Vzc2lvbmlkIDogbnVsbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnY3JlYXRlZFBlZXInLCBwZWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBlZXIuaGFuZGxlTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChwZWVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHBlZXJzLmZvckVhY2goZnVuY3Rpb24gKHBlZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5zaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlZXIuc2lkID09PSBtZXNzYWdlLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVlci5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGVlci5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25uZWN0aW9uLm9uKCdyZW1vdmUnLCBmdW5jdGlvbiAocm9vbSkge1xuICAgICAgICBpZiAocm9vbS5pZCAhPT0gc2VsZi5jb25uZWN0aW9uLnNvY2tldC5zZXNzaW9uaWQpIHtcbiAgICAgICAgICAgIHNlbGYud2VicnRjLnJlbW92ZVBlZXJzKHJvb20uaWQsIHJvb20udHlwZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGluc3RhbnRpYXRlIG91ciBtYWluIFdlYlJUQyBoZWxwZXJcbiAgICAvLyB1c2luZyBzYW1lIGxvZ2dlciBmcm9tIGxvZ2ljIGhlcmVcbiAgICBvcHRzLmxvZ2dlciA9IHRoaXMubG9nZ2VyO1xuICAgIG9wdHMuZGVidWcgPSBmYWxzZTtcbiAgICB0aGlzLndlYnJ0YyA9IG5ldyBXZWJSVEMob3B0cyk7XG5cbiAgICAvLyBhdHRhY2ggYSBmZXcgbWV0aG9kcyBmcm9tIHVuZGVybHlpbmcgbGliIHRvIHNpbXBsZS5cbiAgICBbJ211dGUnLCAndW5tdXRlJywgJ3BhdXNlVmlkZW8nLCAncmVzdW1lVmlkZW8nLCAncGF1c2UnLCAncmVzdW1lJywgJ3NlbmRUb0FsbCcsICdzZW5kRGlyZWN0bHlUb0FsbCddLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgICBzZWxmW21ldGhvZF0gPSBzZWxmLndlYnJ0Y1ttZXRob2RdLmJpbmQoc2VsZi53ZWJydGMpO1xuICAgIH0pO1xuXG4gICAgLy8gcHJveHkgZXZlbnRzIGZyb20gV2ViUlRDXG4gICAgdGhpcy53ZWJydGMub24oJyonLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZW1pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgIH0pO1xuXG4gICAgLy8gbG9nIGFsbCBldmVudHMgaW4gZGVidWcgbW9kZVxuICAgIGlmIChjb25maWcuZGVidWcpIHtcbiAgICAgICAgdGhpcy5vbignKicsIHRoaXMubG9nZ2VyLmxvZy5iaW5kKHRoaXMubG9nZ2VyLCAnU2ltcGxlV2ViUlRDIGV2ZW50OicpKTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBmb3IgcmVhZGluZXNzXG4gICAgdGhpcy53ZWJydGMub24oJ2xvY2FsU3RyZWFtJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnRlc3RSZWFkaW5lc3MoKTtcbiAgICB9KTtcblxuICAgIHRoaXMud2VicnRjLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgICAgICAgc2VsZi5jb25uZWN0aW9uLmVtaXQoJ21lc3NhZ2UnLCBwYXlsb2FkKTtcbiAgICB9KTtcblxuICAgIHRoaXMud2VicnRjLm9uKCdwZWVyU3RyZWFtQWRkZWQnLCB0aGlzLmhhbmRsZVBlZXJTdHJlYW1BZGRlZC5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLndlYnJ0Yy5vbigncGVlclN0cmVhbVJlbW92ZWQnLCB0aGlzLmhhbmRsZVBlZXJTdHJlYW1SZW1vdmVkLmJpbmQodGhpcykpO1xuXG4gICAgLy8gZWNobyBjYW5jZWxsYXRpb24gYXR0ZW1wdHNcbiAgICBpZiAodGhpcy5jb25maWcuYWRqdXN0UGVlclZvbHVtZSkge1xuICAgICAgICB0aGlzLndlYnJ0Yy5vbignc3BlYWtpbmcnLCB0aGlzLnNldFZvbHVtZUZvckFsbC5iaW5kKHRoaXMsIHRoaXMuY29uZmlnLnBlZXJWb2x1bWVXaGVuU3BlYWtpbmcpKTtcbiAgICAgICAgdGhpcy53ZWJydGMub24oJ3N0b3BwZWRTcGVha2luZycsIHRoaXMuc2V0Vm9sdW1lRm9yQWxsLmJpbmQodGhpcywgMSkpO1xuICAgIH1cblxuICAgIGNvbm5lY3Rpb24ub24oJ3N0dW5zZXJ2ZXJzJywgZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgLy8gcmVzZXRzL292ZXJyaWRlcyB0aGUgY29uZmlnXG4gICAgICAgIHNlbGYud2VicnRjLmNvbmZpZy5wZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gYXJncztcbiAgICAgICAgc2VsZi5lbWl0KCdzdHVuc2VydmVycycsIGFyZ3MpO1xuICAgIH0pO1xuICAgIGNvbm5lY3Rpb24ub24oJ3R1cm5zZXJ2ZXJzJywgZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgLy8gYXBwZW5kcyB0byB0aGUgY29uZmlnXG4gICAgICAgIHNlbGYud2VicnRjLmNvbmZpZy5wZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gc2VsZi53ZWJydGMuY29uZmlnLnBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMuY29uY2F0KGFyZ3MpO1xuICAgICAgICBzZWxmLmVtaXQoJ3R1cm5zZXJ2ZXJzJywgYXJncyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLndlYnJ0Yy5vbignaWNlRmFpbGVkJywgZnVuY3Rpb24gKHBlZXIpIHtcbiAgICAgICAgLy8gbG9jYWwgaWNlIGZhaWx1cmVcbiAgICB9KTtcbiAgICB0aGlzLndlYnJ0Yy5vbignY29ubmVjdGl2aXR5RXJyb3InLCBmdW5jdGlvbiAocGVlcikge1xuICAgICAgICAvLyByZW1vdGUgaWNlIGZhaWx1cmVcbiAgICB9KTtcblxuXG4gICAgLy8gc2VuZGluZyBtdXRlL3VubXV0ZSB0byBhbGwgcGVlcnNcbiAgICB0aGlzLndlYnJ0Yy5vbignYXVkaW9PbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi53ZWJydGMuc2VuZFRvQWxsKCd1bm11dGUnLCB7bmFtZTogJ2F1ZGlvJ30pO1xuICAgIH0pO1xuICAgIHRoaXMud2VicnRjLm9uKCdhdWRpb09mZicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi53ZWJydGMuc2VuZFRvQWxsKCdtdXRlJywge25hbWU6ICdhdWRpbyd9KTtcbiAgICB9KTtcbiAgICB0aGlzLndlYnJ0Yy5vbigndmlkZW9PbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi53ZWJydGMuc2VuZFRvQWxsKCd1bm11dGUnLCB7bmFtZTogJ3ZpZGVvJ30pO1xuICAgIH0pO1xuICAgIHRoaXMud2VicnRjLm9uKCd2aWRlb09mZicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi53ZWJydGMuc2VuZFRvQWxsKCdtdXRlJywge25hbWU6ICd2aWRlbyd9KTtcbiAgICB9KTtcblxuICAgIC8vIHNjcmVlbnNoYXJpbmcgZXZlbnRzXG4gICAgdGhpcy53ZWJydGMub24oJ2xvY2FsU2NyZWVuJywgZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICB2YXIgaXRlbSxcbiAgICAgICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKSxcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IHNlbGYuZ2V0UmVtb3RlVmlkZW9Db250YWluZXIoKTtcblxuICAgICAgICBlbC5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH07XG4gICAgICAgIGVsLmlkID0gJ2xvY2FsU2NyZWVuJztcbiAgICAgICAgYXR0YWNoTWVkaWFTdHJlYW0oc3RyZWFtLCBlbCk7XG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLmVtaXQoJ2xvY2FsU2NyZWVuQWRkZWQnLCBlbCk7XG4gICAgICAgIHNlbGYuY29ubmVjdGlvbi5lbWl0KCdzaGFyZVNjcmVlbicpO1xuXG4gICAgICAgIHNlbGYud2VicnRjLnBlZXJzLmZvckVhY2goZnVuY3Rpb24gKGV4aXN0aW5nUGVlcikge1xuICAgICAgICAgICAgdmFyIHBlZXI7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdQZWVyLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgICBwZWVyID0gc2VsZi53ZWJydGMuY3JlYXRlUGVlcih7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBleGlzdGluZ1BlZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzY3JlZW4nLFxuICAgICAgICAgICAgICAgICAgICBzaGFyZW15c2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBlbmFibGVEYXRhQ2hhbm5lbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlTWVkaWE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hbmRhdG9yeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9mZmVyVG9SZWNlaXZlQXVkaW86IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9mZmVyVG9SZWNlaXZlVmlkZW86IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdGVyOiBzZWxmLmNvbm5lY3Rpb24uc29ja2V0LnNlc3Npb25pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2NyZWF0ZWRQZWVyJywgcGVlcik7XG4gICAgICAgICAgICAgICAgcGVlci5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLndlYnJ0Yy5vbignbG9jYWxTY3JlZW5TdG9wcGVkJywgZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICBzZWxmLnN0b3BTY3JlZW5TaGFyZSgpO1xuICAgICAgICAvKlxuICAgICAgICBzZWxmLmNvbm5lY3Rpb24uZW1pdCgndW5zaGFyZVNjcmVlbicpO1xuICAgICAgICBzZWxmLndlYnJ0Yy5wZWVycy5mb3JFYWNoKGZ1bmN0aW9uIChwZWVyKSB7XG4gICAgICAgICAgICBpZiAocGVlci5zaGFyZW15c2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgcGVlci5lbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICovXG4gICAgfSk7XG5cbiAgICB0aGlzLndlYnJ0Yy5vbignY2hhbm5lbE1lc3NhZ2UnLCBmdW5jdGlvbiAocGVlciwgbGFiZWwsIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PSAndm9sdW1lJykge1xuICAgICAgICAgICAgc2VsZi5lbWl0KCdyZW1vdGVWb2x1bWVDaGFuZ2UnLCBwZWVyLCBkYXRhLnZvbHVtZSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5hdXRvUmVxdWVzdE1lZGlhKSB0aGlzLnN0YXJ0TG9jYWxWaWRlbygpO1xufVxuXG5cblNpbXBsZVdlYlJUQy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFdpbGRFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBTaW1wbGVXZWJSVENcbiAgICB9XG59KTtcblxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5sZWF2ZVJvb20gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMucm9vbU5hbWUpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmVtaXQoJ2xlYXZlJyk7XG4gICAgICAgIHRoaXMud2VicnRjLnBlZXJzLmZvckVhY2goZnVuY3Rpb24gKHBlZXIpIHtcbiAgICAgICAgICAgIHBlZXIuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5nZXRMb2NhbFNjcmVlbigpKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BTY3JlZW5TaGFyZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCgnbGVmdFJvb20nLCB0aGlzLnJvb21OYW1lKTtcbiAgICAgICAgdGhpcy5yb29tTmFtZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59O1xuXG5TaW1wbGVXZWJSVEMucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmRpc2Nvbm5lY3QoKTtcbiAgICBkZWxldGUgdGhpcy5jb25uZWN0aW9uO1xufTtcblxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5oYW5kbGVQZWVyU3RyZWFtQWRkZWQgPSBmdW5jdGlvbiAocGVlcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5nZXRSZW1vdGVWaWRlb0NvbnRhaW5lcigpO1xuICAgIHZhciB2aWRlbyA9IGF0dGFjaE1lZGlhU3RyZWFtKHBlZXIuc3RyZWFtKTtcblxuICAgIC8vIHN0b3JlIHZpZGVvIGVsZW1lbnQgYXMgcGFydCBvZiBwZWVyIGZvciBlYXN5IHJlbW92YWxcbiAgICBwZWVyLnZpZGVvRWwgPSB2aWRlbztcbiAgICB2aWRlby5pZCA9IHRoaXMuZ2V0RG9tSWQocGVlcik7XG5cbiAgICBpZiAoY29udGFpbmVyKSBjb250YWluZXIuYXBwZW5kQ2hpbGQodmlkZW8pO1xuXG4gICAgdGhpcy5lbWl0KCd2aWRlb0FkZGVkJywgdmlkZW8sIHBlZXIpO1xuXG4gICAgLy8gc2VuZCBvdXIgbXV0ZSBzdGF0dXMgdG8gbmV3IHBlZXIgaWYgd2UncmUgbXV0ZWRcbiAgICAvLyBjdXJyZW50bHkgY2FsbGVkIHdpdGggYSBzbWFsbCBkZWxheSBiZWNhdXNlIGl0IGFycml2ZXMgYmVmb3JlXG4gICAgLy8gdGhlIHZpZGVvIGVsZW1lbnQgaXMgY3JlYXRlZCBvdGhlcndpc2UgKHdoaWNoIGhhcHBlbnMgYWZ0ZXJcbiAgICAvLyB0aGUgYXN5bmMgc2V0UmVtb3RlRGVzY3JpcHRpb24tY3JlYXRlQW5zd2VyKVxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFzZWxmLndlYnJ0Yy5pc0F1ZGlvRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBwZWVyLnNlbmQoJ211dGUnLCB7bmFtZTogJ2F1ZGlvJ30pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2VsZi53ZWJydGMuaXNWaWRlb0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgcGVlci5zZW5kKCdtdXRlJywge25hbWU6ICd2aWRlbyd9KTtcbiAgICAgICAgfVxuICAgIH0sIDI1MCk7XG59O1xuXG5TaW1wbGVXZWJSVEMucHJvdG90eXBlLmhhbmRsZVBlZXJTdHJlYW1SZW1vdmVkID0gZnVuY3Rpb24gKHBlZXIpIHtcbiAgICB2YXIgY29udGFpbmVyID0gdGhpcy5nZXRSZW1vdGVWaWRlb0NvbnRhaW5lcigpO1xuICAgIHZhciB2aWRlb0VsID0gcGVlci52aWRlb0VsO1xuICAgIGlmICh0aGlzLmNvbmZpZy5hdXRvUmVtb3ZlVmlkZW9zICYmIGNvbnRhaW5lciAmJiB2aWRlb0VsKSB7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZCh2aWRlb0VsKTtcbiAgICB9XG4gICAgaWYgKHZpZGVvRWwpIHRoaXMuZW1pdCgndmlkZW9SZW1vdmVkJywgdmlkZW9FbCwgcGVlcik7XG59O1xuXG5TaW1wbGVXZWJSVEMucHJvdG90eXBlLmdldERvbUlkID0gZnVuY3Rpb24gKHBlZXIpIHtcbiAgICByZXR1cm4gW3BlZXIuaWQsIHBlZXIudHlwZSwgcGVlci5icm9hZGNhc3RlciA/ICdicm9hZGNhc3RpbmcnIDogJ2luY29taW5nJ10uam9pbignXycpO1xufTtcblxuLy8gc2V0IHZvbHVtZSBvbiB2aWRlbyB0YWcgZm9yIGFsbCBwZWVycyB0YWtzZSBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMVxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5zZXRWb2x1bWVGb3JBbGwgPSBmdW5jdGlvbiAodm9sdW1lKSB7XG4gICAgdGhpcy53ZWJydGMucGVlcnMuZm9yRWFjaChmdW5jdGlvbiAocGVlcikge1xuICAgICAgICBpZiAocGVlci52aWRlb0VsKSBwZWVyLnZpZGVvRWwudm9sdW1lID0gdm9sdW1lO1xuICAgIH0pO1xufTtcblxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5qb2luUm9vbSA9IGZ1bmN0aW9uIChuYW1lLCBjYikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnJvb21OYW1lID0gbmFtZTtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnam9pbicsIG5hbWUsIGZ1bmN0aW9uIChlcnIsIHJvb21EZXNjcmlwdGlvbikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpZCxcbiAgICAgICAgICAgICAgICBjbGllbnQsXG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBwZWVyO1xuICAgICAgICAgICAgZm9yIChpZCBpbiByb29tRGVzY3JpcHRpb24uY2xpZW50cykge1xuICAgICAgICAgICAgICAgIGNsaWVudCA9IHJvb21EZXNjcmlwdGlvbi5jbGllbnRzW2lkXTtcbiAgICAgICAgICAgICAgICBmb3IgKHR5cGUgaW4gY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnRbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXIgPSBzZWxmLndlYnJ0Yy5jcmVhdGVQZWVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVEYXRhQ2hhbm5lbHM6IHNlbGYuY29uZmlnLmVuYWJsZURhdGFDaGFubmVscyAmJiB0eXBlICE9PSAnc2NyZWVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlTWVkaWE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFuZGF0b3J5OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiB0eXBlICE9PSAnc2NyZWVuJyAmJiBzZWxmLmNvbmZpZy5yZWNlaXZlTWVkaWEubWFuZGF0b3J5Lk9mZmVyVG9SZWNlaXZlQXVkaW8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPZmZlclRvUmVjZWl2ZVZpZGVvOiBzZWxmLmNvbmZpZy5yZWNlaXZlTWVkaWEubWFuZGF0b3J5Lk9mZmVyVG9SZWNlaXZlVmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdjcmVhdGVkUGVlcicsIHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVlci5zdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNiKSBjYihlcnIsIHJvb21EZXNjcmlwdGlvbik7XG4gICAgICAgIHNlbGYuZW1pdCgnam9pbmVkUm9vbScsIG5hbWUpO1xuICAgIH0pO1xufTtcblxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5nZXRFbCA9IGZ1bmN0aW9uIChpZE9yRWwpIHtcbiAgICBpZiAodHlwZW9mIGlkT3JFbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkT3JFbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlkT3JFbDtcbiAgICB9XG59O1xuXG5TaW1wbGVXZWJSVEMucHJvdG90eXBlLnN0YXJ0TG9jYWxWaWRlbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy53ZWJydGMuc3RhcnRMb2NhbE1lZGlhKHRoaXMuY29uZmlnLm1lZGlhLCBmdW5jdGlvbiAoZXJyLCBzdHJlYW0pIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgc2VsZi5lbWl0KCdsb2NhbE1lZGlhRXJyb3InLCBlcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXR0YWNoTWVkaWFTdHJlYW0oc3RyZWFtLCBzZWxmLmdldExvY2FsVmlkZW9Db250YWluZXIoKSwgc2VsZi5jb25maWcubG9jYWxWaWRlbyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblNpbXBsZVdlYlJUQy5wcm90b3R5cGUuc3RvcExvY2FsVmlkZW8gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy53ZWJydGMuc3RvcExvY2FsTWVkaWEoKTtcbn07XG5cbi8vIHRoaXMgYWNjZXB0cyBlaXRoZXIgZWxlbWVudCBJRCBvciBlbGVtZW50XG4vLyBhbmQgZWl0aGVyIHRoZSB2aWRlbyB0YWcgaXRzZWxmIG9yIGEgY29udGFpbmVyXG4vLyB0aGF0IHdpbGwgYmUgdXNlZCB0byBwdXQgdGhlIHZpZGVvIHRhZyBpbnRvLlxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5nZXRMb2NhbFZpZGVvQ29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbCA9IHRoaXMuZ2V0RWwodGhpcy5jb25maWcubG9jYWxWaWRlb0VsKTtcbiAgICBpZiAoZWwgJiYgZWwudGFnTmFtZSA9PT0gJ1ZJREVPJykge1xuICAgICAgICBlbC5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH07XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9IGVsc2UgaWYgKGVsKSB7XG4gICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIHZpZGVvLm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQodmlkZW8pO1xuICAgICAgICByZXR1cm4gdmlkZW87XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn07XG5cblNpbXBsZVdlYlJUQy5wcm90b3R5cGUuZ2V0UmVtb3RlVmlkZW9Db250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWwodGhpcy5jb25maWcucmVtb3RlVmlkZW9zRWwpO1xufTtcblxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5zaGFyZVNjcmVlbiA9IGZ1bmN0aW9uIChjYikge1xuICAgIHRoaXMud2VicnRjLnN0YXJ0U2NyZWVuU2hhcmUoY2IpO1xufTtcblxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS5nZXRMb2NhbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy53ZWJydGMubG9jYWxTY3JlZW47XG59O1xuXG5TaW1wbGVXZWJSVEMucHJvdG90eXBlLnN0b3BTY3JlZW5TaGFyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgndW5zaGFyZVNjcmVlbicpO1xuICAgIHZhciB2aWRlb0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2FsU2NyZWVuJyk7XG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuZ2V0UmVtb3RlVmlkZW9Db250YWluZXIoKTtcbiAgICB2YXIgc3RyZWFtID0gdGhpcy5nZXRMb2NhbFNjcmVlbigpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmF1dG9SZW1vdmVWaWRlb3MgJiYgY29udGFpbmVyICYmIHZpZGVvRWwpIHtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWwpO1xuICAgIH1cblxuICAgIC8vIGEgaGFjayB0byBlbWl0IHRoZSBldmVudCB0aGUgcmVtb3ZlcyB0aGUgdmlkZW9cbiAgICAvLyBlbGVtZW50IHRoYXQgd2Ugd2FudFxuICAgIGlmICh2aWRlb0VsKSB0aGlzLmVtaXQoJ3ZpZGVvUmVtb3ZlZCcsIHZpZGVvRWwpO1xuICAgIGlmIChzdHJlYW0pIHN0cmVhbS5zdG9wKCk7XG4gICAgdGhpcy53ZWJydGMucGVlcnMuZm9yRWFjaChmdW5jdGlvbiAocGVlcikge1xuICAgICAgICBpZiAocGVlci5icm9hZGNhc3Rlcikge1xuICAgICAgICAgICAgcGVlci5lbmQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vZGVsZXRlIHRoaXMud2VicnRjLmxvY2FsU2NyZWVuO1xufTtcblxuU2ltcGxlV2ViUlRDLnByb3RvdHlwZS50ZXN0UmVhZGluZXNzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAodGhpcy53ZWJydGMubG9jYWxTdHJlYW0gJiYgdGhpcy5zZXNzaW9uUmVhZHkpIHtcbiAgICAgICAgc2VsZi5lbWl0KCdyZWFkeVRvQ2FsbCcsIHNlbGYuY29ubmVjdGlvbi5zb2NrZXQuc2Vzc2lvbmlkKTtcbiAgICB9XG59O1xuXG5TaW1wbGVXZWJSVEMucHJvdG90eXBlLmNyZWF0ZVJvb20gPSBmdW5jdGlvbiAobmFtZSwgY2IpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnY3JlYXRlJywgbmFtZSwgY2IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdjcmVhdGUnLCBuYW1lKTtcbiAgICB9XG59O1xuXG5TaW1wbGVXZWJSVEMucHJvdG90eXBlLnNlbmRGaWxlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghd2VicnRjU3VwcG9ydC5kYXRhQ2hhbm5lbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignRGF0YUNoYW5uZWxOb3RTdXBwb3J0ZWQnKSk7XG4gICAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZVdlYlJUQztcbiIsIlxudmFyIHJuZztcblxuaWYgKGdsb2JhbC5jcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICByZXR1cm4gX3JuZHM4O1xuICB9O1xufVxuXG5pZiAoIXJuZykge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9ybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcblxuIiwiLy8gICAgIHV1aWQuanNcbi8vXG4vLyAgICAgQ29weXJpZ2h0IChjKSAyMDEwLTIwMTIgUm9iZXJ0IEtpZWZmZXJcbi8vICAgICBNSVQgTGljZW5zZSAtIGh0dHA6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblxuLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIFdlIGZlYXR1cmVcbi8vIGRldGVjdCB0byBkZXRlcm1pbmUgdGhlIGJlc3QgUk5HIHNvdXJjZSwgbm9ybWFsaXppbmcgdG8gYSBmdW5jdGlvbiB0aGF0XG4vLyByZXR1cm5zIDEyOC1iaXRzIG9mIHJhbmRvbW5lc3MsIHNpbmNlIHRoYXQncyB3aGF0J3MgdXN1YWxseSByZXF1aXJlZFxudmFyIF9ybmcgPSByZXF1aXJlKCcuL3JuZycpO1xuXG4vLyBNYXBzIGZvciBudW1iZXIgPC0+IGhleCBzdHJpbmcgY29udmVyc2lvblxudmFyIF9ieXRlVG9IZXggPSBbXTtcbnZhciBfaGV4VG9CeXRlID0ge307XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIF9ieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xuICBfaGV4VG9CeXRlW19ieXRlVG9IZXhbaV1dID0gaTtcbn1cblxuLy8gKipgcGFyc2UoKWAgLSBQYXJzZSBhIFVVSUQgaW50byBpdCdzIGNvbXBvbmVudCBieXRlcyoqXG5mdW5jdGlvbiBwYXJzZShzLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IChidWYgJiYgb2Zmc2V0KSB8fCAwLCBpaSA9IDA7XG5cbiAgYnVmID0gYnVmIHx8IFtdO1xuICBzLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWzAtOWEtZl17Mn0vZywgZnVuY3Rpb24ob2N0KSB7XG4gICAgaWYgKGlpIDwgMTYpIHsgLy8gRG9uJ3Qgb3ZlcmZsb3chXG4gICAgICBidWZbaSArIGlpKytdID0gX2hleFRvQnl0ZVtvY3RdO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gWmVybyBvdXQgcmVtYWluaW5nIGJ5dGVzIGlmIHN0cmluZyB3YXMgc2hvcnRcbiAgd2hpbGUgKGlpIDwgMTYpIHtcbiAgICBidWZbaSArIGlpKytdID0gMDtcbiAgfVxuXG4gIHJldHVybiBidWY7XG59XG5cbi8vICoqYHVucGFyc2UoKWAgLSBDb252ZXJ0IFVVSUQgYnl0ZSBhcnJheSAoYWxhIHBhcnNlKCkpIGludG8gYSBzdHJpbmcqKlxuZnVuY3Rpb24gdW5wYXJzZShidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwLCBidGggPSBfYnl0ZVRvSGV4O1xuICByZXR1cm4gIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4vLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxudmFyIF9zZWVkQnl0ZXMgPSBfcm5nKCk7XG5cbi8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxudmFyIF9ub2RlSWQgPSBbXG4gIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG5dO1xuXG4vLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxudmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7IG4rKykge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiB1bnBhcnNlKGIpO1xufVxuXG4vLyAqKmB2NCgpYCAtIEdlbmVyYXRlIHJhbmRvbSBVVUlEKipcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgLy8gRGVwcmVjYXRlZCAtICdmb3JtYXQnIGFyZ3VtZW50LCBhcyBzdXBwb3J0ZWQgaW4gdjEuMlxuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgaWkrKykge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IHVucGFyc2Uocm5kcyk7XG59XG5cbi8vIEV4cG9ydCBwdWJsaWMgQVBJXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xudXVpZC5wYXJzZSA9IHBhcnNlO1xudXVpZC51bnBhcnNlID0gdW5wYXJzZTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIyJykuRXZlbnRFbWl0dGVyMixcbiAgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuXG5mdW5jdGlvbiBDb25uZWN0aW9uKGNoYW5uZWwpIHtcblxuICB2YXIgU2ltcGxlV2ViUlRDID0gcmVxdWlyZSgnc2ltcGxld2VicnRjJylcbiAgdGhpcy53ZWJydGMgPSBuZXcgU2ltcGxlV2ViUlRDKHtcbiAgICAvLyB3ZSBkb24ndCBkbyB2aWRlb1xuICAgIGxvY2FsVmlkZW9FbDogJycsXG4gICAgcmVtb3RlVmlkZW9zRWw6ICcnLFxuICAgIC8vIGRlYnVnOiB0cnVlLFxuICAgIC8vIGRvbnQgYXNrIGZvciBjYW1lcmEgYWNjZXNzXG4gICAgYXV0b1JlcXVlc3RNZWRpYTogZmFsc2UsXG4gICAgLy8gZG9udCBuZWdvdGlhdGUgbWVkaWFcbiAgICByZWNlaXZlTWVkaWE6IHtcbiAgICAgIG1hbmRhdG9yeToge1xuICAgICAgICBPZmZlclRvUmVjZWl2ZUF1ZGlvOiBmYWxzZSxcbiAgICAgICAgT2ZmZXJUb1JlY2VpdmVWaWRlbzogZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgdGhpcy5jbGllbnRzID0gW11cbiAgdGhpcy5hZG1pbnMgPSBbXVxuICB0aGlzLmFkbWluID0gdHJ1ZVxuXG4gIHRoaXMud2VicnRjLmpvaW5Sb29tKGNoYW5uZWwpXG4gIHRoaXMud2VicnRjLm9uKCdtdXRlJywgdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKSlcbiAgdGhpcy53ZWJydGMub24oJ2Nvbm5lY3Rpb25SZWFkeScsIHRoaXMub25SZWFkeS5iaW5kKHRoaXMpKVxufVxuXG5Db25uZWN0aW9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSlcblxuQ29ubmVjdGlvbi5wcm90b3R5cGUub25SZWFkeSA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciBpZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGllbnRJZCcpXG5cbiAgaWYgKCFpZCkge1xuICAgIGlkID0gdXVpZC52NCgpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsaWVudElkJywgaWQpXG4gIH1cblxuICB0aGlzLmlkID0gaWRcblxuICB2YXIgYnJvYWRjYXN0ID0gdGhpcy5icm9hZGNhc3QuYmluZCh0aGlzKSxcbiAgICBhZG1pbiA9IHRoaXMuYWRtaW4sXG4gICAgZW1pdCA9IHRoaXMuZW1pdC5iaW5kKHRoaXMpXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgYnJvYWRjYXN0KHtcbiAgICAgIF9jb25uZWN0aW9uOiB0cnVlLFxuICAgICAgaXNBZG1pbjogYWRtaW5cbiAgICB9KVxuICAgIGVtaXQoJ3JlYWR5JylcbiAgfSwgMTAwMClcbn1cblxuQ29ubmVjdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0ID0gZnVuY3Rpb24ocGF5bG9hZCkge1xuICBwYXlsb2FkLmNsaWVudElkID0gdGhpcy5pZFxuICB0aGlzLndlYnJ0Yy5zZW5kVG9BbGwoJ211dGUnLCB7XG4gICAgbmFtZTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pXG59XG5cbkNvbm5lY3Rpb24ucHJvdG90eXBlLm9uTWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHBheWxvYWQ7XG4gIHRyeSB7XG4gICAgcGF5bG9hZCA9IEpTT04ucGFyc2UoZS5uYW1lKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBwYXlsb2FkID0gbnVsbFxuICB9XG5cbiAgaWYgKHBheWxvYWQubmFtZSAmJiBwYXlsb2FkLnZhbHVlKSB7XG4gICAgdGhpcy5lbWl0KHBheWxvYWQubmFtZSwgcGF5bG9hZC52YWx1ZSwgcGF5bG9hZC5jbGllbnRJZClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbm5lY3Rpb247XG4iXX0=
