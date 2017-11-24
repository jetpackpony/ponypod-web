import Ember from 'ember';
import RouteWithSearchMixin from 'ponypod-frontend/mixins/route-with-search';
import RSVP from 'rsvp';
import InfinityRoute from "ember-infinity/mixins/route";
import R from 'npm:ramda';

const episodesPerPage = 30;

export default Ember.Route.extend(
  RouteWithSearchMixin,
  InfinityRoute,
  {
    titleToken: function(model) {
      return model.podcast.get('title');
    },

    // ember-infinity variables
    pageParam: "page[number]",
    perPageParam: "page[size]",
    totalPagesParam: "meta.totalPages",

    model(params) {
      if (!params.search || params.search.length <= 2) {
        params.search = '';
      }
      return RSVP.hash({
        podcast: this.get('store').findRecord('podcast', params.podcast_id),
        episodes: this.infinityModel(
          "episode",
          R.merge(
            params,
            {
              perPage: episodesPerPage,
              startingPage: 0,
              modelPath: 'controller.model.episodes'
            }
          )
        )
      }).then((res) => {
        this.controllerFor('podcast').set('searchTerm', params.search);
        return res;
      });
    },
    afterModel(model) {
      this.set('navigation.navTitle', model.podcast.get('title'));
      this.set('navigation.showBackArrow', true);
    }
  }
);
