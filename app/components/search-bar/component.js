import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['nav-search-wrapper'],
  actions: {
    openSearch() {
      this.$().parents('.nav-wrapper').addClass('search-open');
    },
    closeSearch() {
      this.$().parents('.nav-wrapper').removeClass('search-open');
    }
  }
});
