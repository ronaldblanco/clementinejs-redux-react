let React = require('react');
let Link = require('react-router').Link;
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { validate, warn, renderField } from './validation';
import { onSubmit } from '../../actions';

const AuthLocal = (props) => {
  // console.log(props);
  const { pristine, reset, submitting } = props;
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
        <form action="/auth/local" method="post" >
          <h3>LOGIN LOCAL USER</h3>
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
            <div>
              <label>Password:</label>
              <Field
                name="password"
                component={renderField}
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
          </div>
          <br />
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

AuthLocal.propTypes = {
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
  form: 'simpleAuthLocal', // a unique identifier for this form
  onSubmit,
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
});
const AuthLocalComponent = createReduxForm(AuthLocal);
export default connect()(AuthLocalComponent);
