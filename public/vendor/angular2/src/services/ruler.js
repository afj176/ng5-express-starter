System.register(["rtts_assert/rtts_assert", "angular2/src/facade/async", "angular2/src/dom/dom_adapter", "angular2/src/core/compiler/ng_element"], function($__export) {
  "use strict";
  var assert,
      Promise,
      PromiseWrapper,
      DomAdapter,
      NgElement,
      Rectangle,
      Ruler;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      DomAdapter = $__m.DomAdapter;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }],
    execute: function() {
      Rectangle = $__export("Rectangle", (function() {
        var Rectangle = function Rectangle(left, top, width, height) {
          this.left = left;
          this.right = left + width;
          this.top = top;
          this.bottom = top + height;
          this.height = height;
          this.width = width;
        };
        return ($traceurRuntime.createClass)(Rectangle, {}, {});
      }()));
      Ruler = $__export("Ruler", (function() {
        var Ruler = function Ruler(domAdapter) {
          assert.argumentTypes(domAdapter, DomAdapter);
          this.domAdapter = domAdapter;
        };
        return ($traceurRuntime.createClass)(Ruler, {measure: function(el) {
            assert.argumentTypes(el, NgElement);
            var clntRect = this.domAdapter.getBoundingClientRect(el.domElement);
            return assert.returnType((PromiseWrapper.resolve(new Rectangle(clntRect.left, clntRect.top, clntRect.width, clntRect.height))), assert.genericType(Promise, Rectangle));
          }}, {});
      }()));
      Object.defineProperty(Ruler, "parameters", {get: function() {
          return [[DomAdapter]];
        }});
      Object.defineProperty(Ruler.prototype.measure, "parameters", {get: function() {
          return [[NgElement]];
        }});
    }
  };
});
//# sourceMappingURL=ruler.es6.map

//# sourceMappingURL=./ruler.js.map