System.register([], function($__export) {
  "use strict";
  var TestIterable;
  return {
    setters: [],
    execute: function() {
      TestIterable = $__export("TestIterable", (function() {
        var $__1;
        var TestIterable = function TestIterable() {
          this.list = [];
        };
        return ($traceurRuntime.createClass)(TestIterable, ($__1 = {}, Object.defineProperty($__1, Symbol.iterator, {
          value: function() {
            return this.list[Symbol.iterator]();
          },
          configurable: true,
          enumerable: true,
          writable: true
        }), $__1), {});
      }()));
    }
  };
});
//# sourceMappingURL=iterable.es6.map

//# sourceMappingURL=./iterable.js.map