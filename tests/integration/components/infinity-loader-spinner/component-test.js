import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('infinity-loader-spinner', 'Integration | Component | infinity loader spinner', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{infinity-loader-spinner}}`);
  assert.ok(this.$('.preloader-wrapper').length > 0, 'should render spinner');
});
