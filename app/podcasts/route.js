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
    }
  },
  model(params) {
    let query = params.search;
    if (query) {
      return this.get('store').query('podcast', { title: params.search });
    } else {
      return this.get('store').findAll('podcast');
    }
  },
  afterModel(model, transition) {
    this.set('navigation.navTitle', 'PonyPod');
    this.set('navigation.showBackArrow', false);
    this.set('navigation.navBarSearch', true);
  }
});
