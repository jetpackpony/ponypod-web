import Ember from 'ember';

export default Ember.Component.extend({
  navigation: Ember.inject.service(),
  classNames: ['nav-search-wrapper'],
  didInsertElement() {
    this._super(...arguments);
    if (this.get('navigation.searchOpen')) {
      this.openSearchBar();
    }
  },
  onStateChange: Ember.observer('navigation.searchOpen', function() {
    (this.get('navigation.searchOpen'))
      ? this.openSearchBar()
      : (
        this.closeSearchBar(),
        this.set('navigation.searchQuery', '')
      );
  }),
  actions: {
    openSearch() {
      this.set('navigation.searchOpen', true);
    },
    closeSearch() {
      this.set('navigation.searchOpen', false);
    }
  },
  openSearchBar() {
    this.$().parents('.nav-wrapper').addClass('search-open');
    this.$('input#search').focus();
  },
  closeSearchBar() {
    this.$().parents('.nav-wrapper').removeClass('search-open');
  },
});
