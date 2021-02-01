
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('activity')
    try {
        const activities = await collection.find(criteria).toArray();
        return activities
    } catch (err) {
        console.log('ERROR: cannot find activities')
        throw err;
    }
}

async function getById(activityId) {
    const collection = await dbService.getCollection('activity')
    try {
        const activity = await collection.findOne({ "_id": ObjectId(activityId) })
        return activity
    } catch (err) {
        console.log(`ERROR: while finding activity ${activityId}`)
        throw err;
    }
}

async function remove(activityId) {
    const collection = await dbService.getCollection('activity')
    try {
        await collection.deleteOne({ "_id": ObjectId(activityId) })
    } catch (err) {
        console.log(`ERROR: cannot remove activity ${activityId}`)
        throw err;
    }
}

async function update(activity) {
    const collection = await dbService.getCollection('activity')
    activity._id = ObjectId(activity._id);
    activity.updatedAt = new Date(Date.now()).toLocaleDateString()
    try {
        await collection.replaceOne({ "_id": activity._id }, activity)
        return activity
    } catch (err) {
        console.log(`ERROR: cannot update activity ${activity._id}`)
        throw err;
    }
}

async function add(activity) {
    const collection = await dbService.getCollection('activity')
    try {
        activity.createdAt = new Date(Date.now()).toLocaleDateString()
        await collection.insertOne(activity);
        return activity;
    } catch (err) {
        console.log(`ERROR: cannot insert activity`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    for (const key in filterBy) {
            if(Array.isArray(filterBy[key])){
                criteria[key]={$all:[...filterBy[key]]}
            }
            else{
                criteria[key] = { $regex: new RegExp(filterBy[key], 'i')
            }
        }   
    }
    return criteria;
}
