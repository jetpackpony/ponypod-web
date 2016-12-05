import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const playerService = Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false
});

moduleForComponent('episode-list-item', 'Integration | Component | episode list item', {
  integration: true,
  beforeEach() {
    this.register('service:player', playerService);
    this.inject.service('player', { as: 'player' });
    // This is because all the css is defined as children of .episode-list
    this.$().addClass('episode-list');
  }
});


test('it shows the episode title and date', function(assert) {
  this.set('episode', Ember.Object.create({
    title: 'Episode-1',
    pubDate: new Date("Mon, 4 Nov 2016 9:57:12 +0000")
  }));

  this.render(hbs`{{episode-list-item episode=episode}}`);

  let title = this.$('.title span').text().trim();
  let date = this.$('.title .secondary').text().trim();
  assert.equal(title, 'Episode-1', 'should display correct title');
  assert.equal(date, '4 Nov 2016', 'should display correct date');
});

test('it starts playing the episode when play button clicked', function(assert) {
  this.set('episode', Ember.Object.create({ id: 2 }));

  this.render(hbs`{{episode-list-item episode=episode}}`);
  this.$('a.play').click();

  let playingEpisode = this.get('player.playingEpisode.id');
  let isPlaying = this.get('player.isPlaying');
  assert.equal(playingEpisode, 2, 'the playing epissode id is wrong');
  assert.ok(isPlaying, 'should start playing');
});

test('it pauses the playback when the pause button is clicked', function(assert) {
  let ep = Ember.Object.create({ id: 2 });
  this.set('player.playingEpisode', ep);
  this.set('player.isPlaying', true);
  this.set('episode', ep);

  this.render(hbs`{{episode-list-item episode=episode}}`);
  this.$('a.pause').click();

  let isPlaying = this.get('player.isPlaying');
  assert.notOk(isPlaying, 'pause button should pause the playback');
});

test('it shows play button next to episode by default', function(assert) {
  this.set('episode', Ember.Object.create({ id: 2 }));

  this.render(hbs`{{episode-list-item episode=episode}}`);

  let playButton = this.$('a.play:visible').length === 1;
  let pauseButton = this.$('a.pause:visible').length === 0;
  assert.ok(playButton, 'play button should be visible');
  assert.ok(pauseButton, 'pause button should not be visible');
});

test('it shows the pause button next to the playing episode', function(assert) {
  let ep = Ember.Object.create({ id: 2 });
  this.set('player.playingEpisode', ep);
  this.set('player.isPlaying', true);
  this.set('episode', ep);

  this.render(hbs`{{episode-list-item episode=episode}}`);

  let playButton = this.$('a.play:visible').length === 0;
  let pauseButton = this.$('a.pause:visible').length === 1;
  assert.ok(playButton, 'play button should not be visible');
  assert.ok(pauseButton, 'pause button should be visible');
});

test('it shows play button if the episode is paused', function(assert) {
  let ep = Ember.Object.create({ id: 2 });
  this.set('player.playingEpisode', ep);
  this.set('player.isPlaying', true);
  this.set('episode', ep);

  this.render(hbs`{{episode-list-item episode=episode}}`);
  this.set('player.isPlaying', false);

  let playButton = this.$('a.play:visible').length === 1;
  let pauseButton = this.$('a.pause:visible').length === 0;
  assert.ok(playButton, 'play button should be visible');
  assert.ok(pauseButton, 'pause button should not be visible');
});
