import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['mini-player'],
  player: Ember.inject.service(),
  actions: {
    play() {
      this.get('player').play();
    },
    pause() {
      this.get('player').pause();
    },
    expandPlayer() {
      this.set('player.showExpandedPlayer', true);
    }
  }
});
