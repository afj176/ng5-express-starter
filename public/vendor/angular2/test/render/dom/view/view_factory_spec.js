System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/render/dom/view/view_factory", "angular2/src/render/dom/view/proto_view", "angular2/src/render/dom/view/view", "angular2/src/render/dom/view/element_binder", "angular2/src/render/dom/shadow_dom/shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/light_dom", "angular2/src/render/dom/events/event_manager"], function($__export) {
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
      ListWrapper,
      ViewFactory,
      RenderProtoView,
      RenderView,
      ElementBinder,
      ShadowDomStrategy,
      LightDom,
      EventManager,
      SpyEventManager,
      SpyShadowDomStrategy,
      SpyLightDom;
  function main() {
    describe('RenderViewFactory', (function() {
      var eventManager;
      var shadowDomStrategy;
      function createViewFactory($__1) {
        var capacity = $__1.capacity;
        return assert.returnType((new ViewFactory(capacity, eventManager, shadowDomStrategy)), ViewFactory);
      }
      function createProtoView() {
        var rootEl = arguments[0] !== (void 0) ? arguments[0] : null;
        var binders = arguments[1] !== (void 0) ? arguments[1] : null;
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
      beforeEach((function() {
        eventManager = new SpyEventManager();
        shadowDomStrategy = new SpyShadowDomStrategy();
      }));
      it('should create views without cache', (function() {
        var pv = createProtoView();
        var vf = createViewFactory({capacity: 0});
        expect(vf.getView(pv) instanceof RenderView).toBe(true);
      }));
      describe('caching', (function() {
        it('should support multiple RenderProtoViews', (function() {
          var pv1 = createProtoView();
          var pv2 = createProtoView();
          var vf = createViewFactory({capacity: 2});
          var view1 = vf.getView(pv1);
          var view2 = vf.getView(pv2);
          vf.returnView(view1);
          vf.returnView(view2);
          expect(vf.getView(pv1)).toBe(view1);
          expect(vf.getView(pv2)).toBe(view2);
        }));
        it('should reuse the newest view that has been returned', (function() {
          var pv = createProtoView();
          var vf = createViewFactory({capacity: 2});
          var view1 = vf.getView(pv);
          var view2 = vf.getView(pv);
          vf.returnView(view1);
          vf.returnView(view2);
          expect(vf.getView(pv)).toBe(view2);
        }));
        it('should not add views when the capacity has been reached', (function() {
          var pv = createProtoView();
          var vf = createViewFactory({capacity: 2});
          var view1 = vf.getView(pv);
          var view2 = vf.getView(pv);
          var view3 = vf.getView(pv);
          vf.returnView(view1);
          vf.returnView(view2);
          vf.returnView(view3);
          expect(vf.getView(pv)).toBe(view2);
          expect(vf.getView(pv)).toBe(view1);
        }));
      }));
      describe('child components', (function() {
        var vf,
            log;
        beforeEach((function() {
          vf = createViewFactory({capacity: 1});
          log = [];
          shadowDomStrategy.spy('attachTemplate').andCallFake((function(el, view) {
            ListWrapper.push(log, ['attachTemplate', el, view]);
          }));
          shadowDomStrategy.spy('constructLightDom').andCallFake((function(lightDomView, shadowDomView, el) {
            ListWrapper.push(log, ['constructLightDom', lightDomView, shadowDomView, el]);
            return new SpyLightDom();
          }));
        }));
        it('should create static child component views', (function() {
          var hostPv = createProtoView(el('<div><div class="ng-binding"></div></div>'), [createComponentElBinder('someComponent', createProtoView())]);
          var hostView = vf.getView(hostPv);
          var shadowView = hostView.componentChildViews[0];
          expect(shadowView).toBeTruthy();
          expect(hostView.lightDoms[0]).toBeTruthy();
          expect(log[0]).toEqual(['constructLightDom', hostView, shadowView, hostView.boundElements[0]]);
          expect(log[1]).toEqual(['attachTemplate', hostView.boundElements[0], shadowView]);
        }));
        it('should not create dynamic child component views', (function() {
          var hostPv = createProtoView(el('<div><div class="ng-binding"></div></div>'), [createComponentElBinder('someComponent', null)]);
          var hostView = vf.getView(hostPv);
          var shadowView = hostView.componentChildViews[0];
          expect(shadowView).toBeFalsy();
          expect(hostView.lightDoms[0]).toBeFalsy();
          expect(log).toEqual([]);
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
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
    }, function($__m) {
      RenderProtoView = $__m.RenderProtoView;
    }, function($__m) {
      RenderView = $__m.RenderView;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      EventManager = $__m.EventManager;
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
    }
  };
});
//# sourceMappingURL=view_factory_spec.es6.map

//# sourceMappingURL=./view_factory_spec.js.map