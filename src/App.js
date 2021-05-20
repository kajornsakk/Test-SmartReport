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
import ConfirmSingUp from './components/auth/ConfirmSingUp'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Send_report from './components/Send_report';
import Upload_History from './components/Upload_History';
import SendEmailHistory from './components/SendEmailHistory';
import { Auth } from "aws-amplify";
Amplify.configure(aws_exports);

library.add(faEdit);



class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  render() {

    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    if (!this.state.isAuthenticated) {
      return (<div className="App">
        <Router>
          <Switch>
            <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
            <Route exact path="/ConfirmSingUp" render={(props) => <ConfirmSingUp {...props} auth={authProps} />} />
            <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
            <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
            <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
            <Route render={(props) => <LogIn {...props} auth={authProps} />} />
            
          </Switch>
        </Router>
      </div>);
    }

    return (
      this.state.isAuthenticated &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} auth={authProps} />} />
              <Route exact path="/Upload_lecture" render={(props) => <Upload_lecture {...props} auth={authProps} />} />
              <Route exact path="/Upload_academy" render={(props) => <Upload_academy {...props} auth={authProps} />} />
              <Route exact path="/Report" render={(props) => <Report {...props} auth={authProps} />} />
              <Route exact path="/Send_report" render={(props) => <Send_report {...props} auth={authProps} />} />
              <Route exact path="/Upload_History" render={(props) => <Upload_History {...props} auth={authProps} />} />
              <Route exact path="/TestS3" render={(props) => <TestS3 {...props} auth={authProps} />} />
              <Route exact path="/SendEmailHistory" render={(props) => <SendEmailHistory {...props} auth={authProps} />} />
              <Route exact path="/admin" render={(props) => <ProductAdmin {...props} auth={authProps} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              {/* <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} /> */}
              {/* <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} /> */}
              {/* <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} /> */}
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
              {/* <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} /> */}
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
              {/* <Route exact path="/ConfirmSingUp" render={(props) => <ConfirmSingUp {...props} auth={authProps} />} /> */}
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





{/* <Route exact path="/" component={Home} />
              <Route exact path="/Upload_lecture" component={Upload_lecture} />
              <Route exact path="/Upload_academy" component={Upload_academy} />
              <Route exact path="/Report" component={Report} />
              <Route exact path="/Send_report" component={Send_report} />
              <Route exact path="/Upload_History" component={Upload_History} />
              <Route exact path="/TestS3" component={TestS3} />
              <Route exact path="/SendEmailHistory" component={SendEmailHistory} />
              <Route exact path="/admin" component={ProductAdmin} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} />
              <Route exact path="/changepassword" component={ChangePassword} />
              <Route exact path="/changepasswordconfirmation" component={ChangePasswordConfirm} />
              <Route exact path="/welcome" component={Welcome} /> */}