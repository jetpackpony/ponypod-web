const getHours = (value) => (
  Math.floor(value / 3600)
);
const getMinutes = (value) => (
  Math.floor((value - getHours(value) * 3600) / 60)
);
const getSeconds = (value) => (
  value - getHours(value) * 3600 - getMinutes(value) * 60
);
const getHrsMinsSecs = (value) => ({
  hours: getHours(value),
  mins: getMinutes(value),
  secs: getSeconds(value)
});

export default getHrsMinsSecs;
