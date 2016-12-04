export function initialize(application) {
  application.inject('route', 'navigation', 'service:navigation');
  application.inject('controller', 'navigation', 'service:navigation');
}

export default {
  name: 'navigation',
  initialize
};
