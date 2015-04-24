System.register(["rtts_assert/rtts_assert", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "./view_container", "./proto_view", "../shadow_dom/light_dom", "../shadow_dom/content_tag"], function($__export) {
  "use strict";
  var assert,
      DOM,
      ListWrapper,
      MapWrapper,
      Map,
      StringMapWrapper,
      List,
      int,
      isPresent,
      isBlank,
      BaseException,
      ViewContainer,
      RenderProtoView,
      LightDom,
      Content,
      NG_BINDING_CLASS,
      RenderView;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
      List = $__m.List;
    }, function($__m) {
      int = $__m.int;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      RenderProtoView = $__m.RenderProtoView;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      Content = $__m.Content;
    }],
    execute: function() {
      NG_BINDING_CLASS = 'ng-binding';
      RenderView = $__export("RenderView", (function() {
        var RenderView = function RenderView(proto, rootNodes, boundTextNodes, boundElements, contentTags) {
          assert.argumentTypes(proto, RenderProtoView, rootNodes, List, boundTextNodes, List, boundElements, List, contentTags, List);
          this.proto = proto;
          this.rootNodes = rootNodes;
          this.boundTextNodes = boundTextNodes;
          this.boundElements = boundElements;
          this.viewContainers = ListWrapper.createFixedSize(boundElements.length);
          this.contentTags = contentTags;
          this.lightDoms = ListWrapper.createFixedSize(boundElements.length);
          ListWrapper.fill(this.lightDoms, null);
          this.componentChildViews = ListWrapper.createFixedSize(boundElements.length);
          this.hostLightDom = null;
          this.hydrated = false;
          this.eventHandlerRemovers = [];
          this.imperativeHostViews = [];
        };
        return ($traceurRuntime.createClass)(RenderView, {
          getDirectParentLightDom: function(boundElementIndex) {
            assert.argumentTypes(boundElementIndex, assert.type.number);
            var binder = this.proto.elementBinders[boundElementIndex];
            var destLightDom = null;
            if (binder.parentIndex !== -1 && binder.distanceToParent === 1) {
              destLightDom = this.lightDoms[binder.parentIndex];
            }
            return destLightDom;
          },
          getOrCreateViewContainer: function(binderIndex) {
            var vc = this.viewContainers[binderIndex];
            if (isBlank(vc)) {
              vc = new ViewContainer(this, binderIndex);
              this.viewContainers[binderIndex] = vc;
            }
            return vc;
          },
          setElementProperty: function(elementIndex, propertyName, value) {
            assert.argumentTypes(elementIndex, assert.type.number, propertyName, assert.type.string, value, assert.type.any);
            var setter = MapWrapper.get(this.proto.elementBinders[elementIndex].propertySetters, propertyName);
            setter(this.boundElements[elementIndex], value);
          },
          setText: function(textIndex, value) {
            assert.argumentTypes(textIndex, assert.type.number, value, assert.type.string);
            DOM.setText(this.boundTextNodes[textIndex], value);
          },
          getViewContainer: function(index) {
            assert.argumentTypes(index, assert.type.number);
            return assert.returnType((this.viewContainers[index]), ViewContainer);
          },
          setEventDispatcher: function(dispatcher) {
            assert.argumentTypes(dispatcher, assert.type.any);
            this._eventDispatcher = dispatcher;
          },
          dispatchEvent: function(elementIndex, eventName, event) {
            var allowDefaultBehavior = true;
            if (isPresent(this._eventDispatcher)) {
              var evalLocals = MapWrapper.create();
              MapWrapper.set(evalLocals, '$event', event);
              allowDefaultBehavior = this._eventDispatcher.dispatchEvent(elementIndex, eventName, evalLocals);
              if (!allowDefaultBehavior) {
                event.preventDefault();
              }
            }
            return assert.returnType((allowDefaultBehavior), assert.type.boolean);
          }
        }, {});
      }()));
      Object.defineProperty(RenderView, "parameters", {get: function() {
          return [[RenderProtoView], [List], [List], [List], [List]];
        }});
      Object.defineProperty(RenderView.prototype.getDirectParentLightDom, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(RenderView.prototype.setElementProperty, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.any]];
        }});
      Object.defineProperty(RenderView.prototype.setText, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string]];
        }});
      Object.defineProperty(RenderView.prototype.getViewContainer, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(RenderView.prototype.setEventDispatcher, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
    }
  };
});
//# sourceMappingURL=view.es6.map

//# sourceMappingURL=./view.js.map