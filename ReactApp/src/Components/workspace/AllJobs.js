import React, { Component } from 'react'
import {Link, withRouter} from "react-router-dom";

import {getWSJobs} from "./../../Utils/jobsCalls";

class AllJobs extends Component {
	state = {
		wsID: this.props.wsID,
    jobs: []
	}
	componentDidMount () {
		getWSJobs(this.state.wsID)
			.then(jobs => this.setState({jobs}));
	}
	render() {
		const jobsList = (this.state.jobs.length > 0)? this.state.jobs.map(job => {
      let date = new Date(Date.parse(job.created_date));
      return (
        <tr key={job._id}>
          <th scope="row">
            <div className="title">
            <Link to={this.props.match.url+"/job/" + job._id}><h6>{job.title}</h6></Link>
            </div>
          </th>
					<td>
						<h6>{job.HRName}</h6>
					</td>
          <td>
            <div className="date">
              <h6>{date.toDateString()}</h6>
              <span>{date.getHours() + ':' + date.getMinutes()}</span>
            </div>
          </td>
          <td>
            <div className="state">
              <span className={job.stat}>{job.stat}</span>
            </div>
          </td>
        </tr>
      )
    }) : (<tr> 
            <th scope="row"></th>
            <td><h3>No Jobs yet!</h3></td>
            <td></td>
            <td></td>
          </tr>);
		return (
			<div className="jobs-display">
				<div className="head">
					<h5>All jobs</h5>
				</div>
				<div className="jobs-table">
					<table className="table table-borderless">
						<thead>
							<tr>
								<th scope="col">Job details</th>
								<th scope="col">HR</th>
								<th scope="col">Date</th>
								<th scope="col">status</th>
							</tr>
						</thead>
						<tbody>
							{jobsList}
						</tbody>
					</table>
				</div>
				{/*<div className="pagination">
					<div className="tools">
						<div className="left"><span className="rp-chevron-left" /></div>
						<div className="num"> <span>7</span> </div>
						<div className="right"><span className="rp-chevron-right" /></div>
					</div>
				</div>*/}
			</div>
		)
	}
}

export default withRouter(AllJobs);