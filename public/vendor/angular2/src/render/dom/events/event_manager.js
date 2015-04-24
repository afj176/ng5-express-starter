System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/core/zone/vm_turn_zone"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      BaseException,
      isPresent,
      StringWrapper,
      DOM,
      List,
      ListWrapper,
      MapWrapper,
      VmTurnZone,
      BUBBLE_SYMBOL,
      EventManager,
      EventManagerPlugin,
      DomEventsPlugin;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      isPresent = $__m.isPresent;
      StringWrapper = $__m.StringWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      VmTurnZone = $__m.VmTurnZone;
    }],
    execute: function() {
      BUBBLE_SYMBOL = '^';
      EventManager = $__export("EventManager", (function() {
        var EventManager = function EventManager(plugins, zone) {
          assert.argumentTypes(plugins, assert.genericType(List, EventManagerPlugin), zone, VmTurnZone);
          this._zone = zone;
          this._plugins = plugins;
          for (var i = 0; i < plugins.length; i++) {
            plugins[i].manager = this;
          }
        };
        return ($traceurRuntime.createClass)(EventManager, {
          addEventListener: function(element, eventName, handler) {
            assert.argumentTypes(element, assert.type.any, eventName, assert.type.string, handler, Function);
            var withoutBubbleSymbol = this._removeBubbleSymbol(eventName);
            var plugin = this._findPluginFor(withoutBubbleSymbol);
            plugin.addEventListener(element, withoutBubbleSymbol, handler, withoutBubbleSymbol != eventName);
          },
          addGlobalEventListener: function(target, eventName, handler) {
            assert.argumentTypes(target, assert.type.string, eventName, assert.type.string, handler, Function);
            var withoutBubbleSymbol = this._removeBubbleSymbol(eventName);
            var plugin = this._findPluginFor(withoutBubbleSymbol);
            return assert.returnType((plugin.addGlobalEventListener(target, withoutBubbleSymbol, handler, withoutBubbleSymbol != eventName)), Function);
          },
          getZone: function() {
            return assert.returnType((this._zone), VmTurnZone);
          },
          _findPluginFor: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            var plugins = this._plugins;
            for (var i = 0; i < plugins.length; i++) {
              var plugin = plugins[i];
              if (plugin.supports(eventName)) {
                return assert.returnType((plugin), EventManagerPlugin);
              }
            }
            throw new BaseException(("No event manager plugin found for event " + eventName));
          },
          _removeBubbleSymbol: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            return assert.returnType((eventName[0] == BUBBLE_SYMBOL ? StringWrapper.substring(eventName, 1) : eventName), assert.type.string);
          }
        }, {});
      }()));
      Object.defineProperty(EventManager, "parameters", {get: function() {
          return [[assert.genericType(List, EventManagerPlugin)], [VmTurnZone]];
        }});
      Object.defineProperty(EventManager.prototype.addEventListener, "parameters", {get: function() {
          return [[], [assert.type.string], [Function]];
        }});
      Object.defineProperty(EventManager.prototype.addGlobalEventListener, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [Function]];
        }});
      Object.defineProperty(EventManager.prototype._findPluginFor, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(EventManager.prototype._removeBubbleSymbol, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      EventManagerPlugin = $__export("EventManagerPlugin", (function() {
        var EventManagerPlugin = function EventManagerPlugin() {
          ;
        };
        return ($traceurRuntime.createClass)(EventManagerPlugin, {
          supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            return assert.returnType((false), assert.type.boolean);
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            assert.argumentTypes(element, assert.type.any, eventName, assert.type.string, handler, Function, shouldSupportBubble, assert.type.boolean);
            throw "not implemented";
          },
          addGlobalEventListener: function(element, eventName, handler, shouldSupportBubble) {
            assert.argumentTypes(element, assert.type.any, eventName, assert.type.string, handler, Function, shouldSupportBubble, assert.type.boolean);
            throw "not implemented";
          }
        }, {});
      }()));
      Object.defineProperty(EventManagerPlugin.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(EventManagerPlugin.prototype.addEventListener, "parameters", {get: function() {
          return [[], [assert.type.string], [Function], [assert.type.boolean]];
        }});
      Object.defineProperty(EventManagerPlugin.prototype.addGlobalEventListener, "parameters", {get: function() {
          return [[], [assert.type.string], [Function], [assert.type.boolean]];
        }});
      DomEventsPlugin = $__export("DomEventsPlugin", (function($__super) {
        var DomEventsPlugin = function DomEventsPlugin() {
          $traceurRuntime.superConstructor(DomEventsPlugin).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(DomEventsPlugin, {
          supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            return assert.returnType((true), assert.type.boolean);
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            assert.argumentTypes(element, assert.type.any, eventName, assert.type.string, handler, Function, shouldSupportBubble, assert.type.boolean);
            var outsideHandler = this._getOutsideHandler(shouldSupportBubble, element, handler, this.manager._zone);
            this.manager._zone.runOutsideAngular((function() {
              DOM.on(element, eventName, outsideHandler);
            }));
          },
          addGlobalEventListener: function(target, eventName, handler, shouldSupportBubble) {
            assert.argumentTypes(target, assert.type.string, eventName, assert.type.string, handler, Function, shouldSupportBubble, assert.type.boolean);
            var element = DOM.getGlobalEventTarget(target);
            var outsideHandler = this._getOutsideHandler(shouldSupportBubble, element, handler, this.manager._zone);
            return assert.returnType((this.manager._zone.runOutsideAngular((function() {
              return DOM.onAndCancel(element, eventName, outsideHandler);
            }))), Function);
          },
          _getOutsideHandler: function(shouldSupportBubble, element, handler, zone) {
            assert.argumentTypes(shouldSupportBubble, assert.type.boolean, element, assert.type.any, handler, Function, zone, VmTurnZone);
            return shouldSupportBubble ? DomEventsPlugin.bubbleCallback(element, handler, zone) : DomEventsPlugin.sameElementCallback(element, handler, zone);
          }
        }, {
          sameElementCallback: function(element, handler, zone) {
            return (function(event) {
              if (event.target === element) {
                zone.run((function() {
                  return handler(event);
                }));
              }
            });
          },
          bubbleCallback: function(element, handler, zone) {
            return (function(event) {
              return zone.run((function() {
                return handler(event);
              }));
            });
          }
        }, $__super);
      }(EventManagerPlugin)));
      Object.defineProperty(DomEventsPlugin.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(DomEventsPlugin.prototype.addEventListener, "parameters", {get: function() {
          return [[], [assert.type.string], [Function], [assert.type.boolean]];
        }});
      Object.defineProperty(DomEventsPlugin.prototype.addGlobalEventListener, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [Function], [assert.type.boolean]];
        }});
      Object.defineProperty(DomEventsPlugin.prototype._getOutsideHandler, "parameters", {get: function() {
          return [[assert.type.boolean], [], [Function], [VmTurnZone]];
        }});
    }
  };
});
//# sourceMappingURL=event_manager.es6.map

//# sourceMappingURL=./event_manager.js.map