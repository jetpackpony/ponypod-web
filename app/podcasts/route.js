import Ember from 'ember';
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
      return this.infinityModel(
        "podcast",
        R.merge(
          { perPage: podcastsPerPage, startingPage: 0 },
          ((params.search && params.search.length > 2)
            ? { title: params.search }
            : {})
        )
      );

    },
    afterModel() {
      this.set('navigation.navTitle', 'PonyPod');
      this.set('navigation.showBackArrow', false);
    },
  });
