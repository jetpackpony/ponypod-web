/* global $ */

import Ember from 'ember';

export default Ember.Controller.extend({
  menuTitle: "PonyPod",
  showBackArrow: false,
  actions: {
    back() {
      console.log('back click');
    },
    openMenu() {
      $('#app-container').addClass('menu-open');
    },
    closeMenu() {
      $('#app-container').removeClass('menu-open');
    }
  }
});

