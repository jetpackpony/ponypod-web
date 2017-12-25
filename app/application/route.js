import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  navigation: Ember.inject.service(),
  player: Ember.inject.service(),
  title: (tokens) => (
    `${tokens.join(' - ')} - ${ENV.APP.appTitle}`
  ),
  actions: {
    willTransition() {
      this.set('player.showExpandedPlayer', false);
      this.set('navigation.menuOpen', false);
    }
  }
});
