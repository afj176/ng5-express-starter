System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "./view"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      BaseException,
      ListWrapper,
      MapWrapper,
      List,
      DOM,
      viewModule,
      ViewContainer;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      List = $__m.List;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      viewModule = $__m;
    }],
    execute: function() {
      ViewContainer = $__export("ViewContainer", (function() {
        var ViewContainer = function ViewContainer(parentView, boundElementIndex) {
          assert.argumentTypes(parentView, viewModule.RenderView, boundElementIndex, assert.type.number);
          this.parentView = parentView;
          this.boundElementIndex = boundElementIndex;
          this.views = [];
        };
        return ($traceurRuntime.createClass)(ViewContainer, {
          get: function(index) {
            assert.argumentTypes(index, assert.type.number);
            return assert.returnType((this.views[index]), viewModule.RenderView);
          },
          size: function() {
            return this.views.length;
          },
          _siblingToInsertAfter: function(index) {
            assert.argumentTypes(index, assert.type.number);
            if (index == 0)
              return this.parentView.boundElements[this.boundElementIndex];
            return ListWrapper.last(this.views[index - 1].rootNodes);
          },
          _checkHydrated: function() {
            if (!this.parentView.hydrated)
              throw new BaseException('Cannot change dehydrated ViewContainer');
          },
          _getDirectParentLightDom: function() {
            return this.parentView.getDirectParentLightDom(this.boundElementIndex);
          },
          clear: function() {
            this._checkHydrated();
            for (var i = this.views.length - 1; i >= 0; i--) {
              this.detach(i);
            }
            if (isPresent(this._getDirectParentLightDom())) {
              this._getDirectParentLightDom().redistribute();
            }
          },
          insert: function(view) {
            var atIndex = arguments[1] !== (void 0) ? arguments[1] : -1;
            this._checkHydrated();
            if (atIndex == -1)
              atIndex = this.views.length;
            ListWrapper.insert(this.views, atIndex, view);
            if (isBlank(this._getDirectParentLightDom())) {
              ViewContainer.moveViewNodesAfterSibling(this._siblingToInsertAfter(atIndex), view);
            } else {
              this._getDirectParentLightDom().redistribute();
            }
            if (isPresent(this.parentView.hostLightDom)) {
              this.parentView.hostLightDom.redistribute();
            }
            return assert.returnType((view), viewModule.RenderView);
          },
          detach: function(atIndex) {
            assert.argumentTypes(atIndex, assert.type.number);
            this._checkHydrated();
            var detachedView = this.get(atIndex);
            ListWrapper.removeAt(this.views, atIndex);
            if (isBlank(this._getDirectParentLightDom())) {
              ViewContainer.removeViewNodes(detachedView);
            } else {
              this._getDirectParentLightDom().redistribute();
            }
            if (isPresent(this.parentView.hostLightDom)) {
              this.parentView.hostLightDom.redistribute();
            }
            return detachedView;
          },
          contentTagContainers: function() {
            return this.views;
          },
          nodes: function() {
            var r = [];
            for (var i = 0; i < this.views.length; ++i) {
              r = ListWrapper.concat(r, this.views[i].rootNodes);
            }
            return assert.returnType((r), List);
          }
        }, {
          moveViewNodesAfterSibling: function(sibling, view) {
            for (var i = view.rootNodes.length - 1; i >= 0; --i) {
              DOM.insertAfter(sibling, view.rootNodes[i]);
            }
          },
          removeViewNodes: function(view) {
            var len = view.rootNodes.length;
            if (len == 0)
              return ;
            var parent = view.rootNodes[0].parentNode;
            for (var i = len - 1; i >= 0; --i) {
              DOM.removeChild(parent, view.rootNodes[i]);
            }
          }
        });
      }()));
      Object.defineProperty(ViewContainer, "parameters", {get: function() {
          return [[viewModule.RenderView], [assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype.get, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype._siblingToInsertAfter, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(ViewContainer.prototype.detach, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
    }
  };
});
//# sourceMappingURL=view_container.es6.map

//# sourceMappingURL=./view_container.js.map