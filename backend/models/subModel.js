const mongoose = require('mongoose');

const subSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        moderator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        tags: {
            type: [String],
            required: true
        },
        banned_words: {
            type: [String],
            required: true
        },
        followers: {
            type: [String]
        },
        follow_requests: {
            type: [String]
        },
        banned_users: {
            type: [String]
        },
        pic: {
            type: String,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        }
    },
    {
        timestamps: true
    }
)

const Sub = mongoose.model('Sub', subSchema);

module.exports = Sub;