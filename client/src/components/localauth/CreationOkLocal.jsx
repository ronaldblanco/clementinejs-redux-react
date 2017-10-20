let React = require('react');
let Link = require('react-router').Link;

/* module.exports = React.createClass({
	render: function() {
		return (*/
export const CreationOkLocal = () => (
  <div>
    <div>
      <img src="img/clementine_150.png" role="presentation" />
      <br />
      <p className="clementine-text">Clementine.js</p>
      <Link className="menu" to={"/LocalCreate"}>Create Local User</Link>
      <Link className="menu" to={"/LocalReset"}>Reset Local Password</Link>
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
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username or Email"
            />
            <br />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
        </div>
        <br />
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
