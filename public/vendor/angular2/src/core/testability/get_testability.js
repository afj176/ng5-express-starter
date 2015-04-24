System.register(["rtts_assert/rtts_assert", "angular2/src/core/testability/testability"], function($__export) {
  "use strict";
  var assert,
      TestabilityRegistry,
      Testability,
      PublicTestability,
      GetTestability;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      TestabilityRegistry = $__m.TestabilityRegistry;
      Testability = $__m.Testability;
    }],
    execute: function() {
      PublicTestability = (function() {
        var PublicTestability = function PublicTestability(testability) {
          assert.argumentTypes(testability, Testability);
          this._testability = testability;
        };
        return ($traceurRuntime.createClass)(PublicTestability, {
          whenStable: function(callback) {
            assert.argumentTypes(callback, Function);
            this._testability.whenStable(callback);
          },
          findBindings: function(using, binding, exactMatch) {
            assert.argumentTypes(using, assert.type.any, binding, assert.type.string, exactMatch, assert.type.boolean);
            return this._testability.findBindings(using, binding, exactMatch);
          }
        }, {});
      }());
      Object.defineProperty(PublicTestability, "parameters", {get: function() {
          return [[Testability]];
        }});
      Object.defineProperty(PublicTestability.prototype.whenStable, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(PublicTestability.prototype.findBindings, "parameters", {get: function() {
          return [[], [assert.type.string], [assert.type.boolean]];
        }});
      GetTestability = $__export("GetTestability", (function() {
        var GetTestability = function GetTestability() {
          ;
        };
        return ($traceurRuntime.createClass)(GetTestability, {}, {addToWindow: function(registry) {
            assert.argumentTypes(registry, TestabilityRegistry);
            if (!window.angular2) {
              window.angular2 = {};
            }
            window.angular2.getTestability = function(elem) {
              var testability = registry.findTestabilityInTree(elem);
              if (testability == null) {
                throw new Error('Could not find testability for element.');
              }
              return assert.returnType((new PublicTestability(testability)), PublicTestability);
            };
            window.angular2.resumeBootstrap = function() {};
          }});
      }()));
      Object.defineProperty(GetTestability.addToWindow, "parameters", {get: function() {
          return [[TestabilityRegistry]];
        }});
    }
  };
});
//# sourceMappingURL=get_testability.es6.map

//# sourceMappingURL=./get_testability.js.map