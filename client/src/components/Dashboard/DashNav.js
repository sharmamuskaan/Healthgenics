import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ICON from '../../assets/images/healthcare.png';
import * as actionCreators from "../../store/actions/index";
import { Link, NavLink } from 'react-router-dom';
import classes from './DashNav.module.css';

class DashNav extends Component { 
  render() {
    return(
      <React.Fragment>
        
        <nav className="navbar navbar-light bg-light">
          <Link to='/dashboard'>
            <p className="navbar-brand">
            <img src={ICON} width="60" height="60" className="d-inline-block align-top mx-2" alt="" loading="lazy" />
              <span className={"display-4 "+classes.Head}><strong>HEALTHGENICS</strong></span>
            </p>
          </Link>
          <span className={"display-4 "+classes.Yes}>The heart of your healthcare</span>
        </nav>
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to='/dashboard' >HOME</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/tracker' >TRACKER</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item mr-3">
                <NavLink className="nav-link" to='/settings' >SETTINGS</NavLink>
              </li>
              <button className="btn btn-secondary rippler rippler-default" onClick={this.props.logoutUser}>Logout</button>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
};

DashNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(actionCreators.logoutUser())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashNav);