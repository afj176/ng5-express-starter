System.register(["angular2/test_lib", "angular2/src/mock/template_resolver_mock", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/view", "angular2/src/facade/lang"], function($__export) {
  "use strict";
  var beforeEach,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      it,
      MockTemplateResolver,
      Component,
      View,
      isBlank,
      SomeComponent,
      SomeDirective,
      SomeOtherDirective;
  function main() {
    describe('MockTemplateResolver', (function() {
      var resolver;
      beforeEach((function() {
        resolver = new MockTemplateResolver();
      }));
      describe('View overriding', (function() {
        it('should fallback to the default TemplateResolver when templates are not overridden', (function() {
          var template = resolver.resolve(SomeComponent);
          expect(template.template).toEqual('template');
          expect(template.directives).toEqual([SomeDirective]);
        }));
        it('should allow overriding the @View', (function() {
          resolver.setView(SomeComponent, new View({template: 'overridden template'}));
          var template = resolver.resolve(SomeComponent);
          expect(template.template).toEqual('overridden template');
          expect(isBlank(template.directives)).toBe(true);
        }));
        it('should not allow overriding a template after it has been resolved', (function() {
          resolver.resolve(SomeComponent);
          expect((function() {
            resolver.setView(SomeComponent, new View({template: 'overridden template'}));
          })).toThrowError('The component SomeComponent has already been compiled, its configuration can not be changed');
        }));
      }));
      describe('inline template definition overriding', (function() {
        it('should allow overriding the default template', (function() {
          resolver.setInlineTemplate(SomeComponent, 'overridden template');
          var template = resolver.resolve(SomeComponent);
          expect(template.template).toEqual('overridden template');
          expect(template.directives).toEqual([SomeDirective]);
        }));
        it('should allow overriding an overriden @View', (function() {
          resolver.setView(SomeComponent, new View({template: 'overridden template'}));
          resolver.setInlineTemplate(SomeComponent, 'overridden template x 2');
          var template = resolver.resolve(SomeComponent);
          expect(template.template).toEqual('overridden template x 2');
        }));
        it('should not allow overriding a template after it has been resolved', (function() {
          resolver.resolve(SomeComponent);
          expect((function() {
            resolver.setInlineTemplate(SomeComponent, 'overridden template');
          })).toThrowError('The component SomeComponent has already been compiled, its configuration can not be changed');
        }));
      }));
      describe('Directive overriding', (function() {
        it('should allow overriding a directive from the default template', (function() {
          resolver.overrideTemplateDirective(SomeComponent, SomeDirective, SomeOtherDirective);
          var template = resolver.resolve(SomeComponent);
          expect(template.directives.length).toEqual(1);
          expect(template.directives[0]).toBe(SomeOtherDirective);
        }));
        it('should allow overriding a directive from an overriden @View', (function() {
          resolver.setView(SomeComponent, new View({directives: [SomeOtherDirective]}));
          resolver.overrideTemplateDirective(SomeComponent, SomeOtherDirective, SomeComponent);
          var template = resolver.resolve(SomeComponent);
          expect(template.directives.length).toEqual(1);
          expect(template.directives[0]).toBe(SomeComponent);
        }));
        it('should throw when the overridden directive is not present', (function() {
          resolver.overrideTemplateDirective(SomeComponent, SomeOtherDirective, SomeDirective);
          expect((function() {
            resolver.resolve(SomeComponent);
          })).toThrowError('Overriden directive SomeOtherDirective not found in the template of SomeComponent');
        }));
        it('should not allow overriding a directive after its template has been resolved', (function() {
          resolver.resolve(SomeComponent);
          expect((function() {
            resolver.overrideTemplateDirective(SomeComponent, SomeDirective, SomeOtherDirective);
          })).toThrowError('The component SomeComponent has already been compiled, its configuration can not be changed');
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      it = $__m.it;
    }, function($__m) {
      MockTemplateResolver = $__m.MockTemplateResolver;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      isBlank = $__m.isBlank;
    }],
    execute: function() {
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      Object.defineProperty(SomeComponent, "annotations", {get: function() {
          return [new Component({selector: 'cmp'}), new View({
            template: 'template',
            directives: [SomeDirective]
          })];
        }});
      SomeDirective = (function() {
        var SomeDirective = function SomeDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeDirective, {}, {});
      }());
      SomeOtherDirective = (function() {
        var SomeOtherDirective = function SomeOtherDirective() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeOtherDirective, {}, {});
      }());
    }
  };
});
//# sourceMappingURL=template_resolver_mock_spec.es6.map

//# sourceMappingURL=./template_resolver_mock_spec.js.map