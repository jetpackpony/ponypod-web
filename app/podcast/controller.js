import Ember from 'ember';
import ControllerWithSearchMixin from 'ponypod-frontend/mixins/controller-with-search';

export default Ember.Controller.extend(ControllerWithSearchMixin, {
  episodes: Ember.A([]),
  showZeroResults: Ember.computed('episodes.[]', function() {
    return this.get('episodes.length') === 0;
  })
});
