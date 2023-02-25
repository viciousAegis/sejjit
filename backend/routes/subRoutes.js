const express = require('express');
const { registerSub, deleteSub, addFollower, removeFollower, getSubs, getAllSubs, getOneSub, requestFollow, getNumPosts, rejectFollow } = require('../controllers/subControllers');
const { protect } = require('../middlewares/authMiddlewares');
const router = express.Router();

router.route('/create').post(protect, registerSub);

router.route('/').get(getAllSubs);

router.route('/follow/:id').put(addFollower);

router.route('/unfollow/:id').put(protect, removeFollower);

router.route('/subs').get(protect, getSubs);

router.route('/request/:id').put(protect,requestFollow);

router.route('/reject/:id').put(protect,rejectFollow);

router.route('/posts/:id').get(getNumPosts);

router.route('/:id')
    .delete(protect, deleteSub)
    .get(getOneSub);

module.exports = router;