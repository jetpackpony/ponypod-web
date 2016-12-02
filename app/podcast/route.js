import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    this.set('navigation.navTitle', 'Podcast route goes here');
    this.set('navigation.showBackArrow', true);
  }
});
