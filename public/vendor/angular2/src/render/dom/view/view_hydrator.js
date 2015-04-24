System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "../shadow_dom/light_dom", "../events/event_manager", "./view_factory", "./view_container", "./view", "../shadow_dom/shadow_dom_strategy"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      int,
      isPresent,
      isBlank,
      BaseException,
      ListWrapper,
      MapWrapper,
      Map,
      StringMapWrapper,
      List,
      ldModule,
      EventManager,
      ViewFactory,
      vcModule,
      viewModule,
      ShadowDomStrategy,
      RenderViewHydrator;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      int = $__m.int;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
      List = $__m.List;
    }, function($__m) {
      ldModule = $__m;
    }, function($__m) {
      EventManager = $__m.EventManager;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
    }, function($__m) {
      vcModule = $__m;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }],
    execute: function() {
      RenderViewHydrator = $__export("RenderViewHydrator", (function() {
        var RenderViewHydrator = function RenderViewHydrator(eventManager, viewFactory, shadowDomStrategy) {
          assert.argumentTypes(eventManager, EventManager, viewFactory, ViewFactory, shadowDomStrategy, ShadowDomStrategy);
          this._eventManager = eventManager;
          this._viewFactory = viewFactory;
          this._shadowDomStrategy = shadowDomStrategy;
        };
        return ($traceurRuntime.createClass)(RenderViewHydrator, {
          hydrateDynamicComponentView: function(hostView, boundElementIndex, componentView) {
            assert.argumentTypes(hostView, viewModule.RenderView, boundElementIndex, assert.type.number, componentView, viewModule.RenderView);
            ViewFactory.setComponentView(this._shadowDomStrategy, hostView, boundElementIndex, componentView);
            var lightDom = hostView.lightDoms[boundElementIndex];
            this._viewHydrateRecurse(componentView, lightDom);
            if (isPresent(lightDom)) {
              lightDom.redistribute();
            }
          },
          dehydrateDynamicComponentView: function(parentView, boundElementIndex) {
            assert.argumentTypes(parentView, viewModule.RenderView, boundElementIndex, assert.type.number);
            throw new BaseException('Not supported yet');
          },
          hydrateInPlaceHostView: function(parentView, hostView) {
            assert.argumentTypes(parentView, viewModule.RenderView, hostView, viewModule.RenderView);
            if (isPresent(parentView)) {
              ListWrapper.push(parentView.imperativeHostViews, hostView);
            }
            this._viewHydrateRecurse(hostView, null);
          },
          dehydrateInPlaceHostView: function(parentView, hostView) {
            assert.argumentTypes(parentView, viewModule.RenderView, hostView, viewModule.RenderView);
            if (isPresent(parentView)) {
              ListWrapper.remove(parentView.imperativeHostViews, hostView);
            }
            vcModule.ViewContainer.removeViewNodes(hostView);
            hostView.rootNodes = [];
            this._viewDehydrateRecurse(hostView);
          },
          hydrateViewInViewContainer: function(viewContainer, view) {
            assert.argumentTypes(viewContainer, vcModule.ViewContainer, view, viewModule.RenderView);
            this._viewHydrateRecurse(view, viewContainer.parentView.hostLightDom);
          },
          dehydrateViewInViewContainer: function(viewContainer, view) {
            assert.argumentTypes(viewContainer, vcModule.ViewContainer, view, viewModule.RenderView);
            this._viewDehydrateRecurse(view);
          },
          _viewHydrateRecurse: function(view, hostLightDom) {
            assert.argumentTypes(view, assert.type.any, hostLightDom, ldModule.LightDom);
            if (view.hydrated)
              throw new BaseException('The view is already hydrated.');
            view.hydrated = true;
            view.hostLightDom = hostLightDom;
            for (var i = 0; i < view.contentTags.length; i++) {
              var destLightDom = view.getDirectParentLightDom(i);
              var ct = view.contentTags[i];
              if (isPresent(ct)) {
                ct.hydrate(destLightDom);
              }
            }
            for (var i = 0; i < view.componentChildViews.length; i++) {
              var cv = view.componentChildViews[i];
              if (isPresent(cv)) {
                this._viewHydrateRecurse(cv, view.lightDoms[i]);
              }
            }
            for (var i = 0; i < view.lightDoms.length; ++i) {
              var lightDom = view.lightDoms[i];
              if (isPresent(lightDom)) {
                lightDom.redistribute();
              }
            }
            view.eventHandlerRemovers = ListWrapper.create();
            var binders = view.proto.elementBinders;
            for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
              var binder = binders[binderIdx];
              if (isPresent(binder.globalEvents)) {
                for (var i = 0; i < binder.globalEvents.length; i++) {
                  var globalEvent = binder.globalEvents[i];
                  var remover = this._createGlobalEventListener(view, binderIdx, globalEvent.name, globalEvent.target, globalEvent.fullName);
                  ListWrapper.push(view.eventHandlerRemovers, remover);
                }
              }
            }
          },
          _createGlobalEventListener: function(view, elementIndex, eventName, eventTarget, fullName) {
            return assert.returnType((this._eventManager.addGlobalEventListener(eventTarget, eventName, (function(event) {
              view.dispatchEvent(elementIndex, fullName, event);
            }))), Function);
          },
          _viewDehydrateRecurse: function(view) {
            for (var i = 0; i < view.componentChildViews.length; i++) {
              var cv = view.componentChildViews[i];
              if (isPresent(cv)) {
                this._viewDehydrateRecurse(cv);
                if (view.proto.elementBinders[i].hasDynamicComponent()) {
                  vcModule.ViewContainer.removeViewNodes(cv);
                  this._viewFactory.returnView(cv);
                  view.lightDoms[i] = null;
                  view.componentChildViews[i] = null;
                }
              }
            }
            for (var i = 0; i < view.imperativeHostViews.length; i++) {
              var hostView = view.imperativeHostViews[i];
              this._viewDehydrateRecurse(hostView);
              vcModule.ViewContainer.removeViewNodes(hostView);
              hostView.rootNodes = [];
              this._viewFactory.returnView(hostView);
            }
            view.imperativeHostViews = [];
            if (isPresent(view.viewContainers)) {
              for (var i = 0; i < view.viewContainers.length; i++) {
                var vc = view.viewContainers[i];
                if (isPresent(vc)) {
                  this._viewContainerDehydrateRecurse(vc);
                }
                var ct = view.contentTags[i];
                if (isPresent(ct)) {
                  ct.dehydrate();
                }
              }
            }
            for (var i = 0; i < view.eventHandlerRemovers.length; i++) {
              view.eventHandlerRemovers[i]();
            }
            view.hostLightDom = null;
            view.eventHandlerRemovers = null;
            view.setEventDispatcher(null);
            view.hydrated = false;
          },
          _viewContainerDehydrateRecurse: function(viewContainer) {
            for (var i = 0; i < viewContainer.views.length; i++) {
              this._viewDehydrateRecurse(viewContainer.views[i]);
            }
            viewContainer.clear();
          }
        }, {});
      }()));
      Object.defineProperty(RenderViewHydrator, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(RenderViewHydrator, "parameters", {get: function() {
          return [[EventManager], [ViewFactory], [ShadowDomStrategy]];
        }});
      Object.defineProperty(RenderViewHydrator.prototype.hydrateDynamicComponentView, "parameters", {get: function() {
          return [[viewModule.RenderView], [assert.type.number], [viewModule.RenderView]];
        }});
      Object.defineProperty(RenderViewHydrator.prototype.dehydrateDynamicComponentView, "parameters", {get: function() {
          return [[viewModule.RenderView], [assert.type.number]];
        }});
      Object.defineProperty(RenderViewHydrator.prototype.hydrateInPlaceHostView, "parameters", {get: function() {
          return [[viewModule.RenderView], [viewModule.RenderView]];
        }});
      Object.defineProperty(RenderViewHydrator.prototype.dehydrateInPlaceHostView, "parameters", {get: function() {
          return [[viewModule.RenderView], [viewModule.RenderView]];
        }});
      Object.defineProperty(RenderViewHydrator.prototype.hydrateViewInViewContainer, "parameters", {get: function() {
          return [[vcModule.ViewContainer], [viewModule.RenderView]];
        }});
      Object.defineProperty(RenderViewHydrator.prototype.dehydrateViewInViewContainer, "parameters", {get: function() {
          return [[vcModule.ViewContainer], [viewModule.RenderView]];
        }});
      Object.defineProperty(RenderViewHydrator.prototype._viewHydrateRecurse, "parameters", {get: function() {
          return [[], [ldModule.LightDom]];
        }});
    }
  };
});
//# sourceMappingURL=view_hydrator.es6.map

//# sourceMappingURL=./view_hydrator.js.map