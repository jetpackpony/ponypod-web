import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  title: DS.attr('string'),
  image: DS.attr('string'),
  summary: DS.attr('string'),
  description: DS.attr('string'),
  episodes: hasMany('episode')
});
