import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const playerService = Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false,
  showExpandedPlayer: false
});

moduleForComponent('episode-details', 'Integration | Component | episode details', {
  integration: true,
  beforeEach() {
    this.register('service:player', playerService);
    this.inject.service('player', { as: 'player' });
  }
});

test('it should display podcast cover image', function(assert) {
  this.set('episode', Ember.Object.create({
    podcast: Ember.Object.create({ image: 'testme.png' })
  }));
  this.render(hbs`{{episode-details episode=episode}}`);
  let img = this.$('.episode-details img').attr('src');
  assert.equal(img, 'testme.png', 'image src is incorrect');
});

test('it should display episode title, date, dration', function(assert) {
  this.set('episode', Ember.Object.create({
    title: "Test Episode",
    pubDate: new Date('Mon, 4 Nov 2016 9:57:12 +0000'),
    duration: 1380
  }));
  this.render(hbs`{{episode-details episode=episode}}`);
  let actualTitle = this.$('.episode-details h2').text().trim();
  let actualDate = this.$('.episode-details .date').text().trim();
  let actualDuration = this.$('.episode-details .duration').text().trim();

  assert.equal(actualTitle, 'Test Episode', 'title should match');
  assert.equal(actualDate, '4 Nov 2016', 'date should match');
  assert.equal(actualDuration, '23 minutes', 'duration should match');
});

test('it should display episode description', function(assert) {
  this.set('episode', Ember.Object.create({ description: "Full description" }));
  this.render(hbs`{{episode-details episode=episode}}`);
  let descr = this.$('.description:visible').text().trim();
  assert.equal(descr, 'Full description', 'description does not match');
});

test('it should start playback when play button clicked', function(assert) {
  this.set('episode', Ember.Object.create({ id: 1 }));

  this.render(hbs`{{episode-details episode=episode}}`);
  this.$('.play').click();

  assert.equal(this.get('player.playingEpisode.id'), 1, 'should match ep id');
  assert.ok(this.get('player.isPlaying'), 'should start playback');
});

test('it should pause playback when pause button clicked', function(assert) {
  this.set('episode', Ember.Object.create({ id: 1 }));

  this.render(hbs`{{episode-details episode=episode}}`);
  this.$('.play').click();
  this.$('.pause').click();

  assert.equal(this.get('player.playingEpisode.id'), 1, 'should match ep id');
  assert.notOk(this.get('player.isPlaying'), 'should start playback');
});

test('it should display play button when nothing is playing', function(assert) {
  this.set('episode', Ember.Object.create({ id: 1 }));

  this.render(hbs`{{episode-details episode=episode}}`);

  let play = this.$('a.play:visible');
  let pause = this.$('a.pause:visible');
  assert.equal(play.length, 1, 'should display play button');
  assert.equal(pause.length, 0, 'should not display pause button');
});

test('it should display play button when other episode is playing', function(assert) {
  this.set('player.playingEpisode', Ember.Object.create({ id: 2 }));
  this.set('player.isPlaying', true);
  this.set('episode', Ember.Object.create({ id: 1 }));

  this.render(hbs`{{episode-details episode=episode}}`);

  let play = this.$('a.play:visible');
  let pause = this.$('a.pause:visible');
  assert.equal(play.length, 1, 'should display play button');
  assert.equal(pause.length, 0, 'should not display pause button');
});

test('it should display pause button when this episode is playing', function(assert) {
  let ep = Ember.Object.create({ id: 2 });
  this.set('player.playingEpisode', ep);
  this.set('player.isPlaying', true);
  this.set('episode', ep);

  this.render(hbs`{{episode-details episode=episode}}`);

  let play = this.$('a.play:visible');
  let pause = this.$('a.pause:visible');
  assert.equal(play.length, 0, 'should not display play button');
  assert.equal(pause.length, 1, 'should display pause button');
});
