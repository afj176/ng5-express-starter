System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/test_lib/test_bed", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/di", "angular2/change_detection", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/view", "angular2/src/core/annotations/visibility", "angular2/src/core/annotations/di", "angular2/src/directives/if", "angular2/src/core/compiler/view_container", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/element_injector", "angular2/src/render/dom/direct_dom_renderer"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      beforeEach,
      ddescribe,
      xdescribe,
      describe,
      el,
      dispatchEvent,
      expect,
      iit,
      inject,
      beforeEachBindings,
      it,
      xit,
      TestBed,
      DOM,
      Type,
      isPresent,
      BaseException,
      assertionsEnabled,
      isJsObject,
      global,
      PromiseWrapper,
      EventEmitter,
      ObservableWrapper,
      Injector,
      bind,
      PipeRegistry,
      defaultPipeRegistry,
      ChangeDetection,
      DynamicChangeDetection,
      Pipe,
      ChangeDetectorRef,
      ON_PUSH,
      Decorator,
      Component,
      Viewport,
      DynamicComponent,
      View,
      Parent,
      Ancestor,
      Attribute,
      If,
      ViewContainer,
      Compiler,
      ElementRef,
      DirectDomRenderer,
      SimpleImperativeViewComponent,
      DynamicViewport,
      MyDir,
      PushCmp,
      PushCmpWithRef,
      MyComp,
      ComponentWithPipes,
      ChildComp,
      ChildCompUsingService,
      SomeDirective,
      CompWithParent,
      CompWithAncestor,
      ChildComp2,
      SomeViewport,
      MyService,
      DoublePipe,
      DoublePipeFactory,
      DecoratorEmitingEvent,
      DecoratorUpdatingHostProperties,
      DecoratorListeningEvent,
      DecoratorListeningDomEvent,
      globalCounter,
      DecoratorListeningDomEventOther,
      DecoratorListeningDomEventPrevent,
      DecoratorListeningDomEventNoPrevent,
      IdComponent,
      NeedsAttribute;
  function main() {
    describe('integration tests', function() {
      var ctx;
      beforeEach((function() {
        ctx = new MyComp();
      }));
      describe('react to record changes', function() {
        it('should consume text node changes', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<div>{{ctxProp}}</div>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'Hello World!';
            view.detectChanges();
            expect(DOM.getInnerHTML(view.rootNodes[0])).toEqual('Hello World!');
            async.done();
          }));
        })));
        it('should consume element binding changes', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<div [id]="ctxProp"></div>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'Hello World!';
            view.detectChanges();
            expect(view.rootNodes[0].id).toEqual('Hello World!');
            async.done();
          }));
        })));
        it('should consume binding to aria-* attributes', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<div [attr.aria-label]="ctxProp"></div>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'Initial aria label';
            view.detectChanges();
            expect(DOM.getAttribute(view.rootNodes[0], 'aria-label')).toEqual('Initial aria label');
            ctx.ctxProp = 'Changed aria label';
            view.detectChanges();
            expect(DOM.getAttribute(view.rootNodes[0], 'aria-label')).toEqual('Changed aria label');
            async.done();
          }));
        })));
        it('should consume binding to property names where attr name and property name do not match', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<div [tabindex]="ctxNumProp"></div>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            view.detectChanges();
            expect(view.rootNodes[0].tabIndex).toEqual(0);
            ctx.ctxNumProp = 5;
            view.detectChanges();
            expect(view.rootNodes[0].tabIndex).toEqual(5);
            async.done();
          }));
        })));
        it('should consume binding to camel-cased properties using dash-cased syntax in templates', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<input [read-only]="ctxBoolProp">'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            view.detectChanges();
            expect(view.rootNodes[0].readOnly).toBeFalsy();
            ctx.ctxBoolProp = true;
            view.detectChanges();
            expect(view.rootNodes[0].readOnly).toBeTruthy();
            async.done();
          }));
        })));
        it('should consume binding to inner-html', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<div inner-html="{{ctxProp}}"></div>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'Some <span>HTML</span>';
            view.detectChanges();
            expect(DOM.getInnerHTML(view.rootNodes[0])).toEqual('Some <span>HTML</span>');
            ctx.ctxProp = 'Some other <div>HTML</div>';
            view.detectChanges();
            expect(DOM.getInnerHTML(view.rootNodes[0])).toEqual('Some other <div>HTML</div>');
            async.done();
          }));
        })));
        it('should ignore bindings to unknown properties', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<div unknown="{{ctxProp}}"></div>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'Some value';
            view.detectChanges();
            expect(DOM.hasProperty(view.rootNodes[0], 'unknown')).toBeFalsy();
            async.done();
          }));
        })));
        it('should consume directive watch expression change.', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var tpl = '<div>' + '<div my-dir [elprop]="ctxProp"></div>' + '<div my-dir elprop="Hi there!"></div>' + '<div my-dir elprop="Hi {{\'there!\'}}"></div>' + '<div my-dir elprop="One more {{ctxProp}}"></div>' + '</div>';
          tb.overrideView(MyComp, new View({
            template: tpl,
            directives: [MyDir]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'Hello World!';
            view.detectChanges();
            expect(view.rawView.elementInjectors[0].get(MyDir).dirProp).toEqual('Hello World!');
            expect(view.rawView.elementInjectors[1].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.rawView.elementInjectors[2].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.rawView.elementInjectors[3].get(MyDir).dirProp).toEqual('One more Hello World!');
            async.done();
          }));
        })));
        describe('pipes', (function() {
          beforeEachBindings((function() {
            return [bind(ChangeDetection).toFactory((function() {
              return new DynamicChangeDetection(new PipeRegistry({"double": [new DoublePipeFactory()]}));
            }), [])];
          }));
          it("should support pipes in bindings and bind config", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            tb.overrideView(MyComp, new View({
              template: '<component-with-pipes #comp [prop]="ctxProp | double"></component-with-pipes>',
              directives: [ComponentWithPipes]
            }));
            tb.createView(MyComp, {context: ctx}).then((function(view) {
              ctx.ctxProp = 'a';
              view.detectChanges();
              var comp = view.rawView.locals.get("comp");
              expect(comp.prop).toEqual('aaaa');
              async.done();
            }));
          })));
        }));
        it('should support nested components.', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<child-cmp></child-cmp>',
            directives: [ChildComp]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            view.detectChanges();
            expect(view.rootNodes).toHaveText('hello');
            async.done();
          }));
        })));
        it('should support different directive types on a single node', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
            directives: [MyDir, ChildComp]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'Hello World!';
            view.detectChanges();
            var elInj = view.rawView.elementInjectors[0];
            expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
            expect(elInj.get(ChildComp).dirProp).toEqual(null);
            async.done();
          }));
        })));
        it('should support directives where a binding attribute is not given', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<p my-dir></p>',
            directives: [MyDir]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            async.done();
          }));
        })));
        it('should support directives where a selector matches property binding', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<p [id]="ctxProp"></p>',
            directives: [IdComponent]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            ctx.ctxProp = 'some_id';
            view.detectChanges();
            expect(view.rootNodes[0].id).toEqual('some_id');
            expect(view.rootNodes).toHaveText('Matched on id with some_id');
            ctx.ctxProp = 'other_id';
            view.detectChanges();
            expect(view.rootNodes[0].id).toEqual('other_id');
            expect(view.rootNodes).toHaveText('Matched on id with other_id');
            async.done();
          }));
        })));
        it('should support template directives via `<template>` elements.', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<div><template some-viewport var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>',
            directives: [SomeViewport]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            view.detectChanges();
            var childNodesOfWrapper = view.rootNodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            async.done();
          }));
        })));
        it('should support template directives via `template` attribute.', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<div><copy-me template="some-viewport: var greeting=some-tmpl">{{greeting}}</copy-me></div>',
            directives: [SomeViewport]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            view.detectChanges();
            var childNodesOfWrapper = view.rootNodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            async.done();
          }));
        })));
        it('should assign the component instance to a var-', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<p><child-cmp var-alice></child-cmp></p>',
            directives: [ChildComp]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect(view.rawView.locals).not.toBe(null);
            expect(view.rawView.locals.get('alice')).toBeAnInstanceOf(ChildComp);
            async.done();
          }));
        })));
        it('should assign two component instances each with a var-', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>',
            directives: [ChildComp]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect(view.rawView.locals).not.toBe(null);
            expect(view.rawView.locals.get('alice')).toBeAnInstanceOf(ChildComp);
            expect(view.rawView.locals.get('bob')).toBeAnInstanceOf(ChildComp);
            expect(view.rawView.locals.get('alice')).not.toBe(view.rawView.locals.get('bob'));
            async.done();
          }));
        })));
        it('should assign the component instance to a var- with shorthand syntax', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<child-cmp #alice></child-cmp>',
            directives: [ChildComp]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect(view.rawView.locals).not.toBe(null);
            expect(view.rawView.locals.get('alice')).toBeAnInstanceOf(ChildComp);
            async.done();
          }));
        })));
        it('should assign the element instance to a user-defined variable', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<p><div var-alice><i>Hello</i></div></p>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect(view.rawView.locals).not.toBe(null);
            var value = view.rawView.locals.get('alice');
            expect(value).not.toBe(null);
            expect(value.tagName.toLowerCase()).toEqual('div');
            async.done();
          }));
        })));
        it('should assign the element instance to a user-defined variable with camelCase using dash-case', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<p><div var-super-alice><i>Hello</i></div></p>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect(view.rawView.locals).not.toBe(null);
            var value = view.rawView.locals.get('superAlice');
            expect(value).not.toBe(null);
            expect(value.tagName.toLowerCase()).toEqual('div');
            async.done();
          }));
        })));
        describe("ON_PUSH components", (function() {
          it("should use ChangeDetectorRef to manually request a check", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            tb.overrideView(MyComp, new View({
              template: '<push-cmp-with-ref #cmp></push-cmp-with-ref>',
              directives: [[[PushCmpWithRef]]]
            }));
            tb.createView(MyComp, {context: ctx}).then((function(view) {
              var cmp = view.rawView.locals.get('cmp');
              view.detectChanges();
              expect(cmp.numberOfChecks).toEqual(1);
              view.detectChanges();
              expect(cmp.numberOfChecks).toEqual(1);
              cmp.propagate();
              view.detectChanges();
              expect(cmp.numberOfChecks).toEqual(2);
              async.done();
            }));
          })));
          it("should be checked when its bindings got updated", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            tb.overrideView(MyComp, new View({
              template: '<push-cmp [prop]="ctxProp" #cmp></push-cmp>',
              directives: [[[PushCmp]]]
            }));
            tb.createView(MyComp, {context: ctx}).then((function(view) {
              var cmp = view.rawView.locals.get('cmp');
              ctx.ctxProp = "one";
              view.detectChanges();
              expect(cmp.numberOfChecks).toEqual(1);
              ctx.ctxProp = "two";
              view.detectChanges();
              expect(cmp.numberOfChecks).toEqual(2);
              async.done();
            }));
          })));
          it('should not affect updating properties on the component', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            tb.overrideView(MyComp, new View({
              template: '<push-cmp-with-ref [prop]="ctxProp" #cmp></push-cmp-with-ref>',
              directives: [[[PushCmpWithRef]]]
            }));
            tb.createView(MyComp, {context: ctx}).then((function(view) {
              var cmp = view.rawView.locals.get('cmp');
              ctx.ctxProp = "one";
              view.detectChanges();
              expect(cmp.prop).toEqual("one");
              ctx.ctxProp = "two";
              view.detectChanges();
              expect(cmp.prop).toEqual("two");
              async.done();
            }));
          })));
        }));
        it('should create a component that injects a @Parent', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<some-directive><cmp-with-parent #child></cmp-with-parent></some-directive>',
            directives: [SomeDirective, CompWithParent]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            var childComponent = view.rawView.locals.get('child');
            expect(childComponent.myParent).toBeAnInstanceOf(SomeDirective);
            async.done();
          }));
        })));
        it('should create a component that injects an @Ancestor', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: "\n            <some-directive>\n              <p>\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
            directives: [SomeDirective, CompWithAncestor]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            var childComponent = view.rawView.locals.get('child');
            expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
            async.done();
          }));
        })));
        it('should create a component that injects an @Ancestor through viewport directive', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: "\n            <some-directive>\n              <p *if=\"true\">\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
            directives: [SomeDirective, CompWithAncestor, If]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            view.detectChanges();
            var subview = view.rawView.viewContainers[1].get(0);
            var childComponent = subview.locals.get('child');
            expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
            async.done();
          }));
        })));
        it('should support events via EventEmitter', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<div emitter listener></div>',
            directives: [DecoratorEmitingEvent, DecoratorListeningEvent]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            var injector = view.rawView.elementInjectors[0];
            var emitter = injector.get(DecoratorEmitingEvent);
            var listener = injector.get(DecoratorListeningEvent);
            expect(listener.msg).toEqual('');
            emitter.fireEvent('fired !');
            PromiseWrapper.setTimeout((function() {
              expect(listener.msg).toEqual('fired !');
              async.done();
            }), 0);
          }));
        })));
        it('should support render events', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<div listener></div>',
            directives: [DecoratorListeningDomEvent]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            var injector = view.rawView.elementInjectors[0];
            var listener = injector.get(DecoratorListeningDomEvent);
            dispatchEvent(view.rootNodes[0], 'domEvent');
            expect(listener.eventType).toEqual('domEvent');
            async.done();
          }));
        })));
        it('should support render global events', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<div listener></div>',
            directives: [DecoratorListeningDomEvent]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            var injector = view.rawView.elementInjectors[0];
            var listener = injector.get(DecoratorListeningDomEvent);
            dispatchEvent(DOM.getGlobalEventTarget("window"), 'domEvent');
            expect(listener.eventType).toEqual('window_domEvent');
            listener = injector.get(DecoratorListeningDomEvent);
            dispatchEvent(DOM.getGlobalEventTarget("document"), 'domEvent');
            expect(listener.eventType).toEqual('document_domEvent');
            view.destroy();
            listener = injector.get(DecoratorListeningDomEvent);
            dispatchEvent(DOM.getGlobalEventTarget("body"), 'domEvent');
            expect(listener.eventType).toEqual('');
            async.done();
          }));
        })));
        it('should support updating host element via hostProperties', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<div update-host-properties></div>',
            directives: [DecoratorUpdatingHostProperties]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            var injector = view.rawView.elementInjectors[0];
            var updateHost = injector.get(DecoratorUpdatingHostProperties);
            updateHost.id = "newId";
            view.detectChanges();
            expect(view.rootNodes[0].id).toEqual("newId");
            async.done();
          }));
        })));
        if (DOM.supportsDOMEvents()) {
          it('should support preventing default on render events', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            tb.overrideView(MyComp, new View({
              template: '<input type="checkbox" listenerprevent></input><input type="checkbox" listenernoprevent></input>',
              directives: [DecoratorListeningDomEventPrevent, DecoratorListeningDomEventNoPrevent]
            }));
            tb.createView(MyComp, {context: ctx}).then((function(view) {
              expect(DOM.getChecked(view.rootNodes[0])).toBeFalsy();
              expect(DOM.getChecked(view.rootNodes[1])).toBeFalsy();
              DOM.dispatchEvent(view.rootNodes[0], DOM.createMouseEvent('click'));
              DOM.dispatchEvent(view.rootNodes[1], DOM.createMouseEvent('click'));
              expect(DOM.getChecked(view.rootNodes[0])).toBeFalsy();
              expect(DOM.getChecked(view.rootNodes[1])).toBeTruthy();
              async.done();
            }));
          })));
        }
        it('should support render global events from multiple directives', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<div *if="ctxBoolProp" listener listenerother></div>',
            directives: [If, DecoratorListeningDomEvent, DecoratorListeningDomEventOther]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            globalCounter = 0;
            ctx.ctxBoolProp = true;
            view.detectChanges();
            var subview = view.rawView.viewContainers[0].get(0);
            var injector = subview.elementInjectors[0];
            var listener = injector.get(DecoratorListeningDomEvent);
            var listenerother = injector.get(DecoratorListeningDomEventOther);
            dispatchEvent(DOM.getGlobalEventTarget("window"), 'domEvent');
            expect(listener.eventType).toEqual('window_domEvent');
            expect(listenerother.eventType).toEqual('other_domEvent');
            expect(globalCounter).toEqual(1);
            ctx.ctxBoolProp = false;
            view.detectChanges();
            dispatchEvent(DOM.getGlobalEventTarget("window"), 'domEvent');
            expect(globalCounter).toEqual(1);
            ctx.ctxBoolProp = true;
            view.detectChanges();
            dispatchEvent(DOM.getGlobalEventTarget("window"), 'domEvent');
            expect(globalCounter).toEqual(2);
            async.done();
          }));
        })));
        describe('dynamic ViewContainers', (function() {
          it('should allow to create a ViewContainer at any bound location', inject([TestBed, AsyncTestCompleter, Compiler], (function(tb, async, compiler) {
            tb.overrideView(MyComp, new View({
              template: '<div><dynamic-vp #dynamic></dynamic-vp></div>',
              directives: [DynamicViewport]
            }));
            tb.createView(MyComp).then((function(view) {
              var dynamicVp = view.rawView.elementInjectors[0].get(DynamicViewport);
              dynamicVp.done.then((function(_) {
                view.detectChanges();
                expect(view.rootNodes).toHaveText('dynamic greet');
                async.done();
              }));
            }));
          })));
        }));
        it('should support static attributes', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<input static type="text" title>',
            directives: [NeedsAttribute]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            var injector = view.rawView.elementInjectors[0];
            var needsAttribute = injector.get(NeedsAttribute);
            expect(needsAttribute.typeAttribute).toEqual('text');
            expect(needsAttribute.titleAttribute).toEqual('');
            expect(needsAttribute.fooAttribute).toEqual(null);
            async.done();
          }));
        })));
      });
      describe("error handling", (function() {
        it('should specify a location of an error that happened during change detection (text)', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '{{a.b}}'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect((function() {
              return view.detectChanges();
            })).toThrowError(new RegExp('{{a.b}} in MyComp'));
            async.done();
          }));
        })));
        it('should specify a location of an error that happened during change detection (element property)', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({template: '<div [prop]="a.b"></div>'}));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect((function() {
              return view.detectChanges();
            })).toThrowError(new RegExp('a.b in MyComp'));
            async.done();
          }));
        })));
        it('should specify a location of an error that happened during change detection (directive property)', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          tb.overrideView(MyComp, new View({
            template: '<child-cmp [prop]="a.b"></child-cmp>',
            directives: [ChildComp]
          }));
          tb.createView(MyComp, {context: ctx}).then((function(view) {
            expect((function() {
              return view.detectChanges();
            })).toThrowError(new RegExp('a.b in MyComp'));
            async.done();
          }));
        })));
      }));
      it('should support imperative views', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
        tb.overrideView(MyComp, new View({
          template: '<simple-imp-cmp></simple-imp-cmp>',
          directives: [SimpleImperativeViewComponent]
        }));
        tb.createView(MyComp).then((function(view) {
          expect(view.rootNodes).toHaveText('hello imp view');
          async.done();
        }));
      })));
      xdescribe('Missing directive checks', (function() {
        if (assertionsEnabled()) {
          var expectCompileError = function(tb, inlineTpl, errMessage, done) {
            tb.overrideView(MyComp, new View({template: inlineTpl}));
            PromiseWrapper.then(tb.createView(MyComp), (function(value) {
              throw new BaseException("Test failure: should not have come here as an exception was expected");
            }), (function(err) {
              expect(err.message).toEqual(errMessage);
              done();
            }));
          };
          it('should raise an error if no directive is registered for a template with template bindings', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            expectCompileError(tb, '<div><div template="if: foo"></div></div>', 'Missing directive to handle \'if\' in <div template="if: foo">', (function() {
              return async.done();
            }));
          })));
          it('should raise an error for missing template directive (1)', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            expectCompileError(tb, '<div><template foo></template></div>', 'Missing directive to handle: <template foo>', (function() {
              return async.done();
            }));
          })));
          it('should raise an error for missing template directive (2)', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            expectCompileError(tb, '<div><template *if="condition"></template></div>', 'Missing directive to handle: <template *if="condition">', (function() {
              return async.done();
            }));
          })));
          it('should raise an error for missing template directive (3)', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            expectCompileError(tb, '<div *if="condition"></div>', 'Missing directive to handle \'if\' in MyComp: <div *if="condition">', (function() {
              return async.done();
            }));
          })));
        }
      }));
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      xdescribe = $__m.xdescribe;
      describe = $__m.describe;
      el = $__m.el;
      dispatchEvent = $__m.dispatchEvent;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      beforeEachBindings = $__m.beforeEachBindings;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      assertionsEnabled = $__m.assertionsEnabled;
      isJsObject = $__m.isJsObject;
      global = $__m.global;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
      defaultPipeRegistry = $__m.defaultPipeRegistry;
      ChangeDetection = $__m.ChangeDetection;
      DynamicChangeDetection = $__m.DynamicChangeDetection;
      Pipe = $__m.Pipe;
      ChangeDetectorRef = $__m.ChangeDetectorRef;
      ON_PUSH = $__m.ON_PUSH;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
      DynamicComponent = $__m.DynamicComponent;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Parent = $__m.Parent;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      Attribute = $__m.Attribute;
    }, function($__m) {
      If = $__m.If;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      Compiler = $__m.Compiler;
    }, function($__m) {
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      DirectDomRenderer = $__m.DirectDomRenderer;
    }],
    execute: function() {
      SimpleImperativeViewComponent = (function() {
        var SimpleImperativeViewComponent = function SimpleImperativeViewComponent(self, renderer) {
          assert.argumentTypes(self, ElementRef, renderer, DirectDomRenderer);
          renderer.setImperativeComponentRootNodes(self.hostView.render, self.boundElementIndex, [el('hello imp view')]);
        };
        return ($traceurRuntime.createClass)(SimpleImperativeViewComponent, {}, {});
      }());
      Object.defineProperty(SimpleImperativeViewComponent, "annotations", {get: function() {
          return [new Component({selector: 'simple-imp-cmp'}), new View({renderer: 'simple-imp-cmp-renderer'})];
        }});
      Object.defineProperty(SimpleImperativeViewComponent, "parameters", {get: function() {
          return [[ElementRef], [DirectDomRenderer]];
        }});
      DynamicViewport = (function() {
        var DynamicViewport = function DynamicViewport(vc, inj, compiler) {
          assert.argumentTypes(vc, ViewContainer, inj, Injector, compiler, Compiler);
          var myService = new MyService();
          myService.greeting = 'dynamic greet';
          this.done = compiler.compileInHost(ChildCompUsingService).then((function(hostPv) {
            vc.create(0, hostPv, inj.createChildFromResolved(Injector.resolve([bind(MyService).toValue(myService)])));
          }));
        };
        return ($traceurRuntime.createClass)(DynamicViewport, {}, {});
      }());
      Object.defineProperty(DynamicViewport, "annotations", {get: function() {
          return [new Decorator({selector: 'dynamic-vp'})];
        }});
      Object.defineProperty(DynamicViewport, "parameters", {get: function() {
          return [[ViewContainer], [Injector], [Compiler]];
        }});
      MyDir = (function() {
        var MyDir = function MyDir() {
          this.dirProp = '';
        };
        return ($traceurRuntime.createClass)(MyDir, {}, {});
      }());
      Object.defineProperty(MyDir, "annotations", {get: function() {
          return [new Decorator({
            selector: '[my-dir]',
            properties: {'dirProp': 'elprop'}
          })];
        }});
      PushCmp = (function() {
        var PushCmp = function PushCmp() {
          this.numberOfChecks = 0;
        };
        return ($traceurRuntime.createClass)(PushCmp, {get field() {
            this.numberOfChecks++;
            return "fixed";
          }}, {});
      }());
      Object.defineProperty(PushCmp, "annotations", {get: function() {
          return [new Component({
            selector: 'push-cmp',
            properties: {'prop': 'prop'},
            changeDetection: ON_PUSH
          }), new View({template: '{{field}}'})];
        }});
      PushCmpWithRef = (function() {
        var PushCmpWithRef = function PushCmpWithRef(ref) {
          assert.argumentTypes(ref, ChangeDetectorRef);
          this.numberOfChecks = 0;
          this.ref = ref;
        };
        return ($traceurRuntime.createClass)(PushCmpWithRef, {
          get field() {
            this.numberOfChecks++;
            return "fixed";
          },
          propagate: function() {
            this.ref.requestCheck();
          }
        }, {});
      }());
      Object.defineProperty(PushCmpWithRef, "annotations", {get: function() {
          return [new Component({
            selector: 'push-cmp-with-ref',
            properties: {'prop': 'prop'},
            changeDetection: ON_PUSH
          }), new View({template: '{{field}}'})];
        }});
      Object.defineProperty(PushCmpWithRef, "parameters", {get: function() {
          return [[ChangeDetectorRef]];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {
          this.ctxProp = 'initial value';
          this.ctxNumProp = 0;
          this.ctxBoolProp = false;
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component(), new View({directives: []})];
        }});
      ComponentWithPipes = (function() {
        var ComponentWithPipes = function ComponentWithPipes() {
          ;
        };
        return ($traceurRuntime.createClass)(ComponentWithPipes, {}, {});
      }());
      Object.defineProperty(ComponentWithPipes, "annotations", {get: function() {
          return [new Component({
            selector: 'component-with-pipes',
            properties: {"prop": "prop | double"}
          }), new View({template: ''})];
        }});
      ChildComp = (function() {
        var ChildComp = function ChildComp(service) {
          assert.argumentTypes(service, MyService);
          this.ctxProp = service.greeting;
          this.dirProp = null;
        };
        return ($traceurRuntime.createClass)(ChildComp, {}, {});
      }());
      Object.defineProperty(ChildComp, "annotations", {get: function() {
          return [new Component({
            selector: 'child-cmp',
            injectables: [MyService]
          }), new View({
            directives: [MyDir],
            template: '{{ctxProp}}'
          })];
        }});
      Object.defineProperty(ChildComp, "parameters", {get: function() {
          return [[MyService]];
        }});
      ChildCompUsingService = (function() {
        var ChildCompUsingService = function ChildCompUsingService(service) {
          assert.argumentTypes(service, MyService);
          this.ctxProp = service.greeting;
        };
        return ($traceurRuntime.createClass)(ChildCompUsingService, {}, {});
      }());
      Object.defineProperty(ChildCompUsingService, "annotations", {get: function() {
          return [new Component({selector: 'child-cmp-svc'}), new View({template: '{{ctxProp}}'})];
        }});
      Object.defineProperty(ChildCompUsingService, "parameters", {get: function() {
          return [[MyService]];
        }});
      SomeDirective = (function() {
        var SomeDirective = function SomeDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeDirective, {}, {});
      }());
      Object.defineProperty(SomeDirective, "annotations", {get: function() {
          return [new Decorator({selector: 'some-directive'})];
        }});
      CompWithParent = (function() {
        var CompWithParent = function CompWithParent(someComp) {
          assert.argumentTypes(someComp, SomeDirective);
          this.myParent = someComp;
        };
        return ($traceurRuntime.createClass)(CompWithParent, {}, {});
      }());
      Object.defineProperty(CompWithParent, "annotations", {get: function() {
          return [new Component({selector: 'cmp-with-parent'}), new View({
            template: '<p>Component with an injected parent</p>',
            directives: [SomeDirective]
          })];
        }});
      Object.defineProperty(CompWithParent, "parameters", {get: function() {
          return [[SomeDirective, new Parent()]];
        }});
      CompWithAncestor = (function() {
        var CompWithAncestor = function CompWithAncestor(someComp) {
          assert.argumentTypes(someComp, SomeDirective);
          this.myAncestor = someComp;
        };
        return ($traceurRuntime.createClass)(CompWithAncestor, {}, {});
      }());
      Object.defineProperty(CompWithAncestor, "annotations", {get: function() {
          return [new Component({selector: 'cmp-with-ancestor'}), new View({
            template: '<p>Component with an injected ancestor</p>',
            directives: [SomeDirective]
          })];
        }});
      Object.defineProperty(CompWithAncestor, "parameters", {get: function() {
          return [[SomeDirective, new Ancestor()]];
        }});
      ChildComp2 = (function() {
        var ChildComp2 = function ChildComp2(service) {
          assert.argumentTypes(service, MyService);
          this.ctxProp = service.greeting;
          this.dirProp = null;
        };
        return ($traceurRuntime.createClass)(ChildComp2, {}, {});
      }());
      Object.defineProperty(ChildComp2, "annotations", {get: function() {
          return [new Component({
            selector: '[child-cmp2]',
            injectables: [MyService]
          })];
        }});
      Object.defineProperty(ChildComp2, "parameters", {get: function() {
          return [[MyService]];
        }});
      SomeViewport = (function() {
        var SomeViewport = function SomeViewport(container) {
          assert.argumentTypes(container, ViewContainer);
          container.create().setLocal('some-tmpl', 'hello');
          container.create().setLocal('some-tmpl', 'again');
        };
        return ($traceurRuntime.createClass)(SomeViewport, {}, {});
      }());
      Object.defineProperty(SomeViewport, "annotations", {get: function() {
          return [new Viewport({selector: '[some-viewport]'})];
        }});
      Object.defineProperty(SomeViewport, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      MyService = (function() {
        var MyService = function MyService() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(MyService, {}, {});
      }());
      DoublePipe = (function($__super) {
        var DoublePipe = function DoublePipe() {
          $traceurRuntime.superConstructor(DoublePipe).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(DoublePipe, {
          supports: function(obj) {
            return true;
          },
          transform: function(value) {
            return ("" + value + value);
          }
        }, {}, $__super);
      }(Pipe));
      DoublePipeFactory = (function() {
        var DoublePipeFactory = function DoublePipeFactory() {
          ;
        };
        return ($traceurRuntime.createClass)(DoublePipeFactory, {
          supports: function(obj) {
            return true;
          },
          create: function(cdRef) {
            return new DoublePipe();
          }
        }, {});
      }());
      DecoratorEmitingEvent = (function() {
        var DecoratorEmitingEvent = function DecoratorEmitingEvent() {
          this.msg = '';
          this.event = new EventEmitter();
        };
        return ($traceurRuntime.createClass)(DecoratorEmitingEvent, {fireEvent: function(msg) {
            assert.argumentTypes(msg, assert.type.string);
            ObservableWrapper.callNext(this.event, msg);
          }}, {});
      }());
      Object.defineProperty(DecoratorEmitingEvent, "annotations", {get: function() {
          return [new Decorator({
            selector: '[emitter]',
            events: ['event']
          })];
        }});
      Object.defineProperty(DecoratorEmitingEvent.prototype.fireEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      DecoratorUpdatingHostProperties = (function() {
        var DecoratorUpdatingHostProperties = function DecoratorUpdatingHostProperties() {
          this.id = "one";
        };
        return ($traceurRuntime.createClass)(DecoratorUpdatingHostProperties, {}, {});
      }());
      Object.defineProperty(DecoratorUpdatingHostProperties, "annotations", {get: function() {
          return [new Decorator({
            selector: '[update-host-properties]',
            hostProperties: {'id': 'id'}
          })];
        }});
      DecoratorListeningEvent = (function() {
        var DecoratorListeningEvent = function DecoratorListeningEvent() {
          this.msg = '';
        };
        return ($traceurRuntime.createClass)(DecoratorListeningEvent, {onEvent: function(msg) {
            assert.argumentTypes(msg, assert.type.string);
            this.msg = msg;
          }}, {});
      }());
      Object.defineProperty(DecoratorListeningEvent, "annotations", {get: function() {
          return [new Decorator({
            selector: '[listener]',
            hostListeners: {'event': 'onEvent($event)'}
          })];
        }});
      Object.defineProperty(DecoratorListeningEvent.prototype.onEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      DecoratorListeningDomEvent = (function() {
        var DecoratorListeningDomEvent = function DecoratorListeningDomEvent() {
          this.eventType = '';
        };
        return ($traceurRuntime.createClass)(DecoratorListeningDomEvent, {
          onEvent: function(eventType) {
            assert.argumentTypes(eventType, assert.type.string);
            this.eventType = eventType;
          },
          onWindowEvent: function(eventType) {
            assert.argumentTypes(eventType, assert.type.string);
            this.eventType = "window_" + eventType;
          },
          onDocumentEvent: function(eventType) {
            assert.argumentTypes(eventType, assert.type.string);
            this.eventType = "document_" + eventType;
          },
          onBodyEvent: function(eventType) {
            assert.argumentTypes(eventType, assert.type.string);
            this.eventType = "body_" + eventType;
          }
        }, {});
      }());
      Object.defineProperty(DecoratorListeningDomEvent, "annotations", {get: function() {
          return [new Decorator({
            selector: '[listener]',
            hostListeners: {
              'domEvent': 'onEvent($event.type)',
              'window:domEvent': 'onWindowEvent($event.type)',
              'document:domEvent': 'onDocumentEvent($event.type)',
              'body:domEvent': 'onBodyEvent($event.type)'
            }
          })];
        }});
      Object.defineProperty(DecoratorListeningDomEvent.prototype.onEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(DecoratorListeningDomEvent.prototype.onWindowEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(DecoratorListeningDomEvent.prototype.onDocumentEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(DecoratorListeningDomEvent.prototype.onBodyEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      globalCounter = 0;
      DecoratorListeningDomEventOther = (function() {
        var DecoratorListeningDomEventOther = function DecoratorListeningDomEventOther() {
          this.eventType = '';
        };
        return ($traceurRuntime.createClass)(DecoratorListeningDomEventOther, {onEvent: function(eventType) {
            assert.argumentTypes(eventType, assert.type.string);
            globalCounter++;
            this.eventType = "other_" + eventType;
          }}, {});
      }());
      Object.defineProperty(DecoratorListeningDomEventOther, "annotations", {get: function() {
          return [new Decorator({
            selector: '[listenerother]',
            hostListeners: {'window:domEvent': 'onEvent($event.type)'}
          })];
        }});
      Object.defineProperty(DecoratorListeningDomEventOther.prototype.onEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      DecoratorListeningDomEventPrevent = (function() {
        var DecoratorListeningDomEventPrevent = function DecoratorListeningDomEventPrevent() {
          ;
        };
        return ($traceurRuntime.createClass)(DecoratorListeningDomEventPrevent, {onEvent: function(event) {
            return false;
          }}, {});
      }());
      Object.defineProperty(DecoratorListeningDomEventPrevent, "annotations", {get: function() {
          return [new Decorator({
            selector: '[listenerprevent]',
            hostListeners: {'click': 'onEvent($event)'}
          })];
        }});
      DecoratorListeningDomEventNoPrevent = (function() {
        var DecoratorListeningDomEventNoPrevent = function DecoratorListeningDomEventNoPrevent() {
          ;
        };
        return ($traceurRuntime.createClass)(DecoratorListeningDomEventNoPrevent, {onEvent: function(event) {
            return true;
          }}, {});
      }());
      Object.defineProperty(DecoratorListeningDomEventNoPrevent, "annotations", {get: function() {
          return [new Decorator({
            selector: '[listenernoprevent]',
            hostListeners: {'click': 'onEvent($event)'}
          })];
        }});
      IdComponent = (function() {
        var IdComponent = function IdComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(IdComponent, {}, {});
      }());
      Object.defineProperty(IdComponent, "annotations", {get: function() {
          return [new Component({
            selector: '[id]',
            properties: {'id': 'id'}
          }), new View({template: '<div>Matched on id with {{id}}</div>'})];
        }});
      NeedsAttribute = (function() {
        var NeedsAttribute = function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
          assert.argumentTypes(typeAttribute, assert.type.string, titleAttribute, assert.type.string, fooAttribute, assert.type.string);
          this.typeAttribute = typeAttribute;
          this.titleAttribute = titleAttribute;
          this.fooAttribute = fooAttribute;
        };
        return ($traceurRuntime.createClass)(NeedsAttribute, {}, {});
      }());
      Object.defineProperty(NeedsAttribute, "annotations", {get: function() {
          return [new Decorator({selector: '[static]'})];
        }});
      Object.defineProperty(NeedsAttribute, "parameters", {get: function() {
          return [[assert.type.string, new Attribute('type')], [assert.type.string, new Attribute('title')], [assert.type.string, new Attribute('foo')]];
        }});
    }
  };
});
//# sourceMappingURL=integration_spec.es6.map

//# sourceMappingURL=./integration_spec.js.map