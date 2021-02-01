import React, { Component } from "react";
import { connect } from "react-redux";
import { ActivityPreview } from '../activity/ActivityPreview.jsx';
import { loadActivities } from '../../store/actions/activityActions.js';


class _Suggested extends Component {
  state = {
    activities: null
  }

  componentDidMount() {
    this.props.loadActivities();
  }

  render() {
    const { activities } = this.props;
    if (!activities) return <div>Loading....</div>;

    const arr = activities.slice(0, 5);
    return (
      <section>
        <h3>Suggested for you:</h3>
        <p>Find lectures, trainers and suppliers around you</p>

        <div className="activity-list">
          {arr.map((activity) => (
            <ActivityPreview bottomBorder={false} activity={activity} rate={activity.rate} key={activity._id} />
          ))}
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activities: state.activityReducer.activities,
  }
}

const mapDispatchToProps = {
  loadActivities
}

export const Suggested = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Suggested)

