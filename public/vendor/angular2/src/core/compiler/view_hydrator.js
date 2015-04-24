System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/collection", "./element_injector", "angular2/src/facade/lang", "./view_container", "./view", "angular2/change_detection", "angular2/src/render/api"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      Inject,
      OpaqueToken,
      Injector,
      ListWrapper,
      MapWrapper,
      Map,
      StringMapWrapper,
      List,
      eli,
      isPresent,
      isBlank,
      BaseException,
      vcModule,
      viewModule,
      BindingPropagationConfig,
      Locals,
      renderApi,
      AppViewHydrator;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
      Inject = $__m.Inject;
      OpaqueToken = $__m.OpaqueToken;
      Injector = $__m.Injector;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
      StringMapWrapper = $__m.StringMapWrapper;
      List = $__m.List;
    }, function($__m) {
      eli = $__m;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      vcModule = $__m;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      BindingPropagationConfig = $__m.BindingPropagationConfig;
      Locals = $__m.Locals;
    }, function($__m) {
      renderApi = $__m;
    }],
    execute: function() {
      AppViewHydrator = $__export("AppViewHydrator", (function() {
        var AppViewHydrator = function AppViewHydrator(renderer) {
          assert.argumentTypes(renderer, renderApi.Renderer);
          this._renderer = renderer;
        };
        return ($traceurRuntime.createClass)(AppViewHydrator, {
          hydrateDynamicComponentView: function(hostView, boundElementIndex, componentView, componentDirective, injector) {
            assert.argumentTypes(hostView, viewModule.AppView, boundElementIndex, assert.type.number, componentView, viewModule.AppView, componentDirective, eli.DirectiveBinding, injector, Injector);
            var binder = hostView.proto.elementBinders[boundElementIndex];
            if (!binder.hasDynamicComponent()) {
              throw new BaseException(("There is no dynamic component directive at element " + boundElementIndex));
            }
            if (isPresent(hostView.componentChildViews[boundElementIndex])) {
              throw new BaseException(("There already is a bound component at element " + boundElementIndex));
            }
            var hostElementInjector = hostView.elementInjectors[boundElementIndex];
            if (isBlank(injector)) {
              injector = hostElementInjector.getLightDomAppInjector();
            }
            var shadowDomAppInjector = this._createShadowDomAppInjector(componentDirective, injector);
            if (isBlank(shadowDomAppInjector)) {
              shadowDomAppInjector = null;
            }
            var component = hostElementInjector.dynamicallyCreateComponent(componentDirective, shadowDomAppInjector);
            hostView.componentChildViews[boundElementIndex] = componentView;
            hostView.changeDetector.addShadowDomChild(componentView.changeDetector);
            var renderViewRefs = this._renderer.createDynamicComponentView(hostView.render, boundElementIndex, componentView.proto.render);
            this._viewHydrateRecurse(componentView, renderViewRefs, 0, shadowDomAppInjector, hostElementInjector, component, null);
          },
          dehydrateDynamicComponentView: function(parentView, boundElementIndex) {
            assert.argumentTypes(parentView, viewModule.AppView, boundElementIndex, assert.type.number);
            throw new BaseException('Not yet implemented!');
          },
          hydrateInPlaceHostView: function(parentView, hostElementSelector, hostView, injector) {
            assert.argumentTypes(parentView, viewModule.AppView, hostElementSelector, assert.type.any, hostView, viewModule.AppView, injector, Injector);
            var parentRenderViewRef = null;
            if (isPresent(parentView)) {
              throw new BaseException('Not yet supported');
            }
            var binder = hostView.proto.elementBinders[0];
            var shadowDomAppInjector = this._createShadowDomAppInjector(binder.componentDirective, injector);
            var renderViewRefs = this._renderer.createInPlaceHostView(parentRenderViewRef, hostElementSelector, hostView.proto.render);
            this._viewHydrateRecurse(hostView, renderViewRefs, 0, shadowDomAppInjector, null, new Object(), null);
          },
          dehydrateInPlaceHostView: function(parentView, hostView) {
            assert.argumentTypes(parentView, viewModule.AppView, hostView, viewModule.AppView);
            var parentRenderViewRef = null;
            if (isPresent(parentView)) {
              throw new BaseException('Not yet supported');
            }
            var render = hostView.render;
            this._viewDehydrateRecurse(hostView);
            this._renderer.destroyInPlaceHostView(parentRenderViewRef, render);
          },
          hydrateViewInViewContainer: function(viewContainer, atIndex, view) {
            var injector = arguments[3] !== (void 0) ? arguments[3] : null;
            assert.argumentTypes(viewContainer, vcModule.ViewContainer, atIndex, assert.type.number, view, viewModule.AppView, injector, Injector);
            if (!viewContainer.hydrated())
              throw new BaseException('Cannot create views on a dehydrated ViewContainer');
            if (isBlank(injector)) {
              injector = viewContainer.elementInjector.getLightDomAppInjector();
            }
            var renderViewRefs = this._renderer.createViewInContainer(viewContainer.getRender(), atIndex, view.proto.render);
            viewContainer.parentView.changeDetector.addChild(view.changeDetector);
            this._viewHydrateRecurse(view, renderViewRefs, 0, injector, viewContainer.elementInjector.getHost(), viewContainer.parentView.context, viewContainer.parentView.locals);
          },
          dehydrateViewInViewContainer: function(viewContainer, atIndex, view) {
            assert.argumentTypes(viewContainer, vcModule.ViewContainer, atIndex, assert.type.number, view, viewModule.AppView);
            view.changeDetector.remove();
            this._viewDehydrateRecurse(view);
            this._renderer.destroyViewInContainer(viewContainer.getRender(), atIndex);
          },
          _viewHydrateRecurse: function(view, renderComponentViewRefs, renderComponentIndex, appInjector, hostElementInjector, context, locals) {
            assert.argumentTypes(view, viewModule.AppView, renderComponentViewRefs, assert.genericType(List, renderApi.ViewRef), renderComponentIndex, assert.type.number, appInjector, Injector, hostElementInjector, eli.ElementInjector, context, Object, locals, Locals);
            if (view.hydrated())
              throw new BaseException('The view is already hydrated.');
            view.render = renderComponentViewRefs[renderComponentIndex++];
            view.context = context;
            view.locals.parent = locals;
            var binders = view.proto.elementBinders;
            for (var i = 0; i < binders.length; ++i) {
              var componentDirective = binders[i].componentDirective;
              var shadowDomAppInjector = null;
              if (isPresent(componentDirective)) {
                shadowDomAppInjector = this._createShadowDomAppInjector(componentDirective, appInjector);
              } else {
                shadowDomAppInjector = null;
              }
              var elementInjector = view.elementInjectors[i];
              if (isPresent(elementInjector)) {
                elementInjector.instantiateDirectives(appInjector, hostElementInjector, shadowDomAppInjector, view.preBuiltObjects[i]);
                this._setUpEventEmitters(view, elementInjector, i);
                var exportImplicitName = elementInjector.getExportImplicitName();
                if (elementInjector.isExportingComponent()) {
                  view.locals.set(exportImplicitName, elementInjector.getComponent());
                } else if (elementInjector.isExportingElement()) {
                  view.locals.set(exportImplicitName, elementInjector.getNgElement().domElement);
                }
              }
              if (binders[i].hasStaticComponent()) {
                renderComponentIndex = this._viewHydrateRecurse(view.componentChildViews[i], renderComponentViewRefs, renderComponentIndex, shadowDomAppInjector, elementInjector, elementInjector.getComponent(), null);
              }
            }
            view.changeDetector.hydrate(view.context, view.locals, view);
            view.renderer.setEventDispatcher(view.render, view);
            return assert.returnType((renderComponentIndex), assert.type.number);
          },
          _setUpEventEmitters: function(view, elementInjector, boundElementIndex) {
            assert.argumentTypes(view, viewModule.AppView, elementInjector, eli.ElementInjector, boundElementIndex, assert.type.number);
            var emitters = elementInjector.getEventEmitterAccessors();
            for (var directiveIndex = 0; directiveIndex < emitters.length; ++directiveIndex) {
              var directiveEmitters = emitters[directiveIndex];
              var directive = elementInjector.getDirectiveAtIndex(directiveIndex);
              for (var eventIndex = 0; eventIndex < directiveEmitters.length; ++eventIndex) {
                var eventEmitterAccessor = directiveEmitters[eventIndex];
                eventEmitterAccessor.subscribe(view, boundElementIndex, directive);
              }
            }
          },
          _viewDehydrateRecurse: function(view) {
            assert.argumentTypes(view, viewModule.AppView);
            for (var i = 0; i < view.componentChildViews.length; i++) {
              var componentView = view.componentChildViews[i];
              if (isPresent(componentView)) {
                this._viewDehydrateRecurse(componentView);
                var binder = view.proto.elementBinders[i];
                if (binder.hasDynamicComponent()) {
                  view.componentChildViews[i] = null;
                  view.changeDetector.removeShadowDomChild(componentView.changeDetector);
                }
              }
            }
            for (var i = 0; i < view.elementInjectors.length; i++) {
              if (isPresent(view.elementInjectors[i])) {
                view.elementInjectors[i].clearDirectives();
              }
            }
            if (isPresent(view.viewContainers)) {
              for (var i = 0; i < view.viewContainers.length; i++) {
                var vc = view.viewContainers[i];
                if (isPresent(vc)) {
                  this._viewContainerDehydrateRecurse(vc);
                }
              }
            }
            view.render = null;
            if (isPresent(view.locals)) {
              view.locals.clearValues();
            }
            view.context = null;
            view.changeDetector.dehydrate();
          },
          _createShadowDomAppInjector: function(componentDirective, appInjector) {
            var shadowDomAppInjector = null;
            var injectables = componentDirective.resolvedInjectables;
            if (isPresent(injectables)) {
              shadowDomAppInjector = appInjector.createChildFromResolved(injectables);
            } else {
              shadowDomAppInjector = appInjector;
            }
            return shadowDomAppInjector;
          },
          _viewContainerDehydrateRecurse: function(viewContainer) {
            assert.argumentTypes(viewContainer, vcModule.ViewContainer);
            for (var i = 0; i < viewContainer.length; i++) {
              var view = viewContainer.get(i);
              view.changeDetector.remove();
              this._viewDehydrateRecurse(view);
            }
            viewContainer.internalClearWithoutRender();
          }
        }, {});
      }()));
      Object.defineProperty(AppViewHydrator, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(AppViewHydrator, "parameters", {get: function() {
          return [[renderApi.Renderer]];
        }});
      Object.defineProperty(AppViewHydrator.prototype.hydrateDynamicComponentView, "parameters", {get: function() {
          return [[viewModule.AppView], [assert.type.number], [viewModule.AppView], [eli.DirectiveBinding], [Injector]];
        }});
      Object.defineProperty(AppViewHydrator.prototype.dehydrateDynamicComponentView, "parameters", {get: function() {
          return [[viewModule.AppView], [assert.type.number]];
        }});
      Object.defineProperty(AppViewHydrator.prototype.hydrateInPlaceHostView, "parameters", {get: function() {
          return [[viewModule.AppView], [], [viewModule.AppView], [Injector]];
        }});
      Object.defineProperty(AppViewHydrator.prototype.dehydrateInPlaceHostView, "parameters", {get: function() {
          return [[viewModule.AppView], [viewModule.AppView]];
        }});
      Object.defineProperty(AppViewHydrator.prototype.hydrateViewInViewContainer, "parameters", {get: function() {
          return [[vcModule.ViewContainer], [assert.type.number], [viewModule.AppView], [Injector]];
        }});
      Object.defineProperty(AppViewHydrator.prototype.dehydrateViewInViewContainer, "parameters", {get: function() {
          return [[vcModule.ViewContainer], [assert.type.number], [viewModule.AppView]];
        }});
      Object.defineProperty(AppViewHydrator.prototype._viewHydrateRecurse, "parameters", {get: function() {
          return [[viewModule.AppView], [assert.genericType(List, renderApi.ViewRef)], [assert.type.number], [Injector], [eli.ElementInjector], [Object], [Locals]];
        }});
      Object.defineProperty(AppViewHydrator.prototype._setUpEventEmitters, "parameters", {get: function() {
          return [[viewModule.AppView], [eli.ElementInjector], [assert.type.number]];
        }});
      Object.defineProperty(AppViewHydrator.prototype._viewDehydrateRecurse, "parameters", {get: function() {
          return [[viewModule.AppView]];
        }});
      Object.defineProperty(AppViewHydrator.prototype._viewContainerDehydrateRecurse, "parameters", {get: function() {
          return [[vcModule.ViewContainer]];
        }});
    }
  };
});
//# sourceMappingURL=view_hydrator.es6.map

//# sourceMappingURL=./view_hydrator.js.map