import Ember from 'ember';
import R from 'npm:ramda';

export function initialize(/* application */) {
  Ember.computedWithProps = (...args) => (
    (
      (props, [func]) => Ember.computed(...props, function() {
        return func.apply(this, props.map(prop => this.get(prop)));
      })
    )(...R.splitAt(args.length - 1, args))
  );
}

export default {
  initialize
};
