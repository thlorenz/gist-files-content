'use strict';
var filesContent = require('..')
  , fs = require('fs');

var json = fs.readFileSync(__dirname + '/two-files.json', 'utf8');
var res = filesContent(json);

console.log(res);
