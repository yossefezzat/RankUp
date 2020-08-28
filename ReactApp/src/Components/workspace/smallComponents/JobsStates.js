import React, { Component } from 'react'

import {getJobsStates} from "./../../../Utils/jobsCalls";

export default class JobsStates extends Component {
  state = {
    wsID: this.props.wsID,
    all: '',
    active: '',
    closed: '',
    hold: ''
  }
  componentDidMount(){
    getJobsStates(this.state.wsID)
      .then(data => {
        for (var key in data) {
          this.setState({[key]: data[key]});
        };
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="states">
        <div className="element text-center">
          <h4>All Jobs</h4>
          <span>{this.state.all}</span>
        </div>
        <div className="element text-center">
          <h4>Active</h4>
          <span>{this.state.active}</span>
        </div>
        <div className="element text-center">
          <h4>On Hold</h4>
          <span>{this.state.hold}</span>
        </div>
        <div className="element text-center">
          <h4>Closed</h4>
          <span>{this.state.closed}</span>
        </div>
      </div>
    )
  }
}
