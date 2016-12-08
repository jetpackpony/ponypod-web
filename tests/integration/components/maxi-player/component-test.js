import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const playerService = Ember.Service.extend({
  playingEpisode: Ember.Object.create({
    id: 2,
    podcast: Ember.Object.create({ image: 'testme.png' }),
    title: 'Testme',
    pubDate: new Date("Mon, 4 Nov 2016 9:57:12 +0000"),
    duration: 3000,
    summary: 'Testme summary'
  }),
  isPlaying: false,
  showExpandedPlayer: true
});

moduleForComponent('maxi-player', 'Integration | Component | maxi player', {
  integration: true,
  beforeEach() {
    this.register('service:player', playerService);
    this.inject.service('player', { as: 'player' });
    this.$().attr('#player');
    this.$().addClass('maxi');
  }
});

test('it displays the info of a playing episode', function(assert) {
  this.render(hbs`{{maxi-player}}`);

  let title = this.$('.title h2').text().trim();
  let date = this.$('.title .date').text().trim();
  let duration = this.$('.title .duration').text().trim();
  let summary = this.$('.description p').text().trim();
  assert.equal(title, 'Testme', 'title should match');
  assert.equal(date, '4 Nov 2016', 'date should match');
  assert.equal(duration, '50 minutes', 'duration should match');
  assert.equal(summary, 'Testme summary', 'summary should match');
});

test('it sets the player to collapse when click collapse', function(assert) {
  this.render(hbs`{{maxi-player}}`);
  this.$('a.collapse-player').click();

  assert.notOk(this.get('player.showExpandedPlayer'), 'should collapse player');
});

test('it collapses a player and goes to episode when Read More clicked', function(assert) {
  assert.expect(2);
  this.set('transitionToEpisode', (ep) => {
    assert.equal(this.get('player.playingEpisode.id'), ep.get('id'), 'should transition to playing episode');
  });
  this.render(hbs`{{maxi-player transitionToEpisode=transitionToEpisode}}`);
  this.$('.description .actions a').click();

  assert.notOk(this.get('player.showExpandedPlayer'), 'should collapse player');
});

test('it shows the pause button if the episode is playing', function(assert) {
  this.set('player.isPlaying', true);
  this.render(hbs`{{maxi-player}}`);
  let play = this.$('.maxi-player .controls .play:visible');
  let pause = this.$('.maxi-player .controls .pause:visible');
  assert.equal(play.length, 0, 'should not show play button');
  assert.equal(pause.length, 1, 'should show pause button');
});

test('it shows the play button if the episode is not playing', function(assert) {
  this.set('player.isPlaying', false);
  this.render(hbs`{{maxi-player}}`);
  let play = this.$('.maxi-player .controls .play:visible');
  let pause = this.$('.maxi-player .controls .pause:visible');
  assert.equal(play.length, 1, 'should show play button');
  assert.equal(pause.length, 0, 'should not show pause button');
});

test('it pauses playback when pause is clicked', function(assert) {
  assert.expect(1);
  this.set('player.pause', () => {
    assert.ok(true, 'player.pause is called');
  });
  this.set('player.isPlaying', true);
  this.render(hbs`{{maxi-player}}`);
  this.$('.maxi-player .controls .pause:visible').click();
});

test('it starts playback when play is clicked', function(assert) {
  assert.expect(1);
  this.set('player.play', () => {
    assert.ok(true, 'player.play is called');
  });
  this.set('player.isPlaying', false);
  this.render(hbs`{{maxi-player}}`);
  this.$('.maxi-player .controls .play:visible').click();
});

test('it calls rewind-10 when rewind is clicked', function(assert) {
  assert.expect(1);
  this.set('player.rewind', (seconds) => {
    assert.equal(seconds, 10, 'should rewind 10 seconds');
  });
  this.render(hbs`{{maxi-player}}`);
  this.$('.maxi-player .rewind').click();
});

test('it calls forward-30 when forward is clicked', function(assert) {
  assert.expect(1);
  this.set('player.forward', (seconds) => {
    assert.equal(seconds, 30, 'should forward 30 seconds');
  });
  this.render(hbs`{{maxi-player}}`);
  this.$('.maxi-player .forward').click();
});
