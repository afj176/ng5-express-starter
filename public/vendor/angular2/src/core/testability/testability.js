System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/testability/get_testability"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      DOM,
      Map,
      MapWrapper,
      List,
      ListWrapper,
      StringWrapper,
      isBlank,
      BaseException,
      getTestabilityModule,
      Testability,
      TestabilityRegistry;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      getTestabilityModule = $__m;
    }],
    execute: function() {
      Testability = $__export("Testability", (function() {
        var Testability = function Testability() {
          this._pendingCount = 0;
          this._callbacks = ListWrapper.create();
        };
        return ($traceurRuntime.createClass)(Testability, {
          increaseCount: function() {
            var delta = arguments[0] !== (void 0) ? arguments[0] : 1;
            assert.argumentTypes(delta, assert.type.number);
            this._pendingCount += delta;
            if (this._pendingCount < 0) {
              throw new BaseException('pending async requests below zero');
            } else if (this._pendingCount == 0) {
              this._runCallbacks();
            }
            return this._pendingCount;
          },
          _runCallbacks: function() {
            while (this._callbacks.length !== 0) {
              ListWrapper.removeLast(this._callbacks)();
            }
          },
          whenStable: function(callback) {
            assert.argumentTypes(callback, Function);
            ListWrapper.push(this._callbacks, callback);
            if (this._pendingCount === 0) {
              this._runCallbacks();
            }
          },
          getPendingCount: function() {
            return assert.returnType((this._pendingCount), assert.type.number);
          },
          findBindings: function(using, binding, exactMatch) {
            assert.argumentTypes(using, assert.type.any, binding, assert.type.string, exactMatch, assert.type.boolean);
            return assert.returnType(([]), List);
          }
        }, {});
      }()));
      Object.defineProperty(Testability, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(Testability.prototype.increaseCount, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(Testability.prototype.whenStable, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(Testability.prototype.findBindings, "parameters", {get: function() {
          return [[], [assert.type.string], [assert.type.boolean]];
        }});
      TestabilityRegistry = $__export("TestabilityRegistry", (function() {
        var TestabilityRegistry = function TestabilityRegistry() {
          this._applications = MapWrapper.create();
          getTestabilityModule.GetTestability.addToWindow(this);
        };
        return ($traceurRuntime.createClass)(TestabilityRegistry, {
          registerApplication: function(token, testability) {
            assert.argumentTypes(token, assert.type.any, testability, Testability);
            MapWrapper.set(this._applications, token, testability);
          },
          findTestabilityInTree: function(elem) {
            if (elem == null) {
              return assert.returnType((null), Testability);
            }
            if (MapWrapper.contains(this._applications, elem)) {
              return assert.returnType((MapWrapper.get(this._applications, elem)), Testability);
            }
            if (DOM.isShadowRoot(elem)) {
              return assert.returnType((this.findTestabilityInTree(DOM.getHost(elem))), Testability);
            }
            return assert.returnType((this.findTestabilityInTree(DOM.parentElement(elem))), Testability);
          }
        }, {});
      }()));
      Object.defineProperty(TestabilityRegistry, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(TestabilityRegistry.prototype.registerApplication, "parameters", {get: function() {
          return [[], [Testability]];
        }});
    }
  };
});
//# sourceMappingURL=testability.es6.map

//# sourceMappingURL=./testability.js.map