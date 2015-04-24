System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./proto_record", "./exceptions", "./pipes/pipe", "./constants"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      BaseException,
      Type,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      ProtoRecord,
      ExpressionChangedAfterItHasBeenChecked,
      NO_CHANGE,
      CHECK_ALWAYS,
      CHECK_ONCE,
      CHECKED,
      DETACHED,
      ON_PUSH,
      uninitialized,
      SimpleChange,
      _simpleChangesIndex,
      _simpleChanges,
      ChangeDetectionUtil;
  function _simpleChange(previousValue, currentValue) {
    var index = _simpleChangesIndex++ % 20;
    var s = _simpleChanges[index];
    s.previousValue = previousValue;
    s.currentValue = currentValue;
    return s;
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      Type = $__m.Type;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
    }, function($__m) {
      ExpressionChangedAfterItHasBeenChecked = $__m.ExpressionChangedAfterItHasBeenChecked;
    }, function($__m) {
      NO_CHANGE = $__m.NO_CHANGE;
    }, function($__m) {
      CHECK_ALWAYS = $__m.CHECK_ALWAYS;
      CHECK_ONCE = $__m.CHECK_ONCE;
      CHECKED = $__m.CHECKED;
      DETACHED = $__m.DETACHED;
      ON_PUSH = $__m.ON_PUSH;
    }],
    execute: function() {
      uninitialized = $__export("uninitialized", new Object());
      SimpleChange = $__export("SimpleChange", (function() {
        var SimpleChange = function SimpleChange(previousValue, currentValue) {
          assert.argumentTypes(previousValue, assert.type.any, currentValue, assert.type.any);
          this.previousValue = previousValue;
          this.currentValue = currentValue;
        };
        return ($traceurRuntime.createClass)(SimpleChange, {}, {});
      }()));
      Object.defineProperty(SimpleChange, "parameters", {get: function() {
          return [[assert.type.any], [assert.type.any]];
        }});
      _simpleChangesIndex = 0;
      _simpleChanges = [new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null), new SimpleChange(null, null)];
      ChangeDetectionUtil = $__export("ChangeDetectionUtil", (function() {
        var ChangeDetectionUtil = function ChangeDetectionUtil() {
          ;
        };
        return ($traceurRuntime.createClass)(ChangeDetectionUtil, {}, {
          unitialized: function() {
            return uninitialized;
          },
          arrayFn0: function() {
            return [];
          },
          arrayFn1: function(a1) {
            return [a1];
          },
          arrayFn2: function(a1, a2) {
            return [a1, a2];
          },
          arrayFn3: function(a1, a2, a3) {
            return [a1, a2, a3];
          },
          arrayFn4: function(a1, a2, a3, a4) {
            return [a1, a2, a3, a4];
          },
          arrayFn5: function(a1, a2, a3, a4, a5) {
            return [a1, a2, a3, a4, a5];
          },
          arrayFn6: function(a1, a2, a3, a4, a5, a6) {
            return [a1, a2, a3, a4, a5, a6];
          },
          arrayFn7: function(a1, a2, a3, a4, a5, a6, a7) {
            return [a1, a2, a3, a4, a5, a6, a7];
          },
          arrayFn8: function(a1, a2, a3, a4, a5, a6, a7, a8) {
            return [a1, a2, a3, a4, a5, a6, a7, a8];
          },
          arrayFn9: function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
          },
          operation_negate: function(value) {
            return !value;
          },
          operation_add: function(left, right) {
            return left + right;
          },
          operation_subtract: function(left, right) {
            return left - right;
          },
          operation_multiply: function(left, right) {
            return left * right;
          },
          operation_divide: function(left, right) {
            return left / right;
          },
          operation_remainder: function(left, right) {
            return left % right;
          },
          operation_equals: function(left, right) {
            return left == right;
          },
          operation_not_equals: function(left, right) {
            return left != right;
          },
          operation_less_then: function(left, right) {
            return left < right;
          },
          operation_greater_then: function(left, right) {
            return left > right;
          },
          operation_less_or_equals_then: function(left, right) {
            return left <= right;
          },
          operation_greater_or_equals_then: function(left, right) {
            return left >= right;
          },
          operation_logical_and: function(left, right) {
            return left && right;
          },
          operation_logical_or: function(left, right) {
            return left || right;
          },
          cond: function(cond, trueVal, falseVal) {
            return cond ? trueVal : falseVal;
          },
          mapFn: function(keys) {
            function buildMap(values) {
              var res = StringMapWrapper.create();
              for (var i = 0; i < keys.length; ++i) {
                StringMapWrapper.set(res, keys[i], values[i]);
              }
              return res;
            }
            switch (keys.length) {
              case 0:
                return (function() {
                  return [];
                });
              case 1:
                return (function(a1) {
                  return buildMap([a1]);
                });
              case 2:
                return (function(a1, a2) {
                  return buildMap([a1, a2]);
                });
              case 3:
                return (function(a1, a2, a3) {
                  return buildMap([a1, a2, a3]);
                });
              case 4:
                return (function(a1, a2, a3, a4) {
                  return buildMap([a1, a2, a3, a4]);
                });
              case 5:
                return (function(a1, a2, a3, a4, a5) {
                  return buildMap([a1, a2, a3, a4, a5]);
                });
              case 6:
                return (function(a1, a2, a3, a4, a5, a6) {
                  return buildMap([a1, a2, a3, a4, a5, a6]);
                });
              case 7:
                return (function(a1, a2, a3, a4, a5, a6, a7) {
                  return buildMap([a1, a2, a3, a4, a5, a6, a7]);
                });
              case 8:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8) {
                  return buildMap([a1, a2, a3, a4, a5, a6, a7, a8]);
                });
              case 9:
                return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                  return buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
                });
              default:
                throw new BaseException("Does not support literal maps with more than 9 elements");
            }
          },
          keyedAccess: function(obj, args) {
            return obj[args[0]];
          },
          noChangeMarker: function(value) {
            return assert.returnType((value === NO_CHANGE), assert.type.boolean);
          },
          throwOnChange: function(proto, change) {
            assert.argumentTypes(proto, ProtoRecord, change, assert.type.any);
            throw new ExpressionChangedAfterItHasBeenChecked(proto, change);
          },
          changeDetectionMode: function(strategy) {
            assert.argumentTypes(strategy, assert.type.string);
            return strategy == ON_PUSH ? CHECK_ONCE : CHECK_ALWAYS;
          },
          simpleChange: function(previousValue, currentValue) {
            assert.argumentTypes(previousValue, assert.type.any, currentValue, assert.type.any);
            return assert.returnType((_simpleChange(previousValue, currentValue)), SimpleChange);
          },
          addChange: function(changes, propertyName, change) {
            assert.argumentTypes(changes, assert.type.any, propertyName, assert.type.string, change, assert.type.any);
            if (isBlank(changes)) {
              changes = {};
            }
            changes[propertyName] = change;
            return changes;
          }
        });
      }()));
      Object.defineProperty(ChangeDetectionUtil.mapFn, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(ChangeDetectionUtil.throwOnChange, "parameters", {get: function() {
          return [[ProtoRecord], []];
        }});
      Object.defineProperty(ChangeDetectionUtil.changeDetectionMode, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(ChangeDetectionUtil.simpleChange, "parameters", {get: function() {
          return [[assert.type.any], [assert.type.any]];
        }});
      Object.defineProperty(ChangeDetectionUtil.addChange, "parameters", {get: function() {
          return [[], [assert.type.string], []];
        }});
    }
  };
});
//# sourceMappingURL=change_detection_util.es6.map

//# sourceMappingURL=./change_detection_util.js.map