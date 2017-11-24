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

test('it does not filter results if query is short', function(assert) {
  assert.expect(1);
  let route = this.subject({
    infinityModel(model, params) {
      assert.ok(Object.keys(params).indexOf('title') !== 1, 'should not add search term to params');
    },
    store: Ember.Object.create({
      query() {
        assert.ok(true, 'should run query');
      }
    })
  });
  route.model({ search: "te" });
});

test('it filters the results if query is not short', function(assert) {
  assert.expect(1);
  let route = this.subject({
    infinityModel(model, params) {
        assert.equal(params.search, 'testme', 'should run query with params');
    },
    store: Ember.Object.create({
      query() {
        assert.ok(true, 'should run query');
      }
    })
  });
  route.model({ search: "testme" });
});
