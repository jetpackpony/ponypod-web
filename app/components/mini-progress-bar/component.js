import Component from '@ember/component';

export default Component.extend({
  progressCss: Ember.computed('progress', function() {
    return Ember.String.htmlSafe(`width: ${this.get('progress')}%`);
  })
});
