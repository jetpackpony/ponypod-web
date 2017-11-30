import R from 'npm:ramda';

export const trimValue = R.curry((min, max, value) => (
  (value > max)
  ? max
  : ((value < min)
    ? min
    : value)
));

