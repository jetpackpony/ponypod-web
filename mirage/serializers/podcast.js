import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  links(podcast) {
    return {
      'episodes': {
        related: `/podcasts/${podcast.id}/episodes`
      }
    };
  }
});
