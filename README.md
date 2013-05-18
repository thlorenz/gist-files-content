# gist-files-content [![build status](https://secure.travis-ci.org/thlorenz/gist-files-content.png)](http://travis-ci.org/thlorenz/gist-files-content)

Given JSON returned by a github containing particular gist information it returns its files content.

```js
var filesContent = require('..')
  , fs = require('fs');

fs.createReadStream(__dirname + '/two-files.json', { encoding: 'utf-8' })
  .pipe(filesContent())
  .pipe(process.stdout);
```

```
content of file1.js ....
.
content of file2.js ...
```
If more than one file is contained in the gist, the contents of the files are separated by a line containing only `.`.

## Example with file filter

```js
var filesContent = require('..')
  , fs = require('fs');

fs.createReadStream(__dirname + '/two-files.json', { encoding: 'utf-8' })
  .pipe(filesContent({ filter: 'file1.js' }))
  .pipe(process.stdout);
```

```
content of file 1 ....
```

## API

```
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
 ```
