System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/change_detection/pipes/pipe_registry", "angular2/src/change_detection/pipes/pipe"], function($__export) {
  "use strict";
  var assert,
      ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      PipeRegistry,
      Pipe,
      PipeFactory;
  function main() {
    describe("pipe registry", (function() {
      var firstPipe = new Pipe();
      var secondPipe = new Pipe();
      it("should return the first pipe supporting the data type", (function() {
        var r = new PipeRegistry({"type": [new PipeFactory(false, firstPipe), new PipeFactory(true, secondPipe)]});
        expect(r.get("type", "some object", null)).toBe(secondPipe);
      }));
      it("should throw when no matching type", (function() {
        var r = new PipeRegistry({});
        expect((function() {
          return r.get("unknown", "some object", null);
        })).toThrowError("Cannot find 'unknown' pipe supporting object 'some object'");
      }));
      it("should throw when no matching pipe", (function() {
        var r = new PipeRegistry({"type": []});
        expect((function() {
          return r.get("type", "some object", null);
        })).toThrowError("Cannot find 'type' pipe supporting object 'some object'");
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
    }, function($__m) {
      Pipe = $__m.Pipe;
    }],
    execute: function() {
      PipeFactory = (function() {
        var PipeFactory = function PipeFactory(shouldSupport, pipe) {
          assert.argumentTypes(shouldSupport, assert.type.boolean, pipe, assert.type.any);
          this.shouldSupport = shouldSupport;
          this.pipe = pipe;
        };
        return ($traceurRuntime.createClass)(PipeFactory, {
          supports: function(obj) {
            return assert.returnType((this.shouldSupport), assert.type.boolean);
          },
          create: function(cdRef) {
            return assert.returnType((this.pipe), Pipe);
          }
        }, {});
      }());
      Object.defineProperty(PipeFactory, "parameters", {get: function() {
          return [[assert.type.boolean], [assert.type.any]];
        }});
    }
  };
});
//# sourceMappingURL=pipe_registry_spec.es6.map

//# sourceMappingURL=./pipe_registry_spec.js.map