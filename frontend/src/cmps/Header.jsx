import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { SearchBox } from '../cmps/SearchBox.jsx'
import { logout, login } from '../store/actions/userActions.js';
import socketService from '../services/socketService.js'

export class _Header extends Component {

  state = {
    isMenuActive: false,
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

  toggleMenuBtn = (fromLogo = false) => {
    if (fromLogo === true) {
      const { isMenuActive } = this.state
      if(isMenuActive===false) return
    }
    this.setState({ isMenuActive: !this.state.isMenuActive })
  }


  render() {
    const searchParams = this.props.location.search
    const { isHomepage, user } = this.props;
    const { isNotificationOn, isMenuActive } = this.state;
    const { activityTitle, customerName } = this.state.notificationInfo;
    return (

      <header className="main-header-wrapper">
        <div className={`main-header ${isMenuActive ? 'active' : ''}`}>
          <div className="left-end">
            {isNotificationOn && <div className="purchase-notification flex">
              <div className="ml15">New Purchase!</div>
              <div> {`Event: ${activityTitle}`}</div>
              <div>{`From: ${customerName}`}</div>
              <button className="close-notification" onClick={() => this.setState({ isNotificationOn: false })}>x</button>
            </div>}
            <div className="logo">
              <NavLink to="/" onClick={()=>this.toggleMenuBtn(true)}>
                <div className="logo-img">
                  <img src={require("../assets/img/logo.jpg")} alt="" />
                </div>
              </NavLink>
            </div>
          </div>

          {!isHomepage && <div className={`header-search-container ${isMenuActive ? 'active' : ''}`}><SearchBox cssClass={"header-search"} /></div>}


          <div className="right-end">
            <div className="icons">
              <div className="avatar nav-override-color">
                {!user ?
                  <i className="far fa-2x fa-user-circle"></i> :
                  <NavLink to={`/user/${user._id}`}><img className="attending-img cursor-pointer" src={user.imgUrl} alt="#" /></NavLink>
                }
              </div>

              <div onClick={this.toggleMenuBtn} className={`menu-btn ${isMenuActive ? 'active' : ''}`}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>

            </div>

            <div className={`navs ${isMenuActive ? 'active' : ''} ${isHomepage ? 'home' : ''}`}>
              <NavLink className="navs-child" onClick={this.toggleMenuBtn} exact to={`/activity${searchParams}`}>Explore</NavLink>
              {!user &&
                <>
                  <NavLink className="navs-child" onClick={this.toggleMenuBtn} to={`/login`}>Login</NavLink>
                  <NavLink className="navs-child" onClick={this.toggleMenuBtn} to={`/signUp`}>SignUp</NavLink>
                </>
              }
              {user &&
                <NavLink className="navs-child" to={`/`} onClick={() => {
                  this.toggleMenuBtn()
                  this.props.logout()
                }
                }>Logout</NavLink>}
            </div>
          </div>
        </div>

      </header>
    )
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