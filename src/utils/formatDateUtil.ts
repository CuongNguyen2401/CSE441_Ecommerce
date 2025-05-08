import dayjs from 'dayjs';
import {NO_DATA} from './validations';

export const formatDate = (
  value: string | number | Date | dayjs.Dayjs,
  format = 'MM/DD/YYYY',
) => {
  if (!value) return NO_DATA;

  return dayjs(value).format(format);
};

export const formatDateWithAtKeyword = (
  value: string | number | Date | dayjs.Dayjs,
  isHaveClockSystem: boolean = true,
) => {
  if (!value) return '';
  return `${dayjs(value).format('MM/DD/YYYY')} at ${dayjs(value).format(
    isHaveClockSystem ? 'hh:mm A' : 'HH:mm',
  )}`;
};
