System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/view", "angular2/src/core/compiler/element_binder", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/di", "angular2/src/core/annotations/view", "angular2/src/core/compiler/element_injector", "angular2/src/core/compiler/template_resolver", "angular2/src/core/compiler/component_url_mapper", "angular2/src/core/compiler/proto_view_factory", "angular2/src/services/url_resolver", "angular2/src/render/api"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      beforeEach,
      xdescribe,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      IS_DARTIUM,
      it,
      SpyObject,
      proxy,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      StringMapWrapper,
      IMPLEMENTS,
      Type,
      isBlank,
      stringify,
      isPresent,
      PromiseWrapper,
      Promise,
      Compiler,
      CompilerCache,
      AppProtoView,
      ElementBinder,
      DirectiveMetadataReader,
      Component,
      DynamicComponent,
      Viewport,
      Decorator,
      Attribute,
      View,
      DirectiveBinding,
      TemplateResolver,
      ComponentUrlMapper,
      RuntimeComponentUrlMapper,
      ProtoViewFactory,
      UrlResolver,
      renderApi,
      Renderer,
      MainComponent,
      NestedComponent,
      RecursiveComponent,
      SomeDynamicComponentDirective,
      SomeViewportDirective,
      SomeDecoratorDirective,
      IgnoreChildrenDecoratorDirective,
      DirectiveWithEvents,
      DirectiveWithProperties,
      DirectiveWithBind,
      DirectiveWithAttributes,
      SpyRenderer,
      FakeUrlResolver,
      FakeTemplateResolver,
      FakeProtoViewFactory;
  function main() {
    describe('compiler', function() {
      var reader,
          tplResolver,
          renderer,
          protoViewFactory,
          cmpUrlMapper,
          renderCompileRequests;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
        tplResolver = new FakeTemplateResolver();
        cmpUrlMapper = new RuntimeComponentUrlMapper();
        renderer = new SpyRenderer();
      }));
      function createCompiler(renderCompileResults, protoViewFactoryResults) {
        assert.argumentTypes(renderCompileResults, List, protoViewFactoryResults, assert.genericType(List, AppProtoView));
        var urlResolver = new FakeUrlResolver();
        renderCompileRequests = [];
        renderer.spy('compile').andCallFake((function(template) {
          ListWrapper.push(renderCompileRequests, template);
          return PromiseWrapper.resolve(ListWrapper.removeAt(renderCompileResults, 0));
        }));
        protoViewFactory = new FakeProtoViewFactory(protoViewFactoryResults);
        return new Compiler(reader, new CompilerCache(), tplResolver, cmpUrlMapper, urlResolver, renderer, protoViewFactory);
      }
      Object.defineProperty(createCompiler, "parameters", {get: function() {
          return [[List], [assert.genericType(List, AppProtoView)]];
        }});
      describe('serialize template', (function() {
        function captureTemplate(template) {
          assert.argumentTypes(template, View);
          tplResolver.setView(MainComponent, template);
          var compiler = createCompiler([createRenderProtoView()], [createProtoView()]);
          return assert.returnType((compiler.compile(MainComponent).then((function(protoView) {
            expect(renderCompileRequests.length).toBe(1);
            return renderCompileRequests[0];
          }))), assert.genericType(Promise, renderApi.ViewDefinition));
        }
        Object.defineProperty(captureTemplate, "parameters", {get: function() {
            return [[View]];
          }});
        function captureDirective(directive) {
          return assert.returnType((captureTemplate(new View({
            template: '<div></div>',
            directives: [directive]
          })).then((function(renderTpl) {
            expect(renderTpl.directives.length).toBe(1);
            return renderTpl.directives[0];
          }))), assert.genericType(Promise, renderApi.DirectiveMetadata));
        }
        it('should fill the componentId', inject([AsyncTestCompleter], (function(async) {
          captureTemplate(new View({template: '<div></div>'})).then((function(renderTpl) {
            expect(renderTpl.componentId).toEqual(stringify(MainComponent));
            async.done();
          }));
        })));
        it('should fill inline template', inject([AsyncTestCompleter], (function(async) {
          captureTemplate(new View({template: '<div></div>'})).then((function(renderTpl) {
            expect(renderTpl.template).toEqual('<div></div>');
            async.done();
          }));
        })));
        it('should fill absUrl given inline templates', inject([AsyncTestCompleter], (function(async) {
          cmpUrlMapper.setComponentUrl(MainComponent, '/mainComponent');
          captureTemplate(new View({template: '<div></div>'})).then((function(renderTpl) {
            expect(renderTpl.absUrl).toEqual('http://www.app.com/mainComponent');
            async.done();
          }));
        })));
        it('should fill absUrl given url template', inject([AsyncTestCompleter], (function(async) {
          cmpUrlMapper.setComponentUrl(MainComponent, '/mainComponent');
          captureTemplate(new View({templateUrl: '/someTemplate'})).then((function(renderTpl) {
            expect(renderTpl.absUrl).toEqual('http://www.app.com/mainComponent/someTemplate');
            async.done();
          }));
        })));
        it('should fill directive.id', inject([AsyncTestCompleter], (function(async) {
          captureDirective(MainComponent).then((function(renderDir) {
            expect(renderDir.id).toEqual(stringify(MainComponent));
            async.done();
          }));
        })));
        it('should fill directive.selector', inject([AsyncTestCompleter], (function(async) {
          captureDirective(MainComponent).then((function(renderDir) {
            expect(renderDir.selector).toEqual('main-comp');
            async.done();
          }));
        })));
        it('should fill directive.type for components', inject([AsyncTestCompleter], (function(async) {
          captureDirective(MainComponent).then((function(renderDir) {
            expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.COMPONENT_TYPE);
            async.done();
          }));
        })));
        it('should fill directive.type for dynamic components', inject([AsyncTestCompleter], (function(async) {
          captureDirective(SomeDynamicComponentDirective).then((function(renderDir) {
            expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.COMPONENT_TYPE);
            async.done();
          }));
        })));
        it('should fill directive.type for viewport directives', inject([AsyncTestCompleter], (function(async) {
          captureDirective(SomeViewportDirective).then((function(renderDir) {
            expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.VIEWPORT_TYPE);
            async.done();
          }));
        })));
        it('should fill directive.type for decorator directives', inject([AsyncTestCompleter], (function(async) {
          captureDirective(SomeDecoratorDirective).then((function(renderDir) {
            expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.DECORATOR_TYPE);
            async.done();
          }));
        })));
        it('should set directive.compileChildren to false for other directives', inject([AsyncTestCompleter], (function(async) {
          captureDirective(MainComponent).then((function(renderDir) {
            expect(renderDir.compileChildren).toEqual(true);
            async.done();
          }));
        })));
        it('should set directive.compileChildren to true for decorator directives', inject([AsyncTestCompleter], (function(async) {
          captureDirective(SomeDecoratorDirective).then((function(renderDir) {
            expect(renderDir.compileChildren).toEqual(true);
            async.done();
          }));
        })));
        it('should set directive.compileChildren to false for decorator directives', inject([AsyncTestCompleter], (function(async) {
          captureDirective(IgnoreChildrenDecoratorDirective).then((function(renderDir) {
            expect(renderDir.compileChildren).toEqual(false);
            async.done();
          }));
        })));
        it('should set directive.hostListeners', inject([AsyncTestCompleter], (function(async) {
          captureDirective(DirectiveWithEvents).then((function(renderDir) {
            expect(renderDir.hostListeners).toEqual(MapWrapper.createFromStringMap({'someEvent': 'someAction'}));
            async.done();
          }));
        })));
        it('should set directive.hostProperties', inject([AsyncTestCompleter], (function(async) {
          captureDirective(DirectiveWithProperties).then((function(renderDir) {
            expect(renderDir.hostProperties).toEqual(MapWrapper.createFromStringMap({'someField': 'someProp'}));
            async.done();
          }));
        })));
        it('should set directive.bind', inject([AsyncTestCompleter], (function(async) {
          captureDirective(DirectiveWithBind).then((function(renderDir) {
            expect(renderDir.properties).toEqual(MapWrapper.createFromStringMap({'a': 'b'}));
            async.done();
          }));
        })));
        it('should read @Attribute', inject([AsyncTestCompleter], (function(async) {
          captureDirective(DirectiveWithAttributes).then((function(renderDir) {
            expect(renderDir.readAttributes).toEqual(['someAttr']);
            async.done();
          }));
        })));
      }));
      describe('call ProtoViewFactory', (function() {
        it('should pass the render protoView', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
          var renderProtoView = createRenderProtoView();
          var expectedProtoView = createProtoView();
          var compiler = createCompiler([renderProtoView], [expectedProtoView]);
          compiler.compile(MainComponent).then((function(protoView) {
            var request = protoViewFactory.requests[0];
            expect(request[1]).toBe(renderProtoView);
            async.done();
          }));
        })));
        it('should pass the component binding', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
          var compiler = createCompiler([createRenderProtoView()], [createProtoView()]);
          compiler.compile(MainComponent).then((function(protoView) {
            var request = protoViewFactory.requests[0];
            expect(request[0].key.token).toBe(MainComponent);
            async.done();
          }));
        })));
        it('should pass the directive bindings', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setView(MainComponent, new View({
            template: '<div></div>',
            directives: [SomeDecoratorDirective]
          }));
          var compiler = createCompiler([createRenderProtoView()], [createProtoView()]);
          compiler.compile(MainComponent).then((function(protoView) {
            var request = protoViewFactory.requests[0];
            var binding = request[2][0];
            expect(binding.key.token).toBe(SomeDecoratorDirective);
            async.done();
          }));
        })));
        it('should use the protoView of the ProtoViewFactory', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
          var renderProtoView = createRenderProtoView();
          var expectedProtoView = createProtoView();
          var compiler = createCompiler([renderProtoView], [expectedProtoView]);
          compiler.compile(MainComponent).then((function(protoView) {
            expect(protoView).toBe(expectedProtoView);
            async.done();
          }));
        })));
      }));
      it('should load nested components', inject([AsyncTestCompleter], (function(async) {
        tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
        tplResolver.setView(NestedComponent, new View({template: '<div></div>'}));
        var mainProtoView = createProtoView([createComponentElementBinder(reader, NestedComponent)]);
        var nestedProtoView = createProtoView();
        var compiler = createCompiler([createRenderProtoView([createRenderComponentElementBinder(0)]), createRenderProtoView()], [mainProtoView, nestedProtoView]);
        compiler.compile(MainComponent).then((function(protoView) {
          expect(protoView).toBe(mainProtoView);
          expect(mainProtoView.elementBinders[0].nestedProtoView).toBe(nestedProtoView);
          expect(nestedProtoView.parentProtoView).toBe(null);
          async.done();
        }));
      })));
      it('should load nested components in viewport', inject([AsyncTestCompleter], (function(async) {
        tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
        tplResolver.setView(NestedComponent, new View({template: '<div></div>'}));
        var mainProtoView = createProtoView([createViewportElementBinder(null)]);
        var viewportProtoView = createProtoView([createComponentElementBinder(reader, NestedComponent)]);
        var nestedProtoView = createProtoView();
        var compiler = createCompiler([createRenderProtoView([createRenderViewportElementBinder(createRenderProtoView([createRenderComponentElementBinder(0)]))]), createRenderProtoView()], [mainProtoView, viewportProtoView, nestedProtoView]);
        compiler.compile(MainComponent).then((function(protoView) {
          expect(protoView).toBe(mainProtoView);
          expect(mainProtoView.elementBinders[0].nestedProtoView).toBe(viewportProtoView);
          expect(viewportProtoView.parentProtoView).toBe(mainProtoView);
          expect(viewportProtoView.elementBinders[0].nestedProtoView).toBe(nestedProtoView);
          expect(nestedProtoView.parentProtoView).toBe(null);
          async.done();
        }));
      })));
      it('should cache compiled components', inject([AsyncTestCompleter], (function(async) {
        tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
        var renderProtoView = createRenderProtoView();
        var expectedProtoView = createProtoView();
        var compiler = createCompiler([renderProtoView], [expectedProtoView]);
        compiler.compile(MainComponent).then((function(protoView) {
          expect(protoView).toBe(expectedProtoView);
          return compiler.compile(MainComponent);
        })).then((function(protoView) {
          expect(protoView).toBe(expectedProtoView);
          async.done();
        }));
      })));
      it('should re-use components being compiled', inject([AsyncTestCompleter], (function(async) {
        tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
        var renderProtoViewCompleter = PromiseWrapper.completer();
        var expectedProtoView = createProtoView();
        var compiler = createCompiler([renderProtoViewCompleter.promise], [expectedProtoView]);
        renderProtoViewCompleter.resolve(createRenderProtoView());
        PromiseWrapper.all([compiler.compile(MainComponent), compiler.compile(MainComponent)]).then((function(protoViews) {
          expect(protoViews[0]).toBe(expectedProtoView);
          expect(protoViews[1]).toBe(expectedProtoView);
          async.done();
        }));
      })));
      it('should allow recursive components', inject([AsyncTestCompleter], (function(async) {
        tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
        var mainProtoView = createProtoView([createComponentElementBinder(reader, MainComponent)]);
        var compiler = createCompiler([createRenderProtoView([createRenderComponentElementBinder(0)])], [mainProtoView]);
        compiler.compile(MainComponent).then((function(protoView) {
          expect(protoView).toBe(mainProtoView);
          expect(mainProtoView.elementBinders[0].nestedProtoView).toBe(mainProtoView);
          async.done();
        }));
      })));
      it('should create host proto views', inject([AsyncTestCompleter], (function(async) {
        renderer.spy('createHostProtoView').andCallFake((function(componentId) {
          return PromiseWrapper.resolve(createRenderProtoView([createRenderComponentElementBinder(0)]));
        }));
        tplResolver.setView(MainComponent, new View({template: '<div></div>'}));
        var rootProtoView = createProtoView([createComponentElementBinder(reader, MainComponent)]);
        var mainProtoView = createProtoView();
        var compiler = createCompiler([createRenderProtoView()], [rootProtoView, mainProtoView]);
        compiler.compileInHost(MainComponent).then((function(protoView) {
          expect(protoView).toBe(rootProtoView);
          expect(rootProtoView.elementBinders[0].nestedProtoView).toBe(mainProtoView);
          async.done();
        }));
      })));
      it('should create imperative proto views', inject([AsyncTestCompleter], (function(async) {
        renderer.spy('createImperativeComponentProtoView').andCallFake((function(rendererId) {
          return PromiseWrapper.resolve(createRenderProtoView([]));
        }));
        tplResolver.setView(MainComponent, new View({renderer: 'some-renderer'}));
        var mainProtoView = createProtoView();
        var compiler = createCompiler([], [mainProtoView]);
        compiler.compile(MainComponent).then((function(protoView) {
          expect(protoView).toBe(mainProtoView);
          expect(renderer.spy('createImperativeComponentProtoView')).toHaveBeenCalledWith('some-renderer');
          async.done();
        }));
      })));
    });
  }
  function createDirectiveBinding(reader, type) {
    var meta = reader.read(type);
    return DirectiveBinding.createFromType(meta.type, meta.annotation);
  }
  function createProtoView() {
    var elementBinders = arguments[0] !== (void 0) ? arguments[0] : null;
    var pv = new AppProtoView(null, null);
    if (isBlank(elementBinders)) {
      elementBinders = [];
    }
    pv.elementBinders = elementBinders;
    return pv;
  }
  function createComponentElementBinder(reader, type) {
    var binding = createDirectiveBinding(reader, type);
    return new ElementBinder(0, null, 0, null, binding, null);
  }
  function createViewportElementBinder(nestedProtoView) {
    var elBinder = new ElementBinder(0, null, 0, null, null, null);
    elBinder.nestedProtoView = nestedProtoView;
    return elBinder;
  }
  function createRenderProtoView() {
    var elementBinders = arguments[0] !== (void 0) ? arguments[0] : null;
    if (isBlank(elementBinders)) {
      elementBinders = [];
    }
    return new renderApi.ProtoViewDto({elementBinders: elementBinders});
  }
  function createRenderComponentElementBinder(directiveIndex) {
    return new renderApi.ElementBinder({directives: [new renderApi.DirectiveBinder({directiveIndex: directiveIndex})]});
  }
  function createRenderViewportElementBinder(nestedProtoView) {
    return new renderApi.ElementBinder({nestedProtoView: nestedProtoView});
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      xdescribe = $__m.xdescribe;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      IS_DARTIUM = $__m.IS_DARTIUM;
      it = $__m.it;
      SpyObject = $__m.SpyObject;
      proxy = $__m.proxy;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      stringify = $__m.stringify;
      isPresent = $__m.isPresent;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
    }, function($__m) {
      ElementBinder = $__m.ElementBinder;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Component = $__m.Component;
      DynamicComponent = $__m.DynamicComponent;
      Viewport = $__m.Viewport;
      Decorator = $__m.Decorator;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      DirectiveBinding = $__m.DirectiveBinding;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
      RuntimeComponentUrlMapper = $__m.RuntimeComponentUrlMapper;
    }, function($__m) {
      ProtoViewFactory = $__m.ProtoViewFactory;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      Renderer = $__m.Renderer;
      renderApi = $__m;
    }],
    execute: function() {
      MainComponent = (function() {
        var MainComponent = function MainComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(MainComponent, {}, {});
      }());
      Object.defineProperty(MainComponent, "annotations", {get: function() {
          return [new Component({selector: 'main-comp'})];
        }});
      NestedComponent = (function() {
        var NestedComponent = function NestedComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(NestedComponent, {}, {});
      }());
      Object.defineProperty(NestedComponent, "annotations", {get: function() {
          return [new Component()];
        }});
      RecursiveComponent = (function() {
        var RecursiveComponent = function RecursiveComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(RecursiveComponent, {}, {});
      }());
      SomeDynamicComponentDirective = (function() {
        var SomeDynamicComponentDirective = function SomeDynamicComponentDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeDynamicComponentDirective, {}, {});
      }());
      Object.defineProperty(SomeDynamicComponentDirective, "annotations", {get: function() {
          return [new DynamicComponent()];
        }});
      SomeViewportDirective = (function() {
        var SomeViewportDirective = function SomeViewportDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeViewportDirective, {}, {});
      }());
      Object.defineProperty(SomeViewportDirective, "annotations", {get: function() {
          return [new Viewport()];
        }});
      SomeDecoratorDirective = (function() {
        var SomeDecoratorDirective = function SomeDecoratorDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeDecoratorDirective, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirective, "annotations", {get: function() {
          return [new Decorator()];
        }});
      IgnoreChildrenDecoratorDirective = (function() {
        var IgnoreChildrenDecoratorDirective = function IgnoreChildrenDecoratorDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(IgnoreChildrenDecoratorDirective, {}, {});
      }());
      Object.defineProperty(IgnoreChildrenDecoratorDirective, "annotations", {get: function() {
          return [new Decorator({compileChildren: false})];
        }});
      DirectiveWithEvents = (function() {
        var DirectiveWithEvents = function DirectiveWithEvents() {
          ;
        };
        return ($traceurRuntime.createClass)(DirectiveWithEvents, {}, {});
      }());
      Object.defineProperty(DirectiveWithEvents, "annotations", {get: function() {
          return [new Decorator({hostListeners: {'someEvent': 'someAction'}})];
        }});
      DirectiveWithProperties = (function() {
        var DirectiveWithProperties = function DirectiveWithProperties() {
          ;
        };
        return ($traceurRuntime.createClass)(DirectiveWithProperties, {}, {});
      }());
      Object.defineProperty(DirectiveWithProperties, "annotations", {get: function() {
          return [new Decorator({hostProperties: {'someField': 'someProp'}})];
        }});
      DirectiveWithBind = (function() {
        var DirectiveWithBind = function DirectiveWithBind() {
          ;
        };
        return ($traceurRuntime.createClass)(DirectiveWithBind, {}, {});
      }());
      Object.defineProperty(DirectiveWithBind, "annotations", {get: function() {
          return [new Decorator({properties: {'a': 'b'}})];
        }});
      DirectiveWithAttributes = (function() {
        var DirectiveWithAttributes = function DirectiveWithAttributes(someAttr) {
          assert.argumentTypes(someAttr, assert.type.string);
        };
        return ($traceurRuntime.createClass)(DirectiveWithAttributes, {}, {});
      }());
      Object.defineProperty(DirectiveWithAttributes, "annotations", {get: function() {
          return [new Decorator()];
        }});
      Object.defineProperty(DirectiveWithAttributes, "parameters", {get: function() {
          return [[assert.type.string, new Attribute('someAttr')]];
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
      FakeUrlResolver = (function($__super) {
        var FakeUrlResolver = function FakeUrlResolver() {
          $traceurRuntime.superConstructor(FakeUrlResolver).call(this);
        };
        return ($traceurRuntime.createClass)(FakeUrlResolver, {resolve: function(baseUrl, url) {
            assert.argumentTypes(baseUrl, assert.type.string, url, assert.type.string);
            if (baseUrl === null && url == './') {
              return assert.returnType(('http://www.app.com'), assert.type.string);
            }
            return assert.returnType((baseUrl + url), assert.type.string);
          }}, {}, $__super);
      }(UrlResolver));
      Object.defineProperty(FakeUrlResolver.prototype.resolve, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      FakeTemplateResolver = (function($__super) {
        var FakeTemplateResolver = function FakeTemplateResolver() {
          $traceurRuntime.superConstructor(FakeTemplateResolver).call(this);
          this._cmpTemplates = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeTemplateResolver, {
          resolve: function(component) {
            assert.argumentTypes(component, Type);
            var template = MapWrapper.get(this._cmpTemplates, component);
            if (isBlank(template)) {
              throw 'No template';
            }
            return assert.returnType((template), View);
          },
          setView: function(component, template) {
            assert.argumentTypes(component, Type, template, View);
            MapWrapper.set(this._cmpTemplates, component, template);
          }
        }, {}, $__super);
      }(TemplateResolver));
      Object.defineProperty(FakeTemplateResolver.prototype.resolve, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(FakeTemplateResolver.prototype.setView, "parameters", {get: function() {
          return [[Type], [View]];
        }});
      FakeProtoViewFactory = (function($__super) {
        var FakeProtoViewFactory = function FakeProtoViewFactory(results) {
          $traceurRuntime.superConstructor(FakeProtoViewFactory).call(this, null);
          this.requests = [];
          this._results = results;
        };
        return ($traceurRuntime.createClass)(FakeProtoViewFactory, {createProtoView: function(componentBinding, renderProtoView, directives) {
            assert.argumentTypes(componentBinding, DirectiveBinding, renderProtoView, renderApi.ProtoViewDto, directives, assert.genericType(List, DirectiveBinding));
            ListWrapper.push(this.requests, [componentBinding, renderProtoView, directives]);
            return assert.returnType((ListWrapper.removeAt(this._results, 0)), AppProtoView);
          }}, {}, $__super);
      }(ProtoViewFactory));
      Object.defineProperty(FakeProtoViewFactory.prototype.createProtoView, "parameters", {get: function() {
          return [[DirectiveBinding], [renderApi.ProtoViewDto], [assert.genericType(List, DirectiveBinding)]];
        }});
    }
  };
});
//# sourceMappingURL=compiler_spec.es6.map

//# sourceMappingURL=./compiler_spec.js.map