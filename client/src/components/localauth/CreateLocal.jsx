let React = require('react');
let Link = require('react-router').Link;
import { Field, reduxForm } from 'redux-form';

/*import { getFormValues_simpleCreateLocal } from '../../reducer';
import { connect } from 'react-redux';*/

const onSubmit = (values) => {
  console.log(values);
  window.alert(`You submitted:\n\n${JSON.stringify(values/*, null, 2*/)}`);
}; 

const CreateLocal = (props) => {
   console.log(props);
  
  const { /*handleSubmit,*/ pristine, reset, submitting/*, onSubmit*/ } = props;
  return (
    <div className="container">
    <div className="" id="message"></div>
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
      <form action="/auth/localnew" method="post" onSubmit={ /*props.route.onSubmit*/ onSubmit /*props.handleSubmit*/ } >
        <h3>CREATE LOCAL USER</h3>
        <div className="form-group">
          <div>
            <label>Username:</label>
              <Field name="username" component="input" type="text" placeholder="Username or Email" className="form-control" />
            <br />
          </div>
          <div>	<label>Display Name:</label>
            <Field name="display" component="input" type="text" placeholder="Display Name" className="form-control" />
            <br />
          </div>
          <div>	<label>Password:</label>
            <Field name="password" component="input" type="password" placeholder="Password" className="form-control" />
          </div>
        </div><br />
        <div className="form-group">
          <div>
            <button type="submit" disabled={pristine || submitting} className="btn btn-primary" >Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary" >Clear Values</button>
          </div>
        </div>
      </form>
      
      
    
    </div>
  </div>
  );
};


/* function mapStateToProps(state) {
  return {
    onSubmit: onSubmit(getFormValues_simpleCreateLocal(state)),
  };
} */
// console.log(CreateLocal);  // onSubmit={handleSubmit} // action="/auth/localnew" method="post"
// create new, "configured" function
const createReduxForm = reduxForm({ form: 'simpleCreateLocal' });
// console.log(createReduxForm);
// evaluate it for ContactForm component
const CreateLocalComponent = createReduxForm( CreateLocal );
// console.log(CreateLocalComponent);
export default CreateLocalComponent;
// export const CreateLocalContainer = connect(mapStateToProps)( CreateLocal );

/* export default reduxForm({
  form: 'simpleCreateLocal'  // a unique identifier for this form
})(CreateLocal) */

// <input type="submit" className="btn btn-primary" value="Submit" />
