import React, { Component } from 'react';
import classes from './SettingDisplay.module.css';
import HealthReport from '../../assets/images/health-report.png';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classes2 from './SettingDisplay.module.css';
import DashNav from './DashNav';

function myFunctionKeyShow(){
  let x = document.getElementById("currPass");
  if (x.type === "password"){
    x.type = "text";
  } else{
    x.type = "password";
  }
}

function myFunctionKeyShow2(){
  let x = document.getElementById("newPass");
  if (x.type === "password"){
    x.type = "text";
  } else{
    x.type = "password";
  }
}

class PasswordChange extends Component {

  state = {
    currPass:'',
    newPass:'',
    loading: false,
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  doPasswordChange = async(e) => {
    e.preventDefault();
    const payload = {
      currPass: this.state.currPass,
      newPass: this.state.newPass
    };
    try {
      this.setState({loading: true});
      await axios.put('/api/users/user', payload);
      this.setState({currPass:'', newPass:''});
      alert("Password Changed");
      this.setState({loading: false});
    }
    catch(ex) {
      this.setState({loading: false});
      alert(ex.response.data);
    }
  }
 
  render() {
    let screen = (
              <React.Fragment>
                <div className={"jumbotron text-center "+classes.Jumbotron}>
                  <h1>Change Health Profile <img src={HealthReport} height="60" width="60" alt='healthy'/></h1>
                  <h5>Your health profile is the basic information the app needs to provide you relevant information</h5>
                </div>
                <form className="container">
                  <div className="form-row">
                    <label className="mt-2 lead mx-2"><b>Current Password</b></label>
                    <input type="password" className="form-control" id="currPass" defaultValue='' onChange={this.onChangeHandler}/>
                  </div>
                  <div align="left">
                    <input id="keyShow"
                      type="checkbox"
                      onClick={(e)=> {myFunctionKeyShow(e)}}
                      /> &nbsp;<font size="3" face="Comic Sans">See Current Password</font>
                  </div>
                  <br />
                  <div className="form-row">
                    <label className="mt-2 lead mx-2"><b>New Password</b></label>
                    <input type="password" className="form-control" id="newPass" defaultValue='' onChange={this.onChangeHandler}/>
                  </div>
                  <div align="left">
                    <input id="keyShow2"
                      type="checkbox"
                      onClick={(e)=> {myFunctionKeyShow2(e)}}
                      /> &nbsp;<font size="3" face="Comic Sans">See Confirm Password</font>
                  </div>
                  <div className="form-row">
                    <div className="d-flex justify-text-center col-sm-12 col-md-7 mt-3">
                      <button className="btn btn-primary mb-5 mt-3 ml-auto" onClick={this.doPasswordChange}>Apply Changes</button>
                    </div>
                    <div className="col-sm-12 col-md-7 mt-3">
                      <Link to="/settings"><button className="btn btn-info mb-5 ml-auto">Back to Settings</button></Link>
                    </div>
                  </div>
                </form>
              </React.Fragment>
    );

    if(this.state.loading){
      screen = <h1 className="text-center mt-5">Loading...</h1>
    }

    return (
      <div className={classes2.Body}>
        <DashNav />
        {screen}
        <footer className="page-footer fixed-bottom" style={{backgroundColor: '#00695c', height:'25px'}}>
          <div className="footer-copyright text-center">
            <p style={{color:'white'}}>© 2020 Copyright: Developed Through Love</p>
          </div>	
        </footer>
      </div>
    );
  }
};

PasswordChange.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(PasswordChange);