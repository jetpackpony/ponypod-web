import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('podcast-details', 'Integration | Component | podcast details', {
  integration: true
});

test('it renders a podcast cover image', function(assert) {
  this.set('podcast', Ember.Object.create({
    image: "test.png"
  }));

  this.render(hbs`{{podcast-details podcast=podcast}}`);

  let imageExists = this.$('img[src="test.png"]').length > 0;
  assert.ok(imageExists, 'image should be rendered');
});

test('it renders a short summary of the podcast', function(assert) {
  this.set('podcast', Ember.Object.create({
    summary: "test summary"
  }));

  this.render(hbs`{{podcast-details podcast=podcast}}`);

  let summary = this.$('.summary p:visible').text().trim();
  assert.equal(summary, 'test summary', 'summary should match');
});

test('it shows a full description when click on "read more"', function(assert) {
  this.set('podcast', Ember.Object.create({
    summary: "test summary",
    description: "test description"
  }));

  this.render(hbs`{{podcast-details podcast=podcast}}`);
  this.$('a:contains("Read More")').click();

  let descr = this.$('.description p:visible').text().trim();
  assert.equal(descr, 'test description', 'description should match');
  assert.equal(this.$('.summary p').length, 0, 'summary should be hidden');
});

test('it hides a full description when click on "read less"', function(assert) {
  this.set('podcast', Ember.Object.create({
    summary: "test summary",
    description: "test description"
  }));

  this.render(hbs`{{podcast-details podcast=podcast}}`);
  this.$('a:contains("Read More")').click();
  this.$('a:contains("Read Less")').click();

  let summary = this.$('.summary p:visible').text().trim();
  assert.equal(summary, 'test summary', 'summary should match');
  assert.equal(this.$('.description p').length, 0, 'description should be hidden');
});
