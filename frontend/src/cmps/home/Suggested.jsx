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

    const suggested = activities.slice(0, 8);
    return (
      <section className="suggested-container">
        <h3 className="title">Popular Activities:</h3>
        <div className="suggested-scrolled-container">
          {suggested.map((activity) => (
            <div className="scrolled-Preview">
              <ActivityPreview bottomBorder={false} activity={activity} rate={activity.rate} key={activity._id} />
            </div>
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

