import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('podcasts');
  this.route('podcast', { path: "podcast/:podcast_id" });
  this.route('episode', { path: "episode/:episode_id" });
});

export default Router;
