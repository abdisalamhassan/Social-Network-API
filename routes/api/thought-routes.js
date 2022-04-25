const router = require('express').Router();

const { getAllThoughts, getThoughtsById, createThoughts, deleteThoughts, addReaction, deletReaction} = require('../../controllers/thoughts-controller');

router.route('/').get(getALLThoughts);

router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router