System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/render/dom/compiler/view_splitter", "angular2/src/render/dom/compiler/compile_pipeline", "angular2/src/dom/dom_adapter", "angular2/change_detection"], function($__export) {
  "use strict";
  var describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      MapWrapper,
      ViewSplitter,
      CompilePipeline,
      DOM,
      Lexer,
      Parser;
  function main() {
    describe('ViewSplitter', (function() {
      function createPipeline() {
        return new CompilePipeline([new ViewSplitter(new Parser(new Lexer()))]);
      }
      describe('<template> elements', (function() {
        it('should move the content into a new <template> element and mark that as viewRoot', (function() {
          var rootElement = el('<div><template if="true">a</template></div>');
          var results = createPipeline().process(rootElement);
          expect(DOM.getOuterHTML(results[1].element)).toEqual('<template if="true" class="ng-binding"></template>');
          expect(results[1].isViewRoot).toBe(false);
          expect(DOM.getOuterHTML(results[2].element)).toEqual('<template>a</template>');
          expect(results[2].isViewRoot).toBe(true);
        }));
        it('should mark the new <template> element as viewRoot', (function() {
          var rootElement = el('<div><template if="true">a</template></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].isViewRoot).toBe(true);
        }));
        it('should not wrap the root element', (function() {
          var rootElement = el('<div></div>');
          var results = createPipeline().process(rootElement);
          expect(results.length).toBe(1);
          expect(DOM.getOuterHTML(rootElement)).toEqual('<div></div>');
        }));
        it('should copy over the elementDescription', (function() {
          var rootElement = el('<div><template if="true">a</template></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].elementDescription).toBe(results[1].elementDescription);
        }));
        it('should clean out the inheritedElementBinder', (function() {
          var rootElement = el('<div><template if="true">a</template></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedElementBinder).toBe(null);
        }));
        it('should create a nestedProtoView', (function() {
          var rootElement = el('<div><template if="true">a</template></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedProtoView).not.toBe(null);
          expect(results[2].inheritedProtoView).toBe(results[1].inheritedElementBinder.nestedProtoView);
          expect(DOM.getOuterHTML(results[2].inheritedProtoView.rootElement)).toEqual('<template>a</template>');
        }));
      }));
      describe('elements with template attribute', (function() {
        it('should replace the element with an empty <template> element', (function() {
          var rootElement = el('<div><span template=""></span></div>');
          var originalChild = rootElement.childNodes[0];
          var results = createPipeline().process(rootElement);
          expect(results[0].element).toBe(rootElement);
          expect(DOM.getOuterHTML(results[0].element)).toEqual('<div><template class="ng-binding"></template></div>');
          expect(DOM.getOuterHTML(results[2].element)).toEqual('<span template=""></span>');
          expect(results[2].element).toBe(originalChild);
        }));
        it('should work with top-level template node', (function() {
          var rootElement = el('<template><div template>x</div></template>');
          var originalChild = DOM.content(rootElement).childNodes[0];
          var results = createPipeline().process(rootElement);
          expect(results[0].element).toBe(rootElement);
          expect(results[0].isViewRoot).toBe(true);
          expect(results[2].isViewRoot).toBe(true);
          expect(DOM.getOuterHTML(results[0].element)).toEqual('<template><template class="ng-binding"></template></template>');
          expect(results[2].element).toBe(originalChild);
        }));
        it('should mark the element as viewRoot', (function() {
          var rootElement = el('<div><div template></div></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].isViewRoot).toBe(true);
        }));
        it('should add property bindings from the template attribute', (function() {
          var rootElement = el('<div><div template="some-prop:expr"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(MapWrapper.get(results[1].inheritedElementBinder.propertyBindings, 'someProp').source).toEqual('expr');
          expect(MapWrapper.get(results[1].attrs(), 'some-prop')).toEqual('expr');
        }));
        it('should add variable mappings from the template attribute to the nestedProtoView', (function() {
          var rootElement = el('<div><div template="var var-name=mapName"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedProtoView.variableBindings).toEqual(MapWrapper.createFromStringMap({'mapName': 'varName'}));
        }));
        it('should add entries without value as attributes to the element', (function() {
          var rootElement = el('<div><div template="varname"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(MapWrapper.get(results[1].attrs(), 'varname')).toEqual('');
          expect(results[1].inheritedElementBinder.propertyBindings).toEqual(MapWrapper.create());
          expect(results[1].inheritedElementBinder.variableBindings).toEqual(MapWrapper.create());
        }));
        it('should iterate properly after a template dom modification', (function() {
          var rootElement = el('<div><div template></div><after></after></div>');
          var results = createPipeline().process(rootElement);
          expect(results.length).toEqual(4);
        }));
        it('should copy over the elementDescription', (function() {
          var rootElement = el('<div><span template=""></span></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].elementDescription).toBe(results[1].elementDescription);
        }));
        it('should clean out the inheritedElementBinder', (function() {
          var rootElement = el('<div><span template=""></span></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedElementBinder).toBe(null);
        }));
        it('should create a nestedProtoView', (function() {
          var rootElement = el('<div><span template=""></span></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedProtoView).not.toBe(null);
          expect(results[2].inheritedProtoView).toBe(results[1].inheritedElementBinder.nestedProtoView);
          expect(DOM.getOuterHTML(results[2].inheritedProtoView.rootElement)).toEqual('<span template=""></span>');
        }));
      }));
      describe('elements with *directive_name attribute', (function() {
        it('should replace the element with an empty <template> element', (function() {
          var rootElement = el('<div><span *if></span></div>');
          var originalChild = rootElement.childNodes[0];
          var results = createPipeline().process(rootElement);
          expect(results[0].element).toBe(rootElement);
          expect(DOM.getOuterHTML(results[0].element)).toEqual('<div><template class="ng-binding" if=""></template></div>');
          expect(DOM.getOuterHTML(results[2].element)).toEqual('<span *if=""></span>');
          expect(results[2].element).toBe(originalChild);
        }));
        it('should mark the element as viewRoot', (function() {
          var rootElement = el('<div><div *foo="bar"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].isViewRoot).toBe(true);
        }));
        it('should work with top-level template node', (function() {
          var rootElement = el('<template><div *foo>x</div></template>');
          var originalChild = DOM.content(rootElement).childNodes[0];
          var results = createPipeline().process(rootElement);
          expect(results[0].element).toBe(rootElement);
          expect(results[0].isViewRoot).toBe(true);
          expect(results[2].isViewRoot).toBe(true);
          expect(DOM.getOuterHTML(results[0].element)).toEqual('<template><template class="ng-binding" foo=""></template></template>');
          expect(results[2].element).toBe(originalChild);
        }));
        it('should add property bindings from the template attribute', (function() {
          var rootElement = el('<div><div *prop="expr"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(MapWrapper.get(results[1].inheritedElementBinder.propertyBindings, 'prop').source).toEqual('expr');
          expect(MapWrapper.get(results[1].attrs(), 'prop')).toEqual('expr');
        }));
        it('should add variable mappings from the template attribute to the nestedProtoView', (function() {
          var rootElement = el('<div><div *foreach="var varName=mapName"></div></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedProtoView.variableBindings).toEqual(MapWrapper.createFromStringMap({'mapName': 'varName'}));
        }));
        it('should add entries without value as attribute to the element', (function() {
          var rootElement = el('<div><div *varname></div></div>');
          var results = createPipeline().process(rootElement);
          expect(MapWrapper.get(results[1].attrs(), 'varname')).toEqual('');
          expect(results[1].inheritedElementBinder.propertyBindings).toEqual(MapWrapper.create());
          expect(results[1].inheritedElementBinder.variableBindings).toEqual(MapWrapper.create());
        }));
        it('should iterate properly after a template dom modification', (function() {
          var rootElement = el('<div><div *foo></div><after></after></div>');
          var results = createPipeline().process(rootElement);
          expect(results.length).toEqual(4);
        }));
        it('should copy over the elementDescription', (function() {
          var rootElement = el('<div><span *foo></span></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].elementDescription).toBe(results[1].elementDescription);
        }));
        it('should clean out the inheritedElementBinder', (function() {
          var rootElement = el('<div><span *foo></span></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedElementBinder).toBe(null);
        }));
        it('should create a nestedProtoView', (function() {
          var rootElement = el('<div><span *foo></span></div>');
          var results = createPipeline().process(rootElement);
          expect(results[2].inheritedProtoView).not.toBe(null);
          expect(results[2].inheritedProtoView).toBe(results[1].inheritedElementBinder.nestedProtoView);
          expect(DOM.getOuterHTML(results[2].inheritedProtoView.rootElement)).toEqual('<span *foo=""></span>');
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ViewSplitter = $__m.ViewSplitter;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=view_splitter_spec.es6.map

//# sourceMappingURL=./view_splitter_spec.js.map