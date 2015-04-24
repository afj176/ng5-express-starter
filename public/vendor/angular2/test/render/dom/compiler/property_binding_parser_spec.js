System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/render/dom/compiler/property_binding_parser", "angular2/src/render/dom/compiler/compile_pipeline", "angular2/src/facade/collection", "angular2/src/render/dom/compiler/compile_element", "angular2/src/render/dom/compiler/compile_step", "angular2/src/render/dom/compiler/compile_control", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      PropertyBindingParser,
      CompilePipeline,
      MapWrapper,
      ListWrapper,
      CompileElement,
      CompileStep,
      CompileControl,
      Lexer,
      Parser,
      EMPTY_MAP,
      MockStep;
  function main() {
    describe('PropertyBindingParser', (function() {
      function createPipeline() {
        var hasNestedProtoView = arguments[0] !== (void 0) ? arguments[0] : false;
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          if (hasNestedProtoView) {
            current.bindElement().bindNestedProtoView(el('<template></template>'));
          }
        })), new PropertyBindingParser(new Parser(new Lexer()))]);
      }
      function process(element) {
        var hasNestedProtoView = arguments[1] !== (void 0) ? arguments[1] : false;
        return ListWrapper.map(createPipeline(hasNestedProtoView).process(element), (function(compileElement) {
          return compileElement.inheritedElementBinder;
        }));
      }
      it('should detect [] syntax', (function() {
        var results = process(el('<div [a]="b"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
      }));
      it('should detect [] syntax only if an attribute name starts and ends with []', (function() {
        expect(process(el('<div z[a]="b"></div>'))[0]).toBe(null);
        expect(process(el('<div [a]v="b"></div>'))[0]).toBe(null);
      }));
      it('should detect bind- syntax', (function() {
        var results = process(el('<div bind-a="b"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
      }));
      it('should detect bind- syntax only if an attribute name starts with bind', (function() {
        expect(process(el('<div _bind-a="b"></div>'))[0]).toEqual(null);
      }));
      it('should detect interpolation syntax', (function() {
        var results = process(el('<div a="{{b}}"></div>'));
        expect(MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('{{b}}');
      }));
      it('should detect var- syntax', (function() {
        var results = process(el('<template var-a="b"></template>'));
        expect(MapWrapper.get(results[0].variableBindings, 'b')).toEqual('a');
      }));
      it('should store variable binding for a template element on the nestedProtoView', (function() {
        var results = process(el('<template var-george="washington"></p>'), true);
        expect(results[0].variableBindings).toEqual(EMPTY_MAP);
        expect(MapWrapper.get(results[0].nestedProtoView.variableBindings, 'washington')).toEqual('george');
      }));
      it('should store variable binding for a non-template element using shorthand syntax on the nestedProtoView', (function() {
        var results = process(el('<template #george="washington"></template>'), true);
        expect(results[0].variableBindings).toEqual(EMPTY_MAP);
        expect(MapWrapper.get(results[0].nestedProtoView.variableBindings, 'washington')).toEqual('george');
      }));
      it('should store variable binding for a non-template element', (function() {
        var results = process(el('<p var-george="washington"></p>'));
        expect(MapWrapper.get(results[0].variableBindings, 'washington')).toEqual('george');
      }));
      it('should store variable binding for a non-template element using shorthand syntax', (function() {
        var results = process(el('<p #george="washington"></p>'));
        expect(MapWrapper.get(results[0].variableBindings, 'washington')).toEqual('george');
      }));
      it('should store a variable binding with an implicit value', (function() {
        var results = process(el('<p var-george></p>'));
        expect(MapWrapper.get(results[0].variableBindings, '\$implicit')).toEqual('george');
      }));
      it('should store a variable binding with an implicit value using shorthand syntax', (function() {
        var results = process(el('<p #george></p>'));
        expect(MapWrapper.get(results[0].variableBindings, '\$implicit')).toEqual('george');
      }));
      it('should detect variable bindings only if an attribute name starts with #', (function() {
        var results = process(el('<p b#george></p>'));
        expect(results[0]).toEqual(null);
      }));
      it('should detect () syntax', (function() {
        var results = process(el('<div (click)="b()"></div>'));
        var eventBinding = results[0].eventBindings[0];
        expect(eventBinding.source.source).toEqual('b()');
        expect(eventBinding.fullName).toEqual('click');
        results = process(el('<div (click[])="b()"></div>'));
        eventBinding = results[0].eventBindings[0];
        expect(eventBinding.source.source).toEqual('b()');
        expect(eventBinding.fullName).toEqual('click[]');
      }));
      it('should detect () syntax only if an attribute name starts and ends with ()', (function() {
        expect(process(el('<div z(a)="b()"></div>'))[0]).toEqual(null);
        expect(process(el('<div (a)v="b()"></div>'))[0]).toEqual(null);
      }));
      it('should parse event handlers using () syntax as actions', (function() {
        var results = process(el('<div (click)="foo=bar"></div>'));
        var eventBinding = results[0].eventBindings[0];
        expect(eventBinding.source.source).toEqual('foo=bar');
        expect(eventBinding.fullName).toEqual('click');
      }));
      it('should detect on- syntax', (function() {
        var results = process(el('<div on-click="b()"></div>'));
        var eventBinding = results[0].eventBindings[0];
        expect(eventBinding.source.source).toEqual('b()');
        expect(eventBinding.fullName).toEqual('click');
      }));
      it('should parse event handlers using on- syntax as actions', (function() {
        var results = process(el('<div on-click="foo=bar"></div>'));
        var eventBinding = results[0].eventBindings[0];
        expect(eventBinding.source.source).toEqual('foo=bar');
        expect(eventBinding.fullName).toEqual('click');
      }));
      it('should store bound properties as temporal attributes', (function() {
        var results = createPipeline().process(el('<div bind-a="b" [c]="d"></div>'));
        expect(MapWrapper.get(results[0].attrs(), 'a')).toEqual('b');
        expect(MapWrapper.get(results[0].attrs(), 'c')).toEqual('d');
      }));
      it('should store variables as temporal attributes', (function() {
        var results = createPipeline().process(el('<div var-a="b" #c="d"></div>'));
        expect(MapWrapper.get(results[0].attrs(), 'a')).toEqual('b');
        expect(MapWrapper.get(results[0].attrs(), 'c')).toEqual('d');
      }));
      it('should store working property setters', (function() {
        var element = el('<input bind-value="1">');
        var results = process(element);
        var setter = MapWrapper.get(results[0].propertySetters, 'value');
        setter(element, 'abc');
        expect(element.value).toEqual('abc');
      }));
      it('should store property setters as camel case', (function() {
        var element = el('<div bind-some-prop="1">');
        var results = process(element);
        expect(MapWrapper.get(results[0].propertySetters, 'someProp')).toBeTruthy();
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
      expect = $__m.expect;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      PropertyBindingParser = $__m.PropertyBindingParser;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
    }],
    execute: function() {
      EMPTY_MAP = MapWrapper.create();
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
    }
  };
});
//# sourceMappingURL=property_binding_parser_spec.es6.map

//# sourceMappingURL=./property_binding_parser_spec.js.map