import Ember from 'ember';
import { getXCoordFromEvent, calcProgress } from './utils';
import eventListeners from './event-listeners';

export default Ember.Component.extend(
  eventListeners,
  {
    player: Ember.inject.service(),
    classNames: ['playback-progress'],
    thumbWidth: 40,
    tmpProgress: 0,
    didInsertElement() {
      this._super(...arguments);
      this.set('thumbWidth', this.$('.thumb').outerWidth());
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
  }
);
