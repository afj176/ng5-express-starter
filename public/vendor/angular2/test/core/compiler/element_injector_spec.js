System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/core/compiler/element_injector", "angular2/src/core/annotations/visibility", "angular2/src/core/annotations/di", "angular2/src/core/annotations/annotations", "angular2/di", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_container", "angular2/src/core/compiler/ng_element", "angular2/change_detection", "angular2/src/render/api", "angular2/src/core/compiler/query_list"], function($__export) {
  "use strict";
  var assert,
      describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      SpyObject,
      proxy,
      el,
      isBlank,
      isPresent,
      IMPLEMENTS,
      ListWrapper,
      MapWrapper,
      List,
      StringMapWrapper,
      iterateListLike,
      ProtoElementInjector,
      PreBuiltObjects,
      DirectiveBinding,
      TreeNode,
      ElementRef,
      Parent,
      Ancestor,
      Attribute,
      Query,
      onDestroy,
      Optional,
      Injector,
      Inject,
      bind,
      AppProtoView,
      AppView,
      ViewContainer,
      NgElement,
      Directive,
      DynamicChangeDetector,
      ChangeDetectorRef,
      Parser,
      Lexer,
      ViewRef,
      Renderer,
      QueryList,
      DummyDirective,
      DummyView,
      SimpleDirective,
      SomeOtherDirective,
      _constructionCount,
      CountingDirective,
      FancyCountingDirective,
      NeedsDirective,
      OptionallyNeedsDirective,
      NeedDirectiveFromParent,
      NeedDirectiveFromAncestor,
      NeedsService,
      HasEventEmitter,
      NeedsAttribute,
      NeedsAttributeNoType,
      NeedsQuery,
      NeedsElementRef,
      A_Needs_B,
      B_Needs_A,
      NeedsView,
      DirectiveWithDestroy,
      TestNode,
      ContextWithHandler,
      FakeRenderer;
  function main() {
    var defaultPreBuiltObjects = new PreBuiltObjects(null, null, null);
    var appInjector = Injector.resolveAndCreate([]);
    function humanize(tree, names) {
      var lookupName = (function(item) {
        return ListWrapper.last(ListWrapper.find(names, (function(pair) {
          return pair[0] === item;
        })));
      });
      if (tree.children.length == 0)
        return lookupName(tree);
      var children = tree.children.map((function(m) {
        return humanize(m, names);
      }));
      return [lookupName(tree), children];
    }
    Object.defineProperty(humanize, "parameters", {get: function() {
        return [[], [List]];
      }});
    function injector(bindings) {
      var lightDomAppInjector = arguments[1] !== (void 0) ? arguments[1] : null;
      var shadowDomAppInjector = arguments[2] !== (void 0) ? arguments[2] : null;
      var preBuiltObjects = arguments[3] !== (void 0) ? arguments[3] : null;
      var attributes = arguments[4] !== (void 0) ? arguments[4] : null;
      if (isBlank(lightDomAppInjector))
        lightDomAppInjector = appInjector;
      var proto = new ProtoElementInjector(null, 0, bindings, isPresent(shadowDomAppInjector));
      proto.attributes = attributes;
      var inj = proto.instantiate(null);
      var preBuilt = isPresent(preBuiltObjects) ? preBuiltObjects : defaultPreBuiltObjects;
      inj.instantiateDirectives(lightDomAppInjector, null, shadowDomAppInjector, preBuilt);
      return inj;
    }
    function parentChildInjectors(parentBindings, childBindings) {
      var parentPreBuildObjects = arguments[2] !== (void 0) ? arguments[2] : null;
      if (isBlank(parentPreBuildObjects))
        parentPreBuildObjects = defaultPreBuiltObjects;
      var inj = Injector.resolveAndCreate([]);
      var protoParent = new ProtoElementInjector(null, 0, parentBindings);
      var parent = protoParent.instantiate(null);
      parent.instantiateDirectives(inj, null, null, parentPreBuildObjects);
      var protoChild = new ProtoElementInjector(protoParent, 1, childBindings, false, 1);
      var child = protoChild.instantiate(parent);
      child.instantiateDirectives(inj, null, null, defaultPreBuiltObjects);
      return child;
    }
    function hostShadowInjectors(hostBindings, shadowBindings) {
      var hostPreBuildObjects = arguments[2] !== (void 0) ? arguments[2] : null;
      if (isBlank(hostPreBuildObjects))
        hostPreBuildObjects = defaultPreBuiltObjects;
      var inj = Injector.resolveAndCreate([]);
      var shadowInj = inj.resolveAndCreateChild([]);
      var protoParent = new ProtoElementInjector(null, 0, hostBindings, true);
      var host = protoParent.instantiate(null);
      host.instantiateDirectives(inj, null, shadowInj, hostPreBuildObjects);
      var protoChild = new ProtoElementInjector(protoParent, 0, shadowBindings, false, 1);
      var shadow = protoChild.instantiate(null);
      shadow.instantiateDirectives(shadowInj, host, null, null);
      return shadow;
    }
    describe('TreeNodes', (function() {
      var root,
          firstParent,
          lastParent,
          node;
      beforeEach((function() {
        root = new TestNode(null, 'root');
        var p1 = firstParent = new TestNode(root, 'p1');
        var p2 = lastParent = new TestNode(root, 'p2');
        node = new TestNode(p1, 'c1');
        new TestNode(p1, 'c2');
        new TestNode(p2, 'c3');
      }));
      function walk(node, f) {
        if (isBlank(node))
          return f;
        f(node);
        ListWrapper.forEach(node.children, (function(n) {
          return walk(n, f);
        }));
      }
      function logWalk(node) {
        var log = '';
        walk(node, (function(n) {
          log += (log.length != 0 ? ', ' : '') + n.toString();
        }));
        return log;
      }
      it('should support listing children', (function() {
        expect(logWalk(root)).toEqual('root, p1, c1, c2, p2, c3');
      }));
      it('should support removing the first child node', (function() {
        firstParent.remove();
        expect(firstParent.parent).toEqual(null);
        expect(logWalk(root)).toEqual('root, p2, c3');
      }));
      it('should support removing the last child node', (function() {
        lastParent.remove();
        expect(logWalk(root)).toEqual('root, p1, c1, c2');
      }));
      it('should support moving a node at the end of children', (function() {
        node.remove();
        root.addChild(node);
        expect(logWalk(root)).toEqual('root, p1, c2, p2, c3, c1');
      }));
      it('should support moving a node in the beginning of children', (function() {
        node.remove();
        lastParent.addChildAfter(node, null);
        expect(logWalk(root)).toEqual('root, p1, c2, p2, c1, c3');
      }));
      it('should support moving a node in the middle of children', (function() {
        node.remove();
        lastParent.addChildAfter(node, firstParent);
        expect(logWalk(root)).toEqual('root, p1, c2, c1, p2, c3');
      }));
    }));
    describe("ProtoElementInjector", (function() {
      describe("direct parent", (function() {
        it("should return parent proto injector when distance is 1", (function() {
          var distance = 1;
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
          expect(protoChild.directParent()).toEqual(protoParent);
        }));
        it("should return null otherwise", (function() {
          var distance = 2;
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
          expect(protoChild.directParent()).toEqual(null);
        }));
        it("should allow for direct access using getDirectiveBindingAtIndex", function() {
          var binding = DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null);
          var proto = new ProtoElementInjector(null, 0, [binding]);
          expect(proto.getDirectiveBindingAtIndex(0)).toBeAnInstanceOf(DirectiveBinding);
          expect((function() {
            return proto.getDirectiveBindingAtIndex(-1);
          })).toThrowError('Index -1 is out-of-bounds.');
          expect((function() {
            return proto.getDirectiveBindingAtIndex(10);
          })).toThrowError('Index 10 is out-of-bounds.');
        });
      }));
      describe('event emitters', (function() {
        it('should return a list of event emitter accessors', (function() {
          var binding = DirectiveBinding.createFromType(HasEventEmitter, new DummyDirective({events: ['emitter']}));
          var inj = new ProtoElementInjector(null, 0, [binding]);
          expect(inj.eventEmitterAccessors.length).toEqual(1);
          var accessor = inj.eventEmitterAccessors[0][0];
          expect(accessor.eventName).toEqual('emitter');
          expect(accessor.getter(new HasEventEmitter())).toEqual('emitter');
        }));
      }));
    }));
    describe("ElementInjector", function() {
      describe("instantiate", function() {
        it("should create an element injector", function() {
          var protoParent = new ProtoElementInjector(null, 0, []);
          var protoChild1 = new ProtoElementInjector(protoParent, 1, []);
          var protoChild2 = new ProtoElementInjector(protoParent, 2, []);
          var p = protoParent.instantiate(null);
          var c1 = protoChild1.instantiate(p);
          var c2 = protoChild2.instantiate(p);
          expect(humanize(p, [[p, 'parent'], [c1, 'child1'], [c2, 'child2']])).toEqual(["parent", ["child1", "child2"]]);
        });
        describe("direct parent", (function() {
          it("should return parent injector when distance is 1", (function() {
            var distance = 1;
            var protoParent = new ProtoElementInjector(null, 0, []);
            var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
            var p = protoParent.instantiate(null);
            var c = protoChild.instantiate(p);
            expect(c.directParent()).toEqual(p);
          }));
          it("should return null otherwise", (function() {
            var distance = 2;
            var protoParent = new ProtoElementInjector(null, 0, []);
            var protoChild = new ProtoElementInjector(protoParent, 1, [], false, distance);
            var p = protoParent.instantiate(null);
            var c = protoChild.instantiate(p);
            expect(c.directParent()).toEqual(null);
          }));
        }));
      });
      describe("hasBindings", function() {
        it("should be true when there are bindings", function() {
          var p = new ProtoElementInjector(null, 0, [SimpleDirective]);
          expect(p.hasBindings).toBeTruthy();
        });
        it("should be false otherwise", function() {
          var p = new ProtoElementInjector(null, 0, []);
          expect(p.hasBindings).toBeFalsy();
        });
      });
      describe("hasInstances", function() {
        it("should be false when no directives are instantiated", function() {
          expect(injector([]).hasInstances()).toBe(false);
        });
        it("should be true when directives are instantiated", function() {
          expect(injector([SimpleDirective]).hasInstances()).toBe(true);
        });
      });
      describe("instantiateDirectives", function() {
        it("should instantiate directives that have no dependencies", function() {
          var inj = injector([SimpleDirective]);
          expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
        });
        it("should instantiate directives that depend on other directives", function() {
          var inj = injector([SimpleDirective, NeedsDirective]);
          var d = inj.get(NeedsDirective);
          expect(d).toBeAnInstanceOf(NeedsDirective);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should instantiate directives that depend on app services", function() {
          var appInjector = Injector.resolveAndCreate([bind("service").toValue("service")]);
          var inj = injector([NeedsService], appInjector);
          var d = inj.get(NeedsService);
          expect(d).toBeAnInstanceOf(NeedsService);
          expect(d.service).toEqual("service");
        });
        it("should instantiate directives that depend on pre built objects", function() {
          var view = new DummyView();
          var inj = injector([NeedsView], null, null, new PreBuiltObjects(view, null, null));
          expect(inj.get(NeedsView).view).toBe(view);
        });
        it("should instantiate directives that depend on the containing component", function() {
          var shadow = hostShadowInjectors([SimpleDirective], [NeedsDirective]);
          var d = shadow.get(NeedsDirective);
          expect(d).toBeAnInstanceOf(NeedsDirective);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should not instantiate directives that depend on other directives in the containing component's ElementInjector", (function() {
          expect((function() {
            hostShadowInjectors([SomeOtherDirective, SimpleDirective], [NeedsDirective]);
          })).toThrowError('No provider for SimpleDirective! (NeedsDirective -> SimpleDirective)');
        }));
        it("should instantiate component directives that depend on app services in the shadow app injector", (function() {
          var shadowAppInjector = Injector.resolveAndCreate([bind("service").toValue("service")]);
          var inj = injector([NeedsService], null, shadowAppInjector);
          var d = inj.get(NeedsService);
          expect(d).toBeAnInstanceOf(NeedsService);
          expect(d.service).toEqual("service");
        }));
        it("should not instantiate other directives that depend on app services in the shadow app injector", (function() {
          var shadowAppInjector = Injector.resolveAndCreate([bind("service").toValue("service")]);
          expect((function() {
            injector([SomeOtherDirective, NeedsService], null, shadowAppInjector);
          })).toThrowError('No provider for service! (NeedsService -> service)');
        }));
        it("should return app services", function() {
          var appInjector = Injector.resolveAndCreate([bind("service").toValue("service")]);
          var inj = injector([], appInjector);
          expect(inj.get('service')).toEqual('service');
        });
        it("should get directives from parent", function() {
          var child = parentChildInjectors([SimpleDirective], [NeedDirectiveFromParent]);
          var d = child.get(NeedDirectiveFromParent);
          expect(d).toBeAnInstanceOf(NeedDirectiveFromParent);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should not return parent's directives on self", function() {
          expect((function() {
            injector([SimpleDirective, NeedDirectiveFromParent]);
          })).toThrowError();
        });
        it("should get directives from ancestor", function() {
          var child = parentChildInjectors([SimpleDirective], [NeedDirectiveFromAncestor]);
          var d = child.get(NeedDirectiveFromAncestor);
          expect(d).toBeAnInstanceOf(NeedDirectiveFromAncestor);
          expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
        });
        it("should throw when no SimpleDirective found", function() {
          expect((function() {
            return injector([NeedDirectiveFromParent]);
          })).toThrowError('No provider for SimpleDirective! (NeedDirectiveFromParent -> SimpleDirective)');
        });
        it("should inject null when no directive found", function() {
          var inj = injector([OptionallyNeedsDirective]);
          var d = inj.get(OptionallyNeedsDirective);
          expect(d.dependency).toEqual(null);
        });
        it("should accept SimpleDirective bindings instead of SimpleDirective types", function() {
          var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
          expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
        });
        it("should allow for direct access using getDirectiveAtIndex", function() {
          var inj = injector([DirectiveBinding.createFromBinding(bind(SimpleDirective).toClass(SimpleDirective), null)]);
          expect(inj.getDirectiveAtIndex(0)).toBeAnInstanceOf(SimpleDirective);
          expect((function() {
            return inj.getDirectiveAtIndex(-1);
          })).toThrowError('Index -1 is out-of-bounds.');
          expect((function() {
            return inj.getDirectiveAtIndex(10);
          })).toThrowError('Index 10 is out-of-bounds.');
        });
        it("should handle cyclic dependencies", function() {
          expect((function() {
            var bAneedsB = bind(A_Needs_B).toFactory((function(a) {
              return new A_Needs_B(a);
            }), [B_Needs_A]);
            var bBneedsA = bind(B_Needs_A).toFactory((function(a) {
              return new B_Needs_A(a);
            }), [A_Needs_B]);
            injector([DirectiveBinding.createFromBinding(bAneedsB, null), DirectiveBinding.createFromBinding(bBneedsA, null)]);
          })).toThrowError('Cannot instantiate cyclic dependency! ' + '(A_Needs_B -> B_Needs_A -> A_Needs_B)');
        });
        it("should call onDestroy on directives subscribed to this event", function() {
          var inj = injector([DirectiveBinding.createFromType(DirectiveWithDestroy, new DummyDirective({lifecycle: [onDestroy]}))]);
          var destroy = inj.get(DirectiveWithDestroy);
          inj.clearDirectives();
          expect(destroy.onDestroyCounter).toBe(1);
        });
      });
      describe("pre built objects", function() {
        it("should return view", function() {
          var view = new DummyView();
          var inj = injector([], null, null, new PreBuiltObjects(view, null, null));
          expect(inj.get(AppView)).toEqual(view);
        });
        it("should return element", function() {
          var element = new NgElement(null, null);
          var inj = injector([], null, null, new PreBuiltObjects(null, element, null));
          expect(inj.get(NgElement)).toEqual(element);
        });
        it('should return viewContainer', function() {
          var viewContainer = new ViewContainer(null, null, null);
          var view = new DummyView();
          view.spy('getOrCreateViewContainer').andCallFake((function(index) {
            return viewContainer;
          }));
          var inj = injector([], null, null, new PreBuiltObjects(view, null, null));
          expect(inj.get(ViewContainer)).toEqual(viewContainer);
        });
        it('should return changeDetectorRef', function() {
          var cd = new DynamicChangeDetector(null, null, null, [], []);
          var inj = injector([], null, null, new PreBuiltObjects(null, null, cd));
          expect(inj.get(ChangeDetectorRef)).toBe(cd.ref);
        });
      });
      describe("dynamicallyCreateComponent", (function() {
        it("should create a component dynamically", (function() {
          var inj = injector([]);
          inj.dynamicallyCreateComponent(DirectiveBinding.createFromType(SimpleDirective, null), null);
          expect(inj.getDynamicallyLoadedComponent()).toBeAnInstanceOf(SimpleDirective);
          expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
        }));
        it("should inject parent dependencies into the dynamically-loaded component", (function() {
          var inj = parentChildInjectors([SimpleDirective], []);
          inj.dynamicallyCreateComponent(DirectiveBinding.createFromType(NeedDirectiveFromAncestor, null), null);
          expect(inj.getDynamicallyLoadedComponent()).toBeAnInstanceOf(NeedDirectiveFromAncestor);
          expect(inj.getDynamicallyLoadedComponent().dependency).toBeAnInstanceOf(SimpleDirective);
        }));
        it("should not inject the proxy component into the children of the dynamically-loaded component", (function() {
          var injWithDynamicallyLoadedComponent = injector([SimpleDirective]);
          injWithDynamicallyLoadedComponent.dynamicallyCreateComponent(DirectiveBinding.createFromType(SomeOtherDirective, null), null);
          var shadowDomProtoInjector = new ProtoElementInjector(null, 0, [NeedDirectiveFromAncestor], false);
          var shadowDomInj = shadowDomProtoInjector.instantiate(null);
          expect((function() {
            return shadowDomInj.instantiateDirectives(appInjector, injWithDynamicallyLoadedComponent, null, defaultPreBuiltObjects);
          })).toThrowError(new RegExp("No provider for SimpleDirective"));
        }));
        it("should not inject the dynamically-loaded component into directives on the same element", (function() {
          var proto = new ProtoElementInjector(null, 0, [NeedsDirective], false);
          var inj = proto.instantiate(null);
          inj.dynamicallyCreateComponent(DirectiveBinding.createFromType(SimpleDirective, null), null);
          expect((function() {
            return inj.instantiateDirectives(null, null, null, null);
          })).toThrowError();
        }));
        it("should inject the dynamically-loaded component into the children of the dynamically-loaded component", (function() {
          var injWithDynamicallyLoadedComponent = injector([]);
          injWithDynamicallyLoadedComponent.dynamicallyCreateComponent(DirectiveBinding.createFromType(SimpleDirective, null), null);
          var shadowDomProtoInjector = new ProtoElementInjector(null, 0, [NeedDirectiveFromAncestor], false);
          var shadowDomInjector = shadowDomProtoInjector.instantiate(null);
          shadowDomInjector.instantiateDirectives(appInjector, injWithDynamicallyLoadedComponent, null, defaultPreBuiltObjects);
          expect(shadowDomInjector.get(NeedDirectiveFromAncestor)).toBeAnInstanceOf(NeedDirectiveFromAncestor);
          expect(shadowDomInjector.get(NeedDirectiveFromAncestor).dependency).toBeAnInstanceOf(SimpleDirective);
        }));
        it("should remove the dynamically-loaded component when dehydrating", (function() {
          var inj = injector([]);
          inj.dynamicallyCreateComponent(DirectiveBinding.createFromType(DirectiveWithDestroy, new DummyDirective({lifecycle: [onDestroy]})), null);
          var dir = inj.getDynamicallyLoadedComponent();
          inj.clearDirectives();
          expect(inj.getDynamicallyLoadedComponent()).toBe(null);
          expect(dir.onDestroyCounter).toBe(1);
          inj.instantiateDirectives(null, null, null, null);
          expect(inj.getDynamicallyLoadedComponent()).toBe(null);
        }));
        it("should inject services of the dynamically-loaded component", (function() {
          var inj = injector([]);
          var appInjector = Injector.resolveAndCreate([bind("service").toValue("Service")]);
          inj.dynamicallyCreateComponent(DirectiveBinding.createFromType(NeedsService, null), appInjector);
          expect(inj.getDynamicallyLoadedComponent().service).toEqual("Service");
        }));
      }));
      describe('static attributes', (function() {
        it('should be injectable', (function() {
          var attributes = MapWrapper.create();
          MapWrapper.set(attributes, 'type', 'text');
          MapWrapper.set(attributes, 'title', '');
          var inj = injector([NeedsAttribute], null, null, null, attributes);
          var needsAttribute = inj.get(NeedsAttribute);
          expect(needsAttribute.typeAttribute).toEqual('text');
          expect(needsAttribute.titleAttribute).toEqual('');
          expect(needsAttribute.fooAttribute).toEqual(null);
        }));
        it('should be injectable without type annotation', (function() {
          var attributes = MapWrapper.create();
          MapWrapper.set(attributes, 'foo', 'bar');
          var inj = injector([NeedsAttributeNoType], null, null, null, attributes);
          var needsAttribute = inj.get(NeedsAttributeNoType);
          expect(needsAttribute.fooAttribute).toEqual('bar');
        }));
      }));
      describe("ElementRef", (function() {
        it("should inject ElementRef", (function() {
          var inj = injector([NeedsElementRef]);
          expect(inj.get(NeedsElementRef).elementRef).toBeAnInstanceOf(ElementRef);
        }));
        it('should return the viewContainer from the view', (function() {
          var viewContainer = new ViewContainer(null, null, null);
          var view = new DummyView();
          view.spy('getOrCreateViewContainer').andCallFake((function(index) {
            return viewContainer;
          }));
          var inj = injector([NeedsElementRef], null, null, new PreBuiltObjects(view, null, null));
          expect(inj.get(NeedsElementRef).elementRef.viewContainer).toBe(viewContainer);
        }));
      }));
      describe('directive queries', (function() {
        var preBuildObjects = defaultPreBuiltObjects;
        beforeEach((function() {
          _constructionCount = 0;
        }));
        function expectDirectives(query, type, expectedIndex) {
          var currentCount = 0;
          iterateListLike(query, (function(i) {
            expect(i).toBeAnInstanceOf(type);
            expect(i.count).toBe(expectedIndex[currentCount]);
            currentCount += 1;
          }));
        }
        it('should be injectable', (function() {
          var inj = injector([NeedsQuery], null, null, preBuildObjects);
          expect(inj.get(NeedsQuery).query).toBeAnInstanceOf(QueryList);
        }));
        it('should contain directives on the same injector', (function() {
          var inj = injector([NeedsQuery, CountingDirective], null, null, preBuildObjects);
          expectDirectives(inj.get(NeedsQuery).query, CountingDirective, [0]);
        }));
        it('should contain directives on the same and a child injector in construction order', (function() {
          var protoParent = new ProtoElementInjector(null, 0, [NeedsQuery, CountingDirective]);
          var protoChild = new ProtoElementInjector(protoParent, 1, [CountingDirective]);
          var parent = protoParent.instantiate(null);
          var child = protoChild.instantiate(parent);
          parent.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          expectDirectives(parent.get(NeedsQuery).query, CountingDirective, [0, 1]);
        }));
        it('should reflect unlinking an injector', (function() {
          var protoParent = new ProtoElementInjector(null, 0, [NeedsQuery, CountingDirective]);
          var protoChild = new ProtoElementInjector(protoParent, 1, [CountingDirective]);
          var parent = protoParent.instantiate(null);
          var child = protoChild.instantiate(parent);
          parent.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child.unlink();
          expectDirectives(parent.get(NeedsQuery).query, CountingDirective, [0]);
        }));
        it('should reflect moving an injector as a last child', (function() {
          var protoParent = new ProtoElementInjector(null, 0, [NeedsQuery, CountingDirective]);
          var protoChild1 = new ProtoElementInjector(protoParent, 1, [CountingDirective]);
          var protoChild2 = new ProtoElementInjector(protoParent, 1, [CountingDirective]);
          var parent = protoParent.instantiate(null);
          var child1 = protoChild1.instantiate(parent);
          var child2 = protoChild2.instantiate(parent);
          parent.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child1.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child2.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child1.unlink();
          child1.link(parent);
          var queryList = parent.get(NeedsQuery).query;
          expectDirectives(queryList, CountingDirective, [0, 2, 1]);
        }));
        it('should reflect moving an injector as a first child', (function() {
          var protoParent = new ProtoElementInjector(null, 0, [NeedsQuery, CountingDirective]);
          var protoChild1 = new ProtoElementInjector(protoParent, 1, [CountingDirective]);
          var protoChild2 = new ProtoElementInjector(protoParent, 1, [CountingDirective]);
          var parent = protoParent.instantiate(null);
          var child1 = protoChild1.instantiate(parent);
          var child2 = protoChild2.instantiate(parent);
          parent.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child1.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child2.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child2.unlink();
          child2.linkAfter(parent, null);
          var queryList = parent.get(NeedsQuery).query;
          expectDirectives(queryList, CountingDirective, [0, 2, 1]);
        }));
        it('should support two concurrent queries for the same directive', (function() {
          var protoGrandParent = new ProtoElementInjector(null, 0, [NeedsQuery]);
          var protoParent = new ProtoElementInjector(null, 0, [NeedsQuery]);
          var protoChild = new ProtoElementInjector(protoParent, 1, [CountingDirective]);
          var grandParent = protoGrandParent.instantiate(null);
          var parent = protoParent.instantiate(grandParent);
          var child = protoChild.instantiate(parent);
          grandParent.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          parent.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          child.instantiateDirectives(Injector.resolveAndCreate([]), null, null, preBuildObjects);
          var queryList1 = grandParent.get(NeedsQuery).query;
          var queryList2 = parent.get(NeedsQuery).query;
          expectDirectives(queryList1, CountingDirective, [0]);
          expectDirectives(queryList2, CountingDirective, [0]);
          child.unlink();
          expectDirectives(queryList1, CountingDirective, []);
          expectDirectives(queryList2, CountingDirective, []);
        }));
      }));
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      xdescribe = $__m.xdescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      SpyObject = $__m.SpyObject;
      proxy = $__m.proxy;
      el = $__m.el;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      IMPLEMENTS = $__m.IMPLEMENTS;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
      StringMapWrapper = $__m.StringMapWrapper;
      iterateListLike = $__m.iterateListLike;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
      PreBuiltObjects = $__m.PreBuiltObjects;
      DirectiveBinding = $__m.DirectiveBinding;
      TreeNode = $__m.TreeNode;
      ElementRef = $__m.ElementRef;
    }, function($__m) {
      Parent = $__m.Parent;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      Attribute = $__m.Attribute;
      Query = $__m.Query;
    }, function($__m) {
      onDestroy = $__m.onDestroy;
      Directive = $__m.Directive;
    }, function($__m) {
      Optional = $__m.Optional;
      Injector = $__m.Injector;
      Inject = $__m.Inject;
      bind = $__m.bind;
    }, function($__m) {
      AppProtoView = $__m.AppProtoView;
      AppView = $__m.AppView;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      DynamicChangeDetector = $__m.DynamicChangeDetector;
      ChangeDetectorRef = $__m.ChangeDetectorRef;
      Parser = $__m.Parser;
      Lexer = $__m.Lexer;
    }, function($__m) {
      ViewRef = $__m.ViewRef;
      Renderer = $__m.Renderer;
    }, function($__m) {
      QueryList = $__m.QueryList;
    }],
    execute: function() {
      DummyDirective = (function($__super) {
        var DummyDirective = function DummyDirective() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              lifecycle = $__1.lifecycle,
              events = $__1.events;
          $traceurRuntime.superConstructor(DummyDirective).call(this, {
            lifecycle: lifecycle,
            events: events
          });
        };
        return ($traceurRuntime.createClass)(DummyDirective, {}, {}, $__super);
      }(Directive));
      DummyView = (function($__super) {
        var DummyView = function DummyView() {
          $traceurRuntime.superConstructor(DummyView).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(DummyView, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, DummyView.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(DummyView, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(AppView)];
        }});
      SimpleDirective = (function() {
        var SimpleDirective = function SimpleDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SimpleDirective, {}, {});
      }());
      SomeOtherDirective = (function() {
        var SomeOtherDirective = function SomeOtherDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeOtherDirective, {}, {});
      }());
      _constructionCount = 0;
      CountingDirective = (function() {
        var CountingDirective = function CountingDirective() {
          this.count = _constructionCount;
          _constructionCount += 1;
        };
        return ($traceurRuntime.createClass)(CountingDirective, {}, {});
      }());
      FancyCountingDirective = (function($__super) {
        var FancyCountingDirective = function FancyCountingDirective() {
          $traceurRuntime.superConstructor(FancyCountingDirective).call(this);
        };
        return ($traceurRuntime.createClass)(FancyCountingDirective, {}, {}, $__super);
      }(CountingDirective));
      NeedsDirective = (function() {
        var NeedsDirective = function NeedsDirective(dependency) {
          assert.argumentTypes(dependency, SimpleDirective);
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedsDirective, {}, {});
      }());
      Object.defineProperty(NeedsDirective, "parameters", {get: function() {
          return [[SimpleDirective]];
        }});
      OptionallyNeedsDirective = (function() {
        var OptionallyNeedsDirective = function OptionallyNeedsDirective(dependency) {
          assert.argumentTypes(dependency, SimpleDirective);
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(OptionallyNeedsDirective, {}, {});
      }());
      Object.defineProperty(OptionallyNeedsDirective, "parameters", {get: function() {
          return [[SimpleDirective, new Optional()]];
        }});
      NeedDirectiveFromParent = (function() {
        var NeedDirectiveFromParent = function NeedDirectiveFromParent(dependency) {
          assert.argumentTypes(dependency, SimpleDirective);
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedDirectiveFromParent, {}, {});
      }());
      Object.defineProperty(NeedDirectiveFromParent, "parameters", {get: function() {
          return [[SimpleDirective, new Parent()]];
        }});
      NeedDirectiveFromAncestor = (function() {
        var NeedDirectiveFromAncestor = function NeedDirectiveFromAncestor(dependency) {
          assert.argumentTypes(dependency, SimpleDirective);
          this.dependency = dependency;
        };
        return ($traceurRuntime.createClass)(NeedDirectiveFromAncestor, {}, {});
      }());
      Object.defineProperty(NeedDirectiveFromAncestor, "parameters", {get: function() {
          return [[SimpleDirective, new Ancestor()]];
        }});
      NeedsService = (function() {
        var NeedsService = function NeedsService(service) {
          this.service = service;
        };
        return ($traceurRuntime.createClass)(NeedsService, {}, {});
      }());
      Object.defineProperty(NeedsService, "parameters", {get: function() {
          return [[new Inject("service")]];
        }});
      HasEventEmitter = (function() {
        var HasEventEmitter = function HasEventEmitter() {
          this.emitter = "emitter";
        };
        return ($traceurRuntime.createClass)(HasEventEmitter, {}, {});
      }());
      NeedsAttribute = (function() {
        var NeedsAttribute = function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
          assert.argumentTypes(typeAttribute, assert.type.string, titleAttribute, assert.type.string, fooAttribute, assert.type.string);
          this.typeAttribute = typeAttribute;
          this.titleAttribute = titleAttribute;
          this.fooAttribute = fooAttribute;
        };
        return ($traceurRuntime.createClass)(NeedsAttribute, {}, {});
      }());
      Object.defineProperty(NeedsAttribute, "parameters", {get: function() {
          return [[assert.type.string, new Attribute('type')], [assert.type.string, new Attribute('title')], [assert.type.string, new Attribute('foo')]];
        }});
      NeedsAttributeNoType = (function() {
        var NeedsAttributeNoType = function NeedsAttributeNoType(fooAttribute) {
          this.fooAttribute = fooAttribute;
        };
        return ($traceurRuntime.createClass)(NeedsAttributeNoType, {}, {});
      }());
      Object.defineProperty(NeedsAttributeNoType, "parameters", {get: function() {
          return [[new Attribute('foo')]];
        }});
      NeedsQuery = (function() {
        var NeedsQuery = function NeedsQuery(query) {
          assert.argumentTypes(query, QueryList);
          this.query = query;
        };
        return ($traceurRuntime.createClass)(NeedsQuery, {}, {});
      }());
      Object.defineProperty(NeedsQuery, "parameters", {get: function() {
          return [[QueryList, new Query(CountingDirective)]];
        }});
      NeedsElementRef = (function() {
        var NeedsElementRef = function NeedsElementRef(ref) {
          assert.argumentTypes(ref, ElementRef);
          this.elementRef = ref;
        };
        return ($traceurRuntime.createClass)(NeedsElementRef, {}, {});
      }());
      Object.defineProperty(NeedsElementRef, "parameters", {get: function() {
          return [[ElementRef]];
        }});
      A_Needs_B = (function() {
        var A_Needs_B = function A_Needs_B(dep) {};
        return ($traceurRuntime.createClass)(A_Needs_B, {}, {});
      }());
      B_Needs_A = (function() {
        var B_Needs_A = function B_Needs_A(dep) {};
        return ($traceurRuntime.createClass)(B_Needs_A, {}, {});
      }());
      NeedsView = (function() {
        var NeedsView = function NeedsView(view) {
          this.view = view;
        };
        return ($traceurRuntime.createClass)(NeedsView, {}, {});
      }());
      Object.defineProperty(NeedsView, "parameters", {get: function() {
          return [[new Inject(AppView)]];
        }});
      DirectiveWithDestroy = (function() {
        var DirectiveWithDestroy = function DirectiveWithDestroy() {
          this.onDestroyCounter = 0;
        };
        return ($traceurRuntime.createClass)(DirectiveWithDestroy, {onDestroy: function() {
            this.onDestroyCounter++;
          }}, {});
      }());
      TestNode = (function($__super) {
        var TestNode = function TestNode(parent, message) {
          assert.argumentTypes(parent, TestNode, message, assert.type.any);
          $traceurRuntime.superConstructor(TestNode).call(this, parent);
          this.message = message;
        };
        return ($traceurRuntime.createClass)(TestNode, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(TreeNode));
      Object.defineProperty(TestNode, "parameters", {get: function() {
          return [[TestNode], []];
        }});
      ContextWithHandler = (function() {
        var ContextWithHandler = function ContextWithHandler(handler) {
          this.handler = handler;
        };
        return ($traceurRuntime.createClass)(ContextWithHandler, {}, {});
      }());
      FakeRenderer = (function($__super) {
        var FakeRenderer = function FakeRenderer() {
          $traceurRuntime.superConstructor(FakeRenderer).call(this);
          this.log = [];
        };
        return ($traceurRuntime.createClass)(FakeRenderer, {setElementProperty: function(viewRef, elementIndex, propertyName, value) {
            ListWrapper.push(this.log, [viewRef, elementIndex, propertyName, value]);
          }}, {}, $__super);
      }(Renderer));
    }
  };
});
//# sourceMappingURL=element_injector_spec.es6.map

//# sourceMappingURL=./element_injector_spec.js.map