import Ember from 'ember';
import R from 'npm:ramda';

export function formatTime([value]) {
  return R.compose(
    addSignToTimeString(value),
    composeTimeString,
    getHrsMinsSecs,
    Math.round,
    Math.abs
  )(value);
}

export default Ember.Helper.helper(formatTime);

const addSignToTimeString = R.curry((value, string) => (
  `${(value >= 0) ? '' : '-'}${string}`
));

const composeTimeString = ({ hours, mins, secs }) => (
  (hours === 0)
  ? `${mins}:${secs}`
  : `${hours}:${mins}:${secs}`
);

const getHrsMinsSecs = (value) => ({
  hours: getHours(value),
  mins: padWithZeros(getMinutes(value)),
  secs: padWithZeros(getSeconds(value))
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
const padWithZeros = (value) => (
  `${(value < 10) ? '0' : ''}${value}`
);
