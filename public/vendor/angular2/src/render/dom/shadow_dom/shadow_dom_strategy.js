System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "../view/view", "./light_dom"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      Promise,
      viewModule,
      LightDom,
      ShadowDomStrategy;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }],
    execute: function() {
      ShadowDomStrategy = $__export("ShadowDomStrategy", (function() {
        var ShadowDomStrategy = function ShadowDomStrategy() {
          ;
        };
        return ($traceurRuntime.createClass)(ShadowDomStrategy, {
          hasNativeContentElement: function() {
            return assert.returnType((true), assert.type.boolean);
          },
          attachTemplate: function(el, view) {
            assert.argumentTypes(el, assert.type.any, view, viewModule.RenderView);
          },
          constructLightDom: function(lightDomView, shadowDomView, el) {
            assert.argumentTypes(lightDomView, viewModule.RenderView, shadowDomView, viewModule.RenderView, el, assert.type.any);
            return assert.returnType((null), LightDom);
          },
          processStyleElement: function(hostComponentId, templateUrl, styleElement) {
            assert.argumentTypes(hostComponentId, assert.type.string, templateUrl, assert.type.string, styleElement, assert.type.any);
            return assert.returnType((null), Promise);
          },
          processElement: function(hostComponentId, elementComponentId, element) {
            assert.argumentTypes(hostComponentId, assert.type.string, elementComponentId, assert.type.string, element, assert.type.any);
          }
        }, {});
      }()));
      Object.defineProperty(ShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[], [viewModule.RenderView]];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.constructLightDom, "parameters", {get: function() {
          return [[viewModule.RenderView], [viewModule.RenderView], []];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.processStyleElement, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], []];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.processElement, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], []];
        }});
    }
  };
});
//# sourceMappingURL=shadow_dom_strategy.es6.map

//# sourceMappingURL=./shadow_dom_strategy.js.map