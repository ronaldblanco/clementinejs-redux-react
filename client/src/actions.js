
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
  // eslint-disable-next-line max-len
  query = `?name=${document.querySelector('#name').value}?value=${document.querySelector('#value').value}`;
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
  ajax('DELETE', `/api/:id/infodel${query}`).then(() => {
    ajax('GET', '/api/:id/info')
    .then(data => {
      const nDatas = data.data;
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
  ajax('POST', `/auth/localnewreset?name=${resetUsername}`).then(data => {
    dispatch(setMess({ message: data.message, type: data.type }));
    /* eslint-disable no-console */
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

// //////////////////////////////////////////////////////////////////////////////////////
// FORM ACTIONS POSIBILITY
// import axios from 'axios';

/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
export const adminOnSubmit = (values, dispatch, getState) => {
  dispatch({ type: 'LOADING', what: 'adminManagement' });
  let info = '';
  if (values.users.length === getState.initialValues.users.length && getState.initialValues !== undefined) {
    // console.log('Updating...');
    values.users.map((user, index) => {
      getState.initialValues.users.map((iUser, iIndex) => {
        if (user.username === iUser.username && user !== iUser) {
          // console.log(user.username);
          // console.log(iUser);
          if (user.password === iUser.password) {
            info = `?username=${user.username}?display=${user.display}?email=${user.email}?password=${user.password}?clicks=${user.clicks}`;
          } else {
            info = `?username=${user.username}?display=${user.display}?email=${user.email}?password=${md5Hex(user.password)}?clicks=${user.clicks}`;
          }
          user.datas.map((data, indexData) => {
            info = `${info}?datas=${data.name}::${data.value}`;
            // return info;
          });
          ajax('POST', `/admin/setusers${info}`).then(data => {
          /* eslint-disable no-console */
            // console.log(data);
          }, error => { console.log(error); });
        /* eslint-enable no-console */
        }
        // return 0;
      });
      // return 0;
    });
  } else if (values.users.length > getState.initialValues.users.length && getState.initialValues !== undefined) {
    // console.log('Creating...');
    const count = values.users.length - getState.initialValues.users.length;
    // console.log(count);
    /* eslint-disable no-loop-func */
    for (let i = (values.users.length - count); i < values.users.length; i = i + 1) {
      // console.log(values.users[i].username);
      info = `?username=${values.users[i].username}?display=${values.users[i].display}?email=${values.users[i].email}?password=${md5Hex(values.users[i].password)}?clicks=${values.users[i].clicks}`;
      values.users[i].datas.map((data, indexData) => {
        info = `${info}?datas=${data.name}::${data.value}`;
      });
      ajax('POST', `/admin/setusers${info}`).then(data => {
        /* eslint-disable no-console */
        console.log(data);
      }, error => { console.log(error); });
      /* eslint-enable no-console */
    }
    /* eslint-enable no-loop-func */
  } else if (values.users.length < getState.initialValues.users.length && getState.initialValues !== undefined) {
    // console.log('Deleting...');
    const toDelete = getState.initialValues.users;
    values.users.map((userV, indexV) => {
      toDelete.map((userD, indexD) => {
        if (userV.username === userD.username) toDelete.splice(indexD, 1);
      });
    });
    // console.log(toDelete);
    /* eslint-disable no-loop-func */
    for (let i = 0; i < toDelete.length; i = i + 1) {
      // console.log(toDelete[i].username);
      ajax('POST', `/admin/delusers?username=${toDelete[i].username}`).then(data => {
        /* eslint-disable no-console */
        console.log(data);
      }, error => { console.log(error); });
      /* eslint-enable no-console */
    }
    /* eslint-enable no-loop-func */
  }
  ajax('GET', '/admin/getusers').then(data => {
    dispatch({ type: 'ADMIN_MA', users: data.users });
          /* eslint-disable no-console */
  }, error => { console.log(error); });
        /* eslint-enable no-console */
  /* eslint-disable no-alert */
  window.alert('The Operation was Correctly!');
  window.location.replace('/login');
  /* eslint-enable no-alert */
};
/* eslint-enable max-len */
/* eslint-enable array-callback-return */
/* eslint-enable no-unused-vars */

export const loadInit = (values, dispatch) => {
  dispatch({ type: 'LOADING', what: 'adminManagementInit' });
  ajax('GET', '/admin/getusers').then(data => {
    dispatch({ type: 'ADMIN_MA', users: data.users });
          /* eslint-disable no-console */
  }, error => { console.log(error); });
        /* eslint-enable no-console */
  // window.alert('The initial Load was Correctly!');
};
