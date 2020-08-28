import React, { Component } from 'react'

import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="wrapper">
          <div className="title-area">
            <h1 className="heading">{this.props.wsName}</h1>
          </div>
          <div className="rest-part">
            <div className="icons">
              <ul className="list-unstyled">
                <li>
                  
                </li>
              </ul>
            </div>
            <span className="deli" />
            <div className="media">
              <div className="media-body">
                <h6>{this.props.name}</h6>
                <div className="dropdown">
                  <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="/icons/down-arrow.svg" alt="" />
                  </span>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to="/logout">Logout</Link>
                  </div>
                </div>
              </div>
              <div className="image">
                <img src="/images/profiles/21294.png" alt="" className="rounded-circle" />
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
