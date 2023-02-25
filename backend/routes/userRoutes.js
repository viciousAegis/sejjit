const express = require('express');
const { registerUser, authUser, updateUserProfile, getUserProfile, followUser, getFollowerList, getFollowingList, removeFollowerFromUser, removeFollowingFromUser, getUsers, getBlockedUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser); 
router.route('/profile').post(protect, updateUserProfile)
router.route('/followers').get(protect, getFollowerList)
router.route('/following').get(protect, getFollowingList)
router.route('/remove/:id').delete(protect, removeFollowerFromUser)
router.route('/unfollow/:id').delete(protect, removeFollowingFromUser)
router.route('/users').get(getUsers)
router.route('/users/b/:sub').get(getBlockedUsers)
router.route('/:id')
    .get(getUserProfile)
    .put(followUser)

module.exports = router;