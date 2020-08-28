import React, { Component } from 'react'
import { Link } from "react-router-dom";
import validate from 'validator';
import {login} from './../../Utils/authCalls';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errMsg: ''
    }

    handleEmailInput = (e) => {
        this.setState({
            email: e.target.value,
        })
    }

    handlePasswordInput = (e) => {
        this.setState({
            password: e.target.value,
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

    handleSubmit = () => {
        const invalidField = this.validate()
        let errMsg;
        if (invalidField) {
            this.setState({
                errMsg: invalidField
            });
        }
        else {
            login(this.state.email, this.state.password)
                .then(user => {
                    this.props.login(user);
                })
                .catch(error => {
                    if (error && error.status && error.status === 400) {
                        errMsg = "Incorrect username/password, please try again."
                    }
                    else {
                        errMsg = "Something went wrong, please try again later."
                    }
                    this.setState({
                        errMsg
                    })
                })
        }
    }

    render() {
        const { errMsg } = this.state;
        var show =  (errMsg)? "showen" : "";
        return (
            <div className="access signin">
                <div className="page-content">
                    <div className="page-head">
                        <div className="logo">
                        <img src="images/blue-logo.svg" alt="" />
                        </div>
                        <p>Welcome to Rank UP, please login to continue</p>
                    </div>
                    <div className="access-box">
                        <div className="box-body">
                        <div className={"error-notice " + show} id="error-notice">
                            <p>{errMsg}</p>
                        </div>
                        <form className="login" id="loginForm" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                            <label htmlFor="username">Email</label>
                            <input type="text" name="email" id="email" className="form-control req-input" onChange={this.handleEmailInput} />
                            </div>
                            <div className="form-group password">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control req-input" onChange={this.handlePasswordInput}/>
                            <span className="rp-eye js-ShowPass" />
                            </div>
                            <button type="button" className="btn btn-bBlue" onClick={this.handleSubmit}>Sign in</button>
                        </form>
                        </div>
                    </div>
                    <div className="page-footer text-center">
                        <p>Don’t have account? <Link to="/signup">Register now</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}