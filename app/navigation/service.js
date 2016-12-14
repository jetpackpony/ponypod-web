import Ember from 'ember';

export default Ember.Service.extend({
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  searchQuery: '',
  searchOpen: false,
  navBarSearch: false,
  back() {
    console.log('going back');
  }
});
