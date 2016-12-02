import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('podcast', params.podcast_id)
  },
  afterModel(podcast) {
    this.set('navigation.navTitle', podcast.get('title'));
    this.set('navigation.showBackArrow', true);
  }
});
