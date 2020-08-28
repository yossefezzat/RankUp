import React, {Component} from 'react';
import { Link } from "react-router-dom";

class EmailConfirm extends Component{
    render(){
        setTimeout(() => {
            this.props.history.push('/login');
        }, 5000);
        return (
                <div className="access signin verify">
                    <div className="page-content">
                        <div className="page-head">
                            <div className="logo">
                            <img src="images/blue-logo.svg" alt="" />
                            </div>
                            <p>Confirmation link is successfully sent to you</p>
                        </div>
                        <div className="access-box">
                            <div className="image inbox">
                            <img src="images/undraw_mail_box_kd5i.svg" alt="" />
                            </div>
                            <div className="box-body">
                            <p>Check your email for a link to confirm your email. If it doesn’t appear within a few minutes, check your spam folder.</p>
                            <p>Didn't received mail? <Link to="/resend-mail">Resend mail</Link> </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

export default EmailConfirm;