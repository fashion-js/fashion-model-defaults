var Model = require('fashion-model/Model');
var expect = require('chai').expect;
var DefaultsMixin = require('../');

describe('apply defaults tests', function() {
  it('should allow apply default properties', function() {
    var Person = Model.extend({
      mixins: [DefaultsMixin],
      properties: {
        name: {
          type: String,
          default: 'Bob'
        },
        age: Number
      }
    });

    var bob = new Person({
      age: 30
    });

    bob.applyDefaults();

    expect(bob.clean()).to.deep.equal({
      name: 'Bob',
      age: 30
    });
  });

  it('should allow default function', function() {
    var Person = Model.extend({
      mixins: [DefaultsMixin],
      properties: {
        name: {
          type: String,
          default: function() {
            return 'Bob';
          }
        },
        age: Number
      }
    });

    var bob = new Person({
      age: 30
    });

    bob.applyDefaults();

    expect(bob.clean()).to.deep.equal({
      name: 'Bob',
      age: 30
    });
  });
});
