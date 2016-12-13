import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  queryParams: ['search'],
  search: null,
  _updateSearchQuery() {
    this.set('search', this.get('navigation.searchQuery'));
  },
  onSearchQueryChange: Ember.observer('navigation.searchQuery', function() {
    Ember.run.debounce(this, this._updateSearchQuery, 300);
  })
});
