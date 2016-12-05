import { skip, test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | player');

test('open mini player with episode', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  andThen(() => {
    let miniPlayer = find('.mini-player:visible');
    assert.equal(miniPlayer.length, 1, 'mini player is not visible');
  });
});

test('open mini player when click play on episode page', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast });
  visit('/episode/1');
  click('.episode-details a.play');
  andThen(() => {
    let miniPlayer = find('.mini-player:visible');
    assert.equal(miniPlayer.length, 1, 'mini player is not visible');
  });
});

test('player shows correct episode info', function(assert) {
  let podcast = server.create('podcast', { image: 'testme.png' });
  let ep = server.create('episode', {
    podcast,
    title: 'Testme',
    pubDate: new Date("Mon, 4 Nov 2016 9:57:12 +0000")
  });
  visit('/episode/1');
  click('.episode-details a.play');
  andThen(() => {
    let title = find('.mini-player .title span').text().trim();
    let date = find('.mini-player .title .secondary').text().trim();
    assert.equal(title, 'Testme', 'title doesn\'t match');
    assert.equal(date, '4 Nov 2016', 'date doesn\'t match');
  });
});

skip('expand to maxi player when expand button clicked', function(assert) {
});

skip('collapse to mini player when collapse button clicked', function(assert) {
});

skip('shows correct info on maxi player', function(assert) {
});

skip('shows correct description on maxi player', function(assert) {
});

skip('goes to an episode page when click read more', function(assert) {
});


/* Playback things */


skip('start playback of a chosen episode', function(assert) {
});

skip('pauses the playback when click pause', function(assert) {
});

skip('pauses the playback when hit pause on maxi player', function(assert) {
});

skip('rewinds 10s when rewind button clicked', function(assert) {
});

skip('forwards 30s when forward button clicked', function(assert) {
});
