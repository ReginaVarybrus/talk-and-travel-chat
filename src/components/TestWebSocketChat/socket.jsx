// import io from 'socket.io-client';

// const socket = io(`${import.meta.env.VITE_APP_API_URL}/ws/`);

// socket.on('connect', () => {
//   console.log('Connected successful');
// });

// socket.on('disconnect', () => {
//   console.log('Disconnect');
// });

// socket.on('error', error => {
//   console.error('Socket error:', error);
// });

// const closeSocket = () => {
//   socket.close();
// };

// export const sendDataToServer = (countryName, data) => {
//   socket.emit(`/api/country/${countryName}`, JSON.stringify(data));
// };

// export const receiveDataFromServer = (countryName, response) => {
//   const data = JSON.parse(response.body);
//   socket.on(`/group-message/${countryName}`, data);
//   console.log('websocket data', data);
// };

// export { closeSocket };
