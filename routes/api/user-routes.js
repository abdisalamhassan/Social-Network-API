const router = require('express').Router();

const { getALLUser, getUserById, createUser, updateUser, addFriend,deleteFriend } = require('../../controllers/user-controller');

router.route("/").get(getALLUsers).post(createUser);

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendsID").post(addFriend).delete(removeFriend);


module.exports = router;