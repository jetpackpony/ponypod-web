import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import visit_podcast from './visit-podcast';
import podcast_exists from './finder-helpers';
import episode_exists from './finder-helpers';

export default function startApp(attrs) {
  let application;

  let attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
