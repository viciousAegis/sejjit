const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/genToken');
const Sub = require('../models/subModel');

const registerUser = asyncHandler(async (req, res) => {
    const { fname, lname, email, username, dob, contact, password } = req.body;

    // check username and email
    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        fname,
        lname,
        email,
        username,
        dob,
        contact,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            username: user.username,
            dob: user.dob,
            contact: user.contact,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

    res.json({
        fname,
        lname,
        email,
    });
})

const authUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            username: user.username,
            dob: user.dob,
            contact: user.contact,
            pic: user.pic,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }

});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {

        user.fname = req.body.fname || user.fname;
        user.lname = req.body.lname || user.lname;
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;
        user.dob = req.body.dob || user.dob;
        user.contact = req.body.contact || user.contact;
        user.pic = req.body.pic || user.pic;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fname: updatedUser.fname,
            lname: updatedUser.lname,
            email: updatedUser.email,
            username: updatedUser.username,
            dob: updatedUser.dob,
            contact: updatedUser.contact,
            pic: updatedUser.pic,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json({
            user
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const userIds = req.query.userIds;

    const users = await User.find({ _id: { $in: userIds } });

    if (users) {
        res.json({
            users
        });
    } else {
        res.status(404);
        throw new Error('Users not found');
    }
});

const getBlockedUsers = asyncHandler(async (req, res) => {
    const sub = await Sub.findById(req.params.sub);

    if (!sub) {
        res.status(404);
        throw new Error('Sub not found');
    }

    const blockedUsers = await User.find({ _id: { $in: sub.banned_users } });

    if (blockedUsers) {
        res.json({
            blockedUsers
        });
    } else {
        res.status(404);
        throw new Error('Blocked users not found');
    }
});


const followUser = asyncHandler(async (req, res) => {
    const userToFollow = await User.findById(req.params.id);

    const { user_id } = req.body;

    console.log(user_id);
    console.log(req.params.id);

    if (user_id === req.params.id) {
        res.status(400);
        throw new Error('You cannot follow yourself');
    }

    if (userToFollow)
        if (userToFollow.followers.includes(user_id)) {
            res.status(400);
            throw new Error('You already follow this user');
        } else {
            const update_1 = await User.updateOne(
                { _id: req.params.id },
                { $push: { followers: user_id } }
            );

            const update_2 = await User.updateOne(
                { _id: user_id },
                { $push: { following: req.params.id } }
            );

            if (!update_1 || !update_2) {
                res.status(400);
                throw new Error('Something went wrong');
            }

            const updatedUser = await User.findById(user_id);
            const updatedUserToFollow = await User.findById(req.params.id);

            res.json({
                updatedUser,
                updatedUserToFollow
            });
        }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

const getFollowerList = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const followerList = await User.find({ _id: { $in: user.followers } });

    if (!followerList) {
        res.status(404);
        throw new Error('No followers found');
    }

    const listToReturn = followerList.map((follower) => {
        return {
            _id: follower._id,
            username: follower.username,
            pic: follower.pic
        }
    });

    res.json({
        listToReturn
    });
});

const getFollowingList = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const followingList = await User.find({ _id: { $in: user.following } });

    if (!followingList) {
        res.status(404);
        throw new Error('No following found');
    }

    const listToReturn = followingList.map((following) => {
        return {
            _id: following._id,
            username: following.username,
            pic: following.pic
        }
    });

    res.json({
        listToReturn
    });
});

const removeFollowerFromUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const follower = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!follower) {
        res.status(404);
        throw new Error('Follower not found');
    }

    if(!user.followers.includes(req.params.id)) {
        res.status(400);
        throw new Error('You do not follow this user');
    }

    const update1 = await User.updateOne(
        { _id: req.user.id },
        { $pull: { followers: req.params.id } }
    );

    const update2 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { following: req.user.id } }
    );

    if (update1 && update2) {

        updatedUser = await User.findById(req.user.id);
        updatedFollower = await User.findById(req.params.id);

        res.json({
            updatedUser,
            updatedFollower
        });

    } else {
        res.status(400);
        throw new Error('Something went wrong');
    }
});

const removeFollowingFromUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const following = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!following) {
        res.status(404);
        throw new Error('Following not found');
    }

    if(!user.following.includes(req.params.id)) {
        res.status(400);
        throw new Error('You do not follow this user');
    }

    const update1 = await User.updateOne(
        { _id: req.user.id },
        { $pull: { following: req.params.id } }
    );

    const update2 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.user.id } }
    );

    if (update1 && update2) {

        updatedUser = await User.findById(req.user.id);
        updatedFollowing = await User.findById(req.params.id);

        res.json({
            updatedUser,
            updatedFollowing
        });
    } else {
        res.status(400);
        throw new Error('Something went wrong');
    }
});



module.exports = { registerUser, authUser, updateUserProfile, getUserProfile, followUser, getFollowerList, getFollowingList, removeFollowerFromUser, removeFollowingFromUser, getUsers, getBlockedUsers }