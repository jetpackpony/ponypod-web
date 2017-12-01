import Ember from 'ember';
import R from 'npm:ramda';
import getHrsMinsSecs from './time-functions';

export function formatDuration([value]) {
  return R.compose(
    chooseDurationString,
    getHrsMinsSecs,
  )(value);
}

export default Ember.Helper.helper(formatDuration);

const chooseDurationString = ({ hours, mins, secs }) => (
  (hours === 0 && mins === 0)
  ? composeDurationString(secs, 'second')
  : ((hours === 0)
    ? composeDurationString(mins, 'minute')
    : ([
      composeDurationString(hours, 'hour'),
      composeDurationString(mins, 'minute')
    ].join(' ')))
);

const composeDurationString = (value, label) => (
  `${value} ${pluralize(value, label)}`
);

const pluralize = (value, string) => (
  `${string}${(value > 1) ? 's' : ''}`
);
