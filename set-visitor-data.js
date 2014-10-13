'use strict';

module.exports = function(data) {
  if (! window.clicky_custom) {
    window.clicky_custom = {};
  }

  if (! window.clicky_custom.visitor) {
    window.clicky_custom.visitor = {};
  }

  for (var key in data) {
    window.clicky_custom.visitor[key] = data[key];
  }

  window.clicky.custom_data();
};
