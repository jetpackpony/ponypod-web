import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  podcast: belongsTo('podcast'),
  title: DS.attr('string'),
  pubDate: DS.attr('date'),
  duration: DS.attr('number'),
  description: DS.attr('string'),
  summary: DS.attr('string')
});
