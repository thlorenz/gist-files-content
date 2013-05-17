'use strict';
var filesContent = require('..')
  , fs = require('fs');

fs.createReadStream(__dirname + '/two-files.json', { encoding: 'utf-8' })
  .pipe(filesContent({ files: 'script.js' }))
  .pipe(process.stdout);
