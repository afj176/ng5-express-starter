System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/async", "angular2/src/facade/lang", "../../api", "./compile_pipeline", "angular2/src/render/dom/compiler/template_loader", "./compile_step_factory", "angular2/change_detection", "../shadow_dom/shadow_dom_strategy"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      PromiseWrapper,
      Promise,
      BaseException,
      ViewDefinition,
      ProtoViewDto,
      CompilePipeline,
      TemplateLoader,
      CompileStepFactory,
      DefaultStepFactory,
      Parser,
      ShadowDomStrategy,
      Compiler,
      DefaultCompiler;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      BaseException = $__m.BaseException;
    }, function($__m) {
      ViewDefinition = $__m.ViewDefinition;
      ProtoViewDto = $__m.ProtoViewDto;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      CompileStepFactory = $__m.CompileStepFactory;
      DefaultStepFactory = $__m.DefaultStepFactory;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }],
    execute: function() {
      Compiler = $__export("Compiler", (function() {
        var Compiler = function Compiler(stepFactory, templateLoader) {
          assert.argumentTypes(stepFactory, CompileStepFactory, templateLoader, TemplateLoader);
          this._templateLoader = templateLoader;
          this._stepFactory = stepFactory;
        };
        return ($traceurRuntime.createClass)(Compiler, {
          compile: function(template) {
            var $__0 = this;
            var tplPromise = this._templateLoader.load(template);
            return assert.returnType((PromiseWrapper.then(tplPromise, (function(el) {
              return $__0._compileTemplate(template, el);
            }), (function(_) {
              throw new BaseException(("Failed to load the template \"" + template.componentId + "\""));
            }))), assert.genericType(Promise, ProtoViewDto));
          },
          _compileTemplate: function(template, tplElement) {
            var subTaskPromises = [];
            var pipeline = new CompilePipeline(this._stepFactory.createSteps(template, subTaskPromises));
            var compileElements;
            compileElements = pipeline.process(tplElement, template.componentId);
            var protoView = compileElements[0].inheritedProtoView.build();
            if (subTaskPromises.length > 0) {
              return assert.returnType((PromiseWrapper.all(subTaskPromises).then((function(_) {
                return protoView;
              }))), assert.genericType(Promise, ProtoViewDto));
            } else {
              return assert.returnType((PromiseWrapper.resolve(protoView)), assert.genericType(Promise, ProtoViewDto));
            }
          }
        }, {});
      }()));
      Object.defineProperty(Compiler, "parameters", {get: function() {
          return [[CompileStepFactory], [TemplateLoader]];
        }});
      Object.defineProperty(Compiler.prototype.compile, "parameters", {get: function() {
          return [[ViewDefinition]];
        }});
      Object.defineProperty(Compiler.prototype._compileTemplate, "parameters", {get: function() {
          return [[ViewDefinition], []];
        }});
      DefaultCompiler = $__export("DefaultCompiler", (function($__super) {
        var DefaultCompiler = function DefaultCompiler(parser, shadowDomStrategy, templateLoader) {
          assert.argumentTypes(parser, Parser, shadowDomStrategy, ShadowDomStrategy, templateLoader, TemplateLoader);
          $traceurRuntime.superConstructor(DefaultCompiler).call(this, new DefaultStepFactory(parser, shadowDomStrategy), templateLoader);
        };
        return ($traceurRuntime.createClass)(DefaultCompiler, {}, {}, $__super);
      }(Compiler)));
      Object.defineProperty(DefaultCompiler, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(DefaultCompiler, "parameters", {get: function() {
          return [[Parser], [ShadowDomStrategy], [TemplateLoader]];
        }});
    }
  };
});
//# sourceMappingURL=compiler.es6.map

//# sourceMappingURL=./compiler.js.map