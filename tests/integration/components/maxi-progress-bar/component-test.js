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

moduleForComponent('maxi-progress-bar', 'Integration | Component | maxi progress bar', {
  integration: true,
  beforeEach() {
    this.register('service:player', playerService);
    this.inject.service('player', { as: 'player' });
    this.$().addClass('controls');
  }
});

test('it shows the playback progress', function(assert) {
  this.set('player.progress', 75);
  this.render(hbs`{{maxi-player}}`);
  let container = this.$('.maxi-player .progress').width();
  let bar = this.$('.maxi-player .progress .determinate').width();
  let diff = Math.abs(bar / container * 100 - 75);
  assert.ok(diff < 1, 'should be withing 1% of set progress');
});

test('it shows progress thumb on progress position', function(assert) {
  this.set('player.progress', 75);
  this.render(hbs`{{maxi-player}}`);
  let container = this.$('.maxi-player .progress').width();
  let thumb = this.$('.maxi-player .thumb').position().left;
  let thumbWidth = this.$('.maxi-player .thumb').outerWidth()
  let diff = Math.abs((thumb + thumbWidth / 2) / container * 100 - 75);
  assert.ok(diff < 1, 'should be withing 1% of set progress');
});

test('it shows the correct passed and negative time', function(assert) {
});

test('it calls jump to with value when progress bar clicked', function(assert) {
  assert.expect(1);
  this.set('player.jumpTo', (progress) => {
    assert.equal(progress, 33, 'should jump to the pointed progress');
  });
  this.render(hbs`{{maxi-player}}`);
  let progress = this.$('.progress-wrapper');
  let x = progress.width() * .33 + progress.offset().left;
  let y = progress.height() / 2 + progress.offset().top;
  progress.trigger('click', { pageX: x, pageY: y });
});

test('it calls jump-to with value when progress thumb dragged', function(assert) {
});

test('it calls jump-to with value when progress thumb touch-dragged', function(assert) {
});

test('it diplays the time when dragging the progress thumb', function(assert) {
});

test('it diplays the time when touch-dragging the progress thumb', function(assert) {
});
