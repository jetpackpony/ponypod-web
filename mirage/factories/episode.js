import { faker, Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Episode - ${i + 1}`;
  },
  pubDate() {
    return faker.date.past();
  },
  duration() {
    return faker.random.number(10000);
  },
  description() {
    return faker.lorem.paragraphs(10);
  }
});
