import { formatDate } from 'ponypod-frontend/helpers/format-date';
import { module, test } from 'qunit';

module('Unit | Helper | format date');

// Replace this with your real tests.
test('it formats the date provided', function(assert) {
  let result = formatDate([new Date("Mon, 4 Nov 2016 9:57:12 +0000")]);
  assert.equal(result, '4 Nov 2016', 'should format the date');
});

test('it works when passed multiple arguments', function(assert) {
  let result = formatDate([new Date("Mon, 4 Nov 2016 9:57:12 +0000"), 42]);
  assert.equal(result, '4 Nov 2016', 'should format the date');
});
