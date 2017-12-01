import Component from '@ember/component';

export default Component.extend({
  hasClickedLoadMore: false,
  showLoadMoreButton: Ember.computed('model.[]', function() {
    return this.get('model.meta.totalPages') > 1;
  }),
  actions: {
    loadMoreClick() {
      this.toggleProperty('hasClickedLoadMore');
    },
    infinityLoad(model) {
      this.sendAction('infinityLoad', model);
    }
  }
});
