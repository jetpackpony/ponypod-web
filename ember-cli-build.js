/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    outputPaths: {
      app: {
        css: {
          "app": "/assets/css/ponypod-frontend.css"
        },
        js: "/assets/js/ponypod-frontend.js"
      },
      vendor: {
        js: '/assets/js/vendor.js',
        css: '/assets/css/vendor.css'
      }
    },
    sassOptions: {
      includePaths: ['bower_components/materialize/sass']
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  //
  app.import('bower_components/materialize/dist/js/materialize.min.js');
  var materializeFonts = pickFiles('bower_components/materialize/dist/fonts', {
    srcDir: '/',
    destDir: '/assets/fonts'
  });

  return app.toTree([materializeFonts]);
};
