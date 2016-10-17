'use strict';

var clickyLoader   = require('./clicky-loader');
var setVisitorData = require('./set-visitor-data');

var loaded        = false;
var postLoadCalls = [];

/**
 * Make a call on the window.clicky object if it is loaded. Queue the call to run
 * when the JS loads if it is not yet loaded.
 *
 * @param  {string} funcName Name of the funciton on window.clicky to call
 * @param  {array}  funcArgs Arglist (array or arguments object)
 * @return {void}
 */
function doClickyCall(funcName, funcArgs) {
  if (loaded) {
    window.clicky[funcName].apply(window.clicky, funcArgs);
  } else {
    postLoadCalls.push({
      funcName : funcName,
      funcArgs : funcArgs
    });
  }
}

/**
 * [runPostLoadCalls description]
 * @return {[type]} [description]
 */
function runPostLoadCalls() {
  postLoadCalls.forEach(function(postLoadCall) {
    doClickyCall(postLoadCall.funcName, postLoadCall.funcArgs);
  });
}

function clickyLoaded() {
  loaded = true;

  if (! window.clicky.setVisitorData) {
    // Patch setVisitorData into window.clicky
    window.clicky.setVisitorData = setVisitorData;
  }
  runPostLoadCalls();
}

function loadClicky() {
  if (!window.clicky) {
    clickyLoader(clickyLoaded);
  } else {
    clickyLoaded();
  }
}

if (typeof window !== 'undefined') {
  loadClicky()
}

// This will define our public API
var clickyMethods = [
  'init',
  'log',
  'goal',
  'setVisitorData'
];

clickyMethods.map(function(method) {
  exports[method] = function() {
    doClickyCall(method, arguments);
  };
});

exports.isLoaded = function() {
  return loaded;
};
