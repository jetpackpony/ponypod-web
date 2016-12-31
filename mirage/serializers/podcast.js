import { JSONAPISerializer } from 'ember-cli-mirage';
import ENV from '../../config/environment';

export default JSONAPISerializer.extend({
  links(podcast) {
    return {
      'episodes': {
        'related': `${ENV.ponypod.apiNameSpace}/podcasts/${podcast.id}/episodes`
      }
    };
  }
});
