import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['playback-progress'],
  didInsertElement() {
    this._super(...arguments);
    this.set(
      'thumbWidth',
      this.$('.progress-container .thumb').outerWidth()
    );
  },
  _calculateProgress(pageX, offset, width) {
    let pos = ((pageX - offset.left) / width * 100);
    pos = (pos > 100) ? 100 : pos;
    pos = (pos < 0) ? 0 : pos;
    return pos;
  },
  thumbPosition: Ember.computed('player.progress', 'thumbWidth', function() {
    let progress = this.get('player.progress');
    let width = this.get('thumbWidth');
    return `calc(${progress}% - ${width / 2}px)`;
  }),
  actions: {
    jumpTo(event, coords) {
      let pageX = (event.pageX === undefined) ? coords.pageX : event.pageX;
      let offset = this.$('.progress-wrapper').offset();
      let width = this.$('.progress-wrapper').width();
      let newProgress = this._calculateProgress(pageX, offset, width);
      this.get('player').jumpTo(newProgress);
    }
  }
});
