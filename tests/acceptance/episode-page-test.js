import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';
import episodePage from '../helpers/pages/episode-page';

moduleForAcceptance('Acceptance | episode page');

test('should show the correct episode page', function(assert) {
  let podcast = server.create('podcast', {title: "Hello Internet"});
  let episode = server.create('episode', {podcast, title: "Nerds talking"});

  episodePage.visit(episode);

  andThen(() => {
    assert.ok(episodePage.hasPodcast(podcast.title), 'should see "Hello Internet"');
    assert.ok(episodePage.hasEpisode(episode.title), 'should see "Nerds Talking"');
  });
});
