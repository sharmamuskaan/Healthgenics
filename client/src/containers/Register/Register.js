import React, { Component } from 'react';
import * as actionCreators from '../../store/actions/index';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from '../../components/Home/Navbar';;

function myFunctionKeyShow(){
  let x = document.getElementById("password");
  if (x.type === "password"){
    x.type = "text";
  } else{
    x.type = "password";
  }
}

function myFunctionKeyShow2(){
  let x = document.getElementById("confirmPassword");
  if (x.type === "password"){
    x.type = "text";
  } else{
    x.type = "password";
  }
}
class Register extends Component {

  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age:"",
    height: "",
    weight: "",
    gender: "Male",
    goal: "Weight Loss",
    loading: false,
    errors: {},
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value.trim() });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({loading: true});
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      age: this.state.age,
      height : this.state.height,
      weight: this.state.weight,
      gender: this.state.gender,
      goal: this.state.goal
    };

    this.props.registerUser(newUser, this.props.history);
    this.setState({loading: false});
  }

  render() {
    let form = (
      <React.Fragment>
        <Navbar>
          <Link to='/login'>
            <button className="btn btn-outline-success my-2 my-sm-0">Login</button>
          </Link>
        </Navbar>
        <div className="container border mt-4 mb-4">
          <div className="row mt-4 mb-4">
            <div className="col s8 offset-s2">
              <Link to="/"><span>Back To Home</span></Link>
              <div className="text-center">
                <h3>
                  <strong>Register</strong>
                </h3>
              </div>
              <form >
                  <div className="form-group">
                      <label htmlFor="Name" className='sr-only'>Full Name</label>
                      <input type="text" 
                          className="form-control" id="name" 
                          onChange={this.onChange}
                          value={this.state.name}
                          placeholder="Name" required/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="email" className='sr-only'>Email address</label>
                      <input type="email" 
                          className="form-control" id="email" 
                          onChange={this.onChange}
                          value={this.state.email}
                          placeholder="Email Address"
                          required/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="password" className='sr-only'>Password</label>
                      <input type="password" 
                          className="form-control" 
                          onChange={this.onChange}
                          value={this.state.password}
                          id="password" placeholder='Password' required/>
                  </div>
                  <div align="left">
                      <input id="keyShow"
                          type="checkbox"
                          onClick={(e)=> {myFunctionKeyShow(e)}}
                          /> &nbsp;<font size="3" face="Comic Sans">See Password</font>
                  </div>
                  <div className="form-group mt-2">
                      <label htmlFor="confirmPassword" className='sr-only'>Confirm Password</label>
                      <input type="password" 
                          className="form-control" 
                          onChange={this.onChange}
                          value={this.state.confirmPassword}
                          id="confirmPassword" placeholder='Confirm Password' required/>
                  </div>
                  <div align="left">
                      <input id="keyShow2"
                          type="checkbox"
                          onClick={(e)=> {myFunctionKeyShow2(e)}}
                          /> &nbsp;<font size="3" face="Comic Sans">See Confirm Password</font>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      <div className="form-group mt-2">
                        <label htmlFor="age" className="sr-only">Age (in Years)</label>
                        <input type="text" 
                            className="form-control" 
                            onChange={this.onChange}
                            value={this.state.age}
                            id="age" placeholder='Age (in Years)' required/>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group mt-2">
                        <label htmlFor="height" className="sr-only">Height (in cms)</label>
                        <input type="text" 
                            className="form-control" 
                            onChange={this.onChange}
                            value={this.state.height}
                            id="height" placeholder='Height (in cms)' required/>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group mt-2">
                        <label htmlFor="weight" className="sr-only">Weight (in Kgs)</label>
                        <input type="text" 
                            className="form-control" 
                            onChange={this.onChange}
                            value={this.state.weight}
                            id="weight" placeholder='Weight (in Kgs)' required/>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="form-group mt-2">
                        <label htmlFor="gender" className='sr-only'>Gender</label>
                          <select className="form-control" id="gender" onChange={this.onChange}
                            value={this.state.gender}>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="goal" >Fitness Goal</label>
                      <select className="form-control" id="goal" onChange={this.onChange}
                        value={this.state.goal}>
                        <option>Weight Loss</option>
                        <option>Weight Gain</option>
                        <option>Stay Healthy</option>
                      </select>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2" onClick={this.onSubmit}>Submit</button>
              </form>
              <p className="grey-text text-darken-1 text-center">Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

    return(
      <div>
        {form}
      </div>
    );
  }
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (userData, history) => dispatch(actionCreators.registerUser(userData, history))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));