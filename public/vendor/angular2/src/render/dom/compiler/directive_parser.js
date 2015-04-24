System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/change_detection", "angular2/src/render/dom/compiler/selector", "./compile_step", "./compile_element", "./compile_control", "../../api", "../util"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      BaseException,
      assertionsEnabled,
      RegExpWrapper,
      StringWrapper,
      List,
      MapWrapper,
      ListWrapper,
      DOM,
      Parser,
      SelectorMatcher,
      CssSelector,
      CompileStep,
      CompileElement,
      CompileControl,
      DirectiveMetadata,
      dashCaseToCamelCase,
      camelCaseToDashCase,
      EVENT_TARGET_SEPARATOR,
      DirectiveParser;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      assertionsEnabled = $__m.assertionsEnabled;
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      SelectorMatcher = $__m.SelectorMatcher;
      CssSelector = $__m.CssSelector;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      dashCaseToCamelCase = $__m.dashCaseToCamelCase;
      camelCaseToDashCase = $__m.camelCaseToDashCase;
      EVENT_TARGET_SEPARATOR = $__m.EVENT_TARGET_SEPARATOR;
    }],
    execute: function() {
      DirectiveParser = $__export("DirectiveParser", (function($__super) {
        var DirectiveParser = function DirectiveParser(parser, directives) {
          assert.argumentTypes(parser, Parser, directives, assert.genericType(List, DirectiveMetadata));
          $traceurRuntime.superConstructor(DirectiveParser).call(this);
          this._parser = parser;
          this._selectorMatcher = new SelectorMatcher();
          this._directives = directives;
          for (var i = 0; i < directives.length; i++) {
            var selector = CssSelector.parse(directives[i].selector);
            this._selectorMatcher.addSelectables(selector, i);
          }
        };
        return ($traceurRuntime.createClass)(DirectiveParser, {
          process: function(parent, current, control) {
            var $__0 = this;
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            var attrs = current.attrs();
            var classList = current.classList();
            var cssSelector = new CssSelector();
            var nodeName = DOM.nodeName(current.element);
            cssSelector.setElement(nodeName);
            for (var i = 0; i < classList.length; i++) {
              cssSelector.addClassName(classList[i]);
            }
            MapWrapper.forEach(attrs, (function(attrValue, attrName) {
              cssSelector.addAttribute(attrName, attrValue);
            }));
            var viewportDirective;
            var componentDirective;
            var isTemplateElement = DOM.isTemplateElement(current.element);
            this._selectorMatcher.match(cssSelector, (function(selector, directiveIndex) {
              var elementBinder = current.bindElement();
              var directive = $__0._directives[directiveIndex];
              var directiveBinder = elementBinder.bindDirective(directiveIndex);
              current.compileChildren = current.compileChildren && directive.compileChildren;
              if (isPresent(directive.properties)) {
                MapWrapper.forEach(directive.properties, (function(bindConfig, dirProperty) {
                  $__0._bindDirectiveProperty(dirProperty, bindConfig, current, directiveBinder);
                }));
              }
              if (isPresent(directive.hostListeners)) {
                MapWrapper.forEach(directive.hostListeners, (function(action, eventName) {
                  $__0._bindDirectiveEvent(eventName, action, current, directiveBinder);
                }));
              }
              if (isPresent(directive.setters)) {
                ListWrapper.forEach(directive.setters, (function(propertyName) {
                  elementBinder.bindPropertySetter(propertyName);
                }));
              }
              if (isPresent(directive.readAttributes)) {
                ListWrapper.forEach(directive.readAttributes, (function(attrName) {
                  elementBinder.readAttribute(attrName);
                }));
              }
              if (directive.type === DirectiveMetadata.VIEWPORT_TYPE) {
                if (!isTemplateElement) {
                  throw new BaseException("Viewport directives need to be placed on <template> elements or elements " + ("with template attribute - check " + current.elementDescription));
                }
                if (isPresent(viewportDirective)) {
                  throw new BaseException(("Only one viewport directive is allowed per element - check " + current.elementDescription));
                }
                viewportDirective = directive;
              } else {
                if (isTemplateElement) {
                  throw new BaseException(("Only template directives are allowed on template elements - check " + current.elementDescription));
                }
                if (directive.type === DirectiveMetadata.COMPONENT_TYPE) {
                  if (isPresent(componentDirective)) {
                    throw new BaseException(("Only one component directive is allowed per element - check " + current.elementDescription));
                  }
                  componentDirective = directive;
                  elementBinder.setComponentId(directive.id);
                }
              }
            }));
          },
          _bindDirectiveProperty: function(dirProperty, bindConfig, compileElement, directiveBinder) {
            var pipes = this._splitBindConfig(bindConfig);
            var elProp = ListWrapper.removeAt(pipes, 0);
            var bindingAst = MapWrapper.get(compileElement.bindElement().propertyBindings, dashCaseToCamelCase(elProp));
            if (isBlank(bindingAst)) {
              var attributeValue = MapWrapper.get(compileElement.attrs(), camelCaseToDashCase(elProp));
              if (isPresent(attributeValue)) {
                bindingAst = this._parser.wrapLiteralPrimitive(attributeValue, compileElement.elementDescription);
              }
            }
            if (isPresent(bindingAst)) {
              var fullExpAstWithBindPipes = this._parser.addPipes(bindingAst, pipes);
              directiveBinder.bindProperty(dirProperty, fullExpAstWithBindPipes);
            }
          },
          _bindDirectiveEvent: function(eventName, action, compileElement, directiveBinder) {
            var ast = this._parser.parseAction(action, compileElement.elementDescription);
            if (StringWrapper.contains(eventName, EVENT_TARGET_SEPARATOR)) {
              var parts = eventName.split(EVENT_TARGET_SEPARATOR);
              directiveBinder.bindEvent(parts[1], ast, parts[0]);
            } else {
              directiveBinder.bindEvent(eventName, ast);
            }
          },
          _splitBindConfig: function(bindConfig) {
            return ListWrapper.map(bindConfig.split('|'), (function(s) {
              return s.trim();
            }));
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(DirectiveParser, "parameters", {get: function() {
          return [[Parser], [assert.genericType(List, DirectiveMetadata)]];
        }});
      Object.defineProperty(DirectiveParser.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(DirectiveParser.prototype._splitBindConfig, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=directive_parser.es6.map

//# sourceMappingURL=./directive_parser.js.map