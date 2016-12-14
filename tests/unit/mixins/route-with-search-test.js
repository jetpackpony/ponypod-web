import Ember from 'ember';
import RouteWithSearchMixin from 'ponypod-frontend/mixins/route-with-search';
import { module, test } from 'qunit';

const navigationService = Ember.Service.extend({
  searchQuery: '',
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  back() { }
});

module('Unit | Mixin | route with search');

test('it sets nav search query if query param is set', function(assert) {
  let RouteWithSearchObject = Ember.Object.extend(RouteWithSearchMixin);
  let route = RouteWithSearchObject.create({
    routeName: 'podcasts',
    navigation: navigationService.create()
  });
  route.beforeModel({ queryParams: { search: "testme"  } });
  let query = route.get('navigation.searchQuery');
  assert.equal(query, 'testme', 'queries should match');
});

test('it clears and closed the nav search when transitioning', function(assert) {
  let RouteWithSearchObject = Ember.Object.extend(RouteWithSearchMixin);
  let route = RouteWithSearchObject.create({
    routeName: 'podcasts',
    navigation: navigationService.create()
  });
  route.set('navigation.searchQuery', 'test');
  route.set('navigation.searchOpen', true);
  route.actions.willTransition.call(route, { targetName: "podcast" });

  let query = route.get('navigation.searchQuery');
  assert.equal(query, '', 'queries should be emptied');
  assert.notOk(route.get('navigation.searchOpen'), 'search should be closed');
});
