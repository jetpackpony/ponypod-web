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
  },
  summary() {
    return faker.lorem.paragraphs(1);
  },
  //file: "test.mp3"
  file: "http://www.noiseaddicts.com/samples_1w72b820/2226.mp3"
});
