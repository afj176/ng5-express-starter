System.register(["angular2/test_lib", "angular2/forms", "angular2/src/facade/async", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      el,
      AsyncTestCompleter,
      inject,
      ControlGroup,
      Control,
      ControlArray,
      Validators,
      ObservableWrapper,
      ListWrapper;
  function main() {
    describe("Form Model", (function() {
      describe("Control", (function() {
        describe("validator", (function() {
          it("should run validator with the initial value", (function() {
            var c = new Control("value", Validators.required);
            expect(c.valid).toEqual(true);
          }));
          it("should rerun the validator when the value changes", (function() {
            var c = new Control("value", Validators.required);
            c.updateValue(null);
            expect(c.valid).toEqual(false);
          }));
          it("should return errors", (function() {
            var c = new Control(null, Validators.required);
            expect(c.errors).toEqual({"required": true});
          }));
        }));
        describe("pristine", (function() {
          it("should be true after creating a control", (function() {
            var c = new Control("value");
            expect(c.pristine).toEqual(true);
          }));
          it("should be false after changing the value of the control", (function() {
            var c = new Control("value");
            c.updateValue("new value");
            expect(c.pristine).toEqual(false);
          }));
        }));
        describe("dirty", (function() {
          it("should be false after creating a control", (function() {
            var c = new Control("value");
            expect(c.dirty).toEqual(false);
          }));
          it("should be true after changing the value of the control", (function() {
            var c = new Control("value");
            c.updateValue("new value");
            expect(c.dirty).toEqual(true);
          }));
        }));
        describe("valueChanges", (function() {
          var c;
          beforeEach((function() {
            c = new Control("old");
          }));
          it("should fire an event after the value has been updated", inject([AsyncTestCompleter], (function(async) {
            ObservableWrapper.subscribe(c.valueChanges, (function(value) {
              expect(c.value).toEqual('new');
              expect(value).toEqual('new');
              async.done();
            }));
            c.updateValue("new");
          })));
          it("should return a cold observable", inject([AsyncTestCompleter], (function(async) {
            c.updateValue("will be ignored");
            ObservableWrapper.subscribe(c.valueChanges, (function(value) {
              expect(value).toEqual('new');
              async.done();
            }));
            c.updateValue("new");
          })));
        }));
      }));
      describe("ControlGroup", (function() {
        describe("value", (function() {
          it("should be the reduced value of the child controls", (function() {
            var g = new ControlGroup({
              "one": new Control("111"),
              "two": new Control("222")
            });
            expect(g.value).toEqual({
              "one": "111",
              "two": "222"
            });
          }));
          it("should be empty when there are no child controls", (function() {
            var g = new ControlGroup({});
            expect(g.value).toEqual({});
          }));
          it("should support nested groups", (function() {
            var g = new ControlGroup({
              "one": new Control("111"),
              "nested": new ControlGroup({"two": new Control("222")})
            });
            expect(g.value).toEqual({
              "one": "111",
              "nested": {"two": "222"}
            });
            g.controls["nested"].controls["two"].updateValue("333");
            expect(g.value).toEqual({
              "one": "111",
              "nested": {"two": "333"}
            });
          }));
        }));
        describe("validator", (function() {
          it("should run the validator with the initial value (valid)", (function() {
            var g = new ControlGroup({"one": new Control('value', Validators.required)});
            expect(g.valid).toEqual(true);
            expect(g.errors).toEqual(null);
          }));
          it("should run the validator with the initial value (invalid)", (function() {
            var one = new Control(null, Validators.required);
            var g = new ControlGroup({"one": one});
            expect(g.valid).toEqual(false);
            expect(g.errors).toEqual({"required": [one]});
          }));
          it("should run the validator with the value changes", (function() {
            var c = new Control(null, Validators.required);
            var g = new ControlGroup({"one": c});
            c.updateValue("some value");
            expect(g.valid).toEqual(true);
            expect(g.errors).toEqual(null);
          }));
        }));
        describe("pristine", (function() {
          it("should be true after creating a control", (function() {
            var c = new Control('value');
            var g = new ControlGroup({"one": c});
            expect(g.pristine).toEqual(true);
          }));
          it("should be false after changing the value of the control", (function() {
            var c = new Control('value');
            var g = new ControlGroup({"one": c});
            c.updateValue('new value');
            expect(g.pristine).toEqual(false);
          }));
        }));
        describe("optional components", (function() {
          describe("contains", (function() {
            var group;
            beforeEach((function() {
              group = new ControlGroup({
                "required": new Control("requiredValue"),
                "optional": new Control("optionalValue")
              }, {"optional": false});
            }));
            it("should return false when the component is not included", (function() {
              expect(group.contains("optional")).toEqual(false);
            }));
            it("should return false when there is no component with the given name", (function() {
              expect(group.contains("something else")).toEqual(false);
            }));
            it("should return true when the component is included", (function() {
              expect(group.contains("required")).toEqual(true);
              group.include("optional");
              expect(group.contains("optional")).toEqual(true);
            }));
          }));
          it("should not include an inactive component into the group value", (function() {
            var group = new ControlGroup({
              "required": new Control("requiredValue"),
              "optional": new Control("optionalValue")
            }, {"optional": false});
            expect(group.value).toEqual({"required": "requiredValue"});
            group.include("optional");
            expect(group.value).toEqual({
              "required": "requiredValue",
              "optional": "optionalValue"
            });
          }));
          it("should not run Validators on an inactive component", (function() {
            var group = new ControlGroup({
              "required": new Control("requiredValue", Validators.required),
              "optional": new Control("", Validators.required)
            }, {"optional": false});
            expect(group.valid).toEqual(true);
            group.include("optional");
            expect(group.valid).toEqual(false);
          }));
          describe("valueChanges", (function() {
            var g,
                c1,
                c2;
            beforeEach((function() {
              c1 = new Control("old1");
              c2 = new Control("old2");
              g = new ControlGroup({
                "one": c1,
                "two": c2
              }, {"two": true});
            }));
            it("should fire an event after the value has been updated", inject([AsyncTestCompleter], (function(async) {
              ObservableWrapper.subscribe(g.valueChanges, (function(value) {
                expect(g.value).toEqual({
                  'one': 'new1',
                  'two': 'old2'
                });
                expect(value).toEqual({
                  'one': 'new1',
                  'two': 'old2'
                });
                async.done();
              }));
              c1.updateValue("new1");
            })));
            it("should fire an event after the control's observable fired an event", inject([AsyncTestCompleter], (function(async) {
              var controlCallbackIsCalled = false;
              ObservableWrapper.subscribe(c1.valueChanges, (function(value) {
                controlCallbackIsCalled = true;
              }));
              ObservableWrapper.subscribe(g.valueChanges, (function(value) {
                expect(controlCallbackIsCalled).toBe(true);
                async.done();
              }));
              c1.updateValue("new1");
            })));
            it("should fire an event when a control is excluded", inject([AsyncTestCompleter], (function(async) {
              ObservableWrapper.subscribe(g.valueChanges, (function(value) {
                expect(value).toEqual({'one': 'old1'});
                async.done();
              }));
              g.exclude("two");
            })));
            it("should fire an event when a control is included", inject([AsyncTestCompleter], (function(async) {
              g.exclude("two");
              ObservableWrapper.subscribe(g.valueChanges, (function(value) {
                expect(value).toEqual({
                  'one': 'old1',
                  'two': 'old2'
                });
                async.done();
              }));
              g.include("two");
            })));
            it("should fire an event every time a control is updated", inject([AsyncTestCompleter], (function(async) {
              var loggedValues = [];
              ObservableWrapper.subscribe(g.valueChanges, (function(value) {
                ListWrapper.push(loggedValues, value);
                if (loggedValues.length == 2) {
                  expect(loggedValues).toEqual([{
                    "one": "new1",
                    "two": "old2"
                  }, {
                    "one": "new1",
                    "two": "new2"
                  }]);
                  async.done();
                }
              }));
              c1.updateValue("new1");
              c2.updateValue("new2");
            })));
            xit("should not fire an event when an excluded control is updated", inject([AsyncTestCompleter], (function(async) {})));
          }));
        }));
        describe("ControlArray", (function() {
          describe("adding/removing", (function() {
            var a;
            var c1,
                c2,
                c3;
            beforeEach((function() {
              a = new ControlArray([]);
              c1 = new Control(1);
              c2 = new Control(2);
              c3 = new Control(3);
            }));
            it("should support pushing", (function() {
              a.push(c1);
              expect(a.length).toEqual(1);
              expect(a.controls).toEqual([c1]);
            }));
            it("should support removing", (function() {
              a.push(c1);
              a.push(c2);
              a.push(c3);
              a.removeAt(1);
              expect(a.controls).toEqual([c1, c3]);
            }));
            it("should support inserting", (function() {
              a.push(c1);
              a.push(c3);
              a.insert(1, c2);
              expect(a.controls).toEqual([c1, c2, c3]);
            }));
          }));
          describe("value", (function() {
            it("should be the reduced value of the child controls", (function() {
              var a = new ControlArray([new Control(1), new Control(2)]);
              expect(a.value).toEqual([1, 2]);
            }));
            it("should be an empty array when there are no child controls", (function() {
              var a = new ControlArray([]);
              expect(a.value).toEqual([]);
            }));
          }));
          describe("validator", (function() {
            it("should run the validator with the initial value (valid)", (function() {
              var a = new ControlArray([new Control(1, Validators.required), new Control(2, Validators.required)]);
              expect(a.valid).toBe(true);
              expect(a.errors).toBe(null);
            }));
            it("should run the validator with the initial value (invalid)", (function() {
              var a = new ControlArray([new Control(1, Validators.required), new Control(null, Validators.required), new Control(2, Validators.required)]);
              expect(a.valid).toBe(false);
              expect(a.errors).toEqual({"required": [a.controls[1]]});
            }));
            it("should run the validator when the value changes", (function() {
              var a = new ControlArray([]);
              var c = new Control(null, Validators.required);
              a.push(c);
              expect(a.valid).toBe(false);
              c.updateValue("some value");
              expect(a.valid).toBe(true);
              expect(a.errors).toBe(null);
            }));
          }));
          describe("pristine", (function() {
            it("should be true after creating a control", (function() {
              var a = new ControlArray([new Control(1)]);
              expect(a.pristine).toBe(true);
            }));
            it("should be false after changing the value of the control", (function() {
              var c = new Control(1);
              var a = new ControlArray([c]);
              c.updateValue('new value');
              expect(a.pristine).toEqual(false);
            }));
          }));
          describe("valueChanges", (function() {
            var a,
                c1,
                c2;
            beforeEach((function() {
              c1 = new Control("old1");
              c2 = new Control("old2");
              a = new ControlArray([c1, c2]);
            }));
            it("should fire an event after the value has been updated", inject([AsyncTestCompleter], (function(async) {
              ObservableWrapper.subscribe(a.valueChanges, (function(value) {
                expect(a.value).toEqual(['new1', 'old2']);
                expect(value).toEqual(['new1', 'old2']);
                async.done();
              }));
              c1.updateValue("new1");
            })));
            it("should fire an event after the control's observable fired an event", inject([AsyncTestCompleter], (function(async) {
              var controlCallbackIsCalled = false;
              ObservableWrapper.subscribe(c1.valueChanges, (function(value) {
                controlCallbackIsCalled = true;
              }));
              ObservableWrapper.subscribe(a.valueChanges, (function(value) {
                expect(controlCallbackIsCalled).toBe(true);
                async.done();
              }));
              c1.updateValue("new1");
            })));
            it("should fire an event when a control is removed", inject([AsyncTestCompleter], (function(async) {
              ObservableWrapper.subscribe(a.valueChanges, (function(value) {
                expect(value).toEqual(['old1']);
                async.done();
              }));
              a.removeAt(1);
            })));
            it("should fire an event when a control is added", inject([AsyncTestCompleter], (function(async) {
              a.removeAt(1);
              ObservableWrapper.subscribe(a.valueChanges, (function(value) {
                expect(value).toEqual(['old1', 'old2']);
                async.done();
              }));
              a.push(c2);
            })));
          }));
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      el = $__m.el;
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      inject = $__m.inject;
    }, function($__m) {
      ControlGroup = $__m.ControlGroup;
      Control = $__m.Control;
      ControlArray = $__m.ControlArray;
      Validators = $__m.Validators;
    }, function($__m) {
      ObservableWrapper = $__m.ObservableWrapper;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=model_spec.es6.map

//# sourceMappingURL=./model_spec.js.map