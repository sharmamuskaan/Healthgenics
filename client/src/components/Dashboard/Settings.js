import React, { Component } from 'react';
import DashNav from './DashNav';
import SettingDisplay from './SettingDisplay';
import classes from './SettingDisplay.module.css';

class Track extends Component {
  render() {
    return(
      <div className={classes.Body}>
        <DashNav />
        <SettingDisplay />
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