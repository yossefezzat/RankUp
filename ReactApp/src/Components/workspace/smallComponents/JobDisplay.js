import React, { Component } from 'react'

export default class JobDisplay extends Component {
  render() {
    let job = this.props.job;
    const date = new Date(Date.parse(job.created_date));
    return (
      <div>
        <div className="jobs-details">
          <div className="jobs-head">
            <div className="title">
              <h3>{job.title}</h3>
              <span>{date.toDateString()}</span>
            </div>
            <div className="state">
              <span className={job.stat}>{job.stat}</span>
              {
                (job.stat !== 'closed') ? (
                  <div className="more">
                    <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img src="/icons/more-vertical.svg" alt="" />
                    </span>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <button className="dropdown-item" data-toggle="modal" data-target="#uploadcvs">Upload CVS</button>
                      <button className="dropdown-item" data-toggle="modal" data-target="#editJob">Edit job</button>
                      <button className="dropdown-item" data-toggle="modal" data-target="#confirmModal">Delete job</button>
                    </div>
                  </div>
                ) : (
                  <div className="more">
                    <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img src="/icons/more-vertical.svg" alt="" />
                    </span>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <button className="dropdown-item" data-toggle="modal" data-target="#confirmModal">Delete job</button>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          {
            (job.stat === 'closed') ? (
              <div className="applicants">
                <h5>Number of applicants: <span>{job.numOfApplicants}</span></h5>
              </div>
            ) : ('')
          }
          <div className="description">
            <h4>Description</h4>
            <p>{job.description}</p>
          </div>
          <div className="description">
            <h4>Skills</h4>
            <p>{job.skills}</p>
          </div>
        </div>
        {
          (job.stat !== 'closed')? (
            <div className="next-action">
              <button type="button" className="btn btn-bBlue" onClick={this.props.handleRank}>Close and Start Ranking</button>
            </div>
          ) : ('')
        }
      </div>
    )
  }
}
