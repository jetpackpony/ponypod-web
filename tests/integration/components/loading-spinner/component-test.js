import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('loading-spinner', 'Integration | Component | loading spinner', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{loading-spinner}}`);
  assert.ok(this.$('.preloader-wrapper').length > 0, 'should render spinner');
});
