import React, { Component } from 'react';
import classes from './SettingDisplay.module.css';
import HealthReport from '../../assets/images/health-report.png';

class SettingDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"jumbotron text-center "+classes.Jumbotron}>
          <h1>Change Health Profile <img src={HealthReport} height="60" width="60" alt='healthy'/></h1>
          <h5>Your health profile is the basic information the app needs to provide you relevant information</h5>
        </div>
        <form className="container justify-content-center">
		      <div className="form-row">
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Name</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" defaultValue='HI' />
    		    </div>
    	    </div>
        	<br />
          <div className="form-row">
          <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Height</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" defaultValue='HI' />
    		    </div>
    	    </div>
          <br />
		      <div className="form-row">
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Weight</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" defaultValue='JI' />
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Age</b></label>
            </div>
    		    <div className="col-7">
      			  <input type="text" className="form-control" defaultValue='JI' />
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-3">
              <label className="mt-2 lead mx-2"><b>Fitness Goal</b></label>
            </div>
    		    <div className="col-7">
              <select className="form-control" id="goal" >
                <option>Weight Loss</option>
                <option>Weight Gain</option>
                <option>Stay Healthy</option>
              </select>
    		    </div>
    	    </div>
          <br />
          <div className="form-row">
            <div className="col-sm-12 col-md-3 mt-3">
              <button className="btn btn-primary">Apply Changes</button>
            </div>
    		    <div className="col-sm-12 col-md-7 mt-3">
              <button className="d-flex flex-row-reverse btn btn-danger mb-5 ml-auto" data-toggle="modal" data-target="#exampleModal">Change Password</button>
    		    </div>
    	    </div>
        </form>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create Task</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="taskname">Current Password</label>
                    <input type="password" 
                        className="form-control"
                        required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="taskname">New Password</label>
                    <input type="password" 
                        className="form-control"
                        required/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.createTask} data-dismiss="modal">Do Changes</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default SettingDisplay;