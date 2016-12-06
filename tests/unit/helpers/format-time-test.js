
import { formatTime } from 'ponypod-frontend/helpers/format-time';
import { module, test } from 'qunit';

module('Unit | Helper | format time');

test('it formats small time', function(assert) {
  let result = formatTime([42]);
  assert.equal(result, '00:42', 'should padd zeros for minutes');
});

test('it formats medium time', function(assert) {
  let result = formatTime([943]);
  assert.equal(result, '15:43', 'should format minutes correctly');
});

test('it formats large time', function(assert) {
  let result = formatTime([7569]);
  assert.equal(result, '2:06:09', 'should format hours correctly');
});

test('it formats negative time', function(assert) {
  let result = formatTime([-7200]);
  assert.equal(result, '-2:00:00', 'should format negative time correctly');
});
