System.register(["angular2/test_lib", "angular2/src/core/annotations/annotations"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      expect,
      beforeEach,
      Directive,
      onChange,
      DummyDirective;
  function main() {
    describe("Directive", (function() {
      describe("lifecycle", (function() {
        it("should be false when no lifecycle specified", (function() {
          var d = new DummyDirective();
          expect(d.hasLifecycleHook(onChange)).toBe(false);
        }));
        it("should be false when the lifecycle does not contain the hook", (function() {
          var d = new DummyDirective({lifecycle: []});
          expect(d.hasLifecycleHook(onChange)).toBe(false);
        }));
        it("should be true otherwise", (function() {
          var d = new DummyDirective({lifecycle: [onChange]});
          expect(d.hasLifecycleHook(onChange)).toBe(true);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      Directive = $__m.Directive;
      onChange = $__m.onChange;
    }],
    execute: function() {
      DummyDirective = (function($__super) {
        var DummyDirective = function DummyDirective() {
          var lifecycle = (arguments[0] !== (void 0) ? arguments[0] : {}).lifecycle;
          $traceurRuntime.superConstructor(DummyDirective).call(this, {lifecycle: lifecycle});
        };
        return ($traceurRuntime.createClass)(DummyDirective, {}, {}, $__super);
      }(Directive));
    }
  };
});
//# sourceMappingURL=annotations_spec.es6.map

//# sourceMappingURL=./annotations_spec.js.map