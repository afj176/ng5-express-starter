System.register(["angular2/test_lib", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      SpyObject,
      AsyncTestCompleter,
      inject,
      IS_DARTIUM,
      ObservableWrapper,
      EventEmitter,
      PromiseWrapper;
  function main() {
    describe('EventEmitter', (function() {
      var emitter;
      beforeEach((function() {
        emitter = new EventEmitter();
      }));
      it("should call the next callback", inject([AsyncTestCompleter], (function(async) {
        ObservableWrapper.subscribe(emitter, (function(value) {
          expect(value).toEqual(99);
          async.done();
        }));
        ObservableWrapper.callNext(emitter, 99);
      })));
      it("should call the throw callback", inject([AsyncTestCompleter], (function(async) {
        ObservableWrapper.subscribe(emitter, (function(_) {}), (function(error) {
          expect(error).toEqual("Boom");
          async.done();
        }));
        ObservableWrapper.callThrow(emitter, "Boom");
      })));
      it("should work when no throw callback is provided", inject([AsyncTestCompleter], (function(async) {
        ObservableWrapper.subscribe(emitter, (function(_) {}), (function(_) {
          async.done();
        }));
        ObservableWrapper.callThrow(emitter, "Boom");
      })));
      it("should call the return callback", inject([AsyncTestCompleter], (function(async) {
        ObservableWrapper.subscribe(emitter, (function(_) {}), (function(_) {}), (function() {
          async.done();
        }));
        ObservableWrapper.callReturn(emitter);
      })));
      it("should subscribe to the wrapper asynchronously", (function() {
        var called = false;
        ObservableWrapper.subscribe(emitter, (function(value) {
          called = true;
        }));
        ObservableWrapper.callNext(emitter, 99);
        expect(called).toBe(false);
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
      el = $__m.el;
      SpyObject = $__m.SpyObject;
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      inject = $__m.inject;
      IS_DARTIUM = $__m.IS_DARTIUM;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
      EventEmitter = $__m.EventEmitter;
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=async_spec.es6.map

//# sourceMappingURL=./async_spec.js.map