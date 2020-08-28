import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {getWorkSpaceList} from './../../Utils/workSpaceCalls';


export default class WSList extends Component {
    state =  {
        wpList:[]
    }
    componentDidMount(){
        const userID = this.props.match.params.userID;
        const userEmail = this.props.userEmail;
        getWorkSpaceList(userID, userEmail)
            .then(data => {
                this.setState({
                    wpList: data
                });
                console.log(this.state);
            })
            .catch(err => {
                console.log('WorkSpaces not found')
            })
    }
    render() {
        const wsListToShow = (this.state.wpList.length > 0)? this.state.wpList.map(ws => {
            return (
                <div className="entry" key={ws._id}>
                    <Link to={"/workspace/" + ws._id}>
                        <div className="entry-wrap">
                            <h6>{ws.name}</h6>
                            <span className="rp-eye" />
                        </div>
                    </Link>
                </div>
            )
        }) : ( <div className="entry">No Workspaces yet!</div> );
        return (
            <div className="access signin wslist">
                <div className="page-content">
                    <div className="page-head">
                        <div className="logo">
                            <img src="/images/blue-logo.svg" alt="" />
                        </div>
                        <p>Welcome to Rank UP, Here's your workspaces list </p>
                    </div>
                    <div className="access-box">
                        <div className="box-body">
                            {wsListToShow}
                        </div>
                    </div>
                    <div className="page-footer text-center">
                        <Link to="/new-workspace" className="btn btn-bBlue">Create new workspace <span className="rp-plus-square" /></Link>
                    </div>
                </div>
            </div>
        )
    }
}
