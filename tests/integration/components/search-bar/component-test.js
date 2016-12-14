import Ember from 'ember';
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

test('it sets a search query in the nav service', function(assert) {
  this.render(hbs`{{search-bar}}`);
  this.$('#open-search').click();
  this.$('input#search').val('testme').change();
  let query = this.get('navigation.searchQuery');
  assert.equal(query, 'testme', 'search query should match');
});

test('it unsets a search query if the search is open', function(assert) {
  this.render(hbs`{{search-bar}}`);
  this.$('#open-search').click();
  this.$('input#search').val('testme').change();
  this.$('#close-search').click();
  let query = this.get('navigation.searchQuery');
  assert.equal(query, '', 'search query should be empty');
});

test('it shows the search bar expanded if the state is set', function(assert) {
  this.set('navigation.searchOpen', true);
  this.set('navigation.searchQuery', 'testme');
  this.render(hbs`{{search-bar}}`);
  let input= this.$('input#search:visible');
  assert.equal(input.length, 1, 'search field should be visible');
  assert.equal(input.val(), 'testme', 'search field value should be set');
});

test('it closes search bar if the state is not set', function(assert) {
  this.set('navigation.searchOpen', true);
  this.render(hbs`{{search-bar}}`);
  this.set('navigation.searchOpen', false);
  let input= this.$('input#search:visible');
  assert.equal(input.length, 0, 'search field should not be visible');
});
