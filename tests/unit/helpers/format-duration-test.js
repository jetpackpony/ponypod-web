import { formatDuration } from 'ponypod-frontend/helpers/format-duration';
import { module, test } from 'qunit';

module('Unit | Helper | format duration');

test('it formats very long duration', function(assert) {
  let result = formatDuration([20000]);
  assert.equal(result, '5 hours 33 minutes', 'formatted output is incorrect');
});

test('it formats normal duration', function(assert) {
  let result = formatDuration([2700]);
  assert.equal(result, '45 minutes', 'formatted output is incorrect');
});

test('it formats very short duration', function(assert) {
  let result = formatDuration([15]);
  assert.equal(result, '15 seconds', 'formatted output is incorrect');
});

test('it works normally when passed multiple arguments', function(assert) {
  let result = formatDuration([15]);
  assert.equal(result, '15 seconds', 'formatted output is incorrect');
});
