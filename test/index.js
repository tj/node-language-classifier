
var lang = require('..')
  , fs = require('fs')
  , path = require('path')
  , readdir = fs.readdirSync
  , read = fs.readFileSync;

describe('should classify', function(){
  readdir('test/cases').forEach(function(file){
    var ext = path.extname(file);
    var base = path.basename(file, ext);
    it(ext, function(){
      file = path.join('test/cases', file);
      var str = read(file, 'utf8');
      var ret = lang(str);
      if (ret != base) {
        throw new Error('expected "' + base + '", got "' + ret + '"');
      }
    })
  });
});
