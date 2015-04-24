System.register(["rtts_assert/rtts_assert"], function($__export) {
  "use strict";
  var assert,
      OpaqueToken;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }],
    execute: function() {
      OpaqueToken = $__export("OpaqueToken", (function() {
        var OpaqueToken = function OpaqueToken(desc) {
          assert.argumentTypes(desc, assert.type.string);
          this._desc = ("Token(" + desc + ")");
        };
        return ($traceurRuntime.createClass)(OpaqueToken, {toString: function() {
            return assert.returnType((this._desc), assert.type.string);
          }}, {});
      }()));
      Object.defineProperty(OpaqueToken, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=opaque_token.es6.map

//# sourceMappingURL=./opaque_token.js.map