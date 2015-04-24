System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/di", "angular2/src/core/compiler/element_injector", "./view", "angular2/src/render/api"], function($__export) {
  "use strict";
  var assert,
      ListWrapper,
      MapWrapper,
      List,
      BaseException,
      Injector,
      eiModule,
      isPresent,
      isBlank,
      viewModule,
      ViewContainerRef,
      ViewContainer;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
    }, function($__m) {
      BaseException = $__m.BaseException;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      eiModule = $__m;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      ViewContainerRef = $__m.ViewContainerRef;
    }],
    execute: function() {
      ViewContainer = $__export("ViewContainer", (function() {
        var ViewContainer = function ViewContainer(parentView, defaultProtoView, elementInjector) {
          assert.argumentTypes(parentView, viewModule.AppView, defaultProtoView, viewModule.AppProtoView, elementInjector, eiModule.ElementInjector);
          this.parentView = parentView;
          this.defaultProtoView = defaultProtoView;
          this.elementInjector = elementInjector;
          this._views = [];
        };
        return ($traceurRuntime.createClass)(ViewContainer, {
          getRender: function() {
            return assert.returnType((new ViewContainerRef(this.parentView.render, this.elementInjector.getBoundElementIndex())), ViewContainerRef);
          },
          internalClearWithoutRender: function() {
            for (var i = this._views.length - 1; i >= 0; i--) {
              this._detachInjectors(i);
            }
          },
          clear: function() {
            for (var i = this._views.length - 1; i >= 0; i--) {
              this.remove(i);
            }
          },
          get: function(index) {
            assert.argumentTypes(index, assert.type.number);
            return assert.returnType((this._views[index]), viewModule.AppView);
          },
          get length() {
            return this._views.length;
          },
          _siblingInjectorToLinkAfter: function(index) {
            assert.argumentTypes(index, assert.type.number);
            if (index == 0)
              return assert.returnType((null), eiModule.ElementInjector);
            return assert.returnType((ListWrapper.last(this._views[index - 1].rootElementInjectors)), eiModule.ElementInjector);
          },
          hydrated: function() {
            return assert.returnType((this.parentView.hydrated()), assert.type.boolean);
          },
          create: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            var protoView = arguments[1] !== (void 0) ? arguments[1] : null;
            var injector = arguments[2] !== (void 0) ? arguments[2] : null;
            assert.argumentTypes(atIndex, assert.type.number, protoView, viewModule.AppProtoView, injector, Injector);
            if (atIndex == -1)
              atIndex = this._views.length;
            if (!this.hydrated())
              throw new BaseException('Cannot create views on a dehydrated ViewContainer');
            if (isBlank(protoView)) {
              protoView = this.defaultProtoView;
            }
            var newView = this.parentView.viewFactory.getView(protoView);
            this._insertInjectors(newView, atIndex);
            this.parentView.viewHydrator.hydrateViewInViewContainer(this, atIndex, newView, injector);
            return assert.returnType((newView), viewModule.AppView);
          },
          insert: function(view) {
            var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
            assert.argumentTypes(view, viewModule.AppView, atIndex, assert.type.number);
            if (atIndex == -1)
              atIndex = this._views.length;
            this._insertInjectors(view, atIndex);
            this.parentView.changeDetector.addChild(view.changeDetector);
            this.parentView.renderer.insertViewIntoContainer(this.getRender(), atIndex, view.render);
            return assert.returnType((view), viewModule.AppView);
          },
          _insertInjectors: function(view, atIndex) {
            assert.argumentTypes(view, viewModule.AppView, atIndex, assert.type.number);
            ListWrapper.insert(this._views, atIndex, view);
            this._linkElementInjectors(this._siblingInjectorToLinkAfter(atIndex), view);
            return assert.returnType((view), viewModule.AppView);
          },
          indexOf: function(view) {
            assert.argumentTypes(view, viewModule.AppView);
            return ListWrapper.indexOf(this._views, view);
          },
          remove: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            assert.argumentTypes(atIndex, assert.type.number);
            if (atIndex == -1)
              atIndex = this._views.length - 1;
            var view = this._views[atIndex];
            this.parentView.viewHydrator.dehydrateViewInViewContainer(this, atIndex, view);
            this._detachInjectors(atIndex);
            this.parentView.viewFactory.returnView(view);
          },
          detach: function() {
            var atIndex = arguments[0] !== (void 0) ? arguments[0] : -1;
            assert.argumentTypes(atIndex, assert.type.number);
            if (atIndex == -1)
              atIndex = this._views.length - 1;
            var detachedView = this._detachInjectors(atIndex);
            detachedView.changeDetector.remove();
            this.parentView.renderer.detachViewFromContainer(this.getRender(), atIndex);
            return assert.returnType((detachedView), viewModule.AppView);
          },
          _detachInjectors: function(atIndex) {
            assert.argumentTypes(atIndex, assert.type.number);
            var detachedView = this.get(atIndex);
            ListWrapper.removeAt(this._views, atIndex);
            this._unlinkElementInjectors(detachedView);
            return assert.returnType((detachedView), viewModule.AppView);
          },
          _linkElementInjectors: function(sibling, view) {
            assert.argumentTypes(sibling, assert.type.any, view, viewModule.AppView);
            for (var i = view.rootElementInjectors.length - 1; i >= 0; i--) {
              view.rootElementInjectors[i].linkAfter(this.elementInjector, sibling);
            }
          },
          _unlinkElementInjectors: function(view) {
            assert.argumentTypes(view, viewModule.AppView);
            for (var i = 0; i < view.rootElementInjectors.length; ++i) {
              view.rootElementInjectors[i].unlink();
            }
          }
        }, {});
      }()));
      Object.defineProperty(ViewContainer, "parameters", {get: function() {
          return [[viewModule.AppView], [viewModule.AppProtoView], [eiModule.ElementInjector]];
        }});
      Object.defineProperty(ViewContainer.prototype.get, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype._siblingInjectorToLinkAfter, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype.create, "parameters", {get: function() {
          return [[assert.type.number], [viewModule.AppProtoView], [Injector]];
        }});
      Object.defineProperty(ViewContainer.prototype.insert, "parameters", {get: function() {
          return [[viewModule.AppView], [assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype._insertInjectors, "parameters", {get: function() {
          return [[viewModule.AppView], [assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype.indexOf, "parameters", {get: function() {
          return [[viewModule.AppView]];
        }});
      Object.defineProperty(ViewContainer.prototype.remove, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype.detach, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype._detachInjectors, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype._linkElementInjectors, "parameters", {get: function() {
          return [[], [viewModule.AppView]];
        }});
      Object.defineProperty(ViewContainer.prototype._unlinkElementInjectors, "parameters", {get: function() {
          return [[viewModule.AppView]];
        }});
    }
  };
});
//# sourceMappingURL=view_container.es6.map

//# sourceMappingURL=./view_container.js.map