import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const playerService = Ember.Service.extend({
  playingEpisode: Ember.Object.create({
    title: 'Testme',
    publishedAt: new Date("Mon, 4 Nov 2016 9:57:12 +0000"),
    podcast: Ember.Object.create({ image: 'testme.png' })
  }),
  isPlaying: false,
  showExpandedPlayer: false
});

moduleForComponent('mini-player', 'Integration | Component | mini player', {
  integration: true,
  beforeEach() {
    this.register('service:player', playerService);
    this.inject.service('player', { as: 'player' });
    this.$().attr('#player');
    this.$().addClass('mini');
  }
});


test('it shows the current episode info', function(assert) {
  this.render(hbs`{{mini-player}}`);

  let title = this.$('.mini-player .title span').text().trim();
  let date = this.$('.mini-player .title .secondary').text().trim();
  let img = this.$('.mini-player img').attr('src');
  assert.equal(title, 'Testme', 'title does not match');
  assert.equal(date, '4 Nov 2016', 'date does not match');
  assert.equal(img, 'testme.png', 'image does not match');
});

test('it shows the pause button if the episode is playing', function(assert) {
  this.render(hbs`{{mini-player}}`);
  this.set('player.isPlaying', true);

  let play = this.$('.mini-player .control .play:visible');
  let pause = this.$('.mini-player .control .pause:visible');
  assert.equal(play.length, 0, 'should not show play button');
  assert.equal(pause.length, 1, 'should show 1 pause button');
});

test('it shows the play button if the episode is not playing', function(assert) {
  this.render(hbs`{{mini-player}}`);
  this.set('player.isPlaying', false);

  let play = this.$('.mini-player .control .play:visible');
  let pause = this.$('.mini-player .control .pause:visible');
  assert.equal(play.length, 1, 'should show 1 play button');
  assert.equal(pause.length, 0, 'should not show pause button');
});

test('it pauses playback when pause is clicked', function(assert) {
  assert.expect(1);
  this.set('player.pause', () => {
    assert.ok(true, 'player.pause() is called');
  });

  this.render(hbs`{{mini-player}}`);
  this.$('.pause').click();
});

test('it starts playback when play is clicked', function(assert) {
  assert.expect(1);
  this.set('player.play', () => {
    assert.ok(true, 'player.play() is called');
  });

  this.render(hbs`{{mini-player}}`);
  this.$('.play').click();
});

test('it shows the playback progress', function(assert) {
  this.set('player.progress', 75);
  this.render(hbs`{{mini-player}}`);

  let container = this.$('.mini-progress').width();
  let bar = this.$('.mini-progress .bar').width();
  let diff = Math.abs(bar / container * 100 - 75);
  assert.ok(diff < 1, 'should be withing 1% of set progress');
});

test('it sets the player to expand when click on expand', function(assert) {
  this.set('player.showExpandedPlayer', false);
  this.render(hbs`{{mini-player}}`);
  this.$('a.expand-player').click();

  assert.ok(this.get('player.showExpandedPlayer'), 'should set player to expand');
});
