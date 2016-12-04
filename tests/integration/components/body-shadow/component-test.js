import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const navigationService = Ember.Service.extend({
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  back() { }
});

moduleForComponent('body-shadow', 'Integration | Component | body shadow', {
  integration: true,
  beforeEach() {
    this.register('service:navigation', navigationService);
    this.inject.service('navigation', { as: 'navigation' });
  }
});

test('it closes the menu when clicked on', function(assert) {
  this.set('navigation.menuOpen', true);
  this.render(hbs`{{body-shadow}}`);
  this.$('#body-shadow').click();
  let menuClosed = this.get('navigation.menuOpen') === false;
  assert.ok(menuClosed, 'menu should be closed');
});
