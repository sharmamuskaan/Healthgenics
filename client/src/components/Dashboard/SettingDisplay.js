import React, { Component } from 'react';
import classes from './SettingDisplay.module.css';
import HealthReport from '../../assets/images/health-report.png';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class SettingDisplay extends Component {

  state = {
    name:'',
    age:'',
    height: '',
    weight: '',
    goal:'',
    loading: false,
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
 
  render() {
    let screen = (
      <React.Fragment>
        <div className={"jumbotron text-center "+classes.Jumbotron}>
          <h1>Change Health Profile <img src={HealthReport} height="60" width="60" alt='healthy'/></h1>
          <h5>Your health profile is the basic information the app needs to provide you relevant information</h5>
        </div>
        <form className="container">
		      <div className="form-row">
            <div className="col-sm-12 col-md-3">
              <label className="mt-2 lead mx-2"><b>Name</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="name" defaultValue={this.state.name} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
        	<br />
          <div className="form-row">
          <div className="col-sm-12 col-md-3">
              <label className="mt-2 lead mx-2"><b>Height (cms)</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="height" defaultValue={this.state.height} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
          <br />
		      <div className="form-row">
            <div className="col-sm-12 col-md-3">
              <label className="mt-2 lead mx-2"><b>Weight (kgs)</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="weight" defaultValue={this.state.weight} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-sm-12 col-md-3">
              <label className="mt-2 lead mx-2"><b>Age (yrs)</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" id="age" defaultValue={this.state.age} onChange={this.onChangeHandler}/>
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-sm-12 col-md-3">
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
            <div className="col-sm-12 col-md-5 mt-3">
              <button className="btn btn-primary" onClick={this.applyChangeHandler}>Apply Changes</button>
            </div>
    		    <div className="col-sm-12 col-md-7 mt-3">
              <Link to='/pass'><button className="d-flex justify-content-end btn btn-danger mb-5 ml-auto">Change Password</button></Link>
    		    </div>
    	    </div>
        </form>
      </React.Fragment>
    );

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