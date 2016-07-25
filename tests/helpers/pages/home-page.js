export default {
  url() {
    return '/';
  },

  visit() {
    return visit(this.url());
  },

  hasPodcast(title) {
    return find(`.podcast-title:contains(${title})`).length > 0;
  }
};
