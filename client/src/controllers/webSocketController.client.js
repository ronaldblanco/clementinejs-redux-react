
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable curly */
//  GLOBALS for SOCKET use
let connected = 0;
let act = false;
let name = '';
let userName = '';
let click = 0;
if (window.__INITIAL_STATE__.mainReducer.user !== undefined) {
  userName = window.__INITIAL_STATE__.mainReducer.user.username;
  click = window.__INITIAL_STATE__.mainReducer.clicks;
}
const count = document.querySelector('#count');
const lastope = document.querySelector('#lastope');
const client = io.connect('/');

// Functions //////////////
function socketEmit(id, event, socket) {
    window.setTimeout(() => {
      socket.emit(id, event);
    }, 1000);
}
function listeners(data, socket) {
  if (document.getElementById('adddata') !== null) document.getElementById('adddata').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    socketEmit('event', { message: 'I did add a var to the array!', name: name, ope: 'add', username: userName }, socket);
  });
  if (document.getElementById('deldata') !== null) document.getElementById('deldata').addEventListener('click', () => {
    const name = document.querySelector('input[name = "radioData"]:checked').value;
    socketEmit('event', { message: 'I did remove a var to the array!', name: name, ope: 'del', username: userName }, socket);
  });
  if (document.getElementById('clickb') !== null) document.getElementById('clickb').addEventListener('click', () => {
    socketEmit('eventclick', { message: 'I did click!', name: '', ope: 'click', username: userName, initclicks: click }, socket);
  });
  if (document.getElementById('resetb') !== null) document.getElementById('resetb').addEventListener('click', () => {
    socketEmit('event', { message: 'I did reset!', name: '', ope: 'reset', username: userName }, socket);
  });
}
function clientOn(stats, socket) {
  client.on(stats, (data) => {
    connected = data.numClients;
    act = data.data.act;
    name = data.data.name;
    if (data.data.ope === 'click') name = data.data.clicks;

    if (act === true) {
      count.innerHTML = `Connected Clients: <kbd>${connected}</kbd>`;
      lastope.innerHTML = `Last Vars operation: User:<kbd>${data.data.username}</kbd> <kbd>${data.data.ope}</kbd> <kbd>${name}</kbd>`;
      listeners(data, socket);
    }
  });
}
// /////////////////////////////////////////

(() => {
  const socket = io.connect('/');
  const socket1 = io.connect('/');
  socket1.on('broadcast', (data) => {
    // console.log('broadcast:', data);
    // eslint-disable-next-line no-alert
    alert(data);
  });

  clientOn('stats', socket);
  clientOn('statsclick', socket);
})();
/* eslint-enable no-underscore-dangle */
/* eslint-enable no-console */
/* eslint-enable no-undef */
/* eslint-enable max-len */
/* eslint-enable no-shadow */
/* eslint-enable object-shorthand */
/* eslint-enable curly */
