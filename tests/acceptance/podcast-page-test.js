import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | podcast page');

test('should show the title of the podcast', (assert) => {
  let podcast = server.create('podcast', { title: 'Hello Internet' });
  visitPodcast(podcast);

  andThen(function () {
    assert.ok(podcastExists('Hello Internet'), 'should see "Hello Internet"');
  });
});

test('should list all episodes of a podcast', function(assert) {
  let podcast = server.create('podcast');
  let episodes = server.createList('episode', 3, {podcast});

  visitPodcast(podcast);

  andThen(function () {
    assert.ok(episodeExists(episodes[0].title), 'should see "' + episodes[0].title + '"');
    assert.ok(episodeExists(episodes[1].title), 'should see "' + episodes[1].title + '"');
    assert.ok(episodeExists(episodes[2].title), 'should see "' + episodes[2].title + '"');
  });
});
