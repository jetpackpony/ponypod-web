import Component from '@ember/component';

export default Component.extend({
  classNames: ['control'],
  classNameBindings: ['isPlaying:playing', 'isPlayed:played'],
  actions: {
    replay() {
      this.get('replay')();
    },
    play() {
      this.get('play')();
    },
    pause() {
      this.get('pause')();
    }
  }
});
