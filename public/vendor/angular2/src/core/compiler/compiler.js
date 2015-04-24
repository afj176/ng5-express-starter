System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "./directive_metadata_reader", "../annotations/annotations", "./view", "./element_injector", "./template_resolver", "../annotations/view", "./component_url_mapper", "./proto_view_factory", "angular2/src/services/url_resolver", "angular2/src/render/api"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      Type,
      isBlank,
      isPresent,
      BaseException,
      normalizeBlank,
      stringify,
      Promise,
      PromiseWrapper,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      DirectiveMetadataReader,
      Component,
      Viewport,
      DynamicComponent,
      Decorator,
      AppProtoView,
      DirectiveBinding,
      TemplateResolver,
      View,
      ComponentUrlMapper,
      ProtoViewFactory,
      UrlResolver,
      renderApi,
      CompilerCache,
      Compiler;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      normalizeBlank = $__m.normalizeBlank;
      stringify = $__m.stringify;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Component = $__m.Component;
      Viewport = $__m.Viewport;
      DynamicComponent = $__m.DynamicComponent;
      Decorator = $__m.Decorator;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
    }, function($__m) {
      DirectiveBinding = $__m.DirectiveBinding;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      ProtoViewFactory = $__m.ProtoViewFactory;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      renderApi = $__m;
    }],
    execute: function() {
      CompilerCache = $__export("CompilerCache", (function() {
        var CompilerCache = function CompilerCache() {
          this._cache = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(CompilerCache, {
          set: function(component, protoView) {
            assert.argumentTypes(component, Type, protoView, AppProtoView);
            MapWrapper.set(this._cache, component, protoView);
          },
          get: function(component) {
            assert.argumentTypes(component, Type);
            var result = MapWrapper.get(this._cache, component);
            return assert.returnType((normalizeBlank(result)), AppProtoView);
          },
          clear: function() {
            MapWrapper.clear(this._cache);
          }
        }, {});
      }()));
      Object.defineProperty(CompilerCache, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(CompilerCache.prototype.set, "parameters", {get: function() {
          return [[Type], [AppProtoView]];
        }});
      Object.defineProperty(CompilerCache.prototype.get, "parameters", {get: function() {
          return [[Type]];
        }});
      Compiler = $__export("Compiler", (function() {
        var Compiler = function Compiler(reader, cache, templateResolver, componentUrlMapper, urlResolver, renderer, protoViewFactory) {
          assert.argumentTypes(reader, DirectiveMetadataReader, cache, CompilerCache, templateResolver, TemplateResolver, componentUrlMapper, ComponentUrlMapper, urlResolver, UrlResolver, renderer, renderApi.Renderer, protoViewFactory, ProtoViewFactory);
          this._reader = reader;
          this._compilerCache = cache;
          this._compiling = MapWrapper.create();
          this._templateResolver = templateResolver;
          this._componentUrlMapper = componentUrlMapper;
          this._urlResolver = urlResolver;
          this._appUrl = urlResolver.resolve(null, './');
          this._renderer = renderer;
          this._protoViewFactory = protoViewFactory;
        };
        return ($traceurRuntime.createClass)(Compiler, {
          _bindDirective: function(directiveTypeOrBinding) {
            if (directiveTypeOrBinding instanceof DirectiveBinding) {
              return assert.returnType((directiveTypeOrBinding), DirectiveBinding);
            }
            var meta = this._reader.read(directiveTypeOrBinding);
            return assert.returnType((DirectiveBinding.createFromType(meta.type, meta.annotation)), DirectiveBinding);
          },
          compileInHost: function(componentTypeOrBinding) {
            var $__0 = this;
            assert.argumentTypes(componentTypeOrBinding, assert.type.any);
            return assert.returnType((this._renderer.createHostProtoView('host').then((function(hostRenderPv) {
              return $__0._compileNestedProtoViews(null, hostRenderPv, [$__0._bindDirective(componentTypeOrBinding)], true);
            }))), assert.genericType(Promise, AppProtoView));
          },
          compile: function(component) {
            assert.argumentTypes(component, Type);
            var protoView = this._compile(this._bindDirective(component));
            return assert.returnType((PromiseWrapper.isPromise(protoView) ? protoView : PromiseWrapper.resolve(protoView)), assert.genericType(Promise, AppProtoView));
          },
          _compile: function(componentBinding) {
            var $__0 = this;
            var component = componentBinding.key.token;
            var protoView = this._compilerCache.get(component);
            if (isPresent(protoView)) {
              return protoView;
            }
            var pvPromise = MapWrapper.get(this._compiling, component);
            if (isPresent(pvPromise)) {
              return pvPromise;
            }
            var template = this._templateResolver.resolve(component);
            if (isPresent(template.renderer)) {
              var directives = [];
              pvPromise = this._renderer.createImperativeComponentProtoView(template.renderer).then((function(renderPv) {
                return $__0._compileNestedProtoViews(componentBinding, renderPv, directives, true);
              }));
            } else {
              var directives = ListWrapper.map(this._flattenDirectives(template), (function(directive) {
                return $__0._bindDirective(directive);
              }));
              var renderTemplate = this._buildRenderTemplate(component, template, directives);
              pvPromise = this._renderer.compile(renderTemplate).then((function(renderPv) {
                return $__0._compileNestedProtoViews(componentBinding, renderPv, directives, true);
              }));
            }
            MapWrapper.set(this._compiling, component, pvPromise);
            return pvPromise;
          },
          _compileNestedProtoViews: function(componentBinding, renderPv, directives, isComponentRootView) {
            var $__0 = this;
            var nestedPVPromises = [];
            var protoView = this._protoViewFactory.createProtoView(componentBinding, renderPv, directives);
            if (isComponentRootView && isPresent(componentBinding)) {
              var component = componentBinding.key.token;
              this._compilerCache.set(component, protoView);
              MapWrapper.delete(this._compiling, component);
            }
            var binderIndex = 0;
            ListWrapper.forEach(protoView.elementBinders, (function(elementBinder) {
              var nestedComponent = elementBinder.componentDirective;
              var nestedRenderProtoView = renderPv.elementBinders[binderIndex].nestedProtoView;
              var elementBinderDone = (function(nestedPv) {
                elementBinder.nestedProtoView = nestedPv;
                nestedPv.parentProtoView = isPresent(nestedComponent) ? null : protoView;
              });
              var nestedCall = null;
              if (isPresent(nestedComponent)) {
                if (!(nestedComponent.annotation instanceof DynamicComponent)) {
                  nestedCall = $__0._compile(nestedComponent);
                }
              } else if (isPresent(nestedRenderProtoView)) {
                nestedCall = $__0._compileNestedProtoViews(componentBinding, nestedRenderProtoView, directives, false);
              }
              if (PromiseWrapper.isPromise(nestedCall)) {
                ListWrapper.push(nestedPVPromises, nestedCall.then(elementBinderDone));
              } else if (isPresent(nestedCall)) {
                elementBinderDone(nestedCall);
              }
              binderIndex++;
            }));
            var protoViewDone = (function(_) {
              var childComponentRenderPvRefs = [];
              ListWrapper.forEach(protoView.elementBinders, (function(eb) {
                if (isPresent(eb.componentDirective)) {
                  var componentPv = eb.nestedProtoView;
                  ListWrapper.push(childComponentRenderPvRefs, isPresent(componentPv) ? componentPv.render : null);
                }
              }));
              $__0._renderer.mergeChildComponentProtoViews(protoView.render, childComponentRenderPvRefs);
              return protoView;
            });
            if (nestedPVPromises.length > 0) {
              return PromiseWrapper.all(nestedPVPromises).then(protoViewDone);
            } else {
              return protoViewDone(null);
            }
          },
          _buildRenderTemplate: function(component, view, directives) {
            var componentUrl = this._urlResolver.resolve(this._appUrl, this._componentUrlMapper.getUrl(component));
            var templateAbsUrl = null;
            if (isPresent(view.templateUrl)) {
              templateAbsUrl = this._urlResolver.resolve(componentUrl, view.templateUrl);
            } else {
              templateAbsUrl = componentUrl;
            }
            return assert.returnType((new renderApi.ViewDefinition({
              componentId: stringify(component),
              absUrl: templateAbsUrl,
              template: view.template,
              directives: ListWrapper.map(directives, Compiler.buildRenderDirective)
            })), renderApi.ViewDefinition);
          },
          _flattenDirectives: function(template) {
            assert.argumentTypes(template, View);
            if (isBlank(template.directives))
              return assert.returnType(([]), assert.genericType(List, Type));
            var directives = [];
            this._flattenList(template.directives, directives);
            return assert.returnType((directives), assert.genericType(List, Type));
          },
          _flattenList: function(tree, out) {
            assert.argumentTypes(tree, assert.genericType(List, assert.type.any), out, assert.genericType(List, Type));
            for (var i = 0; i < tree.length; i++) {
              var item = tree[i];
              if (ListWrapper.isList(item)) {
                this._flattenList(item, out);
              } else {
                ListWrapper.push(out, item);
              }
            }
          }
        }, {buildRenderDirective: function(directiveBinding) {
            var ann = directiveBinding.annotation;
            var renderType;
            var compileChildren = true;
            if ((ann instanceof Component) || (ann instanceof DynamicComponent)) {
              renderType = renderApi.DirectiveMetadata.COMPONENT_TYPE;
            } else if (ann instanceof Viewport) {
              renderType = renderApi.DirectiveMetadata.VIEWPORT_TYPE;
            } else if (ann instanceof Decorator) {
              renderType = renderApi.DirectiveMetadata.DECORATOR_TYPE;
              compileChildren = ann.compileChildren;
            }
            var readAttributes = [];
            ListWrapper.forEach(directiveBinding.dependencies, (function(dep) {
              if (isPresent(dep.attributeName)) {
                ListWrapper.push(readAttributes, dep.attributeName);
              }
            }));
            return assert.returnType((new renderApi.DirectiveMetadata({
              id: stringify(directiveBinding.key.token),
              type: renderType,
              selector: ann.selector,
              compileChildren: compileChildren,
              hostListeners: isPresent(ann.hostListeners) ? MapWrapper.createFromStringMap(ann.hostListeners) : null,
              hostProperties: isPresent(ann.hostProperties) ? MapWrapper.createFromStringMap(ann.hostProperties) : null,
              properties: isPresent(ann.properties) ? MapWrapper.createFromStringMap(ann.properties) : null,
              readAttributes: readAttributes
            })), renderApi.DirectiveMetadata);
          }});
      }()));
      Object.defineProperty(Compiler, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(Compiler, "parameters", {get: function() {
          return [[DirectiveMetadataReader], [CompilerCache], [TemplateResolver], [ComponentUrlMapper], [UrlResolver], [renderApi.Renderer], [ProtoViewFactory]];
        }});
      Object.defineProperty(Compiler.prototype.compileInHost, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      Object.defineProperty(Compiler.prototype.compile, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(Compiler.prototype._compile, "parameters", {get: function() {
          return [[DirectiveBinding]];
        }});
      Object.defineProperty(Compiler.prototype._flattenDirectives, "parameters", {get: function() {
          return [[View]];
        }});
      Object.defineProperty(Compiler.prototype._flattenList, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.any)], [assert.genericType(List, Type)]];
        }});
    }
  };
});
//# sourceMappingURL=compiler.es6.map

//# sourceMappingURL=./compiler.js.map