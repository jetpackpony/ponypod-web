import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ["episode","collection-item","avatar"],
  player: Ember.inject.service(),
  classNameBindings: ['isPlaying:playing'],
  isPlaying: Ember.computed('player.{playingEpisode,isPlaying}', function() {
    let playingId = this.get('player.playingEpisode.id');
    return this.get('episode.id') === playingId && this.get('player.isPlaying');
  }),
  actions: {
    play() {
      this.set('player.playingEpisode', this.get('episode'));
      this.set('player.isPlaying', true);
    },
    pause() {
      this.set('player.isPlaying', false);
    }
  }
});
