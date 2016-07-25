import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';
import podcastPage from '../helpers/pages/podcast-page';

moduleForAcceptance('Acceptance | podcast page');

test('should show the title of the podcast', (assert) => {
  let podcast = server.create('podcast', { title: 'Hello Internet' });
  podcastPage.visit(podcast);

  andThen(function () {
    assert.ok(podcastPage.hasPodcast('Hello Internet'), 'should see "Hello Internet"');
  });
});

test('should list all episodes of a podcast', (assert) => {
  let podcast = server.create('podcast');
  let episodes = server.createList('episode', 3, {podcast});

  podcastPage.visit(podcast);

  andThen(() => {
    assert.ok(podcastPage.hasEpisode(episodes[0].title), 'should see "' + episodes[0].title + '"');
    assert.ok(podcastPage.hasEpisode(episodes[1].title), 'should see "' + episodes[1].title + '"');
    assert.ok(podcastPage.hasEpisode(episodes[2].title), 'should see "' + episodes[2].title + '"');
  });
});

test('should not list episodes of other podcasts', (assert) => {
  let podcast = server.create('podcast');
  let other_podcast = server.create('podcast');
  let episodes = server.createList('episode', 3, {podcast});

  podcastPage.visit(other_podcast);

  andThen(function () {
    assert.notOk(podcastPage.hasEpisode(episodes[0].title), 'should not see "' + episodes[0].title + '"');
    assert.notOk(podcastPage.hasEpisode(episodes[1].title), 'should not see "' + episodes[1].title + '"');
    assert.notOk(podcastPage.hasEpisode(episodes[2].title), 'should not see "' + episodes[2].title + '"');
  });
});

