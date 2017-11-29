import Ember from 'ember';
import ControllerWithSearchMixin from '../mixins/controller-with-search';

export default Ember.Controller.extend(ControllerWithSearchMixin, {
  episodes: Ember.A([]),
  isEpisodeListEmpty: Ember.computed('episodes.[]', function() {
    return this.get('episodes.length') === 0;
  })
});
