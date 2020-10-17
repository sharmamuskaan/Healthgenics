import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './store/actions/auth';
import store from "./store/store";
import Home from './components/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Tracker from './components/Dashboard/Tracker';
import Settings from './components/Dashboard/Settings';
import PasswordChange from './components/Dashboard/PasswordChange';

class App extends Component {

  componentDidMount() {

    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwt_decode(token);
      store.dispatch(setCurrentUser(decoded));
    }

  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/pass" component={PasswordChange} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/tracker" component={Tracker} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route path='/' component={Home} />    
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
};

export default App;