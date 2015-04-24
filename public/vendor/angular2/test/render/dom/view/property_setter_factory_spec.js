System.register(["angular2/test_lib", "angular2/src/render/dom/view/property_setter_factory", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      el,
      setterFactory,
      DOM;
  function main() {
    var div;
    beforeEach((function() {
      div = el('<div></div>');
    }));
    describe('property setter factory', (function() {
      it('should return a setter for a property', (function() {
        var setterFn = setterFactory('title');
        setterFn(div, 'Hello');
        expect(div.title).toEqual('Hello');
        var otherSetterFn = setterFactory('title');
        expect(setterFn).toBe(otherSetterFn);
      }));
      it('should return a setter for an attribute', (function() {
        var setterFn = setterFactory('attr.role');
        setterFn(div, 'button');
        expect(DOM.getAttribute(div, 'role')).toEqual('button');
        setterFn(div, null);
        expect(DOM.getAttribute(div, 'role')).toEqual(null);
        expect((function() {
          setterFn(div, 4);
        })).toThrowError("Invalid role attribute, only string values are allowed, got '4'");
        var otherSetterFn = setterFactory('attr.role');
        expect(setterFn).toBe(otherSetterFn);
      }));
      it('should return a setter for a class', (function() {
        var setterFn = setterFactory('class.active');
        setterFn(div, true);
        expect(DOM.hasClass(div, 'active')).toEqual(true);
        setterFn(div, false);
        expect(DOM.hasClass(div, 'active')).toEqual(false);
        var otherSetterFn = setterFactory('class.active');
        expect(setterFn).toBe(otherSetterFn);
      }));
      it('should return a setter for a style', (function() {
        var setterFn = setterFactory('style.width');
        setterFn(div, '40px');
        expect(DOM.getStyle(div, 'width')).toEqual('40px');
        setterFn(div, null);
        expect(DOM.getStyle(div, 'width')).toEqual('');
        var otherSetterFn = setterFactory('style.width');
        expect(setterFn).toBe(otherSetterFn);
      }));
      it('should return a setter for a style with a unit', (function() {
        var setterFn = setterFactory('style.height.px');
        setterFn(div, 40);
        expect(DOM.getStyle(div, 'height')).toEqual('40px');
        setterFn(div, null);
        expect(DOM.getStyle(div, 'height')).toEqual('');
        var otherSetterFn = setterFactory('style.height.px');
        expect(setterFn).toBe(otherSetterFn);
      }));
      it('should return a setter for innerHtml', (function() {
        var setterFn = setterFactory('innerHtml');
        setterFn(div, '<span></span>');
        expect(DOM.getInnerHTML(div)).toEqual('<span></span>');
        var otherSetterFn = setterFactory('innerHtml');
        expect(setterFn).toBe(otherSetterFn);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      xdescribe = $__m.xdescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      el = $__m.el;
    }, function($__m) {
      setterFactory = $__m.setterFactory;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=property_setter_factory_spec.es6.map

//# sourceMappingURL=./property_setter_factory_spec.js.map