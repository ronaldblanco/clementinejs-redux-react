import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { validate, renderField } from './validate';

import { connect } from 'react-redux';
let Link = require('react-router').Link;

const onSubmit = (values) => {
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()} className="btn btn-primary" >
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
          className="btn"
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})} className="btn btn-primary">
        Add Member
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
          className="btn"
        />
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"
        />
        <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    ))}
  </ul>
);

const FieldArraysForm = props => {
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
          <Field
            name="clubName"
            type="text"
            component={renderField}
            label="Club Name"
          />
          <FieldArray name="members" component={renderMembers} />
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

renderHobbies.propTypes = {
  fields: React.PropTypes.array,
  meta: React.PropTypes.object,
};

renderMembers.propTypes = {
  fields: React.PropTypes.array,
  meta: React.PropTypes.object,
};

FieldArraysForm.propTypes = {
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
const FieldArraysFormComponent = createReduxForm(FieldArraysForm);
export default connect()(FieldArraysFormComponent);
