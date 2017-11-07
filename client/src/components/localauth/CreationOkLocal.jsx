let React = require('react');
let Link = require('react-router').Link;

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { validate, warn } from './validation';
import renderField from './validation';

import { onSubmit } from '../../actions';

/* module.exports = React.createClass({
	render: function() {
		return (*/
// export const CreationOkLocal = () => (
const CreateOkLocal = (props) => {
  console.log(props);
  const { handleSubmit, pristine, reset, submitting/* , onSubmit */ } = props;
  return (
    <div className="container" >
      <div>
        <img src="img/clementine_150.png" role="presentation" />
        <br />
        <p className="clementine-text">Clementine.js</p>
        <Link className="menu" className="btn" to={"/createlocal"}>Create Local User</Link>
        <Link className="menu" className="btn" to={"/resetlocal"}>Reset Local Password</Link>
        <Link className="menu" to={"/login"}>Return to Login Page</Link>
      </div>
      <div>
        <div className="alert alert-info">
          <h2>User Created correctly or in database! You can login!</h2>
        </div>
        <form action="/auth/local" method="post">
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
//			);
/*		);
	}
});*/

const createReduxForm = reduxForm({
  form: 'simpleCreateOkLocal', // a unique identifier for this form
  onSubmit,
  validate, // <--- validation function given to redux-form
  warn, // <--- warning function given to redux-form
});
const CreateLocalOkComponent = createReduxForm(CreateOkLocal);
export default connect(/*mapStateToProps*/)(CreateLocalOkComponent);
