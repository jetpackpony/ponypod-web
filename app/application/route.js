import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  player: Ember.inject.service(),
  title: (tokens) => (
    `${tokens.join(' - ')} - ${ENV.APP.appTitle}`
  ),
  actions: {
    willTransition() {
      this.set('player.showExpandedPlayer', false);
    }
  }
});
