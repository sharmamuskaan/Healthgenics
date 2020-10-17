import React, { Component } from 'react';
import classes from './SettingDisplay.module.css';
import HealthReport from '../../assets/images/health-report.png';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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

class SettingDisplay extends Component {

  state = {
    name:'',
    age:'',
    height: '',
    weight: '',
    goal:'',
    loading: false,
    show: false,
    currPass:'',
    newPass:''
  }

  async componentDidMount() {
    try {
      this.setState({loading: true});
      const res = await axios.get('/api/users/user');
      this.setState({name: res.data.name, age:res.data.age, height:res.data.height, weight:res.data.weight, goal:res.data.goal});
      this.setState({loading: false});
    }
    catch(ex) {
      this.setState({loading: false});
      alert(ex.response.data);
    }
  }

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  }

  applyChangeHandler = async (e) => {
    e.preventDefault();
    const payload = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      goal: this.state.goal
    };

    try {
      this.setState({loading: true});
      const res = await axios.post('/api/users/user', payload);
      this.setState({name: res.data.name, age:res.data.age, height:res.data.height, weight:res.data.weight, goal:res.data.goal});
      alert("Changes Applied");
      this.setState({loading: false});
    }
    catch(ex) {
      this.setState({loading: false});
      alert(ex.response.data);
    }
  }

  changePasswordHandler = (e) => {
    e.preventDefault();
    this.setState({show: true, currPass:'', newPass:''});
  }

  backSettings = (e) => {
    e.preventDefault();
    this.setState({show: false});
  }

  doPasswordChange = async(e) => {
    e.preventDefault();
    const payload = {
      currPass: this.state.currPass,
      newPass: this.state.newPass
    };
    try {
      this.setState({loading: true});
      const res = await axios.put('/api/users/user', payload);
      console.log(res);
      this.setState({currPass:'', newPass:'',});
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
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Name</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="name" defaultValue={this.state.name} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
        	<br />
          <div className="form-row">
          <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Height (cms)</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="height" defaultValue={this.state.height} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
          <br />
		      <div className="form-row">
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Weight (kgs)</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="weight" defaultValue={this.state.weight} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Age</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="age" defaultValue={this.state.age} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Fitness Goal</b></label>
            </div>
    		    <div className="col-7">
              <select className="form-control" id="goal" defaultValue={this.state.goal} onChange={this.onChangeHandler}>
                <option>Weight Loss</option>
                <option>Weight Gain</option>
                <option>Stay Healthy</option>
              </select>
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-sm-12 col-md-3 mt-3">
              <button className="btn btn-primary" onClick={this.applyChangeHandler}>Apply Changes</button>
            </div>
    		    <div className="col-sm-12 col-md-7 mt-3">
              <button className="d-flex btn btn-danger mb-5 ml-auto" onClick={this.changePasswordHandler}>Change Password</button>
    		    </div>
    	    </div>
        </form>
      </React.Fragment>
    );

    if(this.state.show){
      screen = (
              <React.Fragment>
                <div className={"jumbotron text-center "+classes.Jumbotron}>
                  <h1>Change Health Profile <img src={HealthReport} height="60" width="60" alt='healthy'/></h1>
                  <h5>Your health profile is the basic information the app needs to provide you relevant information</h5>
                </div>
                <form className="container">
                  <div className="form-row">
                    <div className="col-3">
                      <label className="mt-2 lead mx-2"><b>Current Password</b></label>
                    </div>
                    <div className="col-7">
                      <input type="password" className="form-control" id="currPass" defaultValue='' onChange={this.onChangeHandler}/>
                    </div>
                  </div>
                  <div align="center">
                      <input id="keyShow"
                          type="checkbox"
                          onClick={(e)=> {myFunctionKeyShow(e)}}
                          /> &nbsp;<font size="3" face="Comic Sans">See Current Password</font>
                  </div>
                  <br />
                  <div className="form-row">
                    <div className="col-3">
                      <label className="mt-2 lead mx-2"><b>New Password</b></label>
                    </div>
                    <div className="col-7">
                      <input type="password" className="form-control" id="newPass" defaultValue={this.state.newPass} onChange={this.onChangeHandler}/>
                    </div>
                  </div>
                  <div align="center">
                    <input id="keyShow2"
                        type="checkbox"
                        onClick={(e)=> {myFunctionKeyShow2(e)}}
                        /> &nbsp;<font size="3" face="Comic Sans">See Confirm Password</font>
                  </div>
                  <div className="form-row">
                    <div className="d-flex justify-text-center col-sm-12 col-md-7 mt-3">
                      <button className="btn btn-primary mb-5 ml-auto" onClick={this.doPasswordChange}>Apply Changes</button>
                    </div>
                    <div className="col-sm-12 col-md-7 mt-3">
                      <button className="btn btn-info mb-5 ml-auto" onClick={this.backSettings}>Back to Settings</button>
                    </div>
                  </div>
                </form>
              </React.Fragment>
              );
    }

    if(this.state.loading){
      screen = <h1 className="text-center mt-5">Loading...</h1>
    }

    return (
      <div>
        {screen}
      </div>
    );
  }
};

SettingDisplay.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(SettingDisplay);