import { activityService } from '../../services/activityService.js'

export function loadActivities(filterBy = {}) {
  return async dispatch => {
    try {
      const activities = await activityService.query(filterBy)
      dispatch({ type: 'SET_ACTIVITIES', activities })
    }
    catch (err) {
      console.log('activityActions: err in loadActivities ', err);
    }
  }

}


export function loadActivity(activityId) {
  return async dispatch => {
    try {
      const activity = await activityService.getById(activityId);
      dispatch({ type: 'SET_ACTIVITY', activity })
    }
    catch (err) {
      console.log('activityActions: err in loadActivity ', err);
    }
  }
}

export function removeActivity(activityId) {
  return async dispatch => {
    try {
      await activityService.remove(activityId)
      dispatch({ type: 'REMOVE_ACTIVITY', activityId })
    }
    catch (err) {
      console.log('activityActions: err in removeActivity ', err);
    }
  }
}

export function saveActivity(activity) {
  return async dispatch => {
    try {
      const actionType = activity._id ? 'EDIT_ACTIVITY' : 'ADD_ACTIVITY';
      const _activity = await activityService.save(activity);
      dispatch({ type: actionType, _activity })
    }
    catch (err) {
      console.log('activityActions: err in saveActivity ', err);
    }
  }
}
