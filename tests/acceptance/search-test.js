/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | search');

/* Podcast search */

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


/* Episodes search */

test('shows episodes matching search query', function(assert) {
  let podcast = server.create('podcast');
  server.createList('episode', 2, { podcast });
  server.create('episode', { podcast, title: 'testme' })
  visit('/podcast/1');
  click('#open-search');
  fillIn('input#search', 'testme');

  andThen(function() {
    let epNumber = find('.episode').length;
    let episode = find('.episode a.title span').text().trim();
    assert.equal(epNumber, 1, 'should show only one episode');
    assert.equal(episode, 'testme', 'episode title should match');
  });
});

test('shows multi episodes matching search query', function(assert) {
  let podcast = server.create('podcast');
  server.createList('episode', 2, { podcast });
  server.create('episode', { podcast, title: 'test' })
  server.create('episode', { podcast, title: 'testme' })
  visit('/podcast/1');
  click('#open-search');
  fillIn('input#search', 'testme');

  andThen(function() {
    let epNumber = find('.episode').length;
    let episode1 = find('.episode a.title span:eq(0)').text().trim();
    let episode2 = find('.episode a.title span:eq(1)').text().trim();
    assert.equal(epNumber, 2, 'should show 2 episodes');
    assert.equal(episode1, 'test', 'episode title should match');
    assert.equal(episode2, 'testme', 'episode title should match');
  });
});

test('shows no episodes if nothing is found', function(assert) {
  let podcast = server.create('podcast');
  server.createList('episode', 2, { podcast });
  server.create('episode', { podcast, title: 'test' })
  server.create('episode', { podcast, title: 'testme' })
  visit('/podcast/1');
  click('#open-search');
  fillIn('input#search', 'ololo');

  andThen(function() {
    let epNumber = find('.episode').length;
    assert.equal(epNumber, 0, 'should show zero episodes');
  });
});
