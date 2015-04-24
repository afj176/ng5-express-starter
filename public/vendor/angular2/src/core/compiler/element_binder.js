System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "./element_injector", "angular2/src/facade/collection", "./view"], function($__export) {
  "use strict";
  var assert,
      int,
      isBlank,
      isPresent,
      BaseException,
      eiModule,
      DirectiveBinding,
      List,
      StringMap,
      viewModule,
      ElementBinder;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      int = $__m.int;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      DirectiveBinding = $__m.DirectiveBinding;
      eiModule = $__m;
    }, function($__m) {
      List = $__m.List;
      StringMap = $__m.StringMap;
    }, function($__m) {
      viewModule = $__m;
    }],
    execute: function() {
      ElementBinder = $__export("ElementBinder", (function() {
        var ElementBinder = function ElementBinder(index, parent, distanceToParent, protoElementInjector, componentDirective, viewportDirective) {
          assert.argumentTypes(index, int, parent, ElementBinder, distanceToParent, int, protoElementInjector, eiModule.ProtoElementInjector, componentDirective, DirectiveBinding, viewportDirective, DirectiveBinding);
          if (isBlank(index)) {
            throw new BaseException('null index not allowed.');
          }
          this.protoElementInjector = protoElementInjector;
          this.componentDirective = componentDirective;
          this.viewportDirective = viewportDirective;
          this.parent = parent;
          this.index = index;
          this.distanceToParent = distanceToParent;
          this.hostListeners = null;
          this.nestedProtoView = null;
        };
        return ($traceurRuntime.createClass)(ElementBinder, {
          hasStaticComponent: function() {
            return isPresent(this.componentDirective) && isPresent(this.nestedProtoView);
          },
          hasDynamicComponent: function() {
            return isPresent(this.componentDirective) && isBlank(this.nestedProtoView);
          }
        }, {});
      }()));
      Object.defineProperty(ElementBinder, "parameters", {get: function() {
          return [[int], [ElementBinder], [int], [eiModule.ProtoElementInjector], [DirectiveBinding], [DirectiveBinding]];
        }});
    }
  };
});
//# sourceMappingURL=element_binder.es6.map

//# sourceMappingURL=./element_binder.js.map