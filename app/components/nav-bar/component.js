import Ember from 'ember';

export default Ember.Component.extend({
  navigation: Ember.inject.service(),
  tagName: 'nav',
  actions: {
    onOpenMenuClick() {
      this.set('navigation.menuOpen', true);
    },
    onBackButtonClick() {
      this.get('navigation').back();
    }
  }
});
