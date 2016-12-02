/* global $ */

import Ember from 'ember';

export default Ember.Controller.extend({
  menuTitle: "PonyPod",
  menuOpen: false,
  showBackArrow: false,
  actions: {
    back() {
      console.log('back click');
    },
    openMenu() {
      this.set('menuOpen', true);
    },
    closeMenu() {
      this.set('menuOpen', false);
    }
  }
});

