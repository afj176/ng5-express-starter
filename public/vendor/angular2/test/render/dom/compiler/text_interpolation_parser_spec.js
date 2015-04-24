System.register(["angular2/test_lib", "angular2/src/render/dom/compiler/text_interpolation_parser", "angular2/src/render/dom/compiler/compile_pipeline", "angular2/src/facade/collection", "angular2/change_detection", "./pipeline_spec"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      expect,
      it,
      iit,
      ddescribe,
      el,
      TextInterpolationParser,
      CompilePipeline,
      MapWrapper,
      ListWrapper,
      Lexer,
      Parser,
      IgnoreChildrenStep;
  function main() {
    describe('TextInterpolationParser', (function() {
      function createPipeline() {
        return new CompilePipeline([new IgnoreChildrenStep(), new TextInterpolationParser(new Parser(new Lexer()))]);
      }
      function process(element) {
        return ListWrapper.map(createPipeline().process(element), (function(compileElement) {
          return compileElement.inheritedElementBinder;
        }));
      }
      function assertTextBinding(elementBinder, bindingIndex, nodeIndex, expression) {
        expect(elementBinder.textBindings[bindingIndex].source).toEqual(expression);
        expect(elementBinder.textBindingIndices[bindingIndex]).toEqual(nodeIndex);
      }
      it('should find text interpolation in normal elements', (function() {
        var result = process(el('<div>{{expr1}}<span></span>{{expr2}}</div>'))[0];
        assertTextBinding(result, 0, 0, "{{expr1}}");
        assertTextBinding(result, 1, 2, "{{expr2}}");
      }));
      it('should find text interpolation in template elements', (function() {
        var result = process(el('<template>{{expr1}}<span></span>{{expr2}}</template>'))[0];
        assertTextBinding(result, 0, 0, "{{expr1}}");
        assertTextBinding(result, 1, 2, "{{expr2}}");
      }));
      it('should allow multiple expressions', (function() {
        var result = process(el('<div>{{expr1}}{{expr2}}</div>'))[0];
        assertTextBinding(result, 0, 0, "{{expr1}}{{expr2}}");
      }));
      it('should not interpolate when compileChildren is false', (function() {
        var results = process(el('<div>{{included}}<span ignore-children>{{excluded}}</span></div>'));
        assertTextBinding(results[0], 0, 0, "{{included}}");
        expect(results[1]).toBe(results[0]);
      }));
      it('should allow fixed text before, in between and after expressions', (function() {
        var result = process(el('<div>a{{expr1}}b{{expr2}}c</div>'))[0];
        assertTextBinding(result, 0, 0, "a{{expr1}}b{{expr2}}c");
      }));
      it('should escape quotes in fixed parts', (function() {
        var result = process(el("<div>'\"a{{expr1}}</div>"))[0];
        assertTextBinding(result, 0, 0, "'\"a{{expr1}}");
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      expect = $__m.expect;
      it = $__m.it;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      TextInterpolationParser = $__m.TextInterpolationParser;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
    }, function($__m) {
      IgnoreChildrenStep = $__m.IgnoreChildrenStep;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=text_interpolation_parser_spec.es6.map

//# sourceMappingURL=./text_interpolation_parser_spec.js.map