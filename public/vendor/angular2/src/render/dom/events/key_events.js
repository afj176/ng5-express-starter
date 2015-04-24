System.register(["rtts_assert/rtts_assert", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "angular2/src/facade/collection", "./event_manager"], function($__export) {
  "use strict";
  var assert,
      DOM,
      isPresent,
      isBlank,
      StringWrapper,
      RegExpWrapper,
      BaseException,
      NumberWrapper,
      StringMapWrapper,
      ListWrapper,
      EventManagerPlugin,
      modifierKeys,
      modifierKeyGetters,
      KeyEventsPlugin;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      StringWrapper = $__m.StringWrapper;
      RegExpWrapper = $__m.RegExpWrapper;
      BaseException = $__m.BaseException;
      NumberWrapper = $__m.NumberWrapper;
    }, function($__m) {
      StringMapWrapper = $__m.StringMapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      EventManagerPlugin = $__m.EventManagerPlugin;
    }],
    execute: function() {
      modifierKeys = ['alt', 'control', 'meta', 'shift'];
      modifierKeyGetters = {
        'alt': (function(event) {
          return event.altKey;
        }),
        'control': (function(event) {
          return event.ctrlKey;
        }),
        'meta': (function(event) {
          return event.metaKey;
        }),
        'shift': (function(event) {
          return event.shiftKey;
        })
      };
      KeyEventsPlugin = $__export("KeyEventsPlugin", (function($__super) {
        var KeyEventsPlugin = function KeyEventsPlugin() {
          $traceurRuntime.superConstructor(KeyEventsPlugin).call(this);
        };
        return ($traceurRuntime.createClass)(KeyEventsPlugin, {
          supports: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            return assert.returnType((isPresent(KeyEventsPlugin.parseEventName(eventName))), assert.type.boolean);
          },
          addEventListener: function(element, eventName, handler, shouldSupportBubble) {
            assert.argumentTypes(element, assert.type.any, eventName, assert.type.string, handler, Function, shouldSupportBubble, assert.type.boolean);
            var parsedEvent = KeyEventsPlugin.parseEventName(eventName);
            var outsideHandler = KeyEventsPlugin.eventCallback(element, shouldSupportBubble, StringMapWrapper.get(parsedEvent, 'fullKey'), handler, this.manager.getZone());
            this.manager.getZone().runOutsideAngular((function() {
              DOM.on(element, StringMapWrapper.get(parsedEvent, 'domEventName'), outsideHandler);
            }));
          }
        }, {
          parseEventName: function(eventName) {
            assert.argumentTypes(eventName, assert.type.string);
            eventName = eventName.toLowerCase();
            var parts = eventName.split('.');
            var domEventName = ListWrapper.removeAt(parts, 0);
            if ((parts.length === 0) || !(StringWrapper.equals(domEventName, 'keydown') || StringWrapper.equals(domEventName, 'keyup'))) {
              return null;
            }
            var key = ListWrapper.removeLast(parts);
            var fullKey = '';
            ListWrapper.forEach(modifierKeys, (function(modifierName) {
              if (ListWrapper.contains(parts, modifierName)) {
                ListWrapper.remove(parts, modifierName);
                fullKey += modifierName + '.';
              }
            }));
            fullKey += key;
            if (parts.length != 0 || key.length === 0) {
              return null;
            }
            return {
              'domEventName': domEventName,
              'fullKey': fullKey
            };
          },
          getEventFullKey: function(event) {
            var fullKey = '';
            var key = DOM.getEventKey(event);
            key = key.toLowerCase();
            if (StringWrapper.equals(key, ' ')) {
              key = 'space';
            } else if (StringWrapper.equals(key, '.')) {
              key = 'dot';
            }
            ListWrapper.forEach(modifierKeys, (function(modifierName) {
              if (modifierName != key) {
                var modifierGetter = StringMapWrapper.get(modifierKeyGetters, modifierName);
                if (modifierGetter(event)) {
                  fullKey += modifierName + '.';
                }
              }
            }));
            fullKey += key;
            return assert.returnType((fullKey), assert.type.string);
          },
          eventCallback: function(element, shouldSupportBubble, fullKey, handler, zone) {
            return (function(event) {
              var correctElement = shouldSupportBubble || event.target === element;
              if (correctElement && KeyEventsPlugin.getEventFullKey(event) === fullKey) {
                zone.run((function() {
                  return handler(event);
                }));
              }
            });
          }
        }, $__super);
      }(EventManagerPlugin)));
      Object.defineProperty(KeyEventsPlugin.prototype.supports, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(KeyEventsPlugin.prototype.addEventListener, "parameters", {get: function() {
          return [[], [assert.type.string], [Function], [assert.type.boolean]];
        }});
      Object.defineProperty(KeyEventsPlugin.parseEventName, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=key_events.es6.map

//# sourceMappingURL=./key_events.js.map