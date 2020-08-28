import React, { Component } from 'react'
import { Link } from "react-router-dom";
import validate from 'validator';
import {signup} from './../../Utils/authCalls';

export default class Signup extends Component {
    state = {
        firstName: '',
        secondName: '',
        email: '',
        password: '',
        errMsg: ''
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    validate = () => {
        let invalid = false
        if (this.state.firstName.trim() === '') {
            invalid = "Empty First Name"
        } 
        else if (this.state.secondName.trim() === '') {
            invalid = "Empty Second Name"
        }
        else if (!validate.isEmail(this.state.email)) {
            invalid = "Invalid Email"
        }
        else if (this.state.password.trim() === "") {
            invalid = "Empty Password"
        }
        return invalid
    }
    handleSubmit = () => {
        const invalidField = this.validate()
        if (invalidField) {
            this.setState({
                errMsg: invalidField
            });
        }
        else {
            signup(this.state.firstName, this.state.secondName, this.state.email, this.state.password)
                .then(user => {
                    this.props.history.push('/login');
                })
                .catch(error => {
                    let err
                    if (error.data.errmsg) {
                        err = error.data.errmsg
                    }
                    else if (error.data.errors.password) {
                        err = "Invalid Password, must be atleast 8 letters."
                    }
                    else {
                        err = error.data.message
                    }
                    this.setState({
                        signupFailed: true,
                        errMessage: err
                    })
                })
        }
    }

    render() {
        return (
            <div className="access signup">
                <div className="page-content">
                    <div className="access-box">
                        <div className="row">
                        <div className="col-md-5">
                            <div className="left-box">
                            <div className="logo image">
                                <img src="images/white-logo.svg" alt="" />
                            </div>
                            <div className="girl image">
                                <img src="images/girl.svg" alt="" />
                            </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="right-box">
                                <div className="box-head">
                                    <h5>Welcome to Rank UP, Setup your profile</h5>
                                </div>
                                <div className="box-body">
                                    <form className="register-form">
                                    <div className="form-inputs">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                <label htmlFor="fname">First Name <span className="req-mark">*</span></label>
                                                <input type="text" className="form-control" name="firstName" id="firstName" required onChange={this.handelChange} />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                <label htmlFor="lname">Last Name <span className="req-mark">*</span></label>
                                                <input type="text" className="form-control" name="secondName" id="secondName" required onChange={this.handelChange}/>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="form-group">
                                            <label htmlFor="email">Email <span className="req-mark">*</span></label>
                                            <input type="email" className="form-control" name="email" id="email" required onChange={this.handelChange}/>
                                            </div>
                                            <div className="form-group password">
                                            <label htmlFor="password">Password <span className="req-mark">*</span></label>
                                            <input type="password" className="form-control" name="password" id="password" required onChange={this.handelChange}/>
                                            <span className="rp-eye js-ShowPass" />
                                            </div>
                                            <div className="form-group">
                                            <label>By clicking below, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
                                            </div>
                                        </div>
                                        <div className="box-footer">
                                            <button type="button" className="btn btn-bBlue" onClick={this.handleSubmit}>Create account</button>
                                            <p>Already have account? <Link to="/login">Login</Link></p>
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