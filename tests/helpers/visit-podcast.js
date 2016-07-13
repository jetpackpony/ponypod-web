import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('visit_podcast', function(app, podcast) {
  visit('/');
  click(`a:contains(${podcast.title})`);
});

export default Ember.Test.registerAsyncHelper('visit_episode', function(app, episode) {
  visit_podcast(episode.podcast);
  click(`a:contains(${episode.title})`);
});
