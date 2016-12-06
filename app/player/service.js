import Ember from 'ember';

export default Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false,
  showExpandedPlayer: false,
  progress: 0,
  posision: 0,
  timeToFinish: 186,
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
