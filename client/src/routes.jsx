import React from 'react';
import { MainContainer as Main } from './components/main.jsx';
import { LoginContainer } from './components/login.jsx';
import AuthLocalComponent from './components/localauth/AuthLocal.jsx';
import CreateLocalComponent from './components/localauth/CreateLocal.jsx';
import { ResetLocalContainer as ResetLocal } from './components/localauth/ResetLocal.jsx';
import CreateLocalOkComponent from './components/localauth/CreationOkLocal.jsx';
import { ProfileContainer as Profile } from './components/profile.jsx';
import AdminFormComponent from './components/AdminForm.jsx';

const App = ({ children }) => (
  <div>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]),
};

export const createRoutes = (store) => {
  const onEnterAuth = (nextState, replace) => {
    if (!store.getState().mainReducer.loggedIn) replace('/login');
  };

  const onEnterUnauth = (nextState, replace) => {
    if (store.getState().mainReducer.loggedIn) replace('/main');
  };

  const onEnterCreateUser = (nextState, replace) => {
    /* eslint-disable no-console */
    console.log(store.getState());
    /* eslint-enable no-console */
    if (store.getState().form.simpleCreateLocal.values) replace('/creationoklocal');
    else if (!store.getState().form.simpleCreateLocal.values) replace('/createlocal');
  };

  const onEnterContinue = () => {
    /* eslint-disable no-console */
    console.log(store.getState());
    /* eslint-enable no-console */
  };

  return {
    path: '/',
    component: App,
    indexRoute: {
      component: Main },
    childRoutes: [
      { path: 'main', component: Main, onEnterAuth },
      { path: 'profile', component: Profile, onEnterAuth },
      { path: 'login', component: LoginContainer, onEnterUnauth },
      { path: 'authlocal', component: AuthLocalComponent, onEnterUnauth },
      { path: 'createlocal', component: CreateLocalComponent, onEnterCreateUser },
      { path: 'resetlocal', component: ResetLocal, onEnterUnauth },
      { path: 'creationoklocal', component: CreateLocalOkComponent, onEnterContinue },
      { path: 'adminform', component: AdminFormComponent, onEnterUnauth },
    ],
  };
};
