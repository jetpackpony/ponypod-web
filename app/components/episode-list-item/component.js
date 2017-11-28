import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ["episode","collection-item","avatar"],
  player: Ember.inject.service(),
  classNameBindings: ['isPlaying:playing', 'isPlayed:played'],
  isPlaying: Ember.computed('player.{playingEpisode,isPlaying}', function() {
    let playingId = this.get('player.playingEpisode.id');
    return this.get('episode.id') === playingId && this.get('player.isPlaying');
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    // Generate a computed property which watches localStorage
    // changes for this episode specifically
    Ember.defineProperty(
      this,
      'progress',
      Ember.computed(
        `player.localStorage.episodes.${this.get('episode.id')}`,
        function() {
          let progress = 0;
          let ep = this.get(`player.localStorage.episodes.${this.get('episode.id')}`);
          if (ep) {
            progress = getProgress(ep.position, ep.duration);
          }
          return progress;
        }
      )
    );
    Ember.defineProperty(
      this,
      'progressCss',
      Ember.computed('progress', function() {
        return Ember.String.htmlSafe(`width: ${this.get('progress')}%`);
      })
    );
    Ember.defineProperty(
      this,
      'isPlayed',
      Ember.computed('progress', function() {
        return this.get('progress') >= 99;
      })
    );
  },

  actions: {
    replay() {
      this.get('player.playNewEpisode')(this.get('episode'), true);
      this.get('player').play();
    },
    play() {
      this.get('player.playNewEpisode')(this.get('episode'), false);
      this.get('player').play();
    },
    pause() {
      this.get('player').pause();
    }
  }
});

const getProgress = (position, duration) => (
  Math.round((position || 0) / (duration || 1) * 100)
);
