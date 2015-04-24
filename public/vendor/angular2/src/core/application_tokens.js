System.register(["rtts_assert/rtts_assert", "angular2/di"], function($__export) {
  "use strict";
  var assert,
      OpaqueToken,
      appComponentRefToken,
      appChangeDetectorToken,
      appElementToken,
      appComponentAnnotatedTypeToken,
      appDocumentToken;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      OpaqueToken = $__m.OpaqueToken;
    }],
    execute: function() {
      appComponentRefToken = $__export("appComponentRefToken", assert.type(new OpaqueToken('ComponentRef'), OpaqueToken));
      appChangeDetectorToken = $__export("appChangeDetectorToken", assert.type(new OpaqueToken('AppChangeDetector'), OpaqueToken));
      appElementToken = $__export("appElementToken", assert.type(new OpaqueToken('AppElement'), OpaqueToken));
      appComponentAnnotatedTypeToken = $__export("appComponentAnnotatedTypeToken", assert.type(new OpaqueToken('AppComponentAnnotatedType'), OpaqueToken));
      appDocumentToken = $__export("appDocumentToken", assert.type(new OpaqueToken('AppDocument'), OpaqueToken));
    }
  };
});
//# sourceMappingURL=application_tokens.es6.map

//# sourceMappingURL=./application_tokens.js.map