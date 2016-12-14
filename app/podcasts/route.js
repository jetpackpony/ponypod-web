import Ember from 'ember';
import RouteWithSearchMixin from '../mixins/route-with-search'

export default Ember.Route.extend(RouteWithSearchMixin, {
  queryParams: {
    search: {
      refreshModel: true
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
  }
});
