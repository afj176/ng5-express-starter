System.register(["./src/change_detection/parser/ast", "./src/change_detection/parser/lexer", "./src/change_detection/parser/parser", "./src/change_detection/parser/locals", "./src/change_detection/exceptions", "./src/change_detection/interfaces", "./src/change_detection/constants", "./src/change_detection/proto_change_detector", "./src/change_detection/binding_record", "./src/change_detection/directive_record", "./src/change_detection/dynamic_change_detector", "./src/change_detection/change_detector_ref", "./src/change_detection/pipes/pipe_registry", "./src/change_detection/change_detection_util", "./src/change_detection/pipes/pipe", "./src/change_detection/change_detection"], function($__export) {
  "use strict";
  return {
    setters: [function($__m) {
      $__export("ASTWithSource", $__m.ASTWithSource);
      $__export("AST", $__m.AST);
      $__export("AstTransformer", $__m.AstTransformer);
      $__export("AccessMember", $__m.AccessMember);
      $__export("LiteralArray", $__m.LiteralArray);
      $__export("ImplicitReceiver", $__m.ImplicitReceiver);
    }, function($__m) {
      $__export("Lexer", $__m.Lexer);
    }, function($__m) {
      $__export("Parser", $__m.Parser);
    }, function($__m) {
      $__export("Locals", $__m.Locals);
    }, function($__m) {
      $__export("ExpressionChangedAfterItHasBeenChecked", $__m.ExpressionChangedAfterItHasBeenChecked);
      $__export("ChangeDetectionError", $__m.ChangeDetectionError);
    }, function($__m) {
      $__export("ProtoChangeDetector", $__m.ProtoChangeDetector);
      $__export("ChangeDispatcher", $__m.ChangeDispatcher);
      $__export("ChangeDetector", $__m.ChangeDetector);
      $__export("ChangeDetection", $__m.ChangeDetection);
    }, function($__m) {
      $__export("CHECK_ONCE", $__m.CHECK_ONCE);
      $__export("CHECK_ALWAYS", $__m.CHECK_ALWAYS);
      $__export("DETACHED", $__m.DETACHED);
      $__export("CHECKED", $__m.CHECKED);
      $__export("ON_PUSH", $__m.ON_PUSH);
      $__export("DEFAULT", $__m.DEFAULT);
    }, function($__m) {
      $__export("DynamicProtoChangeDetector", $__m.DynamicProtoChangeDetector);
      $__export("JitProtoChangeDetector", $__m.JitProtoChangeDetector);
    }, function($__m) {
      $__export("BindingRecord", $__m.BindingRecord);
    }, function($__m) {
      $__export("DirectiveIndex", $__m.DirectiveIndex);
      $__export("DirectiveRecord", $__m.DirectiveRecord);
    }, function($__m) {
      $__export("DynamicChangeDetector", $__m.DynamicChangeDetector);
    }, function($__m) {
      $__export("ChangeDetectorRef", $__m.ChangeDetectorRef);
    }, function($__m) {
      $__export("PipeRegistry", $__m.PipeRegistry);
    }, function($__m) {
      $__export("uninitialized", $__m.uninitialized);
    }, function($__m) {
      $__export("NO_CHANGE", $__m.NO_CHANGE);
      $__export("Pipe", $__m.Pipe);
    }, function($__m) {
      $__export("defaultPipes", $__m.defaultPipes);
      $__export("DynamicChangeDetection", $__m.DynamicChangeDetection);
      $__export("JitChangeDetection", $__m.JitChangeDetection);
      $__export("defaultPipeRegistry", $__m.defaultPipeRegistry);
    }],
    execute: function() {}
  };
});
//# sourceMappingURL=change_detection.es6.map

//# sourceMappingURL=./change_detection.js.map