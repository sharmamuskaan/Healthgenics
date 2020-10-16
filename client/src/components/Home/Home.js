import React from 'react';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const homeInfo = props => (
  <React.Fragment>
    <Navbar>
      <Link to='/login'>
        <button className="btn btn-outline-success my-2 my-sm-0 mx-3">Login</button>
      </Link>
      <Link to='/register'>
        <button className="btn btn-outline-success my-2 my-sm-0">Register</button>
      </Link>
    </Navbar>
    <div className="jumbotron">
      <h1 className="display-4">Your One Stop Solution for</h1>
      <h1 className="display-2"><strong>BEING HEALTHY</strong></h1>		
      <hr className="my-4" />
      <p className='lead'><strong>LETS GET STARTED></strong></p>
    </div>
  </React.Fragment>
);

export default homeInfo;