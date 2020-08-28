import React, { Component } from 'react'
import {Route, Switch, withRouter} from "react-router-dom";
import validate from 'validator';

// Components
import WSList from "./workspace/WSList";
import NewWorkSpace from "./workspace/NewWorkSpace";
import WorkSpace from "./workspace/WorkSpace";

// API Calls
import {createWorkSpace} from "../Utils/workSpaceCalls";
import {inviteToWS} from "../Utils/mailingCalls";

class AfterLogin extends Component {
  state = {
    user: this.props.user.user
  }
  handleNewWorkSpace = (name, emails) => {
    createWorkSpace(name, emails, this.state.user._id)
      .then((ws) => {
        emails.forEach(async email => {
          if (validate.isEmail(email)){
            var result = await inviteToWS(name, email);
            console.log(result);
          }
        })
      })
      .then(()=>{
        this.props.history.push('/ws-list/'+this.state.user._id);
      })
    
  }
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/workspace/:wsID" 
            component={() => <WorkSpace user={this.state.user}/>}  
          />
          <Route exact path="/ws-list/:userID" component = {(props)=><WSList {...props} userEmail={this.state.user.email}/>} />
          <Route
            path="/new-workspace" 
            component={() => <NewWorkSpace new_ws={this.handleNewWorkSpace} />}  
          />
        </Switch>
      </div>
    )
  }
}
export default withRouter(AfterLogin);