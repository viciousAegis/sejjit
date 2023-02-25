const express = require('express');

const { createPost, getPostsBySub, upvotePost, downvotePost, commentOnPost, savePost, unsavePost,getSavedPosts, deletePost } = require('../controllers/postControllers');

const { protect } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.route('/create').post(protect, createPost);
router.route('/upvote/:id').put(upvotePost);
router.route('/downvote/:id').put(downvotePost);
router.route('/comment/:id').post(protect,commentOnPost);
router.route('/saved').get(protect,getSavedPosts);
router.route('/save/:id').post(protect,savePost);
router.route('/unsave/:id').delete(protect,unsavePost);
router.route('/delete/:id').delete(protect,deletePost);
router.route('/:sub').get(getPostsBySub);

module.exports = router;