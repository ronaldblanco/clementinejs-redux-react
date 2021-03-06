import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getMess } from '../../reducer';
import * as actionCreators from '../../actions';

const ResetLocal = ({ message, resetlocal }) => (
  <div className="container">
    <div>
      <div className={message.type} id="message"><h3>{message.message}</h3></div>
      <img src="img/clementine_150.png" role="presentation" />
      <br />
      <p className="clementine-text">Clementine.js</p>
      <Link className="menu" className="btn" id="login-btn" to={"/authlocal"}>
        Login Local User
      </Link>
      <Link className="menu" className="btn" id="login-btn" to={"/createlocal"}>
        Create Local User
      </Link>
      <Link className="menu" to={"/login"}>
        Return to Login Page
      </Link>
    </div>
    <div>
      <div className="alert alert-warning">
        <h5>Only valid if your username is a valid email!</h5>
      </div><br />
      <label>Username:</label>
      <input
        type="text"
        name="name"
        id="resetusername"
        className="form-control"
        placeholder="Email"
      />
      <br />
      <button
        onClick={resetlocal}
        type="submit"
        className="btn btn-add btn-primary"
        id="resetaction"
      >
        Reset!
      </button>
    </div>
  </div>
		);

ResetLocal.propTypes = {
  message: React.PropTypes.object,
  resetlocal: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    message: getMess(state),
  };
}

export const ResetLocalComponent = ResetLocal;
export const ResetLocalContainer = connect(mapStateToProps, actionCreators)(ResetLocal);
