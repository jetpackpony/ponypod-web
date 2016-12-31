import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  links(podcast) {
    return {
      'episodes': {
        'related': `/api/podcasts/${podcast.id}/episodes`
      }
    };
  }
});
