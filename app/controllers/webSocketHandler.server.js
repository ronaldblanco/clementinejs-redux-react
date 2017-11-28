// no require needed here, at least, I don't think so
// Controller agrees to implement the function called "respond"

/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
/* eslint-disable brace-style */
module.exports.respond = (endpoint, socket, act, config, numClients) => {
  config.act = act;
  const io = endpoint;
  socket.on('event', (data) => {
    // if (data.message === 'I did add a var to the array!') {
    if (data.message !== undefined) {
      config.name = data.name;
      config.ope = data.ope;
      config.username = data.username;
      io.emit('stats', { numClients: numClients, data: config });
    }
    /* else if (data.message === 'I did remove a var to the array!') {
      config.name = data.name;
      config.ope = data.ope;
      config.username = data.username;
      io.emit('stats', { numClients: numClients, data: config });
    } */
    /* else if (data.message === 'Send me again please!') {
      // io.emit('stats', { numClients: numClients, data: config });
    } */
  });

  numClients++;
  io.emit('stats', { numClients: numClients, data: config });

  socket.on('disconnect', () => {
    numClients--;
    io.emit('stats', { numClients: numClients, data: config });
  });
};
/* eslint-enable no-console */
/* eslint-enable no-undef */
/* eslint-enable max-len */
/* eslint-enable no-shadow */
/* eslint-enable object-shorthand */
/* eslint-enable no-param-reassign */
/* eslint-enable brace-style */
