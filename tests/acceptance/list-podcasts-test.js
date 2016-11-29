import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list podcasts');

test('should redirect to podcasts route', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(currentURL(), '/podcasts', 'should redirect');
  });
});

test('should show all the podcasts', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(find('.podcast').length, 3, 'should see 3 podcasts');
  });
});

test('should link to a podcast page', function(assert) {
  visit('/');
  click('#podcast-2 a');
  andThen(() => {
    assert.equal(currentURL(), '/podcasts/2', 'should be on a podcast page');
  });
});
