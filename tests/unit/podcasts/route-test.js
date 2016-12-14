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

test('it does not filter results if query is short', function(assert) {
  assert.expect(1);
  let route = this.subject({
    store: Ember.Object.create({
      findAll() {
        assert.ok(true, 'should run findAll');
      },
      query() {
        assert.ok(false, 'should not run query');
      }
    })
  });
  route.model({ search: "te" });
});

test('it filters the results if query is not short', function(assert) {
  assert.expect(1);
  let route = this.subject({
    store: Ember.Object.create({
      findAll() {
        assert.ok(false, 'should not run findAll');
      },
      query(model, params) {
        assert.equal(params.title, 'testme', 'should run query with params');
      }
    })
  });
  route.model({ search: "testme" });
});

test('it clears and closed the nav search when transitioning', function(assert) {
  let route = this.subject({
    navigation: navigationService.create()
  });
  route.set('navigation.searchQuery', 'test');
  route.set('navigation.searchOpen', true);
  route.actions.willTransition.call(route, { targetName: "podcast" });

  let query = route.get('navigation.searchQuery');
  assert.equal(query, '', 'queries should be emptied');
  assert.notOk(route.get('navigation.searchOpen'), 'search should be closed');
});
