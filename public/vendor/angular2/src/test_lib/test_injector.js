System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/core/compiler/compiler", "angular2/src/reflection/reflection", "angular2/change_detection", "angular2/src/core/exception_handler", "angular2/src/render/dom/compiler/template_loader", "angular2/src/core/compiler/template_resolver", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/dynamic_component_loader", "angular2/src/render/dom/shadow_dom/shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy", "angular2/src/services/xhr", "angular2/src/core/compiler/component_url_mapper", "angular2/src/services/url_resolver", "angular2/src/render/dom/shadow_dom/style_url_resolver", "angular2/src/render/dom/shadow_dom/style_inliner", "angular2/src/core/zone/vm_turn_zone", "angular2/src/dom/dom_adapter", "angular2/src/core/application_tokens", "angular2/src/render/dom/events/event_manager", "angular2/src/mock/template_resolver_mock", "angular2/src/mock/xhr_mock", "angular2/src/mock/vm_turn_zone_mock", "./test_bed", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/core/compiler/view_factory", "angular2/src/core/compiler/view_hydrator", "angular2/src/core/compiler/proto_view_factory", "angular2/src/render/api", "angular2/src/render/dom/direct_dom_renderer", "angular2/src/render/dom/compiler/compiler", "angular2/src/render/dom/view/view_factory", "angular2/src/render/dom/view/view_hydrator"], function($__export) {
  "use strict";
  var assert,
      bind,
      Compiler,
      CompilerCache,
      Reflector,
      reflector,
      Parser,
      Lexer,
      ChangeDetection,
      DynamicChangeDetection,
      PipeRegistry,
      defaultPipeRegistry,
      ExceptionHandler,
      TemplateLoader,
      TemplateResolver,
      DirectiveMetadataReader,
      DynamicComponentLoader,
      ShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      XHR,
      ComponentUrlMapper,
      UrlResolver,
      StyleUrlResolver,
      StyleInliner,
      VmTurnZone,
      DOM,
      appDocumentToken,
      EventManager,
      DomEventsPlugin,
      MockTemplateResolver,
      MockXHR,
      MockVmTurnZone,
      TestBed,
      Injector,
      List,
      ListWrapper,
      FunctionWrapper,
      ViewFactory,
      VIEW_POOL_CAPACITY,
      AppViewHydrator,
      ProtoViewFactory,
      Renderer,
      DirectDomRenderer,
      rc,
      rvf,
      rvh,
      FunctionWithParamTokens;
  function _getRootBindings() {
    return [bind(Reflector).toValue(reflector)];
  }
  function _getAppBindings() {
    var appDoc;
    try {
      appDoc = DOM.defaultDoc();
    } catch (e) {
      appDoc = null;
    }
    return [bind(appDocumentToken).toValue(appDoc), bind(ShadowDomStrategy).toFactory((function(styleUrlResolver, doc) {
      return new EmulatedUnscopedShadowDomStrategy(styleUrlResolver, doc.head);
    }), [StyleUrlResolver, appDocumentToken]), bind(DirectDomRenderer).toClass(DirectDomRenderer), bind(Renderer).toClass(DirectDomRenderer), bind(rc.Compiler).toClass(rc.DefaultCompiler), rvf.ViewFactory, rvh.RenderViewHydrator, bind(rvf.VIEW_POOL_CAPACITY).toValue(500), ProtoViewFactory, ViewFactory, AppViewHydrator, bind(VIEW_POOL_CAPACITY).toValue(500), Compiler, CompilerCache, bind(TemplateResolver).toClass(MockTemplateResolver), bind(PipeRegistry).toValue(defaultPipeRegistry), bind(ChangeDetection).toClass(DynamicChangeDetection), TemplateLoader, DynamicComponentLoader, DirectiveMetadataReader, Parser, Lexer, ExceptionHandler, bind(XHR).toClass(MockXHR), ComponentUrlMapper, UrlResolver, StyleUrlResolver, StyleInliner, TestBed, bind(VmTurnZone).toClass(MockVmTurnZone), bind(EventManager).toFactory((function(zone) {
      var plugins = [new DomEventsPlugin()];
      return new EventManager(plugins, zone);
    }), [VmTurnZone])];
  }
  function createTestInjector(bindings) {
    assert.argumentTypes(bindings, List);
    var rootInjector = Injector.resolveAndCreate(_getRootBindings());
    return rootInjector.resolveAndCreateChild(ListWrapper.concat(_getAppBindings(), bindings));
  }
  function inject(tokens, fn) {
    assert.argumentTypes(tokens, List, fn, Function);
    return new FunctionWithParamTokens(tokens, fn);
  }
  $__export("createTestInjector", createTestInjector);
  $__export("inject", inject);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      bind = $__m.bind;
      Injector = $__m.Injector;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      Reflector = $__m.Reflector;
      reflector = $__m.reflector;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
      ChangeDetection = $__m.ChangeDetection;
      DynamicChangeDetection = $__m.DynamicChangeDetection;
      PipeRegistry = $__m.PipeRegistry;
      defaultPipeRegistry = $__m.defaultPipeRegistry;
    }, function($__m) {
      ExceptionHandler = $__m.ExceptionHandler;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      appDocumentToken = $__m.appDocumentToken;
    }, function($__m) {
      EventManager = $__m.EventManager;
      DomEventsPlugin = $__m.DomEventsPlugin;
    }, function($__m) {
      MockTemplateResolver = $__m.MockTemplateResolver;
    }, function($__m) {
      MockXHR = $__m.MockXHR;
    }, function($__m) {
      MockVmTurnZone = $__m.MockVmTurnZone;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      FunctionWrapper = $__m.FunctionWrapper;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
      VIEW_POOL_CAPACITY = $__m.VIEW_POOL_CAPACITY;
    }, function($__m) {
      AppViewHydrator = $__m.AppViewHydrator;
    }, function($__m) {
      ProtoViewFactory = $__m.ProtoViewFactory;
    }, function($__m) {
      Renderer = $__m.Renderer;
    }, function($__m) {
      DirectDomRenderer = $__m.DirectDomRenderer;
    }, function($__m) {
      rc = $__m;
    }, function($__m) {
      rvf = $__m;
    }, function($__m) {
      rvh = $__m;
    }],
    execute: function() {
      Object.defineProperty(createTestInjector, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(inject, "parameters", {get: function() {
          return [[List], [Function]];
        }});
      FunctionWithParamTokens = $__export("FunctionWithParamTokens", (function() {
        var FunctionWithParamTokens = function FunctionWithParamTokens(tokens, fn) {
          assert.argumentTypes(tokens, List, fn, Function);
          this._tokens = tokens;
          this._fn = fn;
        };
        return ($traceurRuntime.createClass)(FunctionWithParamTokens, {execute: function(injector) {
            var params = ListWrapper.map(this._tokens, (function(t) {
              return injector.get(t);
            }));
            FunctionWrapper.apply(this._fn, params);
          }}, {});
      }()));
      Object.defineProperty(FunctionWithParamTokens, "parameters", {get: function() {
          return [[List], [Function]];
        }});
      Object.defineProperty(FunctionWithParamTokens.prototype.execute, "parameters", {get: function() {
          return [[Injector]];
        }});
    }
  };
});
//# sourceMappingURL=test_injector.es6.map

//# sourceMappingURL=./test_injector.js.map