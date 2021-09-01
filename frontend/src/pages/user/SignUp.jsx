import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImg } from '../../services/imgUploadService.js';
import { signup } from '../../store/actions/userActions.js';

class _SignUp extends Component {

    state = {
        msg: '',
        signupCred: {
            email: '',
            password: '',
            fullName: ''
        }
    }

    signupHandleChange = ev => {
        const { name, value } = ev.target;
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }));
    };

    doSignup = async ev => {
        ev.preventDefault();
        const { email, password, fullName } = this.state.signupCred;
        const imgUrl = 'https://res.cloudinary.com/dcnijwmki/image/upload/v1611597510/healthE/profiles/guest_it6pn4.jpg'
        if (!email || !password || !fullName) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, fullName, imgUrl, prefs: [] };
        this.props.signup(signupCreds);
    }


    render() {
        let signupSection = (
            <form class="sign-up-form" onSubmit={this.doSignup}>
                <input
                    className="signup-input"
                    type="text"
                    name="email"
                    value={this.state.signupCred.email}
                    onChange={this.signupHandleChange}
                    placeholder="Email"
                />
                <br />
                <input
                    className="signup-input"
                    name="password"
                    type="password"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    placeholder="Password"
                />
                <br />
                <input
                    className="signup-input"
                    type="text"
                    name="fullName"
                    value={this.state.signupCred.fullName}
                    onChange={this.signupHandleChange}
                    placeholder="Full Name"
                />
                <br />
                <button className="signup-btn">Signup</button>
            </form>
        )

        const { loggedInUser } = this.props;
        return (
            <div className="main-container">
                <div className="flex justify-center align-center column">
                    <h2 className="marg-top-50">
                        SignUp Here!
                </h2>
                    <h2>{this.state.msg}</h2>
                </div>
                {loggedInUser && (
                    <div>
                        <h2>Welcome: {loggedInUser.fullName} </h2>
                        <button onClick={this.props.logout}>Logout</button>
                    </div>
                )}
                {!loggedInUser && signupSection}
                <hr />
            </div>
        );
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
    signup,
    uploadImg
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);

