import Ember from 'ember';

export default Ember.Controller.extend({
  menuTitle: "PonyPod",
  showBackArrow: true,
  actions: {
    onBackButtonClick() {
      console.log('back click');
    },
    onOpenMenuClick() {
      console.log('menu click');
    }
  }
});

