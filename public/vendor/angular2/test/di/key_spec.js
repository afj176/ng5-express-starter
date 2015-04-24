System.register(["angular2/test_lib", "angular2/di"], function($__export) {
  "use strict";
  var describe,
      iit,
      it,
      expect,
      beforeEach,
      Key,
      KeyRegistry;
  function main() {
    describe("key", function() {
      var registry;
      beforeEach(function() {
        registry = new KeyRegistry();
      });
      it('should be equal to another key if type is the same', function() {
        expect(registry.get('car')).toBe(registry.get('car'));
      });
      it('should not be equal to another key if types are different', function() {
        expect(registry.get('car')).not.toBe(registry.get('porsche'));
      });
      it('should return the passed in key', function() {
        expect(registry.get(registry.get('car'))).toBe(registry.get('car'));
      });
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      iit = $__m.iit;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      Key = $__m.Key;
      KeyRegistry = $__m.KeyRegistry;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=key_spec.es6.map

//# sourceMappingURL=./key_spec.js.map