let React = require('react');

export const validate = values => {
  const errors = {};
  if (!values.clubName) {
    errors.clubName = 'Required';
  }
  if (!values.members || !values.members.length) {
    errors.members = { _error: 'At least one member must be entered' };
  } else {
    const membersArrayErrors = [];
    values.members.forEach((member, memberIndex) => {
      const memberErrors = {};
      if (!member || !member.firstName) {
        memberErrors.firstName = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (!member || !member.lastName) {
        memberErrors.lastName = 'Required';
        membersArrayErrors[memberIndex] = memberErrors;
      }
      if (member && member.hobbies && member.hobbies.length) {
        const hobbyArrayErrors = [];
        member.hobbies.forEach((hobby, hobbyIndex) => {
          if (!hobby || !hobby.length) {
            hobbyArrayErrors[hobbyIndex] = 'Required';
          }
        });
        if (hobbyArrayErrors.length) {
          memberErrors.hobbies = hobbyArrayErrors;
          membersArrayErrors[memberIndex] = memberErrors;
        }
        if (member.hobbies.length > 5) {
          if (!memberErrors.hobbies) {
            memberErrors.hobbies = [];
          }
          /* eslint-disable no-underscore-dangle */
          memberErrors.hobbies._error = 'No more than five hobbies allowed';
          /* eslint-enable no-underscore-dangle */
          membersArrayErrors[memberIndex] = memberErrors;
        }
      }
    });
    if (membersArrayErrors.length) {
      errors.members = membersArrayErrors;
    }
  }
  return errors;
};

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

// export default validate;
renderField.propTypes = {
  input: React.PropTypes.string,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  meta: React.PropTypes.object,
};