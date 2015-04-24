System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/util", "angular2/src/services/url_resolver", "angular2/src/render/dom/shadow_dom/style_url_resolver", "angular2/src/render/dom/view/view"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
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
      DOM,
      Map,
      MapWrapper,
      ListWrapper,
      EmulatedUnscopedShadowDomStrategy,
      resetShadowDomCache,
      UrlResolver,
      StyleUrlResolver,
      RenderView;
  function main() {
    var strategy;
    describe('EmulatedUnscopedShadowDomStrategy', (function() {
      var styleHost;
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        styleHost = el('<div></div>');
        strategy = new EmulatedUnscopedShadowDomStrategy(styleUrlResolver, styleHost);
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
        expect(styleElement).toHaveText(".foo {" + "background-image: url('http://base/img.jpg');" + "}");
      }));
      it('should not inline import rules', (function() {
        var styleElement = el('<style>@import "other.css";</style>');
        strategy.processStyleElement('someComponent', 'http://base', styleElement);
        expect(styleElement).toHaveText("@import 'http://base/other.css';");
      }));
      it('should move the style element to the style host', (function() {
        var compileElement = el('<div><style>.one {}</style></div>');
        var styleElement = DOM.firstChild(compileElement);
        strategy.processStyleElement('someComponent', 'http://base', styleElement);
        expect(compileElement).toHaveText('');
        expect(styleHost).toHaveText('.one {}');
      }));
      it('should insert the same style only once in the style host', (function() {
        var styleEls = [el('<style>/*css1*/</style>'), el('<style>/*css2*/</style>'), el('<style>/*css1*/</style>')];
        ListWrapper.forEach(styleEls, (function(styleEl) {
          strategy.processStyleElement('someComponent', 'http://base', styleEl);
        }));
        expect(styleHost).toHaveText("/*css1*//*css2*/");
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
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
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      resetShadowDomCache = $__m.resetShadowDomCache;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      RenderView = $__m.RenderView;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=emulated_unscoped_shadow_dom_strategy_spec.es6.map

//# sourceMappingURL=./emulated_unscoped_shadow_dom_strategy_spec.js.map