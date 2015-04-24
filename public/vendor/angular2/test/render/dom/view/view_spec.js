System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/render/dom/view/proto_view", "angular2/src/render/dom/view/element_binder", "angular2/src/render/dom/view/view", "angular2/src/render/dom/view/view_container", "angular2/src/render/dom/shadow_dom/light_dom", "angular2/src/dom/dom_adapter"], function($__export) {
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
      ListWrapper,
      RenderProtoView,
      ElementBinder,
      RenderView,
      ViewContainer,
      LightDom,
      DOM,
      SpyLightDom;
  function main() {
    describe('RenderView', (function() {
      function createProtoView() {
        var binders = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(binders)) {
          binders = [];
        }
        var rootEl = el('<div></div>');
        return new RenderProtoView({
          element: rootEl,
          elementBinders: binders
        });
      }
      function createView() {
        var pv = arguments[0] !== (void 0) ? arguments[0] : null;
        var boundElementCount = arguments[1] !== (void 0) ? arguments[1] : 0;
        if (isBlank(pv)) {
          pv = createProtoView();
        }
        var root = el('<div><div></div></div>');
        var boundElements = [];
        for (var i = 0; i < boundElementCount; i++) {
          ListWrapper.push(boundElements, el('<span></span'));
        }
        return new RenderView(pv, [DOM.childNodes(root)[0]], [], boundElements, []);
      }
      describe('getDirectParentLightDom', (function() {
        it('should return the LightDom of the direct parent', (function() {
          var pv = createProtoView([new ElementBinder(), new ElementBinder({
            parentIndex: 0,
            distanceToParent: 1
          })]);
          var view = createView(pv, 2);
          view.lightDoms[0] = new SpyLightDom();
          view.lightDoms[1] = new SpyLightDom();
          expect(view.getDirectParentLightDom(1)).toBe(view.lightDoms[0]);
        }));
        it('should return null if the direct parent is not bound', (function() {
          var pv = createProtoView([new ElementBinder(), new ElementBinder(), new ElementBinder({
            parentIndex: 0,
            distanceToParent: 2
          })]);
          var view = createView(pv, 3);
          view.lightDoms[0] = new SpyLightDom();
          view.lightDoms[1] = new SpyLightDom();
          view.lightDoms[2] = new SpyLightDom();
          expect(view.getDirectParentLightDom(2)).toBe(null);
        }));
      }));
      describe('getOrCreateViewContainer', (function() {
        it('should create a new container', (function() {
          var pv = createProtoView([new ElementBinder()]);
          var view = createView(pv, 1);
          expect(view.getOrCreateViewContainer(0) instanceof ViewContainer).toBe(true);
        }));
        it('should return an existing container', (function() {
          var pv = createProtoView([new ElementBinder()]);
          var view = createView(pv, 1);
          var vc = view.getOrCreateViewContainer(0);
          expect(view.getOrCreateViewContainer(0)).toBe(vc);
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
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      RenderProtoView = $__m.RenderProtoView;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      RenderView = $__m.RenderView;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
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
//# sourceMappingURL=view_spec.es6.map

//# sourceMappingURL=./view_spec.js.map