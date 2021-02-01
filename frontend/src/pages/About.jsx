import React, { Component } from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';


export class About extends Component {

    render() {
        return (
            <div className="main-container">
                <h2 className="about-title">About Me</h2>
                <div className="about-container">
                    <div>
                        <img className="about-img" src={require("../assets/img/me.jpg")} alt="#" />
                    </div>
                    <div className="about-info">
                        <p>Hi, I'm Daniel Bar, I have B.Sc in Electronic Engineering and i am also intrested in Web development.
                            This app is my final project in Coding Academy bootcamp along with my class mates: <a href="https://www.linkedin.com/in/chen-edri-46290776/" target="_blank" rel="noopener noreferrer">Chen Edri</a> and <a href="https://www.linkedin.com/in/maromdavid/" target="_blank" rel="noopener noreferrer">David Marom</a>.
                            </p>
                    </div>
                    <div className="about-links">
                        <a href="https://www.facebook.com/daniel.bar.589" target="_blank" rel="noopener noreferrer"><FacebookIcon style={{ fontSize: 40, margin: '10px', color: '#3b5998' }} /></a>
                        <a href="https://www.linkedin.com/in/daniel-bar-1b2a9653/" target="_blank" rel="noopener noreferrer"><LinkedInIcon style={{ fontSize: 40, margin: '10px', color: '#2867B2' }} /></a>
                    </div>
                </div>
            </div>

        )
    }
}