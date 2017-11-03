let React = require('react');

export const validate = (values/*, registeredFields*/) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 50) {
    errors.username = 'Must be 50 characters or less';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
    errors.username = 'Your Username it is an invalid email address!';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Your Password it is to small!, at least 8 characters.';
  }
   /* if (registeredFields.display && !values.display) {
    errors.display = 'Required';
  } */ /* else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  }  else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  } */
  return errors;
};

export const warn = values => {
  const warnings = {};
  if (values.username && values.username.length < 2) {
    warnings.username = 'Hmm, it seem a bit small...';
  }
  if (values.password && values.password.length > 15) {
    warnings.password = 'Hmm, very good password...';
  }
  return warnings;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export default renderField;
