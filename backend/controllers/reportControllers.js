const Report = require('../models/reportModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const asyncHandler = require('express-async-handler');
const Sub = require('../models/subModel');
const sendMail = require('../utils/sendMail');
const createReport = asyncHandler(async (req, res) => {
    const reported_by_id = req.user._id;
    const post_id = req.params.id;
    const { concern } = req.body;

    if (!concern) {
        res.status(400);
        throw new Error('Please provide a concern');
    }

    const reported_by = await User.findById(reported_by_id);

    if (!reported_by) {
        res.status(404);
        throw new Error('User not found');
    }

    const post = await Post.findById(post_id);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    const reported_user = await User.findById(post.posted_by);

    if (reported_by_id.equals(reported_user._id)) {
        res.status(400);
        throw new Error('You cannot report yourself');
    }

    const report = await Report.create({
        reported_by: reported_by_id,
        reported_user: reported_user._id,
        reported_by_name: reported_by.username,
        reported_user_name: reported_user.username,
        concern: concern,
        sub: post.sub,
        post: post_id,
        post_title: post.title,
        post_content: post.content,
        status: [],
    });

    if (report) {
        res.status(201).json({
            _id: report._id,
            reported_by: report.reported_by,
            reported_user: report.reported_user,
            concern: report.concern,
            post: report.post,
        });
    }
});

const getReports = asyncHandler(async (req, res) => {
    const sub_id = req.params.sub;

    const sub = await Sub.findById(sub_id);

    if (!sub) {
        res.status(404);
        throw new Error('Sub not found');
    }

    if (sub.moderator.equals(req.user._id) === false) {
        res.status(401);
        throw new Error('You are not authorized to view reports');
    }

    const reports = await Report.find({ sub: sub_id });

    if (reports) {
        res.json(reports);
    } else {
        res.status(404);
        throw new Error('Reports not found');
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const sub_id = req.params.sub;
    const mod_id = req.user._id;

    const sub = await Sub.findById(sub_id);

    if (!sub) {
        res.status(404);
        throw new Error('Sub not found');
    }

    if (sub.moderator.equals(mod_id) === false) {
        res.status(401);
        throw new Error('You are not authorized to block users');
    }

    const { user_id, report_id } = req.body;

    const report = await Report.findById(report_id);

    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }

    if (mod_id.equals(user_id)) {
        res.status(400);
        throw new Error('You cannot block yourself');
    }

    if (sub.banned_users.includes(user_id)) {

        if (!report.status.includes('blocked')) {
            const reportUpdate = await Report.updateOne(
                { _id: report_id },
                { $push: { status: 'blocked' } }
            );
        }

        const updatedReport = await Report.findById(report_id);

        res.status(400);
        throw new Error('User is already blocked');
    }

    if (sub.followers.includes(user_id)) {
        await Sub.updateOne(
            { _id: sub_id },
            { $pull: { followers: user_id } }
        );
    }
    // send a mail to the reporter about the action taken
    await sendMail(req, res, report.reported_by, sub_id, report.post, report, 'u', 'b')

    // send a mail to the reported user about the action taken
    await sendMail(req, res, user_id, sub_id, report.post, report, 'r', 'b')

    const update = await Sub.updateOne(
        { _id: sub_id },
        { $push: { banned_users: user_id } }
    );

    if (update) {
        const reportUpdate = await Report.updateOne(
            { _id: report_id },
            { $push: { status: 'blocked' } }
        );

        const updatedReport = await Report.findById(report_id);

        res.json({
            message: 'User blocked',
            sub: sub_id,
            user: user_id,
            report_status: updatedReport.status
        });
    } else {
        res.status(400);
        throw new Error('User not blocked');
    }
});

const ignoreReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);

    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }

    if (report.status.includes('ignored')) {
        res.status(400);
        throw new Error('Report already ignored');
    }

    const sub = await Sub.findById(report.sub);

    if (!sub) {
        res.status(404);
        throw new Error('Sub not found');
    }

    if (sub.moderator.equals(req.user._id) === false) {
        res.status(401);
        throw new Error('You are not authorized to ignore reports');
    }

    // send a mail to the reporter about the action taken
    await sendMail(req, res, report.reported_by, report.sub, report.post, report, 'u', 'i')

    const update = await Report.updateOne(
        { _id: req.params.id },
        { $push: { status: 'ignored' } }
    );

    if (update) {


        res.json({
            message: 'Report ignored',
            report: report._id,
        });
    } else {
        res.status(400);
        throw new Error('Report not ignored');
    }
});

const deleteReport = asyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);

    const user_id = req.user._id;

    const sub = await Sub.findById(report.sub);

    if (!sub) {
        res.status(404);
        throw new Error('Sub not found');
    }

    if (sub.moderator.equals(user_id) === false) {
        res.status(401);
        throw new Error('You are not authorized to delete reports');
    }

    if (!report) {
        res.status(404);
        throw new Error('Report not found');
    }

    const deleteReport = await Report.deleteOne({ _id: req.params.id });

    if (deleteReport) {
        res.json({
            message: 'Report deleted',
            report: report._id,
        });
    } else {
        res.status(400);
        throw new Error('Report not deleted');
    }
});


module.exports = {
    createReport,
    getReports,
    blockUser,
    ignoreReport,
    deleteReport,
};