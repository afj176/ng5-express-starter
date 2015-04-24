System.register(["angular2/test_lib", "angular2/src/core/testability/testability"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      Testability;
  function main() {
    describe('Testability', (function() {
      var testability,
          executed;
      beforeEach((function() {
        testability = new Testability();
        executed = false;
      }));
      it('should start with a pending count of 0', (function() {
        expect(testability.getPendingCount()).toEqual(0);
      }));
      it('should fire whenstable callbacks if pending count is 0', (function() {
        testability.whenStable((function() {
          return executed = true;
        }));
        expect(executed).toBe(true);
      }));
      it('should not call whenstable callbacks when there are pending counts', (function() {
        testability.increaseCount(2);
        testability.whenStable((function() {
          return executed = true;
        }));
        expect(executed).toBe(false);
        testability.increaseCount(-1);
        expect(executed).toBe(false);
      }));
      it('should fire whenstable callbacks when pending drops to 0', (function() {
        testability.increaseCount(2);
        testability.whenStable((function() {
          return executed = true;
        }));
        expect(executed).toBe(false);
        testability.increaseCount(-2);
        expect(executed).toBe(true);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      xdescribe = $__m.xdescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      Testability = $__m.Testability;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=testability_spec.es6.map

//# sourceMappingURL=./testability_spec.js.map