import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userService } from '../../services/userService.js';
import { uploadImg } from '../../services/imgUploadService.js';
import { signup } from '../../store/actions/userActions.js';

class _SignUp extends Component {

    state = {
        msg: '',
        signupCred: {
            email: '',
            password: '',
            fullName: '',
            prefs: [],
            imgUrl: ''
        },
        suggestion: [{ name: 'sport', isMarked: false }, { name: 'yoga', isMarked: false }, { name: 'cardio', isMarked: false },
        { name: 'pilates', isMarked: false }, { name: 'mindfullness', isMarked: false }, { name: 'meditation', isMarked: false },
        { name: 'well-being', isMarked: false }, { name: 'nutrition', isMarked: false }, { name: 'diet', isMarked: false },
        { name: 'pshychology', isMarked: false }]
    };

    onUpdateImg = async (ev) => {
        const img = await uploadImg(ev)
        let signupCred = this.state.signupCred;
        signupCred.imgUrl = img;
        this.setState({ signupCred })
    }

    addToPrefs = (pref) => {
        // pushing item to the array inside the big object
        let prefs = (this.state.prefs || []);
        prefs.push(pref.name)
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                prefs: [...this.state.signupCred.prefs, pref.name]
            }
        }))
        //changig the second item in the object suggestions
        let suggestion = this.state.suggestion
        var idx = userService.findIdxToMark(suggestion, pref)
        pref.isMarked = !pref.isMarked;
        suggestion.splice(idx, 1, pref)
        this.setState({ suggestion })
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
        const { email, password, fullName, prefs, imgUrl } = this.state.signupCred;
        if (!email || !password || !fullName || !prefs || !imgUrl) {
            return this.setState({ msg: 'All inputs are required!' });
        }
        const signupCreds = { email, password, fullName, prefs, imgUrl, income:0 };
        this.props.signup(signupCreds);
        this.setState({ signupCred: { email: '', password: '', fullName: '', prefs: [] } });
    };


    render() {
        let signupSection = (
            <form onSubmit={this.doSignup}>
                <input
                    className="login-input"
                    type="text"
                    name="email"
                    value={this.state.signupCred.email}
                    onChange={this.signupHandleChange}
                    placeholder="Email"
                />
                <br />
                <input
                    className="login-input"
                    name="password"
                    type="password"
                    value={this.state.signupCred.password}
                    onChange={this.signupHandleChange}
                    placeholder="Password"
                />
                <br />
                <input
                    className="login-input"
                    type="text"
                    name="fullName"
                    value={this.state.signupCred.fullName}
                    onChange={this.signupHandleChange}
                    placeholder="Full Name"
                />
                <br />
                        <h3 className="fs20 p10 marg-top-50">Upload Photo</h3>
                    <label htmlFor="file-upload" className="">
                        <input id="file-upload" className="upload-file" onChange={(ev) => this.onUpdateImg(ev)} type="file" />
                    </label>

               
                <h2 className="tac d-hi">Let us know what you're into!</h2>
                <section className="suggestions fs20 ">
                    {(this.state.suggestion) ? (this.state.suggestion.map((suggest, idx) => (
                        <div key={idx}
                            className={`${this.state.suggestion[idx].isMarked ? "marked " : "unmarked "}`}
                            onClick={() => this.addToPrefs(suggest)}>{suggest.name}</div>))) : ''}
                </section>
                <button className="login-btn">Signup</button>
            </form>
        );

        const { loggedInUser } = this.props;
        return (
            <div className="main-container tac">
                <h1 className="marg-top-50">
                    SignUp Here!
                </h1>
                <h2>{this.state.msg}</h2>
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

