import Ember from 'ember';
import ControllerWithSearchMixin from 'ponypod-frontend/mixins/controller-with-search';

export default Ember.Controller.extend(ControllerWithSearchMixin, {
  hasClickedLoadMore: false,
  episodes: Ember.A([]),
  showLoadMoreButton: Ember.computed('episodes.[]', {
    get() {
      return this.get('episodes.meta.totalPages') > 1;
    },
    set(key, value) {
      return value;
    }
  }),
  showZeroResults: Ember.computed('episodes.[]', function() {
    return this.get('episodes.length') === 0;
  }),
  actions: {
    loadMoreClick() {
      this.toggleProperty('hasClickedLoadMore');
    }
  }
});
