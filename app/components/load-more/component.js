import Component from '@ember/component';

export default Component.extend({
  hasClickedLoadMore: false,
  showLoadMoreButton: Ember.computed(
    'model.[]',
    'showSearchSpinner',
    function() {
      return this.get('model.meta.totalPages') > 1
        && !this.get('showSearchSpinner');
    }
  ),
  actions: {
    loadMoreClick() {
      this.toggleProperty('hasClickedLoadMore');
    },
    infinityLoad(model) {
      this.sendAction('infinityLoad', model);
    }
  }
});
