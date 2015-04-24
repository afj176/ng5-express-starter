System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/render/dom/compiler/compiler", "angular2/src/render/api", "angular2/src/render/dom/compiler/compile_element", "angular2/src/render/dom/compiler/compile_step", "angular2/src/render/dom/compiler/compile_step_factory", "angular2/src/render/dom/compiler/compile_control", "angular2/src/render/dom/compiler/template_loader", "angular2/src/services/url_resolver"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      IS_DARTIUM,
      it,
      DOM,
      List,
      ListWrapper,
      Map,
      MapWrapper,
      StringMapWrapper,
      Type,
      isBlank,
      stringify,
      isPresent,
      PromiseWrapper,
      Promise,
      Compiler,
      CompilerCache,
      ProtoViewDto,
      ViewDefinition,
      CompileElement,
      CompileStep,
      CompileStepFactory,
      CompileControl,
      TemplateLoader,
      UrlResolver,
      MockStepFactory,
      MockStep,
      EMPTY_STEP,
      FakeTemplateLoader;
  function runCompilerCommonTests() {
    describe('compiler', function() {
      var mockStepFactory;
      function createCompiler(processClosure) {
        var urlData = arguments[1] !== (void 0) ? arguments[1] : null;
        if (isBlank(urlData)) {
          urlData = MapWrapper.create();
        }
        var tplLoader = new FakeTemplateLoader(urlData);
        mockStepFactory = new MockStepFactory([new MockStep(processClosure)]);
        return new Compiler(mockStepFactory, tplLoader);
      }
      it('should run the steps and build the AppProtoView of the root element', inject([AsyncTestCompleter], (function(async) {
        var compiler = createCompiler((function(parent, current, control) {
          current.inheritedProtoView.bindVariable('b', 'a');
        }));
        compiler.compile(new ViewDefinition({
          componentId: 'someComponent',
          template: '<div></div>'
        })).then((function(protoView) {
          expect(protoView.variableBindings).toEqual(MapWrapper.createFromStringMap({'a': 'b'}));
          async.done();
        }));
      })));
      it('should use the inline template and compile in sync', inject([AsyncTestCompleter], (function(async) {
        var compiler = createCompiler(EMPTY_STEP);
        compiler.compile(new ViewDefinition({
          componentId: 'someId',
          template: 'inline component'
        })).then((function(protoView) {
          expect(DOM.getInnerHTML(protoView.render.delegate.element)).toEqual('inline component');
          async.done();
        }));
      })));
      it('should load url templates', inject([AsyncTestCompleter], (function(async) {
        var urlData = MapWrapper.createFromStringMap({'someUrl': 'url component'});
        var compiler = createCompiler(EMPTY_STEP, urlData);
        compiler.compile(new ViewDefinition({
          componentId: 'someId',
          absUrl: 'someUrl'
        })).then((function(protoView) {
          expect(DOM.getInnerHTML(protoView.render.delegate.element)).toEqual('url component');
          async.done();
        }));
      })));
      it('should report loading errors', inject([AsyncTestCompleter], (function(async) {
        var compiler = createCompiler(EMPTY_STEP, MapWrapper.create());
        PromiseWrapper.catchError(compiler.compile(new ViewDefinition({
          componentId: 'someId',
          absUrl: 'someUrl'
        })), (function(e) {
          expect(e.message).toContain("Failed to load the template \"someId\"");
          async.done();
        }));
      })));
      it('should wait for async subtasks to be resolved', inject([AsyncTestCompleter], (function(async) {
        var subTasksCompleted = false;
        var completer = PromiseWrapper.completer();
        var compiler = createCompiler((function(parent, current, control) {
          ListWrapper.push(mockStepFactory.subTaskPromises, completer.promise.then((function(_) {
            subTasksCompleted = true;
          })));
        }));
        var pvPromise = compiler.compile(new ViewDefinition({
          componentId: 'someId',
          template: 'some component'
        }));
        expect(pvPromise).toBePromise();
        expect(subTasksCompleted).toEqual(false);
        completer.resolve(null);
        pvPromise.then((function(protoView) {
          expect(subTasksCompleted).toEqual(true);
          async.done();
        }));
      })));
    });
  }
  $__export("runCompilerCommonTests", runCompilerCommonTests);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      IS_DARTIUM = $__m.IS_DARTIUM;
      it = $__m.it;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      stringify = $__m.stringify;
      isPresent = $__m.isPresent;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      ProtoViewDto = $__m.ProtoViewDto;
      ViewDefinition = $__m.ViewDefinition;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileStepFactory = $__m.CompileStepFactory;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }],
    execute: function() {
      MockStepFactory = (function($__super) {
        var MockStepFactory = function MockStepFactory(steps) {
          $traceurRuntime.superConstructor(MockStepFactory).call(this);
          this.steps = steps;
        };
        return ($traceurRuntime.createClass)(MockStepFactory, {createSteps: function(template, subTaskPromises) {
            this.subTaskPromises = subTaskPromises;
            ListWrapper.forEach(this.subTaskPromises, (function(p) {
              return ListWrapper.push(subTaskPromises, p);
            }));
            return this.steps;
          }}, {}, $__super);
      }(CompileStepFactory));
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      EMPTY_STEP = (function(parent, current, control) {
        if (isPresent(parent)) {
          current.inheritedProtoView = parent.inheritedProtoView;
        }
      });
      FakeTemplateLoader = (function($__super) {
        var FakeTemplateLoader = function FakeTemplateLoader(urlData) {
          $traceurRuntime.superConstructor(FakeTemplateLoader).call(this, null, new UrlResolver());
          this._urlData = urlData;
        };
        return ($traceurRuntime.createClass)(FakeTemplateLoader, {load: function(template) {
            assert.argumentTypes(template, ViewDefinition);
            if (isPresent(template.template)) {
              return PromiseWrapper.resolve(DOM.createTemplate(template.template));
            }
            if (isPresent(template.absUrl)) {
              var content = MapWrapper.get(this._urlData, template.absUrl);
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
    }
  };
});
//# sourceMappingURL=compiler_common_tests.es6.map

//# sourceMappingURL=./compiler_common_tests.js.map