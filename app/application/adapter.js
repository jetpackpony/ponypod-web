import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend(HasManyQuery.RESTAdapterMixin, {
  host: ENV.ponypod.apiEndPoint,
  namespace: ENV.ponypod.apiNameSpace
});
