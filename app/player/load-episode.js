
export default {
  store: Ember.inject.service(),
  playingEpisode: null,
  rewindToTimeWhenLoaded: 0,
  init() {
    this._super(...arguments);
    this.playEpisode = this.playEpisode.bind(this);
    this.playEpisode(this.get('localStorage.lastPlayingId'), false, false);
  },
  playEpisode(episode_id, forceRewind = false, playWhenLoaded = true) {
    this.set('loading', true);
    this.set('playWhenLoaded', playWhenLoaded);
    this.getEpisode(episode_id)
      .then(
        (episode) => (
          (this.get('playingEpisode.id') === episode.id)
          ? this.playCurrentEpisode(forceRewind)
          : this.loadNewEpisode(episode, forceRewind)
        ),
        () => this.set('loading', false)
      );
  },
  getEpisode(episode_id) {
    return (episode_id)
      ? this.get('store').findRecord('episode', episode_id)
      : Promise.reject();
  },
  loadNewEpisode(episode, forceRewind) {
    this.set('rewindToTimeWhenLoaded',
      ((forceRewind)
        ? 0
        : this.get(`localStorage.episodes.${episode.id}.currentTime`))
    );
    this.set('playingEpisode', episode);
    this.set('duration', episode.get('duration'));
    this.set('audio.src', episode.get('mp3Link'));
    this.get('audio').load();
  },
  playCurrentEpisode(forceRewind) {
    if (forceRewind) {
      this.jumpTo(0);
    }
    this.set('loading', false);
    this.play();
  }
};
