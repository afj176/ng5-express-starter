System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/view", "angular2/src/core/compiler/ng_element", "angular2/src/directives/non_bindable", "angular2/src/test_lib/test_bed"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      DOM,
      Decorator,
      Component,
      View,
      NgElement,
      NonBindable,
      TestBed,
      TestComponent,
      TestDecorator;
  function main() {
    describe('non-bindable', (function() {
      it('should not interpolate children', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div>{{text}}<span non-bindable>{{text}}</span></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('foo{{text}}');
          async.done();
        }));
      })));
      it('should ignore directives on child nodes', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div non-bindable><span id=child test-dec>{{text}}</span></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          var span = DOM.querySelector(view.rootNodes[0], '#child');
          expect(DOM.hasClass(span, 'compiled')).toBeFalsy();
          async.done();
        }));
      })));
      it('should trigger directives on the same node', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div><span id=child non-bindable test-dec>{{text}}</span></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          var span = DOM.querySelector(view.rootNodes[0], '#child');
          expect(DOM.hasClass(span, 'compiled')).toBeTruthy();
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
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      NonBindable = $__m.NonBindable;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }],
    execute: function() {
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.text = 'foo';
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({selector: 'test-cmp'}), new View({directives: [NonBindable, TestDecorator]})];
        }});
      TestDecorator = (function() {
        var TestDecorator = function TestDecorator(el) {
          assert.argumentTypes(el, NgElement);
          DOM.addClass(el.domElement, 'compiled');
        };
        return ($traceurRuntime.createClass)(TestDecorator, {}, {});
      }());
      Object.defineProperty(TestDecorator, "annotations", {get: function() {
          return [new Decorator({selector: '[test-dec]'})];
        }});
      Object.defineProperty(TestDecorator, "parameters", {get: function() {
          return [[NgElement]];
        }});
    }
  };
});
//# sourceMappingURL=non_bindable_spec.es6.map

//# sourceMappingURL=./non_bindable_spec.js.map