System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/core/compiler/ng_element", "angular2/src/services/ruler", "./rectangle_mock"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      inject,
      ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      SpyObject,
      DOM,
      DomAdapter,
      NgElement,
      Ruler,
      Rectangle,
      createRectangle,
      DomAdapterMock,
      FakeNgElement;
  function assertDimensions(rect, left, right, top, bottom, width, height) {
    assert.argumentTypes(rect, Rectangle, left, assert.type.any, right, assert.type.any, top, assert.type.any, bottom, assert.type.any, width, assert.type.any, height, assert.type.any);
    expect(rect.left).toEqual(left);
    expect(rect.right).toEqual(right);
    expect(rect.top).toEqual(top);
    expect(rect.bottom).toEqual(bottom);
    expect(rect.width).toEqual(width);
    expect(rect.height).toEqual(height);
  }
  function main() {
    describe('ruler service', (function() {
      it('should allow measuring NgElements', inject([AsyncTestCompleter], (function(async) {
        var ruler = new Ruler(new DomAdapterMock(createRectangle(10, 20, 200, 100)));
        ruler.measure(new FakeNgElement(null)).then((function(rect) {
          assertDimensions(rect, 10, 210, 20, 120, 200, 100);
          async.done();
        }));
      })));
      it('should return 0 for all rectangle values while measuring elements in a document fragment', inject([AsyncTestCompleter], (function(async) {
        var ruler = new Ruler(DOM);
        ruler.measure(new FakeNgElement(DOM.createElement('div'))).then((function(rect) {
          assertDimensions(rect, 0, 0, 0, 0, 0, 0);
          async.done();
        }));
      })));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      inject = $__m.inject;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      SpyObject = $__m.SpyObject;
    }, function($__m) {
      DOM = $__m.DOM;
      DomAdapter = $__m.DomAdapter;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      Ruler = $__m.Ruler;
      Rectangle = $__m.Rectangle;
    }, function($__m) {
      createRectangle = $__m.createRectangle;
    }],
    execute: function() {
      DomAdapterMock = (function($__super) {
        var DomAdapterMock = function DomAdapterMock(rect) {
          $traceurRuntime.superConstructor(DomAdapterMock).call(this);
          this.rect = rect;
        };
        return ($traceurRuntime.createClass)(DomAdapterMock, {getBoundingClientRect: function(elm) {
            return this.rect;
          }}, {}, $__super);
      }(DomAdapter));
      Object.defineProperty(assertDimensions, "parameters", {get: function() {
          return [[Rectangle], [], [], [], [], [], []];
        }});
      FakeNgElement = (function($__super) {
        var FakeNgElement = function FakeNgElement(domElement) {
          $traceurRuntime.superConstructor(FakeNgElement).call(this, null, null);
          this._domElement = domElement;
        };
        return ($traceurRuntime.createClass)(FakeNgElement, {get domElement() {
            return this._domElement;
          }}, {}, $__super);
      }(NgElement));
    }
  };
});
//# sourceMappingURL=ruler_spec.es6.map

//# sourceMappingURL=./ruler_spec.js.map