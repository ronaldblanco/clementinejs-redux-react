import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { validate, renderField } from './adminvalidate';

import { connect } from 'react-redux';
let Link = require('react-router').Link;

import { adminOnSubmit } from '../actions';
import { getAdmin } from '../reducer';

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
          label={`Name #${index + 1}`}
        />
        <Field
          name={`${data}.value`}
          type="text"
          component={renderField}
          label={`Value #${index + 1}`}
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
          name={`${user}.email`}
          type="text"
          component={renderField}
          label="Email"
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
  const { handleSubmit, pristine, reset, submitting/* , load , values */ } = props;
  return (
    <div className="container">
      <div>
        <img src="img/clementine_150.png" role="presentation" />
        <br />
        <p className="clementine-text">Clementine.js</p>
        <Link className="menu" to={"/login"}>Return to Login Page</Link>
      </div>
      <div className="alert alert-warning">
        Only one type of change can be done at the same time! UPDATE, ADITION or DELETION
      </div>
      <center><h3>APP ADMINISTRATION!</h3></center>
      <form onSubmit={handleSubmit} >
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
  fields: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object]),
  meta: React.PropTypes.object,
};

renderUsers.propTypes = {
  fields: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object]),
  meta: React.PropTypes.object,
};

AdminForm.propTypes = {
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
  load: React.PropTypes.function,
  values: React.PropTypes.object,
  initialValues: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    initialValues: getAdmin(state),
  };
}

const createReduxForm = reduxForm({
  form: 'fieldArrays', // a unique identifier for this form
  onSubmit: adminOnSubmit,
  validate, // <--- validation function given to redux-form
});
const AdminFormComponent = createReduxForm(AdminForm);
export default connect(mapStateToProps)(AdminFormComponent);
