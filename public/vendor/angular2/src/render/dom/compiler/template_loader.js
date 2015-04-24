System.register(["rtts_assert/rtts_assert", "angular2/di", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/src/dom/dom_adapter", "angular2/src/services/xhr", "../../api", "angular2/src/services/url_resolver"], function($__export) {
  "use strict";
  var assert,
      Injectable,
      isBlank,
      isPresent,
      BaseException,
      stringify,
      Map,
      MapWrapper,
      StringMapWrapper,
      StringMap,
      PromiseWrapper,
      Promise,
      DOM,
      XHR,
      ViewDefinition,
      UrlResolver,
      TemplateLoader;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Injectable = $__m.Injectable;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      stringify = $__m.stringify;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
      StringMap = $__m.StringMap;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      ViewDefinition = $__m.ViewDefinition;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }],
    execute: function() {
      TemplateLoader = $__export("TemplateLoader", (function() {
        var TemplateLoader = function TemplateLoader(xhr, urlResolver) {
          assert.argumentTypes(xhr, XHR, urlResolver, UrlResolver);
          this._xhr = xhr;
          this._htmlCache = StringMapWrapper.create();
        };
        return ($traceurRuntime.createClass)(TemplateLoader, {load: function(template) {
            assert.argumentTypes(template, ViewDefinition);
            if (isPresent(template.template)) {
              return assert.returnType((PromiseWrapper.resolve(DOM.createTemplate(template.template))), Promise);
            }
            var url = template.absUrl;
            if (isPresent(url)) {
              var promise = StringMapWrapper.get(this._htmlCache, url);
              if (isBlank(promise)) {
                promise = this._xhr.get(url).then(function(html) {
                  var template = DOM.createTemplate(html);
                  return template;
                });
                StringMapWrapper.set(this._htmlCache, url, promise);
              }
              return assert.returnType((promise), Promise);
            }
            throw new BaseException('View should have either the url or template property set');
          }}, {});
      }()));
      Object.defineProperty(TemplateLoader, "annotations", {get: function() {
          return [new Injectable()];
        }});
      Object.defineProperty(TemplateLoader, "parameters", {get: function() {
          return [[XHR], [UrlResolver]];
        }});
      Object.defineProperty(TemplateLoader.prototype.load, "parameters", {get: function() {
          return [[ViewDefinition]];
        }});
    }
  };
});
//# sourceMappingURL=template_loader.es6.map

//# sourceMappingURL=./template_loader.js.map