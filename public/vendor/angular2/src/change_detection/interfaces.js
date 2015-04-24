System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "./parser/locals", "./constants", "./binding_record"], function($__export) {
  "use strict";
  var assert,
      List,
      Locals,
      DEFAULT,
      BindingRecord,
      ProtoChangeDetector,
      ChangeDetection,
      ChangeDispatcher,
      ChangeDetector;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      Locals = $__m.Locals;
    }, function($__m) {
      DEFAULT = $__m.DEFAULT;
    }, function($__m) {
      BindingRecord = $__m.BindingRecord;
    }],
    execute: function() {
      ProtoChangeDetector = $__export("ProtoChangeDetector", (function() {
        var ProtoChangeDetector = function ProtoChangeDetector() {
          ;
        };
        return ($traceurRuntime.createClass)(ProtoChangeDetector, {instantiate: function(dispatcher, bindingRecords, variableBindings, directiveRecords) {
            assert.argumentTypes(dispatcher, assert.type.any, bindingRecords, List, variableBindings, List, directiveRecords, List);
            return assert.returnType((null), ChangeDetector);
          }}, {});
      }()));
      Object.defineProperty(ProtoChangeDetector.prototype.instantiate, "parameters", {get: function() {
          return [[assert.type.any], [List], [List], [List]];
        }});
      ChangeDetection = $__export("ChangeDetection", (function() {
        var ChangeDetection = function ChangeDetection() {
          ;
        };
        return ($traceurRuntime.createClass)(ChangeDetection, {createProtoChangeDetector: function(name) {
            var changeControlStrategy = arguments[1] !== (void 0) ? arguments[1] : DEFAULT;
            assert.argumentTypes(name, assert.type.string, changeControlStrategy, assert.type.string);
            return assert.returnType((null), ProtoChangeDetector);
          }}, {});
      }()));
      Object.defineProperty(ChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      ChangeDispatcher = $__export("ChangeDispatcher", (function() {
        var ChangeDispatcher = function ChangeDispatcher() {
          ;
        };
        return ($traceurRuntime.createClass)(ChangeDispatcher, {notifyOnBinding: function(bindingRecord, value) {
            assert.argumentTypes(bindingRecord, BindingRecord, value, assert.type.any);
          }}, {});
      }()));
      Object.defineProperty(ChangeDispatcher.prototype.notifyOnBinding, "parameters", {get: function() {
          return [[BindingRecord], [assert.type.any]];
        }});
      ChangeDetector = $__export("ChangeDetector", (function() {
        var ChangeDetector = function ChangeDetector() {
          ;
        };
        return ($traceurRuntime.createClass)(ChangeDetector, {
          addChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
          },
          addShadowDomChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
          },
          removeChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
          },
          removeShadowDomChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
          },
          remove: function() {},
          hydrate: function(context, locals, directives) {
            assert.argumentTypes(context, assert.type.any, locals, Locals, directives, assert.type.any);
          },
          dehydrate: function() {},
          markPathToRootAsCheckOnce: function() {},
          detectChanges: function() {},
          checkNoChanges: function() {}
        }, {});
      }()));
      Object.defineProperty(ChangeDetector.prototype.addChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(ChangeDetector.prototype.addShadowDomChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(ChangeDetector.prototype.removeChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(ChangeDetector.prototype.removeShadowDomChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(ChangeDetector.prototype.hydrate, "parameters", {get: function() {
          return [[assert.type.any], [Locals], [assert.type.any]];
        }});
    }
  };
});
//# sourceMappingURL=interfaces.es6.map

//# sourceMappingURL=./interfaces.js.map