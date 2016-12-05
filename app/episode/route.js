import Ember from 'ember';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  model(params) {
    return this.get('store').findRecord('episode', params.episode_id);
  },
  afterModel(episode) {
    this._setNavParams(episode);
    this._setPlayingEpisode(episode);
  },
  _setNavParams(episode) {
    this.set('navigation.navTitle', episode.get('podcast').get('title'));
    this.set('navigation.showBackArrow', true);
  },
  _setPlayingEpisode(episode) {
    if (!this.get('player.playingEpisode')) {
      this.set('player.playingEpisode', episode);
    }
  }
});
