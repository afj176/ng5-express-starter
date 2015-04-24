System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/render/dom/compiler/directive_parser", "angular2/src/render/dom/compiler/compile_pipeline", "angular2/src/render/dom/compiler/compile_step", "angular2/src/render/dom/compiler/compile_element", "angular2/src/render/dom/compiler/compile_control", "angular2/src/render/api", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      xit,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      assertionsEnabled,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      DirectiveParser,
      CompilePipeline,
      CompileStep,
      CompileElement,
      CompileControl,
      ViewDefinition,
      DirectiveMetadata,
      Lexer,
      Parser,
      MockStep,
      someComponent,
      someComponent2,
      someComponent3,
      someViewport,
      someViewport2,
      someDecorator,
      someDecoratorIgnoringChildren,
      someDecoratorWithProps,
      someDecoratorWithHostProperties,
      someDecoratorWithEvents,
      someDecoratorWithGlobalEvents;
  function main() {
    describe('DirectiveParser', (function() {
      var parser,
          annotatedDirectives;
      beforeEach((function() {
        annotatedDirectives = [someComponent, someComponent2, someComponent3, someViewport, someViewport2, someDecorator, someDecoratorIgnoringChildren, someDecoratorWithProps, someDecoratorWithHostProperties, someDecoratorWithEvents, someDecoratorWithGlobalEvents];
        parser = new Parser(new Lexer());
      }));
      function createPipeline() {
        var propertyBindings = arguments[0] !== (void 0) ? arguments[0] : null;
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (isPresent(propertyBindings)) {
            StringMapWrapper.forEach(propertyBindings, (function(ast, name) {
              current.bindElement().bindProperty(name, ast);
            }));
          }
        })), new DirectiveParser(parser, annotatedDirectives)]);
      }
      function process(el) {
        var propertyBindings = arguments[1] !== (void 0) ? arguments[1] : null;
        var pipeline = createPipeline(propertyBindings);
        return ListWrapper.map(pipeline.process(el), (function(ce) {
          return ce.inheritedElementBinder;
        }));
      }
      it('should not add directives if they are not used', (function() {
        var results = process(el('<div></div>'));
        expect(results[0]).toBe(null);
      }));
      it('should detect directives in attributes', (function() {
        var results = process(el('<div some-decor></div>'));
        expect(results[0].directives[0].directiveIndex).toBe(annotatedDirectives.indexOf(someDecorator));
      }));
      it('should detect directives with multiple attributes', (function() {
        var results = process(el('<input type=text control=one></input>'));
        expect(results[0].directives[0].directiveIndex).toBe(annotatedDirectives.indexOf(someComponent3));
      }));
      it('should compile children by default', (function() {
        var results = createPipeline().process(el('<div some-decor></div>'));
        expect(results[0].compileChildren).toEqual(true);
      }));
      it('should stop compiling children when specified in the directive config', (function() {
        var results = createPipeline().process(el('<div some-decor-ignoring-children></div>'));
        expect(results[0].compileChildren).toEqual(false);
      }));
      it('should bind directive properties from bound properties', (function() {
        var results = process(el('<div some-decor-props></div>'), {'elProp': parser.parseBinding('someExpr', '')});
        var directiveBinding = results[0].directives[0];
        expect(MapWrapper.get(directiveBinding.propertyBindings, 'dirProp').source).toEqual('someExpr');
      }));
      it('should bind directive properties with pipes', (function() {
        var results = process(el('<div some-decor-props></div>'), {'elProp': parser.parseBinding('someExpr', '')});
        var directiveBinding = results[0].directives[0];
        var pipedProp = MapWrapper.get(directiveBinding.propertyBindings, 'doubleProp');
        var simpleProp = MapWrapper.get(directiveBinding.propertyBindings, 'dirProp');
        expect(pipedProp.ast.name).toEqual('double');
        expect(pipedProp.ast.exp).toEqual(simpleProp.ast);
        expect(simpleProp.source).toEqual('someExpr');
      }));
      it('should bind directive properties from attribute values', (function() {
        var results = process(el('<div some-decor-props el-prop="someValue"></div>'));
        var directiveBinding = results[0].directives[0];
        var simpleProp = MapWrapper.get(directiveBinding.propertyBindings, 'dirProp');
        expect(simpleProp.source).toEqual('someValue');
      }));
      it('should bind host directive properties', (function() {
        var element = el('<input some-decor-with-host-props>');
        var results = process(element);
        var directiveBinding = results[0].directives[0];
        var ast = MapWrapper.get(directiveBinding.hostPropertyBindings, 'hostProperty');
        expect(ast.source).toEqual('dirProp');
      }));
      it('should read attribute values', (function() {
        var element = el('<input some-decor-props some-attr="someValue">');
        var results = process(element);
        expect(MapWrapper.get(results[0].readAttributes, 'some-attr')).toEqual('someValue');
      }));
      it('should bind directive events', (function() {
        var results = process(el('<div some-decor-events></div>'));
        var directiveBinding = results[0].directives[0];
        expect(directiveBinding.eventBindings.length).toEqual(1);
        var eventBinding = directiveBinding.eventBindings[0];
        expect(eventBinding.fullName).toEqual('click');
        expect(eventBinding.source.source).toEqual('doIt()');
      }));
      it('should bind directive global events', (function() {
        var results = process(el('<div some-decor-globalevents></div>'));
        var directiveBinding = results[0].directives[0];
        expect(directiveBinding.eventBindings.length).toEqual(1);
        var eventBinding = directiveBinding.eventBindings[0];
        expect(eventBinding.fullName).toEqual('window:resize');
        expect(eventBinding.source.source).toEqual('doItGlobal()');
      }));
      describe('viewport directives', (function() {
        it('should not allow multiple viewport directives on the same element', (function() {
          expect((function() {
            process(el('<template some-vp some-vp2></template>'));
          })).toThrowError('Only one viewport directive is allowed per element - check ' + (assertionsEnabled() ? '<template some-vp some-vp2>' : 'null'));
        }));
        it('should not allow viewport directives on non <template> elements', (function() {
          expect((function() {
            process(el('<div some-vp></div>'));
          })).toThrowError('Viewport directives need to be placed on <template> elements or elements with template attribute - check ' + (assertionsEnabled() ? '<div some-vp>' : 'null'));
        }));
      }));
      describe('component directives', (function() {
        it('should save the component id', (function() {
          var results = process(el('<div some-comp></div>'));
          expect(results[0].componentId).toEqual('someComponent');
        }));
        it('should not allow multiple component directives on the same element', (function() {
          expect((function() {
            process(el('<div some-comp some-comp2></div>'));
          })).toThrowError('Only one component directive is allowed per element - check ' + (assertionsEnabled() ? '<div some-comp some-comp2>' : 'null'));
        }));
        it('should not allow component directives on <template> elements', (function() {
          expect((function() {
            process(el('<template some-comp></template>'));
          })).toThrowError('Only template directives are allowed on template elements - check ' + (assertionsEnabled() ? '<template some-comp>' : 'null'));
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      xit = $__m.xit;
      expect = $__m.expect;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      isPresent = $__m.isPresent;
      assertionsEnabled = $__m.assertionsEnabled;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      DirectiveParser = $__m.DirectiveParser;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      ViewDefinition = $__m.ViewDefinition;
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
    }],
    execute: function() {
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
      someComponent = new DirectiveMetadata({
        selector: '[some-comp]',
        id: 'someComponent',
        type: DirectiveMetadata.COMPONENT_TYPE
      });
      someComponent2 = new DirectiveMetadata({
        selector: '[some-comp2]',
        id: 'someComponent2',
        type: DirectiveMetadata.COMPONENT_TYPE
      });
      someComponent3 = new DirectiveMetadata({
        selector: 'input[type=text][control]',
        id: 'someComponent3',
        type: DirectiveMetadata.COMPONENT_TYPE
      });
      someViewport = new DirectiveMetadata({
        selector: '[some-vp]',
        id: 'someViewport',
        type: DirectiveMetadata.VIEWPORT_TYPE
      });
      someViewport2 = new DirectiveMetadata({
        selector: '[some-vp2]',
        id: 'someViewport2',
        type: DirectiveMetadata.VIEWPORT_TYPE
      });
      someDecorator = new DirectiveMetadata({selector: '[some-decor]'});
      someDecoratorIgnoringChildren = new DirectiveMetadata({
        selector: '[some-decor-ignoring-children]',
        compileChildren: false
      });
      someDecoratorWithProps = new DirectiveMetadata({
        selector: '[some-decor-props]',
        properties: MapWrapper.createFromStringMap({
          'dirProp': 'elProp',
          'doubleProp': 'elProp | double'
        }),
        readAttributes: ['some-attr']
      });
      someDecoratorWithHostProperties = new DirectiveMetadata({
        selector: '[some-decor-with-host-props]',
        hostProperties: MapWrapper.createFromStringMap({'dirProp': 'hostProperty'})
      });
      someDecoratorWithEvents = new DirectiveMetadata({
        selector: '[some-decor-events]',
        hostListeners: MapWrapper.createFromStringMap({'click': 'doIt()'})
      });
      someDecoratorWithGlobalEvents = new DirectiveMetadata({
        selector: '[some-decor-globalevents]',
        hostListeners: MapWrapper.createFromStringMap({'window:resize': 'doItGlobal()'})
      });
    }
  };
});
//# sourceMappingURL=directive_parser_spec.es6.map

//# sourceMappingURL=./directive_parser_spec.js.map