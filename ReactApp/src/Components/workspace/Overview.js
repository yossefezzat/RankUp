import React, { Component } from 'react'
import {Link, withRouter} from "react-router-dom";

import JobsStates from "./smallComponents/JobsStates";
import HRJobsTable from "./smallComponents/HRJobsTable";

class Overview extends Component {
  state = {
    hrID: this.props.hrID,
    wsID: this.props.wsID
  }
  render() {
    return (
      <div className="component-wrapper">
        <h3 className="tap-title">Overview</h3>
        {<JobsStates wsID ={this.state.wsID}/>}
        <div className="addnewjob">
          <Link to={this.props.match.url+"/new-job"}><span className="rp-plus-square"/> New Job</Link>
        </div>
        {<HRJobsTable hrID={this.state.hrID} wsID={this.state.wsID}/>}
      </div>
    )
  }
}

export default withRouter(Overview);