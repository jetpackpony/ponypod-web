import Ember from 'ember';

export default Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false,
  showExpandedPlayer: false,
  // The position in percent
  progress: 0,
  // The time in seconds
  posision: 0
});
