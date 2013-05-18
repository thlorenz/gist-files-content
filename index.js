'use strict';
var through = require('through');

/**
 * Takes gist json_ string, pulls out content for each file 
 * and prints them separated by '.' line.
 * If json_ string is not given, it will return a stream that transforms 
 * gist json into files contents string instead.
 * 
 * If a filter is supplied via opts, only these files contents will be returned.
 *
 * @name exports
 * @function
 * @param json_ {String}
 * @param opts {Object} { filter {String|Array} }
 * @return {String|Stream}
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
