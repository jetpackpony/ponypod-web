import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('podcasts');
  this.route('podcast', { path: "podcast/:podcast_id" });
  this.route('episode', { path: "episode/:episode_id" });
  this.route('about');
});

export default Router;
