import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

const eventHandlers = {
  'durationchange': function(service, e) {
    let newDur = e.target.duration || e.detail || 0;
    service.set('duration', newDur);
  },
  'timeupdate': function(service, e) {
    let newPos = e.target.currentTime || e.detail || 0;
    if (service.get('position') !== newPos) {
      service.set('position', newPos);
    }
  },
  'ended': function(service) {
    service.set('isPlaying', false);
  },
  'canplaythrough': function(service) {
    if (service.get('rewindToPositionWhenLoaded') > -1) {
      service.set('position', service.get('rewindToPositionWhenLoaded'));
      service.set('rewindToPositionWhenLoaded', -1);
    }
    if (service.get('playWhenLoaded')) {
      service.play();
      service.set('playWhenLoaded', false);
    }
    this.set('loading', false);
  }
};

export default Ember.Service.extend({
  store: Ember.inject.service(),
  localStorage: storageFor('player'),
  rewindToPositionWhenLoaded: 0,
  position: 0,
  duration: 0,
  isPlaying: false,
  showExpandedPlayer: false,
  _handlers: {},
  _addListeners() {
    Object.keys(eventHandlers).forEach((event) => {
      this._handlers[event] = (...args) => {
        Ember.run(() => {
          return eventHandlers[event].call(this, this, ...args);
        });
      };
      this.get('audio').addEventListener(event, this._handlers[event]);
    });
  },
  _removeListeners() {
    if (typeof(this.get('audio').removeEventListener) === 'function') {
      Object.keys(eventHandlers).forEach((event) => {
        this.get('audio').removeEventListener(event, this._handlers[event]);
      });
    }
  },
  _savePlayerState() {
    let id = this.get('playingEpisode.id');
    this.set('localStorage.lastPlayingId', id);
    this.set(`localStorage.episodes.${id}`, {
      episodeId: id,
      position: this.get('position')
    });
  },
  init() {
    this.playNewEpisode = this.playNewEpisode.bind(this);
    if (!this.get('audio')) {
      this.set('audio', document.createElement('audio'));
      this._addListeners();
    }

    // Load the episode if any is stored in localstorage
    let lastPlayingId = this.get('localStorage.lastPlayingId');
    if (lastPlayingId) {
      this.set('loading', true);
      this.get('store')
        .findRecord('episode', lastPlayingId)
        .then((episode) => {
          this.set('playWhenLoaded', false);
          this.set('rewindToPositionWhenLoaded', this._getEpisodePosition(lastPlayingId));
          this._setupEpisode(episode);
        });
    }
  },
  willDestroy() {
    this._removeListeners();
    this.set('audio', null);
  },
  playingEpisode: null,
  _setupEpisode(ep, position) {
    this.set('playingEpisode', ep);
    this.set('duration', ep.get('duration'));
    this.set('audio.src', ep.get('mp3Link'));
    this.get('audio').load();
  },
  onPositionChanged: Ember.observer('position', function() {
    let pos = this.get('position');
    let audioPos = this.get('audio').currentTime;
    if (Math.round(pos) !== Math.round(audioPos)) {
      this.get('audio').currentTime = pos;
    }
    this._savePlayerState();
  }),
  playNewEpisode(episode) {
    if (episode.id !== this.get('playingEpisode.id')) {
      this.set('loading', true);
      this.set('playWhenLoaded', true);
      this.set('rewindToPositionWhenLoaded', this._getEpisodePosition(episode.id));
      this._setupEpisode(episode);
    } else {
      if (!this.get('loading')) {
        this.play();
      }
    }
  },
  _getEpisodePosition(id) {
    return this.get(`localStorage.episodes.${id}.position`) || 0;
  },

  progress: Ember.computed('position', 'duration', {
    get() {
      let pos = this.get('position') || 0;
      let dur = this.get('duration') || 1;
      return pos / dur * 100;
    },
    set(k, val) {
      let dur = this.get('duration');
      this.set('position', val * dur / 100);
      return val || 0;
    }
  }),

  timeToFinish: Ember.computed('position', 'duration', function() {
    return this.get('duration') - this.get('position');
  }),
  getAudioElement() {
    return this.get('audio');
  },

  play() {
    this.get('audio').play();
    this.set('isPlaying', true);
  },
  pause() {
    this.get('audio').pause();
    this.set('isPlaying', false);
  },
  jumpTo(position) {
    this.set('position', position);
  },
  rewind(seconds) {
    let newPos = this.get('audio').currentTime - seconds;
    newPos = newPos > 0 ? newPos : 0;
    this.jumpTo(newPos);
  },
  forward(seconds) {
    let newPos = this.get('audio').currentTime + seconds;
    newPos = newPos < this.get('duration') ? newPos : this.get('duration');
    this.jumpTo(newPos);
  }
});
