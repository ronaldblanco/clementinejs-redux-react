
import { getUser, getClicks, getDatas, getMess } from '../reducer';
import { Link } from 'react-router';

import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';

import Li from './Li.jsx';

const Main = ({ click, reset, clicks, user, adddata, deldata, datas, data }) => (
  <div>
    <header>
      <p>Welcome, <span id="display-name">{user.username}</span>!</p>
      <Link className="menu" to="/profile">Profile</Link>
      <p>|</p>
      <a className="menu" href="/logout">Logout</a>
    </header>

    <div className="container">
      <img alt="logo" src="img/clementine_150.png" />
      <br />
      <p className="clementine-text">Clementine.js</p>
    </div>

    <div className="container">
    <div className="w3-row-padding">
    <div className="w3-third">
      <p>You have clicked the button <span id="click-nbr">{clicks}</span> times.</p>
      <br />
      <div className="btn-container">
        <button onClick={click} className="btn">CLICK ME!</button>
        <button onClick={reset} className="btn">RESET</button>
      </div>
      </div>
      <br/>
      <br/>
      <div className="w3-third">
			New Data Name:<input type="text" name="name" id="name" className="form-control" placeholder="Name"/><br/>
              <button onClick={adddata} type="submit" className="btn btn-add btn-primary" id ="adddata">New Data!</button>
              <button onClick={deldata} type="submit" className="btn btn-delete btn-danger" id ="deldata">Delete Data!</button>
   </div>
		<div className="w3-third">
			<p>Here are your Data Names:</p>
			  <Li datas={datas} />
    </div>
    
    </div>
  </div>
  </div>
);

Main.propTypes = {
  click: React.PropTypes.func.isRequired,
  reset: React.PropTypes.func.isRequired,
  adddata: React.PropTypes.func.isRequired,
  deldata: React.PropTypes.func.isRequired,
  clicks: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]).isRequired,
  user: React.PropTypes.object.isRequired,
  data: React.PropTypes.array.isRequired,
  massage: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    user: getUser(state),
    clicks: getClicks(state),
    datas: getDatas(state),
    message: getMess(state)
  };
}

export const MainComponent = Main;
export const MainContainer = connect(mapStateToProps, actionCreators)(Main);
