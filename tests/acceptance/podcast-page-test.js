/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | podcast page');

test('shows back arrow button in the navbar', function(assert) {
  server.create('podcast');
  visit('/podcast/1');
  andThen(() => {
    let hasBackButton = find('nav #back-button').length > 0;
    let hasMenuButton = find('nav #toggle-menu').length > 0;
    assert.ok(hasBackButton, 'should show back button');
    assert.notOk(hasMenuButton, 'should not show menu button');
  });
});

test('displays the podcast title in the nav bar', function(assert) {
  server.create('podcast', { title: "Very test podcast" });
  visit('/podcast/1');
  andThen(() => {
    let title = find('nav .nav-title').text().trim();
    assert.equal(title, "Very test podcast", 'title should mathc');
  });
});
test('displays the podcast cover image', function(assert) {
});
test('displays the podcast description', function(assert) {
});
