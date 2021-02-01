import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loadActivities, saveActivity, removeActivity } from "../../store/actions/activityActions.js";
import { connect } from "react-redux";
import { UserActivityList } from "../../cmps/user/UserActivityList.jsx";
import { UserDashbord  } from "../../cmps/user/UserDashbord.jsx";
import { userService } from "../../services/userService.js";
import { activityService } from "../../services/activityService.js";
import { updateUser } from "../../store/actions/userActions.js";

export class _UserDetails extends Component {
  state = {
    currUser: null,
    createdAct: {},
    participant: {},
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadUser()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.match.params.userId) return;
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.loadUser()
      window.scrollTo(0, 0);
    }
  }

  loadUser = () => {
    const { userId } = this.props.match.params;
    if (userId) {
      userService.getById(userId)
        .then(user => this.setState({ currUser: user }, () => {
          this.props.loadActivities()
        }))
    }
  }

  onRemove = (ev, _id) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.props.removeActivity(_id);
  };
  onRemoveFromList = (ev, activity, user) => {
    ev.preventDefault();
    ev.stopPropagation();
    // delete from the user list by canceling participant inside the activity object
    let idx = activityService.findIdxById(activity.participants, user._id);
    activity.participants.splice(idx, 1);

    // update activity
    this.props.saveActivity(activity);

    // update the organizer income
    userService.getById(activity.createdBy._id).then((user) => {
      user.income -= activity.price;
      this.props.updateUser(user);
    });
  };

  onGetCreatedEvents = (activities, currUser) => {
    let act = activityService.getCreatedEvents(activities, currUser);
    return act;
  };

  onGetPartOfEvents = (activities, currUser) => {
    return activityService.getPartOfEvents(activities, currUser);
  };

  render() {
    let loggedUser = this.props.user;
    let { activities } = this.props;
    if (!Object.keys(activities).length) activities = null;
    const { currUser } = this.state;
    if (!currUser) return <div className="loader"><img src={'https://res.cloudinary.com/dcnijwmki/image/upload/v1611662818/general/loader_b7k81c.gif'} alt='loading'/></div>
    let eventsCreatedByUser = this.onGetCreatedEvents(activities, currUser);
    let partOfEvents = this.onGetPartOfEvents(activities, currUser);
    return (
      <div className="main-user-container">
        <div className="profile-top-bar">

          <div className="profile-bar-left">
            <h2>{currUser.fullName}</h2>
            <h4>{currUser.title}</h4>
            <h4>{currUser.email}</h4>
            {currUser.bio}

          </div>
          <div className="profile-bar-right">
            <img className="profile-pic" src={currUser.imgUrl} alt="" />
            <p>Change Photo</p>
            <Link to="/activity/add"><button className="add-btn">Add New Event</button></Link>
          </div>
        </div>

        <div className="pref-line">
          <h4>Preferences: </h4>
          {currUser.prefs.map((pref, idx) => (
            <div className="tal inline" key={idx}>
              {pref}
              {(idx < currUser.prefs.length - 1) ? (<p> • </p>) : (null)}
            </div>
          ))}
        </div>


        <div className="flex column sb">
          <div className="flex column">
            <div className="main-info-container">
              {(eventsCreatedByUser && (currUser._id === loggedUser._id)) ? (<UserDashbord user={currUser} activities={eventsCreatedByUser} />) : ''}

              <h3 className="mini-title">Events I organized:</h3>

              {eventsCreatedByUser ? (
                <UserActivityList
                  activities={eventsCreatedByUser}
                  user={currUser}
                  onRemove={this.onRemove}
                  onRemoveFromList={this.onRemoveFromList}
                  madeOfOperation={"organizer"}
                />
              ) : (null)}

            </div>
            <div className="main-info-container">
              <h3 className="mini-title">Events I{`'`}m going to:</h3>
              {partOfEvents ? (
                <UserActivityList
                  activities={partOfEvents}
                  user={currUser}
                  onRemove={this.onRemove}
                  onRemoveFromList={this.onRemoveFromList}
                  madeOfOperation={"subscriber"}
                />
              ) : (
                  ""
                )}
            </div>
          </div>
          <div className="flex column tac">
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    activities: state.activityReducer.activities,
    user: state.userReducer.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadActivities,
  saveActivity,
  updateUser,
  removeActivity
};

export const UserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserDetails);
