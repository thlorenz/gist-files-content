# gist-print-content [![build status](https://secure.travis-ci.org/thlorenz/gist-print-content.png)](http://travis-ci.org/thlorenz/gist-print-content)

Given JSON returned by a github containing particular gist information it prints its files content.

```js
var printContent = require('..')
  , fs = require('fs');

fs.createReadStream(__dirname + '/one-file.json', { encoding: 'utf-8' })
  .pipe(printContent())
  .pipe(process.stdout);
```
