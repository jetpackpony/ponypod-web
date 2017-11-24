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

  this.get('/podcasts', function({ podcasts }, { queryParams }) {
    let search = (queryParams.title || "").toLowerCase();
    let number = parseInt(queryParams['page[number]']);
    let size = parseInt(queryParams['page[size]']);
    let all = (
      (search !== '')
      ? podcasts.all().filter((item) => (
        item.title.toLowerCase().indexOf(search) !== -1
      ))
      : podcasts.all()
    );
    let ids = all.models.map((m) => m.id)
      .slice(number * size, (number + 1) * size);
    let json = this.serialize(podcasts.find(ids));
    json.meta = { totalPages: Math.ceil(all.models.length / size) };
    return json;
  });

  this.get('/episodes', function({ podcasts, episodes }, { queryParams }) {
    let podcast = queryParams.podcast_id;
    let search = (queryParams.search || "").toLowerCase();
    let number = parseInt(queryParams['page[number]']);
    let size = parseInt(queryParams['page[size]']);
    if (podcast) {
      let eps = episodes.find(podcasts.find(podcast).episodes.models.map(m => m.id));
      let all = (
        (search !== '')
        ? eps.filter((item) => (
          item.title.toLowerCase().indexOf(search) !== -1
        ))
        : eps
      );

      let ids = all.models.map((m) => m.id)
        .slice(number * size, (number + 1) * size);
      let json = this.serialize(episodes.find(ids));
      json.meta = { totalPages: Math.ceil(all.models.length / size) };
      return json;
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
