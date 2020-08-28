import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class PSForget extends Component {
    state = {
        email: '',
        invalidEmail: false,
        errMsg: ''
    }
    render() {
        return (
            <div className="access signin">
                <div className="page-content">
                    <div className="page-head">
                        <div className="logo">
                        <img src="images/blue-logo.svg" alt="" />
                        </div>
                        <p>Enter you email address to reset your password</p>
                    </div>
                    <div className="access-box">
                        <div className="box-body">
                        <div className="error-notice" id="error-notice">
                            <p>Email is not valid</p>
                        </div>
                        <form className="login" action="index.html" id="loginForm" method="post">
                            <div className="form-group">
                            <label htmlFor="username">Email</label>
                            <input type="text" name="email" id="email" className="form-control req-input" defaultValue />
                            </div>
                            <button type="button" name className="btn btn-bBlue" onclick="validateForm(loginForm)">Send reset link</button>
                        </form>
                        </div>
                    </div>
                    <div className="page-footer text-center">
                        <p>Wanna try again? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}