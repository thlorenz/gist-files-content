'use strict';
/*jshint asi:true */

var printContent =  require('..')
  , fs           =  require('fs')
  , test         =  require('tape')

test('streaming two files without filter', function (t) {
  t.plan(1)

  var json = fs.readFileSync(__dirname + '/fixtures/two-files.json', 'utf8');
  var data = printContent(json);
  
  t.equal(
      data
    , [ 'var file = "script.js";'
      , '.'
      , 'var file = "simple-js-inheritance.js";'
      ].join('\n')
  )
})
