const Sub = require('../models/subModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Report = require('../models/reportModel');
const asyncHandler = require('express-async-handler');

const registerSub = asyncHandler(async (req, res) => {
    const { name, description, tags, banned_words } = req.body;

    if (!name || !description || !tags || !banned_words) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const subExists = await Sub.findOne({ name });

    if (subExists) {
        res.status(400);
        throw new Error('Sub already exists');
    }


    const followers = [req.user._id];

    const sub = await Sub.create({
        name: name,
        description: description,
        moderator: req.user._id,
        tags: tags,
        banned_words: banned_words,
        followers: followers,
    });

    if (sub) {
        res.status(201).json({
            _id: sub._id,
            name: sub.name,
            moderator: sub.moderator,
            description: sub.description,
            tags: sub.tags,
            banned_words: sub.banned_words,
            followers: sub.followers,
            banned_users: sub.banned_users
        });
    } else {
        res.status(400);
        throw new Error('Invalid sub data');
    }
})

const deleteSub = asyncHandler(async (req, res) => {
    
    const sub = await Sub.findById(req.params.id);

    if (sub.moderator.equals(req.user._id) === false) {
        res.status(401);
        throw new Error('User is not moderator');
    }

    if (sub) {

        // delete associated posts and reports
        const posts = await Post.find({ sub: sub._id });
        posts.forEach(async (post) => {
            await Report.deleteMany({ post: post._id });
            await post.remove();
        });

        await sub.remove();
        res.json({
            message: 'Sub deleted'
        });
    } else {
        res.status(400);
        throw new Error('Invalid sub data');
    }
})

const addFollower = asyncHandler(async (req, res) => {
    const { user_id } = req.body;

    const sub = await Sub.findById(req.params.id);

    if (!sub) {
        res.status(400);
        throw new Error('Sub does not exist');
    }

    const userExists = await User.findById(user_id);

    if (!userExists) {
        res.status(400);
        throw new Error('User does not exist');
    }

    const checkUserExists = sub.followers.includes(user_id);

    if (checkUserExists) {
        res.status(400);
        throw new Error('User already follows subsejjit');
    }

    const checkUserRequests = sub.follow_requests.includes(user_id);

    if (!checkUserRequests) {
        res.status(400);
        throw new Error('User has not requested to follow subsejjit');
    }

    const update = await Sub.updateOne(
        { _id: req.params.id },
        { $push: { followers: user_id }, $pull: { follow_requests: user_id } }
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    updatedSub = await Sub.findById(req.params.id);

    res.json({
        id: updatedSub._id,
        followers: updatedSub.followers,
        follow_requests: updatedSub.follow_requests
    })
})

const removeFollower = asyncHandler(async (req, res) => {
    const user_id = req.user._id;

    const sub = await Sub.findById(req.params.id);

    if (!sub) {
        res.status(400);
        throw new Error('Sub does not exist');
    }

    if (sub.moderator === user_id) {
        res.status(400);
        throw new Error('Cannot unfollow a sub you moderate');
    }

    const checkUserExists = sub.followers.includes(user_id);

    if (!checkUserExists) {
        res.status(400);
        throw new Error('User does not follow subsejjit');
    }

    const update = await Sub.updateOne(
        { _id: req.params.id },
        { $pull: { followers: user_id }, $push: { banned_users: user_id } }
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    updatedSub = await Sub.findById(req.params.id);

    res.json({
        name: updatedSub.name,
        followers: updatedSub.followers
    })
})

const getOneSub = asyncHandler(async (req, res) => {
    const sub = await Sub.findById(req.params.id);

    if (sub) {

        // get number of posts
        const newSub = {}
        const posts = await Post.find({ sub: sub._id });
        newSub.num_posts = posts.length;
        newSub._id = sub._id;
        newSub.name = sub.name;
        newSub.moderator = sub.moderator;
        newSub.description = sub.description;
        newSub.tags = sub.tags;
        newSub.banned_words = sub.banned_words;
        newSub.followers = sub.followers;
        newSub.banned_users = sub.banned_users;
        newSub.pic = sub.pic;
        newSub.follow_requests = sub.follow_requests;

        res.json({
            sub: newSub
        });
    } else {
        res.status(404);
        throw new Error('Sub not found');
    }
})

const getSubs = asyncHandler(async (req, res) => {
    const subs = await Sub.find({moderator: req.user._id});
    const newSubs = [];

    // add number of posts to each sub
    for (let i = 0; i < subs.length; i++) {
        const posts = await Post.find({ sub: subs[i]._id });
        const newSub = {
            _id: subs[i]._id,
            name: subs[i].name,
            moderator: subs[i].moderator,
            description: subs[i].description,
            tags: subs[i].tags,
            banned_words: subs[i].banned_words,
            followers: subs[i].followers,
            banned_users: subs[i].banned_users,
            num_posts: posts.length,
            pic: subs[i].pic,
            follow_requests: subs[i].follow_requests
        }

        newSubs.push(newSub);
    }

    res.json({
        subs: newSubs
    });
})

const getAllSubs = asyncHandler(async (req, res) => {
    const subs = await Sub.find({});

    if (subs) {

        const newSubs = [];

        // add number of posts to each sub
        for (let i = 0; i < subs.length; i++) {
            const posts = await Post.find({ sub: subs[i]._id });
            const newSub = {
                _id: subs[i]._id,
                name: subs[i].name,
                moderator: subs[i].moderator,
                description: subs[i].description,
                tags: subs[i].tags,
                banned_words: subs[i].banned_words,
                followers: subs[i].followers,
                banned_users: subs[i].banned_users,
                num_posts: posts.length,
                pic: subs[i].pic,
                follow_requests: subs[i].follow_requests
            }
    
            newSubs.push(newSub);
        }

        res.json({
            subs: newSubs
        });
    } else {
        res.status(404);
        throw new Error('No subs found');
    }
})

const requestFollow = asyncHandler(async (req, res) => {
    const user_id = req.user._id;
    const sub_id = req.params.id;

    const user = await User.findById(user_id);

    if (!user) {
        res.status(400);
        throw new Error('User does not exist');
    }

    const sub = await Sub.findById(sub_id);

    if (!sub) {
        res.status(400);
        throw new Error('Sub does not exist');
    }

    const checkFollowerExists = sub.followers.includes(user_id);

    if (checkFollowerExists) {
        res.status(400);
        throw new Error('User already follows subsejjit');
    }

    const checkIfBanned = sub.banned_users.includes(user_id);

    if (checkIfBanned) {
        res.status(400);
        throw new Error('User cannot join subsejjit');
    }

    const checkUserExists = sub.follow_requests.includes(user_id);

    if (checkUserExists) {
        res.status(400);
        throw new Error('User already requested to follow subsejjit');
    }

    const update = await Sub.updateOne(
        { _id: sub_id },
        { $push: { follow_requests: user_id } }
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    const updatedSub = await Sub.findById(sub_id);

    res.json({
        id: updatedSub._id,
        follow_requests: updatedSub.follow_requests
    })
})

const rejectFollow = asyncHandler(async (req, res) => {
    const sub_id = req.params.id;

    const { user_id } = req.body;

    const sub = await Sub.findById(sub_id);

    if (!sub) {
        res.status(400);
        throw new Error('Sub does not exist');
    }

    const checkUserExists = sub.follow_requests.includes(user_id);

    if (!checkUserExists) {
        res.status(400);
        throw new Error('User has not requested to follow subsejjit');
    }

    const update = await Sub.updateOne(
        { _id: sub_id },
        { $pull: { follow_requests: user_id }, $push: { banned_users: user_id } }
    );

    if (!update) {
        res.status(400);
        throw new Error('Update failed');
    }

    const updatedSub = await Sub.findById(sub_id);

    res.json({
        id: updatedSub._id,
        follow_requests: updatedSub.follow_requests,
        banned_users: updatedSub.banned_users
    })
})

const getNumPosts = asyncHandler(async (req, res) => {
    const sub = await Sub.findById(req.params.id);

    if (sub) {
        const posts = await Post.find({ sub: sub._id });
        res.json({
            num_posts: posts.length
        });
    } else {
        res.status(404);

        throw new Error('Sub not found');
    }
})

module.exports = { registerSub, deleteSub, addFollower, removeFollower, getSubs, getOneSub, getAllSubs, requestFollow, getNumPosts, rejectFollow };