import { faker, Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Episode - ${i + 1}`;
  },
  pubDate() {
    return faker.date.recent();
  }
});
