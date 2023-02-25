// async..await is not allowed in global scope, must use a wrapper
const nodemailer = require("nodemailer");
const User = require('../models/userModel');
const Sub = require('../models/subModel');
const Post = require('../models/postModel');
const Report = require('../models/reportModel');

const sendMail = async (req, res, user_id, sub_id, post_id, report, type, action) => {
    // send mail to the user who reported the post
    if (type == 'u') {
        const user = await User.findById(user_id);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        let sub, post, subject, text, html;

        switch (action) {
            case 'b':
                // send mail about the user being blocked

                // need to send sub name, post title, post link, report id, report concern, and the reported user's username

                sub = await Sub.findById(sub_id);
                post = await Post.findById(post_id);

                if (!sub) {
                    res.status(404);
                    throw new Error('Sub not found');
                }

                if (!post) {
                    res.status(404);
                    throw new Error('Post not found');
                }

                subject = 'Action taken on your report';

                text = `Dear ${user.username}, Your report on the post "${post.title}" in the sub "${sub.name}" has been taken care of. The OP has been blocked from the sub. The OP (u/${report.reported_user_name}) has been blocked from the sub. Thank you for your report.`;

                // html body with line breaks and all
                html = `<p>Dear ${user.username},</p><br>
                <p>Your report on the post "${post.title}" in the sub "${sub.name}" has been taken care of. The OP has been blocked from the sub. The OP (u/${report.reported_user_name}) has been blocked from the sub.</p><br>
                <p>Thank you for your report.</p>`;

                mail(res, user.email, subject, text, html).catch(console.error);
                break;
            case 'i':
                // send mail about the report being ignored
                sub = await Sub.findById(sub_id);
                post = await Post.findById(post_id);

                if (!post) {
                    res.status(404);
                    throw new Error('Post not found');
                }

                subject = 'Action taken on your report';

                text = `Dear ${user.username}, Your report on the post "${post.title}" in the sub "${sub.name}" has been taken care of. The Report has been ignored. Thank you for your report.`;

                // html body with line breaks and all
                html = `<p>Dear ${user.username},</p><br>
                <p>Your report on the post "${post.title}" in the sub "${sub.name}" has been taken care of. The Report has been ignored.</p><br>
                <p>Thank you for your report.</p>`;

                mail(res, user.email, subject, text, html).catch(console.error);

                break;
            case 'd':
                // send mail about the post being deleted

                post = await Post.findById(post_id);

                if (!post) {
                    res.status(404);
                    throw new Error('Post not found');
                }

                sub = await Sub.findById(sub_id);

                subject = 'Action taken on your report';

                text = `Dear ${user.username}, Your report on the post "${post.title}" in the sub "${sub.name}" has been taken care of. The post has been deleted. Thank you for your report.`;

                // html body with line breaks and all
                html = `<p>Dear ${user.username},</p><br>
                <p>Your report on the post "${post.title}" in the sub "${sub.name}" has been taken care of. The post has been deleted.</p><br>
                <p>Thank you for your report.</p>`;

                mail(res, user.email, subject, text, html).catch(console.error);

                break;
            default:
                break;
        }
    }

    // send mail to the user who posted the post
    if (type == 'r') {
        const poster = await User.findById(user_id);

        if (!poster) {
            res.status(404);
            throw new Error('User not found');
        }

        let sub, post, subject, text, html;

        switch (action) {
            case 'd':
                // send mail about the post being deleted
                post = await Post.findById(post_id);

                if (!post) {
                    res.status(404);
                    throw new Error('Post not found');
                }

                sub = await Sub.findById(sub_id);

                subject = 'Action taken on your post';

                text = `Dear ${poster.username}, Your post "${post.title}" in the sub "${sub.name}" has been deleted. Please read the rules of the sub before posting again. Thank you for your cooperation.`;

                // html body with line breaks and all
                html = `<p>Dear ${poster.username},</p><br>
                <p>Your post "${post.title}" in the sub "${sub.name}" has been deleted. Please read the rules of the sub before posting again.</p><br>
                <p>Thank you for your cooperation.</p>`;

                console.log(poster);

                mail(res, poster.email, subject, text, html).catch(console.error);

                break;
            case 'b':
                // send mail about the user being blocked

                // need to send sub name, post title, post link, report id, report concern, and the reported user's username

                post = await Post.findById(post_id);

                if (!post) {
                    res.status(404);
                    throw new Error('Post not found');
                }

                sub = await Sub.findById(sub_id);

                subject = 'Action taken on your post';

                text = `Dear ${poster.username}, You were reported for your post "${post.title}" in the sub "${sub.name}". As a result, you have been blocked from the sub. Please read the rules of the sub before posting. Thank you for your cooperation.`;

                // html body with line breaks and all
                html = `<p>Dear ${poster.username},</p><br>
                <p>You were reported for your post "${post.title}" in the sub "${sub.name}". As a result, you have been blocked from the sub. Please read the rules of the sub before posting.</p><br>
                <p>Thank you for your cooperation.</p>`;

                mail(res, poster.email, subject, text, html).catch((err) => {
                    console.log(err);
                });

                break;
            default:
                break;
        }
    }
};

const mail = async (res, email_id, subject, text, html) => {

    if (!email_id) {
        res.status(404);
        throw new Error('Email not found');
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USERNAME, // generated ethereal user
            pass: process.env.GMAIL_PASS, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Sejjit Moderation" <moderation@sejjit.com>', // sender address
        to: email_id, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

module.exports = sendMail;
