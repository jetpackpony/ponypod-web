import Ember from 'ember';
import ENV from '../config/environment';
import RouteWithSearchMixin from 'ponypod-frontend/mixins/route-with-search';
import InfinityRoute from "ember-infinity/mixins/route";
import R from 'npm:ramda';

const podcastsPerPage = 30;

export default Ember.Route.extend(
  RouteWithSearchMixin,
  InfinityRoute,
  {
    titleToken: "Podcasts",

    // ember-infinity variables
    pageParam: "page[number]",
    perPageParam: "page[size]",
    totalPagesParam: "meta.totalPages",

    model(params) {
      return this.infinityModel("podcast", R.merge(
        {
          perPage: podcastsPerPage,
          startingPage: 0
        },
        this.prepareSearchQuery(params.search)
      ));
    },
    afterModel() {
      this._super(...arguments);
      this.controllerFor(this.routeName).set('showSearchSpinner', false);
      this.set('navigation.navTitle', ENV.APP.appTitle);
      this.set('navigation.showBackArrow', false);
    },
  }
);

