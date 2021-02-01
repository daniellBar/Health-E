const initialState = {
    activities: [],
    currActivity:null
}

export function activityReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACTIVITIES':
            return {
                ...state,
                activities: action.activities
            }
        case 'SET_ACTIVITY':
            return {
                ...state,
                 currActivity: action.activity
            }
        case 'EDIT_ACTIVITY':
            return {
                ...state,
                currActivity: action._activity,
                activities: state.activities.map(activity => {
                    if (action._activity._id === activity._id) return action._activity
                    return activity;
                })
            }
        case 'ADD_ACTIVITY':
            return {
                ...state,
                 activities: state.activities.push(action.activity)
            }
        case 'REMOVE_ACTIVITY':
            return { ...state, activities: state.activities.filter(activity => activity._id !== action.activityId) }

        default:
            return state
    }

}

