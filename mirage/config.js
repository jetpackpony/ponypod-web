import Mirage from 'ember-cli-mirage';
import ENV from '../config/environment';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  this.namespace = `${ENV.ponypod.apiEndPoint}/${ENV.ponypod.apiNameSpace}`;

  this.get('/podcasts', function(schema, request) {
    let search = request.queryParams.title;
    if (search) {
      return schema.podcasts.all().filter((item) => {
        return item.title.indexOf(search) !== -1;
      });
    } else {
      return schema.podcasts.all();
    }
  });
  this.get('/podcasts/:podcast_id/episodes', function(schema, request) {
    let podcast = request.params.podcast_id;
    let search = request.queryParams.search;
    if (podcast) {
      let res = schema.podcasts.find(podcast).episodes;
      if (search) {
        return res.filter((item) => {
          return item.title.indexOf(search) !== -1;
        });
      } else {
        return res;
      }
    } else {
      return new Mirage.Response(400, {}, {
        "errors": [
          { "detail":"No podcast ID is set" }
        ]
      });
    }
  });
  this.get('/podcasts/:id');
  this.get('/episodes/:id');

  /*
  this.passthrough('/podcasts');
  this.passthrough('/podcasts/:id');
  this.passthrough('/episodes/:id');
  this.passthrough('/podcasts/:podcast_id/episodes');
  */
}
