System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/render/dom/compiler/template_loader", "angular2/src/services/url_resolver", "angular2/src/render/api", "angular2/src/facade/async", "angular2/src/mock/xhr_mock"], function($__export) {
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
      TemplateLoader,
      UrlResolver,
      ViewDefinition,
      PromiseWrapper,
      MockXHR,
      SomeComponent,
      FakeUrlResolver;
  function main() {
    describe('TemplateLoader', (function() {
      var loader,
          xhr;
      beforeEach((function() {
        xhr = new MockXHR();
        loader = new TemplateLoader(xhr, new FakeUrlResolver());
      }));
      it('should load inline templates', inject([AsyncTestCompleter], (function(async) {
        var template = new ViewDefinition({template: 'template template'});
        loader.load(template).then((function(el) {
          expect(DOM.content(el)).toHaveText('template template');
          async.done();
        }));
      })));
      it('should load templates through XHR', inject([AsyncTestCompleter], (function(async) {
        xhr.expect('base/foo', 'xhr template');
        var template = new ViewDefinition({absUrl: 'base/foo'});
        loader.load(template).then((function(el) {
          expect(DOM.content(el)).toHaveText('xhr template');
          async.done();
        }));
        xhr.flush();
      })));
      it('should cache template loaded through XHR', inject([AsyncTestCompleter], (function(async) {
        var firstEl;
        xhr.expect('base/foo', 'xhr template');
        var template = new ViewDefinition({absUrl: 'base/foo'});
        loader.load(template).then((function(el) {
          firstEl = el;
          return loader.load(template);
        })).then((function(el) {
          expect(el).toBe(firstEl);
          expect(DOM.content(el)).toHaveText('xhr template');
          async.done();
        }));
        xhr.flush();
      })));
      it('should throw when no template is defined', (function() {
        var template = new ViewDefinition({
          template: null,
          absUrl: null
        });
        expect((function() {
          return loader.load(template);
        })).toThrowError('View should have either the url or template property set');
      }));
      it('should return a rejected Promise when xhr loading fails', inject([AsyncTestCompleter], (function(async) {
        xhr.expect('base/foo', null);
        var template = new ViewDefinition({absUrl: 'base/foo'});
        PromiseWrapper.then(loader.load(template), function(_) {
          throw 'Unexpected response';
        }, function(error) {
          expect(error).toEqual('Failed to load base/foo');
          async.done();
        });
        xhr.flush();
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
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      ViewDefinition = $__m.ViewDefinition;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      MockXHR = $__m.MockXHR;
    }],
    execute: function() {
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      FakeUrlResolver = (function($__super) {
        var FakeUrlResolver = function FakeUrlResolver() {
          $traceurRuntime.superConstructor(FakeUrlResolver).call(this);
        };
        return ($traceurRuntime.createClass)(FakeUrlResolver, {resolve: function(baseUrl, url) {
            assert.argumentTypes(baseUrl, assert.type.string, url, assert.type.string);
            return assert.returnType((baseUrl + url), assert.type.string);
          }}, {}, $__super);
      }(UrlResolver));
      Object.defineProperty(FakeUrlResolver.prototype.resolve, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=template_loader_spec.es6.map

//# sourceMappingURL=./template_loader_spec.js.map