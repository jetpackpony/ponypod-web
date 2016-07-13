import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | homepage');

test('should list all existing podcasts', function(assert) {
  let podcasts = server.createList('podcast', 3);

  visit('/');

  andThen(function () {
    assert.ok(podcast_exists(podcasts[0].title), 'should see "' + podcasts[0].title + '"');
    assert.ok(podcast_exists(podcasts[1].title), 'should see "' + podcasts[1].title + '"');
    assert.ok(podcast_exists(podcasts[2].title), 'should see "' + podcasts[2].title + '"');
  });
});
