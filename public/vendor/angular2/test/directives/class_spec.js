System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/core/annotations/view", "angular2/src/core/annotations/annotations", "angular2/src/test_lib/test_bed", "angular2/src/directives/class"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      beforeEachBindings,
      ddescribe,
      xdescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      StringMapWrapper,
      View,
      Component,
      TestBed,
      CSSClass,
      TestComponent;
  function main() {
    describe('binding to CSS class list', (function() {
      it('should add classes specified in an object literal', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div [class]="{foo: true, bar: false}"></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo');
          async.done();
        }));
      })));
      it('should add and remove classes based on changes in object literal values', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div [class]="{foo: condition, bar: !condition}"></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo');
          view.context.condition = false;
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding bar');
          async.done();
        }));
      })));
      it('should add and remove classes based on changes to the expression object', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div [class]="expr"></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo');
          StringMapWrapper.set(view.context.expr, 'bar', true);
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo bar');
          StringMapWrapper.set(view.context.expr, 'baz', true);
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo bar baz');
          StringMapWrapper.delete(view.context.expr, 'bar');
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo baz');
          async.done();
        }));
      })));
      it('should retain existing classes when expression evaluates to null', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div [class]="expr"></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo');
          view.context.expr = null;
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding foo');
          view.context.expr = {
            'foo': false,
            'bar': true
          };
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('ng-binding bar');
          async.done();
        }));
      })));
      it('should co-operate with the class attribute', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div [class]="expr" class="init foo"></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          StringMapWrapper.set(view.context.expr, 'bar', true);
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('init foo ng-binding bar');
          StringMapWrapper.set(view.context.expr, 'foo', false);
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('init ng-binding bar');
          async.done();
        }));
      })));
      it('should co-operate with the class attribute and class.name binding', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div class="init foo" [class]="expr" [class.baz]="condition"></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('init foo ng-binding baz');
          StringMapWrapper.set(view.context.expr, 'bar', true);
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('init foo ng-binding baz bar');
          StringMapWrapper.set(view.context.expr, 'foo', false);
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('init ng-binding baz bar');
          view.context.condition = false;
          view.detectChanges();
          expect(view.rootNodes[0].className).toEqual('init ng-binding bar');
          async.done();
        }));
      })));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      beforeEachBindings = $__m.beforeEachBindings;
      ddescribe = $__m.ddescribe;
      xdescribe = $__m.xdescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }, function($__m) {
      CSSClass = $__m.CSSClass;
    }],
    execute: function() {
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.condition = true;
          this.expr = {
            'foo': true,
            'bar': false
          };
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({selector: 'test-cmp'}), new View({directives: [CSSClass]})];
        }});
    }
  };
});
//# sourceMappingURL=class_spec.es6.map

//# sourceMappingURL=./class_spec.js.map