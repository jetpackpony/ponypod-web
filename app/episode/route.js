import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('episode', params.episode_id);
  },
  afterModel(episode) {
    this.set('navigation.navTitle', episode.get('podcast').get('title'));
    this.set('navigation.showBackArrow', true);
  }
});
