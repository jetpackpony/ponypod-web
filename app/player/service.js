import Ember from 'ember';

export default Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false,
  showExpandedPlayer: false,
  // THis should be composite property with set() and get()
  progress: 15,
  position: 15,
  duration: 100,
  timeToFinish: 85,
  rewind(seconds) {
    console.log('TODO: implement rewind', seconds);
  },
  forward(seconds) {
    console.log('TODO: implement forward', seconds);
  },
  getAudioElement() {
  }
});
