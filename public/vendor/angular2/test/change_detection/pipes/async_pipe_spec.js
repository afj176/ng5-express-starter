System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/change_detection/pipes/async_pipe", "angular2/src/change_detection/pipes/pipe", "angular2/src/change_detection/change_detector_ref", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      AsyncTestCompleter,
      inject,
      proxy,
      SpyObject,
      IMPLEMENTS,
      AsyncPipe,
      NO_CHANGE,
      ChangeDetectorRef,
      EventEmitter,
      Observable,
      ObservableWrapper,
      PromiseWrapper,
      SpyChangeDetectorRef;
  function main() {
    describe("AsyncPipe", (function() {
      var emitter;
      var pipe;
      var ref;
      var message = new Object();
      beforeEach((function() {
        emitter = new EventEmitter();
        ref = new SpyChangeDetectorRef();
        pipe = new AsyncPipe(ref);
      }));
      describe("supports", (function() {
        it("should support observables", (function() {
          expect(pipe.supports(emitter)).toBe(true);
        }));
        it("should not support other objects", (function() {
          expect(pipe.supports("string")).toBe(false);
          expect(pipe.supports(null)).toBe(false);
        }));
      }));
      describe("transform", (function() {
        it("should return null when subscribing to an observable", (function() {
          expect(pipe.transform(emitter)).toBe(null);
        }));
        it("should return the latest available value", inject([AsyncTestCompleter], (function(async) {
          pipe.transform(emitter);
          ObservableWrapper.callNext(emitter, message);
          PromiseWrapper.setTimeout((function() {
            expect(pipe.transform(emitter)).toEqual(message);
            async.done();
          }), 0);
        })));
        it("should return NO_CHANGE when nothing has changed since the last call", inject([AsyncTestCompleter], (function(async) {
          pipe.transform(emitter);
          ObservableWrapper.callNext(emitter, message);
          PromiseWrapper.setTimeout((function() {
            pipe.transform(emitter);
            expect(pipe.transform(emitter)).toBe(NO_CHANGE);
            async.done();
          }), 0);
        })));
        it("should dispose of the existing subscription when subscribing to a new observable", inject([AsyncTestCompleter], (function(async) {
          pipe.transform(emitter);
          var newEmitter = new EventEmitter();
          expect(pipe.transform(newEmitter)).toBe(null);
          ObservableWrapper.callNext(emitter, message);
          PromiseWrapper.setTimeout((function() {
            expect(pipe.transform(newEmitter)).toBe(NO_CHANGE);
            async.done();
          }), 0);
        })));
        it("should request a change detection check upon receiving a new value", inject([AsyncTestCompleter], (function(async) {
          pipe.transform(emitter);
          ObservableWrapper.callNext(emitter, message);
          PromiseWrapper.setTimeout((function() {
            expect(ref.spy('requestCheck')).toHaveBeenCalled();
            async.done();
          }), 0);
        })));
      }));
      describe("onDestroy", (function() {
        it("should do nothing when no subscription", (function() {
          pipe.onDestroy();
        }));
        it("should dispose of the existing subscription", inject([AsyncTestCompleter], (function(async) {
          pipe.transform(emitter);
          pipe.onDestroy();
          ObservableWrapper.callNext(emitter, message);
          PromiseWrapper.setTimeout((function() {
            expect(pipe.transform(emitter)).toBe(null);
            async.done();
          }), 0);
        })));
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
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      inject = $__m.inject;
      proxy = $__m.proxy;
      SpyObject = $__m.SpyObject;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      AsyncPipe = $__m.AsyncPipe;
    }, function($__m) {
      NO_CHANGE = $__m.NO_CHANGE;
    }, function($__m) {
      ChangeDetectorRef = $__m.ChangeDetectorRef;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      Observable = $__m.Observable;
      ObservableWrapper = $__m.ObservableWrapper;
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      SpyChangeDetectorRef = (function($__super) {
        var SpyChangeDetectorRef = function SpyChangeDetectorRef() {
          $traceurRuntime.superConstructor(SpyChangeDetectorRef).call(this, ChangeDetectorRef);
        };
        return ($traceurRuntime.createClass)(SpyChangeDetectorRef, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyChangeDetectorRef.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyChangeDetectorRef, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ChangeDetectorRef)];
        }});
    }
  };
});
//# sourceMappingURL=async_pipe_spec.es6.map

//# sourceMappingURL=./async_pipe_spec.js.map