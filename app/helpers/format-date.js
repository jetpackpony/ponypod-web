import Ember from 'ember';
import moment from 'moment';

export function formatDate([value]) {
  return moment(value).format('D MMM YYYY');
}

export default Ember.Helper.helper(formatDate);
