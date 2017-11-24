import Ember from 'ember';
import ControllerWithSearchMixin from 'ponypod-frontend/mixins/controller-with-search';

export default Ember.Controller.extend(ControllerWithSearchMixin, {
  hasClickedLoadMore: false,
  searchTerm: '',
  showLoadMoreButton: Ember.computed('model.[]', function() {
    return this.get('model.meta.totalPages') > 1;
  }),
  actions: {
    loadMoreClick() {
      this.toggleProperty('hasClickedLoadMore');
    }
  }
});
