
import React from 'react';
let Link = require('react-router').Link;

export default () => (
  <div className="container">
    <div className="login">
      <img alt="logo" src="img/clementine_150.png" />
      <br />
      <p className="clementine-text">Clementine-React-Redux</p>
      <a href="/auth/github" className="btn">
				LOGIN GITHUB
      </a>
      <a href="auth/twitter" className="btn">
        LOGIN TWITTER
      </a>
      <Link className="btn" id="login-btn" to={"/authlocal"}><img src="/public/img/local.png" alt="twitter logo" width="32px" />LOCAL LOGIN</Link>
    </div>
  </div>
);
