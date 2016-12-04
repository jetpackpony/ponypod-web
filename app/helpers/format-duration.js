import Ember from 'ember';

export function formatDuration([value]) {
  if (value < 60) {
    return `${value} second${value > 1 ? 's' : ''}`;
  } else if (value < 3600) {
    let val = Math.round(value / 60);
    return `${val} minute${value > 1 ? 's' : ''}`;
  } else {
    let h = Math.floor(value/3600);
    let m = Math.round((value - h * 3600) / 60);
    return `${h} hour${h > 1 ? 's' : ''} ${m} minute${m > 1 ? 's' : ''}`;
  }
}

export default Ember.Helper.helper(formatDuration);
