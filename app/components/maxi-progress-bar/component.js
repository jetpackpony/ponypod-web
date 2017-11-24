import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['playback-progress'],
  thumbWidth: 40,
  didInsertElement() {
    this._super(...arguments);
    this.set('thumbWidth', this.$('.thumb').outerWidth());

    // Handle mouse thumb drag
    let onMouseMove = (e, coords) => {
      Ember.run(() => {
        let pageX = (e.pageX === undefined) ? coords.pageX : e.pageX;
        this.set('_updatingProgress', this._calculateProgress(pageX));
      });
    };
    let onMouseUp = (e) => {
      Ember.run(() => {
        this.$(e.target).removeClass('focus');
        this.$(document).unbind('mousemove', onMouseMove);
        this.$(document).unbind('mouseup', onMouseUp);
        this.set('player.progress', this.get('_updatingProgress'));
        this.set('_updatingProgress', false);
      });
    };
    this.$('.thumb').on('mousedown', (e, coords) => {
      Ember.run(() => {
        e.preventDefault();
        this.$(e.target).addClass('focus');
        this.$(document).on('mousemove', onMouseMove);
        this.$(document).on('mouseup', onMouseUp);
        let pageX = (e.pageX === undefined) ? coords.pageX : e.pageX;
        this.set('_updatingProgress', this._calculateProgress(pageX));
      });
    });

    // Handle touch thumb drag
    this.$('.thumb').on('touchstart', (e, coords) => {
      Ember.run(() => {
        e.stopPropagation();
        this.$(e.target).addClass('focus');
        let touches = e.touches === undefined ? coords.touches : e.touches;
        this.set('_updatingProgress', this._calculateProgress(touches[0].pageX));
      });
    });
    this.$('.thumb').on('touchmove', (e, coords) => {
      Ember.run(() => {
        let touches = e.touches === undefined ? coords.touches : e.touches;
        this.set('_updatingProgress', this._calculateProgress(touches[0].pageX));
      });
    });
    this.$('.thumb').on('touchend', (e) => {
      Ember.run(() => {
        this.$(e.target).removeClass('focus');
        this.set('player.progress', this.get('_updatingProgress'));
        this.set('_updatingProgress', false);
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
  _updatingProgress: false,
  barProgress: Ember.computed('player.progress', '_updatingProgress', function() {
    return this.get('_updatingProgress') || this.get('player.progress');
  }),
  barProgressCss: Ember.computed('barProgress', function() {
    let progress = parseInt(this.get('barProgress'), 10);
    return Ember.String.htmlSafe(`width: ${progress}%`);
  }),
  thumbPositionCss: Ember.computed('barProgress', function() {
    let prog = parseInt(this.get('barProgress'), 10);
    let width = parseInt(this.get('thumbWidth'), 10) / 2;
    return Ember.String.htmlSafe(`left: calc(${prog}% - ${width}px)`);
  }),
  thumbTime: Ember.computed('_updatingProgress', function() {
    let progress = this.get('_updatingProgress');
    let duration = this.get('player.duration');
    if (!progress) {
      return 0;
    } else {
      return Math.round(duration * progress / 100);
    }
  }),
  actions: {
    jumpTo(e, coords) {
      let pageX = (e.pageX === undefined) ? coords.pageX : e.pageX;
      this.set('player.progress', this._calculateProgress(pageX));
    }
  }
});
