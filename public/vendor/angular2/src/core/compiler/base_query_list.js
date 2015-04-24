System.register(["angular2/src/facade/collection", "angular2/src/core/annotations/annotations"], function($__export) {
  "use strict";
  var List,
      MapWrapper,
      ListWrapper,
      Directive,
      BaseQueryList;
  return {
    setters: [function($__m) {
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Directive = $__m.Directive;
    }],
    execute: function() {
      BaseQueryList = $__export("BaseQueryList", (function() {
        var $__1;
        var BaseQueryList = function BaseQueryList() {
          this._results = [];
          this._callbacks = [];
          this._dirty = false;
        };
        return ($traceurRuntime.createClass)(BaseQueryList, ($__1 = {}, Object.defineProperty($__1, Symbol.iterator, {
          value: function() {
            return this._results[Symbol.iterator]();
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "reset", {
          value: function(newList) {
            this._results = newList;
            this._dirty = true;
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "add", {
          value: function(obj) {
            ListWrapper.push(this._results, obj);
            this._dirty = true;
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "fireCallbacks", {
          value: function() {
            if (this._dirty) {
              ListWrapper.forEach(this._callbacks, (function(c) {
                return c();
              }));
              this._dirty = false;
            }
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "onChange", {
          value: function(callback) {
            ListWrapper.push(this._callbacks, callback);
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), Object.defineProperty($__1, "removeCallback", {
          value: function(callback) {
            ListWrapper.remove(this._callbacks, callback);
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), $__1), {});
      }()));
    }
  };
});
//# sourceMappingURL=base_query_list.es6.map

//# sourceMappingURL=./base_query_list.js.map