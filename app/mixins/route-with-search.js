import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    search: {
      refreshModel: true,
      replace: true
    }
  },
  beforeModel(transition) {
    this._super(...arguments);
    this.set('navigation.navBarSearch', true);
    let search = transition.queryParams.search;
    if (search) {
      this.set('navigation.searchQuery', search);
      this.set('navigation.searchOpen', true);
    }
    this.controllerFor(this.routeName).set('showSearchSpinner', true);
  },
  prepareSearchQuery(query) {
    return ((query && query.length > 2)
      ? { search: query }
      : {});
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
