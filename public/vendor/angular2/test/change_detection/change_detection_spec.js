System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/change_detection/parser/parser", "angular2/src/change_detection/parser/lexer", "angular2/src/change_detection/parser/locals", "angular2/change_detection", "angular2/src/change_detection/proto_change_detector"], function($__export) {
  "use strict";
  var assert,
      ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      IS_DARTIUM,
      isPresent,
      isBlank,
      isJsObject,
      BaseException,
      FunctionWrapper,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      Parser,
      Lexer,
      Locals,
      ChangeDispatcher,
      DynamicChangeDetector,
      ChangeDetectionError,
      BindingRecord,
      DirectiveRecord,
      DirectiveIndex,
      PipeRegistry,
      Pipe,
      NO_CHANGE,
      CHECK_ALWAYS,
      CHECK_ONCE,
      CHECKED,
      DETACHED,
      ON_PUSH,
      DEFAULT,
      JitProtoChangeDetector,
      DynamicProtoChangeDetector,
      CountingPipe,
      OncePipe,
      IdentityPipe,
      FakePipeRegistry,
      TestDirective,
      Person,
      Address,
      Uninitialized,
      TestData,
      FakeDirectives,
      TestDispatcher;
  function main() {
    describe("change detection", (function() {
      StringMapWrapper.forEach({
        "dynamic": (function() {
          var registry = arguments[0] !== (void 0) ? arguments[0] : null;
          var strategy = arguments[1] !== (void 0) ? arguments[1] : null;
          return new DynamicProtoChangeDetector(registry, strategy);
        }),
        "JIT": (function() {
          var registry = arguments[0] !== (void 0) ? arguments[0] : null;
          var strategy = arguments[1] !== (void 0) ? arguments[1] : null;
          return new JitProtoChangeDetector(registry, strategy);
        })
      }, (function(createProtoChangeDetector, name) {
        if (name == "JIT" && IS_DARTIUM)
          return ;
        var parser = new Parser(new Lexer());
        function ast(exp) {
          var location = arguments[1] !== (void 0) ? arguments[1] : 'location';
          assert.argumentTypes(exp, assert.type.string, location, assert.type.string);
          return parser.parseBinding(exp, location);
        }
        Object.defineProperty(ast, "parameters", {get: function() {
            return [[assert.type.string], [assert.type.string]];
          }});
        function dirs(directives) {
          assert.argumentTypes(directives, List);
          return new FakeDirectives(directives, []);
        }
        Object.defineProperty(dirs, "parameters", {get: function() {
            return [[List]];
          }});
        function convertLocalsToVariableBindings(locals) {
          var variableBindings = [];
          var loc = locals;
          while (isPresent(loc)) {
            MapWrapper.forEach(loc.current, (function(v, k) {
              return ListWrapper.push(variableBindings, k);
            }));
            loc = loc.parent;
          }
          return variableBindings;
        }
        function createChangeDetector(propName, exp) {
          var context = arguments[2] !== (void 0) ? arguments[2] : null;
          var locals = arguments[3] !== (void 0) ? arguments[3] : null;
          var registry = arguments[4] !== (void 0) ? arguments[4] : null;
          assert.argumentTypes(propName, assert.type.string, exp, assert.type.string, context, assert.type.any, locals, assert.type.any, registry, assert.type.any);
          var pcd = createProtoChangeDetector(registry);
          var dispatcher = new TestDispatcher();
          var variableBindings = convertLocalsToVariableBindings(locals);
          var records = [BindingRecord.createForElement(ast(exp), 0, propName)];
          var cd = pcd.instantiate(dispatcher, records, variableBindings, []);
          cd.hydrate(context, locals, null);
          return {
            "changeDetector": cd,
            "dispatcher": dispatcher
          };
        }
        Object.defineProperty(createChangeDetector, "parameters", {get: function() {
            return [[assert.type.string], [assert.type.string], [], [], []];
          }});
        function executeWatch(memo, exp) {
          var context = arguments[2] !== (void 0) ? arguments[2] : null;
          var locals = arguments[3] !== (void 0) ? arguments[3] : null;
          assert.argumentTypes(memo, assert.type.string, exp, assert.type.string, context, assert.type.any, locals, assert.type.any);
          var res = createChangeDetector(memo, exp, context, locals);
          res["changeDetector"].detectChanges();
          return res["dispatcher"].log;
        }
        Object.defineProperty(executeWatch, "parameters", {get: function() {
            return [[assert.type.string], [assert.type.string], [], []];
          }});
        function instantiate(protoChangeDetector, dispatcher, bindings) {
          var directiveRecords = arguments[3] !== (void 0) ? arguments[3] : null;
          if (isBlank(directiveRecords))
            directiveRecords = [];
          return protoChangeDetector.instantiate(dispatcher, bindings, null, directiveRecords);
        }
        describe((name + " change detection"), (function() {
          var dispatcher;
          beforeEach((function() {
            dispatcher = new TestDispatcher();
          }));
          it('should do simple watching', (function() {
            var person = new Person("misko");
            var c = createChangeDetector('name', 'name', person);
            var cd = c["changeDetector"];
            var dispatcher = c["dispatcher"];
            cd.detectChanges();
            expect(dispatcher.log).toEqual(['name=misko']);
            dispatcher.clear();
            cd.detectChanges();
            expect(dispatcher.log).toEqual([]);
            dispatcher.clear();
            person.name = "Misko";
            cd.detectChanges();
            expect(dispatcher.log).toEqual(['name=Misko']);
          }));
          it('should report all changes on the first run including uninitialized values', (function() {
            expect(executeWatch('value', 'value', new Uninitialized())).toEqual(['value=null']);
          }));
          it('should report all changes on the first run including null values', (function() {
            var td = new TestData(null);
            expect(executeWatch('a', 'a', td)).toEqual(['a=null']);
          }));
          it("should support literals", (function() {
            expect(executeWatch('const', '10')).toEqual(['const=10']);
            expect(executeWatch('const', '"str"')).toEqual(['const=str']);
            expect(executeWatch('const', '"a\n\nb"')).toEqual(['const=a\n\nb']);
          }));
          it('simple chained property access', (function() {
            var address = new Address('Grenoble');
            var person = new Person('Victor', address);
            expect(executeWatch('address.city', 'address.city', person)).toEqual(['address.city=Grenoble']);
          }));
          it("should support method calls", (function() {
            var person = new Person('Victor');
            expect(executeWatch('m', 'sayHi("Jim")', person)).toEqual(['m=Hi, Jim']);
          }));
          it("should support function calls", (function() {
            var td = new TestData((function() {
              return (function(a) {
                return a;
              });
            }));
            expect(executeWatch('value', 'a()(99)', td)).toEqual(['value=99']);
          }));
          it("should support chained method calls", (function() {
            var person = new Person('Victor');
            var td = new TestData(person);
            expect(executeWatch('m', 'a.sayHi("Jim")', td)).toEqual(['m=Hi, Jim']);
          }));
          it("should support literal array", (function() {
            var c = createChangeDetector('array', '[1,2]');
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues).toEqual([[1, 2]]);
            c = createChangeDetector('array', '[1,a]', new TestData(2));
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues).toEqual([[1, 2]]);
          }));
          it("should support literal maps", (function() {
            var c = createChangeDetector('map', '{z:1}');
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues[0]['z']).toEqual(1);
            c = createChangeDetector('map', '{z:a}', new TestData(1));
            c["changeDetector"].detectChanges();
            expect(c["dispatcher"].loggedValues[0]['z']).toEqual(1);
          }));
          it("should support binary operations", (function() {
            expect(executeWatch('exp', '10 + 2')).toEqual(['exp=12']);
            expect(executeWatch('exp', '10 - 2')).toEqual(['exp=8']);
            expect(executeWatch('exp', '10 * 2')).toEqual(['exp=20']);
            expect(executeWatch('exp', '10 / 2')).toEqual([("exp=" + 5.0)]);
            expect(executeWatch('exp', '11 % 2')).toEqual(['exp=1']);
            expect(executeWatch('exp', '1 == 1')).toEqual(['exp=true']);
            expect(executeWatch('exp', '1 != 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '1 < 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 < 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '2 > 1')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 < 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '1 <= 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 <= 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 <= 1')).toEqual(['exp=false']);
            expect(executeWatch('exp', '2 >= 1')).toEqual(['exp=true']);
            expect(executeWatch('exp', '2 >= 2')).toEqual(['exp=true']);
            expect(executeWatch('exp', '1 >= 2')).toEqual(['exp=false']);
            expect(executeWatch('exp', 'true && true')).toEqual(['exp=true']);
            expect(executeWatch('exp', 'true && false')).toEqual(['exp=false']);
            expect(executeWatch('exp', 'true || false')).toEqual(['exp=true']);
            expect(executeWatch('exp', 'false || false')).toEqual(['exp=false']);
          }));
          it("should support negate", (function() {
            expect(executeWatch('exp', '!true')).toEqual(['exp=false']);
            expect(executeWatch('exp', '!!true')).toEqual(['exp=true']);
          }));
          it("should support conditionals", (function() {
            expect(executeWatch('m', '1 < 2 ? 1 : 2')).toEqual(['m=1']);
            expect(executeWatch('m', '1 > 2 ? 1 : 2')).toEqual(['m=2']);
          }));
          describe("keyed access", (function() {
            it("should support accessing a list item", (function() {
              expect(executeWatch('array[0]', '["foo", "bar"][0]')).toEqual(['array[0]=foo']);
            }));
            it("should support accessing a map item", (function() {
              expect(executeWatch('map[foo]', '{"foo": "bar"}["foo"]')).toEqual(['map[foo]=bar']);
            }));
          }));
          it("should support interpolation", (function() {
            var pcd = createProtoChangeDetector();
            var ast = parser.parseInterpolation("B{{a}}A", "location");
            var cd = instantiate(pcd, dispatcher, [BindingRecord.createForElement(ast, 0, "memo")]);
            cd.hydrate(new TestData("value"), null, null);
            cd.detectChanges();
            expect(dispatcher.log).toEqual(["memo=BvalueA"]);
          }));
          describe("change notification", (function() {
            describe("simple checks", (function() {
              it("should pass a change record to the dispatcher", (function() {
                var person = new Person('bob');
                var c = createChangeDetector('name', 'name', person);
                var cd = c["changeDetector"];
                var dispatcher = c["dispatcher"];
                cd.detectChanges();
                expect(dispatcher.loggedValues).toEqual(['bob']);
              }));
            }));
            describe("pipes", (function() {
              it("should pass a change record to the dispatcher", (function() {
                var registry = new FakePipeRegistry('pipe', (function() {
                  return new CountingPipe();
                }));
                var person = new Person('bob');
                var c = createChangeDetector('name', 'name | pipe', person, null, registry);
                var cd = c["changeDetector"];
                var dispatcher = c["dispatcher"];
                cd.detectChanges();
                expect(dispatcher.loggedValues).toEqual(['bob state:0']);
              }));
            }));
            describe("updating directives", (function() {
              var dirRecord1 = new DirectiveRecord(new DirectiveIndex(0, 0), true, true, DEFAULT);
              var dirRecord2 = new DirectiveRecord(new DirectiveIndex(0, 1), true, true, DEFAULT);
              var dirRecordNoCallbacks = new DirectiveRecord(new DirectiveIndex(0, 0), false, false, DEFAULT);
              function updateA(exp, dirRecord) {
                return BindingRecord.createForDirective(ast(exp), "a", (function(o, v) {
                  return o.a = v;
                }), dirRecord);
              }
              Object.defineProperty(updateA, "parameters", {get: function() {
                  return [[assert.type.string], []];
                }});
              function updateB(exp, dirRecord) {
                return BindingRecord.createForDirective(ast(exp), "b", (function(o, v) {
                  return o.b = v;
                }), dirRecord);
              }
              Object.defineProperty(updateB, "parameters", {get: function() {
                  return [[assert.type.string], []];
                }});
              var directive1;
              var directive2;
              beforeEach((function() {
                directive1 = new TestDirective();
                directive2 = new TestDirective();
              }));
              it("should happen directly, without invoking the dispatcher", (function() {
                var pcd = createProtoChangeDetector();
                var cd = instantiate(pcd, dispatcher, [updateA("42", dirRecord1)], [dirRecord1]);
                cd.hydrate(null, null, dirs([directive1]));
                cd.detectChanges();
                expect(dispatcher.loggedValues).toEqual([]);
                expect(directive1.a).toEqual(42);
              }));
              describe("onChange", (function() {
                it("should notify the directive when a group of records changes", (function() {
                  var pcd = createProtoChangeDetector();
                  var cd = instantiate(pcd, dispatcher, [updateA("1", dirRecord1), updateB("2", dirRecord1), updateA("3", dirRecord2)], [dirRecord1, dirRecord2]);
                  cd.hydrate(null, null, dirs([directive1, directive2]));
                  cd.detectChanges();
                  expect(directive1.changes).toEqual({
                    'a': 1,
                    'b': 2
                  });
                  expect(directive2.changes).toEqual({'a': 3});
                }));
                it("should not call onChange when callOnChange is false", (function() {
                  var pcd = createProtoChangeDetector();
                  var cd = instantiate(pcd, dispatcher, [updateA("1", dirRecordNoCallbacks)], [dirRecordNoCallbacks]);
                  cd.hydrate(null, null, dirs([directive1]));
                  cd.detectChanges();
                  expect(directive1.changes).toEqual(null);
                }));
              }));
              describe("onAllChangesDone", (function() {
                it("should be called after processing all the children", (function() {
                  var pcd = createProtoChangeDetector();
                  var cd = instantiate(pcd, dispatcher, [], [dirRecord1, dirRecord2]);
                  cd.hydrate(null, null, dirs([directive1, directive2]));
                  cd.detectChanges();
                  expect(directive1.onChangesDoneCalled).toBe(true);
                  expect(directive2.onChangesDoneCalled).toBe(true);
                }));
                it("should not be called when onAllChangesDone is false", (function() {
                  var pcd = createProtoChangeDetector();
                  var cd = instantiate(pcd, dispatcher, [updateA("1", dirRecordNoCallbacks)], [dirRecordNoCallbacks]);
                  cd.hydrate(null, null, dirs([directive1]));
                  cd.detectChanges();
                  expect(directive1.onChangesDoneCalled).toEqual(false);
                }));
                it("should be called in reverse order so the child is always notified before the parent", (function() {
                  var pcd = createProtoChangeDetector();
                  var cd = instantiate(pcd, dispatcher, [], [dirRecord1, dirRecord2]);
                  var onChangesDoneCalls = [];
                  var td1;
                  td1 = new TestDirective((function() {
                    return ListWrapper.push(onChangesDoneCalls, td1);
                  }));
                  var td2;
                  td2 = new TestDirective((function() {
                    return ListWrapper.push(onChangesDoneCalls, td2);
                  }));
                  cd.hydrate(null, null, dirs([td1, td2]));
                  cd.detectChanges();
                  expect(onChangesDoneCalls).toEqual([td2, td1]);
                }));
                it("should be called before processing shadow dom children", (function() {
                  var pcd = createProtoChangeDetector();
                  var shadowDomChildPCD = createProtoChangeDetector();
                  var parent = pcd.instantiate(dispatcher, [], null, [dirRecord1]);
                  var child = shadowDomChildPCD.instantiate(dispatcher, [updateA("1", dirRecord1)], null, [dirRecord1]);
                  parent.addShadowDomChild(child);
                  var directiveInShadowDom = new TestDirective();
                  var parentDirective = new TestDirective((function() {
                    expect(directiveInShadowDom.a).toBe(null);
                  }));
                  parent.hydrate(null, null, dirs([parentDirective]));
                  child.hydrate(null, null, dirs([directiveInShadowDom]));
                  parent.detectChanges();
                }));
              }));
            }));
          }));
          describe("reading directives", (function() {
            var index = new DirectiveIndex(0, 0);
            var dirRecord = new DirectiveRecord(index, false, false, DEFAULT);
            it("should read directive properties", (function() {
              var directive = new TestDirective();
              directive.a = "aaa";
              var pcd = createProtoChangeDetector();
              var cd = instantiate(pcd, dispatcher, [BindingRecord.createForHostProperty(index, ast("a"), "prop")], [dirRecord]);
              cd.hydrate(null, null, dirs([directive]));
              cd.detectChanges();
              expect(dispatcher.loggedValues).toEqual(['aaa']);
            }));
          }));
          describe("enforce no new changes", (function() {
            it("should throw when a record gets changed after it has been checked", (function() {
              var pcd = createProtoChangeDetector();
              var dispatcher = new TestDispatcher();
              var cd = instantiate(pcd, dispatcher, [BindingRecord.createForElement(ast("a"), 0, "a")]);
              cd.hydrate(new TestData('value'), null, null);
              expect((function() {
                cd.checkNoChanges();
              })).toThrowError(new RegExp("Expression 'a in location' has changed after it was checked"));
            }));
          }));
          describe("error handling", (function() {
            xit("should wrap exceptions into ChangeDetectionError", (function() {
              var pcd = createProtoChangeDetector();
              var cd = pcd.instantiate(new TestDispatcher(), [BindingRecord.createForElement(ast("invalidProp"), 0, "a")], null, []);
              cd.hydrate(null, null);
              try {
                cd.detectChanges();
                throw new BaseException("fail");
              } catch (e) {
                expect(e).toBeAnInstanceOf(ChangeDetectionError);
                expect(e.location).toEqual("invalidProp in someComponent");
              }
            }));
          }));
          describe("Locals", (function() {
            it('should read a value from locals', (function() {
              var locals = new Locals(null, MapWrapper.createFromPairs([["key", "value"]]));
              expect(executeWatch('key', 'key', null, locals)).toEqual(['key=value']);
            }));
            it('should invoke a function from local', (function() {
              var locals = new Locals(null, MapWrapper.createFromPairs([["key", (function() {
                return "value";
              })]]));
              expect(executeWatch('key', 'key()', null, locals)).toEqual(['key=value']);
            }));
            it('should handle nested locals', (function() {
              var nested = new Locals(null, MapWrapper.createFromPairs([["key", "value"]]));
              var locals = new Locals(nested, MapWrapper.create());
              expect(executeWatch('key', 'key', null, locals)).toEqual(['key=value']);
            }));
            it("should fall back to a regular field read when the locals map" + "does not have the requested field", (function() {
              var locals = new Locals(null, MapWrapper.createFromPairs([["key", "value"]]));
              expect(executeWatch('name', 'name', new Person("Jim"), locals)).toEqual(['name=Jim']);
            }));
          }));
          describe("handle children", (function() {
            var parent,
                child;
            beforeEach((function() {
              var protoParent = createProtoChangeDetector();
              parent = instantiate(protoParent, null, []);
              var protoChild = createProtoChangeDetector();
              child = instantiate(protoChild, null, []);
            }));
            it("should add light dom children", (function() {
              parent.addChild(child);
              expect(parent.lightDomChildren.length).toEqual(1);
              expect(parent.lightDomChildren[0]).toBe(child);
            }));
            it("should add shadow dom children", (function() {
              parent.addShadowDomChild(child);
              expect(parent.shadowDomChildren.length).toEqual(1);
              expect(parent.shadowDomChildren[0]).toBe(child);
            }));
            it("should remove light dom children", (function() {
              parent.addChild(child);
              parent.removeChild(child);
              expect(parent.lightDomChildren).toEqual([]);
            }));
            it("should remove shadow dom children", (function() {
              parent.addShadowDomChild(child);
              parent.removeShadowDomChild(child);
              expect(parent.shadowDomChildren.length).toEqual(0);
            }));
          }));
        }));
        describe("mode", (function() {
          it("should set the mode to CHECK_ALWAYS when the default change detection is used", (function() {
            var proto = createProtoChangeDetector(null, DEFAULT);
            var cd = proto.instantiate(null, [], [], []);
            expect(cd.mode).toEqual(null);
            cd.hydrate(null, null, null);
            expect(cd.mode).toEqual(CHECK_ALWAYS);
          }));
          it("should set the mode to CHECK_ONCE when the push change detection is used", (function() {
            var proto = createProtoChangeDetector(null, ON_PUSH);
            var cd = proto.instantiate(null, [], [], []);
            cd.hydrate(null, null, null);
            expect(cd.mode).toEqual(CHECK_ONCE);
          }));
          it("should not check a detached change detector", (function() {
            var c = createChangeDetector('name', 'a', new TestData("value"));
            var cd = c["changeDetector"];
            var dispatcher = c["dispatcher"];
            cd.mode = DETACHED;
            cd.detectChanges();
            expect(dispatcher.log).toEqual([]);
          }));
          it("should not check a checked change detector", (function() {
            var c = createChangeDetector('name', 'a', new TestData("value"));
            var cd = c["changeDetector"];
            var dispatcher = c["dispatcher"];
            cd.mode = CHECKED;
            cd.detectChanges();
            expect(dispatcher.log).toEqual([]);
          }));
          it("should change CHECK_ONCE to CHECKED", (function() {
            var cd = instantiate(createProtoChangeDetector(), null, []);
            cd.mode = CHECK_ONCE;
            cd.detectChanges();
            expect(cd.mode).toEqual(CHECKED);
          }));
          it("should not change the CHECK_ALWAYS", (function() {
            var cd = instantiate(createProtoChangeDetector(), null, []);
            cd.mode = CHECK_ALWAYS;
            cd.detectChanges();
            expect(cd.mode).toEqual(CHECK_ALWAYS);
          }));
          describe("marking ON_PUSH detectors as CHECK_ONCE after an update", (function() {
            var checkedDetector;
            var dirRecordWithOnPush;
            var updateDirWithOnPushRecord;
            var directives;
            beforeEach((function() {
              var proto = createProtoChangeDetector(null, ON_PUSH);
              checkedDetector = instantiate(proto, null, [], []);
              checkedDetector.hydrate(null, null, null);
              checkedDetector.mode = CHECKED;
              dirRecordWithOnPush = new DirectiveRecord(new DirectiveIndex(0, 0), false, false, ON_PUSH);
              updateDirWithOnPushRecord = BindingRecord.createForDirective(ast("42"), "a", (function(o, v) {
                return o.a = v;
              }), dirRecordWithOnPush);
              var targetDirective = new TestData(null);
              directives = new FakeDirectives([targetDirective], [checkedDetector]);
            }));
            it("should set the mode to CHECK_ONCE when a binding is updated", (function() {
              var proto = createProtoChangeDetector(null);
              var cd = instantiate(proto, null, [updateDirWithOnPushRecord], [dirRecordWithOnPush]);
              cd.hydrate(null, null, directives);
              expect(checkedDetector.mode).toEqual(CHECKED);
              cd.detectChanges();
              expect(checkedDetector.mode).toEqual(CHECK_ONCE);
            }));
          }));
        }));
        describe("markPathToRootAsCheckOnce", (function() {
          function changeDetector(mode, parent) {
            var cd = instantiate(createProtoChangeDetector(), null, []);
            cd.mode = mode;
            if (isPresent(parent))
              parent.addChild(cd);
            return cd;
          }
          it("should mark all checked detectors as CHECK_ONCE " + "until reaching a detached one", (function() {
            var root = changeDetector(CHECK_ALWAYS, null);
            var disabled = changeDetector(DETACHED, root);
            var parent = changeDetector(CHECKED, disabled);
            var checkAlwaysChild = changeDetector(CHECK_ALWAYS, parent);
            var checkOnceChild = changeDetector(CHECK_ONCE, checkAlwaysChild);
            var checkedChild = changeDetector(CHECKED, checkOnceChild);
            checkedChild.markPathToRootAsCheckOnce();
            expect(root.mode).toEqual(CHECK_ALWAYS);
            expect(disabled.mode).toEqual(DETACHED);
            expect(parent.mode).toEqual(CHECK_ONCE);
            expect(checkAlwaysChild.mode).toEqual(CHECK_ALWAYS);
            expect(checkOnceChild.mode).toEqual(CHECK_ONCE);
            expect(checkedChild.mode).toEqual(CHECK_ONCE);
          }));
        }));
        describe("hydration", (function() {
          it("should be able to rehydrate a change detector", (function() {
            var c = createChangeDetector("memo", "name");
            var cd = c["changeDetector"];
            cd.hydrate("some context", null, null);
            expect(cd.hydrated()).toBe(true);
            cd.dehydrate();
            expect(cd.hydrated()).toBe(false);
            cd.hydrate("other context", null, null);
            expect(cd.hydrated()).toBe(true);
          }));
          it("should destroy all active pipes during dehyration", (function() {
            var pipe = new OncePipe();
            var registry = new FakePipeRegistry('pipe', (function() {
              return pipe;
            }));
            var c = createChangeDetector("memo", "name | pipe", new Person('bob'), null, registry);
            var cd = c["changeDetector"];
            cd.detectChanges();
            cd.dehydrate();
            expect(pipe.destroyCalled).toBe(true);
          }));
        }));
        describe("pipes", (function() {
          it("should support pipes", (function() {
            var registry = new FakePipeRegistry('pipe', (function() {
              return new CountingPipe();
            }));
            var ctx = new Person("Megatron");
            var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
            var cd = c["changeDetector"];
            var dispatcher = c["dispatcher"];
            cd.detectChanges();
            expect(dispatcher.log).toEqual(['memo=Megatron state:0']);
            dispatcher.clear();
            cd.detectChanges();
            expect(dispatcher.log).toEqual(['memo=Megatron state:1']);
          }));
          it("should lookup pipes in the registry when the context is not supported", (function() {
            var registry = new FakePipeRegistry('pipe', (function() {
              return new OncePipe();
            }));
            var ctx = new Person("Megatron");
            var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
            var cd = c["changeDetector"];
            cd.detectChanges();
            expect(registry.numberOfLookups).toEqual(1);
            ctx.name = "Optimus Prime";
            cd.detectChanges();
            expect(registry.numberOfLookups).toEqual(2);
          }));
          it("should invoke onDestroy on a pipe before switching to another one", (function() {
            var pipe = new OncePipe();
            var registry = new FakePipeRegistry('pipe', (function() {
              return pipe;
            }));
            var ctx = new Person("Megatron");
            var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
            var cd = c["changeDetector"];
            cd.detectChanges();
            ctx.name = "Optimus Prime";
            cd.detectChanges();
            expect(pipe.destroyCalled).toEqual(true);
          }));
          it("should inject the ChangeDetectorRef " + "of the encompassing component into a pipe", (function() {
            var registry = new FakePipeRegistry('pipe', (function() {
              return new IdentityPipe();
            }));
            var c = createChangeDetector("memo", "name | pipe", new Person('bob'), null, registry);
            var cd = c["changeDetector"];
            cd.detectChanges();
            expect(registry.cdRef).toBe(cd.ref);
          }));
        }));
        it("should do nothing when returns NO_CHANGE", (function() {
          var registry = new FakePipeRegistry('pipe', (function() {
            return new IdentityPipe();
          }));
          var ctx = new Person("Megatron");
          var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
          var cd = c["changeDetector"];
          var dispatcher = c["dispatcher"];
          cd.detectChanges();
          cd.detectChanges();
          expect(dispatcher.log).toEqual(['memo=Megatron']);
          ctx.name = "Optimus Prime";
          dispatcher.clear();
          cd.detectChanges();
          expect(dispatcher.log).toEqual(['memo=Optimus Prime']);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      IS_DARTIUM = $__m.IS_DARTIUM;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      isJsObject = $__m.isJsObject;
      BaseException = $__m.BaseException;
      FunctionWrapper = $__m.FunctionWrapper;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      Lexer = $__m.Lexer;
    }, function($__m) {
      Locals = $__m.Locals;
    }, function($__m) {
      ChangeDispatcher = $__m.ChangeDispatcher;
      DynamicChangeDetector = $__m.DynamicChangeDetector;
      ChangeDetectionError = $__m.ChangeDetectionError;
      BindingRecord = $__m.BindingRecord;
      DirectiveRecord = $__m.DirectiveRecord;
      DirectiveIndex = $__m.DirectiveIndex;
      PipeRegistry = $__m.PipeRegistry;
      Pipe = $__m.Pipe;
      NO_CHANGE = $__m.NO_CHANGE;
      CHECK_ALWAYS = $__m.CHECK_ALWAYS;
      CHECK_ONCE = $__m.CHECK_ONCE;
      CHECKED = $__m.CHECKED;
      DETACHED = $__m.DETACHED;
      ON_PUSH = $__m.ON_PUSH;
      DEFAULT = $__m.DEFAULT;
    }, function($__m) {
      JitProtoChangeDetector = $__m.JitProtoChangeDetector;
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
    }],
    execute: function() {
      CountingPipe = (function($__super) {
        var CountingPipe = function CountingPipe() {
          $traceurRuntime.superConstructor(CountingPipe).call(this);
          this.state = 0;
        };
        return ($traceurRuntime.createClass)(CountingPipe, {
          supports: function(newValue) {
            return true;
          },
          transform: function(value) {
            return (value + " state:" + this.state++);
          }
        }, {}, $__super);
      }(Pipe));
      OncePipe = (function($__super) {
        var OncePipe = function OncePipe() {
          $traceurRuntime.superConstructor(OncePipe).call(this);
          this.called = false;
          this.destroyCalled = false;
        };
        return ($traceurRuntime.createClass)(OncePipe, {
          supports: function(newValue) {
            return !this.called;
          },
          onDestroy: function() {
            this.destroyCalled = true;
          },
          transform: function(value) {
            this.called = true;
            return value;
          }
        }, {}, $__super);
      }(Pipe));
      IdentityPipe = (function($__super) {
        var IdentityPipe = function IdentityPipe() {
          $traceurRuntime.superConstructor(IdentityPipe).apply(this, arguments);
          ;
        };
        return ($traceurRuntime.createClass)(IdentityPipe, {
          supports: function(newValue) {
            return true;
          },
          transform: function(value) {
            if (this.state === value) {
              return NO_CHANGE;
            } else {
              this.state = value;
              return value;
            }
          }
        }, {}, $__super);
      }(Pipe));
      FakePipeRegistry = (function($__super) {
        var FakePipeRegistry = function FakePipeRegistry(pipeType, factory) {
          $traceurRuntime.superConstructor(FakePipeRegistry).call(this, {});
          this.pipeType = pipeType;
          this.factory = factory;
          this.numberOfLookups = 0;
        };
        return ($traceurRuntime.createClass)(FakePipeRegistry, {get: function(type, obj, cdRef) {
            assert.argumentTypes(type, assert.type.string, obj, assert.type.any, cdRef, assert.type.any);
            if (type != this.pipeType)
              return null;
            this.numberOfLookups++;
            this.cdRef = cdRef;
            return this.factory();
          }}, {}, $__super);
      }(PipeRegistry));
      Object.defineProperty(FakePipeRegistry.prototype.get, "parameters", {get: function() {
          return [[assert.type.string], [], []];
        }});
      TestDirective = (function() {
        var TestDirective = function TestDirective() {
          var onChangesDoneSpy = arguments[0] !== (void 0) ? arguments[0] : null;
          this.onChangesDoneCalled = false;
          this.onChangesDoneSpy = onChangesDoneSpy;
          this.a = null;
          this.b = null;
          this.changes = null;
        };
        return ($traceurRuntime.createClass)(TestDirective, {
          onChange: function(changes) {
            var r = {};
            StringMapWrapper.forEach(changes, (function(c, key) {
              return r[key] = c.currentValue;
            }));
            this.changes = r;
          },
          onAllChangesDone: function() {
            this.onChangesDoneCalled = true;
            if (isPresent(this.onChangesDoneSpy)) {
              this.onChangesDoneSpy();
            }
          }
        }, {});
      }());
      Person = (function() {
        var Person = function Person(name) {
          var address = arguments[1] !== (void 0) ? arguments[1] : null;
          assert.argumentTypes(name, assert.type.string, address, Address);
          this.name = name;
          this.address = address;
        };
        return ($traceurRuntime.createClass)(Person, {
          sayHi: function(m) {
            return ("Hi, " + m);
          },
          toString: function() {
            var address = this.address == null ? '' : ' address=' + this.address.toString();
            return assert.returnType(('name=' + this.name + address), assert.type.string);
          }
        }, {});
      }());
      Object.defineProperty(Person, "parameters", {get: function() {
          return [[assert.type.string], [Address]];
        }});
      Address = (function() {
        var Address = function Address(city) {
          assert.argumentTypes(city, assert.type.string);
          this.city = city;
        };
        return ($traceurRuntime.createClass)(Address, {toString: function() {
            return assert.returnType((this.city), assert.type.string);
          }}, {});
      }());
      Object.defineProperty(Address, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Uninitialized = (function() {
        var Uninitialized = function Uninitialized() {
          ;
        };
        return ($traceurRuntime.createClass)(Uninitialized, {}, {});
      }());
      TestData = (function() {
        var TestData = function TestData(a) {
          this.a = a;
        };
        return ($traceurRuntime.createClass)(TestData, {}, {});
      }());
      FakeDirectives = (function() {
        var FakeDirectives = function FakeDirectives(directives, detectors) {
          assert.argumentTypes(directives, List, detectors, List);
          this.directives = directives;
          this.detectors = detectors;
        };
        return ($traceurRuntime.createClass)(FakeDirectives, {
          getDirectiveFor: function(di) {
            assert.argumentTypes(di, DirectiveIndex);
            return this.directives[di.directiveIndex];
          },
          getDetectorFor: function(di) {
            assert.argumentTypes(di, DirectiveIndex);
            return this.detectors[di.directiveIndex];
          }
        }, {});
      }());
      Object.defineProperty(FakeDirectives, "parameters", {get: function() {
          return [[List], [List]];
        }});
      Object.defineProperty(FakeDirectives.prototype.getDirectiveFor, "parameters", {get: function() {
          return [[DirectiveIndex]];
        }});
      Object.defineProperty(FakeDirectives.prototype.getDetectorFor, "parameters", {get: function() {
          return [[DirectiveIndex]];
        }});
      TestDispatcher = (function($__super) {
        var TestDispatcher = function TestDispatcher() {
          $traceurRuntime.superConstructor(TestDispatcher).call(this);
          this.clear();
        };
        return ($traceurRuntime.createClass)(TestDispatcher, {
          clear: function() {
            this.log = ListWrapper.create();
            this.loggedValues = ListWrapper.create();
          },
          notifyOnBinding: function(binding, value) {
            ListWrapper.push(this.log, (binding.propertyName + "=" + this._asString(value)));
            ListWrapper.push(this.loggedValues, value);
          },
          _asString: function(value) {
            return (isBlank(value) ? 'null' : value.toString());
          }
        }, {}, $__super);
      }(ChangeDispatcher));
    }
  };
});
//# sourceMappingURL=change_detection_spec.es6.map

//# sourceMappingURL=./change_detection_spec.js.map