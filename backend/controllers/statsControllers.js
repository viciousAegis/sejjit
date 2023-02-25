const Stats = require('../models/statsModel');
const Sub = require('../models/subModel');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const getStats = asyncHandler(async (req, res) => {
    const stats = await Stats.find({ sub: req.params.sub });
    res.json(stats);
});

const updateStats = asyncHandler(async (req, res) => {
    const stats = await Stats.findById(req.params.id);
    //update today's stats
    if (moment(stats.date).isSame(moment(), 'day')) {

        const sub = await Sub.findById(req.params.sub);
        // followers are cumulative
        stats.number_of_followers = sub.followers.length;
        // need to get the number of posts from today, so subtract posts from yesterday from total posts
        stats.number_of_posts = 0
        stats.number_of_comments = 0
    }
    // create new stats for today
});


module.exports = {
    getStats
};
