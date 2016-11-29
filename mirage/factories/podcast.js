import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Podcast - ${i}`;
  },
  image(i) {
    return `assets/images/${i}.png`;
  }
});
