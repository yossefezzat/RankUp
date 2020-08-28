import React, { Component } from 'react'
import {withRouter} from "react-router-dom";

import {getJob, deleteJob, updateJob, cvsUpload} from "./../../Utils/jobsCalls";
import { classifyCVs } from "./../../Utils/rankingCalls";
import {requestReading} from "./../../Utils/nlpModalCalls";
import JobDisplay from './smallComponents/JobDisplay';
import JobRanked from "./JobRanked";

class ViewJob extends Component {
  state = {
    job: '',
    uploadedFiles: null,
    loading: false,
  }
  componentDidMount(){
    getJob(this.props.match.params.jobID)
      .then(data => {
        this.setState({job:data});
      });
  }
  handleDelete = () => {
    deleteJob(this.state.job._id)
      .then(data => this.props.history.push('/workspace/'+this.state.job.wsID));
  }
  handleUpdate = (flag = 0) => {
    updateJob(this.state.job)
      .then(data => this.props.history.push(this.props.match.url));
  }
  handleChange = (e) => {
    let newJob = this.state.job;
    newJob[e.target.id] = e.target.value;
    this.setState({job: newJob});
  }
  handleRank =(e) => {
    this.setState({loading: true});
    let newJob = this.state.job;
    newJob['stat'] = 'closed';
    updateJob(newJob)
      .then(job => {
        requestReading(newJob._id, newJob.skills)
          .then(() => {
            classifyCVs(newJob._id)
              .then(() => {
                this.props.history.push(this.props.match.url)
              })
          })
      });
  }
  checkMimeType=(event)=>{
    let files = event.target.files 
    let err = ''
    for(var x = 0; x<files.length; x++) {
      if (files[x].type !== 'application/pdf') {
        err += files[x].type+' is not a supported format\n';
      }
    };
    if(err) {
      event.target.value = null
      console.log(err)
      return false; 
    }
    return true;
  }
  handleFileChange = (e) => {
    if(this.checkMimeType(e)){ 
      this.setState({
        uploadedFiles: e.target.files,
      })
    }
  }
  handleFileUpload = (e) => {
    const data = new FormData();
    let uploaded = 0;
    for(var x = 0; x<this.state.uploadedFiles.length; x++) {
      data.append('file', this.state.uploadedFiles[x]);
      uploaded++;
    }
    if(cvsUpload(this.state.job._id, data))
      this.setState({uploaded});
  }
  render() {
    const job = this.state.job;
    const states = ['active', 'hold'];
    const statesOptions = states.map(stat => {
      if(stat !== job.stat){
       return(
          <option value={stat} key={stat}>{stat}</option>
        )
      }
    }); 
    return (
      <div className="main-page dashboard">
        <div className="viewjob">
          <div className="content-side clearfix">
            <div className="page-content">
              <div className="container no-padding">
                <JobDisplay job={this.state.job} handleRank={this.handleRank} />
                {
                  (this.state.loading)?(
                    <div className="loading-cont">
                      <div className="loading">
                        <div></div>
                        <div></div>
                      </div>  
                      <p className="text-center">Ranking process is loading, Please wait...</p>
                    </div>
                  ) : ('')
                }
                {(job.stat === 'closed')? <JobRanked jobID={job._id}/>:''}
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade confirm" id="confirmModal" tabIndex={-1} role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmModalLabel">Please confirm the following action</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>This action will delete this job with all its data</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-delete"  data-dismiss="modal" onClick={this.handleDelete}>Delete</button>
                <button type="button" className="btn btn-close" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade edit" id="editJob" tabIndex={-1} role="dialog" aria-labelledby="editJobLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="editJobLabel">Edit job</h6>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form action="index.html" method="post" id="edit-video-form">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="title">Job title</label>
                        <input type="text" name="title" id="title" className="form-control req-input" value={this.state.job.title} required onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="stat">Job status</label>
                        <select className="form-control" name="stat" id="stat" required onChange={this.handleChange}>
                          <option value={this.state.job.stat}>{this.state.job.stat}</option>
                          {statesOptions}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" rows={8} className="form-control req-input" value={this.state.job.description} onChange={this.handleChange}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="skills">Skills</label>
                        <textarea name="skills" id="skills" rows={2} className="form-control req-input" value={this.state.job.skills} onChange={this.handleChange}/>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-save" data-dismiss="modal" onClick={this.handleUpdate}>Save</button>
                <button type="button" className="btn btn-close" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade edit" id="uploadcvs" tabIndex={-1} role="dialog" aria-labelledby="uploadcvsLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title" id="uploadcvsLabel">Upload CVS</h6>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="upload-file">
                  <div className="row">
                    <div className="offset-4 col-4">
                      <div className="form-group">
                        <label htmlFor="file">Choose pdf files to upload</label>
                        <input type="file" name="file" id="file" accept="application/pdf" className="form-control req-input" multiple required onChange={this.handleFileChange}/>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-save" data-dismiss="modal" onClick={this.handleFileUpload}>Save</button>
                <button type="button" className="btn btn-close" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ViewJob);

