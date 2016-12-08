import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const navigationService = Ember.Service.extend({
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

test('it sets navbar hanburger button', function(assert) {
  let route = this.subject({
    navigation: navigationService.create()
  });
  route.afterModel();
  assert.equal(route.get('navigation.showBackArrow'), false, 'should set button');
});
