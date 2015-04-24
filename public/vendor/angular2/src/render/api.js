System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      Promise,
      List,
      Map,
      ASTWithSource,
      EventBinding,
      ElementBinder,
      DirectiveBinder,
      ProtoViewDto,
      DirectiveMetadata,
      ProtoViewRef,
      ViewRef,
      ViewContainerRef,
      ViewDefinition,
      Renderer,
      EventDispatcher;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      List = $__m.List;
      Map = $__m.Map;
    }, function($__m) {
      ASTWithSource = $__m.ASTWithSource;
    }],
    execute: function() {
      EventBinding = $__export("EventBinding", (function() {
        var EventBinding = function EventBinding(fullName, source) {
          assert.argumentTypes(fullName, assert.type.string, source, ASTWithSource);
          this.fullName = fullName;
          this.source = source;
        };
        return ($traceurRuntime.createClass)(EventBinding, {}, {});
      }()));
      Object.defineProperty(EventBinding, "parameters", {get: function() {
          return [[assert.type.string], [ASTWithSource]];
        }});
      ElementBinder = $__export("ElementBinder", (function() {
        var ElementBinder = function ElementBinder($__1) {
          var $__2 = $__1,
              index = $__2.index,
              parentIndex = $__2.parentIndex,
              distanceToParent = $__2.distanceToParent,
              directives = $__2.directives,
              nestedProtoView = $__2.nestedProtoView,
              propertyBindings = $__2.propertyBindings,
              variableBindings = $__2.variableBindings,
              eventBindings = $__2.eventBindings,
              textBindings = $__2.textBindings,
              readAttributes = $__2.readAttributes;
          this.index = index;
          this.parentIndex = parentIndex;
          this.distanceToParent = distanceToParent;
          this.directives = directives;
          this.nestedProtoView = nestedProtoView;
          this.propertyBindings = propertyBindings;
          this.variableBindings = variableBindings;
          this.eventBindings = eventBindings;
          this.textBindings = textBindings;
          this.readAttributes = readAttributes;
        };
        return ($traceurRuntime.createClass)(ElementBinder, {}, {});
      }()));
      DirectiveBinder = $__export("DirectiveBinder", (function() {
        var DirectiveBinder = function DirectiveBinder($__1) {
          var $__2 = $__1,
              directiveIndex = $__2.directiveIndex,
              propertyBindings = $__2.propertyBindings,
              eventBindings = $__2.eventBindings,
              hostPropertyBindings = $__2.hostPropertyBindings;
          this.directiveIndex = directiveIndex;
          this.propertyBindings = propertyBindings;
          this.eventBindings = eventBindings;
          this.hostPropertyBindings = hostPropertyBindings;
        };
        return ($traceurRuntime.createClass)(DirectiveBinder, {}, {});
      }()));
      ProtoViewDto = $__export("ProtoViewDto", (function() {
        var ProtoViewDto = function ProtoViewDto() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              render = $__1.render,
              elementBinders = $__1.elementBinders,
              variableBindings = $__1.variableBindings,
              type = $__1.type;
          this.render = render;
          this.elementBinders = elementBinders;
          this.variableBindings = variableBindings;
          this.type = type;
        };
        return ($traceurRuntime.createClass)(ProtoViewDto, {}, {
          get HOST_VIEW_TYPE() {
            return 0;
          },
          get COMPONENT_VIEW_TYPE() {
            return 1;
          },
          get EMBEDDED_VIEW_TYPE() {
            return 1;
          }
        });
      }()));
      DirectiveMetadata = $__export("DirectiveMetadata", (function() {
        var DirectiveMetadata = function DirectiveMetadata($__1) {
          var $__2 = $__1,
              id = $__2.id,
              selector = $__2.selector,
              compileChildren = $__2.compileChildren,
              hostListeners = $__2.hostListeners,
              hostProperties = $__2.hostProperties,
              properties = $__2.properties,
              readAttributes = $__2.readAttributes,
              type = $__2.type;
          this.id = id;
          this.selector = selector;
          this.compileChildren = isPresent(compileChildren) ? compileChildren : true;
          this.hostListeners = hostListeners;
          this.hostProperties = hostProperties;
          this.properties = properties;
          this.readAttributes = readAttributes;
          this.type = type;
        };
        return ($traceurRuntime.createClass)(DirectiveMetadata, {}, {
          get DECORATOR_TYPE() {
            return 0;
          },
          get COMPONENT_TYPE() {
            return 1;
          },
          get VIEWPORT_TYPE() {
            return 2;
          }
        });
      }()));
      ProtoViewRef = $__export("ProtoViewRef", (function() {
        var ProtoViewRef = function ProtoViewRef() {
          ;
        };
        return ($traceurRuntime.createClass)(ProtoViewRef, {}, {});
      }()));
      ViewRef = $__export("ViewRef", (function() {
        var ViewRef = function ViewRef() {
          ;
        };
        return ($traceurRuntime.createClass)(ViewRef, {}, {});
      }()));
      ViewContainerRef = $__export("ViewContainerRef", (function() {
        var ViewContainerRef = function ViewContainerRef(view, elementIndex) {
          assert.argumentTypes(view, ViewRef, elementIndex, assert.type.number);
          this.view = view;
          this.elementIndex = elementIndex;
        };
        return ($traceurRuntime.createClass)(ViewContainerRef, {}, {});
      }()));
      Object.defineProperty(ViewContainerRef, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number]];
        }});
      ViewDefinition = $__export("ViewDefinition", (function() {
        var ViewDefinition = function ViewDefinition($__1) {
          var $__2 = $__1,
              componentId = $__2.componentId,
              absUrl = $__2.absUrl,
              template = $__2.template,
              directives = $__2.directives;
          this.componentId = componentId;
          this.absUrl = absUrl;
          this.template = template;
          this.directives = directives;
        };
        return ($traceurRuntime.createClass)(ViewDefinition, {}, {});
      }()));
      Renderer = $__export("Renderer", (function() {
        var Renderer = function Renderer() {
          ;
        };
        return ($traceurRuntime.createClass)(Renderer, {
          createHostProtoView: function(componentId) {
            return assert.returnType((null), assert.genericType(Promise, ProtoViewDto));
          },
          createImperativeComponentProtoView: function(rendererId) {
            return assert.returnType((null), assert.genericType(Promise, ProtoViewDto));
          },
          compile: function(template) {
            assert.argumentTypes(template, ViewDefinition);
            return assert.returnType((null), assert.genericType(Promise, ProtoViewDto));
          },
          mergeChildComponentProtoViews: function(protoViewRef, componentProtoViewRefs) {
            assert.argumentTypes(protoViewRef, ProtoViewRef, componentProtoViewRefs, assert.genericType(List, ProtoViewRef));
            return null;
          },
          createViewInContainer: function(vcRef, atIndex, protoViewRef) {
            assert.argumentTypes(vcRef, ViewContainerRef, atIndex, assert.type.number, protoViewRef, ProtoViewRef);
            return assert.returnType((null), assert.genericType(List, ViewRef));
          },
          destroyViewInContainer: function(vcRef, atIndex) {
            assert.argumentTypes(vcRef, ViewContainerRef, atIndex, assert.type.number);
          },
          insertViewIntoContainer: function(vcRef, atIndex, view) {
            assert.argumentTypes(vcRef, ViewContainerRef, atIndex, assert.type.number, view, ViewRef);
          },
          detachViewFromContainer: function(vcRef, atIndex) {
            assert.argumentTypes(vcRef, ViewContainerRef, atIndex, assert.type.number);
          },
          createDynamicComponentView: function(hostViewRef, elementIndex, componentProtoViewRef) {
            assert.argumentTypes(hostViewRef, ViewRef, elementIndex, assert.type.number, componentProtoViewRef, ProtoViewRef);
            return assert.returnType((null), assert.genericType(List, ViewRef));
          },
          destroyDynamicComponentView: function(hostViewRef, elementIndex) {
            assert.argumentTypes(hostViewRef, ViewRef, elementIndex, assert.type.number);
          },
          createInPlaceHostView: function(parentViewRef, hostElementSelector, hostProtoViewRef) {
            assert.argumentTypes(parentViewRef, ViewRef, hostElementSelector, assert.type.any, hostProtoViewRef, ProtoViewRef);
            return assert.returnType((null), assert.genericType(List, ViewRef));
          },
          destroyInPlaceHostView: function(parentViewRef, hostViewRef) {
            assert.argumentTypes(parentViewRef, ViewRef, hostViewRef, ViewRef);
          },
          setElementProperty: function(view, elementIndex, propertyName, propertyValue) {
            assert.argumentTypes(view, ViewRef, elementIndex, assert.type.number, propertyName, assert.type.string, propertyValue, assert.type.any);
          },
          setText: function(view, textNodeIndex, text) {
            assert.argumentTypes(view, ViewRef, textNodeIndex, assert.type.number, text, assert.type.string);
          },
          setEventDispatcher: function(viewRef, dispatcher) {
            assert.argumentTypes(viewRef, ViewRef, dispatcher, assert.type.any);
          },
          flush: function() {}
        }, {});
      }()));
      Object.defineProperty(Renderer.prototype.compile, "parameters", {get: function() {
          return [[ViewDefinition]];
        }});
      Object.defineProperty(Renderer.prototype.mergeChildComponentProtoViews, "parameters", {get: function() {
          return [[ProtoViewRef], [assert.genericType(List, ProtoViewRef)]];
        }});
      Object.defineProperty(Renderer.prototype.createViewInContainer, "parameters", {get: function() {
          return [[ViewContainerRef], [assert.type.number], [ProtoViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.destroyViewInContainer, "parameters", {get: function() {
          return [[ViewContainerRef], [assert.type.number]];
        }});
      Object.defineProperty(Renderer.prototype.insertViewIntoContainer, "parameters", {get: function() {
          return [[ViewContainerRef], [assert.type.number], [ViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.detachViewFromContainer, "parameters", {get: function() {
          return [[ViewContainerRef], [assert.type.number]];
        }});
      Object.defineProperty(Renderer.prototype.createDynamicComponentView, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number], [ProtoViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.destroyDynamicComponentView, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number]];
        }});
      Object.defineProperty(Renderer.prototype.createInPlaceHostView, "parameters", {get: function() {
          return [[ViewRef], [], [ProtoViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.destroyInPlaceHostView, "parameters", {get: function() {
          return [[ViewRef], [ViewRef]];
        }});
      Object.defineProperty(Renderer.prototype.setElementProperty, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number], [assert.type.string], [assert.type.any]];
        }});
      Object.defineProperty(Renderer.prototype.setText, "parameters", {get: function() {
          return [[ViewRef], [assert.type.number], [assert.type.string]];
        }});
      Object.defineProperty(Renderer.prototype.setEventDispatcher, "parameters", {get: function() {
          return [[ViewRef], [assert.type.any]];
        }});
      EventDispatcher = $__export("EventDispatcher", (function() {
        var EventDispatcher = function EventDispatcher() {
          ;
        };
        return ($traceurRuntime.createClass)(EventDispatcher, {dispatchEvent: function(elementIndex, eventName, locals) {
            assert.argumentTypes(elementIndex, assert.type.number, eventName, assert.type.string, locals, assert.genericType(Map, assert.type.string, assert.type.any));
          }}, {});
      }()));
      Object.defineProperty(EventDispatcher.prototype.dispatchEvent, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.genericType(Map, assert.type.string, assert.type.any)]];
        }});
    }
  };
});
//# sourceMappingURL=api.es6.map

//# sourceMappingURL=./api.js.map