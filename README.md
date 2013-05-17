# gist-files-content [![build status](https://secure.travis-ci.org/thlorenz/gist-files-content.png)](http://travis-ci.org/thlorenz/gist-files-content)

Given JSON returned by a github containing particular gist information it returns its files content.

```js
var filesContent = require('..')
  , fs = require('fs');

fs.createReadStream(__dirname + '/one-file.json', { encoding: 'utf-8' })
  .pipe(filesContent())
  .pipe(process.stdout);
```
