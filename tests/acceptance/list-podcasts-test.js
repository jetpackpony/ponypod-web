import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | homepage');

test('should list all existing podcasts', function(assert) {
  server.createList('podcast', 3);
  visit('/');
  andThen(function () {
    assert.equal(find('.podcast-title').length, 3, 'should see 3 podcasts');
  });
});
