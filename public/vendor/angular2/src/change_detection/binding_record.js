System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/reflection/types", "./parser/ast", "./directive_record"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      SetterFn,
      AST,
      DirectiveRecord,
      DIRECTIVE,
      ELEMENT,
      TEXT_NODE,
      BindingRecord;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      SetterFn = $__m.SetterFn;
    }, function($__m) {
      AST = $__m.AST;
    }, function($__m) {
      DirectiveRecord = $__m.DirectiveRecord;
    }],
    execute: function() {
      DIRECTIVE = "directive";
      ELEMENT = "element";
      TEXT_NODE = "textNode";
      BindingRecord = $__export("BindingRecord", (function() {
        var BindingRecord = function BindingRecord(mode, ast, elementIndex, propertyName, setter, directiveRecord) {
          assert.argumentTypes(mode, assert.type.string, ast, AST, elementIndex, assert.type.number, propertyName, assert.type.string, setter, SetterFn, directiveRecord, DirectiveRecord);
          this.mode = mode;
          this.ast = ast;
          this.elementIndex = elementIndex;
          this.propertyName = propertyName;
          this.setter = setter;
          this.directiveRecord = directiveRecord;
        };
        return ($traceurRuntime.createClass)(BindingRecord, {
          callOnChange: function() {
            return isPresent(this.directiveRecord) && this.directiveRecord.callOnChange;
          },
          isOnPushChangeDetection: function() {
            return isPresent(this.directiveRecord) && this.directiveRecord.isOnPushChangeDetection();
          },
          isDirective: function() {
            return this.mode === DIRECTIVE;
          },
          isElement: function() {
            return this.mode === ELEMENT;
          },
          isTextNode: function() {
            return this.mode === TEXT_NODE;
          }
        }, {
          createForDirective: function(ast, propertyName, setter, directiveRecord) {
            assert.argumentTypes(ast, AST, propertyName, assert.type.string, setter, SetterFn, directiveRecord, DirectiveRecord);
            return new BindingRecord(DIRECTIVE, ast, 0, propertyName, setter, directiveRecord);
          },
          createForElement: function(ast, elementIndex, propertyName) {
            assert.argumentTypes(ast, AST, elementIndex, assert.type.number, propertyName, assert.type.string);
            return new BindingRecord(ELEMENT, ast, elementIndex, propertyName, null, null);
          },
          createForTextNode: function(ast, elementIndex) {
            assert.argumentTypes(ast, AST, elementIndex, assert.type.number);
            return new BindingRecord(TEXT_NODE, ast, elementIndex, null, null, null);
          }
        });
      }()));
      Object.defineProperty(BindingRecord, "parameters", {get: function() {
          return [[assert.type.string], [AST], [assert.type.number], [assert.type.string], [SetterFn], [DirectiveRecord]];
        }});
      Object.defineProperty(BindingRecord.createForDirective, "parameters", {get: function() {
          return [[AST], [assert.type.string], [SetterFn], [DirectiveRecord]];
        }});
      Object.defineProperty(BindingRecord.createForElement, "parameters", {get: function() {
          return [[AST], [assert.type.number], [assert.type.string]];
        }});
      Object.defineProperty(BindingRecord.createForTextNode, "parameters", {get: function() {
          return [[AST], [assert.type.number]];
        }});
    }
  };
});
//# sourceMappingURL=binding_record.es6.map

//# sourceMappingURL=./binding_record.js.map