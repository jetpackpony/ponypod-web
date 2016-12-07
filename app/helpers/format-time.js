import Ember from 'ember';

export function formatTime([value]) {
  let val = Math.round(Math.abs(value));
  let pref = value >= 0 ? '' : '-';
  if (val < 3600) {
    let min = Math.floor(val / 60);
    let sec = val - min * 60;
    return `${pref}${min < 10 ? '0':''}${min}:${sec < 10 ? '0':''}${sec}`;
  } else {
    let hour = Math.floor(val / 3600);
    let min = Math.floor((val - hour * 3600) / 60);
    let sec = val - hour * 3600 - min * 60;
    return `${pref}${hour}:${min < 10 ? '0':''}${min}:${sec < 10 ? '0':''}${sec}`;
  }
}

export default Ember.Helper.helper(formatTime);
