import { skip, test } from 'qunit';
import moduleForAcceptance from 'ponypod-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | side menu');

skip('shows side menu when menu button is clicked', function(assert) {
  visit('/');
  find('#toggle-menu').click();

  andThen(() => {
    assert.ok(find('aside').css('left') >= 0, 'menu should be visible');
    assert.equal(find('#body-shadow').css('display'), 'block', 'shadow should be visible');
  });
});

skip('hides side menu when shadow is clicked', function(assert) {

});

skip('shows side menu when screen is swiped right');
skip('hides side menu when screen is swiped left');
