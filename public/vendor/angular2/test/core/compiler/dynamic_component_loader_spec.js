System.register(["angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/dynamic_component_loader", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/element_injector", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_factory", "angular2/src/core/compiler/view_hydrator"], function($__export) {
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
      MapWrapper,
      ListWrapper,
      Promise,
      PromiseWrapper,
      DirectiveMetadataReader,
      DynamicComponentLoader,
      Decorator,
      Viewport,
      Component,
      ElementRef,
      ElementInjector,
      ProtoElementInjector,
      PreBuiltObjects,
      Compiler,
      AppProtoView,
      AppView,
      ViewFactory,
      AppViewHydrator,
      SomeDecorator,
      SomeViewport,
      SomeComponent,
      SpyCompiler,
      SpyViewFactory,
      SpyAppViewHydrator,
      SpyAppView;
  function main() {
    describe("DynamicComponentLoader", (function() {
      var compiler;
      var viewFactory;
      var directiveMetadataReader;
      var viewHydrator;
      var loader;
      beforeEach((function() {
        compiler = new SpyCompiler();
        viewFactory = new SpyViewFactory();
        viewHydrator = new SpyAppViewHydrator();
        directiveMetadataReader = new DirectiveMetadataReader();
        loader = new DynamicComponentLoader(compiler, directiveMetadataReader, viewFactory, viewHydrator);
      }));
      function createProtoView() {
        return new AppProtoView(null, null);
      }
      function createEmptyView() {
        var view = new AppView(null, null, null, createProtoView(), MapWrapper.create());
        view.init(null, [], [], [], []);
        return view;
      }
      function createElementRef(view, boundElementIndex) {
        var peli = new ProtoElementInjector(null, boundElementIndex, []);
        var eli = new ElementInjector(peli, null);
        var preBuiltObjects = new PreBuiltObjects(view, null, null);
        eli.instantiateDirectives(null, null, null, preBuiltObjects);
        return new ElementRef(eli);
      }
      describe("loadIntoExistingLocation", (function() {
        describe('Load errors', (function() {
          it('should throw when trying to load a decorator', (function() {
            expect((function() {
              return loader.loadIntoExistingLocation(SomeDecorator, null);
            })).toThrowError("Could not load 'SomeDecorator' because it is not a component.");
          }));
          it('should throw when trying to load a viewport', (function() {
            expect((function() {
              return loader.loadIntoExistingLocation(SomeViewport, null);
            })).toThrowError("Could not load 'SomeViewport' because it is not a component.");
          }));
        }));
        it('should compile, create and hydrate the view', inject([AsyncTestCompleter], (function(async) {
          var log = [];
          var protoView = createProtoView();
          var hostView = createEmptyView();
          var childView = createEmptyView();
          viewHydrator.spy('hydrateDynamicComponentView').andCallFake((function(hostView, boundElementIndex, componentView, componentDirective, injector) {
            ListWrapper.push(log, ['hydrateDynamicComponentView', hostView, boundElementIndex, componentView]);
          }));
          viewFactory.spy('getView').andCallFake((function(protoView) {
            ListWrapper.push(log, ['getView', protoView]);
            return childView;
          }));
          compiler.spy('compile').andCallFake((function(_) {
            return PromiseWrapper.resolve(protoView);
          }));
          var elementRef = createElementRef(hostView, 23);
          loader.loadIntoExistingLocation(SomeComponent, elementRef).then((function(componentRef) {
            expect(log[0]).toEqual(['getView', protoView]);
            expect(log[1]).toEqual(['hydrateDynamicComponentView', hostView, 23, childView]);
            async.done();
          }));
        })));
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
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Viewport = $__m.Viewport;
      Component = $__m.Component;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
      ElementInjector = $__m.ElementInjector;
      ProtoElementInjector = $__m.ProtoElementInjector;
      PreBuiltObjects = $__m.PreBuiltObjects;
    }, function($__m) {
      Compiler = $__m.Compiler;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
      AppView = $__m.AppView;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
    }, function($__m) {
      AppViewHydrator = $__m.AppViewHydrator;
    }],
    execute: function() {
      SomeDecorator = (function() {
        var SomeDecorator = function SomeDecorator() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeDecorator, {}, {});
      }());
      Object.defineProperty(SomeDecorator, "annotations", {get: function() {
          return [new Decorator({selector: 'someDecorator'})];
        }});
      SomeViewport = (function() {
        var SomeViewport = function SomeViewport() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeViewport, {}, {});
      }());
      Object.defineProperty(SomeViewport, "annotations", {get: function() {
          return [new Viewport({selector: 'someViewport'})];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      Object.defineProperty(SomeComponent, "annotations", {get: function() {
          return [new Component({selector: 'someComponent'})];
        }});
      SpyCompiler = (function($__super) {
        var SpyCompiler = function SpyCompiler() {
          $traceurRuntime.superConstructor(SpyCompiler).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(SpyCompiler, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyCompiler.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyCompiler, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(Compiler)];
        }});
      SpyViewFactory = (function($__super) {
        var SpyViewFactory = function SpyViewFactory() {
          $traceurRuntime.superConstructor(SpyViewFactory).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(SpyViewFactory, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyViewFactory.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyViewFactory, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ViewFactory)];
        }});
      SpyAppViewHydrator = (function($__super) {
        var SpyAppViewHydrator = function SpyAppViewHydrator() {
          $traceurRuntime.superConstructor(SpyAppViewHydrator).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(SpyAppViewHydrator, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyAppViewHydrator.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyAppViewHydrator, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(AppViewHydrator)];
        }});
      SpyAppView = (function($__super) {
        var SpyAppView = function SpyAppView() {
          $traceurRuntime.superConstructor(SpyAppView).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(SpyAppView, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, SpyAppView.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(SpyAppView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(AppView)];
        }});
    }
  };
});
//# sourceMappingURL=dynamic_component_loader_spec.es6.map

//# sourceMappingURL=./dynamic_component_loader_spec.js.map