'use strict';
var through = require('through');

/**
 * Takes json string, pulls out content for each file 
 * and prints them separated by '.' line.
 * If filename is given, it will only print content for that file
 * 
 * @name exports
 * @function
 * @param json_ {String}
 */
module.exports = function (json_) {

  if (json_) return parse(json_);

  var json = '';
  return through(ondata, onend);

  function ondata(data) {
    json += data;
  }

  function onend() {
    try {
      return this.queue(contents(json));
    } catch (e) {
      this.queue(e);
    }
  }
  
  function parse(json) {
    try {
      return contents(json);
    } catch (e) {
      console.error(e);
      console.error('TODO: handle json parse error');
      return '';
    }
  }
  

  function contents(json) {
    var gist = JSON.parse(json);      

    if (!gist.files) return '';

    return Object.keys(gist.files)
      .map(function (f) {
        return gist.files[f].content;
      })
      .join('\n.\n');
  }
};
