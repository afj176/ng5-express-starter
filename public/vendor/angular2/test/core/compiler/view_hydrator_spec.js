System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/view", "angular2/src/render/api", "angular2/change_detection", "angular2/src/core/compiler/element_binder", "angular2/src/core/compiler/element_injector", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/view_hydrator", "angular2/src/core/compiler/view_factory"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      ddescribe,
      xdescribe,
      describe,
      el,
      dispatchEvent,
      expect,
      iit,
      inject,
      beforeEachBindings,
      it,
      xit,
      SpyObject,
      proxy,
      IMPLEMENTS,
      isBlank,
      isPresent,
      MapWrapper,
      ListWrapper,
      StringMapWrapper,
      AppProtoView,
      AppView,
      Renderer,
      ViewRef,
      ChangeDetector,
      ElementBinder,
      DirectiveBinding,
      ElementInjector,
      ElementRef,
      DirectiveMetadataReader,
      Component,
      AppViewHydrator,
      ViewFactory,
      SomeComponent,
      SpyRenderer,
      SpyChangeDetector,
      SpyElementInjector,
      SpyViewFactory;
  function main() {
    describe('AppViewHydrator', (function() {
      var renderer;
      var reader;
      var hydrator;
      var viewFactory;
      beforeEach((function() {
        renderer = new SpyRenderer();
        reader = new DirectiveMetadataReader();
        viewFactory = new SpyViewFactory();
        hydrator = new AppViewHydrator(renderer, viewFactory);
      }));
      function createDirectiveBinding(type) {
        var meta = reader.read(type);
        return DirectiveBinding.createFromType(meta.type, meta.annotation);
      }
      function createElementInjector(overrides) {
        return SpyObject.stub(new SpyElementInjector(), {
          'isExportingComponent': false,
          'isExportingElement': false,
          'getEventEmitterAccessors': [],
          'getComponent': null
        }, overrides);
      }
      function createEmptyElBinder() {
        return new ElementBinder(0, null, 0, null, null, null);
      }
      function createComponentElBinder(binding) {
        var nestedProtoView = arguments[1] !== (void 0) ? arguments[1] : null;
        var binder = new ElementBinder(0, null, 0, null, binding, null);
        binder.nestedProtoView = nestedProtoView;
        return binder;
      }
      function createProtoView() {
        var binders = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(binders)) {
          binders = [];
        }
        var res = new AppProtoView(null, null);
        res.elementBinders = binders;
        return res;
      }
      function createHostProtoView(nestedProtoView) {
        return createProtoView([createComponentElBinder(createDirectiveBinding(SomeComponent), nestedProtoView)]);
      }
      function createEmptyView() {
        var view = new AppView(renderer, null, createProtoView(), MapWrapper.create());
        var changeDetector = new SpyChangeDetector();
        view.init(changeDetector, [], [], [], []);
        return view;
      }
      function createHostView(pv, shadowView, componentInstance) {
        var elementInjectors = arguments[3] !== (void 0) ? arguments[3] : null;
        var view = new AppView(renderer, null, pv, MapWrapper.create());
        var changeDetector = new SpyChangeDetector();
        var eis;
        if (isPresent(elementInjectors)) {
          eis = elementInjectors;
        } else {
          eis = [createElementInjector({'getComponent': componentInstance})];
        }
        view.init(changeDetector, eis, eis, ListWrapper.createFixedSize(eis.length), [shadowView]);
        return view;
      }
      function hydrate(view) {
        hydrator.hydrateInPlaceHostView(null, null, view, null);
      }
      function dehydrate(view) {
        hydrator.dehydrateInPlaceHostView(null, view);
      }
      describe('hydrateDynamicComponentView', (function() {
        it('should not allow to use non component indices', (function() {
          var pv = createProtoView([createEmptyElBinder()]);
          var view = createHostView(pv, null, null);
          var shadowView = createEmptyView();
          expect((function() {
            return hydrator.hydrateDynamicComponentView(new ElementRef(null, view, 0, null), shadowView, null, null);
          })).toThrowError('There is no dynamic component directive at element 0');
        }));
        it('should not allow to use static component indices', (function() {
          var pv = createHostProtoView(createProtoView());
          var view = createHostView(pv, null, null);
          var shadowView = createEmptyView();
          expect((function() {
            return hydrator.hydrateDynamicComponentView(new ElementRef(null, view, 0, null), shadowView, null, null);
          })).toThrowError('There is no dynamic component directive at element 0');
        }));
        it('should not allow to overwrite an existing component', (function() {
          var pv = createHostProtoView(null);
          var shadowView = createEmptyView();
          var view = createHostView(pv, null, null);
          renderer.spy('createDynamicComponentView').andReturn([new ViewRef(), new ViewRef()]);
          var elRef = new ElementRef(null, view, 0, null);
          hydrator.hydrateDynamicComponentView(elRef, shadowView, createDirectiveBinding(SomeComponent), null);
          expect((function() {
            return hydrator.hydrateDynamicComponentView(elRef, shadowView, null, null);
          })).toThrowError('There already is a bound component at element 0');
        }));
      }));
      describe('hydrate... shared functionality', (function() {
        it('should hydrate existing child components', (function() {
          var hostPv = createHostProtoView(createProtoView());
          var componentInstance = new Object();
          var shadowView = createEmptyView();
          var hostView = createHostView(hostPv, shadowView, componentInstance);
          renderer.spy('createInPlaceHostView').andCallFake((function(a, b, c) {
            return [new ViewRef(), new ViewRef()];
          }));
          hydrate(hostView);
          expect(shadowView.hydrated()).toBe(true);
        }));
        it("should set up event listeners", (function() {
          var dir = new Object();
          var hostPv = createProtoView([createComponentElBinder(createDirectiveBinding(SomeComponent)), createEmptyElBinder()]);
          var spyEventAccessor1 = SpyObject.stub({"subscribe": null});
          var ei1 = createElementInjector({
            'getEventEmitterAccessors': [[spyEventAccessor1]],
            'getDirectiveAtIndex': dir
          });
          var spyEventAccessor2 = SpyObject.stub({"subscribe": null});
          var ei2 = createElementInjector({
            'getEventEmitterAccessors': [[spyEventAccessor2]],
            'getDirectiveAtIndex': dir
          });
          var shadowView = createEmptyView();
          var hostView = createHostView(hostPv, shadowView, null, [ei1, ei2]);
          renderer.spy('createInPlaceHostView').andReturn([new ViewRef(), new ViewRef()]);
          hydrate(hostView);
          expect(spyEventAccessor1.spy('subscribe')).toHaveBeenCalledWith(hostView, 0, dir);
          expect(spyEventAccessor2.spy('subscribe')).toHaveBeenCalledWith(hostView, 1, dir);
        }));
      }));
      describe('dehydrate... shared functionality', (function() {
        var hostView;
        var shadowView;
        function createAndHydrate(nestedProtoView) {
          var componentInstance = new Object();
          shadowView = createEmptyView();
          var hostPv = createHostProtoView(nestedProtoView);
          hostView = createHostView(hostPv, shadowView, componentInstance);
          renderer.spy('createInPlaceHostView').andReturn([new ViewRef(), new ViewRef()]);
          hydrate(hostView);
        }
        it('should dehydrate child components', (function() {
          createAndHydrate(createProtoView());
          dehydrate(hostView);
          expect(shadowView.hydrated()).toBe(false);
        }));
        it('should not clear static child components', (function() {
          createAndHydrate(createProtoView());
          dehydrate(hostView);
          expect(hostView.componentChildViews[0]).toBe(shadowView);
          expect(hostView.changeDetector.spy('removeShadowDomChild')).not.toHaveBeenCalled();
          expect(viewFactory.spy('returnView')).not.toHaveBeenCalled();
        }));
        it('should clear dynamic child components', (function() {
          createAndHydrate(null);
          dehydrate(hostView);
          expect(hostView.componentChildViews[0]).toBe(null);
          expect(hostView.changeDetector.spy('removeShadowDomChild')).toHaveBeenCalledWith(shadowView.changeDetector);
          expect(viewFactory.spy('returnView')).toHaveBeenCalledWith(shadowView);
        }));
        it('should clear imperatively added child components', (function() {
          createAndHydrate(createProtoView());
          var impHostView = createHostView(createHostProtoView(createProtoView()), createEmptyView(), null);
          shadowView.imperativeHostViews = [impHostView];
          dehydrate(hostView);
          expect(shadowView.imperativeHostViews).toEqual([]);
          expect(viewFactory.spy('returnView')).toHaveBeenCalledWith(impHostView);
          expect(shadowView.changeDetector.spy('removeChild')).toHaveBeenCalledWith(impHostView.changeDetector);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      xdescribe = $__m.xdescribe;
      describe = $__m.describe;
      el = $__m.el;
      dispatchEvent = $__m.dispatchEvent;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      beforeEachBindings = $__m.beforeEachBindings;
      it = $__m.it;
      xit = $__m.xit;
      SpyObject = $__m.SpyObject;
      proxy = $__m.proxy;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
      AppView = $__m.AppView;
    }, function($__m) {
      Renderer = $__m.Renderer;
      ViewRef = $__m.ViewRef;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      DirectiveBinding = $__m.DirectiveBinding;
      ElementInjector = $__m.ElementInjector;
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      AppViewHydrator = $__m.AppViewHydrator;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
    }],
    execute: function() {
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      Object.defineProperty(SomeComponent, "annotations", {get: function() {
          return [new Component({selector: 'someComponent'})];
        }});
      SpyRenderer = (function($__super) {
        var SpyRenderer = function SpyRenderer() {
          $traceurRuntime.superConstructor(SpyRenderer).call(this, Renderer);
        };
        return ($traceurRuntime.createClass)(SpyRenderer, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyRenderer.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyRenderer, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(Renderer)];
        }});
      SpyChangeDetector = (function($__super) {
        var SpyChangeDetector = function SpyChangeDetector() {
          $traceurRuntime.superConstructor(SpyChangeDetector).call(this, ChangeDetector);
        };
        return ($traceurRuntime.createClass)(SpyChangeDetector, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyChangeDetector.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyChangeDetector, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ChangeDetector)];
        }});
      SpyElementInjector = (function($__super) {
        var SpyElementInjector = function SpyElementInjector() {
          $traceurRuntime.superConstructor(SpyElementInjector).call(this, ElementInjector);
        };
        return ($traceurRuntime.createClass)(SpyElementInjector, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyElementInjector.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyElementInjector, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ElementInjector)];
        }});
      SpyViewFactory = (function($__super) {
        var SpyViewFactory = function SpyViewFactory() {
          $traceurRuntime.superConstructor(SpyViewFactory).call(this, ViewFactory);
        };
        return ($traceurRuntime.createClass)(SpyViewFactory, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyViewFactory.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyViewFactory, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ViewFactory)];
        }});
    }
  };
});
//# sourceMappingURL=view_hydrator_spec.es6.map

//# sourceMappingURL=./view_hydrator_spec.js.map