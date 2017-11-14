
import ajax from './utils/ajax';
import md5Hex from 'md5-hex';

let query = '';
let resetUsername = '';

function setClicks(nClicks) {
  return { type: 'SET_CLICKS', clicks: nClicks };
}

export const reset = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'clicks' });
  ajax('DELETE', '/api/user/clicks').then(() => {
    ajax('GET', '/api/user/clicks')
    .then(data => {
      const nClicks = data.clicks;
      dispatch(setClicks(nClicks));
     /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
 /* eslint-enable no-console */
};

export const click = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'clicks' });
  ajax('POST', '/api/user/clicks').then(() => {
    ajax('GET', '/api/user/clicks').then(data => {
      const nClicks = data.clicks;
      dispatch(setClicks(nClicks));
    /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

// //////////////////////////////////////////////////////////////////////////
// DATA CONTROLLER

function setDatas(nDatas) {
  return { type: 'SET_DATAS', data: nDatas };
}

export const adddata = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'datas' });
  query = `?name=${document.querySelector('#name').value}`;
  // query = '?name=' + document.querySelector('#name').value;
  // ajax('POST', '/api/:id/infoadd' + query).then(() => {
  ajax('POST', `/api/:id/infoadd${query}`).then(() => {
    ajax('GET', '/api/:id/info').then(data => {
      const nDatas = data.data;
      dispatch(setDatas(nDatas));
      /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

export const deldata = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'datas' });
  query = `?name=${document.querySelector('input[name = "radioData"]:checked').value}`;
  // query = '?name=' + document.querySelector('input[name = "radioData"]:checked').value;
  // ajax('DELETE', '/api/:id/infodel' + query).then(() => {
  ajax('DELETE', `/api/:id/infodel${query}`).then(() => {
    ajax('GET', '/api/:id/info')
    .then(data => {
      const nDatas = data.data;
      // console.log(nDatas);
      dispatch(setDatas(nDatas));
      /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

// ////////////////////////////////////////////////////////////////////////
// RESET LOCAL
function setMess(me) {
  return { type: 'SET_MESS', mess: me };
}

export const resetlocal = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'message' });
  resetUsername = document.querySelector('#resetusername').value;
  // ajax('POST', '/auth/localnewreset?name=' + resetUsername).then(data => {
  ajax('POST', `/auth/localnewreset?name=${resetUsername}`).then(data => {
    dispatch(setMess({ message: data.message, type: data.type }));
    /* eslint-disable no-console */
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

// //////////////////////////////////////////////////////////////////////////////////////
// FORM ACTIONS POSIBILITY
// import axios from 'axios';

export const adminOnSubmit = (values, dispatch, getState) => {
  dispatch({ type: 'LOADING', what: 'adminManagement' });
  // console.log(getState.initialValues);
  // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  let info = '';
  if (values.users.length === getState.initialValues.users.length && getState.initialValues !== undefined) {
    values.users.map((user/* , index */) => {
      getState.initialValues.users.map((iUser/* , iIndex */) => {
        if (user.username === iUser.username && user !== iUser) {
          console.log(user.username);
          // console.log(iUser);
          if (user.password === iUser.password) info = `?username=${user.username}?display=${user.display}?email=${user.email}?password=${user.password}?clicks=${user.clicks}`;
          else info = `?username=${user.username}?display=${user.display}?email=${user.email}?password=${md5Hex(user.password)}?clicks=${user.clicks}`;
          user.datas.map((data/* , indexData */) => {
            info = `${info}?datas=${data.name}`;
          });
          ajax('POST', `/admin/setusers${info}`).then(data => {
          /* eslint-disable no-console */
          }, error => { console.log(error); });
        /* eslint-enable no-console */
        }
      });
    });
  } else if (values.users.length > getState.initialValues.users.length && getState.initialValues !== undefined){
    let count = values.users.length - getState.initialValues.users.length;
    // console.log(count);
    for (let i = (values.users.length - count); i < values.users.length; i = i + 1) {
      console.log(values.users[i].username);
      info = `?username=${values.users[i].username}?display=${values.users[i].display}?email=${values.users[i].email}?password=${md5Hex(values.users[i].password)}?clicks=${values.users[i].clicks}`;
      values.users[i].datas.map((data/* , indexData */) => {
        info = `${info}?datas=${data.name}`;
      });
      ajax('POST', `/admin/setusers${info}`).then(data => {
        /* eslint-disable no-console */
        console.log(data);
      }, error => { console.log(error); });
      /* eslint-enable no-console */
    }
  }
  ajax('GET', '/admin/getusers').then(data => {
    dispatch({ type: 'ADMIN_MA', users: data.users });
          /* eslint-disable no-console */
  }, error => { console.log(error); });
        /* eslint-enable no-console */
  window.alert('The Operation was Correctly!');
  window.location.replace(`/login`);
};

export const loadInit = (values, dispatch, getState) => {
  dispatch({ type: 'LOADING', what: 'adminManagementInit' });
  ajax('GET', '/admin/getusers').then(data => {
    dispatch({ type: 'ADMIN_MA', users: data.users });
          /* eslint-disable no-console */
  }, error => { console.log(error); });
        /* eslint-enable no-console */
  window.alert('The initial Load was Correctly!');
};

export const onSubmit = (values, dispatch/* , getState */) => {
  dispatch({ type: 'NEW_USER', user: values });
  /* ajax(
  'GET',
  `/auth/form?username=${values.username}?display=${values.display}?password=${values.password}`
  )
  .then(data => { */
  ajax('POST', '/auth/localnew').then(data => {
    console.log(data);
    // dispatch(setMess({ message: data.message, type: data.type }));
    /* eslint-disable no-console */
  }, error => { console.log(error); });
  /* eslint-enable no-console */
 /* window.location.replace(
 `/auth/form?username=${values.username}?display=${values.display}?password=${values.password}`
 );*/
 // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};
