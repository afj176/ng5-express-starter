System.register(["angular2/test_lib", "angular2/src/render/dom/shadow_dom/native_shadow_dom_strategy", "angular2/src/services/url_resolver", "angular2/src/render/dom/shadow_dom/style_url_resolver", "angular2/src/render/dom/view/view", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter"], function($__export) {
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
      NativeShadowDomStrategy,
      UrlResolver,
      StyleUrlResolver,
      RenderView,
      isPresent,
      isBlank,
      DOM;
  function main() {
    var strategy;
    describe('NativeShadowDomStrategy', (function() {
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        strategy = new NativeShadowDomStrategy(styleUrlResolver);
      }));
      it('should attach the view nodes to the shadow root', (function() {
        var host = el('<div><span>original content</span></div>');
        var nodes = el('<div>view</div>');
        var view = new RenderView(null, [nodes], [], [], []);
        strategy.attachTemplate(host, view);
        var shadowRoot = DOM.getShadowRoot(host);
        expect(isPresent(shadowRoot)).toBeTruthy();
        expect(shadowRoot).toHaveText('view');
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
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      RenderView = $__m.RenderView;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=native_shadow_dom_strategy_spec.es6.map

//# sourceMappingURL=./native_shadow_dom_strategy_spec.js.map