System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "./element_binder", "../util"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      DOM,
      List,
      Map,
      ListWrapper,
      MapWrapper,
      ElementBinder,
      NG_BINDING_CLASS,
      RenderProtoView;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      List = $__m.List;
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      NG_BINDING_CLASS = $__m.NG_BINDING_CLASS;
    }],
    execute: function() {
      RenderProtoView = $__export("RenderProtoView", (function() {
        var RenderProtoView = function RenderProtoView($__1) {
          var $__2 = $__1,
              elementBinders = $__2.elementBinders,
              element = $__2.element,
              imperativeRendererId = $__2.imperativeRendererId;
          this.element = element;
          this.elementBinders = elementBinders;
          this.imperativeRendererId = imperativeRendererId;
          if (isPresent(imperativeRendererId)) {
            this.rootBindingOffset = 0;
            this.isTemplateElement = false;
          } else {
            this.isTemplateElement = DOM.isTemplateElement(this.element);
            this.rootBindingOffset = (isPresent(this.element) && DOM.hasClass(this.element, NG_BINDING_CLASS)) ? 1 : 0;
          }
        };
        return ($traceurRuntime.createClass)(RenderProtoView, {mergeChildComponentProtoViews: function(componentProtoViews) {
            assert.argumentTypes(componentProtoViews, assert.genericType(List, RenderProtoView));
            var componentProtoViewIndex = 0;
            for (var i = 0; i < this.elementBinders.length; i++) {
              var eb = this.elementBinders[i];
              if (isPresent(eb.componentId)) {
                eb.nestedProtoView = componentProtoViews[componentProtoViewIndex];
                componentProtoViewIndex++;
              }
            }
          }}, {});
      }()));
      Object.defineProperty(RenderProtoView.prototype.mergeChildComponentProtoViews, "parameters", {get: function() {
          return [[assert.genericType(List, RenderProtoView)]];
        }});
    }
  };
});
//# sourceMappingURL=proto_view.es6.map

//# sourceMappingURL=./proto_view.js.map