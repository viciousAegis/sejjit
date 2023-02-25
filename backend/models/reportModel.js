const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
    {
        reported_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        reported_user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        reported_by_name: {
            type: String,
            required: true
        },
        reported_user_name: {
            type: String,
            required: true
        },
        concern: {
            type: String,
            required: true
        },
        sub: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Sub'
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        },
        post_title: {
            type: String,
            required: true
        },
        post_content: {
            type: String,
            required: true
        },
        status: {
            type: [String],
        },
    },
    {
        timestamps: true
    }
)

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;