import Ember from 'ember';
import RouteWithSearchMixin from 'ponypod-frontend/mixins/route-with-search';
import RSVP from 'rsvp';

export default Ember.Route.extend(RouteWithSearchMixin, {
  titleToken: function(model) {
    return model.podcast.get('title');
  },
  queryParams: {
    search: {
      refreshModel: true
    }
  },
  model(params) {
    if (!params.search || params.search.length <= 2) {
      params.search = '';
    }
    return RSVP.hash({
      podcast: this.get('store').findRecord('podcast', params.podcast_id),
      episodes: this.get('store').query('episode', params)
    });
  },
  afterModel(model) {
    this.set('navigation.navTitle', model.podcast.get('title'));
    this.set('navigation.showBackArrow', true);
  }
});
