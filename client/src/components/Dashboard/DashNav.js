import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ICON from '../../assets/images/healthcare.png';
import * as actionCreators from "../../store/actions/index";

class DashNav extends Component { 
  render() {
    return(
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src={ICON} width="60" height="60" className="d-inline-block align-top mx-2" alt="" loading="lazy" />
              <span className="display-4"><strong>HEALTHCHECK</strong></span>
          </a>
          <span className="display-4">The heart of your healthcare</span>
        </nav>
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
          <a className="navbar-brand mx-3" href="#">HOME</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">TRACKER</a>
              </li>
            </ul>
            <button
                style={{
                width: "100px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-success rippler rippler-default mx-2 px-2"
            >
              ACCOUNT
            </button>
            <button
                style={{
                width: "100px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              onClick={this.props.logoutUser}
              className="btn btn-secondary rippler rippler-default"
            >
              Logout
            </button>
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