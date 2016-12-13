import Ember from 'ember';

export default Ember.Service.extend({
  navBarSearch: false,
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  searchQuery: '',
  back() {
    console.log('going back');
  }
});
