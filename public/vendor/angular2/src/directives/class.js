System.register(["rtts_assert/rtts_assert", "angular2/src/core/annotations/annotations", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/core/compiler/ng_element"], function($__export) {
  "use strict";
  var assert,
      Decorator,
      isPresent,
      DOM,
      NgElement,
      CSSClass;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Decorator = $__m.Decorator;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }],
    execute: function() {
      CSSClass = $__export("CSSClass", (function() {
        var CSSClass = function CSSClass(ngEl) {
          assert.argumentTypes(ngEl, NgElement);
          this._domEl = ngEl.domElement;
        };
        return ($traceurRuntime.createClass)(CSSClass, {
          _toggleClass: function(className, enabled) {
            if (enabled) {
              DOM.addClass(this._domEl, className);
            } else {
              DOM.removeClass(this._domEl, className);
            }
          },
          set iterableChanges(changes) {
            var $__0 = this;
            if (isPresent(changes)) {
              changes.forEachAddedItem((function(record) {
                $__0._toggleClass(record.key, record.currentValue);
              }));
              changes.forEachChangedItem((function(record) {
                $__0._toggleClass(record.key, record.currentValue);
              }));
              changes.forEachRemovedItem((function(record) {
                if (record.previousValue) {
                  DOM.removeClass($__0._domEl, record.key);
                }
              }));
            }
          }
        }, {});
      }()));
      Object.defineProperty(CSSClass, "annotations", {get: function() {
          return [new Decorator({
            selector: '[class]',
            properties: {'iterableChanges': 'class | keyValDiff'}
          })];
        }});
      Object.defineProperty(CSSClass, "parameters", {get: function() {
          return [[NgElement]];
        }});
    }
  };
});
//# sourceMappingURL=class.es6.map

//# sourceMappingURL=./class.js.map