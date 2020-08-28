import React, { Component } from 'react'

export default class Setting extends Component {
  state = {
    wsName: this.props.wsName,
    users: this.props.users,
    toDelete: '',
  }
	handelChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }
  handelNameSub = () => {
    this.props.updateWSName(this.state.wsName);
  }
  handelDeleteUser = () => {
    this.props.handleDeleteUser(this.state.toDelete);
  }
  markDeleted = (e) => {
    this.setState({toDelete: e.target.dataset.id});
  }
	render() {
    const usersList = (this.state.users.length > 0)? this.state.users.map(user => {
      return (
        <li className="user" key={user.userID}>
          <div>
            <span>{user.name}</span> <button type="button" className="btn btn-red" data-id={user.userID} data-toggle="modal" data-target="#confirmModal" onClick={this.markDeleted}>Delete</button>
          </div>
        </li>
      )
    }) : (<li><div>No users yet!</div></li>);
		return (
			<div className="settings">
				<h3 className="tap-title">Settings</h3>
				<div className="settings-list">
          <form className="settings-form">
            <label htmlFor="wsName">WorkSpace Name</label>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <input type="text" name="wsName" id="wsName" className="form-control req-input" value={this.state.wsName} required onChange={this.handelChange}/>
                </div>
              </div>
              <div className="col-6">
                <button type="button" className="btn btn-bBlue" onClick={this.handelNameSub}>Done</button>
              </div>
            </div>
            <label htmlFor="wsName">WorkSpace Users</label>
            <div className="row">
              <div className="col-6">
                <div className="ws-users">
                  <div className="users-area">
                    <ul>
                      {usersList}
                    </ul>
                  </div>
                </div>  
              </div>
            </div>   
          </form>
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
                <p>This action will delete this user from WorkSpace</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-delete" onClick={this.handelDeleteUser}>Delete</button>
                <button type="button" className="btn btn-close" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
			</div>
		)
	}
}
