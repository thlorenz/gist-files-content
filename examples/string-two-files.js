'use strict';
var printContent = require('..')
  , fs = require('fs');

var json = fs.readFileSync(__dirname + '/two-files.json', 'utf8');
var res = printContent(json);

console.log(res);
