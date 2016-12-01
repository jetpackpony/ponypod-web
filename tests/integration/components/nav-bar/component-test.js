import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nav-bar', 'Integration | Component | nav bar', {
  integration: true
});

test('it renders a back arrow when the attribute is set', function(assert) {
  this.render(hbs`{{nav-bar backArrowButton=true}}`);
  assert.equal(
    this.$('#back-button').css('display'),
    'block',
    'back button should be visible'
  );
  assert.equal(this.$('#toggle-menu').length, 0, 'back button is shown');
});

test('it renders a menu button by default', function(assert) {
  this.render(hbs`{{nav-bar}}`);
  assert.equal(
    this.$('#toggle-menu').css('display'),
    'block',
    'menu button should be visible'
  );
  assert.equal(this.$('#back-button').length, 0, 'back button is shown');
});

test('it shows a title when passed a title', function(assert) {
  this.render(hbs`{{nav-bar title="Testme"}}`);
  assert.equal(this.$('.nav-title').text().trim(), 'Testme', 'should display nav titile');
});

test('changes menuOpen binding when menu button is clicked');
test('calls back function when back arrow is clicked');
