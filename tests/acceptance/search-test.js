/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search');

test('shows podcasts matching search query', function(assert) {
  server.createList('podcast', 2);
  server.create('podcast', { title: "testme" });
  visit('/podcasts');
  click('#open-search');
  fillIn('input#search', 'testme');

  andThen(function() {
    let podNumber = find('.podcast').length;
    let podcast = find('.podcast a[title="testme"]').attr('title');
    assert.equal(podNumber, 1, 'should show only one podcast');
    assert.equal(podcast, 'testme', 'podcast should be shown');
  });
});

test('shows multi podcasts matching search query', function(assert) {
  server.createList('podcast', 2);
  server.create('podcast', { title: "test" });
  server.create('podcast', { title: "testme" });
  visit('/podcasts');
  click('#open-search');
  fillIn('input#search', 'test');

  andThen(function() {
    let podNumber = find('.podcast').length;
    let podcast1 = find('.podcast a[title="test"]').attr('title');
    let podcast2 = find('.podcast a[title="testme"]').attr('title');
    assert.equal(podNumber, 2, 'should show only two podcasts');
    assert.equal(podcast1, 'test', 'podcast should be shown');
    assert.equal(podcast2, 'testme', 'podcast should be shown');
  });
});

test('shows no podcasts if nothing is found', function(assert) {
  server.create('podcast', { title: "test" });
  server.create('podcast', { title: "testme" });
  visit('/podcasts');
  click('#open-search');
  fillIn('input#search', 'ololol');

  andThen(function() {
    let podNumber = find('.podcast').length;
    assert.equal(podNumber, 0, 'should show zero podcast');
  });
});
