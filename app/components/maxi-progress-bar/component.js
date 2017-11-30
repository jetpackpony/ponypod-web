import Ember from 'ember';
import R from 'npm:ramda';
import { trimValue, calcPercentage } from '../../helpers/helper-functions';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['playback-progress'],
  thumbWidth: 40,
  tmpProgress: 0,
  didInsertElement() {
    this._super(...arguments);
    this.set('thumbWidth', this.$('.thumb').outerWidth());
    // Handle mouse thumb drag
    this.$('.thumb').on('mousedown', this.thumbDragStart);
    // Handle touch thumb drag
    this.$('.thumb').on('touchstart', this.thumbDragStart);
    this.$('.thumb').on('touchmove', this.thumbDragMove);
    this.$('.thumb').on('touchend', this.thumbDragEnd);
  },
  barProgress: Ember.computedWithProps(
    'tmpProgress',
    'player.progress',
    (tmpProgress, playerProgress) => tmpProgress || playerProgress
  ),
  barProgressCss: Ember.computedWithProps(
    'barProgress',
    (progress) => Ember.String.htmlSafe(`width: ${progress}%`)
  ),
  thumbPositionCss: Ember.computedWithProps(
    'barProgress',
    'thumbWidth',
    (progress, thumbWidth) => Ember.String.htmlSafe(
      `left: calc(${progress}% - ${thumbWidth / 2}px)`
    )
  ),
  thumbTime: Ember.computedWithProps(
    'tmpProgress',
    'player.duration',
    (progress, duration) => Math.round(progress * duration / 100)
  ),
  actions: {
    jumpTo(event) {
      this.updateTmpProgress(getXCoordFromEvent(event));
      this.updatePlayerProgress();
      this.updateTmpProgress(0);
    }
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
  updateTmpProgress(xCoordinate) {
    this.set(
      'tmpProgress',
      calcProgress(
        this.$('.progress-wrapper').offset().left,
        this.$('.progress-wrapper').width(),
        xCoordinate
      )
    );
  },
  updatePlayerProgress() {
    this.set('player.progress', this.get('tmpProgress'));
  },
  bindMouseEvents() {
    this.$(document).on('mousemove', this.thumbDragMove);
    this.$(document).on('mouseup', this.thumbDragEnd);
  },
  unbindMouseEvents() {
    this.$(document).unbind('mousemove', this.thumbDragMove);
    this.$(document).unbind('mouseup', this.thumbDragEnd);
  }
});

const isTouchEvent = (event) => !R.isNil(event.touches);

const getXCoordFromEvent = (event) => (
  ((event.touches) ? event.touches[0] : event).pageX || 0
);

const calcProgress = (barOffset, barWidth, xCoordinate) => (
  calcPercentage(xCoordinate - barOffset, barWidth)
);
