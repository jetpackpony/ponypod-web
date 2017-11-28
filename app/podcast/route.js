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
      return model.get('title');
    },

    // ember-infinity variables
    pageParam: "page[number]",
    perPageParam: "page[size]",
    totalPagesParam: "meta.totalPages",

    beforeModel() {
      this._super(...arguments);
      this.controllerFor('podcast').set('showSearchSpinner', true);
      this.controllerFor('podcast').set('showLoadMoreButton', false);
    },
    model(params) {
      this.set('podcast_id', params.podcast_id);
      return this.get('store').findRecord('podcast', params.podcast_id);
    },
    afterModel(model) {
      this._super(...arguments);
      this.set('navigation.navTitle', model.get('title'));
      this.set('navigation.showBackArrow', true);
    },
    actions: {
      didTransition() {
        let search = this.get('navigation.searchQuery');
        this.infinityModel(
          "episode",
          R.merge({
            podcast_id: this.get('podcast_id'),
            perPage: episodesPerPage,
            startingPage: 0,
            modelPath: 'controller.episodes'
          },
            ((search && search.length > 2)
              ? { search }
              : {})
          )
        ).then((episodes) => {
          this.controllerFor('podcast').set('episodes', episodes);
          this.controllerFor('podcast').set('showSearchSpinner', false);
        });
      }
    }
  }
);
