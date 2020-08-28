import React, { Component } from 'react'

export default class NewJob extends Component {
  state = {
    title: '',
    description: '',
    level: '',
    skills: ''
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  }
  handelChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }
  render() {
    return (
      <div className="newjob">
        <div className="page-content">
        <h3 className="tap-title">Post New Job</h3>
        <div className="job-form">
          <form className="new-job-form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="title">Job title</label>
                  <input type="text" name="title" id="title" className="form-control req-input" required onChange={this.handelChange}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="level">Job Level</label>
                  <select className="form-control" name="level" id="level" required onChange={this.handelChange}>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="leader">Leader</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea name="description" id="description" rows={8} className="form-control req-input" defaultValue={""} onChange={this.handelChange}/>
                </div>
              </div>
            </div>
            <div className="job-skills">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="skills">Skills</label>
                    <textarea name="skills" id="skills" rows={3} className="form-control req-input" defaultValue={""} placeholder="Write your need skills here and separate them with space" onChange={this.handelChange}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="next-action">
              <button type="button" className="btn btn-bBlue" onClick={this.handleSubmit}>Start posting job</button>
            </div>
          </form>
        </div>
      
        </div>
      </div>
    )
  }
}