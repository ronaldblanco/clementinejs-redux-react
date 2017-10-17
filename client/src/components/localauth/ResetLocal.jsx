var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div>
					<div className="" id="message"></div>
					
					<img src="/public/img/clementine_150.png" />
					<br />
					<p className="clementine-text">Clementine.js</p>
					<Link className="menu" className="btn" id="login-btn" to={"/authlocal"}>Login Local User</Link>
					<Link className="menu" className="btn" id="login-btn" to={"/createlocal"}>Create Local User</Link>
					<Link className="menu" to={"/login"}>Return to Login Page</Link>
				</div>
				
				<div>
					<div className="alert alert-warning"><h5>Only valid if your username is a valid email!</h5></div><br/> 
					<label>Username:</label><input type="text" name="name" id="resetusername" className="form-control" placeholder="Email" />
					<br/>  
					<btn type="submit" onClick={this.resetAction} className="btn btn-add btn-primary" id ="resetaction"
					text="Reset!">Submit</btn>
				</div>
			</div>
		);
	}
	
});