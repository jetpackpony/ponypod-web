import { skip, test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | nav bar');

test('is displayed', function(assert) {
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

test('shows back arrow button when on inner page', function(assert) {
  server.create('podcast');
  visit('/podcast/1');
  andThen(() => {
    assert.equal(find('#back-button').length, 1, 'should not show back button');
    assert.equal(find('#toggle-menu').length, 0, 'should show menu button');
  });
});
