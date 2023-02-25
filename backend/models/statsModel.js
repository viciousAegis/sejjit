const mongoose = require('mongoose');

const statsSchema = mongoose.Schema(
    {
        sub: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Sub'
        },
        date: {
            type: Date,
            required: true
        },
        number_of_followers: {
            type: Number,
            required: true
        },
        number_of_posts: {
            type: Number,
            required: true
        },
        number_of_visits: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;