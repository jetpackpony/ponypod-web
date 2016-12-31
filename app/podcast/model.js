import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';
import HasManyQuery from 'ember-data-has-many-query';

export default DS.Model.extend(HasManyQuery.ModelMixin, {
  title: DS.attr('string'),
  image: DS.attr('string'),
  summary: DS.attr('string'),
  description: DS.attr('string'),
  episodes: hasMany('episode')
});
