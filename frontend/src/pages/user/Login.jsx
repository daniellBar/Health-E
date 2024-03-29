import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUsers, removeUser, login, logout, } from '../../store/actions/userActions';

class _Login extends Component {
  state = {
    msg: '',
    loginCred: {
      password: ''
    },
    signupCred: {
      password: ''
    }
  };

  loginHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }));
  };

  signupHandleChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }));
  };

  doLogin = async ev => {
    ev.preventDefault();
    const { email, password } = this.state.loginCred;
    if (!email || !password) {
      return this.setState({ msg: 'Please enter user/password' });
    }
    const userCreds = { email, password };
    this.props.login(userCreds);
    this.setState({ loginCred: { email: '', password: '' } });
  };

  removeUser = userId => {
    this.props.removeUser(userId);
  }

  render() {
    let loginSection = (
      <form className="login-form" onSubmit={this.doLogin}>
        <div className="login tac">
          <input className="login-input"
            type="text"
            name="email"
            autoComplete="off"
            value={this.state.loginCred.email || ''}
            onChange={this.loginHandleChange}
            placeholder="Email"
          />
          <br />
          <input className="login-input"
            type="password"
            name="password"
            autoComplete="off"
            value={this.state.loginCred.password || ''}
            onChange={this.loginHandleChange}
            placeholder="Password"
          />
          <br />
          <button className="login-btn">Login</button>
        </div>
      </form>
    );

    const { loggedInUser } = this.props;
    return (
      <div className="main-container">
        {!loggedInUser && <div className="flex justify-center align-center column">
          <h2 className="tac marg-top-50">
            Login
        </h2>
          <h2>{this.state.msg}</h2>
        </div>
        }
        {loggedInUser && (
          <div className="justify-self">
            <h2>Welcome: {loggedInUser.fullName} </h2>
            <div className="justify-center flex"><button className="login-btn-small" onClick={this.props.logout}>Logout</button></div>
          </div>
        )}
        {!loggedInUser && loginSection}
        <hr />
        {this.props.isLoading && 'Loading...'}
        {this.props.users && <ul>
          {this.props.users.map(user => (
            <li key={user._id}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <button
                onClick={() => {
                  this.removeUser(user._id);
                }}
              >
                Remove {user.fullName}
              </button>
            </li>
          ))}
        </ul>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users,
    loggedInUser: state.userReducer.loggedInUser,
    isLoading: state.systemReducer.isLoading
  };
};
const mapDispatchToProps = {
  login,
  logout,
  removeUser,
  loadUsers
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
