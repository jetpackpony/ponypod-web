import Ember from 'ember';

export default Ember.Component.extend({
  navigation: Ember.inject.service(),
  classNames: ['nav-search-wrapper'],
  didInsertElement() {
    this._super(...arguments);
    if (this.get('navigation.searchOpen')) {
      this._openSearch();
    }
  },
  onStateChange: Ember.observer('navigation.searchOpen', function() {
    if (this.get('navigation.searchOpen')) {
      this._openSearch();
    } else {
      this._closeSearch();
      this.set('navigation.searchQuery', '');
    }
  }),
  _openSearch() {
    this.$().parents('.nav-wrapper').addClass('search-open');
    this.$('input#search').focus();
  },
  _closeSearch() {
    this.$().parents('.nav-wrapper').removeClass('search-open');
  },
  actions: {
    openSearch() {
      this.set('navigation.searchOpen', true);
    },
    closeSearch() {
      this.set('navigation.searchOpen', false);
    }
  }
});
