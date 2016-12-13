import Ember from 'ember';

export default Ember.Component.extend({
  navigation: Ember.inject.service(),
  classNames: ['nav-search-wrapper'],
  actions: {
    openSearch() {
      this.$().parents('.nav-wrapper').addClass('search-open');
    },
    closeSearch() {
      this.$().parents('.nav-wrapper').removeClass('search-open');
    },
    search(e, detail) {
      let key = e.keyCode || detail.keyCode || false;
      if (key === 13) {
        this.get('navigation.search')(this.$(e.target).val());
      }
    }
  }
});
