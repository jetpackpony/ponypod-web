import Ember from 'ember';
import RouteWithSearchMixin from 'ponypod-frontend/mixins/route-with-search';
import RSVP from 'rsvp';

export default Ember.Route.extend(RouteWithSearchMixin, {
  titleToken: function(model) {
    return model.podcast.get('title');
  },
  model(params) {
    if (!params.search || params.search.length <= 2) {
      params.search = '';
    }
    return this.get('store')
              .findRecord('podcast', params.podcast_id)
              .then((podcast) => {
                return RSVP.hash({
                  podcast,
                  episodes: podcast.query('episodes', params)
                });
              });
  },
  afterModel(model) {
    this.set('navigation.navTitle', model.podcast.get('title'));
    this.set('navigation.showBackArrow', true);
  }
});
