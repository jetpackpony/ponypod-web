import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  serialize(object, request) {
    // This is how to call super, as Mirage borrows [Backbone's implementation of extend](http://backbonejs.org/#Model-extend)
    let json = JSONAPISerializer.prototype.serialize.apply(this, arguments);

    // Sort the output by published date descending (if the result is an array)
    if (Array.isArray(json.data)) {
      json.data = json.data.sort( (a, b) => {
        return b.attributes["published-at"] - a.attributes["published-at"];
      });
    }

    return json;
  }
});
