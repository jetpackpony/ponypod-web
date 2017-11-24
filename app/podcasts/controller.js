import Ember from 'ember';
import ControllerWithSearchMixin from 'ponypod-frontend/mixins/controller-with-search';

export default Ember.Controller.extend(ControllerWithSearchMixin, {
  hasClickedLoadMore: false,
  actions: {
    loadMoreClick() {
      this.toggleProperty('hasClickedLoadMore');
    }
  }
});
