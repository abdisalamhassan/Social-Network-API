const router = require('express').Router();

const { getAllThoughts, getThoughtsByID, createThoughts, updateThought, deleteThoughts, addReaction, deleteReaction} = require('../../controllers/thoughts-controller.js');

router.route('/').get(getAllThoughts).post(createThoughts);


router.route('/:id').get(getThoughtsByID).put(updateThought);

router.route('/:thoughtId/user/:userID').delete(deleteThoughts);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router