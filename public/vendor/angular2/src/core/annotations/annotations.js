System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/di", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      ABSTRACT,
      CONST,
      normalizeBlank,
      isPresent,
      ListWrapper,
      List,
      Injectable,
      DEFAULT,
      Directive,
      Component,
      DynamicComponent,
      Decorator,
      Viewport,
      onDestroy,
      onChange,
      onAllChangesDone;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ABSTRACT = $__m.ABSTRACT;
      CONST = $__m.CONST;
      normalizeBlank = $__m.normalizeBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      DEFAULT = $__m.DEFAULT;
    }],
    execute: function() {
      Directive = $__export("Directive", (function($__super) {
        var Directive = function Directive() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              properties = $__1.properties,
              events = $__1.events,
              hostListeners = $__1.hostListeners,
              hostProperties = $__1.hostProperties,
              lifecycle = $__1.lifecycle;
          $traceurRuntime.superConstructor(Directive).call(this);
          this.selector = selector;
          this.properties = properties;
          this.events = events;
          this.hostListeners = hostListeners;
          this.hostProperties = hostProperties;
          this.lifecycle = lifecycle;
        };
        return ($traceurRuntime.createClass)(Directive, {hasLifecycleHook: function(hook) {
            assert.argumentTypes(hook, assert.type.string);
            return assert.returnType((isPresent(this.lifecycle) ? ListWrapper.contains(this.lifecycle, hook) : false), assert.type.boolean);
          }}, {}, $__super);
      }(Injectable)));
      Object.defineProperty(Directive, "annotations", {get: function() {
          return [new ABSTRACT(), new CONST()];
        }});
      Object.defineProperty(Directive.prototype.hasLifecycleHook, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Component = $__export("Component", (function($__super) {
        var Component = function Component() {
          var $__2;
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              properties = $__1.properties,
              events = $__1.events,
              hostListeners = $__1.hostListeners,
              hostProperties = $__1.hostProperties,
              injectables = $__1.injectables,
              lifecycle = $__1.lifecycle,
              changeDetection = ($__2 = $__1.changeDetection) === void 0 ? DEFAULT : $__2;
          $traceurRuntime.superConstructor(Component).call(this, {
            selector: selector,
            properties: properties,
            events: events,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            lifecycle: lifecycle
          });
          this.changeDetection = changeDetection;
          this.injectables = injectables;
        };
        return ($traceurRuntime.createClass)(Component, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Component, "annotations", {get: function() {
          return [new CONST()];
        }});
      DynamicComponent = $__export("DynamicComponent", (function($__super) {
        var DynamicComponent = function DynamicComponent() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              properties = $__1.properties,
              events = $__1.events,
              hostListeners = $__1.hostListeners,
              hostProperties = $__1.hostProperties,
              injectables = $__1.injectables,
              lifecycle = $__1.lifecycle;
          $traceurRuntime.superConstructor(DynamicComponent).call(this, {
            selector: selector,
            properties: properties,
            events: events,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            lifecycle: lifecycle
          });
          this.injectables = injectables;
        };
        return ($traceurRuntime.createClass)(DynamicComponent, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(DynamicComponent, "annotations", {get: function() {
          return [new CONST()];
        }});
      Decorator = $__export("Decorator", (function($__super) {
        var Decorator = function Decorator() {
          var $__2;
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              properties = $__1.properties,
              events = $__1.events,
              hostListeners = $__1.hostListeners,
              hostProperties = $__1.hostProperties,
              lifecycle = $__1.lifecycle,
              compileChildren = ($__2 = $__1.compileChildren) === void 0 ? true : $__2;
          $traceurRuntime.superConstructor(Decorator).call(this, {
            selector: selector,
            properties: properties,
            events: events,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            lifecycle: lifecycle
          });
          this.compileChildren = compileChildren;
        };
        return ($traceurRuntime.createClass)(Decorator, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Decorator, "annotations", {get: function() {
          return [new CONST()];
        }});
      Viewport = $__export("Viewport", (function($__super) {
        var Viewport = function Viewport() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              selector = $__1.selector,
              properties = $__1.properties,
              events = $__1.events,
              hostListeners = $__1.hostListeners,
              hostProperties = $__1.hostProperties,
              lifecycle = $__1.lifecycle;
          $traceurRuntime.superConstructor(Viewport).call(this, {
            selector: selector,
            properties: properties,
            events: events,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            lifecycle: lifecycle
          });
        };
        return ($traceurRuntime.createClass)(Viewport, {}, {}, $__super);
      }(Directive)));
      Object.defineProperty(Viewport, "annotations", {get: function() {
          return [new CONST()];
        }});
      onDestroy = $__export("onDestroy", "onDestroy");
      onChange = $__export("onChange", "onChange");
      onAllChangesDone = $__export("onAllChangesDone", "onAllChangesDone");
    }
  };
});
//# sourceMappingURL=annotations.es6.map

//# sourceMappingURL=./annotations.js.map