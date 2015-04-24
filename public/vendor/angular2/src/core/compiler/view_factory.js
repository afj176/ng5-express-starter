System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/collection", "./element_injector", "angular2/src/facade/lang", "angular2/src/core/compiler/ng_element", "./view", "angular2/src/render/api"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      Inject,
      OpaqueToken,
      ListWrapper,
      MapWrapper,
      Map,
      StringMapWrapper,
      List,
      eli,
      isPresent,
      isBlank,
      BaseException,
      NgElement,
      viewModule,
      Renderer,
      VIEW_POOL_CAPACITY,
      ViewFactory;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
      Inject = $__m.Inject;
      OpaqueToken = $__m.OpaqueToken;
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
      NgElement = $__m.NgElement;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      Renderer = $__m.Renderer;
    }],
    execute: function() {
      VIEW_POOL_CAPACITY = $__export("VIEW_POOL_CAPACITY", 'ViewFactory.viewPoolCapacity');
      ViewFactory = $__export("ViewFactory", (function() {
        var ViewFactory = function ViewFactory(poolCapacityPerProtoView, renderer) {
          assert.argumentTypes(poolCapacityPerProtoView, assert.type.any, renderer, Renderer);
          this._poolCapacityPerProtoView = poolCapacityPerProtoView;
          this._pooledViewsPerProtoView = MapWrapper.create();
          this._renderer = renderer;
        };
        return ($traceurRuntime.createClass)(ViewFactory, {
          getView: function(protoView) {
            assert.argumentTypes(protoView, viewModule.AppProtoView);
            var pooledViews = MapWrapper.get(this._pooledViewsPerProtoView, protoView);
            if (isPresent(pooledViews) && pooledViews.length > 0) {
              return assert.returnType((ListWrapper.removeLast(pooledViews)), viewModule.AppView);
            }
            return assert.returnType((this._createView(protoView)), viewModule.AppView);
          },
          returnView: function(view) {
            assert.argumentTypes(view, viewModule.AppView);
            if (view.hydrated()) {
              throw new BaseException('Only dehydrated Views can be put back into the pool!');
            }
            var protoView = view.proto;
            var pooledViews = MapWrapper.get(this._pooledViewsPerProtoView, protoView);
            if (isBlank(pooledViews)) {
              pooledViews = [];
              MapWrapper.set(this._pooledViewsPerProtoView, protoView, pooledViews);
            }
            if (pooledViews.length < this._poolCapacityPerProtoView) {
              ListWrapper.push(pooledViews, view);
            }
          },
          _createView: function(protoView) {
            assert.argumentTypes(protoView, viewModule.AppProtoView);
            var view = new viewModule.AppView(this._renderer, this, protoView, protoView.protoLocals);
            var changeDetector = protoView.protoChangeDetector.instantiate(view, protoView.bindings, protoView.getVariableBindings(), protoView.getdirectiveRecords());
            var binders = protoView.elementBinders;
            var elementInjectors = ListWrapper.createFixedSize(binders.length);
            var rootElementInjectors = [];
            var preBuiltObjects = ListWrapper.createFixedSize(binders.length);
            var componentChildViews = ListWrapper.createFixedSize(binders.length);
            for (var binderIdx = 0; binderIdx < binders.length; binderIdx++) {
              var binder = binders[binderIdx];
              var elementInjector = null;
              var protoElementInjector = binder.protoElementInjector;
              if (isPresent(protoElementInjector)) {
                if (isPresent(protoElementInjector.parent)) {
                  var parentElementInjector = elementInjectors[protoElementInjector.parent.index];
                  elementInjector = protoElementInjector.instantiate(parentElementInjector);
                } else {
                  elementInjector = protoElementInjector.instantiate(null);
                  ListWrapper.push(rootElementInjectors, elementInjector);
                }
              }
              elementInjectors[binderIdx] = elementInjector;
              var childChangeDetector = null;
              if (binder.hasStaticComponent()) {
                var childView = this._createView(binder.nestedProtoView);
                childChangeDetector = childView.changeDetector;
                changeDetector.addShadowDomChild(childChangeDetector);
                componentChildViews[binderIdx] = childView;
              }
              if (isPresent(elementInjector)) {
                preBuiltObjects[binderIdx] = new eli.PreBuiltObjects(view, new NgElement(view, binderIdx), childChangeDetector);
              }
            }
            view.init(changeDetector, elementInjectors, rootElementInjectors, preBuiltObjects, componentChildViews);
            return assert.returnType((view), viewModule.AppView);
          }
        }, {});
      }()));
      Object.defineProperty(ViewFactory, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(ViewFactory, "parameters", {get: function() {
          return [[new Inject(VIEW_POOL_CAPACITY)], [Renderer]];
        }});
      Object.defineProperty(ViewFactory.prototype.getView, "parameters", {get: function() {
          return [[viewModule.AppProtoView]];
        }});
      Object.defineProperty(ViewFactory.prototype.returnView, "parameters", {get: function() {
          return [[viewModule.AppView]];
        }});
      Object.defineProperty(ViewFactory.prototype._createView, "parameters", {get: function() {
          return [[viewModule.AppProtoView]];
        }});
    }
  };
});
//# sourceMappingURL=view_factory.es6.map

//# sourceMappingURL=./view_factory.js.map