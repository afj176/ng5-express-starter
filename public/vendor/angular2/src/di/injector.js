System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection", "./binding", "./exceptions", "angular2/src/facade/lang", "angular2/src/facade/async", "./key"], function($__export) {
  "use strict";
  var assert,
      Map,
      List,
      MapWrapper,
      ListWrapper,
      ResolvedBinding,
      Binding,
      BindingBuilder,
      bind,
      AbstractBindingError,
      NoBindingError,
      AsyncBindingError,
      CyclicDependencyError,
      InstantiationError,
      InvalidBindingError,
      FunctionWrapper,
      Type,
      isPresent,
      isBlank,
      Promise,
      PromiseWrapper,
      Key,
      _constructing,
      _notFound,
      _Waiting,
      Injector,
      _SyncInjectorStrategy,
      _AsyncInjectorStrategy;
  function _isWaiting(obj) {
    return assert.returnType((obj instanceof _Waiting), assert.type.boolean);
  }
  function _resolveBindings(bindings) {
    assert.argumentTypes(bindings, List);
    var resolvedList = ListWrapper.createFixedSize(bindings.length);
    for (var i = 0; i < bindings.length; i++) {
      var unresolved = bindings[i];
      var resolved = void 0;
      if (unresolved instanceof ResolvedBinding) {
        resolved = unresolved;
      } else if (unresolved instanceof Type) {
        resolved = bind(unresolved).toClass(unresolved).resolve();
      } else if (unresolved instanceof Binding) {
        resolved = unresolved.resolve();
      } else if (unresolved instanceof List) {
        resolved = _resolveBindings(unresolved);
      } else if (unresolved instanceof BindingBuilder) {
        throw new InvalidBindingError(unresolved.token);
      } else {
        throw new InvalidBindingError(unresolved);
      }
      resolvedList[i] = resolved;
    }
    return assert.returnType((resolvedList), List);
  }
  function _createListOfBindings(flattenedBindings) {
    var bindings = ListWrapper.createFixedSize(Key.numberOfKeys + 1);
    MapWrapper.forEach(flattenedBindings, (function(v, keyId) {
      return bindings[keyId] = v;
    }));
    return assert.returnType((bindings), List);
  }
  function _flattenBindings(bindings, res) {
    assert.argumentTypes(bindings, List, res, Map);
    ListWrapper.forEach(bindings, function(b) {
      if (b instanceof ResolvedBinding) {
        MapWrapper.set(res, b.key.id, b);
      } else if (b instanceof List) {
        _flattenBindings(b, res);
      }
    });
    return assert.returnType((res), Map);
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Map = $__m.Map;
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      ResolvedBinding = $__m.ResolvedBinding;
      Binding = $__m.Binding;
      BindingBuilder = $__m.BindingBuilder;
      bind = $__m.bind;
    }, function($__m) {
      AbstractBindingError = $__m.AbstractBindingError;
      NoBindingError = $__m.NoBindingError;
      AsyncBindingError = $__m.AsyncBindingError;
      CyclicDependencyError = $__m.CyclicDependencyError;
      InstantiationError = $__m.InstantiationError;
      InvalidBindingError = $__m.InvalidBindingError;
    }, function($__m) {
      FunctionWrapper = $__m.FunctionWrapper;
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      Promise = $__m.Promise;
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Key = $__m.Key;
    }],
    execute: function() {
      _constructing = new Object();
      _notFound = new Object();
      _Waiting = (function() {
        var _Waiting = function _Waiting(promise) {
          assert.argumentTypes(promise, Promise);
          this.promise = promise;
        };
        return ($traceurRuntime.createClass)(_Waiting, {}, {});
      }());
      Object.defineProperty(_Waiting, "parameters", {get: function() {
          return [[Promise]];
        }});
      Injector = $__export("Injector", (function() {
        var Injector = function Injector(bindings, parent, defaultBindings) {
          assert.argumentTypes(bindings, assert.genericType(List, ResolvedBinding), parent, Injector, defaultBindings, assert.type.boolean);
          this._bindings = bindings;
          this._instances = this._createInstances();
          this._parent = parent;
          this._defaultBindings = defaultBindings;
          this._asyncStrategy = new _AsyncInjectorStrategy(this);
          this._syncStrategy = new _SyncInjectorStrategy(this);
        };
        return ($traceurRuntime.createClass)(Injector, {
          get: function(token) {
            return this._getByKey(Key.get(token), false, false, false);
          },
          getOptional: function(token) {
            return this._getByKey(Key.get(token), false, false, true);
          },
          asyncGet: function(token) {
            return assert.returnType((this._getByKey(Key.get(token), true, false, false)), Promise);
          },
          resolveAndCreateChild: function(bindings) {
            assert.argumentTypes(bindings, List);
            return assert.returnType((new Injector(Injector.resolve(bindings), this, false)), Injector);
          },
          createChildFromResolved: function(bindings) {
            assert.argumentTypes(bindings, assert.genericType(List, ResolvedBinding));
            return assert.returnType((new Injector(bindings, this, false)), Injector);
          },
          _createInstances: function() {
            return assert.returnType((ListWrapper.createFixedSize(Key.numberOfKeys + 1)), List);
          },
          _getByKey: function(key, returnPromise, returnLazy, optional) {
            var $__0 = this;
            if (returnLazy) {
              return (function() {
                return $__0._getByKey(key, returnPromise, false, optional);
              });
            }
            var strategy = returnPromise ? this._asyncStrategy : this._syncStrategy;
            var instance = strategy.readFromCache(key);
            if (instance !== _notFound)
              return instance;
            instance = strategy.instantiate(key);
            if (instance !== _notFound)
              return instance;
            if (isPresent(this._parent)) {
              return this._parent._getByKey(key, returnPromise, returnLazy, optional);
            }
            if (optional) {
              return null;
            } else {
              throw new NoBindingError(key);
            }
          },
          _resolveDependencies: function(key, binding, forceAsync) {
            var $__0 = this;
            try {
              var getDependency = (function(d) {
                return $__0._getByKey(d.key, forceAsync || d.asPromise, d.lazy, d.optional);
              });
              return assert.returnType((ListWrapper.map(binding.dependencies, getDependency)), List);
            } catch (e) {
              this._clear(key);
              if (e instanceof AbstractBindingError)
                e.addKey(key);
              throw e;
            }
          },
          _getInstance: function(key) {
            assert.argumentTypes(key, Key);
            if (this._instances.length <= key.id)
              return null;
            return ListWrapper.get(this._instances, key.id);
          },
          _setInstance: function(key, obj) {
            assert.argumentTypes(key, Key, obj, assert.type.any);
            ListWrapper.set(this._instances, key.id, obj);
          },
          _getBinding: function(key) {
            assert.argumentTypes(key, Key);
            var binding = this._bindings.length <= key.id ? null : ListWrapper.get(this._bindings, key.id);
            if (isBlank(binding) && this._defaultBindings) {
              return bind(key.token).toClass(key.token).resolve();
            } else {
              return binding;
            }
          },
          _markAsConstructing: function(key) {
            assert.argumentTypes(key, Key);
            this._setInstance(key, _constructing);
          },
          _clear: function(key) {
            assert.argumentTypes(key, Key);
            this._setInstance(key, null);
          }
        }, {
          resolve: function(bindings) {
            assert.argumentTypes(bindings, List);
            var resolvedBindings = _resolveBindings(bindings);
            var flatten = _flattenBindings(resolvedBindings, MapWrapper.create());
            return assert.returnType((_createListOfBindings(flatten)), assert.genericType(List, ResolvedBinding));
          },
          resolveAndCreate: function(bindings) {
            var $__3;
            var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
                defaultBindings = ($__3 = $__2.defaultBindings) === void 0 ? false : $__3;
            assert.argumentTypes(bindings, List);
            return assert.returnType((new Injector(Injector.resolve(bindings), null, defaultBindings)), Injector);
          },
          fromResolvedBindings: function(bindings) {
            var $__3;
            var $__2 = arguments[1] !== (void 0) ? arguments[1] : {},
                defaultBindings = ($__3 = $__2.defaultBindings) === void 0 ? false : $__3;
            assert.argumentTypes(bindings, assert.genericType(List, ResolvedBinding));
            return assert.returnType((new Injector(bindings, null, defaultBindings)), Injector);
          }
        });
      }()));
      Object.defineProperty(Injector, "parameters", {get: function() {
          return [[assert.genericType(List, ResolvedBinding)], [Injector], [assert.type.boolean]];
        }});
      Object.defineProperty(Injector.resolve, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(Injector.resolveAndCreate, "parameters", {get: function() {
          return [[List], []];
        }});
      Object.defineProperty(Injector.fromResolvedBindings, "parameters", {get: function() {
          return [[assert.genericType(List, ResolvedBinding)], []];
        }});
      Object.defineProperty(Injector.prototype.resolveAndCreateChild, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(Injector.prototype.createChildFromResolved, "parameters", {get: function() {
          return [[assert.genericType(List, ResolvedBinding)]];
        }});
      Object.defineProperty(Injector.prototype._getByKey, "parameters", {get: function() {
          return [[Key], [assert.type.boolean], [assert.type.boolean], [assert.type.boolean]];
        }});
      Object.defineProperty(Injector.prototype._resolveDependencies, "parameters", {get: function() {
          return [[Key], [ResolvedBinding], [assert.type.boolean]];
        }});
      Object.defineProperty(Injector.prototype._getInstance, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(Injector.prototype._setInstance, "parameters", {get: function() {
          return [[Key], []];
        }});
      Object.defineProperty(Injector.prototype._getBinding, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(Injector.prototype._markAsConstructing, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(Injector.prototype._clear, "parameters", {get: function() {
          return [[Key]];
        }});
      _SyncInjectorStrategy = (function() {
        var _SyncInjectorStrategy = function _SyncInjectorStrategy(injector) {
          assert.argumentTypes(injector, Injector);
          this.injector = injector;
        };
        return ($traceurRuntime.createClass)(_SyncInjectorStrategy, {
          readFromCache: function(key) {
            assert.argumentTypes(key, Key);
            if (key.token === Injector) {
              return this.injector;
            }
            var instance = this.injector._getInstance(key);
            if (instance === _constructing) {
              throw new CyclicDependencyError(key);
            } else if (isPresent(instance) && !_isWaiting(instance)) {
              return instance;
            } else {
              return _notFound;
            }
          },
          instantiate: function(key) {
            assert.argumentTypes(key, Key);
            var binding = this.injector._getBinding(key);
            if (isBlank(binding))
              return _notFound;
            if (binding.providedAsPromise)
              throw new AsyncBindingError(key);
            this.injector._markAsConstructing(key);
            var deps = this.injector._resolveDependencies(key, binding, false);
            return this._createInstance(key, binding, deps);
          },
          _createInstance: function(key, binding, deps) {
            assert.argumentTypes(key, Key, binding, ResolvedBinding, deps, List);
            try {
              var instance = FunctionWrapper.apply(binding.factory, deps);
              this.injector._setInstance(key, instance);
              return instance;
            } catch (e) {
              this.injector._clear(key);
              throw new InstantiationError(e, key);
            }
          }
        }, {});
      }());
      Object.defineProperty(_SyncInjectorStrategy, "parameters", {get: function() {
          return [[Injector]];
        }});
      Object.defineProperty(_SyncInjectorStrategy.prototype.readFromCache, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_SyncInjectorStrategy.prototype.instantiate, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_SyncInjectorStrategy.prototype._createInstance, "parameters", {get: function() {
          return [[Key], [ResolvedBinding], [List]];
        }});
      _AsyncInjectorStrategy = (function() {
        var _AsyncInjectorStrategy = function _AsyncInjectorStrategy(injector) {
          assert.argumentTypes(injector, Injector);
          this.injector = injector;
        };
        return ($traceurRuntime.createClass)(_AsyncInjectorStrategy, {
          readFromCache: function(key) {
            assert.argumentTypes(key, Key);
            if (key.token === Injector) {
              return PromiseWrapper.resolve(this.injector);
            }
            var instance = this.injector._getInstance(key);
            if (instance === _constructing) {
              throw new CyclicDependencyError(key);
            } else if (_isWaiting(instance)) {
              return instance.promise;
            } else if (isPresent(instance)) {
              return PromiseWrapper.resolve(instance);
            } else {
              return _notFound;
            }
          },
          instantiate: function(key) {
            var $__0 = this;
            var binding = this.injector._getBinding(key);
            if (isBlank(binding))
              return _notFound;
            this.injector._markAsConstructing(key);
            var deps = this.injector._resolveDependencies(key, binding, true);
            var depsPromise = PromiseWrapper.all(deps);
            var promise = PromiseWrapper.then(depsPromise, null, (function(e) {
              return $__0._errorHandler(key, e);
            })).then((function(deps) {
              return $__0._findOrCreate(key, binding, deps);
            })).then((function(instance) {
              return $__0._cacheInstance(key, instance);
            }));
            this.injector._setInstance(key, new _Waiting(promise));
            return promise;
          },
          _errorHandler: function(key, e) {
            assert.argumentTypes(key, Key, e, assert.type.any);
            if (e instanceof AbstractBindingError)
              e.addKey(key);
            return assert.returnType((PromiseWrapper.reject(e)), Promise);
          },
          _findOrCreate: function(key, binding, deps) {
            assert.argumentTypes(key, Key, binding, ResolvedBinding, deps, List);
            try {
              var instance = this.injector._getInstance(key);
              if (!_isWaiting(instance))
                return instance;
              return FunctionWrapper.apply(binding.factory, deps);
            } catch (e) {
              this.injector._clear(key);
              throw new InstantiationError(e, key);
            }
          },
          _cacheInstance: function(key, instance) {
            this.injector._setInstance(key, instance);
            return instance;
          }
        }, {});
      }());
      Object.defineProperty(_AsyncInjectorStrategy, "parameters", {get: function() {
          return [[Injector]];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype.readFromCache, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype.instantiate, "parameters", {get: function() {
          return [[Key]];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype._errorHandler, "parameters", {get: function() {
          return [[Key], []];
        }});
      Object.defineProperty(_AsyncInjectorStrategy.prototype._findOrCreate, "parameters", {get: function() {
          return [[Key], [ResolvedBinding], [List]];
        }});
      Object.defineProperty(_resolveBindings, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(_flattenBindings, "parameters", {get: function() {
          return [[List], [Map]];
        }});
    }
  };
});
//# sourceMappingURL=injector.es6.map

//# sourceMappingURL=./injector.js.map