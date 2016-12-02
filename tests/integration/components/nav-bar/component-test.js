import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders a back arrow when the attribute is set', function(assert) {
  this.render(hbs`{{nav-bar backArrowButton=true}}`);

  let backButtonExists = this.$('#back-button').length > 0;
  let menuButtonExists = this.$('#toggle-menu').length > 0;
  assert.ok(backButtonExists, 'back button should exist');
  assert.ok(! menuButtonExists, 'menu button should not exist');
});

test('it renders a menu button by default', function(assert) {
  this.render(hbs`{{nav-bar}}`);
  let backButtonExists = this.$('#back-button').length > 0;
  let menuButtonExists = this.$('#toggle-menu').length > 0;
  assert.ok(menuButtonExists, 'menu button should exist');
  assert.ok(! backButtonExists, 'back button should not exist');
});

test('it shows a title when passed a title', function(assert) {
  this.render(hbs`{{nav-bar title="Testme"}}`);
  let text = this.$('.nav-title').text().trim();
  assert.equal(text, 'Testme', 'should display nav titile');
});

test('changes menuOpen binding when menu button is clicked', function(assert) {
  assert.expect(1);
  this.on('onOpenMenuClick', () => assert.ok(1));

  this.render(hbs`{{
    nav-bar
    onOpenMenuClick=(action 'onOpenMenuClick')
  }}`);
  this.$('#toggle-menu').click();
});

test('calls back function when back arrow is clicked', function(assert) {
  assert.expect(1);
  this.on('onBackButtonClick', () => assert.ok(1));

  this.render(hbs`{{
    nav-bar
    backArrowButton=true
    onBackButtonClick=(action 'onBackButtonClick')
  }}`);
  this.$('#back-button').click();
});
