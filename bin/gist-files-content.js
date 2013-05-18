#!/usr/bin/env node

var filesContent =  require('..')
  , fs           =  require('fs')
  , args         =  process.argv;


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

// pipe
process.stdin
  .pipe(filesContent())
  .pipe(process.stdout);
