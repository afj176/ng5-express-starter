System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/dom/dom_adapter", "angular2/change_detection", "angular2/src/render/dom/direct_dom_renderer", "angular2/src/render/dom/compiler/compiler", "angular2/src/render/api", "angular2/src/render/dom/compiler/compile_step_factory", "angular2/src/render/dom/compiler/template_loader", "angular2/src/services/url_resolver", "angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy", "angular2/src/render/dom/events/event_manager", "angular2/src/core/zone/vm_turn_zone", "angular2/src/render/dom/shadow_dom/style_url_resolver", "angular2/src/render/dom/view/view_factory", "angular2/src/render/dom/view/view_hydrator"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      BaseException,
      MapWrapper,
      ListWrapper,
      List,
      Map,
      PromiseWrapper,
      Promise,
      DOM,
      Parser,
      Lexer,
      DirectDomRenderer,
      Compiler,
      ProtoViewRef,
      ProtoViewDto,
      ViewDefinition,
      ViewContainerRef,
      EventDispatcher,
      DirectiveMetadata,
      DefaultStepFactory,
      TemplateLoader,
      UrlResolver,
      EmulatedUnscopedShadowDomStrategy,
      EventManager,
      EventManagerPlugin,
      VmTurnZone,
      StyleUrlResolver,
      ViewFactory,
      RenderViewHydrator,
      IntegrationTestbed,
      FakeTemplateLoader,
      FakeVmTurnZone,
      FakeEventManagerPlugin,
      LoggingEventDispatcher,
      FakeEvent;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
      Map = $__m.Map;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
    }, function($__m) {
      DirectDomRenderer = $__m.DirectDomRenderer;
    }, function($__m) {
      Compiler = $__m.Compiler;
    }, function($__m) {
      ProtoViewRef = $__m.ProtoViewRef;
      ProtoViewDto = $__m.ProtoViewDto;
      ViewDefinition = $__m.ViewDefinition;
      ViewContainerRef = $__m.ViewContainerRef;
      EventDispatcher = $__m.EventDispatcher;
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      DefaultStepFactory = $__m.DefaultStepFactory;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
    }, function($__m) {
      EventManager = $__m.EventManager;
      EventManagerPlugin = $__m.EventManagerPlugin;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
    }, function($__m) {
      RenderViewHydrator = $__m.RenderViewHydrator;
    }],
    execute: function() {
      IntegrationTestbed = $__export("IntegrationTestbed", (function() {
        var IntegrationTestbed = function IntegrationTestbed($__2) {
          var $__3 = $__2,
              urlData = $__3.urlData,
              viewCacheCapacity = $__3.viewCacheCapacity,
              shadowDomStrategy = $__3.shadowDomStrategy,
              templates = $__3.templates;
          var $__0 = this;
          this._templates = MapWrapper.create();
          if (isPresent(templates)) {
            ListWrapper.forEach(templates, (function(template) {
              MapWrapper.set($__0._templates, template.componentId, template);
            }));
          }
          var parser = new Parser(new Lexer());
          var urlResolver = new UrlResolver();
          if (isBlank(shadowDomStrategy)) {
            shadowDomStrategy = new EmulatedUnscopedShadowDomStrategy(new StyleUrlResolver(urlResolver), null);
          }
          var compiler = new Compiler(new DefaultStepFactory(parser, shadowDomStrategy), new FakeTemplateLoader(urlResolver, urlData));
          if (isBlank(viewCacheCapacity)) {
            viewCacheCapacity = 0;
          }
          if (isBlank(urlData)) {
            urlData = MapWrapper.create();
          }
          this.eventPlugin = new FakeEventManagerPlugin();
          var eventManager = new EventManager([this.eventPlugin], new FakeVmTurnZone());
          var viewFactory = new ViewFactory(viewCacheCapacity, eventManager, shadowDomStrategy);
          var viewHydrator = new RenderViewHydrator(eventManager, viewFactory, shadowDomStrategy);
          this.renderer = new DirectDomRenderer(compiler, viewFactory, viewHydrator, shadowDomStrategy);
        };
        return ($traceurRuntime.createClass)(IntegrationTestbed, {
          compileRoot: function(componentId) {
            var $__0 = this;
            return assert.returnType((this.renderer.createHostProtoView(componentId).then((function(rootProtoView) {
              return $__0._compileNestedProtoViews(rootProtoView, [new DirectiveMetadata({
                type: DirectiveMetadata.COMPONENT_TYPE,
                id: componentId
              })]);
            }))), assert.genericType(Promise, ProtoViewDto));
          },
          compile: function(componentId) {
            var $__0 = this;
            var childTemplate = MapWrapper.get(this._templates, componentId);
            if (isBlank(childTemplate)) {
              throw new BaseException(("No template for component " + componentId));
            }
            return assert.returnType((this.renderer.compile(childTemplate).then((function(protoView) {
              return $__0._compileNestedProtoViews(protoView, childTemplate.directives);
            }))), assert.genericType(Promise, ProtoViewDto));
          },
          _compileNestedProtoViews: function(protoView, directives) {
            var $__0 = this;
            var childComponentRenderPvRefs = [];
            var nestedPVPromises = [];
            ListWrapper.forEach(protoView.elementBinders, (function(elementBinder) {
              var nestedComponentId = null;
              ListWrapper.forEach(elementBinder.directives, (function(db) {
                var directiveMeta = directives[db.directiveIndex];
                if (directiveMeta.type === DirectiveMetadata.COMPONENT_TYPE) {
                  nestedComponentId = directiveMeta.id;
                }
              }));
              var nestedCall;
              if (isPresent(nestedComponentId)) {
                var childTemplate = MapWrapper.get($__0._templates, nestedComponentId);
                if (isBlank(childTemplate)) {
                  ListWrapper.push(childComponentRenderPvRefs, null);
                } else {
                  nestedCall = $__0.compile(nestedComponentId);
                }
              } else if (isPresent(elementBinder.nestedProtoView)) {
                nestedCall = $__0._compileNestedProtoViews(elementBinder.nestedProtoView, directives);
              }
              if (isPresent(nestedCall)) {
                ListWrapper.push(nestedPVPromises, nestedCall.then((function(nestedPv) {
                  elementBinder.nestedProtoView = nestedPv;
                  if (isPresent(nestedComponentId)) {
                    ListWrapper.push(childComponentRenderPvRefs, nestedPv.render);
                  }
                })));
              }
            }));
            if (nestedPVPromises.length > 0) {
              return assert.returnType((PromiseWrapper.all(nestedPVPromises).then((function(_) {
                $__0.renderer.mergeChildComponentProtoViews(protoView.render, childComponentRenderPvRefs);
                return protoView;
              }))), assert.genericType(Promise, ProtoViewDto));
            } else {
              return assert.returnType((PromiseWrapper.resolve(protoView)), assert.genericType(Promise, ProtoViewDto));
            }
          }
        }, {});
      }()));
      FakeTemplateLoader = (function($__super) {
        var FakeTemplateLoader = function FakeTemplateLoader(urlResolver, urlData) {
          $traceurRuntime.superConstructor(FakeTemplateLoader).call(this, null, urlResolver);
          this._urlData = urlData;
        };
        return ($traceurRuntime.createClass)(FakeTemplateLoader, {load: function(template) {
            assert.argumentTypes(template, ViewDefinition);
            if (isPresent(template.template)) {
              return PromiseWrapper.resolve(DOM.createTemplate(template.template));
            }
            if (isPresent(template.absUrl)) {
              var content = this._urlData[template.absUrl];
              if (isPresent(content)) {
                return PromiseWrapper.resolve(DOM.createTemplate(content));
              }
            }
            return PromiseWrapper.reject('Load failed');
          }}, {}, $__super);
      }(TemplateLoader));
      Object.defineProperty(FakeTemplateLoader.prototype.load, "parameters", {get: function() {
          return [[ViewDefinition]];
        }});
      FakeVmTurnZone = $__export("FakeVmTurnZone", (function($__super) {
        var FakeVmTurnZone = function FakeVmTurnZone() {
          $traceurRuntime.superConstructor(FakeVmTurnZone).call(this, {enableLongStackTrace: false});
        };
        return ($traceurRuntime.createClass)(FakeVmTurnZone, {
          run: function(fn) {
            fn();
          },
          runOutsideAngular: function(fn) {
            fn();
          }
        }, {}, $__super);
      }(VmTurnZone)));
      FakeEventManagerPlugin = $__export("FakeEventManagerPlugin", (function($__super) {
        var FakeEventManagerPlugin = function FakeEventManagerPlugin() {
          $traceurRuntime.superConstructor(FakeEventManagerPlugin).call(this);
          this._eventHandlers = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeEventManagerPlugin, {
          dispatchEvent: function(eventName, event) {
            MapWrapper.get(this._eventHandlers, eventName)(event);
          },
          supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            return assert.returnType((true), assert.type.boolean);
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            var $__0 = this;
            assert.argumentTypes(element, assert.type.any, eventName, assert.type.string, handler, Function, shouldSupportBubble, assert.type.boolean);
            MapWrapper.set(this._eventHandlers, eventName, handler);
            return (function() {
              MapWrapper.delete($__0._eventHandlers, eventName);
            });
          }
        }, {}, $__super);
      }(EventManagerPlugin)));
      Object.defineProperty(FakeEventManagerPlugin.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeEventManagerPlugin.prototype.addEventListener, "parameters", {get: function() {
          return [[], [assert.type.string], [Function], [assert.type.boolean]];
        }});
      LoggingEventDispatcher = $__export("LoggingEventDispatcher", (function($__super) {
        var LoggingEventDispatcher = function LoggingEventDispatcher() {
          $traceurRuntime.superConstructor(LoggingEventDispatcher).call(this);
          this.log = [];
        };
        return ($traceurRuntime.createClass)(LoggingEventDispatcher, {dispatchEvent: function(elementIndex, eventName, locals) {
            assert.argumentTypes(elementIndex, assert.type.number, eventName, assert.type.string, locals, assert.genericType(Map, assert.type.string, assert.type.any));
            ListWrapper.push(this.log, [elementIndex, eventName, locals]);
          }}, {}, $__super);
      }(EventDispatcher)));
      Object.defineProperty(LoggingEventDispatcher.prototype.dispatchEvent, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.genericType(Map, assert.type.string, assert.type.any)]];
        }});
      FakeEvent = $__export("FakeEvent", (function() {
        var FakeEvent = function FakeEvent(target) {
          this.target = target;
        };
        return ($traceurRuntime.createClass)(FakeEvent, {}, {});
      }()));
    }
  };
});
//# sourceMappingURL=integration_testbed.es6.map

//# sourceMappingURL=./integration_testbed.js.map