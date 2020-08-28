import React, { Component } from 'react'
import { NavLink, withRouter, Link} from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div className="side-cont">
        <span className="show-sidebar"><img src="/icons/select-arrow.svg" alt="" /></span>
        <div className="menu-sidebar">
          <div className="menu-sidebar__content">
            <div className="logo text-center">
              <img src="/images/white-logo.svg" alt="" />
            </div>
            <nav className="navbar-sidebars">
              <ul className="list-unstyled navbar__list">
                <li>
                  <NavLink to={this.props.match.url}>
                    <img src="/icons/dashboard.svg" alt="" />
                    <span>Overview</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.match.url+"/jobs"}>
                    <img src="/icons/acquiredfilms.svg" alt="" />
                    <span>Jobs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.match.url + "/help"}>
                    <img src="/icons/help.svg" alt="" />
                    <span>Help Center</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={this.props.match.url + "/settings"}>
                    <img src="/icons/settings.svg" alt="" />
                    <span>Settings</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Sidebar);
