import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service(),
  classNames: ['playback-progress'],
  actions: {
    jumpTo(event) {

    }
  }
});
