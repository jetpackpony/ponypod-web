import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const playerService = Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false
});

moduleForComponent('player-container', 'Integration | Component | player container', {
  integration: true,
  beforeEach() {
    this.register('service:player', playerService);
    this.inject.service('player', { as: 'player' });

    this.register('component:mini-player', Ember.Component.extend());
    this.register('template:components/mini-player',
                  hbs`<div class='mini-player'>mini</div>`);
    this.register('component:maxi-player', Ember.Component.extend());
    this.register('template:components/maxi-player',
                  hbs`<div class='maxi-player'>maxi</div>`);
  }
});

test('display nothing when playing episode is not set', function(assert) {
  this.render(hbs`{{player-container id='player'}}`);
  assert.equal(this.$('#player').height(), 0, 'should not show player');
});

test('open a mini player when playing episode is set', function(assert) {
  this.render(hbs`{{player-container id='player'}}`);
  this.set('player.playingEpisode', Ember.Object.create({ id: 1 }));
  let text = this.$("#player .mini-player:visible").text().trim();
  assert.equal(text, 'mini', 'should show mini player');
});

test('open a maxi player when expand is set', function(assert) {
  this.render(hbs`{{player-container id='player'}}`);
  this.set('player.playingEpisode', Ember.Object.create({ id: 1 }));
  this.set('player.showExpandedPlayer', true);
  let mini = this.$("#player .mini-player:visible").length === 0;
  let maxi = this.$("#player .maxi-player:visible").text().trim();
  assert.ok(mini, 'should not show mini player');
  assert.equal(maxi, 'maxi', 'should show maxi player');
});

test('open a mini player when expand is unset', function(assert) {
  this.render(hbs`{{player-container id='player'}}`);
  this.set('player.playingEpisode', Ember.Object.create({ id: 1 }));
  this.set('player.showExpandedPlayer', true);
  this.set('player.showExpandedPlayer', false);
  let mini = this.$("#player .mini-player:visible").text().trim();
  let maxi = this.$("#player .maxi-player:visible").length === 0;
  assert.equal(mini, 'mini', 'should show mini player');
  assert.ok(maxi, 'should not show maxi player');
});

