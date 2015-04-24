System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/view", "angular2/src/directives/switch", "angular2/src/test_lib/test_bed"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      DOM,
      Component,
      View,
      Switch,
      SwitchWhen,
      SwitchDefault,
      TestBed,
      TestComponent;
  function main() {
    describe('switch', (function() {
      describe('switch value changes', (function() {
        it('should switch amongst when values', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<template [switch-when]="\'a\'"><li>when a</li></template>' + '<template [switch-when]="\'b\'"><li>when b</li></template>' + '</ul></div>';
          tb.createView(TestComponent, {html: template}).then((function(view) {
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('');
            view.context.switchValue = 'a';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when a');
            view.context.switchValue = 'b';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when b');
            async.done();
          }));
        })));
        it('should switch amongst when values with fallback to default', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<li template="switch-when \'a\'">when a</li>' + '<li template="switch-default">when default</li>' + '</ul></div>';
          tb.createView(TestComponent, {html: template}).then((function(view) {
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when default');
            view.context.switchValue = 'a';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when a');
            view.context.switchValue = 'b';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when default');
            async.done();
          }));
        })));
        it('should support multiple whens with the same value', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<template [switch-when]="\'a\'"><li>when a1;</li></template>' + '<template [switch-when]="\'b\'"><li>when b1;</li></template>' + '<template [switch-when]="\'a\'"><li>when a2;</li></template>' + '<template [switch-when]="\'b\'"><li>when b2;</li></template>' + '<template [switch-default]><li>when default1;</li></template>' + '<template [switch-default]><li>when default2;</li></template>' + '</ul></div>';
          tb.createView(TestComponent, {html: template}).then((function(view) {
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when default1;when default2;');
            view.context.switchValue = 'a';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when a1;when a2;');
            view.context.switchValue = 'b';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when b1;when b2;');
            async.done();
          }));
        })));
      }));
      describe('when values changes', (function() {
        it('should switch amongst when values', inject([TestBed, AsyncTestCompleter], (function(tb, async) {
          var template = '<div>' + '<ul [switch]="switchValue">' + '<template [switch-when]="when1"><li>when 1;</li></template>' + '<template [switch-when]="when2"><li>when 2;</li></template>' + '<template [switch-default]><li>when default;</li></template>' + '</ul></div>';
          tb.createView(TestComponent, {html: template}).then((function(view) {
            view.context.when1 = 'a';
            view.context.when2 = 'b';
            view.context.switchValue = 'a';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when 1;');
            view.context.switchValue = 'b';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when 2;');
            view.context.switchValue = 'c';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when default;');
            view.context.when1 = 'c';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when 1;');
            view.context.when1 = 'd';
            view.detectChanges();
            expect(DOM.getText(view.rootNodes[0])).toEqual('when default;');
            async.done();
          }));
        })));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Switch = $__m.Switch;
      SwitchWhen = $__m.SwitchWhen;
      SwitchDefault = $__m.SwitchDefault;
    }, function($__m) {
      TestBed = $__m.TestBed;
    }],
    execute: function() {
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.switchValue = null;
          this.when1 = null;
          this.when2 = null;
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({selector: 'test-cmp'}), new View({directives: [Switch, SwitchWhen, SwitchDefault]})];
        }});
    }
  };
});
//# sourceMappingURL=switch_spec.es6.map

//# sourceMappingURL=./switch_spec.js.map