System.register(["angular2/test_lib", "angular2/src/core/application", "angular2/src/core/application_tokens", "angular2/src/core/annotations/annotations", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/di", "angular2/src/core/annotations/view", "angular2/src/core/life_cycle/life_cycle", "angular2/src/core/testability/testability"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      expect,
      iit,
      inject,
      it,
      xdescribe,
      xit,
      bootstrap,
      appDocumentToken,
      appElementToken,
      Component,
      Decorator,
      DOM,
      ListWrapper,
      PromiseWrapper,
      bind,
      Inject,
      View,
      LifeCycle,
      Testability,
      TestabilityRegistry,
      HelloRootCmp,
      HelloRootCmpContent,
      HelloRootCmp2,
      HelloRootCmp3,
      HelloRootCmp4,
      HelloRootMissingTemplate,
      HelloRootDirectiveIsNotCmp;
  function main() {
    var fakeDoc,
        el,
        el2,
        testBindings,
        lightDom;
    beforeEach((function() {
      fakeDoc = DOM.createHtmlDocument();
      el = DOM.createElement('hello-app', fakeDoc);
      el2 = DOM.createElement('hello-app-2', fakeDoc);
      lightDom = DOM.createElement('light-dom-el', fakeDoc);
      DOM.appendChild(fakeDoc.body, el);
      DOM.appendChild(fakeDoc.body, el2);
      DOM.appendChild(el, lightDom);
      DOM.setText(lightDom, 'loading');
      testBindings = [bind(appDocumentToken).toValue(fakeDoc)];
    }));
    describe('bootstrap factory method', (function() {
      it('should throw if no View found', inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootMissingTemplate, testBindings, (function(e, t) {
          throw e;
        }));
        PromiseWrapper.then(refPromise, null, (function(reason) {
          expect(reason.message).toContain('No template found for HelloRootMissingTemplate');
          async.done();
        }));
      })));
      it('should throw if bootstrapped Directive is not a Component', inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootDirectiveIsNotCmp, testBindings, (function(e, t) {
          throw e;
        }));
        PromiseWrapper.then(refPromise, null, (function(reason) {
          expect(reason.message).toContain("Could not load 'HelloRootDirectiveIsNotCmp' because it is not a component.");
          async.done();
        }));
      })));
      it('should throw if no element is found', inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootCmp, [], (function(e, t) {
          throw e;
        }));
        PromiseWrapper.then(refPromise, null, (function(reason) {
          expect(reason.message).toContain('The app selector "hello-app" did not match any elements');
          async.done();
        }));
      })));
      it('should create an injector promise', (function() {
        var refPromise = bootstrap(HelloRootCmp, testBindings);
        expect(refPromise).not.toBe(null);
      }));
      it('should resolve an injector promise and contain bindings', inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootCmp, testBindings);
        refPromise.then((function(ref) {
          expect(ref.injector.get(appElementToken)).toBe(el);
          async.done();
        }));
      })));
      it('should provide the application component in the injector', inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootCmp, testBindings);
        refPromise.then((function(ref) {
          expect(ref.injector.get(HelloRootCmp)).toBeAnInstanceOf(HelloRootCmp);
          async.done();
        }));
      })));
      it('should display hello world', inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootCmp, testBindings);
        refPromise.then((function(ref) {
          expect(ref.injector.get(appElementToken)).toHaveText('hello world!');
          async.done();
        }));
      })));
      it('should support multiple calls to bootstrap', inject([AsyncTestCompleter], (function(async) {
        var refPromise1 = bootstrap(HelloRootCmp, testBindings);
        var refPromise2 = bootstrap(HelloRootCmp2, testBindings);
        PromiseWrapper.all([refPromise1, refPromise2]).then((function(refs) {
          expect(refs[0].injector.get(appElementToken)).toHaveText('hello world!');
          expect(refs[1].injector.get(appElementToken)).toHaveText('hello world, again!');
          async.done();
        }));
      })));
      it("should make the provided bindings available to the application component", inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootCmp3, [testBindings, bind("appBinding").toValue("BoundValue")]);
        refPromise.then((function(ref) {
          expect(ref.injector.get(HelloRootCmp3).appBinding).toEqual("BoundValue");
          async.done();
        }));
      })));
      it("should avoid cyclic dependencies when root component requires Lifecycle through DI", inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootCmp4, testBindings);
        refPromise.then((function(ref) {
          expect(ref.injector.get(HelloRootCmp4).lc).toBe(ref.injector.get(LifeCycle));
          async.done();
        }));
      })));
      it("should support shadow dom content tag", inject([AsyncTestCompleter], (function(async) {
        var refPromise = bootstrap(HelloRootCmpContent, testBindings);
        refPromise.then((function(ref) {
          expect(ref.injector.get(appElementToken)).toHaveText('before: loading after: done');
          async.done();
        }));
      })));
      it('should register each application with the testability registry', inject([AsyncTestCompleter], (function(async) {
        var refPromise1 = bootstrap(HelloRootCmp, testBindings);
        var refPromise2 = bootstrap(HelloRootCmp2, testBindings);
        PromiseWrapper.all([refPromise1, refPromise2]).then((function(refs) {
          var registry = refs[0].injector.get(TestabilityRegistry);
          PromiseWrapper.all([refs[0].injector.asyncGet(Testability), refs[1].injector.asyncGet(Testability)]).then((function(testabilities) {
            expect(registry.findTestabilityInTree(el)).toEqual(testabilities[0]);
            expect(registry.findTestabilityInTree(el2)).toEqual(testabilities[1]);
            async.done();
          }));
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
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xdescribe = $__m.xdescribe;
      xit = $__m.xit;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
    }, function($__m) {
      appDocumentToken = $__m.appDocumentToken;
      appElementToken = $__m.appElementToken;
    }, function($__m) {
      Component = $__m.Component;
      Decorator = $__m.Decorator;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      bind = $__m.bind;
      Inject = $__m.Inject;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      LifeCycle = $__m.LifeCycle;
    }, function($__m) {
      Testability = $__m.Testability;
      TestabilityRegistry = $__m.TestabilityRegistry;
    }],
    execute: function() {
      HelloRootCmp = (function() {
        var HelloRootCmp = function HelloRootCmp() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(HelloRootCmp, {}, {});
      }());
      Object.defineProperty(HelloRootCmp, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'}), new View({template: '{{greeting}} world!'})];
        }});
      HelloRootCmpContent = (function() {
        var HelloRootCmpContent = function HelloRootCmpContent() {};
        return ($traceurRuntime.createClass)(HelloRootCmpContent, {}, {});
      }());
      Object.defineProperty(HelloRootCmpContent, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'}), new View({template: 'before: <content></content> after: done'})];
        }});
      HelloRootCmp2 = (function() {
        var HelloRootCmp2 = function HelloRootCmp2() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(HelloRootCmp2, {}, {});
      }());
      Object.defineProperty(HelloRootCmp2, "annotations", {get: function() {
          return [new Component({selector: 'hello-app-2'}), new View({template: '{{greeting}} world, again!'})];
        }});
      HelloRootCmp3 = (function() {
        var HelloRootCmp3 = function HelloRootCmp3(appBinding) {
          this.appBinding = appBinding;
        };
        return ($traceurRuntime.createClass)(HelloRootCmp3, {}, {});
      }());
      Object.defineProperty(HelloRootCmp3, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'}), new View({template: ''})];
        }});
      Object.defineProperty(HelloRootCmp3, "parameters", {get: function() {
          return [[new Inject("appBinding")]];
        }});
      HelloRootCmp4 = (function() {
        var HelloRootCmp4 = function HelloRootCmp4(lc) {
          this.lc = lc;
        };
        return ($traceurRuntime.createClass)(HelloRootCmp4, {}, {});
      }());
      Object.defineProperty(HelloRootCmp4, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'}), new View({template: ''})];
        }});
      Object.defineProperty(HelloRootCmp4, "parameters", {get: function() {
          return [[new Inject(LifeCycle)]];
        }});
      HelloRootMissingTemplate = (function() {
        var HelloRootMissingTemplate = function HelloRootMissingTemplate() {
          ;
        };
        return ($traceurRuntime.createClass)(HelloRootMissingTemplate, {}, {});
      }());
      Object.defineProperty(HelloRootMissingTemplate, "annotations", {get: function() {
          return [new Component({selector: 'hello-app'})];
        }});
      HelloRootDirectiveIsNotCmp = (function() {
        var HelloRootDirectiveIsNotCmp = function HelloRootDirectiveIsNotCmp() {
          ;
        };
        return ($traceurRuntime.createClass)(HelloRootDirectiveIsNotCmp, {}, {});
      }());
      Object.defineProperty(HelloRootDirectiveIsNotCmp, "annotations", {get: function() {
          return [new Decorator({selector: 'hello-app'})];
        }});
    }
  };
});
//# sourceMappingURL=application_spec.es6.map

//# sourceMappingURL=./application_spec.js.map