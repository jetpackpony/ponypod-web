import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | episode page');

test('should show the correct episode page', function(assert) {
  let podcast = server.create('podcast', {title: "Hello Internet"});
  let episode = server.create('episode', {podcast, title: "Nerds talking"});

  visit_episode(episode);

  andThen(() => {
    assert.ok(podcast_exists(podcast.title), 'should see "Hello Internet"');
    assert.ok(episode_exists(episode.title), 'should see "Nerds Talking"');
  });
});
