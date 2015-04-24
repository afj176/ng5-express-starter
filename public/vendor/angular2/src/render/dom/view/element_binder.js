System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/change_detection", "angular2/src/reflection/types", "angular2/src/facade/collection", "./proto_view"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      AST,
      SetterFn,
      List,
      ListWrapper,
      protoViewModule,
      ElementBinder,
      Event;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      AST = $__m.AST;
    }, function($__m) {
      SetterFn = $__m.SetterFn;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      protoViewModule = $__m;
    }],
    execute: function() {
      ElementBinder = $__export("ElementBinder", (function() {
        var ElementBinder = function ElementBinder() {
          var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
              textNodeIndices = $__1.textNodeIndices,
              contentTagSelector = $__1.contentTagSelector,
              nestedProtoView = $__1.nestedProtoView,
              componentId = $__1.componentId,
              eventLocals = $__1.eventLocals,
              localEvents = $__1.localEvents,
              globalEvents = $__1.globalEvents,
              parentIndex = $__1.parentIndex,
              distanceToParent = $__1.distanceToParent,
              propertySetters = $__1.propertySetters;
          this.textNodeIndices = textNodeIndices;
          this.contentTagSelector = contentTagSelector;
          this.nestedProtoView = nestedProtoView;
          this.componentId = componentId;
          this.eventLocals = eventLocals;
          this.localEvents = localEvents;
          this.globalEvents = globalEvents;
          this.parentIndex = parentIndex;
          this.distanceToParent = distanceToParent;
          this.propertySetters = propertySetters;
        };
        return ($traceurRuntime.createClass)(ElementBinder, {
          hasStaticComponent: function() {
            return isPresent(this.componentId) && isPresent(this.nestedProtoView);
          },
          hasDynamicComponent: function() {
            return isPresent(this.componentId) && isBlank(this.nestedProtoView);
          }
        }, {});
      }()));
      Event = $__export("Event", (function() {
        var Event = function Event(name, target, fullName) {
          assert.argumentTypes(name, assert.type.string, target, assert.type.string, fullName, assert.type.string);
          this.name = name;
          this.target = target;
          this.fullName = fullName;
        };
        return ($traceurRuntime.createClass)(Event, {}, {});
      }()));
      Object.defineProperty(Event, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=element_binder.es6.map

//# sourceMappingURL=./element_binder.js.map