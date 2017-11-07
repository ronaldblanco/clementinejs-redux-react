import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { validate, renderField } from './adminvalidate';

import { connect } from 'react-redux';
let Link = require('react-router').Link;

const onSubmit = (values) => {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

const renderDatas = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()} className="btn btn-primary" >
        Add Data
      </button>
    </li>
    {fields.map((data, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Data"
          onClick={() => fields.remove(index)}
          className="btn"
        />
        <Field
          name={`${data}.name`}
          type="text"
          component={renderField}
          label={`Data #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderUsers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})} className="btn btn-primary">
        Add User
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((user, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove User"
          onClick={() => fields.remove(index)}
          className="btn"
        />
        <h4>User #{index + 1}</h4>
        <Field
          name={`${user}.username`}
          type="text"
          component={renderField}
          label="User Name"
        />
          <Field
            name={`${user}.display`}
            type="text"
            component={renderField}
            label="Display Name"
          />
          <Field
            name={`${user}.password`}
            type="password"
            component={renderField}
            label="Password"
          />
          <Field
            name={`${user}.clicks`}
            type="text"
            component={renderField}
            label="Clicks"
          />
          <FieldArray name={`${user}.datas`} component={renderDatas} />
      </li>
    ))}
  </ul>
);

const AdminForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div className="container">
      <div>
        <img src="img/clementine_150.png" role="presentation" />
        <br />
        <p className="clementine-text">Clementine.js</p>
        <Link className="menu" className="btn" id="login-btn" to={"/authlocal"}>
          Login Local User
        </Link>
        <Link className="menu" className="btn" id="login-btn" to={"/createlocal"}>
          Create Local User
        </Link>
        <Link className="menu" className="btn" id="login-btn" to={"/resetlocal"}>
          Reset Local Password
        </Link>
        <Link className="menu" to={"/login"}>Return to Login Page</Link>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          
          <FieldArray name="users" component={renderUsers} />
        </div>
        <div>
          <button type="submit" disabled={submitting} className="btn btn-primary" >
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset} className="btn" >
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
};

renderDatas.propTypes = {
  fields: React.PropTypes.array,
  meta: React.PropTypes.object,
};

renderUsers.propTypes = {
  fields: React.PropTypes.array,
  meta: React.PropTypes.object,
};

AdminForm.propTypes = {
  handleSubmit: React.PropTypes.function,
  pristine: React.PropTypes.boolean,
  reset: React.PropTypes.function,
  submitting: React.PropTypes.boolean,
};

/* export default reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  onSubmit: onSubmit,
  validate,
})(FieldArraysForm); */

const createReduxForm = reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  onSubmit,
  validate, // <--- validation function given to redux-form
});
const AdminFormComponent = createReduxForm(AdminForm);
export default connect()(AdminFormComponent);
