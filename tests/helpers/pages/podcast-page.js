export default {
  visit(podcast) {
    visit('/');
    click(`a:contains(${podcast.title})`);
  },

  hasPodcast(title) {
    return find(`.podcast-title:contains(${title})`).length > 0;
  },

  hasEpisode(title) {
    return find(`.episode-title:contains(${title})`).length > 0;
  }
};
