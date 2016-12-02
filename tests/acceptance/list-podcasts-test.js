/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list podcasts');

test('should redirect to podcasts route', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(currentURL(), '/podcasts', 'should redirect');
  });
});

test('should show navigation bar', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('nav').length, 1, 'should display navbar');
  });
});

test('shows toggle menu button when on home page', function(assert) {
  visit('/');
  andThen(() => {
    assert.equal(find('#toggle-menu').length, 1, 'should show menu button');
    assert.equal(find('#back-button').length, 0, 'should not show back button');
  });
});

test('should show all the podcasts', function(assert) {
  server.createList('podcast', 3);
  visit('/');
  andThen(() => {
    assert.equal(find('.podcast').length, 3, 'should see 3 podcasts');
  });
});

test('should link to a podcast page', function(assert) {
  server.createList('podcast', 3);
  visit('/');
  click('#podcast-2 a');
  andThen(() => {
    assert.equal(currentURL(), '/podcast/2', 'should be on a podcast page');
  });
});
