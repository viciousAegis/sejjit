const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        posted_by: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        user_name: {
            type: String,
            required: true
        },
        user_pic: {
            type: String,
            required: true
        },
        sub: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Sub'
        },
        upvotes: {
            type: [String],
        },
        downvotes: {
            type: [String],
        },
        comments: {
            type: [Array],
        }
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', postSchema);

module.exports = Post;