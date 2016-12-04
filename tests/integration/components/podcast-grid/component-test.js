import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('podcast-grid', 'Integration | Component | podcast grid', {
  integration: true
});

test('it lists podcasts passed to it', function(assert) {
  this.set('podcasts', Ember.A([
    Ember.Object.create({ image: "test-1.png" }),
    Ember.Object.create({ image: "test-2.png" }),
    Ember.Object.create({ image: "test-3.png" }),
  ]));
  this.render(hbs`{{podcast-grid podcasts=podcasts}}`);
  let images = this.$('.podcast-grid .podcast img').map((i, el) => {
    return this.$(el).attr('src');
  }).toArray();
  assert.equal(images.length, 3, 'should show 3 images');
  assert.ok(images.includes('test-1.png'), 'should show image for podcast 1');
  assert.ok(images.includes('test-2.png'), 'should show image for podcast 2');
  assert.ok(images.includes('test-3.png'), 'should show image for podcast 3');
});
