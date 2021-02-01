import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { SearchBox } from '../cmps/SearchBox.jsx'
import { logout, login } from '../store/actions/userActions.js';
import socketService from '../services/socketService.js'

export class _Header extends Component {

  state = {
    isNotificationOn: false,
    notificationInfo: {
      activityTitle: '',
      customerName: ''
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) this.openSocket()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && prevProps.user?._id !== this.props.user._id) {
      this.openSocket()
    }
  }

  openSocket = () => {
    const { user } = this.props;
    socketService.setup();
    socketService.emit('creatorId', user._id);
    socketService.on('show purchase notifiction', (purchaseInfo) => {
      const notificationInfo = {
        activityTitle: purchaseInfo.activityTitle,
        customerName: purchaseInfo.customerName
      }
      this.ShowNotification(notificationInfo)
    })
  }
 
  ShowNotification = (notificationInfo) => {
    this.setState({ ...this.state, isNotificationOn: true, notificationInfo: notificationInfo })
  }

  openGuestMode = (ev) => {
    ev.preventDefault();
    const guest = {
      email: 'guestMode@gmail.com',
      password: 'guest123'
    }
    this.props.login(guest);
    this.setState({ loginCred: { email: '', password: '' } });
  }


  render() {
    const searchParams = this.props.location.search
    const { isHomepage, user } = this.props;
    const { isNotificationOn } = this.state;
    const { activityTitle, customerName } = this.state.notificationInfo;
    return (
      <div className="main-header-wrapper">
        <header className="main-header">
          <div className="left-end">
            {isNotificationOn && <div className="purchase-notification flex">
              <div className="ml15">New Purchase!</div>
              <div> {`Event: ${activityTitle}`}</div>
              <div>{`From: ${customerName}`}</div>
              <button className="close-notification" onClick={() => this.setState({ isNotificationOn: false })}>x</button>
            </div>}
            <div className="logo">
              <NavLink to="/">
                <div className="logo-img">
                  <img src={require("../assets/img/logo.jpg")} alt="" />
                </div>
              </NavLink>
            </div>
          </div>

          {!isHomepage && <SearchBox cssClass={"header-search"} />}

          {(!user) ? (
            <div className="right-end">
              <div>
                <span className="cp m10 nav-override-color " onClick={this.openGuestMode}>Demo</span>
                <NavLink className="explore m10 nav-override-color" exact to={`/activity${searchParams}`}>Explore</NavLink>
                <NavLink className="cp nav-override-color" to={`/login`}>Login</NavLink>
                <NavLink className="cp nav-override-color" to={`/signUp`}>SignUp</NavLink>
              </div>
              <div>
                <NavLink className="nav-override-color" to={`/user`}><i className="far fa-2x fa-user-circle"></i></NavLink>
              </div>
            </div>) :
            <div className="right-end">
              <div className="flex sb" >
                <NavLink className="explore nav-override-color m10" exact to={`/activity${searchParams}`}>Explore</NavLink>
                <NavLink className="cp nav-override-color" to={`/`} onClick={this.props.logout}>Logout</NavLink>
              </div>
              <div className="asc">
                <NavLink className="nav-override-color" to={`/user/${user._id}`}><img className="attending-img cursor-pointer" src={user.imgUrl} alt="#" /></NavLink>
              </div>
            </div>
          }
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.loggedInUser
  }
}
const mapDispatchToProps = {
  logout,
  login
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Header))