let React = require('react');
let Link = require('react-router').Link;
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
// import { getMess } from '../../reducer';

import { validate, warn, renderField } from './validation';
// import renderField from './validation';

import { onSubmit } from '../../actions';

/* const onSubmit = (values, dispatch, getState) => {
 dispatch( {type: 'NEW_USER', user: values} );
 window.location.replace(
   `/auth/form?username=${values.username}?display=${values.display}?password=${values.password}`
 );
 // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}; */

/* const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const onSubmit = (function showResults(values, dispatch) {
  // console.log(dispatch);
  // dispatch(    // your submit action //      );
  sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  // dispatch(submitFormValues(values));
  // window.location.replace("/auth/localnew");
}); */


const CreateLocal = (props) => {
  console.log(props);
  const { /* handleSubmit,*/ pristine, reset, submitting/* , onSubmit */ } = props;
  return (
    <div className="container">
      <div id="message"></div>
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
              <Field
                name="username"
                component={renderField}
                type="text"
                placeholder="Username or Email"
                className="form-control"
              />
              <br />
            </div>
            <div>	<label>Display Name:</label>
              <Field
                name="display"
                component={renderField}
                type="text"
                placeholder="Display Name"
                className="form-control"
              />
              <br />
            </div>
            <div>	<label>Password:</label>
              <Field
                name="password"
                component={renderField}
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
          </div><br />
          <div className="form-group">
            <div>
              <button
                type="submit"
                disabled={pristine || submitting}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
                className="btn btn-primary"
              >
                Clear Values
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

CreateLocal.propTypes = {
  handleSubmit: React.PropTypes.function,
  pristine: React.PropTypes.boolean,
  reset: React.PropTypes.function,
  submitting: React.PropTypes.boolean,
};

/* function mapStateToProps(state) {
  return {
    message: getMess(state),
  };
} */

const createReduxForm = reduxForm({
  form: 'simpleCreateLocal', // a unique identifier for this form
  onSubmit,
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
});
const CreateLocalComponent = createReduxForm(CreateLocal);
export default connect(/*mapStateToProps*/)(CreateLocalComponent);
// action="/auth/localnew" method="post" //onSubmit={ handleSubmit }
