#!/usr/local/bin/node

// $ ./node.js
// 
// go from preconfigured nodejs REPL from terminal.
// alias this script to a command like `js`.
// `$ alias js='~/.snippets/node.js'`

// require the REPL (the nodejs "prompt")
var repl = require("repl");

// configure REPL:
// - set promt to `js>`
// - attach the list of modules
var context = repl.start("js> ").context;
    
// nodejs core modules to attach
var myModules = [ 
  'buffer', 'dns', 'events', 'fs',
  'http', 'https', 'net', 'os', 'path',
  'punycode', 'stream', 'tls', 'util'
  ];

(function attach (modules) {
  modules.forEach(function(module) {
    context[module] = require(module);    
  });
})(myModules);
  
