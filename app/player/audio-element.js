import R from 'npm:ramda';

export default {
  audioEventHandlers: {},
  init() {
    this._super(...arguments);
    this.generateAudioEventHandlers();
    this.initAudioElement();
  },
  willDestroy() {
    this.destroyAudioElement();
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
  }
};

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
