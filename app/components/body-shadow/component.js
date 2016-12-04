import Ember from 'ember';

export default Ember.Component.extend({
  navigation: Ember.inject.service(),
  actions: {
    clicked() {
      this.set('navigation.menuOpen', false);
    }
  }
});
