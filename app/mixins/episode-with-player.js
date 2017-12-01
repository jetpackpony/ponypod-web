import Mixin from '@ember/object/mixin';

export default Mixin.create({
  player: Ember.inject.service(),
  isPlaying: Ember.computed('player.{playingEpisode,isPlaying}', function() {
    return this.get('player.playingEpisode.id') === this.get('episode.id')
      && this.get('player.isPlaying');
  }),
  didReceiveAttrs() {
    this._super(...arguments);
    // Generate a computed property which watches localStorage
    // changes for this episode specifically
    this.defineComputedProperty(
      'progress',
      `player.localStorage.episodes.${this.get('episode.id')}`,
      (epProgress) => (
        (epProgress)
        ? calcProgress(epProgress.currentTime, epProgress.duration)
        : 0
      )
    );
    this.defineComputedProperty(
      'isPlayed',
      'progress',
      (progress) => (progress >= 99)
    );
  },
  actions: {
    replay() {
      this.get('player.playEpisode')(this.get('episode.id'), true, true);
    },
    play() {
      this.get('player.playEpisode')(this.get('episode.id'), false, true);
    },
    pause() {
      this.get('player').pause();
    }
  }
});

const calcProgress = (currentTime, duration) => (
  Math.round((currentTime || 0) / (duration || 1) * 100)
);
