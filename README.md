Clicky Loader
=============

This is a library designed to wrap, load, and patch JavaScript for [Clicky](https://clicky.com)
for apps that use CommonJS module loaders like Browserify or Webpack.

Because of the way Clicky's JavaScript is traditionally loaded, your single-page app must
either wait for `window.clicky` to be populated to log the current URL/page title, goals, or
custom data.

This library will load the clicky JavaScript asynchronously and queue any calls from your
application to Clicky's own JavaScript until it is loaded, at which point it will make
any necessary calls.

The benefit of this approach is that your JavaScript application can make any calls it
needs to using this library as a proxy, without needing to check if Clicky has loaded yet.
This can reduce your application's loading speed, especially if you are loading Clicky
synchronously or otherwise waiting to initialize your application until it is loaded.

Additionally, Clicky's use of global variables such as `clicky_custom` to log custom data
works well with traditional web apps, but does not make much sense for single-page apps.
As such, `setVisitorData` has been patched into the Clicky object to allow easier updating
of custom data.

Installation
============

`npm install clicky-loader`

Usage
=====

In any module you want to log data to Clicky:

```
var clicky = require('clicky');

clicky.init(YOUR_SITE_ID);

clicky.log(window.location.hash, 'Page Title', 'pageview');
clicky.goal('The user did something!');
```

Public API
==========

 - `init(siteId)` - initialize clicky with your site ID
 - `log(href, title, type)` - the current href, page title, and action type (
  one of `click` (default), `pageview`, `download`, `outbound`)
 - `setVisitorData(object)` - sets window.clicky_custom.visitor with the object
   you provide
 - `isLoaded()` - whether Clicky has loaded yet
