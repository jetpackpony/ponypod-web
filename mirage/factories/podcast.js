import { faker, Factory } from 'ember-cli-mirage';

const imageList = ['hi','99pi','cortex','freakonomics','serial','tal'];

export default Factory.extend({
  title(i) {
    return `Podcast - ${i}`;
  },
  image(i) {
    return `assets/images/${faker.list.cycle(...imageList)(i)}.png`;
  }
});
