System.register(["angular2/test_lib", "angular2/src/facade/collection", "angular2/src/core/compiler/query_list"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      List,
      MapWrapper,
      ListWrapper,
      iterateListLike,
      QueryList;
  function main() {
    describe('QueryList', (function() {
      var queryList,
          log;
      beforeEach((function() {
        queryList = new QueryList();
        log = '';
      }));
      function logAppend(item) {
        log += (log.length == 0 ? '' : ', ') + item;
      }
      it('should support adding objects and iterating over them', (function() {
        queryList.add('one');
        queryList.add('two');
        iterateListLike(queryList, logAppend);
        expect(log).toEqual('one, two');
      }));
      it('should support resetting and iterating over the new objects', (function() {
        queryList.add('one');
        queryList.add('two');
        queryList.reset(['one again']);
        queryList.add('two again');
        iterateListLike(queryList, logAppend);
        expect(log).toEqual('one again, two again');
      }));
      describe('simple observable interface', (function() {
        it('should fire callbacks on change', (function() {
          var fires = 0;
          queryList.onChange((function() {
            fires += 1;
          }));
          queryList.fireCallbacks();
          expect(fires).toEqual(0);
          queryList.add('one');
          queryList.fireCallbacks();
          expect(fires).toEqual(1);
          queryList.fireCallbacks();
          expect(fires).toEqual(1);
        }));
        it('should support removing callbacks', (function() {
          var fires = 0;
          var callback = (function() {
            return fires += 1;
          });
          queryList.onChange(callback);
          queryList.add('one');
          queryList.fireCallbacks();
          expect(fires).toEqual(1);
          queryList.removeCallback(callback);
          queryList.add('two');
          queryList.fireCallbacks();
          expect(fires).toEqual(1);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      List = $__m.List;
      MapWrapper = $__m.MapWrapper;
      ListWrapper = $__m.ListWrapper;
      iterateListLike = $__m.iterateListLike;
    }, function($__m) {
      QueryList = $__m.QueryList;
    }],
    execute: function() {
    }
  };
});
//# sourceMappingURL=query_list_spec.es6.map

//# sourceMappingURL=./query_list_spec.js.map