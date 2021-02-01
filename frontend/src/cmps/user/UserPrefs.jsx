import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../../store/actions/userActions.js';

class _UserPrefs extends Component {

    state = {
        prefs: []
    }

    updatePrefs(ev) {
        ev.preventDefault();
    }

    render() {
        return (
            <div className="main-container">
                <h2>Please choose are your interests?</h2>
                <div className="collection">
                    <ul>
                        <li name="sport" onClick={() => this.updatePrefs}>Sport</li>
                        <li name="yoga">Yoga</li>
                        <li name="Running">Running</li>
                        <li name="jogging">jogging</li>
                        <li name="pilatis">pilatis</li>
                        <li name="Swimming">Swimming</li>
                        <li name="Meditation">Meditation</li>
                        <li name="Nutrition">Nutrition</li>
                        <li name="Diets">Diets</li>
                        <li name="mindfullness">mindfullness</li>
                        <li name="well-bieng<">well-bieng</li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    updateUser
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);
