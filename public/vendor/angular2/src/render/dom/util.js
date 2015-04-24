System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var assert,
      StringWrapper,
      RegExpWrapper,
      isPresent,
      NG_BINDING_CLASS_SELECTOR,
      NG_BINDING_CLASS,
      EVENT_TARGET_SEPARATOR,
      CAMEL_CASE_REGEXP,
      DASH_CASE_REGEXP;
  function camelCaseToDashCase(input) {
    assert.argumentTypes(input, assert.type.string);
    return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (function(m) {
      return '-' + m[1].toLowerCase();
    }));
  }
  function dashCaseToCamelCase(input) {
    assert.argumentTypes(input, assert.type.string);
    return StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, (function(m) {
      return m[1].toUpperCase();
    }));
  }
  $__export("camelCaseToDashCase", camelCaseToDashCase);
  $__export("dashCaseToCamelCase", dashCaseToCamelCase);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
      isPresent = $__m.isPresent;
    }],
    execute: function() {
      NG_BINDING_CLASS_SELECTOR = $__export("NG_BINDING_CLASS_SELECTOR", '.ng-binding');
      NG_BINDING_CLASS = $__export("NG_BINDING_CLASS", 'ng-binding');
      EVENT_TARGET_SEPARATOR = $__export("EVENT_TARGET_SEPARATOR", ':');
      CAMEL_CASE_REGEXP = RegExpWrapper.create('([A-Z])');
      DASH_CASE_REGEXP = RegExpWrapper.create('-([a-z])');
      Object.defineProperty(camelCaseToDashCase, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(dashCaseToCamelCase, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=util.es6.map

//# sourceMappingURL=./util.js.map