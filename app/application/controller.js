import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transitionToEpisode(episode) {
      this.transitionToRoute('episode', episode);
    }
  }
});
