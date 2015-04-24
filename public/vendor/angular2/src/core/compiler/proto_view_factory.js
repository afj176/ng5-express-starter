System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/reflection/reflection", "angular2/change_detection", "../annotations/annotations", "angular2/src/render/api", "./view", "./element_injector"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      List,
      ListWrapper,
      MapWrapper,
      isPresent,
      isBlank,
      reflector,
      ChangeDetection,
      DirectiveIndex,
      Component,
      Viewport,
      DynamicComponent,
      renderApi,
      AppProtoView,
      ProtoElementInjector,
      DirectiveBinding,
      ProtoViewFactory,
      SortedDirectives,
      ParentProtoElementInjectorWithDistance;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      reflector = $__m.reflector;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
      DirectiveIndex = $__m.DirectiveIndex;
    }, function($__m) {
      Component = $__m.Component;
      Viewport = $__m.Viewport;
      DynamicComponent = $__m.DynamicComponent;
    }, function($__m) {
      renderApi = $__m;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
      DirectiveBinding = $__m.DirectiveBinding;
    }],
    execute: function() {
      ProtoViewFactory = $__export("ProtoViewFactory", (function() {
        var ProtoViewFactory = function ProtoViewFactory(changeDetection) {
          assert.argumentTypes(changeDetection, ChangeDetection);
          this._changeDetection = changeDetection;
        };
        return ($traceurRuntime.createClass)(ProtoViewFactory, {
          createProtoView: function(componentBinding, renderProtoView, directives) {
            assert.argumentTypes(componentBinding, DirectiveBinding, renderProtoView, renderApi.ProtoViewDto, directives, assert.genericType(List, DirectiveBinding));
            var protoChangeDetector;
            if (isBlank(componentBinding)) {
              protoChangeDetector = this._changeDetection.createProtoChangeDetector('root', null);
            } else {
              var componentAnnotation = assert.type(componentBinding.annotation, Component);
              protoChangeDetector = this._changeDetection.createProtoChangeDetector('dummy', componentAnnotation.changeDetection);
            }
            var protoView = new AppProtoView(renderProtoView.render, protoChangeDetector);
            for (var i = 0; i < renderProtoView.elementBinders.length; i++) {
              var renderElementBinder = renderProtoView.elementBinders[i];
              var sortedDirectives = new SortedDirectives(renderElementBinder.directives, directives);
              var parentPeiWithDistance = this._findParentProtoElementInjectorWithDistance(i, protoView.elementBinders, renderProtoView.elementBinders);
              var protoElementInjector = this._createProtoElementInjector(i, parentPeiWithDistance, sortedDirectives, renderElementBinder);
              this._createElementBinder(protoView, renderElementBinder, protoElementInjector, sortedDirectives);
              this._createDirectiveBinders(protoView, i, sortedDirectives);
            }
            MapWrapper.forEach(renderProtoView.variableBindings, (function(mappedName, varName) {
              protoView.bindVariable(varName, mappedName);
            }));
            return assert.returnType((protoView), AppProtoView);
          },
          _findParentProtoElementInjectorWithDistance: function(binderIndex, elementBinders, renderElementBinders) {
            var distance = 0;
            do {
              var renderElementBinder = renderElementBinders[binderIndex];
              binderIndex = renderElementBinder.parentIndex;
              if (binderIndex !== -1) {
                distance += renderElementBinder.distanceToParent;
                var elementBinder = elementBinders[binderIndex];
                if (isPresent(elementBinder.protoElementInjector)) {
                  return new ParentProtoElementInjectorWithDistance(elementBinder.protoElementInjector, distance);
                }
              }
            } while (binderIndex !== -1);
            return new ParentProtoElementInjectorWithDistance(null, -1);
          },
          _createProtoElementInjector: function(binderIndex, parentPeiWithDistance, sortedDirectives, renderElementBinder) {
            var protoElementInjector = null;
            var hasVariables = MapWrapper.size(renderElementBinder.variableBindings) > 0;
            if (sortedDirectives.directives.length > 0 || hasVariables) {
              protoElementInjector = new ProtoElementInjector(parentPeiWithDistance.protoElementInjector, binderIndex, sortedDirectives.directives, isPresent(sortedDirectives.componentDirective), parentPeiWithDistance.distance);
              protoElementInjector.attributes = renderElementBinder.readAttributes;
              if (hasVariables && !isPresent(sortedDirectives.viewportDirective)) {
                protoElementInjector.exportComponent = isPresent(sortedDirectives.componentDirective);
                protoElementInjector.exportElement = isBlank(sortedDirectives.componentDirective);
                var exportImplicitName = MapWrapper.get(renderElementBinder.variableBindings, '\$implicit');
                if (isPresent(exportImplicitName)) {
                  protoElementInjector.exportImplicitName = exportImplicitName;
                }
              }
            }
            return protoElementInjector;
          },
          _createElementBinder: function(protoView, renderElementBinder, protoElementInjector, sortedDirectives) {
            var parent = null;
            if (renderElementBinder.parentIndex !== -1) {
              parent = protoView.elementBinders[renderElementBinder.parentIndex];
            }
            var elBinder = protoView.bindElement(parent, renderElementBinder.distanceToParent, protoElementInjector, sortedDirectives.componentDirective, sortedDirectives.viewportDirective);
            for (var i = 0; i < renderElementBinder.textBindings.length; i++) {
              protoView.bindTextNode(renderElementBinder.textBindings[i]);
            }
            MapWrapper.forEach(renderElementBinder.propertyBindings, (function(astWithSource, propertyName) {
              protoView.bindElementProperty(astWithSource, propertyName);
            }));
            protoView.bindEvent(renderElementBinder.eventBindings, -1);
            MapWrapper.forEach(renderElementBinder.variableBindings, (function(mappedName, varName) {
              MapWrapper.set(protoView.protoLocals, mappedName, null);
            }));
            return elBinder;
          },
          _createDirectiveBinders: function(protoView, boundElementIndex, sortedDirectives) {
            for (var i = 0; i < sortedDirectives.renderDirectives.length; i++) {
              var directiveBinder = sortedDirectives.renderDirectives[i];
              MapWrapper.forEach(directiveBinder.propertyBindings, (function(astWithSource, propertyName) {
                var setter = reflector.setter(propertyName);
                protoView.bindDirectiveProperty(i, astWithSource, propertyName, setter);
              }));
              MapWrapper.forEach(directiveBinder.hostPropertyBindings, (function(astWithSource, propertyName) {
                var directiveIndex = new DirectiveIndex(boundElementIndex, i);
                protoView.bindHostElementProperty(astWithSource, propertyName, directiveIndex);
              }));
              protoView.bindEvent(directiveBinder.eventBindings, i);
            }
          }
        }, {});
      }()));
      Object.defineProperty(ProtoViewFactory, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(ProtoViewFactory, "parameters", {get: function() {
          return [[ChangeDetection]];
        }});
      Object.defineProperty(ProtoViewFactory.prototype.createProtoView, "parameters", {get: function() {
          return [[DirectiveBinding], [renderApi.ProtoViewDto], [assert.genericType(List, DirectiveBinding)]];
        }});
      SortedDirectives = (function() {
        var SortedDirectives = function SortedDirectives(renderDirectives, allDirectives) {
          var $__0 = this;
          this.renderDirectives = [];
          this.directives = [];
          this.viewportDirective = null;
          this.componentDirective = null;
          ListWrapper.forEach(renderDirectives, (function(renderDirectiveBinder) {
            var directiveBinding = allDirectives[renderDirectiveBinder.directiveIndex];
            if ((directiveBinding.annotation instanceof Component) || (directiveBinding.annotation instanceof DynamicComponent)) {
              $__0.componentDirective = directiveBinding;
              ListWrapper.insert($__0.renderDirectives, 0, renderDirectiveBinder);
              ListWrapper.insert($__0.directives, 0, directiveBinding);
            } else {
              if (directiveBinding.annotation instanceof Viewport) {
                $__0.viewportDirective = directiveBinding;
              }
              ListWrapper.push($__0.renderDirectives, renderDirectiveBinder);
              ListWrapper.push($__0.directives, directiveBinding);
            }
          }));
        };
        return ($traceurRuntime.createClass)(SortedDirectives, {}, {});
      }());
      ParentProtoElementInjectorWithDistance = (function() {
        var ParentProtoElementInjectorWithDistance = function ParentProtoElementInjectorWithDistance(protoElementInjector, distance) {
          assert.argumentTypes(protoElementInjector, ProtoElementInjector, distance, assert.type.number);
          this.protoElementInjector = protoElementInjector;
          this.distance = distance;
        };
        return ($traceurRuntime.createClass)(ParentProtoElementInjectorWithDistance, {}, {});
      }());
      Object.defineProperty(ParentProtoElementInjectorWithDistance, "parameters", {get: function() {
          return [[ProtoElementInjector], [assert.type.number]];
        }});
    }
  };
});
//# sourceMappingURL=proto_view_factory.es6.map

//# sourceMappingURL=./proto_view_factory.js.map