import Ember from 'ember';

export default Ember.Test.registerHelper('podcastExists', function(app, title) {
  return find(`.podcast-title:contains(${title})`).length > 0;
});

export default Ember.Test.registerHelper('episodeExists', function(app, title) {
  return find(`.episode-title:contains(${title})`).length > 0;
});
