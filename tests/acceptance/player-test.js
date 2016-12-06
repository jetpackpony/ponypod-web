/* global server */

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
  server.create('episode', {
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

test('expand to maxi player when expand button clicked', function(assert) {
  server.create('episode');
  visit('/episode/1');
  click('.episode-details a.play');
  click('#player .expand-player');
  andThen(() => {
    let miniPlayer = find('.mini-player:visible');
    let maxiPlayer = find('.maxi-player:visible');
    assert.equal(maxiPlayer.length, 1, 'maxi player is not visible');
    assert.equal(miniPlayer.length, 0, 'mini player should not visible');
  });
});

test('collapse to mini player when collapse button clicked', function(assert) {
  server.create('episode');
  visit('/episode/1');
  click('.episode-details a.play');
  click('#player .expand-player');
  click('#player .collapse-player');
  andThen(() => {
    let miniPlayer = find('.mini-player:visible');
    let maxiPlayer = find('.maxi-player:visible');
    assert.equal(maxiPlayer.length, 0, 'maxi player should not be visible');
    assert.equal(miniPlayer.length, 1, 'mini player is not visible');
  });
});

test('shows correct info on maxi player', function(assert) {
  let podcast = server.create('podcast', { image: 'testme.png' });
  server.create('episode', {
    podcast,
    title: 'Testme',
    pubDate: new Date("Mon, 4 Nov 2016 9:57:12 +0000"),
    duration: 7000,
    summary: 'testme summary'
  });
  visit('/episode/1');
  click('.episode-details a.play');
  click('#player .expand-player');
  andThen(() => {
    let title = find('.maxi-player .title h2:visible').text().trim();
    let date = find('.maxi-player .date:visible').text().trim();
    let duration = find('.maxi-player .duration:visible').text().trim();
    let summary = find('.maxi-player .description p:visible').text().trim();
    assert.equal(title, 'Testme', 'title should match');
    assert.equal(date, '4 Nov 2016', 'date should match');
    assert.equal(duration, '1 hour 57 minutes', 'duration should match');
    assert.equal(summary, 'testme summary', 'summary should match');
  });
});

test('goes to an episode page when click read more', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  click('#player .expand-player');
  click('#player .description .actions a');
  andThen(() => {
    let maxi = find('.maxi-player:visible').length === 0;
    assert.ok(maxi, 'should not show maxi player');
    assert.equal(currentURL(), '/episode/1', 'should be on episode page');
  });
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
