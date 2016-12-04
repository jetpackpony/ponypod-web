import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('episode-list', 'Integration | Component | episode list', {
  integration: true
});

test('it lists the episodes passed to it', function(assert) {
  this.set('episodes', Ember.A([
    Ember.Object.create({ title: 'Episode-1' }),
    Ember.Object.create({ title: 'Episode-2' }),
    Ember.Object.create({ title: 'Episode-3' })
  ]));
  this.render(hbs`{{episode-list episodes=episodes}}`);
  let epTitles = this.$('.episode-list .episode .title span').map((i, el) => {
    return $(el).text().trim();
  }).toArray();
  assert.equal(epTitles.length, 3, 'should display 3 episodes');
  assert.ok(epTitles.includes('Episode-1'), 'should include episode 1 title');
  assert.ok(epTitles.includes('Episode-2'), 'should include episode 2 title');
  assert.ok(epTitles.includes('Episode-3'), 'should include episode 3 title');
});

test('it shows the correct date for each episode', function(assert) {
  this.set('episodes', Ember.A([
    Ember.Object.create({ pubDate: new Date("Mon, 4 Nov 2016 9:57:12 +0000") }),
    Ember.Object.create({ pubDate: new Date("Mon, 5 Nov 2016 9:57:12 +0000") }),
    Ember.Object.create({ pubDate: new Date("Mon, 6 Nov 2016 9:57:12 +0000") }),
  ]));
  this.render(hbs`{{episode-list episodes=episodes}}`);
  let epDates = this.$('.episode-list .episode .title .secondary').map((i, el) => {
    return $(el).text().trim();
  }).toArray();
  console.log(epDates);
  assert.equal(epDates.length, 3, 'should display 3 episodes');
  assert.ok(epDates.includes('4 Nov 2016'), 'should include episode 1 date');
  assert.ok(epDates.includes('5 Nov 2016'), 'should include episode 2 date');
  assert.ok(epDates.includes('6 Nov 2016'), 'should include episode 3 date');
});

test('it displays the title section with the title', function(assert) {
  this.render(hbs`{{episode-list title='Testme'}}`);
  let title = this.$('.collection-header h4').text();
  assert.equal(title, 'Testme', 'the title should match');
});

test('it doesn\'t display title section if title is false', function(assert) {
  this.render(hbs`{{episode-list}}`);
  let title = this.$('.collection-header h4:visible');
  assert.equal(title.length, 0, 'the title shouldn\'t be visible');
});
