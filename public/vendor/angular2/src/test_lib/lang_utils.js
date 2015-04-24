System.register(["rtts_assert/rtts_assert"], function($__export) {
  "use strict";
  var assert;
  function getTypeOf(instance) {
    return instance.constructor;
  }
  function instantiateType(type) {
    var params = arguments[1] !== (void 0) ? arguments[1] : [];
    assert.argumentTypes(type, Function, params, Array);
    var instance = Object.create(type.prototype);
    instance.constructor.apply(instance, params);
    return instance;
  }
  $__export("getTypeOf", getTypeOf);
  $__export("instantiateType", instantiateType);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }],
    execute: function() {
      Object.defineProperty(instantiateType, "parameters", {get: function() {
          return [[Function], [Array]];
        }});
    }
  };
});
//# sourceMappingURL=lang_utils.es6.map

//# sourceMappingURL=./lang_utils.js.map