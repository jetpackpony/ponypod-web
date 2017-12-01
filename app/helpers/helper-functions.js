import R from 'npm:ramda';

export const trimValue = R.curry((min, max, value) => (
  (value > max)
  ? max
  : ((value < min)
    ? min
    : value)
));

export const calcPercentage = (value, total) => (
  trimValue(0, 100, ((value ||0) / (total || 1) * 100))
)

