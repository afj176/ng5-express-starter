System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/dom/dom_adapter", "../compiler/compile_step", "../compiler/compile_element", "../compiler/compile_control", "../../api", "./shadow_dom_strategy"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      assertionsEnabled,
      MapWrapper,
      List,
      ListWrapper,
      Promise,
      PromiseWrapper,
      DOM,
      CompileStep,
      CompileElement,
      CompileControl,
      ViewDefinition,
      ShadowDomStrategy,
      ShadowDomCompileStep;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      assertionsEnabled = $__m.assertionsEnabled;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      ViewDefinition = $__m.ViewDefinition;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }],
    execute: function() {
      ShadowDomCompileStep = $__export("ShadowDomCompileStep", (function($__super) {
        var ShadowDomCompileStep = function ShadowDomCompileStep(shadowDomStrategy, template, subTaskPromises) {
          assert.argumentTypes(shadowDomStrategy, ShadowDomStrategy, template, ViewDefinition, subTaskPromises, assert.genericType(List, Promise));
          $traceurRuntime.superConstructor(ShadowDomCompileStep).call(this);
          this._shadowDomStrategy = shadowDomStrategy;
          this._template = template;
          this._subTaskPromises = subTaskPromises;
        };
        return ($traceurRuntime.createClass)(ShadowDomCompileStep, {
          process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            var tagName = DOM.tagName(current.element).toUpperCase();
            if (tagName == 'STYLE') {
              this._processStyleElement(current, control);
            } else if (tagName == 'CONTENT') {
              this._processContentElement(current);
            } else {
              var componentId = current.isBound() ? current.inheritedElementBinder.componentId : null;
              this._shadowDomStrategy.processElement(this._template.componentId, componentId, current.element);
            }
          },
          _processStyleElement: function(current, control) {
            assert.argumentTypes(current, CompileElement, control, CompileControl);
            var stylePromise = this._shadowDomStrategy.processStyleElement(this._template.componentId, this._template.absUrl, current.element);
            if (isPresent(stylePromise) && PromiseWrapper.isPromise(stylePromise)) {
              ListWrapper.push(this._subTaskPromises, stylePromise);
            }
            control.ignoreCurrentElement();
          },
          _processContentElement: function(current) {
            assert.argumentTypes(current, CompileElement);
            if (this._shadowDomStrategy.hasNativeContentElement()) {
              return ;
            }
            var attrs = current.attrs();
            var selector = MapWrapper.get(attrs, 'select');
            selector = isPresent(selector) ? selector : '';
            var contentStart = DOM.createScriptTag('type', 'ng/contentStart');
            if (assertionsEnabled()) {
              DOM.setAttribute(contentStart, 'select', selector);
            }
            var contentEnd = DOM.createScriptTag('type', 'ng/contentEnd');
            DOM.insertBefore(current.element, contentStart);
            DOM.insertBefore(current.element, contentEnd);
            DOM.remove(current.element);
            current.element = contentStart;
            current.bindElement().setContentTagSelector(selector);
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ShadowDomCompileStep, "parameters", {get: function() {
          return [[ShadowDomStrategy], [ViewDefinition], [assert.genericType(List, Promise)]];
        }});
      Object.defineProperty(ShadowDomCompileStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(ShadowDomCompileStep.prototype._processStyleElement, "parameters", {get: function() {
          return [[CompileElement], [CompileControl]];
        }});
      Object.defineProperty(ShadowDomCompileStep.prototype._processContentElement, "parameters", {get: function() {
          return [[CompileElement]];
        }});
    }
  };
});
//# sourceMappingURL=shadow_dom_compile_step.es6.map

//# sourceMappingURL=./shadow_dom_compile_step.js.map