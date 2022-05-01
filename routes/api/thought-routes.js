const router = require('express').Router();

const { getAllThoughts, getThoughtsByID, createThoughts, deleteThoughts, addReaction, deleteReaction} = require('../../controllers/thoughts-controller.js');

router.route('/').get(getAllThoughts);


router.route('/:id').get(getThoughtsByID).post(createThoughts).delete(deleteThoughts);

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router