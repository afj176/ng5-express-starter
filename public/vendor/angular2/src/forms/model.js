System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "./validators"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      Observable,
      EventEmitter,
      ObservableWrapper,
      StringMap,
      StringMapWrapper,
      ListWrapper,
      List,
      Validators,
      VALID,
      INVALID,
      AbstractControl,
      Control,
      ControlGroup,
      ControlArray;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      Observable = $__m.Observable;
      EventEmitter = $__m.EventEmitter;
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
      List = $__m.List;
    }, function($__m) {
      Validators = $__m.Validators;
    }],
    execute: function() {
      VALID = $__export("VALID", "VALID");
      INVALID = $__export("INVALID", "INVALID");
      AbstractControl = $__export("AbstractControl", (function() {
        var AbstractControl = function AbstractControl(validator) {
          assert.argumentTypes(validator, Function);
          this.validator = validator;
          this._pristine = true;
        };
        return ($traceurRuntime.createClass)(AbstractControl, {
          get value() {
            return assert.returnType((this._value), assert.type.any);
          },
          get status() {
            return assert.returnType((this._status), assert.type.string);
          },
          get valid() {
            return assert.returnType((this._status === VALID), assert.type.boolean);
          },
          get errors() {
            return assert.returnType((this._errors), StringMap);
          },
          get pristine() {
            return assert.returnType((this._pristine), assert.type.boolean);
          },
          get dirty() {
            return assert.returnType((!this.pristine), assert.type.boolean);
          },
          get valueChanges() {
            return assert.returnType((this._valueChanges), Observable);
          },
          setParent: function(parent) {
            this._parent = parent;
          },
          _updateParent: function() {
            if (isPresent(this._parent)) {
              this._parent._updateValue();
            }
          }
        }, {});
      }()));
      Object.defineProperty(AbstractControl, "parameters", {get: function() {
          return [[Function]];
        }});
      Control = $__export("Control", (function($__super) {
        var Control = function Control(value) {
          var validator = arguments[1] !== (void 0) ? arguments[1] : Validators.nullValidator;
          assert.argumentTypes(value, assert.type.any, validator, Function);
          $traceurRuntime.superConstructor(Control).call(this, validator);
          this._setValueErrorsStatus(value);
          this._valueChanges = new EventEmitter();
        };
        return ($traceurRuntime.createClass)(Control, {
          updateValue: function(value) {
            assert.argumentTypes(value, assert.type.any);
            this._setValueErrorsStatus(value);
            this._pristine = false;
            ObservableWrapper.callNext(this._valueChanges, this._value);
            this._updateParent();
          },
          _setValueErrorsStatus: function(value) {
            this._value = value;
            this._errors = this.validator(this);
            this._status = isPresent(this._errors) ? INVALID : VALID;
          }
        }, {}, $__super);
      }(AbstractControl)));
      Object.defineProperty(Control, "parameters", {get: function() {
          return [[assert.type.any], [Function]];
        }});
      Object.defineProperty(Control.prototype.updateValue, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      ControlGroup = $__export("ControlGroup", (function($__super) {
        var ControlGroup = function ControlGroup(controls) {
          var optionals = arguments[1] !== (void 0) ? arguments[1] : null;
          var validator = arguments[2] !== (void 0) ? arguments[2] : Validators.group;
          assert.argumentTypes(controls, StringMap, optionals, StringMap, validator, Function);
          $traceurRuntime.superConstructor(ControlGroup).call(this, validator);
          this.controls = controls;
          this._optionals = isPresent(optionals) ? optionals : {};
          this._valueChanges = new EventEmitter();
          this._setParentForControls();
          this._setValueErrorsStatus();
        };
        return ($traceurRuntime.createClass)(ControlGroup, {
          include: function(controlName) {
            assert.argumentTypes(controlName, assert.type.string);
            StringMapWrapper.set(this._optionals, controlName, true);
            this._updateValue();
          },
          exclude: function(controlName) {
            assert.argumentTypes(controlName, assert.type.string);
            StringMapWrapper.set(this._optionals, controlName, false);
            this._updateValue();
          },
          contains: function(controlName) {
            assert.argumentTypes(controlName, assert.type.string);
            var c = StringMapWrapper.contains(this.controls, controlName);
            return assert.returnType((c && this._included(controlName)), assert.type.boolean);
          },
          _setParentForControls: function() {
            var $__0 = this;
            StringMapWrapper.forEach(this.controls, (function(control, name) {
              control.setParent($__0);
            }));
          },
          _updateValue: function() {
            this._setValueErrorsStatus();
            this._pristine = false;
            ObservableWrapper.callNext(this._valueChanges, this._value);
            this._updateParent();
          },
          _setValueErrorsStatus: function() {
            this._value = this._reduceValue();
            this._errors = this.validator(this);
            this._status = isPresent(this._errors) ? INVALID : VALID;
          },
          _reduceValue: function() {
            return this._reduceChildren({}, (function(acc, control, name) {
              acc[name] = control.value;
              return acc;
            }));
          },
          _reduceChildren: function(initValue, fn) {
            var $__0 = this;
            assert.argumentTypes(initValue, assert.type.any, fn, Function);
            var res = initValue;
            StringMapWrapper.forEach(this.controls, (function(control, name) {
              if ($__0._included(name)) {
                res = fn(res, control, name);
              }
            }));
            return res;
          },
          _included: function(controlName) {
            assert.argumentTypes(controlName, assert.type.string);
            var isOptional = StringMapWrapper.contains(this._optionals, controlName);
            return assert.returnType((!isOptional || StringMapWrapper.get(this._optionals, controlName)), assert.type.boolean);
          }
        }, {}, $__super);
      }(AbstractControl)));
      Object.defineProperty(ControlGroup, "parameters", {get: function() {
          return [[StringMap], [StringMap], [Function]];
        }});
      Object.defineProperty(ControlGroup.prototype.include, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(ControlGroup.prototype.exclude, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(ControlGroup.prototype.contains, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(ControlGroup.prototype._reduceChildren, "parameters", {get: function() {
          return [[assert.type.any], [Function]];
        }});
      Object.defineProperty(ControlGroup.prototype._included, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      ControlArray = $__export("ControlArray", (function($__super) {
        var ControlArray = function ControlArray(controls) {
          var validator = arguments[1] !== (void 0) ? arguments[1] : Validators.array;
          assert.argumentTypes(controls, assert.genericType(List, AbstractControl), validator, Function);
          $traceurRuntime.superConstructor(ControlArray).call(this, validator);
          this.controls = controls;
          this._valueChanges = new EventEmitter();
          this._setParentForControls();
          this._setValueErrorsStatus();
        };
        return ($traceurRuntime.createClass)(ControlArray, {
          at: function(index) {
            assert.argumentTypes(index, assert.type.number);
            return assert.returnType((this.controls[index]), AbstractControl);
          },
          push: function(control) {
            assert.argumentTypes(control, AbstractControl);
            ListWrapper.push(this.controls, control);
            control.setParent(this);
            this._updateValue();
          },
          insert: function(index, control) {
            assert.argumentTypes(index, assert.type.number, control, AbstractControl);
            ListWrapper.insert(this.controls, index, control);
            control.setParent(this);
            this._updateValue();
          },
          removeAt: function(index) {
            assert.argumentTypes(index, assert.type.number);
            ListWrapper.removeAt(this.controls, index);
            this._updateValue();
          },
          get length() {
            return assert.returnType((this.controls.length), assert.type.number);
          },
          _updateValue: function() {
            this._setValueErrorsStatus();
            this._pristine = false;
            ObservableWrapper.callNext(this._valueChanges, this._value);
            this._updateParent();
          },
          _setParentForControls: function() {
            var $__0 = this;
            ListWrapper.forEach(this.controls, (function(control) {
              control.setParent($__0);
            }));
          },
          _setValueErrorsStatus: function() {
            this._value = ListWrapper.map(this.controls, (function(c) {
              return c.value;
            }));
            this._errors = this.validator(this);
            this._status = isPresent(this._errors) ? INVALID : VALID;
          }
        }, {}, $__super);
      }(AbstractControl)));
      Object.defineProperty(ControlArray, "parameters", {get: function() {
          return [[assert.genericType(List, AbstractControl)], [Function]];
        }});
      Object.defineProperty(ControlArray.prototype.at, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ControlArray.prototype.push, "parameters", {get: function() {
          return [[AbstractControl]];
        }});
      Object.defineProperty(ControlArray.prototype.insert, "parameters", {get: function() {
          return [[assert.type.number], [AbstractControl]];
        }});
      Object.defineProperty(ControlArray.prototype.removeAt, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
    }
  };
});
//# sourceMappingURL=model.es6.map

//# sourceMappingURL=./model.js.map