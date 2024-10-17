import { format, isThisWeek, isToday, isYesterday } from 'date-fns';
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
