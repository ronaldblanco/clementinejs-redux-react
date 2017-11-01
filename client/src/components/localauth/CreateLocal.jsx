let React = require('react');
let Link = require('react-router').Link;
import { Field, reduxForm } from 'redux-form';

const CreateLocal = (props) => {
  console.log(props);
  const { /*handleSubmit,*/ pristine, reset, submitting } = props;
  return (
    <div className="container">
    <div className="" id="message"></div>
    <div>
      <img src="img/clementine_150.png" role="presentation" />
      <br />
      <p className="clementine-text">Clementine.js</p>
      <Link className="menu" className="btn" id="login-btn" to={"/authlocal"}>
        Login Local User
      </Link>
      <Link className="menu" className="btn" id="login-btn" to={"/resetlocal"}>
        Reset Local Password
      </Link>
      <Link className="menu" to={"/login"}>Return to Login Page</Link>
    </div>
    <div className="alert alert-warning">
      <h5>A Valid Email as your username is necesary for the reset password option!</h5>
    </div>
    <div>
      <form action="/auth/localnew" method="post" >
        <h3>CREATE LOCAL USER</h3>
        <div className="form-group">
          <div>
            <label>Username:</label>
              <Field name="username" component="input" type="text" placeholder="Username or Email" />
            <br />
          </div>
          <div>	<label>Display Name:</label>
            <Field name="display" component="input" type="text" />
            <br />
          </div>
          <div>	<label>Password:</label>
            <Field name="password" component="input" type="password" placeholder="Password" />
          </div>
        </div><br />
        <div className="form-group">
          <div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </div>
      </form>
    
    </div>
  </div>
  );
};
// console.log(CreateLocal);  // onSubmit={handleSubmit}
// create new, "configured" function
const createReduxForm = reduxForm({ form: 'simpleCreateLocal' });
// console.log(createReduxForm);
// evaluate it for ContactForm component
const CreateLocalComponent = createReduxForm( CreateLocal );
// console.log(CreateLocalComponent);
export default CreateLocalComponent;

/* export default reduxForm({
  form: 'simpleCreateLocal'  // a unique identifier for this form
})(CreateLocal) */

// <input type="submit" className="btn btn-primary" value="Submit" />
