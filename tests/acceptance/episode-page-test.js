/* global server */

import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | episode page');

test('shows back arrow button in the navbar', function(assert) {
  server.create('episode', { podcast: server.create('podcast') });
  visit('/episode/1');
  andThen(() => {
    let hasBackButton = find('nav #back-button').length > 0;
    let hasMenuButton = find('nav #toggle-menu').length > 0;
    assert.ok(hasBackButton, 'should show back button');
    assert.notOk(hasMenuButton, 'should not show menu button');
  });
});

test('displays the podcast title in the nav bar', function(assert) {
  let podcast = server.create('podcast', { title: "Very test podcast" });
  server.create('episode', { podcast });
  visit('/episode/1');
  andThen(() => {
    let title = find('nav .nav-title').text().trim();
    assert.equal(title, "Very test podcast", 'title should match');
  });
});

test('displays the podcast cover image', function(assert) {
  let podcast = server.create('podcast', { image: "testme.png" });
  server.create('episode', { podcast });
  visit('/episode/1');
  andThen(() => {
    let imageURL = find('img').attr('src');
    assert.equal(imageURL, 'testme.png', 'image isn\'t there');
  });
});

test('displays the episode description', function(assert) {
  server.create('episode', { description: "Full description" });
  visit('/episode/1');
  andThen(() => {
    let descr = find('.description:visible').text().trim();
    assert.equal(descr, 'Full description', 'description does not match');
  });
});

test('displays the episode info', function(assert) {
  server.create('episode', {
    title: "Test Episode",
    pubDate: new Date('Mon, 4 Nov 2016 9:57:12 +0000'),
    duration: 7400
  });
  visit('/episode/1');
  andThen(() => {
    let actualTitle = find('.episode-details h2').text().trim();
    let actualDate = find('.episode-details .date').text().trim();
    let actualDuration = find('.episode-details .duration').text().trim();

    assert.equal(actualTitle, 'Test Episode', 'title should match');
    assert.equal(actualDate, '4 Nov 2016', 'date should match');
    assert.equal(actualDuration, '2 hours 3 minutes', 'duration should match');
  });
});
