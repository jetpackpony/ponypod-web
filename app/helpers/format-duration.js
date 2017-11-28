import Ember from 'ember';
import R from 'npm:ramda';

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

const getHrsMinsSecs = (value) => ({
  hours: getHours(value),
  mins: getMinutes(value),
  secs: getSeconds(value)
});
const getHours = (value) => (
  Math.floor(value / 3600)
);
const getMinutes = (value) => (
  Math.floor((value - getHours(value) * 3600) / 60)
);
const getSeconds = (value) => (
  value - getHours(value) * 3600 - getMinutes(value) * 60
);
