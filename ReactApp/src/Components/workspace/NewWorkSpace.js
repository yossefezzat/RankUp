import React, { Component } from 'react'
import validate from 'validator';

export default class NewWorkSpace extends Component {
    state = {
        name : '', 
        email1 : '',
        email2 : '',
        email3 : ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const emails = [this.state.email1,this.state.email2, this.state.email3];
        this.props.new_ws(this.state.name, emails);
    }
    handelNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handelEmailChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    validate = () => {
        let invalid = false
        if (!validate.isEmail(this.state.email)) {
            invalid = "invalid Email"
        }
        else if (this.state.password === "") {
            invalid = "empty Password"
        }
        return invalid
    }
    render() {
        return (
            <div className="access signin signup newws">
                <div className="page-content">
                    <div className="page-head">
                        <div className="logo">
                        <img src="images/blue-logo.svg" alt="" />
                        </div>
                        <p>Create your workspace easily</p>
                    </div>
                    <div className="access-box">
                        <div className="row">
                        <div className="col-md-5">
                            <div className="left-box">
                            <div className="image">
                                <img src="images/workspace.svg" alt="" />
                            </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="right-box">
                            <div className="box-body">
                                <form className="register-form" onSubmit={this.handleSubmit}>
                                <div className="form-inputs">
                                    <div className="form-group">
                                    <label htmlFor="name">Workspace name <span className="req-mark">*</span></label>
                                    <input type="name" className="form-control" name="name" id="name" required onChange={this.handelNameChange} />
                                    </div>
                                    <div className="form-group">
                                    <label>Invite your team</label>
                                    <input type="email" className="form-control" name="email1" id="email1" placeholder="Enter their email address" onChange={this.handelEmailChange} />
                                    <input type="email" className="form-control" name="email2" id="email2" placeholder="Enter their email address" onChange={this.handelEmailChange} />
                                    <input type="email" className="form-control" name="email3" id="email3" placeholder="Enter their email address" onChange={this.handelEmailChange} />
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button className="btn btn-bBlue" onClick={this.handleSubmit}>Create Workspace</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}