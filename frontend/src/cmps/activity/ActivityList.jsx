import React from "react";
import { ActivityPreview } from './ActivityPreview'

export function ActivityList({ activities }) {
  return (
    <div className="activity-list marg-top-50">
      {
        activities.map((activity) => (
          
          <ActivityPreview bottomBorder={true} activity={activity} rate={activity.rate} key={activity._id} />
        ))
      }
    </div>
  );
}

