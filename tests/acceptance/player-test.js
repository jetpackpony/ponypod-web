/* global server */

import Ember from 'ember';
import { test } from 'qunit';
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


test('start playback of a chosen episode', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast, file: '/audio/testing.mp3' });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  andThen(() => {
    let audio = find('audio')[0];
    assert.ok(audio, 'audio tag should exist');
    assert.equal(audio.src, 'http://localhost:7357/audio/testing.mp3', 'audio should be setup to episode');
    assert.notOk(audio.paused, 'audio should not be paused');
  });
});

test('pauses the playback when click pause', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast, file: '/audio/testing.mp3' });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  click('.episode a.play-button.pause');
  andThen(() => {
    let audio = find('audio')[0];
    assert.ok(audio.paused, 'audio should be paused');
  });
});

test('pauses the playback when hit pause on maxi player', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast, file: '/audio/testing.mp3' });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  click('.mini-player a.expand-player');
  click('.maxi-player .controls a.pause');
  andThen(() => {
    let audio = find('audio')[0];
    assert.ok(audio.paused, 'audio should be paused');
  });
});

test('forwards 30s when forward button clicked', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast, file: '/audio/testing.mp3' });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  click('.mini-player a.expand-player');
  click('.maxi-player .controls a.forward');
  andThen(() => {
    let audioTime = Math.round(find('audio')[0].currentTime);
    assert.ok(audioTime === 30, 'audio should be paused');
  });
});

test('rewinds 10s when rewind button clicked', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast, file: '/audio/testing.mp3' });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  click('.mini-player a.expand-player');
  click('.maxi-player .controls a.forward');
  click('.maxi-player .controls a.rewind');
  andThen(() => {
    let audioTime = Math.round(find('audio')[0].currentTime);
    assert.ok(audioTime === 20, 'audio should be paused');
  });
});

test('jumps to the middle when click on me progress bar', function(assert) {
  assert.expect(1);
  let podcast = server.create('podcast');
  server.create('episode', { podcast, file: '/audio/testing.mp3' });
  visit('/podcast/1');
  click('.episode a.play-button.play');
  click('.mini-player a.expand-player');
  andThen(() => {
    Ember.run.later(() => {
      let progress = $('.maxi-player .progress-wrapper');
      let x = progress.width() * 0.5 + progress.offset().left;
      let y = progress.height() / 2 + progress.offset().top;
      progress.trigger('click', { pageX: x, pageY: y });
    }, 2000);
  });
  andThen(() => {
    Ember.run.later(() => {
      let audioTime = Math.round(find('audio')[0].currentTime);
      let duration = find('audio')[0].duration;
      let diff = Math.abs(audioTime - duration / 2);
      assert.ok(diff < 4, 'time should be half of duration');
    }, 1000);
  });
});
