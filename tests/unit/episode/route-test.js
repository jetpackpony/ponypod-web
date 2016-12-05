import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const navigationService = Ember.Service.extend({
  menuOpen: false,
  navTitle: "PonyPod",
  showBackArrow: false,
  back() { }
}).create();

const playerService = Ember.Service.extend({
  playingEpisode: null,
  isPlaying: false,
  showExpandedPlayer: false
}).create();

moduleFor('route:episode', 'Unit | Route | episode', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it sets navbar title to podcast name', function(assert) {
  let route = this.subject({
    navigation: navigationService
  });
  route._setNavParams(Ember.Object.create({
    podcast: Ember.Object.create({ title: "testme" })
  }));
  assert.equal(navigationService.get('navTitle'), 'testme', 'sets the title');
});

test('it sets the current episode into player if none is playing', function(assert) {
  let route = this.subject({
    navigation: navigationService,
    player: playerService
  });
  route._setPlayingEpisode(Ember.Object.create({ id: 1 }));
  assert.equal(playerService.get('playingEpisode.id'), 1, 'episodes ids should match');
});

test('it does nothing if some episode is playing', function(assert) {
  playerService.set('playingEpisode', Ember.Object.create({ id: 2 }));
  let route = this.subject({
    navigation: navigationService,
    player: playerService
  });
  route._setPlayingEpisode(Ember.Object.create({ id: 1 }));
  assert.equal(playerService.get('playingEpisode.id'), 2, 'playing episode should not have changed');
});
