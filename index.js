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
module.exports = function (json_, opts) {

  if (typeof json_ === 'object') {
    opts = json_;
    json_ = null;
  }

  opts = opts || {};
  if (json_) return parse(json_, opts);

  var json = '';
  return through(ondata, onend);

  function ondata(data) {
    json += data;
  }

  function onend() {
    try {
      this.queue(contents(json, opts));
      this.queue(null);
    } catch (e) {
      this.emit('error', e);
    }
  }
  
  function parse(json) {
    try {
      return contents(json, opts);
    } catch (e) {
      console.error(e);
      console.error('TODO: handle json parse error');
      return '';
    }
  }
  

  function contents(json, opts) {
    var gist = JSON.parse(json);      
    if (typeof opts.files === 'string') opts.files = [ opts.files ];

    if (!gist.files) return '';

    return Object.keys(gist.files)
      .filter(function (f) {
        return !opts.files || ~opts.files.indexOf(f);
      })
      .map(function (f) {
        return gist.files[f].content;
      })
      .join('\n.\n');
  }
};
