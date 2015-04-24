System.register(["angular2/src/core/zone/vm_turn_zone"], function($__export) {
  "use strict";
  var VmTurnZone,
      MockVmTurnZone;
  return {
    setters: [function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }],
    execute: function() {
      MockVmTurnZone = $__export("MockVmTurnZone", (function($__super) {
        var MockVmTurnZone = function MockVmTurnZone() {
          $traceurRuntime.superConstructor(MockVmTurnZone).call(this, {enableLongStackTrace: false});
        };
        return ($traceurRuntime.createClass)(MockVmTurnZone, {
          run: function(fn) {
            fn();
          },
          runOutsideAngular: function(fn) {
            return fn();
          }
        }, {}, $__super);
      }(VmTurnZone)));
    }
  };
});
//# sourceMappingURL=vm_turn_zone_mock.es6.map

//# sourceMappingURL=./vm_turn_zone_mock.js.map