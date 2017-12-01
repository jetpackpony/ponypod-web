import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  menuOpen: false,
  navTitle: ENV.APP.appTitle,
  showBackArrow: false,
  searchQuery: '',
  searchOpen: false,
  navBarSearch: false,
  back() {
    window.history.back();
  }
});
