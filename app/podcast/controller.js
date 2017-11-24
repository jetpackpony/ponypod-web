import Ember from 'ember';
import ControllerWithSearchMixin from 'ponypod-frontend/mixins/controller-with-search';

export default Ember.Controller.extend(ControllerWithSearchMixin, {
  hasClickedLoadMore: false,
  searchTerm: '',
  showLoadMoreButton: Ember.computed('model.episodes.[]', function() {
    return this.get('model.episodes.meta.totalPages') > 1;
  }),
  showZeroResults: Ember.computed('model.episodes.[]', function() {
    return this.get('model.episodes.length') === 0;
  }),
  actions: {
    loadMoreClick() {
      this.toggleProperty('hasClickedLoadMore');
    }
  }
});
