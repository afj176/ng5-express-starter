System.register(["angular2/test_lib", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      List,
      ListWrapper;
  function main() {
    describe('ListWrapper', (function() {
      describe('splice', (function() {
        it('should remove sublist of given length and return it', (function() {
          var list = [1, 2, 3, 4, 5, 6];
          expect(ListWrapper.splice(list, 1, 3)).toEqual([2, 3, 4]);
          expect(list).toEqual([1, 5, 6]);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=collection_spec.es6.map

//# sourceMappingURL=./collection_spec.js.map