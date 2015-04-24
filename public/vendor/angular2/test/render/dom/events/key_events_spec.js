System.register(["angular2/test_lib", "angular2/src/render/dom/events/key_events"], function($__export) {
  "use strict";
  var describe,
      ddescribe,
      it,
      iit,
      xit,
      xdescribe,
      expect,
      beforeEach,
      el,
      KeyEventsPlugin;
  function main() {
    describe('KeyEvents', (function() {
      it('should ignore unrecognized events', (function() {
        expect(KeyEventsPlugin.parseEventName('keydown')).toEqual(null);
        expect(KeyEventsPlugin.parseEventName('keyup')).toEqual(null);
        expect(KeyEventsPlugin.parseEventName('keydown.unknownmodifier.enter')).toEqual(null);
        expect(KeyEventsPlugin.parseEventName('keyup.unknownmodifier.enter')).toEqual(null);
        expect(KeyEventsPlugin.parseEventName('unknownevent.control.shift.enter')).toEqual(null);
        expect(KeyEventsPlugin.parseEventName('unknownevent.enter')).toEqual(null);
      }));
      it('should correctly parse event names', (function() {
        expect(KeyEventsPlugin.parseEventName('keydown.enter')).toEqual({
          'domEventName': 'keydown',
          'fullKey': 'enter'
        });
        expect(KeyEventsPlugin.parseEventName('keyup.enter')).toEqual({
          'domEventName': 'keyup',
          'fullKey': 'enter'
        });
        expect(KeyEventsPlugin.parseEventName('keydown.control.shift.enter')).toEqual({
          'domEventName': 'keydown',
          'fullKey': 'control.shift.enter'
        });
        expect(KeyEventsPlugin.parseEventName('keyup.control.shift.enter')).toEqual({
          'domEventName': 'keyup',
          'fullKey': 'control.shift.enter'
        });
        expect(KeyEventsPlugin.parseEventName('keydown.shift.control.enter')).toEqual({
          'domEventName': 'keydown',
          'fullKey': 'control.shift.enter'
        });
        expect(KeyEventsPlugin.parseEventName('keyup.shift.control.enter')).toEqual({
          'domEventName': 'keyup',
          'fullKey': 'control.shift.enter'
        });
        expect(KeyEventsPlugin.parseEventName('keydown.shift.control')).toEqual({
          'domEventName': 'keydown',
          'fullKey': 'shift.control'
        });
        expect(KeyEventsPlugin.parseEventName('keyup.shift.control')).toEqual({
          'domEventName': 'keyup',
          'fullKey': 'shift.control'
        });
        expect(KeyEventsPlugin.parseEventName('keydown.control.shift')).toEqual({
          'domEventName': 'keydown',
          'fullKey': 'control.shift'
        });
        expect(KeyEventsPlugin.parseEventName('keyup.control.shift')).toEqual({
          'domEventName': 'keyup',
          'fullKey': 'control.shift'
        });
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      ddescribe = $__m.ddescribe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      xdescribe = $__m.xdescribe;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      el = $__m.el;
    }, function($__m) {
      KeyEventsPlugin = $__m.KeyEventsPlugin;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=key_events_spec.es6.map

//# sourceMappingURL=./key_events_spec.js.map