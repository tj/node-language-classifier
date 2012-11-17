
var lang = require('..');

describe('should classify', function(){
  it('ruby', function(){
    lang('def foo\nend').should.equal('ruby');
  });

  it('python', function(){
    lang('for link in links:').should.equal('python');
  });

  it('javascript', function(){
    lang('Foo.prototype.bar = function(){}').should.equal('javascript');
  });

  it('c', function(){
    lang('#include <stdio.h>').should.equal('c');
  });
});
