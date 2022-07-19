import React, { Fragment, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import AlertState from './context/alert/AlertState';
import BugState from './context/bug/BugState';
import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';
import './App.css';
import test from './components/test';
import button_1 from './components/button_1';



const App = () => {
  useLayoutEffect(()=>{
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  },[])
  return (
    <AuthState>
      <BugState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/test' component={test} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </BugState>
    </AuthState>
  );
};

export default App;
