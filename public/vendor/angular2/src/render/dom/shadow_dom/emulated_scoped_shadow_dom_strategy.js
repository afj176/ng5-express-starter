System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/dom/dom_adapter", "angular2/src/render/dom/shadow_dom/style_inliner", "angular2/src/render/dom/shadow_dom/style_url_resolver", "./emulated_unscoped_shadow_dom_strategy", "./util"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      PromiseWrapper,
      Promise,
      DOM,
      StyleInliner,
      StyleUrlResolver,
      EmulatedUnscopedShadowDomStrategy,
      getContentAttribute,
      getHostAttribute,
      getComponentId,
      shimCssForComponent,
      insertStyleElement,
      EmulatedScopedShadowDomStrategy;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      getContentAttribute = $__m.getContentAttribute;
      getHostAttribute = $__m.getHostAttribute;
      getComponentId = $__m.getComponentId;
      shimCssForComponent = $__m.shimCssForComponent;
      insertStyleElement = $__m.insertStyleElement;
    }],
    execute: function() {
      EmulatedScopedShadowDomStrategy = $__export("EmulatedScopedShadowDomStrategy", (function($__super) {
        var EmulatedScopedShadowDomStrategy = function EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, styleHost) {
          assert.argumentTypes(styleInliner, StyleInliner, styleUrlResolver, StyleUrlResolver, styleHost, assert.type.any);
          $traceurRuntime.superConstructor(EmulatedScopedShadowDomStrategy).call(this, styleUrlResolver, styleHost);
          this.styleInliner = styleInliner;
        };
        return ($traceurRuntime.createClass)(EmulatedScopedShadowDomStrategy, {
          processStyleElement: function(hostComponentId, templateUrl, styleEl) {
            assert.argumentTypes(hostComponentId, assert.type.string, templateUrl, assert.type.string, styleEl, assert.type.any);
            var cssText = DOM.getText(styleEl);
            cssText = this.styleUrlResolver.resolveUrls(cssText, templateUrl);
            var css = this.styleInliner.inlineImports(cssText, templateUrl);
            if (PromiseWrapper.isPromise(css)) {
              DOM.setText(styleEl, '');
              return assert.returnType((css.then((function(css) {
                css = shimCssForComponent(css, hostComponentId);
                DOM.setText(styleEl, css);
              }))), Promise);
            } else {
              css = shimCssForComponent(css, hostComponentId);
              DOM.setText(styleEl, css);
            }
            DOM.remove(styleEl);
            insertStyleElement(this.styleHost, styleEl);
            return assert.returnType((null), Promise);
          },
          processElement: function(hostComponentId, elementComponentId, element) {
            assert.argumentTypes(hostComponentId, assert.type.string, elementComponentId, assert.type.string, element, assert.type.any);
            if (isPresent(hostComponentId)) {
              var contentAttribute = getContentAttribute(getComponentId(hostComponentId));
              DOM.setAttribute(element, contentAttribute, '');
            }
            if (isPresent(elementComponentId)) {
              var hostAttribute = getHostAttribute(getComponentId(elementComponentId));
              DOM.setAttribute(element, hostAttribute, '');
            }
          }
        }, {}, $__super);
      }(EmulatedUnscopedShadowDomStrategy)));
      Object.defineProperty(EmulatedScopedShadowDomStrategy, "parameters", {get: function() {
          return [[StyleInliner], [StyleUrlResolver], []];
        }});
      Object.defineProperty(EmulatedScopedShadowDomStrategy.prototype.processStyleElement, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], []];
        }});
      Object.defineProperty(EmulatedScopedShadowDomStrategy.prototype.processElement, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], []];
        }});
    }
  };
});
//# sourceMappingURL=emulated_scoped_shadow_dom_strategy.es6.map

//# sourceMappingURL=./emulated_scoped_shadow_dom_strategy.js.map