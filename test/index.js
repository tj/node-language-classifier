
var lang = require('..');

describe('should classify', function(){
  it('ruby', function(){
    lang('def foo\nend').should.equal('ruby');
  });

  it('c', function(){
    lang('#include <stdio.h>').should.equal('c');
  });
});
