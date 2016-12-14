import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel(transition) {
    this.set('navigation.navBarSearch', true);
    let search = transition.queryParams.search;
    if (search) {
      this.set('navigation.searchQuery', search);
      this.set('navigation.searchOpen', true);
    }
  },
  actions: {
    willTransition(transition) {
      if (transition.targetName !== this.routeName) {
        this.set('navigation.searchQuery', '');
        this.set('navigation.searchOpen', false);
      }
    }
  }
});
