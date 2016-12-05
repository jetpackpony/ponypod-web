import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['mini-player'],
  player: Ember.inject.service(),
  actions: {
    play() {
      this.set('player.isPlaying', true);
    },
    pause() {
      this.set('player.isPlaying', false);
    },
    expandPlayer() {
      this.set('player.showExpandedPlayer', true);
    }
  }
});
