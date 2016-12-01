import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  backArrowButton: false,
  title: 'PonyPod',
  actions: {
    onOpenMenuClick() {
      this.get('onOpenMenuClick')();
    },
    onBackButtonClick() {
      this.get('onBackButtonClick')();
    }
  }
});
