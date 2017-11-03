let React = require('react');
let Link = require('react-router').Link;
import { Field, reduxForm } from 'redux-form';

import { validate, warn } from './validation';
import renderField from './validation';

const AuthLocal = (props) => {
   console.log(props);
  
  const { /*handleSubmit,*/ pristine, reset, submitting/*, onSubmit*/ } = props;
  return (
  <div className="container">
    <div className="" id="message"></div>
    <div>
      <img src="img/clementine_150.png" role="presentation" />
      <br />
      <p className="clementine-text">Clementine.js</p>
      <Link className="menu" className="btn" id="login-btn" to={"/createlocal"}>
        Create Local User
      </Link>
      <Link className="menu" className="btn" id="login-btn" to={"/resetlocal"}>
        Reset Local Password
      </Link>
      <Link className="menu" to={"/login"}>Return to Login Page</Link>
    </div>
    <div>
      <form action="/auth/local" method="post" onSubmit={ props.route.onSubmit /*onSubmit*/ /*props.handleSubmit*/ } >
        <h3>LOGIN LOCAL USER</h3>
        <div className="form-group">
          <div>
            <label>Username:</label>
            <Field name="username" component={renderField} type="text" placeholder="Username or Email" className="form-control" />
            <br />
          </div>
          <div>
            <label>Password:</label>
            <Field name="password" component={renderField} type="password" placeholder="Password" className="form-control" />
          </div>
        </div>
        <br />
        <div className="form-group">
          <div>
            <button type="submit" disabled={pristine || submitting} className="btn btn-primary" >Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary" >Clear Values</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  
  );
};

const createReduxForm = reduxForm({ 
  form: 'simpleAuthLocal', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
  });
const AuthLocalComponent = createReduxForm( AuthLocal );
export default AuthLocalComponent;
