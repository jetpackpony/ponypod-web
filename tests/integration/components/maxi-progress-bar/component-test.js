import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('maxi-progress-bar', 'Integration | Component | maxi progress bar', {
  integration: true
});

test('it calls jump to with value when progress bar clicked', function(assert) {
  assert.expect(1);
  this.set('player.jumpTo', (progress) => {
    assert.equals(progress, 33, 'should jump to the pointed progress');
  });
  this.render(hbs`{{maxi-player}}`);
  let progress = this.$('.progress-wrapper');
  let x = progress.width() * .33;
  let y = progress.height() / 2;
  progress.trigger('click', [x, y]);
});

test('it calls jump-to with value when progress thumb dragged', function(assert) {
});

test('it calls jump-to with value when progress thumb touch-dragged', function(assert) {
});

test('it diplays the time when dragging the progress thumb', function(assert) {
});

test('it diplays the time when touch-dragging the progress thumb', function(assert) {
});

test('it shows the correct passed and negative time', function(assert) {
});
