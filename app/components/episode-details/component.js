import Ember from 'ember';
import episodeWithPlayerMixin from '../../mixins/episode-with-player';

export default Ember.Component.extend(
  episodeWithPlayerMixin,
  { classNames: ['episode-details'] }
);

