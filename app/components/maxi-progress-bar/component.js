import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['playback-progress'],
  didInsertElement() {
    this._super(...arguments);
    this.set('thumbWidth', this.$('.thumb').outerWidth());

    // Handle mouse thumb drag
    let onMouseMove = (event, coords) => {
      Ember.run(() => {
        let pageX = (event.pageX === undefined) ? coords.pageX : event.pageX;
        this.set('player.progress', this._calculateProgress(pageX));
      });
    };
    let onMouseUp = (e) => {
      Ember.run(() => {
        this.$(e.target).removeClass('focus');
        this.$(document).unbind('mousemove', onMouseMove);
        this.$(document).unbind('mouseup', onMouseUp);
      });
    };
    this.$('.thumb').on('mousedown', (e) => {
      Ember.run(() => {
        e.preventDefault();
        this.$(e.target).addClass('focus');
        this.$(document).on('mousemove', onMouseMove);
        this.$(document).on('mouseup', onMouseUp);
      });
    });

    // Handle touch thumb drag
    this.$('.thumb').on('touchstart', (e) => {
      Ember.run(() => {
        e.stopPropagation();
        this.$(e.target).addClass('focus');
      });
    });
    this.$('.thumb').on('touchmove', (e, coords) => {
      Ember.run(() => {
        let touches = e.touches === undefined ? coords.touches : e.touches;
        this.set('player.progress', this._calculateProgress(touches[0].pageX));
      });
    });
    this.$('.thumb').on('touchend', (e) => {
      Ember.run(() => {
        this.$(e.target).removeClass('focus');
      });
    });

  },
  _calculateProgress(pageX) {
    let offset = this.$('.progress-wrapper').offset();
    let width = this.$('.progress-wrapper').width();
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
      this.set('player.progress', this._calculateProgress(pageX));
    }
  }
});
