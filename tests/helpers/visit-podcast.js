import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('visitPodcast', function(app, podcast) {
  visit('/podcasts/' + podcast.id);
});
