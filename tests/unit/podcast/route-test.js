import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const navigationService = Ember.Service.extend({
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  back() { }
}).create();

moduleFor('route:podcast', 'Unit | Route | podcast', {
  // Specify the other units that are required for this test.
  needs: ['controller:podcast', 'service:navigation']
});

test('it sets the navbar title to a podcast name', function(assert) {
  let route = this.subject({
    navigation: navigationService
  });
  route.afterModel(Ember.Object.create({
    podcast: Ember.Object.create({ title: "testme" })
  }));
  assert.equal(navigationService.get('navTitle'), 'testme', 'should set title');
});
