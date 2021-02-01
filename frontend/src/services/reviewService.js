import httpService from './httpService';

export default {
  add,
  query,
  remove
};

function query(filterBy) {
  var queryStr = `?name=${filterBy.name}&sort=anaAref`;
  return httpService.get(`review${queryStr}`);
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`);
}
async function add(review) {
  const addedReview  = await httpService.post(`review`, review);
  return  addedReview
}
