System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/core/annotations/view", "angular2/src/core/compiler/template_resolver", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_factory", "angular2/src/core/compiler/view_hydrator", "angular2/src/core/compiler/element_injector", "angular2/src/core/compiler/directive_metadata_reader", "./utils", "./lang_utils"], function($__export) {
  "use strict";
  var assert,
      Injector,
      bind,
      Type,
      isPresent,
      BaseException,
      Promise,
      isBlank,
      List,
      View,
      TemplateResolver,
      Compiler,
      AppView,
      ViewFactory,
      AppViewHydrator,
      DirectiveBinding,
      DirectiveMetadataReader,
      queryView,
      viewRootNodes,
      el,
      instantiateType,
      getTypeOf,
      TestBed,
      ViewProxy;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      Compiler = $__m.Compiler;
    }, function($__m) {
      AppView = $__m.AppView;
    }, function($__m) {
      ViewFactory = $__m.ViewFactory;
    }, function($__m) {
      AppViewHydrator = $__m.AppViewHydrator;
    }, function($__m) {
      DirectiveBinding = $__m.DirectiveBinding;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      queryView = $__m.queryView;
      viewRootNodes = $__m.viewRootNodes;
      el = $__m.el;
    }, function($__m) {
      instantiateType = $__m.instantiateType;
      getTypeOf = $__m.getTypeOf;
    }],
    execute: function() {
      TestBed = $__export("TestBed", (function() {
        var TestBed = function TestBed(injector) {
          assert.argumentTypes(injector, Injector);
          this._injector = injector;
        };
        return ($traceurRuntime.createClass)(TestBed, {
          overrideView: function(component, template) {
            assert.argumentTypes(component, Type, template, View);
            this._injector.get(TemplateResolver).setView(component, template);
          },
          setInlineTemplate: function(component, html) {
            assert.argumentTypes(component, Type, html, assert.type.string);
            this._injector.get(TemplateResolver).setInlineTemplate(component, html);
          },
          overrideDirective: function(component, from, to) {
            assert.argumentTypes(component, Type, from, Type, to, Type);
            this._injector.get(TemplateResolver).overrideTemplateDirective(component, from, to);
          },
          createView: function(component) {
            var $__3,
                $__4;
            var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
                context = ($__3 = $__2.context) === void 0 ? null : $__3,
                html = ($__4 = $__2.html) === void 0 ? null : $__4;
            var $__0 = this;
            assert.argumentTypes(component, Type);
            if (isBlank(component) && isBlank(context)) {
              throw new BaseException('You must specified at least a component or a context');
            }
            if (isBlank(component)) {
              component = getTypeOf(context);
            } else if (isBlank(context)) {
              context = instantiateType(component);
            }
            if (isPresent(html)) {
              this.setInlineTemplate(component, html);
            }
            var rootEl = el('<div></div>');
            var metadataReader = this._injector.get(DirectiveMetadataReader);
            var componentBinding = DirectiveBinding.createFromBinding(bind(component).toValue(context), metadataReader.read(component).annotation);
            return assert.returnType((this._injector.get(Compiler).compileInHost(componentBinding).then((function(pv) {
              var viewFactory = $__0._injector.get(ViewFactory);
              var viewHydrator = $__0._injector.get(AppViewHydrator);
              var hostView = viewFactory.getView(pv);
              viewHydrator.hydrateInPlaceHostView(null, rootEl, hostView, $__0._injector);
              return new ViewProxy($__0._injector, hostView.componentChildViews[0]);
            }))), assert.genericType(Promise, AppView));
          }
        }, {});
      }()));
      Object.defineProperty(TestBed, "parameters", {get: function() {
          return [[Injector]];
        }});
      Object.defineProperty(TestBed.prototype.overrideView, "parameters", {get: function() {
          return [[Type], [View]];
        }});
      Object.defineProperty(TestBed.prototype.setInlineTemplate, "parameters", {get: function() {
          return [[Type], [assert.type.string]];
        }});
      Object.defineProperty(TestBed.prototype.overrideDirective, "parameters", {get: function() {
          return [[Type], [Type], [Type]];
        }});
      Object.defineProperty(TestBed.prototype.createView, "parameters", {get: function() {
          return [[Type], []];
        }});
      ViewProxy = $__export("ViewProxy", (function() {
        var ViewProxy = function ViewProxy(injector, view) {
          assert.argumentTypes(injector, Injector, view, AppView);
          this._view = view;
          this._injector = injector;
        };
        return ($traceurRuntime.createClass)(ViewProxy, {
          get context() {
            return assert.returnType((this._view.context), assert.type.any);
          },
          get rootNodes() {
            return assert.returnType((viewRootNodes(this._view)), List);
          },
          detectChanges: function() {
            this._view.changeDetector.detectChanges();
          },
          querySelector: function(selector) {
            return queryView(this._view, selector);
          },
          destroy: function() {
            var viewHydrator = this._injector.get(AppViewHydrator);
            viewHydrator.dehydrateInPlaceHostView(null, this._view);
          },
          get rawView() {
            return assert.returnType((this._view), AppView);
          }
        }, {});
      }()));
      Object.defineProperty(ViewProxy, "parameters", {get: function() {
          return [[Injector], [AppView]];
        }});
    }
  };
});
//# sourceMappingURL=test_bed.es6.map

//# sourceMappingURL=./test_bed.js.map