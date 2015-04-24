System.register(["angular2/src/facade/lang", "angular2/di"], function($__export) {
  "use strict";
  var CONST,
      DependencyAnnotation,
      Attribute,
      Query;
  return {
    setters: [function($__m) {
      CONST = $__m.CONST;
    }, function($__m) {
      DependencyAnnotation = $__m.DependencyAnnotation;
    }],
    execute: function() {
      Attribute = $__export("Attribute", (function($__super) {
        var Attribute = function Attribute(attributeName) {
          $traceurRuntime.superConstructor(Attribute).call(this);
          this.attributeName = attributeName;
        };
        return ($traceurRuntime.createClass)(Attribute, {get token() {
            return this;
          }}, {}, $__super);
      }(DependencyAnnotation)));
      Object.defineProperty(Attribute, "annotations", {get: function() {
          return [new CONST()];
        }});
      Query = $__export("Query", (function($__super) {
        var Query = function Query(directive) {
          $traceurRuntime.superConstructor(Query).call(this);
          this.directive = directive;
        };
        return ($traceurRuntime.createClass)(Query, {}, {}, $__super);
      }(DependencyAnnotation)));
      Object.defineProperty(Query, "annotations", {get: function() {
          return [new CONST()];
        }});
    }
  };
});
//# sourceMappingURL=di.es6.map

//# sourceMappingURL=./di.js.map