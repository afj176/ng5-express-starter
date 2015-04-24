System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/render/api", "./integration_testbed"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      el,
      elementText,
      expect,
      iit,
      inject,
      it,
      xit,
      SpyObject,
      DOM,
      ProtoViewDto,
      ViewDefinition,
      ViewContainerRef,
      EventDispatcher,
      DirectiveMetadata,
      IntegrationTestbed,
      LoggingEventDispatcher,
      FakeEvent,
      someComponent;
  function main() {
    describe('DirectDomRenderer integration', (function() {
      var testbed,
          renderer,
          eventPlugin,
          compileRoot,
          rootEl;
      beforeEach((function() {
        rootEl = el('<div></div>');
      }));
      function createRenderer() {
        var $__0 = arguments[0] !== (void 0) ? arguments[0] : {},
            urlData = $__0.urlData,
            viewCacheCapacity = $__0.viewCacheCapacity,
            shadowDomStrategy = $__0.shadowDomStrategy,
            templates = $__0.templates;
        testbed = new IntegrationTestbed({
          urlData: urlData,
          viewCacheCapacity: viewCacheCapacity,
          shadowDomStrategy: shadowDomStrategy,
          templates: templates
        });
        renderer = testbed.renderer;
        eventPlugin = testbed.eventPlugin;
        compileRoot = (function(componentId) {
          return testbed.compileRoot(componentId);
        });
      }
      it('should create host views while using the given elements in place', inject([AsyncTestCompleter], (function(async) {
        createRenderer();
        renderer.createHostProtoView('someComponentId').then((function(rootProtoView) {
          expect(rootProtoView.elementBinders[0].directives[0].directiveIndex).toBe(0);
          var viewRefs = renderer.createInPlaceHostView(null, rootEl, rootProtoView.render);
          expect(viewRefs.length).toBe(1);
          expect(viewRefs[0].delegate.rootNodes[0]).toEqual(rootEl);
          async.done();
        }));
      })));
      it('should create imperative proto views', inject([AsyncTestCompleter], (function(async) {
        createRenderer();
        renderer.createImperativeComponentProtoView('someRenderId').then((function(rootProtoView) {
          expect(rootProtoView.elementBinders).toEqual([]);
          expect(rootProtoView.render.delegate.imperativeRendererId).toBe('someRenderId');
          async.done();
        }));
      })));
      it('should add a static component', inject([AsyncTestCompleter], (function(async) {
        createRenderer();
        renderer.createHostProtoView('someComponentId').then((function(rootProtoView) {
          var template = new ViewDefinition({
            componentId: 'someComponent',
            template: 'hello',
            directives: []
          });
          renderer.compile(template).then((function(pv) {
            renderer.mergeChildComponentProtoViews(rootProtoView.render, [pv.render]);
            renderer.createInPlaceHostView(null, rootEl, rootProtoView.render);
            expect(rootEl).toHaveText('hello');
            async.done();
          }));
        }));
      })));
      it('should add a a dynamic component', inject([AsyncTestCompleter], (function(async) {
        createRenderer();
        renderer.createHostProtoView('someComponentId').then((function(rootProtoView) {
          var template = new ViewDefinition({
            componentId: 'someComponent',
            template: 'hello',
            directives: []
          });
          renderer.compile(template).then((function(pv) {
            var rootViewRef = renderer.createInPlaceHostView(null, rootEl, rootProtoView.render)[0];
            renderer.createDynamicComponentView(rootViewRef, 0, pv.render)[0];
            expect(rootEl).toHaveText('hello');
            async.done();
          }));
        }));
      })));
      it('should update text nodes', inject([AsyncTestCompleter], (function(async) {
        createRenderer({templates: [new ViewDefinition({
            componentId: 'someComponent',
            template: '{{a}}',
            directives: []
          })]});
        compileRoot('someComponent').then((function(rootProtoView) {
          var viewRefs = renderer.createInPlaceHostView(null, rootEl, rootProtoView.render);
          renderer.setText(viewRefs[1], 0, 'hello');
          expect(rootEl).toHaveText('hello');
          async.done();
        }));
      })));
      it('should update element properties', inject([AsyncTestCompleter], (function(async) {
        createRenderer({templates: [new ViewDefinition({
            componentId: 'someComponent',
            template: '<input [value]="someProp">',
            directives: []
          })]});
        compileRoot('someComponent').then((function(rootProtoView) {
          var viewRefs = renderer.createInPlaceHostView(null, rootEl, rootProtoView.render);
          renderer.setElementProperty(viewRefs[1], 0, 'value', 'hello');
          expect(DOM.childNodes(rootEl)[0].value).toEqual('hello');
          async.done();
        }));
      })));
      it('should add and remove views to and from containers', inject([AsyncTestCompleter], (function(async) {
        createRenderer({templates: [new ViewDefinition({
            componentId: 'someComponent',
            template: '<template>hello</template>',
            directives: []
          })]});
        compileRoot('someComponent').then((function(rootProtoView) {
          var viewRef = renderer.createInPlaceHostView(null, rootEl, rootProtoView.render)[1];
          var vcProtoViewRef = rootProtoView.elementBinders[0].nestedProtoView.elementBinders[0].nestedProtoView.render;
          var vcRef = new ViewContainerRef(viewRef, 0);
          expect(rootEl).toHaveText('');
          var childViewRef = renderer.createViewInContainer(vcRef, 0, vcProtoViewRef)[0];
          expect(rootEl).toHaveText('hello');
          renderer.detachViewFromContainer(vcRef, 0);
          expect(rootEl).toHaveText('');
          renderer.insertViewIntoContainer(vcRef, 0, childViewRef);
          expect(rootEl).toHaveText('hello');
          renderer.destroyViewInContainer(vcRef, 0);
          expect(rootEl).toHaveText('');
          async.done();
        }));
      })));
      it('should cache views', inject([AsyncTestCompleter], (function(async) {
        createRenderer({
          templates: [new ViewDefinition({
            componentId: 'someComponent',
            template: '<template>hello</template>',
            directives: []
          })],
          viewCacheCapacity: 2
        });
        compileRoot('someComponent').then((function(rootProtoView) {
          var viewRef = renderer.createInPlaceHostView(null, rootEl, rootProtoView.render)[1];
          var vcProtoViewRef = rootProtoView.elementBinders[0].nestedProtoView.elementBinders[0].nestedProtoView.render;
          var vcRef = new ViewContainerRef(viewRef, 0);
          var viewRef1 = renderer.createViewInContainer(vcRef, 0, vcProtoViewRef)[0];
          renderer.destroyViewInContainer(vcRef, 0);
          var viewRef2 = renderer.createViewInContainer(vcRef, 0, vcProtoViewRef)[0];
          var viewRef3 = renderer.createViewInContainer(vcRef, 0, vcProtoViewRef)[0];
          expect(viewRef2.delegate).toBe(viewRef1.delegate);
          expect(viewRef3.delegate).not.toBe(viewRef1.delegate);
          async.done();
        }));
      })));
      xit('should handle events', inject([AsyncTestCompleter], (function(async) {
        createRenderer({templates: [new ViewDefinition({
            componentId: 'someComponent',
            template: '<input (change)="$event.target.value">',
            directives: []
          })]});
        compileRoot('someComponent').then((function(rootProtoView) {
          var viewRef = renderer.createInPlaceHostView(null, rootEl, rootProtoView.render)[1];
          var dispatcher = new LoggingEventDispatcher();
          renderer.setEventDispatcher(viewRef, dispatcher);
          var inputEl = DOM.childNodes(rootEl)[0];
          inputEl.value = 'hello';
          eventPlugin.dispatchEvent('change', new FakeEvent(inputEl));
          expect(dispatcher.log).toEqual([[0, 'change', ['hello']]]);
          async.done();
        }));
      })));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      elementText = $__m.elementText;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xit = $__m.xit;
      SpyObject = $__m.SpyObject;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ProtoViewDto = $__m.ProtoViewDto;
      ViewDefinition = $__m.ViewDefinition;
      ViewContainerRef = $__m.ViewContainerRef;
      EventDispatcher = $__m.EventDispatcher;
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      IntegrationTestbed = $__m.IntegrationTestbed;
      LoggingEventDispatcher = $__m.LoggingEventDispatcher;
      FakeEvent = $__m.FakeEvent;
    }],
    execute: function() {
      someComponent = new DirectiveMetadata({
        id: 'someComponent',
        type: DirectiveMetadata.COMPONENT_TYPE,
        selector: 'some-comp'
      });
    }
  };
});
//# sourceMappingURL=direct_dom_renderer_integration_spec.es6.map

//# sourceMappingURL=./direct_dom_renderer_integration_spec.js.map