import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  tagName: 'aside',
  appTitle: ENV.APP.appTitle
});
