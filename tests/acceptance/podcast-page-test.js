import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | podcast page');

test('should list all episodes of a podcast', function(assert) {
  let podcast = server.create('podcast');
  server.createList('episode', 3, {podcast});

  visit('/podcasts/' + podcast.id);

  andThen(function () {
    assert.equal(find('.episode-title').length, 3, 'should see 3 episodes');
  });
});
