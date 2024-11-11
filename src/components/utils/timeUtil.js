export const timeStampConverter = time => {
  const date = new Date(time);
  const minute = date.getMinutes().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');

  return `${hour}:${minute}`;
};
