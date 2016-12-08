import Ember from 'ember';

export default Ember.Service.extend({
  position: 0,
  duration: 0,
  isPlaying: false,
  showExpandedPlayer: false,
  _handlers: {},
  _durationChangeHandler(e) {
    Ember.run(() => {
      let newDur = e.target.duration || e.detail || 0;
      this.set('duration', newDur);
    });
  },
  _timeUpdateHandler(e) {
    Ember.run(() => {
      let newPos = e.target.currentTime || e.detail || 0;
      this.set('position', newPos);
    });
  },
  _endedHandler() {
    Ember.run(() => {
      this.set('isPlaying', false);
    });
  },
  init() {
    let h = this._handlers;
    h['durationchange'] = this._durationChangeHandler.bind(this);
    h['timeupdate'] = this._timeUpdateHandler.bind(this);
    h['ended'] = this._endedHandler.bind(this);
    let audio = this.get('audio');
    if (!audio) {
      this.set('audio', document.createElement('audio'));
      this.get('audio').addEventListener('durationchange', h['durationchange']);
      this.get('audio').addEventListener('timeupdate', h['timeupdate']);
      this.get('audio').addEventListener('ended', h['ended']);
    }
  },
  willDestroy() {
    let h = this._handlers;
    let audio = this.get('audio');
    if (typeof(audio.removeEventListener) === 'function') {
      this.get('audio').removeEventListener('durationchange', h['durationchange']);
      this.get('audio').removeEventListener('timeupdate', h['timeupdate']);
      this.get('audio').removeEventListener('ended', h['ended']);
    }
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
