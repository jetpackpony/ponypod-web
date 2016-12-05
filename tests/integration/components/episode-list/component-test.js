import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('episode-list', 'Integration | Component | episode list', {
  integration: true,
  beforeEach() {
    this.register('component:episode-list-item', Ember.Component.extend());
    this.register('template:components/episode-list-item', hbs`{{episode.title}}`);
  }
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

test('it renders a list of episodes passed to it', function(assert) {
  let titles = ['Episode-1', 'Episode-2', 'Episode-3'];
  assert.expect(3);
  this.register('component:episode-list-item', Ember.Component.extend({
    didRender() {
      assert.ok(titles.includes(this.get('episode.title')), 'did episode');
    }
  }));
  this.set('episodes', Ember.A([
    Ember.Object.create({ title: titles[0] }),
    Ember.Object.create({ title: titles[1] }),
    Ember.Object.create({ title: titles[2] })
  ]));
  this.render(hbs`{{episode-list episodes=episodes}}`);
});
