System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/di", "angular2/angular2", "angular2/src/test_lib/test_bed", "angular2/forms"], function($__export) {
  "use strict";
  var assert,
      afterEach,
      AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      dispatchEvent,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      DOM,
      Inject,
      Component,
      Decorator,
      View,
      PropertySetter,
      TestBed,
      ControlGroupDirective,
      ControlDirective,
      Control,
      ControlGroup,
      OptionalControl,
      ControlValueAccessor,
      RequiredValidatorDirective,
      CheckboxControlValueAccessor,
      DefaultValueAccessor,
      Validators,
      MyComp,
      WrappedValue;
  function main() {
    describe("integration tests", (function() {
      if (DOM.supportsDOMEvents()) {
        it("should initialize DOM elements with the given form object", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var ctx = new MyComp(new ControlGroup({"login": new Control("loginValue")}));
          var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control=\"login\">\n              </div>";
          tb.createView(MyComp, {
            context: ctx,
            html: t
          }).then((function(view) {
            view.detectChanges();
            var input = view.querySelector("input");
            expect(input.value).toEqual("loginValue");
            async.done();
          }));
        })));
        it("should update the control group values on DOM change", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var form = new ControlGroup({"login": new Control("oldValue")});
          var ctx = new MyComp(form);
          var t = "<div [control-group]=\"form\">\n                  <input type=\"text\" control=\"login\">\n                </div>";
          tb.createView(MyComp, {
            context: ctx,
            html: t
          }).then((function(view) {
            view.detectChanges();
            var input = view.querySelector("input");
            input.value = "updatedValue";
            dispatchEvent(input, "change");
            expect(form.value).toEqual({"login": "updatedValue"});
            async.done();
          }));
        })));
        it("should work with single controls", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var control = new Control("loginValue");
          var ctx = new MyComp(control);
          var t = "<div><input type=\"text\" [control]=\"form\"></div>";
          tb.createView(MyComp, {
            context: ctx,
            html: t
          }).then((function(view) {
            view.detectChanges();
            var input = view.querySelector("input");
            expect(input.value).toEqual("loginValue");
            input.value = "updatedValue";
            dispatchEvent(input, "change");
            expect(control.value).toEqual("updatedValue");
            async.done();
          }));
        })));
        it("should update DOM elements when rebinding the control group", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var form = new ControlGroup({"login": new Control("oldValue")});
          var ctx = new MyComp(form);
          var t = "<div [control-group]=\"form\">\n                <input type=\"text\" control=\"login\">\n              </div>";
          tb.createView(MyComp, {
            context: ctx,
            html: t
          }).then((function(view) {
            view.detectChanges();
            ctx.form = new ControlGroup({"login": new Control("newValue")});
            view.detectChanges();
            var input = view.querySelector("input");
            expect(input.value).toEqual("newValue");
            async.done();
          }));
        })));
        it("should update DOM element when rebinding the control name", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var ctx = new MyComp(new ControlGroup({
            "one": new Control("one"),
            "two": new Control("two")
          }), "one");
          var t = "<div [control-group]=\"form\">\n                <input type=\"text\" [control]=\"name\">\n              </div>";
          tb.createView(MyComp, {
            context: ctx,
            html: t
          }).then((function(view) {
            view.detectChanges();
            var input = view.querySelector("input");
            expect(input.value).toEqual("one");
            ctx.name = "two";
            view.detectChanges();
            expect(input.value).toEqual("two");
            async.done();
          }));
        })));
        describe("different control types", (function() {
          it("should support <input type=text>", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var ctx = new MyComp(new ControlGroup({"text": new Control("old")}));
            var t = "<div [control-group]=\"form\">\n                    <input type=\"text\" control=\"text\">\n                  </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var input = view.querySelector("input");
              expect(input.value).toEqual("old");
              input.value = "new";
              dispatchEvent(input, "input");
              expect(ctx.form.value).toEqual({"text": "new"});
              async.done();
            }));
          })));
          it("should support <input> without type", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var ctx = new MyComp(new ControlGroup({"text": new Control("old")}));
            var t = "<div [control-group]=\"form\">\n                    <input control=\"text\">\n                  </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var input = view.querySelector("input");
              expect(input.value).toEqual("old");
              input.value = "new";
              dispatchEvent(input, "input");
              expect(ctx.form.value).toEqual({"text": "new"});
              async.done();
            }));
          })));
          it("should support <textarea>", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var ctx = new MyComp(new ControlGroup({"text": new Control('old')}));
            var t = "<div [control-group]=\"form\">\n                    <textarea control=\"text\"></textarea>\n                  </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var textarea = view.querySelector("textarea");
              expect(textarea.value).toEqual("old");
              textarea.value = "new";
              dispatchEvent(textarea, "input");
              expect(ctx.form.value).toEqual({"text": 'new'});
              async.done();
            }));
          })));
          it("should support <type=checkbox>", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var ctx = new MyComp(new ControlGroup({"checkbox": new Control(true)}));
            var t = "<div [control-group]=\"form\">\n                    <input type=\"checkbox\" control=\"checkbox\">\n                  </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var input = view.querySelector("input");
              expect(input.checked).toBe(true);
              input.checked = false;
              dispatchEvent(input, "change");
              expect(ctx.form.value).toEqual({"checkbox": false});
              async.done();
            }));
          })));
          it("should support <select>", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var ctx = new MyComp(new ControlGroup({"city": new Control("SF")}));
            var t = "<div [control-group]=\"form\">\n                      <select control=\"city\">\n                        <option value=\"SF\"></option>\n                        <option value=\"NYC\"></option>\n                      </select>\n                    </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var select = view.querySelector("select");
              var sfOption = view.querySelector("option");
              expect(select.value).toEqual('SF');
              expect(sfOption.selected).toBe(true);
              select.value = 'NYC';
              dispatchEvent(select, "change");
              expect(ctx.form.value).toEqual({"city": 'NYC'});
              expect(sfOption.selected).toBe(false);
              async.done();
            }));
          })));
          it("should support custom value accessors", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var ctx = new MyComp(new ControlGroup({"name": new Control("aa")}));
            var t = "<div [control-group]=\"form\">\n                    <input type=\"text\" control=\"name\" wrapped-value>\n                  </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var input = view.querySelector("input");
              expect(input.value).toEqual("!aa!");
              input.value = "!bb!";
              dispatchEvent(input, "change");
              expect(ctx.form.value).toEqual({"name": "bb"});
              async.done();
            }));
          })));
        }));
        describe("validations", (function() {
          it("should use validators defined in html", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var form = new ControlGroup({"login": new Control("aa")});
            var ctx = new MyComp(form);
            var t = "<div [control-group]=\"form\">\n                    <input type=\"text\" control=\"login\" required>\n                   </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              expect(form.valid).toEqual(true);
              var input = view.querySelector("input");
              input.value = "";
              dispatchEvent(input, "change");
              expect(form.valid).toEqual(false);
              async.done();
            }));
          })));
          it("should use validators defined in the model", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var form = new ControlGroup({"login": new Control("aa", Validators.required)});
            var ctx = new MyComp(form);
            var t = "<div [control-group]=\"form\">\n                    <input type=\"text\" control=\"login\">\n                   </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              expect(form.valid).toEqual(true);
              var input = view.querySelector("input");
              input.value = "";
              dispatchEvent(input, "change");
              expect(form.valid).toEqual(false);
              async.done();
            }));
          })));
        }));
        describe("nested forms", (function() {
          it("should init DOM with the given form object", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var form = new ControlGroup({"nested": new ControlGroup({"login": new Control("value")})});
            var ctx = new MyComp(form);
            var t = "<div [control-group]=\"form\">\n                    <div control-group=\"nested\">\n                      <input type=\"text\" control=\"login\">\n                    </div>\n                </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var input = view.querySelector("input");
              expect(input.value).toEqual("value");
              async.done();
            }));
          })));
          it("should update the control group values on DOM change", inject([TestBed, AsyncTestCompleter], (function(tb, async) {
            var form = new ControlGroup({"nested": new ControlGroup({"login": new Control("value")})});
            var ctx = new MyComp(form);
            var t = "<div [control-group]=\"form\">\n                      <div control-group=\"nested\">\n                        <input type=\"text\" control=\"login\">\n                      </div>\n                  </div>";
            tb.createView(MyComp, {
              context: ctx,
              html: t
            }).then((function(view) {
              view.detectChanges();
              var input = view.querySelector("input");
              input.value = "updatedValue";
              dispatchEvent(input, "change");
              expect(form.value).toEqual({"nested": {"login": "updatedValue"}});
              async.done();
            }));
          })));
        }));
      }
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      afterEach = $__m.afterEach;
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      dispatchEvent = $__m.dispatchEvent;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Inject = $__m.Inject;
    }, function($__m) {
      Component = $__m.Component;
      Decorator = $__m.Decorator;
      View = $__m.View;
      PropertySetter = $__m.PropertySetter;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }, function($__m) {
      ControlGroupDirective = $__m.ControlGroupDirective;
      ControlDirective = $__m.ControlDirective;
      Control = $__m.Control;
      ControlGroup = $__m.ControlGroup;
      OptionalControl = $__m.OptionalControl;
      ControlValueAccessor = $__m.ControlValueAccessor;
      RequiredValidatorDirective = $__m.RequiredValidatorDirective;
      CheckboxControlValueAccessor = $__m.CheckboxControlValueAccessor;
      DefaultValueAccessor = $__m.DefaultValueAccessor;
      Validators = $__m.Validators;
    }],
    execute: function() {
      MyComp = (function() {
        var MyComp = function MyComp() {
          var form = arguments[0] !== (void 0) ? arguments[0] : null;
          var name = arguments[1] !== (void 0) ? arguments[1] : null;
          this.form = form;
          this.name = name;
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component({selector: "my-comp"}), new View({directives: [ControlGroupDirective, ControlDirective, WrappedValue, RequiredValidatorDirective, CheckboxControlValueAccessor, DefaultValueAccessor]})];
        }});
      Object.defineProperty(MyComp, "parameters", {get: function() {
          return [[new Inject('form')], [new Inject('name')]];
        }});
      WrappedValue = (function() {
        var WrappedValue = function WrappedValue(cd, setProperty) {
          assert.argumentTypes(cd, ControlDirective, setProperty, Function);
          this._setProperty = setProperty;
          cd.valueAccessor = this;
        };
        return ($traceurRuntime.createClass)(WrappedValue, {
          writeValue: function(value) {
            this._setProperty(("!" + value + "!"));
          },
          handleOnChange: function(value) {
            this.onChange(value.substring(1, value.length - 1));
          }
        }, {});
      }());
      Object.defineProperty(WrappedValue, "annotations", {get: function() {
          return [new Decorator({
            selector: '[wrapped-value]',
            hostListeners: {'change': 'handleOnChange($event.target.value)'}
          })];
        }});
      Object.defineProperty(WrappedValue, "parameters", {get: function() {
          return [[ControlDirective], [Function, new PropertySetter('value')]];
        }});
    }
  };
});
//# sourceMappingURL=integration_spec.es6.map

//# sourceMappingURL=./integration_spec.js.map