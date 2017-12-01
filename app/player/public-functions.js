import { trimValue, calcPercentage } from '../helpers/helper-functions';

export default {
  showExpandedPlayer: false,
  isPlaying: false,
  progress: Ember.computed('currentTime', 'duration', {
    get() {
      return calcPercentage(
        this.get('currentTime'),
        this.get('duration')
      );
    },
    set(k, newValue) {
      this.set('currentTime', (newValue * this.get('duration') / 100));
      return newValue || 0;
    }
  }),
  timeToFinish: Ember.computed('currentTime', 'duration', function() {
    return this.get('duration') - this.get('currentTime');
  }),
  getAudioElement() {
    return this.get('audio');
  },
  play() {
    this.get('audio').play();
    this.set('isPlaying', true);
  },
  pause() {
    this.get('audio').pause();
    this.set('isPlaying', false);
  },
  jumpTo(time) {
    this.set('currentTime', time);
  },
  rewind(seconds) {
    this.jumpBy(-1 * seconds);
  },
  forward(seconds) {
    this.jumpBy(seconds);
  },
  jumpBy(signedSeconds) {
    this.jumpTo(
      trimValue(
        0,
        this.get('duration'),
        this.get('currentTime') + signedSeconds
      )
    );
  }
};
