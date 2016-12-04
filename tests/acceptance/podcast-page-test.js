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
  server.create('podcast', { image: "testme.png" });
  visit('/podcast/1');
  andThen(() => {
    let imageURL = find('img').attr('src');
    assert.equal(imageURL, 'testme.png', 'image isn\'t there');
  });
});

test('displays the podcast description', function(assert) {
  server.create('podcast', { description: "Full description" });
  visit('/podcast/1');
  click('a:contains("Read More")');
  andThen(() => {
    let descr = find('.description p:visible').text().trim();
    assert.equal(descr, 'Full description', 'description does not match');
  });
});

test('shows a list on podcast\'s episodes', function(assert) {
  let podcast = server.create('podcast');
  server.createList('episode', 3, { podcast });
  visit('/podcast/1');
  andThen(() => {
    let epList = find('.episode-list .episode');
    assert.equal(epList.length, 3, 'should show 3 episodes');
  });
});

test('doesn\'t show other podcasts\' episodes', function(assert) {
  let podcasts = server.createList('podcast', 2);
  server.create('episode', { podcast: podcasts[0], title: "test-1" });
  server.create('episode', { podcast: podcasts[1], title: "test-2" });
  visit('/podcast/1');
  andThen(() => {
    let ep = find('.episode-list .episode');
    let title = find('.title span', ep).text().trim();
    assert.equal(ep.length, 1, 'should show 1 episodes');
    assert.equal(title, 'test-1', 'should show proper episode');
  });
});

test('shows a correct episode air date', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast, pubDate: new Date("Mon, 4 Nov 2016 9:57:12 +0000") });
  visit('/podcast/1');
  andThen(() => {
    let date = find('.episode .title .secondary').text();
    assert.equal(date, '4 Nov 2016', 'date should match');
  });
});

test('links to an episode page', function(assert) {
  let podcast = server.create('podcast');
  server.create('episode', { podcast, title: "Test episode 1" });
  server.create('episode', { podcast, title: "Test episode 2" });
  visit('/podcast/1');
  click('.title span:contains("Test episode 1")');
  andThen(() => {
    let title = find('.episode-details h2').text().trim();
    assert.equal(title, "Test episode 1", 'the episode title doesn\'t match');
  });
});
