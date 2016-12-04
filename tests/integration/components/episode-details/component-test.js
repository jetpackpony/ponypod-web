import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('episode-details', 'Integration | Component | episode details', {
  integration: true
});

test('it should display podcast cover image', function(assert) {
  this.set('episode', Ember.Object.create({
    podcast: Ember.Object.create({ image: 'testme.png' })
  }));
  this.render(hbs`{{episode-details episode=episode}}`);
  let img = this.$('.episode-details img').attr('src');
  assert.equal(img, 'testme.png', 'image src is incorrect');
});

test('it should display episode title, date, dration', function(assert) {
  this.set('episode', Ember.Object.create({
    title: "Test Episode",
    pubDate: new Date('Mon, 4 Nov 2016 9:57:12 +0000'),
    duration: 1380
  }));
  this.render(hbs`{{episode-details episode=episode}}`);
  let actualTitle = this.$('.episode-details h2').text().trim();
  let actualDate = this.$('.episode-details .date').text().trim();
  let actualDuration = this.$('.episode-details .duration').text().trim();

  assert.equal(actualTitle, 'Test Episode', 'title should match');
  assert.equal(actualDate, '4 Nov 2016', 'date should match');
  assert.equal(actualDuration, '23 minutes', 'duration should match');
});

test('it should display episode description', function(assert) {
  this.set('episode', Ember.Object.create({ description: "Full description" }));
  this.render(hbs`{{episode-details episode=episode}}`);
  let descr = this.$('.description:visible').text().trim();
  assert.equal(descr, 'Full description', 'description does not match');
});
