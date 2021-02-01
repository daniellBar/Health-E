import httpService from './httpService';

export const activityService = {
  query,
  getById,
  remove,
  getEmpty,
  update,
  save,
  addRate,
  getCreatedEvents,
  getPartOfEvents,
  findIdxById
}

function query(filterBy = {}) {
  const queryStr = Object.keys(filterBy).map((param) => {
    if (Array.isArray(filterBy[param])) {
      return filterBy[param].map(value => {
        return `${param}=${value}`
      }).join('&')
    }
    else {
      return `${param}=${filterBy[param]}`
    }
  }).join('&');
  return httpService.get(`activity/?${queryStr}`);
}

function getById(activityId) {
  return httpService.get(`activity/${activityId}`);
}

function remove(activityId) {
  return httpService.delete(`activity/${activityId}`);
}


function update(activity) {
  return httpService.put(`activity/${activity._id}`, activity)
}

async function save(activity) {
  if (activity._id) {
    return httpService.put(`activity/${activity._id}`, activity)
  } else {
    return httpService.post(`activity`, activity)
  }
}


function addRate(activity, rate) {
  if (rate != null) {
    activity.rate.push(rate)
    return httpService.put(`activity/${activity._id}`, activity)
  }
}

function getEmpty() {
  return {
    title: "",
    createdAt: "",
    description: "",
    location: {
      lat: 0,
      lng: 0,
      address: ""
    },
    imgUrls: [],
    participants: [],
    tags: [],
    rate: [0],
    reviews: [],
    msgs: []
  }
}


function getCreatedEvents(activities, currUser) {
  if (!activities) return null;
  return activities.filter(activity => activity.createdBy._id === currUser._id)
}

function getPartOfEvents(activities, currUser) {
  if (!activities) return null;
  var act = [];
  activities.forEach(activity => {
    activity.participants.forEach(user => {
      if (user._id === currUser._id) act.push(activity)
    })
  })
  return act;
}

function findIdxById(arr, id) {
  return arr.findIndex(item => item._id === id)
}


