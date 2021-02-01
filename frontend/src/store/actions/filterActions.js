
export function setFilter(filterBy) {
    return async dispatch => {
      dispatch({ type: 'SET_FILTER', filterBy })
    }
  }