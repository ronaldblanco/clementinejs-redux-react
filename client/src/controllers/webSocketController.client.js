/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
(() => {
  //  GLOBALS for SOCKET use
  let connected = 0;
  let act = false;
  let name = '';
  //  ////////////////////////

  const socket = io.connect('/');
  const socket1 = io.connect('/');
  socket1.on('broadcast', (data) => {
    console.log('broadcast:', data);
    // eslint-disable-next-line no-alert
    alert(data);
  });

  const client = io.connect('/');
  client.on('stats', (data) => {
    connected = data.numClients;
    act = data.data.act;
    name = data.data.name;

    const count = document.querySelector('#count');
    const lastope = document.querySelector('#lastope');

    if (act === true) {
      count.innerHTML = `Connected Clients: <kbd>${connected}</kbd>`;
      lastope.innerHTML = `Last data operation: <kbd>${data.data.ope}</kbd> <kbd>${name}</kbd>`;
      document.getElementById('adddata').addEventListener('click', () => {
        const name = document.querySelector('#name').value;
        window.setTimeout(() => {
          socket.emit(
            'event',
            {
              message: 'I did add a name to the array!',
              name: name, ope: 'add',
            }
          );
        }, 1000);
      });
      document.getElementById('deldata').addEventListener('click', () => {
        const name = document.querySelector('input[name = "radioData"]:checked').value;
        window.setTimeout(() => {
          socket.emit(
            'event',
            {
              message: 'I did remove a name to the array!',
              name: name, ope: 'del',
            }
          );
        }, 1000);
      });
    }
  });
})();
/* eslint-enable no-console */
/* eslint-enable no-undef */
/* eslint-enable max-len */
/* eslint-enable no-shadow */
/* eslint-enable object-shorthand */