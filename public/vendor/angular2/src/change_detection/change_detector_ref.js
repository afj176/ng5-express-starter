System.register(["rtts_assert/rtts_assert", "./interfaces", "./constants"], function($__export) {
  "use strict";
  var assert,
      ChangeDetector,
      CHECK_ONCE,
      DETACHED,
      CHECK_ALWAYS,
      ChangeDetectorRef;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
    }, function($__m) {
      CHECK_ONCE = $__m.CHECK_ONCE;
      DETACHED = $__m.DETACHED;
      CHECK_ALWAYS = $__m.CHECK_ALWAYS;
    }],
    execute: function() {
      ChangeDetectorRef = $__export("ChangeDetectorRef", (function() {
        var ChangeDetectorRef = function ChangeDetectorRef(cd) {
          assert.argumentTypes(cd, ChangeDetector);
          this._cd = cd;
        };
        return ($traceurRuntime.createClass)(ChangeDetectorRef, {
          requestCheck: function() {
            this._cd.markPathToRootAsCheckOnce();
          },
          detach: function() {
            this._cd.mode = DETACHED;
          },
          reattach: function() {
            this._cd.mode = CHECK_ALWAYS;
            this.requestCheck();
          }
        }, {});
      }()));
      Object.defineProperty(ChangeDetectorRef, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
    }
  };
});
//# sourceMappingURL=change_detector_ref.es6.map

//# sourceMappingURL=./change_detector_ref.js.map