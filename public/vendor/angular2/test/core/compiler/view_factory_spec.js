System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/core/compiler/view_factory", "angular2/src/render/api", "angular2/src/core/compiler/view", "angular2/src/core/compiler/element_injector", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/element_binder", "angular2/change_detection"], function($__export) {
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
      ViewFactory,
      Renderer,
      ViewRef,
      AppProtoView,
      AppView,
      DirectiveBinding,
      ElementInjector,
      DirectiveMetadataReader,
      Component,
      ElementBinder,
      ChangeDetector,
      ProtoChangeDetector,
      SomeComponent,
      SpyRenderer,
      SpyChangeDetector,
      SpyProtoChangeDetector;
  function main() {
    describe('AppViewFactory', (function() {
      var reader;
      var renderer;
      beforeEach((function() {
        renderer = new SpyRenderer();
        reader = new DirectiveMetadataReader();
      }));
      function createViewFactory($__1) {
        var capacity = $__1.capacity;
        return assert.returnType((new ViewFactory(capacity, renderer)), ViewFactory);
      }
      function createProtoChangeDetector() {
        var pcd = new SpyProtoChangeDetector();
        pcd.spy('instantiate').andCallFake((function(dispatcher, bindingRecords, variableBindings, directiveRecords) {
          return new SpyChangeDetector();
        }));
        return pcd;
      }
      function createProtoView() {
        var binders = arguments[0] !== (void 0) ? arguments[0] : null;
        if (isBlank(binders)) {
          binders = [];
        }
        var pv = new AppProtoView(null, createProtoChangeDetector());
        pv.elementBinders = binders;
        return pv;
      }
      function createDirectiveBinding(type) {
        var meta = reader.read(type);
        return DirectiveBinding.createFromType(meta.type, meta.annotation);
      }
      function createComponentElBinder(binding) {
        var nestedProtoView = arguments[1] !== (void 0) ? arguments[1] : null;
        var binder = new ElementBinder(0, null, 0, null, binding, null);
        binder.nestedProtoView = nestedProtoView;
        return binder;
      }
      it('should create views without cache', (function() {
        var pv = createProtoView();
        var vf = createViewFactory({capacity: 0});
        expect(vf.getView(pv) instanceof AppView).toBe(true);
      }));
      describe('caching', (function() {
        it('should support multiple AppProtoViews', (function() {
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
        var vf;
        beforeEach((function() {
          vf = createViewFactory({capacity: 1});
        }));
        it('should create static child component views', (function() {
          var hostPv = createProtoView([createComponentElBinder(createDirectiveBinding(SomeComponent), createProtoView())]);
          var hostView = vf.getView(hostPv);
          var shadowView = hostView.componentChildViews[0];
          expect(shadowView).toBeTruthy();
          expect(hostView.changeDetector.spy('addShadowDomChild')).toHaveBeenCalledWith(shadowView.changeDetector);
        }));
        it('should not create dynamic child component views', (function() {
          var hostPv = createProtoView([createComponentElBinder(createDirectiveBinding(SomeComponent), null)]);
          var hostView = vf.getView(hostPv);
          var shadowView = hostView.componentChildViews[0];
          expect(shadowView).toBeFalsy();
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
      ViewFactory = $__m.ViewFactory;
    }, function($__m) {
      Renderer = $__m.Renderer;
      ViewRef = $__m.ViewRef;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
      AppView = $__m.AppView;
    }, function($__m) {
      DirectiveBinding = $__m.DirectiveBinding;
      ElementInjector = $__m.ElementInjector;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
      ProtoChangeDetector = $__m.ProtoChangeDetector;
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
      SpyProtoChangeDetector = (function($__super) {
        var SpyProtoChangeDetector = function SpyProtoChangeDetector() {
          $traceurRuntime.superConstructor(SpyProtoChangeDetector).call(this, ProtoChangeDetector);
        };
        return ($traceurRuntime.createClass)(SpyProtoChangeDetector, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyProtoChangeDetector.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyProtoChangeDetector, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ProtoChangeDetector)];
        }});
    }
  };
});
//# sourceMappingURL=view_factory_spec.es6.map

//# sourceMappingURL=./view_factory_spec.js.map