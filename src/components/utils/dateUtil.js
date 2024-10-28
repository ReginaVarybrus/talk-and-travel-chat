import {
  format,
  isThisWeek,
  isToday,
  isYesterday,
  differenceInMinutes,
  differenceInHours,
} from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDate = dateString => {
  const messageDate = new Date(dateString);

  if (isToday(messageDate)) {
    return format(messageDate, 'HH:mm');
  }

  if (isYesterday(messageDate)) {
    return 'Yesterday';
  }

  if (isThisWeek(messageDate)) {
    return format(messageDate, 'EEE', { locale: enUS });
  }

  return format(messageDate, 'dd.MM.yyyy');
};

export const formatDateOfLastSeen = dateString => {
  const messageDate = new Date(dateString);
  const currentTime = new Date();

  if (isToday(messageDate)) {
    const minutesDifference = differenceInMinutes(currentTime, messageDate);
    if (minutesDifference < 60) {
      return `last seen ${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    }
    const hoursDifference = differenceInHours(currentTime, messageDate);
    return `last seen ${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
  }

  if (isYesterday(messageDate)) {
    return 'last seen yesterday';
  }

  if (isThisWeek(messageDate)) {
    const dayOfWeek = format(messageDate, 'EEE', { locale: enUS });
    return `last seen on ${dayOfWeek}`;
  }

  return 'last seen a long time ago';
};
