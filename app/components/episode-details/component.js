import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['episode-details'],
  isPlaying: Ember.computed('player.{playingEpisode,isPlaying}', function() {
    let epId = this.get('player.playingEpisode.id');
    return epId === this.get('episode.id') && this.get('player.isPlaying');
  }),
  actions: {
    play() {
      this.get('player.playNewEpisode')(this.get('episode'));
      this.get('player').play();
    },
    pause() {
      this.get('player').pause();
    }
  }
});
