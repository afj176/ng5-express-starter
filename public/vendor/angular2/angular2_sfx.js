System.register(["./angular2"], function($__export) {
  "use strict";
  var angular,
      _prevAngular;
  return {
    setters: [function($__m) {
      angular = $__m;
    }],
    execute: function() {
      _prevAngular = window.angular;
      angular.noConflict = function() {
        window.angular = _prevAngular;
        return angular;
      };
      window.angular = angular;
    }
  };
});
//# sourceMappingURL=angular2_sfx.es6.map

//# sourceMappingURL=./angular2_sfx.js.map