import Ember from 'ember';

export default Ember.Controller.extend({
  menuTitle: "PonyPod",
  showBackArrow: false,
  actions: {
    onBackButtonClick() {
      console.log('back click');
    },
    onOpenMenuClick() {
      console.log('menu click');
    }
  }
});

