import Ember from 'ember';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  title: function(tokens) {
    return tokens.join(' - ') + ' - PonyPod';
  },
  actions: {
    willTransition(transition) {
      this.set('player.showExpandedPlayer', false);
    }
  }
});
