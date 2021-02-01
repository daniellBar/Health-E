import React, { Component } from "react";
import { connect } from "react-redux";
import { Reviews } from '../../cmps/Reviews.jsx';
import { Chat } from '../../cmps/Chat.jsx';
import SimpleMap from '../../cmps/Map.jsx';
import { saveActivity, loadActivity } from '../../store/actions/activityActions.js';
import { updateUser } from '../../store/actions/userActions.js';
import { userService, guestUser } from '../../services/userService.js';
import { utilService } from '../../services/utilService.js';
import socketService from '../../services/socketService.js'

const loadingImgUrl = 'https://res.cloudinary.com/dcnijwmki/image/upload/v1611662818/general/loader_b7k81c.gif';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const belowFoldListener = (callback) => {
  window.addEventListener('scroll', (event) => {
    callback(window.scrollY > 1030)
  })
}

const checkIsRegistered = (user, activity) =>
  activity.participants.some(participant => participant._id === user._id)

export class _ActivityDetails extends Component {
  state = {
    isBottom: false,
    user: guestUser,
    rateAddByUser: null
  }

  componentDidMount() {
    belowFoldListener((isBelowFold) => { if (this.state.isBottom !== isBelowFold) this.setState({ isBottom: isBelowFold }) })
    this.props.user && this.setState({ user: { ...this.props.user } })
    this.loadActivity()
  }

  loadActivity = () => {
    const activityId = this.props.match.params.activityId;
    if (activityId) this.props.loadActivity(activityId)
  };

  addReview = (txt) => {
    var newActivity = this.props.activity;
    const tmpReview = {
      "id": Date.now(),
      "txt": txt,
      "rate": (this.state.rateAddByUser || 5),
      "by": this.props.user
    }
    this.setState({ txt: '' })
    this.setState({ activity: newActivity })
    newActivity.reviews.push(tmpReview);
    this.props.saveActivity(newActivity);
  };

  onRate = (rate) => {
    this.setState({ rateAddByUser: rate });
  };


  purchaseActivity() {
    let { activity, user } = this.props;
    const currUser = {
      _id: user._id,
      fullName: user.fullName,
      imgUrl: user.imgUrl
    }
    let creatorId = activity.createdBy._id;
    let newActivity = { ...activity }
    if (creatorId === user._id) return;
    userService.getById(creatorId)
      .then(creator => {
        creator.income += activity.price
        this.props.updateUser(creator)
        newActivity.participants.push(currUser);
        this.props.saveActivity(newActivity);
        socketService.emit('new purchase', { creatorId: creator._id, activityTitle: activity.title, customerName: user.fullName })
      })
  }

  onCalcAvgRate = (activity) => {
    return utilService.calcAvgRate(activity)
  }

  render() {
    let { activity } = this.props;
    const user = this.props.user || guestUser;

    if (!activity || activity._id !== this.props.match.params.activityId) {
      return (
        <div className="loader">
          <img src={loadingImgUrl} alt="Loading..." />
        </div>
      );
    }

    let rate = this.onCalcAvgRate(activity);
    let isRegistered = checkIsRegistered(user, activity);

    return (
      <div className="main-details-card">
        {(user._id === 'guest') ?
          (<div className={(this.state.isBottom) ? "header-buy nav-override-color m10" : ("header-none")}
            onClick={() => this.props.history.push('/signUp')}>
            Join Us NOW!
          </div>) : (
            (isRegistered) ? '' : ((activity.participants.length < activity.maxCapacity) ?
              (<div className={(this.state.isBottom) ? "header-buy nav-override-color m10" : "header-none"}
                onClick={() => this.purchaseActivity()}>
                Sign me up!
              </div>) : '')
          )}
        <h2 className="title">{activity.title}</h2>
        <div className="inline">
          <div className="green-star">★</div>
          <p>{rate} </p>

          <p className="title l-grey">{activity.subtitle}</p>
        </div>

        <div className="image-gallery">
          {activity.imgUrls.map((img, idx) => (
            <img
              className={`img${idx} gallery__img`}
              key={idx}
              src={img}
              alt=""
            />
          ))}
        </div>
        <div className="event-main-container">
          {/* LEFT SIDE */}
          <div className="event-left-side">
            <div className="event-creator-container">
              <div>
                <h2>{activity.createdBy.fullName}</h2>
                <h4>
                  <div className="l-grey">{activity.createdBy.title}</div>
                </h4>
              </div>

              <div>
                <img
                  alt=""
                  className="creator-img"
                  src={activity.createdBy.imgUrl}
                />
              </div>
            </div>
            <div className="divider"></div>

            <div>
              <div className="marg-right">
                <i className="far fa-calendar-alt fa-lg"></i>
              </div>
              <p>
                {days[activity.dayInWeek]} - {activity.hour}:00
              </p>
              <h5>{activity.location.address}</h5>
            </div>
            <div className="text-box">
              <p>{activity.description}</p>
            </div>

            <div className="divider d-hi"></div>

            <div className="tags-container">
              <h2 className="tags-title">Tags:</h2>
              <div className="tags-list">
              {activity.tags.map((tag, idx) => (<li className="tag" key={idx}>{`#${tag}`}</li>))}
              </div>
            </div>
            <div className="divider d-hi"></div>

            {(activity._id === this.props.match.params.activityId) ? (
              <div className=".event-buy">
                <Reviews activity={activity}
                  rate={rate}
                  addReview={this.addReview}
                  onRate={this.onRate}
                  rateAddByUser={this.state.rateAddByUser} />
              </div>
            ) : ''}
          </div>


          {/* RIGHT SIDE */}
          <div className="event-right-side">
            <div className="event-buy">
              <div className="just-row">
                <div className="moneyback">
                  <i className="fas fa-money-bill-wave"></i>
                  <p className="tac">Money back guaranteed</p>
                </div>
              </div>
              <div className="center">
                <h2>Price: ${activity.price}</h2>
              </div>

              {(user._id === 'guest') ?
                (<div className="sticky"><button className="buy-btn"
                  onClick={() => this.props.history.push('/signUp')}>
                  Join Us NOW!
                </button></div>) :

                (isRegistered) ? (<div className="sticky"><button className="buy-btn">
                  Allready Registered</button></div>) : ((activity.participants.length < activity.maxCapacity) ?
                    (<div className="sticky"><button className="buy-btn"
                      onClick={() => this.purchaseActivity()}>
                      Sign me up!
                </button></div>) :
                    (<button className="sold-out-btn">SOLD OUT!</button>))}

            </div>
            <div className="attendings">
              <h3>Attending</h3>
              {activity.participants.map((participant, idx) => (
                <img
                  alt=""
                  className="attending-img"
                  key={idx}
                  src={participant.imgUrl}
                />
              ))}
            </div>
            <div className="map-container">
              <SimpleMap center={activity.location} />
            </div>
            <div className="divider"></div>
            <div className="chat-container">
              <Chat topic={activity._id} name={user.fullName} />

            </div>
          </div>
          {/* END OF RIGHT SIDE */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activity: state.activityReducer.currActivity,
    user: state.userReducer.loggedInUser,
  };
};
const mapDispatchToProps = {
  saveActivity,
  updateUser,
  loadActivity
};

export const ActivityDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ActivityDetails);
