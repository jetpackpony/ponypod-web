import Ember from 'ember';
import episodeWithPlayerMixin from '../../mixins/episode-with-player';

export default Ember.Component.extend(
  episodeWithPlayerMixin,
  {
    tagName: 'li',
    classNames: ["episode","collection-item","avatar"],
    classNameBindings: ['isPlayed:played']
  }
);
