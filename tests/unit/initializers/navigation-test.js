import Ember from 'ember';
import NavigationInitializer from 'ponypod-frontend/initializers/navigation';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | navigation', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  NavigationInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
