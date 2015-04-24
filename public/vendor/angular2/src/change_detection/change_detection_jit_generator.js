System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./abstract_change_detector", "./change_detection_util", "./directive_record", "./proto_record"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      BaseException,
      Type,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      AbstractChangeDetector,
      ChangeDetectionUtil,
      DirectiveIndex,
      DirectiveRecord,
      ProtoRecord,
      RECORD_TYPE_SELF,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_LOCAL,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_PRIMITIVE_OP,
      RECORD_TYPE_KEYED_ACCESS,
      RECORD_TYPE_PIPE,
      RECORD_TYPE_BINDING_PIPE,
      RECORD_TYPE_INTERPOLATE,
      ABSTRACT_CHANGE_DETECTOR,
      UTIL,
      DISPATCHER_ACCESSOR,
      PIPE_REGISTRY_ACCESSOR,
      PROTOS_ACCESSOR,
      DIRECTIVES_ACCESSOR,
      CONTEXT_ACCESSOR,
      IS_CHANGED_LOCAL,
      CHANGES_LOCAL,
      LOCALS_ACCESSOR,
      MODE_ACCESSOR,
      TEMP_LOCAL,
      CURRENT_PROTO,
      ChangeDetectorJITGenerator;
  function typeTemplate(type, cons, detectChanges, notifyOnAllChangesDone, setContext) {
    assert.argumentTypes(type, assert.type.string, cons, assert.type.string, detectChanges, assert.type.string, notifyOnAllChangesDone, assert.type.string, setContext, assert.type.string);
    return assert.returnType((("\n" + cons + "\n" + detectChanges + "\n" + notifyOnAllChangesDone + "\n" + setContext + ";\n\nreturn function(dispatcher, pipeRegistry) {\n  return new " + type + "(dispatcher, pipeRegistry, protos, directiveRecords);\n}\n")), assert.type.string);
  }
  function constructorTemplate(type, fieldsDefinitions) {
    assert.argumentTypes(type, assert.type.string, fieldsDefinitions, assert.type.string);
    return assert.returnType((("\nvar " + type + " = function " + type + "(dispatcher, pipeRegistry, protos, directiveRecords) {\n" + ABSTRACT_CHANGE_DETECTOR + ".call(this);\n" + DISPATCHER_ACCESSOR + " = dispatcher;\n" + PIPE_REGISTRY_ACCESSOR + " = pipeRegistry;\n" + PROTOS_ACCESSOR + " = protos;\n" + DIRECTIVES_ACCESSOR + " = directiveRecords;\n" + LOCALS_ACCESSOR + " = null;\n" + fieldsDefinitions + "\n}\n\n" + type + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n")), assert.type.string);
  }
  function pipeOnDestroyTemplate(pipeNames) {
    return pipeNames.map((function(p) {
      return (p + ".onDestroy()");
    })).join("\n");
  }
  function hydrateTemplate(type, mode, fieldDefinitions, pipeOnDestroy, directiveFieldNames, detectorFieldNames) {
    assert.argumentTypes(type, assert.type.string, mode, assert.type.string, fieldDefinitions, assert.type.string, pipeOnDestroy, assert.type.string, directiveFieldNames, assert.genericType(List, String), detectorFieldNames, assert.genericType(List, String));
    var directiveInit = "";
    for (var i = 0; i < directiveFieldNames.length; ++i) {
      directiveInit += (directiveFieldNames[i] + " = directives.getDirectiveFor(this.directiveRecords[" + i + "].directiveIndex);\n");
    }
    var detectorInit = "";
    for (var i = 0; i < detectorFieldNames.length; ++i) {
      detectorInit += (detectorFieldNames[i] + " = directives.getDetectorFor(this.directiveRecords[" + i + "].directiveIndex);\n");
    }
    return assert.returnType((("\n" + type + ".prototype.hydrate = function(context, locals, directives) {\n  " + MODE_ACCESSOR + " = \"" + mode + "\";\n  " + CONTEXT_ACCESSOR + " = context;\n  " + LOCALS_ACCESSOR + " = locals;\n  " + directiveInit + "\n  " + detectorInit + "\n}\n" + type + ".prototype.dehydrate = function() {\n  " + pipeOnDestroy + "\n  " + fieldDefinitions + "\n  " + LOCALS_ACCESSOR + " = null;\n}\n" + type + ".prototype.hydrated = function() {\n  return " + CONTEXT_ACCESSOR + " !== " + UTIL + ".unitialized();\n}\n")), assert.type.string);
  }
  function detectChangesTemplate(type, body) {
    assert.argumentTypes(type, assert.type.string, body, assert.type.string);
    return assert.returnType((("\n" + type + ".prototype.detectChangesInRecords = function(throwOnChange) {\n  " + body + "\n}\n")), assert.type.string);
  }
  function callOnAllChangesDoneTemplate(type, body) {
    assert.argumentTypes(type, assert.type.string, body, assert.type.string);
    return assert.returnType((("\n" + type + ".prototype.callOnAllChangesDone = function() {\n  " + body + "\n}\n")), assert.type.string);
  }
  function onAllChangesDoneTemplate(directive) {
    assert.argumentTypes(directive, assert.type.string);
    return assert.returnType(((directive + ".onAllChangesDone();")), assert.type.string);
  }
  function detectChangesBodyTemplate(localDefinitions, changeDefinitions, records) {
    assert.argumentTypes(localDefinitions, assert.type.string, changeDefinitions, assert.type.string, records, assert.type.string);
    return assert.returnType((("\n" + localDefinitions + "\n" + changeDefinitions + "\nvar " + TEMP_LOCAL + ";\nvar " + IS_CHANGED_LOCAL + " = false;\nvar " + CURRENT_PROTO + ";\nvar " + CHANGES_LOCAL + " = null;\n\ncontext = " + CONTEXT_ACCESSOR + ";\n" + records + "\n")), assert.type.string);
  }
  function pipeCheckTemplate(protoIndex, context, bindingPropagationConfig, pipe, pipeType, oldValue, newValue, change, update, addToChanges, lastInDirective) {
    assert.argumentTypes(protoIndex, assert.type.number, context, assert.type.string, bindingPropagationConfig, assert.type.string, pipe, assert.type.string, pipeType, assert.type.string, oldValue, assert.type.string, newValue, assert.type.string, change, assert.type.string, update, assert.type.string, addToChanges, assert.type.any, lastInDirective, assert.type.string);
    return assert.returnType((("\n" + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\nif (" + pipe + " === " + UTIL + ".unitialized()) {\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + bindingPropagationConfig + ");\n} else if (!" + pipe + ".supports(" + context + ")) {\n  " + pipe + ".onDestroy();\n  " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + bindingPropagationConfig + ");\n}\n\n" + newValue + " = " + pipe + ".transform(" + context + ");\nif (! " + UTIL + ".noChangeMarker(" + newValue + ")) {\n  " + change + " = true;\n  " + update + "\n  " + addToChanges + "\n  " + oldValue + " = " + newValue + ";\n}\n" + lastInDirective + "\n")), assert.type.string);
  }
  function referenceCheckTemplate(protoIndex, assignment, oldValue, newValue, change, update, addToChanges, lastInDirective) {
    assert.argumentTypes(protoIndex, assert.type.number, assignment, assert.type.string, oldValue, assert.type.string, newValue, assert.type.string, change, assert.type.string, update, assert.type.string, addToChanges, assert.type.string, lastInDirective, assert.type.string);
    return assert.returnType((("\n" + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\n" + assignment + "\nif (" + newValue + " !== " + oldValue + " || (" + newValue + " !== " + newValue + ") && (" + oldValue + " !== " + oldValue + ")) {\n  " + change + " = true;\n  " + update + "\n  " + addToChanges + "\n  " + oldValue + " = " + newValue + ";\n}\n" + lastInDirective + "\n")), assert.type.string);
  }
  function assignmentTemplate(field, value) {
    assert.argumentTypes(field, assert.type.string, value, assert.type.string);
    return (field + " = " + value + ";");
  }
  function localDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return ("var " + n + ";");
    })).join("\n")), assert.type.string);
  }
  function changeDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return ("var " + n + " = false;");
    })).join("\n")), assert.type.string);
  }
  function fieldDefinitionsTemplate(names) {
    return assert.returnType((names.map((function(n) {
      return (n + " = " + UTIL + ".unitialized();");
    })).join("\n")), assert.type.string);
  }
  function ifChangedGuardTemplate(changeNames, body) {
    assert.argumentTypes(changeNames, List, body, assert.type.string);
    var cond = changeNames.join(" || ");
    return assert.returnType((("\nif (" + cond + ") {\n  " + body + "\n}\n")), assert.type.string);
  }
  function addToChangesTemplate(oldValue, newValue) {
    assert.argumentTypes(oldValue, assert.type.string, newValue, assert.type.string);
    return assert.returnType(((CHANGES_LOCAL + " = " + UTIL + ".addChange(" + CHANGES_LOCAL + ", " + CURRENT_PROTO + ".bindingRecord.propertyName, " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));")), assert.type.string);
  }
  function updateDirectiveTemplate(oldValue, newValue, directiveProperty) {
    assert.argumentTypes(oldValue, assert.type.string, newValue, assert.type.string, directiveProperty, assert.type.string);
    return assert.returnType((("\nif(throwOnChange) " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n" + directiveProperty + " = " + newValue + ";\n" + IS_CHANGED_LOCAL + " = true;\n  ")), assert.type.string);
  }
  function updateElementTemplate(oldValue, newValue) {
    assert.argumentTypes(oldValue, assert.type.string, newValue, assert.type.string);
    return assert.returnType((("\nif(throwOnChange) " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n" + DISPATCHER_ACCESSOR + ".notifyOnBinding(" + CURRENT_PROTO + ".bindingRecord, " + newValue + ");\n  ")), assert.type.string);
  }
  function notifyOnChangesTemplate(directive) {
    assert.argumentTypes(directive, assert.type.string);
    return assert.returnType((("\nif(" + CHANGES_LOCAL + ") {\n  " + directive + ".onChange(" + CHANGES_LOCAL + ");\n  " + CHANGES_LOCAL + " = null;\n}\n")), assert.type.string);
  }
  function notifyOnPushDetectorsTemplate(detector) {
    assert.argumentTypes(detector, assert.type.string);
    return assert.returnType((("\nif(" + IS_CHANGED_LOCAL + ") {\n  " + detector + ".markAsCheckOnce();\n}\n")), assert.type.string);
  }
  function lastInDirectiveTemplate(notifyOnChanges, notifyOnPush) {
    assert.argumentTypes(notifyOnChanges, assert.type.string, notifyOnPush, assert.type.string);
    return assert.returnType((("\n" + notifyOnChanges + "\n" + notifyOnPush + "\n" + IS_CHANGED_LOCAL + " = false;\n")), assert.type.string);
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      Type = $__m.Type;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      AbstractChangeDetector = $__m.AbstractChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
    }, function($__m) {
      DirectiveIndex = $__m.DirectiveIndex;
      DirectiveRecord = $__m.DirectiveRecord;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
      RECORD_TYPE_SELF = $__m.RECORD_TYPE_SELF;
      RECORD_TYPE_PROPERTY = $__m.RECORD_TYPE_PROPERTY;
      RECORD_TYPE_LOCAL = $__m.RECORD_TYPE_LOCAL;
      RECORD_TYPE_INVOKE_METHOD = $__m.RECORD_TYPE_INVOKE_METHOD;
      RECORD_TYPE_CONST = $__m.RECORD_TYPE_CONST;
      RECORD_TYPE_INVOKE_CLOSURE = $__m.RECORD_TYPE_INVOKE_CLOSURE;
      RECORD_TYPE_PRIMITIVE_OP = $__m.RECORD_TYPE_PRIMITIVE_OP;
      RECORD_TYPE_KEYED_ACCESS = $__m.RECORD_TYPE_KEYED_ACCESS;
      RECORD_TYPE_PIPE = $__m.RECORD_TYPE_PIPE;
      RECORD_TYPE_BINDING_PIPE = $__m.RECORD_TYPE_BINDING_PIPE;
      RECORD_TYPE_INTERPOLATE = $__m.RECORD_TYPE_INTERPOLATE;
    }],
    execute: function() {
      ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
      UTIL = "ChangeDetectionUtil";
      DISPATCHER_ACCESSOR = "this.dispatcher";
      PIPE_REGISTRY_ACCESSOR = "this.pipeRegistry";
      PROTOS_ACCESSOR = "this.protos";
      DIRECTIVES_ACCESSOR = "this.directiveRecords";
      CONTEXT_ACCESSOR = "this.context";
      IS_CHANGED_LOCAL = "isChanged";
      CHANGES_LOCAL = "changes";
      LOCALS_ACCESSOR = "this.locals";
      MODE_ACCESSOR = "this.mode";
      TEMP_LOCAL = "temp";
      CURRENT_PROTO = "currentProto";
      Object.defineProperty(typeTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(constructorTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(pipeOnDestroyTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(hydrateTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.genericType(List, String)], [assert.genericType(List, String)]];
        }});
      Object.defineProperty(detectChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(callOnAllChangesDoneTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(onAllChangesDoneTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(detectChangesBodyTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(pipeCheckTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [], [assert.type.string]];
        }});
      Object.defineProperty(referenceCheckTemplate, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(assignmentTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(localDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(changeDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(fieldDefinitionsTemplate, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(ifChangedGuardTemplate, "parameters", {get: function() {
          return [[List], [assert.type.string]];
        }});
      Object.defineProperty(addToChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(updateDirectiveTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(updateElementTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(notifyOnChangesTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(notifyOnPushDetectorsTemplate, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(lastInDirectiveTemplate, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      ChangeDetectorJITGenerator = $__export("ChangeDetectorJITGenerator", (function() {
        var ChangeDetectorJITGenerator = function ChangeDetectorJITGenerator(typeName, changeDetectionStrategy, records, directiveRecords) {
          assert.argumentTypes(typeName, assert.type.string, changeDetectionStrategy, assert.type.string, records, assert.genericType(List, ProtoRecord), directiveRecords, List);
          this.typeName = typeName;
          this.changeDetectionStrategy = changeDetectionStrategy;
          this.records = records;
          this.directiveRecords = directiveRecords;
          this.localNames = this.getLocalNames(records);
          this.changeNames = this.getChangeNames(this.localNames);
          this.fieldNames = this.getFieldNames(this.localNames);
          this.pipeNames = this.getPipeNames(this.localNames);
        };
        return ($traceurRuntime.createClass)(ChangeDetectorJITGenerator, {
          getLocalNames: function(records) {
            assert.argumentTypes(records, assert.genericType(List, ProtoRecord));
            var index = 0;
            var names = records.map((function(r) {
              var sanitizedName = r.name.replace(new RegExp("\\W", "g"), '');
              return ("" + sanitizedName + index++);
            }));
            return assert.returnType((["context"].concat(names)), assert.genericType(List, assert.type.string));
          },
          getChangeNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("change_" + n);
            }))), assert.genericType(List, assert.type.string));
          },
          getFieldNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("this." + n);
            }))), assert.genericType(List, assert.type.string));
          },
          getPipeNames: function(localNames) {
            return assert.returnType((localNames.map((function(n) {
              return ("this." + n + "_pipe");
            }))), assert.genericType(List, assert.type.string));
          },
          generate: function() {
            var text = typeTemplate(this.typeName, this.genConstructor(), this.genDetectChanges(), this.genCallOnAllChangesDone(), this.genHydrate());
            return assert.returnType((new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'protos', 'directiveRecords', text)(AbstractChangeDetector, ChangeDetectionUtil, this.records, this.directiveRecords)), Function);
          },
          genConstructor: function() {
            return assert.returnType((constructorTemplate(this.typeName, this.genFieldDefinitions())), assert.type.string);
          },
          genHydrate: function() {
            var mode = ChangeDetectionUtil.changeDetectionMode(this.changeDetectionStrategy);
            return assert.returnType((hydrateTemplate(this.typeName, mode, this.genFieldDefinitions(), pipeOnDestroyTemplate(this.getNonNullPipeNames()), this.getDirectiveFieldNames(), this.getDetectorFieldNames())), assert.type.string);
          },
          getDirectiveFieldNames: function() {
            var $__0 = this;
            return assert.returnType((this.directiveRecords.map((function(d) {
              return $__0.getDirective(d.directiveIndex);
            }))), assert.genericType(List, assert.type.string));
          },
          getDetectorFieldNames: function() {
            var $__0 = this;
            return assert.returnType((this.directiveRecords.filter((function(r) {
              return r.isOnPushChangeDetection();
            })).map((function(d) {
              return $__0.getDetector(d.directiveIndex);
            }))), assert.genericType(List, assert.type.string));
          },
          getDirective: function(d) {
            assert.argumentTypes(d, DirectiveIndex);
            return ("this.directive_" + d.name);
          },
          getDetector: function(d) {
            assert.argumentTypes(d, DirectiveIndex);
            return ("this.detector_" + d.name);
          },
          genFieldDefinitions: function() {
            var fields = [];
            fields = fields.concat(this.fieldNames);
            fields = fields.concat(this.getNonNullPipeNames());
            fields = fields.concat(this.getDirectiveFieldNames());
            fields = fields.concat(this.getDetectorFieldNames());
            return fieldDefinitionsTemplate(fields);
          },
          getNonNullPipeNames: function() {
            var $__0 = this;
            var pipes = [];
            this.records.forEach((function(r) {
              if (r.mode === RECORD_TYPE_PIPE || r.mode === RECORD_TYPE_BINDING_PIPE) {
                pipes.push($__0.pipeNames[r.selfIndex]);
              }
            }));
            return assert.returnType((pipes), assert.genericType(List, assert.type.string));
          },
          genDetectChanges: function() {
            var body = this.genDetectChangesBody();
            return assert.returnType((detectChangesTemplate(this.typeName, body)), assert.type.string);
          },
          genCallOnAllChangesDone: function() {
            var notifications = [];
            var dirs = this.directiveRecords;
            for (var i = dirs.length - 1; i >= 0; --i) {
              var dir = dirs[i];
              if (dir.callOnAllChangesDone) {
                var directive = ("this.directive_" + dir.directiveIndex.name);
                notifications.push(onAllChangesDoneTemplate(directive));
              }
            }
            return assert.returnType((callOnAllChangesDoneTemplate(this.typeName, notifications.join(";\n"))), assert.type.string);
          },
          genDetectChangesBody: function() {
            var $__0 = this;
            var rec = this.records.map((function(r) {
              return $__0.genRecord(r);
            })).join("\n");
            return assert.returnType((detectChangesBodyTemplate(this.genLocalDefinitions(), this.genChangeDefinitions(), rec)), assert.type.string);
          },
          genLocalDefinitions: function() {
            return assert.returnType((localDefinitionsTemplate(this.localNames)), assert.type.string);
          },
          genChangeDefinitions: function() {
            return assert.returnType((changeDefinitionsTemplate(this.changeNames)), assert.type.string);
          },
          genRecord: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            if (r.mode === RECORD_TYPE_PIPE || r.mode === RECORD_TYPE_BINDING_PIPE) {
              return assert.returnType((this.genPipeCheck(r)), assert.type.string);
            } else {
              return assert.returnType((this.genReferenceCheck(r)), assert.type.string);
            }
          },
          genPipeCheck: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var context = this.localNames[r.contextIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var newValue = this.localNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var pipe = this.pipeNames[r.selfIndex];
            var cdRef = r.mode === RECORD_TYPE_BINDING_PIPE ? "this.ref" : "null";
            var update = this.genUpdateDirectiveOrElement(r);
            var addToChanges = this.genAddToChanges(r);
            var lastInDirective = this.genLastInDirective(r);
            return assert.returnType((pipeCheckTemplate(r.selfIndex - 1, context, cdRef, pipe, r.name, oldValue, newValue, change, update, addToChanges, lastInDirective)), assert.type.string);
          },
          genReferenceCheck: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var oldValue = this.fieldNames[r.selfIndex];
            var newValue = this.localNames[r.selfIndex];
            var change = this.changeNames[r.selfIndex];
            var assignment = this.genUpdateCurrentValue(r);
            var update = this.genUpdateDirectiveOrElement(r);
            var addToChanges = this.genAddToChanges(r);
            var lastInDirective = this.genLastInDirective(r);
            var check = referenceCheckTemplate(r.selfIndex - 1, assignment, oldValue, newValue, change, update, addToChanges, lastInDirective);
            if (r.isPureFunction()) {
              return assert.returnType((this.ifChangedGuard(r, check)), assert.type.string);
            } else {
              return assert.returnType((check), assert.type.string);
            }
          },
          genUpdateCurrentValue: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var context = this.getContext(r);
            var newValue = this.localNames[r.selfIndex];
            var args = this.genArgs(r);
            switch (r.mode) {
              case RECORD_TYPE_SELF:
                return assert.returnType((assignmentTemplate(newValue, context)), assert.type.string);
              case RECORD_TYPE_CONST:
                return assert.returnType(((newValue + " = " + this.genLiteral(r.funcOrValue))), assert.type.string);
              case RECORD_TYPE_PROPERTY:
                return assert.returnType((assignmentTemplate(newValue, (context + "." + r.name))), assert.type.string);
              case RECORD_TYPE_LOCAL:
                return assert.returnType((assignmentTemplate(newValue, (LOCALS_ACCESSOR + ".get('" + r.name + "')"))), assert.type.string);
              case RECORD_TYPE_INVOKE_METHOD:
                return assert.returnType((assignmentTemplate(newValue, (context + "." + r.name + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_INVOKE_CLOSURE:
                return assert.returnType((assignmentTemplate(newValue, (context + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_PRIMITIVE_OP:
                return assert.returnType((assignmentTemplate(newValue, (UTIL + "." + r.name + "(" + args + ")"))), assert.type.string);
              case RECORD_TYPE_INTERPOLATE:
                return assert.returnType((assignmentTemplate(newValue, this.genInterpolation(r))), assert.type.string);
              case RECORD_TYPE_KEYED_ACCESS:
                var key = this.localNames[r.args[0]];
                return assert.returnType((assignmentTemplate(newValue, (context + "[" + key + "]"))), assert.type.string);
              default:
                throw new BaseException(("Unknown operation " + r.mode));
            }
          },
          getContext: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            if (r.contextIndex == -1) {
              return assert.returnType((this.getDirective(r.directiveIndex)), assert.type.string);
            } else {
              return assert.returnType((this.localNames[r.contextIndex]), assert.type.string);
            }
          },
          ifChangedGuard: function(r, body) {
            var $__0 = this;
            return assert.returnType((ifChangedGuardTemplate(r.args.map((function(a) {
              return $__0.changeNames[a];
            })), body)), assert.type.string);
          },
          genInterpolation: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var res = "";
            for (var i = 0; i < r.args.length; ++i) {
              res += this.genLiteral(r.fixedArgs[i]);
              res += " + ";
              res += this.localNames[r.args[i]];
              res += " + ";
            }
            res += this.genLiteral(r.fixedArgs[r.args.length]);
            return assert.returnType((res), assert.type.string);
          },
          genLiteral: function(value) {
            return assert.returnType((JSON.stringify(value)), assert.type.string);
          },
          genUpdateDirectiveOrElement: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            if (!r.lastInBinding)
              return assert.returnType((""), assert.type.string);
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            var br = r.bindingRecord;
            if (br.isDirective()) {
              var directiveProperty = (this.getDirective(br.directiveRecord.directiveIndex) + "." + br.propertyName);
              return assert.returnType((updateDirectiveTemplate(oldValue, newValue, directiveProperty)), assert.type.string);
            } else {
              return assert.returnType((updateElementTemplate(oldValue, newValue)), assert.type.string);
            }
          },
          genAddToChanges: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var newValue = this.localNames[r.selfIndex];
            var oldValue = this.fieldNames[r.selfIndex];
            return assert.returnType((r.bindingRecord.callOnChange() ? addToChangesTemplate(oldValue, newValue) : ""), assert.type.string);
          },
          genLastInDirective: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var onChanges = this.genNotifyOnChanges(r);
            var onPush = this.genNotifyOnPushDetectors(r);
            return assert.returnType((lastInDirectiveTemplate(onChanges, onPush)), assert.type.string);
          },
          genNotifyOnChanges: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var br = r.bindingRecord;
            if (r.lastInDirective && br.callOnChange()) {
              return assert.returnType((notifyOnChangesTemplate(this.getDirective(br.directiveRecord.directiveIndex))), assert.type.string);
            } else {
              return assert.returnType((""), assert.type.string);
            }
          },
          genNotifyOnPushDetectors: function(r) {
            assert.argumentTypes(r, ProtoRecord);
            var br = r.bindingRecord;
            if (r.lastInDirective && br.isOnPushChangeDetection()) {
              return assert.returnType((notifyOnPushDetectorsTemplate(this.getDetector(br.directiveRecord.directiveIndex))), assert.type.string);
            } else {
              return assert.returnType((""), assert.type.string);
            }
          },
          genArgs: function(r) {
            var $__0 = this;
            return assert.returnType((r.args.map((function(arg) {
              return $__0.localNames[arg];
            })).join(", ")), assert.type.string);
          }
        }, {});
      }()));
      Object.defineProperty(ChangeDetectorJITGenerator, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [assert.genericType(List, ProtoRecord)], [List]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getLocalNames, "parameters", {get: function() {
          return [[assert.genericType(List, ProtoRecord)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getChangeNames, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getFieldNames, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getPipeNames, "parameters", {get: function() {
          return [[assert.genericType(List, assert.type.string)]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getDirective, "parameters", {get: function() {
          return [[DirectiveIndex]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getDetector, "parameters", {get: function() {
          return [[DirectiveIndex]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genRecord, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genPipeCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genReferenceCheck, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genUpdateCurrentValue, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.getContext, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.ifChangedGuard, "parameters", {get: function() {
          return [[ProtoRecord], [assert.type.string]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genInterpolation, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genUpdateDirectiveOrElement, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genAddToChanges, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genLastInDirective, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genNotifyOnChanges, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genNotifyOnPushDetectors, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
      Object.defineProperty(ChangeDetectorJITGenerator.prototype.genArgs, "parameters", {get: function() {
          return [[ProtoRecord]];
        }});
    }
  };
});
//# sourceMappingURL=change_detection_jit_generator.es6.map

//# sourceMappingURL=./change_detection_jit_generator.js.map