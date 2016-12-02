import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const navigationService = Ember.Service.extend({
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  back() { }
});

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true,
  beforeEach() {
    this.register('service:navigation', navigationService);
    this.inject.service('navigation', { as: 'navigation' });
  }
});



test('it renders a back arrow when setup', function(assert) {
  this.set('navigation.showBackArrow', true);
  this.render(hbs`{{nav-bar}}`);
  let backButtonExists = this.$('#back-button').length > 0;
  let menuButtonExists = this.$('#toggle-menu').length > 0;
  assert.ok(backButtonExists, 'back button should exist');
  assert.ok(! menuButtonExists, 'menu button should not exist');
});

test('it renders a menu button by default', function(assert) {
  this.set('navigation.showBackArrow', false);
  this.render(hbs`{{nav-bar}}`);
  let backButtonExists = this.$('#back-button').length > 0;
  let menuButtonExists = this.$('#toggle-menu').length > 0;
  assert.ok(menuButtonExists, 'menu button should exist');
  assert.ok(! backButtonExists, 'back button should not exist');
});

test('it shows a title when passed a title', function(assert) {
  this.set('navigation.navTitle', 'Testme');
  this.render(hbs`{{nav-bar}}`);
  let text = this.$('.nav-title').text().trim();
  assert.equal(text, 'Testme', 'should display nav titile');
});

test('changes menuOpen when menu button is clicked', function(assert) {
  this.render(hbs`{{nav-bar}}`);
  this.$('#toggle-menu').click();

  assert.equal(this.get('navigation.menuOpen'), true, 'menu should be open');
});

test('calls back function when back arrow is clicked', function(assert) {
  assert.expect(1);
  this.set('navigation.showBackArrow', true);
  this.set('navigation.back', () => assert.ok(1));

  this.render(hbs`{{nav-bar}}`);
  this.$('#back-button').click();
});
