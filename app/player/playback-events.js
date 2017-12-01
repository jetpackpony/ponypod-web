import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default {
  localStorage: storageFor('player'),
  currentTime: 0,
  duration: 0,
  onCurrentTimeChanged: Ember.observer('currentTime', function() {
    this.syncCurrentTime(
      this.get('currentTime'),
      this.get('audio').currentTime
    );
    this.saveEpisodeProgress(
      this.get('playingEpisode.id'),
      this.get('currentTime'),
      this.get('duration')
    );
  }),
  syncCurrentTime(pos, audioPos) {
    if (Math.round(pos) !== Math.round(audioPos)) {
      this.get('audio').currentTime = pos;
    }
  },
  saveEpisodeProgress(id, currentTime, duration) {
    this.set('localStorage.lastPlayingId', id);
    this.set(`localStorage.episodes.${id}`, {
      episodeId: id,
      currentTime,
      duration
    });
  },
  audioDurationChangeHandler(event) {
    this.set('duration', event.target.duration || event.detail || 0);
  },
  audioTimeUpdateHandler(event) {
    let newTime = event.target.currentTime || event.detail || 0;
    if (this.get('currentTime') !== newTime && newTime !== 0) {
      this.set('currentTime', newTime);
    }
  },
  audioEndedHandler() {
    this.set('isPlaying', false);
  },
  audioCanPlayThroughHandler() {
    if (this.get('rewindToTimeWhenLoaded') > -1) {
      this.set('currentTime', this.get('rewindToTimeWhenLoaded'));
    }
    if (this.get('playWhenLoaded')) {
      this.play();
    }
    this.set('rewindToTimeWhenLoaded', -1);
    this.set('playWhenLoaded', false);
    this.set('loading', false);
  }
};
