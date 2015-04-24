System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/change_detection", "../../api", "./compile_step", "./property_binding_parser", "./text_interpolation_parser", "./directive_parser", "./view_splitter", "../shadow_dom/shadow_dom_compile_step", "../shadow_dom/shadow_dom_strategy"], function($__export) {
  "use strict";
  var assert,
      List,
      Promise,
      Parser,
      ViewDefinition,
      CompileStep,
      PropertyBindingParser,
      TextInterpolationParser,
      DirectiveParser,
      ViewSplitter,
      ShadowDomCompileStep,
      ShadowDomStrategy,
      CompileStepFactory,
      DefaultStepFactory;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      Promise = $__m.Promise;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      ViewDefinition = $__m.ViewDefinition;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      PropertyBindingParser = $__m.PropertyBindingParser;
    }, function($__m) {
      TextInterpolationParser = $__m.TextInterpolationParser;
    }, function($__m) {
      DirectiveParser = $__m.DirectiveParser;
    }, function($__m) {
      ViewSplitter = $__m.ViewSplitter;
    }, function($__m) {
      ShadowDomCompileStep = $__m.ShadowDomCompileStep;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }],
    execute: function() {
      CompileStepFactory = $__export("CompileStepFactory", (function() {
        var CompileStepFactory = function CompileStepFactory() {
          ;
        };
        return ($traceurRuntime.createClass)(CompileStepFactory, {createSteps: function(template, subTaskPromises) {
            assert.argumentTypes(template, ViewDefinition, subTaskPromises, assert.genericType(List, Promise));
            return assert.returnType((null), assert.genericType(List, CompileStep));
          }}, {});
      }()));
      Object.defineProperty(CompileStepFactory.prototype.createSteps, "parameters", {get: function() {
          return [[ViewDefinition], [assert.genericType(List, Promise)]];
        }});
      DefaultStepFactory = $__export("DefaultStepFactory", (function($__super) {
        var DefaultStepFactory = function DefaultStepFactory(parser, shadowDomStrategy) {
          assert.argumentTypes(parser, Parser, shadowDomStrategy, assert.type.any);
          $traceurRuntime.superConstructor(DefaultStepFactory).call(this);
          this._parser = parser;
          this._shadowDomStrategy = shadowDomStrategy;
        };
        return ($traceurRuntime.createClass)(DefaultStepFactory, {createSteps: function(template, subTaskPromises) {
            assert.argumentTypes(template, ViewDefinition, subTaskPromises, assert.genericType(List, Promise));
            return [new ViewSplitter(this._parser), new PropertyBindingParser(this._parser), new DirectiveParser(this._parser, template.directives), new TextInterpolationParser(this._parser), new ShadowDomCompileStep(this._shadowDomStrategy, template, subTaskPromises)];
          }}, {}, $__super);
      }(CompileStepFactory)));
      Object.defineProperty(DefaultStepFactory, "parameters", {get: function() {
          return [[Parser], []];
        }});
      Object.defineProperty(DefaultStepFactory.prototype.createSteps, "parameters", {get: function() {
          return [[ViewDefinition], [assert.genericType(List, Promise)]];
        }});
    }
  };
});
//# sourceMappingURL=compile_step_factory.es6.map

//# sourceMappingURL=./compile_step_factory.js.map