System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/services/xhr", "angular2/src/render/dom/shadow_dom/emulated_scoped_shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/util", "angular2/src/services/url_resolver", "angular2/src/render/dom/shadow_dom/style_url_resolver", "angular2/src/render/dom/shadow_dom/style_inliner", "angular2/src/render/dom/view/view"], function($__export) {
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
      SpyObject,
      isPresent,
      isBlank,
      DOM,
      Map,
      MapWrapper,
      PromiseWrapper,
      Promise,
      XHR,
      EmulatedScopedShadowDomStrategy,
      resetShadowDomCache,
      UrlResolver,
      StyleUrlResolver,
      StyleInliner,
      RenderView,
      FakeXHR;
  function main() {
    describe('EmulatedScopedShadowDomStrategy', (function() {
      var xhr,
          styleHost,
          strategy;
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        xhr = new FakeXHR();
        var styleInliner = new StyleInliner(xhr, styleUrlResolver, urlResolver);
        styleHost = el('<div></div>');
        strategy = new EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, styleHost);
        resetShadowDomCache();
      }));
      it('should attach the view nodes as child of the host element', (function() {
        var host = el('<div><span>original content</span></div>');
        var originalChild = DOM.childNodes(host)[0];
        var nodes = el('<div>view</div>');
        var view = new RenderView(null, [nodes], [], [], []);
        strategy.attachTemplate(host, view);
        expect(DOM.childNodes(host)[0]).toBe(originalChild);
        expect(DOM.childNodes(host)[1]).toBe(nodes);
      }));
      it('should rewrite style urls', (function() {
        var styleElement = el('<style>.foo {background-image: url("img.jpg");}</style>');
        strategy.processStyleElement('someComponent', 'http://base', styleElement);
        expect(styleElement).toHaveText(".foo[_ngcontent-0] {\n" + "background-image: url(http://base/img.jpg);\n" + "}");
      }));
      it('should scope styles', (function() {
        var styleElement = el('<style>.foo {} :host {}</style>');
        strategy.processStyleElement('someComponent', 'http://base', styleElement);
        expect(styleElement).toHaveText(".foo[_ngcontent-0] {\n\n}\n\n[_nghost-0] {\n\n}");
      }));
      it('should inline @import rules', inject([AsyncTestCompleter], (function(async) {
        xhr.reply('http://base/one.css', '.one {}');
        var styleElement = el('<style>@import "one.css";</style>');
        var stylePromise = strategy.processStyleElement('someComponent', 'http://base', styleElement);
        expect(stylePromise).toBePromise();
        expect(styleElement).toHaveText('');
        stylePromise.then((function(_) {
          expect(styleElement).toHaveText('.one[_ngcontent-0] {\n\n}');
          async.done();
        }));
      })));
      it('should return the same style given the same component', (function() {
        var styleElement = el('<style>.foo {} :host {}</style>');
        strategy.processStyleElement('someComponent', 'http://base', styleElement);
        var styleElement2 = el('<style>.foo {} :host {}</style>');
        strategy.processStyleElement('someComponent', 'http://base', styleElement2);
        expect(DOM.getText(styleElement)).toEqual(DOM.getText(styleElement2));
      }));
      it('should return different styles given different components', (function() {
        var styleElement = el('<style>.foo {} :host {}</style>');
        strategy.processStyleElement('someComponent1', 'http://base', styleElement);
        var styleElement2 = el('<style>.foo {} :host {}</style>');
        strategy.processStyleElement('someComponent2', 'http://base', styleElement2);
        expect(DOM.getText(styleElement)).not.toEqual(DOM.getText(styleElement2));
      }));
      it('should move the style element to the style host', (function() {
        var compileElement = el('<div><style>.one {}</style></div>');
        var styleElement = DOM.firstChild(compileElement);
        strategy.processStyleElement('someComponent', 'http://base', styleElement);
        expect(compileElement).toHaveText('');
        expect(styleHost).toHaveText('.one[_ngcontent-0] {\n\n}');
      }));
      it('should add an attribute to component elements', (function() {
        var element = el('<div></div>');
        strategy.processElement(null, 'elComponent', element);
        expect(DOM.getAttribute(element, '_nghost-0')).toEqual('');
      }));
      it('should add an attribute to the content elements', (function() {
        var element = el('<div></div>');
        strategy.processElement('hostComponent', null, element);
        expect(DOM.getAttribute(element, '_ngcontent-0')).toEqual('');
      }));
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
      SpyObject = $__m.SpyObject;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      EmulatedScopedShadowDomStrategy = $__m.EmulatedScopedShadowDomStrategy;
    }, function($__m) {
      resetShadowDomCache = $__m.resetShadowDomCache;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      RenderView = $__m.RenderView;
    }],
    execute: function() {
      FakeXHR = (function($__super) {
        var FakeXHR = function FakeXHR() {
          $traceurRuntime.superConstructor(FakeXHR).call(this);
          this._responses = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeXHR, {
          get: function(url) {
            assert.argumentTypes(url, assert.type.string);
            var response = MapWrapper.get(this._responses, url);
            if (isBlank(response)) {
              return assert.returnType((PromiseWrapper.reject('xhr error')), assert.genericType(Promise, assert.type.string));
            }
            return assert.returnType((PromiseWrapper.resolve(response)), assert.genericType(Promise, assert.type.string));
          },
          reply: function(url, response) {
            assert.argumentTypes(url, assert.type.string, response, assert.type.string);
            MapWrapper.set(this._responses, url, response);
          }
        }, {}, $__super);
      }(XHR));
      Object.defineProperty(FakeXHR.prototype.get, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeXHR.prototype.reply, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=emulated_scoped_shadow_dom_strategy_spec.es6.map

//# sourceMappingURL=./emulated_scoped_shadow_dom_strategy_spec.js.map