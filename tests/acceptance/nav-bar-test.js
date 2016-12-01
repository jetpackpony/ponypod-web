import { skip, test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | nav bar');

test('is displayed', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('nav').length, 1, 'should display navbar');
  });
});

skip('shows hamburger button when on home page');
skip('shows back arrow button when not on home page');

