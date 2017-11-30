// no require needed here, at least, I don't think so
// Controller agrees to implement the function called "respond"

/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
/* eslint-disable brace-style */
function values(config, data) {
  config.name = data.name;
  config.ope = data.ope;
  config.username = data.username;
}
module.exports.respond = (endpoint, socket, act, config, numClients) => {
  config.act = act;
  const io = endpoint;
  config.clicks = 0;

  socket.on('event', (data) => {
    if (data.message !== undefined) {
      values(config, data);
      io.emit('stats', { numClients: numClients, data: config });
    }
  });

  socket.on('eventclick', (data) => {
    if (config.clicks === 0) config.clicks = data.initclicks;
    config.clicks = config.clicks + 1;
    values(config, data);
    io.emit('statsclick', { numClients: numClients, data: config });
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
