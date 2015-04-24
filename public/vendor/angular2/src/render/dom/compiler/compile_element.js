System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "../view/proto_view_builder"], function($__export) {
  "use strict";
  var assert,
      List,
      Map,
      ListWrapper,
      MapWrapper,
      DOM,
      int,
      isBlank,
      isPresent,
      Type,
      StringJoiner,
      assertionsEnabled,
      ProtoViewBuilder,
      ElementBinderBuilder,
      CompileElement;
  function getElementDescription(domElement) {
    var buf = new StringJoiner();
    var atts = DOM.attributeMap(domElement);
    buf.add("<");
    buf.add(DOM.tagName(domElement).toLowerCase());
    addDescriptionAttribute(buf, "id", MapWrapper.get(atts, "id"));
    addDescriptionAttribute(buf, "class", MapWrapper.get(atts, "class"));
    MapWrapper.forEach(atts, (function(attValue, attName) {
      if (attName !== "id" && attName !== "class") {
        addDescriptionAttribute(buf, attName, attValue);
      }
    }));
    buf.add(">");
    return assert.returnType((buf.toString()), assert.type.string);
  }
  function addDescriptionAttribute(buffer, attName, attValue) {
    assert.argumentTypes(buffer, StringJoiner, attName, assert.type.string, attValue, assert.type.any);
    if (isPresent(attValue)) {
      if (attValue.length === 0) {
        buffer.add(' ' + attName);
      } else {
        buffer.add(' ' + attName + '="' + attValue + '"');
      }
    }
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
      Map = $__m.Map;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      int = $__m.int;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      Type = $__m.Type;
      StringJoiner = $__m.StringJoiner;
      assertionsEnabled = $__m.assertionsEnabled;
    }, function($__m) {
      ProtoViewBuilder = $__m.ProtoViewBuilder;
      ElementBinderBuilder = $__m.ElementBinderBuilder;
    }],
    execute: function() {
      CompileElement = $__export("CompileElement", (function() {
        var CompileElement = function CompileElement(element) {
          var compilationUnit = arguments[1] !== (void 0) ? arguments[1] : '';
          this.element = element;
          this._attrs = null;
          this._classList = null;
          this.isViewRoot = false;
          this.inheritedProtoView = null;
          this.inheritedElementBinder = null;
          this.distanceToInheritedBinder = 0;
          this.compileChildren = true;
          var tplDesc = assertionsEnabled() ? getElementDescription(element) : null;
          if (compilationUnit !== '') {
            this.elementDescription = compilationUnit;
            if (isPresent(tplDesc))
              this.elementDescription += ": " + tplDesc;
          } else {
            this.elementDescription = tplDesc;
          }
        };
        return ($traceurRuntime.createClass)(CompileElement, {
          isBound: function() {
            return isPresent(this.inheritedElementBinder) && this.distanceToInheritedBinder === 0;
          },
          bindElement: function() {
            if (!this.isBound()) {
              var parentBinder = this.inheritedElementBinder;
              this.inheritedElementBinder = this.inheritedProtoView.bindElement(this.element, this.elementDescription);
              if (isPresent(parentBinder)) {
                this.inheritedElementBinder.setParent(parentBinder, this.distanceToInheritedBinder);
              }
              this.distanceToInheritedBinder = 0;
            }
            return this.inheritedElementBinder;
          },
          refreshAttrs: function() {
            this._attrs = null;
          },
          attrs: function() {
            if (isBlank(this._attrs)) {
              this._attrs = DOM.attributeMap(this.element);
            }
            return assert.returnType((this._attrs), assert.genericType(Map, assert.type.string, assert.type.string));
          },
          refreshClassList: function() {
            this._classList = null;
          },
          classList: function() {
            if (isBlank(this._classList)) {
              this._classList = ListWrapper.create();
              var elClassList = DOM.classList(this.element);
              for (var i = 0; i < elClassList.length; i++) {
                ListWrapper.push(this._classList, elClassList[i]);
              }
            }
            return assert.returnType((this._classList), assert.genericType(List, assert.type.string));
          }
        }, {});
      }()));
      Object.defineProperty(addDescriptionAttribute, "parameters", {get: function() {
          return [[StringJoiner], [assert.type.string], []];
        }});
    }
  };
});
//# sourceMappingURL=compile_element.es6.map

//# sourceMappingURL=./compile_element.js.map