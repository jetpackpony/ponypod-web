import Ember from 'ember';
import R from 'npm:ramda';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['playback-progress'],
  thumbWidth: 40,
  tmpProgress: 0,
  didInsertElement() {
    this._super(...arguments);
    this.set('thumbWidth', this.$('.thumb').outerWidth());
    // Handle mouse thumb drag
    this.$('.thumb').on('mousedown', (e) => {
      this.thumbDragStart(e);
      this.bindMouseEvents();
    });
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
    jumpTo(e) {
      this.updateTmpProgress(e);
      this.updatePlayerProgress();
    }
  },
  init() {
    this._super(...arguments);
    this.thumbMouseUp = this.thumbMouseUp.bind(this);
    this.thumbDragStart = this.thumbDragStart.bind(this);
    this.thumbDragMove = this.thumbDragMove.bind(this);
    this.thumbDragEnd = this.thumbDragEnd.bind(this);
  },
  thumbDragStart(e) {
    e.preventDefault();
    e.stopPropagation();
    this.$('.thumb').addClass('focus');
    this.thumbDragMove(e);
  },
  thumbDragMove(e) {
    this.updateTmpProgress(e);
  },
  thumbDragEnd() {
    this.$('.thumb').removeClass('focus');
    this.updatePlayerProgress();
    Ember.run.later(this, function() {
      this.updateTmpProgress({ pageX: 0 });
    }, 500);
  },
  thumbMouseUp() {
    this.thumbDragEnd();
    this.unbindMouseEvents();
  },
  updateTmpProgress(event) {
    this.set(
      'tmpProgress',
      calcProgress(
        this.$('.progress-wrapper').offset().left,
        this.$('.progress-wrapper').width(),
        getXCoordFromEvent(event)
      )
    );
  },
  updatePlayerProgress() {
    this.set('player.progress', this.get('tmpProgress'));
  },
  bindMouseEvents() {
    this.$(document).on('mousemove', this.thumbDragMove);
    this.$(document).on('mouseup', this.thumbMouseUp);
  },
  unbindMouseEvents() {
    this.$(document).unbind('mousemove', this.thumbDragMove);
    this.$(document).unbind('mouseup', this.thumbMouseUp);
  }
});

const getXCoordFromEvent = (e) => (
  ((e.touches) ? e.touches[0] : e).pageX || 0
);

const trimValue = R.curry((min, max, value) => (
  (value > max)
  ? max
  : ((value < min)
    ? min
    : value)
));

const calcProgress = (barOffset, barWidth, xCoordinate) => (
  trimValue(0, 100, (xCoordinate - barOffset) / barWidth * 100)
);
