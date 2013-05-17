'use strict';
var filesContent = require('..')
  , fs = require('fs');

fs.createReadStream(__dirname + '/one-file.json', { encoding: 'utf-8' })
  .pipe(filesContent())
  .pipe(process.stdout);
