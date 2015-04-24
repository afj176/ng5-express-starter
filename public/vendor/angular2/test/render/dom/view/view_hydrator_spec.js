System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/render/dom/view/proto_view", "angular2/src/render/dom/view/element_binder", "angular2/src/render/dom/view/view", "angular2/src/render/dom/shadow_dom/shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/light_dom", "angular2/src/render/dom/events/event_manager", "angular2/src/dom/dom_adapter", "angular2/src/render/dom/view/view_factory", "angular2/src/render/dom/view/view_hydrator"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
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
      RenderProtoView,
      ElementBinder,
      RenderView,
      ShadowDomStrategy,
      LightDom,
      EventManager,
      DOM,
      ViewFactory,
      RenderViewHydrator,
      SpyEventManager,
      SpyShadowDomStrategy,
      SpyLightDom,
      SpyViewFactory;
  function main() {
    describe('RenderViewHydrator', (function() {
      var shadowDomStrategy;
      var eventManager;
      var viewFactory;
      var viewHydrator;
      function createProtoView() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            rootEl = $__1.rootEl,
            binders = $__1.binders;
        if (isBlank(rootEl)) {
          rootEl = el('<div></div>');
        }
        if (isBlank(binders)) {
          binders = [];
        }
        return new RenderProtoView({
          element: rootEl,
          elementBinders: binders
        });
      }
      function createComponentElBinder(componentId) {
        var nestedProtoView = arguments[1] !== (void 0) ? arguments[1] : null;
        var binder = new ElementBinder({
          componentId: componentId,
          textNodeIndices: []
        });
        binder.nestedProtoView = nestedProtoView;
        return binder;
      }
      function createHostProtoView(nestedProtoView) {
        return createProtoView({binders: [createComponentElBinder('someComponent', nestedProtoView)]});
      }
      function createEmptyView() {
        var root = el('<div><div></div></div>');
        return new RenderView(createProtoView(), [DOM.childNodes(root)[0]], [], [], []);
      }
      function createHostView(pv, shadowDomView) {
        var view = new RenderView(pv, [el('<div></div>')], [], [el('<div></div>')], [null]);
        ViewFactory.setComponentView(shadowDomStrategy, view, 0, shadowDomView);
        return view;
      }
      function hydrate(view) {
        viewHydrator.hydrateInPlaceHostView(null, view);
      }
      function dehydrate(view) {
        viewHydrator.dehydrateInPlaceHostView(null, view);
      }
      beforeEach((function() {
        eventManager = new SpyEventManager();
        shadowDomStrategy = new SpyShadowDomStrategy();
        shadowDomStrategy.spy('constructLightDom').andCallFake((function(lightDomView, shadowDomView, el) {
          return new SpyLightDom();
        }));
        viewFactory = new SpyViewFactory();
        viewHydrator = new RenderViewHydrator(eventManager, viewFactory, shadowDomStrategy);
      }));
      describe('hydrateDynamicComponentView', (function() {
        it('should redistribute', (function() {
          var shadowView = createEmptyView();
          var hostPv = createHostProtoView(createProtoView());
          var hostView = createHostView(hostPv, shadowView);
          viewHydrator.hydrateDynamicComponentView(hostView, 0, shadowView);
          var lightDomSpy = assert.type(hostView.lightDoms[0], SpyLightDom);
          expect(lightDomSpy.spy('redistribute')).toHaveBeenCalled();
        }));
      }));
      describe('hydrateInPlaceHostView', (function() {
        function createInPlaceHostView() {
          var hostPv = createHostProtoView(createProtoView());
          var shadowView = createEmptyView();
          return createHostView(hostPv, shadowView);
        }
        it('should hydrate the view', (function() {
          var hostView = createInPlaceHostView();
          viewHydrator.hydrateInPlaceHostView(null, hostView);
          expect(hostView.hydrated).toBe(true);
        }));
        it('should store the view in the parent view', (function() {
          var parentView = createEmptyView();
          var hostView = createInPlaceHostView();
          viewHydrator.hydrateInPlaceHostView(parentView, hostView);
          expect(parentView.imperativeHostViews).toEqual([hostView]);
        }));
      }));
      describe('dehydrateInPlaceHostView', (function() {
        function createAndHydrateInPlaceHostView(parentView) {
          var hostPv = createHostProtoView(createProtoView());
          var shadowView = createEmptyView();
          var hostView = createHostView(hostPv, shadowView);
          viewHydrator.hydrateInPlaceHostView(parentView, hostView);
          return hostView;
        }
        it('should clear the host view', (function() {
          var parentView = createEmptyView();
          var hostView = createAndHydrateInPlaceHostView(parentView);
          var rootNodes = hostView.rootNodes;
          expect(rootNodes[0].parentNode).toBeTruthy();
          viewHydrator.dehydrateInPlaceHostView(parentView, hostView);
          expect(parentView.imperativeHostViews).toEqual([]);
          expect(rootNodes[0].parentNode).toBeFalsy();
          expect(hostView.rootNodes).toEqual([]);
        }));
      }));
      describe('hydrate... shared functionality', (function() {
        it('should hydrate existing child components', (function() {
          var hostPv = createHostProtoView(createProtoView());
          var shadowView = createEmptyView();
          createHostView(hostPv, shadowView);
          hydrate(shadowView);
          expect(shadowView.hydrated).toBe(true);
        }));
      }));
      describe('dehydrate... shared functionality', (function() {
        var hostView;
        function createAndHydrate(nestedProtoView, shadowView) {
          var imperativeHostView = arguments[2] !== (void 0) ? arguments[2] : null;
          var hostPv = createHostProtoView(nestedProtoView);
          hostView = createHostView(hostPv, shadowView);
          if (isPresent(imperativeHostView)) {
            viewHydrator.hydrateInPlaceHostView(hostView, imperativeHostView);
          }
          hydrate(hostView);
        }
        it('should dehydrate child components', (function() {
          var shadowView = createEmptyView();
          createAndHydrate(createProtoView(), shadowView);
          expect(shadowView.hydrated).toBe(true);
          dehydrate(hostView);
          expect(shadowView.hydrated).toBe(false);
        }));
        it('should not clear static child components', (function() {
          var shadowView = createEmptyView();
          createAndHydrate(createProtoView(), shadowView);
          dehydrate(hostView);
          expect(hostView.componentChildViews[0]).toBe(shadowView);
          expect(shadowView.rootNodes[0].parentNode).toBeTruthy();
          expect(viewFactory.spy('returnView')).not.toHaveBeenCalled();
        }));
        it('should clear dynamic child components', (function() {
          var shadowView = createEmptyView();
          createAndHydrate(null, shadowView);
          expect(shadowView.rootNodes[0].parentNode).toBeTruthy();
          dehydrate(hostView);
          expect(hostView.componentChildViews[0]).toBe(null);
          expect(shadowView.rootNodes[0].parentNode).toBe(null);
          expect(viewFactory.spy('returnView')).toHaveBeenCalledWith(shadowView);
        }));
        it('should clear imperatively added child components', (function() {
          var shadowView = createEmptyView();
          createAndHydrate(createProtoView(), shadowView);
          var impHostView = createHostView(createHostProtoView(createProtoView()), createEmptyView());
          shadowView.imperativeHostViews = [impHostView];
          var rootNodes = impHostView.rootNodes;
          expect(rootNodes[0].parentNode).toBeTruthy();
          dehydrate(hostView);
          expect(shadowView.imperativeHostViews).toEqual([]);
          expect(impHostView.rootNodes).toEqual([]);
          expect(rootNodes[0].parentNode).toBeFalsy();
          expect(viewFactory.spy('returnView')).toHaveBeenCalledWith(impHostView);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
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
      RenderProtoView = $__m.RenderProtoView;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      RenderView = $__m.RenderView;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      EventManager = $__m.EventManager;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
    }, function($__m) {
      RenderViewHydrator = $__m.RenderViewHydrator;
    }],
    execute: function() {
      SpyEventManager = (function($__super) {
        var SpyEventManager = function SpyEventManager() {
          $traceurRuntime.superConstructor(SpyEventManager).call(this, EventManager);
        };
        return ($traceurRuntime.createClass)(SpyEventManager, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyEventManager.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyEventManager, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(EventManager)];
        }});
      SpyShadowDomStrategy = (function($__super) {
        var SpyShadowDomStrategy = function SpyShadowDomStrategy() {
          $traceurRuntime.superConstructor(SpyShadowDomStrategy).call(this, ShadowDomStrategy);
        };
        return ($traceurRuntime.createClass)(SpyShadowDomStrategy, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyShadowDomStrategy.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyShadowDomStrategy, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ShadowDomStrategy)];
        }});
      SpyLightDom = (function($__super) {
        var SpyLightDom = function SpyLightDom() {
          $traceurRuntime.superConstructor(SpyLightDom).call(this, LightDom);
        };
        return ($traceurRuntime.createClass)(SpyLightDom, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyLightDom.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyLightDom, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(LightDom)];
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