import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  podcast: belongsTo('podcast'),
  title: DS.attr('string'),
  publishedAt: DS.attr('date'),
  duration: DS.attr('number'),
  fullDescription: DS.attr('string'),
  summary: DS.attr('string'),
  mp3Link: DS.attr('string')
});
