#!/usr/bin/env node

var filesContent =  require('..')
  , fs           =  require('fs')
  , argv         =  process.argv;


function printUsage() {
 var msg = [ 
      ''
    , 'Usage: gist-files-content <filename.js>'
    , ''
    , 'Unix Pipe Example: curl https://api.github.com/gists/3815721 | gist-files-content'
    , ''
  ].join('\n');
  console.error(msg);
  process.exit(1);
}

var filter = (function() {
  var filterIdx = argv.indexOf('--filter');
  filterIdx = ~filterIdx ? filterIdx : argv.indexOf('-f');
  return ~filterIdx ? argv[filterIdx + 1] : null;
})();
var files = filter 
  ? filter.split(',').map(function (s) { return s.trim(); }) 
  : null;

// pipe
process.stdin
  .pipe(filesContent({ files: files }))
  .pipe(process.stdout);
