import { faker, Factory } from 'ember-cli-mirage';

const mp3List = [
  "http://traffic.libsyn.com/hellointernet/HI74_Do_People_Read_The_Filenames.mp3",
  "http://traffic.libsyn.com/hellointernet/HI73_Final_fixedv3.mp3",
  "http://feedproxy.google.com/~r/freakonomicsradio/~5/cjzkNu-kqfA/freakonomics_podcast120716.mp3",
  "http://www.podtrac.com/pts/redirect.mp3/podcasts.howstuffworks.com/hsw/podcasts/sysk/2016-12-06-sysk-horoscopes-final-2.mp3",
  "https://golangshow.com/cdn/episodes/086.mp3"
];

export default Factory.extend({
  title() {
    return faker.company.catchPhrase();
  },
  publishedAt() {
    return faker.date.past();
  },
  duration() {
    return faker.random.number(10000);
  },
  fullDescription() {
    return faker.lorem.paragraphs(10);
  },
  summary() {
    return faker.lorem.paragraphs(1);
  },
  mp3Link: faker.list.cycle(...mp3List)
});
