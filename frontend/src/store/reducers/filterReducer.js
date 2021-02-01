import {utilService} from '../../services/utilService.js'

const initialState = {
  filterBy: {}
}

function setInitialState() {
  const queryParamsStr = utilService.getQueryParamsStr()
  initialState.filterBy = queryParamsStr === '' ? {} : utilService.buildParamsObject(queryParamsStr)
}

setInitialState()

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filterBy: action.filterBy }
    default:
      return state;
  }
}