import Ember from 'ember';
import audioElement from './audio-element';
import playbackEvents from './playback-events';
import loadEpisode from './load-episode';
import publicFunctions from './public-functions';

export default Ember.Service.extend(
  audioElement,
  playbackEvents,
  loadEpisode,
  publicFunctions
);

