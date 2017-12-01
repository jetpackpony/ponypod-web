import Ember from 'ember';

export function initialize(/* application */) {
  Ember.Component.reopen({
    // Allows to dynamically define a computed property
    defineComputedProperty(name, watchProps, func) {
      Ember.defineProperty(
        this,
        name,
        Ember.computed(watchProps, function() {
          return func(this.get(watchProps));
        })
      );
    }
  });
}

export default {
  initialize
};
