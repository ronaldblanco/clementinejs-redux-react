import React from 'react';
import { MainContainer as Main } from './components/main.jsx';
import Login from './components/login.jsx';
// import { AuthLocal } from './components/localauth/AuthLocal.jsx';
import AuthLocalComponent from './components/localauth/AuthLocal.jsx';
// import { CreateLocal } from './components/localauth/CreateLocal.jsx';
import CreateLocalComponent from './components/localauth/CreateLocal.jsx';
// import CreateLocalContainer from './components/localauth/CreateLocal.jsx';
import { ResetLocalContainer as ResetLocal } from './components/localauth/ResetLocal.jsx';
import { CreationOkLocal } from './components/localauth/CreationOkLocal.jsx';
import { ProfileContainer as Profile } from './components/profile.jsx';

/*import {
//  Code,
//  Markdown,
  Values,
//  generateExampleBreadcrumbs
} from 'redux-form-website-template'*/

// console.log(CreateLocalComponent);
// console.log(CreateLocalComponent);

/* const onSubmit = (values) => {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}; */

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
    if (!store.getState().loggedIn) replace('/login');
  };

  const onEnterUnauth = (nextState, replace) => {
    if (store.getState().loggedIn) replace('/main');
    // else if (store.getState().local && !store.getState().loggedIn) replace('/creationoklocal');
  };
  
  return {
    path: '/',
    component: App,
    indexRoute: {
      component: Main },
    childRoutes: [
      { path: 'main', component: Main, onEnterAuth },
      { path: 'profile', component: Profile, onEnterAuth },
      { path: 'login', component: Login, onEnterUnauth },
      { path: 'authlocal', component: AuthLocalComponent, onEnterUnauth },
      { path: 'createlocal', component: CreateLocalComponent/*, onSubmit: onSubmit*/, onEnterUnauth },
      { path: 'resetlocal', component: ResetLocal, onEnterUnauth },
      { path: 'creationoklocal', component: CreationOkLocal, onEnterUnauth },
    ],
  };
};
