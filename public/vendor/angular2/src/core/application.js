System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/dom/browser_adapter", "angular2/src/dom/dom_adapter", "./compiler/compiler", "angular2/src/reflection/reflection", "angular2/change_detection", "./exception_handler", "angular2/src/render/dom/compiler/template_loader", "./compiler/template_resolver", "./compiler/directive_metadata_reader", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/core/zone/vm_turn_zone", "angular2/src/core/life_cycle/life_cycle", "angular2/src/render/dom/shadow_dom/shadow_dom_strategy", "angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy", "angular2/src/services/xhr", "angular2/src/services/xhr_impl", "angular2/src/render/dom/events/event_manager", "angular2/src/render/dom/events/key_events", "angular2/src/render/dom/events/hammer_gestures", "angular2/src/di/binding", "angular2/src/core/compiler/component_url_mapper", "angular2/src/services/url_resolver", "angular2/src/render/dom/shadow_dom/style_url_resolver", "angular2/src/render/dom/shadow_dom/style_inliner", "angular2/src/core/compiler/dynamic_component_loader", "angular2/src/core/testability/testability", "angular2/src/core/compiler/view_factory", "angular2/src/core/compiler/view_hydrator", "angular2/src/core/compiler/proto_view_factory", "angular2/src/render/api", "angular2/src/render/dom/direct_dom_renderer", "angular2/src/render/dom/compiler/compiler", "angular2/src/render/dom/view/view_factory", "angular2/src/render/dom/view/view_hydrator", "./application_tokens"], function($__export) {
  "use strict";
  var assert,
      Injector,
      bind,
      OpaqueToken,
      Optional,
      NumberWrapper,
      Type,
      isBlank,
      isPresent,
      BaseException,
      assertionsEnabled,
      print,
      stringify,
      BrowserDomAdapter,
      DOM,
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
      List,
      ListWrapper,
      Promise,
      PromiseWrapper,
      VmTurnZone,
      LifeCycle,
      ShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      XHR,
      XHRImpl,
      EventManager,
      DomEventsPlugin,
      KeyEventsPlugin,
      HammerGesturesPlugin,
      Binding,
      ComponentUrlMapper,
      UrlResolver,
      StyleUrlResolver,
      StyleInliner,
      ComponentRef,
      DynamicComponentLoader,
      TestabilityRegistry,
      Testability,
      ViewFactory,
      VIEW_POOL_CAPACITY,
      AppViewHydrator,
      ProtoViewFactory,
      Renderer,
      DirectDomRenderer,
      rc,
      rvf,
      rvh,
      appComponentRefToken,
      appChangeDetectorToken,
      appElementToken,
      appComponentAnnotatedTypeToken,
      appDocumentToken,
      _rootInjector,
      _rootBindings;
  function _injectorBindings(appComponentType) {
    return assert.returnType(([bind(appDocumentToken).toValue(DOM.defaultDoc()), bind(appComponentAnnotatedTypeToken).toFactory((function(reader) {
      return reader.read(appComponentType);
    }), [DirectiveMetadataReader]), bind(appElementToken).toFactory((function(appComponentAnnotatedType, appDocument) {
      var selector = appComponentAnnotatedType.annotation.selector;
      var element = DOM.querySelector(appDocument, selector);
      if (isBlank(element)) {
        throw new BaseException(("The app selector \"" + selector + "\" did not match any elements"));
      }
      return element;
    }), [appComponentAnnotatedTypeToken, appDocumentToken]), bind(appComponentRefToken).toAsyncFactory((function(dynamicComponentLoader, injector, appElement, appComponentAnnotatedType, testability, registry) {
      registry.registerApplication(appElement, testability);
      return dynamicComponentLoader.loadIntoNewLocation(appComponentAnnotatedType.type, null, appElement, injector);
    }), [DynamicComponentLoader, Injector, appElementToken, appComponentAnnotatedTypeToken, Testability, TestabilityRegistry]), bind(appChangeDetectorToken).toFactory((function(ref) {
      return ref.hostView.changeDetector;
    }), [appComponentRefToken]), bind(appComponentType).toFactory((function(ref) {
      return ref.instance;
    }), [appComponentRefToken]), bind(LifeCycle).toFactory((function(exceptionHandler) {
      return new LifeCycle(exceptionHandler, null, assertionsEnabled());
    }), [ExceptionHandler]), bind(EventManager).toFactory((function(zone) {
      var plugins = [new HammerGesturesPlugin(), new KeyEventsPlugin(), new DomEventsPlugin()];
      return new EventManager(plugins, zone);
    }), [VmTurnZone]), bind(ShadowDomStrategy).toFactory((function(styleUrlResolver, doc) {
      return new EmulatedUnscopedShadowDomStrategy(styleUrlResolver, doc.head);
    }), [StyleUrlResolver, appDocumentToken]), DirectDomRenderer, bind(Renderer).toClass(DirectDomRenderer), bind(rc.Compiler).toClass(rc.DefaultCompiler), bind(rvf.ViewFactory).toFactory((function(capacity, eventManager, shadowDomStrategy) {
      return new rvf.ViewFactory(capacity, eventManager, shadowDomStrategy);
    }), [rvf.VIEW_POOL_CAPACITY, EventManager, ShadowDomStrategy]), bind(rvf.VIEW_POOL_CAPACITY).toValue(10000), rvh.RenderViewHydrator, ProtoViewFactory, bind(ViewFactory).toFactory((function(capacity, renderer) {
      return new ViewFactory(capacity, renderer);
    }), [VIEW_POOL_CAPACITY, Renderer]), bind(VIEW_POOL_CAPACITY).toValue(10000), AppViewHydrator, Compiler, CompilerCache, TemplateResolver, bind(PipeRegistry).toValue(defaultPipeRegistry), bind(ChangeDetection).toClass(DynamicChangeDetection), TemplateLoader, DirectiveMetadataReader, Parser, Lexer, ExceptionHandler, bind(XHR).toValue(new XHRImpl()), ComponentUrlMapper, UrlResolver, StyleUrlResolver, StyleInliner, DynamicComponentLoader, Testability]), assert.genericType(List, Binding));
  }
  function _createVmZone(givenReporter) {
    assert.argumentTypes(givenReporter, Function);
    var defaultErrorReporter = (function(exception, stackTrace) {
      var longStackTrace = ListWrapper.join(stackTrace, "\n\n-----async gap-----\n");
      print((exception + "\n\n" + longStackTrace));
      throw exception;
    });
    var reporter = isPresent(givenReporter) ? givenReporter : defaultErrorReporter;
    var zone = new VmTurnZone({enableLongStackTrace: assertionsEnabled()});
    zone.initCallbacks({onErrorHandler: reporter});
    return assert.returnType((zone), VmTurnZone);
  }
  function bootstrap(appComponentType) {
    var componentInjectableBindings = arguments[1] !== (void 0) ? arguments[1] : null;
    var errorReporter = arguments[2] !== (void 0) ? arguments[2] : null;
    assert.argumentTypes(appComponentType, Type, componentInjectableBindings, assert.genericType(List, Binding), errorReporter, Function);
    BrowserDomAdapter.makeCurrent();
    var bootstrapProcess = PromiseWrapper.completer();
    var zone = _createVmZone(errorReporter);
    zone.run((function() {
      var appInjector = _createAppInjector(appComponentType, componentInjectableBindings, zone);
      PromiseWrapper.then(appInjector.asyncGet(appComponentRefToken), (function(componentRef) {
        var appChangeDetector = componentRef.hostView.changeDetector;
        var lc = appInjector.get(LifeCycle);
        lc.registerWith(zone, appChangeDetector);
        lc.tick();
        bootstrapProcess.resolve(componentRef);
      }), (function(err) {
        bootstrapProcess.reject(err);
      }));
    }));
    return assert.returnType((bootstrapProcess.promise), assert.genericType(Promise, ComponentRef));
  }
  function _createAppInjector(appComponentType, bindings, zone) {
    assert.argumentTypes(appComponentType, Type, bindings, assert.genericType(List, Binding), zone, VmTurnZone);
    if (isBlank(_rootInjector))
      _rootInjector = Injector.resolveAndCreate(_rootBindings);
    var mergedBindings = isPresent(bindings) ? ListWrapper.concat(_injectorBindings(appComponentType), bindings) : _injectorBindings(appComponentType);
    ListWrapper.push(mergedBindings, bind(VmTurnZone).toValue(zone));
    return assert.returnType((_rootInjector.resolveAndCreateChild(mergedBindings)), Injector);
  }
  $__export("bootstrap", bootstrap);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
      OpaqueToken = $__m.OpaqueToken;
      Optional = $__m.Optional;
    }, function($__m) {
      NumberWrapper = $__m.NumberWrapper;
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      assertionsEnabled = $__m.assertionsEnabled;
      print = $__m.print;
      stringify = $__m.stringify;
    }, function($__m) {
      BrowserDomAdapter = $__m.BrowserDomAdapter;
    }, function($__m) {
      DOM = $__m.DOM;
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
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      XHRImpl = $__m.XHRImpl;
    }, function($__m) {
      EventManager = $__m.EventManager;
      DomEventsPlugin = $__m.DomEventsPlugin;
    }, function($__m) {
      KeyEventsPlugin = $__m.KeyEventsPlugin;
    }, function($__m) {
      HammerGesturesPlugin = $__m.HammerGesturesPlugin;
    }, function($__m) {
      Binding = $__m.Binding;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      ComponentRef = $__m.ComponentRef;
      DynamicComponentLoader = $__m.DynamicComponentLoader;
    }, function($__m) {
      TestabilityRegistry = $__m.TestabilityRegistry;
      Testability = $__m.Testability;
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
    }, function($__m) {
      appComponentRefToken = $__m.appComponentRefToken;
      appChangeDetectorToken = $__m.appChangeDetectorToken;
      appElementToken = $__m.appElementToken;
      appComponentAnnotatedTypeToken = $__m.appComponentAnnotatedTypeToken;
      appDocumentToken = $__m.appDocumentToken;
    }],
    execute: function() {
      _rootBindings = [bind(Reflector).toValue(reflector), TestabilityRegistry];
      Object.defineProperty(_createVmZone, "parameters", {get: function() {
          return [[Function]];
        }});
      Object.defineProperty(bootstrap, "parameters", {get: function() {
          return [[Type], [assert.genericType(List, Binding)], [Function]];
        }});
      Object.defineProperty(_createAppInjector, "parameters", {get: function() {
          return [[Type], [assert.genericType(List, Binding)], [VmTurnZone]];
        }});
    }
  };
});
//# sourceMappingURL=application.es6.map

//# sourceMappingURL=./application.js.map