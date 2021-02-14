import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';

class _UserActivityPreview extends Component {

    state = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        pin: false,
        sign: '+'
    }

    componentDidMount() {
        let { activity} = this.props;
        this.setState({ activity: activity })
    }

    showActivityDetails = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({ pin: !this.state.pin })
        this.state.pin ?
            this.setState({ sign: '+' }) :
            this.setState({ sign: '-' })

    }

    render() {
        let { activity, user, madeOfOperation, onRemove, onRemoveFromList } = this.props;
        if (!activity) return <h1>loading</h1>
        return (
            <section className="bg-white">
                <div onClick={(ev) => {
                    ev.stopPropagation()
                    this.props.history.push(`/activity/${activity._id}`)
                }}>

                    <div className="act-strip nav-override-color">
                        <div className="act-top strip">

                            <div className="img-40"><img src={activity.imgUrls[0]} alt="" /></div>
                            <div className="flex column event-title-dash">
                                <div>{activity.title}</div>
                                <div>{activity.location.address}</div>
                            </div>


                            <div className="day-time flex column">
                                <p>
                                    {this.state.days[activity.dayInWeek]} - {activity.hour}:00
                               </p>
                            </div>

                            <div className="act-btns">
                                {(madeOfOperation === 'organizer') ? (<div className="edit-btn" onClick={(ev)=> {
                                    ev.stopPropagation()
                                    this.props.history.push(`/activity/edit/${activity._id}`)}}><i className=" dash-btn fas fa-user-cog nav-override-color"></i></div>) : ''}
                                {(madeOfOperation === 'organizer') ? (<button className="dash-btn" onClick={(ev) => onRemove(ev, activity._id)}><i className="far fa-trash-alt"></i></button>) : ''}
                                {(madeOfOperation === 'subscriber') ? (<Button variant="outlined" onClick={(ev) => onRemoveFromList(ev, activity, user)}>Unsubscribe</Button>) : ''}
                            </div>



                            <div className="act-toggle-participants">
                                {(madeOfOperation === 'organizer') ? (
                                    <button className="dash-btn" onClick={(ev) => this.showActivityDetails(ev)}>{this.state.sign}</button>) : ''}
                            </div>
                        </div>

                        <div className={`${this.state.pin ? "pin-on" : "pin-off"}`}>
                            <div className="grid-participants-info">
                                {(madeOfOperation === 'organizer') && (
                                    activity.participants.map((participant, idx) => {
                                        return (
                                            <div className="participant-info cp-unique" key={idx}>
                                                <div onClick={(ev) => {
                                                    ev.stopPropagation()
                                                    this.props.history.push(`/user/${participant._id}`)
                                                }}>
                                                    <div className="dash-attendie">
                                                        <div className="attendie-cell">
                                                            <div><img className="attending-img" src={participant.imgUrl} alt="" /></div>
                                                            <div className="asc nav-override-color">{participant.fullName}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                    }))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export const UserActivityPreview = withRouter(_UserActivityPreview)
