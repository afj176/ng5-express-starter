System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/test_lib/test_bed", "angular2/src/core/compiler/query_list", "angular2/src/core/annotations/di", "angular2/angular2", "angular2/src/dom/browser_adapter"], function($__export) {
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
      IS_NODEJS,
      it,
      xit,
      TestBed,
      QueryList,
      Query,
      Decorator,
      Component,
      View,
      If,
      For,
      BrowserDomAdapter,
      NeedsQuery,
      _constructiontext,
      TextDirective,
      MyComp;
  function main() {
    BrowserDomAdapter.makeCurrent();
    describe('Query API', (function() {
      it('should contain all directives in the light dom', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div text="1"></div>' + '<needs-query text="2"><div text="3"></div></needs-query>' + '<div text="4"></div>';
        tb.createView(MyComp, {html: template}).then((function(view) {
          view.detectChanges();
          expect(view.rootNodes).toHaveText('2|3|');
          async.done();
        }));
      })));
      it('should reflect dynamically inserted directives', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div text="1"></div>' + '<needs-query text="2"><div *if="shouldShow" [text]="\'3\'"></div></needs-query>' + '<div text="4"></div>';
        tb.createView(MyComp, {html: template}).then((function(view) {
          view.detectChanges();
          expect(view.rootNodes).toHaveText('2|');
          view.context.shouldShow = true;
          view.detectChanges();
          view.detectChanges();
          expect(view.rootNodes).toHaveText('2|3|');
          async.done();
        }));
      })));
      it('should reflect moved directives', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        var template = '<div text="1"></div>' + '<needs-query text="2"><div *for="var i of list" [text]="i"></div></needs-query>' + '<div text="4"></div>';
        tb.createView(MyComp, {html: template}).then((function(view) {
          view.detectChanges();
          view.detectChanges();
          expect(view.rootNodes).toHaveText('2|1d|2d|3d|');
          view.context.list = ['3d', '2d'];
          view.detectChanges();
          view.detectChanges();
          expect(view.rootNodes).toHaveText('2|3d|2d|');
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
      IS_NODEJS = $__m.IS_NODEJS;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }, function($__m) {
      QueryList = $__m.QueryList;
    }, function($__m) {
      Query = $__m.Query;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      View = $__m.View;
      If = $__m.If;
      For = $__m.For;
    }, function($__m) {
      BrowserDomAdapter = $__m.BrowserDomAdapter;
    }],
    execute: function() {
      NeedsQuery = (function() {
        var NeedsQuery = function NeedsQuery(query) {
          assert.argumentTypes(query, QueryList);
          this.query = query;
        };
        return ($traceurRuntime.createClass)(NeedsQuery, {}, {});
      }());
      Object.defineProperty(NeedsQuery, "annotations", {get: function() {
          return [new Component({selector: 'needs-query'}), new View({
            directives: [For],
            template: '<div *for="var dir of query">{{dir.text}}|</div>'
          })];
        }});
      Object.defineProperty(NeedsQuery, "parameters", {get: function() {
          return [[QueryList, new Query(TextDirective)]];
        }});
      _constructiontext = 0;
      TextDirective = (function() {
        var TextDirective = function TextDirective() {};
        return ($traceurRuntime.createClass)(TextDirective, {}, {});
      }());
      Object.defineProperty(TextDirective, "annotations", {get: function() {
          return [new Decorator({
            selector: '[text]',
            properties: {'text': 'text'}
          })];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {
          this.shouldShow = false;
          this.list = ['1d', '2d', '3d'];
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({selector: 'my-comp'}), new View({directives: [NeedsQuery, TextDirective, If, For]})];
        }});
    }
  };
});
//# sourceMappingURL=query_integration_spec.es6.map

//# sourceMappingURL=./query_integration_spec.js.map