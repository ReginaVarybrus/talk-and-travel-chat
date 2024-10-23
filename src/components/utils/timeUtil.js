export const timeStampConverter = time => {
  const date = new Date(time);
  const minute = date.getMinutes().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');

  return `${hour}:${minute}`;
};

// export const dateStampConverter = time => {
//   const date = new Date(time);
//   const day = date.getDate();
//   const month = date.getMonth().toString().padStart(2, '0');
//   const year = date.getFullYear();

//   return `${day}.${month}.${year}`;
// };

// export const dayOfWeekStampConverter = time => {
//   const date = new Date(time);

//   const daysOfWeek = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//   const dayOfWeek = daysOfWeek[date.getDay()];

//   return `${dayOfWeek}`;
// };
