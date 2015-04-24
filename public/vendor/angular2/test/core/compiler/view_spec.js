System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_container", "angular2/src/render/api", "angular2/change_detection", "angular2/src/core/compiler/element_binder", "angular2/src/core/compiler/element_injector"], function($__export) {
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
      MapWrapper,
      ListWrapper,
      AppProtoView,
      AppView,
      ViewContainer,
      Renderer,
      ChangeDetector,
      ElementBinder,
      ElementInjector,
      SpyRenderer,
      SpyChangeDetector,
      SpyElementInjector;
  function main() {
    describe('AppView', (function() {
      var renderer;
      beforeEach((function() {
        renderer = new SpyRenderer();
      }));
      function createElementInjector() {
        return new SpyElementInjector();
      }
      function createEmptyElBinder() {
        return new ElementBinder(0, null, 0, null, null, null);
      }
      function createEmbeddedProtoViewElBinder(nestedProtoView) {
        var binder = new ElementBinder(0, null, 0, null, null, null);
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
      function createViewWithOneBoundElement(pv) {
        var view = new AppView(renderer, null, pv, MapWrapper.create());
        var changeDetector = new SpyChangeDetector();
        var eij = createElementInjector();
        view.init(changeDetector, [eij], [eij], [null], [null]);
        return view;
      }
      describe('getOrCreateViewContainer()', (function() {
        it('should create a new container', (function() {
          var pv = createProtoView([createEmptyElBinder()]);
          var view = createViewWithOneBoundElement(pv);
          expect(view.getOrCreateViewContainer(0) instanceof ViewContainer).toBe(true);
        }));
        it('should return an existing container', (function() {
          var pv = createProtoView([createEmptyElBinder()]);
          var view = createViewWithOneBoundElement(pv);
          var vc = view.getOrCreateViewContainer(0);
          expect(view.getOrCreateViewContainer(0)).toBe(vc);
        }));
        it('should store an existing nestedProtoView in the container', (function() {
          var defaultProtoView = createProtoView();
          var pv = createProtoView([createEmbeddedProtoViewElBinder(defaultProtoView)]);
          var view = createViewWithOneBoundElement(pv);
          var vc = view.getOrCreateViewContainer(0);
          expect(vc.defaultProtoView).toBe(defaultProtoView);
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
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
      AppView = $__m.AppView;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      Renderer = $__m.Renderer;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      ElementInjector = $__m.ElementInjector;
    }],
    execute: function() {
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
    }
  };
});
//# sourceMappingURL=view_spec.es6.map

//# sourceMappingURL=./view_spec.js.map