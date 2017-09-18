
import React from 'react';

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
    </div>
  </div>
);
