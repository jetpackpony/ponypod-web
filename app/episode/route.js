import Ember from 'ember';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  titleToken: function(model) {
    return `${model.get('title')} - ${model.get('podcast').get('title')}`;
  },
  model(params) {
    return this.get('store').findRecord('episode', params.episode_id);
  },
  afterModel(episode) {
    this._setNavParams(episode);
  },
  _setNavParams(episode) {
    this.set('navigation.navBarSearch', false);
    this.set('navigation.navTitle', episode.get('podcast').get('title'));
    this.set('navigation.showBackArrow', true);
  }
});
