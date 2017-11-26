import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    search: {
      refreshModel: true,
      replace: true
    }
  },

  searchTerm: Ember.computed('navigation.searchQuery', function() {
    return this.get('navigation.searchQuery');
  }),
  beforeModel(transition) {
    this.set('navigation.navBarSearch', true);
    let search = transition.queryParams.search;
    if (search) {
      this.set('navigation.searchQuery', search);
      this.set('navigation.searchOpen', true);
    }
  },
  actions: {
    willTransition(transition) {
      if (transition.targetName !== this.routeName) {
        this.set('navigation.searchQuery', '');
        this.set('navigation.searchOpen', false);
      }
      return true;
    }
  }
});
