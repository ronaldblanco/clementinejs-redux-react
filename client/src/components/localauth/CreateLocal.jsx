let React = require('react');
let Link = require('react-router').Link;
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { validate, warn } from './validation';
import renderField from './validation';

/*const onSubmit = (values, dispatch) => {
 // dispatch(    // your submit action //      );
 window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};*/

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = (/*async*/ function showResults(values, dispatch) {
  // console.log(dispatch);
  // dispatch(    // your submit action //      );
  /*await*/ sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  // dispatch(submitFormValues(values));
  // window.location.replace("/auth/localnew");
});


const CreateLocal = (props) => {
   console.log(props);
  
  const { handleSubmit, pristine, reset, submitting/*, onSubmit */ } = props;
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
      <Link className="menu" id="login-btn" to={"/fieldarraysform"}>fieldarraysform</Link>
    </div>
    <div className="alert alert-warning">
      <h5>A Valid Email as your username is necesary for the reset password option!</h5>
    </div>
    <div>
      <form action="/auth/localnew" method="post" onSubmit={ /*props.route.onSubmit*/ /*onSubmit*/ /*props.handleSubmit*/ /*showResults*/ handleSubmit } >
        <h3>CREATE LOCAL USER</h3>
        <div className="form-group">
          <div>
            <label>Username:</label>
              <Field name="username" component={renderField} type="text" placeholder="Username or Email" className="form-control" />
            <br />
          </div>
          <div>	<label>Display Name:</label>
            <Field name="display" component={renderField} type="text" placeholder="Display Name" className="form-control" />
            <br />
          </div>
          <div>	<label>Password:</label>
            <Field name="password" component={renderField} type="password" placeholder="Password" className="form-control" />
          </div>
        </div><br />
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
// <Values form="simple" /> // onSubmit={ /*props.route.onSubmit*/ /*onSubmit*/ /*props.handleSubmit*/ /*showResults*/ handleSubmit }
const createReduxForm = reduxForm({
  form: 'simpleCreateLocal', // a unique identifier for this form
  onSubmit,
  validate, // <--- validation function given to redux-form
  warn // <--- warning function given to redux-form
  });
const CreateLocalComponent = createReduxForm( CreateLocal );
export default connect()(CreateLocalComponent);
