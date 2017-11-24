import Ember from 'ember';
import ControllerWithSearchMixin from 'ponypod-frontend/mixins/controller-with-search';

export default Ember.Controller.extend(ControllerWithSearchMixin, {
  hasClickedLoadMore: false,
  searchTerm: '',
  showLoadMoreButton: Ember.computed('model.[]', {
    get() {
      return this.get('model.meta.totalPages') > 1;
    },
    set(key, value) {
      return value;
    }
  }),
  actions: {
    loadMoreClick() {
      this.toggleProperty('hasClickedLoadMore');
    }
  }
});
