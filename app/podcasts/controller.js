import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  queryParams: ['search'],
  search: null,
  _updateSearchQuery() {
    let query = this.get('navigation.searchQuery');
    if (query.length <= 2) {
      query = null;
    }
    this.set('search', query);
  },
  onSearchQueryChange: Ember.observer('navigation.searchQuery', function() {
    Ember.run.debounce(this, this._updateSearchQuery, 300);
  })
});
