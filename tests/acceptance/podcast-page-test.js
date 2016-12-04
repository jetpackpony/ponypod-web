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
  let episodes = server.createList('episode', { podcast }, 3);
  visit('/podcast/1');
  andThen(() => {
    let epList = find('.episode-list .episode');
    assert.equal(epList.length, 3, 'should show 3 episodes');
    assert.equal(true, false, 'should show proper titles');
  });
});

test('doesn\'t show other podcasts\' episodes', function(assert) {
  let podcasts = server.createList('podcast', 2);
  let ep1 = server.create('episode', { podcast: podcasts[0], title: "test-1" });
  let ep2 = server.create('episode', { podcast: podcasts[1], title: "test-2" });
  visit('/podcast/1');
  andThen(() => {
    let ep = find('.episode-list .episode');
    assert.equal(epList.length, 1, 'should show 1 episodes');
    assert.equal(find('.title', ep), 'test-1', 'should show proper episode');
  });
});
