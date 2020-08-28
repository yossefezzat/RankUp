import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter} from "react-router-dom";

// Components
import Home from "./home/Home";
import AfterLogin from "./AfterLogin";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import PSForget from "./auth/PSForget";
import EmailConfirm from "./auth/EmailConfirm";
import ResetSent from "./auth/ResetSent";
import Logout from "./auth/Logout";

// Auth Calls
import {init, signout } from './../Utils/authCalls';

class App extends Component {
  state = {
    loggedInUser: '',
  };

  componentDidMount() {
    init()
      .then(user => {
        let flag = 1;
        if(this.props.location.pathname.includes("workspace"))
          flag = 0;
        this.handleLogin(user, flag);
      })
      .catch(error => {
        if(this.props.location.pathname !== '/' && this.props.location.pathname !== '/signup')
          this.props.history.push('/login');
      })
  };

  handleLogin = (user, flag = 1) => {
    let userID = user.user._id;
    this.setState({
      loggedInUser: user,
    });
    if(flag)
      this.props.history.push('/ws-list/'+userID);
  }

  handleSignout = () => {
    signout()
      .then(user => {
        this.setState({
          loggedInUser: ''
        });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ errMessage: error })
      })
  }

  render(){
    return (
      <div className="app-main">
      {(!this.state.loggedInUser)? (
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route 
            path="/login"
            component={() => <Login login={this.handleLogin} />}  
          />
          <Route path="/Signup" component={Signup} />
          <Route path="/forget-password" component={PSForget} />
          <Route path="/email-confirmation" component={EmailConfirm} />
          <Route path="/reset-email-sent" component={ResetSent} />
        </Switch> 
      ) : ( 
        <Switch>
          <Route
            exact path="/logout" 
            component={() => <Logout fun={this.handleSignout} />}  
          />
          <AfterLogin user={this.state.loggedInUser}  /> 
        </Switch>        
      )}
      </div>
    );
  }
}

export default withRouter(App);
