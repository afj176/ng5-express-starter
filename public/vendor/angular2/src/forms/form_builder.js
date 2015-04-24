System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/facade/lang", "./model"], function($__export) {
  "use strict";
  var assert,
      StringMapWrapper,
      ListWrapper,
      List,
      isPresent,
      modelModule,
      FormBuilder;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      modelModule = $__m;
    }],
    execute: function() {
      FormBuilder = $__export("FormBuilder", (function() {
        var FormBuilder = function FormBuilder() {
          ;
        };
        return ($traceurRuntime.createClass)(FormBuilder, {
          group: function(controlsConfig) {
            var extra = arguments[1] !== (void 0) ? arguments[1] : null;
            var controls = this._reduceControls(controlsConfig);
            var optionals = isPresent(extra) ? StringMapWrapper.get(extra, "optionals") : null;
            var validator = isPresent(extra) ? StringMapWrapper.get(extra, "validator") : null;
            if (isPresent(validator)) {
              return assert.returnType((new modelModule.ControlGroup(controls, optionals, validator)), modelModule.ControlGroup);
            } else {
              return assert.returnType((new modelModule.ControlGroup(controls, optionals)), modelModule.ControlGroup);
            }
          },
          control: function(value) {
            var validator = arguments[1] !== (void 0) ? arguments[1] : null;
            assert.argumentTypes(value, assert.type.any, validator, Function);
            if (isPresent(validator)) {
              return assert.returnType((new modelModule.Control(value, validator)), modelModule.Control);
            } else {
              return assert.returnType((new modelModule.Control(value)), modelModule.Control);
            }
          },
          array: function(controlsConfig) {
            var validator = arguments[1] !== (void 0) ? arguments[1] : null;
            var $__0 = this;
            var controls = ListWrapper.map(controlsConfig, (function(c) {
              return $__0._createControl(c);
            }));
            if (isPresent(validator)) {
              return assert.returnType((new modelModule.ControlArray(controls, validator)), modelModule.ControlArray);
            } else {
              return assert.returnType((new modelModule.ControlArray(controls)), modelModule.ControlArray);
            }
          },
          _reduceControls: function(controlsConfig) {
            var $__0 = this;
            var controls = {};
            StringMapWrapper.forEach(controlsConfig, (function(controlConfig, controlName) {
              controls[controlName] = $__0._createControl(controlConfig);
            }));
            return controls;
          },
          _createControl: function(controlConfig) {
            if (controlConfig instanceof modelModule.Control || controlConfig instanceof modelModule.ControlGroup || controlConfig instanceof modelModule.ControlArray) {
              return controlConfig;
            } else if (ListWrapper.isList(controlConfig)) {
              var value = ListWrapper.get(controlConfig, 0);
              var validator = controlConfig.length > 1 ? controlConfig[1] : null;
              return this.control(value, validator);
            } else {
              return this.control(controlConfig);
            }
          }
        }, {});
      }()));
      Object.defineProperty(FormBuilder.prototype.control, "parameters", {get: function() {
          return [[], [Function]];
        }});
      Object.defineProperty(FormBuilder.prototype.array, "parameters", {get: function() {
          return [[List], [Function]];
        }});
    }
  };
});
//# sourceMappingURL=form_builder.es6.map

//# sourceMappingURL=./form_builder.js.map