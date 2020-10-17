import React, { Component } from 'react';
import DashNav from './DashNav';
import TrackDisplay from './TrackDisplay';

class Track extends Component {
  render() {
    return(
      <div>
        <DashNav />
        <TrackDisplay />
        <footer className="page-footer fixed-bottom" style={{backgroundColor: '#00695c', height:'25px'}}>
          <div className="footer-copyright text-center">
            <p style={{color:'white'}}>© 2020 Copyright: Developed Through Love</p>
          </div>	
        </footer>
      </div>
    );
  }
};

export default Track;