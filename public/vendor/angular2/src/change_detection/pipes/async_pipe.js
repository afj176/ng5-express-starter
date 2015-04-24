System.register(["rtts_assert/rtts_assert", "angular2/src/facade/async", "angular2/src/facade/lang", "./pipe", "../change_detector_ref"], function($__export) {
  "use strict";
  var assert,
      Observable,
      ObservableWrapper,
      isBlank,
      isPresent,
      Pipe,
      NO_CHANGE,
      ChangeDetectorRef,
      AsyncPipe,
      AsyncPipeFactory;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Observable = $__m.Observable;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Pipe = $__m.Pipe;
      NO_CHANGE = $__m.NO_CHANGE;
    }, function($__m) {
      ChangeDetectorRef = $__m.ChangeDetectorRef;
    }],
    execute: function() {
      AsyncPipe = $__export("AsyncPipe", (function($__super) {
        var AsyncPipe = function AsyncPipe(ref) {
          assert.argumentTypes(ref, ChangeDetectorRef);
          $traceurRuntime.superConstructor(AsyncPipe).call(this);
          this._ref = ref;
          this._latestValue = null;
          this._latestReturnedValue = null;
          this._subscription = null;
          this._observable = null;
        };
        return ($traceurRuntime.createClass)(AsyncPipe, {
          supports: function(obs) {
            return assert.returnType((ObservableWrapper.isObservable(obs)), assert.type.boolean);
          },
          onDestroy: function() {
            if (isPresent(this._subscription)) {
              this._dispose();
            }
            ;
          },
          transform: function(obs) {
            assert.argumentTypes(obs, Observable);
            if (isBlank(this._subscription)) {
              this._subscribe(obs);
              return assert.returnType((null), assert.type.any);
            }
            if (obs !== this._observable) {
              this._dispose();
              return assert.returnType((this.transform(obs)), assert.type.any);
            }
            if (this._latestValue === this._latestReturnedValue) {
              return assert.returnType((NO_CHANGE), assert.type.any);
            } else {
              this._latestReturnedValue = this._latestValue;
              return assert.returnType((this._latestValue), assert.type.any);
            }
          },
          _subscribe: function(obs) {
            var $__0 = this;
            this._observable = obs;
            this._subscription = ObservableWrapper.subscribe(obs, (function(value) {
              return $__0._updateLatestValue(value);
            }), (function(e) {
              throw e;
            }));
          },
          _dispose: function() {
            ObservableWrapper.dispose(this._subscription);
            this._latestValue = null;
            this._latestReturnedValue = null;
            this._subscription = null;
            this._observable = null;
          },
          _updateLatestValue: function(value) {
            assert.argumentTypes(value, Object);
            this._latestValue = value;
            this._ref.requestCheck();
          }
        }, {}, $__super);
      }(Pipe)));
      Object.defineProperty(AsyncPipe, "parameters", {get: function() {
          return [[ChangeDetectorRef]];
        }});
      Object.defineProperty(AsyncPipe.prototype.transform, "parameters", {get: function() {
          return [[Observable]];
        }});
      Object.defineProperty(AsyncPipe.prototype._subscribe, "parameters", {get: function() {
          return [[Observable]];
        }});
      Object.defineProperty(AsyncPipe.prototype._updateLatestValue, "parameters", {get: function() {
          return [[Object]];
        }});
      AsyncPipeFactory = $__export("AsyncPipeFactory", (function() {
        var AsyncPipeFactory = function AsyncPipeFactory() {
          ;
        };
        return ($traceurRuntime.createClass)(AsyncPipeFactory, {
          supports: function(obs) {
            return assert.returnType((ObservableWrapper.isObservable(obs)), assert.type.boolean);
          },
          create: function(cdRef) {
            return assert.returnType((new AsyncPipe(cdRef)), Pipe);
          }
        }, {});
      }()));
    }
  };
});
//# sourceMappingURL=async_pipe.es6.map

//# sourceMappingURL=./async_pipe.js.map