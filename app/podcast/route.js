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
    titleToken: (model) => model.get('title'),

    // ember-infinity variables
    pageParam: "page[number]",
    perPageParam: "page[size]",
    totalPagesParam: "meta.totalPages",

    model(params) {
      this.set('podcast_id', params.podcast_id);
      return this.get('store')
        .findRecord('podcast', params.podcast_id);
    },
    afterModel(model) {
      this._super(...arguments);
      this.set('navigation.navTitle', model.get('title'));
      this.set('navigation.showBackArrow', true);
    },
    actions: {
      didTransition() {
        this.infinityModel(
          "episode",
          R.merge(
            {
              podcast_id: this.get('podcast_id'),
              perPage: episodesPerPage,
              startingPage: 0,
              modelPath: 'controller.episodes'
            },
            this.prepareSearchQuery(this.get('navigation.searchQuery'))
          )
        ).then((episodes) => {
          this.controllerFor(this.routeName)
            .setProperties({
              episodes,
              showSearchSpinner: false
            });
        });
      }
    }
  }
);
