const activityService = require('./activity.service.js')
const logger = require('../../services/logger.service')

async function getActivity(req, res) {
    const activity = await activityService.getById(req.params.id)
    res.send(activity)
}

async function getActivities(req, res) {
    const activities = await activityService.query(req.query)
    logger.debug(activities);
    res.send(activities)
}

async function deleteActivity(req, res) {
    await activityService.remove(req.params.id)
    res.end()
}

async function updateActivity(req, res) {
    const activity = req.body;
    await activityService.update(activity)
    res.send(activity)
}

async function addActivity(req, res) {
    const activity = req.body;
    await activityService.add(activity)
    res.send(activity)
}

module.exports = {
    getActivity,
    getActivities,
    deleteActivity,
    updateActivity,
    addActivity
}