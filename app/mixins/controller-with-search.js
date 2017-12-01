import Ember from 'ember';

export default Ember.Mixin.create({
  navigation: Ember.inject.service(),
  queryParams: ['search'],
  search: null,
  onSearchQueryChange: Ember.observer('navigation.searchQuery', function() {
    Ember.run.debounce(this, () => {
      this.set('search',
        truncateQuery(this.get('navigation.searchQuery')));
    }, 300);
  })
});

const truncateQuery = (query) => (
  (query.length <= 2) ? null : query
);
