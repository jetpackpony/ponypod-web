import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const navigationService = Ember.Service.extend({
  searchQuery: '',
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  back() { }
});

moduleFor('route:podcasts', 'Unit | Route | podcasts', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it sets navbar title', function(assert) {
  let route = this.subject({
    navigation: navigationService.create()
  });
  route.afterModel();
  assert.equal(route.get('navigation.navTitle'), 'PonyPod', 'should set title');
});

test('it sets navbar hamburger button', function(assert) {
  let route = this.subject({
    navigation: navigationService.create()
  });
  route.afterModel();
  assert.equal(route.get('navigation.showBackArrow'), false, 'should set button');
});

test('it sets nav search query if query param is set', function(assert) {
  let route = this.subject({
    navigation: navigationService.create()
  });
  route.beforeModel({ queryParams: { search: "testme"  } });
  let query = route.get('navigation.searchQuery');
  assert.equal(query, 'testme', 'queries should match');
});
