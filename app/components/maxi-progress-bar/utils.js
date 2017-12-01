import R from 'npm:ramda';
import { calcPercentage } from '../../helpers/helper-functions';

export const isTouchEvent = (event) => !R.isNil(event.touches);

export const getXCoordFromEvent = (event) => (
  ((event.touches) ? event.touches[0] : event).pageX || 0
);

export const calcProgress = (barOffset, barWidth, xCoordinate) => (
  calcPercentage(xCoordinate - barOffset, barWidth)
);
