import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';

class TrackDisplay extends Component {

  state = {
    loading: false,
    jumbomessage: '',
    
    foods: [],
    
    todayIntake: 0,
    increase: 0,
    prevTracks: [],
    gender: '',
    goal: '',
    name: '',

    gramSelected: 100,
    foodSelected: 'Chapatis'
  }

  waterChangeHandler = (e) => {
    e.preventDefault();
    if(this.state.gender === 'Male') {
      if(e.target.value < 4) {
        this.setState({ jumbomessage: 'You should drink more water today' });
      }
      else {
        this.setState({ jumbomessage: 'You have a healthy water intake' });
      }
    }
    else {
      if(e.target.value < 3) {
        this.setState({ jumbomessage: 'You should drink more water today' });
      }
      else {
        this.setState({ jumbomessage: 'You have a healthy water intake' });
      }
    }
  }

  async componentDidMount() {
    try {
      this.setState({loading: true});
      const res = await axios.get('/api/user/foods');
      this.setState({foods: res.data})
      const res2 = await axios.get('/api/users/user/me');
      this.setState({goal: res2.data.goal,name: res2.data.name,gender: res2.data.gender,prevTracks: res2.data.prevTracks,todayIntake: res2.data.todayIntake, increase:res2.data.increase});
      this.setState({loading: false});
    }
    catch(ex) {
      this.setState({loading: false});
      alert(ex.response.data);
    }
  }

  gramChangeHandler = (e) => {
    e.preventDefault();
    this.setState({gramSelected: e.target.value});
  }

  foodChangeHandler = (e) => {
    e.preventDefault();
    this.setState({foodSelected: e.target.value});
  }

  progressHandler = async() => {
    const payload = {
      foodSelected: this.state.foodSelected,
      gramSelected: this.state.gramSelected
    }

    try {
      const res = await axios.post('/api/user/tracks', payload);
      this.setState({increase: res.data.increase, todayIntake: res.data.todayIntake});
    }
    catch(ex) {
      alert(ex.response.data);
    }
  }

  render() {
    let gender = this.state.gender;
    let goal = this.state.goal;

    let dailyTarget = 0;

    if(goal === 'Weight Loss') {
      dailyTarget = (gender === 'Male') ? 2000 : 1500
    }
    else if(goal === 'Stay Healthy') {
      dailyTarget = (gender === 'Male') ? 2500 : 2000
    }
    else {
      dailyTarget = (gender === 'Male') ? 3000 : 2500
    }

    let surplus = this.state.todayIntake - dailyTarget ;
    let message = '';
    let percent = '0%';
    let status = 'ON TRACK';
    let prediction = 'You are on the right path. You are very likely to achieve your fitness goal';

    if( surplus === 0) {
      message = 'CONGO!! YOU HAVE ACHIEVED YOUR GOAL FOR TODAY:';
      percent = `100%`;
      status ='COMPLETED';
      prediction = 'You are very likely to achieve your fitness goal.';
    }
    else if(surplus > 0 && surplus <= 1000) {
      message = `CONGO!! GOAL ACHIEVED: Slightly more calories taken  `;
      percent = `100%`;
      status ='COMPLETED';
      prediction = 'You are very likely to achieve your fitness goal.';
    }
    else if(surplus > 1000) {
      message = `STOP NOW!! You have to eaten ${surplus} more calories today`;
      percent = `100%`;
      status ='OVEREATING';
      prediction = 'You are a litte deviated from the track, but we still think that you can get back on track.';
    }
    else if (surplus < 0){
      message = `You have to consume ${-1*surplus} more calories today`;
      percent = `${Math.floor((this.state.todayIntake*100)/dailyTarget)}%`;
      status ='ON TRACK';
      prediction = 'You are on the right path. You are very likely to achieve your fitness goal.';
    }
    
    let screen = (
      <div className='container mt-2' style={{maxWidth:'100%'}}>
        <div className='row'>
          <div className='col-sm-12 col-md-10'> 
            <h2>Hi {this.state.name}, Your Daily Optimal Target is : {dailyTarget} calories</h2>
            <h3 style={
                  status==='COMPLETED'?{fontFamily:'verdana', color:'green'}:
                  (status==='ON TRACK'?{fontFamily:'verdana', color:'blue'}: {fontFamily:'verdana', color:'red'})
                }
              >
                <b>{message}</b>
            </h3>
            <div className="progress mt-2" style={{height:"20px"}}>
              <div className="progress-bar" style={{width:percent, height:"20px"}}>{percent}</div>
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="card mt-3 border border-primary" 
                style={
                  status==='ON TRACK'?{backgroundColor:'blue'}:
                  (status==='COMPLETED' ? {backgroundColor: 'green'}: {backgroundColor: 'red'})
                }
              >
                <div className="card-body text-center">
                  <h5 className="card-title" style={{color:'white'}}>STATUS: <br/>{status}</h5>
                </div>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className="col-sm-12 col-md-3">
            
            <div className="card rounded-circle mx-auto mb-3" style={{width:'200px', backgroundColor:'blue'}}>
              <div className="card-body">
                <h5 className="card-text text-center" style={{color:'white'}}>
                  You have eaten <br /><b>{this.state.todayIntake}</b> calories <br/>today.
                </h5>
              </div>
            </div>

            <div className="card rounded-circle mx-auto" style={{width:'200px', backgroundColor:'gray'}}>
              <div className="card-body">
                <h5 className="card-text text-center" style={{color:'black'}}>
                  <b>{`${this.state.increase > 0 ? this.state.increase : 0}%`} </b>
                  <br/>
                  Average Increase 
                  <br/>
                  in intake.
                </h5>
              </div>
            </div>
            
            <div className="card mt-3 mb-3 border border-success">
              <div className="card-body" style={{backgroundColor: 'gold'}}>
                <h5 className="card-title">Our Prediction: </h5>
                <h6><b>{prediction.toUpperCase()}</b></h6>
              </div>
            </div>    
          
          </div>
          <div className="col-sm-12 col-md-7">
            <h4>Tell us what did you eat today: </h4>
            <label htmlFor='eat'>Choose Your Food</label>
            <select className="custom-select" id='eat' onChange={this.foodChangeHandler}>
              {this.state.foods.map(food => (
                <option key={food._id}>{food.name}</option>
              ))}
            </select>
            <label htmlFor='grams' className='mt-3'>Choose Quantity in Grams</label>
            <select id='grams' className="custom-select mt-1"  onChange={this.gramChangeHandler}>
              <option>100</option>
              <option>200</option>
              <option>500</option>
              <option>1000</option>
              <option>1500</option>
              <option>2000</option>
              <option>3000</option>
              <option>5000</option>
              <option>10000</option>
              <option>20000</option>
            </select>

            <button className="btn btn-primary mt-3" onClick={this.progressHandler}>Add Progress</button>
            
            <hr />

            <div className="row">
              <div className="col-sm-12 col-md-8">
                <h5 className="lead"><strong>You are advised to drink <b>{this.state.gender === 'Male'?4:3} litres</b> of water every day<br/> <b>Tell us how much you drank today:</b></strong></h5>
              </div> 
              <div className="col-sm-12 col-md-4">
                <select className="custom-select mt-3" onChange={this.waterChangeHandler}>
                  <option selected>Quantity (in litres) </option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>4+</option>
                </select>
              </div> 
            </div> 
            {this.state.jumbomessage.length ?
            <div className="jumbotron mt-3">
              <h3>{this.state.jumbomessage}</h3>
            </div>:null}
          </div>
          <hr />
          <div className='col-sm-12 col-md-2 mt-2'>
            <h5>Previous Tracks</h5>
            <hr />
            {this.state.prevTracks.length >= 1 ?
              <div className="card mb-5" >
                <div className="card-body">
                <h5 className="card-title" style={{color: 'green'}}>Day Before Yesterday:</h5>
                <h4 className="card-text"><b>Calories: {this.state.prevTracks[0].calories}</b></h4>
                </div>
              </div>:null
            }
            {this.state.prevTracks.length >= 2 ?
              <div className="card mb-5" >
                <div className="card-body">
                  <h5 className="card-title" style={{color: 'green'}}>Yesterday:</h5>
                  <h4 className="card-text"><b>Calories: {this.state.prevTracks[1].calories}</b></h4>
                </div>
              </div>:null
            }
          </div>
        </div>
      </div>
    );

    if(this.state.loading) {
      screen = <h1 className="text-center mt-5">Loading...</h1>
    }

    return(
      <div>
        {screen}
      </div>
    );  
  }
};

TrackDisplay.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(TrackDisplay);