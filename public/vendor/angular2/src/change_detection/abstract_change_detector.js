System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./change_detector_ref", "./interfaces", "./constants"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      List,
      ListWrapper,
      ChangeDetectorRef,
      ChangeDetector,
      CHECK_ALWAYS,
      CHECK_ONCE,
      CHECKED,
      DETACHED,
      ON_PUSH,
      AbstractChangeDetector;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ChangeDetectorRef = $__m.ChangeDetectorRef;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
    }, function($__m) {
      CHECK_ALWAYS = $__m.CHECK_ALWAYS;
      CHECK_ONCE = $__m.CHECK_ONCE;
      CHECKED = $__m.CHECKED;
      DETACHED = $__m.DETACHED;
      ON_PUSH = $__m.ON_PUSH;
    }],
    execute: function() {
      AbstractChangeDetector = $__export("AbstractChangeDetector", (function($__super) {
        var AbstractChangeDetector = function AbstractChangeDetector() {
          $traceurRuntime.superConstructor(AbstractChangeDetector).call(this);
          this.lightDomChildren = [];
          this.shadowDomChildren = [];
          this.ref = new ChangeDetectorRef(this);
          this.mode = null;
        };
        return ($traceurRuntime.createClass)(AbstractChangeDetector, {
          addChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
            ListWrapper.push(this.lightDomChildren, cd);
            cd.parent = this;
          },
          removeChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
            ListWrapper.remove(this.lightDomChildren, cd);
          },
          addShadowDomChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
            ListWrapper.push(this.shadowDomChildren, cd);
            cd.parent = this;
          },
          removeShadowDomChild: function(cd) {
            assert.argumentTypes(cd, ChangeDetector);
            ListWrapper.remove(this.shadowDomChildren, cd);
          },
          remove: function() {
            this.parent.removeChild(this);
          },
          detectChanges: function() {
            this._detectChanges(false);
          },
          checkNoChanges: function() {
            this._detectChanges(true);
          },
          _detectChanges: function(throwOnChange) {
            assert.argumentTypes(throwOnChange, assert.type.boolean);
            if (this.mode === DETACHED || this.mode === CHECKED)
              return ;
            this.detectChangesInRecords(throwOnChange);
            this._detectChangesInLightDomChildren(throwOnChange);
            this.callOnAllChangesDone();
            this._detectChangesInShadowDomChildren(throwOnChange);
            if (this.mode === CHECK_ONCE)
              this.mode = CHECKED;
          },
          detectChangesInRecords: function(throwOnChange) {
            assert.argumentTypes(throwOnChange, assert.type.boolean);
          },
          callOnAllChangesDone: function() {},
          _detectChangesInLightDomChildren: function(throwOnChange) {
            assert.argumentTypes(throwOnChange, assert.type.boolean);
            var c = this.lightDomChildren;
            for (var i = 0; i < c.length; ++i) {
              c[i]._detectChanges(throwOnChange);
            }
          },
          _detectChangesInShadowDomChildren: function(throwOnChange) {
            assert.argumentTypes(throwOnChange, assert.type.boolean);
            var c = this.shadowDomChildren;
            for (var i = 0; i < c.length; ++i) {
              c[i]._detectChanges(throwOnChange);
            }
          },
          markAsCheckOnce: function() {
            this.mode = CHECK_ONCE;
          },
          markPathToRootAsCheckOnce: function() {
            var c = this;
            while (isPresent(c) && c.mode != DETACHED) {
              if (c.mode === CHECKED)
                c.mode = CHECK_ONCE;
              c = c.parent;
            }
          }
        }, {}, $__super);
      }(ChangeDetector)));
      Object.defineProperty(AbstractChangeDetector.prototype.addChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(AbstractChangeDetector.prototype.removeChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(AbstractChangeDetector.prototype.addShadowDomChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(AbstractChangeDetector.prototype.removeShadowDomChild, "parameters", {get: function() {
          return [[ChangeDetector]];
        }});
      Object.defineProperty(AbstractChangeDetector.prototype._detectChanges, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Object.defineProperty(AbstractChangeDetector.prototype.detectChangesInRecords, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Object.defineProperty(AbstractChangeDetector.prototype._detectChangesInLightDomChildren, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Object.defineProperty(AbstractChangeDetector.prototype._detectChangesInShadowDomChildren, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
    }
  };
});
//# sourceMappingURL=abstract_change_detector.es6.map

//# sourceMappingURL=./abstract_change_detector.js.map