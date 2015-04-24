System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/math", "angular2/src/facade/collection", "angular2/di", "angular2/src/core/annotations/visibility", "angular2/src/core/annotations/di", "angular2/src/core/compiler/view", "angular2/src/core/compiler/view_container", "angular2/src/core/compiler/ng_element", "angular2/src/core/annotations/annotations", "angular2/change_detection", "./query_list", "angular2/src/reflection/reflection"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      Type,
      int,
      BaseException,
      EventEmitter,
      ObservableWrapper,
      Math,
      List,
      ListWrapper,
      MapWrapper,
      Injector,
      Key,
      Dependency,
      bind,
      Binding,
      ResolvedBinding,
      NoBindingError,
      AbstractBindingError,
      CyclicDependencyError,
      Parent,
      Ancestor,
      Attribute,
      Query,
      viewModule,
      ViewContainer,
      NgElement,
      Directive,
      Component,
      onChange,
      onDestroy,
      onAllChangesDone,
      ChangeDetector,
      ChangeDetectorRef,
      QueryList,
      reflector,
      _MAX_DIRECTIVE_CONSTRUCTION_COUNTER,
      MAX_DEPTH,
      _undefined,
      _staticKeys,
      ElementRef,
      StaticKeys,
      TreeNode,
      DirectiveDependency,
      DirectiveBinding,
      PreBuiltObjects,
      EventEmitterAccessor,
      ProtoElementInjector,
      ElementInjector,
      OutOfBoundsAccess,
      QueryError,
      QueryRef;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      Type = $__m.Type;
      int = $__m.int;
      BaseException = $__m.BaseException;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      Math = $__m.Math;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Injector = $__m.Injector;
      Key = $__m.Key;
      Dependency = $__m.Dependency;
      bind = $__m.bind;
      Binding = $__m.Binding;
      ResolvedBinding = $__m.ResolvedBinding;
      NoBindingError = $__m.NoBindingError;
      AbstractBindingError = $__m.AbstractBindingError;
      CyclicDependencyError = $__m.CyclicDependencyError;
    }, function($__m) {
      Parent = $__m.Parent;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      Attribute = $__m.Attribute;
      Query = $__m.Query;
    }, function($__m) {
      viewModule = $__m;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }, function($__m) {
      NgElement = $__m.NgElement;
    }, function($__m) {
      Directive = $__m.Directive;
      Component = $__m.Component;
      onChange = $__m.onChange;
      onDestroy = $__m.onDestroy;
      onAllChangesDone = $__m.onAllChangesDone;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
      ChangeDetectorRef = $__m.ChangeDetectorRef;
    }, function($__m) {
      QueryList = $__m.QueryList;
    }, function($__m) {
      reflector = $__m.reflector;
    }],
    execute: function() {
      _MAX_DIRECTIVE_CONSTRUCTION_COUNTER = 10;
      MAX_DEPTH = Math.pow(2, 30) - 1;
      _undefined = new Object();
      ElementRef = $__export("ElementRef", (function() {
        var ElementRef = function ElementRef(elementInjector, hostView, boundElementIndex, injector) {
          this.elementInjector = elementInjector;
          this.hostView = hostView;
          this.boundElementIndex = boundElementIndex;
          this.injector = injector;
        };
        return ($traceurRuntime.createClass)(ElementRef, {get viewContainer() {
            return this.hostView.getOrCreateViewContainer(this.boundElementIndex);
          }}, {});
      }()));
      StaticKeys = (function() {
        var StaticKeys = function StaticKeys() {
          this.viewId = Key.get(viewModule.AppView).id;
          this.ngElementId = Key.get(NgElement).id;
          this.viewContainerId = Key.get(ViewContainer).id;
          this.changeDetectorRefId = Key.get(ChangeDetectorRef).id;
          this.elementRefId = Key.get(ElementRef).id;
        };
        return ($traceurRuntime.createClass)(StaticKeys, {}, {instance: function() {
            if (isBlank(_staticKeys))
              _staticKeys = new StaticKeys();
            return assert.returnType((_staticKeys), StaticKeys);
          }});
      }());
      TreeNode = $__export("TreeNode", (function() {
        var TreeNode = function TreeNode(parent) {
          assert.argumentTypes(parent, TreeNode);
          this._head = null;
          this._tail = null;
          this._next = null;
          if (isPresent(parent))
            parent.addChild(this);
        };
        return ($traceurRuntime.createClass)(TreeNode, {
          _assertConsistency: function() {
            this._assertHeadBeforeTail();
            this._assertTailReachable();
            this._assertPresentInParentList();
          },
          _assertHeadBeforeTail: function() {
            if (isBlank(this._tail) && isPresent(this._head))
              throw new BaseException('null tail but non-null head');
          },
          _assertTailReachable: function() {
            if (isBlank(this._tail))
              return ;
            if (isPresent(this._tail._next))
              throw new BaseException('node after tail');
            var p = this._head;
            while (isPresent(p) && p != this._tail)
              p = p._next;
            if (isBlank(p) && isPresent(this._tail))
              throw new BaseException('tail not reachable.');
          },
          _assertPresentInParentList: function() {
            var p = this._parent;
            if (isBlank(p)) {
              return ;
            }
            var cur = p._head;
            while (isPresent(cur) && cur != this)
              cur = cur._next;
            if (isBlank(cur))
              throw new BaseException('node not reachable through parent.');
          },
          addChild: function(child) {
            assert.argumentTypes(child, TreeNode);
            if (isPresent(this._tail)) {
              this._tail._next = child;
              this._tail = child;
            } else {
              this._tail = this._head = child;
            }
            child._next = null;
            child._parent = this;
            this._assertConsistency();
          },
          addChildAfter: function(child, prevSibling) {
            assert.argumentTypes(child, TreeNode, prevSibling, TreeNode);
            this._assertConsistency();
            if (isBlank(prevSibling)) {
              var prevHead = this._head;
              this._head = child;
              child._next = prevHead;
              if (isBlank(this._tail))
                this._tail = child;
            } else if (isBlank(prevSibling._next)) {
              this.addChild(child);
              return ;
            } else {
              prevSibling._assertPresentInParentList();
              child._next = prevSibling._next;
              prevSibling._next = child;
            }
            child._parent = this;
            this._assertConsistency();
          },
          remove: function() {
            this._assertConsistency();
            if (isBlank(this.parent))
              return ;
            var nextSibling = this._next;
            var prevSibling = this._findPrev();
            if (isBlank(prevSibling)) {
              this.parent._head = this._next;
            } else {
              prevSibling._next = this._next;
            }
            if (isBlank(nextSibling)) {
              this._parent._tail = prevSibling;
            }
            this._parent._assertConsistency();
            this._parent = null;
            this._next = null;
            this._assertConsistency();
          },
          _findPrev: function() {
            var node = this.parent._head;
            if (node == this)
              return null;
            while (node._next !== this)
              node = node._next;
            return node;
          },
          get parent() {
            return this._parent;
          },
          get children() {
            var res = [];
            var child = this._head;
            while (child != null) {
              ListWrapper.push(res, child);
              child = child._next;
            }
            return res;
          }
        }, {});
      }()));
      Object.defineProperty(TreeNode, "parameters", {get: function() {
          return [[TreeNode]];
        }});
      Object.defineProperty(TreeNode.prototype.addChild, "parameters", {get: function() {
          return [[TreeNode]];
        }});
      Object.defineProperty(TreeNode.prototype.addChildAfter, "parameters", {get: function() {
          return [[TreeNode], [TreeNode]];
        }});
      DirectiveDependency = $__export("DirectiveDependency", (function($__super) {
        var DirectiveDependency = function DirectiveDependency(key, asPromise, lazy, optional, properties, depth, attributeName, queryDirective) {
          assert.argumentTypes(key, Key, asPromise, assert.type.boolean, lazy, assert.type.boolean, optional, assert.type.boolean, properties, List, depth, int, attributeName, assert.type.string, queryDirective, assert.type.any);
          $traceurRuntime.superConstructor(DirectiveDependency).call(this, key, asPromise, lazy, optional, properties);
          this.depth = depth;
          this.attributeName = attributeName;
          this.queryDirective = queryDirective;
          this._verify();
        };
        return ($traceurRuntime.createClass)(DirectiveDependency, {_verify: function() {
            var count = 0;
            if (isPresent(this.queryDirective))
              count++;
            if (isPresent(this.attributeName))
              count++;
            if (count > 1)
              throw new BaseException('A directive injectable can contain only one of the following @Attribute or @Query.');
          }}, {
          createFrom: function(d) {
            assert.argumentTypes(d, Dependency);
            return assert.returnType((new DirectiveDependency(d.key, d.asPromise, d.lazy, d.optional, d.properties, DirectiveDependency._depth(d.properties), DirectiveDependency._attributeName(d.properties), DirectiveDependency._query(d.properties))), Dependency);
          },
          _depth: function(properties) {
            if (properties.length == 0)
              return assert.returnType((0), int);
            if (ListWrapper.any(properties, (function(p) {
              return p instanceof Parent;
            })))
              return assert.returnType((1), int);
            if (ListWrapper.any(properties, (function(p) {
              return p instanceof Ancestor;
            })))
              return assert.returnType((MAX_DEPTH), int);
            return assert.returnType((0), int);
          },
          _attributeName: function(properties) {
            var p = ListWrapper.find(properties, (function(p) {
              return p instanceof Attribute;
            }));
            return assert.returnType((isPresent(p) ? p.attributeName : null), assert.type.string);
          },
          _query: function(properties) {
            var p = ListWrapper.find(properties, (function(p) {
              return p instanceof Query;
            }));
            return isPresent(p) ? p.directive : null;
          }
        }, $__super);
      }(Dependency)));
      Object.defineProperty(DirectiveDependency, "parameters", {get: function() {
          return [[Key], [assert.type.boolean], [assert.type.boolean], [assert.type.boolean], [List], [int], [assert.type.string], []];
        }});
      Object.defineProperty(DirectiveDependency.createFrom, "parameters", {get: function() {
          return [[Dependency]];
        }});
      DirectiveBinding = $__export("DirectiveBinding", (function($__super) {
        var DirectiveBinding = function DirectiveBinding(key, factory, dependencies, providedAsPromise, annotation) {
          assert.argumentTypes(key, Key, factory, Function, dependencies, List, providedAsPromise, assert.type.boolean, annotation, Directive);
          $traceurRuntime.superConstructor(DirectiveBinding).call(this, key, factory, dependencies, providedAsPromise);
          this.callOnDestroy = isPresent(annotation) && annotation.hasLifecycleHook(onDestroy);
          this.callOnChange = isPresent(annotation) && annotation.hasLifecycleHook(onChange);
          this.callOnAllChangesDone = isPresent(annotation) && annotation.hasLifecycleHook(onAllChangesDone);
          this.annotation = annotation;
          if (annotation instanceof Component && isPresent(annotation.injectables)) {
            this.resolvedInjectables = Injector.resolve(annotation.injectables);
          }
        };
        return ($traceurRuntime.createClass)(DirectiveBinding, {
          get displayName() {
            return this.key.displayName;
          },
          get eventEmitters() {
            return assert.returnType((isPresent(this.annotation) && isPresent(this.annotation.events) ? this.annotation.events : []), assert.genericType(List, assert.type.string));
          },
          get changeDetection() {
            if (this.annotation instanceof Component) {
              var c = assert.type(this.annotation, Component);
              return c.changeDetection;
            } else {
              return null;
            }
          }
        }, {
          createFromBinding: function(b, annotation) {
            assert.argumentTypes(b, Binding, annotation, Directive);
            var rb = b.resolve();
            var deps = ListWrapper.map(rb.dependencies, DirectiveDependency.createFrom);
            return assert.returnType((new DirectiveBinding(rb.key, rb.factory, deps, rb.providedAsPromise, annotation)), DirectiveBinding);
          },
          createFromType: function(type, annotation) {
            assert.argumentTypes(type, Type, annotation, Directive);
            var binding = new Binding(type, {toClass: type});
            return assert.returnType((DirectiveBinding.createFromBinding(binding, annotation)), DirectiveBinding);
          }
        }, $__super);
      }(ResolvedBinding)));
      Object.defineProperty(DirectiveBinding, "parameters", {get: function() {
          return [[Key], [Function], [List], [assert.type.boolean], [Directive]];
        }});
      Object.defineProperty(DirectiveBinding.createFromBinding, "parameters", {get: function() {
          return [[Binding], [Directive]];
        }});
      Object.defineProperty(DirectiveBinding.createFromType, "parameters", {get: function() {
          return [[Type], [Directive]];
        }});
      PreBuiltObjects = $__export("PreBuiltObjects", (function() {
        var PreBuiltObjects = function PreBuiltObjects(view, element, changeDetector) {
          assert.argumentTypes(view, assert.type.any, element, NgElement, changeDetector, ChangeDetector);
          this.view = view;
          this.element = element;
          this.changeDetector = changeDetector;
        };
        return ($traceurRuntime.createClass)(PreBuiltObjects, {}, {});
      }()));
      Object.defineProperty(PreBuiltObjects, "parameters", {get: function() {
          return [[], [NgElement], [ChangeDetector]];
        }});
      EventEmitterAccessor = (function() {
        var EventEmitterAccessor = function EventEmitterAccessor(eventName, getter) {
          assert.argumentTypes(eventName, assert.type.string, getter, Function);
          this.eventName = eventName;
          this.getter = getter;
        };
        return ($traceurRuntime.createClass)(EventEmitterAccessor, {subscribe: function(view, boundElementIndex, directive) {
            var $__0 = this;
            var eventEmitter = this.getter(directive);
            return ObservableWrapper.subscribe(eventEmitter, (function(eventObj) {
              return view.triggerEventHandlers($__0.eventName, eventObj, boundElementIndex);
            }));
          }}, {});
      }());
      Object.defineProperty(EventEmitterAccessor, "parameters", {get: function() {
          return [[assert.type.string], [Function]];
        }});
      Object.defineProperty(EventEmitterAccessor.prototype.subscribe, "parameters", {get: function() {
          return [[viewModule.AppView], [assert.type.number], [Object]];
        }});
      ProtoElementInjector = $__export("ProtoElementInjector", (function() {
        var ProtoElementInjector = function ProtoElementInjector(parent, index, bindings) {
          var firstBindingIsComponent = arguments[3] !== (void 0) ? arguments[3] : false;
          var distanceToParent = arguments[4] !== (void 0) ? arguments[4] : 0;
          assert.argumentTypes(parent, ProtoElementInjector, index, int, bindings, List, firstBindingIsComponent, assert.type.boolean, distanceToParent, assert.type.number);
          this.parent = parent;
          this.index = index;
          this.distanceToParent = distanceToParent;
          this.exportComponent = false;
          this.exportElement = false;
          this._binding0IsComponent = firstBindingIsComponent;
          this._binding0 = null;
          this._keyId0 = null;
          this._binding1 = null;
          this._keyId1 = null;
          this._binding2 = null;
          this._keyId2 = null;
          this._binding3 = null;
          this._keyId3 = null;
          this._binding4 = null;
          this._keyId4 = null;
          this._binding5 = null;
          this._keyId5 = null;
          this._binding6 = null;
          this._keyId6 = null;
          this._binding7 = null;
          this._keyId7 = null;
          this._binding8 = null;
          this._keyId8 = null;
          this._binding9 = null;
          this._keyId9 = null;
          this.numberOfDirectives = bindings.length;
          var length = bindings.length;
          this.eventEmitterAccessors = ListWrapper.createFixedSize(length);
          if (length > 0) {
            this._binding0 = this._createBinding(bindings[0]);
            this._keyId0 = this._binding0.key.id;
            this.eventEmitterAccessors[0] = this._createEventEmitterAccessors(this._binding0);
          }
          if (length > 1) {
            this._binding1 = this._createBinding(bindings[1]);
            this._keyId1 = this._binding1.key.id;
            this.eventEmitterAccessors[1] = this._createEventEmitterAccessors(this._binding1);
          }
          if (length > 2) {
            this._binding2 = this._createBinding(bindings[2]);
            this._keyId2 = this._binding2.key.id;
            this.eventEmitterAccessors[2] = this._createEventEmitterAccessors(this._binding2);
          }
          if (length > 3) {
            this._binding3 = this._createBinding(bindings[3]);
            this._keyId3 = this._binding3.key.id;
            this.eventEmitterAccessors[3] = this._createEventEmitterAccessors(this._binding3);
          }
          if (length > 4) {
            this._binding4 = this._createBinding(bindings[4]);
            this._keyId4 = this._binding4.key.id;
            this.eventEmitterAccessors[4] = this._createEventEmitterAccessors(this._binding4);
          }
          if (length > 5) {
            this._binding5 = this._createBinding(bindings[5]);
            this._keyId5 = this._binding5.key.id;
            this.eventEmitterAccessors[5] = this._createEventEmitterAccessors(this._binding5);
          }
          if (length > 6) {
            this._binding6 = this._createBinding(bindings[6]);
            this._keyId6 = this._binding6.key.id;
            this.eventEmitterAccessors[6] = this._createEventEmitterAccessors(this._binding6);
          }
          if (length > 7) {
            this._binding7 = this._createBinding(bindings[7]);
            this._keyId7 = this._binding7.key.id;
            this.eventEmitterAccessors[7] = this._createEventEmitterAccessors(this._binding7);
          }
          if (length > 8) {
            this._binding8 = this._createBinding(bindings[8]);
            this._keyId8 = this._binding8.key.id;
            this.eventEmitterAccessors[8] = this._createEventEmitterAccessors(this._binding8);
          }
          if (length > 9) {
            this._binding9 = this._createBinding(bindings[9]);
            this._keyId9 = this._binding9.key.id;
            this.eventEmitterAccessors[9] = this._createEventEmitterAccessors(this._binding9);
          }
          if (length > 10) {
            throw 'Maximum number of directives per element has been reached.';
          }
        };
        return ($traceurRuntime.createClass)(ProtoElementInjector, {
          _createEventEmitterAccessors: function(b) {
            return ListWrapper.map(b.eventEmitters, (function(eventName) {
              return new EventEmitterAccessor(eventName, reflector.getter(eventName));
            }));
          },
          instantiate: function(parent) {
            assert.argumentTypes(parent, ElementInjector);
            return assert.returnType((new ElementInjector(this, parent)), ElementInjector);
          },
          directParent: function() {
            return assert.returnType((this.distanceToParent < 2 ? this.parent : null), ProtoElementInjector);
          },
          _createBinding: function(bindingOrType) {
            if (bindingOrType instanceof DirectiveBinding) {
              return bindingOrType;
            } else {
              var b = bind(bindingOrType).toClass(bindingOrType);
              return DirectiveBinding.createFromBinding(b, null);
            }
          },
          get hasBindings() {
            return assert.returnType((isPresent(this._binding0)), assert.type.boolean);
          },
          getDirectiveBindingAtIndex: function(index) {
            assert.argumentTypes(index, int);
            if (index == 0)
              return this._binding0;
            if (index == 1)
              return this._binding1;
            if (index == 2)
              return this._binding2;
            if (index == 3)
              return this._binding3;
            if (index == 4)
              return this._binding4;
            if (index == 5)
              return this._binding5;
            if (index == 6)
              return this._binding6;
            if (index == 7)
              return this._binding7;
            if (index == 8)
              return this._binding8;
            if (index == 9)
              return this._binding9;
            throw new OutOfBoundsAccess(index);
          }
        }, {});
      }()));
      Object.defineProperty(ProtoElementInjector, "parameters", {get: function() {
          return [[ProtoElementInjector], [int], [List], [assert.type.boolean], [assert.type.number]];
        }});
      Object.defineProperty(ProtoElementInjector.prototype._createEventEmitterAccessors, "parameters", {get: function() {
          return [[DirectiveBinding]];
        }});
      Object.defineProperty(ProtoElementInjector.prototype.instantiate, "parameters", {get: function() {
          return [[ElementInjector]];
        }});
      Object.defineProperty(ProtoElementInjector.prototype.getDirectiveBindingAtIndex, "parameters", {get: function() {
          return [[int]];
        }});
      ElementInjector = $__export("ElementInjector", (function($__super) {
        var ElementInjector = function ElementInjector(proto, parent) {
          assert.argumentTypes(proto, ProtoElementInjector, parent, ElementInjector);
          $traceurRuntime.superConstructor(ElementInjector).call(this, parent);
          this._proto = proto;
          this._preBuiltObjects = null;
          this._lightDomAppInjector = null;
          this._shadowDomAppInjector = null;
          this._obj0 = null;
          this._obj1 = null;
          this._obj2 = null;
          this._obj3 = null;
          this._obj4 = null;
          this._obj5 = null;
          this._obj6 = null;
          this._obj7 = null;
          this._obj8 = null;
          this._obj9 = null;
          this._constructionCounter = 0;
          this._inheritQueries(parent);
          this._buildQueries();
        };
        return ($traceurRuntime.createClass)(ElementInjector, {
          clearDirectives: function() {
            this._host = null;
            this._preBuiltObjects = null;
            this._lightDomAppInjector = null;
            this._shadowDomAppInjector = null;
            var p = this._proto;
            if (isPresent(p._binding0) && p._binding0.callOnDestroy) {
              this._obj0.onDestroy();
            }
            if (isPresent(p._binding1) && p._binding1.callOnDestroy) {
              this._obj1.onDestroy();
            }
            if (isPresent(p._binding2) && p._binding2.callOnDestroy) {
              this._obj2.onDestroy();
            }
            if (isPresent(p._binding3) && p._binding3.callOnDestroy) {
              this._obj3.onDestroy();
            }
            if (isPresent(p._binding4) && p._binding4.callOnDestroy) {
              this._obj4.onDestroy();
            }
            if (isPresent(p._binding5) && p._binding5.callOnDestroy) {
              this._obj5.onDestroy();
            }
            if (isPresent(p._binding6) && p._binding6.callOnDestroy) {
              this._obj6.onDestroy();
            }
            if (isPresent(p._binding7) && p._binding7.callOnDestroy) {
              this._obj7.onDestroy();
            }
            if (isPresent(p._binding8) && p._binding8.callOnDestroy) {
              this._obj8.onDestroy();
            }
            if (isPresent(p._binding9) && p._binding9.callOnDestroy) {
              this._obj9.onDestroy();
            }
            if (isPresent(this._dynamicallyCreatedComponentBinding) && this._dynamicallyCreatedComponentBinding.callOnDestroy) {
              this._dynamicallyCreatedComponent.onDestroy();
            }
            this._obj0 = null;
            this._obj1 = null;
            this._obj2 = null;
            this._obj3 = null;
            this._obj4 = null;
            this._obj5 = null;
            this._obj6 = null;
            this._obj7 = null;
            this._obj8 = null;
            this._obj9 = null;
            this._dynamicallyCreatedComponent = null;
            this._dynamicallyCreatedComponentBinding = null;
            this._constructionCounter = 0;
          },
          instantiateDirectives: function(lightDomAppInjector, host, shadowDomAppInjector, preBuiltObjects) {
            assert.argumentTypes(lightDomAppInjector, Injector, host, ElementInjector, shadowDomAppInjector, Injector, preBuiltObjects, PreBuiltObjects);
            this._host = host;
            this._checkShadowDomAppInjector(shadowDomAppInjector);
            this._preBuiltObjects = preBuiltObjects;
            this._lightDomAppInjector = lightDomAppInjector;
            this._shadowDomAppInjector = shadowDomAppInjector;
            var p = this._proto;
            if (isPresent(p._keyId0))
              this._getDirectiveByKeyId(p._keyId0);
            if (isPresent(p._keyId1))
              this._getDirectiveByKeyId(p._keyId1);
            if (isPresent(p._keyId2))
              this._getDirectiveByKeyId(p._keyId2);
            if (isPresent(p._keyId3))
              this._getDirectiveByKeyId(p._keyId3);
            if (isPresent(p._keyId4))
              this._getDirectiveByKeyId(p._keyId4);
            if (isPresent(p._keyId5))
              this._getDirectiveByKeyId(p._keyId5);
            if (isPresent(p._keyId6))
              this._getDirectiveByKeyId(p._keyId6);
            if (isPresent(p._keyId7))
              this._getDirectiveByKeyId(p._keyId7);
            if (isPresent(p._keyId8))
              this._getDirectiveByKeyId(p._keyId8);
            if (isPresent(p._keyId9))
              this._getDirectiveByKeyId(p._keyId9);
          },
          dynamicallyCreateComponent: function(directiveBinding, injector) {
            assert.argumentTypes(directiveBinding, assert.type.any, injector, Injector);
            this._shadowDomAppInjector = injector;
            this._dynamicallyCreatedComponentBinding = directiveBinding;
            this._dynamicallyCreatedComponent = this._new(this._dynamicallyCreatedComponentBinding);
            return this._dynamicallyCreatedComponent;
          },
          _checkShadowDomAppInjector: function(shadowDomAppInjector) {
            assert.argumentTypes(shadowDomAppInjector, Injector);
            if (this._proto._binding0IsComponent && isBlank(shadowDomAppInjector)) {
              throw new BaseException('A shadowDomAppInjector is required as this ElementInjector contains a component');
            } else if (!this._proto._binding0IsComponent && isPresent(shadowDomAppInjector)) {
              throw new BaseException('No shadowDomAppInjector allowed as there is not component stored in this ElementInjector');
            }
          },
          get: function(token) {
            if (this._isDynamicallyLoadedComponent(token)) {
              return this._dynamicallyCreatedComponent;
            }
            return this._getByKey(Key.get(token), 0, false, null);
          },
          _isDynamicallyLoadedComponent: function(token) {
            return isPresent(this._dynamicallyCreatedComponentBinding) && Key.get(token) === this._dynamicallyCreatedComponentBinding.key;
          },
          hasDirective: function(type) {
            assert.argumentTypes(type, Type);
            return assert.returnType((this._getDirectiveByKeyId(Key.get(type).id) !== _undefined), assert.type.boolean);
          },
          getEventEmitterAccessors: function() {
            return this._proto.eventEmitterAccessors;
          },
          getNgElement: function() {
            return this._preBuiltObjects.element;
          },
          getChangeDetector: function() {
            return this._preBuiltObjects.changeDetector;
          },
          getComponent: function() {
            if (this._proto._binding0IsComponent) {
              return this._obj0;
            } else {
              throw new BaseException('There is no component stored in this ElementInjector');
            }
          },
          getElementRef: function() {
            return new ElementRef(this, this._preBuiltObjects.view, this._proto.index, this._lightDomAppInjector);
          },
          getDynamicallyLoadedComponent: function() {
            return this._dynamicallyCreatedComponent;
          },
          directParent: function() {
            return assert.returnType((this._proto.distanceToParent < 2 ? this.parent : null), ElementInjector);
          },
          _isComponentKey: function(key) {
            assert.argumentTypes(key, Key);
            return this._proto._binding0IsComponent && key.id === this._proto._keyId0;
          },
          _isDynamicallyLoadedComponentKey: function(key) {
            assert.argumentTypes(key, Key);
            return isPresent(this._dynamicallyCreatedComponentBinding) && key.id === this._dynamicallyCreatedComponentBinding.key.id;
          },
          _new: function(binding) {
            assert.argumentTypes(binding, ResolvedBinding);
            if (this._constructionCounter++ > _MAX_DIRECTIVE_CONSTRUCTION_COUNTER) {
              throw new CyclicDependencyError(binding.key);
            }
            var factory = binding.factory;
            var deps = binding.dependencies;
            var length = deps.length;
            var d0,
                d1,
                d2,
                d3,
                d4,
                d5,
                d6,
                d7,
                d8,
                d9;
            try {
              d0 = length > 0 ? this._getByDependency(deps[0], binding.key) : null;
              d1 = length > 1 ? this._getByDependency(deps[1], binding.key) : null;
              d2 = length > 2 ? this._getByDependency(deps[2], binding.key) : null;
              d3 = length > 3 ? this._getByDependency(deps[3], binding.key) : null;
              d4 = length > 4 ? this._getByDependency(deps[4], binding.key) : null;
              d5 = length > 5 ? this._getByDependency(deps[5], binding.key) : null;
              d6 = length > 6 ? this._getByDependency(deps[6], binding.key) : null;
              d7 = length > 7 ? this._getByDependency(deps[7], binding.key) : null;
              d8 = length > 8 ? this._getByDependency(deps[8], binding.key) : null;
              d9 = length > 9 ? this._getByDependency(deps[9], binding.key) : null;
            } catch (e) {
              if (e instanceof AbstractBindingError)
                e.addKey(binding.key);
              throw e;
            }
            var obj;
            switch (length) {
              case 0:
                obj = factory();
                break;
              case 1:
                obj = factory(d0);
                break;
              case 2:
                obj = factory(d0, d1);
                break;
              case 3:
                obj = factory(d0, d1, d2);
                break;
              case 4:
                obj = factory(d0, d1, d2, d3);
                break;
              case 5:
                obj = factory(d0, d1, d2, d3, d4);
                break;
              case 6:
                obj = factory(d0, d1, d2, d3, d4, d5);
                break;
              case 7:
                obj = factory(d0, d1, d2, d3, d4, d5, d6);
                break;
              case 8:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                break;
              case 9:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                break;
              case 10:
                obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                break;
              default:
                throw ("Directive " + binding.key.token + " can only have up to 10 dependencies.");
            }
            this._addToQueries(obj, binding.key.token);
            return obj;
          },
          _getByDependency: function(dep, requestor) {
            assert.argumentTypes(dep, DirectiveDependency, requestor, Key);
            if (isPresent(dep.attributeName))
              return this._buildAttribute(dep);
            if (isPresent(dep.queryDirective))
              return this._findQuery(dep.queryDirective).list;
            if (dep.key.id === StaticKeys.instance().elementRefId) {
              return this.getElementRef();
            }
            return this._getByKey(dep.key, dep.depth, dep.optional, requestor);
          },
          _buildAttribute: function(dep) {
            var attributes = this._proto.attributes;
            if (isPresent(attributes) && MapWrapper.contains(attributes, dep.attributeName)) {
              return assert.returnType((MapWrapper.get(attributes, dep.attributeName)), assert.type.string);
            } else {
              return assert.returnType((null), assert.type.string);
            }
          },
          _buildQueriesForDeps: function(deps) {
            assert.argumentTypes(deps, assert.genericType(List, DirectiveDependency));
            for (var i = 0; i < deps.length; i++) {
              var dep = deps[i];
              if (isPresent(dep.queryDirective)) {
                this._createQueryRef(dep.queryDirective);
              }
            }
          },
          _createQueryRef: function(directive) {
            var queryList = new QueryList();
            if (isBlank(this._query0)) {
              this._query0 = new QueryRef(directive, queryList, this);
            } else if (isBlank(this._query1)) {
              this._query1 = new QueryRef(directive, queryList, this);
            } else if (isBlank(this._query2)) {
              this._query2 = new QueryRef(directive, queryList, this);
            } else
              throw new QueryError();
          },
          _addToQueries: function(obj, token) {
            if (isPresent(this._query0) && (this._query0.directive === token)) {
              this._query0.list.add(obj);
            }
            if (isPresent(this._query1) && (this._query1.directive === token)) {
              this._query1.list.add(obj);
            }
            if (isPresent(this._query2) && (this._query2.directive === token)) {
              this._query2.list.add(obj);
            }
          },
          _inheritQueries: function(parent) {
            assert.argumentTypes(parent, ElementInjector);
            if (isBlank(parent))
              return ;
            if (isPresent(parent._query0)) {
              this._query0 = parent._query0;
            }
            if (isPresent(parent._query1)) {
              this._query1 = parent._query1;
            }
            if (isPresent(parent._query2)) {
              this._query2 = parent._query2;
            }
          },
          _buildQueries: function() {
            if (isBlank(this._proto))
              return ;
            var p = this._proto;
            if (isPresent(p._binding0)) {
              this._buildQueriesForDeps(p._binding0.dependencies);
            }
            if (isPresent(p._binding1)) {
              this._buildQueriesForDeps(p._binding1.dependencies);
            }
            if (isPresent(p._binding2)) {
              this._buildQueriesForDeps(p._binding2.dependencies);
            }
            if (isPresent(p._binding3)) {
              this._buildQueriesForDeps(p._binding3.dependencies);
            }
            if (isPresent(p._binding4)) {
              this._buildQueriesForDeps(p._binding4.dependencies);
            }
            if (isPresent(p._binding5)) {
              this._buildQueriesForDeps(p._binding5.dependencies);
            }
            if (isPresent(p._binding6)) {
              this._buildQueriesForDeps(p._binding6.dependencies);
            }
            if (isPresent(p._binding7)) {
              this._buildQueriesForDeps(p._binding7.dependencies);
            }
            if (isPresent(p._binding8)) {
              this._buildQueriesForDeps(p._binding8.dependencies);
            }
            if (isPresent(p._binding9)) {
              this._buildQueriesForDeps(p._binding9.dependencies);
            }
          },
          _findQuery: function(token) {
            if (isPresent(this._query0) && this._query0.directive === token) {
              return this._query0;
            }
            if (isPresent(this._query1) && this._query1.directive === token) {
              return this._query1;
            }
            if (isPresent(this._query2) && this._query2.directive === token) {
              return this._query2;
            }
            throw new BaseException(("Cannot find query for directive " + token + "."));
          },
          link: function(parent) {
            assert.argumentTypes(parent, ElementInjector);
            parent.addChild(this);
            this._addParentQueries();
          },
          linkAfter: function(parent, prevSibling) {
            assert.argumentTypes(parent, ElementInjector, prevSibling, ElementInjector);
            parent.addChildAfter(this, prevSibling);
            this._addParentQueries();
          },
          _addParentQueries: function() {
            if (isPresent(this.parent._query0)) {
              this._addQueryToTree(this.parent._query0);
              this.parent._query0.update();
            }
            if (isPresent(this.parent._query1)) {
              this._addQueryToTree(this.parent._query1);
              this.parent._query1.update();
            }
            if (isPresent(this.parent._query2)) {
              this._addQueryToTree(this.parent._query2);
              this.parent._query2.update();
            }
          },
          unlink: function() {
            var queriesToUpDate = [];
            if (isPresent(this.parent._query0)) {
              this._pruneQueryFromTree(this.parent._query0);
              ListWrapper.push(queriesToUpDate, this.parent._query0);
            }
            if (isPresent(this.parent._query1)) {
              this._pruneQueryFromTree(this.parent._query1);
              ListWrapper.push(queriesToUpDate, this.parent._query1);
            }
            if (isPresent(this.parent._query2)) {
              this._pruneQueryFromTree(this.parent._query2);
              ListWrapper.push(queriesToUpDate, this.parent._query2);
            }
            this.remove();
            ListWrapper.forEach(queriesToUpDate, (function(q) {
              return q.update();
            }));
          },
          _pruneQueryFromTree: function(query) {
            assert.argumentTypes(query, QueryRef);
            this._removeQueryRef(query);
            var child = this._head;
            while (isPresent(child)) {
              child._pruneQueryFromTree(query);
              child = child._next;
            }
          },
          _addQueryToTree: function(query) {
            assert.argumentTypes(query, QueryRef);
            this._assignQueryRef(query);
            var child = this._head;
            while (isPresent(child)) {
              child._addQueryToTree(query);
              child = child._next;
            }
          },
          _assignQueryRef: function(query) {
            assert.argumentTypes(query, QueryRef);
            if (isBlank(this._query0)) {
              this._query0 = query;
              return ;
            } else if (isBlank(this._query1)) {
              this._query1 = query;
              return ;
            } else if (isBlank(this._query2)) {
              this._query2 = query;
              return ;
            }
            throw new QueryError();
          },
          _removeQueryRef: function(query) {
            assert.argumentTypes(query, QueryRef);
            if (this._query0 == query)
              this._query0 = null;
            if (this._query1 == query)
              this._query1 = null;
            if (this._query2 == query)
              this._query2 = null;
          },
          _getByKey: function(key, depth, optional, requestor) {
            assert.argumentTypes(key, Key, depth, assert.type.number, optional, assert.type.boolean, requestor, Key);
            var ei = this;
            if (!this._shouldIncludeSelf(depth)) {
              depth -= ei._proto.distanceToParent;
              ei = ei._parent;
            }
            while (ei != null && depth >= 0) {
              var preBuiltObj = ei._getPreBuiltObjectByKeyId(key.id);
              if (preBuiltObj !== _undefined)
                return preBuiltObj;
              var dir = ei._getDirectiveByKeyId(key.id);
              if (dir !== _undefined)
                return dir;
              depth -= ei._proto.distanceToParent;
              ei = ei._parent;
            }
            if (isPresent(this._host) && this._host._isComponentKey(key)) {
              return this._host.getComponent();
            } else if (isPresent(this._host) && this._host._isDynamicallyLoadedComponentKey(key)) {
              return this._host.getDynamicallyLoadedComponent();
            } else if (optional) {
              return this._appInjector(requestor).getOptional(key);
            } else {
              return this._appInjector(requestor).get(key);
            }
          },
          _appInjector: function(requestor) {
            assert.argumentTypes(requestor, Key);
            if (isPresent(requestor) && (this._isComponentKey(requestor) || this._isDynamicallyLoadedComponentKey(requestor))) {
              return this._shadowDomAppInjector;
            } else {
              return this._lightDomAppInjector;
            }
          },
          _shouldIncludeSelf: function(depth) {
            assert.argumentTypes(depth, int);
            return depth === 0;
          },
          _getPreBuiltObjectByKeyId: function(keyId) {
            assert.argumentTypes(keyId, int);
            var staticKeys = StaticKeys.instance();
            if (keyId === staticKeys.viewId)
              return this._preBuiltObjects.view;
            if (keyId === staticKeys.ngElementId)
              return this._preBuiltObjects.element;
            if (keyId === staticKeys.viewContainerId)
              return this._preBuiltObjects.view.getOrCreateViewContainer(this._proto.index);
            if (keyId === staticKeys.changeDetectorRefId)
              return this._preBuiltObjects.changeDetector.ref;
            return _undefined;
          },
          _getDirectiveByKeyId: function(keyId) {
            assert.argumentTypes(keyId, int);
            var p = this._proto;
            if (p._keyId0 === keyId) {
              if (isBlank(this._obj0)) {
                this._obj0 = this._new(p._binding0);
              }
              return this._obj0;
            }
            if (p._keyId1 === keyId) {
              if (isBlank(this._obj1)) {
                this._obj1 = this._new(p._binding1);
              }
              return this._obj1;
            }
            if (p._keyId2 === keyId) {
              if (isBlank(this._obj2)) {
                this._obj2 = this._new(p._binding2);
              }
              return this._obj2;
            }
            if (p._keyId3 === keyId) {
              if (isBlank(this._obj3)) {
                this._obj3 = this._new(p._binding3);
              }
              return this._obj3;
            }
            if (p._keyId4 === keyId) {
              if (isBlank(this._obj4)) {
                this._obj4 = this._new(p._binding4);
              }
              return this._obj4;
            }
            if (p._keyId5 === keyId) {
              if (isBlank(this._obj5)) {
                this._obj5 = this._new(p._binding5);
              }
              return this._obj5;
            }
            if (p._keyId6 === keyId) {
              if (isBlank(this._obj6)) {
                this._obj6 = this._new(p._binding6);
              }
              return this._obj6;
            }
            if (p._keyId7 === keyId) {
              if (isBlank(this._obj7)) {
                this._obj7 = this._new(p._binding7);
              }
              return this._obj7;
            }
            if (p._keyId8 === keyId) {
              if (isBlank(this._obj8)) {
                this._obj8 = this._new(p._binding8);
              }
              return this._obj8;
            }
            if (p._keyId9 === keyId) {
              if (isBlank(this._obj9)) {
                this._obj9 = this._new(p._binding9);
              }
              return this._obj9;
            }
            return _undefined;
          },
          getDirectiveAtIndex: function(index) {
            assert.argumentTypes(index, int);
            if (index == 0)
              return this._obj0;
            if (index == 1)
              return this._obj1;
            if (index == 2)
              return this._obj2;
            if (index == 3)
              return this._obj3;
            if (index == 4)
              return this._obj4;
            if (index == 5)
              return this._obj5;
            if (index == 6)
              return this._obj6;
            if (index == 7)
              return this._obj7;
            if (index == 8)
              return this._obj8;
            if (index == 9)
              return this._obj9;
            throw new OutOfBoundsAccess(index);
          },
          hasInstances: function() {
            return this._constructionCounter > 0;
          },
          isExportingComponent: function() {
            return this._proto.exportComponent;
          },
          isExportingElement: function() {
            return this._proto.exportElement;
          },
          getExportImplicitName: function() {
            return this._proto.exportImplicitName;
          },
          getLightDomAppInjector: function() {
            return this._lightDomAppInjector;
          },
          getHost: function() {
            return this._host;
          },
          getBoundElementIndex: function() {
            return this._proto.index;
          }
        }, {}, $__super);
      }(TreeNode)));
      Object.defineProperty(ElementInjector, "parameters", {get: function() {
          return [[ProtoElementInjector], [ElementInjector]];
        }});
      Object.defineProperty(ElementInjector.prototype.instantiateDirectives, "parameters", {get: function() {
          return [[Injector], [ElementInjector], [Injector], [PreBuiltObjects]];
        }});
      Object.defineProperty(ElementInjector.prototype.dynamicallyCreateComponent, "parameters", {get: function() {
          return [[], [Injector]];
        }});
      Object.defineProperty(ElementInjector.prototype._checkShadowDomAppInjector, "parameters", {get: function() {
          return [[Injector]];
        }});
      Object.defineProperty(ElementInjector.prototype.hasDirective, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(ElementInjector.prototype._isComponentKey, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(ElementInjector.prototype._isDynamicallyLoadedComponentKey, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(ElementInjector.prototype._new, "parameters", {get: function() {
          return [[ResolvedBinding]];
        }});
      Object.defineProperty(ElementInjector.prototype._getByDependency, "parameters", {get: function() {
          return [[DirectiveDependency], [Key]];
        }});
      Object.defineProperty(ElementInjector.prototype._buildQueriesForDeps, "parameters", {get: function() {
          return [[assert.genericType(List, DirectiveDependency)]];
        }});
      Object.defineProperty(ElementInjector.prototype._inheritQueries, "parameters", {get: function() {
          return [[ElementInjector]];
        }});
      Object.defineProperty(ElementInjector.prototype.link, "parameters", {get: function() {
          return [[ElementInjector]];
        }});
      Object.defineProperty(ElementInjector.prototype.linkAfter, "parameters", {get: function() {
          return [[ElementInjector], [ElementInjector]];
        }});
      Object.defineProperty(ElementInjector.prototype._pruneQueryFromTree, "parameters", {get: function() {
          return [[QueryRef]];
        }});
      Object.defineProperty(ElementInjector.prototype._addQueryToTree, "parameters", {get: function() {
          return [[QueryRef]];
        }});
      Object.defineProperty(ElementInjector.prototype._assignQueryRef, "parameters", {get: function() {
          return [[QueryRef]];
        }});
      Object.defineProperty(ElementInjector.prototype._removeQueryRef, "parameters", {get: function() {
          return [[QueryRef]];
        }});
      Object.defineProperty(ElementInjector.prototype._getByKey, "parameters", {get: function() {
          return [[Key], [assert.type.number], [assert.type.boolean], [Key]];
        }});
      Object.defineProperty(ElementInjector.prototype._appInjector, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(ElementInjector.prototype._shouldIncludeSelf, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(ElementInjector.prototype._getPreBuiltObjectByKeyId, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(ElementInjector.prototype._getDirectiveByKeyId, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(ElementInjector.prototype.getDirectiveAtIndex, "parameters", {get: function() {
          return [[int]];
        }});
      OutOfBoundsAccess = (function($__super) {
        var OutOfBoundsAccess = function OutOfBoundsAccess(index) {
          $traceurRuntime.superConstructor(OutOfBoundsAccess).call(this);
          this.message = ("Index " + index + " is out-of-bounds.");
        };
        return ($traceurRuntime.createClass)(OutOfBoundsAccess, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error));
      QueryError = (function($__super) {
        var QueryError = function QueryError() {
          $traceurRuntime.superConstructor(QueryError).call(this);
          this.message = 'Only 3 queries can be concurrently active in a template.';
        };
        return ($traceurRuntime.createClass)(QueryError, {toString: function() {
            return this.message;
          }}, {}, $__super);
      }(Error));
      QueryRef = (function() {
        var QueryRef = function QueryRef(directive, list, originator) {
          assert.argumentTypes(directive, assert.type.any, list, QueryList, originator, ElementInjector);
          this.directive = directive;
          this.list = list;
          this.originator = originator;
        };
        return ($traceurRuntime.createClass)(QueryRef, {
          update: function() {
            var aggregator = [];
            this.visit(this.originator, aggregator);
            this.list.reset(aggregator);
          },
          visit: function(inj, aggregator) {
            assert.argumentTypes(inj, ElementInjector, aggregator, assert.type.any);
            if (isBlank(inj))
              return ;
            if (inj.hasDirective(this.directive)) {
              ListWrapper.push(aggregator, inj.get(this.directive));
            }
            var child = inj._head;
            while (isPresent(child)) {
              this.visit(child, aggregator);
              child = child._next;
            }
          }
        }, {});
      }());
      Object.defineProperty(QueryRef, "parameters", {get: function() {
          return [[], [QueryList], [ElementInjector]];
        }});
      Object.defineProperty(QueryRef.prototype.visit, "parameters", {get: function() {
          return [[ElementInjector], []];
        }});
    }
  };
});
//# sourceMappingURL=element_injector.es6.map

//# sourceMappingURL=./element_injector.js.map