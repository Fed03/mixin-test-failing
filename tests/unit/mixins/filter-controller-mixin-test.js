import Ember from 'ember';
import FilterControllerMixin from 'mixin-failing-test/mixins/filter-controller-mixin';
import { module, test } from 'qunit';

module('FilterControllerMixin');

test('it throws an error if every entry in the filterable array is not present also in the queryParams',
function(assert) {
  var FilterControllerMixinObject = Ember.Controller.extend(FilterControllerMixin, {
    queryParams: ['foo'],
    filters: {
      filterName: {
        wifi: 'foo',
        checkIn: 'bar'
      },
      filter2: 'john'
    }
  });

  assert.throws(function() {
    FilterControllerMixinObject.create();
  }, /The following filters are not included into the `queryParams` array: `bar`, `john`/);
});

test('Proxies himself to the filter manager',
function(assert) {
  var stub = sinon.stub();
  var filtersManager = Ember.Object.create({
    setContext: stub
  });

  var FilterControllerMixinObject = Ember.Controller.extend(FilterControllerMixin, {
    queryParams: ['foo', 'bar'],
    filters: {
      filterName: {
        wifi: 'foo',
        checkIn: 'bar'
      }
    },
    _filtersManager: filtersManager
  });

  var obj = FilterControllerMixinObject.create();
  assert.ok(stub.calledWithExactly(obj));
});
