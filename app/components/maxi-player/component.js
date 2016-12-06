import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['maxi-player'],
  actions: {
    collapsePlayer() {
      this.set('player.showExpandedPlayer', false);
    },
    readMore() {
      this.set('player.showExpandedPlayer', false);
      this.get('transitionToEpisode')(this.get('player.playingEpisode'));
    },
    play() {
      this.set('player.isPlaying', true);
    },
    pause() {
      this.set('player.isPlaying', false);
    },
    rewind() {
      this.get('player').rewind(10);
    },
    forward() {
      this.get('player').forward(30);
    }
  }
});
