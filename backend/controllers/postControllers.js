const Post = require('../models/postModel');
const Sub = require('../models/subModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const Report = require('../models/reportModel');

const removeBannedWords = (post, sub) => {
    let postContent = post.content.split(' ');
    postContent = postContent.map(word => word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

    let postTitle = post.title.split(' ');
    postTitle = postTitle.map(word => word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase());

    console.log(sub.banned_words);
    const bannedWords = sub.banned_words;

    const newPostContent = [];
    const newPostTitle = [];

    for (let j = 0; j < postContent.length; j++) {
        if (bannedWords.includes(postContent[j])) {
            newPostContent.push('****');
        } else {
            newPostContent.push(postContent[j]);
        }

        if (bannedWords.includes(postTitle[j])) {
            newPostTitle.push('****');
        } else {
            newPostTitle.push(postTitle[j]);
        }
    }

    post.content = newPostContent.join(' ');
    post.title = newPostTitle.join(' ');
}

const checkBannedUser = (post, sub) => {
    const bannedUsers = sub.banned_users;

    if (bannedUsers.includes(post.posted_by)) {
        post.user_name = 'Banned User';
    }
}


const createPost = asyncHandler(async (req, res) => {
    const { title, content, sub } = req.body;

    if (!title || !content || !sub) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const subExists = Sub.findById(sub);

    if (!subExists) {
        res.status(400);
        throw new Error('Sub does not exist');
    }

    const posted_by = req.user._id;

    const user = await User.findById(posted_by);

    const post = await Post.create({
        title: title,
        content: content,
        posted_by: posted_by,
        sub: sub,
        user_name: user.username,
        user_pic: user.pic,
    });

    if (post) {

        const post_sub = await Sub.findById(post.sub);
        console.log(post_sub);
        removeBannedWords(post, post_sub);
        checkBannedUser(post, post_sub);

        res.status(201).json({
            _id: post._id,
            title: post.title,
            content: post.content,
            posted_by: post.posted_by,
            sub: post.sub,
            user_name: user.username,
            user_pic: user.pic,
            upvotes: post.upvotes,
            downvotes: post.downvotes,
        });
    }

    res.json({
        title,
        content,
        sub
    });
})

const getPostsBySub = asyncHandler(async (req, res) => {
    const subID = req.params.sub;

    const sub = await Sub.findById(subID);

    if (!sub) {
        res.status(400);
        throw new Error('Sub does not exist');
    }

    const posts = await Post.find({ sub: subID });

    for (let i = 0; i < posts.length; i++) {
        removeBannedWords(posts[i], sub);
        checkBannedUser(posts[i], sub);
    }

    if (posts) {
        res.json(posts);
    } else {
        res.status(400);
        throw new Error('No posts found');
    }
})

const upvotePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    const { user_id } = req.body;

    const user = await User.findById(user_id);

    if (!post) {
        res.status(400);
        throw new Error('Post does not exist');
    }

    const checkUser = post.upvotes.includes(user._id);

    if (checkUser) {
        res.status(400);
        throw new Error('User has already upvoted post');
    }

    const update = await Post.updateOne(
        { _id: req.params.id },
        { $push: { upvotes: user._id } },
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    const updatedPost = await Post.findById(req.params.id);

    res.json(updatedPost);
})

const downvotePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    const { user_id } = req.body;

    const user = await User.findById(user_id);

    if (!post) {
        res.status(400);
        throw new Error('Post does not exist');
    }

    const checkUser = post.downvotes.includes(user._id);

    if (checkUser) {
        res.status(400);
        throw new Error('User has already downvoted post');
    }

    const update = await Post.updateOne(
        { _id: req.params.id },
        { $push: { downvotes: user._id } },
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    const updatedPost = await Post.findById(req.params.id);

    res.json(updatedPost);
})

const commentOnPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    const { comment } = req.body;

    if (!comment) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const user = await User.findById(req.user._id);

    if (!post) {
        res.status(400);
        throw new Error('Post does not exist');
    }

    const update = await Post.updateOne(
        { _id: req.params.id },
        { $push: { comments: [user.username, comment] } },
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    const updatedPost = await Post.findById(req.params.id);

    res.json(updatedPost.comments);
})

const savePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (!post) {
        res.status(400);
        throw new Error('Post does not exist');
    }

    const checkPost = user.saved_posts.includes(post._id);

    if (checkPost) {
        res.status(400);
        throw new Error('Post has already been saved');
    }

    const update = await User.updateOne(
        { _id: req.user._id },
        { $push: { saved_posts: post._id } },
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    res.json({
        post: req.params.id
    });
})

const unsavePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    const user = await User.findById(req.user._id);

    if (!post) {
        res.status(400);
        throw new Error('Post does not exist');
    }

    const checkPost = user.saved_posts.includes(post._id);

    if (!checkPost) {
        res.status(400);
        throw new Error('Post has not been saved');
    }

    const update = await User.updateOne(
        { _id: req.user._id },
        { $pull: { saved_posts: post._id } },
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    res.json({
        post: req.params.id
    });
})

const getSavedPosts = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(400);
        throw new Error('User does not exist');
    }

    const posts = await Post.find({ _id: { $in: user.saved_posts } });


    for (let i = 0; i < posts.length; i++) {
        const sub = await Sub.findById(posts[i].sub);
        posts[i] = { ...posts[i]._doc, sub_name: sub.name };
        removeBannedWords(posts[i], sub);
        checkBannedUser(posts[i], sub);
    }
    if (!posts) {
        res.status(400);
        throw new Error('No posts found');
    }

    res.json(posts);
})

const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        res.status(400);
        throw new Error('Post does not exist');
    }

    const sub = await Sub.findById(post.sub);

    if (!sub) {
        res.status(400);
        throw new Error('Sub does not exist');
    }

    if (!sub.moderator.equals(req.user._id)) {
        res.status(400);
        throw new Error('User is not moderator');
    }

    // delete all related reports

    const reports = await Report.find({ post: post._id });

    if (reports) {
        reports.forEach(async (report) => {
            await Report.deleteOne({ _id: report._id });
        });
    }
    
    const update = await Post.deleteOne({ _id: req.params.id });

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    res.json({
        message: 'Post deleted'
    });
})


module.exports = {
    createPost,
    getPostsBySub,
    upvotePost,
    downvotePost,
    commentOnPost,
    savePost,
    unsavePost,
    getSavedPosts,
    deletePost
}