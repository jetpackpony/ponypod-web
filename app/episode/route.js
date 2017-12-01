import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: (episode) => (
    `${episode.get('title')} - ${episode.get('podcast.title')}`
  ),
  model({ episode_id }) {
    return this.get('store')
      .findRecord('episode', episode_id);
  },
  afterModel(episode) {
    this.set('navigation.navBarSearch', false);
    this.set('navigation.navTitle', episode.get('podcast.title'));
    this.set('navigation.showBackArrow', true);
  }
});
