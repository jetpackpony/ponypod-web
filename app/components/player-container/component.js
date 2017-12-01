import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNameBindings: ['isMiniOpen:mini', 'isMaxiOpen:maxi'],
  isMiniOpen: Ember.computed.bool('player.playingEpisode'),
  isMaxiOpen: Ember.computed.and('player.{showExpandedPlayer,playingEpisode}'),
  didInsertElement() {
    this._super(...arguments);
    this.$().append(this.get('player').getAudioElement());
  }
});
