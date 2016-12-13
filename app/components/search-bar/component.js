import Ember from 'ember';

export default Ember.Component.extend({
  navigation: Ember.inject.service(),
  classNames: ['nav-search-wrapper'],
  didInsertElement() {
    this._super(...arguments);
    if (this.get('navigation.searchQuery')) {
      this.$().parents('.nav-wrapper').addClass('search-open');
    }
  },
  actions: {
    openSearch() {
      this.$().parents('.nav-wrapper').addClass('search-open');
      this.$('input#search').focus();
    },
    closeSearch() {
      this.set('navigation.searchQuery', '');
      this.$().parents('.nav-wrapper').removeClass('search-open');
    }
  }
});
