import Ember from 'ember';

const eventHandlers = {
  'durationchange': function(service, e) {
    let newDur = e.target.duration || e.detail || 0;
    service.set('duration', newDur);
  },
  'timeupdate': function(service, e) {
    let newPos = e.target.currentTime || e.detail || 0;
    service.set('position', newPos);
  },
  'ended': function(service) {
    service.set('isPlaying', false);
  }
};

export default Ember.Service.extend({
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
  init() {
    if (!this.get('audio')) {
      this.set('audio', document.createElement('audio'));
      this._addListeners();
    }
  },
  willDestroy() {
    this._removeListeners();
    this.set('audio', null);
  },
  playingEpisode: null,
  onEpisodeChange: Ember.observer('playingEpisode', function() {
    let ep = this.get('playingEpisode');
    this.set('duration', ep.get('duration'));
    this.set('audio.src', ep.get('file'));
    this.get('audio').load();
    this.play();
  }),

  progress: Ember.computed('position', 'duration', {
    get() {
      let pos = this.get('position');
      let dur = this.get('duration');
      return pos / dur * 100;
    },
    set(k, val) {
      let dur = this.get('duration');
      this.get('audio').currentTime = val * dur / 100;
      return val;
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
    this.get('audio').currentTime = position;
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
