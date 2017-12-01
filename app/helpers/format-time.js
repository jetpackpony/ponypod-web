import Ember from 'ember';
import R from 'npm:ramda';
import getHrsMinsSecs from './time-functions';

export function formatTime([value]) {
  return R.compose(
    addSignToTimeString(value),
    composeTimeString,
    padMinutesAndSeconds,
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

const padMinutesAndSeconds = ({ hours, mins, secs }) => ({
  hours,
  mins: padWithZeros(mins),
  secs: padWithZeros(secs)
});

const padWithZeros = (value) => (
  `${(value < 10) ? '0' : ''}${value}`
);
