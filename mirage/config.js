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

  this.get('/podcasts', () => {
    return {
      data: [{
        type: 'podcasts',
        id: 1,
        attributes: {
          title: "Hello Internet"
        }
      }, {
        type: 'podcasts',
        id: 2,
        attributes: {
          title: "Stuff You Should Know"
        }
      }, {
        type: 'podcasts',
        id: 4,
        attributes: {
          title: "Golang Show"
        }
      }, {
        type: 'podcasts',
        id: 3,
        attributes: {
          title: "Cortex"
        }
      }]
    };
  });
}
