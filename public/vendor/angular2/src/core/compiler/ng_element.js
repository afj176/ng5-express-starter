System.register(["rtts_assert/rtts_assert", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "../compiler/view", "angular2/src/render/dom/direct_dom_renderer"], function($__export) {
  "use strict";
  var assert,
      DOM,
      normalizeBlank,
      viewModule,
      DirectDomViewRef,
      NgElement;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      normalizeBlank = $__m.normalizeBlank;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      DirectDomViewRef = $__m.DirectDomViewRef;
    }],
    execute: function() {
      NgElement = $__export("NgElement", (function() {
        var NgElement = function NgElement(view, boundElementIndex) {
          this._view = view;
          this._boundElementIndex = boundElementIndex;
        };
        return ($traceurRuntime.createClass)(NgElement, {
          get domElement() {
            var domViewRef = assert.type(this._view.render, DirectDomViewRef);
            return domViewRef.delegate.boundElements[this._boundElementIndex];
          },
          getAttribute: function(name) {
            assert.argumentTypes(name, assert.type.string);
            return normalizeBlank(DOM.getAttribute(this.domElement, name));
          }
        }, {});
      }()));
      Object.defineProperty(NgElement.prototype.getAttribute, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=ng_element.es6.map

//# sourceMappingURL=./ng_element.js.map