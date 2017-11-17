let React = require('react');
let Link = require('react-router').Link;
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { validate, warn, renderField } from './validation';

import { onSubmit } from '../../actions';

const CreateLocal = (props) => {
  // console.log(props);
  const { pristine, reset, submitting } = props;
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
  handleSubmit: React.PropTypes.oneOfType([
    React.PropTypes.function,
    React.PropTypes.object]),
  pristine: React.PropTypes.oneOfType([
    React.PropTypes.function,
    React.PropTypes.boolean]),
  reset: React.PropTypes.oneOfType([
    React.PropTypes.function,
    React.PropTypes.object]),
  submitting: React.PropTypes.oneOfType([
    React.PropTypes.function,
    React.PropTypes.boolean]),
};

const createReduxForm = reduxForm({
  form: 'simpleCreateLocal', // a unique identifier for this form
  onSubmit,
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
});
const CreateLocalComponent = createReduxForm(CreateLocal);
export default connect(/*mapStateToProps*/)(CreateLocalComponent);
