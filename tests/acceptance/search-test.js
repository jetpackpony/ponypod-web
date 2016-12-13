/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search');

test('shows podcasts matching search query', function(assert) {
  server.createList('podcast', 2);
  server.create('podcast', { title: "testme" });
  visit('/podcasts');
  fillIn('input#search', 'testme');
  keyEvent('input#search', 'keypress', 13);

  andThen(function() {
    let podNumber = find('.podcast').length
    let podcast = find('.podcast a[title="testme"]').text().trim();
    assert.equal(podNumber, 1, 'should show only one podcast');
    assert.equel(podcast, 'testme', 'podcast should be shown');
  });
});

test('shows multi podcasts matching search query', function(assert) {
  server.createList('podcast', 2);
  server.create('podcast', { title: "test" });
  server.create('podcast', { title: "testme" });
  visit('/podcasts');
  fillIn('input#search', 'testme');
  keyEvent('input#search', 'keypress', 13);

  andThen(function() {
    let podNumber = find('.podcast').length
    let podcast1 = find('.podcast a[title="test"]').text().trim();
    let podcast2 = find('.podcast a[title="testme"]').text().trim();
    assert.equal(podNumber, 2, 'should show only two podcasts');
    assert.equel(podcast1, 'test', 'podcast should be shown');
    assert.equel(podcast2, 'testme', 'podcast should be shown');
  });
});

test('shows a message if nothing was found', function(assert) {
  server.create('podcast', { title: "test" });
  server.create('podcast', { title: "testme" });
  visit('/podcasts');
  fillIn('input#search', 'ololol');
  keyEvent('input#search', 'keypress', 13);

  andThen(function() {
    let podNumber = find('.podcast').length
    assert.equal(podNumber, 0, 'should show zero podcast');
  });
});
