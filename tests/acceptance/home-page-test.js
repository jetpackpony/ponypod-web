import { test } from 'qunit';
import moduleForAcceptance from 'ponypod-web/tests/helpers/module-for-acceptance';
import homePage from '../helpers/pages/home-page';

moduleForAcceptance('Acceptance | homepage');

test('should list all existing podcasts', function(assert) {
  let podcasts = server.createList('podcast', 3);

  homePage.visit();

  andThen(function () {
    assert.ok(homePage.hasPodcast(podcasts[0].title), 'should see "' + podcasts[0].title + '"');
    assert.ok(homePage.hasPodcast(podcasts[1].title), 'should see "' + podcasts[1].title + '"');
    assert.ok(homePage.hasPodcast(podcasts[2].title), 'should see "' + podcasts[2].title + '"');
  });
});
