const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getActivity, getActivities, updateActivity, addActivity, deleteActivity } = require('./activity.controller')
const router = express.Router()

router.get('/', getActivities)
router.get('/:id', getActivity)
router.put('/:id', requireAuth, updateActivity)
router.post('/', requireAuth, addActivity)
router.delete('/:id', requireAuth, deleteActivity)

module.exports = router