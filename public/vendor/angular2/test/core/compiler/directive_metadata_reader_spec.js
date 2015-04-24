System.register(["angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/test_lib", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "angular2/di"], function($__export) {
  "use strict";
  var isPresent,
      ListWrapper,
      ddescribe,
      describe,
      it,
      iit,
      expect,
      beforeEach,
      DirectiveMetadataReader,
      Decorator,
      Component,
      Viewport,
      DirectiveMetadata,
      Injectable,
      Injector,
      SomeInjectable,
      SomeDecorator,
      SomeComponent,
      SomeViewport,
      SomeDirectiveWithoutAnnotation;
  function main() {
    describe("DirectiveMetadataReader", (function() {
      var reader;
      beforeEach((function() {
        reader = new DirectiveMetadataReader();
      }));
      it('should read out the Decorator annotation', (function() {
        var directiveMetadata = reader.read(SomeDecorator);
        expect(directiveMetadata).toEqual(new DirectiveMetadata(SomeDecorator, new Decorator({selector: 'someDecorator'}), null));
      }));
      it('should read out the Viewport annotation', (function() {
        var directiveMetadata = reader.read(SomeViewport);
        expect(directiveMetadata).toEqual(new DirectiveMetadata(SomeViewport, new Viewport({selector: 'someViewport'}), null));
      }));
      it('should read out the Component annotation', (function() {
        var m = reader.read(SomeComponent);
        expect(m.type).toEqual(SomeComponent);
        expect(m.annotation).toEqual(new Component({
          selector: 'someComponent',
          injectables: [SomeInjectable]
        }));
        var resolvedList = ListWrapper.reduce(m.resolvedInjectables, function(prev, elem) {
          if (isPresent(elem)) {
            ListWrapper.push(prev, elem);
          }
          return prev;
        }, []);
        expect(resolvedList.length).toBe(1);
        expect(resolvedList[0].key.token).toBe(SomeInjectable);
      }));
      it('should throw if not matching annotation is found', (function() {
        expect((function() {
          reader.read(SomeDirectiveWithoutAnnotation);
        })).toThrowError('No Directive annotation found on SomeDirectiveWithoutAnnotation');
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      Injectable = $__m.Injectable;
      Injector = $__m.Injector;
    }],
    execute: function() {
      SomeInjectable = (function() {
        var SomeInjectable = function SomeInjectable() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeInjectable, {}, {});
      }());
      Object.defineProperty(SomeInjectable, "annotations", {get: function() {
          return [new Injectable()];
        }});
      SomeDecorator = (function() {
        var SomeDecorator = function SomeDecorator() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeDecorator, {}, {});
      }());
      Object.defineProperty(SomeDecorator, "annotations", {get: function() {
          return [new Decorator({selector: 'someDecorator'})];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      Object.defineProperty(SomeComponent, "annotations", {get: function() {
          return [new Component({
            selector: 'someComponent',
            injectables: [SomeInjectable]
          })];
        }});
      SomeViewport = (function() {
        var SomeViewport = function SomeViewport() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeViewport, {}, {});
      }());
      Object.defineProperty(SomeViewport, "annotations", {get: function() {
          return [new Viewport({selector: 'someViewport'})];
        }});
      SomeDirectiveWithoutAnnotation = (function() {
        var SomeDirectiveWithoutAnnotation = function SomeDirectiveWithoutAnnotation() {
          ;
        };
        return ($traceurRuntime.createClass)(SomeDirectiveWithoutAnnotation, {}, {});
      }());
    }
  };
});
//# sourceMappingURL=directive_metadata_reader_spec.es6.map

//# sourceMappingURL=./directive_metadata_reader_spec.js.map