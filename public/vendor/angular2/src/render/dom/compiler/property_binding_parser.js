System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/change_detection", "./compile_step", "./compile_element", "./compile_control", "../util"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      RegExpWrapper,
      MapWrapper,
      Parser,
      CompileStep,
      CompileElement,
      CompileControl,
      dashCaseToCamelCase,
      BIND_NAME_REGEXP,
      PropertyBindingParser;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      RegExpWrapper = $__m.RegExpWrapper;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      dashCaseToCamelCase = $__m.dashCaseToCamelCase;
    }],
    execute: function() {
      BIND_NAME_REGEXP = RegExpWrapper.create('^(?:(?:(?:(bind-)|(var-|#)|(on-))(.+))|\\[([^\\]]+)\\]|\\(([^\\)]+)\\))$');
      PropertyBindingParser = $__export("PropertyBindingParser", (function($__super) {
        var PropertyBindingParser = function PropertyBindingParser(parser) {
          assert.argumentTypes(parser, Parser);
          $traceurRuntime.superConstructor(PropertyBindingParser).call(this);
          this._parser = parser;
        };
        return ($traceurRuntime.createClass)(PropertyBindingParser, {
          process: function(parent, current, control) {
            var $__0 = this;
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            var attrs = current.attrs();
            var newAttrs = MapWrapper.create();
            MapWrapper.forEach(attrs, (function(attrValue, attrName) {
              var bindParts = RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
              if (isPresent(bindParts)) {
                if (isPresent(bindParts[1])) {
                  $__0._bindProperty(bindParts[4], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[2])) {
                  var identifier = bindParts[4];
                  var value = attrValue == '' ? '\$implicit' : attrValue;
                  $__0._bindVariable(identifier, value, current, newAttrs);
                } else if (isPresent(bindParts[3])) {
                  $__0._bindEvent(bindParts[4], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[5])) {
                  $__0._bindProperty(bindParts[5], attrValue, current, newAttrs);
                } else if (isPresent(bindParts[6])) {
                  $__0._bindEvent(bindParts[6], attrValue, current, newAttrs);
                }
              } else {
                var expr = $__0._parser.parseInterpolation(attrValue, current.elementDescription);
                if (isPresent(expr)) {
                  $__0._bindPropertyAst(attrName, expr, current, newAttrs);
                }
              }
            }));
            MapWrapper.forEach(newAttrs, (function(attrValue, attrName) {
              MapWrapper.set(attrs, attrName, attrValue);
            }));
          },
          _bindVariable: function(identifier, value, current, newAttrs) {
            assert.argumentTypes(identifier, assert.type.any, value, assert.type.any, current, CompileElement, newAttrs, assert.type.any);
            current.bindElement().bindVariable(dashCaseToCamelCase(identifier), value);
            MapWrapper.set(newAttrs, identifier, value);
          },
          _bindProperty: function(name, expression, current, newAttrs) {
            assert.argumentTypes(name, assert.type.any, expression, assert.type.any, current, CompileElement, newAttrs, assert.type.any);
            this._bindPropertyAst(name, this._parser.parseBinding(expression, current.elementDescription), current, newAttrs);
          },
          _bindPropertyAst: function(name, ast, current, newAttrs) {
            assert.argumentTypes(name, assert.type.any, ast, assert.type.any, current, CompileElement, newAttrs, assert.type.any);
            var binder = current.bindElement();
            var camelCaseName = dashCaseToCamelCase(name);
            binder.bindProperty(camelCaseName, ast);
            MapWrapper.set(newAttrs, name, ast.source);
          },
          _bindEvent: function(name, expression, current, newAttrs) {
            assert.argumentTypes(name, assert.type.any, expression, assert.type.any, current, CompileElement, newAttrs, assert.type.any);
            current.bindElement().bindEvent(dashCaseToCamelCase(name), this._parser.parseAction(expression, current.elementDescription));
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(PropertyBindingParser, "parameters", {get: function() {
          return [[Parser]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._bindVariable, "parameters", {get: function() {
          return [[], [], [CompileElement], []];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._bindProperty, "parameters", {get: function() {
          return [[], [], [CompileElement], []];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._bindPropertyAst, "parameters", {get: function() {
          return [[], [], [CompileElement], []];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._bindEvent, "parameters", {get: function() {
          return [[], [], [CompileElement], []];
        }});
    }
  };
});
//# sourceMappingURL=property_binding_parser.es6.map

//# sourceMappingURL=./property_binding_parser.js.map