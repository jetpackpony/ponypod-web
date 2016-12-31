import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const playerService = Ember.Service.extend({
  playingEpisode: Ember.Object.create({
    id: 2,
    podcast: Ember.Object.create({ image: 'testme.png' }),
    title: 'Testme',
    publishedAt: new Date("Mon, 4 Nov 2016 9:57:12 +0000"),
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
  this.render(hbs`{{maxi-progress-bar}}`);
  let container = this.$('.progress').width();
  let bar = this.$('.progress .determinate').width();
  let diff = Math.abs(bar / container * 100 - 75);
  assert.ok(diff < 1, 'should be withing 1% of set progress');
});

test('it shows progress thumb on progress position', function(assert) {
  this.set('player.progress', 75);
  this.render(hbs`{{maxi-progress-bar}}`);
  let container = this.$('.progress').width();
  let thumb = this.$('.thumb').position().left;
  let thumbWidth = this.$('.thumb').outerWidth();
  let diff = Math.abs((thumb + thumbWidth / 2) / container * 100 - 75);
  assert.ok(diff < 1, 'should be withing 1% of set progress');
});

test('it shows the correct passed and remaining time', function(assert) {
  this.set('player.position', 123);
  this.set('player.timeToFinish', 3896);
  this.render(hbs`{{maxi-progress-bar}}`);
  let passed = this.$('.time .passed').text().trim();
  let remaining = this.$('.time .remaining').text().trim();
  assert.equal(passed, '02:03', 'passed time should match');
  assert.equal(remaining, '-1:04:56', 'remaining time should match');
});

test('it calls jump to with value when progress bar clicked', function(assert) {
  this.render(hbs`{{maxi-progress-bar}}`);
  let progress = this.$('.progress-wrapper');
  let x = progress.width() * 0.33 + progress.offset().left;
  let y = progress.height() / 2 + progress.offset().top;
  progress.trigger('click', { pageX: x, pageY: y });

  let diff = Math.abs(this.get('player.progress') - 33);
  assert.ok(diff < 1, 'should jump to the pointed progress');
});

test('it calls jump-to with value when progress thumb dragged', function(assert) {
  this.set('player.progress', 50);
  this.render(hbs`{{maxi-progress-bar}}`);
  let progress = this.$('.progress-wrapper');
  let thumb = this.$('.thumb');
  let dest = progress.offset().left + progress.width() / 4;
  thumb.trigger('mousedown', { pageX: dest });
  thumb.trigger('mousemove', { pageX: dest });
  thumb.trigger('mouseup');

  let newValue = this.get('player.progress');
  let newX = thumb.offset().left + thumb.outerWidth() / 2;
  let diff = Math.abs(newX - dest);
  assert.equal(newValue, 25, 'should jump to the pointed progress');
  assert.ok(diff < 10, 'thumb should be moved to around dest');
});

test('it calls jump-to with value when progress thumb touch-dragged', function(assert) {
  this.set('player.progress', 50);
  this.render(hbs`{{maxi-progress-bar}}`);
  let progress = this.$('.progress-wrapper');
  let thumb = this.$('.thumb');
  let dest = progress.offset().left + progress.width() / 4;
  thumb.trigger('touchstart', { touches: [ { pageX: dest } ] });
  thumb.trigger('touchmove', { touches: [ { pageX: dest } ] });
  thumb.trigger('touchend');

  let newValue = this.get('player.progress');
  let newX = thumb.offset().left + thumb.outerWidth() / 2;
  let diff = Math.abs(newX - dest);
  assert.equal(newValue, 25, 'should jump to the pointed progress');
  assert.ok(diff < 10, 'thumb should be moved to around dest');
});

test('it diplays the time when dragging the progress thumb', function(assert) {
  this.set('player.progress', 50);
  this.set('player.duration', 100);
  this.render(hbs`{{maxi-progress-bar}}`);
  let progress = this.$('.progress-wrapper');
  let thumb = this.$('.thumb');
  let dest = progress.offset().left + progress.width() / 4;
  thumb.trigger('mousedown', { pageX: dest });
  thumb.trigger('mousemove', { pageX: dest });

  let text = this.$('.thumb .time-tooltip:visible').text().trim();
  assert.equal(text, '00:25', 'should display the correct time position');

  thumb.trigger('mouseup');
});

test('it diplays the time when touch-dragging the progress thumb', function(assert) {
  this.set('player.progress', 50);
  this.set('player.duration', 100);
  this.render(hbs`{{maxi-progress-bar}}`);
  let progress = this.$('.progress-wrapper');
  let thumb = this.$('.thumb');
  let dest = progress.offset().left + progress.width() / 4;
  thumb.trigger('touchstart', { touches: [ { pageX: dest } ] });
  thumb.trigger('touchmove', { touches: [ { pageX: dest } ] });

  let text = this.$('.thumb .time-tooltip:visible').text().trim();
  assert.equal(text, '00:25', 'should display the correct time position');

  thumb.trigger('touchend');
});
