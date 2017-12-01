import { getXCoordFromEvent, isTouchEvent } from './utils';

export default {
  didInsertElement() {
    this._super(...arguments);
    // Handle mouse thumb drag
    this.$('.thumb').on('mousedown', this.thumbDragStart);
    // Handle touch thumb drag
    this.$('.thumb').on('touchstart', this.thumbDragStart);
    this.$('.thumb').on('touchmove', this.thumbDragMove);
    this.$('.thumb').on('touchend', this.thumbDragEnd);
  },
  init() {
    this._super(...arguments);
    this.thumbDragStart = this.thumbDragStart.bind(this);
    this.thumbDragMove = this.thumbDragMove.bind(this);
    this.thumbDragEnd = this.thumbDragEnd.bind(this);
  },
  thumbDragStart(event) {
    Ember.run.cancel(this.resetTmpProgress);
    event.preventDefault();
    event.stopPropagation();
    this.$('.thumb').addClass('focus');
    this.thumbDragMove(event);
    if (!isTouchEvent(event)) {
      this.bindMouseEvents();
    }
  },
  thumbDragMove(event) {
    this.updateTmpProgress(getXCoordFromEvent(event));
  },
  thumbDragEnd(event) {
    this.$('.thumb').removeClass('focus');
    this.updatePlayerProgress();
    this.resetTmpProgress = Ember.run.later(this, function() {
      this.updateTmpProgress(0);
    }, 300);
    if (!isTouchEvent(event)) {
      this.unbindMouseEvents();
    }
  },
  bindMouseEvents() {
    this.$(document).on('mousemove', this.thumbDragMove);
    this.$(document).on('mouseup', this.thumbDragEnd);
  },
  unbindMouseEvents() {
    this.$(document).unbind('mousemove', this.thumbDragMove);
    this.$(document).unbind('mouseup', this.thumbDragEnd);
  }
};
