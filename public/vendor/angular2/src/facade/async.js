System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "rx/dist/rx.all"], function($__export) {
  "use strict";
  var assert,
      int,
      global,
      isPresent,
      List,
      Rx,
      Promise,
      PromiseWrapper,
      ObservableWrapper,
      Observable,
      EventEmitter;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      int = $__m.int;
      global = $__m.global;
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      Rx = $__m.default;
    }],
    execute: function() {
      Promise = $__export("Promise", global.Promise);
      PromiseWrapper = $__export("PromiseWrapper", (function() {
        var PromiseWrapper = function PromiseWrapper() {
          ;
        };
        return ($traceurRuntime.createClass)(PromiseWrapper, {}, {
          resolve: function(obj) {
            return assert.returnType((Promise.resolve(obj)), Promise);
          },
          reject: function(obj) {
            return assert.returnType((Promise.reject(obj)), Promise);
          },
          catchError: function(promise, onError) {
            assert.argumentTypes(promise, Promise, onError, Function);
            return assert.returnType((promise.catch(onError)), Promise);
          },
          all: function(promises) {
            assert.argumentTypes(promises, List);
            if (promises.length == 0)
              return assert.returnType((Promise.resolve([])), Promise);
            return assert.returnType((Promise.all(promises)), Promise);
          },
          then: function(promise, success, rejection) {
            assert.argumentTypes(promise, Promise, success, Function, rejection, Function);
            return assert.returnType((promise.then(success, rejection)), Promise);
          },
          completer: function() {
            var resolve;
            var reject;
            var p = new Promise(function(res, rej) {
              resolve = res;
              reject = rej;
            });
            return {
              promise: p,
              resolve: resolve,
              reject: reject
            };
          },
          setTimeout: function(fn, millis) {
            assert.argumentTypes(fn, Function, millis, int);
            global.setTimeout(fn, millis);
          },
          isPromise: function(maybePromise) {
            return assert.returnType((maybePromise instanceof Promise), assert.type.boolean);
          }
        });
      }()));
      Object.defineProperty(PromiseWrapper.catchError, "parameters", {get: function() {
          return [[Promise], [Function]];
        }});
      Object.defineProperty(PromiseWrapper.all, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(PromiseWrapper.then, "parameters", {get: function() {
          return [[Promise], [Function], [Function]];
        }});
      Object.defineProperty(PromiseWrapper.setTimeout, "parameters", {get: function() {
          return [[Function], [int]];
        }});
      ObservableWrapper = $__export("ObservableWrapper", (function() {
        var ObservableWrapper = function ObservableWrapper() {
          ;
        };
        return ($traceurRuntime.createClass)(ObservableWrapper, {}, {
          subscribe: function(emitter, onNext) {
            var onThrow = arguments[2] !== (void 0) ? arguments[2] : null;
            var onReturn = arguments[3] !== (void 0) ? arguments[3] : null;
            assert.argumentTypes(emitter, EventEmitter, onNext, assert.type.any, onThrow, assert.type.any, onReturn, assert.type.any);
            return emitter.observer({
              next: onNext,
              throw: onThrow,
              return: onReturn
            });
          },
          dispose: function(subscription) {
            assert.argumentTypes(subscription, assert.type.any);
            subscription.dispose();
          },
          isObservable: function(obs) {
            return assert.returnType((obs instanceof Observable), assert.type.boolean);
          },
          callNext: function(emitter, value) {
            assert.argumentTypes(emitter, EventEmitter, value, assert.type.any);
            emitter.next(value);
          },
          callThrow: function(emitter, error) {
            assert.argumentTypes(emitter, EventEmitter, error, assert.type.any);
            emitter.throw(error);
          },
          callReturn: function(emitter) {
            assert.argumentTypes(emitter, EventEmitter);
            emitter.return();
          }
        });
      }()));
      Object.defineProperty(ObservableWrapper.subscribe, "parameters", {get: function() {
          return [[EventEmitter], [], [], []];
        }});
      Object.defineProperty(ObservableWrapper.dispose, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(ObservableWrapper.callNext, "parameters", {get: function() {
          return [[EventEmitter], [assert.type.any]];
        }});
      Object.defineProperty(ObservableWrapper.callThrow, "parameters", {get: function() {
          return [[EventEmitter], [assert.type.any]];
        }});
      Object.defineProperty(ObservableWrapper.callReturn, "parameters", {get: function() {
          return [[EventEmitter]];
        }});
      Observable = $__export("Observable", (function() {
        var Observable = function Observable() {
          ;
        };
        return ($traceurRuntime.createClass)(Observable, {observer: function(generator) {
            assert.argumentTypes(generator, Function);
          }}, {});
      }()));
      Object.defineProperty(Observable.prototype.observer, "parameters", {get: function() {
          return [[Function]];
        }});
      EventEmitter = $__export("EventEmitter", (function($__super) {
        var EventEmitter = function EventEmitter() {
          $traceurRuntime.superConstructor(EventEmitter).call(this);
          this._subject = new Rx.Subject();
        };
        return ($traceurRuntime.createClass)(EventEmitter, {
          observer: function(generator) {
            return this._subject.observeOn(Rx.Scheduler.immediate).subscribe((function(value) {
              setTimeout((function() {
                return generator.next(value);
              }));
            }), (function(error) {
              return generator.throw ? generator.throw(error) : null;
            }), (function() {
              return generator.return ? generator.return() : null;
            }));
          },
          toRx: function() {
            return assert.returnType((this._subject), Rx.Observable);
          },
          next: function(value) {
            this._subject.onNext(value);
          },
          throw: function(error) {
            this._subject.onError(error);
          },
          return: function(value) {
            this._subject.onCompleted();
          }
        }, {}, $__super);
      }(Observable)));
    }
  };
});
//# sourceMappingURL=async.es6.map

//# sourceMappingURL=./async.js.map