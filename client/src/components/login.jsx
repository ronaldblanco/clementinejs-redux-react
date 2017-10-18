
import React from 'react';
let Link = require('react-router').Link;

export default () => (
  <div className="container">
    <div className="login">
      <img alt="logo" src="img/clementine_150.png" />
      <br />
      <p className="clementine-text">Clementine-React-Redux</p>
      <a href="/auth/github">
				<div className="btn" id="login-btn" width="32px" >
							<img src="img/github_32px.png" alt="github logo" />
							<p>LOGIN WITH GITHUB</p>
						</div>
      </a>
      <a href="auth/twitter">
        <div className="btn" id="login-btn" width="32px">
						<img src="img/twitter_32new.png" alt="twitter logo"  />
						<p>LOGIN WITH TWITTER</p>
					</div>
      </a>
      <Link className="btn" id="login-btn" to={"/authlocal"}><img src="img/local.png" alt="twitter logo" width="32px" />LOCAL LOGIN</Link>
    </div>
  </div>
);
