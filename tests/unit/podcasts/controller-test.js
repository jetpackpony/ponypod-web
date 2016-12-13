import { moduleFor, test } from 'ember-qunit';

const navigationService = Ember.Service.extend({
  searchQuery: ''
});

let origDebounce = Ember.run.debounce;
moduleFor('controller:podcasts', 'Unit | Controller | podcasts', {
  beforeEach() {
    Ember.run.debounce = function(target, func) {
      func.call(target);
    };
  },
  afterEach() {
    Ember.run.debounce = origDebounce;
  }
});

test('updates the query param when search query changes', function(assert) {
  let controller = this.subject({
    navigation: navigationService.create()
  });
  controller.set('navigation.searchQuery', 'testme');
  assert.equal(controller.get('search'), 'testme', 'query param should match');
});

test('does not update query param if query is less than 2 letters', function(assert) {
  let controller = this.subject({
    navigation: navigationService.create()
  });
  controller.set('navigation.searchQuery', 'te');
  assert.equal(controller.get('search'), null, 'query param should not change');
});
