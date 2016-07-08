import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('podcast', { path: '/podcasts/:podcast_id' });
  this.route('episode', { path: '/episodes/:episode_id' });
});

export default Router;
