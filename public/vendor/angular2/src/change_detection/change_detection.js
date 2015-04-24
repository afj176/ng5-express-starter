System.register(["rtts_assert/rtts_assert", "./proto_change_detector", "./pipes/pipe_registry", "./pipes/iterable_changes", "./pipes/keyvalue_changes", "./pipes/async_pipe", "./pipes/null_pipe", "./constants", "./interfaces", "angular2/di"], function($__export) {
  "use strict";
  var assert,
      DynamicProtoChangeDetector,
      JitProtoChangeDetector,
      PipeRegistry,
      IterableChangesFactory,
      KeyValueChangesFactory,
      AsyncPipeFactory,
      NullPipeFactory,
      DEFAULT,
      ChangeDetection,
      ProtoChangeDetector,
      Injectable,
      keyValDiff,
      iterableDiff,
      async,
      defaultPipes,
      DynamicChangeDetection,
      JitChangeDetection,
      defaultPipeRegistry;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
      JitProtoChangeDetector = $__m.JitProtoChangeDetector;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
    }, function($__m) {
      IterableChangesFactory = $__m.IterableChangesFactory;
    }, function($__m) {
      KeyValueChangesFactory = $__m.KeyValueChangesFactory;
    }, function($__m) {
      AsyncPipeFactory = $__m.AsyncPipeFactory;
    }, function($__m) {
      NullPipeFactory = $__m.NullPipeFactory;
    }, function($__m) {
      DEFAULT = $__m.DEFAULT;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
      ProtoChangeDetector = $__m.ProtoChangeDetector;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }],
    execute: function() {
      keyValDiff = $__export("keyValDiff", [new KeyValueChangesFactory(), new NullPipeFactory()]);
      iterableDiff = $__export("iterableDiff", [new IterableChangesFactory(), new NullPipeFactory()]);
      async = $__export("async", [new AsyncPipeFactory(), new NullPipeFactory()]);
      defaultPipes = $__export("defaultPipes", {
        "iterableDiff": iterableDiff,
        "keyValDiff": keyValDiff,
        "async": async
      });
      DynamicChangeDetection = $__export("DynamicChangeDetection", (function($__super) {
        var DynamicChangeDetection = function DynamicChangeDetection(registry) {
          assert.argumentTypes(registry, PipeRegistry);
          $traceurRuntime.superConstructor(DynamicChangeDetection).call(this);
          this.registry = registry;
        };
        return ($traceurRuntime.createClass)(DynamicChangeDetection, {createProtoChangeDetector: function(name) {
            var changeControlStrategy = arguments[1] !== (void 0) ? arguments[1] : DEFAULT;
            assert.argumentTypes(name, assert.type.string, changeControlStrategy, assert.type.string);
            return assert.returnType((new DynamicProtoChangeDetector(this.registry, changeControlStrategy)), ProtoChangeDetector);
          }}, {}, $__super);
      }(ChangeDetection)));
      Object.defineProperty(DynamicChangeDetection, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(DynamicChangeDetection, "parameters", {get: function() {
          return [[PipeRegistry]];
        }});
      Object.defineProperty(DynamicChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      JitChangeDetection = $__export("JitChangeDetection", (function($__super) {
        var JitChangeDetection = function JitChangeDetection(registry) {
          assert.argumentTypes(registry, PipeRegistry);
          $traceurRuntime.superConstructor(JitChangeDetection).call(this);
          this.registry = registry;
        };
        return ($traceurRuntime.createClass)(JitChangeDetection, {createProtoChangeDetector: function(name) {
            var changeControlStrategy = arguments[1] !== (void 0) ? arguments[1] : DEFAULT;
            assert.argumentTypes(name, assert.type.string, changeControlStrategy, assert.type.string);
            return assert.returnType((new JitProtoChangeDetector(this.registry, changeControlStrategy)), ProtoChangeDetector);
          }}, {}, $__super);
      }(ChangeDetection)));
      Object.defineProperty(JitChangeDetection, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(JitChangeDetection, "parameters", {get: function() {
          return [[PipeRegistry]];
        }});
      Object.defineProperty(JitChangeDetection.prototype.createProtoChangeDetector, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      defaultPipeRegistry = $__export("defaultPipeRegistry", new PipeRegistry(defaultPipes));
    }
  };
});
//# sourceMappingURL=change_detection.es6.map

//# sourceMappingURL=./change_detection.js.map