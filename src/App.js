import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Upload_lecture from './components/Upload_lecture';
import ProductAdmin from './components/ProductAdmin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Upload_academy from './components/Upload_academy';
import Report from './components/Report';
import TestS3 from './components/TestS3';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(aws_exports);

library.add(faEdit);



class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Upload_lecture" component={Upload_lecture} />
              <Route exact path="/Upload_academy" component={Upload_academy} />
              <Route exact path="/Report" component={Report} />
              <Route exact path="/TestS3" component={TestS3} />
              <Route exact path="/admin" component={ProductAdmin} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} />
              <Route exact path="/changepassword" component={ChangePassword} />
              <Route exact path="/changepasswordconfirmation" component={ChangePasswordConfirm} />
              <Route exact path="/welcome" component={Welcome} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
// export default withAuthenticator(App, { includeGreetings: true });
