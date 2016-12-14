import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    search: {
      refreshModel: true
    }
  },
  beforeModel(transition) {
    let search = transition.queryParams.search;
    if (search) {
      this.set('navigation.searchQuery', search);
      this.set('navigation.searchOpen', true);
    }
  },
  model(params) {
    let query = params.search;
    if (query && query.length > 2) {
      return this.get('store').query('podcast', { title: params.search });
    } else {
      return this.get('store').findAll('podcast');
    }
  },
  afterModel() {
    this.set('navigation.navTitle', 'PonyPod');
    this.set('navigation.showBackArrow', false);
    this.set('navigation.navBarSearch', true);
  },
  actions: {
    willTransition(transition) {
      this._super(...arguments);
      if (transition.targetName !== 'podcasts') {
        this.set('navigation.searchQuery', '');
        this.set('navigation.searchOpen', false);
      }
    }
  }
});
