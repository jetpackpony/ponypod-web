import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | podcast page');

test('should show the title of the podcast', (assert) => {
  let podcast = server.create('podcast', { title: 'Hello Internet' });
  visit_podcast(podcast);

  andThen(function () {
    assert.ok(podcast_exists('Hello Internet'), 'should see "Hello Internet"');
  });
});

test('should list all episodes of a podcast', (assert) => {
  let podcast = server.create('podcast');
  let episodes = server.createList('episode', 3, {podcast});

  visit_podcast(podcast);

  andThen(() => {
    assert.ok(episode_exists(episodes[0].title), 'should see "' + episodes[0].title + '"');
    assert.ok(episode_exists(episodes[1].title), 'should see "' + episodes[1].title + '"');
    assert.ok(episode_exists(episodes[2].title), 'should see "' + episodes[2].title + '"');
  });
});

test('should not list episodes of other podcasts', (assert) => {
  let podcast = server.create('podcast');
  let other_podcast = server.create('podcast');
  let episodes = server.createList('episode', 3, {podcast});

  visit_podcast(other_podcast);

  andThen(function () {
    assert.notOk(episode_exists(episodes[0].title), 'should not see "' + episodes[0].title + '"');
    assert.notOk(episode_exists(episodes[1].title), 'should not see "' + episodes[1].title + '"');
    assert.notOk(episode_exists(episodes[2].title), 'should not see "' + episodes[2].title + '"');
  });
});

