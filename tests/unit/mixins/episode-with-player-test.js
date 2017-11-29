import EmberObject from '@ember/object';
import EpisodeWithPlayerMixin from 'ponypod-frontend/mixins/episode-with-player';
import { module, test } from 'qunit';

module('Unit | Mixin | episode with player');

// Replace this with your real tests.
test('it works', function(assert) {
  let EpisodeWithPlayerObject = EmberObject.extend(EpisodeWithPlayerMixin);
  let subject = EpisodeWithPlayerObject.create();
  assert.ok(subject);
});
