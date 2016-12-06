import Ember from 'ember';

export default Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false,
  showExpandedPlayer: false,
  // The position in percent
  progress: 0,
  // The time in seconds
  posision: 0,
  rewind(seconds) {
    console.log('TODO: implement rewind', arguments);
  },
  forward(seconds) {
    console.log('TODO: implement forward', arguments);
  },
  jumpTo(progress) {
    this.set('progress', progress);
    console.log('TODO: implement jumpTo', arguments);
  }
});
