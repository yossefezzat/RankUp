import React, { Component } from 'react'
import {Route, Switch, withRouter} from "react-router-dom";

// Components
import Header from "./../layout/Header";
import Sidebar from "./../layout/Sidebar";
import Overview from "./Overview";
import ViewJob from "./ViewJob";
import NewJob from "./NewJob";
import AllJobs from "./AllJobs";
import Help from "./Help";
import Setting from "./Setting";

// API Calls
import {addNewJob} from "../../Utils/jobsCalls";
import {getWorkSpace, changeWorkSpaceName, deleteUser} from "../../Utils/workSpaceCalls";

class WorkSpace extends Component {
  state = {
    userID: this.props.user._id,
    wsID: this.props.match.params.wsID,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    wsName: '',
    ownerID: '',
    users:'',
  }
  handleNewJobSubmit = (jobObj) => {
    jobObj['wsID'] = this.state.wsID;
    jobObj['hrID'] = this.state.userID;
    jobObj['HRName'] = this.state.firstName+' '+this.state.lastName;
    addNewJob(jobObj)
      .then(data => {
        this.props.history.push("/workspace/"+this.state.wsID);
      });
  }
  componentDidMount() {
    this.renderMyData();
  }
  renderMyData(){
    getWorkSpace(this.state.wsID)
      .then(ws => {
        this.setState({
          wsName: ws.name,
          users: ws.users,
          ownerID: ws.ownerID
        })
      });
  }
  handleNameUpdate = (newName) => {
    changeWorkSpaceName(newName, this.state.wsID)
      .then(data => {
        this.setState({wsName: newName});
      })
  }
  handleDeleteUser = (userID) => {
    deleteUser(userID, this.state.wsID)
      .then(data => {
        console.log('deleted');
      })
      .catch(err => console.log('Not deleted!'));
  }
  render() {
    return (
      <div className="dashboard">
        <div className="main-page overview">
          {<Sidebar />}
          <div className="content-side clearfix">
            {<Header name={this.state.firstName +" "+ this.state.lastName} wsName={this.state.wsName} />}
            <div className="page-content">
              <div className="container no-padding">
              <Switch>
                <Route exact path={this.props.match.path+"/"} component = {()=> <Overview wsID={this.state.wsID} hrID={this.state.userID}/> }/>
                <Route exact path={this.props.match.path+"/job/:jobID"} component ={ViewJob}/>
                <Route path={this.props.match.path+"/new-job"} component = {()=> <NewJob handleSubmit={this.handleNewJobSubmit}/> }/>
                <Route exact path={this.props.match.path+"/jobs"} component = {()=> <AllJobs wsID={this.state.wsID}/> }/>
                <Route path={this.props.match.path+"/jobs/job/:jobID"} component={ViewJob}/>
                <Route path={this.props.match.path+"/Help"} component = {()=> <Help/> }/>
                <Route path={this.props.match.path+"/Settings"} 
                  component = {()=> <Setting updateWSName={this.handleNameUpdate} handleDeleteUser={this.handleDeleteUser} wsName={this.state.wsName} users={this.state.users}/> }
                />
              </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(WorkSpace);
