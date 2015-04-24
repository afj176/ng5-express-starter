System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/view", "angular2/src/directives/for", "angular2/src/test_lib/test_bed"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      beforeEachBindings,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      DOM,
      ListWrapper,
      Component,
      View,
      For,
      TestBed,
      Foo,
      TestComponent;
  function main() {
    describe('for', (function() {
      var TEMPLATE = '<div><copy-me template="for #item of items">{{item.toString()}};</copy-me></div>';
      it('should reflect initial elements', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('1;2;');
          async.done();
        }));
      })));
      it('should reflect added elements', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          view.detectChanges();
          ListWrapper.push(view.context.items, 3);
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('1;2;3;');
          async.done();
        }));
      })));
      it('should reflect removed elements', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          view.detectChanges();
          ListWrapper.removeAt(view.context.items, 1);
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('1;');
          async.done();
        }));
      })));
      it('should reflect moved elements', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          view.detectChanges();
          ListWrapper.removeAt(view.context.items, 0);
          ListWrapper.push(view.context.items, 1);
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('2;1;');
          async.done();
        }));
      })));
      it('should reflect a mix of all changes (additions/removals/moves)', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          view.context.items = [0, 1, 2, 3, 4, 5];
          view.detectChanges();
          view.context.items = [6, 2, 7, 0, 4, 8];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('6;2;7;0;4;8;');
          async.done();
        }));
      })));
      it('should iterate over an array of objects', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<ul><li template="for #item of items">{{item["name"]}};</li></ul>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.context.items = [{'name': 'misko'}, {'name': 'shyam'}];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('misko;shyam;');
          ListWrapper.push(view.context.items, {'name': 'adam'});
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('misko;shyam;adam;');
          ListWrapper.removeAt(view.context.items, 2);
          ListWrapper.removeAt(view.context.items, 0);
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('shyam;');
          async.done();
        }));
      })));
      it('should gracefully handle nulls', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<ul><li template="for #item of null">{{item}};</li></ul>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('');
          async.done();
        }));
      })));
      it('should gracefully handle ref changing to null and back', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('1;2;');
          view.context.items = null;
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('');
          view.context.items = [1, 2, 3];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('1;2;3;');
          async.done();
        }));
      })));
      it('should throw on ref changing to string', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('1;2;');
          view.context.items = 'whaaa';
          expect((function() {
            return view.detectChanges();
          })).toThrowError();
          async.done();
        }));
      })));
      it('should works with duplicates', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.createView(TestComponent, {html: TEMPLATE}).then((function(view) {
          var a = new Foo();
          view.context.items = [a, a];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('foo;foo;');
          async.done();
        }));
      })));
      it('should repeat over nested arrays', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div>' + '<div template="for #item of items">' + '<div template="for #subitem of item">' + '{{subitem}}-{{item.length}};' + '</div>|' + '</div>' + '</div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.context.items = [['a', 'b'], ['c']];
          view.detectChanges();
          view.detectChanges();
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('a-2;b-2;|c-1;|');
          view.context.items = [['e'], ['f', 'g']];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('e-1;|f-2;g-2;|');
          async.done();
        }));
      })));
      it('should repeat over nested arrays with no intermediate element', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div><template [for] #item [of]="items">' + '<div template="for #subitem of item">' + '{{subitem}}-{{item.length}};' + '</div></template></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.context.items = [['a', 'b'], ['c']];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('a-2;b-2;c-1;');
          view.context.items = [['e'], ['f', 'g']];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('e-1;f-2;g-2;');
          async.done();
        }));
      })));
      it('should display indices correctly', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div><copy-me template="for: var item of items; var i=index">{{i.toString()}}</copy-me></div>';
        tb.createView(TestComponent, {html: template}).then((function(view) {
          view.context.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('0123456789');
          view.context.items = [1, 2, 6, 7, 4, 3, 5, 8, 9, 0];
          view.detectChanges();
          expect(DOM.getText(view.rootNodes[0])).toEqual('0123456789');
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
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      For = $__m.For;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }],
    execute: function() {
      Foo = (function() {
        var Foo = function Foo() {
          ;
        };
        return ($traceurRuntime.createClass)(Foo, {toString: function() {
            return 'foo';
          }}, {});
      }());
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.items = [1, 2];
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({selector: 'test-cmp'}), new View({directives: [For]})];
        }});
    }
  };
});
//# sourceMappingURL=for_spec.es6.map

//# sourceMappingURL=./for_spec.js.map