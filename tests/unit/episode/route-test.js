import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const navigationService = Ember.Service.extend({
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  back() { }
}).create();

moduleFor('route:episode', 'Unit | Route | episode', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it sets navbar title to podcast name', function(assert) {
  let route = this.subject({
    navigation: navigationService
  });
  route._setNavParams(Ember.Object.create({
    podcast: Ember.Object.create({ title: "testme" })
  }));
  assert.equal(navigationService.get('navTitle'), 'testme', 'sets the title');
});
