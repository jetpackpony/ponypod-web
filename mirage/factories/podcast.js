import { faker, Factory } from 'ember-cli-mirage';

const imageList = [
 "http://static1.squarespace.com/static/52d66949e4b0a8cec3bcdd46/t/52ebf67fe4b0f4af2a4502d8/1391195777839/1500w/Hello+Internet.003.png",
 "http://podcasts.howstuffworks.com/hsw/podcasts/sysk/sysk-audio-1600.jpg",
 "https://media2.wnyc.org/i/1400/1400/l/80/1/wn16_wnycstudios_freakonomics-rev3.png",
 "http://i.podster.fm/img/8436/crop/yes/size/default/8436-1.jpg",
 "http://static1.squarespace.com/static/513abd71e4b0fe58c655c105/t/52c45a37e4b0a77a5034aa84/1388599866232/1500w/Artwork.jpg",
 "http://golangshow.com/images/cover_big.png"
];


export default Factory.extend({
  title() {
    return faker.company.companyName();
  },
  image: faker.list.cycle(...imageList),
  summary() {
    return faker.lorem.paragraph();
  },
  description() {
    return faker.lorem.paragraph();
  }
});
