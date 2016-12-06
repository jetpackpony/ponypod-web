import Ember from 'ember';

export default Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false,
  showExpandedPlayer: false,
  // THis should be composite property with set() and get()
  progress: 0,
  position: 0,
  timeToFinish: 186,
  rewind(seconds) {
    console.log('TODO: implement rewind', arguments);
  },
  forward(seconds) {
    console.log('TODO: implement forward', arguments);
  }
});
