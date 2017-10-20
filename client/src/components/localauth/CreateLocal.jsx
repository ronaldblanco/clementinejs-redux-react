let React = require('react');
let Link = require('react-router').Link;

/* module.exports = React.createClass({
	render: function() {
		return (*/
export const CreateLocal = () => (
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
      <form action="/auth/localnew" method="post">
        <h3>CREATE LOCAL USER</h3>
        <div className="form-group">
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username or Email"
            />
            <br />
          </div>
          <div>	<label>Display Name:</label>
            <input
              type="text"
              name="display"
              className="form-control"
              placeholder="Display Name"
            />
            <br />
          </div>
          <div>	<label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
        </div><br />
        <div className="form-group">
          <div>
            <input type="submit" className="btn btn-primary" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  </div>
);
/*		);
	}
});*/
