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
      var l;
      describe('splice', (function() {
        it('should remove sublist of given length and return it', (function() {
          var list = [1, 2, 3, 4, 5, 6];
          expect(ListWrapper.splice(list, 1, 3)).toEqual([2, 3, 4]);
          expect(list).toEqual([1, 5, 6]);
        }));
        it('should support negative start', (function() {
          var list = [1, 2, 3, 4, 5, 6];
          expect(ListWrapper.splice(list, -5, 3)).toEqual([2, 3, 4]);
          expect(list).toEqual([1, 5, 6]);
        }));
      }));
      describe('fill', (function() {
        beforeEach((function() {
          l = [1, 2, 3, 4];
        }));
        it('should fill the whole list if neither start nor end are specified', (function() {
          ListWrapper.fill(l, 9);
          expect(l).toEqual([9, 9, 9, 9]);
        }));
        it('should fill up to the end if end is not specified', (function() {
          ListWrapper.fill(l, 9, 1);
          expect(l).toEqual([1, 9, 9, 9]);
        }));
        it('should support negative start', (function() {
          ListWrapper.fill(l, 9, -1);
          expect(l).toEqual([1, 2, 3, 9]);
        }));
        it('should support negative end', (function() {
          ListWrapper.fill(l, 9, -2, -1);
          expect(l).toEqual([1, 2, 9, 4]);
        }));
      }));
      describe('slice', (function() {
        beforeEach((function() {
          l = [1, 2, 3, 4];
        }));
        it('should return the whole list if neither start nor end are specified', (function() {
          expect(ListWrapper.slice(l)).toEqual([1, 2, 3, 4]);
        }));
        it('should return up to the end if end is not specified', (function() {
          expect(ListWrapper.slice(l, 1)).toEqual([2, 3, 4]);
        }));
        it('should support negative start', (function() {
          expect(ListWrapper.slice(l, -1)).toEqual([4]);
        }));
        it('should support negative end', (function() {
          expect(ListWrapper.slice(l, -3, -1)).toEqual([2, 3]);
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