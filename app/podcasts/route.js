import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.get('store').findAll('podcast');
  },
  afterModel() {
    this.set('navigation.navTitle', 'PonyPod');
    this.set('navigation.showBackArrow', false);
  }
});
