'use strict';
/*jshint asi:true */

var printContent =  require('..')
  , fs           =  require('fs')
  , test         =  require('tape')

test('streaming one file', function (t) {
  t.plan(1)

  fs.createReadStream(__dirname + '/fixtures/one-file.json', { encoding: 'utf-8' })
    .pipe(printContent())
    .on('data', ondata)
    .on('end', onend)

  var data = ''
  function ondata(data_) { data += data_ }
  function onend() {
    t.equal(data, 'var file = "script.js";')
  }
})
