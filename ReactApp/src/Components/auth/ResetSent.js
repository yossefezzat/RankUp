import React from 'react'
import { Link } from "react-router-dom";

const ResetSent = ()=>{
    return (
        <div className="access signin verify">
            <div className="page-content">
                <div className="page-head">
                <div className="logo">
                    <img src="images/blue-logo.svg" alt="" />
                </div>
                <p>Reset link is successfully sent to you</p>
                </div>
                <div className="access-box">
                <div className="image inbox">
                    <img src="images/undraw_mail_box_kd5i.svg" alt="" />
                </div>
                <div className="box-body">
                    <p>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
                    <Link className="btn btn-bBlue" to="/login">Return to login</Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ResetSent;