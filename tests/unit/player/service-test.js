/* global CustomEvent */

import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:player', 'Unit | Service | player', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it creates an audio html element', function(assert) {
  let service = this.subject();
  service.getAudioElement();
  let audio = service.get('audio');
  assert.equal(audio.nodeName, 'AUDIO', 'should create an audio element');
});

test('it starts the playback when playingEpisode is set', function(assert) {
  assert.expect(3);
  let service = this.subject({
    audio: {
      load() {
        assert.ok(true, 'load should be called');
      },
      play() {
        assert.ok(true, 'load should be called');
      }
    }
  });
  service.set('playingEpisode', Ember.Object.create({ file: "testme.mp3" }));
  let src = service.get('audio').src;
  assert.equal(src, "testme.mp3");
});

test('it pauses the playback when pause is called', function(assert) {
  assert.expect(1);
  let service = this.subject({
    audio: {
      pause() {
        assert.ok(true, 'pause should be called');
      }
    }
  });
  service.pause();
});

test('it starts the playback when play is called', function(assert) {
  assert.expect(1);
  let service = this.subject({
    audio: {
      play() {
        assert.ok(true, 'play should be called');
      }
    }
  });
  service.play();
});

test('it jumps to the set time when jumpTo is called', function(assert) {
  assert.expect(1);
  let service = this.subject({
    audio: {
      currentTime: 0
    }
  });
  service.jumpTo(123);
  let time = service.get('audio').currentTime;
  assert.equal(time, 123, 'audio\'s currentTime should match');
});

test('it rewinds the playback when rewind is called', function(assert) {
  assert.expect(1);
  let service = this.subject({
    audio: {
      currentTime: 30
    }
  });
  service.rewind(10);
  let time = service.get('audio').currentTime;
  assert.equal(time, 20, 'audio\'s currentTime should match');
});

test('it forwards the playback when forward is called', function(assert) {
  assert.expect(1);
  let service = this.subject({
    audio: {
      currentTime: 30
    },
    duration: 100
  });
  service.forward(30);
  let time = service.get('audio').currentTime;
  assert.equal(time, 60, 'audio\'s currentTime should match');
});

test('it calculates the progress properly', function(assert) {
  let service = this.subject({
    position: 25,
    duration: 50
  });
  let progress = service.get('progress');
  assert.equal(progress, 50, 'should calculate the progress');
});

test('it jumps to set progress % when progress is set', function(assert) {
  let service = this.subject({
    audio: { currentTime: 0 },
    position: 25,
    duration: 50
  });
  service.set('progress', 20);
  let progress = service.get('progress');
  let position = service.get('audio').currentTime;
  assert.equal(progress, 20, 'should calculate the progress');
  assert.equal(position, 10, 'should set the correct position');
});

test('it sets the duration from episode data initially', function(assert) {
  let service = this.subject({
    duration: 0,
    audio: {
      load() { assert.ok(true, 'load should be called'); },
      play() { assert.ok(true, 'load should be called'); }
    }
  });
  service.set('playingEpisode', Ember.Object.create({ duration: 123 }));
  let dur = service.get('duration');
  assert.equal(dur, 123, 'duration should match');
});

test('it sets the duration from media data when ready', function(assert) {
  let service = this.subject({ duration: 0 });

  let event = new CustomEvent('durationchange', { detail: 55 });
  service.get('audio').dispatchEvent(event);

  let duration = service.get('duration');
  assert.equal(duration, 55, 'duration should match');
});

test('it updates the position as the playbacks plays', function(assert) {
  let service = this.subject({ position: 0 });

  let event = new CustomEvent('timeupdate', { detail: 43 });
  service.get('audio').dispatchEvent(event);

  let position = service.get('position');
  assert.equal(position, 43, 'position should match');
});

test('sets isPlaying to false when the playback is complete', function(assert) {
  let service = this.subject({ isPlaying: true });

  let event = new CustomEvent('ended');
  service.get('audio').dispatchEvent(event);

  assert.notOk(service.get('isPlaying'), 'isPlaying should match');
});
