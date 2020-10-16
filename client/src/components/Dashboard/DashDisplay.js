import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as actionCreators from "../../store/actions/index";

class DashDisplay extends Component { 

  state = {
    loading: false,
    tasks: [],
    taskdeadline:"",
    taskdescription: "",
    taskname: ""
  }

  async componentDidMount() {
    try {
      this.setState({loading: true});
      const res = await axios.get('/api/user/tasks');
      let allTasks = this.state.tasks;
      for (let item in res.data) {
        allTasks.unshift(res.data[item]);
      }
      this.setState({tasks: allTasks});
      this.setState({loading: false});
    }
    catch(err) {
      this.setState({loading: false});
      alert(err.response.data);
    }
  }

  createTask = async (e) => {
    e.preventDefault();
    const task = {
      name: this.state.taskname,
      description: this.state.taskdescription,
      deadline: this.state.taskdeadline,
    }
    this.setState({loading: true});
    try {
      const res = await axios.post('/api/user/tasks', task);
      let allTasks = this.state.tasks;
      allTasks.unshift(res.data);
      this.setState({tasks: allTasks});
      this.setState({loading: false});
    }
    catch(err) {
      this.setState({loading: false});
      alert(err.response.data);
    }
  }

  onDone = async (id) => {
    try {
      const res = await axios.put('/api/user/tasks/'+id, {status:'Completed'});
      let allTasks = [];
      for (let item in res.data) {
        allTasks.unshift(res.data[item]);
      }
      this.setState({tasks: allTasks});
      
    }
    catch(ex) {
      alert(ex.response.data);
    }
  }

  onDelete = async (id) => {
    try {
      const res = await axios.delete('/api/user/tasks/'+id);
      let allTasks = [];
      for (let item in res.data) {
        allTasks.unshift(res.data[item]);
      }
      this.setState({tasks: allTasks});
    }
    catch(ex) {
      alert(ex.response.data);
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  render() {

    let screen = (
      <React.Fragment>
      <div className="row mt-4 mb-4">
        <div className="col-4 mx-5">
            <h4>
              <strong>Welcome,</strong> {this.props.auth.user.name}
              <p className="flow-text grey-text text-darken-1">
               Let's Get FIT.{" "} 👏
              </p>
            </h4>
            <div className="row">
              <div className="col mt-3">
                <button type="button" data-toggle="modal" data-target="#exampleModal" className="btn btn-danger"><i className="fas fa-plus-square fa-3x"></i><br/>Create New Task</button>
              </div>
            </div>
        </div>
        <div className="col-6">
          {this.state.tasks.map(task => (
            <div className="card my-2 border border-danger" key={task._id} style={task.status==='Completed'?{backgroundColor:'silver'}:{backgroundColor:'white'}}>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h4 className="card-title">{task.name}</h4>
                  </div>
                  <div className="col-6 d-flex flex-row-reverse"><i className="far fa-trash-alt" onClick={(id) => this.onDelete(task._id)} style={{color:'red'}}></i></div>
                </div>
                <p className="card-text"><b>Description: {task.description}</b></p>
                <div className="row">
                  <div className="col-6">
                    <p className="card-text" style={task.status==='Completed'?{color:'green'}:{color:'red'}}><b>Status: {task.status}</b></p>
                  </div>
                  <div className="col-6">
                    <p className="card-text d-flex flex-row-reverse" style={{color:'blue'}}>Deadline: {task.deadline}</p>
                  </div>
                </div>
                {task.status !== 'Completed' ? <button className="btn btn-success mt-2" onClick={(id) => this.onDone(task._id)}>Mark as Done</button>: null}
              </div>
            </div>
          ))}
        </div>
      </div>
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
                    <label htmlFor="taskname">Task Name</label>
                    <input type="text" 
                        className="form-control" id="taskname" 
                        onChange={this.onChange}
                        value={this.state.taskname}
                        required/>
                </div>
                <div className="form-group">
                    <label htmlFor="taskdescription">Description</label>
                    <textarea 
                        className="form-control" 
                        onChange={this.onChange}
                        value={this.state.taskdescription}
                        id="taskdescription" required />
                </div>
                <div className="form-group">
                  <label htmlFor="taskdeadline">Deadline: </label>
                  <input type="date" id="taskdeadline" className="form-control" onChange={this.onChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.createTask} data-dismiss="modal">Add Task</button>
            </div>
          </div>
        </div>
      </div>
      </React.Fragment>
    );

    if(this.state.loading) {
      screen = <h1 className='text-center mt-5'>Loading...</h1>;
    }

    return(
      <div>
        {screen}
      </div>
    );
  }
};

DashDisplay.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(DashDisplay);