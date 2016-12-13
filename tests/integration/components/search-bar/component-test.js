import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const navService = Ember.Service.extend({

});

moduleForComponent('search-bar', 'Integration | Component | search bar', {
  integration: true,
  beforeEach() {
    this.register('service:navigation', navService);
    this.inject.service('navigation', { as: 'navigation' });
    this.$().addClass('nav-wrapper');
  }
});

test('it shows search button', function(assert) {
  this.render(hbs`{{search-bar}}`);
  let searchButtonVisible = this.$('#open-search:visible').length === 1;
  assert.ok(searchButtonVisible, 'search button should be visible');
});

test('it expands search bar on click on search button', function(assert) {
  this.render(hbs`{{search-bar}}`);
  this.$('#open-search').click();
  let inputVisible = this.$('input#search:visible').length === 1;
  assert.ok(inputVisible, 'search field should be visible');
});

test('it collapses search bar on click on close search', function(assert) {
  this.render(hbs`{{search-bar}}`);
  this.$('#open-search').click();
  this.$('#close-search').click();
  let inputInVisible = this.$('input#search:visible').length === 1;
  assert.notOk(inputInVisible, 'search field should not be visible');
});

test('it calls a callback from nav service when submitted', function(assert) {
  assert.expect(1);
  this.set('navigation.search', (query) => {
    assert.equal(query, 'testme', 'search query should match');
  });
  this.render(hbs`{{search-bar}}`);
  this.$('#open-search').click();
  this.$('input#search').val('testme').trigger('keyup', { keyCode: 13 });
});

