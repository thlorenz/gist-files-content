'use strict';
var printContent = require('..')
  , fs = require('fs');

fs.createReadStream(__dirname + '/two-files.json', { encoding: 'utf-8' })
  .pipe(printContent({ files: 'script.js' }))
  .pipe(process.stdout);
