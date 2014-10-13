'use strict';

module.exports = function clickyLoader(callback) {

  var script = document.createElement('script');
  var loaded = false;

  script.setAttribute('src', '//static.getclicky.com/js');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('async', true);

  if (callback) {
    script.onload = function() {
      if (! loaded) {
        callback();
      }

      loaded = true;
    };
  }

  var parentEl = (
    document.getElementsByTagName('head')[0] ||
    document.getElementsByTagName('body')[0]
  );

  parentEl.appendChild(script);

};
