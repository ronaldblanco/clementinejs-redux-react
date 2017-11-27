import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { validate, renderField } from './adminvalidate';

import { Button, Col, Row } from 'react-bootstrap';

import { connect } from 'react-redux';
let Link = require('react-router').Link;

import { adminOnSubmit } from '../actions';
import { getAdmin } from '../reducer';

const renderDatas = ({ fields, meta: { error } }) => (
  <ul style={{ paddingLeft: 0 }}>
    <li>
      <Button type="button" onClick={() => fields.push()} className="btn btn-primary" >
        Add Var
      </Button>
    </li>
    {fields.map((data, index) => (
      <li key={index} style={{ display: 'flex', flexWrap: 'nowrap' }}>
        <Field
          name={`${data}.name`}
          type="text"
          component={renderField}
        />
        <Field
          name={`${data}.value`}
          type="text"
          component={renderField}
        />
        <Button
          type="button"
          title="Remove Var"
          onClick={() => fields.remove(index)}
          className="btn"
          style={{
            margin: '20px 0px 0px 0px',
            height: '30px',
          }}
        >
          Remove
        </Button>
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

/* eslint-disable max-len */
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
        <h4>User #{index + 1}</h4>
        <Row>
          <Col xs={12} style={{ margin: '0px 0px 0px 0px' }}>
            <Field
              name={`${user}.display`}
              type="text"
              component={renderField}
              label="Display Name"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ margin: '0px 0px 0px 0px' }}>
            <Field
              name={`${user}.username`}
              type="text"
              component={renderField}
              label="Username"
            />
          </Col>
          <Col xs={6} style={{ margin: '0px 0px 0px 0px' }}>
            <Field
              name={`${user}.password`}
              type="password"
              component={renderField}
              label="Password"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ margin: '0px 0px 0px 0px' }}>
            <Field
              name={`${user}.email`}
              type="text"
              component={renderField}
              label="Email"
            />
          </Col>
          <Col xs={3} style={{ margin: '0px 0px 0px 0px' }}>
            <Field
              name={`${user}.clicks`}
              type="text"
              component={renderField}
              label="Clicks"
            />
          </Col>
        </Row>
        <FieldArray name={`${user}.datas`} component={renderDatas} />
        <button
          type="button"
          title="Remove User"
          onClick={() => fields.remove(index)}
          className="btn"
          style={{
            margin: '0px 0px 0px 0px',
            height: '35px',
            width: '110px',
          }}
        >
          Remove User
        </button>
        <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
        <br />
      </li>
    ))}
  </ul>
);
/* eslint-enable max-len */

const AdminForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
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
