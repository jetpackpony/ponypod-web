import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['podcast-details'],
  showSummary: true,
  actions: {
    toggleDescription() {
      this.toggleProperty('showSummary');
    }
  }
});
