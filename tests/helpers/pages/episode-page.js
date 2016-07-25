import podcastPage from './podcast-page';

export default {
  visit(episode) {
    podcastPage.visit(episode.podcast);
    click(`a:contains(${episode.title})`);
  },

  hasPodcast(title) {
    return find(`.podcast-title:contains(${title})`).length > 0;
  },

  hasEpisode(title) {
    return find(`.episode-title:contains(${title})`).length > 0;
  }
};
