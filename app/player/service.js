import Ember from 'ember';
import RSVP from 'rsvp';
import R from 'npm:ramda';
import { storageFor } from 'ember-local-storage';
import { trimValue, calcPercentage } from '../helpers/helper-functions';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  localStorage: storageFor('player'),
  rewindToTimeWhenLoaded: 0,
  currentTime: 0,
  duration: 0,
  isPlaying: false,
  showExpandedPlayer: false,
  playingEpisode: null,
  audioEventHandlers: {},
  init() {
    this._super(...arguments);
    this.generateAudioEventHandlers();
    this.initAudioElement();
    this.playEpisode = this.playEpisode.bind(this);
    this.playEpisode(this.get('localStorage.lastPlayingId'), false, false);
  },
  willDestroy() {
    this.destroyAudioElement();
  },

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
  progress: Ember.computed('currentTime', 'duration', {
    get() {
      return calcPercentage(
        this.get('currentTime'),
        this.get('duration')
      );
    },
    set(k, newValue) {
      this.set('currentTime', (newValue * this.get('duration') / 100));
      return newValue || 0;
    }
  }),
  timeToFinish: Ember.computed('currentTime', 'duration', function() {
    return this.get('duration') - this.get('currentTime');
  }),
  getAudioElement() {
    return this.get('audio');
  },
  playEpisode(episode_id, forceRewind = false, playWhenLoaded = true) {
    this.set('loading', true);
    this.set('playWhenLoaded', playWhenLoaded);
    this.getEpisode(episode_id)
      .then(
        (episode) => (
          (this.get('playingEpisode.id') === episode.id)
          ? this.playCurrentEpisode(forceRewind)
          : this.loadNewEpisode(episode, forceRewind)
        ),
        () => this.set('loading', false)
      );
  },
  play() {
    this.get('audio').play();
    this.set('isPlaying', true);
  },
  pause() {
    this.get('audio').pause();
    this.set('isPlaying', false);
  },
  jumpTo(time) {
    this.set('currentTime', time);
  },
  rewind(seconds) {
    this.jumpBy(-1 * seconds);
  },
  forward(seconds) {
    this.jumpBy(seconds);
  },

  getEpisode(episode_id) {
    return (episode_id)
      ? this.get('store').findRecord('episode', episode_id)
      : Promise.reject();
  },
  jumpBy(signedSeconds) {
    this.jumpTo(
      trimValue(
        0,
        this.get('duration'),
        this.get('currentTime') + signedSeconds
      )
    );
  },
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
  loadNewEpisode(episode, forceRewind) {
    this.set('rewindToTimeWhenLoaded',
      ((forceRewind)
        ? 0
        : this.get(`localStorage.episodes.${episode.id}.currentTime`))
    );
    this.set('playingEpisode', episode);
    this.set('duration', episode.get('duration'));
    this.set('audio.src', episode.get('mp3Link'));
    this.get('audio').load();
  },
  playCurrentEpisode(forceRewind) {
    if (forceRewind) {
      this.jumpTo(0);
    }
    this.set('loading', false);
    this.play();
  },
  initAudioElement() {
    this.set('audio', document.createElement('audio'));
    this.addAudioEventListeners();
  },
  destroyAudioElement() {
    this.removeAudioEventListeners();
    this.set('audio', null);
  },
  generateAudioEventHandlers() {
    this.audioEventHandlers = R.map(
      handlerName => this.get(handlerName).bind(this),
      audioEventHandlers
    );
  },
  addAudioEventListeners() {
    addListenersToElement(this.get('audio'), this.audioEventHandlers);
  },
  removeAudioEventListeners() {
    removeListenersFromElement(this.get('audio'), this.audioEventHandlers);
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
      this.set('rewindToTimeWhenLoaded', -1);
    }
    if (this.get('playWhenLoaded')) {
      this.play();
      this.set('playWhenLoaded', false);
    }
    this.set('loading', false);
  },
});

const audioEventHandlers = {
  'durationchange': 'audioDurationChangeHandler',
  'timeupdate': 'audioTimeUpdateHandler',
  'ended': 'audioEndedHandler',
  'canplaythrough': 'audioCanPlayThroughHandler'
};

const addListenersToElement = (element, handlers) => (
  R.forEachObjIndexed((handler, eventName) => {
    element.addEventListener(eventName, handler);
  }, handlers)
);

const removeListenersFromElement = (element, handlers) => (
  R.forEachObjIndexed((handler, eventName) => {
    element.removeEventListener(eventName, handler);
  }, handlers)
);

