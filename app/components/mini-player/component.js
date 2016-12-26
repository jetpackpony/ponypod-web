import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['mini-player'],
  player: Ember.inject.service(),
  progressCss: Ember.computed('player.progress', function() {
    let progress = parseInt(this.get('player.progress'), 10);
    return Ember.String.htmlSafe(`width: ${progress}%`);
  }),
  actions: {
    play() {
      this.get('player').play();
    },
    pause() {
      this.get('player').pause();
    },
    expandPlayer() {
      this.set('player.showExpandedPlayer', true);
    }
  }
});
